<template>
	<view
		class="step-bar-wrap  "
		:style="{
			height,
			width
		}"
		@touchstart.stop="touchstart"
		@touchmove.stop="touchmove"
		@touchend.stop="touchend"
	>
		<view
			class="step-bar-label"
			v-if="isShowCurrent"
			:style="{
				bottom: current + 1 + '%',
				width: itemWidth || width
			}"
		>
			{{ current }}%
		</view>
		<view class="step-item-box u-flex-col ">
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
				height: current + '%',
				width
			}"
		>
			<view
				class="step-item-box step-item-box-inner u-flex-col "
				:style="{
					height
				}"
			>
				<view
					class="step-item active"
					:style="{
						height: itemHeight,
						width: itemWidth || width,
						backgroundColor: activeColor
					}"
					v-for="(item, index) in count"
					:key="index"
				></view>
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
			default: 0
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
	data() {
		return {
			startY: 0,
			startCurrent: 0
		}
	},
	methods: {
		touchstart(e) {
			const { changedTouches } = e
			const item = changedTouches[0]
			if (item) {
				this.startY = item.clientY
				this.startCurrent = this.current
			}
			this.$emit('touchstart')
		},
		touchmove(e) {
			const { changedTouches } = e
			const item = changedTouches[0]
			if (item) {
				const h = parseFloat(this.height) * 4
				const diffY = this.startY - item.clientY
				const r = Math.abs(diffY) / h
				let val = this.startCurrent + Math.round(diffY * r) * 5
				if (val > 100 || val < 0) {
					this.startY = item.clientY
					this.startCurrent = this.current
				}
				// console.log(val, Math.max(0, Math.min(val, 100)), r, diffY, 999)
				this.$emit('update:current', Math.max(0, Math.min(val, 100)).toFixed(0) - 0)
			}
		},
		touchend() {
			this.startY = 0
			this.startCurrent = this.current
		}
	}
}
</script>

<style lang="scss" scoped>
.step-bar-wrap {
	position: relative;

	z-index: 100000;
}

.step-bar-label {
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 15;
	text-align: center;
	height: 45rpx;
	line-height: 45rpx;
	transition: bottom 0.3s;
	font-size: 58rpx;
	font-weight: 500;
	color: #1e3e65;
	background: white;
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
	height: 100%;
	justify-content: space-between;
}
.step-item {
	// margin: 2rpx 0;
	// border: 2rpx solid #999999;
}
</style>
