import { getAccountInfoSync } from '@/libs/utils/sys'
import { isValidIP } from '@/libs/utils/validate'
let accountInfo = null

// 获取当前帐号信息
// #ifdef MP
accountInfo = getAccountInfoSync()

// #endif
// #ifndef MP
const hostname = location.hostname
const map = {
	localhost: 'develop',
	'dev.xiaoyisz.com': 'develop'
}

const evnOtherMap = {
	development: 'develop',
	uat: 'trial',
	production: 'release'
}
accountInfo = {
	miniProgram: {
		envVersion:
			map[hostname] ||
			(isValidIP(hostname) ? 'develop' : evnOtherMap[process.env.NODE_ENV]) ||
			'release',
		appId: 'wx886334ee78a65655'
	}
}
// #endif
export const CUR_APPID = accountInfo.miniProgram.appId
// env类型
// export const envVersion = accountInfo.miniProgram.envVersion || 'release'
export const envVersion = 'release'

export const ENV = envVersion
export const miniProgramVersion = accountInfo.miniProgram.version || '1.0.0'

// 环境分多个小程序时 上线的小程序
export const isProductApp = CUR_APPID === 'wx886334ee78a65655'

export const isProduct = ENV === 'release'
export const isDev = ENV === 'develop'

// const cdnUrls = {
//     // 开发版
//     develop: 'https://gz-cdn.xiaoyisz.com/xiaoyi-test/uniapp-xy-template/',
//     // 体验版
//     trial: 'https://gz-cdn.xiaoyisz.com/xiaoyi-test/uniapp-xy-template/',
//     // 正式版
//     release: 'https://gz-cdn.xiaoyisz.com/xiaoyi-test/uniapp-xy-template/'
// }

// export const cdnUrl = cdnUrls[ENV || 'release']
