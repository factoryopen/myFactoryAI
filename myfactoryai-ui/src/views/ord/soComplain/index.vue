<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="soId" class="marginBottom5" >
              <span slot="label">
                  <span class="fontSize12"><strong>销售订单</strong></span>
              </span>
              <el-select class="searchInput" v-model="form.soId" filterable placeholder="请选择销售订单" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkSoList"
                  :key="index"
                  :label="fkrow.billNo"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="quantityOrder" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantityOrder"
                    placeholder="请输入订单数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
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
            <el-form-item prop="needDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>需求日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.needDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择需求日期">
                </el-date-picker>
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
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="soComplainList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="销售订单" align="left" prop="soId"  width="115">
                  <template  slot-scope="scope">
                      <template v-for="(item,index) in fkSoList">
                          <span v-if="item.id==scope.row.soId" :key="index" size="mini">{{item.billNo}}</span>
                      </template>
                  </template>
                </el-table-column>
                <el-table-column label="项次" align="center" prop="seqNo"  width="60"/>
                <el-table-column label="状态" align="center" prop="status" width="65">
                  <template slot-scope="scope">
                      <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
                  </template>
                </el-table-column>
                <el-table-column label="产品编码" align="left" prop="productCode"  width="168"/>
                <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
                <el-table-column label="单位" align="center" prop="unitId"  width="50">
                  <template  slot-scope="scope">
                      <template v-for="(item,index) in fkUnitList">
                          <span v-if="item.id==scope.row.unitId"
                               :key="index"
                               size="mini">{{item.unitName}}</span>
                      </template>
                  </template>
              </el-table-column>
            <el-table-column label="订单量" align="right" prop="quantityOrder"  width="65"/>
            <el-table-column label="走发量" align="right" prop="quantityDelivering" width="65"/>
            <el-table-column label="完发量" align="right" prop="quantityDelivered" width="65"/>
            <el-table-column label="转包量" align="right" prop="quantitySubcontract" width="65"/>
            <el-table-column label="完包量" align="right" prop="quantitySubcontracted" width="65"/>
            <el-table-column label="自制量" align="right" prop="quantityMps" width="65"/>
            <el-table-column label="完制量" align="right" prop="quantityManufactured" width="65"/>
            <el-table-column label="优先级" align="center" prop="priority" width="60">
              <template slot-scope="scope">
                  <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
              </template>
            </el-table-column>
            <el-table-column label="需求日期" align="center" prop="needDay" width="85">
              <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
              <el-table-column label="承诺交期" align="center" prop="promiseDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="备注" align="left" prop="remark"/>
                      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-umbrella"
                           @click="handleComplainReg(scope.row)"
                      >客诉</el-button>
                  </template>
              </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.opencomplainReg对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opencomplainReg" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulescomplainReg" label-width="120px" :inline-message="true">
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
                <el-form-item  prop="seqNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>项次</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.seqNo" placeholder="请输入订单项" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码"
                               @change="onProductIdSelection"  size="mini" disabled="true">
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
                        v-for="(fkrow, index) in fkProductBasisList"
                        :key="index"
                        :label="fkrow.materialName"
                        :value="fkrow.materialName"
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
                        v-for="(fkrow, index) in fkProductBasisList"
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
                <el-form-item prop="quantity" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>数量</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="complainType" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>客诉类型</strong></span>
                        </span>
                  <el-select class="inputWidth" v-model="form.complainType" placeholder="请选择客诉类型" size="mini" >
                    <el-option
                      v-for="dict in dict.type.ord_complain_type"
                      :key="dict.value"
                      :label="dict.label"
                      size="mini"
                      :value="parseInt(dict.value)"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="complainDay" class="marginBottom0">
                            <span slot="label">
                                <span class="fontSize12"><strong>客诉日期</strong></span>
                            </span>
                  <el-date-picker clearable size="mini"
                                  v-model="form.complainDay"
                                  class="inputWidth"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择客诉日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="gdNo" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>发货单号</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.gdNo" placeholder="请输入发货单号" size="mini" />
                </el-form-item>
                <el-form-item prop="lotNo" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>制造批号</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.lotNo" placeholder="请输入制造批号" size="mini" />
                </el-form-item>
                <el-form-item prop="complainBy" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>客诉人</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.complainBy" placeholder="请输入客诉人" size="mini" />
                </el-form-item>
                <el-form-item prop="complainPhone" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>客诉电话</strong></span>
                        </span>
                  <el-input class="inputWidth" v-model="form.complainPhone" placeholder="请输入客诉电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitcomplainReg">确 定</el-button>
               <el-button @click="cancelcomplainReg">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="客诉登记">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleComplain"
                            @click="handleUpdateOrdComplain"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleComplain"
                            @click="handleDeleteOrdComplain"
                        >删除</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-paperclip"
                            :disabled="multipleComplain"
                            @click="handleEnableOrdComplain"
                        >发布</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                            icon="el-icon-download"
                            :disabled="multipleComplain"
                            @click="handleExportOrdComplain"
                        >导出</el-button>
                    </el-col>
                </el-row>
                <el-table ref="complain" border
                        :data="complainList"
                        highlight-current-row
                        :row-class-name="rowClassNameComplain"
                        @selection-change="handleComplainSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="客诉单号" align="center" prop="billNo" width="125"/>
                    <el-table-column label="状态" align="right" prop="status" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单" align="right" prop="soId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkSoList">
                                <span v-if="item.id==scope.row.soId"
                                    :key="index"
                                    size="mini">{{item.billNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkProductBasisList">
                            <span v-if="item.id==scope.row.productId"
                                  :key="index"
                                  size="mini">{{item.materialCode}}</span>
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
                    <el-table-column label="单价" align="right" prop="price" width="75"/>
                    <el-table-column label="数量" align="right" prop="quantity" width="75"/>
                    <el-table-column label="金额" align="right" prop="amount" width="75"/>
                    <el-table-column label="客诉类型" align="center" prop="complainType" width="110">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.ord_complain_type" :value="scope.row.complainType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="发货单号" align="center" prop="gdNo" width="125"/>
                    <el-table-column label="制造批号" align="center" prop="lotNo" width="135"/>
                    <el-table-column label="客诉日期" align="center" prop="complainDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.complainDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="客诉人" align="center" prop="complainBy" width="75"/>
                    <el-table-column label="客诉电话" align="left" prop="complainPhone" width="110"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="80">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-phone-outline"
                               :disabled="scope.row.status!=4"
                               @click="handleRequestInspect(scope.row)"
                           >请收货</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openComplain对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openComplain" width="500px" append-to-body>
            <el-form ref="formComplain" :model="formComplain" :rules="rulesComplain" label-width="140px" :inline-message="true">
                    <el-form-item prop="billNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>客诉单号</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formComplain.billNo" placeholder="请输入客诉单号" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="productId" class="marginBottom0" >
                        <span slot="label">
                            <span class="fontSize12"><strong>产品编码</strong></span>
                        </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码"
                               @change="onProductIdSelection"  size="mini" disabled="true">
                      <el-option
                        v-for="(fkrow, index) in fkProductBasisList"
                        :key="index"
                        :label="fkrow.materialCode"
                        :value="fkrow.id"
                        size="mini"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="unitId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>单位</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formComplain.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
                   <el-form-item prop="price" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单价</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formComplain.price" placeholder="请选择单价" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkSoItemList"
                            :key="index"
                            :label="fkrow.price"
                            :value="fkrow.price"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                  <hr>
                   <el-form-item prop="quantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.quantity" placeholder="请输入数量" @blur="onFormComplainQuantityChange"  size="mini" />
                  </el-form-item>
                   <el-form-item prop="amount" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>金额</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.amount" placeholder="请输入金额" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item  prop="complainType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>客诉类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formComplain.complainType" placeholder="请选择客诉类型" size="mini" >
                          <el-option
                              v-for="dict in dict.type.ord_complain_type"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="parseInt(dict.value)"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="gdNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>发货单号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.gdNo" placeholder="请输入发货单号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="lotNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>制造批号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.lotNo" placeholder="请输入制造批号" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="complainDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>客诉日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formComplain.complainDay"
                               class="inputWidth"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择客诉日期">
                      </el-date-picker>
                  </el-form-item>
                   <el-form-item prop="complainBy" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>客诉人</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.complainBy" placeholder="请输入客诉人" size="mini" />
                  </el-form-item>
                   <el-form-item prop="complainPhone" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>客诉电话</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.complainPhone" placeholder="请输入客诉电话" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formComplain.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitComplain">确 定</el-button>
                <el-button @click="cancelComplain">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listSoComplain, getSoComplain, delSoComplain, addSoComplain, updateSoComplain } from "@/api/ord/soComplain";
import { complainReg } from "@/api/ord/soComplain";
import { listComplain, getComplain, delComplain, addComplain, updateComplain } from "@/api/ord/complain";
import { enableOrdComplain,requestInspect } from "@/api/ord/complain";
import { listUnit} from "@/api/bas/unit";
import { listSo4Adult} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listProductBasis} from "@/api/eng/productBasis";

export default {
    name: "SoComplain",
    dicts: ['sales_status_so', 'bill_priority', 'ord_complain_type'],
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
            // 订单客诉登记表格数据
            soComplainList: [],
            fkUnitList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkProductBasisList: [],
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
            rules: {},
            opencomplainReg: false,
            rulescomplainReg: {
              quantity: [
                { required: true, message: "数量不能为空", trigger: "blur" }
              ],
              complainType: [
                { required: true, message: "客诉类型不能为空", trigger: "change" }
              ],
              complainDay: [
                { required: true, message: "客诉日期不能为空", trigger: "blur" }
              ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              soId: null,
              seqNo: null,
              status: null,
              productId: null,
              productName: null,
              productSpec: null,
              unitId: null,
              quantityOrder: null,
              price: null,
              discountPrice: null,
              amount: null,
              discountRate: null,
              finalAmount: null,
              quantityDelivery: null,
              quantityOs: null,
              quantityPlanned: null,
              priority: null,
              needDay: null,
              promiseDay: null,
            },
            //子表信息
            complainList:[],
            // 选中数组
            idsComplain: [],
            captionsComplain: [],
            // 非单个禁用
            singleComplain: true,
            // 非多个禁用
            multipleComplain: true,
            // 子表选中数据
            checkedComplain: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openComplain: false,
            formComplain: {},
            rulesComplain: {
                billNo: [
                   { required: true, message: "客诉单号不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                soItemId: [
                   { required: true, message: "订单项ID不能为空", trigger: "blur" }
                ],
                productId: [
                   { required: true, message: "产品ID不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
                complainType: [
                   { required: true, message: "客诉类型不能为空", trigger: "change" }
                ],
                complainDay: [
                   { required: true, message: "客诉日期不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键So数据 */
        this.getSoList();
        /** 查询外键SoItem数据 */
        this.getSoItemList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listSoComplain(this.queryParams).then(response => {
              this.soComplainList = response.rows;
              this.total = response.total;
              if (this.soComplainList && this.soComplainList.length>0) {
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
                this.getComplainList();
            }else {
                this.complainList = null;
            }
        },
        /** 查询外键Unit数据 */
        getUnitList() {
            listUnit().then(res => {
                this.fkUnitList = res.rows;
            });
        },
        /** 查询外键So数据 */
        getSoList() {
          listSo4Adult().then(res => {
                this.fkSoList = res.rows;
            });
        },
        /** 查询外键SoItem数据 */
        getSoItemList() {
            listSoItem().then(res => {
                this.fkSoItemList = res.rows;
            });
        },
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
            });
        },
        /** 查询外键SoHistory数据 */
        getSoHistoryList() {
            listSoHistory().then(res => {
                this.fkSoList = res.rows;
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
            this.captions = selection.map(item => item.seqNo)
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
        /**主表外键ProductId被选择后触发事件*/
        onProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id
                    this.form.productName = item.materialName
                    this.form.productSpec = item.materialSpec
                    this.form.unitId = item.unitId
                }
            });
        },
        /** 子表外键SoId被选择后触发事件 **/
        onComplainSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                   this.formComplain.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onComplainSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formComplain.soItemId = item.id
                    this.formComplain.productId = item.productId
                    this.formComplain.productName = item.productName
                    this.formComplain.productSpec = item.productSpec
                    this.formComplain.unitId = item.unitId
                    this.formComplain.price = item.price
                }
            });
        },
        onFormComplainQuantityChange(){
            this.formComplain.amount = this.formComplain.price * this.formComplain.quantity;
        },
        /** 重设主表的客诉对话框数据 */
        resetcomplainReg (){
            this.form = {
              quantity: null,
              complainType: null,
              gdNo: null,
              lotNo: null,
              complainDay: null,
              complainBy: null,
              complainPhone: null,
              remark: null,
            };
            this.resetForm("form");
        },
        handleExport() {
            this.download('ord/soComplain/export', {
              ...this.queryParams
            }, `soComplain_${new Date().getTime()}.xlsx`)
        },
        handleComplainReg(row) {
            const id = row.id || this.ids
            getSoComplain(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.opencomplainReg = true;
                this.title = "客诉登记";
            });
        },
        /** 提交按钮 */
        submitcomplainReg() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {
                    "quantity":this.form.quantity,
                    "complainType":this.form.complainType,
                    "gdNo":this.form.gdNo,
                    "lotNo":this.form.lotNo,
                    "complainDay":this.form.complainDay,
                    "complainBy":this.form.complainBy,
                    "complainPhone":this.form.complainPhone
                  };
                  complainReg(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.opencomplainReg = false;
                      this.getMasterList();
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelcomplainReg() {
            this.opencomplainReg = false;
            this.resetcomplainReg();
        },
        /** 查询子表客诉登记数据 */
        getComplainList() {
            var params = {"soItemId":this.masterId};
            listComplain(params).then(res => {
                this.complainList = res.rows;
            });
        },
        // 多选框选中数据
        handleComplainSelectionChange(selection) {
            this.idsComplain = selection.map(item => item.id)
            this.captionsComplain = selection.map(item => item.billNo)
            this.singleComplain = selection.length!==1
            this.multipleComplain = !selection.length
        },
        /** 子表客诉登记的CSS行样式 */
        rowClassNameComplain({ row, rowIndex }) {
            var clsName = ''

            if (this.idsComplain.includes(row.id)){
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
        resetComplain() {
            this.formComplain = {
                id: null,
                billNo: null,
                status: null,
                soItemId: this.masterId,
                quantity: null,
                amount: null,
                complainType: null,
                gdNo: null,
                lotNo: null,
                complainDay: null,
                complainBy: null,
                complainPhone: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formComplain");
            // 按关键字段值来初始化子表单数据
            this.onComplainSoItemIdSelection(this.masterId);
        },
        handleAddOrdComplain() {
          this.resetComplain();
          this.openComplain = true;
          this.title = "新增客诉登记";
        },
        handleUpdateOrdComplain(row) {
          this.resetComplain();
          const id = row.id || this.idsComplain
          getComplain(id).then(response => {
              this.formComplain = response.data;
              this.openComplain = true;
              this.title = "修改客诉登记";
          });
        },
        handleDeleteOrdComplain(row) {
          const ids = row.id || this.idsComplain;
          const billNoz = row.billNo || this.captionsComplain;

          this.$modal.confirm('确定删除客诉单号为"' + billNoz + '"的数据项？').then(function() {
              return delComplain(ids);
          }).then(() => {
            this.getComplainList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handleEnableOrdComplain(row) {
            const ids = row.id || this.idsComplain;
            const billNoz = row.billNo || this.captionsComplain;

            this.$modal.confirm('确定发布客诉单号为"' + billNoz + '"的数据项？').then(function() {
                return enableOrdComplain(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("发布成功");
            }).catch(() => {});
        },
        handleExportOrdComplain() {
          this.download('ord/Complain/export', {
           ...this.queryParams
          }, `Complain_${new Date().getTime()}.xlsx`)
        },
        handleRequestInspect(row) {
            const ids = row.id || this.idsComplain;
            const billNoz = row.billNo || this.captionsComplain;

            this.$modal.confirm('确定请收货客诉单号为"' + billNoz + '"的数据项？').then(function() {
              return requestInspect(row);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            }).catch(error => {
              this.$modal.msgError(error.msg);
            });
        },

        /** 提交按钮 */
        submitComplain() {
            this.$refs["formComplain"].validate(valid => {
                if (valid) {
                  if(this.formComplain.id==this.formComplain.id){
                    //TODO 上述两行代码须替代或删除

                    if (this.formComplain.id != null) {
                        updateComplain(this.formComplain)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openComplain = false;
                            this.getComplainList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addComplain(this.formComplain)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openComplain = false;
                            this.getComplainList();
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
        cancelComplain() {
            this.openComplain = false;
            this.resetComplain();
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
