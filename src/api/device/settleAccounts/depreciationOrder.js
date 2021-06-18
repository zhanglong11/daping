import axios from '@/utils/axios'
export default {
  //查询物资折旧单列表
  getDepreciationOrderList: data => {
    return axios.construction.post('/material/depreciation/bill/list', data)
  },
  //新增物资折旧单
  addDepreciationOrder: data => {
    return axios.construction.post('/material/depreciation/bill/add', data)
  },
  //编辑物资折旧单
  editDepreciationOrder: data => {
    return axios.construction.post('/material/depreciation/bill/update', data)
  },
  //查询物资折旧单详情
  getDepreciationOrderDetailById: id => {
    return axios.construction.get(`/material/depreciation/bill/get/${id}`)
  },
  //删除物资折旧单
  deleteDepreciationOrder: id => {
    return axios.construction.get(`/material/depreciation/bill/delete/${id}`)
  }
}
