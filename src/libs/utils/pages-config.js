import pages from '@/pages-config/pages.js'
import tabBar from '@/pages-config/tab-bar.js'

const modulesFiles = require.context('../../pages-config/sub-packages', true, /\.js$/)
const subPackages = []

modulesFiles.keys().reduce((modules, modulePath) => {
	const value = modulesFiles(modulePath)
	subPackages.push(value)
	return modules
}, {})

/**
 * @description:
 * @param {Boolean} isNameKey 是否使用name当作key
 * @return {Object}
 * @author: dubangrong
 */
export const getRouters = function(isNameKey = true) {
	let obj = {}

	pages.forEach((v, i) => {
		let path = '/' + v.path
		let name = v.name
		let key = isNameKey ? name || path : path

		if (obj[key]) {
			console.error(`路由索引存在重复${key}`)
		}

		obj[key] = {
			...v,
			isHome: i === 0,
			path
		}
	})

	subPackages.forEach(v => {
		v.pages.forEach(v2 => {
			let path = '/' + v.root + '/' + v2.path
			let name = v2.name
			let key = isNameKey ? name || path : path

			if (obj[key]) {
				console.error(`路由索引存在重复${key}`)
			}
			obj[key] = {
				...v2,
				path
			}
		})
	})

	return obj
}

export const routersMap = getRouters()

// 路由配置
export const getRouterConfig = function() {
	return {
		pages: getRouters(false),
		tabBar
	}
}
