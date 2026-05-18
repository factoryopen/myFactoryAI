<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="processCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.processCode"
                    placeholder="请输入工序编码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="processName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.processName"
                    placeholder="请输入工序名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="categoryId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>制程段</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.categoryId" placeholder="请选择制程段" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkProcessCategoryList"
                    :key="index"
                    :label="fkrow.categoryName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
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
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="720px"
                  :data="processList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="制程段" align="center" prop="categoryId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                            :key="index"
                            size="mini">{{item.categoryName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" prop="processSeq" width="60"/>
            <el-table-column label="工序编码" align="left" prop="processCode" width="120"/>
            <el-table-column label="工序名称" align="left" prop="processName" width="120"/>
            <el-table-column label="备注" align="left" prop="remark"/>
            <el-table-column label="工序类型" align="center" prop="processType" width="80">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
                </template>
            </el-table-column>
            <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="110"/>
            <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="110"/>
            <el-table-column label="备料秒数" align="right" prop="secondsRm" width="90"/>
            <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="90"/>
            <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="90"/>
            <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="90"/>
            <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="90"/>
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
                              icon="el-icon-delete"
                              @click="handleDelete(scope.row)"
                          >删除</el-button>
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
                <el-form-item  prop="processCode" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>工序编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.processCode" placeholder="请输入工序编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="processName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>工序名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.processName" placeholder="请输入工序名称" size="mini" />
                </el-form-item>
                <el-form-item prop="categoryId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>制程段</strong></span></span>
                    <el-select class="inputWidth" v-model="form.categoryId" placeholder="请选择制程段"
                               @change="onCategoryIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkProcessCategoryList"
                          :key="index"
                          :label="fkrow.categoryName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="processSeq" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>序号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.processSeq" placeholder="请输入序号" size="mini" />
                </el-form-item>
                <el-form-item  prop="processType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>工序类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processType" placeholder="请选择工序类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_process_type"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="secondsFixed" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>标准固定秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsFixed" placeholder="请输入标准固定秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsVariable" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>标准可变秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsVariable" placeholder="请输入标准可变秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsRm" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备料秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsRm" placeholder="请输入备料秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsSetup" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>架机秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsSetup" placeholder="请输入架机秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsStacking" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>堆垛秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsStacking" placeholder="请输入堆垛秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsTransfer" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>移转秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsTransfer" placeholder="请输入移转秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="secondsBuffer" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>缓冲秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.secondsBuffer" placeholder="请输入缓冲秒数" size="mini" />
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
import { listProcess, getProcess, delProcess, addProcess, updateProcess } from "@/api/eng/process";
import { listProcessCategory} from "@/api/eng/processCategory";

export default {
    name: "Process",
    dicts: ['eng_process_type'],
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
        // 基本工序管理表格数据
        processList: [],
        fkProcessCategoryList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:20,
          pageEnable:true,
          processCode: null,
          processName: null,
          categoryId: null,
          processSeq: null,
          processType: null,
          secondsFixed: null,
          secondsVariable: null,
          secondsRm: null,
          secondsSetup: null,
          secondsStacking: null,
          secondsTransfer: null,
          secondsBuffer: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            processCode: [
                { required: true, message: "工序编码不能为空", trigger: "blur" }
            ],
            processName: [
                { required: true, message: "工序名称不能为空", trigger: "blur" }
            ],
            processType: [
                { required: true, message: "工序类型不能为空", trigger: "change" }
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
      this.getList();
          /** 查询外键ProcessCategory数据 */
          this.getProcessCategoryList();
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
          /** 查询外键ProcessCategory数据 */
      getProcessCategoryList() {
        listProcessCategory().then(res => {
          this.fkProcessCategoryList = res.rows;
        });
      },

/**主表外键CategoryId被选择后触发事件*/
        onCategoryIdSelection(fkId){
            this.fkProcessCategoryList.forEach(item=>{
                if(fkId === item.id){
                    this.form.categoryId = item.categoryName
                }
            });
        },

        /** 查询基本工序管理列表 */
        getList() {
            this.loading = true;
        listProcess(this.queryParams).then(response => {
          this.processList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              processCode: null,
              processName: null,
              categoryId: null,
              processSeq: null,
              processType: null,
              secondsFixed: null,
              secondsVariable: null,
              secondsRm: null,
              secondsSetup: null,
              secondsStacking: null,
              secondsTransfer: null,
              secondsBuffer: null,
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
              processCode: null,
              processName: null,
              categoryId: null,
              processSeq: null,
              processType: null,
              secondsFixed: null,
              secondsVariable: null,
              secondsRm: null,
              secondsSetup: null,
              secondsStacking: null,
              secondsTransfer: null,
              secondsBuffer: null,
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
              processCode: null,
              processName: null,
              categoryId: null,
              processSeq: null,
              processType: null,
              secondsFixed: null,
              secondsVariable: null,
              secondsRm: null,
              secondsSetup: null,
              secondsStacking: null,
              secondsTransfer: null,
              secondsBuffer: null,
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
            this.captions = selection.map(item => item.processName)
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
            getProcess(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const processNamez = row.processName || this.captions;
            this.$modal.confirm('确认删除工序名称为"' + processNamez + '"的数据项？').then(function() {
              return delProcess(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('eng/process/export', {
             ...this.queryParams
             }, `process_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateProcess(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addProcess(this.form)
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
