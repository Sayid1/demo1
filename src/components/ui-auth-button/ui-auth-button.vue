<template>
	<button
		v-if="!(hideAfterAuth && !openType2)"
		class=""
		:class="{
			'no-style-btn': !type
		}"
		:style="{
			display: inline ? 'inline-block' : ''
		}"
		:type="type"
		:open-type="openType2"
		@click.stop="click"
		@getphonenumber="getphonenumber"
		:data-share-type="shareType"
		:data-share-param="shareParam"
	>
		<slot></slot>
	</button>
</template>

<script>
import { fetchWxUserInfoReport, fetchWxMobileReport, fetchWxLogin } from '@/api/user'
import userMixins from '@/mixins/user.js'
import componentsMixins from '@/mixins/components.js'
/**
 * 授权按钮
 * @description 授权按钮
 * @property {String} openType
 * 	@value getUserInfo 绑定用户信息
 * 	@value getPhoneNumber 绑定手机
 *  @value share 分享
 * @property {Boolean} strict
 * 	@value true 必须授权
 *  @value false 可以跳过授权
 * @property {Boolean} hideAfterAuth
 * 	@value true 授权完隐藏
 *  @value false 授权完不隐藏
 * @property {String} type
 * 	@value '' 不显示按钮默认属性
 *  @value primary
 *  @value default
 *  @value warn
 * @property {Function} click 授权成功
 * @property {Function} click-alway 点击即触发
 * @property {Number} flow 流程模式 例如根据 openType 决定谁先弹窗 在弹另一个
 *  @value 0 默认
 *  @value 1 启动 两个必须授权
 *  @value 2 启动 只需要手机 待开发
 *  @value 3 启动 只需要用户信息 待开发
 *  @value 4 如果剩下一个 直接弹窗
 * @property {Boolean} isPopup 是否弹自定义弹窗
 * @property {Object} popupOptions popup配置
 *  @value {
 *     	title
 *  	phoneText
 *  	userInfoText
 *  	content
 * 		closeText
 *	}
 * @property {Boolean} inline
 * 	@value 行内
 *  @value 块级
 * @property {String} shareType 分享类型
 * @property {Object} shareParam 分享参数
 * @property {String} authDesc 授权描述
 */
export default {
	name: 'ui-auth-button',
	mixins: [userMixins, componentsMixins],
	props: {
		strict: {
			type: Boolean,
			default: uni.$ui.props.authButton.strict
		},
		openType: {
			type: String,
			default: uni.$ui.props.authButton.openType
		},
		hideAfterAuth: {
			type: Boolean,
			default: uni.$ui.props.authButton.hideAfterAuth
		},
		type: {
			type: String,
			default: uni.$ui.props.authButton.type
		},
		shareParam: {
			type: Object,
			default: uni.$ui.props.authButton.shareParam
		},
		flow: {
			type: [Number, String],
			default: uni.$ui.props.authButton.flow
		},
		isPopup: {
			type: Boolean,
			default: uni.$ui.props.authButton.isPopup
		},
		popupOptions: {
			type: Object,
			default: uni.$ui.props.authButton.popupOptions
		},
		inline: {
			type: Boolean,
			default: uni.$ui.props.authButton.inline
		},
		shareType: {
			type: String,
			default: uni.$ui.props.authButton.shareType
		},
		authDesc: {
			type: String,
			default: uni.$ui.props.authButton.authDesc
		},
		authAlways: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			loginloading: false
		}
	},
	computed: {
		isGetUser() {
			let flag = this.openType2 === 'getUserInfo'

			return flag
		},
		isGetPhone() {
			let flag = this.openType2 === 'getPhoneNumber'

			return flag
		},
		isPopup2() {
			let { isHadMobileAuth, isHadAuth, isPopup, isHadAuthAll } = this

			return (
				isPopup ||
				(this.flow + '' === '4' && (isHadMobileAuth || isHadAuth) && !isHadAuthAll)
			)
		},
		openType2() {
			let { openType, isFlow, isHadMobileAuth, isHadAuth, isPopup2, authAlways } = this

			if (openType === 'share' || authAlways) return openType

			if (isPopup2) return ''

			let isGetUser = openType === 'getUserInfo'
			let isGetPhone = openType === 'getPhoneNumber'

			if (isFlow) {
				// 先授权用户信息
				if (isGetUser) {
					// 用户信息未授权
					if (!isHadAuth) {
						return 'getUserInfo'
					}
					// 手机未授权
					else if (isHadAuth && !isHadMobileAuth) {
						return 'getPhoneNumber'
					} else {
						return ''
					}
				}
				// 先授权手机
				else if (isGetPhone) {
					// 手机未授权
					if (!isHadMobileAuth) {
						return 'getPhoneNumber'
					}
					// 用户信息未授权
					else if (isHadMobileAuth && !isHadAuth) {
						return 'getUserInfo'
					} else {
						return ''
					}
				} else {
					return ''
				}
			} else {
				if (isGetUser && !isHadAuth) {
					return 'getUserInfo'
				}
				if (isGetPhone && !isHadMobileAuth) {
					return 'getPhoneNumber'
				}
				return ''
			}
		},
		isFlow() {
			return this.flow > 0
		}
	},
	methods: {
		login() {
			this.loginloading = true
			uni.showLoading()
			return fetchWxLogin()
				.then(ret => {
					this.loginloading = false
					this.$store.dispatch('user/setToken',JSON.parse(ret.data).token )
					uni.hideLoading()
				})
				.catch(() => {
					this.loginloading = false
					uni.hideLoading()
				})
		},
		checkLoginLoading() {
			return new Promise(resolve => {
				if (this.loginloading) {
					setTimeout(() => {
						resolve(this.checkLoginLoading())
					}, 300)
				} else {
					resolve(true)
				}
			})
		},
		openAuth() {
			let { openType, flow, isPopup2, strict, popupOptions } = this

			this.$ui.openAuth({
				...popupOptions,
				flow,
				openType,
				isPopup: isPopup2,
				strict
			})
			//先注销其他的
			uni.$off('auth-success')
			uni.$once('auth-success', this.authFlowSuccess)
		},
		async click(evt) {
			this.$emit('clickAlway', evt)
			let {
				isFlow,
				isHadMobileAuth,
				isHadAuth,
				isPopup2,
				openType,
				isMember,
				authAlways
			} = this
			if (openType === 'share' || authAlways) return
			if (this.isGetPhone) {
				this.login()
			}
			if (isPopup2) {
				await this.$store.dispatch('user/checkUserInfo')
				if (
					(isFlow && !(isHadMobileAuth && isHadAuth)) ||
					(!isFlow && openType === 'getUserInfo' && !isHadAuth) ||
					(!isFlow && openType === 'getPhoneNumber' && !isHadMobileAuth) ||
					(!isFlow && openType === 'member' && !isMember)
				) {
					this.openAuth()
				} else {
					this.emitClick(true)
				}

				return
			}

			if (this.isGetUser) {
				if (this.isHadAuth) {
					this.emitClick(true)
					return
				}
				this.login()
				uni.getUserProfile({
					desc: this.authDesc,
					success: async res => {
						if (res.errMsg === 'getUserProfile:ok') {
							this.$emit('getuserinfo', {
								errMsg: 'getUserInfo:ok',
								detail: res
							})

							await this.checkLoginLoading()
							this.getuserInfo(res)
						}
					},
					fail(res) {
						console.log(res)
						uni.$emit('ui-auth-userinfo', { status: 0 })
					}
				})
			} else if (this.isGetPhone) {
				if (this.isHadMobileAuth) {
					this.emitClick(true)
					return
				}

				//this.getphonenumber()
			} else {
				this.emitClick(true)
			}
		},
		async getphonenumber(e) {
			let { success, strict } = this

			let tag = (e && e.detail) || {}

			if (tag.errMsg === 'getPhoneNumber:ok') {
				if (!tag.encryptedData) {
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					})
					return
				}

				let data = {
					encryptedData: tag.encryptedData,
					iv: tag.iv,
					wxAppId:uni.getAccountInfoSync().miniProgram.appId || 'wx10a0114c1b604f2c'
				}

				await this.checkLoginLoading()

				fetchWxMobileReport(data)
					.then(async () => {
						await this.$store.dispatch('user/setUserInfoAsync')
						console.log('fetchWxUserInfoReport phone')
						success()
						uni.$emit('wx-auth-phone', { status: 1 })
					})
					.catch(async err => {
						console.log(err)
						console.log('fetchWxUserInfoReport phone err')
						if (!strict) {
							success(false)
						}
						uni.showToast('授权失败请重新授权')
						uni.$emit('wx-auth-phone', { status: -1 })
					})
			} else {
				if (!strict) {
					success(false)
				}
				uni.$emit('wx-auth-phone', { status: 0 })
			}
		},
		getuserInfo(e) {
			let { success, strict } = this

			let tag = e

			if (tag.errMsg === 'getUserProfile:ok') {
				if (!tag.iv) {
					uni.showModal({
						title: '您的微信版本太低，请升级您的微信'
					})
					return
				}

				let data = {
					encryptedData: tag.encryptedData,
					iv: tag.iv,
					rawData: tag.rawData,
					signature: tag.signature
				}
				fetchWxUserInfoReport(data)
					.then(async () => {
						await this.$store.dispatch('user/setUserInfoAsync')
						success()
						uni.$emit('ui-auth-userinfo', { status: 1 })
					})
					.catch(() => {
						if (!strict) {
							success(false)
						}
						uni.showToast('授权失败请重新授权')
						uni.$emit('ui-auth-userinfo', { status: -1 })
					})
			} else {
				if (!strict) {
					success(false)
				}
			}
		},
		emitClick(flag) {
			let { isFlow, isHadMobileAuth, isHadAuth, authAlways } = this

			if (authAlways) {
				this.$emit('click', flag)
			} else {
				// 流模式
				if (isFlow && !(isHadMobileAuth && isHadAuth)) {
					this.openAuth()
				} else {
					this.$emit('click', flag)
				}
			}
		},
		success(flag = true) {
			this.emitClick(flag)
		},
		authFlowSuccess() {
			this.$emit('click', true)
		}
	},
	beforeDestroy() {
		uni.$off('auth-success', this.authFlowSuccess)
	}
}
</script>

<style lang="scss"></style>
