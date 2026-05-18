<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="toolCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工具编号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.toolCode"
                    placeholder="请输入工具编号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="toolDesc" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工具描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.toolDesc"
                    placeholder="请输入工具描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="toolType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工具类型</strong></span>
                </span>
                <el-select v-model="queryParams.toolType" placeholder="请选择工具类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.res_tool_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="lineId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产线</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.lineId" placeholder="请选择产线" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkLineList"
                    :key="index"
                    :label="fkrow.lineName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="buyDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.buyDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择采购日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="isBusy" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>在制否</strong></span>
                </span>
                <el-select v-model="queryParams.isBusy" placeholder="请选择在制否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="wsNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出工单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.wsNo"
                    placeholder="请输入批次号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="mlNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>制造批号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.mlNo"
                    placeholder="请输入制造批号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="processId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>工序</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.processId" placeholder="请选择工序" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkProcessList"
                    :key="index"
                    :label="fkrow.processCode+' '+fkrow.processName"
                    :value="fkrow.id"
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
                <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="toolList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="工具编号" align="left" prop="toolCode" width="140"/>
            <el-table-column label="工具描述" align="left" prop="toolDesc" width="140"/>
            <el-table-column label="工具类型" align="left" prop="toolType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_tool_type" :value="scope.row.toolType"/>
                </template>
            </el-table-column>
            <el-table-column label="产线" align="left" prop="lineId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="采购日期" align="center" prop="buyDay" width="110">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.buyDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="在制否" align="center" prop="isBusy" width="80">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isBusy"/>
                </template>
            </el-table-column>
            <el-table-column label="出工单号" align="left" prop="wsNo" width="140"/>
            <el-table-column label="制造批号" align="left" prop="mlNo" width="140"/>
            <el-table-column label="工序号" align="center" prop="processSeq" width="60"/>
            <el-table-column label="工序名" align="left" prop="processId"  width="160">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processName+" "+item.processName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="始制时间" align="center" prop="ioTime" width="140">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.ioTime, '{y}-{m}-{d} {h}:{i}') }}</span>
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
import { listTool, getTool, delTool, addTool, updateTool } from "@/api/res/tool";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";

export default {
    name: "Tool",
    dicts: ['res_tool_type', 'sys_yes_no'],
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
        // 工具管理表格数据
        toolList: [],
        fkProcessList: [],
        fkLineList: [],
        // 查询参数
        queryParams: {
          pageEnable:true,
          pageNum: 1,
          pageSize: 20,
          toolCode: null,
          toolDesc: null,
          toolType: null,
          lineId: null,
          buyDay: null,
          isBusy: null,
          ioTime: null,
          wsId: null,
          wsNo: null,
          mlId: null,
          mlNo: null,
          processSeq: null,
          processId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            toolCode: [
                { required: true, message: "工具编号不能为空", trigger: "blur" }
            ],
            toolDesc: [
                { required: true, message: "工具描述不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Process数据 */
          this.getProcessList();
          /** 查询外键Line数据 */
          this.getLineList();
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

/**主表外键LineId被选择后触发事件*/
        onLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.lineId = item.id
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

        /** 查询工具管理列表 */
        getList() {
            this.loading = true;
        listTool(this.queryParams).then(response => {
          this.toolList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
        reset (){
            this.form = {
              id: null,
              toolCode: null,
              toolDesc: null,
              toolType: null,
              lineId: null,
              buyDay: null,
              isBusy: null,
              ioTime: null,
              wsId: null,
              wsNo: null,
              mlId: null,
              mlNo: null,
              processSeq: null,
              processId: null,
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
            this.captions = selection.map(item => item.processSeq)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getTool(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const processSeqz = row.processSeq || this.captions;
            this.$modal.confirm('确认删除工序号为"' + processSeqz + '"的数据项？').then(function() {
              return delTool(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/tool/export', {
             ...this.queryParams
             }, `tool_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateTool(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addTool(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
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
