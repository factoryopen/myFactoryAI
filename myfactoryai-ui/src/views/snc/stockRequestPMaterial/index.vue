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
                        v-for="dict in dict.type.snc_inventory_iotype4production"
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
              <el-form-item prop="requestorId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请求人</strong></span>
                    </span>
                <el-select class="searchInput" v-model="queryParams.requestorId" placeholder="请选择请求人" size="mini">
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
                <el-select class="searchInput" v-model="queryParams.sourceLineId" placeholder="请选择来源产线" size="mini">
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
                <el-select class="searchInput" v-model="queryParams.sourceSupplierId" placeholder="请选择来源厂商" size="mini">
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
                <el-select class="searchInput" v-model="queryParams.sourceCustomerId" placeholder="请选择来源客户" size="mini">
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
                <el-select class="searchInput" v-model="queryParams.projectId" placeholder="请选择项目" size="mini">
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
                >启用</el-button>
            </el-col>
<!--            <el-col :span="1.5">-->
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-phone-outline"-->
<!--                    size="mini"-->
<!--                    :disabled="multiple"-->
<!--                    @click="handleRequestStock"-->
<!--                >请库</el-button>-->
<!--            </el-col>-->
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
                  :data="stockRequestList"
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
                    <dict-tag :options="dict.type.snc_inventory_iotype4production" :value="scope.row.ioType"/>
                </template>
            </el-table-column>
            <el-table-column label="来源单号" align="left" prop="requestBillNo"  width="140"/>
            <el-table-column label="来源产线" align="left" prop="sourceLineId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.sourceLineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项目" align="left" prop="projectId"  width="100">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="请求人" align="center" prop="requestorId"  width="120">
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
                            v-for="dict in dict.type.snc_inventory_iotype4production"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="requestBillNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>来源单号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.requestBillNo" placeholder="请输入来源单号" size="mini" />
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
            <el-tab-pane label="请求明细">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSncStockRequestItem"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleStockRequestItem"
                            @click="handleUpdateSncStockRequestItem"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleStockRequestItem"
                            @click="handleDeleteSncStockRequestItem"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="stockRequestItem" border
                        :data="stockRequestItemList"
                        highlight-current-row
                        :row-class-name="rowClassNameStockRequestItem"
                        @selection-change="handleStockRequestItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项次" align="center" prop="seqNo" width="60"/>
                    <el-table-column label="物料编码" align="left" prop="materialId"  width="130" show-overflow-tooltip>
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMaterialInfoList">
                                <span v-if="item.id==scope.row.materialId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="100" show-overflow-tooltip/>
                    <el-table-column label="物料规格" align="left" prop="materialSpec" width="80" show-overflow-tooltip/>
                    <el-table-column label="图号" align="left" prop="drawNo" width="130" show-overflow-tooltip/>
                    <el-table-column label="客户料号" align="left" prop="customerProductNo" width="100" show-overflow-tooltip/>
                    <el-table-column label="进口料号" align="left" prop="abroadProductNo" width="100" show-overflow-tooltip/>
                    <el-table-column label="单位" align="center" prop="unitId" width="60">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkUnitList">
                            <span v-if="item.id==scope.row.unitId"
                                  :key="index"
                                  size="mini">{{item.unitName}}
                            </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="数量" align="right" prop="quantity" width="110"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSncStockRequestItem(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSncStockRequestItem(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openStockRequestItem对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openStockRequestItem" width="500px" append-to-body>
            <el-form ref="formStockRequestItem" :model="formStockRequestItem" :rules="rulesStockRequestItem" label-width="140px" :inline-message="true">
                    <el-form-item prop="requestId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>请求单号</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="masterBillNo"  size="mini" disabled="true"/>
                  </el-form-item>
                  <hr>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项次</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formStockRequestItem.seqNo" placeholder="请输入项次" size="mini" />
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formStockRequestItem.materialId" placeholder="请选择物料"
                                 @change="onStockRequestItemMaterialIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMaterialInfoList"
                             :key="index"
                             :label="fkrow.materialCode+' ['+fkrow.materialName + '，' + fkrow.drawNo + ']'"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formStockRequestItem.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
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
                      <el-select class="inputWidth" v-model="formStockRequestItem.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialInfoList"
                            :key="index"
                            :label="fkrow.materialSpec"
                            :value="fkrow.materialSpec"
                            size="mini"
                        ></el-option>
                      </el-select>
                   </el-form-item>
                   <el-form-item prop="drawNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图号</strong></span>
                      </span>
                     <el-input class="inputWidth" v-model="formStockRequestItem.drawNo" placeholder="请输入图号" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="customerProductNo" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>客户料号</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="formStockRequestItem.customerProductNo" placeholder="请输入客户料号" size="mini" disabled="true" />
                  </el-form-item>
                  <el-form-item prop="abroadProductNo" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>进口料号</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="formStockRequestItem.abroadProductNo" placeholder="请输入进口料号" size="mini" disabled="true" />
                  </el-form-item>
                  <el-form-item prop="unitId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>单位</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formStockRequestItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkUnitList"
                            :key="index"
                            :label="fkrow.unitName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="quantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formStockRequestItem.quantity" placeholder="请输入数量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formStockRequestItem.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitStockRequestItem">确 定</el-button>
                <el-button @click="cancelStockRequestItem">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listStockRequestPMaterial, getStockRequest, delStockRequest, addStockRequest, updateStockRequest } from "@/api/snc/stockRequest";
import {getNextBillno, updateBillSeq } from "@/api/snc/stockRequest";
import { enable,requestStock } from "@/api/snc/stockRequest";
import { listStockRequestItem, getStockRequestItem, delStockRequestItem, addStockRequestItem, updateStockRequestItem } from "@/api/snc/stockRequestItem";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "StockRequest",
    dicts: ['bill_status_process_req', 'snc_inventory_iotype4production'],
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
            // 出入库请求表格数据
            stockRequestList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkUnitList: [],
            fkLineList: [],
            fkProjectList: [],
            fkSupplierList: [],
            fkMaterialInfoList: [],
            fkStockRequestList: [],
            //主表当前行的ID
            masterId:"",
            masterBillNo:"",
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
                ioType: [
                    { required: true, message: "出入库类型不能为空", trigger: "change" }
                ],
                requestBillId: [
                    { required: true, message: "来源单ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
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
            rulesStockRequestItem: {
                seqNo: [
                   { required: true, message: "项次不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料ID不能为空", trigger: "blur" }
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
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键StockRequest数据 */
        this.getStockRequestList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listStockRequestPMaterial(this.queryParams).then(response => {
              this.stockRequestList = response.rows;
              this.total = response.total;
              if (this.stockRequestList && this.stockRequestList.length>0) {
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
                this.getStockRequestItemList();
            }else {
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
        /** 查询外键MaterialInfo数据 */
        getMaterialInfoList() {
            listMaterialInfo().then(res => {
                this.fkMaterialInfoList = res.rows;
            });
        },
        /** 查询外键StockRequest数据 */
        getStockRequestList() {
          listStockRequestPMaterial().then(res => {
                this.fkStockRequestList = res.rows;
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
            this.masterBillNo = currentRow.billNo;
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
                    this.form.requestorId = item.userId
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
        /** 子表外键RequestId被选择后触发事件 **/
        onStockRequestItemRequestIdSelection(fkId){
            this.fkStockRequestList.forEach(item=>{
                if(fkId === item.id){
                   this.formStockRequestItem.requestId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onStockRequestItemMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formStockRequestItem.materialId = item.id
                    this.formStockRequestItem.materialName = item.materialName
                    this.formStockRequestItem.materialSpec = item.materialSpec
                    this.formStockRequestItem.drawNo = item.drawNo
                    this.formStockRequestItem.customerProductNo = item.customerProductNo
                    this.formStockRequestItem.abroadProductNo = item.abroadProductNo
                    this.formStockRequestItem.unitId=item.unitId
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
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
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增";
            getNextBillno("510").then(res => {
              this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getStockRequest(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除出入库请求码为"' + billNoz + '"的数据项？').then(function() {
                return delStockRequest(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
       handleEnable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定启用 出入库请求码为"' + billNoz + '"的数据项吗？').then(function() {
           return enable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("启用成功");
         }).catch(() => {});
       },
        handleRequestStock(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定请库 出入库请求码为"' + billNoz + '"的数据项吗？').then(function() {
              return requestStock(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            }).catch(error => {
              this.$modal.msgError(error.msg);
            });
        },
        handleExport() {
            this.download('snc/stockRequest/export', {
              ...this.queryParams
            }, `stockRequest_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateStockRequest(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addStockRequest(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                        updateBillSeq("510").then(res => {});
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







        /** 查询子表出入库请求数据 */
        getStockRequestItemList() {
            var params = {"requestId":this.masterId};
            listStockRequestItem(params).then(res => {
                this.stockRequestItemList = res.rows;
            });
        },
        // 多选框选中数据
        handleStockRequestItemSelectionChange(selection) {
            this.idsStockRequestItem = selection.map(item => item.id)
            this.captionsStockRequestItem = selection.map(item => item.seqNo)
            this.singleStockRequestItem = selection.length!==1
            this.multipleStockRequestItem = !selection.length
        },
        /** 子表出入库请求的CSS行样式 */
        rowClassNameStockRequestItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsStockRequestItem.includes(row.id)){
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
        resetStockRequestItem() {
            this.formStockRequestItem = {
                id: null,
                requestId: this.masterId,
                seqNo: null,
                quantity: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formStockRequestItem");
            // 按关键字段值来初始化子表单数据
            this.onStockRequestItemRequestIdSelection(this.masterId);
        },
        handleAddSncStockRequestItem() {
          this.resetStockRequestItem();
          this.openStockRequestItem = true;
          this.title = "新增";
        },
        handleUpdateSncStockRequestItem(row) {
          this.resetStockRequestItem();
          const id = row.id || this.idsStockRequestItem
          getStockRequestItem(id).then(response => {
              this.formStockRequestItem = response.data;
              this.openStockRequestItem = true;
              this.title = "修改";
          });
        },
        handleDeleteSncStockRequestItem(row) {
          const ids = row.id || this.idsStockRequestItem;
          const seqNoz = row.seqNo || this.captionsStockRequestItem;

          this.$modal.confirm('确定删除项次为"' + seqNoz + '"的数据项？').then(function() {
              return delStockRequestItem(ids);
          }).then(() => {
            this.getStockRequestItemList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitStockRequestItem() {
            this.$refs["formStockRequestItem"].validate(valid => {
                if (valid) {
                  if(this.formStockRequestItem.id==this.formStockRequestItem.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formStockRequestItem.id != null) {
                        updateStockRequestItem(this.formStockRequestItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openStockRequestItem = false;
                            this.getStockRequestItemList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addStockRequestItem(this.formStockRequestItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openStockRequestItem = false;
                            this.getStockRequestItemList();
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
        cancelStockRequestItem() {
            this.openStockRequestItem = false;
            this.resetStockRequestItem();
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
