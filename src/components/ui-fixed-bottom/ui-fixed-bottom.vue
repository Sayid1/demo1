<template>
	<view class="fixed-bottom" :class="['fixed-dir-' + dir, isFixed ? 'fixed-bottom-fixed' : '']">
		<template v-if="!immersive">
			<view v-if="isFixed" :style="heightStyle" class="fixed-bottom-placeholder"></view>
			<!-- <ui-nav-gap v-if="safeAreaBottom && !isTop" type="safe-bottom" :gap="gap"></ui-nav-gap> -->
		</template>
		<view
			class="fixed-bottom-content"
			:style="{
				backgroundColor,
				height: height2,
				zIndex: zIndex
			}"
		>
			<view class="fixed-bottom-content-inner">
				<slot></slot>
				<ui-nav-gap
					v-if="safeAreaBottom && !isTop"
					type="safe-bottom"
					:gap="gap"
				></ui-nav-gap>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 悬浮块
 * @description 悬浮块
 * @property {String} backgroundColor
 * @property {Boolean} safeAreaBottom 开启iPhonex底部兼容
 * @property {String, Number} height
 * @property {String} dir
 * 	@value bottom 底部
 *  @value top 顶部
 * @property {Boolean} isFixed 是否开启悬浮
 */
export default {
	props: {
		backgroundColor: {
			type: String,
			default: '#ffffff'
		},
		safeAreaBottom: {
			type: Boolean,
			default: true
		},
		gap: {
			type: [String, Number],
			default: 0
		},
		height: [String, Number],
		dir: {
			type: String,
			default: 'bottom'
		},
		isFixed: {
			type: Boolean,
			default: true
		},
		immersive: {
			type: Boolean,
			default: false
		},
		zIndex: {
			type: [Number, String],
			default: 100
		}
	},
	data() {
		return {
			caclH: 0
		}
	},
	mounted() {
		if (!this.height) {
			this.$nextTick(() => {
				this.getHeight()
			})
		}
	},
	watch: {
		height2: {
			handler(val) {
				this.$emit('heightChange', val)
			},
			immediate: true
		}
	},
	computed: {
		heightStyle() {
			return `height: ${this.height2}`
		},
		isTop() {
			return this.dir === 'top'
		},
		height2() {
			let { height, caclH } = this

			if (height) {
				if (typeof (height - 0) === 'number') {
					return height + 'rpx'
				} else {
					return height
				}
			} else {
				return caclH
			}
		}
	},
	methods: {
		getHeight() {
			this.selectorQuery('.fixed-bottom-content-inner').then(ret => {
				this.caclH = ret.height + 'px'
			})
		},
		selectorQuery(selector) {
			let view = uni
				.createSelectorQuery()
				.in(this)
				.select(selector)

			return new Promise((resolve, reject) => {
				view.fields(
					{
						size: true,
						scrollOffset: true
					},
					data => {
						if (data) {
							resolve(data)
						} else {
							reject(data)
						}
					}
				).exec()
			})
		}
	}
}
</script>

<style lang="scss">
.fixed-bottom-content {
	box-sizing: content-box;
}

.fixed-bottom-fixed {
	.fixed-bottom-content {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: auto;
		z-index: 10;
	}
}
.fixed-dir-top {
	.fixed-bottom-content {
		bottom: auto;
		top: 0;
	}
}
@supports (bottom: constant(safe-area-inset-top)) or (bottom: env(safe-area-inset-top)) {
	.ipx {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.safe-area-bottom {
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
	}
}
</style>
