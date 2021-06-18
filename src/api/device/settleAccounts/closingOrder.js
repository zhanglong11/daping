import axios from '@/utils/axios'
export default {
  //获取租赁单详情
  getLeaseOrderDetail: id => {
    return axios.construction.get(`/material/dispatch/get/${id}`)
  },
  //新增物资租赁结算单
  addClosingOrder: data => {
    return axios.construction.post('/material/rent/settlement/bill/add', data)
  },
  //编辑物资租赁结算单
  editClosingOrder: data => {
    return axios.construction.post('/material/rent/settlement/bill/update', data)
  },
  //查询物资租赁结算单列表
  getClosingOrderList: data => {
    return axios.construction.post('/material/rent/settlement/bill/list', data)
  },
  //查询物资租赁结算单详情
  getClosingOrderDetailById: id => {
    return axios.construction.get(`/material/rent/settlement/bill/get/${id}`)
  },
  //删除物资租赁结算单
  deleteClosingOrder: id => {
    return axios.construction.get(`/material/rent/settlement/bill/delete/${id}`)
  }
}
