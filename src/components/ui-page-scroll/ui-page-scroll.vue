<template>
	<scroll-view
		style="height: 100vh; width: 100vw;"
		:scroll-y="!disabled"
		v-if="isScrollView"
		@scroll="scroll"
		:scroll-top="scrollTop"
		:enhanced="true"
		:show-scrollbar="false"
		:bounces="false"
	>
		<slot></slot>
	</scroll-view>
	<view v-else>
		<slot></slot>
	</view>
</template>

<script>
/**
 * ui-page-scroll 页面使用scroll-view滚动
 * @description 页面使用scroll-view滚动
 * @property {Boolean}	isScrollView 是否开启滚动
 * @property {Boolean}	disabled 禁用滚动
 * @property {Object} customStyle 定义需要用到的外部样式
 * @property {Object} customClass 类名
 * @event {Function} scroll	滚动
 */
import componentMixins from '@/mixins/components'
// 防止频繁更新视图
let realScrollTop = {}
export default {
	name: 'ui-page-scroll',
	mixins: [componentMixins],
	props: {
		isScrollView: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			uid: Math.random()
				.toString(36)
				.substr(2),
			scrollTop: 0
		}
	},
	methods: {
		scrollTo(y) {
			this.scrollTop = realScrollTop[this.uid] || 0
			this.$nextTick(() => {
				this.scrollTop = y
			})
		},
		scroll(evt) {
			realScrollTop[this.uid] = evt.detail.scrollTop
			this.$emit('scroll', evt.detail, evt)
		}
	},
	beforeDestroy() {
		delete realScrollTop[this.uid]
	}
}
</script>

<style lang="scss"></style>
