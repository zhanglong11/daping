import axios from '@/utils/axios'
import toTree from '@/utils/toTree'

export default {
  getOrganList() {
    return axios.system.post('cim6d/system/project/organ/query/', { projectId: localStorage.getItem('projectId') })
  },
  getRoleList() {
    return axios.system
      .post('cim6d/system/project/organ/query', { projectId: localStorage.getItem('projectId') })
      .then(res => (res.data ? res.data : []))
  },
  getRoleCategory() {
    return axios.system
      .post('cim6d/system/project/role', { projectId: localStorage.getItem('projectId') })
      .then(res => (res.data ? res.data : []))
  },
  getFormList() {
    return axios.workflow.post('custom/form/list', { page: 1, rows: 1000 }).then(res => res.data)
  },
  getProcessCategory() {
    return axios.workflow
      .post('activiti/process/type/list', {
        page: 1,
        rows: 10000,
        argGroup: 'processCategory'
      })
      .then(res => {
        return res.data.records
      })
  }
}
