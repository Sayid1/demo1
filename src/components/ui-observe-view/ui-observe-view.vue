<template>
	<view class="observe-view" :style="[$u.addStyle(customStyle)]" :id="uid">
		<slot></slot>
	</view>
</template>
<script>
export default {
	name: 'ui-observe-view',
	props: {
		customStyle: {
			type: [Object, String],
			default: () => ({})
		},

		thresholds: {
			type: Array,
			default() {
				return [0.95, 0.98, 1]
			}
		},
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			contentObserver: null,
			isObserver: false
		}
	},
	mounted() {
		this.relativeToViewport()
	},
	computed: {
		uid() {
			return this.$u.guid(5) + 'observe-view'
		}
	},
	methods: {
		disconnectObserver(observerName) {
			// 断掉观察，释放资源
			const observer = this[observerName]
			observer && observer.disconnect()
		},
		relativeToViewport() {
			this.disconnectObserver('contentObserver')
			let { top, bottom } = this
			let vm = uni
			// #ifdef MP
			vm = this
			// #endif
			this.contentObserver = vm
				.createIntersectionObserver({
					// 检测的区间范围
					thresholds: this.thresholds
				})
				.relativeToViewport({ top, bottom })
				.observe('#' + this.uid, res => {
					this.isObserver = !this.isObserver
					this.$emit('change', { ...res, isObserver: this.isObserver })
				})
		},
		beforeDestroy() {
			this.disconnectObserver('contentObserver')
		}
	}
}
</script>
