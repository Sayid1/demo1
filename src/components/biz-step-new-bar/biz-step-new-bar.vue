<template>
	<view
		class="step-bar-wrap  "
		@touchstart.stop="touchstart"
		@touchmove.stop="touchmove"
		@touchend.stop="touchend"
	>
		<view
			class="step-bar-label"
			v-if="isShowCurrent"
			:style="{
				left: getLeft + '%'
			}"
		>
			{{ current }}%
		</view>
		<view class="step-item-box">
			<view
				class="step-item"
				:style="{
					height: itemHeight,
					width: itemWidth || width,
					backgroundColor: color
				}"
				v-for="(item, index) in count"
				:key="index"
			></view>
		</view>

		<view
			class="step-item-box-active"
			:style="{
				height: itemHeight,
				width: '100%'
			}"
		>
			<view class="step-item-box step-item-box-inner">
				<view class="step-item active" v-for="(item, index) in count" :key="index">
					<view
						v-if="index < current / 5"
						:style="{
							height: itemHeight,
							width: itemWidth || width,
							backgroundColor: activeColor
						}"
					></view>
					<view
						v-else
						:style="{
							height: itemHeight,
							width: itemWidth || width,
							backgroundColor: color
						}"
					></view>
				</view>
				<!-- <view
					class="step-item"
					:style="{
						height: itemHeight,
						width: itemWidth || width,
						backgroundColor: activeColor
					}"
					v-for="(item, index) in count"
					:key="index"
				></view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: 20
		},
		color: {
			type: String,
			default: '#E8ECF0'
		},
		activeColor: {
			type: String,
			default: '#1E3E65'
		},
		width: {
			type: String,
			default: '200rpx'
		},
		height: {
			type: String,
			default: '1000rpx'
		},
		itemWidth: {
			type: String,
			default: ''
		},
		itemHeight: {
			type: String,
			default: '35rpx'
		},
		current: {
			type: Number,
			default: 75
		},
		border: {
			type: String,
			default: '2rpx solid #999999;'
		},
		isShowCurrent: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		// 防止超过边界
		getLeft() {
			if (this.current <= 10) {
				return 5
			}
			return this.current - 10
		}
	},
	data() {
		return {
			startX: 0,
			startCurrent: 0
		}
	},
	methods: {
		touchstart(e) {
			const { changedTouches } = e
			const item = changedTouches[0]
			if (item) {
				this.startX = item.clientX
				this.startCurrent = this.current
			}
			this.$emit('touchstart')
		},
		touchmove(e) {
			const { changedTouches } = e
			const item = changedTouches[0]
			if (item) {
				const h = parseFloat(736) * 2
				const diffY = item.clientX - this.startX
				const r = Math.abs(diffY) / h
				let val = this.startCurrent + Math.round(diffY * r) * 5
				if (val > 100 || val < 0) {
					this.startX = item.clientX
					this.startCurrent = this.current
				}
				this.$emit('update:current', Math.max(0, Math.min(val, 100)).toFixed(0) - 0)
			}
		},
		touchend() {
			this.startX = 0
			this.startCurrent = this.current
			this.$emit('end')
		}
	}
}
</script>

<style lang="scss" scoped>
.step-bar-wrap {
	position: relative;
	z-index: 10000;
}

.step-bar-label {
	position: absolute;
	left: 0;
	top: -67rpx;
	z-index: 15;
	text-align: center;
	height: 62rpx;
	line-height: 62rpx;
	transition: bottom 0.3s;
	font-size: 40rpx;
	font-weight: 500;
	color: #1e3e65;
	// z-index: 10000;
	// background: white;
}
.step-item-box-active {
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 10;
	overflow: hidden;
	transition: height 0.3s;
}

.step-item-box-inner {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	width: 100%;
}
.step-item-box {
	display: flex;
	height: 100%;
	justify-content: space-between;
}
.step-item {
	// margin: 0 2rpx;
	// border: 2rpx solid #999999;
}
</style>
