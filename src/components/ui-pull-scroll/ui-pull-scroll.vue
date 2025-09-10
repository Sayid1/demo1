<template>
	<view class="" :style="{ height }">
		<slot name="before"></slot>
		<s-pull-scroll
			ref="pullScroll"
			:pullUp="scrollPullUp"
			:pullDown="scrollPullDown"
			:enablePullDown="enablePullDown && !disabled"
			:height="height"
			:showScrollbar="showScrollbar"
			:disabled="disabled"
			:bounces="bounces"
			:hideEmpty="hideEmpty"
			:showUpFinish="showUpFinish"
			:enablePullUp="enablePullUp"
			@touchend="touchend"
			@scroll="scroll"
			:footerStyle="footerStyle"
		>
			<slot :lists="scrollList"></slot>
			<view style="height: 100%;" slot="empty">
				<slot name="empty">
					<ui-empty>
						暂无数据
					</ui-empty>
				</slot>
			</view>
			<template slot="bottom">
				<ui-nav-gap v-if="showTabbarPlaceholderFix" type="tabbar"></ui-nav-gap>
				<ui-nav-gap v-if="showSafePlaceholder" type="safe-bottom"></ui-nav-gap>
				<slot name="bottom"></slot>
			</template>
		</s-pull-scroll>
	</view>
</template>

<script>
import scrollMixins from '@/mixins/scroll-loading'
import componentMixins from '@/mixins/components'
import { checkShowTabbar } from '@/libs/utils/router'
import { getParentPage } from '@/libs/utils/page'
export default {
	name: 'ui-pull-scroll',
	mixins: [scrollMixins, componentMixins],
	props: {
		// 是否显示上拉加载数据全部完成
		showUpFinish: {
			type: Boolean,
			default: true
		},
		api: Function,
		emptyText: {
			type: String,
			default: ''
		},
		height: {
			type: [Number, String]
		},
		disabled: {
			type: Boolean,
			default: false
		},
		bounces: {
			type: Boolean,
			default: true
		},
		enablePullDown: {
			type: Boolean,
			default: false
		},
		enablePullUp: {
			type: Boolean,
			default: true
		},
		showScrollbar: {
			type: Boolean,
			default: true
		},
		// 请求参数
		params: {
			type: Object,
			default() {
				return {}
			}
		},
		// 滚动参数 scrollMixins 的 scrollOpts
		options: {
			type: Object,
			default() {
				return {}
			}
		},
		// 是否自动加载第一页
		autoLoading: {
			type: Boolean,
			default: true
		},
		// 底部导航显示是
		showTabbarPlaceholder: {
			type: [Boolean, String],
			default: false
		},
		hideEmpty: {
			type: Boolean,
			default: false
		},
		showSafePlaceholder: {
			type: Boolean,
			default: false
		},
		isEmpty: {
			type: Boolean,
			default: false
		},
		isUpLoading: {
			type: Boolean,
			default: false
		},
		isUpFinish: {
			type: Boolean,
			default: false
		},
		lists: {
			type: Array,
			default() {
				return []
			}
		},
		footerStyle: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			scrollTop: 0
		}
	},
	watch: {
		lists: {
			handler(val) {
				if (val.length !== this.scrollList.length) {
					console.log('比那花')
					this.scrollList = val
				}
			}
		},
		options: {
			handler(val) {
				this.scrollOpts = {
					...this.scrollOpts,
					...val
				}
			},
			immediate: true
		},
		autoLoading: {
			handler(val) {
				if (val && this.firstScrollLoading) {
					this.$nextTick(() => {
						this.refreshScroll()
					})
				}
			},
			immediate: true
		}
	},
	mounted() {},
	computed: {
		scrollExtQuery() {
			return {
				...this.params
			}
		},
		showTabbarPlaceholderFix() {
			let { showTabbarPlaceholder } = this
			return showTabbarPlaceholder === 'auto' ? checkShowTabbar() : showTabbarPlaceholder
		}
	},
	methods: {
		touchend(e) {
			this.$emit('touchend', e)
		},
		scrollTo(y) {
			let pullScroll = this.$refs.pullScroll
			pullScroll.scrollTo(y)
		},
		async scrollApi(...arg) {
			let vm = await getParentPage(this)
			return typeof this.api === 'function' ? this.api.apply(vm, arg) : ''
		},
		getLists() {
			return this.scrollList
		},
		scroll(evt) {
			this.scrollTop = evt?.detail?.scrollTop
			this.$emit('scroll', evt)
		},
		onPullScrollEmpty(evt) {
			this.$emit('pullScrollEmpty', evt)
		},
		onPullScrollFinish(evt) {
			this.$emit('pullScrollFinish', evt)
		},
		onPullScrollSuccess(evt) {
			this.$emit('pullScrollSuccess', evt)
		},
		onPullScrollComplete(evt) {
			this.$emit('pullScrollComplete', evt)
		},
		onScrollLoadSuccess(arr) {
			this.$emit('update:lists', arr)
			this.$nextTick(() => {
				if (this.$refs.pullScroll) {
					this.$emit('update:isEmpty', this.$refs.pullScroll.isEmpty)
					this.$emit('update:isUpLoading', this.$refs.pullScroll.isUpLoading)
					this.$emit('update:isUpFinish', this.$refs.pullScroll.isUpFinish)
				}
			})
		}
	}
}
</script>

<style lang="scss"></style>
