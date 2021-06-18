import axios from '@/utils/axios'
export default {
  //采购单列表
  getPurchaseOrderList: data => {
    return axios.construction.post('/material/dispatch/list', data)
  },
  //根据需用计划id查询需用计划明细
  getPlanDetailList: id => {
    return axios.construction.get(`/material/plan/detail/get/${id}`)
  },
  //根据采购合同id查询采购合同明细
  getContractDetailList: data => {
    return axios.construction.post('/contractInventoryPurchase/list', data)
  },
  //获取采购单详情
  getPurchaseOrderDetail: id => {
    return axios.construction.get(`/material/dispatch/get/${id}`)
  },
  //添加采购单
  addPurchaseOrder: data => {
    return axios.construction.post('/material/dispatch/add', data)
  },
  //编辑采购单
  editPurchaseOrder: data => {
    return axios.construction.post('/material/dispatch/update', data)
  },
  //删除采购单
  deletePurchaseOrder: id => {
    return axios.construction.get(`/material/dispatch/delete/${id}`)
  }
}
