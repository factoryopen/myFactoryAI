<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="houseId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库</strong></span>
                    </span>
              <el-select class="searchInput" v-model="queryParams.houseId" placeholder="请选择仓库" size="mini">
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
              <el-select class="searchInput" v-model="queryParams.positionId" placeholder="请选择储位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkWarePositionList"
                    :key="index"
                    :label="fkrow.positionName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料编码</strong></span>
                    </span>
              <el-select class="searchInput" v-model="queryParams.materialId" placeholder="请选择物料编码" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
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
            <el-form-item prop="materialName" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
              <el-select class="searchInput" v-model="queryParams.materialName" placeholder="请选择物料名称" size="mini">
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
              <el-select class="searchInput" v-model="queryParams.materialSpec" placeholder="请选择物料规格" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialSpec"
                    :value="fkrow.materialSpec"
                    size="mini"
                ></el-option>
              </el-select>
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
            <el-form-item prop="billNo" class="marginBottom5">
                  <span slot="label">
                      <span class="fontSize12"><strong>库存批号</strong></span>
                  </span>
              <el-input
                v-model="queryParams.billNo"
                placeholder="请输入库存批号"
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
                    v-for="(fkrow, index) in fkMaterialInfoList"
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
            <el-form-item prop="houseType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>仓库类型</strong></span>
                </span>
                <el-select v-model="queryParams.houseType" placeholder="请选择仓库类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.res_warehouse_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="timeExpired" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>保质时限</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.timeExpired"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择保质时限">
                </el-date-picker>
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
                <el-button type="warning" icon="el-icon-download" size="mini" :disabled="multiple" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="inventoryList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="仓库" align="center" prop="houseId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWareHouseList">
                        <span v-if="item.id==scope.row.houseId"
                            :key="index"
                            size="mini">{{item.houseCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="储位" align="left" prop="positionId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWarePositionList">
                        <span v-if="item.id==scope.row.positionId"
                            :key="index"
                            size="mini">{{item.positionName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="物料编码" align="left" prop="materialCode"  width="150"/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="130"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="库存批号" align="center" prop="billNo" width="140"/>
            <el-table-column label="单位" align="center" prop="unitId" width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="数量" align="right" prop="quantity" width="100"/>
            <el-table-column label="仓库类型" align="center" prop="houseType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_warehouse_type" :value="scope.row.houseType"/>
                </template>
            </el-table-column>
            <el-table-column label="入库时间" align="center" prop="createTime" width="140">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="保质时限" align="center" prop="timeExpired" width="140">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.timeExpired, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="90">
                <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-edit"
                              @click="handleUpdate(scope.row)"
                          >修改</el-button>
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
                    <span slot="label"><span class="fontSize12"><strong>库存批号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入库存批号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="houseId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>仓库</strong></span></span>
                    <el-select class="inputWidth" v-model="form.houseId" placeholder="请选择仓库"
                               @change="onHouseIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkWareHouseList"
                          :key="index"
                          :label="fkrow.houseCode+' ['+fkrow.houseName+']'"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="positionId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>储位</strong></span></span>
                    <el-select class="inputWidth" v-model="form.positionId" placeholder="请选择储位"
                               @change="onPositionIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkWarePositionList"
                          :key="index"
                          :label="fkrow.positionName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>物料编码</strong></span></span>
                    <el-select class="inputWidth" v-model="form.materialId" filterable placeholder="请选择物料编码"
                               @change="onMaterialIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMaterialInfoList"
                          :key="index"
                          :label="fkrow.materialCode+' ['+fkrow.materialName+'，'+fkrow.drawNo+']'"
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
                <el-form-item prop="unitId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>单位</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkUnitList"
                          :key="index"
                          :label="fkrow.unitName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="quantity" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="houseType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.houseType" placeholder="请选择仓库类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.res_warehouse_type"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="timeExpired" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>保质时限</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                    v-model="form.timeExpired"
                                    class="inputWidth"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择保质时限">
                    </el-date-picker>
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
import {getNextBillno, updateBillSeq } from "@/api/snc/inventory";
import { listInventory, getInventory, delInventory, addInventory, updateInventory } from "@/api/snc/inventory";
import { listUnit} from "@/api/bas/unit";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "Inventory",
    dicts: ['res_warehouse_type'],
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
        // 仓库存货详情表格数据
        inventoryList: [],
        fkUnitList: [],
        fkWareHouseList: [],
        fkWarePositionList: [],
        fkMaterialInfoList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          houseId: null,
          positionId: null,
          materialId: null,
          materialName: null,
          materialSpec: null,
          unitId: null,
          quantity: null,
          houseType: null,
          timeExpired: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            houseId: [
                { required: true, message: "仓库不能为空", trigger: "blur" }
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
            houseType: [
                { required: true, message: "仓库类型不能为空", trigger: "change" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键WareHouse数据 */
          this.getWareHouseList();
          /** 查询外键WarePosition数据 */
          this.getWarePositionList();
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
          /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
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
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
        });
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
        /**主表外键MaterialId被选择后触发事件*/
        onMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.materialId = item.id
                    this.form.materialName = item.materialName
                    this.form.materialSpec = item.materialSpec
                    this.form.unitId = item.unitId
                }
            });
        },
        /** 查询仓库存货详情列表 */
        getList() {
            this.loading = true;
            listInventory(this.queryParams).then(response => {
              this.inventoryList = response.rows;
              this.total = response.total;
              this.loading = false;
            });
        },
        reset (){
            this.form = {
              id: null,
              billNo: null,
              houseId: null,
              positionId: null,
              materialId: null,
              materialName: null,
              materialSpec: null,
              unitId: null,
              quantity: null,
              houseType: null,
              createTime: null,
              timeExpired: null,
              remark: null,
              createBy: null,
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
            this.title = "新增";
            getNextBillno("450").then(res => {
                this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getInventory(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除库存批号为"' + billNoz + '"的数据项？').then(function() {
              return delInventory(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('snc/inventory/export', {
             ...this.queryParams
             }, `inventory_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateInventory(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addInventory(this.form)
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
