<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
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
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.bill_status_processing"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini"
 :disabled="single"                     @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini"
 :disabled="multiple"                     @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini"
 :disabled="multiple"                     @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="inspectReturnList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="异常单号" align="center" prop="billNo" width="125"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_processing" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="产品" align="right" prop="materialCode"  width="135"/>
            <el-table-column label="产品名称" align="left" prop="materialName" width="140"/>
            <el-table-column label="产品规格" align="left" prop="materialSpec" width="120"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId" width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="异常数量" align="right" prop="quantity" width="70"/>
            <el-table-column label="异常描述" align="left" prop="description" width="400"/>
            <el-table-column label="制造批" align="center" prop="mlId"  width="135">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产线" align="center" prop="lineId" width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="工序号" align="center" prop="processSeq" width="60"/>
            <el-table-column label="工序" align="center" prop="processId" width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="班组" align="center" prop="inspectGroupId" width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.inspectGroupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
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
                              @click="handleUpdate(scope.row)"
                          >修改</el-button>
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-phone-outline"
                              @click="handleRequestDeal(scope.row)"
                          >请判</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
<!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>异常单号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入异常单号" size="mini" />
                </el-form-item>
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>产品</strong></span></span>
                    <el-select class="inputWidth" v-model="form.materialId" placeholder="请选择产品"
                               @change="onMaterialIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkProductBasisList"
                          :key="index"
                          :label="fkrow.materialCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品名称</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialName" placeholder="请选择产品名称" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProductBasisList"
                        :key="index"
                        :label="fkrow.materialName"
                        :value="fkrow.materialName"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="materialSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialSpec" placeholder="请选择产品规格" size="mini" disabled="true">
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
                <el-form-item  prop="quantity" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>异常数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入异常数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="description" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>异常描述</strong></span></span>
                     <el-input class="inputWidth" v-model="form.description" placeholder="请输入异常描述" size="mini" />
                </el-form-item>
                <el-form-item prop="mlId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>制造批</strong></span></span>
                    <el-select class="inputWidth" v-model="form.mlId" placeholder="请选择制造批"
                               @change="onMlIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMlTraceList"
                          :key="index"
                          :label="fkrow.billNo"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="lineId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>产线</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.lineId" placeholder="请选择产线" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkLineList"
                          :key="index"
                          :label="fkrow.lineName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="processSeq" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>工序号</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.processSeq" placeholder="请选择工序号" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMlTraceList"
                        :key="index"
                        :label="fkrow.currentProcessSeq"
                        :value="fkrow.currentProcessSeq"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="processId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>工序</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processId" placeholder="请选择工序" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkProcessList"
                          :key="index"
                          :label="fkrow.processCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="inspectGroupId" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>班组</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.inspectGroupId" placeholder="请选择班组" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkWorkgroupList"
                          :key="index"
                          :label="fkrow.groupName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
                     <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getNextBillno, updateBillSeq } from "@/api/qua/inspectReturn";
import { listInspectReturn, getInspectReturn, delInspectReturn, addInspectReturn, updateInspectReturn } from "@/api/qua/inspectReturn";
import { requestDeal } from "@/api/qua/inspectReturn";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMexceptionCategorytype} from "@/api/qua/mexceptionCategorytype";
import { listMexceptionReasontype} from "@/api/qua/mexceptionReasontype";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listSupplier} from "@/api/sup/supplier";
import { listMexceptionSolutiontype} from "@/api/qua/mexceptionSolutiontype";
import { listPexceptionCategorytype} from "@/api/qua/pexceptionCategorytype";
import { listPexceptionReasontype} from "@/api/qua/pexceptionReasontype";
import { listPexceptionSolutiontype} from "@/api/qua/pexceptionSolutiontype";

export default {
    name: "InspectReturn",
    dicts: ['bill_status_processing', 'qua_inspection_type', 'qua_exeption_dealtype'],
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
        // 显示搜索条件
        showSearch: false,
        // 总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 退货检异登记表格数据
        inspectReturnList: [],
        fkUserList: [],
        fkUnitList: [],
        fkDeptList: [],
        fkProcessList: [],
        fkLineList: [],
        fkWorkgroupList: [],
        fkProductBasisList: [],
        fkMexceptionCategorytypeList: [],
        fkMexceptionReasontypeList: [],
        fkMlTraceList: [],
        fkSupplierList: [],
        fkMexceptionSolutiontypeList: [],
        fkPexceptionCategorytypeList: [],
        fkPexceptionReasontypeList: [],
        fkPexceptionSolutiontypeList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          materialId: null,
          materialName: null,
          materialSpec: null,
          unitId: null,
          quantity: null,
          description: null,
          mlId: null,
          lineId: null,
          processSeq: null,
          processId: null,
          inspectGroupId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            billNo: [
                { required: true, message: "异常单号不能为空", trigger: "blur" }
            ],
            status: [
                { required: true, message: "状态不能为空", trigger: "change" }
            ],
            materialId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
            ],
            unitId: [
                { required: true, message: "单位不能为空", trigger: "blur" }
            ],
            quantity: [
                { required: true, message: "异常数量不能为空", trigger: "blur" }
            ],
            description: [
                { required: true, message: "异常描述不能为空", trigger: "blur" }
            ],
            inspectType: [
                { required: true, message: "检查类型不能为空", trigger: "change" }
            ],
            mlId: [
                { required: true, message: "制造批不能为空", trigger: "blur" }
            ],
            processSeq: [
                { required: true, message: "工序号不能为空", trigger: "blur" }
            ],
            processId: [
                { required: true, message: "工序不能为空", trigger: "blur" }
            ],
            dealQuantity: [
                { required: true, message: "处理数量不能为空", trigger: "blur" }
            ],
            dutyProcessId: [
                { required: true, message: "责任工序ID不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
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
          /** 查询外键ProductBasis数据 */
          this.getProductBasisList();
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
    methods: {
      /** 表格行样式 */
      rowClassName({ row, rowIndex }) {
          var className = ''
          if (this.ids.includes(row.id)){
            className = 'selected-row';
          }
          else if (row.priority == 1) {
            className = 'super-urgent-row';
          } else if (row.priority == 2) {
            className = 'urgent-row';
          }


        return className;
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
          /** 查询外键Line数据 */
      getLineList() {
        listLine().then(res => {
          this.fkLineList = res.rows;
        });
      },
          /** 查询外键Workgroup数据 */
      getWorkgroupList() {
        listWorkgroup().then(res => {
          this.fkWorkgroupList = res.rows;
        });
      },
          /** 查询外键ProductBasis数据 */
      getProductBasisList() {
        listProductBasis().then(res => {
          this.fkProductBasisList = res.rows;
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

/**主表外键MaterialId被选择后触发事件*/
        onMaterialIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.materialId = item.id
                    this.form.materialName = item.materialName
                    this.form.materialSpec = item.materialSpec
                    this.form.unitId = item.unitId
                }
            });
        },
/**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                    this.form.lineId = item.lineId
                    this.form.processSeq = item.currentProcessSeq
                    this.form.processId = item.currentProcessId
                    this.form.inspectGroupId = item.currentWorkgroupId
                }
            });
        },
/**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
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
                    this.form.dutyLineId = item.id
                }
            });
        },
/**主表外键DutyProcessId被选择后触发事件*/
        onDutyProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dutyProcessId = item.id
                }
            });
        },
/**主表外键DutyGroupId被选择后触发事件*/
        onDutyGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dutyGroupId = item.id
                }
            });
        },
/**主表外键DealDeptId被选择后触发事件*/
        onDealDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectDeptId = item.deptId
                    this.form.dealDeptId = item.deptId
                }
            });
        },
/**主表外键DealBy被选择后触发事件*/
        onDealBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.inspectBy = item.userId
                    this.form.dealBy = item.userId
                }
            });
        },

        /** 查询退货检异登记列表 */
        getList() {
            this.loading = true;
        listInspectReturn(this.queryParams).then(response => {
          this.inspectReturnList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
        reset (){
            this.form = {
              id: null,
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
              inspectDeptId: null,
              inspectTime: null,
              dealType: null,
              dealQuantity: null,
              mcategoryId: null,
              mreasonTypeId: null,
              msolutionTypeId: null,
              pcategoryId: null,
              preasonTypeId: null,
              psolutionTypeId: null,
              reasonDesc: null,
              solutionDesc: null,
              dutyLineId: null,
              dutyProcessId: null,
              dutyGroupId: null,
              dealDeptId: null,
              dealBy: null,
              dealTime: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },

        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
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

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增退货检异登记";
            getNextBillno("720").then(res => {
                this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getInspectReturn(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改退货检异登记";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除异常单号为"' + billNoz + '"的数据项？').then(function() {
              return delInspectReturn(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('qua/inspectReturn/export', {
             ...this.queryParams
             }, `inspectReturn_${new Date().getTime()}.xlsx`)
        },
        handleRequestDeal(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定请判 异常单号为"' + billNoz + '"的数据项吗？').then(function() {
                 return requestDeal(ids);
            }).then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
            }).catch(error => {
                this.$modal.msgError(error.msg);
            });
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateInspectReturn(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addInspectReturn(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                  updateBillSeq("720").then(res => {});
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
