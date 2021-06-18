<template>
  <div class="content">
    <div class="main">
      <div class="left">
        <div class="project-schedule">
          <div class="status">{{ projectStatusStr[projectInfo.projectStatus] }}</div>
          <div class="value">{{ actualFinishedPercent }}%</div>
          <div class="spin"></div>
          <div id="progress-bar"></div>
        </div>
        <div class="project-general">
          <div class="pg-item">
            <div class="icon pg-name"></div>
            <div class="text">
              <div class="title">项目名称</div>
              <div class="value" :title="projectInfo.name">{{ projectInfo.name }}</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-person"></div>
            <div class="text">
              <div class="title">项目负责人</div>
              <div class="value">{{ projectInfo.principalName }}</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-phone"></div>
            <div class="text">
              <div class="title">联系方式</div>
              <div class="value">{{ projectInfo.telephone }}</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-time"></div>
            <div class="text">
              <div class="title">开工日期</div>
              <div class="value">{{ projectInfo.startTime }}</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-time"></div>
            <div class="text">
              <div class="title">计划竣工日期</div>
              <div class="value">{{ projectInfo.endTime }}</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-area"></div>
            <div class="text">
              <div class="title">建筑面积</div>
              <div class="value">{{ projectInfo.buildingArea }}㎡</div>
            </div>
          </div>
          <div class="pg-item">
            <div class="icon pg-path"></div>
            <div class="text">
              <div class="title">项目地址</div>
              <div
                class="value"
                :title="
                  projectInfo.province +
                  ' ' +
                  projectInfo.city +
                  ' ' +
                  projectInfo.county +
                  ' ' +
                  projectInfo.detailAddress
                "
              >
                {{
                  projectInfo.province +
                  ' ' +
                  projectInfo.city +
                  ' ' +
                  projectInfo.county +
                  ' ' +
                  projectInfo.detailAddress
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="scene-unit">
          <div v-if="sceneUnitList.length" class="su-con">
            <div v-for="(item, index) in sceneUnitList" :key="index" class="su-item">
              <div class="unit">
                <div class="icon su-ce"></div>
                <div class="value su-bg">{{ item.companyName }}</div>
              </div>
              <div class="build">
                <span>◂</span>
                <span>{{ item.unitName }}</span>
                <span>▸</span>
              </div>
            </div>
          </div>
          <div v-else class="su-con su-con-null">暂无数据</div>
        </div>
      </div>
      <div class="center">
        <div class="progress-wrap">
          <p>
            <span class="icon yellow"></span><span>已完成进度</span>
            <span class="num">{{ progressCompletedTotal }} </span>
            %
          </p>
          <p>
            <span class="icon"></span><span>未完成进度</span>
            <span class="num">{{ progressTotal }} </span>
            %
          </p>
        </div>
        <div class="bim-model">
          <ViewerSync></ViewerSync>
        </div>
        <div class="video-monitor">
          <div class="vm-con">
            <div v-for="(item, index) in videoList" :key="index">
              <div v-if="_.get(item, 'videoUrl')" class="vm-item">
                <div class="vm-video">
                  <Video :url="item.videoUrl" />
                  <div class="vm-bg-top"></div>
                  <div class="vm-bg-left"></div>
                  <div class="vm-bg-right"></div>
                  <div class="vm-bg-bottom"></div>
                </div>
              </div>
            </div>
            <!--<div class="vm-item">
              <img class="vm-img" src="../images/main/vm-build.png" />
              <div class="vm-bg"></div>
            </div>-->
          </div>
        </div>
      </div>
      <div class="right">
        <div class="month-progress">
          <div class="mp-bg mp-bg-1">
            <div class="value">{{ normalFinishedNum }}</div>
            <div class="title">正常完成数量</div>
          </div>
          <div class="mp-bg mp-bg-2">
            <div class="value">{{ advanceFinishedNum }}</div>
            <div class="title">超额完成数量</div>
          </div>
          <div class="mp-bg mp-bg-3">
            <div class="value">{{ delayFinishedNum }}</div>
            <div class="title">滞后完成数量</div>
          </div>
        </div>
        <div class="month-quality">
          <MonthQualityChart :option="qualityOption" />
        </div>
        <div class="month-safety">
          <MonthSafetyChart :option="safetyOption" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MonthQualityChart from './monthQualityChart'
import MonthSafetyChart from './monthSafetyChart'
import Api from './api/index'
import Video from '../../../components/Video'
export default {
  components: { MonthQualityChart, MonthSafetyChart, Video },
  data() {
    return {
      sceneUnitList: [],
      projectInfo: this.$store.state.project.projectDetail,
      projectStatusStr: {
        1: '未开始',
        2: '进行中',
        3: '竣工',
        4: '停工',
        5: '验收',
        6: '禁用'
      },
      videoList: [],
      timer: null,
      qualityOption: {},
      safetyOption: {},
      actualFinishedPercent: 0,
      advanceFinishedNum: 0,
      delayFinishedNum: 0,
      normalFinishedNum: 0,
      progressTotal: 0,
      progressCompletedTotal: 0,
      progressCompleted: [],
      unProgressCompleted: []
    }
  },
  computed: {
    bimElementData() {
      return this.$store.state.bim.bimElementData
    }
  },
  watch: {
    bimElementData(v) {
      this.bimShouProgress(v)
    }
  },
  mounted() {
    this.init()
    // console.log(this.projectInfo)
    this.getSceneUnitList()
    this.getMonitorVideoList()
    this.timer = setInterval(() => {
      this.touch()
    }, 10000)
    this.getInspectProblemQueryBar()
    this.getScheduleTask()
  },
  destroyed() {
    this.clearTouch()
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
    // 现场参建单位列表
    getSceneUnitList() {
      let participantDTOList = this.projectInfo.participantDTOList || []
      for (let i = 0; i < participantDTOList.length; i++) {
        for (let j = 0; j < participantDTOList[i].participateCompanyName.length; j++) {
          this.sceneUnitList.push({
            companyName: participantDTOList[i].participateCompanyName[j],
            unitName: participantDTOList[i].typeName
          })
        }
      }
    },
    // 视频设备列表
    getMonitorVideoList() {
      Api.getMonitorVideoList({ projectId: this.projectInfo.id }).then(res => {
        // console.log(res.data.records)
        let videoList = res.data.records || []
        videoList.forEach(e => {
          e.videoUrl = ''
        })
        this.videoList = videoList
        if (videoList.length) {
          this.$nextTick(() => {
            videoList.forEach((item, index) => {
              this.getVideoUrlAndPlayVideo(item)
            })
          })
        }
      })
    },
    // 调用start，返回播放地址，并进行播放
    getVideoUrlAndPlayVideo(item) {
      Api.getVideoUrl({
        channel: item.channel,
        deviceNum: item.deviceNum,
        projectId: this.projectInfo.id
      }).then(res => {
        item.videoUrl = res.data?.WS_FLV
      })
    },
    // 视频试试直播
    touch() {
      this.videoList.forEach(e => {
        if (e.videoUrl) {
          Api.touch({ channel: e.channel, deviceNum: e.deviceNum, projectId: this.projectInfo.id })
        }
      })
    },
    clearTouch() {
      clearInterval(this.timer)
      this.timer = null
    },
    // 本月问题统计(质量与安全)
    getInspectProblemQueryBar() {
      Api.getInspectProblemQueryBar({}).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].inspectType === 1) {
            this.qualityOption = res.data[i]
          } else if (res.data[i].inspectType === 2) {
            this.safetyOption = res.data[i]
          }
        }
      })
    },
    // 本月进度统计
    getScheduleTask() {
      Api.getScheduleTask().then(res => {
        // console.log(res)
        if (res.data) {
          this.actualFinishedPercent = res.data.actualFinishedPercent
          this.advanceFinishedNum = res.data.advanceFinishedNum
          this.delayFinishedNum = res.data.delayFinishedNum
          this.normalFinishedNum = res.data.normalFinishedNum
          this.$nextTick(() => {
            let bar = document.getElementById('progress-bar')
            let value = parseFloat(parseFloat(this.actualFinishedPercent / 100).toFixed(2))
            this.actualFinishedPercent = value * 100
            bar.style.width = value * 186 + 'px'
          })
        }
      })
    },

    async bimShouProgress(bimElementData) {
      let bimApp = this.$refs.bim
      let params = {
        cycleType: 3,
        modelId: localStorage.getItem('bimModelId'),
        bindDTOList: _.map(bimElementData, c => _.pick(c, ['docId', 'elementId']))
      }
      let result = await Api.getModelProgress(params)
      let datas = result.data
      let total = 0
      let completedTotal = 0
      if (!datas || datas.length === 0) {
        this.progressTotal = 0
        this.progressCompletedTotal = 0
        return
      }
      datas.map(e => {
        let componentIdList = e.componentIdList || []
        total += componentIdList.length
        if (e.groupNum === 0) {
          this.progressCompleted = componentIdList
          completedTotal = e.actualFinishedPercent || 0
        }
      })
      this.unProgressCompleted = bimElementData.map(b => b.id).filter(e => !this.progressCompleted.includes(e))
      this.progressTotal = (100 - completedTotal).toFixed(2)
      this.progressCompletedTotal = completedTotal
      bimApp.clearColor()
      bimApp.setColor(this.progressCompleted, [255, 187, 41])
      bimApp.setColor(this.unProgressCompleted, [153, 153, 153])
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  .left {
    width: 400px;
    .project-schedule {
      width: 331px;
      height: 133px;
      background: url('../images/main/project-schedule.png') no-repeat;
      margin: 16px auto;
      display: flex;
      justify-content: space-between;
      position: relative;
      .status {
        font-size: 24px;
        font-weight: bold;
        color: #ffc263;
        margin-top: 48px;
        margin-left: 32px;
        animation: statusAni 1.5s infinite alternate;
        text-shadow: 0px 0px 0px #7f4b16, 1px 1px 0px #7f4b16, 2px 2px 0px #7f4b16, 3px 3px 0px #7f4b16,
          5px 5px 5px #ffc263;
      }
      @keyframes statusAni {
        from {
          opacity: 0.4;
        }
        to {
          opacity: 1;
        }
      }
      .value {
        font-size: 24px;
        font-weight: 900;
        font-style: italic;
        color: #ffddab;
        margin-top: 76px;
        margin-right: 4px;
        animation: valueAni 1.5s infinite alternate;
      }
      @keyframes valueAni {
        from {
          opacity: 0.3;
        }
        to {
          opacity: 1;
        }
      }
      .spin {
        width: 118px;
        height: 118px;
        background: url('../images/main/spin.png') no-repeat;
        position: absolute;
        top: 8px;
        left: 8px;
        animation: spinAni 5s cubic-bezier(0.26, 1.61, 0.69, -0.77) infinite alternate;
      }
      @keyframes spinAni {
        from {
          transform: rotate(0deg) scale(0.9);
          opacity: 0.3;
        }
        to {
          transform: rotate(360deg) scale(1.1);
          opacity: 1;
        }
      }
      #progress-bar {
        background: url('../images/main/bar.png') no-repeat;
        width: 186px;
        height: 21px;
        position: absolute;
        top: 57px;
        left: 145px;
        animation: pBarAni 1.5s infinite alternate;
      }
      @keyframes pBarAni {
        from {
          opacity: 0.5;
        }
        to {
          opacity: 1;
        }
      }
    }
    .project-general {
      padding-top: 40px;
      width: 364px;
      height: 474px;
      background: url('../images/main/project-general.png') no-repeat;
      margin: 0px auto 16px auto;
      .pg-item {
        display: flex;
        .icon {
          width: 56px;
          height: 59px;
          background-position: center !important;
        }
        .pg-name {
          background: url('../images/main/pg-name.png') no-repeat;
        }
        .pg-person {
          background: url('../images/main/pg-person.png') no-repeat;
        }
        .pg-phone {
          background: url('../images/main/pg-phone.png') no-repeat;
        }
        .pg-time {
          background: url('../images/main/pg-time.png') no-repeat;
        }
        .pg-area {
          background: url('../images/main/pg-area.png') no-repeat;
        }
        .pg-path {
          background: url('../images/main/pg-path.png') no-repeat;
        }
        .text {
          flex: 1;
          margin-right: 30px;
          border-bottom: solid 1px #363536;
          .title {
            color: #eeeeee;
            font-size: 12px;
            margin-top: 8px;
          }
          .value {
            color: #ffb056;
            font-weight: bold;
            width: 260px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
        }
      }
    }
    .scene-unit {
      width: 364px;
      height: 327px;
      background: url('../images/main/scene-unit.png') no-repeat;
      margin: auto;
      padding-top: 36px;
      .su-con {
        height: 280px;
        margin-right: 10px;
        overflow-y: auto;
        .su-item {
          display: flex;
          .unit {
            display: flex;
            align-items: center;
            .icon {
              width: 52px;
              height: 70px;
              background-position: center !important;
              margin-left: 12px;
            }
            .su-ce {
              background: url('../images/main/su-ce.png') no-repeat;
            }
            .su-ban {
              background: url('../images/main/su-ban.png') no-repeat;
            }
            .su-cha {
              background: url('../images/main/su-cha.png') no-repeat;
            }
            .su-xie {
              background: url('../images/main/su-xie.png') no-repeat;
            }
            .value {
              padding: 6px 24px 6px 12px;
              color: #eeeeee;
              width: 210px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
            .su-bg {
              background: url('../images/main/su-bg.png') no-repeat;
            }
          }
          .build {
            font-size: 12px;
            color: #ffb056;
            display: flex;
            align-items: center;
          }
        }
      }
      .su-con-null {
        text-align: center;
        line-height: 280px;
        color: #a0a0a0;
      }
    }
  }
  .center {
    position: relative;
    width: 1118px;
    .progress-wrap {
      position: absolute;
      top: 80px;
      left: 60px;
      z-index: 100000;
      padding: 10px;
      background: rgba(0, 0, 0.4);
      box-shadow: inset 0 0 10px #f5c775;
      > p {
        display: flex;
        justify-content: space-around;
        align-items: center;
        + p {
          margin-top: 10px;
        }
        > span {
          display: block;
          + span {
            margin-left: 6px;
          }
        }
        .icon {
          width: 24px;
          height: 24px;
          background: #999;
          &.yellow {
            background: #ffbb29;
          }
        }
        .num {
          color: #ffbb29;
        }
      }
    }
    .bim-model {
      width: 1087px;
      height: 759px;
      margin: 16px auto;
      background: url('../images/model-view.png') no-repeat;
      background-size: 100% 100%;
      padding: 40px 20px;
    }
    .video-monitor {
      width: 1087px;
      height: 191px;
      background: url('../images/main/video-monitor.png') no-repeat;
      margin: auto;
      padding-top: 50px;
      .vm-con {
        margin: 0px 25px 0px 25px;
        display: flex;
        overflow: auto;
        .vm-item {
          margin: 0px 27px 0px 27px;
          .vm-img {
            width: 205px;
            height: 130px;
          }
          .vm-video {
            position: relative;
            width: 205px;
            height: 130px;
          }
          .vm-bg {
            width: 205px;
            height: 130px;
            background: url('../images/main/vm-bg.png') no-repeat;
            position: absolute;
            top: 0px;
          }
          .vm-bg-top {
            width: 205px;
            height: 16px;
            background: url('../images/main/vm-bg-top.png') no-repeat;
            position: absolute;
            top: 0px;
          }
          .vm-bg-left {
            width: 4px;
            height: 98px;
            background: url('../images/main/vm-bg-left.png') no-repeat;
            position: absolute;
            top: 15px;
            left: 0px;
          }
          .vm-bg-right {
            width: 7px;
            height: 98px;
            background: url('../images/main/vm-bg-right.png') no-repeat;
            position: absolute;
            top: 15px;
            right: 0px;
          }
          .vm-bg-bottom {
            width: 205px;
            height: 16px;
            background: url('../images/main/vm-bg-bottom.png') no-repeat;
            position: absolute;
            bottom: 0px;
          }
        }
      }
    }
  }
  .right {
    width: 400px;
    .month-progress {
      width: 365px;
      height: 190px;
      background: url('../images/main/month-progress.png') no-repeat;
      margin: 27px auto 0px auto;
      display: flex;
      padding-top: 30px;
      .mp-bg {
        width: 116px;
        height: 140px;
        background: url('../images/main/mp-bg.png') no-repeat;
        margin: 0px 4px;
        background-position: center !important;
        text-align: center;
        .value {
          font-weight: 900;
          font-style: italic;
          color: #ffddab;
          margin-top: 20px;
        }
        .title {
          margin-top: 84px;
          font-size: 14px;
        }
      }
      .mp-bg-1 {
        animation: mpbg1Ani 2s linear infinite alternate;
      }
      @keyframes mpbg1Ani {
        0% {
          opacity: 0.6;
        }
        33.3% {
          opacity: 1;
        }
      }
      .mp-bg-2 {
        animation: mpbg2Ani 2s linear infinite alternate;
      }
      @keyframes mpbg2Ani {
        33.3% {
          opacity: 0.6;
        }
        66.6% {
          opacity: 1;
        }
      }
      .mp-bg-3 {
        animation: mpbg3Ani 2s linear infinite alternate;
      }
      @keyframes mpbg3Ani {
        66.6% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }
    }
    .month-quality {
      width: 365px;
      height: 408px;
      background: url('../images/main/mont-quality.png') no-repeat;
      margin: 16px auto;
      padding-top: 40px;
    }
    .month-safety {
      width: 365px;
      height: 325px;
      background: url('../images/main/month-safety.png') no-repeat;
      margin: auto;
      padding-top: 42px;
    }
  }
}
</style>
