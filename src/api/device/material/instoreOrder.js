import { construction } from '@/utils/axios'
const { get, post } = construction
const projectId = localStorage.getItem('projectId')
export default {
  //添加入库单
  addOrder: data => {
    return post('/material/stock/add', data)
  },
  //获取列表
  getList: data => {
    return post('/material/stock/list', data)
  },
  deleteOrder: id => {
    return get(`/material/stock/delete/${id}`, {})
  },
  getDetailById: id => {
    return get(`/material/stock/get/${id}`, {})
  },
  updateOrder: data => {
    return post('/material/stock/update', data)
  },
  getPurchaseOrderById: data => {
    return get(`/material/dispatch/get/${data}`, {})
  },
  //入库
  handleInstore: data => {
    return post(`/material/stock/enter/${projectId}`, data)
  }
}
