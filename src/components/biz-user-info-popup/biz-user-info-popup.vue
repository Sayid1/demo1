<!-- 
  * @author [杨开积]
  * @email yangkaiji@hexapodant.com
  * @create date 2024-09-10 14:51:49
  * @modify date 2024-09-10 14:51:49
  * @desc [使用者信息弹窗]
 -->

<template>
	<u-popup
		:safeAreaInsetBottom="false"
		mode="center"
		:round="11"
		:show="show"
		@close="close"
		@open="open"
	>
		<view class="content-box" :class="[{ min: opts.openType === 'normal' }]">
			<view class="title">使用者信息：</view>
			<view class="info-box">
				<view class="info-row">
					<view class="info-item">
						<view class="info-item-title">性别：</view>
						<view class="info-item-content">{{ getUserInfo.sex }}</view>
					</view>
					<view class="info-item">
						<view class="info-item-title">年龄：</view>
						<view class="info-item-content">{{ getUserInfo.age }}岁</view>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item">
						<view class="info-item-title">身高：</view>
						<view class="info-item-content">{{ getUserInfo.height }}cm</view>
					</view>
					<view class="info-item">
						<view class="info-item-title">体重：</view>
						<view class="info-item-content">{{ getUserInfo.weight }}kg</view>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item">
						<view class="info-item-title">BMI：</view>
						<view class="info-item-content">{{ BMI }}</view>
					</view>
					<view class="info-item">
						<view class="info-item-title">每日步数：</view>
						<view class="info-item-content">{{ getUserInfo.steps }}步</view>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item">
						<view class="info-item-title">每日总能量需求：</view>
						<view class="info-item-content">{{ totalEnergy }}Kcal</view>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item">
						<view class="info-item-title">现在进食量是之前正常进食量的：</view>
						<view class="info-item-content">{{ opts.stepCurrent }}%</view>
					</view>
				</view>
			</view>
			<view class="action-box" v-if="opts.openType === 'resultPage'">
				<view class="advice-text">
					<view>建议您维持目前的营养补充方案</view>
					<view>欢迎预约1对1营养师咨询服务</view>
				</view>
				<view class="footer-btn">
					<view class="btn phone" @click="clickPhone">
						致电雅培医学营养关爱热线
					</view>
					<view class="btn wx" @click="toPage">
						一键在线预约
					</view>
					<view class="back-home" @click="toHome">
						返回重测
					</view>
				</view>
			</view>
			<view class="action-box" v-if="opts.openType === 'normal'">
				<view class="big-text">
					<view>营养缺口评测结果</view>
					<view style="margin-top: 60rpx">
						<image
							class="icon-tip-light"
							:src="$ui.getCdnImage('common/icon-tip-light.png')"
						/>
						{{ opts.nutrientGapNum }}kcal
					</view>
				</view>
				<view class="footer-btn">
					<view class="btn wx short" @click="next">
						下一步
					</view>
				</view>
			</view>
			<!-- <view class="copyright mg-t14 color-99" style="height: 220rpx;">CHN.2025.64755.AND.1</view> -->
			<view class="close-btn" @click="close">
				<image class="close-img" :src="$ui.getCdnImage('close.png')" />
			</view>
		</view>
	</u-popup>
</template>

<script>
import modal from '@/mixins/modal'
export default {
	data() {
		return {
			opts: {}
		}
	},
	mixins: [modal],
	computed: {
		getUserInfo() {
			return this.$store.state.pageInfo.userInfo || {}
		},
		totalEnergy() {
			return this.$store.state.pageInfo.total || 0
		},
		BMI() {
			return this.$store.getters['pageInfo/BMI']
		}
	},
	methods: {
		openPopup(options) {
			this.show = true
			this.opts = options
		},
		close() {
			this.show = false
		},
		toHome() {
			this.$store.commit('pageInfo/SET_CURRENT_PAGE', 'home')
		},
		next() {
			this.close()
			this.$emit('next')
		},
		clickPhone() {
			uni.makePhoneCall({
				phoneNumber: '400-920-2660',
				success: function(e) {
					console.log(e)
				},
				fail: function(e) {
					console.log(e)
				}
			})
		},
		toPage() {
			this.$navToMix({
				path: 'pages/reservation/index?source=appointment-v',
				appId: 'wxb8f4bdf7649c015c'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content-box {
	width: 678rpx;
	height: 1085rpx;
	padding: 0 15rpx;
	&.min {
		height: 920rpx;
	}

	.gradient-font {
		background-image: linear-gradient(
			90deg,
			#d6b36d 0%,
			#d8890d 25%,
			#efd9a5 47%,
			#d8890d 73%,
			#d67900 100%
		);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	.title {
		font-weight: 500;
		font-size: 36rpx;
		color: #c99842;
		margin: 25rpx 0 14rpx;
		padding-left: 20rpx;
	}

	.info-box {
		padding-left: 20rpx;
		.info-row {
			display: flex;
			margin-bottom: 25rpx;

			.info-item {
				flex: 1;
				display: flex;

				.info-item-title,
				.info-item-content {
					font-weight: 500;
					font-size: 33rpx;
					color: #1e3e65;
				}
			}
		}
	}

	.action-box {
		.advice-text {
			margin: 76rpx 0 58rpx;
			font-weight: bold;
			font-size: 43rpx;
			color: #1e3e65;
			text-align: center;
		}
		.icon-tip-light {
			width: 76rpx;
			height: 71rpx;
			margin-right: 45rpx;
		}

		.big-text {
			font-weight: bold;
			margin: 40rpx 0 80rpx;
			text-align: center;
			font-size: 58rpx;
			color: #c99842;
		}

		.footer-btn {
			.phone {
				border: 2rpx solid #c99842;
				font-size: 40rpx;
				font-weight: 400;
				color: #c99842;
			}

			.btn {
				width: 630rpx;
				height: 87rpx;
				text-align: center;
				line-height: 87rpx;
				margin: 0 auto;
			}

			.wx {
				background: linear-gradient(90deg, #bd8948 0%, #e3d5ab 49%, #bd8948 100%);
				font-size: 40rpx;
				font-weight: 400;
				color: #1e3e65;
				margin-top: 47rpx;
			}
			.short {
				width: 333rpx;
			}

			.back-home {
				display: flex;
				justify-content: center;
				font-weight: 500;
				font-size: 36rpx;
				color: #878787;
				line-height: 42rpx;
				text-align: center;
				text-decoration-line: underline;
				margin-top: 40rpx;
			}
		}
	}

	.close-btn {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -125rpx;
		width: 72rpx;
		height: 72rpx;

		.close-img {
			width: 72rpx;
			height: 72rpx;
		}
	}
}
</style>
