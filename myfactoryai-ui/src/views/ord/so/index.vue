<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单号</strong></span>
                </span>
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入订单号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="contractNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>合同号</strong></span>
                </span>
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>客户</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.customerId" filterable placeholder="请选择客户" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCustomerList"
            :key="index"
            :label="fkrow.customerName"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
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
      <el-form-item prop="orderDay" class="marginBottom5">
        <span slot="label">
            <span class="fontSize12"><strong>下单日期</strong></span>
        </span>
        <el-date-picker
          clearable
          size="mini"
          class="searchInput"
          v-model="queryParams.orderDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下单日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="soType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单类型</strong></span>
                </span>
        <el-select v-model="queryParams.soType" placeholder="请选择订单类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.ord_so_type"
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-paperclip"
          size="mini"
          :disabled="multiple"
          @click="handleEnable"
        >发布
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleChangeOrdSo"
        >变更
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-ice-cream-round"
          size="mini"
          :disabled="multiple"
          @click="handleFroze"
        >冻结
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-magic-stick"
          size="mini"
          :disabled="multiple"
          @click="handleUnfroze"
        >解冻
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDisable"
        >停用
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-brush"
          size="mini"
          :disabled="multiple"
          @click="handleFinishforcely"
        >强结
        </el-button>
      </el-col>
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
              height="220px"
              :data="soList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="订单号" sortable align="left" prop="billNo" width="115"/>
      <el-table-column label="合同号" sortable align="left" prop="contractNo" width="150"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="客户" sortable align="left" prop="customerId" width="120">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                              :key="index"
                              size="mini">{{ item.customerName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" prop="soType" width="75">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.ord_so_type" :value="scope.row.soType"/>
        </template>
      </el-table-column>
      <el-table-column label="项目" align="right" prop="projectId" width="85">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                              :key="index"
                              size="mini">{{ item.projectName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" sortable align="center" prop="orderDay" width="95">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未税金额" align="right" prop="amountUntaxed" width="85"/>
      <el-table-column label="开票方式" align="center" prop="invoicePatternId" width="75">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                              :key="index"
                              size="mini">{{ item.patternName }}</span>
          </template>
        </template>
      </el-table-column>
<!--      <el-table-column label="含税金额" align="right" prop="amountTaxed" width="85"/>-->
<!--      <el-table-column label="付款方式" align="center" prop="payPatternId" width="75">-->
<!--        <template slot-scope="scope">-->
<!--          <template v-for="(item,index) in fkPayPatternList">-->
<!--                        <span v-if="item.id==scope.row.payPatternId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{ item.patternName }}</span>-->
<!--          </template>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="交货方式" align="center" prop="shipmentTypeId" width="95">-->
<!--        <template slot-scope="scope">-->
<!--          <template v-for="(item,index) in fkShipmentTypeList">-->
<!--                        <span v-if="item.id==scope.row.shipmentTypeId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{ item.typeDesc }}</span>-->
<!--          </template>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="币别" align="center" prop="currencyId" width="60">-->
<!--        <template slot-scope="scope">-->
<!--          <template v-for="(item,index) in fkCurrencyList">-->
<!--                        <span v-if="item.id==scope.row.currencyId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{ item.currencyName }}</span>-->
<!--          </template>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="汇率" align="right" prop="exchangeRate" width="80"/>-->
      <el-table-column label="地址" align="left" prop="addressId" width="180">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerAddressList">
                        <span v-if="item.id==scope.row.addressId"
                              :key="index"
                              size="mini">{{ item.address }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="contactId" width="65">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCustomerContactList">
                        <span v-if="item.id==scope.row.contactId"
                              :key="index"
                              size="mini">{{ item.contact }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="销售员" align="center" prop="salesId" width="65">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.salesId"
                              :key="index"
                              size="mini">{{ item.nickName }}</span>
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
            @click="handleUpdate(scope.row)"
            :disabled="scope.row.status!=0 && scope.row.status!=3"
          >修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <!-- 创建master.open对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item prop="billNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入订单号" size="mini" disabled="true"/>
        </el-form-item>
        <el-input class="inputWidth" v-model="form.status" v-show="false"/>
        <el-form-item prop="customerId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>客户</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.customerId" placeholder="请选择客户"
                     @change="onCustomerIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCustomerList"
              :key="index"
              :label="fkrow.customerName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="soType" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单类型</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.soType" placeholder="请选择订单类型" size="mini">
            <el-option
              v-for="dict in dict.type.ord_so_type"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="orderDay" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>下单日期</strong></span>
          </span>
          <el-date-picker clearable size="mini"
                          v-model="form.orderDay"
                          class="inputWidth"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择下单日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="amountUntaxed" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>未含税金额</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.amountUntaxed" placeholder="请输入未含税金额" size="mini"/>
        </el-form-item>
        <el-form-item prop="contractNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>合同号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.contractNo" placeholder="请输入合同号" size="mini"/>
        </el-form-item>
        <el-form-item prop="projectId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项目</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                     @change="onProjectIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkProjectList"
              :key="index"
              :label="fkrow.projectName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="invoicePatternId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>开票方式</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择开票方式"
                     @change="onInvoicePatternIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkInvoicePatternList"
              :key="index"
              :label="fkrow.patternName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="payPatternId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>付款方式</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.payPatternId" placeholder="请选择付款方式"
                     @change="onPayPatternIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkPayPatternList"
              :key="index"
              :label="fkrow.patternName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="shipmentTypeId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>交货方式</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择交货方式"
                     @change="onShipmentTypeIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkShipmentTypeList"
              :key="index"
              :label="fkrow.typeDesc"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="currencyId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>币别</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.currencyId" placeholder="请选择币别"
                     @change="onCurrencyIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCurrencyList"
              :key="index"
              :label="fkrow.currencyName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="exchangeRate" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>汇率</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.exchangeRate" placeholder="请输入汇率" size="mini"/>
        </el-form-item>
        <el-form-item prop="addressId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>地址</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.addressId" placeholder="请选择地址"
                     @change="onAddressIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCustomerAddressList"
              :key="index"
              :label="fkrow.address"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contactId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>联系人</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.contactId" placeholder="请选择联系人"
                     @change="onContactIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCustomerContactList"
              :key="index"
              :label="fkrow.contact"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="salesId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售员</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.salesId" placeholder="请选择销售员"
                     @change="onSalesIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkUserList"
              :key="index"
              :label="fkrow.nickName"
              :value="fkrow.userId"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>备注</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建master.openchangeOrdSo对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeOrdSo" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="ruleschangeOrdSo" label-width="120px" :inline-message="true">
        <el-form-item prop="billNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入订单号" size="mini" disabled="true"/>
        </el-form-item>
        <el-input class="inputWidth" v-model="form.status" v-show="false"/>
        <el-form-item prop="shipmentTypeId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>交货方式</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择交货方式"
                     @change="onShipmentTypeIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkShipmentTypeList"
              :key="index"
              :label="fkrow.typeDesc"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="addressId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>地址</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.addressId" placeholder="请选择地址"
                     @change="onAddressIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCustomerAddressList"
              :key="index"
              :label="fkrow.address"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contactId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>联系人</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.contactId" placeholder="请选择联系人"
                     @change="onContactIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkCustomerContactList"
              :key="index"
              :label="fkrow.contact"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="projectId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项目</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                     @change="onProjectIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkProjectList"
              :key="index"
              :label="fkrow.projectName"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="salesId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>销售员</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.salesId" placeholder="请选择销售员"
                     @change="onSalesIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkUserList"
              :key="index"
              :label="fkrow.nickName"
              :value="fkrow.userId"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>部门</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.deptId" placeholder="请选择部门"
                     @change="onDeptIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkDeptList"
              :key="index"
              :label="fkrow.deptName"
              :value="fkrow.deptId"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitchangeOrdSo">确 定</el-button>
        <el-button @click="cancelchangeOrdSo">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 创建master.openImportSo对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openImportSo" width="500px" append-to-body>
      <el-form ref="formImportSo" :model="formImportSo" :rules="rulesImportSo" label-width="80px" :inline-message="true">
        <el-form-item  class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>Excel地址</strong></span>
          </span>
          <fileUpload class="inputWidth" v-model="formImportSo.excelUrl" :fileType="['xls','xlsx']" :limit="1" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitImportSo">确 定</el-button>
        <el-button @click="cancelImportSo">取 消</el-button>
      </div>
    </el-dialog>

    <el-tabs>
      <el-tab-pane label="订单明细">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="handleAddOrdSoItem"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-edit"
              :disabled="singleSoItem"
              @click="handleUpdateOrdSoItem"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              :disabled="multipleSoItem"
              @click="handleDeleteOrdSoItem"
            >删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExportSoItem"
            >导出
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="soItem" border height="340px"
                  :data="soItemList"
                  highlight-current-row
                  :row-class-name="rowClassNameSoItem"
                  @selection-change="handleSoItemSelectionChange"
                  :cell-style="cellStyleSoItem"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
          <el-table-column label="状态" align="center" prop="status" width="65">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
          <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="110"/>
          <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
          <el-table-column label="单位" align="center" prop="unitId" width="50">
            <template slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{ item.unitName }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="订单数" align="right" prop="quantityOrder" width="70"/>
          <el-table-column label="原价" align="right" prop="price" width="80"/>
<!--          <el-table-column label="折扣价" align="right" prop="discountPrice" width="80"/>-->
          <el-table-column label="金额" align="right" prop="amount" width="85"/>
<!--          <el-table-column label="折扣率" align="right" prop="discountRate" width="65"/>-->
          <el-table-column label="最终金额" align="right" prop="finalAmount" width="85"/>
          <!--          <el-table-column label="交货数量" align="right" prop="quantityDelivery" width="80"/>-->
          <!--          <el-table-column label="外协数量" align="right" prop="quantityOs" width="80"/>-->
          <!--          <el-table-column label="计划数量" align="right" prop="quantityPlanned" width="80"/>-->
          <el-table-column label="优先级" align="center" prop="priority" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
            </template>
          </el-table-column>
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
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateOrdSoItem(scope.row)"
                :disabled="scope.row.status!=0 && scope.row.status!=3"
              >修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 创建slaver.openSoItem对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openSoItem" width="500px" append-to-body>
      <el-form ref="formSoItem" :model="formSoItem" :rules="rulesSoItem" label-width="140px" :inline-message="true">
        <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.seqNo" placeholder="请输入项序" size="mini"/>
        </el-form-item>
        <el-input class="inputWidth" v-model="formSoItem.status" v-show="false"/>
        <el-form-item prop="productId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品编码</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formSoItem.productId" filterable placeholder="请选择产品编码"
                     @change="onSoItemProductIdSelection" size="mini">
            <el-option
              v-for="(fkrow, index) in fkProductBasisList"
              :key="index"
              :label="fkrow.materialCode"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="productName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>产品名称</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="formSoItem.productName" placeholder="请选择产品名称" size="mini"
                     disabled="true">
            <el-option
              v-for="(fkrow, index) in fkProductBasisList"
              :key="index"
              :label="fkrow.materialName"
              :value="fkrow.materialName"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="productSpec" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="formSoItem.productSpec" placeholder="请选择产品规格" size="mini"
                     disabled="true">
            <el-option
              v-for="(fkrow, index) in fkProductBasisList"
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
          <el-select class="inputWidth" v-model="formSoItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
            <el-option
              v-for="(fkrow, index) in fkUnitList"
              :key="index"
              :label="fkrow.unitName"
              :value="fkrow.id"
              size="mini"
              :disabled="true"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="quantityOrder" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>订单数量</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.quantityOrder" placeholder="请输入订单数量" size="mini"
                    @change="handleOrderQuantityChange"/>
        </el-form-item>
        <el-form-item prop="price" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>原价</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.price" placeholder="请输入原价" size="mini"
                    @change="handleOrderPriceChange"/>
        </el-form-item>
        <el-form-item prop="discountPrice" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>折扣价</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.discountPrice" placeholder="请输入折扣价" size="mini"
                    @change="handleOrderDiscountPriceChange"/>
        </el-form-item>
        <el-form-item prop="amount" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>金额</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.amount" placeholder="请输入金额" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="discountRate" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>折扣率</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.discountRate" placeholder="请输入折扣率" size="mini"
                    @change="handleOrderDiscountRateChange"/>
        </el-form-item>
        <el-form-item prop="finalAmount" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>最终金额</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.finalAmount" placeholder="请输入最终金额" size="mini"
                    disabled="true"/>
        </el-form-item>
        <!--        <el-form-item prop="quantityDelivery" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>交货数量</strong></span>-->
        <!--                      </span>-->
        <!--          <el-input class="inputWidth" v-model="formSoItem.quantityDelivery" placeholder="请输入交货数量" size="mini" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item prop="quantityOs" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>外协数量</strong></span>-->
        <!--                      </span>-->
        <!--          <el-input class="inputWidth" v-model="formSoItem.quantityOs" placeholder="请输入外协数量" size="mini" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item prop="quantityPlanned" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>计划数量</strong></span>-->
        <!--                      </span>-->
        <!--          <el-input class="inputWidth" v-model="formSoItem.quantityPlanned" placeholder="请输入计划数量" size="mini" />-->
        <!--        </el-form-item>-->
        <el-form-item prop="priority" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>优先级</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formSoItem.priority" placeholder="请选择优先级" size="mini">
            <el-option
              v-for="dict in dict.type.bill_priority"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="needDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>需求日期</strong></span>
                      </span>
          <el-date-picker clearable size="mini"
                          v-model="formSoItem.needDay"
                          class="inputWidth"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择需求日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="promiseDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>承诺交期</strong></span>
                      </span>
          <el-date-picker clearable size="mini"
                          v-model="formSoItem.promiseDay"
                          class="inputWidth"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择承诺交期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formSoItem.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSoItem">确 定</el-button>
        <el-button @click="cancelSoItem">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listSo, getSo, delSo, addSo, updateSo} from "@/api/ord/so";
import {getNextBillno, updateBillSeq} from "@/api/ord/so";
import {importExcel, enable, changeOrdSo, froze, unfroze, disable, finishforcely} from "@/api/ord/so";
import {listSoItem, getSoItem, delSoItem, addSoItem, updateSoItem} from "@/api/ord/soItem";
import {delCustomer, listCustomer} from "@/api/cha/customer";
import {listCustomerAddress} from "@/api/cha/customerAddress";
import {listCustomerContact} from "@/api/cha/customerContact";
import {listUser} from "@/api/system/user";
import {listCurrency} from "@/api/bas/currency";
import {listInvoicePattern} from "@/api/bas/invoicePattern";
import {listPayPattern} from "@/api/bas/payPattern";
import {listShipmentType} from "@/api/bas/shipmentType";
import {listUnit} from "@/api/bas/unit";
import {listDept} from "@/api/system/dept";
import {listProject} from "@/api/ord/project";
import {listProductBasis} from "@/api/eng/productBasis";
import {updatePruductSop} from "@/api/eng/pruductSop";

export default {
  name: "So",
  dicts: ['sales_status_so', 'ord_so_type', 'bill_priority'],
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
      // 订单登记发布表格数据
      soList: [],
      fkCustomerList: [],
      fkCustomerAddressList: [],
      fkCustomerContactList: [],
      fkUserList: [],
      fkCurrencyList: [],
      fkInvoicePatternList: [],
      fkPayPatternList: [],
      fkShipmentTypeList: [],
      fkUnitList: [],
      fkSoList: [],
      fkDeptList: [],
      fkProjectList: [],
      fkProductBasisList: [],
      //主表当前行的ID和状态
      masterId: "",
      masterStatus: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {},
      rules: {
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
        soType: [
          {required: true, message: "订单类型不能为空", trigger: "blur"}
        ],
        orderDay: [
          {required: true, message: "下单日期不能为空", trigger: "blur"}
        ],
        amountUntaxed: [
          {required: true, message: "未含税金额不能为空", trigger: "blur"}
        ],
      },
      openImportSo: false,
      formImportSo: {},
      rulesImportSo: {
        excelUrl: [
          {required: true, message: "订单明细Excel地址不能为空", trigger: "blur"}
        ],
      },
      openchangeOrdSo: false,
      ruleschangeOrdSo: {
        billNo: [
          {required: true, message: "订单号不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        pageEnable:true,
        billNo: null,
        status: null,
        customerId: null,
        contractNo: null,
        amountUntaxed: null,
        amountTaxed: null,
        invoicePatternId: null,
        payPatternId: null,
        currencyId: null,
        shipmentTypeId: null,
        exchangeRate: null,
        orderDay: null,
        addressId: null,
        contactId: null,
        soType: null,
        projectId: null,
        salesId: null,
        deptId: null,
      },
      //子表信息
      soItemList: [],
      // 选中数组
      idsSoItem: [],
      captionsSoItem: [],
      // 非单个禁用
      singleSoItem: true,
      // 非多个禁用
      multipleSoItem: true,
      // 子表选中数据
      checkedSoItem: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openSoItem: false,
      formSoItem: {},
      rulesSoItem: {
        soId: [
          {required: true, message: "销售订单不能为空", trigger: "blur"}
        ],
        seqNo: [
          {required: true, message: "项序不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        productId: [
          {required: true, message: "产品编码不能为空", trigger: "blur"}
        ],
        quantityOrder: [
          {required: true, message: "订单数量不能为空", trigger: "blur"}
        ],
        price: [
          {required: true, message: "原价不能为空", trigger: "blur"}
        ],
        discountPrice: [
          {required: true, message: "折扣价不能为空", trigger: "blur"}
        ],
        discountRate: [
          {required: true, message: "折扣率不能为空", trigger: "blur"}
        ],
        needDay: [
          {required: true, message: "需求日期不能为空", trigger: "blur"}
        ],
      },
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Customer数据 */
    this.getCustomerList();
    /** 查询外键CustomerAddress数据 */
    this.getCustomerAddressList();
    /** 查询外键CustomerContact数据 */
    this.getCustomerContactList();
    /** 查询外键User数据 */
    this.getUserList();
    /** 查询外键Currency数据 */
    this.getCurrencyList();
    /** 查询外键InvoicePattern数据 */
    this.getInvoicePatternList();
    /** 查询外键PayPattern数据 */
    this.getPayPatternList();
    /** 查询外键ShipmentType数据 */
    this.getShipmentTypeList();
    /** 查询外键Unit数据 */
    this.getUnitList();
    /** 查询外键So数据 */
    this.getSoList();
    /** 查询外键Dept数据 */
    this.getDeptList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键ProductBasis数据 */
    this.getProductBasisList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listSo(this.queryParams).then(response => {
        this.soList = response.rows;
        this.total = response.total;
        if (this.soList && this.soList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
          this.masterStatus = response.rows[0].status;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
          this.masterStatus = null;
        }

        this.loadChildData();
        this.loading = false;
      });
    },
    /** 成批加载子表数据 */
    loadChildData() {
      if (this.masterId) {
        this.getSoItemList();
      } else {
        this.soItemList = null;
      }
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 查询外键CustomerAddress数据 */
    getCustomerAddressList() {
      listCustomerAddress().then(res => {
        this.fkCustomerAddressList = res.rows;
      });
    },
    /** 查询外键CustomerContact数据 */
    getCustomerContactList() {
      listCustomerContact().then(res => {
        this.fkCustomerContactList = res.rows;
      });
    },
    /** 查询外键User数据 */
    getUserList() {
      listUser().then(res => {
        this.fkUserList = res.rows;
      });
    },
    /** 查询外键Currency数据 */
    getCurrencyList() {
      listCurrency().then(res => {
        this.fkCurrencyList = res.rows;
      });
    },
    /** 查询外键InvoicePattern数据 */
    getInvoicePatternList() {
      listInvoicePattern().then(res => {
        this.fkInvoicePatternList = res.rows;
      });
    },
    /** 查询外键PayPattern数据 */
    getPayPatternList() {
      listPayPattern().then(res => {
        this.fkPayPatternList = res.rows;
      });
    },
    /** 查询外键ShipmentType数据 */
    getShipmentTypeList() {
      listShipmentType().then(res => {
        this.fkShipmentTypeList = res.rows;
      });
    },
    /** 查询外键Unit数据 */
    getUnitList() {
      listUnit().then(res => {
        this.fkUnitList = res.rows;
      });
    },
    /** 查询外键So数据 */
    getSoList() {
      listSo().then(res => {
        this.fkSoList = res.rows;
      });
    },
    /** 查询外键Dept数据 */
    getDeptList() {
      listDept().then(res => {
        this.fkDeptList = res.data;
      });
    },
    /** 查询外键Project数据 */
    getProjectList() {
      listProject().then(res => {
        this.fkProjectList = res.rows;
      });
    },
    /** 查询外键ProductBasis数据 */
    getProductBasisList() {
      listProductBasis().then(res => {
        this.fkProductBasisList = res.rows;
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
      this.captions = selection.map(item => item.billNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 主表的当前行切换 */
    handleCurrentChange(currentRow) {
      if (currentRow){
        this.masterId = currentRow.id;
        this.masterStatus = currentRow.status;
        this.loadChildData();
      }
    },
    handleOrderQuantityChange(event) {
      this.formSoItem.discountRate = 100;
      this.formSoItem.amount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice;
      this.formSoItem.finalAmount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice * this.formSoItem.discountRate / 100;
    },
    handleOrderPriceChange(event) {
      this.formSoItem.discountPrice = this.formSoItem.price;
      this.formSoItem.amount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice;
      this.formSoItem.finalAmount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice * this.formSoItem.discountRate / 100;

    },
    handleOrderDiscountPriceChange(event) {
      this.formSoItem.discountRate = 100;
      this.formSoItem.amount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice;
      this.formSoItem.finalAmount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice * this.formSoItem.discountRate / 100;
    },
    handleOrderDiscountRateChange(event) {
      this.formSoItem.amount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice;
      this.formSoItem.finalAmount = this.formSoItem.quantityOrder * this.formSoItem.discountPrice * this.formSoItem.discountRate / 100;
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
    cellStyleSoItem({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==3) {
        className = "fontSize:12px; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==9) {
        className = "fontSize:12px; color:red; padding:1px 0px;";
      }
      else if (columnIndex==10) {
        className = "fontSize:12px; color:orange; padding:1px 0px;";
      }
      else if (columnIndex==16) {
        className = "fontSize:12px; color:green; padding:1px 0px;";
      }

      return className;
    },
    /**主表外键CustomerId被选择后触发事件*/
    onCustomerIdSelection(fkId) {
      this.fkCustomerList.forEach(item => {
        if (fkId === item.id) {
          this.form.customerId = item.id
        }
      });
    },
    /**主表外键InvoicePatternId被选择后触发事件*/
    onInvoicePatternIdSelection(fkId) {
      this.fkInvoicePatternList.forEach(item => {
        if (fkId === item.id) {
          this.form.invoicePatternId = item.id
        }
      });
    },
    /**主表外键PayPatternId被选择后触发事件*/
    onPayPatternIdSelection(fkId) {
      this.fkPayPatternList.forEach(item => {
        if (fkId === item.id) {
          this.form.payPatternId = item.id
        }
      });
    },
    /**主表外键CurrencyId被选择后触发事件*/
    onCurrencyIdSelection(fkId) {
      this.fkCurrencyList.forEach(item => {
        if (fkId === item.id) {
          this.form.currencyId = item.id
        }
      });
    },
    /**主表外键ShipmentTypeId被选择后触发事件*/
    onShipmentTypeIdSelection(fkId) {
      this.fkShipmentTypeList.forEach(item => {
        if (fkId === item.id) {
          this.form.shipmentTypeId = item.id
        }
      });
    },
    /**主表外键AddressId被选择后触发事件*/
    onAddressIdSelection(fkId) {
      this.fkCustomerAddressList.forEach(item => {
        if (fkId === item.id) {
          this.form.addressId = item.id
        }
      });
    },
    /**主表外键ContactId被选择后触发事件*/
    onContactIdSelection(fkId) {
      this.fkCustomerContactList.forEach(item => {
        if (fkId === item.id) {
          this.form.contactId = item.id
        }
      });
    },
    /**主表外键ProjectId被选择后触发事件*/
    onProjectIdSelection(fkId) {
      this.fkProjectList.forEach(item => {
        if (fkId === item.id) {
          this.form.projectId = item.id
        }
      });
    },
    /**主表外键SalesId被选择后触发事件*/
    onSalesIdSelection(fkId) {
      this.fkUserList.forEach(item => {
        if (fkId === item.id) {
          this.form.salesId = item.userId
        }
      });
    },
    /**主表外键DeptId被选择后触发事件*/
    onDeptIdSelection(fkId) {
      this.fkDeptList.forEach(item => {
        if (fkId === item.deptId) {
          this.form.deptId = item.deptId
        }
      });
    },
    /** 子表外键SoId被选择后触发事件 **/
    onSoItemSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.formSoItem.soId = item.id
        }
      });
    },
    /** 子表外键ProductId被选择后触发事件 **/
    onSoItemProductIdSelection(fkId) {
      this.fkProductBasisList.forEach(item => {
        if (fkId === item.id) {
          this.formSoItem.productId = item.id
          this.formSoItem.productName = item.materialName
          this.formSoItem.productSpec = item.materialSpec
          this.formSoItem.unitId = item.unitId
        }
      });
    },
    /** 重设主表的变更对话框数据 */
    resetchangeOrdSo() {
      this.form = {
        id: null,
        billNo: null,
        status: null,
        amountUntaxed: null,
        amountTaxed: null,
        exchangeRate: null,
        orderDay: null,
        soType: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 重设主表的修改对话框数据 */
    reset() {
      this.form = {
        id: null,
        billNo: null,
        status: null,
        amountUntaxed: null,
        amountTaxed: null,
        orderDay: null,
        invoicePatternId: 8,
        payPatternId: 2,
        currencyId: 1,
        shipmentTypeId: 1,
        exchangeRate: 1.0,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };

      this.resetForm("form");
    },
    resetImportSo(){
      this.formImportSo = {
        excelUrl: null,
      }
    },
    handleImportOrdSo() {
      this.resetImportSo();
      this.openImportSo = true;
      this.title = "导入订单";
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增订单";
      getNextBillno("140").then(res => {
        this.form.billNo = res
      });
    },
    handleUpdate(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("订单已发布，不能修改");
        return;
      }

      const id = row.id || this.ids
      getSo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单";
      });
    },
    handleDelete(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("订单已发布，不能删除");
        return;
      }

      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;
      this.$modal.confirm('确认删除订单号为"' + billNoz + '"的数据项？').then(function () {
        return delSo(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    handleEnable(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定发布 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return enable(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("发布成功");
      }).catch(() => {
      });
    },
    handleChangeOrdSo(row) {
      const id = row.id || this.ids
      getSo(id).then(response => {
        this.form = response.data;
        //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
        this.openchangeOrdSo = true;
        this.title = "变更订单";
      });
    },
    handleFroze(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定冻结 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return froze(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("冻结成功");
      }).catch(() => {
      });
    },
    handleUnfroze(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定解冻 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return unfroze(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("解冻成功");
      }).catch(() => {
      });
    },
    handleDisable(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定停用 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return disable(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("停用成功");
      }).catch(() => {
      });
    },
    handleFinishforcely(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      this.$modal.confirm('确定强结 订单号为"' + billNoz + '"的数据项吗？').then(function () {
        return finishforcely(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("强结成功");
      }).catch(() => {
      });
    },
    handleExport() {
      this.download('ord/so/export', {
        ...this.queryParams
      }, `so_${new Date().getTime()}.xlsx`)
    },

    /** 提交按钮 */
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id == this.form.id) {
            //TODO 上述一行代码须替代或删除

            if (this.form.id != null) {
              updateSo(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
            } else {
              addSo(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
              updateBillSeq("140").then(res => {
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
    submitImportSo() {
      this.$refs["formImportSo"].validate(valid => {
        if (valid) {
          importExcel(this.formImportSo.excelUrl)
            .then(response => {
              this.openImportSo = false;
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        }
      });
    },
    // 取消子表单按钮
    cancelImportSo() {
      this.openImportSo = false;
      this.resetImportSo();
    },
    /** 提交按钮 */
    submitchangeOrdSo() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id == this.form.id) {
            this.form.params = {"id": this.form.id};
            //TODO 上述两行代码须替代或删除

            changeOrdSo(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openchangeOrdSo = false;
                this.getMasterList();
              });
          }
        }
      });
    },
    // 取消按钮
    cancelchangeOrdSo() {
      this.openchangeOrdSo = false;
      this.resetchangeOrdSo();
    },
    /** 查询子表订单明细数据 */
    getSoItemList() {
      var params = {"soId": this.masterId};
      listSoItem(params).then(res => {
        this.soItemList = res.rows;
      });
    },
    // 多选框选中数据
    handleSoItemSelectionChange(selection) {
      this.idsSoItem = selection.map(item => item.id)
      this.captionsSoItem = selection.map(item => item.seqNo)
      this.singleSoItem = selection.length !== 1
      this.multipleSoItem = !selection.length
    },
    /** 子表订单明细的CSS行样式 */
    rowClassNameSoItem({row, rowIndex}) {
      var clsName = ''

      if (this.idsSoItem.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }
      return clsName;
    },
    // 子表单重置
    resetSoItem() {
      this.formSoItem = {
        id: null,
        soId: this.masterId,
        seqNo: null,
        status: null,
        quantityOrder: null,
        price: null,
        discountPrice: null,
        amount: null,
        discountRate: null,
        finalAmount: null,
        quantityDelivery: null,
        quantityOs: null,
        quantityPlanned: null,
        priority: null,
        needDay: null,
        promiseDay: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formSoItem");
      // 按关键字段值来初始化子表单数据
      this.onSoItemSoIdSelection(this.masterId);
    },
    handleAddOrdSoItem() {
      this.resetSoItem();
      this.openSoItem = true;
      this.title = "新增订单明细";
    },
    handleUpdateOrdSoItem(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("订单已发布，不能修改");
        return;
      }

      this.resetSoItem();
      const id = row.id || this.idsSoItem
      getSoItem(id).then(response => {
        this.formSoItem = response.data;
        this.openSoItem = true;
        this.title = "修改订单明细";
      });
    },
    handleDeleteOrdSoItem(row) {
      if (this.masterStatus>=4){
        this.$modal.msgWarning("订单已发布，不能删除");
        return;
      }

      const ids = row.id || this.idsSoItem;
      const seqNoz = row.seqNo || this.captionsSoItem;

      this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function () {
        return delSoItem(ids);
      }).then(() => {
        this.getSoItemList();
        this.$modal.msgSuccess("删除成功");
      });
    },
    handleExportSoItem() {
      this.download('ord/soItem/export', {
        ...this.queryParams
      }, `soitem_${new Date().getTime()}.xlsx`)
    },
    /** 提交按钮 */
    submitSoItem() {
      this.$refs["formSoItem"].validate(valid => {
        if (valid) {
          if (this.formSoItem.id == this.formSoItem.id) {
            //TODO 上述一行代码须替代或删除

            if (this.formSoItem.id != null) {
              updateSoItem(this.formSoItem)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openSoItem = false;
                  this.getSoItemList();
                })
                .catch(error => {
                  this.$modal.msgError(error.msg);
                });
            } else {
              addSoItem(this.formSoItem)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openSoItem = false;
                  this.getSoItemList();
                })
                .catch(error => {
                  this.$modal.msgError(error.msg);
                });
            }
          }
        }
      });
    },
    // 取消子表单按钮
    cancelSoItem() {
      this.openSoItem = false;
      this.resetSoItem();
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
