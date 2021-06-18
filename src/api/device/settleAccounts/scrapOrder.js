import axios from '@/utils/axios'
export default {
  //查询物资报废处理单列表
  getScrapOrderList: data => {
    return axios.construction.post('/material/scrap/bill/list', data)
  },
  //新增物资报废处理单
  addScrapOrder: data => {
    return axios.construction.post('/material/scrap/bill/add', data)
  },
  //编辑物资报废处理单
  editScrapOrder: data => {
    return axios.construction.post('/material/scrap/bill/update', data)
  },
  //查询物资报废处理单详情
  getScrapOrderDetail: id => {
    return axios.construction.get(`/material/scrap/bill/get/${id}`)
  },
  //删除物资报废处理单
  deleteScrapOrder: id => {
    return axios.construction.get(`/material/scrap/bill/delete/${id}`)
  }
}
