<template>
  <TreeSelect
    :value="value"
    :options="treeData"
    :multiple="multiple"
    :valueFormat="valueFormat"
    loading-text="加载中..."
    :appendToBody="appendToBody"
    no-options-text="没有选项..."
    no-results-text="没有匹配的选项..."
    no-children-text="没有子项了"
    :disabled="disabled"
    placeholder="请选择"
    disable-branch-nodes
    :clearable="clearable"
    :append-to-body="appendToBody"
    @close="
      val => {
        $emit('close', val)
      }
    "
    @select="
      node => {
        if (!multiple) {
          $emit('update:id', node.id)
          $emit('update:name', node.label)
          $emit('update:departId', node.organId)
          $emit('update:departName', node.organName)
          $emit('update:mobile', node.mobile)
          $emit('change', node)
        }
      }
    "
    @input="onChange"
  />
</template>

<script>
import treeFilter from '@/utils/treeFilter'
export default {
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    value: [String, Number, Array, Object],
    disabled: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: String,
      default: 'object',
      enum: ['id', 'object']
    },
    disableKeys: {
      type: Array,
      default() {
        return []
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 需要显示的人员角色类型
    roles: {
      type: Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    // 分组关键字
    groupKey: {
      type: String,
      default: 'workType'
    },
    // groupKey是否从参数表中获取label
    fromArg: {
      type: Boolean,
      default: true
    },
    // 如果不从参数表中获取label，则label对应字段名称,若fromArg为false，则为必须参数
    labelName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      workerList: []
    }
  },
  computed: {
    treeData() {
      let groupList = _.groupBy(this.workerList, this.groupKey)
      let result = _.map(groupList, (v, k) => {
        let obj = new Object()
        obj.id = k
        obj.label = this.fromArg ? this.$getLabelFromArg(this.groupKey, k) : obj[this.labelName]
        obj.children = v
        if (obj.label === '-') {
          obj.label = '未分配'
          obj.isDisabled = true
          _.forEach(obj.children, e => (e.isDisabled = true))
        }
        return obj
      })
      return _.sortBy(result, this.groupKey)
    },
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  created() {
    this.getWorkerList()
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
      if (this.multiple) {
        let ids = val.length > 0 ? val.map(item => item.id).join(',') : ''
        let labels = val.length > 0 ? val.map(item => item.label).join(',') : ''
        this.$emit('update:id', ids)
        this.$emit('update:name', labels)
      }
    },
    async getWorkerList() {
      let result = await this.axios.labour.post('employee/list', {
        page: 1,
        rows: 100000,
        jobStatus: '1',
        projectId: this.projectId
      })
      let datas = result.data.records || []
      let list = []
      datas.map(item => {
        item.label = item.name
        list.push(item)
      })
      this.workerList = list
    }
  }
}
</script>
<style lang="less">
.vue-treeselect {
  display: inline-block;
  width: 100%;
  font-size: unset;
}
.el-form--inline {
  .vue-treeselect {
    width: 215px;
  }
}
</style>
