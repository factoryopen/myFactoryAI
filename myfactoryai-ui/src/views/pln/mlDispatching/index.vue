<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入工单号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="mpsId" class="marginBottom5" >
              <span slot="label">
                  <span class="fontSize12"><strong>主计划</strong></span>
              </span>
              <el-select class="searchInput" v-model="queryParams.mpsId" filterable placeholder="请选择主计划" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkMpsList"
                  :key="index"
                  :label="fkrow.billNo"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <el-input
                  v-model="queryParams.status"
                  v-show="false"
                />
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
            <el-form-item prop="woType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工单类型</strong></span>
                </span>
                <el-select v-model="queryParams.woType" placeholder="请选择类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.pln_wo_type"
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
                    @click="handleDispatchMultipleMl"
                >批派</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-magic-stick"
                    size="mini"
                    :disabled="single"
                    @click="handleDispatchSingleMl"
                >单派</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="mlDispatchingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="cellStyle"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="工单号" align="center" prop="billNo"  width="120" show-overflow-tooltip/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_wo" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="产品编码" align="left" prop="productCode"  width="168" show-overflow-tooltip/>
                <el-table-column label="产品名称" align="left" prop="productName" width="140" show-overflow-tooltip/>
                <el-table-column label="产品规格" align="left" prop="productSpec"  width="120" show-overflow-tooltip/>
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
                <el-table-column label="计划数量" align="right" prop="quantityPlanned"  width="80"/>
                <el-table-column label="实派数量" align="right" prop="quantityAssigned"  width="80"/>
              <el-table-column label="需求日期" align="center" prop="needDay" width="90">
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
              <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
                <el-table-column label="产线" align="center" prop="lineId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="类型" align="center" prop="woType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_wo_type" :value="scope.row.woType"/>
                </template>
            </el-table-column>
                <el-table-column label="主计划" align="center" prop="mpsId"  width="125">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMpsList">
                        <span v-if="item.id==scope.row.mpsId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项目" align="center" prop="projectId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
          </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.opendispatchMultipleMl对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opendispatchMultipleMl" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesdispatchMultipleMl" label-width="120px" :inline-message="true">
                <el-form-item prop="deliveryDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>生产交期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.deliveryDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择生产交期">
                    </el-date-picker>
                </el-form-item>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitdispatchMultipleMl">确 定</el-button>
               <el-button @click="canceldispatchMultipleMl">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.opendispatchSingleMl对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opendispatchSingleMl" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesdispatchSingleMl" label-width="120px" :inline-message="true">
                <el-form-item  prop="quantityPlanned" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>可派数量</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.quantityAvailable" placeholder="请输入可派数量" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item  prop="quantityAssigned" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>待派数量</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.quantityAssigning" placeholder="请输入待派数量" size="mini" />
                </el-form-item>
                <el-form-item prop="needDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>生产交期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.deliveryDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择生产交期">
                    </el-date-picker>
                </el-form-item>
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
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitdispatchSingleMl">确 定</el-button>
               <el-button @click="canceldispatchSingleMl">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="新派批次">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlCreated" border
                        :data="mlCreatedList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlCreated"
                        @selection-change="handleMlCreatedSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="批次号" align="center" prop="billNo" width="125"/>
                    <el-table-column label="产品编码" align="left" prop="productCode"  width="168"/>
                    <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
                    <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
                    <el-table-column label="状态" align="center" prop="status" width="65">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.manufacturing_status_ml" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="优先级" align="center" prop="priority" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="派工数量" align="right" prop="quantityDispatched" width="70"/>
                    <el-table-column label="上线日期" align="center" prop="scheduleDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.scheduleDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="生产交期" align="center" prop="deliveryDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="产线" align="center" prop="lineId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkLineList">
                                <span v-if="item.id==scope.row.lineId"
                                    :key="index"
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="批次类型" align="center" prop="mlType" width="70">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="来源批次" align="left" prop="sourceMlId"  width="125">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMlList">
                                <span v-if="item.id==scope.row.sourceMlId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
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
import { listMlDispatching, getMlDispatching, delMlDispatching, addMlDispatching, updateMlDispatching } from "@/api/pln/mlDispatching";
import { dispatchMultipleMl,dispatchSingleMl } from "@/api/pln/mlDispatching";
import { listMlCreated, getMlCreated, delMlCreated, addMlCreated, updateMlCreated } from "@/api/pln/mlCreated";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listWo} from "@/api/pln/wo";
import { listMps} from "@/api/del/mps";
import { listMl} from "@/api/pln/ml";

export default {
    name: "MlDispatching",
    dicts: ['manufacturing_status_wo', 'bill_priority', 'pln_wo_type', 'manufacturing_status_ml', 'manufacturing_status_move', 'pln_ml_type'],
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
            // 上线派工表格数据
            mlDispatchingList: [],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkLineList: [],
            fkWorkgroupList: [],
            fkProjectList: [],
            fkWoList: [],
            fkWoComputingList: [],
            fkMlList: [],
            fkMpsList:[],
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
            rules: {},
            opendispatchMultipleMl: false,
            rulesdispatchMultipleMl: {},
            opendispatchSingleMl: false,
            rulesdispatchSingleMl: {
                quantityAvailable: [
                    { required: true, message: "实派数量不能为空", trigger: "blur" }
                ],
                quantityAssigning: [
                    { required: true, message: "实派数量不能为空", trigger: "blur" }
                ],
                deliveryDay: [
                    { required: false, message: "需求日期不能为空", trigger: "blur" }
                ],
                priority: [
                    { required: false, message: "优先级不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              billNo: null,
              status: null,
              productId: null,
              productName: null,
              productSpec: null,
              quantityPlanned: null,
              quantityAssigned: null,
              needDay: null,
              promiseDay: null,
              orderDay: null,
              priority: null,
              lineId: null,
              woType: null,
              mpsId: null,
              projectId: null,
            },
            //子表信息
            mlCreatedList:[],
            // 选中数组
            idsMlCreated: [],
            captionsMlCreated: [],
            // 非单个禁用
            singleMlCreated: true,
            // 非多个禁用
            multipleMlCreated: true,
            // 子表选中数据
            checkedMlCreated: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlCreated: false,
            formMlCreated: {},
            rulesMlCreated: {
                billNo: [
                   { required: true, message: "批次号不能为空", trigger: "blur" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                priority: [
                   { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                currentProcessSeq: [
                   { required: true, message: "现工序不能为空", trigger: "blur" }
                ],
                currentProcessId: [
                   { required: true, message: "现工序码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantityDispatched: [
                   { required: true, message: "派工数量不能为空", trigger: "blur" }
                ],
                quantityAccepted: [
                   { required: true, message: "接收数量不能为空", trigger: "blur" }
                ],
                quantityScrap: [
                   { required: true, message: "报废数量不能为空", trigger: "blur" }
                ],
                quantityRedisp: [
                   { required: true, message: "重派数量不能为空", trigger: "blur" }
                ],
                quantityRework: [
                   { required: true, message: "返工数量不能为空", trigger: "blur" }
                ],
                quantityPending: [
                   { required: true, message: "待判数量不能为空", trigger: "blur" }
                ],
                quantityAod: [
                   { required: true, message: "特采次数不能为空", trigger: "blur" }
                ],
                quantitySplit: [
                   { required: true, message: "分批数量不能为空", trigger: "blur" }
                ],
                quantityOutput: [
                   { required: true, message: "产出数量不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键Wo数据 */
        this.getWoList();
        /** 查询外键WoComputing数据 */
        this.getMpsList();
        /** 查询外键Ml数据 */
        this.getMlList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlDispatching(this.queryParams).then(response => {
              this.mlDispatchingList = response.rows;
              this.total = response.total;
              if (this.mlDispatchingList && this.mlDispatchingList.length>0) {
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
                this.getMlCreatedList();
            }else {
                this.mlCreatedList = null;
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
        /** 查询外键Process数据 */
        getProcessList() {
            listProcess().then(res => {
                this.fkProcessList = res.rows;
            });
        },
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
            });
        },
        /** 查询外键Workgroup数据 */
        getWorkgroupList() {
            listWorkgroup().then(res => {
                this.fkWorkgroupList = res.rows;
            });
        },
        /** 查询外键Project数据 */
        getProjectList() {
            listProject().then(res => {
                this.fkProjectList = res.rows;
            });
        },
        /** 查询外键Wo数据 */
        getWoList() {
            listWo().then(res => {
                this.fkWoList = res.rows;
            });
        },
        /** 查询外键WoComputing数据 */
        getMpsList() {
            listMps().then(res => {
                this.fkMpsList = res.rows;
            });
        },
        /** 查询外键Ml数据 */
        getMlList() {
            listMl().then(res => {
                this.fkMlList = res.rows;
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
            className = "fontSize:12px; color:lightgreen; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==8) {
            className = "fontSize:12px; color:green; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==12) {
            className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==13) {
            className = "fontSize:12px; color:red; padding:1px 0px;";
          }

          return className;
        },
        /**主表外键LineId被选择后触发事件*/
        onLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.lineId = item.id
                }
            });
        },
        /**主表外键MpsId被选择后触发事件*/
        onMpsIdSelection(fkId){
            this.fkWoComputingList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mpsId = item.id
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
        /** 子表外键CurrentProcessId被选择后触发事件 **/
        onMlCreatedCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.currentProcessId = item.id
                }
            });
        },
        /** 子表外键CurrentWorkgroupId被选择后触发事件 **/
        onMlCreatedCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.currentWorkgroupId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlCreatedUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.unitId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMlCreatedLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.lineId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onMlCreatedProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.projectId = item.id
                }
            });
        },
        /** 子表外键SourceMlId被选择后触发事件 **/
        onMlCreatedSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.sourceMlId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onMlCreatedWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.woId = item.id
                }
            });
        },
        /** 子表外键StartBy被选择后触发事件 **/
        onMlCreatedStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.startBy = item.userId
                }
            });
        },
        /** 子表外键FinishBy被选择后触发事件 **/
        onMlCreatedFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlCreated.startBy = item.userId
                }
            });
        },

        /** 重设主表的批派对话框数据 */
        resetdispatchMultipleMl (){
            this.form = {
                quantityAvailable: null,
                quantityAssigning: null,
                deliveryDay: null,
                priority: null,
                remark: null,
            };
            this.resetForm("form");
        },
        /** 重设主表的单派对话框数据 */
        resetdispatchSingleMl (){
            this.form = {
                quantityAvailable: null,
                quantityAssigning: null,
                deliveryDay: null,
                priority: null,
                remark: null,
            };
            this.resetForm("form");
        },
        handleDispatchMultipleMl(row) {
            this.resetdispatchMultipleMl();
            this.opendispatchMultipleMl = true;
            this.title = "成批派工";
        },
        handleDispatchSingleMl(row) {
            const id = row.id || this.ids;
            getMlDispatching(id).then(response => {
                this.form = response.data;
                this.form.quantityAvailable = this.form.quantityPlanned - this.form.quantityAssigned;
                this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.$set(this.form, "deliveryDay", this.form.promiseDay);
                this.opendispatchSingleMl = true;
                this.title = "单批派工";
            });
        },

      /** 提交按钮 */
      submitdispatchMultipleMl() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.deliveryDay==null || this.form.priority==null){
              this.$modal.confirm('生产交期或优先级为空，将抄用工单默认值，确定吗？').then(function() {
              }).then(response => {
                this.form.params = {"deliveryDay":this.form.deliveryDay,"priority":this.form.priority};
                dispatchMultipleMl(this.ids, this.form)
                .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.opendispatchMultipleMl = false;
                    this.getMasterList();
                });
              });
            }else{
              this.form.params = {"deliveryDay":this.form.deliveryDay,"priority":this.form.priority};
              dispatchMultipleMl(this.ids, this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.opendispatchMultipleMl = false;
                  this.getMasterList();
                });
            }
          }
        });
      },
      // 取消按钮
      canceldispatchMultipleMl() {
        this.opendispatchMultipleMl = false;
        this.resetdispatchMultipleMl();
      },

        /** 提交按钮 */
        submitdispatchSingleMl() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.quantityAssigning<=this.form.quantityAvailable && this.form.quantityAssigning>0){
                  this.form.params = {"quantityAssigning":this.form.quantityAssigning,"deliveryDay":this.form.deliveryDay,"priority":this.form.priority};

                  dispatchSingleMl(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.opendispatchSingleMl = false;
                      this.getMasterList();
                  });
                }else{
                  this.$modal.msgError("派工数量必须大于0且小于等于可派工数量");
                }
              }
          });
        },
        // 取消按钮
        canceldispatchSingleMl() {
            this.opendispatchSingleMl = false;
            this.resetdispatchSingleMl();
        },
        /** 查询子表新派批次数据 */
        getMlCreatedList() {
            var params = {"woId":this.masterId};
            listMlCreated(params).then(res => {
                this.mlCreatedList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlCreatedSelectionChange(selection) {
            this.idsMlCreated = selection.map(item => item.id)
            this.captionsMlCreated = selection.map(item => item.billNo)
            this.singleMlCreated = selection.length!==1
            this.multipleMlCreated = !selection.length
        },
        /** 子表新派批次的CSS行样式 */
        rowClassNameMlCreated({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlCreated.includes(row.id)){
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
