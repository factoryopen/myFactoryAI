<template>
    <div class="app-container">
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
                <el-input
                  v-model="queryParams.status"
                  v-show="false"
                />
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
            <el-form-item prop="requestBillId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>来源单ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.requestBillId"
                    placeholder="请输入来源单ID"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
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
              <el-form-item prop="requestorId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请求人</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.requestorId" placeholder="请选择请求人" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkUserList"
                      :key="index"
                      :label="fkrow.nickName"
                      :value="fkrow.user_id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
            <el-form-item prop="requestTime" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>请求时间</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.requestTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择请求时间">
                </el-date-picker>
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
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-printer"
                    size="mini"
                    :disabled="single"
                    @click="handlePrintRequest"
                >打印</el-button>
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
                  height="220px"
                  :data="stockReqhistoryList"
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
                    <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
                </template>
              </el-table-column>
              <el-table-column label="出入库类型" align="center" prop="ioType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.snc_inventory_iotype" :value="scope.row.ioType"/>
                </template>
            </el-table-column>
                <el-table-column label="来源单号" align="left" prop="requestBillNo"  width="140"/>
               <el-table-column label="来源产线" align="center" prop="sourceLineId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.sourceLineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="来源厂商" align="left" prop="sourceSupplierId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.sourceSupplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="来源客户" align="left" prop="sourceCustomerId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.sourceCustomerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="项目" align="center" prop="projectId"  width="100">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
          <el-table-column label="请求人" align="right" prop="requestorId"  width="120">
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
                <el-table-column label="备注" align="center" prop="remark"/>
                </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.openprintRequest对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openprintRequest" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesprintRequest" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>出入库请求码</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入出入库请求码" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="ioType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>出入库类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.ioType" placeholder="请选择出入库类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.snc_inventory_iotype"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="requestBillId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>来源单ID</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.requestBillId" placeholder="请输入来源单ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="requestBillNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>来源单号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.requestBillNo" placeholder="请输入来源单号" size="mini" />
                </el-form-item>
                <el-form-item prop="requestorId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请求人</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.requestorId" placeholder="请选择请求人"
                               @change="onRequestorIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.user_id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="requestTime" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>请求时间</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.requestTime"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择请求时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="sourceLineId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>来源产线</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.sourceLineId" placeholder="请选择来源产线"
                               @change="onSourceLineIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkLineList"
                            :key="index"
                            :label="fkrow.lineName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sourceSupplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>来源厂商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.sourceSupplierId" placeholder="请选择来源厂商"
                               @change="onSourceSupplierIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierList"
                            :key="index"
                            :label="fkrow.supplierName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sourceCustomerId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>来源客户</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.sourceCustomerId" placeholder="请选择来源客户"
                               @change="onSourceCustomerIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkCustomerList"
                            :key="index"
                            :label="fkrow.customerName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
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
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
<!--               <el-button type="primary" @click="submitprintRequest">确 定</el-button>-->
<!--               <el-button @click="cancelprintRequest">取 消</el-button>-->
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="出入库明细">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="inventoryIo" border
                        :data="inventoryIoList"
                        highlight-current-row
                        :row-class-name="rowClassNameInventoryIo"
                        @selection-change="handleInventoryIoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                  <el-table-column label="请求项" align="center" prop="requestItemId"  width="60">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkStockRequestItemList">
                                <span v-if="item.id==scope.row.requestItemId"
                                      :key="index"
                                      size="mini">{{item.seqNo}}
                                </span>
                      </template>
                    </template>
                  </el-table-column>
                    <el-table-column label="单据编号" align="left" prop="billNo" width="115"/>
                    <el-table-column label="交易类型" align="center" prop="ioType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.snc_inventory_iotype" :value="scope.row.ioType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品编码" align="left" prop="materialCode" width="120" show-overflow-tooltip/>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="100" show-overflow-tooltip/>
                    <el-table-column label="物料规格" align="left" prop="materialSpec" width="100" show-overflow-tooltip/>
                    <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip/>
                    <el-table-column label="客户料号" align="left" prop="customerProductNo" width="100" show-overflow-tooltip/>
                    <el-table-column label="进口料号" align="left" prop="abroadProductNo" width="100" show-overflow-tooltip/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="数量" align="right" prop="quantity" width="75"/>
                    <el-table-column label="单价" align="right" prop="price" width="75"/>
                    <el-table-column label="金额" align="right" prop="amount" width="75"/>
                    <el-table-column label="仓库" align="center" prop="houseId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWareHouseList">
                                <span v-if="item.id==scope.row.houseId"
                                    :key="index"
                                    size="mini">{{item.houseCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="储位" align="center" prop="positionId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWarePositionList">
                                <span v-if="item.id==scope.row.positionId"
                                    :key="index"
                                    size="mini">{{item.positionName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存批号" align="left" prop="ilNo" width="120"/>
                    <el-table-column label="制造批" align="left" prop="mlId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMlList">
                                <span v-if="item.id==scope.row.mlId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listStockReqhistory, getStockReqhistory, delStockReqhistory, addStockReqhistory, updateStockReqhistory } from "@/api/snc/stockReqhistory";
import {getNextBillno, updateBillSeq } from "@/api/snc/stockReqhistory";
import { printRequest } from "@/api/snc/stockReqhistory";
import { listInventoryIo, getInventoryIo, delInventoryIo, addInventoryIo, updateInventoryIo } from "@/api/snc/inventoryIo";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listMaterial} from "@/api/eng/material";
import { listLine} from "@/api/res/line";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listInventory} from "@/api/snc/inventory";
import { listMl} from "@/api/pln/ml";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import { listStockRequest} from "@/api/snc/stockRequest";
import { listStockRequestItem} from "@/api/snc/stockRequestItem";

export default {
    name: "StockReqhistory",
    dicts: ['bill_status_process_req', 'snc_inventory_iotype'],
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
            // 出入库历史表格数据
            stockReqhistoryList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkMaterialList: [],
            fkLineList: [],
            fkWareHouseList: [],
            fkWarePositionList: [],
            fkProjectList: [],
            fkMlList: [],
            fkSupplierList: [],
            fkMaterialInfoList: [],
            fkStockRequestList: [],
            fkStockRequestItemList: [],
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
                    { required: true, message: "出入库请求码不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                ioType: [
                    { required: true, message: "出入库类型不能为空", trigger: "change" }
                ],
                requestBillId: [
                    { required: true, message: "来源单ID不能为空", trigger: "blur" }
                ],
                requestorId: [
                    { required: true, message: "请求人ID不能为空", trigger: "blur" }
                ],
            },
            openprintRequest: false,
            rulesprintRequest: {
                billNo: [
                    { required: true, message: "出入库请求码不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                ioType: [
                    { required: true, message: "出入库类型不能为空", trigger: "change" }
                ],
                requestBillId: [
                    { required: true, message: "来源单ID不能为空", trigger: "blur" }
                ],
                requestorId: [
                    { required: true, message: "请求人ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
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
            inventoryIoList:[],
            // 选中数组
            idsInventoryIo: [],
            captionsInventoryIo: [],
            // 非单个禁用
            singleInventoryIo: true,
            // 非多个禁用
            multipleInventoryIo: true,
            // 子表选中数据
            checkedInventoryIo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openInventoryIo: false,
            formInventoryIo: {},
            rulesInventoryIo: {
                billNo: [
                   { required: true, message: "单据编号不能为空", trigger: "blur" }
                ],
                ioType: [
                   { required: true, message: "交易类型不能为空", trigger: "change" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
                price: [
                   { required: true, message: "单价不能为空", trigger: "blur" }
                ],
                amount: [
                   { required: true, message: "金额不能为空", trigger: "blur" }
                ],
                houseId: [
                   { required: true, message: "现仓库不能为空", trigger: "blur" }
                ],
            },
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
        /** 查询外键Ml数据 */
        this.getMlList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键StockRequest数据 */
        this.getStockRequestList();
        /** 查询外键StockRequestItem数据 */
        this.getStockRequestItemList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listStockReqhistory(this.queryParams).then(response => {
                this.stockReqhistoryList = response.rows;
                var temp=response.rows[0];
                this.$refs.masterTable.setCurrentRow(temp,true);
                this.total = response.total;
                if(response.total) this.masterId = response.rows[0].id;
                this.loadChildData();
                this.loading = false;
            });
        },
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getInventoryIoList();
            }else {
                this.inventoryIoList = null;
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
        /** 查询外键Unit数据 */
        getUnitList() {
            listUnit().then(res => {
                this.fkUnitList = res.rows;
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
        /** 查询外键Ml数据 */
        getMlList() {
            listMl().then(res => {
                this.fkMlList = res.rows;
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
        /** 查询外键StockRequest数据 */
        getStockRequestList() {
            listStockRequest().then(res => {
                this.fkStockRequestList = res.rows;
            });
        },
        /** 查询外键StockRequestItem数据 */
        getStockRequestItemList() {
            listStockRequestItem().then(res => {
                this.fkStockRequestItemList = res.rows;
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
            this.masterId = currentRow.id;
            this.loadChildData();
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
        /**主表外键RequestorId被选择后触发事件*/
        onRequestorIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.requestorId = item.user_id
                }
            });
        },
        /**主表外键SourceLineId被选择后触发事件*/
        onSourceLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.sourceLineId = item.id
                }
            });
        },
        /**主表外键SourceSupplierId被选择后触发事件*/
        onSourceSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.sourceSupplierId = item.id
                }
            });
        },
        /**主表外键SourceCustomerId被选择后触发事件*/
        onSourceCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.sourceCustomerId = item.id
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

        /** 重设主表的打印对话框数据 */
        resetprintRequest (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                ioType: null,
                requestBillId: null,
                requestBillNo: null,
                requestTime: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        handlePrintRequest(row) {
            const id = row.id || this.ids
            getStockReqhistory(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openprintRequest = true;
                this.title = "打印";
            });
        },
        handleExport() {
            this.download('snc/stockReqhistory/export', {
              ...this.queryParams
            }, `stockReqhistory_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submitprintRequest() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  printRequest(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openprintRequest = false;
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
        cancelprintRequest() {
            this.openprintRequest = false;
            this.resetprintRequest();
        },

        /** 查询子表仓库存货流水数据 */
        getInventoryIoList() {
            var params = {"requestId":this.masterId};
            listInventoryIo(params).then(res => {
                this.inventoryIoList = res.rows;
            });
        },
        // 多选框选中数据
        handleInventoryIoSelectionChange(selection) {
            this.idsInventoryIo = selection.map(item => item.id)
            this.captionsInventoryIo = selection.map(item => item.billNo)
            this.singleInventoryIo = selection.length!==1
            this.multipleInventoryIo = !selection.length
        },
        /** 子表仓库存货流水的CSS行样式 */
        rowClassNameInventoryIo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsInventoryIo.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
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
