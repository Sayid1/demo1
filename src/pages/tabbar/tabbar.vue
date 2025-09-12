<template>
	<ui-page
		class="page"
		:customStyle="{
			paddingBottom: '48rpx',
			overflow: 'hidden',
			height: showOver ? '100vh' : 'auto'
		}"
	>
		<view slot="header" class="u-flex">
			<view class="u-margin-left-10">区域养老服务中心</view>
		</view>
		<view
			v-show="showOver"
			style="
				width: 100vw;
				height: 100vh;
				background-color: rgba(0, 0, 0, 0.4);
				z-index: 1;
				position: fixed;
				top: 0;
				left: 0;
			"
		></view>
		<view style="z-index: 2; background-color: #fff; position: relative; padding: 24rpx">
			<u-search shape="square"></u-search>
			<view
				style="
					background-color: #f5f7f6;
					height: 24rpx;
					margin: 0 -24rpx;
					margin-top: 24rpx;
				"
			></view>
		</view>

		<view style="background-color: #fff; padding: 0 24rpx; z-index: 2; position: relative">
			<view style="color: #000">机构数103</view>
			<view class="u-m-t-24 u-rela" style="z-index: 2">
				<view class="u-flex" style="color: #000">
					<view class="u-flex u-flex-1 u-row-center" @click="showOver = true">
						地区
						<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
					</view>
					<view class="u-flex u-flex-1 u-row-center" @click="showOver = true">
						筛选
						<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
					</view>
					<view class="u-flex u-flex-1 u-row-center" @click="showOver = true">
						排序
						<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
					</view>
				</view>
				<view
					v-show="showOver"
					class="u-abso u-m-t-24 u-p-t-24"
					style="
						width: 100vw;

						background-color: #fff;
						z-index: 9;
						left: -24rpx;
						border-top: 1px solid #eeeeee;
					"
				>
					<view style="overflow: auto; max-height: 50vh; padding-bottom: 150rpx">
						<view>
							<view style="font-weight: 600; padding-left: 48rpx">天津市</view>
							<view class="u-flex u-p-l-48 u-p-r-48 u-m-t-24 u-flex-wrap">
								<text
									v-for="i in 16"
									class="u-flex u-row-center u-m-r-12 u-m-b-12 u-p-12"
									style="
										background-color: #f7f8fa;
										color: #555555;
										width: calc(33.33% - 12rpx);
									"
								>
									和平区
								</text>
							</view>
						</view>
						<view class="u-m-t-48">
							<view style="font-weight: 600; padding-left: 48rpx">河北省</view>
							<view class="u-flex u-p-l-48 u-p-r-48 u-m-t-24 u-flex-wrap">
								<text
									v-for="i in 16"
									class="u-flex u-row-center u-m-r-12 u-m-b-12 u-p-12"
									style="
										background-color: #f7f8fa;
										color: #555555;
										width: calc(33.33% - 12rpx);
									"
								>
									石家庄市
								</text>
							</view>
						</view>
					</view>
					<view
						class="u-abso u-flex u-p-l-24 u-p-r-24 u-row-between u-p-t-24 u-p-b-24"
						style="
							border-top: 1px solid #eeeeee;
							left: 0;
							bottom: 0;
							width: 100%;
							background-color: #fff;
						"
					>
						<view style="width: 47%" @click="showOver = false">
							<u-button type="primary" :plain="true" text="清空"></u-button>
						</view>
						<view style="width: 47%" @click="showOver = false">
							<u-button text="确定" color="#568c96"></u-button>
						</view>
					</view>
				</view>
			</view>
			<view
				style="
					background-color: #f6edde;
					color: #bf7c3f;
					padding: 32rpx;
					margin: 24rpx -24rpx;
					font-size: 28rpx;
				"
			>
				以下信息由区域养老服务中心提供，详情请与机构联系
			</view>
		</view>
		<scroll-view scroll-y id="tab" style="height: calc(100vh - 302px)">
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
			showOver: false
		}
	},
	onLoad() {
		const res = uni.getSystemInfoSync()
		this.naviBarHeight = 44 + res.statusBarHeight

		const query = uni.createSelectorQuery().in(this)
		query
			.select('#tab')
			.boundingClientRect(data => {
				console.log('得到布局位置信息' + JSON.stringify(data))
				console.log('节点离页面顶部的距离为' + data.top)
			})
			.exec()
	},
	methods: {}
}
</script>

<style lang="scss" scoped></style>
