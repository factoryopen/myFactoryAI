<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入采购单号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
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
            <el-form-item prop="purchasingType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购类型</strong></span>
                </span>
                <el-select v-model="queryParams.purchasingType" placeholder="请选择采购类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sup_purchasing_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
              <el-form-item prop="supplierId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.supplierId" placeholder="请选择供应商" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierList"
                      :key="index"
                      :label="fkrow.supplierCode"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="invoicePatternId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.invoicePatternId" placeholder="请选择开票方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkInvoicePatternList"
                      :key="index"
                      :label="fkrow.patternName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="payPatternId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>付款方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.payPatternId" placeholder="请选择付款方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkPayPatternList"
                      :key="index"
                      :label="fkrow.patternName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="currencyId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>币别</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.currencyId" placeholder="请选择币别" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkCurrencyList"
                      :key="index"
                      :label="fkrow.currencyName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="shipmentTypeId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>交货方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.shipmentTypeId" placeholder="请选择交货方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkShipmentTypeList"
                      :key="index"
                      :label="fkrow.typeCode"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
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
              <el-form-item prop="contactId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.contactId" placeholder="请选择联系人" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierContactList"
                      :key="index"
                      :label="fkrow.contact"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="buyerId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购员</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.buyerId" placeholder="请选择采购员" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkBuyersList"
                      :key="index"
                      :label="fkrow.userId"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="buyerDeptId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购部门</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.buyerDeptId" placeholder="请选择采购部门" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkBuyersList"
                      :key="index"
                      :label="fkrow.deptId"
                      :value="fkrow.deptId"
                      size="mini"
                  ></el-option>
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
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="340px"
                  :data="poList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="采购单号" align="left" prop="billNo"  width="140"/>
          <el-table-column label="状态" align="center" prop="status" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_status_finished" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="采购类型" align="center" prop="purchasingType" width="100">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sup_purchasing_type" :value="scope.row.purchasingType"/>
            </template>
          </el-table-column>
          <el-table-column label="供应商" align="left" prop="supplierId"  width="120">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                              :key="index"
                              size="mini">{{item.supplierCode}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="未税金额" align="right" prop="amountUntaxed"  width="90"/>
          <el-table-column label="含税金额" align="right" prop="amountTaxed"  width="90"/>
          <el-table-column label="开票方式" align="left" prop="invoicePatternId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                              :key="index"
                              size="mini">{{item.patternName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" align="left" prop="payPatternId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkPayPatternList">
                        <span v-if="item.id==scope.row.payPatternId"
                              :key="index"
                              size="mini">{{item.patternName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="币别" align="center" prop="currencyId"  width="60">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkCurrencyList">
                        <span v-if="item.id==scope.row.currencyId"
                              :key="index"
                              size="mini">{{item.currencyName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="交货方式" align="center" prop="shipmentTypeId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkShipmentTypeList">
                        <span v-if="item.id==scope.row.shipmentTypeId"
                              :key="index"
                              size="mini">{{item.typeCode}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="汇率" align="center" prop="exchangeRate"  width="70"/>
          <el-table-column label="下单日期" align="center" prop="orderDay" width="90">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" align="center" prop="contactId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkSupplierContactList">
                        <span v-if="item.id==scope.row.contactId"
                              :key="index"
                              size="mini">{{item.contact}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="采购员" align="center" prop="buyerId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.buyerId"
                              :key="index"
                              size="mini">{{item.nickName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="采购部门" align="center" prop="buyerDeptId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.buyerDeptId"
                              :key="index"
                              size="mini">{{item.deptName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="remark"/>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <el-tabs>
            <el-tab-pane label="采购单明细">
                <el-table ref="poItem" border
                        :data="poItemList"
                        highlight-current-row
                        :row-class-name="rowClassNamePoItem"
                        @selection-change="handlePoItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                  <el-table-column label="状态" align="center" prop="status" width="60">
                    <template slot-scope="scope">
                      <dict-tag :options="dict.type.bill_status_finished" :value="scope.row.status"/>
                    </template>
                  </el-table-column>
                  <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                  <el-table-column label="物料名称" align="left" prop="materialName" width="120"/>
                  <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
                  <el-table-column label="单位" align="center" prop="unitId"  width="50">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{item.unitName}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="采购数" align="right" prop="quantityOrder" width="70"/>
                  <el-table-column label="单价" align="right" prop="price" width="65"/>
                  <el-table-column label="金额" align="right" prop="amount" width="75"/>
                  <el-table-column label="需求日期" align="center" prop="requireDay" width="90">
                    <template slot-scope="scope">
                      <span>{{ parseTime(scope.row.requireDay, '{y}-{m}-{d}') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="来源单号" align="left" prop="sourceBillNo" width="130"/>
                  <el-table-column label="发货数" align="right" prop="quantityShipped" width="70"/>
                  <el-table-column label="收货数" align="right" prop="quantityArrival" width="70"/>
                  <el-table-column label="收检数" align="right" prop="quantityInspected" width="70"/>
                  <el-table-column label="入库数" align="right" prop="quantityInventory" width="70"/>
                  <el-table-column label="不良数" align="right" prop="quantityQcNg" width="65"/>
                  <el-table-column label="待判数" align="right" prop="quantityQcPending" width="65"/>
                  <el-table-column label="特采数" align="right" prop="quantityQcAod" width="65"/>
                  <el-table-column label="在退数" align="right" prop="quantityReturning" width="65"/>
                  <el-table-column label="已退数" align="right" prop="quantityReturned" width="65"/>
                  <el-table-column label="备注" align="center" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { listPoHistory, getPo, delPo, addPo, updatePo } from "@/api/sup/po";
import { listPoItem, getPoItem, delPoItem, addPoItem, updatePoItem } from "@/api/sup/poItem";
import { listUser} from "@/api/system/user";
import { listCurrency} from "@/api/bas/currency";
import { listInvoicePattern} from "@/api/bas/invoicePattern";
import { listPayPattern} from "@/api/bas/payPattern";
import { listShipmentType} from "@/api/bas/shipmentType";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listSupplier} from "@/api/sup/supplier";
import { listSupplierContact} from "@/api/sup/supplierContact";
import { listBuyers} from "@/api/sup/buyers";

export default {
    name: "Po",
    dicts: ['bill_status_finished', 'sup_purchasing_type'],
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
            masterTable:[],
            // 显示搜索条件
            showSearch: false,
            // 总条数
            total: 0,
            // 采购单管理表格数据
            poList: [],
            fkUserList: [],
            fkCurrencyList: [],
            fkInvoicePatternList: [],
            fkPayPatternList: [],
            fkShipmentTypeList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkSupplierList: [],
            fkSupplierContactList: [],
            fkMaterialInfoList: [],
            fkPoList: [],
            fkBuyersList: [],
            //主表当前行的ID
            masterId:"",
            //当前tab名
            activeTabName:"",
            // 弹出层标题
            title: "",
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              purchasingType: null,
              supplierId: null,
              amountUntaxed: null,
              amountTaxed: null,
              invoicePatternId: null,
              payPatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              exchangeRate: null,
              orderDay: null,
              contactId: null,
              buyerId: null,
              buyerDeptId: null,
            },
            //子表信息
            poItemList:[],
            // 选中数组
            idsPoItem: [],
            captionsPoItem: [],
            // 非单个禁用
            singlePoItem: true,
            // 非多个禁用
            multiplePoItem: true,
            // 子表选中数据
            checkedPoItem: [],
        };
    },
    created() {
        this.getMasterList();
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
        /** 查询外键Dept数据 */
        this.getDeptList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键SupplierContact数据 */
        this.getSupplierContactList();
        /** 查询外键Po数据 */
        this.getPoList();
        /** 查询外键Buyers数据 */
        this.getBuyersList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPoHistory(this.queryParams).then(response => {
              this.poList = response.rows;
              this.total = response.total;
              if (this.poList && this.poList.length>0) {
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
                this.getPoItemList();
            }else {
                this.poItemList = null;
            }
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键SupplierContact数据 */
        getSupplierContactList() {
            listSupplierContact().then(res => {
                this.fkSupplierContactList = res.rows;
            });
        },
        /** 查询外键Po数据 */
        getPoList() {
          listPoHistory().then(res => {
                this.fkPoList = res.rows;
            });
        },
        /** 查询外键Buyers数据 */
        getBuyersList() {
            listBuyers().then(res => {
                this.fkBuyersList = res.rows;
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
            this.single = selection.length!==1
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
        rowClassName({ row, rowIndex }) {
            var className = ''

            if (this.ids.includes(row.id)){
                className = 'selected-row';
            }else if (row.priority == 1) {
                className = 'super-urgent-row';
            } else if (row.priority == 2) {
                className = 'urgent-row';
            }

            return className;
        },
        /**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
        },
        /**主表外键InvoicePatternId被选择后触发事件*/
        onInvoicePatternIdSelection(fkId){
            this.fkInvoicePatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.invoicePatternId = item.id
                }
            });
        },
        /**主表外键PayPatternId被选择后触发事件*/
        onPayPatternIdSelection(fkId){
            this.fkPayPatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.payPatternId = item.id
                }
            });
        },
        /**主表外键CurrencyId被选择后触发事件*/
        onCurrencyIdSelection(fkId){
            this.fkCurrencyList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currencyId = item.id
                }
            });
        },
        /**主表外键ShipmentTypeId被选择后触发事件*/
        onShipmentTypeIdSelection(fkId){
            this.fkShipmentTypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.shipmentTypeId = item.id
                }
            });
        },
        /**主表外键ContactId被选择后触发事件*/
        onContactIdSelection(fkId){
            this.fkSupplierContactList.forEach(item=>{
                if(fkId === item.id){
                    this.form.contactId = item.id
                }
            });
        },
        /**主表外键BuyerId被选择后触发事件*/
        onBuyerIdSelection(fkId){
            this.fkBuyersList.forEach(item=>{
                if(fkId === item.id){
                    this.form.buyerId = item.id
                    this.form.buyerDeptId = item.deptId
                }
            });
        },
        /** 子表外键PoId被选择后触发事件 **/
        onPoItemPoIdSelection(fkId){
            this.fkPoList.forEach(item=>{
                if(fkId === item.id){
                   this.formPoItem.poId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onPoItemMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formPoItem.materialId = item.id
                    this.formPoItem.materialName = item.materialName
                    this.formPoItem.materialSpec = item.materialSpec
                }
            });
        },
        handleExport() {
            this.download('sup/po/export', {
              ...this.queryParams
            }, `po_${new Date().getTime()}.xlsx`)
        },
        /** 查询子表采购单明细数据 */
        getPoItemList() {
            var params = {"poId":this.masterId};
            listPoItem(params).then(res => {
                this.poItemList = res.rows;
            });
        },
        // 多选框选中数据
        handlePoItemSelectionChange(selection) {
            this.idsPoItem = selection.map(item => item.id)
            this.captionsPoItem = selection.map(item => item.seqNo)
            this.singlePoItem = selection.length!==1
            this.multiplePoItem = !selection.length
        },
        /** 子表采购单明细的CSS行样式 */
        rowClassNamePoItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPoItem.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
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
  .marginBottom5{
    margin-bottom:5px !important
  }
  .marginBottom0{
    margin-bottom:0;
  }
  .fontSize12{
    font-size: 12px
  }
  .inputWidth{
    width: 60% !important
  }
  .searchInput{
    width:180px !important
  }
  .el-input__inner{
    width:100%
  }
  .dialogConfig .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: deepskyblue !important;
    color: honeydew;
  }
  .el-table__body tr.current-row>td{
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
    color:sandybrown;
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
