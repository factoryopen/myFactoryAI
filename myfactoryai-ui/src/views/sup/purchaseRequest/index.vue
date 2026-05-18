<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购申请号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入采购申请号"
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
            <el-form-item prop="purchasingType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购类型</strong></span>
                </span>
                <el-select v-model="queryParams.purchasingType" placeholder="请选择采购类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_officepurchasing_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="requestDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>请购日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.requestDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择请购日期">
                </el-date-picker>
            </el-form-item>
              <el-form-item prop="requestorId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请购员</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.requestorId" placeholder="请选择请购员" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkUserList"
                      :key="index"
                      :label="fkrow.nickName"
                      :value="fkrow.userId"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="deptId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请购部门</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.deptId" placeholder="请选择请购部门" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkDeptList"
                      :key="index"
                      :label="fkrow.deptName"
                      :value="fkrow.deptId"
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
                    icon="el-icon-phone-outline"
                    size="mini"
                    :disabled="multiple"
                    @click="handleAuditReq"
                >请审</el-button>
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
                  height="340px"
                  :data="purchaseRequestList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="采购申请号" align="center" prop="billNo"  width="125"/>
              <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.purchasing_status_pr" :value="scope.row.status"/>
                </template>
            </el-table-column>
              <el-table-column label="采购类型" align="center" prop="purchasingType" width="120">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_officepurchasing_type" :value="scope.row.purchasingType"/>
                </template>
            </el-table-column>
              <el-table-column label="请购日期" align="center" prop="requestDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.requestDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="请购员" align="center" prop="requestorId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.requestorId"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="请购部门" align="center" prop="deptId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="备注" align="center" prop="remark"/>
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
                        <span class="fontSize12"><strong>采购申请号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购申请号" size="mini" disabled="true"/>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
                <el-form-item  prop="purchasingType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>采购类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.purchasingType" placeholder="请选择采购类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.eng_officepurchasing_type"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="requestDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>请购日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.requestDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择请购日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="requestorId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请购员</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.requestorId" placeholder="请选择请购员"
                               @change="onRequestorIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="deptId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>请购部门</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.deptId" placeholder="请选择请购部门"
                               @change="onDeptIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkDeptList"
                            :key="index"
                            :label="fkrow.deptName"
                            :value="fkrow.deptId"
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
            <el-tab-pane label="采购申请明细">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddSupPritem"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePurchaseRequestItem"
                            @click="handleUpdateSupPritem"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePurchaseRequestItem"
                            @click="handleDeleteSupPritem"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="purchaseRequestItem" border
                        :data="purchaseRequestItemList"
                        highlight-current-row
                        :row-class-name="rowClassNamePurchaseRequestItem"
                        @selection-change="handlePurchaseRequestItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
                    <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
                    <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="计划数量" align="right" prop="quantity" width="120"/>
                    <el-table-column label="需求日期" align="center" prop="requireDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.requireDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="优先级" align="center" prop="priority" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="消耗类型" align="center" prop="consumeType" width="90">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="必配料" align="center" prop="enableMust" width="110">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableMust"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="可替代" align="center" prop="enableReplace" width="110">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableReplace"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateSupPritem(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteSupPritem(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openPurchaseRequestItem对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPurchaseRequestItem" width="500px" append-to-body>
            <el-form ref="formPurchaseRequestItem" :model="formPurchaseRequestItem" :rules="rulesPurchaseRequestItem" label-width="140px" :inline-message="true">
                    <el-form-item prop="prId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购申请</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPurchaseRequestItem.prId" placeholder="请输入采购申请" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPurchaseRequestItem.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.materialId" placeholder="请选择物料编码"
                                 @change="onPurchaseRequestItemMaterialIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMaterialList"
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
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.materialName" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialList"
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
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.materialSpec" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialList"
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
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.unitId" size="mini" disabled="true">
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
                          <span class="fontSize12"><strong>计划数量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPurchaseRequestItem.quantity" placeholder="请输入订单数量" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="requireDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>需求日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formPurchaseRequestItem.requireDay"
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
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.priority" placeholder="请选择优先级" size="mini" >
                          <el-option
                              v-for="dict in dict.type.bill_priority"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="parseInt(dict.value)"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item  prop="consumeType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>消耗类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.consumeType" placeholder="请选择消耗类型" size="mini" >
                          <el-option
                              v-for="dict in dict.type.eng_material_consumingtype"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="parseInt(dict.value)"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item  prop="enableMust" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>必配料</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.enableMust" placeholder="请选择必配料" size="mini" >
                          <el-option
                              v-for="dict in dict.type.sys_yes_no"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="dict.value"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item  prop="enableReplace" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>可替代</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formPurchaseRequestItem.enableReplace" placeholder="请选择可替代" size="mini" >
                          <el-option
                              v-for="dict in dict.type.sys_yes_no"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="dict.value"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPurchaseRequestItem.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPurchaseRequestItem">确 定</el-button>
                <el-button @click="cancelPurchaseRequestItem">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listPurchaseRequest, getPurchaseRequest, delPurchaseRequest, addPurchaseRequest, updatePurchaseRequest } from "@/api/sup/purchaseRequest";
import {getNextBillno, updateBillSeq } from "@/api/sup/purchaseRequest";
import { auditReq } from "@/api/sup/purchaseRequest";
import { listPurchaseRequestItem, getPurchaseRequestItem, delPurchaseRequestItem, addPurchaseRequestItem, updatePurchaseRequestItem } from "@/api/sup/purchaseRequestItem";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "PurchaseRequest",
    dicts: ['purchasing_status_pr', 'eng_officepurchasing_type', 'bill_priority', 'eng_material_consumingtype', 'sys_yes_no'],
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
            // 采购申请表格数据
            purchaseRequestList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkMaterialList: [],
            fkPurchaseRequestList: [],
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
                    { required: true, message: "采购申请号不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                purchasingType: [
                    { required: true, message: "采购类型不能为空", trigger: "change" }
                ],
                requestDay: [
                    { required: true, message: "请购日期不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              purchasingType: null,
              requestDay: null,
              requestorId: null,
              deptId: null,
            },
            //子表信息
            purchaseRequestItemList:[],
            // 选中数组
            idsPurchaseRequestItem: [],
            captionsPurchaseRequestItem: [],
            // 非单个禁用
            singlePurchaseRequestItem: true,
            // 非多个禁用
            multiplePurchaseRequestItem: true,
            // 子表选中数据
            checkedPurchaseRequestItem: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPurchaseRequestItem: false,
            formPurchaseRequestItem: {},
            rulesPurchaseRequestItem: {
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "订单数量不能为空", trigger: "blur" }
                ],
                requireDay: [
                   { required: true, message: "需求日期不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Dept数据 */
        this.getDeptList();
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 查询外键PurchaseRequest数据 */
        this.getPurchaseRequestList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPurchaseRequest(this.queryParams).then(response => {
              this.purchaseRequestList = response.rows;
              this.total = response.total;
              if (this.purchaseRequestList && this.purchaseRequestList.length>0) {
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
                this.getPurchaseRequestItemList();
            }else {
                this.purchaseRequestItemList = null;
            }
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.data;
            });
        },
        /** 查询外键Material数据 */
        getMaterialList() {
          listMaterialInfo().then(res => {
                this.fkMaterialList = res.rows;
            });
        },
        /** 查询外键PurchaseRequest数据 */
        getPurchaseRequestList() {
            listPurchaseRequest().then(res => {
                this.fkPurchaseRequestList = res.rows;
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
        /**主表外键RequestorId被选择后触发事件*/
        onRequestorIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.requestorId = item.userId
                }
            });
        },
        /**主表外键DeptId被选择后触发事件*/
        onDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.deptId = item.deptId
                }
            });
        },
        /** 子表外键PrId被选择后触发事件 **/
        onPurchaseRequestItemPrIdSelection(fkId){
            this.fkPurchaseRequestList.forEach(item=>{
                if(fkId === item.id){
                   this.formPurchaseRequestItem.prId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onPurchaseRequestItemMaterialIdSelection(fkId){
            this.fkMaterialList.forEach(item=>{
                if(fkId === item.id){
                   this.formPurchaseRequestItem.materialId = item.id
                    this.formPurchaseRequestItem.materialName = item.materialName
                    this.formPurchaseRequestItem.materialSpec = item.materialSpec
                    this.formPurchaseRequestItem.unitId = item.unitId
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                purchasingType: null,
                requestDay: null,
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
            getNextBillno("210").then(res => {
              this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getPurchaseRequest(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除采购申请号为"' + billNoz + '"的数据项？').then(function() {
                return delPurchaseRequest(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
       handleAuditReq(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定请审 采购申请号为"' + billNoz + '"的数据项吗？').then(function() {
           return auditReq(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("请审成功");
         }).catch(() => {});
       },
        handleExport() {
            this.download('sup/purchaseRequest/export', {
              ...this.queryParams
            }, `purchaseRequest_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updatePurchaseRequest(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPurchaseRequest(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                        updateBillSeq("210").then(res => {});
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






        /** 查询子表采购申请明细数据 */
        getPurchaseRequestItemList() {
            var params = {"prId":this.masterId};
            listPurchaseRequestItem(params).then(res => {
                this.purchaseRequestItemList = res.rows;
            });
        },
        // 多选框选中数据
        handlePurchaseRequestItemSelectionChange(selection) {
            this.idsPurchaseRequestItem = selection.map(item => item.id)
            this.captionsPurchaseRequestItem = selection.map(item => item.seqNo)
            this.singlePurchaseRequestItem = selection.length!==1
            this.multiplePurchaseRequestItem = !selection.length
        },
        /** 子表采购申请明细的CSS行样式 */
        rowClassNamePurchaseRequestItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPurchaseRequestItem.includes(row.id)){
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
        resetPurchaseRequestItem() {
            this.formPurchaseRequestItem = {
                id: null,
                prId: this.masterId,
                seqNo: null,
                quantity: null,
                requireDay: null,
                priority: null,
                consumeType: null,
                enableMust: null,
                enableReplace: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formPurchaseRequestItem");
            // 按关键字段值来初始化子表单数据
            this.onPurchaseRequestItemPrIdSelection(this.masterId);
        },
        handleAddSupPritem() {
          this.resetPurchaseRequestItem();
          this.openPurchaseRequestItem = true;
          this.title = "新增";
        },
        handleUpdateSupPritem(row) {
          this.resetPurchaseRequestItem();
          const id = row.id || this.idsPurchaseRequestItem
          getPurchaseRequestItem(id).then(response => {
              this.formPurchaseRequestItem = response.data;
              this.openPurchaseRequestItem = true;
              this.title = "修改";
          });
        },
        handleDeleteSupPritem(row) {
          const ids = row.id || this.idsPurchaseRequestItem;
          const seqNoz = row.seqNo || this.captionsPurchaseRequestItem;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delPurchaseRequestItem(ids);
          }).then(() => {
            this.getPurchaseRequestItemList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitPurchaseRequestItem() {
            this.$refs["formPurchaseRequestItem"].validate(valid => {
                if (valid) {
                  if(this.formPurchaseRequestItem.id==this.formPurchaseRequestItem.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPurchaseRequestItem.id != null) {
                        updatePurchaseRequestItem(this.formPurchaseRequestItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPurchaseRequestItem = false;
                            this.getPurchaseRequestItemList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPurchaseRequestItem(this.formPurchaseRequestItem)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPurchaseRequestItem = false;
                            this.getPurchaseRequestItemList();
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
        cancelPurchaseRequestItem() {
            this.openPurchaseRequestItem = false;
            this.resetPurchaseRequestItem();
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
