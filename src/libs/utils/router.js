import {
	getCurPage,
	getCurPageQuery,
	getNavigationBarTitle,
	getAppLaunchInfo,
	checkInTabbar
} from './sys'
import { str2param, param2str } from './url'
import { isValidURL, isPureObject } from './validate'
import { routersMap } from './pages-config'
import { isInWebView } from './wechat'
// #ifdef H5
import weixinJsSdk from 'weixin-js-sdk'
// #endif
// key 完整路由 或者路由名称
export const findRouterInfo = function (key) {
	let item = routersMap[key]
	if (item) {
		return item
	}
	// 判断key是否为路径
	let name = (key.startsWith('/') ? '' : '/') + key
	for (const k in routersMap) {
		if (Object.hasOwnProperty.call(routersMap, k)) {
			const v = routersMap[k]
			let path = v.path
			if (path === name) {
				return v
			}
		}
	}
}

/**
 * @description: 检测是否是首页
 * @param {String} key 路由name
 * @return {Boolean}
 * @author: dubangrong
 */
export const checkIsHomeRouter = function (key) {
	let item = findRouterInfo(key)
	return item && item.isHome
}

/**
 * @description: 找到首页路由
 * @return {Object}
 * @author: dubangrong
 */
export const findHomeRouter = function () {
	for (let p in routersMap) {
		if (routersMap[p].isHome) {
			return routersMap[p]
		}
	}
}

/**
 * @description: 获取页面路由参数
 * @return {Object}
 * object => {
 *  path: 路径,
    query: 路径参数,
    fullPath: 全路径,
    title: 标题
 * }
 * @author: dubangrong
 */
export const getCurRouter = function () {
	let page = getCurPage()
	let query = getCurPageQuery()

	if (!page) {
		page = getAppLaunchInfo()
	}
	let path = '/' + page.route

	return {
		path,
		query,
		fullPath: page.$page && page.$page.fullPath,
		title: getNavigationBarTitle(page),
		channelInfo: getChannelInfo({ query })
	}
}

/**
 * @description: 跳转函数
 * @param {Object,String} url 路由名称  strig => 路径末端名字或者路由name
 * object => {
 *  path: 路径末端名字或者路由name,
 *  query: 链接参数
 * }
 * @param {Object, String} opt 配置 strig => 跳转方式 navigateTo|reLaunch|redirectTo
 * object => {
 *  isFullPath: 是否满路径,
 *  root: 分包路径,
 *  type: 跳转方式 navigateTo|reLaunch|redirectTo
 * }
 * @param {String} type 跳转方式 navigateTo|reLaunch|redirectTo
 * @return {null}
 * @author: dubangrong
 */
export const navTo = function (url, opt = {}, type) {
	let query = ''
	let root = 'pages'

	if (typeof opt === 'string') {
		type = opt
		opt = {}
	}

	type = type || opt.type || 'navigateTo'

	if (isPureObject(url)) {
		let url2 = url.path || ''
		query = param2str(url.query, true)
		url = url2
	}

	let path =
		findRouterInfo(url)?.path ||
		(opt.isFullPath || url.indexOf('/') !== -1
			? `${url}`
			: `/${opt.root || root}/${url}/${url}`)

	url = `${path}${query}`

	// #ifdef MP
	// 小程序路由限制10层
	let pageLen = getCurrentPages().length

	if (type !== 'reLaunch' && pageLen > 9) {
		type = 'redirectTo'
	}
	// #endif

	if (checkInTabbar(path)) {
		type = 'switchTab'
		if (!uni.switchTabQuery) {
			uni.switchTabQuery = {}
		}
		let r = path.split('?')[0]
		uni.switchTabQuery[r] = str2param(url) || {}
	}

	// 相同路径 后退
	if (type === 'navigateTo') {
		let pages = getCurrentPages()
		let prevPage = pages[pages.length - 2]
		if (prevPage && prevPage.$page.fullPath === url) {
			uni.navigateBack({
				delta: 1
			})
			return Promise.resolve({
				jumpType: 'INNER'
			})
		}
	}
	if (!url) {
		return Promise.resolve({
			jumpType: 'INVALID'
		})
	}

	return new Promise((resolve, reject) => {
		// webview 跳转小程序
		let fn = uni[type]

		isInWebView().then(ret => {
			if (ret && opt.isToMP) {
				fn = weixinJsSdk.miniProgram[type]
			}
			fn({
				url,
				...opt,
				success(evt) {
					resolve({
						jumpType: 'INNER',
						...evt
					})
				},
				fail(evt) {
					reject({
						jumpType: 'INNER',
						...evt
					})
				}
			})
		})
	})
}

/**
 * @description: 跳转h5
 * @param {String} url h5链接
 * @param {String} title h5标题
 * @return {Promise}
 * @author: dubangrong
 */
export const navToH5 = function (url, title) {
	// #ifdef H5
	return window.open(url, '_blank')
	// #endif
	// #ifndef H5
	// eslint-disable-next-line no-unreachable
	return navTo({
		path: 'web',
		query: {
			src: encodeURIComponent(url),
			title: title || ''
		}
	})

	// #endif
}
// 检测小程序接口是否成功
export const checkMPApiErrMsg = function (ret, api) {
	let info = ret

	if (Array.isArray(info)) {
		info = ret[0]
	}

	if (info?.errMsg === `${api}:ok`) {
		return true
	} else {
		return false
	}
}

/**
 * @description: 打开视频号直播
 * @param {*} finderUserName
 * @return {*}
 * @author: dubangrong
 */
export const navToChannelsLive = function (finderUserName) {
	return new Promise((resolve, reject) => {
		uni.getChannelsLiveInfo({
			finderUserName
		})
			.then(info => {
				if (info && info[0]) {
					let item = info[0]

					if (checkMPApiErrMsg(item, 'getChannelsLiveInfo')) {
						let { feedId, nonceId } = item
						uni.openChannelsLive({
							finderUserName,
							feedId,
							nonceId
						})
							.then(ret => {
								if (checkMPApiErrMsg(ret, 'openChannelsLive')) {
									resolve({ jumpType: 'LIVE', ...item })
								} else {
									reject({ jumpType: 'LIVE', ...ret })
								}
							})
							.catch(err => {
								reject({ jumpType: 'LIVE', ...err })
							})
					} else {
						uni.openChannelsUserProfile({
							finderUserName
						})
							.then(ret => {
								if (checkMPApiErrMsg(ret, 'openChannelsUserProfile')) {
									resolve({ jumpType: 'LIVE', ...item })
								} else {
									reject({ jumpType: 'LIVE', ...ret })
								}
							})
							.catch(err => {
								reject({ jumpType: 'LIVE', ...err })
							})
					}
				} else {
					reject({ jumpType: 'LIVE' })
				}
			})
			.catch(() => {
				reject({ jumpType: 'LIVE' })
			})
	})
}

/**
 * @description: 跳转视频号
 * @param {Object} config
 * {
 * finderUserName {String} 视频号
 * feedId {String} 视频id
 * }
 * @author: dubangrong
 */
export const navToChannelsActivity = function ({ finderUserName, feedId }) {
	return new Promise((resolve, reject) => {
		if (feedId) {
			uni.openChannelsActivity({
				finderUserName,
				feedId
			})
				.then(ret => {
					if (checkMPApiErrMsg(ret, 'openChannelsActivity')) {
						resolve(ret)
					} else {
						reject(ret)
					}
				})
				.catch(err => {
					reject(err)
				})
		} else {
			uni.openChannelsUserProfile({
				finderUserName
			})
				.then(ret => {
					if (checkMPApiErrMsg(ret, 'openChannelsUserProfile')) {
						resolve(ret)
					} else {
						reject(ret)
					}
				})
				.catch(err => {
					reject(err)
				})
		}
	})
}

// 防止多次点击
let throttleNavTo = false
/**
 * @description: 后台配置 跳转h5 小程序 内页
 * @param {Object} cfg
 * object => {
 *  path: 路径末端名字或者路由name,
 *  query: 链接参数
 * }
 * @param {Object} opt 配置 strig => 跳转方式 navigateTo|reLaunch|redirectTo
 * object => {
 *  isFullPath: 是否满路径,
 *  root: 分包路径,
 *  type: 跳转方式 navigateTo|reLaunch|redirectTo
 * }
 * @return {Promise}
 * @author: dubangrong
 */
export const navToMix = function (cfg, opt) {
	if (cfg) {
		let navType = ''
		if (typeof uni.$ui?.config?.tranformNavConfig === 'function') {
			let obj = uni.$ui.config.tranformNavConfig(cfg)
			cfg = obj.data || cfg
			navType = obj.type
		}
		// 兼容appId， path传参
		let { appId, path, query } = cfg

		if (throttleNavTo) {
			return
		}
		throttleNavTo = true
		return new Promise((resolve, reject) => {
			if (navType === 'INVALID') {
				resolve({
					jumpType: 'INVALID'
				})
				return
			}
			// 跳转h5
			if (navType ? navType === 'H5' : isValidURL(path)) {
				navToH5(path)
				resolve({
					jumpType: 'H5'
				})
				throttleNavTo = false
				// 跳转小程序
			} else if (navType ? navType === 'MP' : appId) {
				uni.navigateToMiniProgram({
					appId,
					path,
					success(evt) {
						resolve({
							...evt,
							jumpType: 'MP'
						})
						throttleNavTo = false
					},
					fail(evt) {
						reject({
							...evt,
							jumpType: 'MP'
						})
						throttleNavTo = false
					}
				})
			} else if (navType === 'VIDEO') {
				navToChannelsActivity({
					finderUserName: appId,
					feedId: path
				})
					.then(evt => {
						resolve({
							...evt,
							jumpType: 'VIDEO'
						})
						throttleNavTo = false
					})
					.catch(evt => {
						reject({
							...evt,
							jumpType: 'VIDEO'
						})
						throttleNavTo = false
					})
			} else if (navType === 'LIVE') {
				navToChannelsLive(appId)
					.then(evt => {
						resolve({
							...evt,
							jumpType: 'LIVE'
						})
						throttleNavTo = false
					})
					.catch(evt => {
						reject({
							...evt,
							jumpType: 'LIVE'
						})
						throttleNavTo = false
					})
			} else {
				navTo(
					{
						path,
						query
					},
					opt
				)
					.then(evt => {
						resolve({
							...evt
						})
						throttleNavTo = false
					})
					.catch(evt => {
						reject({
							...evt
						})
						throttleNavTo = false
					})
			}
		})
	}
}

export const navBack = function (evt = { delta: 1 }, path, opts, type) {
	let pages = getCurrentPages()
	// 如果第一个参数是跳转路径
	if (typeof evt === 'string') {
		type = opts || 'navigateTo'
		opts = path || {}
		path = evt
		evt = { delta: 1 }
	}

	if (pages.length > 1) {
		uni.navigateBack(evt)
	} else {
		navTo(path || 'index', opts, type)
	}
}

/**
 * @description: 检测是否显示导航底部
 * @param {String} route 路由名称 或者 路由路径 默认当前路径
 * @param {Array} tabLists 路由列表 默认store.state.tabbar.lists
 * @return {Boolean}
 * @author: dubangrong
 */
export const checkShowTabbar = function (route, tabLists) {
	return getTabbarCurrent(route, tabLists) !== -1
}
/**
 * @description: 获取导航底部当前索引
 * @param {String} route 路由名称 或者 路由路径 默认当前路径
 * @param {Array} tabLists 路由列表 默认store.state.tabbar.lists
 * @return {Number} index
 * @author: dubangrong
 */
export function getTabbarCurrent(route, tabLists) {
	let tabbarItems = tabLists || []
	// 不传的话使用当前页面
	if (!route) {
		const pages = getCurrentPages()
		const page = pages[pages.length - 1]
		route = '/' + page.route
	} else {
		// route为路由名称时
		const curInfo = findRouterInfo(route)
		if (curInfo) {
			route = curInfo.path
		}
	}

	let index = tabbarItems.findIndex(v => {
		let { path = '' } = v
		let r = ''
		let info = findRouterInfo(path)
		if (info) {
			r = info.path
		} else {
			r = path.split('?')[0]
		}

		let flag = r === route && !v.appId

		return flag
	})
	return index
}

/**
 * @description: 获取渠道参数
 * @param {*}
 * @return {*}
 * @author: dubangrong
 */
export function getChannelInfo(url) {
	let query = {}

	if (url) {
		if (typeof url === 'string') {
			query = str2param(url)
		} else {
			query = url.query || {}
		}
		let { scene } = query
		if (scene) {
			query = {
				...query,
				...(str2param(decodeURIComponent(scene)) || {})
			}
		}
	} else {
		query = getCurPageQuery()
	}
	let channel = ''
	let channelId = ''

	for (let key in query) {
		// C_渠道名称=渠道id
		if (key.startsWith('C_')) {
			channel = key.replace('C_', '')
			channelId = query[key]
		} else if (key === 'chan_id') {
			channel = query[key]
			channelId = channel
		}
	}
	return {
		id: channelId,
		name: channel
	}
}
