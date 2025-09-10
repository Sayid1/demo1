// 链接参数对象转字符串
export const param2str = function(obj, sort = false) {
	if (!(obj && obj.toString() === '[object Object]')) return ''
	let str = ''
	let keys = Object.keys(obj)

	if (sort) {
		keys = keys.sort()
	}

	keys.forEach(p => {
		str += `${str ? '&' : '?'}${p}=${obj[p]}`
	})

	return str
}

// 链接传参数对象
export const str2param = function(url) {
	if (typeof url !== 'string') return url

	let arr = url.split('?')
	let search = arr[arr.length - 1].replace(/=/gi, '":"').replace(/&/gi, '","')

	search = '{"' + search + '"}'

	try {
		return JSON.parse(search)
	} catch (err) {
		return ''
	}
}
/**
 * @description: 过滤链接上的参数
 * @param {string} url
 * @param {array | string} keys 需要过滤的参数
 * @return {string} 过滤后的url
 * @author: dubangrong
 */
export const filterUrlParams = function(url, keys = []) {
	if (!keys) return

	let arr = []

	if (Array.isArray(keys)) {
		arr = keys
	} else {
		arr = [keys]
	}

	let query = str2param(url) || {}
	let href = url.indexOf('?') === -1 ? url : url.split('?')[0]

	arr.forEach(v => {
		delete query[v]
	})

	return href + param2str(query)
}

export const joinParamsToUrl = function(url, params) {
	let params2 = {
		...str2param(url),
		...params
	}

	return url.split('?')[0] + param2str(params2)
}
