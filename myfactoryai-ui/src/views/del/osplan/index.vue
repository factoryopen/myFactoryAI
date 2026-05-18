<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
          <el-form-item prop="soId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>销售订单</strong></span>
            </span>
            <el-select class="inputWidth" v-model="queryParams.soId" filterable placeholder="请选择销售订单" size="mini">
              <el-option
                v-for="(fkrow, index) in fkSoList"
                :key="index"
                :label="fkrow.billNo"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>转包单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入转包单号"
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
                v-for="dict in dict.type.sales_status_osplan"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item prop="promiseDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>承诺交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.promiseDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择承诺交期">
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
            <el-form-item prop="supplierId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierId"
                    placeholder="请输入供应商ID"
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
              <el-button type="primary" icon="el-icon-shopping-cart-full" size="mini" :disabled="multiple" @click="handleRequestPurchase"
              >请购</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleChangeDelOsplan"
                >变更</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-ice-cream-round"
                    size="mini"
                    :disabled="single"
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
                    :disabled="single"
                    @click="handleDisable"
                >停用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="osplanList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="转包单号" align="center" prop="billNo"  width="125"/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sales_status_osplan" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="销售订单" align="center" prop="soId"  width="115">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoList">
                        <span v-if="item.id==scope.row.soId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="项次" align="center" prop="soItemId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoItemList">
                        <span v-if="item.id==scope.row.soItemId"
                            :key="index"
                            size="mini">{{item.seqNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
            <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
          <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
          <el-table-column label="产品规格" align="left" prop="productSpec" width="110"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                             :key="index"
                             size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="计划数量" align="right" prop="quantityPlanned"  width="80"/>
            <el-table-column label="派工数量" align="right" prop="quantityDispatched"  width="80"/>
            <el-table-column label="完成数量" align="right" prop="quantityFinished"  width="80"/>
            <el-table-column label="需求日期" align="center" prop="needDay" width="85"/>
            <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
              <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="下单日期" align="center" prop="orderDay" width="85"/>
            <el-table-column label="优先级" align="center" prop="priority" width="60">
                  <template slot-scope="scope">
                      <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                  </template>
                </el-table-column>
                <el-table-column label="客户" align="left" prop="customerId"  width="120">
                  <template  slot-scope="scope">
                      <template v-for="(item,index) in fkCustomerList">
                          <span v-if="item.id==scope.row.customerId"
                              :key="index"
                              size="mini">{{item.customerName}}</span>
                      </template>
                  </template>
                </el-table-column>
                <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
                <el-table-column label="项目" align="center" prop="projectId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="销售员" align="center" prop="salesId"  width="65">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.salesId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.openchangeDelOsplan对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeDelOsplan" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeDelOsplan" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>转包单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入转包单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="soId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>销售订单</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.soId" placeholder="请选择销售订单"
                               @change="onSoIdSelection"  size="mini" disabled="true">
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
                    <el-select class="inputWidth" v-model="form.soItemId" placeholder="请选择订单项"
                               @change="onSoItemIdSelection"  size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkSoItemList"
                            :key="index"
                            :label="fkrow.seqNo"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkProductBasisList"
                            :key="index"
                            :label="fkrow.materialCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productName" class="marginBottom0" >
                        <span slot="label">
                            <span class="fontSize12"><strong>产品名称</strong></span>
                        </span>
                  <el-select class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true">
                    <el-option
                      v-for="(fkrow, index) in fkSoItemList"
                      :key="index"
                      :label="fkrow.materialSpec"
                      :value="fkrow.materialSpec"
                      size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkSoItemList"
                        :key="index"
                        :label="fkrow.productSpec"
                        :value="fkrow.productSpec"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <hr>
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
               <el-button type="primary" @click="submitchangeDelOsplan">确 定</el-button>
               <el-button @click="cancelchangeDelOsplan">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.openosReturn对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openosReturn" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesosReturn" label-width="120px" :inline-message="true">
                <el-form-item  prop="quantityAvailable" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>可收数量</strong></span>
                      </span>
                  <el-input class="inputWidth" v-model="form.quantityAvailable" placeholder="请输入可收数量" size="mini" disabled="true" />
                </el-form-item>
                <el-form-item  prop="quantityReceiving" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>收货数量</strong></span>
                      </span>
                  <el-input class="inputWidth" v-model="form.quantityReceiving" placeholder="请输入收货数量" size="mini" />
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
                  <el-input class="inputWidth" v-model="form.phone" placeholder="请输入手机" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitosReturn">确 定</el-button>
               <el-button @click="cancelosReturn">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="转包收货">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="osplanReceiving" border
                        :data="osplanReceivingList"
                        highlight-current-row
                        :row-class-name="rowClassNameOsplanReceiving"
                        @selection-change="handleOsplanReceivingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="转包收货单号" align="center" prop="billNo" width="135"/>
                    <el-table-column label="状态" align="center" prop="status" width="65">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sales_status_osplan" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品" align="right" prop="productId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProductBasisList">
                                <span v-if="item.id==scope.row.productId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="right" prop="unitId"  width="60">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="计划数量" align="right" prop="quantityReceived" width="80"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="80"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="80"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="80"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="80"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="80"/>
                    <el-table-column label="产出数量" align="right" prop="quantityOutput" width="80"/>
                    <el-table-column label="供应商" align="right" prop="supplierId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkSupplierList">
                                <span v-if="item.id==scope.row.supplierId"
                                    :key="index"
                                    size="mini">{{item.supplierName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人" align="left" prop="contactName" width="75"/>
                    <el-table-column label="联系电话" align="left" prop="contactPhone" width="110"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-phone-outline"
                               @click="handleRequestInspection(scope.row)"
                           >请检</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import {listOsplan, getOsplan,changeDelOsplan,froze,unfroze,disable,finishforcely,toPr} from "@/api/del/osplan";
import { listOsplanReceiving, getOsplanReceiving, delOsplanReceiving, addOsplanReceiving, updateOsplanReceiving } from "@/api/del/osplanReceiving";
import { requestInspection } from "@/api/del/osplanReceiving";
import { listCustomer} from "@/api/cha/customer";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit"
import { listSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listSupplier} from "@/api/sup/supplier";
import { listSupplierAddress} from "@/api/sup/supplierAddress";
import { listSupplierContact} from "@/api/sup/supplierContact";
import { listSoTrace} from "@/api/ord/soTrace";

export default {
    name: "Osplan",
    dicts: ['bill_priority', 'sales_status_osplan'],
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
            // 转包计划维护表格数据
            osplanList: [],
            fkCustomerList: [],
            fkSalesList: [],
            fkUserList: [],
            fkUnitList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkSupplierList: [],
            fkSupplierAddressList: [],
            fkSupplierContactList: [],
            fkOsplanList: [],
            fkSoTraceList: [],
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
                priority: [
                    { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                supplierId: [
                    { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
            },
            openchangeDelOsplan: false,
            ruleschangeDelOsplan: {
                priority: [
                    { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                supplierId: [
                    { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
            },
            openosReturn: false,
            rulesosReturn: {
                quantityReceiving: [
                  { required: true, message: "收货数量不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              billNo: null,
              status: null,
              soId: null,
              productId: null,
              productName: null,
              productSpec: null,
              needDay: null,
              promiseDay: null,
              priority: null,
              supplierId: null,
              customerId: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            osplanReceivingList:[],
            // 选中数组
            idsOsplanReceiving: [],
            captionsOsplanReceiving: [],
            // 非单个禁用
            singleOsplanReceiving: true,
            // 非多个禁用
            multipleOsplanReceiving: true,
            // 子表选中数据
            checkedOsplanReceiving: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openOsplanReceiving: false,
            formOsplanReceiving: {},
            rulesOsplanReceiving: {
                billNo: [
                   { required: true, message: "转包收货单号不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                osplanId: [
                   { required: true, message: "转包计划ID不能为空", trigger: "blur" }
                ],
                productId: [
                   { required: true, message: "产品ID不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位ID不能为空", trigger: "blur" }
                ],
                quantityReceived: [
                   { required: true, message: "计划数量不能为空", trigger: "blur" }
                ],
                quantityScrap: [
                   { required: true, message: "报废数量不能为空", trigger: "blur" }
                ],
                quantityRedisp: [
                   { required: true, message: "重派数量不能为空", trigger: "blur" }
                ],
                quantityRework: [
                   { required: true, message: "返工数量不能为空", trigger: "blur" }
                ],
                quantityPending: [
                   { required: true, message: "待判数量不能为空", trigger: "blur" }
                ],
                quantityAod: [
                   { required: true, message: "特采次数不能为空", trigger: "blur" }
                ],
                quantityOutput: [
                   { required: true, message: "产出数量不能为空", trigger: "blur" }
                ],
                supplierId: [
                   { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
                customerId: [
                   { required: true, message: "客户ID不能为空", trigger: "blur" }
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
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键So数据 */
        this.getSoList();
        /** 查询外键SoItem数据 */
        this.getSoItemList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键SupplierAddress数据 */
        this.getSupplierAddressList();
        /** 查询外键SupplierContact数据 */
        this.getSupplierContactList();
        /** 查询外键Osplan数据 */
        this.getOsplanList();
        /** 查询外键SoTrace数据 */
        this.getSoTraceList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listOsplan(this.queryParams).then(response => {
              this.osplanList = response.rows;
              this.total = response.total;
              if (this.osplanList && this.osplanList.length>0) {
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
                this.getOsplanReceivingList();
            }else {
                this.osplanReceivingList = null;
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
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键SupplierAddress数据 */
        getSupplierAddressList() {
            listSupplierAddress().then(res => {
                this.fkSupplierAddressList = res.rows;
            });
        },
        /** 查询外键SupplierContact数据 */
        getSupplierContactList() {
            listSupplierContact().then(res => {
                this.fkSupplierContactList = res.rows;
            });
        },
        /** 查询外键Osplan数据 */
        getOsplanList() {
            listOsplan().then(res => {
                this.fkOsplanList = res.rows;
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
        /**主表外键SoId被选择后触发事件*/
        onSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soId = item.id
                }
            });
        },
        /**主表外键SoItemId被选择后触发事件*/
        onSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soItemId = item.id
                    this.form.productId = item.productId
                    this.form.productName = item.productName
                    this.form.productSpec = item.productSpec
                    this.form.unitId = item.unitId
                    this.form.needDay = item.needDay
                }
            });
        },
        /**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
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
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.salesId = item.userId
                }
            });
        },
        /** 子表外键OsplanId被选择后触发事件 **/
        onOsplanReceivingOsplanIdSelection(fkId){
            this.fkOsplanList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.osplanId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onOsplanReceivingProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.productId = item.id
                    this.formOsplanReceiving.productName = item.materialName
                    this.formOsplanReceiving.productSpec = item.materialSpec
                    this.formOsplanReceiving.unitId = item.unitId
                }
            });
        },
        /** 子表外键SupplierId被选择后触发事件 **/
        onOsplanReceivingSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.supplierId = item.id
                }
            });
        },
        /** 子表外键CustomerId被选择后触发事件 **/
        onOsplanReceivingCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.customerId = item.id
                }
            });
        },
        /** 子表外键SoId被选择后触发事件 **/
        onOsplanReceivingSoIdSelection(fkId){
            this.fkSoTraceList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onOsplanReceivingSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.soItemId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onOsplanReceivingProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.projectId = item.id
                }
            });
        },
        /** 子表外键SalesId被选择后触发事件 **/
        onOsplanReceivingSalesIdSelection(fkId){
            this.fkSalesList.forEach(item=>{
                if(fkId === item.id){
                   this.formOsplanReceiving.salesId = item.id
                }
            });
        },

        /** 重设主表的变更对话框数据 */
        resetchangeDelOsplan (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                quantityPlanned: null,
                quantityDispatched: null,
                quantityFinished: null,
                promiseDay: null,
                priority: null,
                supplierId: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的收货对话框数据 */
        resetosReturn (){
            this.form = {
                quantityAvailable: null,
                quantityReceiving: null,
                contact: null,
                phone: null,
            };
            this.resetForm("form");
        },
        handleChangeDelOsplan(row) {
            const id = row.id || this.ids
            getOsplan(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeDelOsplan = true;
                this.title = "变更转包计划";
            });
        },
       handleFroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 转包单号为"' + billNoz + '"的数据项吗？').then(function() {
           return froze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleUnfroze(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定解冻 转包单号为"' + billNoz + '"的数据项吗？').then(function() {
           return unfroze(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("解冻成功");
         }).catch(() => {});
       },
       handleDisable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 转包单号为"' + billNoz + '"的数据项吗？').then(function() {
           return disable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
       handleFinishforcely(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定强结 转包单号为"' + billNoz + '"的数据项吗？').then(function() {
           return finishforcely(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("强结成功");
         }).catch(() => {});
       },
       handleExport() {
            this.download('del/osplan/export', {
              ...this.queryParams
            }, `osplan_${new Date().getTime()}.xlsx`)
       },
       /** 提交按钮 */
       handleRequestPurchase(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定请购 转包计划为"' + billNoz + '"的数据项吗？').then(function() {
           return toPr(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("请购成功");
         }).catch(() => {
           this.$modal.msgError(error.msg);
         });
       },
       handleToReturn(row) {
          const id = row.id || this.ids
          getOsplan(id).then(response => {
              this.form = response.data;

              this.$set(this.form, "quantityAvailable", this.form.quantityPlanned-this.form.quantityFinished);
              this.$set(this.form, "quantityReceiving", this.form.quantityAvailable);
              this.openosReturn = true;
              this.title = "收货";
          });
       },
        /** 提交按钮 */
       submitchangeDelOsplan() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeDelOsplan(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeDelOsplan = false;
                      this.getMasterList();
                  });
                }
              }
          });
       },
       // 取消按钮
       cancelchangeDelOsplan() {
           this.openchangeDelOsplan = false;
           this.resetchangeDelOsplan();
       },
        /** 提交按钮 */
        submitosReturn() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.quantityReceiving<=this.form.quantityAvailable && this.form.quantityReceiving>0){
                  this.form.params = {"quantityReceiving":this.form.quantityReceiving,"contact":this.form.contact,"phone":this.form.phone};

                  osReturn(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openosReturn = false;
                      this.getMasterList();
                  });
                }else{
                  this.$modal.msgError("收货数量不能大于可收数量且不能小于等于0");
                }
              }
          });
        },
        // 取消按钮
        cancelosReturn() {
            this.openosReturn = false;
            this.resetosReturn();
        },
        /** 查询子表转包收货数据 */
        getOsplanReceivingList() {
            var params = {"osplanId":this.masterId};
            listOsplanReceiving(params).then(res => {
                this.osplanReceivingList = res.rows;
            });
        },
        // 多选框选中数据
        handleOsplanReceivingSelectionChange(selection) {
            this.idsOsplanReceiving = selection.map(item => item.id)
            this.captionsOsplanReceiving = selection.map(item => item.billNo)
            this.singleOsplanReceiving = selection.length!==1
            this.multipleOsplanReceiving = !selection.length
        },
        /** 子表转包收货的CSS行样式 */
        rowClassNameOsplanReceiving({ row, rowIndex }) {
            var clsName = ''

            if (this.idsOsplanReceiving.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }


            return clsName;
        },
        handleRequestInspection(row) {
            const ids = row.id || this.idsOsplanReceiving;
            const billNoz = row.billNo || this.captionsOsplanReceiving;

            this.$modal.confirm('确定请检转包收货单号为"' + billNoz + '"的数据项？').then(function() {
              return requestInspection(row);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
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
