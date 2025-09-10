<template>
	<view
		class="tabs-scroll-list"
		v-if="tabList.length"
		:style="[
			{ minHeight: minHeight + 'px', height, overflow: 'hidden' },
			$u.addStyle(customStyle)
		]"
	>
		<ui-sticky
			:isFixed.sync="isFixed"
			@change="stickyChange"
			:topPos="stickyTopPos"
			:leftPos="stickyLeftPos"
			:contentStyle="fixedStyle"
			isFull
		>
			<view
				class="tab-box"
				:class="{
					'tab-fixed': isFixed
				}"
				:style="[$u.addStyle(tabStyle)]"
			>
				<u-tabs
					ref="tabs"
					:list="tabList"
					@change="change"
					@click="click"
					lineWidth="70rpx"
					lineHeight="4rpx"
					:current="current"
					:itemStyle="tabItemStyleFix"
					:activeStyle="activeStyle"
					:inactiveStyle="inactiveStyle"
					lineColor="#F99D3E"
					:keyName="keyName"
				></u-tabs>
			</view>
		</ui-sticky>
		<slot />

		<slot name="empty">
			<ui-empty height="600rpx" v-if="isEmpty">
				暂无数据
			</ui-empty>
		</slot>
		<view
			class="u-flex-col u-col-center u-row-center scroll-wrap"
			v-if="!isEmpty && (isUpLoading || isUpFinish)"
		>
			<view class="no-more" v-if="isUpFinish">没有更多了</view>
			<u-loading-icon
				v-else-if="isUpLoading"
				size="30rpx"
				textSize="24rpx"
				text=" 加载中..."
			></u-loading-icon>
		</view>
	</view>
</template>

<script>
import componentMixins from '@/mixins/components'

export default {
	name: 'ui-tabs-scroll',
	mixins: [componentMixins],
	props: {
		activeStyle: {
			type: Object,
			default: () => {
				return {
					color: '#333333',
					fontWeight: '700',
					transform: 'scale(1.16)',
					fontSize: '25rpx',
					transition: '.2s',
					height: '43rpx'
				}
			}
		},
		inactiveStyle: {
			type: Object,
			default: () => {
				return {
					color: '#666666',
					transform: 'scale(1)',
					fontSize: '25rpx',
					transition: '.2s',
					height: '43rpx'
				}
			}
		},
		stickyLeftPos: {
			type: [String, Number],
			default: 'auto'
		},
		stickyTopPos: {
			type: [String, Number],
			default: 'auto'
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
		// tab数据
		tabList: {
			type: Array,
			default: () => {
				return []
			}
		},
		tabItemStyle: {
			type: Object,
			default: () => {
				return {}
			}
		},
		tabStyle: {
			type: Object,
			default: () => {
				return {
					padding: '24rpx 0 12rpx'
				}
			}
		},
		keyName: {
			type: String,
			default: 'name'
		},
		current: {
			type: Number,
			default: 0
		},
		stickyDiff: {
			type: Number,
			default: 0
		},
		maxTabFlex: {
			type: Number,
			default: 6
		},
		minTabFlex: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			sysInfo: uni.getSystemInfoSync(),
			minHeight: 0,
			height: 'auto',
			isFixed: false,
			minHeightCalc: 0
		}
	},
	watch: {
		tabList: {
			handler() {
				this.$nextTick(() => {
					this.$refs.tabs && this.$refs.tabs.resize()
				})
			},
			immediate: true
		}
	},
	computed: {
		fixedStyle() {
			let obj = {
				borderBottom: '1rpx solid #f7f7f7',
				background: 'rgba(255, 255,255, 0.95)',
				backdropfilter: 'blur(4px)'
			}
			return this.isFixed ? obj : {}
		},
		tabItemStyleFix() {
			let { tabList } = this
			let len = tabList.length
			let obj = {
				height: '68rpx'
			}
			if (len > this.minTabFlex && len < this.maxTabFlex) {
				obj.minWidth = 100 / len + '%'
				obj.padding = '0'
			} else {
				obj.padding = '0 33rpx'
			}
			return {
				...obj,
				...this.tabItemStyle
			}
		}
	},
	methods: {
		change(e) {
			this.$emit('change', e)
		},
		stickyChange(data) {
			this.minHeightCalc = this.sysInfo.windowHeight - data.stickyTop + 1
		},
		async delay() {
			// 不是小程序直接setTimeout 20
			// #ifndef  MP
			await uni.$u.sleep(50)
			// #endif
			// #ifdef  MP
			const start = Date.now()
			// 阻塞微任务队列延迟 50 毫秒比较好
			// eslint-disable-next-line no-constant-condition
			for (; true; ) {
				if (Date.now() - start >= 50) {
					break
				} else {
					await this.$nextTick()
				}
			}
			return Promise.resolve()
			// #endif
		},
		async calcMinHeight() {
			let ret = await this.$u.getRect('.tabs-scroll-list')
			let max = this.sysInfo.windowHeight
			if (this.isFixed) {
				this.height = this.minHeightCalc + 'px'
				max = this.minHeightCalc
				// 移动到顶部
				await this.delay().then(ret => {
					this.height = 'auto'
					return ret
				})
			}

			this.minHeight = Math.min(
				max - this.stickyDiff,
				this.sysInfo.windowHeight - ret.top - this.stickyDiff
			)
			return Promise.resolve()
		},
		async click(e) {
			let index = e.index
			let oldIndex = this.current
			if (oldIndex === index) {
				return
			}
			await this.calcMinHeight()

			this.$emit('update:current', index)

			this.$nextTick(() => {
				this.$emit('click', e)
			})
		},
		getRect() {
			const query = uni.createSelectorQuery().in(this)

			return new Promise(reslove => {
				query
					.select('.tabs-scroll-list')
					.boundingClientRect(data => {
						reslove(data)
					})
					.exec()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.no-more {
	text-align: center;
	color: #999;
	font-size: 24rpx;
}
.scroll-wrap {
	height: 100rpx;
}
.tab-box {
	transition: background 0.1s, box-shadow 0.1s, backdrop-filter 0.1s;
}
</style>
