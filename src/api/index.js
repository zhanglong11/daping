/*
 * @Description:公共接口
 * @Version:
 * @Autor:
 * @Date: 2020-02-14 17:02:48
 * @LastEditTime: 2020-02-21 10:16:08
 */
import { service as system } from '@/utils/axios'
export default {
  getOrganList() {
    return system.post('cim6d/system/project/organ/query', { projectId: localStorage.getItem('projectId') })
  },
  // 获取用户可用权限
  getPermissionList() {
    return system.get('cim6d/system/power/available')
  },
  // 获取所属公司详情
  getCompanyInfo() {
    return system.get('cim6d/system/company/info/get')
  },
  // 获取项目下部门列表
  getDepartList(data) {
    return system.post('cim6d/system/project/organ/list', data)
  },
  // 获取参项单位列表
  getCompanyListByProjectId: id => {
    return system.system.get('/project/participant/company/list/' + id)
  },
  getUserList(data) {
    return system.post('cim6d/system/user/list', data)
  },
  // 参数列表
  /**
   * @param {{argGroup: string, [module]: String}} body 参数对象
   */
  getArgList(body) {
    return system.construction.post('/cim6d/arg/tree', { module: 'construction' })
  },
  //添加参数
  /**
   * @param {{argGroup: string, argText: String, [module]: String}} arg 参数对象
   */
  addArg(arg) {
    return system.construction.post('/building/arg/add', {
      module: 'construction',
      projectId: localStorage.getItem('projectId'),
      ...arg
    })
  },
  // 参数详情
  getArgById(id) {
    return system.construction.get('/building/arg/get/' + id, {})
  },
  // 编辑参数
  updateArg(arg) {
    return system.construction.post('/building/arg/update', arg)
  },
  // 删除参数
  removeArgById(id) {
    return system.construction.get('/building/arg/delete/' + id, null)
  }
}
