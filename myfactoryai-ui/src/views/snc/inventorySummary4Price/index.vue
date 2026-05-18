<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="materialCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物料编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.materialCode"
                    placeholder="请输入物料编码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="drawNo" class="marginBottom5">
                  <span slot="label">
                      <span class="fontSize12"><strong>图号</strong></span>
                  </span>
              <el-input
                v-model="queryParams.drawNo"
                placeholder="请输入图号"
                clearable
                size="mini"
                class="searchInput"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="materialName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物料名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.materialName"
                    placeholder="请输入物料名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="materialSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物料规格</strong></span>
                </span>
                <el-input
                    v-model="queryParams.materialSpec"
                    placeholder="请输入物料规格"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="customerProductNo" class="marginBottom5">
                    <span slot="label">
                        <span class="fontSize12"><strong>客户料号</strong></span>
                    </span>
              <el-input
                v-model="queryParams.customerProductNo"
                placeholder="请输入客户料号"
                clearable
                size="mini"
                class="searchInput"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="abroadProductNo" class="marginBottom5">
                    <span slot="label">
                        <span class="fontSize12"><strong>海外料号</strong></span>
                    </span>
              <el-input
                v-model="queryParams.abroadProductNo"
                placeholder="请输入海外料号"
                clearable
                size="mini"
                class="searchInput"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
              <el-select class="searchInput" v-model="queryParams.unitId" placeholder="请选择单位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkUnitList"
                    :key="index"
                    :label="fkrow.unitName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="categoryId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>品类</strong></span>
                    </span>
              <el-select class="searchInput" v-model="queryParams.categoryId" placeholder="请选择品类" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkCategoryList"
                    :key="index"
                    :label="fkrow.categoryNo"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="baseType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>基本类型</strong></span>
                </span>
                <el-select v-model="queryParams.baseType" placeholder="请选择基本类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_material_basictype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="consumeType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>消耗类型</strong></span>
                </span>
                <el-select v-model="queryParams.consumeType" placeholder="请选择消耗类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_material_consumingtype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="purchaseType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购类型</strong></span>
                </span>
                <el-select v-model="queryParams.purchaseType" placeholder="请选择采购类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_material_purchasingtype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <el-input
                    v-model="queryParams.status"
                    v-show="false"
                />
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-refresh" size="mini"
                    @click="handleRefreshExpired"
                >刷期</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini"
                    @click="handleDownload"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="inventorySummaryList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @row-dblclick="handleMasterCellDblclick"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column label="物料编码" align="left" prop="materialCode" width="168"/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="130"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="客户料号" align="left" prop="customerProductNo" width="120"/>
            <el-table-column label="海外料号" align="left" prop="abroadProductNo" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="品类" align="left" prop="categoryId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                            :key="index"
                            size="mini">{{item.categoryNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="基本类型" align="center" prop="baseType" width="80">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_material_basictype" :value="scope.row.baseType"/>
                </template>
            </el-table-column>
<!--            <el-table-column label="消耗类型" align="center" prop="consumeType" width="80">-->
<!--                <template slot-scope="scope">-->
<!--                    <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="采购类型" align="center" prop="purchaseType" width="80">-->
<!--                <template slot-scope="scope">-->
<!--                    <dict-tag :options="dict.type.eng_material_purchasingtype" :value="scope.row.purchaseType"/>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="状态" align="center" prop="status" width="55">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.resource_status_basic" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="价格" align="right" prop="priceLast" width="85"/>
            <el-table-column label="合格量" align="right" prop="quantityQualified" width="85"/>
            <el-table-column label="报废量" align="right" prop="quantityScraped" width="85"/>
            <el-table-column label="过期量" align="right" prop="quantityExpired" width="85"/>
            <el-table-column label="冻结量" align="right" prop="quantityFrozen" width="85"/>
            <el-table-column label="待判量" align="right" prop="quantityPending" width="85"/>
            <el-table-column label="预约量" align="right" prop="quantityBooked" width="85"/>
          <el-table-column label="可用量" align="right" prop="quantityAvailable" width="85"/>
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
import { listInventorySummary, getInventorySummary, delInventorySummary, addInventorySummary, updateInventorySummary } from "@/api/snc/inventorySummary";
import { refreshExpired } from "@/api/snc/inventorySummary";
import { listUnit} from "@/api/bas/unit";
import { listCategory} from "@/api/eng/category";
import { listLine} from "@/api/res/line";
import {listInventory} from "@/api/snc/inventory";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";

export default {
    name: "InventorySummary",
    dicts: ['eng_material_basictype', 'eng_material_consumingtype', 'eng_material_purchasingtype', 'resource_status_basic','res_warehouse_type'],
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
        // 库存总览表表格数据
        inventorySummaryList: [],
        fkUnitList: [],
        fkCategoryList: [],
        fkLineList: [],
        fkInventoryList: [],
        fkWareHouseList: [],
        fkWarePositionList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize:20,
          materialCode: null,
          materialName: null,
          materialSpec: null,
          drawNo: null,
          customerProductNo: null,
          abroadProductNo: null,
          unitId: null,
          categoryId: null,
          baseType: null,
          consumeType: null,
          purchaseType: null,
          status: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        // 存货总条数
        totalInventory: 0,
        // 查询存货参数
        queryParamsInventory: {
          pageNum: 1,
        },
        // 是否显示存货弹出层
        openInventory: false,
        // 存货表单参数
        formInventory: {materialId: null},
        // 存货表单校验
        rulesInventory: {},
      };
    },
    created() {
        this.getList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Category数据 */
        this.getCategoryList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
        /** 查询外键WarePosition数据 */
        this.getWarePositionList();
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
      /** 查询库存总览表列表 */
      getList() {
        this.loading = true;
        listInventorySummary(this.queryParams).then(response => {
          this.inventorySummaryList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
        });
      },
      /** 查询外键Category数据 */
      getCategoryList() {
        listCategory().then(res => {
          this.fkCategoryList = res.rows;
        });
      },
      /** 查询外键Line数据 */
      getLineList() {
        listLine().then(res => {
          this.fkLineList = res.rows;
        });
      },
      /** 查询外键Line数据 */
      getInventoryList() {
        listInventory().then(res => {
          this.fkInventoryList = res.rows;
        });
      },
      /** 查询外键WareHouse数据 */
      getWareHouseList() {
        listWareHouse().then(res => {
          this.fkWareHouseList = res.rows;
        });
      },
      /** 查询外键WarePosition数据 */
      getWarePositionList() {
        listWarePosition().then(res => {
          this.fkWarePositionList = res.rows;
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
/**主表外键CategoryId被选择后触发事件*/
      onCategoryIdSelection(fkId){
          this.fkCategoryList.forEach(item=>{
              if(fkId === item.id){
                  this.form.categoryId = item.id
              }
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
          this.captions = selection.map(item => item.materialName)
          this.single = selection.length!==1
          this.multiple = !selection.length
      },
      handleRefreshExpired(row) {
          const ids = row.id || this.ids;
          const materialNamez = row.materialName || this.captions;

          this.$modal.confirm('确定刷期 物料名称为"' + materialNamez + '"的数据项吗？').then(function() {
               return refreshExpired(ids);
          }).then(response => {
              this.getList();
              this.$modal.msgSuccess(response.msg);
          }).catch(error => {
              this.$modal.msgError(error.msg);
          });
      },
      handleDownload() {
          this.download('snc/inventorySummary/export', {
           ...this.queryParams
           }, `inventorySummary_${new Date().getTime()}.xlsx`)
      },
      /** 捕捉对主表格的双击操作 */
      handleMasterCellDblclick(row, event) {
        this.formInventory.materialId = row.id;
        listInventory(this.formInventory).then(res => {
          this.fkInventoryList = res.rows;
          this.title="存货详情["+row.materialCode+"]";
          this.openInventory=true;
        });
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
  .dialogPopview .el-dialog__body {
    padding: 0;
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
