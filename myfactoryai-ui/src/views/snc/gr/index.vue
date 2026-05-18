<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>收货单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入收货单号"
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
            <el-form-item prop="grType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>收货类型</strong></span>
                </span>
                <el-select v-model="queryParams.grType" placeholder="请选择收货类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.snc_gr_type"
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
            <el-form-item prop="receiveDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>收货日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.receiveDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择收货日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="contactPerson" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>联系人</strong></span>
                </span>
                <el-input
                    v-model="queryParams.contactPerson"
                    placeholder="请输入联系人"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="contactPhone" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>联系电话</strong></span>
                </span>
                <el-input
                    v-model="queryParams.contactPhone"
                    placeholder="请输入联系电话"
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
                    @click="handleChangeSncGr"
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
                  :data="grList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="收货单号" align="center" prop="billNo"  width="140"/>
              <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
                </template>
            </el-table-column>
              <el-table-column label="收货类型" align="center" prop="grType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.snc_gr_type" :value="scope.row.grType"/>
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
              <el-table-column label="收货日期" align="center" prop="receiveDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.receiveDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="联系人" align="center" prop="contactPerson"  width="110"/>
                <el-table-column label="联系电话" align="left" prop="contactPhone"  width="110"/>
                <el-table-column label="备注" align="center" prop="remark"/>
                      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="236">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-circle-plus"
                           @click="handleStockIn(scope.row)"
                      >入库</el-button>
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-phone-outline"
                           @click="handleRequestInspection(scope.row)"
                      >请检</el-button>
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
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入收货单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="grType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.grType" placeholder="请选择收货类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.snc_gr_type"
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
                            :label="fkrow.supplierName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiveDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.receiveDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择收货日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="contactPerson" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPerson" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="contactPhone" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系电话</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPhone" placeholder="请输入联系电话" size="mini" />
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
        <!-- 创建master.openchangeSncGr对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeSncGr" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeSncGr" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入收货单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="grType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.grType" placeholder="请选择收货类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.snc_gr_type"
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
                            :label="fkrow.supplierName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiveDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.receiveDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择收货日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="contactPerson" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPerson" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="contactPhone" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系电话</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPhone" placeholder="请输入联系电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitchangeSncGr">确 定</el-button>
               <el-button @click="cancelchangeSncGr">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.openstockin对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openstockin" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesstockin" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入收货单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="grType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.grType" placeholder="请选择收货类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.snc_gr_type"
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
                            :label="fkrow.supplierName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiveDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>收货日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.receiveDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择收货日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="contactPerson" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPerson" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="contactPhone" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系电话</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contactPhone" placeholder="请输入联系电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitstockin">确 定</el-button>
               <el-button @click="cancelstockin">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="收货单明细">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSncGrItem"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleGrItem"
                            @click="handleUpdateSncGrItem"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleGrItem"
                            @click="handleDeleteSncGrItem"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="grItem" border
                        :data="grItemList"
                        highlight-current-row
                        :row-class-name="rowClassNameGrItem"
                        @selection-change="handleGrItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项次号" align="center" prop="seqNo" width="60"/>
                    <el-table-column label="状态" align="center" prop="status" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购单" align="right" prop="poId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkPoList">
                                <span v-if="item.id==scope.row.poId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购单明细" align="right" prop="poItemId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkPoItemList">
                                <span v-if="item.id==scope.row.poItemId"
                                    :key="index"
                                    size="mini">{{item.status}}
                                </span>
                            </template>
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
                    <el-table-column label="单位" align="right" prop="unitId"  width="60">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="数量" align="right" prop="quantity" width="110"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSncGrItem(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSncGrItem(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openGrItem对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openGrItem" width="500px" append-to-body>
            <el-form ref="formGrItem" :model="formGrItem" :rules="rulesGrItem" label-width="140px" :inline-message="true">
                    <el-form-item prop="grId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>收货单ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formGrItem.grId" placeholder="请输入收货单ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项次号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGrItem.seqNo" placeholder="请输入项次号" size="mini" />
                  </el-form-item>
                   <el-input class="inputWidth" v-model="formGrItem.status" v-show="false"/>
                   <el-form-item prop="poId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>采购单</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGrItem.poId" placeholder="请选择采购单"
                                 @change="onGrItemPoIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkPoList"
                             :key="index"
                             :label="fkrow.billNo"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="poItemId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>采购单明细</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGrItem.poItemId" placeholder="请选择采购单明细"
                                 @change="onGrItemPoItemIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkPoItemList"
                             :key="index"
                             :label="fkrow.status"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGrItem.materialId" placeholder="请选择物料" size="mini" disabled="true">
                          <el-option
                              v-for="(fkrow, index) in fkMaterialInfoList"
                              :key="index"
                              :label="fkrow.materialCode"
                              :value="fkrow.id"
                              size="mini"
                              :disabled="true"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formGrItem.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkPoItemList"
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
                      <el-select class="inputWidth" v-model="formGrItem.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkPoItemList"
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
                      <el-select class="inputWidth" v-model="formGrItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
                   <el-form-item prop="quantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGrItem.quantity" placeholder="请输入数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGrItem.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitGrItem">确 定</el-button>
                <el-button @click="cancelGrItem">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listGr, getGr, delGr, addGr, updateGr } from "@/api/snc/gr";
import {getNextBillno, updateBillSeq } from "@/api/snc/gr";
import { enable,changeSncGr,froze,unfroze,disable,stockin,requestInspection } from "@/api/snc/gr";
import { listGrItem, getGrItem, delGrItem, addGrItem, updateGrItem } from "@/api/snc/grItem";
import { listUnit} from "@/api/bas/unit";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import { listPo} from "@/api/sup/po";
import { listPoItem} from "@/api/sup/poItem";

export default {
    name: "Gr",
    dicts: ['bill_status_process_req', 'snc_gr_type'],
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
            // 来料收货登记表格数据
            grList: [],
            fkUnitList: [],
            fkSupplierList: [],
            fkMaterialInfoList: [],
            fkPoList: [],
            fkPoItemList: [],
            fkGrList: [],
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
                billNo: [
                    { required: true, message: "收货单号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "blur" }
                ],
                grType: [
                    { required: true, message: "收货类型不能为空", trigger: "change" }
                ],
            },
            openchangeSncGr: false,
            ruleschangeSncGr: {
                billNo: [
                    { required: true, message: "收货单号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "blur" }
                ],
                grType: [
                    { required: true, message: "收货类型不能为空", trigger: "change" }
                ],
            },
            openstockin: false,
            rulesstockin: {
                billNo: [
                    { required: true, message: "收货单号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "blur" }
                ],
                grType: [
                    { required: true, message: "收货类型不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              grType: null,
              supplierId: null,
              receiveDay: null,
              contactPerson: null,
              contactPhone: null,
            },
            //子表信息
            grItemList:[],
            // 选中数组
            idsGrItem: [],
            captionsGrItem: [],
            // 非单个禁用
            singleGrItem: true,
            // 非多个禁用
            multipleGrItem: true,
            // 子表选中数据
            checkedGrItem: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openGrItem: false,
            formGrItem: {},
            rulesGrItem: {
                grId: [
                   { required: true, message: "收货单ID不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项次号不能为空", trigger: "blur" }
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
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键Po数据 */
        this.getPoList();
        /** 查询外键PoItem数据 */
        this.getPoItemList();
        /** 查询外键Gr数据 */
        this.getGrList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listGr(this.queryParams).then(response => {
              this.grList = response.rows;
              this.total = response.total;
              if (this.grList && this.grList.length>0) {
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
                this.getGrItemList();
            }else {
                this.grItemList = null;
            }
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
        /** 查询外键PoItem数据 */
        getPoItemList() {
            listPoItem().then(res => {
                this.fkPoItemList = res.rows;
            });
        },
        /** 查询外键Gr数据 */
        getGrList() {
            listGr().then(res => {
                this.fkGrList = res.rows;
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
        /** 子表外键GrId被选择后触发事件 **/
        onGrItemGrIdSelection(fkId){
            this.fkGrList.forEach(item=>{
                if(fkId === item.id){
                   this.formGrItem.grId = item.id
                }
            });
        },
        /** 子表外键PoId被选择后触发事件 **/
        onGrItemPoIdSelection(fkId){
            this.fkPoList.forEach(item=>{
                if(fkId === item.id){
                   this.formGrItem.poId = item.id
                }
            });
        },
        /** 子表外键PoItemId被选择后触发事件 **/
        onGrItemPoItemIdSelection(fkId){
            this.fkPoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formGrItem.poItemId = item.id
                    this.formGrItem.materialId = item.materialId
                    this.formGrItem.materialName = item.materialName
                    this.formGrItem.materialSpec = item.materialSpec
                    this.formGrItem.unitId = item.unitId
                }
            });
        },
        /** 重设主表的变更对话框数据 */
        resetchangeSncGr (){
            this.form = {
                id: null,
                billNo: null,
                status: 0,
                grType: null,
                receiveDay: null,
                contactPerson: null,
                contactPhone: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的入库对话框数据 */
        resetstockin (){
            this.form = {
                id: null,
                billNo: null,
                status: 0,
                grType: null,
                receiveDay: null,
                contactPerson: null,
                contactPhone: null,
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
                status: 0,
                grType: null,
                receiveDay: null,
                contactPerson: null,
                contactPhone: null,
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
            getNextBillno("580").then(res => {
              this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getGr(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除收货单号为"' + billNoz + '"的数据项？').then(function() {
                return delGr(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
       handleEnable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定发放 收货单号为"' + billNoz + '"的数据项吗？').then(function() {
           return enable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("发放成功");
         }).catch(() => {});
       },
        handleChangeSncGr(row) {
            const id = row.id || this.ids
            getGr(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeSncGr = true;
                this.title = "变更";
            });
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 收货单号为"' + billNoz + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定解冻 收货单号为"' + billNoz + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 收货单号为"' + billNoz + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
        handleExport() {
            this.download('snc/gr/export', {
              ...this.queryParams
            }, `gr_${new Date().getTime()}.xlsx`)
        },
        handleStockIn(row) {
            const id = row.id || this.ids
            getGr(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openstockin = true;
                this.title = "入库";
            });
        },
        handleRequestInspection(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定请检 收货单号为"' + billNoz + '"的数据项吗？').then(function() {
              return requestInspection(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            }).catch(error => {
              this.$modal.msgError(error.msg);
            });
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateGr(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addGr(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                        updateBillSeq("580").then(res => {});
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
        submitchangeSncGr() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeSncGr(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeSncGr = false;
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
        cancelchangeSncGr() {
            this.openchangeSncGr = false;
            this.resetchangeSncGr();
        },





        /** 提交按钮 */
        submitstockin() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  stockin(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openstockin = false;
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
        cancelstockin() {
            this.openstockin = false;
            this.resetstockin();
        },



        /** 查询子表收货单明细数据 */
        getGrItemList() {
            var params = {"grId":this.masterId};
            listGrItem(params).then(res => {
                this.grItemList = res.rows;
            });
        },
        // 多选框选中数据
        handleGrItemSelectionChange(selection) {
            this.idsGrItem = selection.map(item => item.id)
            this.captionsGrItem = selection.map(item => item.seqNo)
            this.singleGrItem = selection.length!==1
            this.multipleGrItem = !selection.length
        },
        /** 子表收货单明细的CSS行样式 */
        rowClassNameGrItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsGrItem.includes(row.id)){
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
        resetGrItem() {
            this.formGrItem = {
                id: null,
                grId: this.masterId,
                seqNo: null,
                status: null,
                quantity: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formGrItem");
            // 按关键字段值来初始化子表单数据
            this.onGrItemGrIdSelection(this.masterId);
        },
        handleAddSncGrItem() {
          this.resetGrItem();
          this.openGrItem = true;
          this.title = "新增";
        },
        handleUpdateSncGrItem(row) {
          this.resetGrItem();
          const id = row.id || this.idsGrItem
          getGrItem(id).then(response => {
              this.formGrItem = response.data;
              this.openGrItem = true;
              this.title = "修改";
          });
        },
        handleDeleteSncGrItem(row) {
          const ids = row.id || this.idsGrItem;
          const seqNoz = row.seqNo || this.captionsGrItem;

          this.$modal.confirm('确定删除项次号为"' + seqNoz + '"的数据项？').then(function() {
              return delGrItem(ids);
          }).then(() => {
            this.getGrItemList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitGrItem() {
            this.$refs["formGrItem"].validate(valid => {
                if (valid) {
                  if(this.formGrItem.id==this.formGrItem.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formGrItem.id != null) {
                        updateGrItem(this.formGrItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openGrItem = false;
                            this.getGrItemList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addGrItem(this.formGrItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openGrItem = false;
                            this.getGrItemList();
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
        cancelGrItem() {
            this.openGrItem = false;
            this.resetGrItem();
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
