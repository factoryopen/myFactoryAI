<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="typeName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>机型名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.typeName"
                    placeholder="请输入机型名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="takt" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>节拍</strong></span>
                </span>
                <el-input
                    v-model="queryParams.takt"
                    placeholder="请输入节拍"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="taktSecsize" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>节拍秒数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.taktSecsize"
                    placeholder="请输入节拍秒数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="supplierName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierName"
                    placeholder="请输入供应商名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="supplierContact" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商联系人</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierContact"
                    placeholder="请输入供应商联系人"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="supplierTel" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商电话</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierTel"
                    placeholder="请输入供应商电话"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="plcProtocol" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>通信协议</strong></span>
                </span>
                <el-input
                    v-model="queryParams.plcProtocol"
                    placeholder="请输入通信协议"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="plcSupplier" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>PLC供应商</strong></span>
                </span>
                <el-input
                    v-model="queryParams.plcSupplier"
                    placeholder="请输入PLC供应商"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="plcSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>PLC规格</strong></span>
                </span>
                <el-input
                    v-model="queryParams.plcSpec"
                    placeholder="请输入PLC规格"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="xleft" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>横坐标</strong></span>
                </span>
                <el-input
                    v-model="queryParams.xleft"
                    placeholder="请输入横坐标"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="ytop" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>纵坐标</strong></span>
                </span>
                <el-input
                    v-model="queryParams.ytop"
                    placeholder="请输入纵坐标"
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
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini" :disabled="multiple" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="machineTypeList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="机型名称" align="left" prop="typeName" width="140"/>
            <el-table-column label="节拍" align="right" prop="takt" width="110"/>
            <el-table-column label="节拍秒数" align="right" prop="taktSecsize" width="110"/>
            <el-table-column label="供应商名称" align="left" prop="supplierName" width="140"/>
            <el-table-column label="供应商联系人" align="center" prop="supplierContact" width="110"/>
            <el-table-column label="供应商电话" align="center" prop="supplierTel" width="110"/>
            <el-table-column label="通信协议" align="center" prop="plcProtocol" width="110"/>
            <el-table-column label="PLC供应商" align="center" prop="plcSupplier" width="110"/>
            <el-table-column label="PLC规格" align="left" prop="plcSpec" width="120"/>
            <el-table-column label="基工序图标" align="center" prop="icoUrl" width="110"/>
            <el-table-column label="横坐标" align="center" prop="xleft" width="110"/>
            <el-table-column label="纵坐标" align="center" prop="ytop" width="110"/>
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
                <el-form-item  prop="typeName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>机型名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.typeName" placeholder="请输入机型名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="takt" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>节拍</strong></span></span>
                     <el-input class="inputWidth" v-model="form.takt" placeholder="请输入节拍" size="mini" />
                </el-form-item>
                <el-form-item  prop="taktSecsize" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>节拍秒数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.taktSecsize" placeholder="请输入节拍秒数" size="mini" />
                </el-form-item>
                <el-form-item  prop="supplierName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>供应商名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.supplierName" placeholder="请输入供应商名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="supplierContact" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>供应商联系人</strong></span></span>
                     <el-input class="inputWidth" v-model="form.supplierContact" placeholder="请输入供应商联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="supplierTel" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>供应商电话</strong></span></span>
                     <el-input class="inputWidth" v-model="form.supplierTel" placeholder="请输入供应商电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="plcProtocol" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>通信协议</strong></span></span>
                     <el-input class="inputWidth" v-model="form.plcProtocol" placeholder="请输入通信协议" size="mini" />
                </el-form-item>
                <el-form-item  prop="plcSupplier" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>PLC供应商</strong></span></span>
                     <el-input class="inputWidth" v-model="form.plcSupplier" placeholder="请输入PLC供应商" size="mini" />
                </el-form-item>
                <el-form-item  prop="plcSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>PLC规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.plcSpec" placeholder="请输入PLC规格" size="mini" />
                </el-form-item>
                <el-form-item class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>基工序图标</strong></span></span>
                    <imageUpload class="inputWidth" v-model="form.icoUrl" size="mini" />
                </el-form-item>
                <el-form-item  prop="xleft" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>横坐标</strong></span></span>
                     <el-input class="inputWidth" v-model="form.xleft" placeholder="请输入横坐标" size="mini" />
                </el-form-item>
                <el-form-item  prop="ytop" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>纵坐标</strong></span></span>
                     <el-input class="inputWidth" v-model="form.ytop" placeholder="请输入纵坐标" size="mini" />
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
import { listMachineType, getMachineType, delMachineType, addMachineType, updateMachineType } from "@/api/res/machineType";

export default {
    name: "MachineType",
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
        // 机型管理表格数据
        machineTypeList: [],
        // 查询参数
        queryParams: {
          pageEnable:true,
          pageNum: 1,
          pageSize: 20,
          typeName: null,
          takt: null,
          taktSecsize: null,
          supplierName: null,
          supplierContact: null,
          supplierTel: null,
          plcProtocol: null,
          plcSupplier: null,
          plcSpec: null,
          icoUrl: null,
          xleft: null,
          ytop: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            typeName: [
                { required: true, message: "机型名称不能为空", trigger: "blur" }
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


        /** 查询机型管理列表 */
        getList() {
            this.loading = true;
        listMachineType(this.queryParams).then(response => {
          this.machineTypeList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              typeName: null,
              takt: null,
              taktSecsize: null,
              supplierName: null,
              supplierContact: null,
              supplierTel: null,
              plcProtocol: null,
              plcSupplier: null,
              plcSpec: null,
              icoUrl: null,
              xleft: null,
              ytop: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              typeName: null,
              takt: null,
              taktSecsize: null,
              supplierName: null,
              supplierContact: null,
              supplierTel: null,
              plcProtocol: null,
              plcSupplier: null,
              plcSpec: null,
              icoUrl: null,
              xleft: null,
              ytop: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              typeName: null,
              takt: null,
              taktSecsize: null,
              supplierName: null,
              supplierContact: null,
              supplierTel: null,
              plcProtocol: null,
              plcSupplier: null,
              plcSpec: null,
              icoUrl: null,
              xleft: null,
              ytop: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null
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
            this.captions = selection.map(item => item.typeName)
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
            getMachineType(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const typeNamez = row.typeName || this.captions;
            this.$modal.confirm('确认删除机型名称为"' + typeNamez + '"的数据项？').then(function() {
              return delMachineType(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/machineType/export', {
             ...this.queryParams
             }, `machineType_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateMachineType(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addMachineType(this.form)
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
