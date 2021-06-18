<template>
  <div class="main-wrap">
    <div class="top">
      <aside>
        <BimTree />
      </aside>
      <div class="model-wrap">
        <BimView />
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <p><span>开工时间</span><span>2019-09-17</span></p>
        <p><span>竣工时间</span><span>2020-09-17</span></p>
      </div>
      <div class="content">
        <div class="progress-wrap">
          <p>
            <span class="num">140</span>
            <span>计划工期 (天)</span>
          </p>
          <div><Progress /></div>
          <p>
            <span class="num">148</span>
            <span>总工期 (天)</span>
          </p>
        </div>
        <div class="table-wrap">
          <!-- 工具栏 start -->
          <div class="tooltips">
            <el-form inline>
              <el-form-item label="选择工期">
                <SelectList v-model="filterForm.type" :self-list="workType" :has-all-option="false" />
              </el-form-item>
              <el-form-item label="计划时间">
                <DateRange :startTime.sync="filterForm.startDate" :endTime.sync="filterForm.endDate" />
              </el-form-item>
              <el-form-item label="时间跨度">
                <SelectList
                  v-model="filterForm.date"
                  :self-list="dateType"
                  style="width: 100px"
                  :has-all-option="false"
                />
              </el-form-item>
              <!--              <el-form-item>-->
              <!--                <el-button-group>-->
              <!--                  <el-button type="primary" icon="el-icon-search" @click="refresh">搜索</el-button>-->
              <!--                  <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>-->
              <!--                </el-button-group>-->
              <!--              </el-form-item>-->
            </el-form>
          </div>
          <el-table class="table" :data="tableData" max-height="120" align="center">
            <el-table-column prop="creatorName" label="姓名" />
            <el-table-column prop="inspectTime" label="检查时间" />
          </el-table>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="container" />
        <div class="inner" />
        <div class="finger" />
        <div class="text">开始模拟</div>
      </div>
    </div>
  </div>
</template>

<script>
import departmentType from '../images/schedule/department-type.png'
import modelView from '../images/schedule/model-view.png'
import progressSimulate from '../images/schedule/progress-simulate.png'
import Api from './api'
import Progress from './components/progress'
export default {
  components: { Progress },
  data() {
    return {
      departmentType,
      modelView,
      progressSimulate,
      workType: [
        {
          label: '计划工期',
          value: 1
        },
        {
          label: '实际工期',
          value: 2
        }
      ],
      dateType: [
        {
          label: '周',
          value: 1
        },
        {
          label: '月',
          value: 2
        }
      ],
      filterForm: {
        page: 1,
        rows: 999
      },
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.onresize()
      this.refresh()
    },
    //监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    async refresh() {
      let res = await Api.list(this.filterForm)
      this.tableData = res.data?.records || []
    },
    reset() {
      this.filterForm = {
        page: 1,
        rows: 999
      }
      this.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: calc(100vh - 80px);
  .top {
    display: flex;
    height: 600px;
    aside {
      padding: 30px;
      min-width: 330px;
      margin-right: 40px;
      overflow: auto;
      background: url('./images/bim-tree.png') no-repeat;
      background-size: 100% 100%;
    }
    .model-wrap {
      flex: 1;
      background: url('./images/model-view.png') no-repeat;
      background-size: 100% 100%;
      padding: 40px;
      overflow: hidden;
    }
  }
  .bottom {
    flex: 1;
    position: relative;
    display: flex;
    margin-top: 20px;
    padding: 40px;
    background: url('./images/progress-simulate.png') no-repeat;
    background-size: 100% 100%;
    .title {
      position: absolute;
      top: 10px;
      right: 30px;
      P {
        display: inline-block;
        font-size: 14px;
        color: #bab3ab;
        > span + span {
          margin-left: 10px;
        }
        + p {
          margin-left: 30px;
        }
      }
    }
    .chart-wrap {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex: 0 0 200px;
      > div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 140px;
        height: 140px;

        &.container {
          background: url('./images/btn-container.png') no-repeat;
          background-size: 100% 100%;
          animation: rotate 5s infinite;
          z-index: 100;
        }
        &.inner {
          background: url('./images/btn-inner.png') no-repeat;
          background-size: 100% 100%;
          animation: unRotate 5s infinite;
          z-index: 90;
        }
        &.finger {
          width: 40px;
          height: 60px;
          background: url('./images/btn-finger.png') no-repeat;
          background-size: 100% 100%;
          z-index: 80;
          animation: toggle 2s infinite;
        }
        &.text {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          z-index: 101;
          color: #bfbbbb;
        }
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      .progress-wrap {
        display: flex;
        padding: 10px;
        > p {
          flex: 0 0 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #878787;
          .num {
            color: #f1c871;
            font-size: 24px;
          }
        }
        > div {
          flex: 1;
        }
      }
    }
  }
}
/deep/ .el-input__inner {
  &.is-focus {
    border-color: #f1c971;
  }
  background: #000;
  border-color: #f1c971;
}
/deep/ .el-range-input {
  background: #000;
}
.el-table {
  /deep/ thead tr th {
    padding: 4px 0;
    background: #403c35 !important;
    color: #fff;
    border-right: 3px solid #000;
    border-bottom: 1px solid #000;
    text-align: center;
  }
  /deep/ tr td {
    background: #000 !important;
    color: #878787;
    border-right: 0;
    border-bottom: 1px solid #2c2927;
    text-align: center;
  }
  &:before {
    height: 0;
  }
}
.el-table--border {
  border: 1px solid #000;
}
/deep/ .el-popper {
  background: #000 !important;
}
/deep/ .el-scrollbar {
  background: red !important;
}
@keyframes rotate {
  0% {
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes unRotate {
  0% {
  }
  50% {
    transform: rotate(-360deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes toggle {
  0% {
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
