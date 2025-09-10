import { ENV } from './index'

// 是否打开接口传输加密
export const openServerTimeStamp = false

// 未登录code request
export const API_LOGIN_OUT_CODE = [903, 904, 300]
export const API_SUCCESS_CODE = 0
// api
const envApis = {
	// 开发版
	develop: 'https://devapi.xiaoyisz.com/yapekch5',
	// develop: 'https://testapi.xiaoyisz.com/tencent/daily/v1',
	// 体验版
	trial: 'https://devapi.xiaoyisz.com/yapekch5',
	// 正式版
	release: 'https://apig.xiaoyisz.com/yapei'
	// release: 'https://api.xiaoyisz.com/yapei/v1'
}

// 签名配置
const signatureConfig = {
	// 开发版
	[envApis.develop]: {
		clientKey: 'IfWu0xwXlWgqkICA6Wn20qpo6a30hXX5',
		clientSecret: 'A4rHhUJfMjw2I9IODh5g40Ja1d3Yk1CU'
	},
	// 体验版
	[envApis.trial]: {
		clientKey: 'IfWu0xwXlWgqkICA6Wn20qpo6a30hXX5',
		clientSecret: 'A4rHhUJfMjw2I9IODh5g40Ja1d3Yk1CU'
	},
	// 正式版
	[envApis.release]: {
		clientKey: '1XsIBIHSc6Z3FDpmpN4CsPYIGeGtfRB0',
		clientSecret: 'NEMWkv4i6TdLVo0EO2YmquQJidyeoFTL'
	}
}

console.log(ENV, 22222)
export const ApiUrl = envApis[ENV]

export const envSignature = signatureConfig[ApiUrl]
