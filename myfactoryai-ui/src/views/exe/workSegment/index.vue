<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>开工单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入开工单号"
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
                        v-for="dict in dict.type.manufacturing_status_worksegment"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="workDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出工日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.workDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择出工日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="quantityStart" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出工数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityStart"
                    placeholder="请输入出工数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityScrap" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>报废数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityScrap"
                    placeholder="请输入报废数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantitySplit" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>分批数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantitySplit"
                    placeholder="请输入分批数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityRedisp" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>重派数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityRedisp"
                    placeholder="请输入重派数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityRework" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>返工数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityRework"
                    placeholder="请输入返工数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityPending" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>待判数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityPending"
                    placeholder="请输入待判数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityAod" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>特采次数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityAod"
                    placeholder="请输入特采次数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantityFinish" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>完工数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityFinish"
                    placeholder="请输入完工数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="startTime" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出工时间</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择出工时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="finishTime" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>收工时间</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.finishTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择收工时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini"
 :disabled="multiple"                     @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="workSegmentList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="开工单号" align="center" prop="billNo" width="125"/>
            <el-table-column label="批次号" align="center" prop="moveId"  width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.moveId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_worksegment" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productId" width="168">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="工序号" align="right" prop="processSeq" width="60"/>
            <el-table-column label="工序" align="center" prop="processId" width="120">
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
                            size="mini">{{item.shiftDesc}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="单位" align="center" prop="unitId" width="50">
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
                            size="mini">{{item.nickName}}</span>
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
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="班组" align="center" prop="groupId" width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.groupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产线" align="center" prop="lineId" width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="部门" align="center" prop="deptId" width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
    </div>
</template>

<script>
import {getNextBillno, updateBillSeq } from "@/api/exe/workSegment";
import { listWorkSegment, getWorkSegment, delWorkSegment, addWorkSegment, updateWorkSegment } from "@/api/exe/workSegment";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listShift} from "@/api/res/shift";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listProcessMoves} from "@/api/exe/processMoves";

export default {
    name: "WorkSegment",
    dicts: ['manufacturing_status_worksegment'],
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
        // 显示搜索条件
        showSearch: false,
        // 总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 历史出工查询表格数据
        workSegmentList: [],
        fkUserList: [],
        fkUnitList: [],
        fkDeptList: [],
        fkProcessList: [],
        fkLineList: [],
        fkShiftList: [],
        fkWorkgroupList: [],
        fkProductBasisList: [],
        fkMlTraceList: [],
        fkProcessMovesList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          moveId: null,
          status: null,
          productId: null,
          processSeq: null,
          processId: null,
          workDay: null,
          workShifitId: null,
          unitId: null,
          quantityStart: null,
          quantityScrap: null,
          quantitySplit: null,
          quantityRedisp: null,
          quantityRework: null,
          quantityPending: null,
          quantityAod: null,
          quantityFinish: null,
          startTime: null,
          startBy: null,
          finishTime: null,
          finishBy: null,
          groupId: null,
          lineId: null,
          deptId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            moveId: [
                { required: true, message: "批次号不能为空", trigger: "blur" }
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
      };
    },
    created() {
      this.getList();
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
          /** 查询外键ProcessMoves数据 */
          this.getProcessMovesList();
    },
    methods: {
      /** 表格行样式 */
      rowClassName({ row, rowIndex }) {
          var className = ''
          if (this.ids.includes(row.id)){
            className = 'selected-row';
          }
          else if (row.priority == 1) {
            className = 'super-urgent-row';
          } else if (row.priority == 2) {
            className = 'urgent-row';
          }


        return className;
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
          /** 查询外键ProcessMoves数据 */
      getProcessMovesList() {
        listProcessMoves().then(res => {
          this.fkProcessMovesList = res.rows;
        });
      },

/**主表外键MoveId被选择后触发事件*/
        onMoveIdSelection(fkId){
            this.fkProcessMovesList.forEach(item=>{
                if(fkId === item.id){
                    this.form.moveId = item.id
                    this.form.productId = item.productId
                    this.form.processSeq = item.processSeq
                    this.form.processId = item.processId
                    this.form.unitId = item.unitId
                    this.form.groupId = item.groupId
                    this.form.lineId = item.lineId
                    this.form.deptId = item.deptId
                }
            });
        },
/**主表外键WorkShifitId被选择后触发事件*/
        onWorkShifitIdSelection(fkId){
            this.fkShiftList.forEach(item=>{
                if(fkId === item.id){
                    this.form.workShifitId = item.id
                }
            });
        },
/**主表外键StartBy被选择后触发事件*/
        onStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.startBy = item.userId
                }
            });
        },
/**主表外键FinishBy被选择后触发事件*/
        onFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.startBy = item.userId
                }
            });
        },

        /** 查询历史出工查询列表 */
        getList() {
            this.loading = true;
        listWorkSegment(this.queryParams).then(response => {
          this.workSegmentList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },


        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
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

        handleExport() {
            this.download('exe/workSegment/export', {
             ...this.queryParams
             }, `workSegment_${new Date().getTime()}.xlsx`)
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
