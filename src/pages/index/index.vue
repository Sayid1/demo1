<template>
	<ui-page
		class="page"
		:customStyle="{
			padding: '0 24rpx',
			paddingTop: '24rpx'
		}"
	>
		<view slot="header" class="u-flex">
			<ui-image
				src="https://dummyimage.com/40x40/0568b9/ffffff.png&text=logo"
				width="40rpx"
				height="40rpx"
				class=""
			/>
			<view class="u-margin-left-10">北京养老服务网</view>
		</view>
		<view class="u-flex" style="border: 1px solid #000; border-radius: 8rpx; overflow: hidden">
			<view class="u-flex u-p-40" style="background-color: #f5f6f6; height: 40px">
				北京
				<u-icon name="arrow-down-fill" color="#333" size="16"></u-icon>
			</view>
			<u-input
				border="none"
				class="u-flex-1"
				placeholder="请输入关键词"
				prefixIcon="search"
				prefixIconStyle="font-size: 24px;"
				placeholderStyle="font-size: 16px;"
			></u-input>
			<view
				class="u-flex u-p-40"
				style="background-color: #921d21; color: #fff; height: 40px"
			>
				搜索
			</view>
		</view>
		<view class="u-m-t-24">
			<u-swiper
				:list="list3"
				indicator
				indicatorMode="line"
				circular
				height="130rpx"
			></u-swiper>
		</view>
		<view class="u-m-t-24">
			<ui-image
				src="https://dummyimage.com/702x136/fff6ed/921d23.png&text=让专业服务走进百姓家"
				width="702rpx"
				height="180rpx"
				class=""
			/>
		</view>
		<view
			class="u-m-t-24 u-flex u-p-32 u-p-l-46"
			style="
				background-color: #fcf7ed;
				color: #921d23;
				font-size: 14px;
				font-weight: 600;
				border-radius: 12rpx;
			"
		>
			养老助餐点
		</view>
		<view class="u-m-t-24 u-flex u-flex-wrap u-row-between u-rela">
			<view
				class="u-abso"
				style="
					width: 270rpx;
					height: 270rpx;
					padding: 12rpx;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: #fff;
					border-radius: 100%;
				"
			>
				<view
					style="
						background-color: #def3e4;
						width: 100%;
						height: 100%;
						border-radius: 100%;
					"
				></view>
			</view>
			<view
				style="
					border-radius: 24rpx;
					background-color: #def3e4;
					width: calc(50% - 6rpx);
					height: 270rpx;
					margin-bottom: 12rpx;
				"
			></view>
			<view
				style="
					border-radius: 24rpx;
					background-color: #def3e4;
					width: calc(50% - 6rpx);
					height: 270rpx;
					margin-bottom: 12rpx;
				"
			></view>
			<view
				style="
					border-radius: 24rpx;
					background-color: #def3e4;
					width: calc(50% - 6rpx);
					height: 270rpx;
				"
			></view>
			<view
				style="
					border-radius: 24rpx;
					background-color: #def3e4;
					width: calc(50% - 6rpx);
					height: 270rpx;
				"
			></view>
		</view>
		<view
			class="u-flex-col"
			style="
				background-color: #fcf7ed;
				color: #921d23;
				height: 200px;
				font-size: 14px;
				font-weight: 600;
				margin-top: 12rpx;
				padding-top: 24rpx;
				padding-left: 12rpx;
				padding-bottom: 24rpx;
				height: 336rpx;
			"
		>
			您家门口的养老服务
			<view
				class="u-flex u-flex-1 u-row-around u-m-t-10"
				style="background-color: #fffaf8; color: #333"
			>
				<view class="u-flex-col u-col-center">
					<ui-image
						src="https://dummyimage.com/52x52/429dec/921d23.png"
						width="52rpx"
						height="52rpx"
					/>
					<view class="u-m-t-8">全部</view>
				</view>
				<view class="u-flex-col u-col-center">
					<ui-image
						src="https://dummyimage.com/52x52/429dec/921d23.png"
						width="52rpx"
						height="52rpx"
					/>
					<view class="u-m-t-8">生活照料</view>
				</view>
				<view class="u-flex-col u-col-center">
					<ui-image
						src="https://dummyimage.com/52x52/429dec/921d23.png"
						width="52rpx"
						height="52rpx"
					/>
					<view class="u-m-t-8">委托代办</view>
				</view>
				<view class="u-flex-col u-col-center">
					<ui-image
						src="https://dummyimage.com/52x52/429dec/921d23.png"
						width="52rpx"
						height="52rpx"
					/>
					<view class="u-m-t-8">探访关爱</view>
				</view>
			</view>
		</view>

		<view class="u-flex u-flex-wrap u-m-t-36" style="color: #fff">
			<view
				class="u-flex-col u-col-center u-row-center"
				style="
					background-color: #5fb0bf;
					width: calc(33.3% - 10rpx);
					margin-right: 15rpx;
					border-radius: 6rpx;
					height: 138rpx;
				"
			>
				<text>养老机构</text>
				<text style="font-size: 40rpx; margin-top: 12rpx">615个</text>
			</view>
			<view
				class="u-flex-col u-col-center u-row-center"
				style="
					background-color: #5fb0bf;
					width: calc(33.3% - 10rpx);
					margin-right: 15rpx;
					border-radius: 6rpx;
					height: 138rpx;
				"
			>
				<text>养老床位</text>
				<text style="font-size: 40rpx; margin-top: 12rpx">11万张</text>
			</view>
			<view
				class="u-flex-col u-col-center u-row-center"
				style="
					background-color: #5fb0bf;
					width: calc(33.3% - 10rpx);
					border-radius: 6rpx;
					height: 138rpx;
				"
			>
				<text>可选订床位</text>
				<text style="font-size: 40rpx; margin-top: 12rpx">4.3万张</text>
			</view>
			<view
				class="u-flex-col u-col-center u-row-center"
				style="
					background-color: #5fb0bf;
					width: calc(50% - 8rpx);
					margin-right: 15rpx;
					border-radius: 6rpx;
					margin-top: 15rpx;
					height: 138rpx;
				"
			>
				<text>驿站数量</text>
				<text style="font-size: 40rpx; margin-top: 12rpx">1487个</text>
			</view>
			<view
				class="u-flex-col u-col-center u-row-center"
				style="
					background-color: #5fb0bf;
					width: calc(50% - 8rpx);
					border-radius: 6rpx;
					margin-top: 15rpx;
					height: 138rpx;
				"
			>
				<text>助餐点数量</text>
				<text style="font-size: 40rpx; margin-top: 12rpx">3151个</text>
			</view>
		</view>

		<map style="width: 100%; margin-top: 36rpx" />

		<view class="u-flex u-row-between u-m-t-36">
			<view
				style="
					background-color: #ffeee6;
					width: 286rpx;
					height: 252rpx;
					border-radius: 12rpx;
				"
			></view>
			<view style="width: 394rpx">
				<view
					style="background-color: #ffeee6; height: 114rpx; border-radius: 12rpx"
				></view>
				<view
					style="
						background-color: #ffeee6;
						height: 114rpx;
						margin-top: 24rpx;
						border-radius: 12rpx;
					"
				></view>
			</view>
		</view>
		<view class="u-flex u-row-between u-m-t-24">
			<view
				style="
					background-color: #ffeee6;
					width: 286rpx;
					height: 252rpx;
					border-radius: 12rpx;
				"
			></view>
			<view style="width: 394rpx">
				<view
					style="background-color: #ffeee6; height: 114rpx; border-radius: 12rpx"
				></view>
				<view
					style="
						background-color: #ffeee6;
						height: 114rpx;
						margin-top: 24rpx;
						border-radius: 12rpx;
					"
				></view>
			</view>
		</view>

		<view class="u-flex u-flex-wrap u-row-between u-m-t-36">
			<view
				style="
					background-color: #4995a4;
					width: 286rpx;
					height: 180rpx;
					border-radius: 12rpx;
				"
			></view>
			<view
				style="
					width: 394rpx;
					height: 180rpx;
					background-color: #4995a4;
					border-radius: 12rpx;
				"
			></view>
			<view
				style="
					margin-top: 24rpx;
					background-color: #4995a4;
					width: 100%;
					height: 180rpx;
					border-radius: 12rpx;
				"
			></view>
		</view>

		<u-tabs
			:list="list1"
			@click="onChangeTab"
			:scrollable="false"
			lineColor="#4995a4"
			lineWidth="36"
		></u-tabs>
		<view style="color: #4995a4; margin-top: 12rpx">
			<text
				style="
					background-color: #efddde;
					padding: 4rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
					color: #921d22;
				"
			>
				置顶
			</text>
			<text
				style="
					background-color: #efddde;
					padding: 4rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
					color: #921d22;
				"
			>
				推荐性标准
			</text>
			《家庭养老床位服务基本规范》
		</view>
		<m-tabbar fill fixed safeBottom :current="current" :tabbar="tabbar2" tabbarHeight="140">
			<template v-slot:tabbar_index_1>
				<view class="custom_style">
					<view class="custom_style_icon">
						<view class="circle">
							<u-icon name="scan" color="#fff" size="24"></u-icon>
						</view>
					</view>
					扫一扫
				</view>
			</template>
		</m-tabbar>
	</ui-page>
</template>

<script>
export default {
	data() {
		return {
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
			],
			list3: [
				'https://dummyimage.com/702x136/0baccf/fff.png&text=swiper1',
				'https://dummyimage.com/702x136/0baccf/fff.png&text=swiper2',
				'https://dummyimage.com/702x136/0baccf/fff.png&text=swiper3'
			],
			current: 1,
			tabbar2: {
				color: '#95ACBE',
				selectedColor: '#fff',
				backgroundColor: '#fff',
				list: [
					{
						pagePath: 'pages/tabbar/tabbar',
						text: '服务',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					},
					{
						pagePath: 'pages/test/index',
						text: '解决方案',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					},
					{
						pagePath: 'pages/test/index',
						text: '我的',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					}
				]
			}
		}
	},
	onLoad() {},
	methods: {
		onChangeTab() {},
		onClick(index) {
			console.log(index)
			this.current = index
		},
		onChange(index) {
			const {
				tabbar1: { list }
			} = this
			console.log('你选中的是:', list[index])
		},
		onBeforeChange(next) {
			uni.showModal({
				title: '非法进入',
				content: '您正在非法进入其他页面,是否继续',
				success: function (res) {
					if (res.confirm) {
						next()
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
