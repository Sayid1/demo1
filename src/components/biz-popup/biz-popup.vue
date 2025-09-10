<template>
	<u-popup zIndex="1000000" :round="10" mode="center" :show="show" @close="close" @open="open" :safeAreaInsetBottom="false">
		<view class="content">
			<view class="goods-title">
				{{ goodsInfo.popupTitle }}
			</view>
			<template v-if="getPopupData.popupPic.length > 1">
				<view class="u-flex">
					<view :key="index" v-for="(item, index) in getPopupData.popupPic">
						<ui-image
							style="margin-left:14rpx ;"
							:src="$ui.getCdnImage(`${item.img}.png`)"
							width="210rpx"
							height="275rpx"
						></ui-image>
						<view class="goods-des">
							{{ item.title }}
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<ui-image
					:src="$ui.getCdnImage(`${getPopupData.popupPic[0].img}.png`)"
					width="348rpx"
					height="275rpx"
				></ui-image>
				<view class="goods-des">
					{{ getPopupData.popupPic[0].title }}
				</view>
			</template>
			<view class="u-abso close" @click="close">
				<ui-image
					:src="$ui.getCdnImage(`close.png`)"
					width="60rpx"
					height="60rpx"
				></ui-image>
			</view>
		</view>
	</u-popup>
</template>

<script>
import modal from '@/mixins/modal'
import person from '@/pages/index/components/eat-info-two/person'
export default {
	data() {
		return {
			goodsInfo: {},
			index: 0
		}
	},
	mixins: [modal],
	components: {},
	computed: {
		getPopupData() {
			return person.popupData[this.index]
		}
	},

	methods: {
		open(data, index) {
			if (data) {
				this.goodsInfo = data
				this.index = index
				this.show = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 616rpx;
	height: 580rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 54rpx;
	position: relative;
	// justify-content: center;
	.goods-title {
		display: inline-block;
		font-size: 43rpx;
		font-weight: 600;
		color: #1e3e65;
		line-height: 51rpx;
		background: linear-gradient(
			90deg,
			#d6b36d 0%,
			#d8890d 25%,
			#efd9a5 47%,
			#d8890d 73%,
			#d67900 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 43rpx;
	}
}
.goods-des {
	font-size: 33rpx;
	font-weight: 500;
	color: #1e3e65;
	text-align: center;
	margin-top: 45rpx;
}
.close{
	bottom: -118rpx;
}
</style>
