<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.manufacturing_status_move"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="lineType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产线类型</strong></span>
                </span>
                <el-select v-model="queryParams.lineType" placeholder="请选择产线类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.res_type_line"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="processType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序类型</strong></span>
                </span>
                <el-select v-model="queryParams.processType" placeholder="请选择工序类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_process_type"
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
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="mlMovesList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="制造批" align="left" prop="mlId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
                    <el-table-column label="工序号" align="center" prop="processSeq"  width="60"/>
                <el-table-column label="工序码" align="center" prop="processId"  width="75">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="产线" align="center" prop="lineId"  width="75">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
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
                <el-table-column label="接收数量" align="right" prop="quantityReceive"  width="75"/>
                <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="75"/>
                <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="75"/>
                <el-table-column label="返工数量" align="right" prop="quantityRework"  width="75"/>
                <el-table-column label="待判数量" align="right" prop="quantityPending"  width="75"/>
                <el-table-column label="特采次数" align="right" prop="quantityAod"  width="75"/>
                <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="75"/>
                <el-table-column label="转出数量" align="right" prop="quantityPost"  width="75"/>
                  <el-table-column label="产线类型" align="center" prop="lineType" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_type_line" :value="scope.row.lineType"/>
                </template>
            </el-table-column>
              <el-table-column label="工序类型" align="center" prop="processType" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
                </template>
            </el-table-column>
                <el-table-column label="部门" align="center" prop="deptId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="班组" align="center" prop="groupId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.groupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
                    </template>
                </template>
            </el-table-column>
                              <el-table-column label="接收时间" align="center" prop="receiveTime" width="120">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
                <el-table-column label="接收人" align="center" prop="receiveBy"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.receiveBy"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="转出时间" align="center" prop="postTime" width="120">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.postTime, '{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
                <el-table-column label="转出人" align="center" prop="postBy"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.postBy"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
                </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>


        <el-tabs>
            <el-tab-pane label="工序出工">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="processWork" border
                        :data="processWorkList"
                        highlight-current-row
                        :row-class-name="rowClassNameProcessWork"
                        @selection-change="handleProcessWorkSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="开工单号" align="center" prop="billNo" width="125"/>
                    <el-table-column label="状态" align="center" prop="status" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.manufacturing_status_worksegment" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProductBasisList">
                                <span v-if="item.id==scope.row.productId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="工序号" align="right" prop="processSeq" width="60"/>
                    <el-table-column label="工序" align="center" prop="processId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.processId"
                                    :key="index"
                                    size="mini">{{item.processCode}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="出工日期" align="center" prop="workDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.workDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="班别" align="center" prop="workShifitId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkShiftList">
                                <span v-if="item.id==scope.row.workShifitId"
                                    :key="index"
                                    size="mini">{{item.shiftDesc}}
                                </span>
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
                    <el-table-column label="出工数量" align="right" prop="quantityStart" width="80"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="80"/>
                    <el-table-column label="分批数量" align="right" prop="quantitySplit" width="110"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="80"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="80"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="80"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="80"/>
                    <el-table-column label="完工数量" align="right" prop="quantityFinish" width="80"/>
                    <el-table-column label="出工时间" align="center" prop="startTime" width="140">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="出工人" align="center" prop="startBy"  width="90">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.startBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="收工时间" align="center" prop="finishTime" width="140">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.finishTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="收工人" align="center" prop="finishBy"  width="90">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.finishBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工序移转记尾情">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="processMovesTail" border
                        :data="processMovesTailList"
                        highlight-current-row
                        :row-class-name="rowClassNameProcessMovesTail"
                        @selection-change="handleProcessMovesTailSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="60"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="60"/>
                    <el-table-column label="部门" align="center" prop="deptId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkDeptList">
                                <span v-if="item.deptId==scope.row.deptId"
                                    :key="index"
                                    size="mini">{{item.deptName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="班组" align="center" prop="groupId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWorkgroupList">
                                <span v-if="item.id==scope.row.groupId"
                                    :key="index"
                                    size="mini">{{item.groupName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="110"/>
                    <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="110"/>
                    <el-table-column label="备料秒数" align="right" prop="secondsRm" width="75"/>
                    <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="75"/>
                    <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="75"/>
                    <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="75"/>
                    <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="75"/>
                    <el-table-column label="接收时间" align="center" prop="receiveTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="接收人" align="center" prop="receiveBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.receiveBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="转出时间" align="center" prop="postTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.postTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="转出人" align="center" prop="postBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.postBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listMlMoves, getMlMoves, delMlMoves, addMlMoves, updateMlMoves } from "@/api/exe/mlMoves";
import { listProcessWork, getProcessWork, delProcessWork, addProcessWork, updateProcessWork } from "@/api/exe/processWork";
import { listProcessMovesTail, getProcessMovesTail, delProcessMovesTail, addProcessMovesTail, updateProcessMovesTail } from "@/api/exe/processMovesTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listShift} from "@/api/res/shift";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listMlHistory} from "@/api/exe/mlHistory";
import { listProcessMoves} from "@/api/exe/processMoves";

export default {
    name: "MlMoves",
    dicts: ['manufacturing_status_move', 'res_type_line', 'eng_process_type', 'manufacturing_status_worksegment'],
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
            // 历史移转查询表格数据
            mlMovesList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkProcessList: [],
            fkLineList: [],
            fkShiftList: [],
            fkWorkgroupList: [],
            fkProductBasisList: [],
            fkMlTraceList: [],
            fkMlHistoryList: [],
            fkProcessMovesList: [],
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
                mlId: [
                    { required: true, message: "制造批不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                productId: [
                    { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                quantityReceive: [
                    { required: true, message: "接收数量不能为空", trigger: "blur" }
                ],
                quantityPost: [
                    { required: true, message: "转出数量不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              mlId: null,
              status: null,
              productName: null,
              processId: null,
              lineType: null,
              processType: null,
              deptId: null,
              groupId: null,
              receiveBy: null,
              postBy: null,
            },
            //子表信息
            processWorkList:[],
            // 选中数组
            idsProcessWork: [],
            captionsProcessWork: [],
            // 非单个禁用
            singleProcessWork: true,
            // 非多个禁用
            multipleProcessWork: true,
            // 子表选中数据
            checkedProcessWork: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProcessWork: false,
            formProcessWork: {},
            rulesProcessWork: {
                moveId: [
                   { required: true, message: "移转ID不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                processSeq: [
                   { required: true, message: "工序号不能为空", trigger: "blur" }
                ],
                processId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantityStart: [
                   { required: true, message: "出工数量不能为空", trigger: "blur" }
                ],
                quantityScrap: [
                   { required: true, message: "报废数量不能为空", trigger: "blur" }
                ],
                quantitySplit: [
                   { required: true, message: "分批数量不能为空", trigger: "blur" }
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
                quantityFinish: [
                   { required: true, message: "完工数量不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            processMovesTailList:[],
            // 选中数组
            idsProcessMovesTail: [],
            captionsProcessMovesTail: [],
            // 非单个禁用
            singleProcessMovesTail: true,
            // 非多个禁用
            multipleProcessMovesTail: true,
            // 子表选中数据
            checkedProcessMovesTail: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProcessMovesTail: false,
            formProcessMovesTail: {},
            rulesProcessMovesTail: {
                deptId: [
                   { required: true, message: "部门不能为空", trigger: "blur" }
                ],
                secondsFixed: [
                   { required: true, message: "标准固定秒数不能为空", trigger: "blur" }
                ],
                secondsVariable: [
                   { required: true, message: "标准可变秒数不能为空", trigger: "blur" }
                ],
                secondsRm: [
                   { required: true, message: "备料秒数不能为空", trigger: "blur" }
                ],
                secondsSetup: [
                   { required: true, message: "架机秒数不能为空", trigger: "blur" }
                ],
                secondsStacking: [
                   { required: true, message: "堆垛秒数不能为空", trigger: "blur" }
                ],
                secondsTransfer: [
                   { required: true, message: "移转秒数不能为空", trigger: "blur" }
                ],
                secondsBuffer: [
                   { required: true, message: "缓冲秒数不能为空", trigger: "blur" }
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
        /** 查询外键Dept数据 */
        this.getDeptList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Shift数据 */
        this.getShiftList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键MlTrace数据 */
        this.getMlTraceList();
        /** 查询外键MlHistory数据 */
        this.getMlHistoryList();
        /** 查询外键ProcessMoves数据 */
        this.getProcessMovesList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlMoves(this.queryParams).then(response => {
              this.mlMovesList = response.rows;
              this.total = response.total;
              if (this.mlMovesList && this.mlMovesList.length>0) {
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
                this.getProcessWorkList();
                this.getProcessMovesTailList();
            }else {
                this.processWorkList = null;
                this.processMovesTailList = null;
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.data;
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
        /** 查询外键Shift数据 */
        getShiftList() {
            listShift().then(res => {
                this.fkShiftList = res.rows;
            });
        },
        /** 查询外键Workgroup数据 */
        getWorkgroupList() {
            listWorkgroup().then(res => {
                this.fkWorkgroupList = res.rows;
            });
        },
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
            });
        },
        /** 查询外键MlTrace数据 */
        getMlTraceList() {
            listMlTrace().then(res => {
                this.fkMlTraceList = res.rows;
            });
        },
        /** 查询外键MlHistory数据 */
        getMlHistoryList() {
            listMlHistory().then(res => {
                this.fkMlHistoryList = res.rows;
            });
        },
        /** 查询外键ProcessMoves数据 */
        getProcessMovesList() {
            listProcessMoves().then(res => {
                this.fkProcessMovesList = res.rows;
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
        /**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                }
            });
        },
        /**主表外键ProductId被选择后触发事件*/
        onProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id
                    this.form.productName = item.materialName
                    this.form.productSpec = item.materialSpec
                }
            });
        },
        /**主表外键ProcessId被选择后触发事件*/
        onProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.processId = item.id
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
        /**主表外键UnitId被选择后触发事件*/
        onUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.unitId = item.id
                }
            });
        },
        /**主表外键DeptId被选择后触发事件*/
        onDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.deptId = item.dept_id
                }
            });
        },
        /**主表外键GroupId被选择后触发事件*/
        onGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.groupId = item.id
                }
            });
        },
        /**主表外键ReceiveBy被选择后触发事件*/
        onReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.receiveBy = item.userId
                    this.form.postBy = item.userId
                }
            });
        },
        /**主表外键PostBy被选择后触发事件*/
        onPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.receiveBy = item.userId
                    this.form.postBy = item.userId
                }
            });
        },
        /** 子表外键MoveId被选择后触发事件 **/
        onProcessWorkMoveIdSelection(fkId){
            this.fkProcessMovesList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessWork.moveId = item.id
                    this.formProcessWork.productId = item.productId
                    this.formProcessWork.processSeq = item.processSeq
                    this.formProcessWork.processId = item.processId
                    this.formProcessWork.unitId = item.unitId
                    this.formProcessWork.groupId = item.groupId
                    this.formProcessWork.lineId = item.lineId
                    this.formProcessWork.deptId = item.deptId
                }
            });
        },
        /** 子表外键WorkShifitId被选择后触发事件 **/
        onProcessWorkWorkShifitIdSelection(fkId){
            this.fkShiftList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessWork.workShifitId = item.id
                }
            });
        },
        /** 子表外键StartBy被选择后触发事件 **/
        onProcessWorkStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessWork.startBy = item.userId
                }
            });
        },
        /** 子表外键FinishBy被选择后触发事件 **/
        onProcessWorkFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessWork.startBy = item.userId
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onProcessMovesTailMlIdSelection(fkId){
            this.fkMlHistoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.mlId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onProcessMovesTailProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.productId = item.id
                    this.formProcessMovesTail.productName = item.materialName
                    this.formProcessMovesTail.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onProcessMovesTailProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.processId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onProcessMovesTailLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.lineId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onProcessMovesTailUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.unitId = item.id
                }
            });
        },
        /** 子表外键DeptId被选择后触发事件 **/
        onProcessMovesTailDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.deptId = item.deptId
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onProcessMovesTailGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.groupId = item.id
                }
            });
        },
        /** 子表外键ReceiveBy被选择后触发事件 **/
        onProcessMovesTailReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.receiveBy = item.userId
                }
            });
        },
        /** 子表外键PostBy被选择后触发事件 **/
        onProcessMovesTailPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.receiveBy = item.userId
                }
            });
        },

        handleExport() {
            this.download('exe/mlMoves/export', {
              ...this.queryParams
            }, `mlMoves_${new Date().getTime()}.xlsx`)
        },

        /** 查询子表工序出工数据 */
        getProcessWorkList() {
            var params = {"moveId":this.masterId};
            listProcessWork(params).then(res => {
                this.processWorkList = res.rows;
            });
        },
        // 多选框选中数据
        handleProcessWorkSelectionChange(selection) {
            this.idsProcessWork = selection.map(item => item.id)
            this.captionsProcessWork = selection.map(item => item.billNo)
            this.singleProcessWork = selection.length!==1
            this.multipleProcessWork = !selection.length
        },
        /** 子表工序出工的CSS行样式 */
        rowClassNameProcessWork({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProcessWork.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }


            return clsName;
        },
        /** 查询子表工序移转记尾情数据 */
        getProcessMovesTailList() {
            var params = {"id":this.masterId};
            listProcessMovesTail(params).then(res => {
                this.processMovesTailList = res.rows;
            });
        },
        // 多选框选中数据
        handleProcessMovesTailSelectionChange(selection) {
            this.idsProcessMovesTail = selection.map(item => item.id)
            this.captionsProcessMovesTail = selection.map(item => item.productName)
            this.singleProcessMovesTail = selection.length!==1
            this.multipleProcessMovesTail = !selection.length
        },
        /** 子表工序移转记尾情的CSS行样式 */
        rowClassNameProcessMovesTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProcessMovesTail.includes(row.id)){
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
