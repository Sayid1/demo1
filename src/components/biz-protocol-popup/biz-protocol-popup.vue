<template>
	<u-popup
		:safeAreaInsetBottom="false"
		:round="10"
		mode="center"
		:show="show"
		@close="close"
		@open="open"
		:closeOnClickOverlay="false"
	>
		<view class="content">
			<view class="head-title">
				温馨提示
			</view>
			<view class="text">
				<view>
					本人已阅读
					<span
						@click="toAgreementPage"
						style="color: #E3D4AA;text-decoration: underline;"
					>
						《个人信息保护政策》
					</span>
					,知悉同意雅培为本政策所述目的:
				</view>
			</view>
			<view class="agreement-list">
				<view class="item" @click="checkAgreement('agreement1')">
					<view class="label">
						<view
							class="check"
							style="margin-bottom: 10rpx;;font-size: 35rpx;display: flex;justify-content: center;align-items: center;"
						>
							<text v-if="!agreement1">√</text>
						</view>
						<!-- <ui-image
								v-else
								:src="$ui.getCdnImage('gou2.png')"
								width="36.23rpx"
								height="36.23rpx"
							></ui-image> -->
					</view>
					<text>按照上述方式处理我的个人信息</text>
				</view>
				<view
					class="item"
					style="margin-top: 21.74rpx;"
					@click="checkAgreement('agreement2')"
				>
					<view class="label">
						<view
							class="check"
							style="margin-bottom: 10rpx;;font-size: 35rpx;display: flex;justify-content: center;align-items: center;"
						>
							<view v-if="!agreement2">√</view>
						</view>
						<!-- <ui-image
								v-else
								:src="$ui.getCdnImage('gou2.png')"
								width="36.23rpx"
								height="36.23rpx"
							></ui-image> -->
					</view>
					<view>为准确计算营养缺口的目的处理本人敏感个人信息</view>
				</view>
			</view>
			<view class="bottom-btn">
				<button
					class="confirm"
					open-type="agreePrivacyAuthorization"
					@agreeprivacyauthorization="confirm"
				>
					同意
				</button>
				<view class="close" @click="toGuidePage">
					不同意
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import modal from '@/mixins/modal'
export default {
	data() {
		return {
			agreement1: false,
			agreement2: false
		}
	},
	mixins: [modal],
	components: {},
	methods: {
		toAgreementPage() {
			this.$navTo({
				path: 'web',
				query: {
					src: encodeURIComponent(this.$ui.getCdnUrl('agreement/agreement2.html')),
					title: '隐私协议'
				}
			})
		},
		confirm(e) {
			this.$emit('confirm')
			this.close()
		},
		openPrivacyContract() {
			wx.openPrivacyContract({
				success: res => {
					console.log('openPrivacyContract success')
				},
				fail: res => {
					console.error('openPrivacyContract fail', res)
				}
			})
		},
		checkAgreement(agreement) {
			// this[agreement] = !this[agreement]
		},
		toGuidePage() {
			this.$navTo('guide-page', null, 'reLaunch')
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 616rpx;
	height: 752rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 54rpx 51rpx 43rpx 51rpx;
}
.head-title {
	background-image: linear-gradient(
		90deg,
		#d6b36d 0%,
		#d8890d 25%,
		#efd9a5 47%,
		#d8890d 73%,
		#d67900 100%
	);
	background-clip: text;
	font-size: 43rpx;
	font-weight: 600;
	-webkit-background-clip: text;
	color: transparent;
}
.text {
	font-size: 33rpx;
	font-weight: 400;
	color: #1e3e65;
	margin-top: 42rpx;
}
.bottom-btn {
	margin-top: 22rpx;
	.confirm {
		width: 522rpx;
		height: 87rpx;
		display: flex;
		align-items: center;
		padding-left: 36rpx;
		background: #1e3e65;
		font-size: 40rpx;
		font-weight: 400;
		color: #ffffff;
		border-radius: 0;
	}
	.close {
		width: 522rpx;
		height: 87rpx;
		display: flex;
		align-items: center;
		padding-left: 11rpx;
		background: #ffffff;
		font-size: 33rpx;
		font-weight: 400;
		color: #c7c7c7;
		margin-top: 29rpx;
	}
}
.agreement-list {
	margin-top: 25.36rpx;
	.item {
		font-size: 33rpx;
		font-weight: 400;
		color: #1e3e65;
		display: flex;
		// align-items: center;
		.label {
			margin-top: 4rpx;
			margin-right: 18.12rpx;
		}
		.check {
			width: 36rpx;
			height: 36rpx;
			border: 2rpx solid #1e3e65;
		}
	}
}
</style>
