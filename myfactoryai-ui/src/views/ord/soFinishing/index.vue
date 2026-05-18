<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单号</strong></span>
                </span>
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入订单号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item prop="customerId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>客户</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.customerId" filterable placeholder="请选择客户" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCustomerList"
            :key="index"
            :label="fkrow.customerName"
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
            v-for="dict in dict.type.bill_status_finished"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="soType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单类型</strong></span>
                </span>
        <el-select v-model="queryParams.soType" placeholder="请选择订单类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.ord_so_type"
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
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-finished"
            size="mini"
            :disabled="multiple"
            @click="handleFinish"
          >结案
          </el-button>
        </el-col>
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
              height="220px"
              :data="soList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="订单号" align="center" prop="billNo" width="115"/>
      <el-table-column label="合同号" align="center" prop="contractNo" width="150"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_status_finished" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="客户" align="left" prop="customerId" width="120">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                              :key="index"
                              size="mini">{{ item.customerName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" prop="soType" width="75">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.ord_so_type" :value="scope.row.soType"/>
        </template>
      </el-table-column>
      <el-table-column label="项目" align="right" prop="projectId" width="85">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                              :key="index"
                              size="mini">{{ item.projectName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" align="center" prop="orderDay" width="85">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未税金额" align="right" prop="amountUntaxed" width="85"/>
      <el-table-column label="开票方式" align="center" prop="invoicePatternId" width="75">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                              :key="index"
                              size="mini">{{ item.patternName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="含税金额" align="right" prop="amountTaxed" width="85"/>
      <el-table-column label="付款方式" align="center" prop="payPatternId" width="75">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkPayPatternList">
                        <span v-if="item.id==scope.row.payPatternId"
                              :key="index"
                              size="mini">{{ item.patternName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="交货方式" align="center" prop="shipmentTypeId" width="95">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkShipmentTypeList">
                        <span v-if="item.id==scope.row.shipmentTypeId"
                              :key="index"
                              size="mini">{{ item.typeDesc }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="币别" align="center" prop="currencyId" width="60">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCurrencyList">
                        <span v-if="item.id==scope.row.currencyId"
                              :key="index"
                              size="mini">{{ item.currencyName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="汇率%" align="right" prop="exchangeRate" width="80"/>
      <el-table-column label="地址" align="left" prop="addressId" width="180">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerAddressList">
                        <span v-if="item.id==scope.row.addressId"
                              :key="index"
                              size="mini">{{ item.address }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="contactId" width="65">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerContactList">
                        <span v-if="item.id==scope.row.contactId"
                              :key="index"
                              size="mini">{{ item.contact }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="销售员" align="center" prop="salesId" width="65">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.salesId"
                              :key="index"
                              size="mini">{{ item.nickName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center" prop="deptId" width="85">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                              :key="index"
                              size="mini">{{ item.deptName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="left" prop="remark"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <el-tabs>
      <el-tab-pane label="订单明细">
        <el-table ref="soItem" border
                  :data="soItemList"
                  highlight-current-row
                  :row-class-name="rowClassNameSoItem"
                  :cell-style="cellStyleSoItem"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productId" width="150">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkProductBasisList">
                  <span v-if="item.id==scope.row.productId"
                        :key="index"
                        size="mini">{{ item.materialCode }}
                  </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="订单数量" align="right" prop="quantityOrder" width="80"/>
          <el-table-column label="原价" align="right" prop="price" width="80"/>
          <el-table-column label="折扣价" align="right" prop="discountPrice" width="80"/>
          <el-table-column label="金额" align="right" prop="amount" width="80"/>
          <el-table-column label="折扣率" align="right" prop="discountRate" width="80"/>
          <el-table-column label="最终金额" align="right" prop="finalAmount" width="80"/>
          <!--          <el-table-column label="交货数量" align="right" prop="quantityDelivery" width="80"/>-->
          <!--          <el-table-column label="外协数量" align="right" prop="quantityOs" width="80"/>-->
          <!--          <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="80"/>-->
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="需求日期" align="center" prop="needDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {listSoFinishing, getSo, delSo, addSo, updateSo, froze, finish} from "@/api/ord/so";
import {listSoItem, getSoItem, delSoItem, addSoItem, updateSoItem} from "@/api/ord/soItem";
import {delCustomer, listCustomer} from "@/api/cha/customer";
import {listCustomerAddress} from "@/api/cha/customerAddress";
import {listCustomerContact} from "@/api/cha/customerContact";
import {listUser} from "@/api/system/user";
import {listCurrency} from "@/api/bas/currency";
import {listInvoicePattern} from "@/api/bas/invoicePattern";
import {listPayPattern} from "@/api/bas/payPattern";
import {listShipmentType} from "@/api/bas/shipmentType";
import {listUnit} from "@/api/bas/unit";
import {listDept} from "@/api/system/dept";
import {listProject} from "@/api/ord/project";
import {listProductBasis} from "@/api/eng/productBasis";

export default {
  name: "So",
  dicts: ['bill_status_finished', 'sales_status_so', 'ord_so_type', 'bill_priority'],
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
      // 订单登记发布表格数据
      soList: [],
      fkCustomerList: [],
      fkCustomerAddressList: [],
      fkCustomerContactList: [],
      fkUserList: [],
      fkCurrencyList: [],
      fkInvoicePatternList: [],
      fkPayPatternList: [],
      fkShipmentTypeList: [],
      fkUnitList: [],
      fkSoList: [],
      fkDeptList: [],
      fkProjectList: [],
      fkProductBasisList: [],
      //主表当前行的ID和状态
      masterId: "",
      masterStatus: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        pageEnable:true,
        billNo: null,
        status: null,
        customerId: null,
        contractNo: null,
        amountUntaxed: null,
        amountTaxed: null,
        invoicePatternId: null,
        payPatternId: null,
        currencyId: null,
        shipmentTypeId: null,
        exchangeRate: null,
        orderDay: null,
        addressId: null,
        contactId: null,
        soType: null,
        projectId: null,
        salesId: null,
        deptId: null,
      },
      //子表信息
      soItemList: [],
      // 选中数组
      idsSoItem: [],
      captionsSoItem: [],
      // 非单个禁用
      singleSoItem: true,
      // 非多个禁用
      multipleSoItem: true,
      // 子表选中数据
      checkedSoItem: [],
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Customer数据 */
    this.getCustomerList();
    /** 查询外键CustomerAddress数据 */
    this.getCustomerAddressList();
    /** 查询外键CustomerContact数据 */
    this.getCustomerContactList();
    /** 查询外键User数据 */
    this.getUserList();
    /** 查询外键Currency数据 */
    this.getCurrencyList();
    /** 查询外键InvoicePattern数据 */
    this.getInvoicePatternList();
    /** 查询外键PayPattern数据 */
    this.getPayPatternList();
    /** 查询外键ShipmentType数据 */
    this.getShipmentTypeList();
    /** 查询外键Unit数据 */
    this.getUnitList();
    /** 查询外键So数据 */
    this.getSoList();
    /** 查询外键Dept数据 */
    this.getDeptList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键ProductBasis数据 */
    this.getProductBasisList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listSoFinishing(this.queryParams).then(response => {
        this.soList = response.rows;
        this.total = response.total;
        if (this.soList && this.soList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
          this.masterStatus = response.rows[0].status;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
          this.masterStatus = null;
        }

        this.loadChildData();
        this.loading = false;
      });
    },
    /** 成批加载子表数据 */
    loadChildData() {
      if (this.masterId) {
        this.getSoItemList();
      } else {
        this.soItemList = null;
      }
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 查询外键CustomerAddress数据 */
    getCustomerAddressList() {
      listCustomerAddress().then(res => {
        this.fkCustomerAddressList = res.rows;
      });
    },
    /** 查询外键CustomerContact数据 */
    getCustomerContactList() {
      listCustomerContact().then(res => {
        this.fkCustomerContactList = res.rows;
      });
    },
    /** 查询外键User数据 */
    getUserList() {
      listUser().then(res => {
        this.fkUserList = res.rows;
      });
    },
    /** 查询外键Currency数据 */
    getCurrencyList() {
      listCurrency().then(res => {
        this.fkCurrencyList = res.rows;
      });
    },
    /** 查询外键InvoicePattern数据 */
    getInvoicePatternList() {
      listInvoicePattern().then(res => {
        this.fkInvoicePatternList = res.rows;
      });
    },
    /** 查询外键PayPattern数据 */
    getPayPatternList() {
      listPayPattern().then(res => {
        this.fkPayPatternList = res.rows;
      });
    },
    /** 查询外键ShipmentType数据 */
    getShipmentTypeList() {
      listShipmentType().then(res => {
        this.fkShipmentTypeList = res.rows;
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
      listSoFinishing().then(res => {
        this.fkSoList = res.rows;
      });
    },
    /** 查询外键Dept数据 */
    getDeptList() {
      listDept().then(res => {
        this.fkDeptList = res.data;
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.captions = selection.map(item => item.billNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 主表的当前行切换 */
    handleCurrentChange(currentRow) {
      if (currentRow){
        this.masterId = currentRow.id;
        this.masterStatus = currentRow.status;
        this.loadChildData();
      }
    },
    /** 主表的CSS行样式 */
    rowClassName({row, rowIndex}) {
      var className = '';
      if (this.ids.includes(row.id)) {
        className = 'selected-row';
      } else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }

      return className;
    },
    cellStyleSoItem({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==3) {
        className = "fontSize:12px; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==7) {
        className = "fontSize:12px; color:red; padding:1px 0px;";
      }
      else if (columnIndex==8) {
        className = "fontSize:12px; color:orange; padding:1px 0px;";
      }
      else if (columnIndex==14) {
        className = "fontSize:12px; color:green; padding:1px 0px;";
      }

      return className;
    },
    handleFinish(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定结案 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return finish(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("结案成功");
      }).catch(() => {
      });
    },
    handleExport() {
      this.download('ord/so/export', {
        ...this.queryParams
      }, `so_${new Date().getTime()}.xlsx`)
    },
    /** 查询子表订单明细数据 */
    getSoItemList() {
      var params = {"soId": this.masterId};
      listSoItem(params).then(res => {
        this.soItemList = res.rows;
      });
    },
    /** 子表订单明细的CSS行样式 */
    rowClassNameSoItem({row, rowIndex}) {
      var clsName = ''

      if (this.idsSoItem.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }
      return clsName;
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
