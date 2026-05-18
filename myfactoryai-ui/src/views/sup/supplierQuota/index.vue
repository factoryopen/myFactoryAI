<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="materialId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialId" placeholder="请选择物料" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialName" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialName" placeholder="请选择物料名称" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialName"
                    :value="fkrow.materialName"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialSpec" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialSpec" placeholder="请选择物料规格" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialSpec"
                    :value="fkrow.materialSpec"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="prioritySeq" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>优先顺位</strong></span>
                </span>
                <el-input
                    v-model="queryParams.prioritySeq"
                    placeholder="请输入优先顺位"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="supplierId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.supplierId" placeholder="请选择供应商" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkSupplierList"
                    :key="index"
                    :label="fkrow.supplierName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="quotaPercent" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>配额%</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quotaPercent"
                    placeholder="请输入配额%"
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
                  :data="supplierQuotaList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="物料" align="right" prop="materialId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMaterialInfoList">
                        <span v-if="item.id==scope.row.materialId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="130"/>
            <el-table-column label="优先顺位" align="center" prop="prioritySeq" width="100"/>
            <el-table-column label="供应商" align="left" prop="supplierId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="配额%" align="right" prop="quotaPercent" width="120"/>
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
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>物料</strong></span></span>
                    <el-select class="inputWidth" v-model="form.materialId" placeholder="请选择物料"
                               @change="onMaterialIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMaterialInfoList"
                          :key="index"
                          :label="fkrow.materialCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMaterialInfoList"
                        :key="index"
                        :label="fkrow.materialName"
                        :value="fkrow.materialName"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="materialSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMaterialInfoList"
                        :key="index"
                        :label="fkrow.materialSpec"
                        :value="fkrow.materialSpec"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="prioritySeq" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>优先顺位</strong></span></span>
                     <el-input class="inputWidth" v-model="form.prioritySeq" placeholder="请输入优先顺位" size="mini" />
                </el-form-item>
                <el-form-item prop="supplierId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>供应商</strong></span></span>
                    <el-select class="inputWidth" v-model="form.supplierId" placeholder="请选择供应商"
                               @change="onSupplierIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkSupplierList"
                          :key="index"
                          :label="fkrow.supplierName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="quotaPercent" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>配额%</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quotaPercent" placeholder="请输入配额%" size="mini" />
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
import { listSupplierQuota, getSupplierQuota, delSupplierQuota, addSupplierQuota, updateSupplierQuota } from "@/api/sup/supplierQuota";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "SupplierQuota",
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
        // 供应商配额表格数据
        supplierQuotaList: [],
        fkSupplierList: [],
        fkMaterialInfoList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          materialId: null,
          materialName: null,
          materialSpec: null,
          prioritySeq: null,
          supplierId: null,
          quotaPercent: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            materialId: [
                { required: true, message: "物料ID不能为空", trigger: "blur" }
            ],
            prioritySeq: [
                { required: true, message: "优先顺位不能为空", trigger: "blur" }
            ],
            supplierId: [
                { required: true, message: "供应商ID不能为空", trigger: "blur" }
            ],
            quotaPercent: [
                { required: true, message: "配额%不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Supplier数据 */
          this.getSupplierList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
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
          /** 查询外键Supplier数据 */
      getSupplierList() {
        listSupplier().then(res => {
          this.fkSupplierList = res.rows;
        });
      },
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
        });
      },

/**主表外键MaterialId被选择后触发事件*/
        onMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.materialId = item.id
                    this.form.materialName = item.materialName
                    this.form.materialSpec = item.materialSpec
                }
            });
        },
/**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
        },

        /** 查询供应商配额列表 */
        getList() {
            this.loading = true;
        listSupplierQuota(this.queryParams).then(response => {
          this.supplierQuotaList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              materialId: null,
              materialName: null,
              materialSpec: null,
              prioritySeq: null,
              supplierId: null,
              quotaPercent: null,
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
              materialId: null,
              materialName: null,
              materialSpec: null,
              prioritySeq: null,
              supplierId: null,
              quotaPercent: null,
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
              materialId: null,
              materialName: null,
              materialSpec: null,
              prioritySeq: null,
              supplierId: null,
              quotaPercent: null,
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
            this.captions = selection.map(item => item.materialName)
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
            getSupplierQuota(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const materialNamez = row.materialName || this.captions;
            this.$modal.confirm('确认删除物料名称为"' + materialNamez + '"的数据项？').then(function() {
              return delSupplierQuota(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('sup/supplierQuota/export', {
             ...this.queryParams
             }, `supplierQuota_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateSupplierQuota(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addSupplierQuota(this.form)
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
