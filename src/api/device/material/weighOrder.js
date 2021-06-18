import { construction } from '@/utils/axios'
const { get, post } = construction
export default {
  //添加过磅单
  addOrder: data => {
    return post('/weight/bill/add', data)
  },
  //获取过磅单列表
  getList: data => {
    return post('/weight/bill/list', data)
  },
  deleteOrder: id => {
    return get(`/weight/bill/delete/${id}`, {})
  },
  getDetailById: id => {
    return get(`/weight/bill/get/${id}`, {})
  },
  updateOrder: data => {
    return post('/weight/bill/update', data)
  },
  getPurchaseOrderList: data => {
    return post('/material/dispatch/list', data)
  },
  //根据采购单id获取详情
  getPurchaseOrderById: data => {
    return get(`/material/dispatch/get/${data}`, {})
  }
}
