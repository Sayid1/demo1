<template>
	<view class="u-calendar-header u-border-bottom">
		<text class="u-calendar-header__title" v-if="showTitle">{{ title }}</text>
		<view>
			<view
				:style="{
					'background-image': `url(${$ui.getCdnImage(`calendar/calendar-img1.png`)})`,
					'background-size': '100% 100%',
					'background-position': 'center center',
					height: '188rpx'
				}"
			>
				<view class="month">{{ subtitle.month }}月</view>
				<view class="year">{{ subtitle.year }}年</view>
			</view>
		</view>
		<!-- <text class="u-calendar-header__subtitle" v-if="showSubtitle">{{ subtitle }}</text> -->
		<view class="u-calendar-header__weekdays">
			<text class="u-calendar-header__weekdays__weekday">日</text>
			<text class="u-calendar-header__weekdays__weekday">一</text>
			<text class="u-calendar-header__weekdays__weekday">二</text>
			<text class="u-calendar-header__weekdays__weekday">三</text>
			<text class="u-calendar-header__weekdays__weekday">四</text>
			<text class="u-calendar-header__weekdays__weekday">五</text>
			<text class="u-calendar-header__weekdays__weekday">六</text>
		</view>
	</view>
</template>

<script>
import UiImage from '@/components/ui-image/ui-image.vue'
export default {
	name: 'u-calendar-header',
	mixins: [uni.$u.mpMixin, uni.$u.mixin],
	components: { UiImage },
	props: {
		// 标题
		title: {
			type: String,
			default: ''
		},
		// 副标题
		subtitle: {
			type: [String, Object],
			default: () => {
				return {}
			}
		},
		// 是否显示标题
		showTitle: {
			type: Boolean,
			default: true
		},
		// 是否显示副标题
		showSubtitle: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {}
	},
	methods: {
		name() {}
	}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.u-calendar-header {
	padding-bottom: 4px;
	// height: 20%;
	&__title {
		font-size: 16px;
		color: $u-main-color;
		text-align: center;
		height: 42px;
		line-height: 42px;
		font-weight: bold;
	}

	&__subtitle {
		font-size: 14px;
		color: $u-main-color;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-weight: bold;
	}

	&__weekdays {
		@include flex;
		justify-content: space-between;

		&__weekday {
			font-size: 13px;
			color: $u-main-color;
			line-height: 30px;
			flex: 1;
			text-align: center;
		}
	}
}
.month {
	font-size: 91rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #c99842;
	text-align: center;
	margin-top: 20rpx;
}
.year {
	font-size: 33rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #c99842;
	position: absolute;
	top: 14rpx;
	right: 47rpx;
}
</style>
