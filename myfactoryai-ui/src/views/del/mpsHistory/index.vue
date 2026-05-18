<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
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
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>主计划号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入主计划号"
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
                v-for="dict in dict.type.sales_status_mps"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item prop="quantityPlanned" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>计划数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityPlanned"
                    placeholder="请输入计划数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="promiseDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>承诺交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.promiseDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择承诺交期">
                </el-date-picker>
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
            <el-form-item prop="mpsType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>类型</strong></span>
                </span>
                <el-select v-model="queryParams.mpsType" placeholder="请选择类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.pln_mpsitem_type"
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
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="mpsList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  :cell-style="cellStyle"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="主计划号" align="center" prop="billNo"  width="125"/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sales_status_mps" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="销售订单" align="center" prop="soId"  width="115">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoList">
                        <span v-if="item.id==scope.row.soId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="项次" align="center" prop="soItemId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoItemList">
                        <span v-if="item.id==scope.row.soItemId"
                            :key="index"
                            size="mini">{{item.seqNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
            <el-table-column label="产品名称" align="left" prop="productName" width="180"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="110"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                             :key="index"
                             size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="计划数量" align="right" prop="quantityPlanned"  width="75"/>
              <el-table-column label="派工数量" align="right" prop="quantityDispatched"  width="75"/>
              <el-table-column label="完成数量" align="right" prop="quantityFinished"  width="75"/>
              <el-table-column label="需求日期" align="center" prop="needDay" width="85"/>
              <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="下单日期" align="center" prop="orderDay" width="85"/>
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
               <el-table-column label="客户" align="left" prop="customerId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
            <el-table-column label="项目" align="center" prop="projectId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="销售员" align="center" prop="salesId"  width="65">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.salesId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <el-tabs>
            <el-tab-pane label="工单信息">
                <el-table ref="woInfo" border
                        :data="woInfoList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoInfo"
                        @selection-change="handleWoInfoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="工单号" align="center" prop="billNo" width="125"/>
                    <el-table-column label="状态" align="center" prop="status" width="65">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.manufacturing_status_wo" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品编码" align="left" prop="productCode"  width="168"/>
                    <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="75"/>
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
                    <el-table-column label="产线" align="center" prop="lineId"  width="90">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkLineList">
                                <span v-if="item.id==scope.row.lineId"
                                    :key="index"
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" align="center" prop="woType" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.pln_wo_type" :value="scope.row.woType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目" align="center" prop="projectId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProjectList">
                                <span v-if="item.id==scope.row.projectId"
                                    :key="index"
                                    size="mini">{{item.projectName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="产出数量" align="right" prop="quantityOutput" width="80"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="80"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="80"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="80"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="80"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="80"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import {getNextBillno, updateBillSeq } from "@/api/del/mps";
import { listMpsAll, getMps, delMps, addMps, updateMps, noticeEngineering } from "@/api/del/mps";
import { enable, changeDelMps,froze,unfroze,disable,normalizeCode } from "@/api/del/mps";
import { listWoInfo, getWoInfo, delWoInfo, addWoInfo, updateWoInfo } from "@/api/pln/woInfo";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listProductingMaterialInfo} from "@/api/eng/materialInfo";
import {getDeliveryDeal, listDeliveryDeal} from "@/api/del/deliveryDeal";
import { listWoComputing} from "@/api/pln/woComputing";
import { listSoTrace} from "@/api/ord/soTrace";
import {noticeReturning} from "@/api/sup/po";

export default {
    name: "Mps",
    dicts: ['sales_status_mps', 'bill_priority', 'pln_mpsitem_type', 'manufacturing_status_wo', 'pln_wo_type'],
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
            // 主计划维护表格数据
            mpsList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkLineList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkDeliveryDealList: [],
            fkWoComputingList: [],
            fkSoTraceList: [],
            //主表当前行的ID
            masterId:"",
            //当前tab名
            activeTabName:"",
            // 弹出层标题
            title: "",
            /*
             * 3类Master对话框的显示、表单、校验 *
             */
            open: false,
            form: {},
            rules: {
              productId: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
              mpsType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
              quantityPlanned: [
                { required: true, message: "计划数量不能为空", trigger: "blur" }
              ],
              promiseDay: [
                { required: true, message: "承诺交期不能为空", trigger: "blur" }
              ],
            },
            openNormalizeCode: false,
            rulesNormalizeCode: {
              productId: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
            },
            openchangeDelMps: false,
            ruleschangeDelMps: {
                mpsType: [
                    { required: true, message: "类型不能为空", trigger: "change" }
                ],
                priority: [
                    { required: true, message: "客户ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 12,
              billNo: null,
              status: null,
              soId: null,
              soItemId: null,
              productId: null,
              productName: null,
              productSpec: null,
              quantityPlanned: null,
              quantityDispatched: null,
              quantityFinished: null,
              needDay: null,
              promiseDay: null,
              priority: null,
              mpsType: null,
              customerId: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            woInfoList:[],
            // 选中数组
            idsWoInfo: [],
            captionsWoInfo: [],
            // 非单个禁用
            singleWoInfo: true,
            // 非多个禁用
            multipleWoInfo: true,
            // 子表选中数据
            checkedWoInfo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoInfo: false,
            formWoInfo: {},
            rulesWoInfo: {
                billNo: [
                   { required: true, message: "工单号不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                priority: [
                   { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                lineId: [
                   { required: true, message: "产线不能为空", trigger: "blur" }
                ],
                woType: [
                   { required: true, message: "类型不能为空", trigger: "change" }
                ],
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
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键DeliveryDeal数据 */
        this.getDeliveryDealList();
        /** 查询外键WoComputing数据 */
        this.getWoComputingList();
        /** 查询外键SoTrace数据 */
        this.getSoTraceList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listMpsAll(this.queryParams).then(response => {
              this.mpsList = response.rows;
              this.total = response.total;
              if (this.mpsList && this.mpsList.length>0) {
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
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getWoInfoList();
            }else {
                this.woInfoList = null;
            }
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
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
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
          listProductingMaterialInfo().then(res => {
                this.fkProductBasisList = res.rows;
            });
        },
        /** 查询外键DeliveryDeal数据 */
        getDeliveryDealList() {
            listDeliveryDeal().then(res => {
                this.fkDeliveryDealList = res.rows;
            });
        },
        /** 查询外键WoComputing数据 */
        getWoComputingList() {
            listWoComputing().then(res => {
                this.fkWoComputingList = res.rows;
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
      cellStyle({row, column, rowIndex, columnIndex}) {
        var className = "fontSize:12px;padding:1px 0px;";

        if (columnIndex==2 && row.status==3) {
          className = "fontSize:12px; fontWeight:bold; color:rosybrown; padding:1px 0px;";
        }
        else if (columnIndex==2 && row.status==4) {
          className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
        }
        else if (columnIndex==2 && row.status==5) {
          className = "fontSize:12px; fontWeight:bold; color:red; padding:1px 0px;";
        }
        else if (columnIndex==2 && row.status==6) {
          className = "fontSize:12px; fontWeight:bold; color:sandybrown; padding:1px 0px;";
        }
        else if (columnIndex==2 && row.status==7) {
          className = "fontSize:12px; color:lightgreen; padding:1px 0px;";
        }
        else if (columnIndex==2 && row.status==8) {
          className = "fontSize:12px; color:green; padding:1px 0px;";
        }

        return className;
      },
      /**主表外键SoId被选择后触发事件*/
      onProductIdSelection(fkid){
        this.fkProductBasisList.forEach(item=>{
          if(fkid === item.id){
            this.form.productId = item.id;
            this.form.productCode = item.materialCode;
            this.form.productName = item.materialName;
            this.form.productSpec = item.materialSpec;
            this.form.drawNo = item.drawNo;
            this.form.customerProductNo = item.customerProductNo;
            this.form.AbroadProductNo = item.AbroadProductNo;
            this.form.unitId = item.unitId;
          }
        });
      },
      /**主表外键SoId被选择后触发事件*/
        onSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soId = item.id
                }
            });
        },
        /**主表外键SoItemId被选择后触发事件*/
        onSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soItemId = item.id
                    this.form.needDay = item.needDay
                }
            });
        },
        /**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
                }
            });
        },
        /**主表外键ProjectId被选择后触发事件*/
        onProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                    this.form.projectId = item.id
                }
            });
        },
        /**主表外键SalesId被选择后触发事件*/
        onSalesIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.salesId = item.userId
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onWoInfoLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoInfo.lineId = item.id
                }
            });
        },
        /** 子表外键MpsId被选择后触发事件 **/
        onWoInfoMpsIdSelection(fkId){
            this.fkWoComputingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoInfo.mpsId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onWoInfoProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoInfo.projectId = item.id
                }
            });
        },
      /** 重设主表的编辑对话框数据 */
      reset(){
        this.form = {
          id: null,
          billNo: null,
          status: 0,
          quantityPlanned: null,
          quantityFinished: null,
          promiseDay: null,
          priority: null,
          mpsType: null,
          remark: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null
        };
        this.resetForm("form");
      },
      /** 重设主表的变更对话框数据 */
      resetchangeDelMps (){
          this.form = {
              id: null,
              billNo: null,
              status: null,
              quantityPlanned: null,
              quantityDispatched: null,
              quantityFinished: null,
              promiseDay: null,
              priority: null,
              mpsType: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
          };
          this.resetForm("form");
      },
      /** 重设主表的变更对话框数据 */
      resetNormalizeCode (){
        this.form = {
          id: null,
          billNo: null,
          soId: null,
          soItemId: null,
          productId: null,
          productCode: null,
          productName: null,
          productSpec: null,
          drawNo: null,
          customerProductNo:null,
          AbroadProductNo:null,
          unitId: null,
        };
        this.resetForm("form");
      },
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "新增";
        getNextBillno("410").then(res => {
          this.form.billNo = res
        });
      },
      handleEdit(row) {
        const id = row.id || this.ids
        getMps(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "编辑";
        });
      },
      handleDelete(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;
        this.$modal.confirm('确认删除主计划号为"' + billNoz + '"的数据项？').then(function() {
          return delMps(ids);
        }).then(() => {
          this.getMasterList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      handleEnable(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;

          this.$modal.confirm('确定发布 自制主计划号为"' + billNoz + '"的数据项吗？').then(function () {
            return enable(ids);
          }).then(() => {
            this.getMasterList();
            this.$modal.msgSuccess("发布成功");
          }).catch(() => {
          });
        },
        handleChangeDelMps(row) {
            const id = row.id || this.ids
            getMps(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeDelMps = true;
                this.title = "变更主计划维护";
            });
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 主计划号为"' + billNoz + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定解冻 主计划号为"' + billNoz + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 主计划号为"' + billNoz + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
      handleExport() {
          this.download('del/mps/export', {
            ...this.queryParams
          }, `mps_${new Date().getTime()}.xlsx`)
      },
      handleNormalizeCode(row) {
        const id = row.id || this.ids
        getMps(id).then(response => {
          this.form = response.data;
          //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
          this.openNormalizeCode = true;
          this.title = "转正料号";
        });
      },
      noticeEngineering(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定将主计划为"' + billNoz + '"的项目通知工艺吗？').then(function() {
          return noticeEngineering(row);
        }).then(response => {
          this.getMasterList();
          this.$modal.msgSuccess(response.msg);
        });
      },
      /** 提交按钮 */
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              //TODO 上述一行代码须替代或删除

              if (this.form.id != null) {
                updateMps(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getMasterList();
                  });
              } else {
                addMps(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getMasterList();
                  });
                updateBillSeq("410").then(res => {});
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
        submitchangeDelMps() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};

                  changeDelMps(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeDelMps = false;
                      this.getMasterList();
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelchangeDelMps() {
            this.openchangeDelMps = false;
            this.resetchangeDelMps();
        },
        /** 提交按钮 */
        submitNormalizeCode() {
          this.$refs["form"].validate(valid => {
            if (valid) {
              if(this.form.id==this.form.id){
                normalizeCode(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openNormalizeCode = false;
                    this.getMasterList();
                  });
              }
            }
          });
        },
        // 取消按钮
        cancelNormalizeCode() {
          this.openNormalizeCode = false;
          this.resetNormalizeCode();
        },
        /** 查询子表工单信息数据 */
        getWoInfoList() {
            var params = {"mpsId":this.masterId};
            listWoInfo(params).then(res => {
                this.woInfoList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoInfoSelectionChange(selection) {
            this.idsWoInfo = selection.map(item => item.id)
            this.captionsWoInfo = selection.map(item => item.billNo)
            this.singleWoInfo = selection.length!==1
            this.multipleWoInfo = !selection.length
        },
        /** 子表工单信息的CSS行样式 */
        rowClassNameWoInfo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoInfo.includes(row.id)){
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
