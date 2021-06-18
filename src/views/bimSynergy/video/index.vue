<template>
  <div class="content">
    <div class="video">
      <div class="left">
        <div class="videoMonitor">
          <div v-if="modelView === 1 && video1" class="vm-con1">
            <Video :url="video1.videoUrl" />
          </div>
          <div v-if="modelView === 4" class="vm-con4">
            <div class="vm-item">
              <div class="head">14栋1单元门口道路-NO.243 摄像头</div>
              <div class="wrapper">
                <div class="video"></div>
                <div class="title">
                  <div class="time">2020-10-15 星期四 14:31:22</div>
                  <div class="line">
                    <span class="point">●</span>
                    <span>在线</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="icon"></div>
                  <div class="link">视频回放</div>
                </div>
              </div>
            </div>
            <div class="vm-item">
              <div class="head">14栋1单元门口道路-NO.243 摄像头</div>
              <div class="wrapper">
                <div class="video"></div>
                <div class="title">
                  <div class="time">2020-10-15 星期四 14:31:22</div>
                  <div class="line">
                    <span class="point">●</span>
                    <span>在线</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="icon"></div>
                  <div class="link">视频回放</div>
                </div>
              </div>
            </div>
            <div class="vm-item">
              <div class="head">14栋1单元门口道路-NO.243 摄像头</div>
              <div class="wrapper">
                <div class="video"></div>
                <div class="title">
                  <div class="time">2020-10-15 星期四 14:31:22</div>
                  <div class="line">
                    <span class="point">●</span>
                    <span>在线</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="icon"></div>
                  <div class="link">视频回放</div>
                </div>
              </div>
            </div>
            <div class="vm-item">
              <div class="head">14栋1单元门口道路-NO.243 摄像头</div>
              <div class="wrapper">
                <div class="video"></div>
                <div class="title">
                  <div class="time">2020-10-15 星期四 14:31:22</div>
                  <div class="line">
                    <span class="point">●</span>
                    <span>在线</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="icon"></div>
                  <div class="link">视频回放</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="monitorView">
          <div class="model-con">
            <div class="model-item">
              <div v-if="modelView === 1" class="v-model vm-1-1"></div>
              <div v-else class="v-model vm-1-0" @click="handleModelView(1)"></div>
              <div class="text">1视图</div>
            </div>
            <div class="model-item">
              <div v-if="modelView === 2" class="v-model vm-2-1"></div>
              <div v-else class="v-model vm-2-0" @click="handleModelView(2)"></div>
              <div class="text">2视图</div>
            </div>
            <div class="model-item">
              <div v-if="modelView === 3" class="v-model vm-3-1"></div>
              <div v-else class="v-model vm-3-0" @click="handleModelView(3)"></div>
              <div class="text">3视图</div>
            </div>
            <div class="model-item">
              <div v-if="modelView === 4" class="v-model vm-4-1"></div>
              <div v-else class="v-model vm-4-0" @click="handleModelView(4)"></div>
              <div class="text">4视图</div>
            </div>
          </div>
        </div>
        <div class="monitorFacility">
          <div class="mf-form">
            <div class="form-item line">
              <input class="inp-keyword" placeholder="请输入关键字进行搜索" @input="handleChangeInput" />
              <div class="inp-search" @click="handleClickSearch"></div>
            </div>
            <div class="form-item status-con">
              <div>
                <div v-if="status === 1" class="status-btn line-1">全部</div>
                <div v-else class="status-btn line-0" @click="handleStatus(1)">全部</div>
              </div>
              <div>
                <div v-if="status === 2" class="status-btn line-1">在线</div>
                <div v-else class="status-btn line-0" @click="handleStatus(2)">在线</div>
              </div>
              <div>
                <div v-if="status === 3" class="status-btn line-1">离线</div>
                <div v-else class="status-btn line-0" @click="handleStatus(3)">离线</div>
              </div>
            </div>
            <div class="group-title">
              <div class="bar">
                <div class="text">视频分组：</div>
              </div>
              <div class="icon"></div>
              <div class="group-select">
                <el-select v-model="area" size="mini" clearable @change="handleChangeArea">
                  <el-option
                    v-for="(item, index) in monitorAreaList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="videoList.length" class="group-con">
            <div v-for="(item, index) in videoList" :key="index">
              <div v-if="_.get(item, 'videoUrl')" class="group-item">
                <div class="vm-video">
                  <Video :ref="item.id" :url="item.videoUrl" :autoplay="false" />
                  <div class="vm-bg"></div>
                  <div class="bottom">
                    <div class="text">{{ item.deviceName }}</div>
                    <div class="icon"></div>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="group-item">
              <div class="vm-video">
                <img src="../images/video/vm-build.png" />
                <div class="vm-bg"></div>
                <div class="bottom">
                  <div class="text">NO.234 摄像头</div>
                  <div class="icon"></div>
                </div>
              </div>
            </div>-->
          </div>
          <div v-else class="group-con group-con-null">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../main/api/index'
import 'videojs-contrib-hls'
export default {
  data() {
    return {
      modelView: 1, // 视频宫格模式
      status: 1, // 视频状态
      videoList: [], // 视频列表
      area: '', // 视频所属区域
      keyword: '',
      video1: null,
      timer: null
    }
  },
  computed: {
    //监控区域
    monitorAreaList() {
      return this.$getArgList('monitorArea') || []
    }
  },
  mounted() {
    this.init()
    this.getMonitorVideoList()
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
    // 视频模式选择
    handleModelView(type) {
      /*this.modelView = type
      this.clearTouch()
      if (type === 1) {

      }*/
    },
    // 输入框改变事件
    handleChangeInput(e) {
      this.keyword = e.target.value
    },
    // 视频状态
    handleStatus(type) {
      this.status = type
      this.getMonitorVideoList()
    },
    // 视频设备列表
    async getMonitorVideoList() {
      let params = {
        projectId: localStorage.getItem('projectId'),
        monitorArea: this.area ? this.area : null,
        keyword: this.keyword,
        page: 1,
        rows: 1000
      }
      if (this.status === 1) {
        delete params.status
      } else if (this.status === 2) {
        params.status = 'monitorStatus_1,monitorStatus_2'
      } else if (this.status === 3) {
        params.status = 'monitorStatus_4'
      }
      let res = await Api.getMonitorVideoList(params)
      let videoList = res.data.records || []
      videoList.forEach(e => {
        e.videoUrl = ''
      })
      this.videoList = videoList
      if (videoList.length) {
        this.$nextTick(() => {
          videoList.forEach(async (item, index) => {
            await this.getVideoUrlAndPlayVideo(item)
            setTimeout(() => {
              // 只为处理切换路由时，造成自动播放，而加的暂停。(当前路由刷新时，不会自动播放，但是切换路由时，会自动播放。注：该video组件已设置autoplay="false"，但切换路由时依旧会自动播放)
              if (this.$refs[item.id]) {
                // console.log(this.$refs[item.id][0])
                this.$refs[item.id][0].pause()
              }
            }, 500)
          })
        })

        if (this.modelView === 1) {
          let video1 = videoList[0]
          this.$nextTick(async () => {
            await this.getVideoUrlAndPlayVideo(video1)
            this.video1 = video1
            this.timer = setInterval(() => {
              this.touch(this.video1)
            }, 10000)
          })
        }
      }
    },
    // 调用start，返回播放地址，并进行播放
    async getVideoUrlAndPlayVideo(item) {
      let params = {
        channel: '',
        deviceNum: '',
        projectId: localStorage.getItem('projectId')
      }
      if (item.channel) {
        params.channel = item.channel
        params.deviceNum = item.deviceNum
      } else {
        // 这个地址是因为后台数据缺少严谨性，而临时加的静态参数，防止播放组件报错
        params.channel = '1'
        params.deviceNum = '34020000001190000001'
      }
      console.log(params)
      let res = await Api.getVideoUrl(params)
      item.videoUrl = res.data
        ? res.data.WS_FLV
        : 'ws://bimfish.com:10001/ws_flv/hls/34020000001190000001_0200000001.flv' // 这个地址是因为后台数据缺少严谨性，而临时加的地址，防止播放组件报错
    },
    // 搜索
    handleClickSearch() {
      this.getMonitorVideoList()
    },
    // 视频分组
    handleChangeArea() {
      this.getMonitorVideoList()
    },
    // 视频实时直播
    touch(video) {
      Api.touch({ channel: video.channel, deviceNum: video.deviceNum, projectId: localStorage.getItem('projectId') })
    },
    clearTouch() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="less" scoped>
.video {
  display: flex;
  .left {
    width: 1514px;
    .videoMonitor {
      width: 1470px;
      height: 965px;
      background: url('../images/video/video-monitor.png') no-repeat;
      margin: 16px auto 0px auto;
      .vm-con4 {
        padding: 25px 20px 10px 20px;
        display: flex;
        flex-wrap: wrap;
        .vm-item {
          width: 678px;
          margin: 0px 18px;
          .head {
            height: 40px;
            line-height: 38px;
            background: rgba(41, 34, 30, 0.8);
            text-align: center;
            margin-top: 40px;
            margin-bottom: 10px;
          }
          .wrapper {
            position: relative;
            .video {
              height: 366px;
              background: url('../images/video/video-bg.png') no-repeat;
            }
            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: absolute;
              width: 678px;
              height: 30px;
              top: 0px;
              background: rgba(97, 97, 105, 0.8);
              font-size: 14px;
              .time {
                margin-left: 10px;
              }
              .line {
                margin-right: 10px;
                color: #62ffae;
                .point {
                  text-shadow: 0px 0px 6px #62ffae;
                  margin-right: 5px;
                }
              }
            }
            .bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: absolute;
              width: 678px;
              height: 30px;
              bottom: 0px;
              background: rgba(69, 55, 27, 0.8);
              font-size: 14px;
            }
            .icon {
              width: 15px;
              height: 19px;
              background: url('../images/video/vm-icon.png') no-repeat;
              margin-left: 10px;
              cursor: pointer;
            }
            .link {
              margin-right: 10px;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .right {
    width: 410px;
    .monitorView {
      width: 365px;
      height: 190px;
      background: url('../images/video/monitor-view.png') no-repeat;
      margin: 7px auto 0px auto;

      .model-con {
        display: flex;
        padding: 80px 18px 0px 18px;
        .model-item {
          margin: 0px 14px;
          .v-model {
            width: 54px;
            height: 54px;
            cursor: pointer;
          }
          .vm-1-0 {
            background: url('../images/video/vm-1-0.png') no-repeat;
          }
          .vm-2-0 {
            background: url('../images/video/vm-2-0.png') no-repeat;
          }
          .vm-3-0 {
            background: url('../images/video/vm-3-0.png') no-repeat;
          }
          .vm-4-0 {
            background: url('../images/video/vm-4-0.png') no-repeat;
          }
          .vm-1-1 {
            background: url('../images/video/vm-1-1.png') no-repeat;
          }
          .vm-2-1 {
            background: url('../images/video/vm-2-1.png') no-repeat;
          }
          .vm-3-1 {
            background: url('../images/video/vm-3-1.png') no-repeat;
          }
          .vm-4-1 {
            background: url('../images/video/vm-4-1.png') no-repeat;
          }
          .text {
            text-align: center;
            font-size: 14px;
            margin-top: 14px;
          }
        }
      }
    }
    .monitorFacility {
      width: 365px;
      height: 767px;
      background: url('../images/video/monitor-facility.png') no-repeat;
      margin: 16px auto 0px auto;
      .mf-form {
        padding: 40px 16px 0px 16px;
        margin-bottom: 8px;
        .form-item {
          display: flex;
          justify-content: space-between;
          .inp-keyword {
            outline: none;
            padding: 2px 4px;
            width: 296px;
            background: #272423;
            border: solid 1px #393127;
            color: #ffffff;
            font-size: 14px;
          }
          .inp-search {
            width: 23px;
            height: 23px;
            border: solid 1px #6d5f50;
            background: url('../images/video/search.png') center no-repeat;
            cursor: pointer;
          }
        }
        .line {
          padding-bottom: 6px;
          border-bottom: solid 1px #6d5f50;
        }
        .status-con {
          justify-content: space-between;
          padding-top: 10px;
          .status-btn {
            width: 102px;
            height: 36px;
            font-size: 14px;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
          }
          .line-0 {
            color: #7a7979;
            background: url('../images/video/line-0.png') no-repeat;
          }
          .line-1 {
            color: #ffffff;
            background: url('../images/video/line-1.png') no-repeat;
          }
        }
        .group-title {
          margin-top: 20px;
          position: relative;
          height: 37px;
          .icon {
            background: url('../images/video/group.png') no-repeat;
            width: 35px;
            height: 37px;
            position: absolute;
            left: 10px;
          }
          .bar {
            background: #433c35;
            height: 26px;
            position: absolute;
            bottom: 0px;
            width: 100%;
            display: flex;
            align-items: center;
            .text {
              font-size: 12px;
              margin-left: 60px;
            }
          }
          .group-select {
            position: absolute;
            left: 160px;
            top: 10px;
            /deep/ .el-input__inner {
              border: 0px;
              background: transparent;
              color: #a0a0a0;
            }
          }
        }
      }
      .group-con {
        margin-left: 16px;
        margin-right: 6px;
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        max-height: 580px;
        overflow-y: auto;
        overflow-x: hidden;
        .group-item {
          margin-top: 8px;
          margin-bottom: 8px;
          .vm-video {
            width: 158px;
            height: 100px;
            position: relative;
            /deep/ .xgplayer-start {
              display: none;
            }
            .vm-bg {
              width: 158px;
              height: 100px;
              background: url('../images/video/vm-bg.png') no-repeat;
              position: absolute;
              top: 0px;
              z-index: 1000;
            }
            .bottom {
              width: 150px;
              height: 20px;
              position: absolute;
              left: 3px;
              bottom: 4px;
              background: rgba(70, 60, 47, 0.5);
              display: flex;
              justify-content: space-between;
              align-items: center;
              z-index: 1000;
              .text {
                color: #e7b367;
                font-size: 12px;
                margin-left: 8px;
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
              }
              .icon {
                width: 12px;
                height: 14px;
                background: url('../images/video/mf-icon.png') no-repeat;
                margin-right: 10px;
              }
            }
          }
        }
        .group-item:nth-child(odd) {
          margin-right: 8px;
        }
        .group-item:nth-child(even) {
          margin-left: 8px;
        }
      }
      .group-con-null {
        color: #a0a0a0;
        justify-content: center;
        line-height: 580px;
      }
    }
  }
}
</style>
