<template>
	<ui-page
		class="page"
		:customStyle="{
			paddingBottom: '48rpx'
		}"
	>
		<view slot="header" class="u-flex">
			<view class="u-margin-left-10">test</view>
		</view>
		<view class="u-flex u-row-center" style="background-color: #b1a7f8; padding-bottom: 48rpx">
			<view style="width: 580rpx">
				<u-input
					customStyle="background-color: #fff"
					shape="circle"
					prefixIcon="search"
					prefixIconStyle="font-size: 24px;"
					placeholderStyle="font-size: 16px;"
				>
					<template slot="suffix">
						<u-button
							text="搜索"
							type="success"
							color="#523dbd"
							size="small"
							shape="circle"
						>
							搜索
						</u-button>
					</template>
				</u-input>
			</view>
			<view class="u-flex u-p-12" style="color: #fff">
				北京
				<u-icon name="arrow-down-fill" color="#fff" size="16"></u-icon>
			</view>
			<!-- <view
				class="u-flex u-p-40"
				style="background-color: #921d21; color: #fff; height: 40px"
			>
				搜索
			</view> -->
		</view>

		<view
			style="
				padding: 30rpx;
				background-color: #fefefe;
				border-radius: 24rpx;
				margin-top: -16rpx;
			"
		>
			<view class="u-flex u-row-between">
				<view
					class="u-rela"
					style="
						background-color: #dfddf9;
						width: 338rpx;
						height: 338rpx;
						border-radius: 12rpx;
					"
				>
					<ui-image
						src="/static/images/house-1.png"
						width="272rpx"
						height="244rpx"
						customStyle="bottom: 0; left: 0; z-index: 1;position:absolute;"
					/>
					<ui-image
						src="/static/images/house.png"
						width="228rpx"
						height="208rpx"
						customStyle="bottom: 0; left: 0; z-index: 2;position:absolute;"
					/>
				</view>
				<view style="flex: 1; margin-left: 14rpx">
					<view
						style="background-color: #dfddf9; height: 166rpx; border-radius: 12rpx"
					></view>
					<view
						style="
							background-color: #dfddf9;
							height: 166rpx;
							margin-top: 14rpx;
							border-radius: 12rpx;
						"
					></view>
				</view>
			</view>
			<view class="u-m-t-24">
				<u-swiper
					:list="list3"
					indicator
					indicatorMode="line"
					circular
					height="217rpx"
				></u-swiper>
			</view>
			<view
				class="u-m-t-24 u-flex u-row-between"
				style="background-color: #dfddf9; border-radius: 24rpx"
			>
				<view
					class="u-flex u-flex-col u-flex-1 u-row-center"
					style="color: #040404; font-weight: 600"
				>
					<text>让专业养老服务</text>
					<text class="u-m-t-6">走进寻常百姓家</text>
					<view
						class="u-flex u-col-center u-row-center u-m-t-12"
						style="
							width: 240rpx;
							height: 52rpx;
							color: #fff;
							background-color: #314bff;
							border-radius: 26rpx;
							font-weight: normal;
							font-size: 28rpx;
						"
					>
						<text>400-670-5115</text>
					</view>
				</view>
				<ui-image src="/static/images/hero1.png" width="326rpx" height="216rpx" />
			</view>

			<view class="u-m-t-48" style="background-color: #fff">
				<view class="u-m-b-24" style="color: #040404; font-weight: 600">
					您家门口的养老服务
				</view>
				<view class="u-flex u-row-between">
					<view
						class="u-flex u-row-center"
						style="
							width: 138rpx;
							height: 138rpx;
							background-color: #f5f5fe;
							border-radius: 50%;
						"
					>
						<ui-image src="/static/images/menu.png" width="48rpx" height="48rpx" />
					</view>
					<view
						class="u-flex u-row-center"
						style="
							width: 138rpx;
							height: 138rpx;
							background-color: #f5f5fe;
							border-radius: 50%;
						"
					>
						<ui-image src="/static/images/care.png" width="82rpx" height="100rpx" />
					</view>
					<view
						class="u-flex u-row-center"
						style="
							width: 138rpx;
							height: 138rpx;
							background-color: #f5f5fe;
							border-radius: 50%;
						"
					>
						<ui-image src="/static/images/health.png" width="66rpx" height="98rpx" />
					</view>
					<view
						class="u-flex u-row-center"
						style="
							width: 138rpx;
							height: 138rpx;
							background-color: #f5f5fe;
							border-radius: 50%;
						"
					>
						<ui-image
							src="/static/images/management.png"
							width="90rpx"
							height="98rpx"
						/>
					</view>
				</view>
			</view>
			<!-- 245*161 -->
			<view class="u-flex u-flex-wrap u-m-t-36" style="color: #fff; align-items: stretch">
				<view class="u-flex u-flex-1">
					<view class="u-flex-1">
						<view
							style="
								background-color: #b1a7f8;
								height: 160rpx;
								margin-bottom: 14rpx;
								width: 100%;
								border-radius: 12rpx;
							"
						></view>
						<view
							style="
								background-color: #b1a7f8;
								height: 160rpx;
								width: 100%;
								border-radius: 12rpx;
							"
						></view>
					</view>
					<view class="u-flex-1" style="margin-left: 14rpx">
						<view
							style="
								background-color: #b1a7f8;
								height: 160rpx;
								margin-bottom: 14rpx;
								width: 100%;
								border-radius: 12rpx;
							"
						></view>
						<view
							style="
								background-color: #b1a7f8;
								height: 160rpx;
								width: 100%;
								border-radius: 12rpx;
							"
						></view>
					</view>
				</view>
				<view
					style="
						width: 170rpx;
						border-radius: 12rpx;
						background-color: #b1a7f8;
						margin-left: 14rpx;
					"
				></view>
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
						background-color: #4995a4;
						width: 100%;
						height: 182rpx;
						border-radius: 12rpx;
					"
				></view>
			</view>
			<!-- <u-sticky customNavHeight="91px" offset-top="200"> -->
			<view
				:style="{
					borderBottom: '1px solid #ccc',
					position: 'sticky',
					top: naviBarHeight + 'px',
					background: '#fff'
				}"
			>
				<u-tabs
					:list="list1"
					@click="onChangeTab"
					:scrollable="false"
					lineColor="#4995a4"
					lineWidth="36"
				></u-tabs>
			</view>
			<view
				style="
					color: #4995a4;
					margin-top: 12rpx;
					border-bottom: 1px solid #f7efef;
					padding: 6rpx 0 12rpx 0;
					background-color: #fff;
				"
				v-for="item in 17"
				:key="item.id"
			>
				<view>
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
					<text>《家庭养老床位服务基本规范》</text>
				</view>
				<view style="color: #999; font-size: 24rpx; margin-top: 12rpx">2024-12-26</view>
			</view>
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
			naviBarHeight: 0,
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
						pagePath: 'pages/index/index',
						text: '服务',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					},
					{
						pagePath: 'pages/index/index',
						text: '解决方案',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					},
					{
						pagePath: 'pages/index/index',
						text: '我的',
						selectedIconPath: 'https://dummyimage.com/40x40/0baccf/fff.png',
						iconPath: 'https://dummyimage.com/40x40/0baccf/fff.png'
					}
				]
			}
		}
	},
	onLoad() {
		const res = uni.getSystemInfoSync()
		this.naviBarHeight = 44 + res.statusBarHeight
	},
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
