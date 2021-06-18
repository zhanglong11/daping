<template>
  <div id="month-safety-chart" style="width: 350px; height: 270px"></div>
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
              trigger: 'axis'
            },
            legend: {
              icon: 'roundRect',
              textStyle: {
                color: '#b8b8b8'
              },
              formatter: (name) => {
                return name + `(${this.totalObj[name]})`
              },
              data: ['发现问题数量', '已整改问题数量', '未整改问题数量']
            },
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#fac87b'
                },
                {
                  offset: 1,
                  color: '#855814'
                }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#9cdbf7'
                },
                {
                  offset: 1,
                  color: '#21617d'
                }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
              right: '6%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#495153'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              //轴线上的字
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#b8b8b8',
                  fontSize: '14'
                }
              },
              data: ['第一周', '第二周', '第三周', '第四周', '第五周']
            },
            yAxis: [
              {
                type: 'value',
                splitNumber: 4,
                axisTick: {
                  show: false
                },
                //轴线上的字
                axisLabel: {
                  textStyle: {
                    fontSize: '12',
                    color: '#cecece'
                  }
                },
                axisLine: {
                  show: false
                },
                //网格线
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#495153'
                  }
                }
              }
            ],
            series: [
              {
                name: '已整改问题数量',
                type: 'line',
                smooth: false, //是否平滑曲线显示
                showSymbol: false,
                lineStyle: {
                  color: '#fac87b'
                },
                areaStyle: {},
                // data: [50, 500, 80, 300, 70]
                data: []
              },
              {
                name: '未整改问题数量',
                type: 'line',
                smooth: false, //是否平滑曲线显示
                showSymbol: false,
                lineStyle: {
                  color: '#9cdbf7'
                },
                areaStyle: {},
                // data: [400, 150, 250, 150, 130]
                data: []
              },
              {
                name: '发现问题数量',
                type: 'line',
                smooth: false, //是否平滑曲线显示
                showSymbol: false,
                lineStyle: {
                  color: '#e0455f'
                },
                areaStyle: {},
                // data: [220, 180, 190, 170, 290]
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
      this.chart = echarts.init(document.getElementById('month-safety-chart'))
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="less" scoped></style>
