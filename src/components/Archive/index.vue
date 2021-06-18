<template>
  <el-button v-if="fileIds && !flag" type="primary" @click="handleArchive"> 归档 </el-button>
</template>
<script>
export default {
  name: 'Archive',
  props: {
    id: {
      required: true
    },
    //文件id
    fileIds: {},
    //名称
    name: {},
    //模块
    module: {},
    //是否已归档
    flag: {
      type: Number,
      default: 1
    }
  },
  methods: {
    //归档
    async handleArchive() {
      let fileIds = this.fileIds
      let param = {
        targetDataId: this.id,
        name: this.name + '归档' + this.id,
        fileIds: fileIds,
        fileNum: fileIds.split(',').length,
        module: this.module,
        projectId: localStorage.getItem('projectId')
      }
      await this.axios.construction.post(`/pigeonhole/add`, param)
      this.$message.success('归档成功')
      this.$emit('update:flag', 1)
    }
  }
}
</script>
<style lang="less" scoped></style>
