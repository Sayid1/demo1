<template>
	<view class="container">
		<!-- 顶部横向滚动列表 -->
		<scroll-view
			scroll-x
			class="scroll-view"
			scroll-with-animation
			:show-scrollbar="false"
			:scroll-into-view="'top-item-' + activeIndex"
			:scroll-left="-100"
		>
			<view :class="['pd-box', { 'radius-none': activeIndex > 0 }]"></view>
			<view
				v-for="(item, index) in topList"
				:id="'top-item-' + index"
				:key="index"
				:class="[
					'top-item',
					{ active: index === activeIndex },
					{ 'selected-indicator': index === activeIndex }
				]"
				@click="onTopItemClick(index)"
			>
				<view class="top-item-bg"></view>
				<view
					:class="[
						'top-item-bg1',
						{ 'none-bg': index === activeIndex },
						{ 'half-left': index === activeIndex - 1 },
						{ 'half-right': index === activeIndex + 1 }
					]"
				></view>
				<view :class="['top-inner-item']">
					<view
						class="top-inner-content"
						:style="'background-image: url(' + item.icon + ')'"
					>
						<view class="top-item-title">{{ item.name }}</view>
						<view class="top-item-value">{{ item.weight }}</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="bottom-box">
			<!-- 底部横向滚动列表 -->
			<scroll-view
				scroll-x
				class="scroll-view bottom-scroll-view"
				scroll-with-animation
				:show-scrollbar="false"
			>
				<view v-for="(item, index) in curBottomList" :key="index" class="bottom-item">
					<image class="child-img" mode="widthFix" :src="item.icon" />
				</view>
				<view class="bottom-item" v-if="curBottomList.length === 0"></view>
			</scroll-view>
		</view>
		<view class="bottom-tip">左右滑动查看更多</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			activeIndex: 0,
			bottomData: [
				['200ml 牛奶', '25g 奶酪', '125ml 酸奶', '200ml 牛奶', '25g 奶酪', '125ml 酸奶'],
				['200g 牛肉', '150g 鸡蛋'],
				['25g 大豆']
			]
		}
	},
	props: {
		list: {
			type: Array,
			default: () => []
		},
		bottomList: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		topList() {
			return this.list
		},
		curBottomList() {
			return this.bottomList.filter(
				item => item.foodTypeId === this.topList[this.activeIndex].jsonId
			)
		}
	},
	methods: {
		onTopItemClick(index) {
			this.activeIndex = index
		}
	}
}
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f4e2ce;
}

.scroll-view {
	width: 100%;
	display: flex;
	white-space: nowrap;
	overflow: hidden;
	align-items: flex-start;
	&.bottom-scroll-view {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #f4e2ce;
		padding-top: 17rpx;
	}
}
.bottom-box {
	// background-color: #fcf4ea;
	background-color: #f4e2ce;
}
.pd-box {
	width: 38rpx;
	height: 238rpx;
	display: inline-block;
	background-color: #fcf4ea;
	border-bottom-right-radius: 20rpx;
	&.radius-none {
		border-radius: 0;
	}
}
.top-item {
	width: 200rpx;
	height: 238rpx;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0;
	background-color: #f4e2ce;
	position: relative;
	&.selected-indicator {
		.top-inner-item {
			background-color: #f4e2ce;
		}
	}
	.top-item-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 40rpx;
		background-color: #fcf4ea;
	}
	.top-item-bg1 {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40rpx;
		background-color: #fcf4ea;
		&.none-bg {
			display: none;
		}
		&.half-left {
			left: 0;
			right: 50%;
		}
		&.half-right {
			left: 50%;
			right: 0;
		}
	}
	.top-inner-item {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		padding: 16rpx;
		background: #fcf4ea;
		box-sizing: border-box;
		.top-inner-content {
			width: 172rpx;
			height: 200rpx;
			border-radius: 16rpx;
			border: 2rpx solid rgb(246, 234, 221);
			box-sizing: border-box;
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			background-color: #fff;
			overflow: hidden;
			position: relative;
			.top-item-title {
				position: absolute;
				top: 18rpx;
				left: 0;
				text-indent: 18rpx;
				color: rgb(102, 102, 102);
				font-size: 22rpx;
				font-weight: 500;
			}
			.top-item-value {
				position: absolute;
				top: 45rpx;
				left: 0;
				text-indent: 18rpx;
				color: rgb(67, 67, 67);
				font-size: 26rpx;
				font-weight: 500;
			}
		}
	}
}

.top-item.active {
	font-weight: bold;
}

.bottom-item {
	width: 160rpx;
	height: 222rpx;
	display: inline-block;
	margin: 0 10rpx;
	.child-img {
		width: 100%;
		height: 100%;
	}
}
.bottom-tip {
	height: 48rpx;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgb(102, 102, 102);
	font-size: 22rpx;
	font-weight: 500;
}
</style>
