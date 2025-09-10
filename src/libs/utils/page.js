// 获取当前页面实例
const getPages = function() {
	return new Promise(resolve => {
		let pages = getCurrentPages()
		if (pages.length) {
			resolve(pages)
		} else {
			setTimeout(() => {
				getPages().then(ret => {
					resolve(ret)
				})
			}, 100)
		}
	})
}

// 获取当前页面的ref
export const getPageRefVm = function(key, page) {
	return getPageVm(page).then(vm => {
		return vm.$refs[key]
	})
}

// 获取当前页面vue实例
export const getPageVm = function(page, times = 0) {
	return new Promise(resolve => {
		let vm = null
		if (page) {
			vm = page
			fn(vm, times, page)
		} else {
			getPages().then(pages => {
				vm = pages[pages.length - 1]
				fn(vm, times, page)
			})
		}

		function fn(vm, times, page) {
			if (vm || times > 150) {
				// $proxyVm 代理vm 页面嵌套其他页面当做组件
				resolve(vm.$proxyVm || vm.$vm || vm)
			} else {
				setTimeout(() => {
					getPageVm(page, times + 1)
						.then(ret => {
							resolve(ret)
						})
						.catch(() => {})
				}, 30)
			}
		}
	})
}

export const getParentUiPage = function(vm) {
	if (vm.$options.name === 'ui-page') {
		return Promise.resolve(vm)
	} else if (vm.$parent) {
		return getParentUiPage(vm.$parent)
	}
	return getUiPageVm()
}
export const getParentUiPageSync = function(vm) {
	if (vm.$options.name === 'ui-page') {
		return vm
	} else if (vm.$parent) {
		return getParentUiPageSync(vm.$parent)
	}
	return vm
}
export const getParentPage = async function(vm) {
	let isPage = (vm.mpType || vm.$mp?.mpType) === 'page'
	if (isPage) return vm
	let uiPage = await getParentUiPage(vm)
	return uiPage.$parent || uiPage
}

export const getParentPageSync = function(vm) {
	let isPage = (vm.mpType || vm.$mp?.mpType) === 'page'
	if (isPage) return vm
	let uiPage = getParentUiPageSync(vm)

	return uiPage.$parent
}

// 获取uipage 实例
export const getUiPageVm = function(page) {
	return new Promise((resolve, reject) => {
		getPageVm(page, 0)
			.then(vm => {
				if (vm && vm.$nextTick) {
					vm.$nextTick(() => {
						setTimeout(() => {
							let { $children = [] } = vm
							let instance = null
							$children.forEach(item => {
								if (!instance && item.$options.name === 'ui-page') {
									instance = item
								}
							})
							if (instance) {
								resolve(instance)
							} else {
								reject(null)
							}
						}, 30)
					})
				} else {
					reject(null)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 获取全局组件实例
export const getCommonComponentVm = function(ref, opts, page) {
	return getUiPageVm(page).then(vm => {
		return vm.getCommonComponent(ref, opts)
	})
}
