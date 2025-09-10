export const getSetting = function(type) {
	if (!type) {
		console.error('type值为null')
		return
	}
	return new Promise(resolve => {
		uni.getSetting({
			success(res) {
				resolve(res.authSetting[type])
			}
		})
	})
}

// 检查授权情况
export const checkSettingAuth = function({ scope, modal, showModal = true }) {
	return new Promise((resolve, reject) => {
		getSetting(scope).then(isAuth => {
			const fn = () => {
				uni.openSetting({
					success: res => {
						if (res.authSetting[scope]) {
							uni.showToast({
								title: '授权成功',
								icon: 'none'
							})
							resolve(isAuth)
						} else {
							uni.showToast({
								title: '授权失败',
								icon: 'none'
							})
							reject()
						}
					}
				})
			}
			// 如果拒绝过授权或者关闭授权
			if (isAuth === false) {
				if (!showModal) {
					fn()
					return
				}

				uni.showModal({
					title: '提示',
					content: '需要授权',
					confirmText: '授权',
					...modal,
					success: ({ confirm }) => {
						if (confirm) {
							fn()
						} else {
							reject()
						}
					},
					fail(err) {
						reject(err)
					}
				})
			} else {
				resolve(isAuth)
			}
		})
	})
}

// 检查相机授权情况
export const checkCameraAuth = function(opts = {}) {
	opts.content = opts.content || '请求授权你的相机'

	return checkSettingAuth({
		scope: 'scope.camera',
		...opts
	})
}

// 检查相册授权情况
export const checkAlbumAuth = function(opts = {}) {
	opts.content = opts.content || '请求授权你的相册'
	return checkSettingAuth({
		scope: 'scope.writePhotosAlbum',
		...opts
	})
}

// 检查位置授权情况
export const checkLocationAuth = function(opts = {}) {
	opts.content = opts.content || '请求授权你的位置信息'
	return checkSettingAuth({
		scope: 'scope.userLocation',
		...opts
	})
}
