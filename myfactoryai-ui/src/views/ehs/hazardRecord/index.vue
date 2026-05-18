<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="hazardDesc" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>隐患描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.hazardDesc"
                    placeholder="请输入隐患描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="hazardLevel" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>隐患等级</strong></span>
                </span>
                <el-input
                    v-model="queryParams.hazardLevel"
                    placeholder="请输入隐患等级"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="day" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>日期</strong></span>
                </span>
                <el-input
                    v-model="queryParams.day"
                    placeholder="请输入日期"
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
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="hazardRecordList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="隐患描述" align="left" prop="hazardDesc" width="140"/>
            <el-table-column label="隐患等级" align="center" prop="hazardLevel" width="90"/>
            <el-table-column label="日期" align="center" prop="day" width="85"/>
            <el-table-column label="部门" align="right" prop="deptId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="责任人" align="right" prop="employeeId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.employeeId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
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
                <el-form-item  prop="hazardDesc" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>隐患描述</strong></span></span>
                     <el-input class="inputWidth" v-model="form.hazardDesc" placeholder="请输入隐患描述" size="mini" />
                </el-form-item>
                <el-form-item  prop="hazardLevel" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>隐患等级</strong></span></span>
                     <el-input class="inputWidth" v-model="form.hazardLevel" placeholder="请输入隐患等级" size="mini" />
                </el-form-item>
                <el-form-item  prop="day" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>日期</strong></span></span>
                     <el-input class="inputWidth" v-model="form.day" placeholder="请输入日期" size="mini" />
                </el-form-item>
                <el-form-item prop="deptId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>部门</strong></span></span>
                    <el-select class="inputWidth" v-model="form.deptId" placeholder="请选择部门"
                               @change="onDeptIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkDeptList"
                          :key="index"
                          :label="fkrow.deptName"
                          :value="fkrow.dept_id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="employeeId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>责任人</strong></span></span>
                    <el-select class="inputWidth" v-model="form.employeeId" placeholder="请选择责任人"
                               @change="onEmployeeIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkUserList"
                          :key="index"
                          :label="fkrow.nickName"
                          :value="fkrow.userId"
                          size="mini"
                      ></el-option>
                    </el-select>
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
import { listHazardRecord, getHazardRecord, delHazardRecord, addHazardRecord, updateHazardRecord } from "@/api/ehs/hazardRecord";
import { listUser} from "@/api/system/user";
import { listDept} from "@/api/system/dept";

export default {
    name: "HazardRecord",
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
        // 安全风险登记表格数据
        hazardRecordList: [],
        fkUserList: [],
        fkDeptList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          hazardDesc: null,
          hazardLevel: null,
          day: null,
          deptId: null,
          employeeId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            hazardDesc: [
                { required: true, message: "隐患描述不能为空", trigger: "blur" }
            ],
            hazardLevel: [
                { required: true, message: "隐患等级不能为空", trigger: "blur" }
            ],
            day: [
                { required: true, message: "日期不能为空", trigger: "blur" }
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

/**主表外键DeptId被选择后触发事件*/
        onDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.deptId = item.dept_id
                }
            });
        },
/**主表外键EmployeeId被选择后触发事件*/
        onEmployeeIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.employeeId = item.userId
                }
            });
        },

        /** 查询安全风险登记列表 */
        getList() {
            this.loading = true;
        listHazardRecord(this.queryParams).then(response => {
          this.hazardRecordList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              hazardDesc: null,
              hazardLevel: null,
              day: null,
              deptId: null,
              employeeId: null,
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
              hazardDesc: null,
              hazardLevel: null,
              day: null,
              deptId: null,
              employeeId: null,
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
              hazardDesc: null,
              hazardLevel: null,
              day: null,
              deptId: null,
              employeeId: null,
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
            this.captions = selection.map(item => item.id)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增安全风险登记";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getHazardRecord(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改安全风险登记";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;
            this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
              return delHazardRecord(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('ehs/hazardRecord/export', {
             ...this.queryParams
             }, `hazardRecord_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateHazardRecord(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addHazardRecord(this.form)
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
