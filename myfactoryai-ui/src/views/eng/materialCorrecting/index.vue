<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
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
      <el-form-item prop="categoryId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>主仓库</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.houseId" placeholder="请选择主仓库" size="mini">
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
            <span class="fontSize12"><strong>主库位</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.positionId" placeholder="请选择主库位" size="mini">
          <el-option
            v-for="(fkrow, index) in fkWarePositionList"
            :key="index"
            :label="fkrow.positionCode"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="purchaseType" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>采购类型</strong></span>
        </span>
        <el-select v-model="queryParams.purchaseType" placeholder="请选择采购类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.eng_manufpurchasing_type"
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
      <el-form-item prop="status" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>状态</strong></span>
        </span>
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.resource_status_basic"
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
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          size="mini"
          type="primary"
          plain
          icon="el-icon-upload2"
          @click="handleImport"
        >导入库额
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="590px"
              :data="materialList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
      <el-table-column label="物料名称" align="left" prop="materialName"  width="140"/>
      <el-table-column label="物料规格" align="left" prop="materialSpec"  width="120"/>
      <el-table-column label="图号" align="left" prop="drawNo"  width="140"/>
      <el-table-column label="客户料号" align="left" prop="customerProductNo"  width="80"/>
      <el-table-column label="进口图号" align="left" prop="abroadProductNo"  width="80"/>
      <el-table-column label="材质" align="left" prop="compoundId"  width="90">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkCompoundList">
                        <span v-if="item.id==scope.row.compoundId"
                              :key="index"
                              size="mini">{{item.compoundNo}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="品类" align="center" prop="categoryId"  width="120">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                              :key="index"
                              size="mini">{{item.categoryNo}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.resource_status_basic" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" prop="unitId"  width="60">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
            <span v-if="item.id==scope.row.unitId" :key="index" size="mini">{{item.unitName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="合格数" align="right" prop="quantityQualified"  width="80"/>
      <el-table-column label="不良数" align="right" prop="quantityScraped"  width="80"/>
      <el-table-column label="最近价" align="right" prop="priceLast"  width="80"/>
      <el-table-column label="主仓库" align="center" prop="houseId"  width="90">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkWareHouseList">
                        <span v-if="item.id==scope.row.houseId"
                              :key="index"
                              size="mini">{{item.houseCode}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="主储位" align="left" prop="positionId"  width="110">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkWarePositionList">
                        <span v-if="item.id==scope.row.positionId"
                              :key="index"
                              size="mini">{{item.positionName}}</span>
          </template>
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
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

    <!-- 创建master.open对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item  prop="materialCode" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>物料编码</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialCode" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item  prop="materialName" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>物料名称</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialName" placeholder="请输入物料名称" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item  prop="materialSpec" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>规格型号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialSpec" placeholder="请输入规格型号" @change="onMaterialSpecChanged" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0" >
          <span slot="label">
              <span class="fontSize12"><strong>单位</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位" size="mini"  disabled="true">
            <el-option
              v-for="(fkrow, index) in fkUnitList"
              :key="index"
              :label="fkrow.unitName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <hr>
        <el-form-item  prop="quantityQualified" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>合格数</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityQualified" placeholder="请输入合格数" size="mini"/>
        </el-form-item>
        <el-form-item  prop="quantityScraped" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>不良数</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityScraped" placeholder="请输入不良数" size="mini"/>
        </el-form-item>
        <el-form-item  prop="priceLast" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>最近价</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.priceLast" placeholder="请输入最近价" size="mini"/>
        </el-form-item>
        <el-form-item prop="houseId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>主仓库</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.houseId" placeholder="请选择主仓库" size="mini" >
            <el-option v-for="(fkrow, index) in fkWareHouseList"
                       :key="index"
                       :label="fkrow.houseName"
                       :value="fkrow.id"
                       size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="positionId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>主库位</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.positionId" placeholder="请选择主库位" >
            <el-option v-for="(fkrow, index) in fkWarePositionList"
                       :key="index"
                       :label="fkrow.positionName"
                       :value="fkrow.id"
                       size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 创建master.openImport对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openImport" width="500px" append-to-body>
      <el-form ref="formImport" :model="formImport" :rules="rulesImport" label-width="80px" :inline-message="true">
        <el-form-item  class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>Excel地址</strong></span>
          </span>
          <fileUpload class="inputWidth" v-model="formImport.excelUrl" :fileType="['xls','xlsx']" :limit="1" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitImport">确 定</el-button>
        <el-button @click="cancelImport">取 消</el-button>
      </div>
    </el-dialog>

    <el-tabs>
      <el-tab-pane label="物料存货维">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialInventory" border
                  :data="materialInventoryList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialInventory"
                  @selection-change="handleMaterialInventorySelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="批次管理否" align="left" prop="enableLot" width="110">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.enableLot"/>
            </template>
          </el-table-column>
          <el-table-column label="安全库存量" align="right" prop="safeStockLevel" width="100"/>
          <el-table-column label="最高库存量" align="right" prop="topStockLevel" width="100"/>
          <el-table-column label="保质期天数" align="right" prop="expiredDays" width="120"/>
          <el-table-column label="呆滞预警天数" align="right" prop="dullDays" width="120"/>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialInventory(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物料采购维">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialPurchasing" border
                  :data="materialPurchasingList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialPurchasing"
                  @selection-change="handleMaterialPurchasingSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="保质期" align="right" prop="availableDays" width="100"/>
          <el-table-column label="采购前置天数" align="right" prop="leadtimeBuyday" width="120"/>
          <el-table-column label="最小采购量" align="right" prop="quantityMinisize" width="120"/>
          <el-table-column label="采购经济批量" align="right" prop="quantityEconosize" width="120"/>
          <el-table-column label="上次购价" align="right" prop="lastPrice" width="120"/>
          <el-table-column label="上次采购日期" align="center" prop="lastDate" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.lastDate, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialPurchasing(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物料替代">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialReplacable" border
                  :data="materialReplacableList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialReplacable"
                  @selection-change="handleMaterialReplacableSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="优序" align="center" prop="prioritySeq" width="65"/>
          <el-table-column label="替代物料" align="left" prop="replacableMaterialId"  width="140">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkMaterialList">
                                <span v-if="item.id==scope.row.replacableMaterialId"
                                      :key="index"
                                      size="mini">{{item.materialCode}}
                                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="替代率%" align="right" prop="replacableRate" width="100"/>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialReplacable(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物料参数">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialParameters" border
                  :data="materialParametersList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialParameters"
                  @selection-change="handleMaterialParametersSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="参数代码" align="center" prop="parameterCode" width="140"/>
          <el-table-column label="参数描述" align="left" prop="parameterDesc" width="140"/>
          <el-table-column label="参数类型" align="center" prop="parameterType" width="75">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bas_parameter_type" :value="scope.row.parameterType"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialParameters(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 创建slaver.openMaterialInventory对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialInventory" width="500px" append-to-body>
      <el-form ref="formMaterialInventory" :model="formMaterialInventory" :rules="rulesMaterialInventory" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.materialId" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>批次管理否</strong></span>
                      </span>
          <el-radio-group class="inputWidth" v-model="formMaterialInventory.enableLot" size="mini" >
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              size="mini"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="safeStockLevel" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>安全库存量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.safeStockLevel" placeholder="请输入安全库存量" size="mini" />
        </el-form-item>
        <el-form-item prop="topStockLevel" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>最高库存量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.topStockLevel" placeholder="请输入最高库存量" size="mini" />
        </el-form-item>
        <el-form-item prop="expiredDays" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>保质期天数</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.expiredDays" placeholder="请输入保质期天数" size="mini" />
        </el-form-item>
        <el-form-item prop="dullDays" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>呆滞预警天数</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.dullDays" placeholder="请输入呆滞预警天数" size="mini" />
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialInventory.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialInventory">确 定</el-button>
        <el-button @click="cancelMaterialInventory">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openMaterialPurchasing对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialPurchasing" width="500px" append-to-body>
      <el-form ref="formMaterialPurchasing" :model="formMaterialPurchasing" :rules="rulesMaterialPurchasing" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.materialId" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="availableDays" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>保质期</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.availableDays" placeholder="请输入保质期" size="mini" />
        </el-form-item>
        <el-form-item prop="leadtimeBuyday" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购前置天数</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.leadtimeBuyday" placeholder="请输入采购前置天数" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityMinisize" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>最小采购量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.quantityMinisize" placeholder="请输入最小采购量" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityEconosize" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>采购经济批量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.quantityEconosize" placeholder="请输入采购经济批量" size="mini" />
        </el-form-item>
        <el-form-item prop="lastPrice" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>上次购价</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.lastPrice" placeholder="请输入上次购价" size="mini" />
        </el-form-item>
        <el-form-item  prop="lastDate" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>上次采购日期</strong></span>
          </span>
          <el-date-picker clearable size="mini"
                          v-model="formMaterialPurchasing.lastDate"
                          class="inputWidth"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择上次采购日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialPurchasing.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialPurchasing">确 定</el-button>
        <el-button @click="cancelMaterialPurchasing">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openMaterialReplacable对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialReplacable" width="500px" append-to-body>
      <el-form ref="formMaterialReplacable" :model="formMaterialReplacable" :rules="rulesMaterialReplacable" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialReplacable.materialId" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="prioritySeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>优序</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialReplacable.prioritySeq" placeholder="请输入优序" size="mini" />
        </el-form-item>
        <el-form-item prop="replacableMaterialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>替代物料</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formMaterialReplacable.replacableMaterialId" placeholder="请选择替代物料"
                     @change="onMaterialReplacableReplacableMaterialIdSelection"  size="mini" >
            <el-option
              v-for="(fkrow, index) in fkMaterialList"
              :key="index"
              :label="fkrow.materialCode"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="replacableRate" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>替代率%</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialReplacable.replacableRate" placeholder="请输入替代率%" size="mini" />
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialReplacable.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialReplacable">确 定</el-button>
        <el-button @click="cancelMaterialReplacable">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openMaterialParameters对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialParameters" width="500px" append-to-body>
      <el-form ref="formMaterialParameters" :model="formMaterialParameters" :rules="rulesMaterialParameters" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialParameters.materialId" placeholder="请输入产品编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="parameterCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>参数代码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialParameters.parameterCode" placeholder="请输入参数代码" size="mini" />
        </el-form-item>
        <el-form-item prop="parameterDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>参数描述</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialParameters.parameterDesc" placeholder="请输入参数描述" size="mini" />
        </el-form-item>
        <el-form-item  prop="parameterType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>参数类型</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formMaterialParameters.parameterType" placeholder="请选择参数类型" size="mini" >
            <el-option
              v-for="dict in dict.type.bas_parameter_type"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialParameters.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialParameters">确 定</el-button>
        <el-button @click="cancelMaterialParameters">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInventory, getMaterial, delMaterial, addMaterial, updateMaterial } from "@/api/eng/material";
import { listMaterialInventory, getMaterialInventory, delMaterialInventory, addMaterialInventory, updateMaterialInventory } from "@/api/eng/materialInventory";
import { listMaterialPurchasing, getMaterialPurchasing, delMaterialPurchasing, addMaterialPurchasing, updateMaterialPurchasing } from "@/api/eng/materialPurchasing";
import { listMaterialReplacable, getMaterialReplacable, delMaterialReplacable, addMaterialReplacable, updateMaterialReplacable } from "@/api/eng/materialReplacable";
import { listMaterialParameters, getMaterialParameters, delMaterialParameters, addMaterialParameters, updateMaterialParameters } from "@/api/eng/materialParameters";
import { listUnit} from "@/api/bas/unit";
import { listMaterialCategory} from "@/api/eng/category";
import { listLine} from "@/api/res/line";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import {importExcel} from "@/api/eng/productBasis";
import {listCompound} from "@/api/eng/compound";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Material",
  dicts: ['eng_material_basictype', 'eng_manufpurchasing_type', 'eng_material_consumingtype', 'resource_status_basic', 'sys_normal_disable', 'bas_parameter_type'],
  components: {Treeselect},
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
      //
      masterTable:[],
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 外购料管理表格数据
      materialList: [],
      // 物料分类管理树选项
      categoryOptions: [],
      // 材质数据树选项
      compoundOptions: [],
      fkUnitList: [],
      fkCategoryList: [],
      fkCompoundList: [],
      fkMaterialList: [],
      fkLineList: [],
      fkWareHouseList: [],
      fkWarePositionList: [],
      //主表当前行的ID
      masterId:"",
      //当前tab名
      activeTabName:"",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {},
      rules: {
        quantityQualified: [
          { required: true, message: "合格数不能为空", trigger: "blur" }
        ],
        quantityScraped: [
          { required: true, message: "不良数不能为空", trigger: "blur" }
        ],
        priceLast: [
          { required: true, message: "最近价不能为空", trigger: "blur" }
        ],
      },
      openImport: false,
      formImport: {},
      rulesImport: {
        excelUrl: [
          {required: true, message: "产成品Excel地址不能为空", trigger: "blur"}
        ],
      },
      // 主查询参数
      queryParams: {
        pageEnable:true,
        pageNum: 1,
        pageSize: 15,
        materialCode: null,
        materialName: null,
        materialSpec: null,
        drawNo: null,
        customerProductNo: null,
        abroadProductNo: null,
        unitId: null,
        categoryId: null,
        purchaseType: null,
        consumeType: null,
        status: null,
        quantityBooked: null,
      },
      //子表信息
      materialInventoryList:[],
      // 选中数组
      idsMaterialInventory: [],
      captionsMaterialInventory: [],
      // 非单个禁用
      singleMaterialInventory: true,
      // 非多个禁用
      multipleMaterialInventory: true,
      // 子表选中数据
      checkedMaterialInventory: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialInventory: false,
      formMaterialInventory: {},
      rulesMaterialInventory: {
        materialId: [
          { required: true, message: "物料编码不能为空", trigger: "blur" }
        ],
      },
      //子表信息
      materialPurchasingList:[],
      // 选中数组
      idsMaterialPurchasing: [],
      captionsMaterialPurchasing: [],
      // 非单个禁用
      singleMaterialPurchasing: true,
      // 非多个禁用
      multipleMaterialPurchasing: true,
      // 子表选中数据
      checkedMaterialPurchasing: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialPurchasing: false,
      formMaterialPurchasing: {},
      rulesMaterialPurchasing: {
        materialId: [
          { required: true, message: "物料编码不能为空", trigger: "blur" }
        ],
      },
      //子表信息
      materialReplacableList:[],
      // 选中数组
      idsMaterialReplacable: [],
      captionsMaterialReplacable: [],
      // 非单个禁用
      singleMaterialReplacable: true,
      // 非多个禁用
      multipleMaterialReplacable: true,
      // 子表选中数据
      checkedMaterialReplacable: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialReplacable: false,
      formMaterialReplacable: {},
      rulesMaterialReplacable: {
        materialId: [
          { required: true, message: "物料编码不能为空", trigger: "blur" }
        ],
        prioritySeq: [
          { required: true, message: "优序不能为空", trigger: "blur" }
        ],
        replacableMaterialId: [
          { required: true, message: "替代物料不能为空", trigger: "blur" }
        ],
      },
      //子表信息
      materialParametersList:[],
      // 选中数组
      idsMaterialParameters: [],
      captionsMaterialParameters: [],
      // 非单个禁用
      singleMaterialParameters: true,
      // 非多个禁用
      multipleMaterialParameters: true,
      // 子表选中数据
      checkedMaterialParameters: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialParameters: false,
      formMaterialParameters: {},
      rulesMaterialParameters: {
        materialId: [
          { required: true, message: "产品编码不能为空", trigger: "blur" }
        ],
      },
      //料号生成参数
      categoryNo:null,
      drawNo:null,
      compoundNo:null,
      materialSpec:null,
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Unit数据 */
    this.getUnitList();
    /** 查询外键Category数据 */
    this.getCategoryList();
    /** 查询外键Compound数据 */
    this.getCompoundList();
    /** 查询外键Material数据 */
    this.getMaterialList();
    /** 查询外键Line数据 */
    this.getLineList();
    /** 查询外键WareHouse数据 */
    this.getWareHouseList();
    /** 查询外键WarePosition数据 */
    this.getWarePositionList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listInventory(this.queryParams).then(response => {
        this.materialList = response.rows;
        this.total = response.total;
        if (this.materialList && this.materialList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
        }

        this.loadChildData();
        this.loading = false;
      });
    },
    /** 成批加载子表数据 */
    loadChildData() {
      if (this.masterId) {
        this.getMaterialInventoryList();
        this.getMaterialPurchasingList();
        this.getMaterialReplacableList();
        this.getMaterialParametersList();
      }else {
        this.materialInventoryList = null;
        this.materialPurchasingList = null;
        this.materialReplacableList = null;
        this.materialParametersList = null;
      }
    },
    /** 查询外键Unit数据 */
    getUnitList() {
      listUnit().then(res => {
        this.fkUnitList = res.rows;
      });
    },
    /** 查询外键Category数据 */
    getCategoryList() {
      listMaterialCategory().then(res => {
        this.fkCategoryList = res.rows;
      });
    },
    /** 查询外键Category数据 */
    getCompoundList() {
      listCompound().then(res => {
        this.fkCompoundList = res.rows;
      });
    },
    /** 查询外键Material数据 */
    getMaterialList() {
      listInventory().then(res => {
        this.fkMaterialList = res.rows;
      });
    },
    /** 查询外键Line数据 */
    getLineList() {
      listLine().then(res => {
        this.fkLineList = res.rows;
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
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getMasterList();
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
    /** 主表的当前行切换 */
    handleCurrentChange(currentRow) {
      if (currentRow){
        this.masterId = currentRow.id;
        this.loadChildData();
      }
    },
    /** 主表的CSS行样式 */
    rowClassName({ row, rowIndex }) {
      var className = ''

      if (this.ids.includes(row.id)){
        className = 'selected-row';
      }else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }


      return className;
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
    onCategoryIdSelection(node, instanceId){
      this.categoryNo = node.categoryNo;
      if (this.categoryNo!=null) this.form.materialCode=this.categoryNo;
      if (this.compoundNo!=null) this.form.materialCode += "-"+this.compoundNo;
      if (this.materialSpec!=null && this.materialSpec!="") this.form.materialCode += "-"+this.materialSpec;
      this.form.materialCode += "-01";
    },
    /**主表外键CategoryId被选择后触发事件*/
    onCompoundIdSelection(node, instanceId){
      this.compoundNo = node.compoundNo;
      if (this.categoryNo!=null) this.form.materialCode=this.categoryNo;
      if (this.compoundNo!=null) this.form.materialCode += "-"+this.compoundNo;
      if (this.materialSpec!=null && this.materialSpec!="") this.form.materialCode += "-"+this.materialSpec;
      this.form.materialCode += "-01";
    },
    /**主表外键CategoryId被选择后触发事件*/
    onMaterialSpecChanged(fkId){
      this.materialSpec = this.form.materialSpec;
      if (this.categoryNo!=null) this.form.materialCode=this.categoryNo;
      if (this.compoundNo!=null) this.form.materialCode += "-"+this.compoundNo;
      if (this.materialSpec!=null && this.materialSpec!="") this.form.materialCode += "-"+this.materialSpec;
      this.form.materialCode += "-01";
    },
    /** 子表外键MaterialId被选择后触发事件 **/
    onMaterialInventoryMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialInventory.materialId = item.id
        }
      });
    },
    /** 子表外键HouseId被选择后触发事件 **/
    onMaterialInventoryHouseIdSelection(fkId){
      this.fkWareHouseList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialInventory.houseId = item.id
        }
      });
    },
    /** 子表外键PositionId被选择后触发事件 **/
    onMaterialInventoryPositionIdSelection(fkId){
      this.fkWarePositionList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialInventory.positionId = item.id
        }
      });
    },
    /** 子表外键MaterialId被选择后触发事件 **/
    onMaterialPurchasingMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialPurchasing.materialId = item.id
        }
      });
    },
    /** 子表外键MaterialId被选择后触发事件 **/
    onMaterialReplacableMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialReplacable.materialId = item.id
        }
      });
    },
    /** 子表外键ReplacableMaterialId被选择后触发事件 **/
    onMaterialReplacableReplacableMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialReplacable.materialId = item.id
        }
      });
    },
    /** 子表外键MaterialId被选择后触发事件 **/
    onMaterialParametersMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialParameters.materialId = item.id
        }
      });
    },
    /** 转换物料分类管理数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.categoryNo+" ["+node.categoryName+"]",
        children: node.children
      };
    },
    /** 转换物料分类和材质管理数据结构 */
    normalizeCompound(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.compoundNo+" ["+node.compoundDesc+"]",
        children: node.children,
      };
    },
    /** 查询物料分类管理下拉树结构 */
    getTreeselect() {
      listMaterialCategory().then(response => {
        this.categoryOptions = [];
        const data = { id: 0, categoryNo:"",categoryName: '顶级节点', children: [] };
        data.children = this.handleTree(response.rows, "id", "parentId");
        this.categoryOptions.push(data);
      });
      listCompound().then(response => {
        this.compoundOptions = [];
        const data = { id: 0, compoundNo:"", compoundDesc: '顶级节点', children: [] };
        data.children = this.handleTree(response.rows, "id", "parentId");
        this.compoundOptions.push(data);
      });
    },
    /** 重设主表的修改对话框数据 */
    reset (){
      this.form = {
        id: null,
        materialCode: null,
        materialName: null,
        materialSpec: null,
        baseType: 3,
        consumeType: "1",//普通件
        consumingType: "1",//生产采购
        quantityQualified:0,
        quantityScraped:0,
        priceLast:0,
        rateLoss:0,
        daysCycletime: 0,
        daysLeadtime: 0,
        daysPosttime: 0,
        status: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    resetImport(){
      this.formImport = {
        excelUrl: null,
      }
    },
    handleAdd() {
      this.reset();
      this.getTreeselect();
      this.open = true;
      this.title = "新增";
    },
    handleUpdate(row) {
      const id = row.id || this.ids
      getMaterial(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
      this.getTreeselect();
    },
    handleDelete(row) {
      const ids = row.id || this.ids;
      const materialNamez = row.materialName || this.captions;
      this.$modal.confirm('确认删除物料名称为"' + materialNamez + '"的数据项？').then(function() {
        return delMaterial(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handleExport() {
      this.download('eng/material/export', {
        ...this.queryParams
      }, `material_${new Date().getTime()}.xlsx`)
    },
    handleImport() {
      this.resetImport();
      this.openImport = true;
      this.title = "导入库额";
    },

    /** 提交按钮 */
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.id==this.form.id){
            //TODO 上述一行代码须替代或删除

            if (this.form.id != null) {
              updateMaterial(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                })
                .catch(error => {
                  this.$modal.msgError(error.msg);
                });
            } else {
              addMaterial(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
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
    /** 提交按钮 */
    submitImport() {
      this.$refs["formImport"].validate(valid => {
        if (valid) {
          importExcel(this.formImport.excelUrl)
            .then(response => {
              this.openImport = false;
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        }
      });
    },
    // 取消子表单按钮
    cancelImport() {
      this.openImport = false;
      this.resetImport();
    },
    /** 查询子表物料存货维数据 */
    getMaterialInventoryList() {
      var params = {"materialId":this.masterId};
      listMaterialInventory(params).then(res => {
        this.materialInventoryList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialInventorySelectionChange(selection) {
      this.idsMaterialInventory = selection.map(item => item.id)
      this.captionsMaterialInventory = selection.map(item => item.id)
      this.singleMaterialInventory = selection.length!==1
      this.multipleMaterialInventory = !selection.length
    },
    /** 子表物料存货维的CSS行样式 */
    rowClassNameMaterialInventory({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialInventory.includes(row.id)){
        clsName = 'selected-row';
      }
      else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }
      return clsName;
    },
    // 子表单重置
    resetMaterialInventory() {
      this.formMaterialInventory = {
        id: null,
        materialId: this.masterId,
        enableLot: "0",
        safeStockLevel: null,
        topStockLevel: null,
        expiredDays: null,
        dullDays: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialInventory");
      // 按关键字段值来初始化子表单数据
      this.onMaterialInventoryMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialInventory(row) {
      this.resetMaterialInventory();
      const id = row.id || this.idsMaterialInventory
      getMaterialInventory(id).then(response => {
        this.formMaterialInventory = response.data;
        this.openMaterialInventory = true;
        this.title = "修改";
      });
    },
    /** 查询子表物料采购维数据 */
    getMaterialPurchasingList() {
      var params = {"materialId":this.masterId};
      listMaterialPurchasing(params).then(res => {
        this.materialPurchasingList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialPurchasingSelectionChange(selection) {
      this.idsMaterialPurchasing = selection.map(item => item.id)
      this.captionsMaterialPurchasing = selection.map(item => item.id)
      this.singleMaterialPurchasing = selection.length!==1
      this.multipleMaterialPurchasing = !selection.length
    },
    /** 子表物料采购维的CSS行样式 */
    rowClassNameMaterialPurchasing({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialPurchasing.includes(row.id)){
        clsName = 'selected-row';
      }
      else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetMaterialPurchasing() {
      this.formMaterialPurchasing = {
        id: null,
        materialId: this.masterId,
        availableDays: null,
        leadtimeBuyday: null,
        quantityMinisize: null,
        quantityEconosize: null,
        lastPrice: null,
        lastDate: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialPurchasing");
      // 按关键字段值来初始化子表单数据
      this.onMaterialPurchasingMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialPurchasing(row) {
      this.resetMaterialPurchasing();
      const id = row.id || this.idsMaterialPurchasing
      getMaterialPurchasing(id).then(response => {
        this.formMaterialPurchasing = response.data;
        this.openMaterialPurchasing = true;
        this.title = "修改";
      });
    },
    /** 查询子表物料替代数据 */
    getMaterialReplacableList() {
      var params = {"materialId":this.masterId};
      listMaterialReplacable(params).then(res => {
        this.materialReplacableList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialReplacableSelectionChange(selection) {
      this.idsMaterialReplacable = selection.map(item => item.id)
      this.captionsMaterialReplacable = selection.map(item => item.prioritySeq)
      this.singleMaterialReplacable = selection.length!==1
      this.multipleMaterialReplacable = !selection.length
    },
    /** 子表物料替代的CSS行样式 */
    rowClassNameMaterialReplacable({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialReplacable.includes(row.id)){
        clsName = 'selected-row';
      }
      else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetMaterialReplacable() {
      this.formMaterialReplacable = {
        id: null,
        materialId: this.masterId,
        prioritySeq: null,
        replacableRate: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialReplacable");
      // 按关键字段值来初始化子表单数据
      this.onMaterialReplacableMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialReplacable(row) {
      this.resetMaterialReplacable();
      const id = row.id || this.idsMaterialReplacable
      getMaterialReplacable(id).then(response => {
        this.formMaterialReplacable = response.data;
        this.openMaterialReplacable = true;
        this.title = "修改";
      });
    },
    /** 查询子表物料参数数据 */
    getMaterialParametersList() {
      var params = {"materialId":this.masterId};
      listMaterialParameters(params).then(res => {
        this.materialParametersList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialParametersSelectionChange(selection) {
      this.idsMaterialParameters = selection.map(item => item.id)
      this.captionsMaterialParameters = selection.map(item => item.id)
      this.singleMaterialParameters = selection.length!==1
      this.multipleMaterialParameters = !selection.length
    },
    /** 子表物料参数的CSS行样式 */
    rowClassNameMaterialParameters({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialParameters.includes(row.id)){
        clsName = 'selected-row';
      }
      else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetMaterialParameters() {
      this.formMaterialParameters = {
        id: null,
        materialId: this.masterId,
        parameterCode: null,
        parameterDesc: null,
        parameterType: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialParameters");
      // 按关键字段值来初始化子表单数据
      this.onMaterialParametersMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialParameters(row) {
      this.resetMaterialParameters();
      const id = row.id || this.idsMaterialParameters
      getMaterialParameters(id).then(response => {
        this.formMaterialParameters = response.data;
        this.openMaterialParameters = true;
        this.title = "修改";
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
