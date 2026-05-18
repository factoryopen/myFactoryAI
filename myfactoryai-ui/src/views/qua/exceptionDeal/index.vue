<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入异常单号"
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
            <el-form-item prop="quantity" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantity"
                    placeholder="请输入异常数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="description" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.description"
                    placeholder="请输入异常描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="inspectType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>检查类型</strong></span>
                </span>
                <el-select v-model="queryParams.inspectType" placeholder="请选择检查类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.qua_inspection_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="supplierLotNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>供应商批号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.supplierLotNo"
                    placeholder="请输入供应商批号"
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
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="580px"
                  :data="exceptionDealList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column label="异常单号" align="left" prop="billNo"  width="125"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.manufacturing_status_exception" :value="scope.row.status"/>
              </template>
            </el-table-column>
            <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                             :key="index"
                             size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="检查类型" align="center" prop="inspectType" width="70">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.qua_inspection_type" :value="scope.row.inspectType"/>
              </template>
            </el-table-column>
            <el-table-column label="异常数" align="right" prop="quantity"  width="70"/>
            <el-table-column label="异常描述" align="left" prop="description"  width="270"/>
            <el-table-column label="制造批" align="left" prop="mlId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="工序" align="center" prop="processSeq" width="60"/>
            <el-table-column label="工序码" align="center" prop="processId"  width="75">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                             :key="index"
                             size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产线" align="center" prop="lineId"  width="85">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkLineList">
                          <span v-if="item.id==scope.row.lineId"
                                :key="index"
                                size="mini">{{item.lineName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="班组" align="center" prop="inspectGroupId"  width="75">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkWorkgroupList">
                          <span v-if="item.id==scope.row.inspectGroupId"
                                :key="index"
                                size="mini">{{item.groupName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="供应商" align="left" prop="supplierId"  width="90">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="供应商批号" align="left" prop="supplierLotNo"  width="120"/>
            <el-table-column label="检查人" align="right" prop="inspectBy"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.inspectBy"
                            :key="index"
                            size="mini">{{item.nickName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
              <template slot-scope="scope">
                  <el-button
                       size="mini"
                       type="text"
                       icon="el-icon-magic-stick"
                       @click="handleJudge(scope.row)"
                  >判处</el-button>
              </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>
        <!-- 创建master.openjudge对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openjudge" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesjudge" label-width="120px" :inline-message="true">
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料编码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.materialCode" placeholder="请选择物料" size="mini"/>
                </el-form-item>
                <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.materialName" placeholder="请选择物料名称" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="materialSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true"/>
                </el-form-item>
                <hr>
                <el-form-item  prop="dealQuantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理数量</strong></span>
                      </span>
                  <el-input class="inputWidth" v-model="form.dealQuantity" placeholder="请输入处理数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="dealType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理类型</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.dealType" placeholder="请选择处理类型" size="mini" >
                    <el-option
                      v-for="dict in dict.type.qua_exeption_dealtype"
                      :key="dict.value"
                      :label="dict.label"
                      size="mini"
                      :value="parseInt(dict.value)"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="reasonDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>原因描述</strong></span>
                      </span>
                  <el-input class="inputWidth" type="textarea" v-model="form.reasonDesc" placeholder="请输入原因描述" size="mini" />
                </el-form-item>
                <el-form-item  prop="solutionDesc" class="marginBottom0">
                  <span slot="label">
                      <span class="fontSize12"><strong>处理描述</strong></span>
                  </span>
                  <el-input class="inputWidth" type="textarea" v-model="form.solutionDesc" placeholder="请输入处理描述" size="mini" />
                </el-form-item>
                <el-form-item v-if="form.inspectType>=10 && form.inspectType<=30" prop="supplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.supplierId" placeholder="请选择供应商" size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierList"
                            :key="index"
                            :label="fkrow.supplierName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.inspectType>=10 && form.inspectType<=30"  prop="supplierLotNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商批号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.supplierLotNo" placeholder="请输入供应商批号" size="mini" />
                </el-form-item>
                <el-form-item v-if="form.inspectType>=40 && form.inspectType<=80" prop="dutyLineId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>责任产线</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.dutyLineId" placeholder="请选择责任产线"
                               @change="onDutyLineIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkLineList"
                            :key="index"
                            :label="fkrow.lineName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.inspectType>=40 && form.inspectType<=80" prop="dutyGroupId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>责任班组</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.dutyGroupId" placeholder="请选择责任班组"
                             @change="onDutyGroupIdSelection"  size="mini" >
                    <el-option
                      v-for="(fkrow, index) in fkWorkgroupList"
                      :key="index"
                      :label="fkrow.groupName"
                      :value="fkrow.id"
                      size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.inspectType>=40 && form.inspectType<=80" prop="dutyProcessId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>责任工序</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.dutyProcessId" placeholder="请选择责任工序" size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkWorkgroupProcessList"
                            :key="index"
                            :label="fkrow.processCode+'：'+fkrow.processName"
                            :value="fkrow.processId"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitjudge">确 定</el-button>
               <el-button @click="canceljudge">取 消</el-button>
            </div>
        </el-dialog>
        <el-tabs>
            <el-tab-pane label="判处结果">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="exceptionDealResult" border
                        :data="exceptionDealResultList"
                        highlight-current-row
                        :row-class-name="rowClassNameExceptionDealResult"
                        @selection-change="handleExceptionDealResultSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="处理类型" align="center" prop="dealType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.qua_exeption_dealtype" :value="scope.row.dealType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="处理数量" align="right" prop="dealQuantity" width="70"/>
                    <el-table-column label="原因描述" align="left" prop="reasonDesc" width="200"/>
                    <el-table-column label="处理描述" align="left" prop="solutionDesc" width="200"/>
                    <el-table-column label="责任产线" align="center" prop="dutyLineId"  width="85">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkLineList">
                                  <span v-if="item.id==scope.row.dutyLineId"
                                        :key="index"
                                        size="mini">{{item.lineName}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="责任班组" align="center" prop="dutyGroupId"  width="75">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkWorkgroupList">
                                  <span v-if="item.id==scope.row.dutyGroupId"
                                        :key="index"
                                        size="mini">{{item.groupName}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="责任工序" align="center" prop="dutyProcessId"  width="75">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkProcessList">
                            <span v-if="item.id==scope.row.dutyProcessId"
                                  :key="index"
                                  size="mini">{{item.processCode}}
                            </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="制异分类" align="left" prop="mcategoryId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMexceptionCategorytypeList">
                                <span v-if="item.id==scope.row.mcategoryId"
                                    :key="index"
                                    size="mini">{{item.categoryCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="制因分类" align="left" prop="mreasonTypeId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMexceptionReasontypeList">
                                <span v-if="item.id==scope.row.mreasonTypeId"
                                    :key="index"
                                    size="mini">{{item.reasonCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="制处分类" align="left" prop="msolutionTypeId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMexceptionSolutiontypeList">
                                <span v-if="item.id==scope.row.msolutionTypeId"
                                    :key="index"
                                    size="mini">{{item.dealtypeCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="供应商" align="left" prop="supplierId"  width="100">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkSupplierList">
                                  <span v-if="item.id==scope.row.supplierId"
                                        :key="index"
                                        size="mini">{{item.supplierName}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="供应商批号" align="left" prop="supplierLotNo"/>
                    <el-table-column label="购异分类" align="right" prop="pcategoryId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkPexceptionCategorytypeList">
                                <span v-if="item.id==scope.row.pcategoryId"
                                    :key="index"
                                    size="mini">{{item.categoryCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="购因分类" align="right" prop="preasonTypeId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkPexceptionReasontypeList">
                                <span v-if="item.id==scope.row.preasonTypeId"
                                    :key="index"
                                    size="mini">{{item.reasonCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="购处分类" align="right" prop="psolutionTypeId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkPexceptionSolutiontypeList">
                                <span v-if="item.id==scope.row.psolutionTypeId"
                                    :key="index"
                                    size="mini">{{item.dealtypeCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listExceptionDeal, getExceptionDeal, delExceptionDeal, addExceptionDeal, updateExceptionDeal } from "@/api/qua/exceptionDeal";
import { judge } from "@/api/qua/exceptionDeal";
import { listExceptionDealResult} from "@/api/qua/exceptionDealResult";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listWorkgroupProcess} from "@/api/res/workgroupProcess";
import { listProcess} from "@/api/eng/process";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listSupplier} from "@/api/sup/supplier";
import { listMexceptionCategorytype} from "@/api/qua/mexceptionCategorytype";
import { listMexceptionReasontype} from "@/api/qua/mexceptionReasontype";
import { listMexceptionSolutiontype} from "@/api/qua/mexceptionSolutiontype";
import { listPexceptionCategorytype} from "@/api/qua/pexceptionCategorytype";
import { listPexceptionReasontype} from "@/api/qua/pexceptionReasontype";
import { listPexceptionSolutiontype} from "@/api/qua/pexceptionSolutiontype";

export default {
    name: "ExceptionDeal",
    dicts: ['manufacturing_status_exception', 'qua_inspection_type', 'qua_exeption_dealtype'],
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
            // 质量异常判处表格数据
            exceptionDealList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkProcessList: [],
            fkWorkgroupProcessList: [],
            fkLineList: [],
            fkWorkgroupList: [],
            fkMexceptionCategorytypeList: [],
            fkMexceptionReasontypeList: [],
            fkMlTraceList: [],
            fkSupplierList: [],
            fkMexceptionSolutiontypeList: [],
            fkPexceptionCategorytypeList: [],
            fkPexceptionReasontypeList: [],
            fkPexceptionSolutiontypeList: [],
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
            openjudge: false,
            rulesjudge: {
                dealQuantity: [
                    { required: true, message: "处理数量不能为空", trigger: "blur" }
                ],
                dealType: [
                    { required: true, message: "判断类型不能为空", trigger: "blur" }
                ],
                reasonDesc: [
                  { required: true, message: "原因描述不能为空", trigger: "blur" }
                ],
                solutionDesc: [
                  { required: true, message: "处理描述不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              billNo: null,
              status: null,
              materialId: null,
              materialName: null,
              materialSpec: null,
              unitId: null,
              quantity: null,
              description: null,
              inspectType: null,
              mlId: null,
              lineId: null,
              processSeq: null,
              processId: null,
              supplierId: null,
              supplierLotNo: null,
              inspectGroupId: null,
              inspectBy: null,
            },
            //子表信息
            exceptionDealResultList:[],
            // 选中数组
            idsExceptionDealResult: [],
            captionsExceptionDealResult: [],
            // 非单个禁用
            singleExceptionDealResult: true,
            // 非多个禁用
            multipleExceptionDealResult: true,
            // 子表选中数据
            checkedExceptionDealResult: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openExceptionDealResult: false,
            formExceptionDealResult: {},
            rulesExceptionDealResult: {},
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
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键MexceptionCategorytype数据 */
        this.getMexceptionCategorytypeList();
        /** 查询外键MexceptionReasontype数据 */
        this.getMexceptionReasontypeList();
        /** 查询外键MlTrace数据 */
        this.getMlTraceList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键MexceptionSolutiontype数据 */
        this.getMexceptionSolutiontypeList();
        /** 查询外键PexceptionCategorytype数据 */
        this.getPexceptionCategorytypeList();
        /** 查询外键PexceptionReasontype数据 */
        this.getPexceptionReasontypeList();
        /** 查询外键PexceptionSolutiontype数据 */
        this.getPexceptionSolutiontypeList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listExceptionDeal(this.queryParams).then(response => {
              this.exceptionDealList = response.rows;
              this.total = response.total;
              if (this.exceptionDealList && this.exceptionDealList.length>0) {
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
                this.getExceptionDealResultList();
            }else {
                this.exceptionDealResultList = null;
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
        /** 查询外键Process数据 */
        getProcessList() {
            listProcess().then(res => {
              this.fkProcessList = res.rows;
            });
        },
        /** 查询外键Process数据 */
        getWorkgroupProcessList(groupId) {
            var params=null;
            if (groupId!=null) params={"groupId":groupId};
            listWorkgroupProcess(params).then(res => {
              this.fkWorkgroupProcessList = res.rows;
            });
        },
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
            });
        },
        /** 查询外键Workgroup数据 */
        getWorkgroupList(lineId) {
            var params=null;
            if (lineId!=null) params={"lineId":lineId};
            listWorkgroup(params).then(res => {
                this.fkWorkgroupList = res.rows;
            });
        },
        /** 查询外键MexceptionCategorytype数据 */
        getMexceptionCategorytypeList() {
            listMexceptionCategorytype().then(res => {
                this.fkMexceptionCategorytypeList = res.rows;
            });
        },
        /** 查询外键MexceptionReasontype数据 */
        getMexceptionReasontypeList() {
            listMexceptionReasontype().then(res => {
                this.fkMexceptionReasontypeList = res.rows;
            });
        },
        /** 查询外键MlTrace数据 */
        getMlTraceList() {
            listMlTrace().then(res => {
                this.fkMlTraceList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键MexceptionSolutiontype数据 */
        getMexceptionSolutiontypeList() {
            listMexceptionSolutiontype().then(res => {
                this.fkMexceptionSolutiontypeList = res.rows;
            });
        },
        /** 查询外键PexceptionCategorytype数据 */
        getPexceptionCategorytypeList() {
            listPexceptionCategorytype().then(res => {
                this.fkPexceptionCategorytypeList = res.rows;
            });
        },
        /** 查询外键PexceptionReasontype数据 */
        getPexceptionReasontypeList() {
            listPexceptionReasontype().then(res => {
                this.fkPexceptionReasontypeList = res.rows;
            });
        },
        /** 查询外键PexceptionSolutiontype数据 */
        getPexceptionSolutiontypeList() {
            listPexceptionSolutiontype().then(res => {
                this.fkPexceptionSolutiontypeList = res.rows;
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
        /**主表外键McategoryId被选择后触发事件*/
        onMcategoryIdSelection(fkId){
            this.fkMexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mcategoryId = item.id
                }
            });
        },
        /**主表外键MreasonTypeId被选择后触发事件*/
        onMreasonTypeIdSelection(fkId){
            this.fkMexceptionReasontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mreasonTypeId = item.id
                }
            });
        },
        /**主表外键MsolutionTypeId被选择后触发事件*/
        onMsolutionTypeIdSelection(fkId){
            this.fkMexceptionSolutiontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.msolutionTypeId = item.id
                }
            });
        },
        /**主表外键PcategoryId被选择后触发事件*/
        onPcategoryIdSelection(fkId){
            this.fkPexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.pcategoryId = item.id
                }
            });
        },
        /**主表外键PreasonTypeId被选择后触发事件*/
        onPreasonTypeIdSelection(fkId){
            this.fkPexceptionReasontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.preasonTypeId = item.id
                }
            });
        },
        /**主表外键PsolutionTypeId被选择后触发事件*/
        onPsolutionTypeIdSelection(fkId){
            this.fkPexceptionSolutiontypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.psolutionTypeId = item.id
                }
            });
        },
        /**主表外键DutyLineId被选择后触发事件*/
        onDutyLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.getWorkgroupList(item.id);
                }
            });
        },
        /**主表外键DutyGroupId被选择后触发事件*/
        onDutyGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                  this.getWorkgroupProcessList(item.id);
                }
            });
        },
        /** 重设主表的判处对话框数据 */
        resetjudge (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                quantity: null,
                description: null,
                inspectType: null,
                supplierLotNo: null,
                inspectTime: null,
                dealType: null,
                dealQuantity: null,
                reasonDesc: null,
                solutionDesc: null,
                dealTime: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        handleExport() {
            this.download('qua/exceptionDeal/export', {
              ...this.queryParams
            }, `exceptionDeal_${new Date().getTime()}.xlsx`)
        },
        handleJudge(row) {
            const id = row.id || this.ids
            getExceptionDeal(id).then(response => {
                this.form = response.data;
                this.getWorkgroupList(this.form.lineId);
                this.getWorkgroupProcessList(this.form.inspectGroupId);
                this.$set(this.form, "dealQuantity", this.form.quantity);
                this.$set(this.form, "dutyLineId", this.form.lineId);
                this.$set(this.form, "dutyGroupId", this.form.inspectGroupId);
                this.$set(this.form, "dutyProcessId", this.form.processId);

                this.openjudge = true;
                this.title = "判处质量异常";
            });
        },
        /** 提交按钮 */
        submitjudge() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  judge(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openjudge = false;
                      this.getMasterList();
                  });
                }
              }
          });
        },
        // 取消按钮
        canceljudge() {
            this.openjudge = false;
            this.resetjudge();
        },
        /** 查询子表质量异常判处结果数据 */
        getExceptionDealResultList() {
            var params = {"id":this.masterId};
            listExceptionDealResult(params).then(res => {
                this.exceptionDealResultList = res.rows;
            });
        },
        // 多选框选中数据
        handleExceptionDealResultSelectionChange(selection) {
            this.idsExceptionDealResult = selection.map(item => item.id)
            this.captionsExceptionDealResult = selection.map(item => item.billNo)
            this.singleExceptionDealResult = selection.length!==1
            this.multipleExceptionDealResult = !selection.length
        },
        /** 子表质量异常判处结果的CSS行样式 */
        rowClassNameExceptionDealResult({ row, rowIndex }) {
            var clsName = ''

            if (this.idsExceptionDealResult.includes(row.id)){
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
