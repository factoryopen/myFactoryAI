<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="customerId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>客户</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.customerName" filterable placeholder="请选择客户" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCustomerList"
            :key="index"
            :label="fkrow.customerName+'['+fkrow.customerCode+']'"
            :value="fkrow.customerName"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contractNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>合同号</strong></span>
                </span>
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="soId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>销售订单</strong></span>
            </span>
        <el-select class="searchInput" v-model="queryParams.soId" filterable placeholder="请选择销售订单" size="mini">
          <el-option
            v-for="(fkrow, index) in fkSoList"
            :key="index"
            :label="fkrow.billNo"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.sales_status_so"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="marginBottom5">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="650px"
              :data="soFinanceList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              :cell-style="cellStyle"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column label="客户名称" align="left" prop="customerName" width="120" show-overflow-tooltip/>
      <el-table-column label="合同编号" align="left" prop="contractNo" width="140" show-overflow-tooltip/>
      <el-table-column label="销售订单" align="center" prop="soId" width="115" show-overflow-tooltip>
        <template slot-scope="scope">
          <template v-for="(item,index) in fkSoList">
            <span v-if="item.id==scope.row.soId" :key="index" size="mini">{{ item.billNo }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="项次" align="center" prop="seqNo" width="50"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="产品编码" align="left" prop="productCode" width="150" show-overflow-tooltip/>
      <el-table-column label="产品名称" align="left" prop="productName" width="130" show-overflow-tooltip/>
      <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
      <el-table-column label="产品规格" align="left" prop="productSpec" width="110" show-overflow-tooltip/>
      <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110" show-overflow-tooltip/>
      <el-table-column label="单位" align="center" prop="unitId" width="50">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{ item.unitName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单量" align="right" prop="quantityOrder" style="color:sandybrown" width="65" fixed="right"/>
      <el-table-column label="单价" align="right" prop="price" width="70" fixed="right"/>
      <el-table-column label="未税金额" align="right" prop="amount" width="75" fixed="right"/>
      <el-table-column label="完发量" align="right" prop="quantityDelivered" width="65" fixed="right"/>
      <el-table-column label="开票量" align="right" prop="quantityInvoiced" width="65" fixed="right"/>
      <el-table-column label="开票金额" align="right" prop="amountInvoiced" width="75" fixed="right"/>
      <el-table-column label="备注" align="left" prop="remark"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>
  </div>
</template>

<script>
import {listSoFinanceAll} from "@/api/ord/soFinance";
import {listUser} from "@/api/system/user";
import {listUnit} from "@/api/bas/unit";
import {listSo} from "@/api/ord/so";
import {listSoItem} from "@/api/ord/soItem";
import {listProject} from "@/api/ord/project";
import {listProductBasis} from "@/api/eng/productBasis";
import {listSoTrace} from "@/api/ord/soTrace";
import {listCustomer} from "@/api/cha/customer";

export default {
  name: "DeliveryInvoice",
  dicts: ['sales_status_so','bill_priority'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      captions: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      //
      masterTable: [],
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 订单明细表格数据
      soFinanceList: [],
      fkCustomerList: [],
      fkUserList: [],
      fkUnitList: [],
      fkSoList: [],
      fkSoItemList: [],
      fkProjectList: [],
      fkProductBasisList: [],
      fkDeliveryDealList: [],
      fkSoTraceList: [],
      //主表当前行的ID
      masterId: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        soId: null,
        seqNo: null,
        status: null,
        productId: null,
        productName: null,
        productSpec: null,
        unitId: null,
        priority: null,
        needDay: null,
        promiseDay: null,
      },
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Customer数据 */
    this.getCustomerList();
    /** 查询外键User数据 */
    this.getUserList();
    /** 查询外键Unit数据 */
    this.getUnitList();
    /** 查询外键So数据 */
    this.getSoList();
    /** 查询外键SoItem数据 */
    this.getSoItemList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键ProductBasis数据 */
    this.getProductBasisList();
    /** 查询外键DeliveryDeal数据 */
    this.getDeliveryDealList();
    /** 查询外键SoTrace数据 */
    this.getSoTraceList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listSoFinanceAll(this.queryParams).then(response => {
        this.soFinanceList = response.rows;
        this.total = response.total;
        if (this.soFinanceList && this.soFinanceList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
        }

        this.loading = false;
      });
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 查询外键User数据 */
    getUserList() {
      listUser().then(res => {
        this.fkUserList = res.rows;
      });
    },
    /** 查询外键Unit数据 */
    getUnitList() {
      listUnit().then(res => {
        this.fkUnitList = res.rows;
      });
    },
    /** 查询外键So数据 */
    getSoList() {
      listSo().then(res => {
        this.fkSoList = res.rows;
      });
    },
    /** 查询外键SoItem数据 */
    getSoItemList() {
      listSoItem().then(res => {
        this.fkSoItemList = res.rows;
      });
    },
    /** 查询外键Project数据 */
    getProjectList() {
      listProject().then(res => {
        this.fkProjectList = res.rows;
      });
    },
    /** 查询外键ProductBasis数据 */
    getProductBasisList() {
      listProductBasis().then(res => {
        this.fkProductBasisList = res.rows;
      });
    },
    /** 查询外键DeliveryDeal数据 */
    getDeliveryDealList() {
      listDeliveryDealPublished().then(res => {
        this.fkDeliveryDealList = res.rows;
      });
    },
    /** 查询外键SoTrace数据 */
    getSoTraceList() {
      listSoTrace().then(res => {
        this.fkSoTraceList = res.rows;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getMasterList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 主表的CSS行样式 */
    rowClassName({row, rowIndex}) {
      var className = ''

      if (this.ids.includes(row.id)) {
        className = 'selected-row';
      } else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }

      return className;
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==0 || columnIndex==1 || columnIndex==7) {
        className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==11 || columnIndex==13) {
        className = "fontSize:12px; color:sandybrown; padding:1px 0px;";
      }
      else if (columnIndex==12) {
        className = "fontSize:12px; color:rosybrown; padding:1px 0px;";
      }
      else if (columnIndex==14 || columnIndex==15) {
        className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
      }
      else if (columnIndex==16) {
        className = "fontSize:12px; color:lawngreen; padding:1px 0px;";
      }

      return className;
    },
    handleExport() {
      this.download('ord/soFinance/export', {
        ...this.queryParams
      }, `soFinance${new Date().getTime()}.xlsx`)
    },
  }
};
</script>

<style>
.marginBottom5 {
  margin-bottom: 5px !important
}

.marginBottom0 {
  margin-bottom: 0;
}

.fontSize12 {
  font-size: 12px
}

.inputWidth {
  width: 60% !important
}

.searchInput {
  width: 180px !important
}

.el-input__inner {
  width: 100%
}

.dialogConfig .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: deepskyblue !important;
  color: honeydew;
}

.el-table__body tr.current-row > td {
  background-color: lightskyblue !important;
  color: honeydew;
}

.el-table .selected-row {
  background: #BDEEF6;
}

.el-table .super-urgent-row {
  background: #F9EBEB;
  color: orangered;
}

.el-table .urgent-row {
  background: #F7F7EB;
  color: sandybrown;
}

.el-table .bill-draft-row {
  background: lightgray;
}

.el-table .bill-audit-request-row {
  background: #F7F7EB;
}

.el-table .bill-audit-reject-row {
  background: yellow;
}

.el-table .bill-audit-passed-row {
  background: greenyellow;
}

.el-table .bill-released-row {
}

.el-table .bill-processreq-row {
  background: orange;
}

.el-table .bill-processing-row {
}

.el-table .bill-frozen-row {
  background: gray;
}

.el-table .bill-disabled-row {
  background: darkred;
}

.el-table .bill-exception-row {
  background: red;
}

.el-table .bill-stockreq-row {
  background: greenyellow;
}

.el-table .bill-finished-row {
  background: lawngreen;
}

.el-table .bill-finishedforcely-row {
  background: darkgreen;
}
</style>
