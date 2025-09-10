/* eslint-disable */
let wxSdk = null
// #ifdef H5
import wx from 'weixin-js-sdk'
wxSdk = wx
// #endif
export const wxSdkjs = wxSdk
// 是否是公众号
export const isWechat = function() {
	// #ifdef H5
	let ua = window.navigator.userAgent.toLowerCase()
	if (
		ua.match(/miniprogramhtmlwebview/i) != 'miniprogramhtmlwebview' &&
		ua.match(/micromessenger/i) == 'micromessenger'
	) {
		return true
	} else {
		return false
	}
	// #endif
	// #ifndef H5
	return false
	// #endif
}

/**
 * @description: 微信sdk 初始化
 * @return {*}
 * @author: dubangrong
 */
export const initWxJssdk = function() {
	return
}

// 是否内嵌小程序
export const isInWebView = function() {
	return new Promise(resolve => {
		// #ifdef H5
		let ua = window.navigator.userAgent.toLowerCase()
		if (ua.match(/micromessenger/i) == 'micromessenger' && wxSdkjs?.miniProgram?.getEnv) {
			wxSdkjs.miniProgram.getEnv(function(res) {
				resolve(res.miniprogram)
			})
		} else {
			resolve(false)
		}
		// #endif
		// #ifndef H5

		return resolve(false)
		// #endif
	})
}

export const setWXConfig = function() {
	isInWebView().then(ret => {
		if (ret) {
			const config = {
				debug: true, // 开启调试模式
				jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'scanCode'], // 必填，需要使用的JS接口列表
				openTagList: ['wx-open-launch-weapp']
			}
			wxSdk.config(config)
		}
	})
}

// 公众号授权
export const toWxAuth = function(redirect_uri, scope) {
	const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0cb49c633395fa13&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=online&connect_redirect=1#wechat_redirect`
	location.href = url
	return url
}

// 公众号静默登录
export const toWxBaseAuth = function(redirect_uri) {
	return toWxAuth(redirect_uri, 'snsapi_base')
}

// 公众号用户信息授权
export const toWxUserinfoAuth = function(redirect_uri, scope) {
	return toWxAuth(redirect_uri, 'snsapi_userinfo')
}
