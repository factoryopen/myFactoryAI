<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>批次号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入批次号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <el-input
                  v-model="queryParams.status"
                  v-show="false"
                />
            </el-form-item>
            <el-form-item prop="processProgress" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序进度</strong></span>
                </span>
                <el-select v-model="queryParams.processProgress" placeholder="请选择工序进度" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.manufacturing_status_move"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
            <el-form-item prop="scheduleDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>上线日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.scheduleDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择上线日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="deliveryDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>生产交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.deliveryDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择生产交期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="mlType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>批次类型</strong></span>
                </span>
                <el-select v-model="queryParams.mlType" placeholder="请选择批次类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.pln_ml_type"
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
                  height="610px"
                  :data="mlTraceList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  @row-dblclick="handleMasterCellDblclick"
                  :cell-style="cellStyle"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="批次号" align="left" prop="billNo"  width="140" show-overflow-tooltip/>
            <el-table-column label="产品编码" align="left" prop="productCode"  width="168" show-overflow-tooltip/>
            <el-table-column label="产品名称" align="left" prop="productName"  width="168" show-overflow-tooltip/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_ml" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="工序进度" align="center" prop="processProgress" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.processProgress"/>
                </template>
            </el-table-column>
            <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
            <el-table-column label="现工序" align="center" prop="currentProcessSeq"  width="60"/>
            <el-table-column label="现工序名" align="center" prop="currentProcessId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.currentProcessId"
                            :key="index"
                            size="mini">{{item.processName}}</span>
                    </template>
                </template>
            </el-table-column>
          <el-table-column label="现产线名" align="center" prop="lineId"  width="90">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                              :key="index"
                              size="mini">{{item.lineName}}</span>
              </template>
            </template>
          </el-table-column>
            <el-table-column label="现班组" align="center" prop="currentWorkgroupId"  width="90">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.currentWorkgroupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="派工数量" align="right" prop="quantityDispatched"  width="70"/>
            <el-table-column label="接收数量" align="right" prop="quantityAccepted"  width="70"/>
            <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="70"/>
            <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="70"/>
            <el-table-column label="返工数量" align="right" prop="quantityRework"  width="70"/>
            <el-table-column label="待判数量" align="right" prop="quantityPending"  width="70"/>
            <el-table-column label="特采次数" align="right" prop="quantityAod"  width="70"/>
            <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="70"/>
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
            <el-table-column label="批次类型" align="center" prop="mlType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                </template>
            </el-table-column>
           </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

      <!-- 创建master.openProcessMoves对话框 -->
      <el-dialog :title="title" class="dialogPopview" :visible.sync="openProcessMoves" width="1400px" height="900px" append-to-body>
        <el-table ref="processMovesTable" v-loading="loading" border width="100%" height="600px"
                  :data="fkProcessMovesList"
                  :row-class-name="rowClassName"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="工序号" align="center" prop="processSeq"  width="65"/>
          <el-table-column label="产线" align="center" prop="lineId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkLineList">
                      <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="工序名" align="center" prop="processId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                              :key="index"
                              size="mini">{{item.processName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center" prop="unitId"  width="55">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{item.unitName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="接收数量" align="right" prop="quantityReceive"  width="80"/>
          <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="80"/>
          <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="80"/>
          <el-table-column label="返工数量" align="right" prop="quantityRework"  width="80"/>
          <el-table-column label="待判数量" align="right" prop="quantityPending"  width="80"/>
          <el-table-column label="特采次数" align="right" prop="quantityAod"  width="80"/>
          <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="80"/>
          <el-table-column label="转出数量" align="right" prop="quantityPost"  width="80"/>
          <el-table-column label="接收时间" align="center" prop="receiveTime" width="112">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.receiveTime, '{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="接收人" align="center" prop="receiveBy"  width="70">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUserList">
                <span v-if="item.userId==scope.row.receiveBy" :key="index" size="mini">{{item.nickName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="转出时间" align="center" prop="postTime" width="112">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.postTime, '{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转出人" align="center" prop="postBy"  width="70">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUserList">
                <span v-if="item.userId==scope.row.postBy" :key="index" size="mini">{{item.nickName}} </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

        <el-tabs>
            <el-tab-pane label="制造批次尾情">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlHistoryTail" border
                        :data="mlHistoryTailList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlHistoryTail"
                        @selection-change="handleMlHistoryTailSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
                    <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
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
                    <el-table-column label="工单" align="left" prop="woId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWoList">
                                <span v-if="item.id==scope.row.woId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="派工时间" align="center" prop="dispatchingTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.dispatchingTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="派工人" align="right" prop="dispatchingBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.dispatchingBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="接收时间" align="center" prop="acceptingTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.acceptingTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="接收人" align="right" prop="acceptingBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.acceptingBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="请入库时间" align="center" prop="stockreqTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.stockreqTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="请入库人" align="right" prop="stockreqBy" width="70"/>
                    <el-table-column label="入库时间" align="center" prop="stockinTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.stockinTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="入库人" align="right" prop="stockinBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.stockinBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
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
import { listMlTrace, getMlTrace, delMlTrace, addMlTrace, updateMlTrace } from "@/api/exe/mlTrace";
import { listMlHistoryTail, getMlHistoryTail, delMlHistoryTail, addMlHistoryTail, updateMlHistoryTail } from "@/api/exe/mlHistoryTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listWo} from "@/api/pln/wo";
import { listMl} from "@/api/pln/ml";
import {listProcessMoves} from "@/api/exe/processMoves";

export default {
    name: "MlTrace",
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'bill_priority', 'pln_ml_type'],
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
            // 在制批次跟踪表格数据
            mlTraceList: [],
            fkProcessMovesList:[],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkLineList: [],
            fkWorkgroupList: [],
            fkProjectList: [],
            fkWoList: [],
            fkMlList: [],
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
            formProcessMoves: {},
            openProcessMoves: false, //工序作业弹出框
            openpreview: false,
            rulespreview: {},
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 20,
              billNo: null,
              productId: null,
              productName: null,
              productSpec: null,
              status: null,
              processProgress: null,
              priority: null,
              currentProcessId: null,
              currentWorkgroupId: null,
              scheduleDay: null,
              deliveryDay: null,
              lineId: null,
              projectId: null,
              mlType: null,
              sourceMlId: null,
              woId: null,
            },
            //子表信息
            mlHistoryTailList:[],
            // 选中数组
            idsMlHistoryTail: [],
            captionsMlHistoryTail: [],
            // 非单个禁用
            singleMlHistoryTail: true,
            // 非多个禁用
            multipleMlHistoryTail: true,
            // 子表选中数据
            checkedMlHistoryTail: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlHistoryTail: false,
            formMlHistoryTail: {},
            rulesMlHistoryTail: {
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
        /** 查询外键Ml数据 */
        this.getMlList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlTrace(this.queryParams).then(response => {
              this.mlTraceList = response.rows;
              this.total = response.total;
              if (this.mlTraceList && this.mlTraceList.length>0) {
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
                this.getMlHistoryTailList();
            }else {
                this.mlHistoryTailList = null;
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
        /** 捕捉对主表格的双击操作 */
        handleMasterCellDblclick(row, event) {
          this.formProcessMoves.mlId = row.id;
          listProcessMoves(this.formProcessMoves).then(res => {
            this.fkProcessMovesList = res.rows;
            this.title="工序移转记录["+row.billNo+"]";
            this.openProcessMoves=true;
          });
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

          if (columnIndex==4 && row.status==4) {
            className = "fontSize:12px; fontWeight:bold; color:orange; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==5) {
            className = "fontSize:12px; fontWeight:bold; color:blue; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==8) {
            className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==9) {
            className = "fontSize:12px; fontWeight:bold; color:green; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==11) {
            className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==13) {
            className = "fontSize:12px; color:darkred; padding:1px 0px;";
          }

          return className;
        },
        /**主表外键CurrentProcessId被选择后触发事件*/
        onCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currentProcessId = item.id
                }
            });
        },
        /**主表外键CurrentWorkgroupId被选择后触发事件*/
        onCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currentWorkgroupId = item.id
                }
            });
        },
        /**主表外键UnitId被选择后触发事件*/
        onUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.unitId = item.id
                }
            });
        },
        /**主表外键LineId被选择后触发事件*/
        onLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.lineId = item.id
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
        /**主表外键SourceMlId被选择后触发事件*/
        onSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                    this.form.sourceMlId = item.id
                }
            });
        },
        /**主表外键WoId被选择后触发事件*/
        onWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.woId = item.id
                }
            });
        },
        /**主表外键DispatchingBy被选择后触发事件*/
        onDispatchingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键AcceptingBy被选择后触发事件*/
        onAcceptingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键StartBy被选择后触发事件*/
        onStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键FinishBy被选择后触发事件*/
        onFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键StockinBy被选择后触发事件*/
        onStockinBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /** 子表外键CurrentProcessId被选择后触发事件 **/
        onMlHistoryTailCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.currentProcessId = item.id
                }
            });
        },
        /** 子表外键CurrentWorkgroupId被选择后触发事件 **/
        onMlHistoryTailCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.currentWorkgroupId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlHistoryTailUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.unitId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMlHistoryTailLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.lineId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onMlHistoryTailProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.projectId = item.id
                }
            });
        },
        /** 子表外键SourceMlId被选择后触发事件 **/
        onMlHistoryTailSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.sourceMlId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onMlHistoryTailWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.woId = item.id
                }
            });
        },
        /** 子表外键DispatchingBy被选择后触发事件 **/
        onMlHistoryTailDispatchingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键AcceptingBy被选择后触发事件 **/
        onMlHistoryTailAcceptingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键StartBy被选择后触发事件 **/
        onMlHistoryTailStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键FinishBy被选择后触发事件 **/
        onMlHistoryTailFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键StockinBy被选择后触发事件 **/
        onMlHistoryTailStockinBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },

        handleExport() {
            this.download('exe/mlTrace/export', {
              ...this.queryParams
            }, `mlTrace_${new Date().getTime()}.xlsx`)
        },

        /** 查询子表制造批次尾情数据 */
        getMlHistoryTailList() {
            var params = {"id":this.masterId};
            listMlHistoryTail(params).then(res => {
                this.mlHistoryTailList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlHistoryTailSelectionChange(selection) {
            this.idsMlHistoryTail = selection.map(item => item.id)
            this.captionsMlHistoryTail = selection.map(item => item.billNo)
            this.singleMlHistoryTail = selection.length!==1
            this.multipleMlHistoryTail = !selection.length
        },
        /** 子表制造批次尾情的CSS行样式 */
        rowClassNameMlHistoryTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlHistoryTail.includes(row.id)){
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
  .dialogPopview .el-dialog__body {
    padding: 0;
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
