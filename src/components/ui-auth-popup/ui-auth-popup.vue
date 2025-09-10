<template>
	<u-popup
		:show="show"
		mode="center"
		:round="getModalProps('radius')"
		@close="close"
		:closeable="getModalProps('showClose')"
		:zIndex="getModalProps('zIndex')"
		:safeAreaInsetBottom="false"
	>
		<view class="auth-popup-wrap">
			<view class="auth-popup-title font-tencent" v-if="getModalProps('title')">
				{{ getModalProps('title') }}
			</view>
			<view class="auth-popup-content">
				<view class="auth-popup-des u-flex u-col-center u-row-center">
					<mpHtml
						v-if="getModalProps('content')"
						@imgtap="richTextClick"
						@linktap="richTextClick"
						:content="getModalProps('content')"
					></mpHtml>
				</view>

				<view class="auth-popup-button" v-if="isMemberType">
					<ui-auth-button
						:strict="getModalProps('strict')"
						@click="goToReg"
						:isPopup="false"
						:flow="0"
						openType="getUserInfo"
					>
						{{ getModalProps('userInfoText') }}
					</ui-auth-button>
				</view>
				<template v-else>
					<view class="auth-popup-button" v-if="showUserInfo">
						<ui-auth-button
							:strict="getModalProps('strict')"
							:isPopup="false"
							:flow="0"
							openType="getUserInfo"
						>
							{{ getModalProps('userInfoText') }}
						</ui-auth-button>
					</view>
					<view class="auth-popup-button" v-if="showPhone">
						<ui-auth-button
							:strict="getModalProps('strict')"
							:isPopup="false"
							:flow="0"
							openType="getPhoneNumber"
						>
							{{ getModalProps('phoneText') }}
						</ui-auth-button>
					</view>
				</template>
			</view>
		</view>
	</u-popup>
</template>

<script>
import modalMixins from '@/mixins/modal.js'
import userMixins from '@/mixins/user.js'
import componentMixins from '@/mixins/components'
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { checkHtmlClickAction } from '@/libs/utils/rich-text'
/**
 * 授权弹窗
 * @description 授权弹窗
 * @property {Boolean} authPhone 是否需要授权手机
 * @property {Boolean} authUserinfo 是否需要授权用户信息
 * @property {Function} success 成功回调
 */
export default {
	components: {
		mpHtml
	},
	props: {
		authPhone: {
			type: Boolean,
			default: uni.$ui.props.authPopup.authPhone
		},
		authUserinfo: {
			type: Boolean,
			default: uni.$ui.props.authPopup.authUserinfo
		},
		flow: {
			type: [Number, String],
			default: uni.$ui.props.authPopup.flow
		},
		title: {
			type: String,
			default: uni.$ui.props.authPopup.title
		},
		phoneText: {
			type: String,
			default: uni.$ui.props.authPopup.phoneText
		},
		userInfoText: {
			type: String,
			default: uni.$ui.props.authPopup.userInfoText
		},
		content: {
			type: String,
			default: uni.$ui.props.authPopup.content
		},
		strict: {
			type: Boolean,
			default: uni.$ui.props.authPopup.strict
		},
		showClose: {
			type: Boolean,
			default: uni.$ui.props.authPopup.showClose
		},
		useRichTextAction: {
			type: Boolean,
			default: uni.$ui.props.authPopup.useRichTextAction
		},
		radius: {
			type: [String, Number],
			default: uni.$ui.props.authPopup.radius
		},

		zIndex: {
			type: Number,
			default: uni.$ui.props.authPopup.zIndex
		}
	},
	name: 'ui-auth-popup',
	mixins: [componentMixins, modalMixins, userMixins],
	data() {
		return {
			event: 'auth-success',
			checked: false,
			showTip: false
		}
	},
	watch: {
		show(val) {
			if (val) {
				uni.$emit('auth-open')
			} else {
				uni.$emit('auth-close')
			}
		},
		checkAuth() {
			if (this.checkAuth) {
				this.successAct()
			}
		}
	},
	computed: {
		disabled() {
			return !(this.checked || !this.isOpenAgreement)
		},
		showPhone() {
			let { isFlow, isGetPhone } = this

			// 非流模式 并且不是手机授权
			if (!isFlow && !isGetPhone) {
				return false
			}

			return !this.isHadMobileAuth && this.getModalProps('authPhone')
		},
		showUserInfo() {
			let { isFlow, isGetUser } = this

			// 非流模式 并且不是用户信息授权
			if (!isFlow && !isGetUser) {
				return false
			}
			return !this.isHadAuth && this.getModalProps('authUserinfo')
		},
		isFlow() {
			return this.getModalProps('flow') > 0
		},
		isMemberType() {
			let flag = this.getModalProps('openType') === 'member'

			return flag
		},
		isGetUser() {
			let flag = this.getModalProps('openType') === 'getUserInfo'

			return flag
		},
		isGetPhone() {
			let flag = this.getModalProps('openType') === 'getPhoneNumber'
			return flag
		},
		checkAuth() {
			return !this.showPhone && !this.showUserInfo
		}
	},
	methods: {
		richTextClick(evt) {
			if (evt['auto-close'] === '1') {
				this.close()
			}
			if (this.getModalProps('useRichTextAction')) {
				checkHtmlClickAction(evt)
			}

			this.emitEvent('htmlClick', evt, this)
		},
		goToReg() {
			this.$navTo('register')
			this.close()
		},
		closeBack() {
			this.checked = false
			this.showTip = false
		},
		successAct() {
			uni.$emit('auth-success')
			this.emitEvent('success')
			this.close()
		},
		iconClose() {
			this.emitEvent('iconClose')
		},

		async checkAuthOpen(opt = {}) {
			await this.$store.dispatch('user/checkUserInfo')

			this.concatOpts(opt)
			if (!this.checkAuth) {
				this.open()
			} else {
				this.successAct()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.auth-popup-wrap {
	width: 600rpx;
	border-radius: 10rpx;
	overflow: hidden;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	font-weight: bold;
	font-size: 30rpx;
	background-color: #fff;
}

.u-border:after {
	border-color: #333;
}

.auth-popup-content {
	border-radius: 10rpx;
	padding: 24rpx;
	margin-top: 24rpx;
}

.auth-popup-title {
	opacity: 1;
	color: rgba(51, 51, 51, 1);
	font-size: 36rpx;
	font-weight: normal;
	text-align: left;
	line-height: 48rpx;
	padding: 24rpx 24rpx 0;
}

.auth-popup-button {
	width: 550rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 160rpx;
	opacity: 1;
	background: linear-gradient(273.37deg, #282828 36.02%, #555555 115.98%);
	color: #fff;
	text-align: center;
	margin-bottom: 24rpx;

	&.disabled {
		background: rgba(234, 234, 234, 1);
		color: #333;
	}
}

.auth-popup-des {
	padding: 20rpx;
	margin-bottom: 20rpx;
	height: 220rpx;
	text-align: center;
	font-size: 30rpx;
}

.close-text {
	padding: 10rpx 0;
	margin: 20rpx 0 0;
	text-align: center;
	color: #999;
	text-align: center;
	text-decoration: underline;
}
</style>
