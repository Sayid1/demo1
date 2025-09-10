import { isProduct } from './index'

export const projectName = 'xiaoyi_template'
// 只支持英文加下划线
export const projectEvent = 'xiaoyi_template'
// 埋点地址
export const serverUrls = {
	// 神策
	sensors: `https://sensorsdatas.xiaoyisz.com/sa?project=${isProduct ? 'saas_prod' : 'default'}`
}
