import { param2str, str2param } from './url'
import { getRouterConfig } from './pages-config'

const _getAccountInfoSync = uni.getAccountInfoSync

export const getAccountInfoSync = function() {
	// #ifdef MP-TOUTIAO
	let { microapp } = tt.getEnvInfoSync()
	let map = {
		production: 'release',
		development: 'develop',
		preview: 'trial'
	}
	return {
		miniProgram: {
			appId: microapp.appId,
			envVersion: map[microapp.envType],
			version: microapp.mpVersion
		}
	}
	// #endif
	// eslint-disable-next-line no-unreachable
	if (_getAccountInfoSync) {
		return _getAccountInfoSync()
	} else {
		return {}
	}
}

// 获取window配置
export const getWindowConfig = function() {
	return getRouterConfig()
}
// 当前配置的tabBar
const tabBar = getWindowConfig().tabBar || {}

// 获取tabbar的路径

export const getTabBarPaths = function() {
	let arr = []
	// #ifndef H5
	let list = tabBar.list || []
	list.forEach(v => {
		arr.push('/' + v.pagePath.replace('.html', ''))
	})
	// #endif
	return arr
}

// tabbar的路径
const tabBarPaths = getTabBarPaths()

export const systemInfo = uni.getSystemInfoSync()

// 顶部导航高度
export const getNavbarHeight = function(height) {
	let { statusBarHeight } = systemInfo

	// #ifdef APP-PLUS || H5
	return (height || 44) + statusBarHeight
	// #endif
	// #ifdef MP
	// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
	// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
	// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
	// eslint-disable-next-line no-unreachable
	let h = height || systemInfo.platform == 'ios' ? 44 : 44

	return h + statusBarHeight
	// #endif
}
// 获取底部导航高度
export const getTabbarHeight = function(midButton = false, height = 50) {
	return systemInfo.safeAreaInsets.bottom + height + (midButton ? 48 : 0)
}

// 页面标题
export const getNavigationBarTitle = function(page) {
	const cur = page || getCurPage()
	if (!cur) return ''
	const pagesInfo = getWindowConfig().pages || {}
	const info = pagesInfo['/' + cur.route]
	if (info) {
		return info.style.navigationBarTitleText
	}

	return ''
}

// 是否在原生tabbar
export const checkInTabbar = function(path = '') {
	let r = path.split('?')[0]
	return tabBarPaths.includes(r)
}

// 保证页面加载完毕
export const checkMountedPages = function() {
	return new Promise(resolve => {
		let pages = getCurrentPages()

		if (pages.length) {
			resolve(pages)
		} else {
			setTimeout(() => {
				checkMountedPages().then(ret => {
					resolve(ret)
				})
			}, 30)
		}
	})
}
// 获取当前路由
export const getCurPageAsync = async function() {
	let pages = await checkMountedPages()

	return pages[pages.length - 1]
}

// 获取当前路由
export const getCurPage = function() {
	let pages = getCurrentPages()
	let page = pages[pages.length - 1]

	return page
}

// 获取启动参数
export const getAppLaunchInfo = function(appLaunchInfo) {
	if (uni.$appLaunchInfo) {
		return uni.$appLaunchInfo
	} else if (!appLaunchInfo && uni.getLaunchOptionsSync) {
		appLaunchInfo = uni.getLaunchOptionsSync()
	}
	if (appLaunchInfo) {
		let { query, path } = appLaunchInfo
		let obj = {
			options: query,
			route: path,
			$page: {
				fullPath: path + param2str(query)
			}
		}

		uni.$appLaunchInfo = { ...obj }

		return obj
	}
	return {}
}

// 获取当前路由 参数
export const getCurPageQuery = function() {
	let page = getCurPage()

	if (!page) {
		page = getAppLaunchInfo()
	}

	let query = page.options || {}
	let path = '/' + page.route

	// 使用switchTab 跳转参
	if (checkInTabbar(path)) {
		let obj = (uni.switchTabQuery && uni.switchTabQuery[path]) || {}

		query = {
			...query,
			...obj
		}
	}

	let { scene } = query

	if (scene) {
		query = {
			...query,
			...(str2param(decodeURIComponent(scene)) || {})
		}
	}

	return query || {}
}

/**
 * @description: 检测微信是否更新
 * @param {*}
 * @return {*}
 * @author: dubangrong
 */
export function checkVerUpdate() {
	// #ifdef MP
	const updateManager = uni.getUpdateManager()

	updateManager.onUpdateReady(function() {
		uni.$ui.openDialog({
			html: {
				title: '更新提示',
				content: `新版本已经准备好，是否重启应用？！`,
				buttons: {
					text: '立即更新',
					autoClose: true
				}
			},
			btnClick() {
				updateManager.applyUpdate()
			}
		})
	})
	// #endif
}
