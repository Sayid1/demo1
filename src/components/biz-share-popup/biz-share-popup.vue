<template>
	<u-popup
		:safeAreaInsetBottom="false"
		:round="10"
		mode="center"
		:show="show"
		@close="close"
		@open="open"
	>
		<template v-if="propsType == 'enter'">
			<view class="content">
				<view class="ava">
					<ui-image
						shape="circle"
						width="145rpx"
						height="145rpx"
						:src="getAva"
					></ui-image>
				</view>
				<view class="des">
					同意和
					<text style="color: #C99842;margin:0 10rpx ;">
						{{ getUserName }}
					</text>
					<view style="text-align: center;">分享我的营养情况</view>
					<!-- <text style="color: #C99842;margin:0 10rpx ;">{{ info.nickName || '微信用户' }}</text> -->
				</view>
				<view class="footer">
					<view class="btn close" @click="close">取消</view>
					<view class="btn confirm" @click="enter">确认</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="content1">
				<view class="icon">
					<ui-image
						width="123rpx"
						height="123rpx"
						:src="$ui.getCdnImage('share/share-icon.png')"
					></ui-image>
				</view>
				<view class="des">
					当前链接已失效
				</view>
				<view class="footer">
					<view class="btn confirm" @click="close">确认</view>
				</view>
			</view>
		</template>
	</u-popup>
</template>

<script>
import modal from '@/mixins/modal'
import { fetchUserBindUser } from '@/api/share/index'
export default {
	data() {
		return {
			propsType: '',
			info: null,
			defineAva:
				'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
		}
	},
	mixins: [modal],
	computed: {
		getAva() {
			if(!this.info){
				return
			}
			return this.info.ava !== 'undefined'
				? decodeURIComponent(this.info.ava)
				: this.defineAva
		},
		getUserName() {
			if(!this.info){
				return
			}
			return this.info.nickName !== 'undefined' ? this.info.nickName : '微信用户'
		}
	},
	methods: {
		open(e) {
			console.log(2222,e);
			if (e.type) {
				this.propsType = e.type
				if (e.userInfo) {
					this.info = e.userInfo
				}

				this.show = true
			}
		},
		enter() {
			fetchUserBindUser({
				keyId: this.info.keyId,
				bindUserId: this.info.bindUserId
			}).then(res => {
				this.$emit('shareConfirm')
				this.close()
			})
		},
		close() {
			this.$emit('shareConfirm')
			this.show = false
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 616rpx;
	// height: 466rpx;
	background: #ffffff;
	border-radius: 22rpx 22rpx 22rpx 22rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 67rpx 31rpx 31rpx 33rpx;
	.des {
		margin-top: 38rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #1e3e65;
	}
	.footer {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 16rpx;
		margin-top: 47rpx;
		.btn {
			width: 246rpx;
			height: 87rpx;
			line-height: 87rpx;
			font-size: 40rpx;
			font-weight: 400;
		}
		.close {
			background: #ffffff;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			opacity: 1;
			border: 2rpx solid #c99842;
			text-align: center;
			color: #c99842;
		}
		.confirm {
			background: #ffffff linear-gradient(90deg, #bd8948 0%, #e3d5ab 49%, #bd8948 100%);
			font-size: 40rpx;
			font-weight: 400;
			color: #1e3e65;
			text-align: center;
		}
	}
}

.content1 {
	width: 616rpx;
	height: 466rpx;
	background: #ffffff;
	border-radius: 22rpx 22rpx 22rpx 22rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 72rpx 31rpx 31rpx 33rpx;
	.des {
		font-size: 36rpx;
		font-weight: 500;
		color: #1e3e65;
		margin-top: 54rpx;
		margin-bottom: 47rpx;
	}
	.footer {
		.confirm {
			width: 246rpx;
			height: 87rpx;
			background: #ffffff linear-gradient(90deg, #bd8948 0%, #e3d5ab 49%, #bd8948 100%);
			text-align: center;
			line-height: 87rpx;
			font-size: 40rpx;
			font-weight: 400;
			color: #1e3e65;
		}
	}
}
</style>
