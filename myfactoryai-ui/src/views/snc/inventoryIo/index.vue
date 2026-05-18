<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>单据编号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入单据编号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="ioType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>交易类型</strong></span>
                </span>
                <el-select v-model="queryParams.ioType" placeholder="请选择交易类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.snc_inventory_iotype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="materialCode" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料编码</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialCode" placeholder="请选择产品编码" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.materialCode"
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
            <el-form-item prop="drawNo" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>图号</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.drawNo" placeholder="请选择图号" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.drawNo"
                    :value="fkrow.drawNo"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="customerProductNo" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>客户料号</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.customerProductNo" placeholder="请选择客户料号" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.customerProductNo"
                    :value="fkrow.customerProductNo"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="abroadProductNo" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>进口料号</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.abroadProductNo" placeholder="请选择进口料号" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.abroadProductNo"
                    :value="fkrow.abroadProductNo"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.unitId" placeholder="请选择单位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialList"
                    :key="index"
                    :label="fkrow.unitId"
                    :value="fkrow.unitId"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="quantity" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantity"
                    placeholder="请输入数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="houseId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.houseId" placeholder="请选择现仓库" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkWareHouseList"
                    :key="index"
                    :label="fkrow.houseCode"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="positionId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>储位</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.positionId" placeholder="请选择现储位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkWarePositionList"
                    :key="index"
                    :label="fkrow.positionName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="ilNo" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>库存批号</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.ilNo" placeholder="请选择库存批号" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkInventoryList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.billNo"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="mlId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>制造批</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.mlId" placeholder="请选择制造批" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMlList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="requestId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请求</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.requestId" placeholder="请选择请求" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkStockRequestList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="requestItemId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请求明细</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.requestItemId" placeholder="请选择请求明细" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkStockRequestItemList"
                    :key="index"
                    :label="fkrow.seqNo"
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
                <el-button type="warning" icon="el-icon-download" size="mini"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="inventoryIoList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column label="单据编号" align="center" prop="billNo" width="115"/>
            <el-table-column label="交易类型" align="center" prop="ioType" width="80">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.snc_inventory_iotype" :value="scope.row.ioType"/>
                </template>
            </el-table-column>
            <el-table-column label="物料编码" align="left" prop="materialCode" width="130" show-overflow-tooltip/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="100" show-overflow-tooltip/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="100" show-overflow-tooltip/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
            <el-table-column label="客户料号" align="left" prop="customerProductNo" width="100" show-overflow-tooltip/>
            <el-table-column label="进口料号" align="left" prop="abroadProductNo" width="100" show-overflow-tooltip/>
            <el-table-column label="单位" align="center" prop="unitId" width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="数量" align="right" prop="quantity" width="70"/>
            <el-table-column label="单价" align="right" prop="price" width="70"/>
            <el-table-column label="金额" align="right" prop="amount" width="70"/>
            <el-table-column label="仓库" align="center" prop="houseId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWareHouseList">
                        <span v-if="item.id==scope.row.houseId"
                            :key="index"
                            size="mini">{{item.houseCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="库位" align="center" prop="positionId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWarePositionList">
                        <span v-if="item.id==scope.row.positionId"
                            :key="index"
                            size="mini">{{item.positionName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="库存批号" align="center" prop="ilNo" width="120"/>
            <el-table-column label="制造批" align="left" prop="mlId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="请求" align="left" prop="requestId"  width="120">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkStockRequestList">
                          <span v-if="item.id==scope.row.requestId"
                                :key="index"
                                size="mini">{{item.billNo}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="请求项" align="center" prop="requestItemId"  width="65">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkStockRequestItemList">
                          <span v-if="item.id==scope.row.requestItemId"
                                :key="index"
                                size="mini">{{item.seqNo}}</span>
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
import {getNextBillno, getInventoryIo, updateBillSeq, listInventoryIo} from "@/api/snc/inventoryIo";
import { listUnit} from "@/api/bas/unit";
import { listMaterial} from "@/api/eng/material";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listProductBasis} from "@/api/eng/productBasis";
import { listInventory} from "@/api/snc/inventory";
import { listMl} from "@/api/pln/ml";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import {listStockRequest, listStockRequestFinished} from "@/api/snc/stockRequest";
import { listStockRequestItem} from "@/api/snc/stockRequestItem";

export default {
    name: "InventoryIo",
    dicts: ['snc_inventory_iotype'],
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
        // 仓库存货流水表格数据
        inventoryIoList: [],
        fkUnitList: [],
        fkMaterialList: [],
        fkWareHouseList: [],
        fkWarePositionList: [],
        fkInventoryList: [],
        fkMlList: [],
        fkMaterialInfoList: [],
        fkStockRequestList: [],
        fkStockRequestItemList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          ioType: null,
          materialId: null,
          materialCode: null,
          materialName: null,
          materialSpec: null,
          drawNo: null,
          customerProductNo: null,
          abroadProductNo: null,
          unitId: null,
          quantity: null,
          price: null,
          amount: null,
          houseId: null,
          positionId: null,
          ilId: null,
          ilNo: null,
          mlId: null,
          requestId: null,
          requestItemId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            billNo: [
                { required: true, message: "单据编号不能为空", trigger: "blur" }
            ],
            ioType: [
                { required: true, message: "交易类型不能为空", trigger: "change" }
            ],
            materialId: [
                { required: true, message: "物料编码不能为空", trigger: "blur" }
            ],
            unitId: [
                { required: true, message: "单位不能为空", trigger: "blur" }
            ],
            quantity: [
                { required: true, message: "数量不能为空", trigger: "blur" }
            ],
            price: [
                { required: true, message: "单价不能为空", trigger: "blur" }
            ],
            amount: [
                { required: true, message: "金额不能为空", trigger: "blur" }
            ],
            houseId: [
                { required: true, message: "现仓库不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键Material数据 */
          this.getMaterialList();
          /** 查询外键WareHouse数据 */
          this.getWareHouseList();
          /** 查询外键WarePosition数据 */
          this.getWarePositionList();
          /** 查询外键Inventory数据 */
          this.getInventoryList();
          /** 查询外键Ml数据 */
          this.getMlList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
          /** 查询外键StockRequest数据 */
          this.getStockRequestList();
          /** 查询外键StockRequestItem数据 */
          this.getStockRequestItemList();
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
          /** 查询外键Material数据 */
      getMaterialList() {
        listMaterial().then(res => {
          this.fkMaterialList = res.rows;
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
          /** 查询外键Inventory数据 */
      getInventoryList() {
        listInventory().then(res => {
          this.fkInventoryList = res.rows;
        });
      },
          /** 查询外键Ml数据 */
      getMlList() {
        listMl().then(res => {
          this.fkMlList = res.rows;
        });
      },
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
        });
      },
          /** 查询外键StockRequest数据 */
      getStockRequestList() {
        listStockRequestFinished().then(res => {
          this.fkStockRequestList = res.rows;
        });
      },
          /** 查询外键StockRequestItem数据 */
      getStockRequestItemList() {
        listStockRequestItem().then(res => {
          this.fkStockRequestItemList = res.rows;
        });
      },

/**主表外键MaterialId被选择后触发事件*/
        onMaterialIdSelection(fkId){
        },
/**主表外键HouseId被选择后触发事件*/
        onHouseIdSelection(fkId){
            this.fkWareHouseList.forEach(item=>{
                if(fkId === item.id){
                    this.form.houseId = item.id
                }
            });
        },
/**主表外键PositionId被选择后触发事件*/
        onPositionIdSelection(fkId){
            this.fkWarePositionList.forEach(item=>{
                if(fkId === item.id){
                    this.form.positionId = item.id
                }
            });
        },
/**主表外键IlId被选择后触发事件*/
        onIlIdSelection(fkId){
            this.fkInventoryList.forEach(item=>{
                if(fkId === item.id){
                    this.form.ilId = item.id
                    this.form.ilNo = item.billNo
                }
            });
        },
/**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                }
            });
        },
/**主表外键RequestId被选择后触发事件*/
        onRequestIdSelection(fkId){
            this.fkStockRequestList.forEach(item=>{
                if(fkId === item.id){
                    this.form.requestId = item.id
                }
            });
        },
/**主表外键RequestItemId被选择后触发事件*/
        onRequestItemIdSelection(fkId){
            this.fkStockRequestItemList.forEach(item=>{
                if(fkId === item.id){
                    this.form.requestItemId = item.id
                }
            });
        },

        /** 查询仓库存货流水列表 */
        getList() {
            this.loading = true;
            listInventoryIo(this.queryParams).then(response => {
            this.inventoryIoList = response.rows;
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
            this.download('snc/inventoryIo/export', {
             ...this.queryParams
             }, `inventoryIo_${new Date().getTime()}.xlsx`)
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
