<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="poId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购单</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.poId" filterable placeholder="请选择采购单" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkPoList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="seqNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>项序</strong></span>
                </span>
                <el-input
                    v-model="queryParams.seqNo"
                    placeholder="请输入单项序号"
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
                        v-for="dict in dict.type.bill_status_process_req"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
            <el-form-item prop="purchasingType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购类型</strong></span>
                </span>
                <el-select v-model="queryParams.purchasingType" placeholder="请选择采购类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sup_purchasing_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
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
            <el-form-item prop="sourceBillNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>来源单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.sourceBillNo"
                    placeholder="请输入来源单号"
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
                <el-button type="warning" icon="el-icon-download" size="mini"
                    @click="handleDownload"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="poItemReturnList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="采购单" align="right" prop="poId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPoList">
                        <span v-if="item.id==scope.row.poId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项序" align="center" prop="seqNo" width="60"/>
            <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="供应商" align="right" prop="supplierId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="采购类型" align="center" prop="purchasingType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sup_purchasing_type" :value="scope.row.purchasingType"/>
                </template>
            </el-table-column>
            <el-table-column label="物料" align="right" prop="materialId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMaterialInfoList">
                        <span v-if="item.id==scope.row.materialId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="单位" align="right" prop="unitId" width="60"/>
            <el-table-column label="在退数量" align="right" prop="quantityReturning" width="110"/>
            <el-table-column label="已退数量" align="right" prop="quantityReturned" width="110"/>
            <el-table-column label="来源单ID" align="right" prop="sourceBillId" width="120"/>
            <el-table-column label="来源单号" align="center" prop="sourceBillNo" width="140"/>
            <el-table-column label="备注" align="center" prop="remark"/>
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
import { listPoItemReturn, getPoItemReturn, delPoItemReturn, addPoItemReturn, updatePoItemReturn } from "@/api/sup/poItemReturn";
import { listUnit} from "@/api/bas/unit";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import { listPo} from "@/api/sup/po";

export default {
    name: "PoItemReturn",
    dicts: ['bill_status_process_req', 'sup_purchasing_type'],
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
        // 退货项跟踪表格数据
        poItemReturnList: [],
        fkUnitList: [],
        fkSupplierList: [],
        fkMaterialInfoList: [],
        fkPoList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          poId: null,
          seqNo: null,
          status: null,
          supplierId: null,
          purchasingType: null,
          materialId: null,
          materialName: null,
          materialSpec: null,
          unitId: null,
          quantityReturning: null,
          quantityReturned: null,
          sourceBillId: null,
          sourceBillNo: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            poId: [
                { required: true, message: "采购单ID不能为空", trigger: "blur" }
            ],
            seqNo: [
                { required: true, message: "单项序号不能为空", trigger: "blur" }
            ],
            status: [
                { required: true, message: "状态不能为空", trigger: "change" }
            ],
            supplierId: [
                { required: true, message: "供应商ID不能为空", trigger: "blur" }
            ],
            purchasingType: [
                { required: true, message: "采购类型不能为空", trigger: "change" }
            ],
            materialId: [
                { required: true, message: "物料ID不能为空", trigger: "blur" }
            ],
            unitId: [
                { required: true, message: "单位ID不能为空", trigger: "blur" }
            ],
            quantityReturning: [
                { required: true, message: "在退数量不能为空", trigger: "blur" }
            ],
            quantityReturned: [
                { required: true, message: "已退数量不能为空", trigger: "blur" }
            ],
            sourceBillId: [
                { required: true, message: "来源单ID不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键Supplier数据 */
          this.getSupplierList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
          /** 查询外键Po数据 */
          this.getPoList();
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
          /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
        });
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
          /** 查询外键Po数据 */
      getPoList() {
        listPo().then(res => {
          this.fkPoList = res.rows;
        });
      },

/**主表外键PoId被选择后触发事件*/
        onPoIdSelection(fkId){
            this.fkPoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.poId = item.id
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

        /** 查询退货项跟踪列表 */
        getList() {
            this.loading = true;
        listPoItemReturn(this.queryParams).then(response => {
          this.poItemReturnList = response.rows;
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
            this.captions = selection.map(item => item.seqNo)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleDownload() {
            this.download('sup/poItemReturn/export', {
             ...this.queryParams
             }, `poItemReturn_${new Date().getTime()}.xlsx`)
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
