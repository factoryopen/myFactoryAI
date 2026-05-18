<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="name" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入名称"
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
                        v-for="dict in dict.type.object_status_basic"
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
                  :data="hazardCategoryList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="名称" align="left" prop="name" width="140"/>
            <el-table-column label="状态" align="center" prop="status" width="55">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_basic" :value="scope.row.status"/>
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
                <el-form-item  prop="name" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.name" placeholder="请输入名称" size="mini" />
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
import { listHazardCategory, getHazardCategory, delHazardCategory, addHazardCategory, updateHazardCategory } from "@/api/ehs/hazardCategory";

export default {
    name: "HazardCategory",
    dicts: ['object_status_basic'],
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
        // 安全风险分类表格数据
        hazardCategoryList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          name: null,
          status: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            name: [
                { required: true, message: "名称不能为空", trigger: "blur" }
            ],
            status: [
                { required: true, message: "状态不能为空", trigger: "change" }
            ],
        },
      };
    },
    created() {
      this.getList();
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


        /** 查询安全风险分类列表 */
        getList() {
            this.loading = true;
        listHazardCategory(this.queryParams).then(response => {
          this.hazardCategoryList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              name: null,
              status: null,
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
              name: null,
              status: null,
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
              name: null,
              status: null,
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
            this.captions = selection.map(item => item.name)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增安全风险分类";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getHazardCategory(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改安全风险分类";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const namez = row.name || this.captions;
            this.$modal.confirm('确认删除名称为"' + namez + '"的数据项？').then(function() {
              return delHazardCategory(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('ehs/hazardCategory/export', {
             ...this.queryParams
             }, `hazardCategory_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateHazardCategory(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addHazardCategory(this.form)
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
