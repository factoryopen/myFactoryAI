<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts';

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '320px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },

    chartData: {
      /***
       * 表数据
       * [
       *  ['legend',图例1,图例2,图例3,图例4....],
       *  ['x轴坐标',数据1,数据2,数据3,数据4....],
       *  ['x轴坐标',数据1,数据2,数据3,数据4....],
       *  ['x轴坐标',数据1,数据2,数据3,数据4....]
       * ]
       * 例子：
       * [
       *   ['legend', '订单量', '计划量', '生产量', '质检量', '入库量', '发货量'],
       *   ['2023-04-02', 43.3, 85.8, 93.7, 43.3, 43.3, 85.8],
       *   ['2023-04-03', 83.1, 73.4, 55.1, 53.3, 13.3, 55.8],
       *   ['2023-04-04', 86.4, 65.2, 82.5, 41.3, 43.3, 85.8],
       *   ['2023-04-05', 72.4, 53.9, 39.1, 23.3, 93.3, 15.8],
       *   ['2023-04-06', 83.1, 73.4, 55.1, 13.3, 43.3, 5.8],
       *   ['2023-04-07', 86.4, 66.6, 82.5, 93.3, 73.3, 25.8],
       *   ['2023-04-08', 86.4, 66.6, 82.5, 63.3, 23.3, 95.8]
       * ]
       */
      type: Array,
      required: true
    },

    series: {
      /***
       *  数据展示形式 饼，线条
       *
       *  [{
       *       type: 'line',
       *       smooth: true,
       *       // itemStyle: {
       *       //   normal: {
       *       //     color: '#FF005A',
       *       //     lineStyle: {
       *       //       color: '#FF005A',
       *       //       width: 2
       *       //     }
       *       //   }
       *       // },
       *       // animationDuration: 1000,
       *       animationEasing: 'cubicInOut'
       *     }, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}]
       */
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      option: {
        legend: {},
        grid: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 5]
        },
        dataset: {
          // 提供一份数据。
          source: []
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {
          axisTick: {
            show: false
          }
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: []
      }
    }
  },

  created() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.option.dataset.source = this.chartData
    this.option.series = this.series
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.setOptions(this.option)
    },
    setOptions(op){
      this.chart.setOption(op)
    }
  }
}
</script>
