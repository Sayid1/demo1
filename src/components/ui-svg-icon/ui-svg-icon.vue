<template>
	<ui-image
		@click.stop.prevent="click"
		:show-error="false"
		:width="width"
		:height="height"
		:mode="mode"
		:src="url"
		:inline="inline"
	></ui-image>
</template>

<script>
import componentMixins from '@/mixins/components.js'
import icons from './svg.js'

/**
 * svg 图标
 * @description svg 图标
 * @property {Boolean} name 图标名称
 * @property {String， Array} fill 填充颜色
 * @property {String, Number} width 宽度
 * @property {String, Number} height 高度
 * @property {String, Number} isFill 是否填充颜色
 */
export default {
	name: 'ui-svg-icon',
	mixins: [componentMixins],
	props: {
		name: {
			type: [String, Function],
			default: 'arrow-right'
		},
		fill: {
			type: [String, Array],
			default: '#fff'
		},
		width: {
			type: [String, Number],
			default: 24
		},
		height: {
			type: [String, Number],
			default: 24
		},
		isFill: {
			type: Boolean,
			default: true
		},
		mode: {
			type: String,
			default: 'aspectFill'
		},
		// 行内
		inline: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	computed: {
		url() {
			const { fill, name, isFill } = this
			let icon = null

			if (typeof name === 'function') {
				icon = name
			} else {
				icon = icons[name]
			}

			if (!icon) {
				return name
			} else {
				let fillArr = []
				let str = ''

				if (fill) {
					if (Array.isArray(fill)) {
						fillArr = fill
					} else {
						fillArr = [fill]
					}
				}

				if (typeof icon === 'function') {
					str = icon(fillArr)
				} else if (isFill) {
					let fillFirst = fillArr[0] || ''

					str = icon.match(/<svg ([\s\S]+?)>/gi)[0]
					let paths = icon.match(/<path ([\s\S]+?)\/>/gi)

					paths.forEach((v, i) => {
						let fillItem = fillArr[i] || fillFirst
						if (fillItem) {
							str += v.replace(
								/fill="([\s\S]+?)"/gi,
								`fill="${fillArr[i] || fillFirst}"`
							)
						} else {
							str += v
						}
					})

					str += '</svg>'
				} else {
					str = icon
				}

				return icon ? this.svgData(str) : ''
			}
		}
	},
	methods: {
		click() {
			this.$emit('click')
		},
		svgData(svg) {
			// 将被设置到 dataset 中的属性还原出来
			svg = svg.replace(/data-(.*?=(['"]).*?\2)/g, '$1')

			// 将被设置到 data-xlink-href 的属性还原出来
			svg = svg.replace(/xlink-href=/g, 'xlink:href=')

			// 将 dataset 中被变成 kebab-case 写法的 viewBox 还原出来
			svg = svg.replace(/view-box=/g, 'viewBox=')

			// 清除 SVG 中不应该显示的 title、desc、defs 元素
			svg = svg.replace(/<(title|desc|defs)>[\s\S]*?<\/\1>/g, '')

			// 为非标准 XML 的 SVG 添加 xmlns，防止视图层解析出错
			if (!/xmlns=/.test(svg))
				svg = svg.replace(/<svg/, "<svg xmlns='http://www.w3.org/2000/svg'")

			// 对 SVG 中出现的浮点数统一取最多两位小数，缓解数据量过大问题
			svg = svg.replace(/\d+\.\d+/g, match => parseFloat(parseFloat(match).toFixed(2)))

			// 清除注释，缓解数据量过大的问题
			svg = svg.replace(/<!--[\s\S]*?-->/g, '')

			// 模拟 HTML 的 white-space 行为，将多个空格或换行符换成一个空格，减少数据量
			svg = svg.replace(/\s+/g, ' ')

			// 对特殊符号进行转义，这里参考了 https://github.com/bhovhannes/svg-url-loader/blob/master/src/loader.js
			// eslint-disable-next-line no-useless-escape
			svg = svg.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function(match) {
				return (
					'%' +
					match[0]
						.charCodeAt(0)
						.toString(16)
						.toUpperCase()
				)
			})

			// 单引号替换为 \'，由于 kbone 的 bug，节点属性中的双引号在生成 outerHTML 时不会被转义导致出错
			// 因此 background-image: url( 后面只能跟单引号，所以生成的 URI 内部也就只能用斜杠转义单引号了
			svg = svg.replace(/'/g, "\\'")

			// 最后添加 mime 头部，变成 Webview 可以识别的 Data URI
			return 'data:image/svg+xml,' + svg.trim()
		}
	}
}
</script>

<style lang="scss"></style>
