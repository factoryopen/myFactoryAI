<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="customerName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户名称</strong></span>
                </span>
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerFullname" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户全名</strong></span>
                </span>
        <el-input
          v-model="queryParams.customerFullname"
          placeholder="请输入客户全名"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户编码</strong></span>
                </span>
        <el-input
          v-model="queryParams.customerCode"
          placeholder="请输入客户编码"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="customerType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户类型</strong></span>
                </span>
        <el-select v-model="queryParams.customerType" placeholder="请选择客户类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.cha_customer_type"
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
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.object_status_basic"
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
              height="460px"
              :data="customerList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="客户名称" align="left" prop="customerName" width="130"/>
      <el-table-column label="客户全名" align="left" prop="customerFullname" width="240"/>
      <el-table-column label="客户别名" align="left" prop="customerAliasname" width="240"/>
      <el-table-column label="客户编码" align="center" prop="customerCode" width="110"/>
      <el-table-column label="客户类型" align="center" prop="customerType" width="75">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.cha_customer_type" :value="scope.row.customerType"/>
        </template>
      </el-table-column>
      <el-table-column label="联系人" align="center" prop="contact" width="65"/>
      <el-table-column label="电话" align="center" prop="phone" width="95"/>
      <el-table-column label="地址" align="left" prop="address" width="200"/>
      <el-table-column label="付款方式" align="center" prop="payPatternId" width="85">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkPayPatternList">
                        <span v-if="item.id==scope.row.payPatternId"
                              :key="index"
                              size="mini">{{ item.patternName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="发票类型" align="center" prop="invoicePatternId" width="85">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                              :key="index"
                              size="mini">{{ item.patternName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="币别" align="center" prop="currencyId" width="60">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkCurrencyList">
                        <span v-if="item.id==scope.row.currencyId"
                              :key="index"
                              size="mini">{{ item.currencyName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="出货方式" align="center" prop="shipmentTypeId" width="100">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkShipmentTypeList">
                        <span v-if="item.id==scope.row.shipmentTypeId"
                              :key="index"
                              size="mini">{{ item.typeDesc }}</span>
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
      <el-table-column label="状态" align="center" prop="status" width="55">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.object_status_basic" :value="scope.row.status"/>
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
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>

    <!-- 创建master.open对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item prop="customerName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>客户名称</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.customerName" placeholder="请输入客户名称" size="mini"/>
        </el-form-item>
        <el-form-item prop="customerFullname" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>客户全名</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.customerFullname" placeholder="请输入客户全名" size="mini"/>
        </el-form-item>
        <el-form-item prop="customerAliasname" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>客户别名</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.customerAliasname" placeholder="请输入客户别名" size="mini"/>
        </el-form-item>
        <el-form-item prop="customerCode" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>客户编码</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.customerCode" placeholder="请输入客户编码" size="mini"/>
        </el-form-item>
        <el-form-item prop="customerType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>客户类型</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="form.customerType" placeholder="请选择客户类型" size="mini">
            <el-option
              v-for="dict in dict.type.cha_customer_type"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contact" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.contact" placeholder="请输入联系人" size="mini"/>
        </el-form-item>
        <el-form-item prop="phone" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>电话</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.phone" placeholder="请输入电话" size="mini"/>
        </el-form-item>
        <el-form-item prop="address" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>地址</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="form.address" placeholder="请输入地址" size="mini"/>
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
        <el-form-item prop="invoicePatternId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>发票类型</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择发票类型"
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
        <el-form-item prop="shipmentTypeId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>出货方式</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择出货方式"
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
        <el-form-item prop="salesId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>销售员</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="form.salesId" placeholder="请选择销售员"
                     @change="onSalesIdSelection" size="mini">
            <el-option v-for="(fkrow, index) in fkUserList"
                       :key="index"
                       :label="fkrow.nickName"
                       :value="fkrow.userId"
                       size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-input class="inputWidth" v-model="form.status" v-show="false"/>
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

    <el-tabs>
      <el-tab-pane label="客户人员">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="handleAddChaCustomerContact"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-edit"
              :disabled="singleCustomerContact"
              @click="handleUpdateChaCustomerContact"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              :disabled="multipleCustomerContact"
              @click="handleDeleteChaCustomerContact"
            >删除
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="customerContact" border
                  :data="customerContactList"
                  highlight-current-row
                  :row-class-name="rowClassNameCustomerContact"
                  @selection-change="handleCustomerContactSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="联系人" align="center" prop="contact" width="65"/>
          <el-table-column label="级别" align="center" prop="talkLevel" width="115">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.crm_chance_talklevel" :value="scope.row.talkLevel"/>
            </template>
          </el-table-column>
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
                @click="handleUpdateChaCustomerContact(scope.row)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDeleteChaCustomerContact(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="客户账号">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="handleAddChaCustomerBank"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-edit"
              :disabled="singleCustomerBank"
              @click="handleUpdateChaCustomerBank"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              :disabled="multipleCustomerBank"
              @click="handleDeleteChaCustomerBank"
            >删除
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="customerBank" border
                  :data="customerBankList"
                  highlight-current-row
                  :row-class-name="rowClassNameCustomerBank"
                  @selection-change="handleCustomerBankSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="账号" align="left" prop="accountNo" width="160"/>
          <el-table-column label="开户行" align="left" prop="bankName" width="200"/>
          <el-table-column label="开户人" align="left" prop="ownerName" width="200"/>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdateChaCustomerBank(scope.row)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDeleteChaCustomerBank(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="客户地址">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="handleAddChaCustomerAddress"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-edit"
              :disabled="singleCustomerAddress"
              @click="handleUpdateChaCustomerAddress"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              :disabled="multipleCustomerAddress"
              @click="handleDeleteChaCustomerAddress"
            >删除
            </el-button>
          </el-col>
        </el-row>
        <el-table ref="customerAddress" border
                  :data="customerAddressList"
                  highlight-current-row
                  :row-class-name="rowClassNameCustomerAddress"
                  @selection-change="handleCustomerAddressSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center"/>
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
                @click="handleUpdateChaCustomerAddress(scope.row)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDeleteChaCustomerAddress(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 创建slaver.openCustomerContact对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openCustomerContact" width="500px" append-to-body>
      <el-form ref="formCustomerContact" :model="formCustomerContact" :rules="rulesCustomerContact" label-width="140px"
               :inline-message="true">
        <!--                    <el-form-item prop="customerId" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>客户</strong></span>-->
        <!--                      </span>-->
        <!--                    <el-input class="inputWidth" v-model="formCustomerContact.customerId" placeholder="请输入客户" size="mini" disabled="true"/>-->
        <!--                  </el-form-item>-->
        <el-form-item prop="contact" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>联系人</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.contact" placeholder="请输入联系人" size="mini"/>
        </el-form-item>
        <el-form-item prop="talkLevel" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>级别</strong></span>
                      </span>
          <el-select class="inputWidth" v-model="formCustomerContact.talkLevel" placeholder="请选择级别" size="mini">
            <el-option
              v-for="dict in dict.type.crm_chance_talklevel"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cellphone1" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机1</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.cellphone1" placeholder="请输入手机1" size="mini"/>
        </el-form-item>
        <el-form-item prop="cellphone2" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机2</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.cellphone2" placeholder="请输入手机2" size="mini"/>
        </el-form-item>
        <el-form-item prop="wechat" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>微信</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.wechat" placeholder="请输入微信" size="mini"/>
        </el-form-item>
        <el-form-item prop="email" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>邮箱</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.email" placeholder="请输入邮箱" size="mini"/>
        </el-form-item>
        <el-form-item prop="telephone" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>电话</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.telephone" placeholder="请输入电话" size="mini"/>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerContact.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCustomerContact">确 定</el-button>
        <el-button @click="cancelCustomerContact">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openCustomerBank对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openCustomerBank" width="500px" append-to-body>
      <el-form ref="formCustomerBank" :model="formCustomerBank" :rules="rulesCustomerBank" label-width="140px"
               :inline-message="true">
        <!--                    <el-form-item prop="customerId" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>客户</strong></span>-->
        <!--                      </span>-->
        <!--                    <el-input class="inputWidth" v-model="formCustomerBank.customerId" placeholder="请输入客户" size="mini" disabled="true"/>-->
        <!--                  </el-form-item>-->
        <el-form-item prop="accountNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>账号</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerBank.accountNo" placeholder="请输入账号" size="mini"/>
        </el-form-item>
        <el-form-item prop="bankName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>开户行</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerBank.bankName" placeholder="请输入开户行" size="mini"/>
        </el-form-item>
        <el-form-item prop="ownerName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>开户人</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerBank.ownerName" placeholder="请输入开户人" size="mini"/>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerBank.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCustomerBank">确 定</el-button>
        <el-button @click="cancelCustomerBank">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 创建slaver.openCustomerAddress对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openCustomerAddress" width="500px" append-to-body>
      <el-form ref="formCustomerAddress" :model="formCustomerAddress" :rules="rulesCustomerAddress" label-width="140px"
               :inline-message="true">
        <!--                    <el-form-item prop="customerId" class="marginBottom0">-->
        <!--                      <span slot="label">-->
        <!--                          <span class="fontSize12"><strong>客户</strong></span>-->
        <!--                      </span>-->
        <!--                    <el-input class="inputWidth" v-model="formCustomerAddress.customerId" placeholder="请输入客户" size="mini" disabled="true"/>-->
        <!--                  </el-form-item>-->
        <el-form-item prop="address" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>地址</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.address" placeholder="请输入地址" size="mini"/>
        </el-form-item>
        <el-form-item prop="contact" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>联系人</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.contact" placeholder="请输入联系人" size="mini"/>
        </el-form-item>
        <el-form-item prop="phone" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>手机</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.phone" placeholder="请输入手机" size="mini"/>
        </el-form-item>
        <el-form-item prop="Longitude" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>经度</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.Longitude" placeholder="请输入经度" size="mini"/>
        </el-form-item>
        <el-form-item prop="latitude" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>纬度</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.latitude" placeholder="请输入纬度" size="mini"/>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
          <el-input class="inputWidth" v-model="formCustomerAddress.remark" placeholder="请输入备注" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCustomerAddress">确 定</el-button>
        <el-button @click="cancelCustomerAddress">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer} from "@/api/cha/customer";
import {
  listCustomerContact,
  getCustomerContact,
  delCustomerContact,
  addCustomerContact,
  updateCustomerContact
} from "@/api/cha/customerContact";
import {
  listCustomerBank,
  getCustomerBank,
  delCustomerBank,
  addCustomerBank,
  updateCustomerBank
} from "@/api/cha/customerBank";
import {
  listCustomerAddress,
  getCustomerAddress,
  delCustomerAddress,
  addCustomerAddress,
  updateCustomerAddress
} from "@/api/cha/customerAddress";
import {listSales} from "@/api/cha/sales";
import {listUser} from "@/api/system/user";
import {listCurrency} from "@/api/bas/currency";
import {listInvoicePattern} from "@/api/bas/invoicePattern";
import {listPayPattern} from "@/api/bas/payPattern";
import {listShipmentType} from "@/api/bas/shipmentType";

export default {
  name: "Customer",
  dicts: ['cha_customer_type', 'object_status_basic', 'crm_chance_talklevel'],
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
      // 客户数据管理表格数据
      customerList: [],
      fkCustomerList: [],
      fkSalesList: [],
      fkUserList: [],
      fkCurrencyList: [],
      fkInvoicePatternList: [],
      fkPayPatternList: [],
      fkShipmentTypeList: [],
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
      form: {},
      rules: {
        customerType: [
          {required: true, message: "客户类型不能为空", trigger: "change"}
        ],
      },
      // 主查询参数
      queryParams: {
        pageEnable:true,
        pageNum: 1,
        pageSize: 12,
        customerName: null,
        customerFullname: null,
        customerCode: null,
        customerType: null,
        contact: null,
        phone: null,
        address: null,
        payPatternId: null,
        invoicePatternId: null,
        currencyId: null,
        shipmentTypeId: null,
        salesId: null,
        status: null,
      },
      //子表信息
      customerContactList: [],
      // 选中数组
      idsCustomerContact: [],
      captionsCustomerContact: [],
      // 非单个禁用
      singleCustomerContact: true,
      // 非多个禁用
      multipleCustomerContact: true,
      // 子表选中数据
      checkedCustomerContact: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openCustomerContact: false,
      formCustomerContact: {},
      rulesCustomerContact: {
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
      //子表信息
      customerBankList: [],
      // 选中数组
      idsCustomerBank: [],
      captionsCustomerBank: [],
      // 非单个禁用
      singleCustomerBank: true,
      // 非多个禁用
      multipleCustomerBank: true,
      // 子表选中数据
      checkedCustomerBank: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openCustomerBank: false,
      formCustomerBank: {},
      rulesCustomerBank: {
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
      //子表信息
      customerAddressList: [],
      // 选中数组
      idsCustomerAddress: [],
      captionsCustomerAddress: [],
      // 非单个禁用
      singleCustomerAddress: true,
      // 非多个禁用
      multipleCustomerAddress: true,
      // 子表选中数据
      checkedCustomerAddress: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openCustomerAddress: false,
      formCustomerAddress: {},
      rulesCustomerAddress: {
        customerId: [
          {required: true, message: "客户不能为空", trigger: "blur"}
        ],
      },
    };
  },
  created() {
    this.getMasterList();
    /** 查询外键Customer数据 */
    this.getCustomerList();
    /** 查询外键Sales数据 */
    this.getSalesList();
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
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
        this.total = response.total;
        if (this.customerList && this.customerList.length>0) {
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
        this.getCustomerContactList();
        this.getCustomerBankList();
        this.getCustomerAddressList();
      } else {
        this.customerContactList = null;
        this.customerBankList = null;
        this.customerAddressList = null;
      }
    },
    /** 查询外键Customer数据 */
    getCustomerList() {
      listCustomer().then(res => {
        this.fkCustomerList = res.rows;
      });
    },
    /** 查询外键Sales数据 */
    getSalesList() {
      listSales().then(res => {
        this.fkSalesList = res.rows;
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
      this.captions = selection.map(item => item.customerName)
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
    /**主表外键PayPatternId被选择后触发事件*/
    onPayPatternIdSelection(fkId) {
      this.fkPayPatternList.forEach(item => {
        if (fkId === item.id) {
          this.form.payPatternId = item.id
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
    /**主表外键SalesId被选择后触发事件*/
    onSalesIdSelection(fkId) {
      this.fkSalesList.forEach(item => {
        if (fkId === item.id) {
          this.form.salesId = item.id
        }
      });
    },
    /** 子表外键CustomerId被选择后触发事件 **/
    onCustomerContactCustomerIdSelection(fkId) {
      this.fkCustomerList.forEach(item => {
        if (fkId === item.id) {
          this.formCustomerContact.customerId = item.id
        }
      });
    },
    /** 子表外键CustomerId被选择后触发事件 **/
    onCustomerBankCustomerIdSelection(fkId) {
      this.fkCustomerList.forEach(item => {
        if (fkId === item.id) {
          this.formCustomerBank.customerId = item.id
        }
      });
    },
    /** 子表外键CustomerId被选择后触发事件 **/
    onCustomerAddressCustomerIdSelection(fkId) {
      this.fkCustomerList.forEach(item => {
        if (fkId === item.id) {
          this.formCustomerAddress.customerId = item.id
        }
      });
    },
    /** 重设主表的修改对话框数据 */
    reset() {
      this.form = {
        id: null,
        customerName: null,
        customerFullname: null,
        customerCode: null,
        customerType: null,
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
      this.title = "新增客户";
    },
    handleUpdate(row) {
      const id = row.id || this.ids
      getCustomer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户";
      });
    },
    handleDelete(row) {
      const ids = row.id || this.ids;
      const customerNamez = row.customerName || this.captions;
      this.$modal.confirm('确认删除客户名称为"' + customerNamez + '"的数据项？').then(function () {
        return delCustomer(ids);
      }).then(() => {
        this.getMasterList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    handleExport() {
      this.download('cha/customer/export', {
        ...this.queryParams
      }, `customer_${new Date().getTime()}.xlsx`)
    },

    /** 提交按钮 */
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id == this.form.id) {
            //TODO 上述一行代码须替代或删除

            if (this.form.id != null) {
              updateCustomer(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getMasterList();
                });
            } else {
              addCustomer(this.form)
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


    /** 查询子表客户人员数据 */
    getCustomerContactList() {
      var params = {"customerId": this.masterId};
      listCustomerContact(params).then(res => {
        this.customerContactList = res.rows;
      });
    },
    // 多选框选中数据
    handleCustomerContactSelectionChange(selection) {
      this.idsCustomerContact = selection.map(item => item.id)
      this.captionsCustomerContact = selection.map(item => item.id)
      this.singleCustomerContact = selection.length !== 1
      this.multipleCustomerContact = !selection.length
    },
    /** 子表客户人员的CSS行样式 */
    rowClassNameCustomerContact({row, rowIndex}) {
      var clsName = ''

      if (this.idsCustomerContact.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetCustomerContact() {
      this.formCustomerContact = {
        id: null,
        customerId: this.masterId,
        contact: null,
        talkLevel: null,
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
      this.resetForm("formCustomerContact");
      // 按关键字段值来初始化子表单数据
      this.onCustomerContactCustomerIdSelection(this.masterId);
    },
    handleAddChaCustomerContact() {
      this.resetCustomerContact();
      this.openCustomerContact = true;
      this.title = "新增客户人员";
    },
    handleUpdateChaCustomerContact(row) {
      this.resetCustomerContact();
      const id = row.id || this.idsCustomerContact
      getCustomerContact(id).then(response => {
        this.formCustomerContact = response.data;
        this.openCustomerContact = true;
        this.title = "修改客户人员";
      });
    },
    handleDeleteChaCustomerContact(row) {
      const ids = row.id || this.idsCustomerContact;
      const idz = row.id || this.captionsCustomerContact;

      this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function () {
        return delCustomerContact(ids);
      }).then(() => {
        this.getCustomerContactList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },

    /** 提交按钮 */
    submitCustomerContact() {
      this.$refs["formCustomerContact"].validate(valid => {
        if (valid) {
          if (this.formCustomerContact.id == this.formCustomerContact.id) {
            //TODO 上述一行代码须替代或删除

            if (this.formCustomerContact.id != null) {
              updateCustomerContact(this.formCustomerContact)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerContact = false;
                  this.getCustomerContactList();
                });
            } else {
              addCustomerContact(this.formCustomerContact)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerContact = false;
                  this.getCustomerContactList();
                });
            }
          }
        }
      });
    },

    // 取消子表单按钮
    cancelCustomerContact() {
      this.openCustomerContact = false;
      this.resetCustomerContact();
    },
    /** 查询子表客户账号数据 */
    getCustomerBankList() {
      var params = {"customerId": this.masterId};
      listCustomerBank(params).then(res => {
        this.customerBankList = res.rows;
      });
    },
    // 多选框选中数据
    handleCustomerBankSelectionChange(selection) {
      this.idsCustomerBank = selection.map(item => item.id)
      this.captionsCustomerBank = selection.map(item => item.bankName)
      this.singleCustomerBank = selection.length !== 1
      this.multipleCustomerBank = !selection.length
    },
    /** 子表客户账号的CSS行样式 */
    rowClassNameCustomerBank({row, rowIndex}) {
      var clsName = ''

      if (this.idsCustomerBank.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetCustomerBank() {
      this.formCustomerBank = {
        id: null,
        customerId: this.masterId,
        accountNo: null,
        bankName: null,
        ownerName: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formCustomerBank");
      // 按关键字段值来初始化子表单数据
      this.onCustomerBankCustomerIdSelection(this.masterId);
    },
    handleAddChaCustomerBank() {
      this.resetCustomerBank();
      this.openCustomerBank = true;
      this.title = "新增客户账号";
    },
    handleUpdateChaCustomerBank(row) {
      this.resetCustomerBank();
      const id = row.id || this.idsCustomerBank
      getCustomerBank(id).then(response => {
        this.formCustomerBank = response.data;
        this.openCustomerBank = true;
        this.title = "修改客户账号";
      });
    },
    handleDeleteChaCustomerBank(row) {
      const ids = row.id || this.idsCustomerBank;
      const bankNamez = row.bankName || this.captionsCustomerBank;

      this.$modal.confirm('确定删除开户行为"' + bankNamez + '"的数据项？').then(function () {
        return delCustomerBank(ids);
      }).then(() => {
        this.getCustomerBankList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },

    /** 提交按钮 */
    submitCustomerBank() {
      this.$refs["formCustomerBank"].validate(valid => {
        if (valid) {
          if (this.formCustomerBank.id == this.formCustomerBank.id) {
            //TODO 上述一行代码须替代或删除

            if (this.formCustomerBank.id != null) {
              updateCustomerBank(this.formCustomerBank)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerBank = false;
                  this.getCustomerBankList();
                });
            } else {
              addCustomerBank(this.formCustomerBank)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerBank = false;
                  this.getCustomerBankList();
                });
            }
          }
        }
      });
    },

    // 取消子表单按钮
    cancelCustomerBank() {
      this.openCustomerBank = false;
      this.resetCustomerBank();
    },
    /** 查询子表客户地址数据 */
    getCustomerAddressList() {
      var params = {"customerId": this.masterId};
      listCustomerAddress(params).then(res => {
        this.customerAddressList = res.rows;
      });
    },
    // 多选框选中数据
    handleCustomerAddressSelectionChange(selection) {
      this.idsCustomerAddress = selection.map(item => item.id)
      this.captionsCustomerAddress = selection.map(item => item.id)
      this.singleCustomerAddress = selection.length !== 1
      this.multipleCustomerAddress = !selection.length
    },
    /** 子表客户地址的CSS行样式 */
    rowClassNameCustomerAddress({row, rowIndex}) {
      var clsName = ''

      if (this.idsCustomerAddress.includes(row.id)) {
        clsName = 'selected-row';
      } else if (row.priority == 1) {
        clsName = 'super-urgent-row';
      } else if (row.priority == 2) {
        clsName = 'urgent-row';
      }


      return clsName;
    },
    // 子表单重置
    resetCustomerAddress() {
      this.formCustomerAddress = {
        id: null,
        customerId: this.masterId,
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
      this.resetForm("formCustomerAddress");
      // 按关键字段值来初始化子表单数据
      this.onCustomerAddressCustomerIdSelection(this.masterId);
    },
    handleAddChaCustomerAddress() {
      this.resetCustomerAddress();
      this.openCustomerAddress = true;
      this.title = "新增客户地址";
    },
    handleUpdateChaCustomerAddress(row) {
      this.resetCustomerAddress();
      const id = row.id || this.idsCustomerAddress
      getCustomerAddress(id).then(response => {
        this.formCustomerAddress = response.data;
        this.openCustomerAddress = true;
        this.title = "修改客户地址";
      });
    },
    handleDeleteChaCustomerAddress(row) {
      const ids = row.id || this.idsCustomerAddress;
      const idz = row.id || this.captionsCustomerAddress;

      this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function () {
        return delCustomerAddress(ids);
      }).then(() => {
        this.getCustomerAddressList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },

    /** 提交按钮 */
    submitCustomerAddress() {
      this.$refs["formCustomerAddress"].validate(valid => {
        if (valid) {
          if (this.formCustomerAddress.id == this.formCustomerAddress.id) {
            //TODO 上述一行代码须替代或删除

            if (this.formCustomerAddress.id != null) {
              updateCustomerAddress(this.formCustomerAddress)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerAddress = false;
                  this.getCustomerAddressList();
                });
            } else {
              addCustomerAddress(this.formCustomerAddress)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openCustomerAddress = false;
                  this.getCustomerAddressList();
                });
            }
          }
        }
      });
    },

    // 取消子表单按钮
    cancelCustomerAddress() {
      this.openCustomerAddress = false;
      this.resetCustomerAddress();
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
