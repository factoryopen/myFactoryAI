<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
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
            <el-form-item prop="quantityDispatched" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>派工数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityDispatched"
                    placeholder="请输入派工数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityFinished" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>完成数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityFinished"
                    placeholder="请输入完成数量"
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
                    type="primary"
                    icon="el-icon-magic-stick"
                    size="mini"
                    :disabled="multiple"
                    @click="handleSplitMps"
                >分解</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="380px"
                  :data="woComputingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="cellStyle"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
              <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="主计划号" align="center" prop="billNo"  width="125" show-overflow-tooltip/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                  <dict-tag :options="dict.type.sales_status_mps" :value="scope.row.status"/>
                </template>
              </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168" show-overflow-tooltip/>
            <el-table-column label="产品名称" align="left" prop="productName" width="140" show-overflow-tooltip/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="150" show-overflow-tooltip/>
            <el-table-column label="图号" align="left" prop="drawNo"  width="120" show-overflow-tooltip/>
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
              <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="需求日期" align="center" prop="needDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="下单日期" align="center" prop="orderDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
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
               <el-table-column label="客户" align="right" prop="customerId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
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
                <el-table-column label="项次" align="center" prop="soItemId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoItemList">
                        <span v-if="item.id==scope.row.soItemId"
                            :key="index"
                            size="mini">{{item.seqNo}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="项目" align="center" prop="projectId"  width="75">
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
            <el-tab-pane label="MRP工单项">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-refresh-right"
                            :disabled="multipleMrpWo"
                            @click="handleTowo"
                        >转工单</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mrpWo" border
                        :data="mrpWoList"
                        highlight-current-row
                        :row-class-name="rowClassNameMrpWo"
                        @selection-change="handleMrpWoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="状态" align="center" prop="status" width="55">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.bill_status_convertto" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品编码" align="left" prop="productCode" width="168" show-overflow-tooltip/>
                    <el-table-column label="产品名称" align="left" prop="productName" width="140" show-overflow-tooltip/>
                    <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="数量" align="right" prop="quantity" width="75"/>
                    <el-table-column label="生产交期" align="center" prop="needDay" width="90">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="承诺交期" align="center" prop="promiseDay" width="90">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="下单日期" align="center" prop="orderDay" width="90">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="优先级" align="right" prop="priority" width="70">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产线" align="right" prop="lineId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkLineList">
                                <span v-if="item.id==scope.row.lineId"
                                    :key="index"
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="工单类型" align="center" prop="woType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.pln_mrp_wotype" :value="scope.row.woType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="销售订单" align="center" prop="soId"  width="115">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkSoList">
                                <span v-if="item.id==scope.row.soId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="项次" align="center" prop="soItemId"  width="60">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkSoItemList">
                                <span v-if="item.id==scope.row.soItemId"
                                    :key="index"
                                    size="mini">{{item.seqNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="remark"/>
<!--                    <el-table-column label="项目" align="right" prop="projectId"  width="100">-->
<!--                        <template  slot-scope="scope">-->
<!--                            <template v-for="(item,index) in fkProjectList">-->
<!--                                <span v-if="item.id==scope.row.projectId"-->
<!--                                    :key="index"-->
<!--                                    size="mini">{{item.projectName}}</span>-->
<!--                            </template>-->
<!--                       </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { listWoComputing, getWoComputing, delWoComputing, addWoComputing, updateWoComputing } from "@/api/pln/woComputing";
import { splitMps } from "@/api/pln/woComputing";
import { listMrpWo, getMrpWo, delMrpWo, addMrpWo, updateMrpWo } from "@/api/pln/mrpWo";
import { toWo } from "@/api/pln/mrpWo";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listSoTrace} from "@/api/ord/soTrace";
import pdf from "vue-pdf";

export default {
    name: "WoComputing",
    components: {pdf},
    dicts: ['sales_status_mps', 'bill_priority', 'pln_mpsitem_type', 'bill_status_convertto', 'pln_mrp_wotype'],
    data() {
        return {
            //base url
            baseUrl: process.env.VUE_APP_BASE_API,
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
            // 计划分解表格数据
            woComputingList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkLineList: [],
            fkProjectList: [],
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
                billNo: [
                    { required: true, message: "主计划号不能为空", trigger: "blur" }
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
                quantityPlanned: [
                    { required: true, message: "计划数量不能为空", trigger: "blur" }
                ],
                quantityDispatched: [
                    { required: true, message: "派工数量不能为空", trigger: "blur" }
                ],
                quantityFinished: [
                    { required: true, message: "完成数量不能为空", trigger: "blur" }
                ],
                needDay: [
                    { required: true, message: "需求日期不能为空", trigger: "blur" }
                ],
                orderDay: [
                    { required: true, message: "下单日期不能为空", trigger: "blur" }
                ],
                customerId: [
                    { required: true, message: "客户ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              productId: null,
              productName: null,
              productSpec: null,
              unitId: null,
              quantityPlanned: null,
              quantityDispatched: null,
              quantityFinished: null,
              promiseDay: null,
              needDay: null,
              orderDay: null,
              priority: null,
              mpsType: null,
              customerId: null,
              soId: null,
              soItemId: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            mrpWoList:[],
            // 选中数组
            idsMrpWo: [],
            captionsMrpWo: [],
            // 非单个禁用
            singleMrpWo: true,
            // 非多个禁用
            multipleMrpWo: true,
            // 子表选中数据
            checkedMrpWo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMrpWo: false,
            formMrpWo: {},
            rulesMrpWo: {
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
                woType: [
                   { required: true, message: "工单类型不能为空", trigger: "change" }
                ],
                soItemId: [
                   { required: true, message: "订单项不能为空", trigger: "blur" }
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
            listWoComputing(this.queryParams).then(response => {
              this.woComputingList = response.rows;
              this.total = response.total;
              if (this.woComputingList && this.woComputingList.length>0) {
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
                this.getMrpWoList();
            }else {
                this.mrpWoList = null;
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

          if (columnIndex==2 && row.status==4) {
            className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==7) {
            className = "fontSize:12px; color:lightgreen; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==8) {
            className = "fontSize:12px; color:green; padding:1px 0px;";
          }

          return className;
        },
        /**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
                }
            });
        },
        /**主表外键SoId被选择后触发事件*/
        onSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soId = item.id
                    this.form.projectId = item.projectId
                    this.form.salesId = item.salesId
                }
            });
        },
        /**主表外键SoItemId被选择后触发事件*/
        onSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soItemId = item.id
                }
            });
        },
        /** 子表外键MpsId被选择后触发事件 **/
        onMrpWoMpsIdSelection(fkId){
            this.fkWoComputingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMrpWo.mpsId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMrpWoLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMrpWo.lineId = item.id
                }
            });
        },
        /** 子表外键SoId被选择后触发事件 **/
        onMrpWoSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                   this.formMrpWo.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onMrpWoSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formMrpWo.soItemId = item.id
                }
            });
        },

        handleSplitMps(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定分解 主计划号为"' + billNoz + '"的数据项吗？').then(function() {
              return splitMps(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },

        /** 查询子表MRP工单项数据 */
        getMrpWoList() {
            var params = {"mpsId":this.masterId};
            listMrpWo(params).then(res => {
                this.mrpWoList = res.rows;
            });
        },
        // 多选框选中数据
        handleMrpWoSelectionChange(selection) {
            this.idsMrpWo = selection.map(item => item.id)
            this.captionsMrpWo = selection.map(item => item.productName)
            this.singleMrpWo = selection.length!==1
            this.multipleMrpWo = !selection.length
        },
        /** 子表MRP工单项的CSS行样式 */
        rowClassNameMrpWo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMrpWo.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }


            return clsName;
        },
        handleTowo(row) {
            const ids = row.id || this.idsMrpWo;
            const productNamez = row.productName || this.captionsMrpWo;

            this.$modal.confirm('确定转工单产品名称为"' + productNamez + '"的数据项？').then(function() {
              return toWo(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
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
  .dialogPreview .el-dialog__body {
    padding: 0;
    margin: 0;
    background: #000000;
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
