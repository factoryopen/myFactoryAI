<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="materialCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品编码</strong></span>
                </span>
        <el-input
          v-model="queryParams.materialCode"
          placeholder="请输入产品编码"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="materialName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品名称</strong></span>
                </span>
        <el-input
          v-model="queryParams.materialName"
          placeholder="请输入产品名称"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="materialSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品规格</strong></span>
                </span>
        <el-input
          v-model="queryParams.materialSpec"
          placeholder="请输入产品规格"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="compoundId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>材质</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.compoundId" placeholder="请选择材质" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCompoundList"
            :key="index"
            :label="fkrow.compoundNo"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
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
      <el-form-item prop="lineId" class="marginBottom5" >
          <span slot="label">
              <span class="fontSize12"><strong>产线</strong></span>
          </span>
        <el-select class="searchInput" v-model="queryParams.lineId" placeholder="请选择产线" size="mini">
          <el-option
            v-for="(fkrow, index) in fkLineList"
            :key="index"
            :label="fkrow.lineName"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="baseType" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>类型</strong></span>
        </span>
        <el-select v-model="queryParams.baseType" placeholder="请选择类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.eng_material_basictype"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item prop="status" class="marginBottom5">-->
<!--        <span slot="label">-->
<!--            <span class="fontSize12"><strong>状态</strong></span>-->
<!--        </span>-->
<!--        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.resource_status_basic"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item class="marginBottom5">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="590px"
              :data="productBasisList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="产品编码" align="left" prop="materialCode"  width="150"/>
      <el-table-column label="产品名称" align="left" prop="materialName"  width="220"/>
      <el-table-column label="产品规格" align="left" prop="materialSpec"  width="120"/>
      <el-table-column label="图号" align="left" prop="drawNo"  width="140"/>
      <el-table-column label="客户图号" align="left" prop="customerProductNo"  width="80"/>
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
      <el-table-column label="品类" align="left" prop="categoryId"  width="80">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                              :key="index"
                              size="mini">{{item.categoryNo}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="baseType" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_basictype" :value="scope.row.baseType"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="状态" align="center" prop="status" width="65">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="dict.type.resource_status_basic" :value="scope.row.status"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="单位" align="center" prop="unitId"  width="60">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{item.unitName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="主仓库" align="center" prop="houseId"  width="80">
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
      <el-table-column label="主产线" align="center" prop="lineId"  width="75">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                              :key="index"
                              size="mini">{{item.lineName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="生产损耗(%)" align="right" prop="rateLoss"  width="75"/>
      <el-table-column label="生产周期(天）" align="right" prop="daysCycletime"  width="75"/>
      <el-table-column label="生产提前期(天）" align="right" prop="daysLeadtime"  width="85"/>
      <el-table-column label="生产后置期(天）" align="right" prop="daysPosttime"  width="85"/>
      <el-table-column label="备注" align="left" prop="remark"/>
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
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

    <!-- 创建master.open对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item  prop="materialName" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>物料名称</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialName" placeholder="请输入物料名称" size="mini" />
        </el-form-item>
        <el-form-item prop="categoryId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>品类</strong></span>
          </span>
          <treeselect v-model="form.categoryId"
                      class="inputWidth"
                      :options="categoryOptions"
                      :normalizer="normalizeCategory"
                      placeholder="请选择父品类"
                      @select="onCategoryIdSelection"
                      size="mini"/>
        </el-form-item>
        <el-form-item  prop="drawNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>图号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.drawNo" placeholder="请输入图号"  @change="onDrawNoChanged" size="mini"/>
        </el-form-item>
        <el-form-item  prop="materialCode" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>物料编码</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialCode" placeholder="请输入物料编码" size="mini"/>
        </el-form-item>
        <el-form-item  prop="materialSpec" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>规格型号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.materialSpec" placeholder="请输入规格型号" size="mini" />
        </el-form-item>
        <el-form-item  prop="customerProductNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>客户料号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请输入客户料号" size="mini" />
        </el-form-item>
        <el-form-item  prop="abroadProductNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>进口图料号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.abroadProductNo" placeholder="请输入进口料号" size="mini" />
        </el-form-item>
        <el-form-item prop="compoundId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>材质</strong></span>
          </span>
          <treeselect v-model="form.compoundId" class="inputWidth" :options="compoundOptions" :normalizer="normalizeCompound" placeholder="请选择材质" ize="mini"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0" >
          <span slot="label">
              <span class="fontSize12"><strong>单位</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位"
                     @change="onUnitIdSelection"  size="mini" >
            <el-option
              v-for="(fkrow, index) in fkUnitList"
              :key="index"
              :label="fkrow.unitName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
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
        <el-form-item prop="lineId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>主产线</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.lineId" placeholder="请选择产线"
                     @change="onLineIdSelection" size="mini" >
            <el-option v-for="(fkrow, index) in fkLineList"
                       :key="index"
                       :label="fkrow.lineName"
                       :value="fkrow.id"
                       size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="rateLoss" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>生产损耗率</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.rateLoss" placeholder="请输入生产损耗率" size="mini" />
        </el-form-item>
        <el-form-item  prop="daysCycletime" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>生产周期(天)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.daysCycletime" placeholder="请输入生产周期" size="mini" />
        </el-form-item>
        <el-form-item  prop="daysLeadtime" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>生产提前期(天)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.daysLeadtime" placeholder="请输入提前时间" size="mini" />
        </el-form-item>
        <el-form-item  prop="daysPosttime" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>生产后置期(天)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.daysPosttime" placeholder="请输入后置时间" size="mini" />
        </el-form-item>
        <el-form-item  prop="consumeType" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>消耗类型</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.consumeType" placeholder="请选择消耗类型" size="mini" >
            <el-option
              v-for="dict in dict.type.eng_material_consumingtype"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
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
      <el-tab-pane label="物料销售维">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialSales" border
                  :data="materialSalesList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialSales"
                  @selection-change="handleMaterialSalesSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="单位成本" align="right" prop="unitCost" width="100"/>
          <el-table-column label="价格倍数" align="right" prop="unitPriceTimes" width="100"/>
          <el-table-column label="保质期" align="right" prop="guaranteeDays" width="100"/>
          <el-table-column label="出货提前期" align="right" prop="leadtimeDelivery" width="120"/>
          <el-table-column label="最小销售量" align="right" prop="quantityMinisize" width="120"/>
          <el-table-column label="销售经济批量" align="right" prop="quantityEconosize" width="120"/>
          <el-table-column label="上次售价" align="right" prop="lastSalePrice" width="100"/>
          <el-table-column label="上次销售日期" align="center" prop="lastSaleDate" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.lastSaleDate, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目" align="center" prop="projectId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkProjectList">
                                <span v-if="item.id==scope.row.projectId"
                                      :key="index"
                                      size="mini">{{item.projectName}}
                                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="客户" align="left" prop="customerId"  width="130">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkCustomerList">
                                <span v-if="item.id==scope.row.customerId"
                                      :key="index"
                                      size="mini">{{item.customerName}}
                                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialSales(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物料生产维">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="materialProduction" border
                  :data="materialProductionList"
                  highlight-current-row
                  :row-class-name="rowClassNameMaterialProduction"
                  @selection-change="handleMaterialProductionSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="固定前置时间" align="right" prop="leadtimeSolidhour" width="120"/>
          <el-table-column label="可变前置时间" align="right" prop="leadtimeVariablehour" width="120"/>
          <el-table-column label="最小生产量" align="right" prop="quantityMinisize" width="120"/>
          <el-table-column label="经济批量" align="right" prop="quantityEconosize" width="120"/>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateEngMaterialProduction(scope.row)"
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
    <!-- 创建slaver.openMaterialSales对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialSales" width="500px" append-to-body>
      <el-form ref="formMaterialSales" :model="formMaterialSales" :rules="rulesMaterialSales" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.materialId" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitCost" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>单位成本</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.unitCost" placeholder="请输入单位成本" size="mini" />
        </el-form-item>
        <el-form-item prop="unitPriceTimes" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>价格倍数</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.unitPriceTimes" placeholder="请输入价格倍数" size="mini" />
        </el-form-item>
        <el-form-item prop="guaranteeDays" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>保质期</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.guaranteeDays" placeholder="请输入保质期" size="mini" />
        </el-form-item>
        <el-form-item prop="leadtimeDelivery" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>出货提前期</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.leadtimeDelivery" placeholder="请输入出货提前期" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityMinisize" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>最小销售量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.quantityMinisize" placeholder="请输入最小销售量" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityEconosize" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>销售经济批量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.quantityEconosize" placeholder="请输入销售经济批量" size="mini" />
        </el-form-item>
        <el-form-item prop="lastSalePrice" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>上次售价</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.lastSalePrice" placeholder="请输入上次售价" size="mini" />
        </el-form-item>
        <el-form-item  prop="lastSaleDate" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>上次销售日期</strong></span>
                      </span>
          <el-date-picker clearable size="mini"
                          v-model="formMaterialSales.lastSaleDate"
                          class="inputWidth"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择上次销售日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="projectId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>项目</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formMaterialSales.projectId" placeholder="请选择项目"
                     @change="onMaterialSalesProjectIdSelection"  size="mini" >
            <el-option
              v-for="(fkrow, index) in fkProjectList"
              :key="index"
              :label="fkrow.projectName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="customerId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>客户</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formMaterialSales.customerId" placeholder="请选择客户"
                     @change="onMaterialSalesCustomerIdSelection"  size="mini" >
            <el-option
              v-for="(fkrow, index) in fkCustomerList"
              :key="index"
              :label="fkrow.customerName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialSales.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialSales">确 定</el-button>
        <el-button @click="cancelMaterialSales">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openMaterialProduction对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openMaterialProduction" width="500px" append-to-body>
      <el-form ref="formMaterialProduction" :model="formMaterialProduction" :rules="rulesMaterialProduction" label-width="140px" :inline-message="true">
        <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.materialId" placeholder="请输入物料编码" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="leadtimeSolidhour" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>固定前置时间</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.leadtimeSolidhour" placeholder="请输入固定前置时间" size="mini" />
        </el-form-item>
        <el-form-item prop="leadtimeVariablehour" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>可变前置时间</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.leadtimeVariablehour" placeholder="请输入可变前置时间" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityMinisize" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>最小生产量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.quantityMinisize" placeholder="请输入最小生产量" size="mini" />
        </el-form-item>
        <el-form-item prop="quantityEconosize" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>经济批量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.quantityEconosize" placeholder="请输入经济批量" size="mini" />
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formMaterialProduction.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMaterialProduction">确 定</el-button>
        <el-button @click="cancelMaterialProduction">取 消</el-button>
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
import { listProductCategory } from "@/api/eng/category"
import { listProductBasis, getProductBasis, delProductBasis, addProductBasis, updateProductBasis, importExcel } from "@/api/eng/productBasis";
import { listMaterialInventory, getMaterialInventory, delMaterialInventory, addMaterialInventory, updateMaterialInventory } from "@/api/eng/materialInventory";
import { listMaterialSales, getMaterialSales, delMaterialSales, addMaterialSales, updateMaterialSales } from "@/api/eng/materialSales";
import { listMaterialProduction, getMaterialProduction, delMaterialProduction, addMaterialProduction, updateMaterialProduction } from "@/api/eng/materialProduction";
import { listMaterialParameters, getMaterialParameters, delMaterialParameters, addMaterialParameters, updateMaterialParameters } from "@/api/eng/materialParameters";
import { listCustomer} from "@/api/cha/customer";
import { listUnit} from "@/api/bas/unit";
import {listCompound} from "@/api/eng/compound";
import {getNextMaterialCode, listMaterial} from "@/api/eng/material";
import { listLine} from "@/api/res/line";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listProject} from "@/api/ord/project";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "ProductBasis",
  dicts: ['eng_material_basictype', 'eng_manufpurchasing_type', 'eng_material_consumingtype', 'resource_status_basic', 'sys_normal_disable', 'bas_parameter_type'],
  components: {
    Treeselect
  },
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
      // 物料分类管理树选项
      categoryOptions: [],
      // 材质管理树选项
      compoundOptions: [],
      // 产成品管理表格数据
      productBasisList: [],
      fkCustomerList: [],
      fkUnitList: [],
      fkCategoryList: [],
      fkCompoundList: [],
      fkMaterialList: [],
      fkLineList: [],
      fkWareHouseList: [],
      fkWarePositionList: [],
      fkProjectList: [],
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
        materialCode: [
          { required: true, message: "产品编码不能为空", trigger: "blur" }
        ],
        materialName: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        unitId: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "品类不能为空", trigger: "blur" }
        ],
        drawNo: [
          { required: true, message: "图号不能为空", trigger: "blur" }
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
        unitId: null,
        categoryId: null,
        compoundId: null,
        consumeType: null,
        lineId: null,
        status: null,
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
      materialSalesList:[],
      // 选中数组
      idsMaterialSales: [],
      captionsMaterialSales: [],
      // 非单个禁用
      singleMaterialSales: true,
      // 非多个禁用
      multipleMaterialSales: true,
      // 子表选中数据
      checkedMaterialSales: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialSales: false,
      formMaterialSales: {},
      rulesMaterialSales: {
        id: [
          { required: true, message: "ID不能为空", trigger: "blur" }
        ],
        materialId: [
          { required: true, message: "物料编码不能为空", trigger: "blur" }
        ],
      },
      //子表信息
      materialProductionList:[],
      // 选中数组
      idsMaterialProduction: [],
      captionsMaterialProduction: [],
      // 非单个禁用
      singleMaterialProduction: true,
      // 非多个禁用
      multipleMaterialProduction: true,
      // 子表选中数据
      checkedMaterialProduction: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openMaterialProduction: false,
      formMaterialProduction: {},
      rulesMaterialProduction: {
        id: [
          { required: true, message: "ID不能为空", trigger: "blur" }
        ],
        materialId: [
          { required: true, message: "物料编码不能为空", trigger: "blur" }
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
    /** 查询外键Customer数据 */
    this.getCustomerList();
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
    /** 查询外键Project数据 */
    this.getProjectList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listProductBasis(this.queryParams).then(response => {
        this.productBasisList = response.rows;
        this.total = response.total;
        if (this.productBasisList && this.productBasisList.length>0) {
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
        this.getMaterialSalesList();
        this.getMaterialProductionList();
        this.getMaterialParametersList();
      }else {
        this.materialInventoryList = null;
        this.materialSalesList = null;
        this.materialProductionList = null;
        this.materialParametersList = null;
      }
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
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
      listProductCategory().then(res => {
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
      listMaterial().then(res => {
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
    /** 查询外键Project数据 */
    getProjectList() {
      listProject().then(res => {
        this.fkProjectList = res.rows;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getMasterList();
    },
    /** 转换物料分类和材质管理数据结构 */
    normalizeCategory(node) {
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
    /** 查询物料分类和材质管理下拉树结构 */
    getTreeselect() {
      listProductCategory().then(response => {
        this.categoryOptions = [];
        const data = { id: 0, categoryNo:'', categoryName: '顶级节点', children: [] };
        data.children = this.handleTree(response.rows, "id", "parentId");
        this.categoryOptions.push(data);
      });
      listCompound().then(response => {
        this.compoundOptions = [];
        const data = { id: 0, compoundNo:'', compoundDesc: '顶级节点', children: [] };
        data.children = this.handleTree(response.rows, "id", "parentId");
        this.compoundOptions.push(data);
      });
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
      this.drawNo = this.form.drawNo;

      this.form.materialCode ="";
      if (this.categoryNo!=null) this.form.materialCode=this.categoryNo;
     // if (this.drawNo!=null) this.form.materialCode += "-"+this.drawNo;

      getNextMaterialCode(this.form.materialCode).then(response => {
        this.form.materialCode = response.data["materialCode"];
      });
    },
    /**主表外键CategoryId被选择后触发事件*/
    onDrawNoChanged(){
      // this.drawNo = this.form.drawNo;
      //
      // this.form.materialCode ="";
      // if (this.categoryNo!=null) this.form.materialCode=this.categoryNo;
      // if (this.drawNo!=null) this.form.materialCode += "-"+this.drawNo;
      //
      // getNextMaterialCode(this.form.materialCode).then(response => {
      //   this.form.materialCode = response.data["materialCode"];
      // });
    },
    /**主表外键LineId被选择后触发事件*/
    onLineIdSelection(fkId){
      this.fkLineList.forEach(item=>{
        if(fkId === item.id){
          this.form.lineId = item.id
        }
      });
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
    onMaterialSalesMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialSales.materialId = item.id
        }
      });
    },
    /** 子表外键ProjectId被选择后触发事件 **/
    onMaterialSalesProjectIdSelection(fkId){
      this.fkProjectList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialSales.projectId = item.id
        }
      });
    },
    /** 子表外键CustomerId被选择后触发事件 **/
    onMaterialSalesCustomerIdSelection(fkId){
      this.fkCustomerList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialSales.customerId = item.id
        }
      });
    },
    /** 子表外键MaterialId被选择后触发事件 **/
    onMaterialProductionMaterialIdSelection(fkId){
      this.fkMaterialList.forEach(item=>{
        if(fkId === item.id){
          this.formMaterialProduction.materialId = item.id
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
    /** 重设主表的修改对话框数据 */
    reset (){
      this.form = {
        id: null,
        materialCode: null,
        materialName: null,
        materialSpec: null,
        baseType: 1,
        consumeType: "1",//普通件
        purchaseType: "1",//生产采购
        unitId: null,
        quantityQualified:0,
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
    handleAdd() {
      this.reset();
      this.getTreeselect();
      this.open = true;
      this.title = "新增";
    },
    handleUpdate(row) {
      const id = row.id || this.ids
      getProductBasis(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
      this.getTreeselect();
    },
    handleDelete(row) {
      const ids = row.id || this.ids;
      const materialNamez = row.materialName || this.captions;
      this.$modal.confirm('确认删除产品名称为"' + materialNamez + '"的数据项？').then(function() {
        return delProductBasis(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handleExport() {
      this.download('eng/productBasis/export', {
        ...this.queryParams
      }, `productBasis_${new Date().getTime()}.xlsx`)
    },
    /** 提交按钮 */
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.id==this.form.id){
            //TODO 上述一行代码须替代或删除

            if (this.form.id != null) {
              updateProductBasis(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
            } else {
              addProductBasis(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
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
    /** 查询子表物料销售维数据 */
    getMaterialSalesList() {
      var params = {"materialId":this.masterId};
      listMaterialSales(params).then(res => {
        this.materialSalesList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialSalesSelectionChange(selection) {
      this.idsMaterialSales = selection.map(item => item.id)
      this.captionsMaterialSales = selection.map(item => item.id)
      this.singleMaterialSales = selection.length!==1
      this.multipleMaterialSales = !selection.length
    },
    /** 子表物料销售维的CSS行样式 */
    rowClassNameMaterialSales({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialSales.includes(row.id)){
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
    resetMaterialSales() {
      this.formMaterialSales = {
        id: null,
        materialId: this.masterId,
        unitCost: null,
        unitPriceTimes: null,
        guaranteeDays: null,
        leadtimeDelivery: null,
        quantityMinisize: null,
        quantityEconosize: null,
        lastSalePrice: null,
        lastSaleDate: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialSales");
      // 按关键字段值来初始化子表单数据
      this.onMaterialSalesMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialSales(row) {
      this.resetMaterialSales();
      const id = row.id || this.idsMaterialSales
      getMaterialSales(id).then(response => {
        this.formMaterialSales = response.data;
        this.openMaterialSales = true;
        this.title = "修改";
      });
    },
    /** 查询子表物料生产维数据 */
    getMaterialProductionList() {
      var params = {"materialId":this.masterId};
      listMaterialProduction(params).then(res => {
        this.materialProductionList = res.rows;
      });
    },
    // 多选框选中数据
    handleMaterialProductionSelectionChange(selection) {
      this.idsMaterialProduction = selection.map(item => item.id)
      this.captionsMaterialProduction = selection.map(item => item.id)
      this.singleMaterialProduction = selection.length!==1
      this.multipleMaterialProduction = !selection.length
    },
    /** 子表物料生产维的CSS行样式 */
    rowClassNameMaterialProduction({ row, rowIndex }) {
      var clsName = ''

      if (this.idsMaterialProduction.includes(row.id)){
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
    resetMaterialProduction() {
      this.formMaterialProduction = {
        id: null,
        materialId: this.masterId,
        leadtimeSolidhour: null,
        leadtimeVariablehour: null,
        quantityMinisize: null,
        quantityEconosize: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formMaterialProduction");
      // 按关键字段值来初始化子表单数据
      this.onMaterialProductionMaterialIdSelection(this.masterId);
    },
    handleUpdateEngMaterialProduction(row) {
      this.resetMaterialProduction();
      const id = row.id || this.idsMaterialProduction
      getMaterialProduction(id).then(response => {
        this.formMaterialProduction = response.data;
        this.openMaterialProduction = true;
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
