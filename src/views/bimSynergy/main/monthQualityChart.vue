<template>
  <div id="month-quality-chart" style="width: 350px; height: 360px"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      totalObj: {
        '已整改问题数量': 0,
        '未整改问题数量': 0,
        '发现问题数量': 0
      }
    }
  },
  watch: {
    option: {
      handler: function (val) {
        if (this.chart) {
          // this.chart.clear()
          // this.chart.setOption(val)
          // console.log(val)
          this.totalObj['已整改问题数量'] = val.rectifiedSum
          this.totalObj['未整改问题数量'] = val.unRectifiedSum
          this.totalObj['发现问题数量'] = val.problemSum
          let rectifiedNums = []
          let unRectifiedNums = []
          let problemNums = []
          for (let i = 0; i < val.yaxisData.length; i++) {
            rectifiedNums.push(val.yaxisData[i].rectifiedNum)
            unRectifiedNums.push(val.yaxisData[i].unRectifiedNum)
            problemNums.push(val.yaxisData[i].problemNum)
          }
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                color: '#b8b8b8'
              }
            },
            legend: {
              textStyle: {
                color: '#b8b8b8'
              },
              formatter: (name) => {
                return name + `(${this.totalObj[name]})`
              },
              data: ['发现问题数量', '已整改问题数量', '未整改问题数量']
            },
            color: [
              new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: '#fac87b'
                },
                {
                  offset: 1,
                  color: '#855814'
                }
              ]),
              new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: '#9cdbf7'
                },
                {
                  offset: 1,
                  color: '#21617d'
                }
              ]),
              new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: '#e0455f'
                },
                {
                  offset: 1,
                  color: '#9e051f'
                }
              ])
            ],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                color: '#b8b8b8'
              },
              axisLine: {
                lineStyle: {
                  color: '#b8b8b8'
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#495153'
                },
                show: true
              }
            },
            yAxis: {
              type: 'category',
              data: ['第一周', '第二周', '第三周', '第四周', '第五周'],
              axisLabel: {
                color: '#b8b8b8',
                formatter: function (value) {
                  return value.split('').join('\n')
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#b8b8b8'
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#495153'
                },
                show: true
              }
            },
            series: [
              {
                name: '已整改问题数量',
                type: 'bar',
                barWidth: '14',
                stack: '总量',
                // data: [320, 302, 301, 334, 390]
                data: []
              },
              {
                name: '未整改问题数量',
                type: 'bar',
                barWidth: '14',
                stack: '总量',
                // data: [120, 132, 101, 134, 90]
                data: []
              },
              {
                name: '发现问题数量',
                type: 'bar',
                barWidth: '14',
                stack: '总量',
                // data: [220, 182, 191, 234, 290]
                data: []
              }
            ]
          }
          option.series[0].data = rectifiedNums
          option.series[1].data = unRectifiedNums
          option.series[2].data = problemNums

          this.chart.setOption(option)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart()
    })
  },
  methods: {
    drawChart() {
      this.chart = echarts.init(document.getElementById('month-quality-chart'))
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="less" scoped></style>
