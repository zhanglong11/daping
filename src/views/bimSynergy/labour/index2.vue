<template>
  <div class="content">
    <div class="labour">
      <div class="left">
        <div class="todayStatistics" :style="`background: url('${todayStatistics}') no-repeat`">
          <TodayStatisticsChart />
        </div>
        <div class="labourCompany" :style="`background: url('${labourCompany}') no-repeat`">
          <div class="lc-con">
            <div v-for="item in items" :key="item" class="lc-item">
              <div class="icon">{{ item + 1 }}</div>
              <div class="text-con">
                <div class="text">
                  <div>上海固友投资管理有限公司</div>
                  <div class="num">150</div>
                </div>
                <div :class="getBar()">
                  <div class="bar-back"></div>
                  <div class="bar-front"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="model">
          <BimView ref="bim" />
        </div>
        <div class="table-wrap">
          <el-table class="table" :data="personTableData" max-height="140">
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
        <div class="typeView" :style="`background: url('${typeView}') no-repeat`">
          <div class="tv-con">
            <div class="tv-left">
              <div class="tv-bg">
                <div class="tv-scan"></div>
              </div>
              <div class="tv-text">
                <div class="number">235</div>
                <div>总数</div>
              </div>
            </div>
            <div class="tv-right">
              <div class="tv-item" :class="tvCurItem === 1 ? 'tv-cur-item' : ''" @click="handleClickItem(1)">
                <div class="icon tvi-all"></div>
                <div class="text">全部人员</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 2 ? 'tv-cur-item' : ''" @click="handleClickItem(2)">
                <div class="icon tvi-ni"></div>
                <div class="text">泥工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 3 ? 'tv-cur-item' : ''" @click="handleClickItem(3)">
                <div class="icon tvi-dian"></div>
                <div class="text">电工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 4 ? 'tv-cur-item' : ''" @click="handleClickItem(4)">
                <div class="icon tvi-wa"></div>
                <div class="text">瓦工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 5 ? 'tv-cur-item' : ''" @click="handleClickItem(5)">
                <div class="icon tvi-jia"></div>
                <div class="text">架子工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 6 ? 'tv-cur-item' : ''" @click="handleClickItem(6)">
                <div class="icon tvi-qi"></div>
                <div class="text">起重工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 7 ? 'tv-cur-item' : ''" @click="handleClickItem(7)">
                <div class="icon tvi-qi"></div>
                <div class="text">油漆工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 8 ? 'tv-cur-item' : ''" @click="handleClickItem(8)">
                <div class="icon tvi-han"></div>
                <div class="text">电焊工</div>
              </div>
              <div class="tv-item" :class="tvCurItem === 9 ? 'tv-cur-item' : ''" @click="handleClickItem(9)">
                <div class="icon tvi-diao"></div>
                <div class="text">塔吊信号工</div>
              </div>
            </div>
          </div>
        </div>
        <div class="typeList" :style="`background: url('${typeList}') no-repeat`">
          <div class="tl-con">
            <div class="tl-head">
              <div>班组名</div>
              <div>班组班长</div>
              <div>班组人数</div>
            </div>
            <div class="tl-row-con">
              <div class="tl-row">
                <div>施工一组</div>
                <div>陈双双</div>
                <div>25</div>
              </div>
              <div class="tl-row">
                <div>施工一组</div>
                <div>陈双双</div>
                <div>25</div>
              </div>
              <div class="tl-row">
                <div>施工一组</div>
                <div>陈双双</div>
                <div>25</div>
              </div>
              <div class="tl-row">
                <div>施工一组</div>
                <div>陈双双</div>
                <div>25</div>
              </div>
            </div>
          </div>
        </div>
        <div class="personInfo" :style="`background: url('${personInfo}') no-repeat`">
          <div class="pi-tab">
            <div>
              <div v-if="piCurTab === 1" class="icon pi-tw-0"></div>
              <div v-else class="icon pi-tw-1" @click="handleTabClick(1)"></div>
            </div>
            <div>
              <div v-if="piCurTab === 2" class="icon pi-li-0"></div>
              <div v-else class="icon pi-li-1" @click="handleTabClick(2)"></div>
            </div>
          </div>
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
                <div class="value">陈双双</div>
              </div>
              <div class="pi-item">
                <div class="label">班组：</div>
                <div class="value">施工一组</div>
              </div>
              <div class="pi-item">
                <div class="label">工种：</div>
                <div class="value">起重工</div>
              </div>
              <div class="pi-item">
                <div class="label">联系方式：</div>
                <div class="value">陈双双</div>
              </div>
              <div class="pi-item">
                <div class="label">所属公司：</div>
                <div class="value">河南五建建筑集团</div>
              </div>
              <div class="pi-item">
                <div class="label">打卡时间：</div>
                <div class="value">2020-10-15 16:11:12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import todayStatistics from '../images/labour/today-statis.png'
import labourCompany from '../images/labour/labour-company.png'
import typeView from '../images/labour/type-view.png'
import typeList from '../images/labour/type-list.png'
import personInfo from '../images/labour/person-info.png'
import TodayStatisticsChart from './todayStatisticsChart'
import Api from './api'
let barIndex = 0
export default {
  components: { TodayStatisticsChart },
  data() {
    return {
      todayStatistics,
      labourCompany,
      typeView,
      typeList,
      personInfo,
      items: [],
      nums: [],
      tvCurItem: 1,
      piCurTab: 1,
      personTableData: []
    }
  },
  computed: {
    workType() {
      return this.$getArgList('workType') || []
    }
  },
  mounted() {
    this.init()

    // 获取8个随机数
    this.getNums()
    // 填充到场劳务公司假数据
    for (let i = 0; i < 8; i++) {
      this.items.push(i)
    }
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
      let resData = res.data
      this.personTableData = resData.employeeList
    },
    getBar() {
      if (barIndex === 8) {
        barIndex = 0
        barIndex++
      } else {
        barIndex++
      }
      return 'bar' + this.nums[barIndex - 1]
    },
    getNums() {
      this.nums = []
      for (let i = 0; ; i++) {
        if (this.nums.length < 8) {
          this.generateRandom(8)
        } else {
          break
        }
      }
    },
    generateRandom(count) {
      let rand = Math.floor(Math.random() * count) + 1
      for (let i = 0; i < this.nums.length; i++) {
        if (this.nums[i] === rand) {
          return false
        }
      }
      this.nums.push(rand)
    },
    // 现场工种选项点击
    handleClickItem(type) {
      this.tvCurItem = type
    },
    // 人员信息选项点击
    handleTabClick(type) {
      this.piCurTab = type
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
      margin: 16px auto 0px auto;
      padding-top: 50px;
    }
    .labourCompany {
      width: 365px;
      height: 605px;
      margin: 16px auto 0px auto;
      padding-top: 30px;
      .lc-con {
        display: flex;
        flex-wrap: wrap;
        height: 568px;
        overflow-y: auto;
        margin-right: 4px;
        .lc-item {
          margin-top: 18px;
          margin-bottom: 18px;
          height: 35px;
          display: flex;
          .icon {
            margin-left: 20px;
            margin-right: 18px;
            width: 37px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            font-weight: 700;
            font-size: 24px;
            color: #ffd3a0;
            background: url('../images/labour/lc-bg.png') no-repeat;
          }
          .text-con {
            flex: 1;
            .text {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              width: 268px;
              .num {
                font-weight: bold;
              }
            }
            .bar1 {
              .barFun(1);
            }
            .bar2 {
              .barFun(2);
            }
            .bar3 {
              .barFun(3);
            }
            .bar4 {
              .barFun(4);
            }
            .bar5 {
              .barFun(5);
            }
            .bar6 {
              .barFun(6);
            }
            .bar7 {
              .barFun(7);
            }
            .bar8 {
              .barFun(8);
            }
            .barFun(@type) {
              position: relative;
              width: 268px;
              height: 10px;
              overflow: hidden;
              margin-top: 4px;
              .bar-back {
                background: #000000;
                height: 10px;
                width: 268px;
              }
              .bar-front {
                background: #ffc263;
                height: 10px;
                position: absolute;
                top: 0px;
                opacity: 0.8;
                .mixin (@type);
              }
              .mixin (@type) when (@type = 1) {
                animation: barAni 3s cubic-bezier(0.16, 0.8, 0.83, 0.04) infinite alternate;
              }
              .mixin (@type) when (@type = 2) {
                animation: barAni 4s cubic-bezier(0.23, 1.55, 0.7, -0.91) infinite alternate;
              }
              .mixin (@type) when (@type = 3) {
                animation: barAni 3s cubic-bezier(0.52, 0.86, 0.84, -1) infinite alternate;
              }
              .mixin (@type) when (@type = 4) {
                animation: barAni 4s cubic-bezier(0.19, 1.57, 0.71, 0.14) infinite alternate;
              }
              .mixin (@type) when (@type = 5) {
                animation: barAni 3s cubic-bezier(1, 0.11, 0.71, 0.14) infinite alternate;
              }
              .mixin (@type) when (@type = 6) {
                animation: barAni 4s cubic-bezier(1, 0.11, 0, 0.9) infinite alternate;
              }
              .mixin (@type) when (@type = 7) {
                animation: barAni 3s cubic-bezier(1, -0.73, 0, 1.47) infinite alternate;
              }
              .mixin (@type) when (@type = 8) {
                animation: barAni 4s cubic-bezier(0.22, 0.69, 0.75, -1.05) infinite alternate;
              }
              @keyframes barAni {
                from {
                  width: 0px;
                  background: #3d3022;
                }
                to {
                  width: 268px;
                  background: #ffb126;
                }
              }
            }
          }
        }
      }
    }
  }
  .center {
    .model {
      height: 76%;
      background: url('../images/schedule/model-view.png') no-repeat;
      background-size: 100% 100%;
      padding: 40px 10px 10px 10px;
      margin-top: 20px;
    }
    .table-wrap {
      height: 20%;
      padding: 40px 10px 10px 10px;
      margin-top: 16px;
      background: url('./images/bottom-table.png') no-repeat;
      background-size: 100% 100%;
    }
    width: 1118px;
  }
  .right {
    width: 400px;
    .typeView {
      width: 365px;
      height: 408px;
      margin: 20px auto 0px auto;
      padding-top: 50px;
      .tv-con {
        display: flex;
        .tv-left {
          width: 210px;
          .tv-bg {
            width: 174px;
            height: 260px;
            margin: 0px auto;
            background: url('../images/labour/tv-bg.png') center 10px no-repeat;
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
              width: 107px;
              height: 15px;
              margin-left: 38px;
              position: absolute;
              background: url('../images/labour/tv-scan.png') no-repeat;
              animation: tvScanAni 3s infinite alternate;
            }
            @keyframes tvScanAni {
              from {
                top: 260px;
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
            display: flex;
            .icon {
              width: 30px;
              height: 36px;
              margin-left: 6px;
            }
            .tvi-all {
              background: url('../images/labour/tvi-all.png') center no-repeat;
            }
            .tvi-ni {
              background: url('../images/labour/tvi-ni.png') center no-repeat;
            }
            .tvi-dian {
              background: url('../images/labour/tvi-dian.png') center no-repeat;
            }
            .tvi-wa {
              background: url('../images/labour/tvi-wa.png') center no-repeat;
            }
            .tvi-jia {
              background: url('../images/labour/tvi-jia.png') center no-repeat;
            }
            .tvi-qi {
              background: url('../images/labour/tvi-qi.png') center no-repeat;
            }
            .tvi-han {
              background: url('../images/labour/tvi-han.png') center no-repeat;
            }
            .tvi-diao {
              background: url('../images/labour/tvi-diao.png') center no-repeat;
            }
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
    .typeList {
      width: 365px;
      height: 194px;
      margin: 16px auto 0px auto;
      padding-top: 40px;
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
    .personInfo {
      width: 365px;
      height: 317px;
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
        padding-top: 46px;
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
}
.el-table--border {
  border: 1px solid #000;
}
</style>
