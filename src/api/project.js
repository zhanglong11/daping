/*
 * @Description:项目概况
 * @Author:
 * @Date: 2020-01-14 10:05:42
 */
import { service as system } from '@/utils/axios'
//获取项目详情
export const getProjectById = id => {
  return system.get(`/cim6d/system/project/get/${id}`)
}
// 获取主办方配置列表
export const getPartiesRecordList = data => {
  return system.post(`project/participant/tree`, data)
}
// 删除项目
export const removeProject = id => {
  return system({
    url: `/cim6d/system/project/delete/${id}`,
    method: 'get'
  })
}
