import { assemblySignatureUrl } from '@/libs/utils/signature.js'
import { ApiUrl, openServerTimeStamp, API_LOGIN_OUT_CODE, API_SUCCESS_CODE } from '@/config/api.js'
import store from '@/store/index.js'
import { isValidURL } from '@/libs/utils/validate.js'

// let isLogining = false
/**
 *
 * url参数组装
 *
 * @param {*} parameter 参数
 * @returns
 */
export function urlAppendParameter(parameter) {
	let result = ''
	for (const key in parameter) {
		result += key + '=' + parameter[key] + '&'
	}
	result = result.substring(0, result.length - 1)
	return result
}

export default async function request(data, baseUrl = ApiUrl) {
	let orginParams = {
		...data
	}
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		let isOutLink = isValidURL(data.url)
		data.url = (isOutLink ? '' : baseUrl) + data.url

		let {
			needLogin = true,
			needTimeStamp = true,
			url,
			params,
			loadingOpt,
			debug = true,
			showToast = true,
			successCode = API_SUCCESS_CODE
		} = data

		if (params) {
			url += (url.indexOf('?') !== -1 ? '&' : '?') + urlAppendParameter(params)
		}

		if (loadingOpt) {
			if (typeof loadingOpt === 'boolean') {
				loadingOpt = {
					title: '加载中...',
					mask: true
				}
			} else if (typeof loadingOpt === 'string') {
				loadingOpt = {
					title: loadingOpt,
					mask: true
				}
			}
			uni.showLoading(loadingOpt)
		}

		if (!isOutLink && openServerTimeStamp) {
			// 传输加密

			const serverTimeStamp = store.getters.serverTimeStamp
			// console.log(11111, serverTimeStamp, url)
			// 如果没有时间戳 或者本地时间与之前时间间隔大于1分钟
			if (
				needTimeStamp &&
				(!serverTimeStamp ||
					(serverTimeStamp && (new Date().getTime() - serverTimeStamp) / 1000 / 60 > 1))
			) {
				await store.dispatch('serverTimeStamp/getServerTimeStamp')
			}

			if (needTimeStamp) {
				url = assemblySignatureUrl(url, () => {
					return store.getters.serverTimeStamp || new Date().getTime()
				})
			}

			// console.log(11111, url, store.getters.serverTimeStamp)

			// 传输加密 end
		}

		// 需要登录的接口 确保已登录
		if (!isOutLink && needLogin) {
			await store.dispatch('user/checkLogin')
		}

		if (debug) {
			console.time(data.url)
			console.info(`%c 请求链接参数begin: ${data.url}`, 'color:orange;font-weight:bold')
			console.info(`data：`, data.data)
			console.info(`params：`, params)
			console.info(
				`%c 请求链接参数end------------------------`,
				'color:orange;font-weight:bold'
			)
		}

		let token = store.getters.token

		uni.request({
			url,
			data: data.data,
			method: data.method || 'post',
			dataType: data.dataType || 'json',
			timeout: 10000,
			header: Object.assign(
				{
					Authorization: token
				},
				data.header || {}
			),
			async success(res) {
				if (debug) {
					console.timeEnd(data.url)
					console.info(
						`%c 请求响应结果begin: ${data.url}`,
						'color:green;font-weight:bold'
					)
					console.info(res.data)
					console.info(
						`%c 请求响应结果end------------------------`,
						'color:green;font-weight:bold'
					)
				}
				let code = res.data.code

				if (code === successCode) {
					resolve(res.data)
					return
				} else {
					// 登录过期
					if (API_LOGIN_OUT_CODE.includes(code)) {
						let oldToken = store.getters.token
						// 新的token 尝试重新登录
						if (oldToken === token) {
							store.dispatch('user/setToken', '')
							store.dispatch('user/login')
						}
						resolve(request(orginParams))

						// if (!isLogining) {
						// 	store.dispatch('user/setToken', '')
						// 	isLogining = true
						// 	uni.$emit('need-login')
						// 	uni.$once('login-success', () => {
						// 		isLogining = false
						// 	})
						// }
					
						// if (showToast) {
						// 	uni.showToast({
						// 		title: '登录过期',
						// 		icon: 'none'
						// 	})
						// }

						reject(res.data)
						return
					}
					reject(res.data)

					let message = res.data.message

					if (message && showToast) {
						let arr = []

						if (typeof showToast !== 'boolean') {
							if (Array.isArray(showToast)) {
								arr = showToast
							} else {
								arr = [showToast]
							}
						}

						if (!arr.includes(code)) {
							setTimeout(() => {
								uni.showToast({
									title: message,
									icon: 'none'
								})
							}, 300)
						}
					}
				}
			},
			fail(err) {
				console.log('request fail', err)
				reject(err)
			},
			complete() {
				if (loadingOpt) {
					uni.hideLoading()
				}
			}
		})
	})
}
