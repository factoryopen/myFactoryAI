<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入采购单号"
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
                        v-for="dict in dict.type.purchasing_status_po"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
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
              <el-form-item prop="supplierId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.supplierId" placeholder="请选择供应商" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierList"
                      :key="index"
                      :label="fkrow.supplierCode"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="invoicePatternId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.invoicePatternId" placeholder="请选择开票方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkInvoicePatternList"
                      :key="index"
                      :label="fkrow.patternName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="payPatternId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>付款方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.payPatternId" placeholder="请选择付款方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkPayPatternList"
                      :key="index"
                      :label="fkrow.patternName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="currencyId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>币别</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.currencyId" placeholder="请选择币别" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkCurrencyList"
                      :key="index"
                      :label="fkrow.currencyName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="shipmentTypeId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>交货方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.shipmentTypeId" placeholder="请选择交货方式" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkShipmentTypeList"
                      :key="index"
                      :label="fkrow.typeCode"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
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
              <el-form-item prop="contactId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.contactId" placeholder="请选择联系人" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierContactList"
                      :key="index"
                      :label="fkrow.contact"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="buyerId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购员</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.buyerId" placeholder="请选择采购员" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkBuyersList"
                      :key="index"
                      :label="fkrow.userId"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="buyerDeptId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购部门</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.buyerDeptId" placeholder="请选择采购部门" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkBuyersList"
                      :key="index"
                      :label="fkrow.deptId"
                      :value="fkrow.deptId"
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
                    type="primary"
                    icon="el-icon-paperclip"
                    size="mini"
                    :disabled="multiple"
                    @click="handleEnable"
                >发放</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleChangeSupPo"
                >变更</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-ice-cream-round"
                    size="mini"
                    :disabled="multiple"
                    @click="handleFroze"
                >冻结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-magic-stick"
                    size="mini"
                    :disabled="multiple"
                    @click="handleUnfroze"
                >解冻</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDisable"
                >停用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="340px"
                  :data="poList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="采购单号" sortable align="left" prop="billNo"  width="140"/>
          <el-table-column label="状态" align="center" prop="status" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.purchasing_status_po" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="采购类型" sortable align="center" prop="purchasingType" width="100">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sup_purchasing_type" :value="scope.row.purchasingType"/>
            </template>
          </el-table-column>
          <el-table-column label="供应商" sortable align="left" prop="supplierId"  width="120">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                              :key="index"
                              size="mini">{{item.supplierCode}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="未税金额" align="right" prop="amountUntaxed"  width="90"/>
          <el-table-column label="含税金额" align="right" prop="amountTaxed"  width="90"/>
          <el-table-column label="开票方式" align="left" prop="invoicePatternId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                              :key="index"
                              size="mini">{{item.patternName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" align="left" prop="payPatternId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkPayPatternList">
                        <span v-if="item.id==scope.row.payPatternId"
                              :key="index"
                              size="mini">{{item.patternName}}</span>
              </template>
            </template>
          </el-table-column>
<!--          <el-table-column label="币别" align="center" prop="currencyId"  width="60">-->
<!--            <template  slot-scope="scope">-->
<!--              <template v-for="(item,index) in fkCurrencyList">-->
<!--                        <span v-if="item.id==scope.row.currencyId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{item.currencyName}}</span>-->
<!--              </template>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="交货方式" align="center" prop="shipmentTypeId"  width="80">-->
<!--            <template  slot-scope="scope">-->
<!--              <template v-for="(item,index) in fkShipmentTypeList">-->
<!--                        <span v-if="item.id==scope.row.shipmentTypeId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{item.typeCode}}</span>-->
<!--              </template>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="汇率" align="center" prop="exchangeRate"  width="70"/>-->
          <el-table-column label="下单日期" sortable align="center" prop="orderDay" width="95">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" align="center" prop="contactId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkSupplierContactList">
                        <span v-if="item.id==scope.row.contactId"
                              :key="index"
                              size="mini">{{item.contact}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="采购员" align="center" prop="buyerId"  width="80">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.buyerId"
                              :key="index"
                              size="mini">{{item.nickName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="采购部门" align="center" prop="buyerDeptId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.buyerDeptId"
                              :key="index"
                              size="mini">{{item.deptName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="100">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-bell"
                           :disabled="scope.row.status!=4"
                           @click="handleNoticeReceiving(scope.row)"
                      >通知收货</el-button>
                  </template>
              </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="purchasingType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.purchasingType" placeholder="请选择采购类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sup_purchasing_type"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="supplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.supplierId" placeholder="请选择供应商"
                               @change="onSupplierIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierList"
                            :key="index"
                            :label="fkrow.supplierCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="amountUntaxed" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>未含税金额</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.amountUntaxed" placeholder="请输入未含税金额" size="mini" />
                </el-form-item>
                <el-form-item  prop="amountTaxed" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>含税金额</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.amountTaxed" placeholder="请输入含税金额" size="mini" />
                </el-form-item>
                <el-form-item prop="invoicePatternId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择开票方式"
                               @change="onInvoicePatternIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkInvoicePatternList"
                            :key="index"
                            :label="fkrow.patternName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="payPatternId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>付款方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.payPatternId" placeholder="请选择付款方式"
                               @change="onPayPatternIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkPayPatternList"
                            :key="index"
                            :label="fkrow.patternName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="currencyId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>币别</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.currencyId" placeholder="请选择币别"
                               @change="onCurrencyIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkCurrencyList"
                            :key="index"
                            :label="fkrow.currencyName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="shipmentTypeId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>交货方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择交货方式"
                               @change="onShipmentTypeIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkShipmentTypeList"
                            :key="index"
                            :label="fkrow.typeCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="exchangeRate" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>汇率</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.exchangeRate" placeholder="请输入汇率" size="mini" />
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
                <el-form-item prop="contactId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.contactId" placeholder="请选择联系人"
                               @change="onContactIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierContactList"
                            :key="index"
                            :label="fkrow.contact"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="buyerId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购员</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.buyerId" placeholder="请选择采购员"
                               @change="onBuyerIdSelection" size="mini" >
                        <el-option v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="buyerDeptId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>采购部门</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.buyerDeptId" placeholder="请选择采购部门" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkDeptList"
                            :key="index"
                            :label="fkrow.deptName"
                            :value="fkrow.deptId"
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
        <!-- 创建master.openchangeSupPo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeSupPo" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeSupPo" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="purchasingType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.purchasingType" placeholder="请选择采购类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sup_purchasing_type"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="supplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.supplierId" placeholder="请选择供应商"
                               @change="onSupplierIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierList"
                            :key="index"
                            :label="fkrow.supplierCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="amountUntaxed" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>未含税金额</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.amountUntaxed" placeholder="请输入未含税金额" size="mini" />
                </el-form-item>
                <el-form-item  prop="amountTaxed" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>含税金额</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.amountTaxed" placeholder="请输入含税金额" size="mini" />
                </el-form-item>
                <el-form-item prop="invoicePatternId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择开票方式"
                               @change="onInvoicePatternIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkInvoicePatternList"
                            :key="index"
                            :label="fkrow.patternName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="payPatternId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>付款方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.payPatternId" placeholder="请选择付款方式"
                               @change="onPayPatternIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkPayPatternList"
                            :key="index"
                            :label="fkrow.patternName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="currencyId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>币别</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.currencyId" placeholder="请选择币别"
                               @change="onCurrencyIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkCurrencyList"
                            :key="index"
                            :label="fkrow.currencyName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="shipmentTypeId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>交货方式</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择交货方式"
                               @change="onShipmentTypeIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkShipmentTypeList"
                            :key="index"
                            :label="fkrow.typeCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="exchangeRate" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>汇率</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.exchangeRate" placeholder="请输入汇率" size="mini" />
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
                <el-form-item prop="contactId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.contactId" placeholder="请选择联系人"
                               @change="onContactIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierContactList"
                            :key="index"
                            :label="fkrow.contact"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="buyerId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购员</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.buyerId" placeholder="请选择采购员"
                               @change="onBuyerIdSelection" size="mini" >
                        <el-option v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="buyerDeptId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>采购部门</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.buyerDeptId" placeholder="请选择采购部门" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkDeptList"
                            :key="index"
                            :label="fkrow.deptName"
                            :value="fkrow.deptId"
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
               <el-button type="primary" @click="submitchangeSupPo">确 定</el-button>
               <el-button @click="cancelchangeSupPo">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="采购单明细">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSupPoItem"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePoItem"
                            @click="handleUpdateSupPoItem"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePoItem"
                            @click="handleDeleteSupPoItem"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="poItem" border
                        :data="poItemList"
                        highlight-current-row
                        :row-class-name="rowClassNamePoItem"
                        @selection-change="handlePoItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                  <el-table-column label="状态" align="center" prop="status" width="60">
                    <template slot-scope="scope">
                      <dict-tag :options="dict.type.purchasing_status_po" :value="scope.row.status"/>
                    </template>
                  </el-table-column>
                  <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                  <el-table-column label="物料名称" align="left" prop="materialName" width="120"/>
                  <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
                  <el-table-column label="单位" align="center" prop="unitId"  width="50">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{item.unitName}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="采购数" align="right" prop="quantityOrder" width="65"/>
                  <el-table-column label="购价" align="right" prop="price" width="65"/>
                  <el-table-column label="金额" align="right" prop="amount" width="65"/>
                  <el-table-column label="需求日期" align="center" prop="requireDay" width="90">
                    <template slot-scope="scope">
                      <span>{{ parseTime(scope.row.requireDay, '{y}-{m}-{d}') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户" align="center" prop="customerName" width="90" show-overflow-tooltip/>
                  <el-table-column label="售价" align="right" prop="priceSale" width="65"/>
                  <el-table-column label="来源单号" align="left" prop="sourceBillNo" width="130"/>
                  <el-table-column label="发货数" align="right" prop="quantityShipped" width="65"/>
                  <el-table-column label="收货数" align="right" prop="quantityArrival" width="65"/>
                  <el-table-column label="收检数" align="right" prop="quantityInspected" width="65"/>
                  <el-table-column label="入库数" align="right" prop="quantityInventory" width="65"/>
                  <el-table-column label="不良数" align="right" prop="quantityQcNg" width="65"/>
                  <el-table-column label="待判数" align="right" prop="quantityQcPending" width="65"/>
                  <el-table-column label="特采数" align="right" prop="quantityQcAod" width="65"/>
                  <el-table-column label="在退数" align="right" prop="quantityReturning" width="65"/>
                  <el-table-column label="已退数" align="right" prop="quantityReturned" width="65"/>
                  <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="140">
                       <template slot-scope="scope">
                           <el-button
                             size="mini"
                             type="text"
                             icon="el-icon-bell"
                             :disabled="masterStatus!=10 || scope.row.status!=5"
                             @click="handleNoticeReturning(scope.row)"
                           >通知退货</el-button>
                           <el-button
                             size="mini"
                             type="text"
                             icon="el-icon-minus"
                             :disabled="masterStatus!=10 || scope.row.status!=5"
                             @click="handleIgnoreReturning(scope.row)"
                           >弃退</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openPoItem对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPoItem" width="500px" append-to-body>
            <el-form ref="formPoItem" :model="formPoItem" :rules="rulesPoItem" label-width="140px" :inline-message="true">
                    <el-form-item prop="poId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购单ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPoItem.poId" placeholder="请输入采购单ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-input class="inputWidth" v-model="formPoItem.status" v-show="false"/>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formPoItem.materialId" placeholder="请选择物料"
                                 @change="onPoItemMaterialIdSelection"  size="mini" >
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
                      <el-select class="inputWidth" v-model="formPoItem.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
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
                      <el-select class="inputWidth" v-model="formPoItem.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialInfoList"
                            :key="index"
                            :label="fkrow.materialSpec"
                            :value="fkrow.materialSpec"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="unitId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formPoItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
                          <span class="fontSize12"><strong>采购数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.quantityOrder" placeholder="请输入采购数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="price" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购价</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.price" placeholder="请输入单价" size="mini" />
                  </el-form-item>
                   <el-form-item prop="amount" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>金额</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.amount" placeholder="请输入金额" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="requireDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>需求日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formPoItem.requireDay"
                               class="inputWidth"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择需求日期">
                      </el-date-picker>
                  </el-form-item>
                   <el-form-item prop="sourceBillId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>来源单ID</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.sourceBillId" placeholder="请输入来源单ID" size="mini" />
                  </el-form-item>
                   <el-form-item prop="sourceBillNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>来源单号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.sourceBillNo" placeholder="请输入来源单号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="quantityShipped" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>发货数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.quantityShipped" placeholder="请输入发货数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="quantityArrival" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>到货数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.quantityArrival" placeholder="请输入到货数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="quantityInspected" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>检验数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.quantityInspected" placeholder="请输入检验数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="quantityInventory" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>入库数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.quantityInventory" placeholder="请输入入库数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPoItem.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPoItem">确 定</el-button>
                <el-button @click="cancelPoItem">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listPo, getPo, delPo, addPo, updatePo } from "@/api/sup/po";
import {getNextBillno, updateBillSeq } from "@/api/sup/po";
import { enable,changeSupPo,froze,unfroze,disable,noticeReceiving,noticeReturning,ignoreReturning } from "@/api/sup/po";
import { listPoItem, getPoItem, delPoItem, addPoItem, updatePoItem } from "@/api/sup/poItem";
import { listUser} from "@/api/system/user";
import { listCurrency} from "@/api/bas/currency";
import { listInvoicePattern} from "@/api/bas/invoicePattern";
import { listPayPattern} from "@/api/bas/payPattern";
import { listShipmentType} from "@/api/bas/shipmentType";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listSupplier} from "@/api/sup/supplier";
import { listSupplierContact} from "@/api/sup/supplierContact";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import { listBuyers} from "@/api/sup/buyers";

export default {
    name: "Po",
    dicts: ['purchasing_status_po', 'sup_purchasing_type'],
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
            // 采购单管理表格数据
            poList: [],
            fkUserList: [],
            fkCurrencyList: [],
            fkInvoicePatternList: [],
            fkPayPatternList: [],
            fkShipmentTypeList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkSupplierList: [],
            fkSupplierContactList: [],
            fkMaterialInfoList: [],
            fkPoList: [],
            fkBuyersList: [],
            //主表当前行的ID
            masterId:"",
            masterStatus:null,
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
                billNo: [
                    { required: true, message: "采购单号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                purchasingType: [
                    { required: true, message: "采购类型不能为空", trigger: "change" }
                ],
                supplierId: [
                    { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
            },
            openchangeSupPo: false,
            ruleschangeSupPo: {
                billNo: [
                    { required: true, message: "采购单号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                purchasingType: [
                    { required: true, message: "采购类型不能为空", trigger: "change" }
                ],
                supplierId: [
                    { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              purchasingType: null,
              supplierId: null,
              amountUntaxed: null,
              amountTaxed: null,
              invoicePatternId: null,
              payPatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              exchangeRate: null,
              orderDay: null,
              contactId: null,
              buyerId: null,
              buyerDeptId: null,
            },
            //子表信息
            poItemList:[],
            // 选中数组
            idsPoItem: [],
            captionsPoItem: [],
            // 非单个禁用
            singlePoItem: true,
            // 非多个禁用
            multiplePoItem: true,
            // 子表选中数据
            checkedPoItem: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPoItem: false,
            formPoItem: {},
            rulesPoItem: {
                poId: [
                   { required: true, message: "采购单ID不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                materialId: [
                   { required: true, message: "物料ID不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位ID不能为空", trigger: "blur" }
                ],
                quantityOrder: [
                   { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "数量格式不正确", trigger: "blur" }
                ],
                price: [
                   { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "价格格式不正确", trigger: "blur" }
                ],
                amount: [
                   { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "金额格式不正确", trigger: "blur" }
                ],
                requireDay: [
                   { required: true, message: "需求日期不能为空", trigger: "blur" }
                ],
                sourceBillId: [
                   { required: true, message: "来源单ID不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
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
        /** 查询外键Dept数据 */
        this.getDeptList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键SupplierContact数据 */
        this.getSupplierContactList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键Po数据 */
        this.getPoList();
        /** 查询外键Buyers数据 */
        this.getBuyersList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPo(this.queryParams).then(response => {
              this.poList = response.rows;
              this.total = response.total;
              if (this.poList && this.poList.length>0) {
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
                this.getPoItemList();
            }else {
                this.poItemList = null;
            }
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键SupplierContact数据 */
        getSupplierContactList() {
            listSupplierContact().then(res => {
                this.fkSupplierContactList = res.rows;
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
        /** 查询外键Buyers数据 */
        getBuyersList() {
            listBuyers().then(res => {
                this.fkBuyersList = res.rows;
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
        /**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
        },
        /**主表外键InvoicePatternId被选择后触发事件*/
        onInvoicePatternIdSelection(fkId){
            this.fkInvoicePatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.invoicePatternId = item.id
                }
            });
        },
        /**主表外键PayPatternId被选择后触发事件*/
        onPayPatternIdSelection(fkId){
            this.fkPayPatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.payPatternId = item.id
                }
            });
        },
        /**主表外键CurrencyId被选择后触发事件*/
        onCurrencyIdSelection(fkId){
            this.fkCurrencyList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currencyId = item.id
                }
            });
        },
        /**主表外键ShipmentTypeId被选择后触发事件*/
        onShipmentTypeIdSelection(fkId){
            this.fkShipmentTypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.shipmentTypeId = item.id
                }
            });
        },
        /**主表外键ContactId被选择后触发事件*/
        onContactIdSelection(fkId){
            this.fkSupplierContactList.forEach(item=>{
                if(fkId === item.id){
                    this.form.contactId = item.id
                }
            });
        },
        /**主表外键BuyerId被选择后触发事件*/
        onBuyerIdSelection(fkId){
            this.fkBuyersList.forEach(item=>{
                if(fkId === item.id){
                    this.form.buyerId = item.id
                    this.form.buyerDeptId = item.deptId
                }
            });
        },
        /** 子表外键PoId被选择后触发事件 **/
        onPoItemPoIdSelection(fkId){
            this.fkPoList.forEach(item=>{
                if(fkId === item.id){
                   this.formPoItem.poId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onPoItemMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formPoItem.materialId = item.id
                    this.formPoItem.materialName = item.materialName;
                    this.formPoItem.materialSpec = item.materialSpec;
                    this.formPoItem.unitId = item.unitId;
                }
            });
        },
        /** 重设主表的变更对话框数据 */
        resetchangeSupPo (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                purchasingType: null,
                amountUntaxed: null,
                amountTaxed: null,
                exchangeRate: null,
                orderDay: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                purchasingType: null,
                amountUntaxed: null,
                amountTaxed: null,
                exchangeRate: null,
                orderDay: null,
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
            this.open = true;
            this.title = "新增";
            getNextBillno("220").then(res => {
              this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getPo(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除采购单号为"' + billNoz + '"的数据项？').then(function() {
                return delPo(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
       handleEnable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定发放 采购单号为"' + billNoz + '"的数据项吗？').then(function() {
           return enable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("发放成功");
         }).catch(() => {});
       },
        handleChangeSupPo(row) {
            const id = row.id || this.ids
            getPo(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeSupPo = true;
                this.title = "变更";
            });
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 采购单号为"' + billNoz + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定解冻 采购单号为"' + billNoz + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 采购单号为"' + billNoz + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
        handleExport() {
            this.download('sup/po/export', {
              ...this.queryParams
            }, `po_${new Date().getTime()}.xlsx`)
        },
        handleNoticeReceiving(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定通知收货 采购单号为"' + billNoz + '"的数据项吗？').then(function() {
              return noticeReceiving(row);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updatePo(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        });
                    } else {
                        addPo(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                        updateBillSeq("220").then(res => {});
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
        submitchangeSupPo() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeSupPo(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeSupPo = false;
                      this.getMasterList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelchangeSupPo() {
            this.openchangeSupPo = false;
            this.resetchangeSupPo();
        },
        /** 查询子表采购单明细数据 */
        getPoItemList() {
            var params = {"poId":this.masterId};
            listPoItem(params).then(res => {
                this.poItemList = res.rows;
            });
        },
        // 多选框选中数据
        handlePoItemSelectionChange(selection) {
            this.idsPoItem = selection.map(item => item.id)
            this.captionsPoItem = selection.map(item => item.seqNo)
            this.singlePoItem = selection.length!==1
            this.multiplePoItem = !selection.length
        },
        /** 子表采购单明细的CSS行样式 */
        rowClassNamePoItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPoItem.includes(row.id)){
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
        resetPoItem() {
            this.formPoItem = {
                id: null,
                poId: this.masterId,
                seqNo: null,
                status: null,
                quantityOrder: null,
                price: null,
                amount: null,
                requireDay: null,
                sourceBillId: null,
                sourceBillNo: null,
                quantityShipped: null,
                quantityArrival: null,
                quantityInspected: null,
                quantityInventory: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formPoItem");
            // 按关键字段值来初始化子表单数据
            this.onPoItemPoIdSelection(this.masterId);
        },
        handleAddSupPoItem() {
          this.resetPoItem();
          this.openPoItem = true;
          this.title = "新增";
        },
        handleUpdateSupPoItem(row) {
          this.resetPoItem();
          const id = row.id || this.idsPoItem
          getPoItem(id).then(response => {
              this.formPoItem = response.data;
              this.openPoItem = true;
              this.title = "修改";
          });
        },
        handleDeleteSupPoItem(row) {
          const ids = row.id || this.idsPoItem;
          const seqNoz = row.seqNo || this.captionsPoItem;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delPoItem(ids);
          }).then(() => {
            this.getPoItemList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handleNoticeReturning(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;

          this.$modal.confirm('确定通知退货 项次号为"' + row.seqNo + '"的数据项吗？').then(function() {
            return noticeReturning(row);
          }).then(response => {
            this.getMasterList();
            this.$modal.msgSuccess(response.msg);
          });
        },
        handleIgnoreReturning(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;

          this.$modal.confirm('确定通知退货 项次号为"' + row.seqNo + '"的数据项吗？').then(function() {
            return ignoreReturning(row);
          }).then(response => {
            this.getMasterList();
            this.$modal.msgSuccess(response.msg);
          });
        },
        /** 提交按钮 */
        submitPoItem() {
            this.$refs["formPoItem"].validate(valid => {
                if (valid) {
                  if(this.formPoItem.id==this.formPoItem.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPoItem.id != null) {
                        updatePoItem(this.formPoItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPoItem = false;
                            this.getPoItemList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPoItem(this.formPoItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPoItem = false;
                            this.getPoItemList();
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
        cancelPoItem() {
            this.openPoItem = false;
            this.resetPoItem();
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
