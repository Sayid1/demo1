<template>
	<ui-page
		class="page"
		:customStyle="{
			padding: '0 24rpx',
			paddingTop: '24rpx',
			paddingBottom: '48rpx'
		}"
	>
		<view slot="header" class="u-flex">
			<view class="u-margin-left-10">区域养老服务中心</view>
		</view>
		<u-search shape="square"></u-search>
		<view style="background-color: #f5f7f6; height: 24rpx; margin: 24rpx -24rpx"></view>
		<view>
			<view style="color: #000">机构数103</view>
			<view class="u-flex u-m-t-24" style="color: #000">
				<view class="u-flex u-flex-1 u-row-center">
					地区
					<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
				</view>
				<view class="u-flex u-flex-1 u-row-center">
					筛选
					<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
				</view>
				<view class="u-flex u-flex-1 u-row-center">
					排序
					<u-icon name="arrow-down-fill" color="#333" size="10"></u-icon>
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
		<view class="u-flex u-m-t-24">
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
	</ui-page>
</template>

<script>
export default {
	data() {
		return {}
	},
	onLoad() {},
	methods: {}
}
</script>

<style lang="scss" scoped></style>
