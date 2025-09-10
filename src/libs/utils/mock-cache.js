import { isDev } from '@/config/index'
/**
 * 将驼峰字符转换为中划线字符
 * @param {string} str 需要转换的字符
 * @returns 示例:TButtonTest1 => t-button-test-1
 */
function formatConversion(str) {
	return str.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const setMockCacheData = function(data) {
	if (isDev) {
		if (uni.MOCK_CACHE) {
			uni.MOCK_CACHE = {
				...uni.MOCK_CACHE,
				...data
			}
		} else {
			uni.MOCK_CACHE = {
				...data
			}
		}
	}
}
export const getMockCacheHeader = function(keys) {
	let obj = {}
	if (isDev && keys?.length) {
		keys.forEach(key => {
			let v = getMockCacheData(key)
			if (typeof v !== 'undefined') {
				obj['x-mock-cache-' + formatConversion(key)] = v
			}
		})
	}

	return obj
}

export const clearMockCacheData = function() {
	uni.MOCK_CACHE = null
}

export const remoeMockCacheData = function(key) {
	if (uni.MOCK_CACHE) {
		delete uni.MOCK_CACHE[key]
	}
}

export const getMockCacheData = function(key) {
	let obj = uni.MOCK_CACHE || {}
	if (key) {
		return obj[key]
	}
	return obj
}
