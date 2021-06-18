<template>
  <div class="content">
    <div class="labour">
      <div class="left">
        <div class="todayStatistics block">
          <div class="title"><img src="./images/inOut.png" />今日进退场统计</div>
          <TodayStatisticsChart :chartData="chartData" />
        </div>
        <div class="typeView block">
          <div class="title"><img src="./images/person.png" />现场工种</div>
          <div class="tv-con">
            <div class="tv-left">
              <div class="tv-bg">
                <div class="tv-scan"></div>
              </div>
              <div class="tv-text">
                <div class="number">{{ activeWorkNum }}</div>
                <div>{{ activeWorkName }}</div>
              </div>
            </div>
            <div class="tv-right">
              <div class="tv-item" :class="tvCurItem === -1 ? 'tv-cur-item' : ''" @click="handleClickItem(-1)">
                全部人员
              </div>
              <div
                v-for="(item, index) in workTypeList"
                :key="index"
                class="tv-item"
                :class="tvCurItem === item.workType ? 'tv-cur-item' : ''"
                @click="handleClickItem(item.workType)"
              >
                {{ $getLabelFromArg('workType', item.workType) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="model block">
          <div class="title"><img src="./images/model.png" />模型展示</div>
          <ViewerSync></ViewerSync>
        </div>
        <div class="table-wrap block">
          <div class="title"><img src="./images/card.png" />现场人员信息表</div>
          <el-table
            ref="table"
            class="table"
            :data="personTableData"
            max-height="240"
            highlight-current-row
            @row-click="showDetail"
          >
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="groupName" label="班组" />
            <el-table-column prop="workType" label="工种" />
            <el-table-column prop="companyName" label="所属公司" />
            <el-table-column prop="mobile" label="联系方式" />
            <el-table-column prop="date" label="打卡时间" />
          </el-table>
        </div>
      </div>
      <div class="right">
        <div class="personInfo block">
          <div class="title"><img src="./images/card.png" />人员信息</div>
          <div class="pi-con">
            <div class="pi-left">
              <div class="pi-img">
                <img src="../images/labour/pi-img.png" />
                <div class="status"><span>●</span>在线</div>
              </div>
              <div class="pi-ding">
                <div class="icon"></div>
                <div class="text">定位轨迹</div>
              </div>
            </div>
            <div class="pi-right">
              <div class="pi-item">
                <div class="label">姓名：</div>
                <div class="value">{{ activeItem.name }}</div>
              </div>
              <div class="pi-item">
                <div class="label">班组：</div>
                <div class="value">{{ activeItem.groupName }}</div>
              </div>
              <div class="pi-item">
                <div class="label">工种：</div>
                <div class="value">{{ $getLabelFromArg('workType', activeItem.workType) }}</div>
              </div>
              <div class="pi-item">
                <div class="label">联系方式：</div>
                <div class="value">{{ activeItem.mobile }}</div>
              </div>
              <div class="pi-item">
                <div class="label">所属公司：</div>
                <div class="value">{{ activeItem.companyName }}</div>
              </div>
              <div class="pi-item">
                <div class="label">打卡时间：</div>
                <div class="value">{{ activeItem.date }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="typeList block">
          <div class="title"><img src="./images/person.png" />现场工种</div>
          <div class="tl-con">
            <div class="tl-head">
              <div>班组名</div>
              <div>班组班长</div>
              <div>班组人数</div>
            </div>
            <div class="tl-row-con">
              <div v-for="(item, index) in groupList" :key="index" class="tl-row">
                <div>{{ item.groupName }}</div>
                <div>{{ item.principalName }}</div>
                <div>{{ item.num }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="labourCompany block">
          <div class="title"><img src="./images/inOut.png" />到场劳务公司</div>
          <div>
            <div v-for="(item, index) in companyData" :key="index" class="company">
              <div class="index">{{ index + 1 }}</div>
              <p>
                <span>{{ item.companyName }}</span>
                <span class="num">{{ item.num }}</span>
              </p>
            </div>
          </div>
          <!--          <div class="lc-con">-->
          <!--            <div v-for="(item, index) in companyData" :key="index" class="lc-item">-->
          <!--              <div class="icon">{{ index + 1 }}</div>-->
          <!--              <div class="text-con">-->
          <!--                <div>{{ item.companyName }}</div>-->
          <!--                <div class="num">{{ item.num }}</div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodayStatisticsChart from './todayStatisticsChart'
import Api from './api'
let barIndex = 0
export default {
  components: { TodayStatisticsChart },
  data() {
    return {
      tvCurItem: -1,
      personTableData: [],
      workTypeTotal: 0,
      workTypeList: [],
      activeWorkName: '总数',
      activeWorkNum: 0,
      groupList: [],
      chartData: {
        into: [],
        out: []
      },
      companyData: [],
      activeItem: {},
      timeIndex: 0,
      timer: null
    }
  },
  computed: {
    workType() {
      return this.$getArgList('workType') || []
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    init() {
      this.onresize()
      this.refresh()
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    async refresh() {
      let res = await Api.default({})
      let resData = _.cloneDeep(res.data)
      this.personTableData = resData.employeeList
      if (resData.employeeList && resData.employeeList.length) {
        this.currentRow()
      }
      this.groupList = resData.groupList
      this.initWorkType(resData.workTypeList)
      this.chartData = {
        into: resData.into || [],
        out: resData.out || []
      }
      this.companyData = resData.companyList
    },
    currentRow() {
      this.timer = setInterval(() => {
        if (this.personTableData.length === this.timeIndex) {
          this.timeIndex = 0
        }
        // this.$refs.table.setCurrentRow(this.personTableData[this.timeIndex])
        this.activeItem = this.personTableData[this.timeIndex]
        this.timeIndex += 1
      }, 2000)
    },
    // 现场工种选项点击
    handleClickItem(type) {
      this.tvCurItem = type
      if (type === -1) {
        this.activeWorkName = '总数'
        this.activeWorkNum = this.workTypeTotal
        return
      }
      this.activeWorkName = this.$getLabelFromArg('workType', type)
      this.activeWorkNum = this.workTypeList.filter(f => f.workType === type)[0].num
    },
    //现场工种数据
    initWorkType(data) {
      let total = 0
      data.forEach(d => (total += d.num))
      this.workTypeTotal = total
      this.workTypeList = data
      this.activeWorkNum = total
    },
    showDetail(item) {
      this.activeItem = item
    }
  }
}
</script>

<style lang="less" scoped>
.labour {
  display: flex;
  .left {
    width: 400px;
    .todayStatistics {
      width: 365px;
      height: 334px;
      margin: 20px auto 0px auto;
    }
    .typeView {
      width: 365px;
      height: 600px;
      margin: 20px auto 0px auto;
      .tv-con {
        display: flex;
        .tv-left {
          width: 210px;
          .tv-bg {
            width: 210px;
            height: 450px;
            background: url('../images/labour/tv-bg.png') no-repeat center;
            background-size: 100% 100%;
            position: relative;
            animation: tvBgAni 4s linear infinite;
            @keyframes tvBgAni {
              0% {
                opacity: 0.5;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.5;
              }
            }
            .tv-scan {
              width: 210px;
              height: 15px;
              position: absolute;
              background: url('../images/labour/tv-scan.png') no-repeat;
              background-size: 100% 100%;
              animation: tvScanAni 3s infinite alternate;
            }
            @keyframes tvScanAni {
              from {
                top: 300px;
              }
              to {
                top: 0px;
              }
            }
          }
          .tv-text {
            text-align: center;
            .number {
              font-weight: 900;
              font-size: 34px;
              color: #ffe9c1;
              font-style: italic;
            }
            .text {
              color: #a0a0a0;
            }
          }
        }
        .tv-right {
          flex: 1;
          margin-top: 8px;
          .tv-item {
            height: 36px;
            line-height: 36px;
            border-bottom: solid 1px #2c2b2b;
            width: 120px;
            cursor: pointer;
            color: #a0a0a0;
            font-size: 12px;
            text-align: center;

            .text {
              color: #a0a0a0;
              font-size: 12px;
              text-align: center;
              width: 60px;
            }
          }
          .tv-cur-item {
            background: url('../images/labour/tv-item-bg.png') 4px 5px no-repeat;
          }
        }
      }
    }
  }
  .center {
    margin-top: 20px;
    .model {
      height: 65%;
      padding-bottom: 50px;
    }
    .table-wrap {
      height: 30%;
      margin-top: 16px;
    }
    width: 1118px;
  }
  .right {
    width: 400px;
    .personInfo {
      width: 365px;
      height: 310px;
      margin: 16px auto 0px auto;
      .pi-tab {
        display: flex;
        justify-content: flex-end;
        padding-top: 12px;
        > div {
          margin-right: 10px;
          .icon {
            width: 14px;
            height: 12px;
            cursor: pointer;
          }
          .pi-tw-0 {
            background: url('../images/labour/pi-tw-0.png') no-repeat;
          }
          .pi-tw-1 {
            background: url('../images/labour/pi-tw-1.png') no-repeat;
          }
          .pi-li-0 {
            background: url('../images/labour/pi-li-0.png') no-repeat;
          }
          .pi-li-1 {
            background: url('../images/labour/pi-li-1.png') no-repeat;
          }
        }
      }
      .pi-con {
        display: flex;
        margin-top: 6px;
        .pi-left {
          margin-left: 20px;
          .pi-img {
            position: relative;
            font-size: 0px;
            .status {
              position: absolute;
              right: 2px;
              bottom: 0px;
              color: #62ffae;
              text-shadow: 0px 0px 5px #62ffae;
              font-size: 12px;
              span {
                padding-right: 6px;
              }
            }
          }
          .pi-ding {
            display: flex;
            align-items: center;
            margin-top: 30px;
            .icon {
              width: 15px;
              height: 19px;
              background: url('../images/labour/pi-ding.png') no-repeat;
              padding-right: 24px;
              margin-left: 14px;
            }
            .text {
              color: #f5c775;
              font-size: 14px;
            }
          }
        }
        .pi-right {
          margin-left: 14px;
          margin-top: -22px;
          .pi-item {
            display: flex;
            font-size: 12px;
            padding-top: 22px;
            .label {
              color: #a0a0a0;
              width: 70px;
            }
            .value {
            }
          }
        }
      }
    }
    .labourCompany {
      width: 365px;
      height: 310px;
      margin: 16px auto 0px auto;
      .company {
        display: flex;
        color: #f5c775;
        .index {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          font-size: 18px;
          background: url('./images/index-bg.png') no-repeat center;
        }
        > p {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          color: #cecbc6;
          font-size: 14px;
          background: url('./images/company-bg.png') no-repeat center;
          .num {
            color: #fb6835;
            font-size: 18px;
          }
        }
      }
    }
    .typeList {
      width: 365px;
      height: 310px;
      margin: 16px auto 0px auto;
      .tl-con {
        margin: 0px 12px;
        .tl-head {
          display: flex;
          > div {
            text-align: center;
            font-size: 12px;
            background: #403c35;
            padding: 4px 0px;
          }
          > div:nth-child(1) {
            width: 106px;
          }
          > div:nth-child(2) {
            width: 136px;
            margin: 0px 2px;
          }
          > div:nth-child(3) {
            width: 106px;
          }
        }
        .tl-row-con {
          height: 104px;
          overflow-y: auto;
          .tl-row {
            display: flex;
            > div {
              text-align: center;
              font-size: 12px;
              padding: 4px 0px;
              color: #a0a0a0;
            }
            > div:nth-child(1) {
              width: 106px;
            }
            > div:nth-child(2) {
              width: 136px;
              margin: 0px 2px;
            }
            > div:nth-child(3) {
              width: 106px;
            }
          }
          .tl-row:nth-child(odd) {
            background: #2c2927;
          }
        }
      }
    }
  }
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
  /deep/ .el-table__empty-block {
    //background: transparent;
  }
  /deep/ .current-row {
    td {
      background: #f5c775 !important;
    }
  }
}
.el-table--border {
  border: 1px solid #000;
}
</style>
