import '@/libs/prototype/uni'
import App from './App'
import store from './store'
import Vue from 'vue'
import uView from '@/mixins/uview'
// import uView from 'uview-ui'
import globalMixins from '@/mixins/global.js'
import vueProtoType from '@/libs/prototype'
import '@/config/props'
import { addVConsole } from './libs/utils/debug'
console.log(uni.$u.config.v)
Vue.use(uView)
Vue.use(vueProtoType)
Vue.mixin(globalMixins)

// #ifdef H5
addVConsole()
// #endif

uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		tabbar: {
			activeColor: '#333',
			inactiveColor: '#999'
		}
	}
})

// #ifndef VUE3
/**
 * 限制输入小数
 * decimal：限制小数位。0：不允许输入小数点；-1：不限制；其他正整数。默认不限制。
 * maxLength：限制最大长度。包含小数位和负号。默认值255
 **/
Vue.prototype.prohibitNegative = function (value, decimal = -1, maxLength = 255) {
	if (!value) {
		return value
	}
	if (value == '.' || value == '。') {
		return ''
	}
	value = value.replace('。', '.')
	//限制输入小数点
	if (decimal == 0) {
		value = value
			.replace(
				/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
				''
			)
			.replace(/\s/g, '')
			.replace('^[-]{0,1}d+$', '')
			.replace(/[a-zA-Z]+/, '')
	} else {
		value = value
			.replace(
				/[`~!@#$%^&*()_\-+=<>?:"{}|,/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
				''
			)
			.replace(/\s/g, '')
			.replace('^[-]{0,1}d+$', '')
			.replace(/[a-zA-Z]+/, '')
	}
	//限制小数位
	if (decimal > 0) {
		let regex = new RegExp(`^\\d+(?:\\.\\d{0,${decimal}})?`, 'g')
		// value = value.replace(regex, '')
		value = (value && value.match(regex)[0]) || null
	}
	//限制长度
	if (maxLength > 0 && value && value.length >= maxLength) {
		value = value.slice(0, maxLength)
	}

	return value
}
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
// store.dispatch("tabbar/getTabbarList");
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif
