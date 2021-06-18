<template>
  <el-dialog class="detail" :visible="visible" title="问题详情" append-to-body @close="close">
    <div class="wrap">
      <p>
        <span class="label">当前状态</span>
        <span class="val">{{ $getLabel(status, info.status) }}</span>
      </p>
      <p>
        <span class="label">问题描述</span>
        <span class="val">{{ info.problemDesc }}</span>
      </p>
      <p>
        <span class="label">问题部位</span>
        <span class="val">{{ info.problemArea }}</span>
      </p>
      <p>
        <span class="label">照片</span>
        <span class="val">
          <AttachmentDialog img-width="50px" :ids="info.fileId" type="previewImage" />
        </span>
      </p>
      <p>
        <span class="label">检查人</span>
        <span class="val">{{ info.creatorName }}</span>
      </p>
      <p>
        <span class="label">检查时间</span>
        <span class="val">{{ info.inspectTime }}</span>
      </p>
      <template v-if="info.rectifyReviewList && info.rectifyReviewList.length">
        <p>
          <span class="label">整改人</span>
          <span class="val">{{ info.rectifyName }}</span>
        </p>
        <p>
          <span class="label">整改时间</span>
          <span class="val">{{ info.rectifyTime }}</span>
        </p>
        <p>
          <span class="label">复查人</span>
          <span class="val">{{ info.recheckName }}</span>
        </p>
        <p>
          <span class="label">复查时间</span>
          <span class="val">{{ info.recheckTime }}</span>
        </p>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import Api from '../api'
import status from '../lib/status'
export default {
  name: 'QualitySafeDialog',
  // import引入的组件
  components: {},
  props: {
    visible: {},
    id: {}
  },
  data() {
    // 这里存放数据
    return {
      info: {},
      status
    }
  },
  // 生命周期 - 挂载完成
  created() {
    this.refresh()
  },
  // 方法集合
  methods: {
    //刷新
    async refresh() {
      let res = await Api.detail(this.id)
      // this.info = res.data
      this.initInfo(res.data)
      // this.info = res.data
    },
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },

    initInfo(data) {
      let rectifyList = data.rectifyReviewList
      if (!rectifyList || !rectifyList.length) {
        this.info = data
        return
      }
      //
      let rectify = rectifyList.filter(r => r.rectifyReviewFlag === 0)
      let recheck = rectifyList.filter(r => r.rectifyReviewFlag === 1)
      let rectifyClone = _.cloneDeep(rectify)
      let recheckClone = _.cloneDeep(recheck)
      let fileId = [
        data.fileId,
        ...rectifyClone.map(r => r.rectifyFileId),
        ...recheckClone.map(r => r.reviewFileId)
      ].filter(c => c)
      let rectifyTime = [...new Set(rectifyClone.map(r => r.rectifyTime))].join(', ')
      let recheckTime = [...new Set(recheckClone.map(r => r.reviewTime))].join(', ')
      let rectifyName = [...new Set(rectifyClone.map(r => r.rectifyPrincipalName))].join(', ')
      let recheckName = [...new Set(recheckClone.map(r => r.reviewPrincipalName))].join(', ')
      this.info = {
        ...data,
        fileId: [...new Set(fileId)].join(','),
        rectifyTime,
        recheckTime,
        rectifyName,
        recheckName
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  > p {
    display: flex;
    padding: 10px;
    > .label {
      min-width: 80px;
      color: #a8a4a4;
    }
    > .val {
      color: #fff;
      //flex: 1;
    }
  }
}
.detail {
  /deep/ .el-dialog {
    background: url('../images/detail-back.png') no-repeat;
    background-size: 100% 100%;
    color: #fff !important;
    .el-dialog__title {
      color: #fff;
    }
  }
}
</style>
