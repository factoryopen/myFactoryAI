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
      <el-form-item prop="productCode" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>产品编码</strong></span>
        </span>
        <el-input v-model="queryParams.productCode"  class="searchInput" placeholder="请输入产品编码" size="mini"/>
      </el-form-item>
      <el-form-item prop="productName" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>产品名称</strong></span>
        </span>
        <el-input v-model="queryParams.productName"  class="searchInput" placeholder="请输入产品名称" size="mini"/>
      </el-form-item>
      <el-form-item prop="productSpec" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>规格型号</strong></span>
        </span>
        <el-input v-model="queryParams.productSpec"  class="searchInput" placeholder="请输入规格型号" size="mini"/>
      </el-form-item>
      <el-form-item prop="drawNo" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>图号</strong></span>
        </span>
        <el-input v-model="queryParams.drawNo"  class="searchInput" placeholder="请输入图号" size="mini"/>
      </el-form-item>
      <el-form-item prop="priority" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>优先级</strong></span>
        </span>
        <el-select v-model="queryParams.priority" placeholder="请选择优先级" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.bill_priority"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="needDay" class="marginBottom5">
          <span slot="label">
              <span class="fontSize12"><strong>需求日期</strong></span>
          </span>
        <el-date-picker clearable size="mini" class="searchInput" v-model="queryParams.needDay" type="date" value-format="yyyy-MM-dd" placeholder="选择需求日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="promiseDay" class="marginBottom5">
          <span slot="label">
              <span class="fontSize12"><strong>承诺交期</strong></span>
          </span>
        <el-date-picker  clearable size="mini" class="searchInput" v-model="queryParams.promiseDay" type="date" value-format="yyyy-MM-dd" placeholder="选择承诺交期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="contractNo" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>合同号</strong></span>
        </span>
        <el-input v-model="queryParams.contractNo"  class="searchInput" placeholder="请输入合同号" size="mini"/>
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
              height="460px"
              :data="deliveryDealList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="销售订单" align="center" prop="soId" width="115">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkSoList">
            <span v-if="item.id==scope.row.soId" :key="index" size="mini">{{ item.billNo }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="项次" align="center" prop="seqNo" width="50"/>
      <el-table-column label="合同编号" align="left" prop="contractNo" width="80" show-overflow-tooltip/>
      <el-table-column label="客户名称" align="left" prop="customerName" width="100" show-overflow-tooltip/>
      <el-table-column label="产品编码" align="left" prop="productCode" width="130" show-overflow-tooltip/>
      <el-table-column label="产品名称" align="left" prop="productName" width="100" show-overflow-tooltip/>
      <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
      <el-table-column label="单位" align="center" prop="unitId" width="50">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{ item.unitName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单量" align="right" prop="quantityOrder" style="color:sandybrown" width="65"/>
      <el-table-column label="走发量" align="right" prop="quantityDelivering" width="65"/>
      <el-table-column label="完发量" align="right" prop="quantityDelivered" width="65"/>
      <el-table-column label="转包量" align="right" prop="quantitySubcontract" width="65"/>
      <el-table-column label="完包量" align="right" prop="quantitySubcontracted" width="65"/>
      <el-table-column label="自制量" align="right" prop="quantityMps" width="65"/>
      <el-table-column label="完制量" align="right" prop="quantityManufactured" width="65"/>
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
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <el-tabs>
      <el-tab-pane label="发货计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="planItem" border
                  :data="planItemList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlanItem"
                  @selection-change="handlePlanItemSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_dp" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="销售订单" align="right" prop="soId" width="115">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkSoList">
                                <span v-if="item.id==scope.row.soId"
                                      :key="index"
                                      size="mini">{{ item.billNo }}
                                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="150"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="需求日期" align="center" prop="needDay" width="85"/>
          <el-table-column label="承诺日期" align="center" prop="promiseDay" width="85"/>
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="计发数量" align="right" prop="quantityPlanned" width="75"/>
          <el-table-column label="累发数量" align="right" prop="quantityReleased" width="75"/>
          <el-table-column label="原价" align="right" prop="price" width="75"/>
          <el-table-column label="折扣价" align="right" prop="discountPrice" width="75"/>
          <el-table-column label="金额" align="right" prop="amount" width="80"/>
          <el-table-column label="折扣率" align="right" prop="discountRate" width="75"/>
          <el-table-column label="最终金额" align="right" prop="finalAmount" width="80"/>
          <el-table-column label="客户" align="center" prop="customerId" width="120">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkCustomerList">
                            <span v-if="item.id==scope.row.customerId"
                                  :key="index"
                                  size="mini">{{ item.customerName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="主计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="plnMps" border
                  :data="plnMpsList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlnMps"
                  @selection-change="handlePlnMpsSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="主计划号" align="center" prop="billNo" width="125"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_mps" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="150"/>
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
          <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="75"/>
          <el-table-column label="派工数量" align="right" prop="quantityDispatched" width="75"/>
          <el-table-column label="完成数量" align="right" prop="quantityFinished" width="75"/>
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
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center" prop="mpsType" width="75">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.pln_mpsitem_type" :value="scope.row.mpsType"/>
            </template>
          </el-table-column>
          <el-table-column label="项目" align="center" prop="projectId" width="85">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkProjectList">
                                  <span v-if="item.id==scope.row.projectId"
                                        :key="index"
                                        size="mini">{{ item.projectName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="客户" align="center" prop="customerId" width="120">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkCustomerList">
                          <span v-if="item.id==scope.row.customerId"
                                :key="index"
                                size="mini">{{ item.customerName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="销售订单" align="center" prop="soId" width="115">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkSoList">
                                <span v-if="item.id==scope.row.soId"
                                      :key="index"
                                      size="mini">{{ item.billNo }}
                                </span>
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
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转包计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="planOs" border
                  :data="planOsList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlanOs"
                  @selection-change="handlePlanOsSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="转包单号" align="center" prop="billNo" width="125"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_osplan" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="150"/>
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
          <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="75"/>
          <el-table-column label="派工数量" align="right" prop="quantityDispatched" width="75"/>
          <el-table-column label="完成数量" align="right" prop="quantityFinished" width="75"/>
          <el-table-column label="交期" align="center" prop="needDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="项目" align="center" prop="projectId" width="85">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkProjectList">
                                <span v-if="item.id==scope.row.projectId"
                                      :key="index"
                                      size="mini">{{ item.projectName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="客户" align="center" prop="customerId" width="100">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkCustomerList">
                            <span v-if="item.id==scope.row.customerId"
                                  :key="index"
                                  size="mini">{{ item.customerName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="销售订单" align="center" prop="soId" width="115">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkSoList">
                                  <span v-if="item.id==scope.row.soId"
                                        :key="index"
                                        size="mini">{{ item.billNo }}
                                  </span>
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
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {
  listDeliveryDealFinishing,
  getDeliveryDeal,
  delDeliveryDeal,
  addDeliveryDeal,
  updateDeliveryDeal
} from "@/api/del/deliveryDeal";
import {listPlanItem, getPlanItem, delPlanItem, addPlanItem, updatePlanItem} from "@/api/del/planItem";
import {listPlnMps, getPlnMps, delPlnMps, addPlnMps, updatePlnMps} from "@/api/del/plnMps";
import {listPlanOs, getPlanOs, delPlanOs, addPlanOs, updatePlanOs} from "@/api/del/planOs";
import {listUser} from "@/api/system/user";
import {listUnit} from "@/api/bas/unit";
import {listSo} from "@/api/ord/so";
import {listSoItem} from "@/api/ord/soItem";
import {listProject} from "@/api/ord/project";
import {listSoTrace} from "@/api/ord/soTrace";
import {listCustomer} from "@/api/cha/customer";

export default {
  name: "DeliveryDeal",
  dicts: ['bill_status_finished','sales_status_dp','sales_status_osplan','sales_status_mps', 'bill_priority', 'pln_mpsitem_type'],
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
      // 交货筹划表格数据
      deliveryDealList: [],
      fkUserList: [],
      fkUnitList: [],
      fkSoList: [],
      fkSoItemList: [],
      fkProjectList: [],
      fkDeliveryDealList: [],
      fkSoTraceList: [],
      //主表当前行的ID
      masterId: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {
        quantityActual:null,
        priority: null,
      },
      rules: {},
      openplanDelivery: false,
      rulesplanDelivery: {
        quantityActual: [
          {required: true, message: "发货数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      openplanMps: false,
      rulesplanMps: {
        quantityActual: [
          {required: true, message: "自制数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      openplanOs: false,
      rulesplanOs: {
        quantityActual: [
          {required: true, message: "转包数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
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
      //子表信息
      planItemList: [],
      // 选中数组
      idsPlanItem: [],
      captionsPlanItem: [],
      // 非单个禁用
      singlePlanItem: true,
      // 非多个禁用
      multiplePlanItem: true,
      // 子表选中数据
      checkedPlanItem: [],
      openPlanItem: false,
      formPlanItem: {},
      rulesPlanItem: {},
      //子表信息
      plnMpsList: [],
      // 选中数组
      idsPlnMps: [],
      captionsPlnMps: [],
      // 非单个禁用
      singlePlnMps: true,
      // 非多个禁用
      multiplePlnMps: true,
      // 子表选中数据
      checkedPlnMps: [],
      openPlnMps: false,
      formPlnMps: {},
      rulesPlnMps: {},
      //子表信息
      planOsList: [],
      // 选中数组
      idsPlanOs: [],
      captionsPlanOs: [],
      // 非单个禁用
      singlePlanOs: true,
      // 非多个禁用
      multiplePlanOs: true,
      // 子表选中数据
      checkedPlanOs: [],
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
      listDeliveryDealFinishing(this.queryParams).then(response => {
        this.deliveryDealList = response.rows;
        this.total = response.total;
        if (this.deliveryDealList && this.deliveryDealList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
        }

        this.loadChildData();
        this.loading = false;
      });
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 成批加载子表数据 */
    loadChildData() {
      if (this.masterId) {
        this.getPlanItemList();
        this.getPlnMpsList();
        this.getPlanOsList();
      } else {
        this.planItemList = null;
        this.plnMpsList = null;
        this.planOsList = null;
      }
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
    /** 查询外键DeliveryDeal数据 */
    getDeliveryDealList() {
      listDeliveryDealFinishing().then(res => {
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.captions = selection.map(item => item.seqNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 主表的当前行切换 */
    handleCurrentChange(currentRow) {
      if (currentRow){
        this.masterId = currentRow.id;
        this.loadChildData();
      }
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

      if (columnIndex==4 || columnIndex==7) {
        className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==8 || columnIndex==10 || columnIndex==12) {
        className = "fontSize:12px; color:sandybrown; padding:1px 0px;";
      }
      else if (columnIndex==9 || columnIndex==11 || columnIndex==13) {
        className = "fontSize:12px; color:rosybrown; padding:1px 0px;";
      }
      else if (columnIndex==14 || columnIndex==15) {
        className = "fontSize:12px; color:lawngreen; padding:1px 0px;";
      }
      else if (columnIndex==16) {
        className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
      }
      else if (columnIndex==17) {
        className = "fontSize:12px; fontWeight:bold; color:red; padding:1px 0px;";
      }
      else if (columnIndex==18) {
        className = "fontSize:12px; color:orange; padding:1px 0px;";
      }

      return className;
    },
    /**主表外键SoId被选择后触发事件*/
    onSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.form.soId = item.id
        }
      });
    },
    /** 子表外键SoId被选择后触发事件 **/
    onPlanItemSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.formPlanItem.soId = item.id
        }
      });
    },
    /** 子表外键SoItemId被选择后触发事件 **/
    onPlanItemSoItemIdSelection(fkId) {
      this.fkSoItemList.forEach(item => {
        if (fkId === item.id) {
          this.formPlanItem.soItemId = item.id
          this.formPlanItem.productName = item.materialName
          this.formPlanItem.productSpec = item.materialSpec
          this.formPlanItem.unitId = item.unitId
          this.formPlanItem.needDay = item.needDay
          this.formPlanItem.promiseDay = item.promiseDay
        }
      });
    },
    /** 子表外键SoId被选择后触发事件 **/
    onPlnMpsSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.formPlnMps.soId = item.id
          this.formPlnMps.projectId = item.projectId
          this.formPlnMps.salesId = item.salesId
        }
      });
    },
    /** 子表外键SoItemId被选择后触发事件 **/
    onPlanOsSoItemIdSelection(fkId) {
      this.fkSoItemList.forEach(item => {
        if (fkId === item.id) {
          this.formPlanOs.soItemId = item.id
        }
      });
    },
    /** 子表外键SoId被选择后触发事件 **/
    onPlanOsSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.formPlanOs.soId = item.id
        }
      });
    },
    handleExport() {
      this.download('del/deliveryDeal/export', {
        ...this.queryParams
      }, `deliveryDeal_${new Date().getTime()}.xlsx`)
    },
    /** 查询子表发货计划数据 */
    getPlanItemList() {
      var params = {"soItemId": this.masterId};
      listPlanItem(params).then(res => {
        this.planItemList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlanItemSelectionChange(selection) {
      this.idsPlanItem = selection.map(item => item.id)
      this.captionsPlanItem = selection.map(item => item.productName)
      this.singlePlanItem = selection.length !== 1
      this.multiplePlanItem = !selection.length
    },
    /** 子表发货计划的CSS行样式 */
    rowClassNamePlanItem({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlanItem.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    /** 查询子表主计划数据 */
    getPlnMpsList() {
      var params = {"soItemId": this.masterId};
      listPlnMps(params).then(res => {
        this.plnMpsList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlnMpsSelectionChange(selection) {
      this.idsPlnMps = selection.map(item => item.id)
      this.captionsPlnMps = selection.map(item => item.billNo)
      this.singlePlnMps = selection.length !== 1
      this.multiplePlnMps = !selection.length
    },
    /** 子表主计划的CSS行样式 */
    rowClassNamePlnMps({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlnMps.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    /** 查询子表转包计划数据 */
    getPlanOsList() {
      var params = {"soItemId": this.masterId};
      listPlanOs(params).then(res => {
        this.planOsList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlanOsSelectionChange(selection) {
      this.idsPlanOs = selection.map(item => item.id)
      this.captionsPlanOs = selection.map(item => item.billNo)
      this.singlePlanOs = selection.length !== 1
      this.multiplePlanOs = !selection.length
    },
    /** 子表转包计划的CSS行样式 */
    rowClassNamePlanOs({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlanOs.includes(row.id)) {
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
