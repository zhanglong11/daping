<template>
  <div>
    <ul v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="index" class="fileItem">
        <span>{{ item.fileName }}</span>
        <PreviewByFileId :fileId="item.id" />
        <DownloadByFileId :file-id="item.id" :file-name="item.fileName" />
      </li>
    </ul>
    <ul v-else>
      <li style="margin-left: 10px">无附件</li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/file'
export default {
  props: {
    // 文件id集合
    ids: {}
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    ids: {
      handler: function (n, e) {
        if (n) {
          this.getFileList()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getFileList() {
      let arr = this.ids ? this.ids.split(',') : []
      let res = await api.getFileList(arr)
      this.list = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.fileItem {
  padding-bottom: 4px;
  > span {
    margin-left: 14px;
  }
  > a {
    margin-left: 8px;
  }
}
</style>
