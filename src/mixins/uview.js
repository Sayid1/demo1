// 看到此报错，是因为没有配置vue.config.js的【transpileDependencies】，详见：https://www.uviewui.com/components/npmSetting.html#_5-cli模式额外配置
// eslint-disable-next-line no-unused-vars
const pleaseSetTranspileDependencies = {}, babelTest = pleaseSetTranspileDependencies?.test


// 小程序特有的mixin
import mpMixin from 'uview-ui/libs/mixin/mpMixin.js'
// 全局挂载引入http相关请求拦截插件
import Request from 'uview-ui/libs/luch-request'

// 路由封装
import route from 'uview-ui/libs/util/route.js'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from 'uview-ui/libs/function/colorGradient.js'

// 规则检验
import test from 'uview-ui/libs/function/test.js'
// 防抖方法
import debounce from 'uview-ui/libs/function/debounce.js'
// 节流方法
import throttle from 'uview-ui/libs/function/throttle.js'
// 公共文件写入的方法
import index from 'uview-ui/libs/function/index.js'

// 配置信息
import config from 'uview-ui/libs/config/config.js'
// props配置信息
import props from 'uview-ui/libs/config/props.js'
// 各个需要fixed的地方的z-index配置文件
import zIndex from 'uview-ui/libs/config/zIndex.js'
// 关于颜色的配置，特殊场景使用
import color from 'uview-ui/libs/config/color.js'
// 平台
import platform from 'uview-ui/libs/function/platform'
const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
        // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
        customStyle: {
            type: [Object, String],
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ''
        },
    },
    data() {
        return {}
    },
    onLoad() {
        // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
        this.$u.getRect = this.$uGetRect
    },
    created() {
        // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
        this.$u.getRect = this.$uGetRect
    },
    computed: {
        // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
        // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
        // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
        $u() {
            // #ifndef APP-NVUE
            // 在非nvue端，移除props，http，mixin等对象，避免在小程序setData时数据过大影响性能
            return uni.$u.deepMerge(uni.$u, {
                props: undefined,
                http: undefined,
                mixin: undefined
            })
            // #endif
            // #ifdef APP-NVUE
            // eslint-disable-next-line no-unreachable
            return uni.$u
            // #endif
        },
        /**
         * 生成bem规则类名
         * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
         * 故采用如下折中做法，最后返回的是数组，类似['a', 'b', 'c']的形式
         * @param {String} name 组件名称
         * @param {Array} fixed 一直会存在的类名
         * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
         * @return Array
         */
        bem() {
            return function (name, fixed, change) {
                // 类名前缀
                const prefix = `u-${name}--`
                const classes = {}
                if (fixed) {
                    fixed.map((item) => {
                        // 这里的类名，会一直存在
                        classes[prefix + this[item]] = true
                    })
                }
                if (change) {
                    change.map((item) => {
                        // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
                        this[item] ? (classes[prefix + item] = this[item]) : (delete classes[prefix + item])
                    })
                }
                return Object.keys(classes)
            }
        }
    },
    methods: {
        // 查询节点信息
        // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
        // 解决办法为在组件根部再套一个没有任何作用的view元素
        $uGetRect(selector, all) {
            return new Promise((resolve) => {
                uni.createSelectorQuery()
                    .in(this)[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect((rect) => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect)
                        }
                        if (!all && rect) {
                            resolve(rect)
                        }
                    })
                    .exec()
            })
        },
        getParentData(parentName = '') {
            // 避免在created中去定义parent变量
            if (!this.parent) this.parent = {}
            // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
            // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
            // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
            // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
            this.parent = uni.$u.$parent.call(this, parentName)
            if (this.parent.children) {
                // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
                this.parent.children.indexOf(this) === -1 && this.parent.children.push(this)
            }
            if (this.parent && this.parentData) {
                // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
                Object.keys(this.parentData).map((key) => {
                    this.parentData[key] = this.parent[key]
                })
            }
        },
        // 阻止事件冒泡
        preventEvent(e) {
            e && typeof (e.stopPropagation) === 'function' && e.stopPropagation()
        },
        // 空操作
        noop(e) {
            this.preventEvent(e)
        }
    },
    onReachBottom() {
        uni.$emit('uOnReachBottom')
    },
    beforeDestroy() {
        // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
        // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
        if (this.parent && uni.$u.test.array(this.parent.children)) {
            // 组件销毁时，移除父组件中的children数组中对应的实例
            const childrenList = this.parent.children
            childrenList.map((child, index) => {
                // 如果相等，则移除
                if (child === this) {
                    childrenList.splice(index, 1)
                }
            })
        }
    }
}
const $u = {
    route,
    date: index.timeFormat, // 另名date
    colorGradient: colorGradient.colorGradient,
    hexToRgb: colorGradient.hexToRgb,
    rgbToHex: colorGradient.rgbToHex,
    colorToRgba: colorGradient.colorToRgba,
    test,
    type: ['primary', 'success', 'error', 'warning', 'info'],
    http: new Request(),
    config, // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    mixin,
    mpMixin,
    props,
    ...index,
    color,
    platform
}

// $u挂载到uni对象上
uni.$u = $u

const install = (Vue) => {
    // 时间格式化，同时两个名称，date和timeFormat
    Vue.filter('timeFormat', (timestamp, format) => uni.$u.timeFormat(timestamp, format))
    Vue.filter('date', (timestamp, format) => uni.$u.timeFormat(timestamp, format))
    // 将多久以前的方法，注入到全局过滤器
    Vue.filter('timeFrom', (timestamp, format) => uni.$u.timeFrom(timestamp, format))
    // 同时挂载到uni和Vue.prototype中
    // #ifndef APP-NVUE
    // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
    Vue.prototype.$u = $u
    Vue.mixin(mixin)
    // #endif
}

export default {
    install
}
