<template>
  <el-row :gutter="32" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-quality">
          <!--          <svg-icon icon-class="peoples" class-name="card-panel-icon"/>-->
          <span class="icon-title-icon">Q </span>
          <span class="icon-title">质量</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">直通率</div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.fpy" :duration="2600"/>
            <span class="card-panel-num-unit">%</span>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">合格率</div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.yield" :duration="2100"/>
            <span class="card-panel-num-unit">%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-cost">
          <!--          <svg-icon icon-class="money" class-name="card-panel-icon"/>-->
          <span class="icon-title-icon">C </span>
          <span class="icon-title">成本</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            存货金额
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.inventoryMoney" :duration="3200"/>
            <span class="card-panel-num-unit">万元</span>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在制单数
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.lotCount" :duration="3200"/>
            <span class="card-panel-num-unit">单</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-deliver">
          <!--          <svg-icon icon-class="shopping" class-name="card-panel-icon"/>-->
          <span class="icon-title-icon">D </span>
          <span class="icon-title">交付</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">生产周期</div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.cycleTime" :duration="3200"/>
            <span class="card-panel-num-unit">天</span>
          </div>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">交期完成率</div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="qcd.completionRate" :duration="3200"/>
            <span class="card-panel-num-unit">%</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {getQcd} from "@/api/idx/qcd";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      qcd: {

        id: 0,
        /** 良率 */
        yield: 0,

        /** 直通率 */
        fpy: 0,

        /** 存货金额 */
        inventoryMoney: 0,

        /** 在制批数 */
        lotCount: 0,

        /** 交期完成率 */
        completionRate: 0,

        /** 生产周期 */
        cycleTime: 0
      }

    }
  },
  created() {
    this.getQcd()
  },
  methods: {
    getQcd() {
      getQcd(1).then(response => {
        this.qcd = response.data;
        // console.log(JSON.stringify(response.data))
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 0;

  .card-panel-col {
    margin-bottom: 12px;
  }

  .icon-title {
    font-size: 40px;
  }

  .icon-title-icon {
    font-size: 60px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-quality {
        background: #40c9c6;
      }

      .icon-cost {
        background: #f4516c;
      }

      .icon-deliver {
        background: #34dda3
      }
    }

    .icon-quality {
      color: #40c9c6;
    }

    .icon-cost {
      color: #f4516c;
    }

    .icon-deliver {
      color: #34dda3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px;
      padding: 0px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      //margin-left: 0px;

      .card-panel-text {
        text-align: center;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        text-align: center;
        font-size: 20px;
      }

      .card-panel-num-unit {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
