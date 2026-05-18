<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="customerId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>客户</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.customerName" filterable placeholder="请选择客户" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCustomerList"
            :key="index"
            :label="fkrow.customerName+'['+fkrow.customerCode+']'"
            :value="fkrow.customerName"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="soNo" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>销售订单</strong></span>
        </span>
        <el-input v-model="queryParams.soNo"  class="searchInput" placeholder="请输入销售订单" size="mini"/>
      </el-form-item>
      <el-form-item prop="productCode" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>产品编码</strong></span>
        </span>
        <el-input v-model="queryParams.productCode"  class="searchInput" placeholder="请输入产品编码" size="mini"/>
      </el-form-item>
      <el-form-item prop="productName" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>产品名称</strong></span>
        </span>
        <el-input v-model="queryParams.productName"  class="searchInput" placeholder="请输入产品名称" size="mini"/>
      </el-form-item>
      <el-form-item prop="productSpec" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>规格型号</strong></span>
        </span>
        <el-input v-model="queryParams.productSpec"  class="searchInput" placeholder="请输入规格型号" size="mini"/>
      </el-form-item>
      <el-form-item prop="drawNo" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>图号</strong></span>
        </span>
        <el-input v-model="queryParams.drawNo"  class="searchInput" placeholder="请输入图号" size="mini"/>
      </el-form-item>
      <el-form-item prop="status" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>状态</strong></span>
        </span>
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.sales_status_so"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="priority" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>优先级</strong></span>
                </span>
        <el-select v-model="queryParams.priority" placeholder="请选择优先级" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.bill_priority"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="needDay" class="marginBottom5">
          <span slot="label">
              <span class="fontSize12"><strong>需求日期</strong></span>
          </span>
          <el-date-picker clearable size="mini" class="searchInput" v-model="queryParams.needDay" type="date" value-format="yyyy-MM-dd" placeholder="选择需求日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item prop="promiseDay" class="marginBottom5">
          <span slot="label">
              <span class="fontSize12"><strong>承诺交期</strong></span>
          </span>
          <el-date-picker  clearable size="mini" class="searchInput" v-model="queryParams.promiseDay" type="date" value-format="yyyy-MM-dd" placeholder="选择承诺交期">
          </el-date-picker>
      </el-form-item>
      <el-form-item prop="contractNo" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>合同号</strong></span>
        </span>
        <el-input v-model="queryParams.contractNo"  class="searchInput" placeholder="请输入合同号" size="mini"/>
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
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="468px"
              :data="deliveryDealList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column label="销售订单" align="center" prop="soNo" width="115"/>
      <el-table-column label="项次" align="center" prop="seqNo" width="50"/>
      <el-table-column label="状态" align="center" prop="status" width="60">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="合同编号" align="left" prop="contractNo" width="80" show-overflow-tooltip/>
      <el-table-column label="客户名称" align="left" prop="customerName" width="100" show-overflow-tooltip/>
      <el-table-column label="产品编码" align="left" prop="productCode" width="130" show-overflow-tooltip/>
      <el-table-column label="产品名称" align="left" prop="productName" width="100" show-overflow-tooltip/>
      <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
      <el-table-column label="规格型号" align="left" prop="productSpec" width="80" show-overflow-tooltip/>
      <el-table-column label="客户料号" align="left" prop="customerProductNo" width="80" show-overflow-tooltip/>
      <el-table-column label="单位" align="center" prop="unitId" width="50">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{ item.unitName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单量" align="right" prop="quantityOrder" style="color:sandybrown" width="60"/>
<!--      <el-table-column label="单价" align="right" prop="discountPrice" width="80"/>-->
<!--      <el-table-column label="金额" align="right" prop="finalAmount" width="90"/>-->
      <el-table-column label="欠备量" align="right" prop="quantityPrepareLack" width="60"/>
      <el-table-column label="完发量" align="right" prop="quantityDelivered" width="60"/>
      <el-table-column label="走发量" align="right" prop="quantityDelivering" width="60"/>
      <el-table-column label="库存量" align="right" prop="quantityQualified" width="60"/>
      <el-table-column label="可用量" align="right" prop="quantityAvailable" width="60"/>
      <el-table-column label="优先级" align="center" prop="priority" width="60">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
        </template>
      </el-table-column>
      <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求日期" align="center" prop="needDay" width="85">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="转包量" align="right" prop="quantitySubcontract" width="65"/>
      <el-table-column label="完包量" align="right" prop="quantitySubcontracted" width="65"/>
      <el-table-column label="自制量" align="right" prop="quantityMps" width="65"/>
      <el-table-column label="完制量" align="right" prop="quantityManufactured" width="65"/>
      <el-table-column label="预约量" align="right" prop="quantityBooked" width="65"/>
      <el-table-column label="欠交量" align="right" prop="quantityDeliveredLack" width="65"/>
      <el-table-column label="欠发量" align="right" prop="quantityDeliveringLack" width="65"/>
      <el-table-column label="备注" align="left" prop="remark"/>
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="220">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.quantityAvailable<=0 || scope.row.quantityDelivering>=scope.row.quantityOrder"
            size="mini"
            type="text"
            icon="el-icon-folder-checked"
            @click="handlePlanDelivery(scope.row)"
          >直发
          </el-button>
          <el-button
            :disabled="scope.row.quantityPrepareLack<=0"
            size="mini"
            type="text"
            icon="el-icon-folder-add"
            @click="handlePlanOs(scope.row)"
          >转包
          </el-button>
          <el-button
            :disabled="scope.row.quantityPrepareLack<=0"
            size="mini"
            type="text"
            icon="el-icon-folder-delete"
            @click="handlePlanMps(scope.row)"
          >自制
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-sugar"
            @click="handleNormalizeCode(scope.row)"
          >改料
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <!-- 创建master.openplanDelivery对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openplanDelivery" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rulesplanDelivery" label-width="120px" :inline-message="true">
        <el-form-item prop="soNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售订单</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.soNo" placeholder="请输入销售订单" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项次</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.seqNo" placeholder="请输入订单项" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>产品编码</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.productCode" placeholder="请选择产品编码" disabled="true"/>
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
        <el-form-item prop="quantityOrder" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityOrder" placeholder="请输入订单数量" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDelivered" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>交货数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDelivered" placeholder="请输入交货数量" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="needDay" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>需求日期</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.needDay" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item prop="quantityDeliveredLack" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>欠交货数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDeliveredLack" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDeliveringLack" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>欠发货数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDeliveringLack" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityAvailable" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>可用库存量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityAvailable" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityActual" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>应直发数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityActual" placeholder="请输入应发货数量" size="mini"/>
        </el-form-item>
        <el-form-item prop="promiseDay" class="marginBottom0">
          <span slot="label"> <span class="fontSize12"><strong>承诺交期</strong></span>
          </span>
          <el-date-picker  clearable size="mini" class="searchInput" v-model="form.promiseDay" type="date" value-format="yyyy-MM-dd" placeholder="选择承诺交期">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="priority" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>优先级</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.priority" placeholder="请选择优先级" size="mini" >
            <el-option
              v-for="dict in dict.type.bill_priority"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitplanDelivery">确 定</el-button>
        <el-button @click="cancelplanDelivery">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建master.openplanOs对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openplanOs" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rulesplanOs" label-width="120px" :inline-message="true">
        <el-form-item prop="soNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售订单</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.soNo" placeholder="请输入销售订单" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项次</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.seqNo" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>产品编码</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.productCode" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0">
          <span slot="label">
               <span class="fontSize12"><strong>单位</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.unitId" size="mini" disabled="true">
            <el-option
              v-for="(fkrow, index) in fkUnitList"
              :key="index"
              :label="fkrow.unitName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="quantityOrder" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityOrder" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDelivered" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>完发数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDelivered" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDeliveryProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在发数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDeliveryProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantitySubcontractProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在包数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantitySubcontractProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityManufactureProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在制数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityManufactureProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityAvailable" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>可用库量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityAvailable" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="needDay" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>需求日期</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.needDay" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item prop="quantityPrepareLack" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>欠备货数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityPrepareLack" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityActual" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>应转包数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityActual" placeholder="请输入应转包数量" size="mini"/>
        </el-form-item>
        <el-form-item prop="promiseDay" class="marginBottom0">
          <span slot="label"> <span class="fontSize12"><strong>承诺交期</strong></span>
          </span>
          <el-date-picker  clearable size="mini" class="searchInput" v-model="form.promiseDay" type="date" value-format="yyyy-MM-dd" placeholder="选择承诺交期">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="priority" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>优先级</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.priority" placeholder="请选择优先级" size="mini" >
            <el-option
              v-for="dict in dict.type.bill_priority"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitplanOs">确 定</el-button>
        <el-button @click="cancelplanOs">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建master.openplanMps对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openplanMps" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rulesplanMps" label-width="120px" :inline-message="true">
        <el-form-item prop="soNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售订单</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.soNo" placeholder="请输入销售订单" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项次</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.seqNo" placeholder="请输入订单项" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>产品编码</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.productCode" size="mini" disabled="true"/>
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
        <el-form-item prop="quantityOrder" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityOrder" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDelivered" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>完发数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDelivered" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityDeliveryProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在发数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityDeliveryProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantitySubcontractProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在包数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantitySubcontractProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityManufactureProcessing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>在制数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityManufactureProcessing" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityAvailable" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>可用库量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityAvailable" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="needDay" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>需求日期</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.needDay" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item prop="quantityPrepareLack" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>欠备货数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityPrepareLack" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityActual" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>应自制数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityActual" placeholder="请输入应自制数量" size="mini"/>
        </el-form-item>
        <el-form-item prop="promiseDay" class="marginBottom0">
          <span slot="label"> <span class="fontSize12"><strong>承诺交期</strong></span>
          </span>
          <el-date-picker  clearable size="mini" class="searchInput" v-model="form.promiseDay" type="date" value-format="yyyy-MM-dd" placeholder="选择承诺交期">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="priority" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>优先级</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.priority" placeholder="请选择优先级" size="mini" >
            <el-option
              v-for="dict in dict.type.bill_priority"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitplanMps">确 定</el-button>
        <el-button @click="cancelplanMps">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建master.openNormalizeCode对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openNormalizeCode" width="520px" append-to-body>
      <el-form ref="form" :model="form" :rules="rulesNormalizeCode" label-width="120px" :inline-message="true">
        <el-form-item prop="soNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售订单</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.soNo" placeholder="请输入销售订单" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>订单项次</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.seqNo" placeholder="请选择产品名称" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item prop="productCode" class="marginBottom0">
          <span slot="label">
               <span class="fontSize12"><strong>产品编码</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.productCode" @change="onProductIdSelection" @keyup.native="handleProductFilter" filterable placeholder="请选择产品编码" size="mini">
            <el-option
              v-for="(fkrow, index) in fkProductBasisList"
              :key="index"
              :label="fkrow.materialCode+' ['+fkrow.materialName + '，' + fkrow.drawNo + ']'"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
          <span style="color: gray;font-size: smaller;margin-left: 10px;">输入关键字回车可过滤</span>
        </el-form-item>
        <el-form-item prop="productId" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>产品ID</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.productId" placeholder="请选择产品ID" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productName" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>产品名称</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productSpec" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>产品规格</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="drawNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>图号</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.drawNo" placeholder="请选择图号" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="customerProductNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>客户料号</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请选择客户料号" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="AbroadProductNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>进口料号</strong></span>
            </span>
          <el-input class="inputWidth" v-model="form.AbroadProductNo" placeholder="请选择进口料号" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0" >
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitNormalizeCode">确 定</el-button>
        <el-button @click="cancelNormalizeCode">取 消</el-button>
      </div>
    </el-dialog>

    <el-tabs>
      <el-tab-pane label="发货计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="planItem" border
                  :data="planItemList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlanItem"
                  @selection-change="handlePlanItemSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_dp" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="需求日期" align="center" prop="needDay" width="85"/>
          <el-table-column label="承诺日期" align="center" prop="promiseDay" width="85"/>
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="计发数量" align="right" prop="quantityPlanned" width="75"/>
          <el-table-column label="累发数量" align="right" prop="quantityReleased" width="75"/>
          <el-table-column label="原价" align="right" prop="price" width="75"/>
          <el-table-column label="折扣价" align="right" prop="discountPrice" width="75"/>
          <el-table-column label="金额" align="right" prop="amount" width="80"/>
          <el-table-column label="折扣率" align="right" prop="discountRate" width="75"/>
          <el-table-column label="最终金额" align="right" prop="finalAmount" width="80"/>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="主计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="plnMps" border
                  :data="plnMpsList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlnMps"
                  @selection-change="handlePlnMpsSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="主计划号" align="left" prop="billNo" width="125"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_mps" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="160"/>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="计划数" align="right" prop="quantityPlanned" width="70"/>
          <el-table-column label="派工数" align="right" prop="quantityDispatched" width="70"/>
          <el-table-column label="完成数" align="right" prop="quantityFinished" width="70"/>
          <el-table-column label="需求日期" align="center" prop="needDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center" prop="mpsType" width="75">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.pln_mpsitem_type" :value="scope.row.mpsType"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转包计划">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="planOs" border
                  :data="planOsList"
                  highlight-current-row
                  :row-class-name="rowClassNamePlanOs"
                  @selection-change="handlePlanOsSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="转包单号" align="center" prop="billNo" width="125"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_osplan" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="75"/>
          <el-table-column label="派工数量" align="right" prop="quantityDispatched" width="75"/>
          <el-table-column label="完成数量" align="right" prop="quantityFinished" width="75"/>
          <el-table-column label="交期" align="center" prop="needDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {listDeliveryDeal,getDeliveryDeal,planDelivery, planMps, planOs, normalizeCode} from "@/api/del/deliveryDeal";
import {listPlanItem, getPlanItem, delPlanItem, addPlanItem, updatePlanItem} from "@/api/del/planItem";
import {listPlnMps, getPlnMps, delPlnMps, addPlnMps, updatePlnMps} from "@/api/del/plnMps";
import {listPlanOs, getPlanOs, delPlanOs, addPlanOs, updatePlanOs} from "@/api/del/planOs";
import {listUser} from "@/api/system/user";
import {listUnit} from "@/api/bas/unit";
import {listSoItem} from "@/api/ord/soItem";
import {listProject} from "@/api/ord/project";
import {listSoTrace} from "@/api/ord/soTrace";
import {listCustomer} from "@/api/cha/customer";
import {filterMaterialList, listProductingMaterialInfo} from "@/api/eng/materialInfo";

export default {
  name: "DeliveryDeal",
  dicts: ['sales_status_so','sales_status_dp','sales_status_osplan','sales_status_mps', 'bill_priority', 'pln_mpsitem_type'],
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
      masterTable: [],
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 交货筹划表格数据
      deliveryDealList: [],
      fkCustomerList: [],
      fkUserList: [],
      fkUnitList: [],
      fkSoItemList: [],
      fkProjectList: [],
      fkDeliveryDealList: [],
      fkSoTraceList: [],
      fkProductBasisList: [],
      //主表当前行的ID
      masterId: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {
        quantityActual:null,
        priority: null,
      },
      rules: {},
      openplanDelivery: false,
      rulesplanDelivery: {
        quantityActual: [
          {required: true, message: "发货数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      openplanMps: false,
      rulesplanMps: {
        quantityActual: [
          {required: true, message: "自制数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      openplanOs: false,
      rulesplanOs: {
        quantityActual: [
          {required: true, message: "转包数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      openNormalizeCode:false,
      rulesNormalizeCode: {
        productId: [
          { required: true, message: "产品编码不能为空", trigger: "blur" }
        ],
      },
      // 主查询参数
      queryParams: {
        pageEnable:true,
        pageNum: 1,
        pageSize: 10,
        soId: null,
        seqNo: null,
        status: null,
        productId: null,
        productName: null,
        productSpec: null,
        unitId: null,
        priority: null,
        needDay: null,
        promiseDay: null,
      },
      //子表信息
      planItemList: [],
      // 选中数组
      idsPlanItem: [],
      captionsPlanItem: [],
      // 非单个禁用
      singlePlanItem: true,
      // 非多个禁用
      multiplePlanItem: true,
      // 子表选中数据
      checkedPlanItem: [],
      openPlanItem: false,
      formPlanItem: {},
      rulesPlanItem: {},
      //子表信息
      plnMpsList: [],
      // 选中数组
      idsPlnMps: [],
      captionsPlnMps: [],
      // 非单个禁用
      singlePlnMps: true,
      // 非多个禁用
      multiplePlnMps: true,
      // 子表选中数据
      checkedPlnMps: [],
      openPlnMps: false,
      formPlnMps: {},
      rulesPlnMps: {},
      //子表信息
      planOsList: [],
      // 选中数组
      idsPlanOs: [],
      captionsPlanOs: [],
      // 非单个禁用
      singlePlanOs: true,
      // 非多个禁用
      multiplePlanOs: true,
      // 子表选中数据
      checkedPlanOs: [],
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Customer数据 */
    this.getCustomerList();
    /** 查询外键ProductBasis数据 */
    this.getProductBasisList();
    /** 查询外键User数据 */
    this.getUserList();
    /** 查询外键Unit数据 */
    this.getUnitList();
    /** 查询外键So数据 */
    this.getSoList();
    /** 查询外键SoItem数据 */
    this.getSoItemList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键DeliveryDeal数据 */
    this.getDeliveryDealList();
    /** 查询外键SoTrace数据 */
    this.getSoTraceList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listDeliveryDeal(this.queryParams).then(response => {
        this.deliveryDealList = response.rows;
        this.total = response.total;
        if (this.deliveryDealList && this.deliveryDealList.length>0) {
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
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 成批加载子表数据 */
    loadChildData() {
      if (this.masterId) {
        this.getPlanItemList();
        this.getPlnMpsList();
        this.getPlanOsList();
      } else {
        this.planItemList = null;
        this.plnMpsList = null;
        this.planOsList = null;
      }
    },
    /** 查询外键User数据 */
    getUserList() {
      listUser().then(res => {
        this.fkUserList = res.rows;
      });
    },
    /** 查询外键Unit数据 */
    getUnitList() {
      listUnit().then(res => {
        this.fkUnitList = res.rows;
      });
    },
    /** 查询外键SoItem数据 */
    getSoItemList() {
      listSoItem().then(res => {
        this.fkSoItemList = res.rows;
      });
    },
    /** 查询外键Project数据 */
    getProjectList() {
      listProject().then(res => {
        this.fkProjectList = res.rows;
      });
    },
    /** 查询外键DeliveryDeal数据 */
    getDeliveryDealList() {
      listDeliveryDeal().then(res => {
        this.fkDeliveryDealList = res.rows;
      });
    },
    /** 查询外键SoTrace数据 */
    getSoTraceList() {
      listSoTrace().then(res => {
        this.fkSoTraceList = res.rows;
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
      this.captions = selection.map(item => item.seqNo)
      this.single = selection.length !== 1
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
    rowClassName({row, rowIndex}) {
      var className = ''

      if (this.ids.includes(row.id)) {
        className = 'selected-row';
      } else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }

      return className;
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==6 || columnIndex==9) {
        className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==10 || columnIndex==12) {
        className = "fontSize:12px; color:sandybrown; padding:1px 0px;";
      }
      else if (columnIndex==11 || columnIndex==14 || columnIndex==19) {
        className = "fontSize:12px; fontWeight:bold; color:red; padding:1px 0px;";
      }
      else if (columnIndex==13 || columnIndex==15) {
        className = "fontSize:12px; color:rosybrown; padding:1px 0px;";
      }
      else if (columnIndex==16 || columnIndex==17) {
        className = "fontSize:12px; color:lawngreen; padding:1px 0px;";
      }
      else if (columnIndex==18) {
        className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
      }
      else if (columnIndex==20) {
        className = "fontSize:12px; color:orange; padding:1px 0px;";
      }

      return className;
    },
    /**主表外键CustomerId被选择后触发事件*/
    onProductIdSelection(productId) {
      this.fkProductBasisList.forEach(item => {
        if (productId === item.id) {
          this.form.productId = item.id
        }
      });
    },
    /**主表外键SoId被选择后触发事件*/
    handleProductFilter(event) {
      if (event.key === 'Enter') {
        this.fkProductBasisList=null;

        var filter = event.target.value;
        filterMaterialList(filter).then(res => {
          this.fkProductBasisList = res.rows;
        });

        this.fkProductBasisList = this.fkProductBasisList.filter(item =>
          item.label.toLowerCase().includes(filter.toLowerCase())
        );
      }

    },
    /** 重设主表的发货对话框数据 */
    resetplanDelivery() {
      this.form = {
        id: null,
        seqNo: null,
        status: null,
        price: null,
        discountPrice: null,
        amount: null,
        discountRate: null,
        finalAmount: null,
        quantityOrder: null,
        quantityDelivered: null,
        quantityDelivering: null,
        quantitySubcontract: null,
        quantityMps: null,
        quantityDeliveredLack: null,
        quantityDeliveringLack: null,
        quantityAvailable: null,
        quantityDeliveryProcessing:null,
        quantitySubcontractProcessing:null,
        quantityManufactureProcessing:null,
        priority: null,
        needDay: null,
        promiseDay: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        quantityAavailabel: null,
        quantityActual: 0.0
      };
      this.resetForm("form");
    },
    /** 重设主表的投产对话框数据 */
    resetplanMps() {
      this.form = {
        id: null,
        seqNo: null,
        status: null,
        quantityOrder: null,
        price: null,
        discountPrice: null,
        amount: null,
        discountRate: null,
        finalAmount: null,
        quantityDelivered: null,
        quantityDelivering: null,
        quantitySubcontract: null,
        quantityMps: null,
        quantityDeliveryLack: null,
        quantityAvailable: null,
        priority: null,
        needDay: null,
        promiseDay: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        quantityAavailabel: null,
        quantityActual: null
      };
      this.resetForm("form");
    },
    /** 重设主表的转包对话框数据 */
    resetplanOs() {
      this.form = {
        id: null,
        seqNo: null,
        status: null,
        quantityOrder: null,
        price: null,
        discountPrice: null,
        amount: null,
        discountRate: null,
        finalAmount: null,
        quantityDelivered: null,
        quantityDelivering: null,
        quantitySubcontract: null,
        quantityMps: null,
        quantityDeliveryLack: null,
        quantityAvailable: null,
        priority: null,
        needDay: null,
        promiseDay: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        quantityAavailabel: null,
        quantityActual: null
      };
      this.resetForm("form");
    },
    /** 重设主表的转包对话框数据 */
    resetNormalizeCode() {
      this.form = {
        productCode: null,
      };
      this.resetForm("form");
    },
    handleExport() {
      this.download('del/deliveryDeal/export', {
        ...this.queryParams
      }, `deliveryDeal_${new Date().getTime()}.xlsx`)
    },
    handlePlanDelivery(row) {
      this.resetplanDelivery();

      const id = row.id || this.ids;
      getDeliveryDeal(id).then(response => {
        this.form = response.data;
        if(this.form.promiseDay==null) this.form.promiseDay=this.form.needDay;

        var minLack = Math.min(this.form.quantityDeliveredLack,this.form.quantityDeliveringLack);
        this.$set(this.form, "quantityActual", Math.min(minLack,this.form.quantityAvailable));
        this.openplanDelivery = true;
        this.title = "直发计划";
      });
    },
    handlePlanOs(row) {
      this.resetplanOs();

      const id = row.id || this.ids;
      getDeliveryDeal(id).then(response => {
        this.form = response.data;
        if(this.form.promiseDay==null) this.form.promiseDay=this.form.needDay;

        this.$set(this.form, "quantityDeliveryProcessing",this.form.quantityDelivering-this.form.quantityDelivered);
        this.$set(this.form, "quantitySubcontractProcessing",this.form.quantitySubcontract-this.form.quantitySubcontracted);
        this.$set(this.form, "quantityManufactureProcessing",this.form.quantityMps-this.form.quantityManufactured);
        this.$set(this.form, "quantityActual",Math.max(0,this.form.quantityPrepareLack));
        this.openplanOs = true;
        this.title = "转包计划";
      });
    },
    handlePlanMps(row) {
      this.resetplanMps();

      const id = row.id || this.ids;
      getDeliveryDeal(id).then(response => {
        this.form = response.data;
        if(this.form.promiseDay==null) this.form.promiseDay=this.form.needDay;

        this.$set(this.form, "quantityDeliveryProcessing",this.form.quantityDelivering-this.form.quantityDelivered);
        this.$set(this.form, "quantitySubcontractProcessing",this.form.quantitySubcontract-this.form.quantitySubcontracted);
        this.$set(this.form, "quantityManufactureProcessing",this.form.quantityMps-this.form.quantityManufactured);
        this.$set(this.form, "quantityActual",Math.max(0,this.form.quantityPrepareLack));
        this.openplanMps = true;
        this.title = "自制计划";
      });
    },
    handleNormalizeCode(row) {
      this.resetNormalizeCode();

      const id = row.id || this.ids;
      getDeliveryDeal(id).then(response => {
        this.form = response.data;
        this.openNormalizeCode = true;
        this.title = "转改料号";
      });
    },

    /** 提交按钮 */
    submitplanDelivery() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.quantityActual <= this.form.quantityDeliveredLack
              && this.form.quantityActual <= this.form.quantityDeliveringLack
              && this.form.quantityActual <= this.form.quantityAvailable
              && this.form.quantityActual > 0) {
            this.form.params = {"quantityOperating": this.form.quantityActual, "priority": this.form.priority};

            planDelivery(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openplanDelivery = false;
                this.getMasterList();
              });
          } else {
            this.$modal.msgWarning("[应直发数量] 不能大于 欠交货数量、欠发货数量、可用库存量 且不能小于等于0");
          }
        }
      });
    },
    // 取消按钮
    cancelplanDelivery() {
      this.openplanDelivery = false;
      this.resetplanDelivery();
    },
    /** 提交按钮 */
    submitplanMps() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.quantityActual <= this.form.quantityPrepareLack && this.form.quantityActual > 0) {
            this.form.params = {"quantityOperating": this.form.quantityActual, "priority": this.form.priority};

            planMps(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openplanMps = false;
                this.getMasterList();
              });
          } else {
            this.$modal.msgWarning("[应自制数量] 不能大于 [欠备货数量], 且不能小于零");
          }
        }
      });
    },
    // 取消按钮
    cancelplanMps() {
      this.openplanMps = false;
      this.resetplanMps();
    },

    /** 提交按钮 */
    submitplanOs() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.quantityActual <= this.form.quantityPrepareLack && this.form.quantityActual > 0) {
            this.form.params = {"quantityOperating": this.form.quantityActual, "priority": this.form.priority};

            planOs(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openplanOs = false;
                this.getMasterList();
              });
          } else {
            this.$modal.msgWarning("[应转包数量] 不能大于 [欠备货数量], 且不能小于零");
          }
        }
      });
    },
    // 取消按钮
    cancelplanOs() {
      this.openplanOs = false;
      this.resetplanOs();
    },
    /** 提交按钮 */
    submitNormalizeCode() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          normalizeCode(this.form)
            .then(response => {
              this.$modal.msgSuccess(response.msg);
              this.openNormalizeCode = false;
              this.getMasterList();
            });
        }
      });
    },
    // 取消按钮
    cancelNormalizeCode() {
      this.openNormalizeCode = false;
      this.resetNormalizeCode();
    },
    /** 查询子表发货计划数据 */
    getPlanItemList() {
      var params = {"soItemId": this.masterId};
      listPlanItem(params).then(res => {
        this.planItemList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlanItemSelectionChange(selection) {
      this.idsPlanItem = selection.map(item => item.id)
      this.captionsPlanItem = selection.map(item => item.productName)
      this.singlePlanItem = selection.length !== 1
      this.multiplePlanItem = !selection.length
    },
    /** 子表发货计划的CSS行样式 */
    rowClassNamePlanItem({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlanItem.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    /** 查询子表主计划数据 */
    getPlnMpsList() {
      var params = {"soItemId": this.masterId};
      listPlnMps(params).then(res => {
        this.plnMpsList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlnMpsSelectionChange(selection) {
      this.idsPlnMps = selection.map(item => item.id)
      this.captionsPlnMps = selection.map(item => item.billNo)
      this.singlePlnMps = selection.length !== 1
      this.multiplePlnMps = !selection.length
    },
    /** 子表主计划的CSS行样式 */
    rowClassNamePlnMps({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlnMps.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    /** 查询子表转包计划数据 */
    getPlanOsList() {
      var params = {"soItemId": this.masterId};
      listPlanOs(params).then(res => {
        this.planOsList = res.rows;
      });
    },
    // 多选框选中数据
    handlePlanOsSelectionChange(selection) {
      this.idsPlanOs = selection.map(item => item.id)
      this.captionsPlanOs = selection.map(item => item.billNo)
      this.singlePlanOs = selection.length !== 1
      this.multiplePlanOs = !selection.length
    },
    /** 子表转包计划的CSS行样式 */
    rowClassNamePlanOs({row, rowIndex}) {
      var clsName = ''

      if (this.idsPlanOs.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
  }
};
</script>

<style>
.marginBottom5 {
  margin-bottom: 5px !important
}

.marginBottom0 {
  margin-bottom: 0;
}

.fontSize12 {
  font-size: 12px
}

.inputWidth {
  width: 60% !important
}

.searchInput {
  width: 180px !important
}

.el-input__inner {
  width: 100%
}

.dialogConfig .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: deepskyblue !important;
  color: honeydew;
}

.el-table__body tr.current-row > td {
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
  color: sandybrown;
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
