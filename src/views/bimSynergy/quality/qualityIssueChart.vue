<template>
  <div class="chart-con">
    <div v-if="type === 1" id="quality-chart" class="chart" style="width: 250px; height: 200px"></div>
    <div v-else id="safe-chart" class="chart" style="width: 250px; height: 200px"></div>
    <div class="chart-title">{{ type === 1 ? '质量问题' : '安全问题' }}</div>
    <div class="item-con">
      <div class="title">检查状态</div>
      <div class="content">
        <div class="item">
          <span class="point point-1">●</span>待整改<span class="num">{{ info.toRectifiedNum }}</span>
        </div>
        <div class="item">
          <span class="point point-2">●</span>待复查<span class="num">{{ info.toReviewedNum }}</span>
        </div>
        <div class="item">
          <span class="point point-3">●</span>复查合格<span class="num">{{ info.reviewPassNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Api from './api'
export default {
  props: {
    type: {}
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#ed536d', '#f8a715', '#fde521', '#419bf9'],
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '65%'],
            minAngle: 10,
            avoidLabelOverlap: true,
            hoverOffset: 5,
            label: {
              show: true,
              formatter: function (val) {
                return val.value
              }
            },
            data: []
          }
        ]
      },
      info: {}
    }
  },
  watch: {
    option: {
      handler: function (val) {
        if (this.chart) {
          // this.chart.clear()
          this.chart.setOption(val)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.refresh()
    this.drawChart()
  },
  methods: {
    drawChart() {
      this.chart =
        this.type === 1
          ? echarts.init(document.getElementById('quality-chart'))
          : echarts.init(document.getElementById('safe-chart'))
      this.chart.setOption(this.option)
    },
    async refresh() {
      let res = await Api.statics(this.type)
      let data = res.data
      this.info = {
        toRectifiedNum: data.toRectifiedNum,
        toReviewedNum: data.toReviewedNum,
        reviewPassNum: data.reviewPassNum
      }
      this.option.series[0].data = [
        {
          name: '待整改',
          value: data.toRectifiedNum
        },
        {
          name: '待复查',
          value: data.toReviewedNum
        },
        {
          name: '复查合格',
          value: data.reviewPassNum
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.chart-con {
  display: flex;
  padding-top: 50px;
  position: relative;
  .chart {
    margin-left: 20px;
  }
  .chart-title {
    position: absolute;
    font-size: 16px;
    color: #a0a0a0;
    top: 138px;
    left: 112px;
  }
  .item-con {
    flex: 1;
    font-size: 14px;
    .title {
      text-align: center;
      color: #ffdda8;
      padding-top: 10px;
    }
    .content {
      margin-top: 20px;
      .item {
        height: 40px;
        color: #a0a0a0;
        width: 100%;
        text-align: left;
        .point {
          margin-right: 8px;
        }
        .point-1 {
          color: #ed536d;
        }
        .point-2 {
          color: #f8a715;
        }
        .point-3 {
          color: #fde521;
        }
        .point-4 {
          color: #419bf9;
        }
        .num {
          font-style: italic;
          font-weight: 900;
          color: #f5c775;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
