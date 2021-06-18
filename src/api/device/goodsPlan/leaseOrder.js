import axios from '@/utils/axios'
export default {
  //租赁单列表
  getLeaseOrderList: data => {
    return axios.construction.post('/material/dispatch/list', data)
  },
  //根据租赁计划id查询租赁计划明细
  getPlanDetailList: id => {
    return axios.construction.get(`/material/plan/detail/get/${id}`)
  },
  //根据租赁合同id查询租赁合同明细
  getContractDetailList: data => {
    return axios.construction.post('/contractInventoryPurchase/list', data)
  },
  //获取租赁单详情
  getLeaseOrderDetail: id => {
    return axios.construction.get(`/material/dispatch/get/${id}`)
  },
  //添加租赁单
  addLeaseOrder: data => {
    return axios.construction.post('/material/dispatch/add', data)
  },
  //编辑租赁单
  editLeaseOrder: data => {
    return axios.construction.post('/material/dispatch/update', data)
  },
  //删除租赁单
  deleteLeaseOrder: id => {
    return axios.construction.get(`/material/dispatch/delete/${id}`)
  }
}
