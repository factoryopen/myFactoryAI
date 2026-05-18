<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>计划项号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入计划项号"
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
                        v-for="dict in dict.type.bill_status_finishable"
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
            <el-form-item prop="unitId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.unitId" placeholder="请选择单位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.unitId"
                    :value="fkrow.unitId"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="requireDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>需求日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.requireDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择需求日期">
                </el-date-picker>
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
            <el-form-item prop="sourceBillId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>来源单ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.sourceBillId"
                    placeholder="请输入来源单ID"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
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
            <el-form-item prop="prId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>采购申请</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.prId" placeholder="请选择采购申请" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkPurchaseRequestList"
                    :key="index"
                    :label="fkrow.billNo"
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
                <el-button type="primary" icon="el-icon-plus" size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini"
 :disabled="single"                     @click="handleEdit"
                >编辑</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-paperclip" size="mini" :disabled="multiple" @click="handleEnable"
                >启用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-s-ticket" size="mini" :disabled="multiple" @click="handleToPo"
                >转单</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-ice-cream-round" size="mini" :disabled="multiple" @click="handleFroze"
                >冻结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-magic-stick" size="mini" :disabled="multiple"  @click="handleUnfroze"
                >解冻</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDisable"
                >停用</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="warning" icon="el-icon-download" size="mini" @click="handleDownload"
              >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="purchasingPlanList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="计划项号" align="left" prop="billNo" width="120"/>
            <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_finishable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="物料编码" align="left" prop="materialCode"  width="130" show-overflow-tooltip/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="100" show-overflow-tooltip/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="80" show-overflow-tooltip/>
            <el-table-column label="单位" align="center" prop="unitId" width="65">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="订单数量" align="right" prop="quantity" width="80"/>
            <el-table-column label="单价" align="right" prop="price" width="65"/>
            <el-table-column label="金额" align="right" prop="amount" width="65"/>
            <el-table-column label="需求日期" align="center" prop="requireDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.requireDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="优先级" align="center" prop="priority" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
            <el-table-column label="采购类型" align="center" prop="purchasingType" width="100">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sup_purchasing_type" :value="scope.row.purchasingType"/>
                </template>
            </el-table-column>
            <el-table-column label="来源单号" align="center" prop="sourceBillNo" width="116" show-overflow-tooltip/>
            <el-table-column label="采购申请" align="right" prop="prId"  width="116" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPurchaseRequestList">
                        <span v-if="item.id==scope.row.prId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项序" align="right" prop="prItemId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPurchaseRequestItemList">
                        <span v-if="item.id==scope.row.prItemId"
                            :key="index"
                            size="mini">{{item.seqNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="客户名称" align="left" prop="customerName" width="120" fixed="right" show-overflow-tooltip/>
            <el-table-column label="销售价" align="right" prop="priceSale" width="75" fixed="right" show-overflow-tooltip/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-crop"
                  @click="handleSplit(scope.row)"
                >分拆</el-button>
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
                    <span slot="label"><span class="fontSize12"><strong>计划项号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入计划项号" size="mini" disabled="true"/>
                </el-form-item>
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
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>物料</strong></span></span>
                    <el-select class="inputWidth" v-model="form.materialId" placeholder="请选择物料"
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
                    <span slot="label"><span class="fontSize12"><strong>订单数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入订单数量" size="mini" />
                </el-form-item>
                <el-form-item prop="price" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>单价</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.price" placeholder="请输入单价" size="mini" />
                  </el-form-item>
                  <el-form-item prop="amount" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>金额</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="form.amount" placeholder="请输入金额" size="mini" />
                  </el-form-item>
                  <el-form-item prop="requireDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>需求日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                    v-model="form.requireDay"
                                    class="inputWidth"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择需求日期">
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
<!-- 创建master.opentoPo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opentoPo" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulestoPo" label-width="120px" :inline-message="true">
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
                <el-select class="inputWidth" v-model="form.supplierId" filterable placeholder="请选择供应商" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkSupplierList"
                    :key="index"
                    :label="fkrow.supplierCode+' ['+fkrow.supplierName+']'"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
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
              <el-form-item prop="invoicePatternId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择开票方式" size="mini" >
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
                <el-select class="inputWidth" v-model="form.payPatternId" placeholder="请选择付款方式" size="mini" >
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
                <el-select class="inputWidth" v-model="form.currencyId" placeholder="请选择币别" size="mini" >
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
                <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择交货方式" size="mini" >
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
                <el-select class="inputWidth" v-model="form.contactId" placeholder="请选择联系人" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkSupplierContactList"
                    :key="index"
                    :label="fkrow.contact"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submittoPo">确 定</el-button>
                <el-button @click="canceltoPo">取 消</el-button>
            </div>
        </el-dialog>
      <el-dialog :title="title" class="dialogConfig" :visible.sync="openSplit" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rulesSplit" label-width="120px" :inline-message="true">
          <el-form-item  prop="billNo" class="marginBottom0">
            <span slot="label"><span class="fontSize12"><strong>计划项号</strong></span></span>
            <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入计划项号" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item  prop="purchasingType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购类型</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="form.purchasingType" placeholder="请选择采购类型" size="mini" disabled="true">
              <el-option
                v-for="dict in dict.type.sup_purchasing_type"
                :key="dict.value"
                :label="dict.label"
                size="mini"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="materialId" class="marginBottom0" >
            <span slot="label"><span class="fontSize12"><strong>物料</strong></span></span>
            <el-select class="inputWidth" v-model="form.materialId" placeholder="请选择物料"
                       @change="onMaterialIdSelection"  size="mini" >
              <el-option
                v-for="(fkrow, index) in fkMaterialInfoList"
                :key="index"
                :label="fkrow.materialCode+' ['+fkrow.materialName+'，'+fkrow.drawNo+']'"
                :value="fkrow.id"
                size="mini"
                disabled="true"
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
          <hr>
          <el-form-item  prop="quantity" class="marginBottom0">
            <span slot="label"><span class="fontSize12"><strong>分拆数量</strong></span></span>
            <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入订单数量" size="mini" />
          </el-form-item>
          <el-form-item  prop="remark" class="marginBottom0">
            <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
            <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitSplit">确 定</el-button>
          <el-button @click="cancelSplit">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {getNextBillno, splitPurchasingPlan, updateBillSeq} from "@/api/sup/purchasingPlan";
import { listPurchasingPlan, getPurchasingPlan, delPurchasingPlan, addPurchasingPlan, updatePurchasingPlan } from "@/api/sup/purchasingPlan";
import { enable,toPo,froze,unfroze,disable } from "@/api/sup/purchasingPlan";
import { listUnit} from "@/api/bas/unit";
import {listPurchaseRequest4fk} from "@/api/sup/purchaseRequest";
import { listPurchaseRequestItem} from "@/api/sup/purchaseRequestItem";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import {listCurrency} from "@/api/bas/currency";
import {listInvoicePattern} from "@/api/bas/invoicePattern";
import {listPayPattern} from "@/api/bas/payPattern";
import {listShipmentType} from "@/api/bas/shipmentType";
import {listSupplier} from "@/api/sup/supplier";
import {listSupplierContact} from "@/api/sup/supplierContact";

export default {
    name: "PurchasingPlan",
    dicts: ['bill_status_finishable', 'bill_priority', 'sup_purchasing_type', 'eng_material_consumingtype', 'sys_yes_no'],
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        captions: [],
        purchasingTypes: [],
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
        // 采购计划表格数据
        purchasingPlanList: [],
        fkUnitList: [],
        fkPurchaseRequestList: [],
        fkPurchaseRequestItemList: [],
        fkMaterialInfoList: [],
        fkCurrencyList: [],
        fkInvoicePatternList: [],
        fkPayPatternList: [],
        fkShipmentTypeList: [],
        fkSupplierList: [],
        fkSupplierContactList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          materialId: null,
          materialName: null,
          materialSpec: null,
          unitId: null,
          quantity: null,
          requireDay: null,
          priority: null,
          purchasingType: null,
          sourceBillId: null,
          sourceBillNo: null,
          prId: null,
          prItemId: null,
          consumeType: null,
          enableMust: null,
          enableReplace: null,
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
            quantity: [
                { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "数量格式不正确", trigger: "blur" }
            ],
            price: [
                { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "价格格式不正确", trigger: "blur" }
            ],
            amount: [
                { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "金额格式不正确", trigger: "blur" }
            ],
            purchasingType: [
                { required: true, message: "采购类型不能为空", trigger: "change" }
            ],
            requireDay: [
              { required: true, message: "需求日期不能为空", trigger: "blur" }
            ],
        },
        opentoPo: false,
        rulestoPo: {
            purchasingType: [
              { required: true, message: "采购类型不能为空", trigger: "change" }
            ],
            supplierId: [
              { required: true, message: "供应商不能为空", trigger: "blur" }
            ],
            priority: [
              { required: true, message: "优先级不能为空", trigger: "blur" }
            ],
            invoicePatternId: [
              { required: true, message: "开票方式不能为空", trigger: "blur" }
            ],
        },
        // 是否显示弹出层
        openSplit: false,
        // 表单参数
        // 表单校验
        rulesSplit: {
          quantity: [
            { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: "数量格式不正确", trigger: "blur" }
          ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键PurchaseRequest数据 */
          this.getPurchaseRequestList();
          /** 查询外键PurchaseRequestItem数据 */
          this.getPurchaseRequestItemList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
          /** 查询外键Currency数据 */
          this.getCurrencyList();
          /** 查询外键InvoicePattern数据 */
          this.getInvoicePatternList();
          /** 查询外键PayPattern数据 */
          this.getPayPatternList();
          /** 查询外键ShipmentType数据 */
          this.getShipmentTypeList();
          /** 查询外键Supplier数据 */
          this.getSupplierList();
          /** 查询外键SupplierContact数据 */
          this.getSupplierContactList();
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
          /** 查询外键PurchaseRequest数据 */
      getPurchaseRequestList() {
        listPurchaseRequest4fk().then(res => {
          this.fkPurchaseRequestList = res.rows;
        });
      },
          /** 查询外键PurchaseRequestItem数据 */
      getPurchaseRequestItemList() {
        listPurchaseRequestItem().then(res => {
          this.fkPurchaseRequestItemList = res.rows;
        });
      },
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
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
        /** 查询采购计划列表 */
        getList() {
            this.loading = true;
        listPurchasingPlan(this.queryParams).then(response => {
          this.purchasingPlanList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
        reset (){
            this.form = {
              id: null,
              billNo: null,
              status: null,
              materialId: null,
              materialName: null,
              materialSpec: null,
              unitId: null,
              quantity: null,
              price: null,
              amount: null,
              requireDay: null,
              priority: null,
              purchasingType: null,
              sourceBillId: null,
              sourceBillNo: null,
              prId: null,
              prItemId: null,
              consumeType: null,
              enableMust: null,
              enableReplace: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        resettoPo (){
            this.form = {
              purchasingType: null,
              supplierId: null,
              priority: null,
              invoicePatternId: null,
              payPatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              exchangeRate: null,
              orderDay: null,
              contactId: null,
            };
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
            this.purchasingTypes=selection.map(item => item.purchasingType)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },
        handleSplit(row) {
          const id = row.id || this.ids
          getPurchasingPlan(id).then(response => {
            this.form = response.data;
            this.openSplit = true;
            this.title = "分拆";
          });
        },
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增";
            getNextBillno("215").then(res => {
                this.form.billNo = res;
            });
        },
        handleDownload() {
            this.download('sup/purchasingPlan/export', {
             ...this.queryParams
             }, `purchasingPlan_${new Date().getTime()}.xlsx`)
        },
        handleEdit(row) {
            const id = row.id || this.ids
            getPurchasingPlan(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "编辑";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除计划项号为"' + billNoz + '"的数据项？').then(function() {
              return delPurchasingPlan(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
      handleEnable(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定启用 计划项号为"' + billNoz + '"的数据项吗？').then(function() {
          return enable(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("启用成功");
        }).catch(() => {});
      },
      handleToPo(row) {
          this.resettoPo();
          this.opentoPo = true;
          this.form.purchasingType=this.purchasingTypes[0];
          this.form.priority=3;
          this.form.invoicePatternId=8;
          this.form.payPatternId=2;
          this.form.currencyId=1;
          this.form.shipmentTypeId=1;
          this.form.exchangeRate=1.0;
          this.title = "转采购单";
        },
      handleFroze(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定冻结 计划项号为"' + billNoz + '"的数据项吗？').then(function() {
          return froze(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("冻结成功");
        }).catch(() => {});
      },
      handleUnfroze(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定解冻 计划项号为"' + billNoz + '"的数据项吗？').then(function() {
          return unfroze(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("解冻成功");
        }).catch(() => {});
      },
      handleDisable(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定停用 计划项号为"' + billNoz + '"的数据项吗？').then(function() {
          return disable(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("停用成功");
        }).catch(() => {});
      },
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updatePurchasingPlan(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                } else {
                  addPurchasingPlan(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                  updateBillSeq(215).then(res => {});
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
      submitSplit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            splitPurchasingPlan(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.open = false;
                this.getList();
              });
          }
        });
      },
      // 取消按钮
      cancelSplit() {
        this.openSplit = false;
        this.reset();
      },
      submittoPo() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {
                "purchasingType":this.form.purchasingType,
                "supplierId":this.form.supplierId,
                "priority":this.form.priority,
                "invoicePatternId":this.form.invoicePatternId,
                "payPatternId":this.form.payPatternId,
                "currencyId":this.form.currencyId,
                "shipmentTypeId":this.form.shipmentTypeId,
                "exchangeRate":this.form.exchangeRate,
                "orderDay":this.form.orderDay,
                "contactId":this.form.contactId,
              };

              toPo(this.ids, this.form)
              .then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
                this.opentoPo = false;
              });
            }
          }
        });
      },
      // 取消按钮
      canceltoPo() {
        this.opentoPo = false;
        this.resettoPo();
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
