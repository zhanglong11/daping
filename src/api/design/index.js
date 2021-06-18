import axios from '@/utils/axios'
export default {
  getProcessGroupList() {
    return axios.design.post('process/group/list', {})
  },
  // 发起流程
  flowStar(data) {
    return axios.design.post('process/instance/start', data)
  },
  // 流程模板详情
  getFlowDetails(id) {
    return axios.design.get('/process/template/get/' + id)
  },

  getProcessTemplateList() {
    return axios.design
      .post('process/template/list', {
        projectId: localStorage.getItem('projectId'),
        page: 1,
        rows: 1000
      })
      .then(res => res.data.records)
  },
  // 获取任务信息
  getTaskInfo(projectId) {
    return axios.design.get('schedule/task/flowChart/' + projectId)
  }
}
