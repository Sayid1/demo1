function getUserConfig(userInfo, key, defaultKey) {
	let fn = uni.$ui?.mixins?.user?.[key]
	if (typeof fn === 'function') {
		return fn(userInfo)
	} else {
		return userInfo[fn || defaultKey]
	}
}
export default {
	computed: {
		userInfo() {
			return this.$store.getters.userInfo || {}
		},
		// 是否注册
		isMember() {
			return getUserConfig(this.userInfo, 'isMember', 'isMember')
		},
		// 是否已授权
		isHadAuth() {
			return getUserConfig(this.userInfo, 'result', 'result') == 0 ? true : false
		},
		// 是否已授权手机号
		isHadMobileAuth() {
			return getUserConfig(this.userInfo, 'mobile', 'mobile') == 1 ? false : true
		},
		// 授权所有
		isHadAuthAll() {
			let { isHadMobileAuth, isHadAuth } = this
			let fn = uni.$ui?.mixins?.user?.isHadAuthAll
			if (typeof fn === 'function') {
				return fn({ isHadAuth, isHadMobileAuth }, this)
			} else {
				return isHadAuth && isHadMobileAuth
			}
		}
	}
}
