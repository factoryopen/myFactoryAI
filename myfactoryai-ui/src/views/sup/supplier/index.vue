<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="supplierName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierName"
                    placeholder="请输入供应商名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="supplierCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierCode"
                    placeholder="请输入供应商编码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="fullName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>全名</strong></span>
                </span>
                <el-input
                    v-model="queryParams.fullName"
                    placeholder="请输入全名"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="materialEnabled" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物料供应否</strong></span>
                </span>
                <el-select v-model="queryParams.materialEnabled" placeholder="请选择物料供应否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="ordorOsEnabled" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>转包否</strong></span>
                </span>
                <el-select v-model="queryParams.ordorOsEnabled" placeholder="请选择转包否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="processOsEnabled" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序委外否</strong></span>
                </span>
                <el-select v-model="queryParams.processOsEnabled" placeholder="请选择工序委外否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="logisticEnabled" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物流配运否</strong></span>
                </span>
                <el-select v-model="queryParams.logisticEnabled" placeholder="请选择物流配运否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="contact" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>联系人</strong></span>
                </span>
                <el-input
                    v-model="queryParams.contact"
                    placeholder="请输入联系人"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="phone" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>电话</strong></span>
                </span>
                <el-input
                    v-model="queryParams.phone"
                    placeholder="请输入电话"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="address" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>地址</strong></span>
                </span>
                <el-input
                    v-model="queryParams.address"
                    placeholder="请输入地址"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>在用否</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择在用否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.object_status_enable"
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
                  height="460px"
                  :data="supplierList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="供应商名称" align="left" prop="supplierName"  width="120"/>
                <el-table-column label="供应商编码" align="center" prop="supplierCode"  width="140"/>
                <el-table-column label="全名" align="left" prop="fullName"  width="200"/>
              <el-table-column label="物料供应否" align="center" prop="materialEnabled" width="110">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.materialEnabled"/>
                </template>
            </el-table-column>
              <el-table-column label="转包否" align="center" prop="ordorOsEnabled" width="110">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.ordorOsEnabled"/>
                </template>
            </el-table-column>
              <el-table-column label="工序委外否" align="center" prop="processOsEnabled" width="110">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.processOsEnabled"/>
                </template>
            </el-table-column>
              <el-table-column label="物流配运否" align="center" prop="logisticEnabled" width="110">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.logisticEnabled"/>
                </template>
            </el-table-column>
                <el-table-column label="联系人" align="center" prop="contact"  width="65"/>
                <el-table-column label="电话" align="center" prop="phone"  width="95"/>
                <el-table-column label="地址" align="left" prop="address"  width="200"/>
              <el-table-column label="在用否" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
                </template>
            </el-table-column>
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
                <el-form-item  prop="supplierName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商名称</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.supplierName" placeholder="请输入供应商名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="supplierCode" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商编码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.supplierCode" placeholder="请输入供应商编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="fullName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>全名</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.fullName" placeholder="请输入全名" size="mini" />
                </el-form-item>
                <el-form-item  prop="materialEnabled" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>物料供应否</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.materialEnabled" placeholder="请选择物料供应否" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sys_yes_no"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="ordorOsEnabled" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>转包否</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.ordorOsEnabled" placeholder="请选择转包否" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sys_yes_no"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="processOsEnabled" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>工序委外否</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processOsEnabled" placeholder="请选择工序委外否" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sys_yes_no"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="logisticEnabled" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>物流配运否</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.logisticEnabled" placeholder="请选择物流配运否" size="mini" >
                        <el-option
                            v-for="dict in dict.type.sys_yes_no"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="contact" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.contact" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="phone" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>电话</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.phone" placeholder="请输入电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="address" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>地址</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.address" placeholder="请输入地址" size="mini" />
                </el-form-item>
              <el-form-item prop="status" class="marginBottom0">
                <span slot="label">
                       <span class="fontSize12"><strong>在用否</strong></span>
                </span>
                <el-select class="inputWidth" v-model="form.status" placeholder="请选择在用否" size="mini">
                  <el-option
                    v-for="dict in dict.type.object_status_enable"
                    :key="dict.value"
                    :label="dict.label"
                    size="mini"
                    :value="parseInt(dict.value)"
                  >
                  </el-option>
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
            <el-tab-pane label="供应商人员">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSupSupplierContact"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleSupplierContact"
                            @click="handleUpdateSupSupplierContact"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleSupplierContact"
                            @click="handleDeleteSupSupplierContact"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="supplierContact" border
                        :data="supplierContactList"
                        highlight-current-row
                        :row-class-name="rowClassNameSupplierContact"
                        @selection-change="handleSupplierContactSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="联系人" align="center" prop="contact" width="65"/>
                    <el-table-column label="手机1" align="center" prop="cellphone1" width="95"/>
                    <el-table-column label="手机2" align="center" prop="cellphone2" width="95"/>
                    <el-table-column label="微信" align="left" prop="wechat" width="110"/>
                    <el-table-column label="邮箱" align="right" prop="email" width="140"/>
                    <el-table-column label="电话" align="left" prop="telephone" width="95"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSupSupplierContact(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSupSupplierContact(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="供应商地址">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSupSupplierAddress"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleSupplierAddress"
                            @click="handleUpdateSupSupplierAddress"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleSupplierAddress"
                            @click="handleDeleteSupSupplierAddress"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="supplierAddress" border
                        :data="supplierAddressList"
                        highlight-current-row
                        :row-class-name="rowClassNameSupplierAddress"
                        @selection-change="handleSupplierAddressSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="地址" align="left" prop="address" width="200"/>
                    <el-table-column label="联系人" align="center" prop="contact" width="65"/>
                    <el-table-column label="手机" align="center" prop="phone" width="95"/>
                    <el-table-column label="经度" align="right" prop="Longitude" width="110"/>
                    <el-table-column label="纬度" align="right" prop="latitude" width="110"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSupSupplierAddress(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSupSupplierAddress(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="供应商账号">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSuplSupplierBank"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleSupplierBank"
                            @click="handleUpdateSuplSupplierBank"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleSupplierBank"
                            @click="handleDeleteSuplSupplierBank"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="supplierBank" border
                        :data="supplierBankList"
                        highlight-current-row
                        :row-class-name="rowClassNameSupplierBank"
                        @selection-change="handleSupplierBankSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="账号" align="left" prop="accountNo" width="140"/>
                    <el-table-column label="开户行" align="left" prop="bankName" width="200"/>
                    <el-table-column label="开户人" align="left" prop="ownerName" width="140"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSuplSupplierBank(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSuplSupplierBank(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openSupplierContact对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openSupplierContact" width="500px" append-to-body>
            <el-form ref="formSupplierContact" :model="formSupplierContact" :rules="rulesSupplierContact" label-width="140px" :inline-message="true">
                    <el-form-item prop="supplierId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>供应商</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formSupplierContact.supplierId" placeholder="请输入供应商" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="contact" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>联系人</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.contact" placeholder="请输入联系人" size="mini" />
                  </el-form-item>
                   <el-form-item prop="cellphone1" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机1</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.cellphone1" placeholder="请输入手机1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="cellphone2" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机2</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.cellphone2" placeholder="请输入手机2" size="mini" />
                  </el-form-item>
                   <el-form-item prop="wechat" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>微信</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.wechat" placeholder="请输入微信" size="mini" />
                  </el-form-item>
                   <el-form-item prop="email" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>邮箱</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.email" placeholder="请输入邮箱" size="mini" />
                  </el-form-item>
                   <el-form-item prop="telephone" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>电话</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.telephone" placeholder="请输入电话" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierContact.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSupplierContact">确 定</el-button>
                <el-button @click="cancelSupplierContact">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openSupplierAddress对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openSupplierAddress" width="500px" append-to-body>
            <el-form ref="formSupplierAddress" :model="formSupplierAddress" :rules="rulesSupplierAddress" label-width="140px" :inline-message="true">
                    <el-form-item prop="supplierId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>供应商</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formSupplierAddress.supplierId" placeholder="请输入供应商" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="address" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>地址</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.address" placeholder="请输入地址" size="mini" />
                  </el-form-item>
                   <el-form-item prop="contact" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>联系人</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.contact" placeholder="请输入联系人" size="mini" />
                  </el-form-item>
                   <el-form-item prop="phone" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.phone" placeholder="请输入手机" size="mini" />
                  </el-form-item>
                   <el-form-item prop="Longitude" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>经度</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.Longitude" placeholder="请输入经度" size="mini" />
                  </el-form-item>
                   <el-form-item prop="latitude" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>纬度</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.latitude" placeholder="请输入纬度" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierAddress.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSupplierAddress">确 定</el-button>
                <el-button @click="cancelSupplierAddress">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openSupplierBank对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openSupplierBank" width="500px" append-to-body>
            <el-form ref="formSupplierBank" :model="formSupplierBank" :rules="rulesSupplierBank" label-width="140px" :inline-message="true">
                    <el-form-item prop="supplierId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>供应商</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formSupplierBank.supplierId" placeholder="请输入供应商" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="accountNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>账号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierBank.accountNo" placeholder="请输入账号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="bankName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>开户行</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierBank.bankName" placeholder="请输入开户行" size="mini" />
                  </el-form-item>
                   <el-form-item prop="ownerName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>开户人</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierBank.ownerName" placeholder="请输入开户人" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formSupplierBank.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSupplierBank">确 定</el-button>
                <el-button @click="cancelSupplierBank">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier } from "@/api/sup/supplier";
import { listSupplierContact, getSupplierContact, delSupplierContact, addSupplierContact, updateSupplierContact } from "@/api/sup/supplierContact";
import { listSupplierAddress, getSupplierAddress, delSupplierAddress, addSupplierAddress, updateSupplierAddress } from "@/api/sup/supplierAddress";
import { listSupplierBank, getSupplierBank, delSupplierBank, addSupplierBank, updateSupplierBank } from "@/api/sup/supplierBank";

export default {
    name: "Supplier",
    dicts: ['sys_yes_no', 'object_status_enable'],
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
            // 供应商管理表格数据
            supplierList: [],
            fkSupplierList: [],
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
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              supplierName: null,
              supplierCode: null,
              fullName: null,
              materialEnabled: null,
              ordorOsEnabled: null,
              processOsEnabled: null,
              logisticEnabled: null,
              contact: null,
              phone: null,
              address: null,
              status: null,
            },
            //子表信息
            supplierContactList:[],
            // 选中数组
            idsSupplierContact: [],
            captionsSupplierContact: [],
            // 非单个禁用
            singleSupplierContact: true,
            // 非多个禁用
            multipleSupplierContact: true,
            // 子表选中数据
            checkedSupplierContact: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openSupplierContact: false,
            formSupplierContact: {},
            rulesSupplierContact: {
                supplierId: [
                   { required: true, message: "供应商不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            supplierAddressList:[],
            // 选中数组
            idsSupplierAddress: [],
            captionsSupplierAddress: [],
            // 非单个禁用
            singleSupplierAddress: true,
            // 非多个禁用
            multipleSupplierAddress: true,
            // 子表选中数据
            checkedSupplierAddress: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openSupplierAddress: false,
            formSupplierAddress: {},
            rulesSupplierAddress: {
                supplierId: [
                   { required: true, message: "供应商不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            supplierBankList:[],
            // 选中数组
            idsSupplierBank: [],
            captionsSupplierBank: [],
            // 非单个禁用
            singleSupplierBank: true,
            // 非多个禁用
            multipleSupplierBank: true,
            // 子表选中数据
            checkedSupplierBank: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openSupplierBank: false,
            formSupplierBank: {},
            rulesSupplierBank: {
                supplierId: [
                   { required: true, message: "供应商不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listSupplier(this.queryParams).then(response => {
              this.supplierList = response.rows;
              this.total = response.total;
              if (this.supplierList && this.supplierList.length>0) {
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
                this.getSupplierContactList();
                this.getSupplierAddressList();
                this.getSupplierBankList();
            }else {
                this.supplierContactList = null;
                this.supplierAddressList = null;
                this.supplierBankList = null;
            }
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
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
            this.captions = selection.map(item => item.supplierName)
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
        /** 子表外键SupplierId被选择后触发事件 **/
        onSupplierContactSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                   this.formSupplierContact.supplierId = item.id
                }
            });
        },
        /** 子表外键SupplierId被选择后触发事件 **/
        onSupplierAddressSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                   this.formSupplierAddress.supplierId = item.id
                }
            });
        },
        /** 子表外键SupplierId被选择后触发事件 **/
        onSupplierBankSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                   this.formSupplierBank.supplierId = item.id
                }
            });
        },

        /** 重设主表的新增对话框数据 */
        reset (){
            this.form = {
                id: null,
                supplierName: null,
                supplierCode: null,
                fullName: null,
                materialEnabled: null,
                ordorOsEnabled: null,
                processOsEnabled: null,
                logisticEnabled: null,
                contact: null,
                phone: null,
                address: null,
                status: null,
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
                supplierName: null,
                supplierCode: null,
                fullName: null,
                materialEnabled: null,
                ordorOsEnabled: null,
                processOsEnabled: null,
                logisticEnabled: null,
                contact: null,
                phone: null,
                address: null,
                status: null,
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
                supplierName: null,
                supplierCode: null,
                fullName: null,
                materialEnabled: null,
                ordorOsEnabled: null,
                processOsEnabled: null,
                logisticEnabled: null,
                contact: null,
                phone: null,
                address: null,
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
            this.open = true;
            this.title = "新增";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getSupplier(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const supplierNamez = row.supplierName || this.captions;
            this.$modal.confirm('确认删除供应商名称为"' + supplierNamez + '"的数据项？').then(function() {
                return delSupplier(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('sup/supplier/export', {
              ...this.queryParams
            }, `supplier_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateSupplier(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addSupplier(this.form)
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





        /** 查询子表供应商人员数据 */
        getSupplierContactList() {
            var params = {"supplierId":this.masterId};
            listSupplierContact(params).then(res => {
                this.supplierContactList = res.rows;
            });
        },
        // 多选框选中数据
        handleSupplierContactSelectionChange(selection) {
            this.idsSupplierContact = selection.map(item => item.id)
            this.captionsSupplierContact = selection.map(item => item.id)
            this.singleSupplierContact = selection.length!==1
            this.multipleSupplierContact = !selection.length
        },
        /** 子表供应商人员的CSS行样式 */
        rowClassNameSupplierContact({ row, rowIndex }) {
            var clsName = ''

            if (this.idsSupplierContact.includes(row.id)){
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
        resetSupplierContact() {
            this.formSupplierContact = {
                id: null,
                supplierId: this.masterId,
                contact: null,
                cellphone1: null,
                cellphone2: null,
                wechat: null,
                email: null,
                telephone: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formSupplierContact");
            // 按关键字段值来初始化子表单数据
            this.onSupplierContactSupplierIdSelection(this.masterId);
        },
        handleAddSupSupplierContact() {
          this.resetSupplierContact();
          this.openSupplierContact = true;
          this.title = "新增";
        },
        handleUpdateSupSupplierContact(row) {
          this.resetSupplierContact();
          const id = row.id || this.idsSupplierContact
          getSupplierContact(id).then(response => {
              this.formSupplierContact = response.data;
              this.openSupplierContact = true;
              this.title = "修改";
          });
        },
        handleDeleteSupSupplierContact(row) {
          const ids = row.id || this.idsSupplierContact;
          const idz = row.id || this.captionsSupplierContact;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delSupplierContact(ids);
          }).then(() => {
            this.getSupplierContactList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitSupplierContact() {
            this.$refs["formSupplierContact"].validate(valid => {
                if (valid) {
                  if(this.formSupplierContact.id==this.formSupplierContact.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formSupplierContact.id != null) {
                        updateSupplierContact(this.formSupplierContact)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierContact = false;
                            this.getSupplierContactList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addSupplierContact(this.formSupplierContact)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierContact = false;
                            this.getSupplierContactList();
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
        cancelSupplierContact() {
            this.openSupplierContact = false;
            this.resetSupplierContact();
        },
        /** 查询子表供应商地址数据 */
        getSupplierAddressList() {
            var params = {"supplierId":this.masterId};
            listSupplierAddress(params).then(res => {
                this.supplierAddressList = res.rows;
            });
        },
        // 多选框选中数据
        handleSupplierAddressSelectionChange(selection) {
            this.idsSupplierAddress = selection.map(item => item.id)
            this.captionsSupplierAddress = selection.map(item => item.id)
            this.singleSupplierAddress = selection.length!==1
            this.multipleSupplierAddress = !selection.length
        },
        /** 子表供应商地址的CSS行样式 */
        rowClassNameSupplierAddress({ row, rowIndex }) {
            var clsName = ''

            if (this.idsSupplierAddress.includes(row.id)){
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
        resetSupplierAddress() {
            this.formSupplierAddress = {
                id: null,
                supplierId: this.masterId,
                address: null,
                contact: null,
                phone: null,
                Longitude: null,
                latitude: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formSupplierAddress");
            // 按关键字段值来初始化子表单数据
            this.onSupplierAddressSupplierIdSelection(this.masterId);
        },
        handleAddSupSupplierAddress() {
          this.resetSupplierAddress();
          this.openSupplierAddress = true;
          this.title = "新增";
        },
        handleUpdateSupSupplierAddress(row) {
          this.resetSupplierAddress();
          const id = row.id || this.idsSupplierAddress
          getSupplierAddress(id).then(response => {
              this.formSupplierAddress = response.data;
              this.openSupplierAddress = true;
              this.title = "修改";
          });
        },
        handleDeleteSupSupplierAddress(row) {
          const ids = row.id || this.idsSupplierAddress;
          const idz = row.id || this.captionsSupplierAddress;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delSupplierAddress(ids);
          }).then(() => {
            this.getSupplierAddressList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitSupplierAddress() {
            this.$refs["formSupplierAddress"].validate(valid => {
                if (valid) {
                  if(this.formSupplierAddress.id==this.formSupplierAddress.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formSupplierAddress.id != null) {
                        updateSupplierAddress(this.formSupplierAddress)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierAddress = false;
                            this.getSupplierAddressList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addSupplierAddress(this.formSupplierAddress)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierAddress = false;
                            this.getSupplierAddressList();
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
        cancelSupplierAddress() {
            this.openSupplierAddress = false;
            this.resetSupplierAddress();
        },
        /** 查询子表供应商账号数据 */
        getSupplierBankList() {
            var params = {"supplierId":this.masterId};
            listSupplierBank(params).then(res => {
                this.supplierBankList = res.rows;
            });
        },
        // 多选框选中数据
        handleSupplierBankSelectionChange(selection) {
            this.idsSupplierBank = selection.map(item => item.id)
            this.captionsSupplierBank = selection.map(item => item.bankName)
            this.singleSupplierBank = selection.length!==1
            this.multipleSupplierBank = !selection.length
        },
        /** 子表供应商账号的CSS行样式 */
        rowClassNameSupplierBank({ row, rowIndex }) {
            var clsName = ''

            if (this.idsSupplierBank.includes(row.id)){
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
        resetSupplierBank() {
            this.formSupplierBank = {
                id: null,
                supplierId: this.masterId,
                accountNo: null,
                bankName: null,
                ownerName: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formSupplierBank");
            // 按关键字段值来初始化子表单数据
            this.onSupplierBankSupplierIdSelection(this.masterId);
        },
        handleAddSuplSupplierBank() {
          this.resetSupplierBank();
          this.openSupplierBank = true;
          this.title = "新增";
        },
        handleUpdateSuplSupplierBank(row) {
          this.resetSupplierBank();
          const id = row.id || this.idsSupplierBank
          getSupplierBank(id).then(response => {
              this.formSupplierBank = response.data;
              this.openSupplierBank = true;
              this.title = "修改";
          });
        },
        handleDeleteSuplSupplierBank(row) {
          const ids = row.id || this.idsSupplierBank;
          const bankNamez = row.bankName || this.captionsSupplierBank;

          this.$modal.confirm('确定删除开户行为"' + bankNamez + '"的数据项？').then(function() {
              return delSupplierBank(ids);
          }).then(() => {
            this.getSupplierBankList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitSupplierBank() {
            this.$refs["formSupplierBank"].validate(valid => {
                if (valid) {
                  if(this.formSupplierBank.id==this.formSupplierBank.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formSupplierBank.id != null) {
                        updateSupplierBank(this.formSupplierBank)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierBank = false;
                            this.getSupplierBankList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addSupplierBank(this.formSupplierBank)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openSupplierBank = false;
                            this.getSupplierBankList();
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
        cancelSupplierBank() {
            this.openSupplierBank = false;
            this.resetSupplierBank();
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
