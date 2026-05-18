<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入异常单号"
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
                        v-for="dict in dict.type.bill_status_processing"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="description" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.description"
                    placeholder="请输入异常描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini"
 :disabled="single"                     @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini"
 :disabled="multiple"                     @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini"
 :disabled="multiple"                     @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="exceptionReqList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="异常单号" align="center" prop="billNo" width="135"/>
            <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_processing" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="制造批" align="center" prop="mlId"  width="135">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品" align="left" prop="productId" width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
            <el-table-column label="工序号" align="center" prop="processSeq" width="60"/>
            <el-table-column label="产线" align="right" prop="lineId" width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="工序" align="right" prop="processId" width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="班组" align="right" prop="inspectGroupId" width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.inspectGroupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="异常描述" align="left" prop="description" width="300"/>
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-edit"
                              @click="handleUpdate(scope.row)"
                          >修改</el-button>
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-phone-outline"
                              @click="handleRequestDeal(scope.row)"
                          >请判</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
<!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>异常单号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入异常单号" size="mini" />
                </el-form-item>
                <el-form-item prop="mlId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>制造批</strong></span></span>
                    <el-select class="inputWidth" v-model="form.mlId" placeholder="请选择制造批"
                               @change="onMlIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMlTraceList"
                          :key="index"
                          :label="fkrow.billNo"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>产品</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkProductBasisList"
                          :key="index"
                          :label="fkrow.materialCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品名称</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMlTraceList"
                        :key="index"
                        :label="fkrow.productName"
                        :value="fkrow.productName"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMlTraceList"
                        :key="index"
                        :label="fkrow.productSpec"
                        :value="fkrow.productSpec"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="processSeq" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>工序号</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.processSeq" placeholder="请选择工序号" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMlTraceList"
                        :key="index"
                        :label="fkrow.currentProcessSeq"
                        :value="fkrow.currentProcessSeq"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="lineId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>产线</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.lineId" placeholder="请选择产线" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkLineList"
                          :key="index"
                          :label="fkrow.lineName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="processId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>工序</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processId" placeholder="请选择工序" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkProcessList"
                          :key="index"
                          :label="fkrow.processCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="inspectGroupId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>班组</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.inspectGroupId" placeholder="请选择班组" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkWorkgroupList"
                          :key="index"
                          :label="fkrow.groupName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="description" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>异常描述</strong></span></span>
                     <el-input class="inputWidth" v-model="form.description" placeholder="请输入异常描述" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
                     <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getNextBillno, updateBillSeq } from "@/api/exe/exceptionReq";
import { listExceptionReq, getExceptionReq, delExceptionReq, addExceptionReq, updateExceptionReq } from "@/api/exe/exceptionReq";
import { requestDeal } from "@/api/exe/exceptionReq";
import { listUser} from "@/api/system/user";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listExceptionCategorytype} from "@/api/eng/exceptionCategorytype";
import { listExceptionReasontype} from "@/api/eng/exceptionReasontype";
import { listExceptionSolutiontype} from "@/api/eng/exceptionSolutiontype";

export default {
    name: "ExceptionReq",
    dicts: ['bill_status_processing', 'eng_exeption_dealtype'],
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
        // 工艺异常登记表格数据
        exceptionReqList: [],
        fkUserList: [],
        fkDeptList: [],
        fkProcessList: [],
        fkLineList: [],
        fkWorkgroupList: [],
        fkProductBasisList: [],
        fkMlTraceList: [],
        fkExceptionCategorytypeList: [],
        fkExceptionReasontypeList: [],
        fkExceptionSolutiontypeList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          mlId: null,
          productId: null,
          productName: null,
          productSpec: null,
          processSeq: null,
          lineId: null,
          processId: null,
          inspectGroupId: null,
          description: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            billNo: [
                { required: true, message: "异常单号不能为空", trigger: "blur" }
            ],
            status: [
                { required: true, message: "状态不能为空", trigger: "change" }
            ],
            mlId: [
                { required: true, message: "制造批ID不能为空", trigger: "blur" }
            ],
            productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
            ],
            description: [
                { required: true, message: "异常描述不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键User数据 */
          this.getUserList();
          /** 查询外键Dept数据 */
          this.getDeptList();
          /** 查询外键Process数据 */
          this.getProcessList();
          /** 查询外键Line数据 */
          this.getLineList();
          /** 查询外键Workgroup数据 */
          this.getWorkgroupList();
          /** 查询外键ProductBasis数据 */
          this.getProductBasisList();
          /** 查询外键MlTrace数据 */
          this.getMlTraceList();
          /** 查询外键ExceptionCategorytype数据 */
          this.getExceptionCategorytypeList();
          /** 查询外键ExceptionReasontype数据 */
          this.getExceptionReasontypeList();
          /** 查询外键ExceptionSolutiontype数据 */
          this.getExceptionSolutiontypeList();
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
          /** 查询外键ExceptionCategorytype数据 */
      getExceptionCategorytypeList() {
        listExceptionCategorytype().then(res => {
          this.fkExceptionCategorytypeList = res.rows;
        });
      },
          /** 查询外键ExceptionReasontype数据 */
      getExceptionReasontypeList() {
        listExceptionReasontype().then(res => {
          this.fkExceptionReasontypeList = res.rows;
        });
      },
          /** 查询外键ExceptionSolutiontype数据 */
      getExceptionSolutiontypeList() {
        listExceptionSolutiontype().then(res => {
          this.fkExceptionSolutiontypeList = res.rows;
        });
      },

/**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                    this.form.productId = item.productId
                    this.form.productName = item.productName
                    this.form.productSpec = item.productSpec
                    this.form.processSeq = item.currentProcessSeq
                    this.form.lineId = item.lineId
                    this.form.processId = item.currentProcessId
                    this.form.inspectGroupId = item.currentWorkgroupId
                }
            });
        },
/**主表外键InspectDeptId被选择后触发事件*/
        onInspectDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectDeptId = item.dept_id
                }
            });
        },
/**主表外键InspectBy被选择后触发事件*/
        onInspectBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectBy = item.userId
                }
            });
        },
/**主表外键CategoryId被选择后触发事件*/
        onCategoryIdSelection(fkId){
            this.fkExceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.categoryId = item.id
                }
            });
        },
/**主表外键ReasonTypeId被选择后触发事件*/
        onReasonTypeIdSelection(fkId){
            this.fkExceptionReasontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.reasonTypeId = item.id
                }
            });
        },
/**主表外键SolutionTypeId被选择后触发事件*/
        onSolutionTypeIdSelection(fkId){
            this.fkExceptionSolutiontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.solutionTypeId = item.id
                }
            });
        },
/**主表外键DutyOwnerId被选择后触发事件*/
        onDutyOwnerIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectBy = item.userId
                }
            });
        },
/**主表外键DutyLineId被选择后触发事件*/
        onDutyLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dutyLineId = item.id
                }
            });
        },
/**主表外键DutyProcessId被选择后触发事件*/
        onDutyProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dutyProcessId = item.id
                }
            });
        },
/**主表外键DutyGroupId被选择后触发事件*/
        onDutyGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dutyGroupId = item.id
                }
            });
        },
/**主表外键DealDeptId被选择后触发事件*/
        onDealDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectDeptId = item.dept_id
                }
            });
        },
/**主表外键DealBy被选择后触发事件*/
        onDealBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectBy = item.userId
                }
            });
        },

        /** 查询工艺异常登记列表 */
        getList() {
            this.loading = true;
        listExceptionReq(this.queryParams).then(response => {
          this.exceptionReqList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              billNo: null,
              status: null,
              mlId: null,
              productId: null,
              productName: null,
              productSpec: null,
              processSeq: null,
              lineId: null,
              processId: null,
              inspectGroupId: null,
              description: null,
              inspectDeptId: null,
              inspectBy: null,
              inspectTime: null,
              dealType: null,
              categoryId: null,
              reasonTypeId: null,
              solutionTypeId: null,
              reasonDesc: null,
              solutionDesc: null,
              dutyOwnerId: null,
              dutyLineId: null,
              dutyProcessId: null,
              dutyGroupId: null,
              dealDeptId: null,
              dealBy: null,
              dealTime: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              billNo: null,
              status: null,
              mlId: null,
              productId: null,
              productName: null,
              productSpec: null,
              processSeq: null,
              lineId: null,
              processId: null,
              inspectGroupId: null,
              description: null,
              inspectDeptId: null,
              inspectBy: null,
              inspectTime: null,
              dealType: null,
              categoryId: null,
              reasonTypeId: null,
              solutionTypeId: null,
              reasonDesc: null,
              solutionDesc: null,
              dutyOwnerId: null,
              dutyLineId: null,
              dutyProcessId: null,
              dutyGroupId: null,
              dealDeptId: null,
              dealBy: null,
              dealTime: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              billNo: null,
              status: null,
              mlId: null,
              productId: null,
              productName: null,
              productSpec: null,
              processSeq: null,
              lineId: null,
              processId: null,
              inspectGroupId: null,
              description: null,
              inspectDeptId: null,
              inspectBy: null,
              inspectTime: null,
              dealType: null,
              categoryId: null,
              reasonTypeId: null,
              solutionTypeId: null,
              reasonDesc: null,
              solutionDesc: null,
              dutyOwnerId: null,
              dutyLineId: null,
              dutyProcessId: null,
              dutyGroupId: null,
              dealDeptId: null,
              dealBy: null,
              dealTime: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
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

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增工艺异常登记";
            getNextBillno("${billId}").then(res => {
                this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getExceptionReq(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改工艺异常登记";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除异常单号为"' + billNoz + '"的数据项？').then(function() {
              return delExceptionReq(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('exe/exceptionReq/export', {
             ...this.queryParams
             }, `exceptionReq_${new Date().getTime()}.xlsx`)
        },
        handleRequestDeal(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定请判 异常单号为"' + billNoz + '"的数据项吗？').then(function() {
                 return requestDeal(ids);
            }).then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
            }).catch(error => {
                this.$modal.msgError(error.msg);
            });
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateExceptionReq(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addExceptionReq(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                  updateBillSeq("${billId}").then(res => {});
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
