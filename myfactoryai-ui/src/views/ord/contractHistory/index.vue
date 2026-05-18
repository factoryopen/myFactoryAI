<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
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
            v-for="dict in dict.type.sales_status_so"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="orderDay" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>下单日期</strong></span>
        </span>
        <el-date-picker
          clearable
          size="mini"
          class="searchInput"
          v-model="queryParams.orderDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下单日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="soType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>合同类型</strong></span>
                </span>
        <el-select v-model="queryParams.soType" placeholder="请选择合同类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.ord_contact_type"
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
              height="220px"
              :data="contactList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="合同号" align="left" prop="contractNo" width="150"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
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
      <el-table-column label="合同日期" align="center" prop="orderDay" width="85">
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
      <el-table-column label="合同类型" align="center" prop="contractType" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.ord_contact_type" :value="scope.row.contractType"/>
        </template>
      </el-table-column>
      <el-table-column label="总成品编码" align="left" prop="productCode" width="130"/>
      <el-table-column label="总成套数" align="left" prop="productQuantity" width="70"/>
      <el-table-column label="备注" align="left" prop="remark"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <el-tabs>
      <el-tab-pane label="合同明细">
        <el-table ref="soItem" border
                  :data="contactItemList"
                  highlight-current-row
                  :row-class-name="rowClassNameContractItem"
                  @selection-change="handleContractItemSelectionChange"
                  :cell-style="cellStyleContractItem"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
          <el-table-column label="规格型号" align="left" prop="productSpec" width="110"/>
          <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="合同数" align="right" prop="quantityOrder" width="70"/>
          <el-table-column label="原价" align="right" prop="price" width="80"/>
          <el-table-column label="折扣价" align="right" prop="discountPrice" width="80"/>
          <el-table-column label="金额" align="right" prop="amount" width="85"/>
          <el-table-column label="折扣率" align="right" prop="discountRate" width="65"/>
          <el-table-column label="最终金额" align="right" prop="finalAmount" width="85"/>
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
import {listContractHistory, getContract, delContract, addContract, updateContract} from "@/api/ord/contract";
import {getNextBillno, updateBillSeq} from "@/api/ord/so";
import {importStandardExcel, importAssemblyExcel,importChangingExcel, enable, toSo, changeOrdContract, froze, unfroze, disable, finishforcely} from "@/api/ord/contract";
import {listContractItem, getContractItem, delContractItem, addContractItem, updateContractItem} from "@/api/ord/contractItem";
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

export default {
  name: "Contract",
  dicts: ['sales_status_so', 'ord_contact_type', 'bill_priority'],
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
      // 合同登记发布表格数据
      contactList: [],
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
      //主表当前行的ID和状态
      masterId: "",
      masterStatus: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {},
      rules: {
        billNo: [
          {required: true, message: "合同号不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
      openchangeOrdContract: false,
      ruleschangeOrdContract: {
        billNo: [
          {required: true, message: "合同号不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
      openImportStandardContract: false,
      formImportStandardContract: {},
      rulesImportStandardContract: {
        excelUrl: [
          {required: true, message: "合同明细Excel地址不能为空", trigger: "blur"}
        ],
      },
      openImportAssemblyContract: false,
      formImportAssemblyContract: {},
      rulesImportAssemblyContract: {
        excelUrl: [
          {required: true, message: "合同明细Excel地址不能为空", trigger: "blur"}
        ],
      },
      openImportChangingContract: false,
      formImportChangingContract: {},
      rulesImportChangingContract: {
        excelUrl: [
          {required: true, message: "合同明细Excel地址不能为空", trigger: "blur"}
        ],
      },
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
      contactItemList: [],
      // 选中数组
      idsContractItem: [],
      captionsContractItem: [],
      // 非单个禁用
      singleContractItem: true,
      // 非多个禁用
      multipleContractItem: true,
      // 子表选中数据
      checkedContractItem: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openContractItem: false,
      formContractItem: {},
      rulesContractItem: {
        soId: [
          {required: true, message: "销售合同不能为空", trigger: "blur"}
        ],
        seqNo: [
          {required: true, message: "项序不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        productId: [
          {required: true, message: "产品编码不能为空", trigger: "blur"}
        ],
        quantityOrder: [
          {required: true, message: "合同数量不能为空", trigger: "blur"}
        ],
        price: [
          {required: true, message: "原价不能为空", trigger: "blur"}
        ],
        discountPrice: [
          {required: true, message: "折扣价不能为空", trigger: "blur"}
        ],
        discountRate: [
          {required: true, message: "折扣率不能为空", trigger: "blur"}
        ],
        needDay: [
          {required: true, message: "需求日期不能为空", trigger: "blur"}
        ],
      },
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
    this.getContractList();
    /** 查询外键Dept数据 */
    this.getDeptList();
    /** 查询外键Project数据 */
    this.getProjectList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listContractHistory(this.queryParams).then(response => {
        this.contactList = response.rows;
        this.total = response.total;
        if (this.contactList && this.contactList.length>0) {
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
        this.getContractItemList();
      } else {
        this.contactItemList = null;
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
    getContractList() {
      listContractHistory().then(res => {
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
      this.captions = selection.map(item => item.contractNo)
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
    handleOrderQuantityChange(event) {
      this.formContractItem.discountRate = 100;
      this.formContractItem.amount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice;
      this.formContractItem.finalAmount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice * this.formContractItem.discountRate / 100;
    },
    handleOrderPriceChange(event) {
      this.formContractItem.discountPrice = this.formContractItem.price;
      this.formContractItem.amount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice;
      this.formContractItem.finalAmount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice * this.formContractItem.discountRate / 100;

    },
    handleOrderDiscountPriceChange(event) {
      this.formContractItem.discountRate = 100;
      this.formContractItem.amount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice;
      this.formContractItem.finalAmount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice * this.formContractItem.discountRate / 100;
    },
    handleOrderDiscountRateChange(event) {
      this.formContractItem.amount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice;
      this.formContractItem.finalAmount = this.formContractItem.quantityOrder * this.formContractItem.discountPrice * this.formContractItem.discountRate / 100;
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
    cellStyleContractItem({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==3) {
        className = "fontSize:12px; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==9) {
        className = "fontSize:12px; color:red; padding:1px 0px;";
      }
      else if (columnIndex==10) {
        className = "fontSize:12px; color:orange; padding:1px 0px;";
      }
      else if (columnIndex==16) {
        className = "fontSize:12px; color:green; padding:1px 0px;";
      }

      return className;
    },
    /**主表外键CustomerId被选择后触发事件*/
    onCustomerIdSelection(fkId) {
      this.fkCustomerList.forEach(item => {
        if (fkId === item.id) {
          this.form.customerId = item.id
        }
      });
    },
    /**主表外键InvoicePatternId被选择后触发事件*/
    onInvoicePatternIdSelection(fkId) {
      this.fkInvoicePatternList.forEach(item => {
        if (fkId === item.id) {
          this.form.invoicePatternId = item.id
        }
      });
    },
    /**主表外键PayPatternId被选择后触发事件*/
    onPayPatternIdSelection(fkId) {
      this.fkPayPatternList.forEach(item => {
        if (fkId === item.id) {
          this.form.payPatternId = item.id
        }
      });
    },
    /**主表外键CurrencyId被选择后触发事件*/
    onCurrencyIdSelection(fkId) {
      this.fkCurrencyList.forEach(item => {
        if (fkId === item.id) {
          this.form.currencyId = item.id
        }
      });
    },
    /**主表外键ShipmentTypeId被选择后触发事件*/
    onShipmentTypeIdSelection(fkId) {
      this.fkShipmentTypeList.forEach(item => {
        if (fkId === item.id) {
          this.form.shipmentTypeId = item.id
        }
      });
    },
    /**主表外键AddressId被选择后触发事件*/
    onAddressIdSelection(fkId) {
      this.fkCustomerAddressList.forEach(item => {
        if (fkId === item.id) {
          this.form.addressId = item.id
        }
      });
    },
    /**主表外键ContactId被选择后触发事件*/
    onContactIdSelection(fkId) {
      this.fkCustomerContactList.forEach(item => {
        if (fkId === item.id) {
          this.form.contactId = item.id
        }
      });
    },
    /**主表外键ProjectId被选择后触发事件*/
    onProjectIdSelection(fkId) {
      this.fkProjectList.forEach(item => {
        if (fkId === item.id) {
          this.form.projectId = item.id
        }
      });
    },
    /**主表外键SalesId被选择后触发事件*/
    onSalesIdSelection(fkId) {
      this.fkUserList.forEach(item => {
        if (fkId === item.id) {
          this.form.salesId = item.userId
        }
      });
    },
    /**主表外键DeptId被选择后触发事件*/
    onDeptIdSelection(fkId) {
      this.fkDeptList.forEach(item => {
        if (fkId === item.deptId) {
          this.form.deptId = item.deptId
        }
      });
    },
    /** 子表外键SoId被选择后触发事件 **/
    onContractItemSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.formContractItem.soId = item.id
        }
      });
    },
    /** 子表外键ProductId被选择后触发事件 **/
    onContractItemProductIdSelection(fkId) {
    },
    /** 重设主表的变更对话框数据 */
    resetchangeOrdContract() {
      this.form = {
        id: null,
        billNo: null,
        status: null,
        amountUntaxed: null,
        amountTaxed: null,
        exchangeRate: null,
        orderDay: null,
        soType: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 重设主表的修改对话框数据 */
    reset() {
      this.form = {
        id: null,
        billNo: null,
        status: null,
        amountUntaxed: null,
        amountTaxed: null,
        orderDay: null,
        invoicePatternId: 8,
        payPatternId: 2,
        currencyId: 1,
        shipmentTypeId: 1,
        exchangeRate: 1.0,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };

      this.resetForm("form");
    },
    resetImportStandardContract(){
      this.openImportStandardContract = {
        excelUrl: null,
      }
    },
    resetImportAssemblyContract(){
      this.openImportAssemblyContract = {
        excelUrl: null,
      }
    },
    resetImportChangingContract(){
      this.openImportChangingContract = {
        excelUrl: null,
      }
    },
    handleImportStandardContract() {
      this.resetImportStandardContract();
      this.openImportStandardContract = true;
      this.title = "导入标准合同";
    },
    handleImportAssemblyContract() {
      this.resetImportAssemblyContract();
      this.openImportAssemblyContract = true;
      this.title = "导入总成合同";
    },
    handleImportChangingContract() {
      this.resetImportChangingContract();
      this.openImportChangingContract = true;
      this.title = "导入变项合同";
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增合同";
      getNextBillno("140").then(res => {
        this.form.billNo = res
      });
    },
    handleUpdate(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("合同已发布，不能修改");
        return;
      }

      const id = row.id || this.ids
      getContract(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合同";
      });
    },
    handleDelete(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("合同已发布，不能删除");
        return;
      }

      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;
      this.$modal.confirm('确认删除合同号为"' + billNoz + '"的数据项？').then(function () {
        return delContract(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    handleEnable(row) {
      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;

      this.$modal.confirm('确定发布 合同号为"' + billNoz + '"的数据项吗？').then(function () {
        return enable(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("发布成功");
      }).catch(() => {
      });
    },
    handleChangeOrdContract(row) {
      const id = row.id || this.ids
      getContract(id).then(response => {
        this.form = response.data;
        //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
        this.openchangeOrdContract = true;
        this.title = "变更合同";
      });
    },
    handleToSo(row) {
      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;

      this.$modal.confirm('确定转单 合同号为"' + billNoz + '"的数据项吗？').then(function () {
        return toSo(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("转单成功");
      }).catch(() => {
      });
    },
    handleUnfroze(row) {
      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;

      this.$modal.confirm('确定解冻 合同号为"' + billNoz + '"的数据项吗？').then(function () {
        return unfroze(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("解冻成功");
      }).catch(() => {
      });
    },
    handleDisable(row) {
      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;

      this.$modal.confirm('确定停用 合同号为"' + billNoz + '"的数据项吗？').then(function () {
        return disable(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("停用成功");
      }).catch(() => {
      });
    },
    handleFinishforcely(row) {
      const ids = row.id || this.ids;
      const billNoz = row.contractNo || this.captions;

      this.$modal.confirm('确定强结 合同号为"' + billNoz + '"的数据项吗？').then(function () {
        return finishforcely(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("强结成功");
      }).catch(() => {
      });
    },
    handleExport() {
      this.download('ord/so/export', {
        ...this.queryParams
      }, `so_${new Date().getTime()}.xlsx`)
    },

    /** 提交按钮 */
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id == this.form.id) {
            //TODO 上述一行代码须替代或删除

            if (this.form.id != null) {
              updateContract(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
            } else {
              addContract(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
              updateBillSeq("140").then(res => {
              });
            }
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 提交按钮 */
    submitImportStandardContract() {
      this.$refs["formImportStandardContract"].validate(valid => {
        if (valid) {
          importStandardExcel(this.formImportStandardContract.excelUrl)
            .then(response => {
              this.openImportStandardContract = false;
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        }
      });
    },
    // 取消子表单按钮
    cancelImportStandardStandardContract() {
      this.openImportStandardContract = false;
      this.resetImportStandardContract();
    },
    /** 提交按钮 */
    submitImportAssemblyContract() {
      this.$refs["formImportAssemblyContract"].validate(valid => {
        if (valid) {
          importAssemblyExcel(this.formImportAssemblyContract.excelUrl)
            .then(response => {
              this.openImportAssemblyContract = false;
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        }
      });
    },
    // 取消子表单按钮
    cancelImportAssemblyContract() {
      this.openImportAssemblyContract = false;
      this.resetImportAssemblyContract();
    },
    /** 提交按钮 */
    submitImportChangingContract() {
      this.$refs["formImportChangingContract"].validate(valid => {
        if (valid) {
          importChangingExcel(this.formImportChangingContract.excelUrl)
            .then(response => {
              this.openImportChangingContract = false;
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        }
      });
    },
    // 取消子表单按钮
    cancelImportChangingContract() {
      this.openImportChangingContract = false;
      this.resetImportChangingContract();
    },
    /** 提交按钮 */
    submitchangeOrdContract() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id == this.form.id) {
            this.form.params = {"id": this.form.id};
            //TODO 上述两行代码须替代或删除

            changeOrdContract(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openchangeOrdContract = false;
                this.getMasterList();
              });
          }
        }
      });
    },
    // 取消按钮
    cancelchangeOrdContract() {
      this.openchangeOrdContract = false;
      this.resetchangeOrdContract();
    },
    /** 查询子表合同明细数据 */
    getContractItemList() {
      var params = {"contractId": this.masterId};
      listContractItem(params).then(res => {
        this.contactItemList = res.rows;
      });
    },
    // 多选框选中数据
    handleContractItemSelectionChange(selection) {
      this.idsContractItem = selection.map(item => item.id)
      this.captionsContractItem = selection.map(item => item.seqNo)
      this.singleContractItem = selection.length !== 1
      this.multipleContractItem = !selection.length
    },
    /** 子表合同明细的CSS行样式 */
    rowClassNameContractItem({row, rowIndex}) {
      var clsName = ''

      if (this.idsContractItem.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }
      return clsName;
    },
    // 子表单重置
    resetContractItem() {
      this.formContractItem = {
        id: null,
        soId: this.masterId,
        seqNo: null,
        status: null,
        quantityOrder: null,
        price: null,
        discountPrice: null,
        amount: null,
        discountRate: null,
        finalAmount: null,
        quantityDelivery: null,
        quantityOs: null,
        quantityPlanned: null,
        priority: null,
        needDay: null,
        promiseDay: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formContractItem");
      // 按关键字段值来初始化子表单数据
      this.onContractItemSoIdSelection(this.masterId);
    },
    handleAddOrdContractItem() {
      this.resetContractItem();
      this.openContractItem = true;
      this.title = "新增合同明细";
    },
    handleUpdateOrdContractItem(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("合同已发布，不能修改");
        return;
      }

      this.resetContractItem();
      const id = row.id || this.idsContractItem
      getContractItem(id).then(response => {
        this.formContractItem = response.data;
        this.openContractItem = true;
        this.title = "修改合同明细";
      });
    },
    handleDeleteOrdContractItem(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("合同已发布，不能删除");
        return;
      }

      const ids = row.id || this.idsContractItem;
      const seqNoz = row.seqNo || this.captionsContractItem;

      this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function () {
        return delContractItem(ids);
      }).then(() => {
        this.getContractItemList();
        this.$modal.msgSuccess("删除成功");
      });
    },
    /** 提交按钮 */
    submitContractItem() {
      this.$refs["formContractItem"].validate(valid => {
        if (valid) {
          if (this.formContractItem.id == this.formContractItem.id) {
            //TODO 上述一行代码须替代或删除

            if (this.formContractItem.id != null) {
              updateContractItem(this.formContractItem)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openContractItem = false;
                  this.getContractItemList();
                })
                .catch(error => {
                  this.$modal.msgError(error.msg);
                });
            } else {
              addContractItem(this.formContractItem)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openContractItem = false;
                  this.getContractItemList();
                })
                .catch(error => {
                  this.$modal.msgError(error.msg);
                });
            }
          }
        }
      });
    },
    // 取消子表单按钮
    cancelContractItem() {
      this.openContractItem = false;
      this.resetContractItem();
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
