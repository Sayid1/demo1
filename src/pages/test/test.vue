<template>
	<ui-page
		class="page"
		:showHeader="false"
		:customStyle="{
			paddingBottom: '48rpx'
		}"
	>
		<map style="width: 100%; height: 40vh">
			<view
				class="u-flex"
				style="
					background-color: #fff;
					margin-top: 91px;
					width: 90%;
					margin-left: 5%;
					border-radius: 12rpx;
					overflow: hidden;
					padding: 24rpx 24rpx;
				"
			>
				<u-icon name="arrow-left" color="#333" size="24"></u-icon>
				<u-input
					border="none"
					placeholder="请输入内容"
					fontSize="36rpx"
					placeholderStyle="font-size: 36rpx"
				/>
			</view>
		</map>
		<view class="u-m-b-24">
			<u-tabs
				:list="list1"
				@click="onChangeTab"
				:scrollable="false"
				lineColor="#5b4def"
				lineWidth="36"
			></u-tabs>
		</view>
		<scroll-view scroll-y id="tab" :style="{ height: `calc(100vh - ${top}px)` }">
			<view class="u-m-b-68" style="padding: 0 24rpx" v-for="i in 10">
				<view class="u-flex">
					<view class="u-flex u-col-top">
						<view>
							<ui-image
								src="https://dummyimage.com/200x238/0568b9/ffffff.png&text=logo"
								width="200rpx"
								height="238rpx"
							/>
							<view
								class="u-flex u-m-t-24 u-row-center"
								style="
									background-color: #912427;
									color: #fff;
									border-radius: 12rpx;
									height: 78rpx;
								"
							>
								我要预约
							</view>
						</view>
						<view style="margin-left: 24rpx; font-size: 24rpx; font-weight: normal">
							<view style="font-size: 32rpx; font-weight: bold; color: #000">
								北京市海淀区四季青镇敬老院
							</view>
							<view class="u-m-t-12">
								<text style="color: #999">电&nbsp;&nbsp;&nbsp;&nbsp;话：</text>
								1234567890
							</view>
							<view class="u-m-t-12">
								<text style="color: #999">地&nbsp;&nbsp;&nbsp;&nbsp;址：</text>
								北京市海淀区四季青镇敬老院
							</view>
							<view class="u-m-t-12">
								<text style="color: #999">床位数(可订床位数/总床数)：</text>
								196/196
							</view>
							<view class="u-m-t-12">
								<text style="color: #999">预约参观人次数：</text>
								0
							</view>
							<view class="u-m-t-12">
								<text style="color: #999">距&nbsp;&nbsp;&nbsp;&nbsp;离：</text>
								828.02km
							</view>
						</view>
					</view>
				</view>
				<view
					class="u-flex u-flex-col u-row-center u-col-top u-p-l-24"
					style="
						background-color: #f3e7e7;
						color: #912427;
						height: 128rpx;
						width: 100%;
						margin-top: 12rpx;
						border-radius: 8rpx;
						font-size: 28rpx;
					"
				>
					<view class="u-flex">
						<text style="width: 350rpx">总费用：￥3000~3000</text>
						<text>床位费：￥1900~1900</text>
					</view>
					<view class="u-flex">
						<text style="width: 350rpx">膳食费：￥800~800</text>
						<text>服务费：￥300~300</text>
					</view>
				</view>
			</view>
			<view class="safe-area-bottom" />
		</scroll-view>
	</ui-page>
</template>

<script>
export default {
	data() {
		return {
			top: 0,
			current: 0,
			list1: [
				{
					name: '咨询'
				},
				{
					name: '政策'
				},
				{
					name: '标注'
				},
				{
					name: '公示'
				},
				{
					name: '合作'
				}
			]
		}
	},
	onLoad() {
		const res = uni.getSystemInfoSync()
		this.naviBarHeight = 44 + res.statusBarHeight

		const query = uni.createSelectorQuery().in(this)
		query
			.select('#tab')
			.boundingClientRect(data => {
				this.top = data.top
			})
			.exec()
	},
	methods: {
		onClick(index) {
			this.current = index
		}
	}
}
</script>

<style lang="scss" scoped></style>
