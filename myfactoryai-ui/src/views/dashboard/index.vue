<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart1_1.show">
          <BaseChart :chart-data="chart1_1.ChartData" :series="chart1_1.series" :height="height1"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart1_2.show">
          <BaseChart :chart-data="chart1_2.ChartData" :series="chart1_2.series" :height="height1"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart1_3.show">
          <BaseChart :chart-data="chart1_3.ChartData" :series="chart1_3.series" :height="height1"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart2_1.show">
          <BaseChart :chart-data="chart2_1.ChartData" :series="chart2_1.series" :height="height2"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart2_2.show">
          <BaseChart :chart-data="chart2_2.ChartData" :series="chart2_2.series" :height="height2"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="chart2_3.show">
          <BaseChart :chart-data="chart2_3.ChartData" :series="chart2_3.series" :height="height2"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import BaseChart from './BaseChart'


import {listHadaytrend} from "@/api/idx/hadaytrend";
import {listInventory} from "@/api/idx/inventory";
import {listLotrend} from "@/api/idx/lotrend";

import {listHqdaytrend} from "@/api/idx/hqdaytrend";
import {listResultrend} from "@/api/idx/resultrend";
import {listCausetrend} from "@/api/idx/causetrend";

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

export default {
  name: 'Index',
  components: {
    PanelGroup,
    BaseChart
  },
  data() {
    return {
      //第二行第三行的高度
      height1: '300px',
      height2: '300px',

      chart1_1: {
        ChartData: [],
        series: [],
        show: false
      },
      chart1_2: {
        ChartData: [],
        series: [],
        show: false
      },
      chart1_3: {
        ChartData: [],
        series: [],
        show: false
      },
      chart2_1: {
        ChartData: [],
        series: [],
        show: false
      },
      chart2_2: {
        ChartData: [],
        series: [],
        show: false
      },
      chart2_3: {
        ChartData: [],
        series: [],
        show: false
      },

    }
  },
  created() {
    this.getlistHadaytrend()
    this.getlistInventory()
    this.getlistLotrend()

    this.getlistHqdaytrend()
    this.getlistResultrend()
    this.getlistCausetrend()

  },


  methods: {
    getlistHadaytrend() {
      listHadaytrend({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', '订单量', '计划量', '生产量', '质检量', '入库量', '发货量']

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].quantityOrder, tempgetlist[i].quantityPlan, tempgetlist[i].quantityWork, tempgetlist[i].quantityInspection, tempgetlist[i].quantityStock, tempgetlist[i].quantityDelivery]
        }
        this.chart1_1.ChartData = templist

        this.chart1_1.series = [{type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}]
        this.chart1_1.show = true
      });
    },
    getlistInventory() {
      listInventory({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', '原料金额', '物料金额', '产品金额']

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].moneyRaw, tempgetlist[i].moneyParts, tempgetlist[i].moneyProduct]
        }
        this.chart1_2.ChartData = templist

        this.chart1_2.series = [{type: 'line'}, {type: 'line'}, {type: 'line'}]
        this.chart1_2.show = true
      });
    },
    getlistLotrend() {
      listLotrend({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', '在制批数', '特急批数', '紧急批数', '冻结批数', '取消批数', '结案批数']

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].quantityWip, tempgetlist[i].quantitySuperurgent, tempgetlist[i].quantityUrgent, tempgetlist[i].quantityFrozen, tempgetlist[i].quantityKilled, tempgetlist[i].quantityCompleted]
        }
        this.chart1_3.ChartData = templist

        this.chart1_3.series = [{type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}]
        this.chart1_3.show = true
      });
    },

    getlistResultrend() {
      listResultrend({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', '报废数量', '重派数量', '返工数量', '待判数量', '特采次数']

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].quantityScrap, tempgetlist[i].quantityRedisp, tempgetlist[i].quantityRework, tempgetlist[i].quantityPending, tempgetlist[i].quantityAod]
        }
        this.chart2_1.ChartData = templist

        this.chart2_1.series = [{type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}]
        this.chart2_1.show = true
      });
    },
    getlistHqdaytrend() {
      listHqdaytrend({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response.rows))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', '4-产线', '5-产线']

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].lineId === 4 ? tempgetlist[i].yield : null, tempgetlist[i].lineId === 5 ? tempgetlist[i].yield : null]
        }


        for (let i = 1; i < templist.length; i++) {
          for (let j = 1; j < templist.length; j++) {
            if (templist[i][0] === templist[j][0]) {
              templist[i][2] = templist[j][2]
              templist[j][1] = templist[i][1]
            }
          }
        }
        // 去重
        for (let i = 1; i < templist.length; i++) {
          for (let j = 1; j < templist.length; j++) {
            if (templist[i][0] === templist[j][0]) {
              templist.splice(j, 1)
            }
          }
        }

        this.chart2_2.ChartData = templist
        // console.log(JSON.stringify(templist))
        this.chart2_2.series = [{type: 'bar'}, {type: 'bar'}]
        this.chart2_2.show = true
      });
    },

    getlistCausetrend() {
      listCausetrend({"flag": "1"}).then(response => {
        // console.log(JSON.stringify(response))
        var tempgetlist = response.rows
        var templist = []
        templist[0] = ['legend', "质量异常"]

        for (let i = 0; i < tempgetlist.length; i++) {
          templist[i + 1] = [tempgetlist[i].day, tempgetlist[i].count]
        }
        this.chart2_3.ChartData = templist

        this.chart2_3.series = [{type: 'bar'}]
        this.chart2_3.show = true
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 14px 14px 0;
    margin-bottom: 12px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
