/**
 * 模袋云相关后端接口，模袋云只有前端sdk，所以部分信息前端操作之后需要同步到后端
 */

import { system } from '@/utils/axios'

/**
 * 创建模型
 */
export const createModel = body => system.post('bimModel/combine/add', body)

/**
 * 覆盖模型
 */

export const overwriteModel = body => system.post('bimModel/combine/update', body)

/**
 * 获取单模列表
 */
export const getModelList = () => system.post('bimModel/single/list', {})

/**
 * 获取激活的模型ID
 */
export const getActiveMergerModel = () => system.post('bimModel/combine', {})

/**
 * 删除模型
 */
export const removeModel = body => system.post('bimModel/combine/del', body)
