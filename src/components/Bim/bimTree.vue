<template>
  <div>
    <el-tree
      class="tree"
      :data="bimTree"
      node-key="id"
      show-checkbox
      :props="defaultProps"
      :default-checked-keys="defaultCheckIds"
      @check="checkChange"
    />
  </div>
</template>

<script>
import treeForEach from '@/utils/treeForEach'
export default {
  name: 'BimTree',
  // import引入的组件
  components: {},
  data() {
    // 这里存放数据
    return {
      defaultProps: { children: 'children', label: 'name' },
      defaultCheckIds: []
    }
  },
  computed: {
    bimTree() {
      return this.$store.state.bim.bimTreeData
    }
  },
  watch: {
    bimTree() {
      this.getTreeId()
    }
  },
  // 生命周期 - 挂载完成
  created() {
    this.refresh()
  },
  // 方法集合
  methods: {
    //刷新
    refresh() {
      this.getTreeId()
    },
    getTreeId() {
      let idAry = []
      let copy = _.cloneDeep(this.bimTree)
      treeForEach(copy, e => {
        idAry.push(e.id)
      })
      this.defaultCheckIds = idAry
    },
    checkChange(data, { checkedNodes }) {
      let ele = checkedNodes.filter(v => v.type === 'element')
      this.$parent.$refs?.bim?.showGuid(ele.map(c => c.id))
      this.$emit('changeBox', checkedNodes)
    }
  }
}
</script>

<style scoped lang="less">
.tree.el-tree {
  background: transparent;
  color: #d2cac2;
  /deep/.el-tree-node__content {
    //&.is-current {
    //  background: red;
    //}
    //&:hover {
    //  background: red;
    //}
  }
}
</style>
