import axios from '@/utils/axios'
export default {
  //列表
  list: param =>
    axios.construction.post(`/equipmentFaultRepair/list`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //添加
  add: param =>
    axios.construction.post(`/equipmentFaultRepair/save`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //更新
  update: param =>
    axios.construction.post(`/equipmentFaultRepair/save`, {
      projectId: localStorage.getItem('projectId'),
      ...param
    }),

  //删除
  delete: id => axios.construction.get(`/equipmentFaultRepair/delete/${id}`),

  //详情
  detail: id => axios.construction.get(`/equipmentFaultRepair/get/${id}`),

  //提交审核
  submitAudit: param =>
    axios.construction.post(`/equipmentFaultRepair/submit`, {
      ...param,
      projectId: localStorage.getItem('projectId')
    }),

  //审核
  audit: param => axios.construction.post(`/equipmentFaultRepair/audit`, param)
}
