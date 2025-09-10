/**
 * @description 过期时间
 * @property   {Nunber} expire  时长
 * @property   {String} TimeType  时间类型(默认毫秒)   毫秒 = 'ms'  秒 = 's'  分钟 = 'min' 小时 = 'h' 天 = 'd'  日期类型 = 'date ' === 2020-10-20 12:00:00
 * 不符合时间类型不做过期处理
 */

const _setStorageSync = uni.setStorageSync
const _getStorageSync = uni.getStorageSync

export const getStorageExpireKey = function(key) {
	return key + '_expire_time'
}

export const setStorageSync = function(key, value, expire, TimeType = 'ms') {
	if (expire && TimeType) {
		let time = Math.round(new Date().getTime())
		switch (TimeType) {
			case 'ms':
				time += expire
				break
			case 's':
				time += expire * 1000
				break
			case 'min':
				time += expire * 1000 * 60
				break
			case 'h':
				time += expire * 1000 * 60 * 60
				break
			case 'd':
				time += expire * 1000 * 60 * 60 * 24
				break
			case 'date':
				// expire=2020-10-20 12:00:00
				time = Math.round(new Date(expire).getTime())
				break
			default:
				time = null
		}
		if (time) {
			_setStorageSync(getStorageExpireKey(key), time)
		}
	}
	_setStorageSync(key, value)
}

export const getStorageSync = function(key) {
	let expire = _getStorageSync(getStorageExpireKey(key))
	if (expire && expire < Math.round(new Date().getTime())) {
		uni.removeStorageSync(getStorageExpireKey(key))
		uni.removeStorageSync(key)
	}
	return _getStorageSync(key)
}
