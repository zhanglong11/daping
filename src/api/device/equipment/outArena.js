import axios from '@/utils/axios'
export default {
  //列表
  list: param =>
    axios.construction.post(`/equipmentLeave/list`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //添加
  add: param =>
    axios.construction.post(`/equipmentLeave/save`, {
      ...param,
      projectId: localStorage.getItem('projectId')
    }),

  //更新
  update: param =>
    axios.construction.post(`/equipmentLeave/save`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //删除
  delete: id => axios.construction.get(`/equipmentLeave/delete/${id}`),

  //详情
  detail: id => axios.construction.get(`/equipmentLeave/get/${id}`),

  //提交审核
  submitAudit: param =>
    axios.construction.post(`/equipmentLeave/submit`, {
      ...param,
      projectId: localStorage.getItem('projectId')
    }),

  //审核
  audit: param => axios.construction.post(`/equipmentLeave/audit`, param)
}
