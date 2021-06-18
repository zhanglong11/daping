<template>
  <div class="content">
    <div class="safety">
      <div class="left" :style="`background: url('${bimTreeImage}') no-repeat`">
        <BimTree />
      </div>
      <div class="center">
        <div class="modelView" :style="`background: url('${modelView}') no-repeat`">
          <BimView ref="bim" @ready="getData" />
        </div>
      </div>
      <div class="right">
        <div class="safetyIssue" :style="`background: url('${safetyIssue}') no-repeat`">
          <SafetyIssueChart />
          <div class="search">
            <input class="input" placeholder="请输入" @input="handleInput" />
            <div class="icon"></div>
          </div>
          <div class="si-con">
            <div class="si-head">
              <div>问题编号</div>
              <div>问题描述</div>
              <div>紧急程度</div>
              <div>检查部位</div>
              <div>整改状态</div>
            </div>
            <div class="si-row-con">
              <div v-for="(item, index) in items" :key="index" class="si-row">
                <div>JPYT0008</div>
                <div>粱墙主筋锚固不规范</div>
                <div v-if="item.status === 0"><span class="status-0">●</span>一般</div>
                <div v-if="item.status === 1"><span class="status-1">●</span>较大</div>
                <div v-if="item.status === 2"><span class="status-2">●</span>严重</div>
                <div v-if="item.status === 3"><span class="status-3">●</span>重大</div>
                <div>钢筋工程</div>
                <div>未解决</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monomerTower from '../images/safety/monomer-tower.png'
import departmentType from '../images/safety/department-type.png'
import modelView from '../images/safety/model-view.png'
import safetyIssue from '../images/safety/safety-issue.png'
import SafetyIssueChart from './safetyIssueChart'
import bimTreeImage from '../images/bim-tree.png'
export default {
  components: { SafetyIssueChart },
  data() {
    return {
      monomerTower,
      departmentType,
      modelView,
      safetyIssue,
      bimTreeImage,
      items: []
    }
  },
  mounted() {
    this.init()

    // 安全问题假数据列表
    for (let i = 0; i < 20; i++) {
      let status = parseInt(Math.random() * 4)
      this.items.push({
        status: status
      })
    }
  },
  methods: {
    init() {
      this.onresize()
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    async getData() {
      this.$refs.bim.setMark(
        ['xra7PlYm+0/909735', 'xra7PlYm+1/220450', 'xra7PlYm+1/270048', 'xra7PlYm+1/308462', 'xra7PlYm+1/204424'],
        require('./images/quality.png')
      )
    },
    handleInput(e) {
      console.log(e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
.safety {
  display: flex;
  .left {
    width: 400px;
    padding: 15px;
    margin: 19px auto 0 auto;
    //.monomerTower {
    //  width: 365px;
    //  height: 465px;
    //  margin: 20px auto 0px auto;
    //}
    //.departmentType {
    //  width: 365px;
    //  height: 465px;
    //  margin: 33px auto 0px auto;
    //}
  }
  .center {
    width: 1020px;
    .modelView {
      width: 990px;
      height: 965px;
      margin: 19px auto 0px auto;
      padding: 40px 15px 20px 15px;
    }
  }
  .right {
    width: 510px;
    .safetyIssue {
      width: 476px;
      height: 965px;
      margin: 19px auto 0px auto;
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
    .si-con {
      margin: 0px 14px;
      padding-top: 20px;
      .si-head {
        display: flex;
        > div {
          font-size: 12px;
          background: #403c35;
          padding: 4px 0px;
          text-align: center;
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
          width: 16%;
        }
        > div:nth-child(4) {
          margin-left: 2px;
          width: 16%;
        }
        > div:nth-child(5) {
          margin-left: 2px;
          width: 16%;
        }
      }
      .si-row-con {
        height: 600px;
        overflow-y: auto;
        .si-row {
          display: flex;
          color: #d8d8d8;
          > div {
            font-size: 12px;
            padding: 6px 0px;
            text-align: center;
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
            width: 16%;
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
          > div:nth-child(4) {
            margin-left: 2px;
            width: 16%;
          }
          > div:nth-child(5) {
            margin-left: 2px;
            width: 16%;
          }
        }
        .si-row:nth-child(even) {
          background: #2c2927;
        }
      }
    }
  }
}
</style>
