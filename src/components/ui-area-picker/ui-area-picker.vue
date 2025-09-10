<template>
	<u-popup
		:mode="getModalProps('mode')"
		:show="show"
		:round="getModalProps('borderRadius')"
		:z-index="getModalProps('zIndex')"
		:closeOnClickOverlay="getModalProps('maskCloseAble')"
		:closeable="false"
		:bgColor="getModalProps('bgColor')"
		@close="close"
		:safeAreaInsetBottom="getModalProps('safeAreaInsetBottom')"
	>
		<view class="area-picker u-flex u-flex-col">
			<view class="area-picker-header area-picker-block u-text-center">
				<view class="area-close u-flex u-row-center u-col-center" @click="close">
					<ui-svg-icon width="48rpx" height="48rpx" fill="#000" :name="closeIcon" />
				</view>
				<view class="u-line-1">
					{{ getModalProps('title') }}
				</view>
			</view>

			<view class="area-picker-bar area-picker-block u-flex">
				<view
					class="picker-bar-item u-line-1"
					v-for="(item, index) in tabList"
					:key="index"
					@click="barClick(item, index)"
					:class="{
						diabled: isPlaceholder(item),
						active: current === index
					}"
				>
					{{ item }}
				</view>
			</view>
			<view class="area-swiper area-picker-block u-flex-1">
				<view class="area-loading" v-if="!isLoaded">
					<u-loading-icon vertical text="加载中" textSize="28rpx"></u-loading-icon>
				</view>
				<swiper
					style="height: 100%"
					:duration="300"
					:current="current"
					@change="swiperChange"
				>
					<swiper-item v-for="(item, i) in displayAreaList2" :key="i">
						<scroll-view
							:scroll-top="scrollIntoViewList[i] || 0"
							class="area-swiper-item"
							scroll-y
							style="height: 100%"
						>
							<view
								class="area-list-item u-flex"
								v-for="(v, i2) in item"
								:key="i2"
								@click="next(v, i)"
								:class="[`into-${i}-${v.value}`]"
							>
								{{ v.label }}
								<view class="selected-icon" v-if="isActiveItem(v, i)">
									<ui-svg-icon
										width="48rpx"
										height="48rpx"
										:fill="getModalProps('selectedIconColor')"
										:name="selectedIcon"
									/>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</u-popup>
</template>
<script>
import modalMixnis from '@/mixins/modal.js'
import componentMixins from '@/mixins/components'
import { fetchAreaPickerData } from '@/api/components/area-picker'
export default {
	name: 'ui-area-picker',
	mixins: [componentMixins, modalMixnis],
	props: {
		mode: {
			type: String,
			default: 'bottom'
		},
		title: {
			type: String,
			default: '选择地区'
		},
		zIndex: {
			type: [String, Number],
			default: 10075
		},
		borderRadius: {
			type: [String, Number],
			default: '24rpx'
		},
		maskCloseAble: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		selected: {
			type: Array,
			default() {
				return []
			}
		},
		closeIcon: {
			type: [String, Function],
			default() {
				return (color = []) => {
					return `
                        <svg
                            t="1649837952670"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="7645"
                            width="64"
                            height="64"
                        >
                            <path
                             fill="${color[0] || '#000'}"
                                d="M513 625.1L316.5 428.5c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l222 222c7 7 16.2 10.5 25.5 10.5 9.2 0 18.4-3.5 25.5-10.5l0.5-0.5 0.5-0.5 222-222c14.1-14.1 14.1-36.9 0-50.9-14.1-14.1-36.9-14.1-50.9 0L513 625.1z"
                                p-id="7646"
                            ></path>
                        </svg>
                    `
				}
			}
		},
		selectedIconColor: {
			type: [String, Array],
			default: '#999'
		},
		selectedIcon: {
			type: [String, Function],
			default() {
				return (color = []) => {
					return `
                        <svg
                            t="1649841375454"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="8447"
                            width="64"
                            height="64"
                        >
                            <path
                                fill="${color[0] || '#000'}"
                                d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z"
                                p-id="8448"
                            ></path>
                        </svg>
                    `
				}
			}
		},
		closeAfterSelected: {
			type: Boolean,
			default: true
		},
		maxLength: {
			type: [Number, String],
			default: 99
		}
	},
	data() {
		return {
			chooseList: [],
			areaList: [],
			displayAreaList: [],
			isLoaded: false,
			current: 0,
			placeholder: ['省份/地区', '城市', '区/县', '街道/镇'],
			scrollIntoViewList: []
		}
	},
	computed: {
		displayAreaList2() {
			let { maxLen } = this
			return this.displayAreaList.slice(0, maxLen)
		},
		tabList() {
			let { maxLen } = this
			let { chooseList, placeholder } = this
			let len = chooseList.length
			let arr = chooseList.map(v => v.label)
			// 如果非最后一个需要补下一个
			if (!chooseList[len - 1] || !this.checkEndItem(chooseList[len - 1], len - 1)) {
				arr.push(placeholder[len])
			}

			return arr.slice(0, maxLen)
		},
		maxLen() {
			return this.getModalProps('maxLength') - 0
		}
	},
	methods: {
		barClick(label, i) {
			if (!this.isPlaceholder(label)) {
				this.current = i
			}
		},
		isPlaceholder(label) {
			return this.placeholder.includes(label)
		},
		isActiveItem(v, i) {
			let item = this.chooseList[i] || {}
			return item.label === v.label
		},
		checkEndItem(v, i) {
			let { maxLen } = this
			let { children } = v
			let isEnd = !(children && children.length)

			return isEnd || i + 1 >= maxLen
		},
		loadData() {
			return fetchAreaPickerData().then(ret => {
				this.isLoaded = true
				this.areaList = ret.data || []

				return ret
			})
		},
		setDisplayAreaList() {
			let { maxLen } = this
			let val = this.getModalProps('selected')
			let arr = [[...this.areaList]]
			let areaList = this.areaList
			let arr2 = []

			val.forEach((v, index) => {
				if (index > 0) {
					arr.push([...areaList])
				}

				let i = areaList.findIndex(v2 => v2.label === v)

				if (i !== -1) {
					this.$set(this.chooseList, index, areaList[i])
					arr2[index] = `into-${index}-${areaList[i].value}`
					areaList = areaList[i].children || []
				} else {
					areaList = []
				}
			})

			this.$set(this, 'displayAreaList', arr)
			this.current = Math.min(arr.length - 1, maxLen - 1)
			this.$nextTick(() => {
				this.$u.getRect('.area-swiper').then(boxRect => {
					let promiseArr = []
					arr2.forEach(v => {
						promiseArr.push(this.$u.getRect('.' + v))
					})

					Promise.all(promiseArr).then(res => {
						res.forEach((v, i) => {
							if (v) {
								this.$set(
									this.scrollIntoViewList,
									i,
									v.top - boxRect.top - boxRect.width / 2 - uni.upx2px(110) / 2
								)
							}
						})
					})
				})
			})
		},
		next(v, i) {
			let { children } = v
			let { chooseList } = this
			let clickVal = chooseList[i] ? chooseList[i].label : ''
			this.$set(this.chooseList, i, v)

			if (this.checkEndItem(v, i)) {
				if (this.closeAfterSelected) {
					this.close()
				}
				let { maxLen } = this
				this.emitEvent('change', this.chooseList.map(v => v.label).slice(0, maxLen))
			} else {
				// 切换省市区时候 清空下面
				if (clickVal && v.label !== clickVal) {
					this.chooseList.splice(i + 1, chooseList.length - i)
				}

				this.$set(this.displayAreaList, i + 1, children)

				// 如果只有一项 直接选中
				let onlyOne = children.length === 1

				if (onlyOne) {
					this.current = i + 1
					this.next(children[0], i + 1)
				} else {
					this.$nextTick(() => {
						this.current = i + 1
					})
				}
			}
		},
		async afterOpen() {
			this.scrollIntoViewList = []
			if (!this.isLoaded) {
				await this.loadData()
			}

			this.setDisplayAreaList()
		},
		swiperChange({ detail }) {
			this.current = detail.current
		}
	}
}
</script>
<style lang="scss" scoped>
.area-picker {
	height: 80vh;
}

.area-picker-block {
	width: 100%;
}

.area-picker-bar {
	padding: 24rpx;
	border-bottom: 1rpx solid #eee;

	.picker-bar-item {
		width: 175rpx;

		&.active {
			font-weight: bold;
		}

		&.diabled {
			font-weight: normal;
			color: #999;
		}
	}
}

.area-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.area-picker-header {
	position: relative;
	height: 120rpx;
	line-height: 120rpx;
	font-weight: bold;
	.area-close {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		top: 0;
		bottom: 0;
		left: 24rpx;
		background: #eee;
		margin: auto;
		border-radius: 50%;
	}
}

.area-swiper-item {
	padding: 0 0 0 24rpx;
	box-sizing: border-box;
}

.area-list-item {
	height: 110rpx;
	line-height: 110rpx;
	position: relative;
	border-bottom: 1rpx solid #eee;

	.selected-icon {
		position: absolute;
		top: 50%;
		right: 24rpx;
		transform: translateY(-50%);
	}
}
</style>
