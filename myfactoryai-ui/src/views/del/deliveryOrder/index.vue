<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>发货单编号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入发货单编号"
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
                v-for="dict in dict.type.sales_status_do"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item prop="deliveryDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.deliveryDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择交期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="expressNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物流单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.expressNo"
                    placeholder="请输入物流单号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="invoiceNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>发票单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.invoiceNo"
                    placeholder="请输入发票单号"
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
                    type="primary"
                    icon="el-icon-brush"
                    size="mini"
                    :disabled="multiple"
                    @click="handleFinishforcely"
                >强结</el-button>
            </el-col>
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
                type="warning"
                icon="el-icon-download"
                size="mini"
                :disabled="single"
                @click="handleExportSoBox"
              >订单装箱单</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                :disabled="single"
                @click="handleExportContractBox"
              >合同装箱单</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="220px"
                  :data="deliveryOrderList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="发货单编号" align="center" prop="billNo"  width="115"/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sales_status_do" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="客户" align="left" prop="customerId"  width="130">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="交期" align="center" prop="deliveryDay" width="100">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
               <el-table-column label="发货地址" align="right" prop="addressId"  width="250">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerAddressList">
                        <span v-if="item.id==scope.row.addressId"
                            :key="index"
                            size="mini">{{item.address}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="联系人" align="center" prop="contact" width="70"/>
                <el-table-column label="手机" align="left" prop="phone" width="110"/>
                <el-table-column label="物流单号" align="left" prop="expressNo"  width="140"/>
                <el-table-column label="发票单号" align="left" prop="invoiceNo"  width="140"/>
                <el-table-column label="项目" align="center" prop="projectId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="销售员" align="center" prop="salesId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.salesId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="备注" align="left" prop="remark"/>
                      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-edit"
                           :disabled="scope.row.status!=4"
                           @click="handleChangeDelDeliveryOrder(scope.row)"
                      >变更</el-button>
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-s-promotion"
                           :disabled="scope.row.status!=4"
                           @click="handleDelivery(scope.row)"
                      >发货</el-button>
                  </template>
              </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.openchangeDelDeliveryOrder对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeDelDeliveryOrder" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeDelDeliveryOrder" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>发货单编号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入发货单编号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="customerId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>客户</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.customerId" placeholder="请选择客户"
                               @change="onCustomerIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkCustomerList"
                            :key="index"
                            :label="fkrow.customerName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="deliveryDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>交期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.deliveryDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择交期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="addressId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>发货地址</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.addressId" placeholder="请选择发货地址"
                               @change="onAddressIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkCustomerAddressList"
                            :key="index"
                            :label="fkrow.address"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="contact" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>联系人</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.contact" placeholder="请选择联系人" size="mini">
                    <el-option
                        v-for="(fkrow, index) in fkCustomerAddressList"
                        :key="index"
                        :label="fkrow.contact"
                        :value="fkrow.contact"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="phone" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>手机</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.phone" placeholder="请选择手机" size="mini">
                    <el-option
                        v-for="(fkrow, index) in fkCustomerAddressList"
                        :key="index"
                        :label="fkrow.phone"
                        :value="fkrow.phone"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="expressNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>物流单号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.expressNo" placeholder="请输入物流单号" size="mini" />
                </el-form-item>
                <el-form-item  prop="invoiceNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>发票单号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.invoiceNo" placeholder="请输入发票单号" size="mini" />
                </el-form-item>
                <el-form-item prop="projectId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项目</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                               @change="onProjectIdSelection"  size="mini" >
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
                               @change="onSalesIdSelection" size="mini" >
                        <el-option v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
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
               <el-button type="primary" @click="submitchangeDelDeliveryOrder">确 定</el-button>
               <el-button @click="cancelchangeDelDeliveryOrder">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="发货单明细">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddDelGdItem"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleGdItem"
                            @click="handleUpdateDelGdItem"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleGdItem"
                            @click="handleDeleteDelGdItem"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="gdItem" border
                        :data="gdItemList"
                        highlight-current-row
                        :row-class-name="rowClassNameGdItem"
                        @selection-change="handleGdItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="产品编码" align="left" prop="productCode" width="140" show-overflow-tooltip/>
                    <el-table-column label="产品名称" align="left" prop="productName" width="120" show-overflow-tooltip/>
                    <el-table-column label="图号" align="left" prop="drawNo" width="140" show-overflow-tooltip/>
                    <el-table-column label="规格型号" align="left" prop="productSpec" width="140" show-overflow-tooltip/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="60">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="计划数" align="right" prop="quantity" width="80"/>
                  <el-table-column label="发货数" align="right" prop="quantity" width="80"/>
                  <el-table-column label="发货计划" align="center" prop="dpId"  width="130">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkDpList">
                                  <span v-if="item.id==scope.row.dpId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                      </template>
                    </template>
                    </el-table-column>
                    <el-table-column label="销售订单" align="center" prop="soId"  width="130">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkSoList">
                                  <span v-if="item.id==scope.row.soId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="项次" align="center" prop="soItemId"  width="60">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkSoItemList">
                                  <span v-if="item.id==scope.row.soItemId"
                                        :key="index"
                                        size="mini">{{item.seqNo}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
<!--                    <el-table-column label="仓库" align="center" prop="houseId"  width="90">-->
<!--                        <template  slot-scope="scope">-->
<!--                            <template v-for="(item,index) in fkWareHouseList">-->
<!--                                <span v-if="item.id==scope.row.houseId"-->
<!--                                    :key="index"-->
<!--                                    size="mini">{{item.houseName}}-->
<!--                                </span>-->
<!--                            </template>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="储位" align="center" prop="positionId"  width="100">-->
<!--                        <template  slot-scope="scope">-->
<!--                            <template v-for="(item,index) in fkWarePositionList">-->
<!--                                <span v-if="item.id==scope.row.positionId"-->
<!--                                    :key="index"-->
<!--                                    size="mini">{{item.positionName}}-->
<!--                                </span>-->
<!--                            </template>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="批号" align="left" prop="lotNo" width="130"/>-->
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateDelGdItem(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteDelGdItem(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openGdItem对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openGdItem" width="500px" append-to-body>
            <el-form ref="formGdItem" :model="formGdItem" :rules="rulesGdItem" label-width="140px" :inline-message="true">
                    <el-form-item prop="gdId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>发货单</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formGdItem.gdId" placeholder="请输入发货单" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGdItem.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="dpId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>发货计划</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.dpId" size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkDpList"
                             :key="index"
                             :label="fkrow.billNo"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item prop="soId" class="marginBottom0" >
                          <span slot="label">
                              <span class="fontSize12"><strong>销售订单</strong></span>
                          </span>
                    <el-select class="inputWidth" v-model="formGdItem.soId" placeholder="请选择销售订单"
                               @change="onGdItemSoIdSelection"  size="mini" >
                      <el-option
                        v-for="(fkrow, index) in fkSoList"
                        :key="index"
                        :label="fkrow.billNo"
                        :value="fkrow.id"
                        size="mini"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="soItemId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>项次</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.soItemId" placeholder="请选择订单项"
                                 @change="onGdItemSoItemIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkSoItemList"
                             :key="index"
                             :label="fkrow.seqNo"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="productCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品编码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.productCode" placeholder="请选择产品编码" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="drawNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>图号</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="formGdItem.drawNo" placeholder="请选择图号" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="unitId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>单位</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
                      <el-input class="inputWidth" v-model="formGdItem.quantity" placeholder="请输入数量" size="mini" />
                  </el-form-item>
                  <el-form-item prop="houseId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>仓库</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.houseId" placeholder="请选择仓库"
                                 @change="onGdItemHouseIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkWareHouseList"
                             :key="index"
                             :label="fkrow.houseName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="positionId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>储位</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formGdItem.positionId" placeholder="请选择储位"
                                 @change="onGdItemPositionIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkWarePositionList"
                             :key="index"
                             :label="fkrow.positionName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="lotNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>批号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGdItem.lotNo" placeholder="请输入批号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formGdItem.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitGdItem">确 定</el-button>
                <el-button @click="cancelGdItem">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listDeliveryOrder, getDeliveryOrder, delDeliveryOrder, addDeliveryOrder, updateDeliveryOrder } from "@/api/del/deliveryOrder";
import {getNextBillno, updateBillSeq } from "@/api/del/deliveryOrder";
import { froze,unfroze,disable,finishforcely,changeDelDeliveryOrder,delivery } from "@/api/del/deliveryOrder";
import { listGdItem, getGdItem, delGdItem, addGdItem, updateGdItem } from "@/api/del/gdItem";
import { listCustomer} from "@/api/cha/customer";
import { listCustomerAddress} from "@/api/cha/customerAddress";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listProject} from "@/api/ord/project";
import { listPlanItem} from "@/api/del/planItem";

export default {
    name: "DeliveryOrder",
    dicts: ['sales_status_do'],
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
            // 发货单管理表格数据
            deliveryOrderList: [],
            fkCustomerList: [],
            fkCustomerAddressList: [],
            fkSalesList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDpList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkWareHouseList: [],
            fkWarePositionList: [],
            fkProjectList: [],
            fkDeliveryOrderList: [],
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
                    { required: true, message: "发货单编号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
            },
            openchangeDelDeliveryOrder: false,
            ruleschangeDelDeliveryOrder: {
                billNo: [
                    { required: true, message: "发货单编号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              customerId: null,
              deliveryDay: null,
              addressId: null,
              contact: null,
              phone: null,
              expressNo: null,
              invoiceNo: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            gdItemList:[],
            // 选中数组
            idsGdItem: [],
            captionsGdItem: [],
            // 非单个禁用
            singleGdItem: true,
            // 非多个禁用
            multipleGdItem: true,
            // 子表选中数据
            checkedGdItem: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openGdItem: false,
            formGdItem: {},
            rulesGdItem: {
                gdId: [
                   { required: true, message: "发货单不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
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
        /** 查询外键Sales数据 */
        this.getSalesList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询交付计划DP数据 */
        this.getDpList();
        /** 查询外键So数据 */
        this.getSoList();
        /** 查询外键SoItem数据 */
        this.getSoItemList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
        /** 查询外键WarePosition数据 */
        this.getWarePositionList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键DeliveryOrder数据 */
        this.getDeliveryOrderList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listDeliveryOrder(this.queryParams).then(response => {
              this.deliveryOrderList = response.rows;
              this.total = response.total;
              if (this.deliveryOrderList && this.deliveryOrderList.length>0) {
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
                this.getGdItemList();
            }else {
                this.gdItemList = null;
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
        /** 查询外键Unit数据 */
        getUnitList() {
            listUnit().then(res => {
                this.fkUnitList = res.rows;
            });
        },
        /** 查询外键DP数据 */
        getDpList() {
          listPlanItem().then(res => {
            this.fkDpList = res.rows;
          });
        },
        /** 查询外键So数据 */
        getSoList() {
            listSo().then(res => {
                this.fkSoList = res.rows;
            });
        },
        /** 查询外键SoItem数据 */
        getSoItemList() {
            listSoItem().then(res => {
                this.fkSoItemList = res.rows;
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
        /** 查询外键DeliveryOrder数据 */
        getDeliveryOrderList() {
            listDeliveryOrder().then(res => {
                this.fkDeliveryOrderList = res.rows;
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
        /**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
                }
            });
        },
        /**主表外键AddressId被选择后触发事件*/
        onAddressIdSelection(fkId){
            this.fkCustomerAddressList.forEach(item=>{
                if(fkId === item.id){
                    this.form.addressId = item.id
                    this.form.contact = item.contact
                    this.form.phone = item.phone
                }
            });
        },
        /**主表外键ProjectId被选择后触发事件*/
        onProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                    this.form.projectId = item.id
                }
            });
        },
        /**主表外键SalesId被选择后触发事件*/
        onSalesIdSelection(fkId){
            this.fkSalesList.forEach(item=>{
                if(fkId === item.id){
                    this.form.salesId = item.id
                }
            });
        },
        /** 子表外键GdId被选择后触发事件 **/
        onGdItemGdIdSelection(fkId){
            this.fkDeliveryOrderList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.gdId = item.id
                }
            });
        },
        /** 子表外键SoId被选择后触发事件 **/
        onGdItemSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onGdItemSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                  this.formGdItem.productId = item.productId;
                  this.formGdItem.productCode = item.productCode;
                  this.formGdItem.productName = item.productName;
                  this.formGdItem.productSpec = item.productSpec;
                  this.formGdItem.drawNo = item.drawNo;
                  this.formGdItem.customerProductNo = item.customerProductNo;
                  this.formGdItem.abroadProductNo = item.abroadProductNo;
                  this.formGdItem.unitId = item.unitId;
                }
            });
        },
        /** 子表外键HouseId被选择后触发事件 **/
        onGdItemHouseIdSelection(fkId){
            this.fkWareHouseList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.houseId = item.id
                }
            });
        },
        /** 子表外键PositionId被选择后触发事件 **/
        onGdItemPositionIdSelection(fkId){
            this.fkWarePositionList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.positionId = item.id
                }
            });
        },

        /** 重设主表的变更对话框数据 */
        resetchangeDelDeliveryOrder (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                deliveryDay: null,
                expressNo: null,
                invoiceNo: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 发货单编号为"' + billNoz + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定解冻 发货单编号为"' + billNoz + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 发货单编号为"' + billNoz + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
       handleFinishforcely(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定强结 发货单编号为"' + billNoz + '"的数据项吗？').then(function() {
           return finishforcely(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("强结成功");
         }).catch(() => {});
       },
        handleExport(row) {
          this.download('del/deliveryOrder/export', {
            ...this.queryForm
          }, `deliveryOrder_${new Date().getTime()}.xlsx`);
        },
        handleExportSoBox(row) {
          const id = row.id || this.ids;
          getDeliveryOrder(id).then(response => {
            this.form = response.data;
            this.download('del/deliveryOrder/exportSoBox', {
              ...this.form
            }, `deliveryOrder_${new Date().getTime()}.xls`)
          });
        },
        handleExportContractBox(row) {
          const id = row.id || this.ids;
          getDeliveryOrder(id).then(response => {
            this.form = response.data;
            this.download('del/deliveryOrder/exportContractBox', {
              ...this.form
            }, `deliveryOrder_${new Date().getTime()}.xls`)
          });
        },
        handleChangeDelDeliveryOrder(row) {
            const id = row.id || this.ids
            getDeliveryOrder(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeDelDeliveryOrder = true;
                this.title = "变更发货单管理";
            });
        },
        handleDelivery(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定发货 发货单编号为"' + billNoz + '"的数据项吗？').then(function() {
              return delivery(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },






        /** 提交按钮 */
        submitchangeDelDeliveryOrder() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeDelDeliveryOrder(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeDelDeliveryOrder = false;
                      this.getMasterList();
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelchangeDelDeliveryOrder() {
            this.openchangeDelDeliveryOrder = false;
            this.resetchangeDelDeliveryOrder();
        },

        /** 查询子表发货单明细数据 */
        getGdItemList() {
            var params = {"gdId":this.masterId};
            listGdItem(params).then(res => {
                this.gdItemList = res.rows;
            });
        },
        // 多选框选中数据
        handleGdItemSelectionChange(selection) {
            this.idsGdItem = selection.map(item => item.id)
            this.captionsGdItem = selection.map(item => item.seqNo)
            this.singleGdItem = selection.length!==1
            this.multipleGdItem = !selection.length
        },
        /** 子表发货单明细的CSS行样式 */
        rowClassNameGdItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsGdItem.includes(row.id)){
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
        resetGdItem() {
            this.formGdItem = {
                id: null,
                gdId: this.masterId,
                seqNo: null,
                quantity: null,
                price: null,
                discountPrice: null,
                discountAmount: null,
                amount: null,
                serviceStartday: null,
                serviceEndday: null,
                lotNo: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formGdItem");
            // 按关键字段值来初始化子表单数据
            this.onGdItemGdIdSelection(this.masterId);
        },
        handleAddDelGdItem() {
          this.resetGdItem();
          this.openGdItem = true;
          this.title = "新增发货单明细";
        },
        handleUpdateDelGdItem(row) {
          this.resetGdItem();
          const id = row.id || this.idsGdItem
          getGdItem(id).then(response => {
              this.formGdItem = response.data;
              this.openGdItem = true;
              this.title = "修改发货单明细";
          });
        },
        handleDeleteDelGdItem(row) {
          const ids = row.id || this.idsGdItem;
          const seqNoz = row.seqNo || this.captionsGdItem;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delGdItem(ids);
          }).then(() => {
            this.getGdItemList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitGdItem() {
            this.$refs["formGdItem"].validate(valid => {
                if (valid) {
                  if(this.formGdItem.id==this.formGdItem.id){
                    this.formGdItem.params = {"id":this.formGdItem.id};
                    //TODO 上述两行代码须替代或删除

                    if (this.formGdItem.id != null) {
                        updateGdItem(this.formGdItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openGdItem = false;
                            this.getGdItemList();
                        });
                    } else {
                        addGdItem(this.formGdItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openGdItem = false;
                            this.getGdItemList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelGdItem() {
            this.openGdItem = false;
            this.resetGdItem();
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
