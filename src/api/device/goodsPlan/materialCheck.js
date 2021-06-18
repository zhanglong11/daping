import axios from '@/utils/axios'
export default {
  //查询原材料检验计划列表
  getMaterialCheckList: data => {
    return axios.construction.post('/raw/material/inspect/rule/list', data)
  },
  //新增(编辑)原材料检验计划
  addMaterialCheck: data => {
    return axios.construction.post('/raw/material/inspect/rule/add', data)
  },
  //删除原材料检验计划
  deleteMaterialCheck: id => {
    return axios.construction.get(`/raw/material/inspect/rule/delete/${id}`)
  }
}
