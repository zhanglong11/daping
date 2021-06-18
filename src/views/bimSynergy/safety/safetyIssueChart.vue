<template>
  <div class="chart-con">
    <div id="safety-issue-chart" style="width: 250px; height: 200px"></div>
    <div class="chart-title">安全问题</div>
    <div class="item-con">
      <div class="title">紧急程度</div>
      <div class="item">
        <div class="left"><span class="point point-1">●</span>重大隐患<span class="num">11</span></div>
        <div class="right">未解决<span class="num">6</span></div>
      </div>
      <div class="item">
        <div class="left"><span class="point point-2">●</span>严重隐患<span class="num">15</span></div>
        <div class="right">未解决<span class="num">5</span></div>
      </div>
      <div class="item">
        <div class="left"><span class="point point-3">●</span>较大隐患<span class="num">6</span></div>
        <div class="right">未解决<span class="num">5</span></div>
      </div>
      <div class="item">
        <div class="left"><span class="point point-4">●</span>一般隐患<span class="num">56</span></div>
        <div class="right">未解决<span class="num">15</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      option: {}
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
    this.$nextTick(() => {
      this.drawChart()
    })
    setTimeout(() => {
      this.option = {
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
            data: [
              {
                name: '重大隐患',
                value: 11
              },
              {
                name: '严重隐患',
                value: 15
              },
              {
                name: '较大隐患',
                value: 6
              },
              {
                name: '一般隐患',
                value: 56
              }
            ]
          }
        ]
      }
    }, 500)
  },
  methods: {
    drawChart() {
      this.chart = echarts.init(document.getElementById('safety-issue-chart'))
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="less" scoped>
.chart-con {
  display: flex;
  padding-top: 50px;
  position: relative;
  #safety-issue-chart {
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
    .item {
      display: flex;
      height: 40px;
      align-items: center;
      color: #a0a0a0;
      .left {
        width: 112px;
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
</style>
