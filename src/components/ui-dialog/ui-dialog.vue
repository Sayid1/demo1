<template>
	<u-popup
		:mode="getModalProps('mode')"
		:show="show"
		:round="getModalProps('borderRadius')"
		:z-index="getModalProps('zIndex')"
		:closeOnClickOverlay="getModalProps('maskCloseAble')"
		:closeable="istTopClose"
		:bgColor="getModalProps('bgColor')"
		@close="close"
		:safeAreaInsetBottom="getModalProps('safeAreaInsetBottom')"
	>
		<view class="ui-modal-wraper u-flex u-flex-col">
			<view
				class="ui-modal-content u-flex-1"
				:style="[
					{
						width: addUnit(getModalProps('width'))
					},
					contentStyleMix
				]"
			>
				<slot>
					<view v-if="getModalProps('title')" class="html-dialog-title u-text-center">
						{{ getModalProps('title') }}
					</view>
					<view
						v-if="getModalProps('content')"
						class="html-dialog-content u-flex u-flex-col u-col-center u-row-center u-text-center"
					>
						<mpHtml
							@imgtap="richTextClick"
							@linktap="richTextClick"
							:content="getModalProps('content')"
						></mpHtml>
					</view>
					<scroll-view
						v-if="getModalProps('isScroll')"
						:style="{ height: addUnit(getModalProps('scrollHeight')) }"
						scroll-y
					>
						<mpHtml
							v-if="htmlText"
							@imgtap="richTextClick"
							@linktap="richTextClick"
							:content="htmlText"
						></mpHtml>
					</scroll-view>
					<mpHtml
						v-else-if="htmlText"
						@imgtap="richTextClick"
						@linktap="richTextClick"
						:content="htmlText"
					></mpHtml>
					<view
						v-if="btns.length"
						class="html-dialog-btns u-flex u-col-center u-row-center"
					>
						<template v-for="(item, i) in btns">
							<view
								class="html-dialog-btn"
								:class="[item.class]"
								:style="[item.style]"
								:key="i"
								v-if="item.isAuth"
							>
								<ui-auth-button :key="i" @click="btnClick(item, i)">
									{{ item.text || '' }}
								</ui-auth-button>
							</view>

							<view
								v-else
								class="html-dialog-btn"
								:class="[item.class]"
								:style="[item.style]"
								@click="btnClick(item, i)"
								:key="i"
							>
								{{ item.text || '' }}
							</view>
						</template>
					</view>
				</slot>
			</view>
			<view class="ui-modal-close" v-if="!istTopClose && getModalProps('showClose')">
				<ui-svg-icon
					@click="iconClose"
					:width="addUnit(getModalProps('closeWidth'))"
					:height="addUnit(getModalProps('closeHeight'))"
					:name="getModalProps('closeName')"
					:fill="getModalProps('closeFill')"
				></ui-svg-icon>
			</view>
		</view>
	</u-popup>
</template>

<script>
import modalMixnis from '@/mixins/modal.js'
import componentMixins from '@/mixins/components'
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { checkHtmlClickAction } from '@/libs/utils/rich-text'
/**
 * modal弹窗
 * @description 弹窗
 * @property {String} width 内容宽度
 * @property {String, Number} zIndex 层级
 * @property {String, Number} borderRadius 圆角
 * @property {Object} contentStyle 内容样式
 * @property {Boolean} maskCloseAble 点击蒙层是否关闭
 * @property {String} closeName 关闭按钮
 * @property {String} closeWidth 关闭按钮宽度
 * @property {String} closeHeight 关闭按钮高度
 * @property {String} closeFill 按钮颜色
 * @property {Boolean} showClose 是否显示关闭按钮
 * @property {String} mode 是否显示关闭按钮
 *  @value center
 *  @value top
 *  @value bottom
 *  @value left
 *  @value right
 * @property {String} bgColor 底色
 * @property {Boolean} safeAreaInsetBottom 是否开启安全底部
 * @property {Boolean} html 富文本标签
 * @property {Boolean} isScroll 是否开启滚动 富文本标签模式 才生效
 * @property {String, Number} scrollHeight 滚动的高度
 *
 */
export default {
	name: 'ui-dialog',
	components: {
		mpHtml
	},
	props: {
		width: {
			type: [String, Number],
			default: uni.$ui.props.dialog.width
		},
		zIndex: {
			type: [String, Number],
			default: uni.$ui.props.dialog.zIndex
		},
		borderRadius: {
			type: [String, Number],
			default: uni.$ui.props.dialog.borderRadius
		},
		contentStyle: {
			type: Object,
			default: uni.$ui.props.dialog.contentStyle
		},
		maskCloseAble: {
			type: Boolean,
			default: uni.$ui.props.dialog.maskCloseAble
		},
		closeName: {
			type: String,
			default: uni.$ui.props.dialog.closeName
		},
		closeWidth: {
			type: [String, Number],
			default: uni.$ui.props.dialog.closeWidth
		},
		closeHeight: {
			type: [String, Number],
			default: uni.$ui.props.dialog.closeHeight
		},
		closeFill: {
			type: Array,
			default: uni.$ui.props.dialog.closeFill
		},
		showClose: {
			type: Boolean,
			default: uni.$ui.props.dialog.showClose
		},
		mode: {
			type: String,
			default: uni.$ui.props.dialog.mode
		},
		bgColor: {
			type: String,
			default: uni.$ui.props.dialog.bgColor
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: uni.$ui.props.dialog.safeAreaInsetBottom
		},
		html: {
			type: [String, Object],
			default: uni.$ui.props.dialog.html
		},
		isScroll: {
			type: Boolean,
			default: uni.$ui.props.dialog.isScroll
		},
		scrollHeight: {
			type: [String, Number],
			default: uni.$ui.props.dialog.scrollHeight
		},
		title: {
			type: String,
			default: uni.$ui.props.dialog.title
		},
		content: {
			type: String,
			default: uni.$ui.props.dialog.content
		},
		buttons: {
			type: [Array, Object],
			default: uni.$ui.props.dialog.buttons
		},
		// 是否使用富文本点击操作
		useRichTextAction: {
			type: Boolean,
			default: uni.$ui.props.dialog.useRichTextAction
		},
		closeIconPos: {
			type: String,
			default: uni.$ui.props.dialog.closeIconPos
		}
	},
	mixins: [modalMixnis, componentMixins],
	computed: {
		contentStyleMix() {
			return {
				background: '#fff',
				...this.getModalProps('contentStyle')
			}
		},
		htmlText() {
			let html = this.getModalProps('html')

			if (typeof html === 'object') {
				let { title, content } = html

				if (title || content) {
					return this.getTpl(html)
				} else {
					return ''
				}
			}

			return html
		},
		btns() {
			return this.getButtons(this.getModalProps('buttons'))
		},
		istTopClose() {
			return this.getModalProps('showClose') && this.getModalProps('closeIconPos') === 'top'
		}
	},
	methods: {
		getButtons(buttons) {
			let arr = buttons || []
			if (buttons && !Array.isArray(buttons)) {
				arr = [buttons]
			}
			return arr
		},
		getTpl({ title, content, buttons }) {
			let btnTpl = ''
			if (buttons) {
				let arr = this.getButtons(buttons)
				btnTpl = '<div class="html-dialog-btns u-flex u-col-center u-row-center">'
				arr.forEach((v, i) => {
					let ref = this.getBtnRef(v, i)
					btnTpl += `<a class="html-dialog-btn ${v.class || ''}" style="${
						v.style
					}" auto-close="${v.autoClose ? 1 : 0}" type="a-button" ref="${ref}">${v.text ||
						''}</a>`
				})
				btnTpl += '</div>'
			}
			return `
                <div class="html-dialog-title u-text-center">
                    ${title}
                </div>
                <div class="html-dialog-content u-flex u-flex-col u-col-center u-row-center u-text-center">
                   ${content}
                </div>
                ${btnTpl}
                
            `
		},
		iconClose(evt) {
			this.close()
			this.emitEvent('iconClose', evt, this)
		},
		richTextClick(evt) {
			if (evt.type === 'a-button') {
				let html = this.getModalProps('html')
				let btns = this.getButtons(html.buttons)
				let index = btns.findIndex((v, i) => this.getBtnRef(v, i) === evt.ref)
				this.btnClick(btns[index], index)
			} else {
				if (evt['auto-close'] === '1') {
					this.close()
				}
			}
			if (this.getModalProps('useRichTextAction')) {
				checkHtmlClickAction(evt)
			}

			this.emitEvent('htmlClick', evt, this)
		},
		getBtnRef(v, i) {
			return `${v.id || v.text || i}`
		},
		btnClick(detail, index) {
			this.emitEvent('btnClick', { detail, index }, this)
			if (detail.autoClose) {
				this.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.ui-modal-wraper {
	position: relative;
}
.ui-modal-content {
	border-radius: 24rpx;
	padding: 24rpx;
	box-sizing: border-box;
}
.ui-modal-close {
	margin-top: 48rpx;
}
</style>
