import { isValidURL } from './validate'

const getParams = function(el) {
	let obj = {}
	for (const key in el) {
		if (Object.hasOwnProperty.call(el, key)) {
			if (key.startsWith('param-')) {
				const val = el[key]
				obj[key.replace('param-', '')] = val
			}
		}
	}

	return obj
}

export const checkHtmlClickAction = function(el) {
	let { href, target_type, action_type } = el
	// 跳转h5
	if (href && isValidURL(href)) {
		uni.$ui.navToMix({
			path: href
		})
	} else if (action_type === 'argument') {
		// 打开协议
		uni.$ui.openPolicyPopup(getParams(el))
	} else if (typeof target_type !== 'undefined') {
		uni.$ui.navToMix(el)
	}
}
