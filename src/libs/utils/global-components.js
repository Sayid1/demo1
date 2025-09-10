import { getCommonComponentVm } from './page'
import dialogConfig from './global-components-config'
import { checkMountedPages } from '@/libs/utils/sys'

const _showLoading = uni.showLoading
const _showToast = uni.showToast
const _hideLoading = uni.hideLoading

// 生成弹窗函数
const createPageAction = function({ refKey, fnKey }, opts, page) {
	return getCommonComponentVm(refKey, opts, page)
		.then(instance => {
			if (instance && typeof instance[fnKey] === 'function') {
				return instance[fnKey](opts)
			}
			return Promise.reject()
		})
		.catch(err => {
			return Promise.reject(err)
		})
}

// 替换uni.showToast
const showToast = function(title, opts) {
	if (typeof title !== 'string') {
		opts = {
			...title,
			...opts
		}

		title = ''
	}
	const opts2 = {
		title,
		icon: 'none',
		...opts
	}
	createPageAction(
		{
			refKey: 'toast',
			fnKey: 'showToast'
		},
		opts2
	).catch(() => {
		_showToast(opts2)
	})
}

// 替换uni.showLoading
const showLoading = function(title, opts) {
	if (typeof title !== 'string') {
		opts = {
			...title,
			...opts
		}

		title = ''
	}
	const opts2 = {
		title,
		icon: 'none',
		...opts
	}
	createPageAction(
		{
			refKey: 'toastLoading',
			fnKey: 'showLoading'
		},
		opts2
	).catch(() => {
		_showLoading(opts2)
	})
}

// 替换uni.hideLoading
const hideLoading = async function(opts) {
	await checkMountedPages()
	let pages = await getCurrentPages()
	setTimeout(() => {
		pages.forEach(page => {
			createPageAction(
				{
					refKey: 'toastLoading',
					fnKey: 'hideLoading'
				},
				opts,
				page
			)
		})
	}, 0)

	_hideLoading(opts)
}

// 批量生成弹窗函数
const getDialogFns = function() {
	let dialogFns = {}
	for (const p in dialogConfig) {
		if (Object.hasOwnProperty.call(dialogConfig, p)) {
			const item = dialogConfig[p]
			for (const k in item) {
				if (Object.hasOwnProperty.call(item, k)) {
					let fnKey = item[k]
					dialogFns[k] = function(opts) {
						createPageAction(
							{
								refKey: p,
								fnKey
							},
							opts
						)
					}
				}
			}
		}
	}

	return dialogFns
}

export default {
	showToast,
	showLoading,
	hideLoading,
	...getDialogFns()
}
