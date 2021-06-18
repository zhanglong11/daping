<template>
  <div class="content">
    <div class="quality">
      <div class="left block">
        <div><BimTree class="screen" /></div>
      </div>
      <div class="center block">
        <div class="title"><img src="./images/quality.png" />模型展示</div>
        <div class="modelView">
          <!--          <BimView ref="bim" @ready="getData" />-->
          <ViewerSync></ViewerSync>
        </div>
      </div>
      <div class="right block">
        <div class="qualityIssue">
          <div class="title">
            <template v-if="type === 1">
              <img src="./images/quality.png" />
              质量问题
            </template>
            <template v-if="type === 2">
              <img src="./images/safe.png" />
              安全问题
            </template>
          </div>
          <QualityIssueChart :type="type" />
          <div class="search">
            <input class="input" placeholder="请输入" @input="e => (search = e.target.value)" />
            <div class="icon" @click="getTableData"></div>
          </div>
          <div class="pi-con">
            <div class="pi-head">
              <div>序号</div>
              <div>问题描述</div>
              <div>检查部位</div>
              <div>整改状态</div>
            </div>
            <div class="pi-row-con">
              <div
                v-for="(item, index) in tableData"
                :key="index"
                :class="['pi-row', currentId === item.id ? 'active' : '']"
                @click="showDetail(item.id)"
              >
                <div>{{ index + 1 }}</div>
                <div>{{ item.problemDesc }}</div>
                <div>{{ item.problemArea }}</div>
                <div v-if="item.status === 0"><span class="status-0">●</span>草稿</div>
                <div v-if="item.status === 1"><span class="status-1">●</span>待整改</div>
                <div v-if="item.status === 2"><span class="status-2">●</span>待复查</div>
                <div v-if="item.status === 3"><span class="status-3">●</span>复查合格</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <QualitySafeDialog v-if="visible" :id="activeId" :visible.sync="visible" />
  </div>
</template>

<script>
import modelView from '../images/quality/model-view.png'
import qualityIssue from '../images/quality/quality-issue.png'
import safeIssue from '../images/quality/safety-issue.png'
import QualityIssueChart from './qualityIssueChart'
import QualitySafeDialog from './components/qualitySafeDialog'
import Api from './api'
export default {
  components: { QualityIssueChart, QualitySafeDialog },
  data() {
    return {
      modelView,
      qualityIssue,
      safeIssue,
      visible: false,
      search: '',
      activeId: null,
      currentId: null,
      tableData: []
    }
  },
  computed: {
    type() {
      return this.$route.meta.type
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.onresize()
      this.getTableData()
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    async getTableData() {
      let res = await Api.list({ search: this.search, inspectType: this.type })
      this.tableData = res.data
    },
    async getData(idAry = []) {
      this.$refs.bim.clearMark()
      let res = this.type === 1 ? await Api.getQualityModelId(idAry) : await Api.getSafeModelId(idAry)
      let elementId = res.data.filter(d => d.componentIdList && d.componentIdList.length)
      let initEleAry = [...new Set(elementId.map(e => e.componentIdList).flat())]
      if (!initEleAry || !initEleAry.length) {
        return
      }
      this.$refs.bim.setMark(initEleAry, require('./images/issue.png'))
    },

    handleInput(e) {
      console.log(e.target.value)
    },
    showDetail(id) {
      this.currentId = this.currentId === id ? null : id
      this.activeId = id
      this.visible = this.currentId === id
      this.currentId ? this.getData([this.currentId]) : this.getData([])
    }
  }
}
</script>

<style lang="less" scoped>
.quality {
  display: flex;
  .left {
    width: 400px;
    padding: 15px;
    > div {
      height: 1000px;
      overflow: auto;
    }
  }
  .center {
    width: 1020px;
    margin: 0 20px;
    .modelView {
      width: 990px;
      height: 965px;
    }
  }
  .right {
    width: 510px;
    .qualityIssue {
      width: 476px;
      height: 1000px;
    }
    .search {
      display: flex;
      border: solid 1px #95713d;
      margin: 20px 14px 0px 14px;
      border-radius: 4px;
      padding: 6px 6px;
      align-items: center;
      justify-content: space-between;
      .input {
        outline: none;
        border: 0px;
        background: transparent;
        color: #a0a0a0;
        font-size: 14px;
        width: 390px;
      }
      .icon {
        width: 28px;
        height: 14px;
        background: url('../images/quality/qi-cha.png') 8px 0px no-repeat;
        border-left: solid 1px #f5c775;
        cursor: pointer;
      }
    }
    .pi-con {
      margin: 0px 14px;
      padding-top: 20px;
      .pi-head {
        display: flex;
        > div {
          font-size: 12px;
          background: #403c35;
          padding: 4px 0px;
          text-align: center;
          overflow-wrap: break-word;
        }
        > div:nth-child(1) {
          width: 16%;
        }
        > div:nth-child(2) {
          margin-left: 2px;
          width: 36%;
          text-align: left;
          text-indent: 8px;
        }
        > div:nth-child(3) {
          margin-left: 2px;
          width: 30%;
        }
        > div:nth-child(4) {
          margin-left: 2px;
          width: 18%;
        }
        //> div:nth-child(5) {
        //  margin-left: 2px;
        //  width: 16%;
        //}
      }
      .pi-row-con {
        height: 600px;
        overflow-y: auto;
        .pi-row {
          display: flex;
          color: #d8d8d8;
          cursor: pointer;
          &.active {
            color: #000;
            background: #f5c775;
          }
          > div {
            font-size: 12px;
            padding: 6px 0px;
            text-align: center;
            overflow-wrap: break-word;
          }
          > div:nth-child(1) {
            width: 16%;
          }
          > div:nth-child(2) {
            margin-left: 2px;
            width: 36%;
            text-align: left;
            text-indent: 8px;
          }
          > div:nth-child(3) {
            margin-left: 2px;
            width: 30%;
          }
          > div:nth-child(4) {
            width: 18%;
            padding-left: 8px;
            text-align: left;
            > span {
              margin-right: 12px;
            }
            .status-0 {
              color: #fde521;
            }
            .status-1 {
              color: #419bf9;
            }
            .status-2 {
              color: #f8a715;
            }
            .status-3 {
              color: #ed536d;
            }
          }
        }
        .pi-row:nth-child(even) {
          background: #2c2927;
          &.active {
            color: #000;
            background: #f5c775;
          }
        }
      }
    }
  }
}
</style>
