<template>
  <div class="main-wrap">
    <div class="top">
      <div class="block" style="margin-right: 20px">
        <div class="aside">
          <BimTree />
        </div>
      </div>
      <div class="model-wrap block">
        <div class="title"><img src="./images/model.png" />模型展示</div>
        <ViewerSync></ViewerSync>
      </div>
    </div>
    <div class="bottom block">
      <div class="title"><img src="./images/model.png" />进度模拟</div>
      <div :class="['container', showProgress ? 'show' : '']">
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
                v-model="filterForm.scaleUnit"
                :self-list="dateType"
                style="width: 100px"
                :has-all-option="false"
              />
            </el-form-item>
            <el-form-item>
              <el-button-group>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                <el-button type="success" @click="start">开始模拟</el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="tick">
          <DateTickBar
            ref="DateTickBar"
            :scaleUnit="filterForm.scaleUnit"
            :start="filterForm.startDate"
            :end="filterForm.endDate"
            @tickChange="dateTickChangeHandle"
          />
        </div>
        <div class="table-wrap">
          <el-table class="table" :data="tableData">
            <el-table-column prop="taskName" label="任务名称" />
            <el-table-column prop="planStartDate" label="计划开始时间" />
            <el-table-column prop="planEndDate" label="计划结束时间" />
            <el-table-column prop="planDuration" label="计划工期(天)" />
            <el-table-column prop="actualStartDate" label="实际开始时间" />
            <el-table-column prop="actualEndDate" label="实际结束时间" />
            <el-table-column prop="inspectTime" label="实际工期" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import departmentType from '../images/schedule/department-type.png'
import modelView from '../images/schedule/model-view.png'
import progressSimulate from '../images/schedule/progress-simulate.png'
import Api from './api'
import DateTickBar from './components/TickProgressBar/DateTickBar'
export default {
  components: {
    DateTickBar
  },
  data() {
    return {
      departmentType,
      modelView,
      progressSimulate,
      // 以时间为key的map
      timeData: {},
      workType: [
        {
          label: '计划工期',
          value: 0
        },
        {
          label: '实际工期',
          value: 1
        }
      ],
      dateType: [
        {
          label: '月',
          value: 'month'
        },
        {
          label: '周',
          value: 'week'
        },
        {
          label: '日',
          value: 'day'
        }
      ],
      filterForm: {
        startDate: '',
        endDate: '',
        scaleUnit: 'week',
        type: 0
      },
      tableData: [],
      showGuids: [],
      showProgress: false
    }
  },
  watch: {
    filterForm: {
      handler: function (v) {
        if (v.startDate && v.endDate) {
          this.showProgress = true
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.onresize()
      this.getTableData()
      // this.refresh()
    },
    //监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    async getTableData() {
      let res = await Api.list({})
      this.tableData = res.data?.baseList || []
    },
    // 获取时间轴数据
    async onSubmit() {
      if (!this.filterForm.startDate || !this.filterForm.endDate) {
        return this.$message.error('时间必填')
      }
      let param = _.pick(this.filterForm, ['startDate', 'endDate', 'type'])
      let timeType = this.filterForm.scaleUnit
      param.timeSpan = timeType === 'day' ? 4 : timeType === 'week' ? 5 : 6
      let res = await Api.bimList(param)
      this.$refs.DateTickBar.initBar()
      this.$refs.DateTickBar.handleBackToStart()
      this.$refs.bim.showModel()
      this.timeData = res.data
      // this.timeData = {
      //   '2020-12-06': [
      //     {
      //       status: 0,
      //       componentIds: ['xra7PlYm+0/724430', 'xra7PlYm+0/933840']
      //     }
      //   ],
      //   '2020-12-07': [
      //     {
      //       status: 4,
      //       componentIds: ['xra7PlYm+0/909735', 'xra7PlYm+1/220450']
      //     }
      //   ],
      //   '2020-12-08': [
      //     {
      //       status: 3,
      //       componentIds: ['xra7PlYm+1/212797', 'xra7PlYm+1/212763']
      //     }
      //   ],
      //   '2020-12-10': [
      //     {
      //       status: 3,
      //       componentIds: ['xra7PlYm+1/270048', 'xra7PlYm+1/308462']
      //     }
      //   ],
      //   '2020-12-12': [
      //     {
      //       status: 5,
      //       componentIds: ['xra7PlYm+1/212324', 'xra7PlYm+1/204424']
      //     }
      //   ]
      // }
    },
    async start() {
      if (!this.filterForm.startDate || !this.filterForm.endDate) {
        return this.$message.error('时间必填')
      }
      await this.onSubmit()

      this.$refs.DateTickBar.handleBackToStart()
      this.$refs.DateTickBar.handleForwardPlay()
      //bim数据重置
      let bim = this.$refs.bim
      this.showGuids = []
      bim.clearColor()
      bim.showGuid()
    },

    dateTickChangeHandle(e, date) {
      let targetMoment = null
      // 月
      if (this.filterForm.scaleUnit === 'month') {
        targetMoment = moment(date).endOf('month').format('YYYY-MM-DD')
        if (new Date(targetMoment).valueOf() > new Date(this.filterForm.endDate).valueOf()) {
          date = moment(this.form.endDate).format('YYYY-MM-DD')
        } else {
          date = targetMoment
        }
      }
      let bim = this.$refs.bim
      let target = this.timeData[date]
      if (!target || target.length < 1) {
        return
      }
      for (let item of target) {
        let guids = item.componentIds
        this.showGuids = [...this.showGuids, ...guids]
        bim.showGuid(this.showGuids)
        let colorAry = [
          [114, 115, 117],
          [114, 115, 117],
          [114, 115, 117],
          [19, 255, 255],
          [7, 253, 2],
          [254, 0, 2]
        ]
        bim.setColor(guids, colorAry[item.status])
      }
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
    height: 70%;
    .aside {
      min-width: 330px;
      height: 100%;
      overflow: auto;
    }
    .model-wrap {
      flex: 1;
      overflow: hidden;
      padding-bottom: 50px;
    }
  }
  .bottom {
    margin-top: 20px;
    height: 27%;
    .container {
      height: 100%;
      .tick {
        height: 0;
      }
      .table-wrap {
        max-height: calc(100% - 100px);
        overflow-y: auto;
      }
      &.show {
        .tick {
          height: 50px;
        }
        .table-wrap {
          max-height: calc(100% - 140px);
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
