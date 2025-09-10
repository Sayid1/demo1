<template>
	<view class="wrap">
		<view class="empty">
			<view class="content">
				<ui-image :src="getIconStyle.url" width="141rpx" height="167rpx"></ui-image>
			</view>
			<view class="sub">{{ getIconStyle.text }}</view>
			<template v-if="isBindUserId">
				<!-- <view class="zc" @click="toHome(getIconStyle.path)">
					去自测
				</view> -->
				<view class="count" style="margin-top:47rpx ;" @click="back" v-if="isBindUserId">
					查看更多我关心的人
				</view>
			</template>

			<view class="count" @click="toHome(getIconStyle.path)" v-else>
				{{ getIconStyle.btnText }}
			</view>
		</view>

		<view class="bottom-text">
			<ui-image width="652rpx" height="43rpx" :src="$ui.getCdnImage('bottom-text-new1.png')"></ui-image>
			<view class="copyright mg-t14 color-99" style="width: 652rpx">CHN.2025.64755.AND.1</view>
			<ui-nav-gap :gap="22" type="safe-bottom"></ui-nav-gap>
		</view>
	</view>
</template>

<script>
export default {
	name: 'biz-empty-page',
	data() {
		return {}
	},
	props: {
		type: {
			type: String,
			default: ''
		},
		isBindUserId: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getIconStyle() {
			if (this.type == 'test') {
				return {
					url: this.$ui.getCdnImage(`empty/test-icon.png`),
					text: '暂无测试记录',
					btnText: '点击进行营养自测',
					path: 'index'
				}
			} else if (this.type == 'data') {
				return {
					url: this.$ui.getCdnImage(`empty/data-icon.png`),
					text: '暂无追踪数据',
					btnText: '点击记录食用量及体重数据',
					path: 'calendar-record'
				}
			} else {
				return {
					url: this.$ui.getCdnImage(`empty/calendar.png`),
					text: '暂无食用量建议数据',
					btnText: '点击进行营养自测',
					path: 'index'
				}
			}
		}
	},
	methods: {
		toHome(path) {
			this.$navTo({
				path: path
			})
		},
		back() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
}
.sub {
	font-size: 29rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #1e3e65;
	margin-top: 43rpx;
}
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
}
.count {
	width: 649rpx;
	height: 87rpx;
	text-align: center;
	line-height: 87rpx;
	font-size: 40rpx;
	font-weight: 500;
	color: #1e3e65;
	margin: 0 auto;
	background: #ffffff linear-gradient(90deg, #bd8948 0%, #e3d5ab 49%, #bd8948 100%);
	margin-top: 111rpx;
}
.bottom-text {
	margin-top: auto;
}
.zc {
	width: 649rpx;
	height: 87rpx;
	border: 2rpx solid #c99842;
	font-size: 40rpx;
	font-weight: 400;
	color: #c99842;
	text-align: center;
	line-height: 87rpx;
	margin-top: 111rpx;
}
</style>
