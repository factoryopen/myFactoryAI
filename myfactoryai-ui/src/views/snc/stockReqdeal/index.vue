<template>
    <div class=
           "app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出入库请求码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入出入库请求码"
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
                  v-for="dict in dict.type.stock_status_request"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="ioType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>出入库类型</strong></span>
                </span>
                <el-select v-model="queryParams.ioType" placeholder="请选择出入库类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.snc_inventory_iotype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="requestBillNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>来源单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.requestBillNo"
                    placeholder="请输入来源单号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="sourceLineId" class="marginBottom5" >
                  <span slot="label">
                      <span class="fontSize12"><strong>来源产线</strong></span>
                  </span>
              <el-select class="inputWidth" v-model="queryParams.sourceLineId" placeholder="请选择来源产线" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkLineList"
                    :key="index"
                    :label="fkrow.lineName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sourceSupplierId" class="marginBottom5" >
                  <span slot="label">
                      <span class="fontSize12"><strong>来源厂商</strong></span>
                  </span>
              <el-select class="inputWidth" v-model="queryParams.sourceSupplierId" placeholder="请选择来源厂商" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkSupplierList"
                    :key="index"
                    :label="fkrow.supplierName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sourceCustomerId" class="marginBottom5" >
                  <span slot="label">
                      <span class="fontSize12"><strong>来源客户</strong></span>
                  </span>
              <el-select class="inputWidth" v-model="queryParams.sourceCustomerId" placeholder="请选择来源客户" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkCustomerList"
                    :key="index"
                    :label="fkrow.customerName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="projectId" class="marginBottom5" >
                  <span slot="label">
                      <span class="fontSize12"><strong>项目</strong></span>
                  </span>
              <el-select class="inputWidth" v-model="queryParams.projectId" placeholder="请选择项目" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkProjectList"
                    :key="index"
                    :label="fkrow.projectName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="requestorId" class="marginBottom5" >
                      <span slot="label">
                          <span class="fontSize12"><strong>请求人</strong></span>
                      </span>
              <el-select class="inputWidth" v-model="queryParams.requestorId" placeholder="请选择请求人" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkUserList"
                  :key="index"
                  :label="fkrow.nickName"
                  :value="fkrow.userId"
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
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="340px"
                  :data="stockReqdealList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column label="出入库请求码" align="left" prop="billNo"  width="140"/>
              <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                  <dict-tag :options="dict.type.stock_status_request" :value="scope.row.status"/>
                </template>
              </el-table-column>
              <el-table-column label="出入库类型" align="center" prop="ioType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.snc_inventory_iotype" :value="scope.row.ioType"/>
                </template>
              </el-table-column>
              <el-table-column label="请求单号" align="left" prop="requestBillNo"  width="140"/>
              <el-table-column label="请求人" align="center" prop="requestorId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.requestorId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
              </el-table-column>
              <el-table-column label="请求时间" align="center" prop="requestTime" width="140">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.requestTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="来源单号" align="left" prop="sourceBillNo"  width="100" show-overflow-tooltip/>
              <el-table-column label="来源产线" align="left" prop="sourceLineId"  width="100" show-overflow-tooltip>
                  <template  slot-scope="scope">
                      <template v-for="(item,index) in fkLineList">
                          <span v-if="item.id==scope.row.sourceLineId"
                              :key="index"
                              size="mini">{{item.lineName}}</span>
                      </template>
                  </template>
              </el-table-column>
              <el-table-column label="来源厂商" align="left" prop="sourceSupplierId"  width="100" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.sourceSupplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
              </el-table-column>
              <el-table-column label="来源客户" align="left" prop="sourceCustomerId"  width="100" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.sourceCustomerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
              </el-table-column>
              <el-table-column label="项目" align="left" prop="projectId"  width="90" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
              </el-table-column>
              <el-table-column label="备注" align="left" prop="remark"/>
              <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="180">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.ioType==1 || scope.row.ioType==2 || scope.row.ioType==6 || scope.row.ioType==9"
                    size="mini"
                    type="text"
                    icon="el-icon-receiving"
                    :disabled="scope.row.status!=4"
                    @click="handleReceiving(scope.row)"
                  >收货</el-button>
                  <el-button
                    v-if="scope.row.ioType==1 || scope.row.ioType==2 || scope.row.ioType==6 || scope.row.ioType==9"
                    size="mini"
                    type="text"
                    icon="el-icon-phone-outline"
                    :disabled="scope.row.status!=5"
                    @click="handleInspectionRequest(scope.row)"
                  >请检</el-button>
                  <el-button
                       v-if="scope.row.ioType==1 || scope.row.ioType==2 || scope.row.ioType==5 || scope.row.ioType==6
                          || scope.row.ioType==7 || scope.row.ioType==9 || scope.row.ioType==18"
                       size="mini"
                       type="text"
                       icon="el-icon-s-home"
                       :disabled="scope.row.status!=10 && scope.row.status!=11"
                       @click="handleStockin(scope.row)"
                  >入库</el-button>
                  <el-button
                    v-if="scope.row.ioType==3 || scope.row.ioType==4 || scope.row.ioType==8 || scope.row.ioType==19"
                       size="mini"
                       type="text"
                       icon="el-icon-shopping-cart-full"
                       @click="handleStockout(scope.row)"
                  >出库</el-button>
              </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>
      <!-- 创建master.openReceiving对话框 -->
      <el-dialog :title="title" class="ioDialogConfig" :visible.sync="openReceiving" width="1040px" append-to-body>
        <el-table v-loading="loading" border height="440px" highlight-current-row
                  :data="inventoryIoList"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
          <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
          <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
          <el-table-column label="单位" align="center" prop="unitId"  width="55">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                  <span v-if="item.id==scope.row.unitId" :key="index" size="mini">{{item.unitName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="quantity" width="100px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantity" type="number" align="right" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="来源批号" prop="sourceLotNo" width="200px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sourceLotNo" type="string" align="right" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="仓库" prop="houseId" width="120">
            <template  slot-scope="scope">
              <el-select v-model="scope.row.houseId" filterable style="width:110px" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkWareHouseList"
                  :key="index"
                  :label="fkrow.houseCode"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="储位" width="160" prop="positionId">
            <template  slot-scope="scope">
              <el-select v-model="scope.row.positionId" filterable size="mini">
                <el-option
                  v-for="(fkrow, index) in fkWarePositionList"
                  :key="index"
                  :label="fkrow.positionName"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <table>
            <tr>
              <td width="80">供应商：</td>
              <td width="160">
                <el-select v-model="form.sourceSupplierId" style="width:160px" size="mini" disabled="true">
                  <el-option
                    v-for="(fkrow, index) in fkSupplierList"
                    :key="index"
                    :label="fkrow.supplierCode"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </td>
              <td width="100">送货单号：</td>
              <td width="240"><el-input v-model="form.sourceBillNo" placeholder="请输入送货单号" size="mini" /></td>
              <td width="440"><el-button type="primary" @click="submitReceiving">收 货</el-button></td>
            </tr>
          </table>

        </div>
      </el-dialog>
        <!-- 创建master.openstockIn对话框 -->
        <el-dialog :title="title" class="ioDialogConfig" :visible.sync="openstockIn" width="1040px" append-to-body>
          <el-table v-loading="loading" border height="500px" highlight-current-row
                    :data="inventoryIoList"
                    :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                    :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column label="物料" align="left" prop="materialCode"  width="140"/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="55">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkUnitList">
                  <span v-if="item.id==scope.row.unitId" :key="index" size="mini">{{item.unitName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="quantity" width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity" type="number" align="right" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="物料料性" align="center" prop="materialAvailableType" width="80">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.material_type_available" :value="scope.row.materialAvailableType"/>
              </template>
            </el-table-column>
            <el-table-column label="仓库" prop="houseId" width="120">
              <template  slot-scope="scope">
                <el-select v-model="scope.row.houseId" filterable placeholder="请选择仓库" style="width:110px" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkWareHouseList"
                    :key="index"
                    :label="fkrow.houseCode"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="储位" width="165" prop="positionId">
              <template  slot-scope="scope">
                <el-select v-model="scope.row.positionId" filterable placeholder="请选择储位" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkWarePositionList"
                    :key="index"
                    :label="fkrow.positionName"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-crop"
                  @click="handleSplitWarepos(scope.row)"
                >分储</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDeleteWarepos(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitstockin">入 库</el-button>
          </div>
        </el-dialog>
        <!-- 创建master.openstockout对话框 -->
        <el-dialog :title="title" class="ioDialogConfig" :visible.sync="openstockout" width="1120px" append-to-body>
          <el-table v-loading="loading" border height="500px" highlight-current-row
                    :data="inventoryIoList"
                    :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                    :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column label="物料" align="left" prop="materialCode"  width="140"/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="55">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkUnitList">
                  <span v-if="item.id==scope.row.unitId" :key="index" size="mini">{{item.unitName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="quantity" width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quantity" align="right" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="仓库" prop="houseId" width="120">
              <template  slot-scope="scope">
                <el-select v-model="scope.row.houseId" filterable placeholder="请选择仓库" style="width:110px" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkWareHouseList"
                    :key="index"
                    :label="fkrow.houseCode"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="储位" width="165" prop="positionId">
              <template  slot-scope="scope">
                <el-select v-model="scope.row.positionId" filterable placeholder="请选择储位" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkWarePositionList"
                    :key="index"
                    :label="fkrow.positionName"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="库存批次" width="160" prop="ilId">
              <template  slot-scope="scope">
                <el-select v-model="scope.row.ilId" filterable placeholder="请选择库存批次" size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkInventoryList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-crop"
                  @click="handleSplitWarepos(scope.row)"
                >分储</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDeleteWarepos(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitstockout">出 库</el-button>
          </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="请出入库明细">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="stockRequestItem" border
                        :data="stockRequestItemList"
                        highlight-current-row
                        :row-class-name="rowClassNameStockRequestItem"
                        @selection-change="handleStockRequestItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                  <el-table-column label="项次" align="center" prop="seqNo"  width="50"/>


                  <el-table-column label="产品编码" align="left" prop="materialCode" width="130" show-overflow-tooltip/>
                  <el-table-column label="产品名称" align="left" prop="materialName" width="100" show-overflow-tooltip/>
                  <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
                  <el-table-column label="规格型号" align="left" prop="materialSpec" width="100" show-overflow-tooltip/>
                  <el-table-column label="单位" align="center" prop="unitId"  width="50">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{item.unitName}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量" align="right" prop="quantity" width="70"/>
                  <el-table-column label="来源批号" align="left" prop="sourceLotNo"  width="120" show-overflow-tooltip/>
                  <el-table-column label="仓库" align="center" prop="houseId"  width="75">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkWareHouseList">
                        <span v-if="item.id==scope.row.houseId"
                              :key="index"
                              size="mini">{{item.houseCode}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="库位" align="center" prop="positionId"  width="80" show-overflow-tooltip>
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkWarePositionList">
                        <span v-if="item.id==scope.row.positionId"
                              :key="index"
                              size="mini">{{item.positionName}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="检异量" align="right" prop="quantityQcExceptional" width="70"/>
                  <el-table-column label="合格数" align="right" prop="quantityQcGood" width="70"/>
                  <el-table-column label="不良数" align="right" prop="quantityQcNg" width="70"/>
                  <el-table-column label="重制数" align="right" prop="quantityQcRedisp" width="70"/>
                  <el-table-column label="重工数" align="right" prop="quantityQcRework" width="70"/>
                  <el-table-column label="制损数" align="right" prop="quantityQcPending" width="70"/>
                  <el-table-column label="特采数" align="right" prop="quantityQcAod" width="70"/>
                  <el-table-column label="备注" align="center" prop="remark"/>
                  <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="180">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-sugar"
                        @click="handleNormalizeCode(scope.row)"
                        :disabled="scope.row.materialCode.startsWith('T0')==false"
                      >转正料号
                      </el-button>
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleGenerateMaterialCode(scope.row)"
                        :disabled="scope.row.materialCode.startsWith('T0')==false"
                      >生成料号</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

      <!-- 创建slaver.openNormalizeCode对话框 -->
      <el-dialog :title="title" class="dialogConfig" :visible.sync="openNormalizeCode" width="500px" append-to-body>
        <el-form ref="formNormalizeCode" :model="formNormalizeCode" :rules="rulesNormalizeCode" label-width="120px" :inline-message="true">
          <el-form-item prop="seqNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>项次</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.seqNo" placeholder="请选择项次" size="mini" disabled="true"/>
          </el-form-item>
          <hr>
          <el-form-item prop="materialId" class="marginBottom0">
            <span slot="label">
                 <span class="fontSize12"><strong>产品编码</strong></span>
            </span>
            <el-select class="inputWidth" v-model="formNormalizeCode.materialId"  filterable placeholder="请选择产品编码" @change="onMaterialIdSelection" size="mini">
              <el-option
                v-for="(fkrow, index) in fkMaterialInfoList"
                :key="index"
                :label="fkrow.materialCode+' ['+fkrow.materialName+']'"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="materialName" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>产品名称</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.materialName" placeholder="请选择产品名称" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="materialSpec" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>产品规格</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.materialSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="drawNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>图号</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.drawNo" placeholder="请选择图号" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="compoundId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>材质</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formNormalizeCode.compoundId" placeholder="请选择材质" size="mini" disabled="true">
                <el-option
                  v-for="(fkrow, index) in fkCompoundList"
                  :key="index"
                  :label="fkrow.compoundNo+' ['+fkrow.compoundDesc+']'"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="customerProductNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>客户料号</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.customerProductNo" placeholder="请选择客户料号" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="AbroadProductNo" class="marginBottom0" >
            <span slot="label">
                <span class="fontSize12"><strong>进口料号</strong></span>
            </span>
            <el-input class="inputWidth" v-model="formNormalizeCode.AbroadProductNo" placeholder="请选择进口料号" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="unitId" class="marginBottom0" >
                <span slot="label">
                    <span class="fontSize12"><strong>单位</strong></span>
                </span>
            <el-select class="inputWidth" v-model="formNormalizeCode.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
      <!-- 创建slaver.openGenerateMaterialCode对话框 -->
      <el-dialog :title="title" class="dialogConfig" :visible.sync="openGenerateMaterialCode" width="500px" append-to-body>
        <el-form ref="formGenerateMaterialCode" :model="formGenerateMaterialCode" :rules="rulesGenerateMaterialCode" label-width="120px" :inline-message="true">
          <el-form-item prop="categoryId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>品类</strong></span>
              </span>
            <treeselect v-model="formGenerateMaterialCode.categoryId"
                        class="inputWidth"
                        :options="categoryOptions"
                        :normalizer="normalizer"
                        placeholder="请选择父品类"
                        @select="onCategoryIdSelection"
                        size="mini"/>
          </el-form-item>
          <el-form-item prop="baseType" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>物料类型</strong></span>
              </span>
            <el-select class="inputWidth" v-model="formGenerateMaterialCode.baseType" placeholder="请选择物料类型" size="mini" disabled="true">
              <el-option
                v-for="dict in dict.type.eng_material_basictype"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item  prop="drawNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>图号</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.drawNo" @change="onDrawNoChanged" placeholder="请输入图号" size="mini" />
          </el-form-item>
          <el-form-item prop="compoundId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>材质</strong></span>
              </span>
            <treeselect v-model="formGenerateMaterialCode.compoundId"
                        class="inputWidth"
                        :options="compoundOptions"
                        :normalizer="normalizeCompound"
                        placeholder="请选择材质"
                        @select="onCompoundIdSelection"
                        size="mini"/>
          </el-form-item>
          <el-form-item  prop="materialSpec" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>规格型号</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.materialSpec" placeholder="请输入规格型号" @change="onMaterialSpecChanged" size="mini" />
          </el-form-item>
          <hr>
          <el-form-item  prop="materialCode" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>物料编码</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.materialCode" placeholder="请输入物料编码" size="mini"/>
          </el-form-item>
          <el-form-item  prop="materialName" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>物料名称</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.materialName" placeholder="请输入物料名称" size="mini" />
          </el-form-item>
          <el-form-item prop="unitId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>单位</strong></span>
              </span>
            <el-select class="inputWidth" v-model="formGenerateMaterialCode.unitId" placeholder="请选择单位" size="mini" >
              <el-option
                v-for="(fkrow, index) in fkUnitList"
                :key="index"
                :label="fkrow.unitName"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="customerProductNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>客户料号</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.customerProductNo" placeholder="请输入客户料号" size="mini" />
          </el-form-item>
          <el-form-item  prop="abroadProductNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>进口料号</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.abroadProductNo" placeholder="请输入进口料号" size="mini" />
          </el-form-item>
          <el-form-item  prop="materialSize" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>尺寸</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateMaterialCode.materialSize" placeholder="请输入尺寸" @change="onMaterialSpecChanged" size="mini" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitGenerateMaterialCode">确 定</el-button>
          <el-button @click="cancelGenerateMaterialCode">取 消</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import { listStockReqdeal, getStockReqdeal, receiveMaterial, requestInspection, stockIn, stockout} from "@/api/snc/stockReqdeal";
import {gmgwSuggest, fifoSuggest, normalizeCode, generateMaterialCode } from "@/api/snc/stockReqdeal";
import { listStockRequestItem, getStockRequestItem} from "@/api/snc/stockRequestItem";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listSupplier} from "@/api/sup/supplier";
import { listStockRequest} from "@/api/snc/stockRequest";
import {listWareHouse} from "@/api/res/wareHouse";
import {listWarePosition} from "@/api/res/warePosition";
import {listInventory} from "@/api/snc/inventory";
import {listPureMaterialOrProductCategory} from "@/api/eng/category";
import {listPureMaterialOrProduct} from "@/api/eng/material"
import {listCompound} from "@/api/eng/compound";

import pdf from "vue-pdf";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "StockReqdeal",
     components: {pdf, Treeselect},
    dicts: ['stock_status_request', 'snc_inventory_iotype','material_type_available','eng_material_basictype'],
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
            // 请出入库处理表格数据
            stockReqdealList: [],
            inventoryIoList: [],
            // 物料分类管理树选项
            categoryOptions: [],
            // 材质数据树选项
            compoundOptions: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkLineList: [],
            fkProjectList: [],
            fkSupplierList: [],
            fkMaterialInfoList: [],
            fkCategoryList: [],
            fkCompoundList: [],
            fkStockRequestList: [],
            fkWareHouseList: [],
            fkWarePositionList: [],
            fkInventoryList:[],
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
            form: {
              status:null,
              sourceBillNo:null,
            },
            rules: {},
            openReceiving: false,
            rulesReceiving: {},
            openstockIn: false,
            rulesstockIn: {},
            openstockout: false,
            rulesstockout: {},
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              ioType: null,
              requestBillId: null,
              requestBillNo: null,
              requestorId: null,
              requestTime: null,
              sourceLineId: null,
              sourceSupplierId: null,
              sourceCustomerId: null,
              projectId: null,
            },
            //子表信息
            stockRequestItemList:[],
            // 选中数组
            idsStockRequestItem: [],
            captionsStockRequestItem: [],
            // 非单个禁用
            singleStockRequestItem: true,
            // 非多个禁用
            multipleStockRequestItem: true,
            // 子表选中数据
            checkedStockRequestItem: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openStockRequestItem: false,
            formStockRequestItem: {},
            rulesStockRequestItem: {},
            openNormalizeCode: false,
            formNormalizeCode:{},
            rulesNormalizeCode: {
              productId: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
            },
            openGenerateMaterialCode: false,
            formGenerateMaterialCode:{},
            rulesGenerateMaterialCode: {
              materialCode: [
                { required: true, message: "物料编码不能为空", trigger: "blur" }
              ],
              materialName: [
                { required: true, message: "物料名称不能为空", trigger: "blur" }
              ],
              categoryId: [
                { required: true, message: "品类不能为空", trigger: "blur" }
              ],
              unitId: [
                { required: true, message: "单位不能为空", trigger: "blur" }
              ],
            },

            //料号生成参数
            materialType:null,
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
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键StockRequest数据 */
        this.getStockRequestList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
        /** 查询外键WarePosition数据 */
        this.getWarePositionList();
        /** 查询外键Inventory数据 */
        this.getInventoryList();
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 取数 */
        this.getTreeselect();
    },
    mounted: function () {
    },
    methods: {
      /** 查询主表 */
      getMasterList() {
        this.loading = true;
        listStockReqdeal(this.queryParams).then(response => {
          this.stockReqdealList = response.rows;
          this.total = response.total;
          if (this.stockReqdealList && this.stockReqdealList.length > 0) {
            this.$refs.masterTable.setCurrentRow(response.rows[0], true);
            this.masterId = response.rows[0].id;
            this.masterStatus = response.rows[0].status;
          } else {
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
          this.getStockRequestItemList();
        } else {
          this.stockRequestItemList = null;
        }
      },
      /** 查询外键Customer数据 */
      getCustomerList() {
        listCustomer().then(res => {
          this.fkCustomerList = res.rows;
        });
      },
      /** 查询外键User数据 */
      getUserList() {
        listUser().then(res => {
          this.fkUserList = res.rows;
        });
      },
      /** 查询外键User数据 */
      getMaterialList() {
        listPureMaterialOrProduct().then(res => {
          this.fkMaterialInfoList = res.rows;
        });
      },
      /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
        });
      },
      /** 查询外键Line数据 */
      getLineList() {
        listLine().then(res => {
          this.fkLineList = res.rows;
        });
      },
      /** 查询外键Project数据 */
      getProjectList() {
        listProject().then(res => {
          this.fkProjectList = res.rows;
        });
      },
      /** 查询外键Supplier数据 */
      getSupplierList() {
        listSupplier().then(res => {
          this.fkSupplierList = res.rows;
        });
      },
      /** 查询外键StockRequest数据 */
      getStockRequestList() {
        listStockRequest().then(res => {
          this.fkStockRequestList = res.rows;
        });
      },
      /** 查询外键WareHouse数据 */
      getWareHouseList() {
        listWareHouse().then(res => {
          this.fkWareHouseList = res.rows;
        });
      },
      /** 查询外键WarePosition数据 */
      getInventoryList() {
        listInventory().then(res => {
          this.fkInventoryList = res.rows;
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
        this.captions = selection.map(item => item.billNo)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 主表的当前行切换 */
      handleCurrentChange(currentRow) {
        if (currentRow) {
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
      /** 重设主表的入库对话框数据 */
      resetReceiving() {
        this.inventoryIoList = null;
      },
      /** 重设主表的入库对话框数据 */
      resetstockIn() {
        this.inventoryIoList = null;
      },
      /** 重设主表的出库对话框数据 */
      resetstockout() {
        this.inventoryIoList = null;
      },
      handleExport(row) {
        const id = row.id || this.ids;
        getStockReqdeal(id).then(response => {
          this.form = response.data;
          this.download('snc/stockReqdeal/export', {
            ...this.form
          }, `stockReqdeal_${new Date().getTime()}.xlsx`)
        });
      },
      handleSplitWarepos(row) {
        var materialId = row.materialId;
        var quantityOrigin = 0;
        var quantityIO = 0;

        for (var item of this.stockRequestItemList) {
          if (materialId == item.materialId) quantityOrigin += Math.abs(item.quantity);
        }
        for (var item of this.inventoryIoList) {
          if (materialId == item.materialId) quantityIO += Math.abs(item.quantity);
        }
        var io = JSON.parse(JSON.stringify(row));
        io.quantity = quantityOrigin - quantityIO;
        this.inventoryIoList.push(io);
      },
      handleDeleteWarepos(row) {
        var materialId = row.materialId;
        var count = 0;
        for (var item of this.inventoryIoList) {
          if (materialId == item.materialId) count += 1;
        }

        if (count > 1) this.inventoryIoList.splice(this.inventoryIoList.indexOf(row), 1);
        else this.$modal.msgError("物料[" + row.materialName + "]：仅剩1条记录，不能删除！")
      },
      handleReceiving(row) {
        const id = row.id || this.ids;
        getStockReqdeal(id).then(response => {
          this.resetReceiving();
          this.form = response.data;
          this.inventoryIoList = JSON.parse(JSON.stringify(this.stockRequestItemList));
          this.openReceiving = true;
          this.title = "收货";
        });
      },
      handleInspectionRequest(row) {
        const billNoz = row.billNo || this.captions;
        this.$modal.confirm('确定请检存货交易请求为"' + billNoz + '"的数据项？').then(function () {
          return requestInspection(row);
        }).then(response => {
          this.getMasterList();
          this.$modal.msgSuccess(response.msg);
        });
      },
      handleStockin(row) {
        this.resetstockIn();
        var params = {"requestId": row.id};
        listStockRequestItem(params).then(res => {
          this.stockRequestItemList = res.rows;
          gmgwSuggest(this.stockRequestItemList).then(res => {
            this.inventoryIoList = res.data;
            this.openstockIn = true;
            this.title = "入库 [gmgw]";
          });
        });
      },
      handleStockout(row) {
        this.resetstockout();
        var params = {"requestId": row.id};
        listStockRequestItem(params).then(res => {
          this.stockRequestItemList = res.rows;
          fifoSuggest(this.stockRequestItemList).then(res => {
            this.inventoryIoList = res.data;
            this.openstockout = true;
            this.title = "出库 [fifo]";
          });
        });
      },
      /** 提交按钮 */
      submitReceiving() {
        if (!this.form.sourceBillNo) this.form.sourceBillNo = "";
        receiveMaterial(this.form, this.inventoryIoList)
          .then(response => {
            this.$modal.msgSuccess(response.msg);
            this.openReceiving = false;
            this.getMasterList();
          });
      },
      // 取消按钮
      cancelReceiving() {
        this.openReceiving = false;
        this.resetReceiving();
      },
      /** 提交按钮 */
      submitstockin() {
        stockIn(this.masterId, this.inventoryIoList)
          .then(response => {
            this.$modal.msgSuccess(response.msg);
            this.openstockIn = false;
            this.getMasterList();
          });
      },
      // 取消按钮
      cancelstockIn() {
        this.openstockIn = false;
        this.resetstockIn();
      },
      /** 提交按钮 */
      submitstockout() {
        stockout(this.masterId, this.inventoryIoList)
          .then(response => {
            this.$modal.msgSuccess(response.msg);
            this.openstockout = false;
            this.getMasterList();
          });
      },
      // 取消按钮
      cancelstockout() {
        this.openstockout = false;
        this.resetstockout();
      },
      /** 查询子表出入库请求数据 */
      getStockRequestItemList(row) {
        var params = {"requestId": this.masterId};
        listStockRequestItem(params).then(res => {
          this.stockRequestItemList = res.rows;
        });
      },
      // 多选框选中数据
      handleStockRequestItemSelectionChange(selection) {
        this.idsStockRequestItem = selection.map(item => item.id)
        this.captionsStockRequestItem = selection.map(item => item.seqNo)
        this.singleStockRequestItem = selection.length !== 1
        this.multipleStockRequestItem = !selection.length
      },
      /** 子表出入库请求的CSS行样式 */
      rowClassNameStockRequestItem({row, rowIndex}) {
        var clsName = ''

        if (this.idsStockRequestItem.includes(row.id)) {
          clsName = 'selected-row';
        } else if (row.priority == 1) {
          clsName = 'super-urgent-row';
        } else if (row.priority == 2) {
          clsName = 'urgent-row';
        }
        return clsName;
      },
      handleGenerateMaterialCode(row) {
        const id = row.id || this.ids;
        getStockRequestItem(id).then(response => {
          this.formGenerateMaterialCode = response.data;
          //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
          this.openGenerateMaterialCode = true;
          this.title = "生成料号";
        });
        this.getTreeselect();
      },
      handleNormalizeCode(row) {
        const id = row.id || this.ids;
        getStockRequestItem(id).then(response => {
          this.formNormalizeCode = response.data;
          //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
          this.openNormalizeCode = true;
          this.title = "转正料号";
        });
      },
      /** 重设主表的变更对话框数据 */
      resetNormalizeCode (){
        this.formNormalizeCode = {
          id: null,
          billNo: null,
          soId: null,
          soItemId: null,
          productId: null,
          productCode: null,
          productName: null,
          productSpec: null,
          drawNo: null,
          customerProductNo:null,
          AbroadProductNo:null,
          unitId: null,
        };
        this.resetForm("formNormalizeCode");
      },
      resetGenerateMaterialCode() {
        this.formGenerateMaterialCode = {
          id: null,
          materialId: null,
          materialCode: null,
          materialName: null,
          materialSpec: null,
          materialSize: null,
          baseType: null,
          drawNo: null,
          categoryId: null,
          compoundId: null,
          customerProductNo:null,
          abroadProductNo:null,
          unitId: null,
        };
        this.resetForm("formGenerateMaterialCode");
      },
      /**主表外键SoId被选择后触发事件*/
      onMaterialIdSelection(fkid){
        this.fkMaterialInfoList.forEach(item=>{
          if(fkid === item.id){
            this.formNormalizeCode.productId = item.id;
            this.formNormalizeCode.materialCode = item.materialCode;
            this.formNormalizeCode.materialName = item.materialName;
            this.formNormalizeCode.materialSpec = item.materialSpec;
            this.formNormalizeCode.drawNo = item.drawNo;
            this.formNormalizeCode.categoryId = item.categoryId;
            this.formNormalizeCode.compoundId = item.compoundId;
            this.formNormalizeCode.customerProductNo = item.customerProductNo;
            this.formNormalizeCode.AbroadProductNo = item.AbroadProductNo;
            this.formNormalizeCode.unitId = item.unitId;
          }
        });
      },
      /**主表外键CategoryId被选择后触发事件*/
      onCategoryIdSelection(node, instanceId){
        this.categoryNo = node.categoryNo;
        this.formGenerateMaterialCode.baseType = node.materialType;
        this.baseType = this.formGenerateMaterialCode.baseType;
        this.drawNo = this.formGenerateMaterialCode.drawNo;
        this.materialSpec = this.formGenerateMaterialCode.materialSpec;

        this.formGenerateMaterialCode.materialCode ="";
        if (this.categoryNo!=null) this.formGenerateMaterialCode.materialCode=this.categoryNo;
        if (this.baseType==1){
          if (this.drawNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.drawNo;
        }else if (this.baseType==3){
          if(this.compoundNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.compoundNo;
          if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateMaterialCode.materialCode += "-"+this.materialSpec;
        }
        this.formGenerateMaterialCode.materialCode += "-01";
      },
      /**主表外键CategoryId被选择后触发事件*/
      onCompoundIdSelection(node, instanceId){
        this.compoundNo = node.compoundNo;
        this.baseType = this.formGenerateMaterialCode.baseType;
        this.drawNo = this.formGenerateMaterialCode.drawNo;
        this.materialSpec = this.formGenerateMaterialCode.materialSpec;

        this.formGenerateMaterialCode.materialCode ="";
        if (this.categoryNo!=null) this.formGenerateMaterialCode.materialCode=this.categoryNo;
        if (this.baseType==1){
          if (this.drawNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.drawNo;
        }else if (this.baseType==3){
          if(this.compoundNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.compoundNo;
          if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateMaterialCode.materialCode += "-"+this.materialSpec;
        }
        this.formGenerateMaterialCode.materialCode += "-01";
      },
      /**主表外键CategoryId被选择后触发事件*/
      onDrawNoChanged(){
        this.drawNo = this.formGenerateMaterialCode.drawNo;
        this.baseType = this.formGenerateMaterialCode.baseType;
        this.materialSpec = this.formGenerateMaterialCode.materialSpec;

        this.formGenerateMaterialCode.materialCode ="";
        if (this.categoryNo!=null) this.formGenerateMaterialCode.materialCode=this.categoryNo;
        if (this.baseType==1){
          if (this.drawNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.drawNo;
        }else if (this.baseType==3){
          if(this.compoundNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.compoundNo;
          if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateMaterialCode.materialCode += "-"+this.materialSpec;
        }
        this.formGenerateMaterialCode.materialCode += "-01";
      },
      /**主表外键CategoryId被选择后触发事件*/
      onMaterialSpecChanged(fkId){
        this.materialSpec = this.formGenerateMaterialCode.materialSpec;
        this.baseType = this.formGenerateMaterialCode.baseType;
        this.drawNo = this.formGenerateMaterialCode.drawNo;

        this.formGenerateMaterialCode.materialCode ="";
        if (this.categoryNo!=null) this.formGenerateMaterialCode.materialCode=this.categoryNo;
        if (this.baseType==1){
          if (this.drawNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.drawNo;
        }else if (this.baseType==3){
          if(this.compoundNo!=null) this.formGenerateMaterialCode.materialCode += "-"+this.compoundNo;
          if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateMaterialCode.materialCode += "-"+this.materialSpec;
        }
        this.formGenerateMaterialCode.materialCode += "-01";
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
        listPureMaterialOrProductCategory().then(response => {
          this.categoryOptions = [];
          const data = { id: 0, categoryNo:"",categoryName: '顶级节点', children: [] };
          data.children = this.handleTree(response.rows, "id", "parentId");
          this.categoryOptions.push(data);
        });
        listCompound().then(response => {
          this.fkCompoundList = response.rows;
          this.compoundOptions = [];
          const data = { id: 0, compoundNo:"", compoundDesc: '顶级节点', children: [] };
          data.children = this.handleTree(response.rows, "id", "parentId");
          this.compoundOptions.push(data);
        });
      },
      /** 提交按钮 */
      submitNormalizeCode() {
        this.$refs["formNormalizeCode"].validate(valid => {
          if (valid) {
            if(this.formNormalizeCode.id==this.formNormalizeCode.id){
              normalizeCode(this.formNormalizeCode)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openNormalizeCode = false;
                  this.getStockRequestItemList();
                });
            }
          }
        });
      },
      // 取消按钮
      cancelNormalizeCode() {
        this.openNormalizeCode = false;
        this.resetNormalizeCode();
      },
      submitGenerateMaterialCode() {
        this.$refs["formGenerateMaterialCode"].validate(valid => {
          if (valid) {
            if(this.formGenerateMaterialCode.drawNo!=null || this.formGenerateMaterialCode.compoundId!=null
                            || this.formGenerateMaterialCode.materialSpec!=null){
              this.form.params = {"unitId":this.formGenerateMaterialCode.unitId};
              generateMaterialCode(this.formGenerateMaterialCode)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openGenerateMaterialCode = false;
                  this.getStockRequestItemList();
                });
            }else{
              this.$modal.msgWarning("图号、材质、型号，至少有一个不能为空！");
            }
          }
        });
      },
      // 取消按钮
      cancelGenerateMaterialCode() {
        this.openGenerateMaterialCode = false;
        this.resetGenerateMaterialCode();
      },
    },
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
  .ioDialogConfig .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
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
