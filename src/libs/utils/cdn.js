import { envVersion } from '@/config/index'
import { isValidURL } from '@/libs/utils/validate.js'
import store from '@/store/index.js'
import { API_SUCCESS_CODE } from '@/config/api.js'
const CDN_VER = new Date().getTime()
const configEvn = uni.getStorageSync('configEnvVersion')

// 获取cdn地址
export const getCdnUrl = function(file, fmt, path = '', cache = true) {
	let cdnUrl = store.getters.app.cdnUrl
	if (isValidURL(file)) {
		return file
	}
	// 为配置未完毕
	if (!cdnUrl) {
		return ''
	}
	let ver = (cache && store.getters.version) || CDN_VER
	let hasQuery = file.indexOf('?') !== -1
	let str = (fmt ? '.' + fmt : '') + (cdnUrl ? `${hasQuery ? '&' : '?'}v=` + ver : '')
	let url = cdnUrl + path + file

	if (file.indexOf('{{cdnImageUrl}}') !== -1) {
		url = file.replace('{{cdnImageUrl}}', cdnUrl + 'images')
	} else if (file.indexOf('{{cdnUrl}}') !== -1) {
		url = file.replace('{{cdnUrl}}', cdnUrl)
	}
	return url + str
}
// 获取cdn图片地址
export const getCdnImage = function(file, fmt, path = 'images/') {
	return getCdnUrl(file, fmt, path)
}

// 获取cdn地址 异步
export const getCdnUrlAsync = function() {
	let cdnUrl = store.getters.app.cdnUrl
	if (cdnUrl) {
		return Promise.resolve(cdnUrl)
	}
	return store.dispatch('app/setCdnUrl')
}
// 获取cdn JSON地址
export const getCdnJson = async function(file, path = '', cache = false, fmt = 'json') {
	if (envVersion !== 'release' && (configEvn === 'develop' || !configEvn)) {
		path = path.replace(/^config\//, 'config_dev/')
	}
	await getCdnUrlAsync()
	let url = getCdnUrl(file, fmt, path, cache)

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			headers: {
				'Content-Type': 'application/json'
			},
			success(ret) {
				let data = ret.data
				if (data) {
					try {
						let str = JSON.stringify(data)
						let cdnUrl = store.getters.app.cdnUrl
						str = str.replace(/{{cdnImageUrl}}/g, cdnUrl + 'images')
						str = str.replace(/{{cdnUrl}}/g, cdnUrl)
						data = JSON.parse(str)
					} catch (e) {
						console.log(e)
					}
				}
				if (ret.statusCode === 200) {
					resolve({
						code: API_SUCCESS_CODE,
						data: data
					})
				} else {
					reject({
						code: -1,
						...ret
					})
				}
			},
			fail(ret) {
				reject({
					code: -1,
					...ret
				})
			}
		})
	})
}

// 获取cdn地址
export const getCdnPath = function(file) {
	let cdnUrl = store.getters.app.cdnUrl
	return cdnUrl + file
}

export const setCosImageSize = function(url, pos = '600x600') {
	if (typeof url !== 'string') return ''
	let str = `imageMogr2/thumbnail/${pos}`
	return url + (url.indexOf('?') === -1 ? '?' : '&') + str
}
