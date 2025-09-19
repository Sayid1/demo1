<template>
	<ui-page
		class="page"
		:customStyle="{
			paddingBottom: '48rpx'
		}"
	>
		<view slot="header" class="u-flex">
			<view>test</view>
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
			<view class="u-flex u-p-12" style="color: #fff" @click="show = true">
				北京
				<u-icon name="arrow-down-fill" color="#fff" size="16"></u-icon>
			</view>
		</view>

		<view class="main">
			<view class="u-flex u-row-between cta">
				<view class="u-rela">
					<view class="title">居家养老</view>
					<ui-image src="/static/images/house2.png" width="336rpx" height="336rpx" />
				</view>
				<view class="u-flex-1 u-m-l-14">
					<view class="u-rela">
						<view class="sub-title">养老助餐</view>
						<ui-image src="/static/images/eat.png" width="336rpx" height="160rpx" />
					</view>
					<view class="u-rela u-m-t-14">
						<view class="sub-title">机构养老</view>
						<ui-image src="/static/images/org.png" width="336rpx" height="160rpx" />
					</view>
				</view>
			</view>
			<view class="u-flex u-row-between u-m-t-14 cta">
				<view class="u-rela">
					<view class="sub-title right">在线办公</view>
					<ui-image src="/static/images/work.png" width="336rpx" height="160rpx" />
				</view>
				<view class="u-rela">
					<view class="sub-title">
						区域养老
						<br />
						服务中心
					</view>
					<ui-image src="/static/images/service.png" width="336rpx" height="160rpx" />
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

			<view class="u-m-t-24 u-flex u-row-between hero-container">
				<view class="u-flex u-flex-col u-flex-1 u-row-center content">
					<text>让专业养老服务</text>
					<text class="u-m-t-6">走进寻常百姓家</text>
					<view class="u-flex u-col-center u-row-center u-m-t-12 phone">
						<text>400-670-5115</text>
					</view>
				</view>
				<ui-image src="/static/images/hero1.png" width="326rpx" height="216rpx" />
			</view>

			<view class="u-m-t-48" style="background-color: #fff">
				<view class="u-m-b-48" style="color: #040404; font-weight: 600">
					您家门口的养老服务
				</view>
				<view class="u-flex u-row-between service-nav">
					<view class="u-flex u-flex-col u-row-center">
						<view class="u-flex u-flex-col u-row-center icon-menu">
							<ui-image src="/static/images/menu.png" width="48rpx" height="48rpx" />
						</view>
						<view class="u-m-t-8">全部</view>
					</view>

					<view class="u-flex u-flex-col u-row-center">
						<ui-image src="/static/images/care.png" width="136rpx" height="136rpx" />
						<view class="u-m-t-8">生活照料</view>
					</view>

					<view class="u-flex u-flex-col u-row-center">
						<ui-image src="/static/images/health.png" width="136rpx" height="136rpx" />
						<view class="u-m-t-8">健康管理</view>
					</view>

					<view class="u-flex u-flex-col u-row-center">
						<ui-image
							src="/static/images/management.png"
							width="136rpx"
							height="136rpx"
						/>
						<view class="u-m-t-8">家政物业</view>
					</view>
				</view>
			</view>
			<!-- 245*161 -->
			<view class="u-flex u-flex-wrap u-m-t-36 point-number-container">
				<view class="u-flex u-flex-1">
					<view class="u-flex-1">
						<view
							class="u-flex u-flex-col u-row-center u-m-b-14 point-number-horizontal"
						>
							<view>养老床位</view>
							<view class="number">616个</view>
						</view>
						<view class="u-flex u-flex-col u-row-center point-number-horizontal">
							<view>可预定床位</view>
							<view class="number">4.3万张</view>
						</view>
					</view>
					<view class="u-flex-1 u-m-l-14">
						<view
							class="u-flex u-flex-col u-row-center u-m-b-14 point-number-horizontal"
						>
							<view>驿站数量</view>
							<view class="number">1459个</view>
						</view>
						<view class="u-flex u-flex-col u-row-center point-number-horizontal">
							<view>助餐点数量</view>
							<view class="number">3151个</view>
						</view>
					</view>
				</view>
				<view class="u-flex u-flex-col u-row-center point-number-vertical">
					<view>养老机构</view>
					<view class="number">
						11.0
						<br />
						万张
					</view>
				</view>
			</view>

			<map style="width: 100%; margin-top: 36rpx" />

			<view class="u-flex u-row-between u-m-t-36">
				<view class="u-rela register">
					<view class="u-abso text">
						机构养老
						<br />
						需求注册
					</view>
					<view class="u-abso btn-enter">进入</view>
					<ui-image src="/static/images/register.png" width="336rpx" height="336rpx" />
				</view>
				<view class="u-rela register">
					<view class="u-abso text">适老化产品</view>
					<view class="u-abso btn-enter">进入</view>
					<ui-image src="/static/images/product.png" width="336rpx" height="336rpx" />
				</view>
			</view>

			<view class="u-flex u-row-between u-m-t-24 functional-container">
				<view class="u-rela u-flex u-row-center item">
					<ui-image
						src="/static/images/card.png"
						customStyle="position:absolute"
						height="160rpx"
						width="160rpx"
					/>
					<view class="u-rela" style="z-index: 1">
						养老
						<br />
						人才
					</view>
				</view>
				<view class="u-rela u-flex u-row-center item">
					<ui-image
						src="/static/images/card.png"
						customStyle="position:absolute"
						height="160rpx"
						width="160rpx"
					/>
					<view class="u-rela" style="z-index: 1">
						志愿
						<br />
						服务
					</view>
				</view>
				<view class="u-rela u-flex u-row-center item">
					<ui-image
						src="/static/images/card.png"
						customStyle="position:absolute"
						height="160rpx"
						width="160rpx"
					/>
					<view class="u-rela u-text-center" style="z-index: 1">
						京津冀
						<br />
						养老
					</view>
				</view>
				<view class="u-rela u-flex u-row-center item">
					<ui-image
						src="/static/images/card.png"
						customStyle="position:absolute"
						height="160rpx"
						width="160rpx"
					/>
					<view class="u-rela" style="z-index: 1">
						旅居
						<br />
						养老
					</view>
				</view>
			</view>

			<view class="u-m-t-48 u-flex u-row-between leasehold-classes">
				<view class="u-rela leasehold">
					<view class="title u-flex u-flex-col u-row-center u-m-t-24">
						<text>辅具租赁</text>
						<text class="sub-title u-m-t-24">让老年人生活无障碍</text>
					</view>
					<ui-image
						src="/static/images/leasehold.png"
						customStyle="position:absolute;left:0;bottom:0;"
						width="140rpx"
						height="168rpx"
					/>
					<view class="u-abso btn-view">查看</view>
				</view>
				<view class="u-flex u-flex-col u-row-between classes-container">
					<view class="u-flex u-flex-1 u-rela u-p-l-24 classes">
						<view class="title">
							<text>养老课堂</text>
						</view>
						<view class="u-abso btn-view">查看</view>
					</view>
					<view class="u-flex u-flex-1 u-rela u-m-t-24 u-p-l-24 classes">
						<view class="title">
							<text>问卷调研</text>
						</view>
						<view class="u-abso btn-view">查看</view>
					</view>
				</view>
			</view>

			<!-- <u-sticky customNavHeight="91px" offset-top="200"> -->
			<view
				:style="{
					position: 'sticky',
					top: naviBarHeight + 'px',
					background: '#fff'
				}"
			>
				<u-tabs
					:list="list1"
					@click="onChangeTab"
					:scrollable="false"
					lineColor="#5b4def"
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

		<u-popup :show="show" @close="close" round="12">
			<view class="popup-content">
				<view class="title">
					<text>请选择区域</text>
				</view>
				<view v-for="i in 5" :key="i" class="area-item">北京</view>

				<view class="u-flex u-abso safe-area-bottom-padding btn">
					<u-button
						text="取消"
						customStyle="margin-right:36rpx;"
						@click="close"
					></u-button>
					<u-button text="确定" color="#b1a7f8" @click="close"></u-button>
				</view>
			</view>
		</u-popup>
	</ui-page>
</template>

<script>
export default {
	data() {
		return {
			show: false,
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
						selectedIconPath: '/static/images/icon-heart.png',
						iconPath: '/static/images/icon-heart.png'
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
						selectedIconPath: '/static/images/icon-user.png',
						iconPath: '/static/images/icon-user.png'
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
		close() {
			this.show = false
		},
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

<style lang="scss" scoped>
.main {
	padding: 30rpx;
	background-color: #fefefe;
	border-radius: 24rpx;
	margin-top: -16rpx;
}
.cta {
	color: #000;
	font-weight: bold;
	.title {
		position: absolute;
		font-size: 50rpx;
		top: 24rpx;
		left: 18rpx;
		z-index: 1;
	}
	.sub-title {
		position: absolute;
		z-index: 1;
		font-size: 38rpx;
		left: 12rpx;
		top: 50%;
		transform: translateY(-50%);
		&.right {
			left: auto;
			right: 12rpx;
		}
	}
}
.hero-container {
	background-color: #dfddf9;
	border-radius: 24rpx;
	.content {
		color: #040404;
		font-weight: 600;
		.phone {
			width: 240rpx;
			height: 52rpx;
			color: #fff;
			background-color: #314bff;
			border-radius: 26rpx;
			font-weight: normal;
			font-size: 28rpx;
		}
	}
}
.service-nav {
	font-size: 30rpx;
	font-weight: bold;
	.icon-menu {
		width: 136rpx;
		height: 136rpx;
		background-color: #f5f5fe;
		border-radius: 50%;
	}
}
.point-number-container {
	color: #fff;
	align-items: stretch;
	.point-number-horizontal {
		background-color: #b1a7f8;
		height: 160rpx;
		width: 100%;
		border-radius: 12rpx;
	}
	.point-number-vertical {
		width: 170rpx;
		border-radius: 12rpx;
		background-color: #b1a7f8;
		margin-left: 14rpx;
	}
	.number {
		margin-top: 24rpx;
		font-weight: bold;
		font-size: 40rpx;
	}
}
.register {
	.text {
		z-index: 1;
		font-weight: 600;
		width: 100%;
		text-align: center;
		font-size: 44rpx;
		top: 12rpx;
	}
	.btn-enter {
		color: #fff;
		background-color: #314bff;
		padding: 16rpx 40rpx;
		z-index: 1;
		border-radius: 46rpx;
		bottom: 8rpx;
		right: 8rpx;
	}
}

.functional-container {
	color: #040404;
	font-weight: bold;
	font-size: 40rpx;
	.item {
		width: 160rpx;
		height: 160rpx;
	}
}
.leasehold {
	width: 336rpx;
	height: 336rpx;
	background-color: #b1a7f8;
	border-radius: 28rpx;
	overflow: hidden;
}
.btn-view {
	color: #fff;
	background-color: #594def;
	padding: 8rpx 34rpx;
	z-index: 1;
	border-radius: 32rpx 0 32rpx 0;
	bottom: 2rpx;
	right: -12rpx;
}
.classes-container {
	width: 336rpx;
	height: 336rpx;
	.classes {
		background-color: #b1a7f8;
		border-radius: 28rpx;
		width: 100%;
		overflow: hidden;
	}
}
.leasehold-classes {
	.title {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
		.sub-title {
			font-size: 30rpx;
			font-weight: normal;
		}
	}
}
.popup-content {
	height: 55vh;
	padding: 0 24rpx;
	.title {
		font-size: 36rpx;
		color: #000;
		text-align: center;
		margin: 36rpx 0;
		font-weight: bold;
	}
	.area-item {
		background-color: #f6f7fb;
		color: #46474b;
		padding: 24rpx;
		margin-bottom: 18rpx;
		border-radius: 6rpx;
	}
	.btn {
		left: 24rpx;
		right: 24rpx;
		bottom: 0;
	}
}
</style>
