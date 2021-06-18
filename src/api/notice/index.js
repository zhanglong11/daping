/*
公告管理的api
 */
import http from '@/utils/axios'
export const noticeApi = {
  // 获取项目列表
  queryProjectList: data => {
    return http.post('cim6d/system/project/list', data)
  },
  // 查询消息列表
  queryListNotice: data => {
    Object.assign(data, {
      projectType: 'construction',
      projectId: localStorage.getItem('projectId')
    })
    return http({
      url: 'announcement/list',
      method: 'post',
      data
    })
  },
  // 获取消息详情
  getDetailsNotice: id => {
    return http({
      url: `announcement/get/${id}`,
      method: 'get'
    })
  },
  // 添加消息
  addNotice: data => {
    return http({
      url: 'announcement/add',
      method: 'post',
      data
    })
  },
  // 编辑消息
  updateNotice: data => {
    return http({
      url: 'announcement/update',
      method: 'post',
      data
    })
  },
  // 删除消息
  deleteNotice: id => {
    return http({
      url: `announcement/delete/${id}`,
      method: 'get'
    })
  },
  // 查询用户详情
  getUserInfo: id => {
    return http({
      url: `cim6d/system/user/get/${id}`,
      method: 'get'
    })
  }
}
