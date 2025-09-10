<template>
	<view
		class="not-found u-flex u-flex-col u-row-center"
		:class="customClass"
		:style="[$u.addStyle(customStyle), { height }]"
	>
		<ui-svg-icon
			v-if="showIcon"
			@click="click"
			:width="addUnit(iconWidth)"
			:height="addUnit(iconHeight)"
			:name="iconSrc"
			:fill="fill"
		></ui-svg-icon>
		<view
			@click="click"
			:class="{
				'u-margin-top-24': showIcon
			}"
			class="text"
		>
			<slot>{{ text }}</slot>
		</view>
	</view>
</template>

<script>
import componentMixins from '@/mixins/components'
/**
 * 空数据
 * @description 空数据
 * @property {String, Object} c-class class
 * @property {String} c-style style
 * @property {String} text 文本
 * @property {String} height 高度
 * @property {String, Number} iconWidth 图片宽度
 * @property {String, Number} iconHeight 图片高度
 * @property {String} iconSrc 图片路径或者名称
 */
export default {
	name: 'ui-empty',
	mixins: [componentMixins],
	props: {
		text: {
			type: String,
			default: uni.$ui.props.empty.text
		},
		height: {
			type: String,
			default: uni.$ui.props.empty.height
		},
		iconWidth: {
			type: [String, Number],
			default: uni.$ui.props.empty.iconWidth
		},
		iconHeight: {
			type: [String, Number],
			default: uni.$ui.props.empty.iconHeight
		},
		iconSrc: {
			type: String,
			default: uni.$ui.props.empty.iconSrc
		},
		showIcon: {
			type: Boolean,
			default: uni.$ui.props.empty.showIcon
		},
		fill: {
			type: [String, Array],
			default: uni.$ui.props.empty.fill
		}
	},
	data() {
		return {}
	},
	computed: {},
	methods: {
		click() {
			this.$emit('click')
		}
	}
}
</script>

<style lang="scss" scoped>
.not-found {
	color: #999;
}
</style>
