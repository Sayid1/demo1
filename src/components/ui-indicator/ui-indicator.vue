<template>
	<view
		v-if="indicatorDots"
		class="u-swiper-indicator"
		:style="[
			{
				top:
					indicatorPos == 'topLeft' ||
					indicatorPos == 'topCenter' ||
					indicatorPos == 'topRight'
						? indicatorY + 'rpx'
						: 'auto',
				bottom:
					indicatorPos == 'bottomLeft' ||
					indicatorPos == 'bottomCenter' ||
					indicatorPos == 'bottomRight'
						? indicatorY + 'rpx'
						: 'auto',
				justifyContent: justifyContent,
				padding: `0 ${effect3d ? '74rpx' : '24rpx'}`
			},
			indicatorStyle
		]"
	>
		<block v-if="indicatorMode == 'rect-link'">
			<view
				class="u-indicator-item-rect-link"
				:class="{
					'u-indicator-item-rect-active': index == uCurrent,
					showShadow: index == uCurrent
				}"
				v-for="(item, index) in lists"
				:key="index"
				:style="[
					{
						width: indicatorWidth + 'rpx',
						height: indicatorHeight + 'rpx',
						backgroundColor: index == uCurrent ? indicatorActiveColor : indicatorColor
					},
					indicatorItemStyle
				]"
			></view>
		</block>
		<block v-if="indicatorMode == 'rect'">
			<view
				class="u-indicator-item-rect"
				:style="[
					indicatorItemStyle2,
					{
						backgroundColor: index == uCurrent ? indicatorActiveColor : indicatorColor
					}
				]"
				:class="{ 'u-indicator-item-rect-active': index == uCurrent }"
				v-for="(item, index) in lists"
				:key="index"
			></view>
		</block>
		<block v-if="indicatorMode == 'dot'">
			<view
				class="u-indicator-item-dot"
				:style="[
					indicatorItemStyle2,
					{
						backgroundColor: index == uCurrent ? indicatorActiveColor : indicatorColor
					}
				]"
				:class="{ 'u-indicator-item-dot-active': index == uCurrent }"
				v-for="(item, index) in lists"
				:key="index"
			></view>
		</block>
		<block v-if="indicatorMode == 'round'">
			<view
				class="u-indicator-item-round"
				:style="[
					indicatorItemStyle2,
					{
						backgroundColor: index == uCurrent ? indicatorActiveColor : indicatorColor
					}
				]"
				:class="{ 'u-indicator-item-round-active': index == uCurrent }"
				v-for="(item, index) in lists"
				:key="index"
			></view>
		</block>
		<block v-if="indicatorMode == 'number'">
			<view
				class="u-indicator-item-number"
				:style="[
					indicatorItemStyle2,
					{
						backgroundColor: index == uCurrent ? indicatorActiveColor : indicatorColor
					}
				]"
			>
				{{ uCurrent + 1 }}/{{ lists.length }}
			</view>
		</block>
	</view>
</template>

<script>
/**
 * swiper 轮播图
 * @description 该组件一般用于导航轮播，广告展示等场景,可开箱即用
 * @tutorial https://www.uviewui.com/components/swiper.html
 * @property {Array} lists 轮播图数据，见官网"基本使用"说明
 * @property {Boolean} title 是否显示标题文字，需要配合list参数，见官网说明（默认false）
 * @property {String} indicatorMode 指示器模式，见官网说明（默认round）
 * @property {String Number} height 轮播图组件高度，单位rpx（默认250）
 * @property {String} indicator-pos 指示器的位置（默认bottomCenter）
 * @property {Boolean} indicator-dots 是否显示指示器
 * @property {Boolean} effect3d 是否开启3D效果（默认false）
 * @property {Boolean} autoplay 是否自动播放（默认true）
 * @property {String Number} interval 自动轮播时间间隔，单位ms（默认2500）
 * @property {Boolean} circular 是否衔接播放，见官网说明（默认true）
 * @property {String} bg-color 背景颜色（默认#f3f4f6）
 * @property {String Number} border-radius 轮播图圆角值，单位rpx（默认8）
 * @property {Object} title-style 自定义标题样式
 * @property {String Number} effect3d-previous-margin mode = true模式的情况下，激活项与前后项之间的距离，单位rpx（默认50）
 * @property {String} img-mode 图片的裁剪模式，详见image组件裁剪模式（默认aspectFill）
 * @event {Function} click 点击轮播图时触发
 * @example <u-swiper :lists="lists" mode="dot" indicator-pos="bottomRight"></u-swiper>
 */
import indicatorMixins from '@/mixins/components/indicator.js'
import componentMixins from '@/mixins/components'

export default {
	name: 'ui-indicator',
	mixins: [indicatorMixins, componentMixins],
	props: {
		// 用户自定义的指示器的样式
		lists: {
			type: Array,
			default() {
				return []
			}
		},
		// 初始化时，默认显示第几项
		current: {
			type: [Number, String],
			default: 0
		}
	},
	watch: {
		// 如果外部的list发生变化，判断长度是否被修改，如果前后长度不一致，重置uCurrent值，避免溢出
		lists(nVal, oVal) {
			if (nVal.length !== oVal.length) this.uCurrent = 0
		},
		// 监听外部current的变化，实时修改内部依赖于此测uCurrent值，如果更新了current，而不是更新uCurrent，
		// 就会错乱，因为指示器是依赖于uCurrent的
		current(n) {
			this.uCurrent = n
		}
	},
	data() {
		return {
			uCurrent: this.current // 当前活跃的swiper-item的index
		}
	},
	computed: {
		justifyContent() {
			if (this.indicatorPos == 'topLeft' || this.indicatorPos == 'bottomLeft')
				return 'flex-start'
			if (this.indicatorPos == 'topCenter' || this.indicatorPos == 'bottomCenter')
				return 'center'
			if (this.indicatorPos == 'topRight' || this.indicatorPos == 'bottomRight')
				return 'flex-end'
			return ''
		},
		indicatorItemStyle2() {
			return this.indicatorItemStyle
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
@mixin vue-flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: $direction;
	/* #endif */
}

.u-swiper-indicator {
	padding: 0 24rpx;
	position: absolute;
	@include vue-flex;
	width: 100%;
	z-index: 1;
}

.u-indicator-item-rect-link {
	width: 26rpx;
	height: 8rpx;
	transition: all 0.2s;
	background-color: rgba(0, 0, 0, 0.3);

	&.u-indicator-item-rect-active {
		border-radius: 100rpx;
	}

	&:first-child {
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
	}
	&:last-child {
		border-top-right-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
	}
}

.showShadow {
	box-shadow: 0 0 8rpx 0 #00000094;
}

.u-indicator-item-rect {
	width: 26rpx;
	height: 8rpx;
	margin: 0 6rpx;
	transition: all 0.2s;
	background-color: rgba(0, 0, 0, 0.3);
}

.u-indicator-item-rect-active {
	background-color: rgba(255, 255, 255, 0.8);
}

.u-indicator-item-dot {
	width: 14rpx;
	height: 14rpx;
	margin: 0 6rpx;
	border-radius: 20rpx;
	transition: all 0.2s;
	background-color: rgba(0, 0, 0, 0.3);
}

.u-indicator-item-dot-active {
	background-color: rgba(255, 255, 255, 0.8);
}

.u-indicator-item-round {
	width: 8rpx;
	height: 8rpx;
	margin: 0 6rpx;
	border-radius: 36rpx;
	transition: all 0.2s;
	background-color: #fff;
}

.u-indicator-item-round-active {
	width: 12rpx;
}

.u-indicator-item-number {
	padding: 6rpx 16rpx;
	line-height: 1;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 100rpx;
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.8);
}
</style>
