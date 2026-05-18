<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
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
          <el-form-item prop="projectId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>项目</strong></span>
            </span>
            <el-select class="searchInput" v-model="queryParams.projectId" filterable placeholder="请选择项目" size="mini">
              <el-option
                v-for="(fkrow, index) in fkProjectList"
                :key="index"
                :label="fkrow.projectName"
                :value="fkrow.id"
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
          <el-form-item prop="productId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
            <el-select class="searchInput" v-model="queryParams.productId" filterable placeholder="请选择产品编码" size="mini">
              <el-option
                v-for="(fkrow, index) in fkSoItemList"
                :key="index"
                :label="fkrow.productId"
                :value="fkrow.productId"
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
                v-for="dict in dict.type.sales_status_dp"
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
              <el-date-picker
                clearable
                size="mini"
                class="searchInput"
                v-model="queryParams.needDay"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择需求日期">
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
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleEdit"
                >变更</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-ice-cream-round"
                    size="mini"
                    :disabled="multiple"
                    @click="handleFroze"
                >冻结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-magic-stick"
                    size="mini"
                    :disabled="multiple"
                    @click="handleUnfroze"
                >解冻</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDisable"
                >停用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-brush"
                    size="mini"
                    :disabled="multiple"
                    @click="handleFinishforcely"
                >强结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-s-ticket"
                    size="mini"
                    :disabled="multiple"
                    @click="handleBillDelivery"
                >转单</el-button>
            </el-col>
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
                  height="610px"
                  :data="deliveryPlanList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="计划单号" align="left" prop="billNo"  width="125"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sales_status_dp" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="销售订单" align="left" prop="soId"  width="115">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoList">
                        <span v-if="item.id==scope.row.soId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项次" align="center" prop="soItemId"  width="70">
              <template  slot-scope="scope">
                  <template v-for="(item,index) in fkSoItemList">
                      <span v-if="item.id==scope.row.soItemId"
                          :key="index"
                          size="mini">{{item.seqNo}}</span>
                  </template>
              </template>
            </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="110"/>
          <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="50">
                  <template  slot-scope="scope">
                      <template v-for="(item,index) in fkUnitList">
                          <span v-if="item.id==scope.row.unitId"
                               :key="index"
                               size="mini">{{item.unitName}}</span>
                      </template>
                  </template>
              </el-table-column>
                <el-table-column label="需求日期" align="center" prop="needDay" width="85"/>
              <el-table-column label="承诺日期" align="center" prop="promiseDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
                <el-table-column label="计发数量" align="right" prop="quantityPlanned"  width="75"/>
                <el-table-column label="累发数量" align="right" prop="quantityReleased"  width="75"/>
            <el-table-column label="客户" align="left" prop="customerId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="项目" align="right" prop="projectId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="销售员" align="right" prop="salesId"  width="80">
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

        <!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
              <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>发货计划</strong></span>
                    </span>
                <el-input class="inputWidth" v-model="form.billNo" size="mini" disabled="true" />
              </el-form-item>
              <el-table-column label="批号" align="left" prop="lotNo" width="140"/>
                <el-form-item prop="soId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>销售订单</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.soId" placeholder="请选择销售订单"
                               @change="onSoIdSelection"  size="mini"  disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkSoList"
                            :key="index"
                            :label="fkrow.billNo"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="soItemId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项次</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.soItemId" placeholder="请选择订单项"
                               @change="onSoItemIdSelection"  size="mini"  disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkSoItemList"
                            :key="index"
                            :label="fkrow.seqNo"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productCode" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.productCode" placeholder="请选择产品编码" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productName" class="marginBottom0" >
                  <span slot="label">
                      <span class="fontSize12"><strong>产品名称</strong></span>
                  </span>
                  <el-input class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
                </el-form-item>
                  <el-form-item prop="drawNo" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>图号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.drawNo" placeholder="请选择图号" size="mini" disabled="true"/>
                  </el-form-item>
                <hr>
                <el-form-item  prop="priority" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>优先级</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.priority" placeholder="请选择优先级" size="mini" >
                        <el-option
                            v-for="dict in dict.type.bill_priority"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="projectId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项目</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                               @change="onProjectIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProjectList"
                            :key="index"
                            :label="fkrow.projectName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submit">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.openbillDelivery对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openbillDelivery" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesbillDelivery" label-width="120px" :inline-message="true">

                <el-form-item prop="customerId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>客户</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.customerId" placeholder="请选择客户"
                               @change="onCustomerIdSelection"  size="mini">
                        <el-option
                            v-for="(fkrow, index) in fkCustomerList"
                            :key="index"
                            :label="fkrow.customerName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item prop="deliveryDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>发货日期</strong></span>
                    </span>
                <el-date-picker clearable size="mini"
                                v-model="form.deliveryDay"
                                class="inputWidth"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择发货日期">
                </el-date-picker>
              </el-form-item>
                <el-form-item prop="projectId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项目</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                               @change="onProjectIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProjectList"
                            :key="index"
                            :label="fkrow.projectName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="salesId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>销售员</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.salesId" placeholder="请选择销售员"
                               @change="onSalesIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitbillDelivery">确 定</el-button>
               <el-button @click="cancelbillDelivery">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="发货计划尾情">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="deliveryPlanTail" border
                        :data="deliveryPlanTailList"
                        highlight-current-row
                        :row-class-name="rowClassNameDeliveryPlanTail"
                        @selection-change="handleDeliveryPlanTailSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
                    <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
                    <el-table-column label="下单日期" align="center" prop="orderDay" width="85"/>
                    <el-table-column label="客户" align="right" prop="customerId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkCustomerList">
                                <span v-if="item.id==scope.row.customerId"
                                    :key="index"
                                    size="mini">{{item.customerName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目ID" align="right" prop="projectId" width="100"/>
                    <el-table-column label="销售员ID" align="right" prop="salesId" width="100"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listDeliveryPlan, getDeliveryPlan, delDeliveryPlan, addDeliveryPlan, updateDeliveryPlan } from "@/api/del/deliveryPlan";
import { froze,unfroze,disable,finishforcely,billDelivery } from "@/api/del/deliveryPlan";
import { listDeliveryPlanTail, getDeliveryPlanTail, delDeliveryPlanTail, addDeliveryPlanTail, updateDeliveryPlanTail } from "@/api/del/deliveryPlanTail";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import {addSo, listSo, updateBillSeq, updateSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listSoTrace} from "@/api/ord/soTrace";

export default {
    name: "DeliveryPlan",
    dicts: ['sales_status_dp', 'bill_priority'],
    data() {
        return {
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            captions: [],
            customerIds:[],
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
            // 发货计划维护表格数据
            deliveryPlanList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkProjectList: [],
            fkProductBasisList: [],
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
                priority: [
                    { required: true, message: "优先级不能为空", trigger: "change" }
                ],
            },
            openbillDelivery: false,
            rulesbillDelivery: {
                customerId: [
                    { required: true, message: "客户不能为空", trigger: "blur" }
                ],
                deliveryDay: [
                  { required: true, message: "发货日期不能为空", trigger: "blur" }
                ],
                salesId: [
                  { required: true, message: "销售员不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 20,
              status: null,
              soId: null,
              soItemId: null,
              productId: null,
              productName: null,
              productSpec: null,
              needDay: null,
              promiseDay: null,
              priority: null,
              quantityPlanned: null,
              customerId: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            deliveryPlanTailList:[],
            // 选中数组
            idsDeliveryPlanTail: [],
            captionsDeliveryPlanTail: [],
            // 非单个禁用
            singleDeliveryPlanTail: true,
            // 非多个禁用
            multipleDeliveryPlanTail: true,
            // 子表选中数据
            checkedDeliveryPlanTail: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openDeliveryPlanTail: false,
            formDeliveryPlanTail: {},
            rulesDeliveryPlanTail: {},
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
        /** 查询外键SoTrace数据 */
        this.getSoTraceList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listDeliveryPlan(this.queryParams).then(response => {
              this.deliveryPlanList = response.rows;
              this.total = response.total;
              if (this.deliveryPlanList && this.deliveryPlanList.length>0) {
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
                this.getDeliveryPlanTailList();
            }else {
                this.deliveryPlanTailList = null;
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
            this.captions = selection.map(item => item.productName)
            this.customerIds = selection.map(item => item.customerId)
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
                    this.form.productId = item.productId;
                    this.form.productName = item.productName;
                    this.form.productSpec = item.productSpec;
                    this.form.drawNo = item.drawNo;
                    this.form.unitId = item.unitId;
                    this.form.needDay = item.needDay;
                    this.form.price = item.price;
                    this.form.discountPrice = item.discountPrice;
                    this.form.discountRate = item.discountRate;
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
        /** 子表外键SoId被选择后触发事件 **/
        onDeliveryPlanTailSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                   this.formDeliveryPlanTail.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onDeliveryPlanTailSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formDeliveryPlanTail.soItemId = item.id
                    this.formDeliveryPlanTail.productName = item.materialName
                    this.formDeliveryPlanTail.productSpec = item.materialSpec
                    this.formDeliveryPlanTail.unitId = item.unitId
                    this.formDeliveryPlanTail.needDay = item.needDay
                    this.formDeliveryPlanTail.promiseDay = item.promiseDay
                }
            });
        },
        /** 子表外键CustomerId被选择后触发事件 **/
        onDeliveryPlanTailCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                   this.formDeliveryPlanTail.customerId = item.id
                }
            });
        },

        /** 重设主表的变更对话框数据 */
        reset (){
            this.form = {
                id: null,
                status: null,
                promiseDay: null,
                priority: null,
                quantityPlanned: null,
                quantityReleased: null,
                amount: null,
                finalAmount: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的转单对话框数据 */
        resetbillDelivery (){
            this.form = {
                customerId: null,
                deliveryDay: null,
                projectId: null,
                salesId: null
            };
            this.resetForm("form");
        },
        handleEdit(row) {
            const id = row.id || this.ids
            getDeliveryPlan(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "变更发货计划维护";
            });
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const productNamez = row.productName || this.captions;

         this.$modal.confirm('确定冻结 产品名称为"' + productNamez + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const productNamez = row.productName || this.captions;

         this.$modal.confirm('确定解冻 产品名称为"' + productNamez + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const productNamez = row.productName || this.captions;

         this.$modal.confirm('确定停用 产品名称为"' + productNamez + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
       handleFinishforcely(row) {
         const ids = row.id || this.ids;
         const productNamez = row.productName || this.captions;

         this.$modal.confirm('确定强结 产品名称为"' + productNamez + '"的数据项吗？').then(function() {
           return finishforcely(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("强结成功");
         }).catch(() => {});
       },
        handleBillDelivery(row) {
            this.resetbillDelivery();
            this.form.customerId = this.customerIds[0];
            this.openbillDelivery = true;
            this.title = "转单";
        },
        handleExport() {
            this.download('del/deliveryPlan/export', {
              ...this.queryParams
            }, `deliveryPlan_${new Date().getTime()}.xlsx`)
        },

      /** 提交按钮 */
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id == this.form.id) {
              //TODO 上述一行代码须替代或删除

              if (this.form.id != null) {
                updateDeliveryPlan(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getMasterList();
                  });
              } else {
                addDeliveryPlan(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getMasterList();
                  });
                // updateBillSeq("151").then(res => {
                // });
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
        submitbillDelivery() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"deliveryDay":this.form.deliveryDay};
                  billDelivery(this.ids, this.form)
                  .then(response => {
                      this.getMasterList();
                      this.$modal.msgSuccess(response.msg);
                      this.openbillDelivery = false;
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelbillDelivery() {
            this.openbillDelivery = false;
            this.resetbillDelivery();
        },

        /** 查询子表发货计划尾情数据 */
        getDeliveryPlanTailList() {
            var params = {"id":this.masterId};
            listDeliveryPlanTail(params).then(res => {
                this.deliveryPlanTailList = res.rows;
            });
        },
        // 多选框选中数据
        handleDeliveryPlanTailSelectionChange(selection) {
            this.idsDeliveryPlanTail = selection.map(item => item.id)
            this.captionsDeliveryPlanTail = selection.map(item => item.productName)
            this.singleDeliveryPlanTail = selection.length!==1
            this.multipleDeliveryPlanTail = !selection.length
        },
        /** 子表发货计划尾情的CSS行样式 */
        rowClassNameDeliveryPlanTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsDeliveryPlanTail.includes(row.id)){
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
