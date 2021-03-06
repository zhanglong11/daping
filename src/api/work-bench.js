import http from '@/utils/axios'
export const workBenchApi = {
  // 获取项目列表
  queryProjectList: data => {
    return http.post('cim6d/system/project/list', data)
  },
  // 添加消息
  addMessage: data => {
    return http({
      url: 'common/message/add',
      method: 'post',
      data
    })
  },
  // 编辑消息
  updateMessage: data => {
    return http({
      url: 'common/message/update',
      method: 'post',
      data
    })
  },
  // 删除消息
  deleteMessage: id => {
    return http({
      url: `common/message/delete/${id}`,
      method: 'get'
    })
  },
  // 获取消息详情
  getDetailsMessage: id => {
    return http({
      url: `common/message/get/${id}`,
      method: 'get'
    })
  },
  // 查询未读数量
  getUnreadMessage: () => {
    return http({
      url: 'common/message/unread/count',
      method: 'post',
      data: {}
    })
  },
  // 查询用户详情
  getUserInfo: id => {
    return http({
      url: `cim6d/system/user/get/${id}`,
      method: 'get'
    })
  },
  // 获取任务列表
  queryTaskList: data => {
    return http.workflow({
      url: '/task/list',
      method: 'post',
      data
    })
  },
  // 我发起的流程
  queryInstanceActivitiList: data => {
    return http.workflow({
      url: '/activiti/process/instance/started',
      method: 'post',
      data
    })
  },
  // 审批
  completeTask: (taskId, data) => {
    return http.workflow({
      url: `/task/complete/${taskId}`,
      method: 'post',
      data
    })
  },
  // 获取任务详情
  getTask: (processInstanceId, activityId) => {
    return http.workflow({
      url: `/task/get/${processInstanceId}/${activityId}`,
      method: 'get'
    })
  },
  // 获取文件详情
  getFileUrl: id => {
    return http.file({
      url: `/file/manage/get/${id}`,
      method: 'get'
    })
  },
  // 查询大事记
  queryEventList: data => {
    return http.design({
      url: 'project/event/list',
      method: 'post',
      data
    })
  },
  // 添加大事记
  addEvent: data => {
    return http.design({
      url: 'project/event/add',
      method: 'post',
      data
    })
  },
  // 编辑大事记
  updateEvent: data => {
    return http.design({
      url: 'project/event/update',
      method: 'post',
      data
    })
  },
  // 获取大事记详情
  getDetailsEvent: id => {
    return http.design({
      url: `project/event/get/${id}`,
      method: 'get'
    })
  },
  // 删除大事记
  deleteEvent: id => {
    return http.design({
      url: `project/event/delete/${id}`,
      method: 'get'
    })
  }
}
