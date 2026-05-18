<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>质检请求码</strong></span>
                </span>
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入质检请求码"
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
            v-for="dict in dict.type.bill_status_process_req"
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
      <el-form-item prop="inspectType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>检验类型</strong></span>
                </span>
        <el-select v-model="queryParams.inspectType" placeholder="请选择检验类型" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.qua_inspection_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
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
                        <span class="fontSize12"><strong>请检人</strong></span>
                    </span>
        <el-select class="inputWidth" v-model="queryParams.requestorId" placeholder="请选择请检人" size="mini">
          <el-option
            v-for="(fkrow, index) in fkUserList"
            :key="index"
            :label="fkrow.nickName"
            :value="fkrow.userId"
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
      <el-form-item prop="sourceProcessId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>来源工序</strong></span>
                    </span>
        <el-select class="inputWidth" v-model="queryParams.sourceProcessId" placeholder="请选择来源工序" size="mini">
          <el-option
            v-for="(fkrow, index) in fkProcessList"
            :key="index"
            :label="fkrow.processCode"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
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
      <el-form-item prop="sourceGroupId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>来源班组</strong></span>
                    </span>
        <el-select class="inputWidth" v-model="queryParams.sourceGroupId" placeholder="请选择来源班组" size="mini">
          <el-option
            v-for="(fkrow, index) in fkWorkgroupList"
            :key="index"
            :label="fkrow.groupName"
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
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleDownload"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="340px"
              :data="inspectReDealList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="质检请求码" align="center" prop="billNo"  width="140"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="来源单号" align="center" prop="requestBillNo"  width="140"/>
      <el-table-column label="检验类型" align="center" prop="inspectType" width="75">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.qua_inspection_type" :value="scope.row.inspectType"/>
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
      <el-table-column label="请检人" align="center" prop="requestorId"  width="75">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkUserList">
                        <span v-if="item.userId==scope.row.requestorId"
                              :key="index"
                              size="mini">{{item.nickName}}</span>
          </template>
        </template>
      </el-table-column>
<!--      <el-table-column label="来源厂商" align="left" prop="sourceSupplierId"  width="120">-->
<!--        <template  slot-scope="scope">-->
<!--          <template v-for="(item,index) in fkSupplierList">-->
<!--                        <span v-if="item.id==scope.row.sourceSupplierId"-->
<!--                              :key="index"-->
<!--                              size="mini">{{item.supplierName}}</span>-->
<!--          </template>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="来源工序" align="center" prop="sourceProcessId"  width="90">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.sourceProcessId"
                              :key="index"
                              size="mini">{{item.processCode}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="来源产线" align="center" prop="sourceLineId"  width="90">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.sourceLineId"
                              :key="index"
                              size="mini">{{item.lineName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="来源班组" align="center" prop="sourceGroupId"  width="90">
        <template  slot-scope="scope">
          <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.sourceGroupId"
                              :key="index"
                              size="mini">{{item.groupName}}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

    <el-tabs>
      <el-tab-pane label="请检明细">
        <el-row :gutter="10" class="mb8">
        </el-row>
        <el-table ref="inspectRequestItem" border
                  :data="inspectRequestItemList"
                  highlight-current-row
                  :row-class-name="rowClassNameInspectRequestItem"
                  @selection-change="handleInspectRequestItemSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="项次号" align="center" prop="seqNo" width="60"/>
          <el-table-column label="状态" align="center" prop="status" width="60">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.bill_status_process_req" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="物料编码" align="right" prop="materialCode"  width="168"/>
          <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
          <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
          <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
          <el-table-column label="单位" align="right" prop="unitId"  width="60">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                      :key="index"
                                      size="mini">{{item.unitName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="请检数量" align="right" prop="quantity" width="110"/>
          <el-table-column label="检异常量" align="right" prop="quantityQcExceptional" width="80"/>
          <el-table-column label="检合格数" align="right" prop="quantityQcGood" width="80"/>
          <el-table-column label="检不良数" align="right" prop="quantityQcNg" width="80"/>
          <el-table-column label="检重制数" align="right" prop="quantityQcRedisp" width="80"/>
          <el-table-column label="检重工数" align="right" prop="quantityQcRework" width="80"/>
          <el-table-column label="检待判数" align="right" prop="quantityQcPending" width="80"/>
          <el-table-column label="检特采数" align="right" prop="quantityQcAod" width="80"/>
          <el-table-column label="备注" align="center" prop="remark"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 创建slaver.openInspectRequestItemregisterInspection对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openInspectRequestItemregisterInspection" width="500px" append-to-body>
      <el-form ref="formInspectRequestItem" :model="formInspectRequestItem" :rules="rulesInspectRequestItemregisterInspection" label-width="140px" :inline-message="true">
        <el-form-item prop="requestId" class="marginBottom0">
                  <span slot="label">
                      <span class="fontSize12"><strong>请求</strong></span>
                  </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.requestNo" placeholder="请输入请求ID" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>项次号</strong></span>
                    </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.seqNo" placeholder="请输入项次号" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="materialId" class="marginBottom0" >
          <span slot="label">
              <span class="fontSize12"><strong>物料</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.materialCode" placeholder="请选择物料" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>单位</strong></span>
          </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
              <span class="fontSize12"><strong>请检数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.quantity" placeholder="请输入请检数量" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item  prop="dealType" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>异常类型</strong></span>
          </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.dealType" placeholder="请选择处理类型" size="mini" >
            <el-option
              v-for="dict in dict.type.qua_exeption_dealtype"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="quantityExceptional" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>异常数量</strong></span>
          </span>
          <el-input class="inputWidth" type="number" v-model="formInspectRequestItem.quantityExceptional" placeholder="请输入处理数量" size="mini" />
        </el-form-item>
        <el-form-item  prop="description" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>异常描述</strong></span>
          </span>
          <el-input class="inputWidth" type="textarea" :rows="3" v-model="formInspectRequestItem.description" placeholder="请输入原因描述" size="mini" />
        </el-form-item>
        <el-form-item  prop="categoryId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>异常分类</strong></span>
          </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.categoryId" placeholder="请选择异常分类" size="mini">
            <el-option
              v-for="(fkrow, index) in fkExceptionCategorytypeList"
              :key="index"
              :label="fkrow.categoryCode+':'+fkrow.categoryDesc"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="reasonTypeId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>原因类型</strong></span>
          </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.reasonTypeId" placeholder="请选择原因类型" size="mini">
            <el-option
              v-for="(fkrow, index) in fkExceptionReasontypeList"
              :key="index"
              :label="fkrow.reasonCode+':'+fkrow.reasonDesc"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="solutionTypeId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>处理类型</strong></span>
          </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.solutionTypeId" placeholder="请选择处理类型" size="mini">
            <el-option
              v-for="(fkrow, index) in fkExceptionSolutiontypeList"
              :key="index"
              :label="fkrow.dealtypeCode+':'+fkrow.dealtypeDesc"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="reasonDesc" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>原因描述</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.reasonDesc" placeholder="请输入原因描述" size="mini" />
        </el-form-item>
        <el-form-item  prop="solutionDesc" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>处理描述</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.solutionDesc" placeholder="请输入处理描述" size="mini" />
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>备注</strong></span>
          </span>
          <el-input class="inputWidth" type="textarea" :rows="2" v-model="formInspectRequestItem.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitInspectRequestItemregisterExceptionalInspection">确 定</el-button>
        <el-button @click="cancelInspectRequestItemregisterExceptionalInspection">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 创建slaver.openInspectRequestItemRequestJugde对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openInspectRequestItemRequestJugde" width="500px" append-to-body>
      <el-form ref="formInspectRequestItem" :model="formInspectRequestItem" :rules="rulesInspectRequestItemRequestJugde" label-width="140px" :inline-message="true">
        <el-form-item prop="requestId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>请求</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.requestNo" placeholder="请输入请求ID" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项次号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.seqNo" placeholder="请输入项次号" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="materialId" class="marginBottom0" >
          <span slot="label">
              <span class="fontSize12"><strong>物料</strong></span>
          </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.materialCode" placeholder="请选择物料" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="unitId" class="marginBottom0">
            <span slot="label">
                <span class="fontSize12"><strong>单位</strong></span>
            </span>
          <el-select class="inputWidth" v-model="formInspectRequestItem.unitId" placeholder="请选择单位" size="mini" disabled="true">
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
                <span class="fontSize12"><strong>请检数量</strong></span>
            </span>
          <el-input class="inputWidth" v-model="formInspectRequestItem.quantity" placeholder="请输入请检数量" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item  prop="quantityExceptional" class="marginBottom0">
            <span slot="label">
                <span class="fontSize12"><strong>异常数量</strong></span>
            </span>
          <el-input class="inputWidth" type="number" v-model="formInspectRequestItem.quantityExceptional" placeholder="请输入处理数量" size="mini" />
        </el-form-item>
        <el-form-item  prop="description" class="marginBottom0">
            <span slot="label">
                <span class="fontSize12"><strong>异常描述</strong></span>
            </span>
          <el-input class="inputWidth" type="textarea" :rows="3" v-model="formInspectRequestItem.description" placeholder="请输入原因描述" size="mini" />
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
            <span slot="label">
                <span class="fontSize12"><strong>备注</strong></span>
            </span>
          <el-input class="inputWidth" type="textarea" :rows="2" v-model="formInspectRequestItem.remark" placeholder="请输入备注" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitInspectRequestItemRequestJugde">确 定</el-button>
        <el-button @click="cancelInspectRequestItemRequestJugde">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInspectReDeal, getInspectReDeal, acceptInspection } from "@/api/qua/inspectReDeal";
import {listInspectRequestItem, getInspectRequestItem, registerGoodInspection, registerExceptionalInspection, requestJugde } from "@/api/qua/inspectRequestItem";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listSupplier} from "@/api/sup/supplier";
import { listMexceptionCategorytype} from "@/api/qua/mexceptionCategorytype";
import { listMexceptionReasontype} from "@/api/qua/mexceptionReasontype";
import { listMexceptionSolutiontype} from "@/api/qua/mexceptionSolutiontype";
import { listPexceptionCategorytype} from "@/api/qua/pexceptionCategorytype";
import { listPexceptionReasontype} from "@/api/qua/pexceptionReasontype";
import { listPexceptionSolutiontype} from "@/api/qua/pexceptionSolutiontype";

export default {
  name: "InspectReDeal",
  dicts: ['bill_status_process_req', 'qua_inspection_type','qua_exeption_dealtype'],
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
      // 质检请求处理表格数据
      inspectReDealList: [],
      fkUserList: [],
      fkUnitList: [],
      fkProcessList: [],
      fkLineList: [],
      fkWorkgroupList: [],
      fkProjectList: [],
      fkSupplierList: [],
      fkInspectReDealList: [],
      fkExceptionCategorytypeList: [],
      fkExceptionReasontypeList: [],
      fkExceptionSolutiontypeList: [],
      //主表当前行的ID
      masterId:"",
      masterNo:"",
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
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        billNo: null,
        status: null,
        requestBillId: null,
        requestBillNo: null,
        inspectType: null,
        projectId: null,
        requestorId: null,
        sourceSupplierId: null,
        sourceProcessId: null,
        sourceLineId: null,
        sourceGroupId: null,
      },
      //子表信息
      inspectRequestItemList:[],
      // 选中数组
      idsInspectRequestItem: [],
      captionsInspectRequestItem: [],
      // 非单个禁用
      singleInspectRequestItem: true,
      // 非多个禁用
      multipleInspectRequestItem: true,
      // 子表选中数据
      checkedInspectRequestItem: [],
      /*
       * 3类Slaver对话框的显示、表单、校验 *
       */
      openInspectRequestItem: false,
      formInspectRequestItem: {
        requestNo:null,
        dealType:null,
        quantityExceptional:null,
        description:null,
        categoryId:null,
        reasonTypeId:null,
        solutionTypeId:null,
        reasonDesc:null,
        solutionDesc:null,
      },
      rulesInspectRequestItem: {},
      openInspectRequestItemregisterInspection: false,
      rulesInspectRequestItemregisterInspection: {
        dealType: [
          { required: true, message: "异常类型不能为空", trigger: "blur" }
        ],
        quantityExceptional: [
          { required: true, message: "异常数量不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "异常描述不能为空", trigger: "blur" }
        ],
      },
      openInspectRequestItemRequestJugde: false,
      rulesInspectRequestItemRequestJugde: {
        quantityExceptional: [
          { required: true, message: "异常数量不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "异常描述不能为空", trigger: "blur" }
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
    /** 查询外键Process数据 */
    this.getProcessList();
    /** 查询外键Line数据 */
    this.getLineList();
    /** 查询外键Workgroup数据 */
    this.getWorkgroupList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键Supplier数据 */
    this.getSupplierList();
    /** 查询外键InspectReDeal数据 */
    this.getInspectReDealList();
    this.getExceptionCategorytypeList();
    /** 查询外键PexceptionReasontype数据 */
    this.getExceptionReasontypeList();
    /** 查询外键PexceptionSolutiontype数据 */
    this.getExceptionSolutiontypeList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listInspectReDeal(this.queryParams).then(response => {
        this.inspectReDealList = response.rows;
        this.total = response.total;
        if (this.inspectReDealList && this.inspectReDealList.length>0) {
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
        this.getInspectRequestItemList();
      }else {
        this.inspectRequestItemList = null;
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
    /** 查询外键InspectReDeal数据 */
    getInspectReDealList() {
      listInspectReDeal().then(res => {
        this.fkInspectReDealList = res.rows;
      });
    },
    /** 查询外键PexceptionCategorytype数据 */
    getExceptionCategorytypeList(inspectType) {
      if (inspectType==10 || inspectType==20 || inspectType==30)
        listPexceptionCategorytype().then(res => {
          this.fkExceptionCategorytypeList = res.rows;
        });
      else if (inspectType==40 || inspectType==50 || inspectType==60){
        listMexceptionCategorytype().then(res => {
          this.fkExceptionCategorytypeList = res.rows;
        });
      }else if (inspectType==70 || inspectType==80){
      }
    },
    /** 查询外键PexceptionReasontype数据 */
    getExceptionReasontypeList(inspectType) {
      if (inspectType==10 || inspectType==20 || inspectType==30)
        listPexceptionReasontype().then(res => {
          this.fkExceptionReasontypeList = res.rows;
        });
      else if (inspectType==40 || inspectType==50 || inspectType==60){
        listMexceptionReasontype().then(res => {
          this.fkExceptionReasontypeList = res.rows;
        });
      }else if (inspectType==70 || inspectType==80){
      }
    },
    /** 查询外键PexceptionSolutiontype数据 */
    getExceptionSolutiontypeList(inspectType) {
      if (inspectType==10 || inspectType==20 || inspectType==30)
        listPexceptionSolutiontype().then(res => {
          this.fkExceptionSolutiontypeList = res.rows;
        });
      else if (inspectType==40 || inspectType==50 || inspectType==60){
        listMexceptionSolutiontype().then(res => {
          this.fkExceptionSolutiontypeList = res.rows;
        });
      }else if (inspectType==70 || inspectType==80){
      }
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
        this.masterNo = currentRow.billNo;
        this.loadChildData();
        this.getExceptionCategorytypeList(currentRow.inspectType);
        this.getExceptionReasontypeList(currentRow.inspectType);
        this.getExceptionSolutiontypeList(currentRow.inspectType)
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
    /**主表外键ProjectId被选择后触发事件*/
    onProjectIdSelection(fkId){
      this.fkProjectList.forEach(item=>{
        if(fkId === item.id){
          this.form.projectId = item.id
        }
      });
    },
    /**主表外键RequestorId被选择后触发事件*/
    onRequestorIdSelection(fkId){
      this.fkUserList.forEach(item=>{
        if(fkId === item.id){
          this.form.requestorId = item.userId
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
    /**主表外键SourceProcessId被选择后触发事件*/
    onSourceProcessIdSelection(fkId){
      this.fkProcessList.forEach(item=>{
        if(fkId === item.id){
          this.form.sourceProcessId = item.id
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
    /**主表外键SourceGroupId被选择后触发事件*/
    onSourceGroupIdSelection(fkId){
      this.fkWorkgroupList.forEach(item=>{
        if(fkId === item.id){
          this.form.sourceGroupId = item.id
        }
      });
    },
    /** 子表外键RequestId被选择后触发事件 **/
    onInspectRequestItemRequestIdSelection(fkId){
      this.fkInspectReDealList.forEach(item=>{
        if(fkId === item.id){
          this.formInspectRequestItem.requestId = item.id
        }
      });
    },
    handleDownload() {
      this.download('qua/inspectReDeal/export', {
        ...this.queryParams
      }, `inspectReDeal_${new Date().getTime()}.xlsx`)
    },
    handleAcceptInspection(row) {
      const ids = row.id || this.ids;
      const billNoz = row.billNo || this.captions;

      getInspectReDeal(ids).then(response => {
        this.form = response.data;
        const _that=this;
        this.$modal.confirm('确定收检 质检请求码为"' + billNoz + '"的数据项吗？').then(function() {
          return acceptInspection(_that.form);
        }).then(response => {
          this.getMasterList();
          this.$modal.msgSuccess(response.msg);
        });
      });
    },
    /** 查询子表请检数据 */
    getInspectRequestItemList() {
      var params = {"requestId":this.masterId};
      listInspectRequestItem(params).then(res => {
        this.inspectRequestItemList = res.rows;
      });
    },
    // 多选框选中数据
    handleInspectRequestItemSelectionChange(selection) {
      this.idsInspectRequestItem = selection.map(item => item.id)
      this.captionsInspectRequestItem = selection.map(item => item.seqNo)
      this.singleInspectRequestItem = selection.length!==1
      this.multipleInspectRequestItem = !selection.length
    },
    /** 子表请检的CSS行样式 */
    rowClassNameInspectRequestItem({ row, rowIndex }) {
      var clsName = ''

      if (this.idsInspectRequestItem.includes(row.id)){
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
    resetInspectRequestItemregisterInspection() {
      this.formInspectRequestItem = {
        id: null,
        requestId: this.masterId,
        seqNo: null,
        status: null,
        materialId:null,
        materialName:null,
        materialSpec:null,
        quantity: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formInspectRequestItem");
    },
    // 子表单重置
    resetInspectRequestItemRequestJugde() {
      this.formInspectRequestItem = {
        id: null,
        requestId: this.masterId,
        seqNo: null,
        status: null,
        materialId:null,
        materialName:null,
        materialSpec:null,
        quantity: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      };
      this.resetForm("formInspectRequestItem");;
    },
    handleRegisterGoodInspection(row) {
      const requestId = this.masterId;
      this.$modal.confirm('确定项次为 ['+ this.masterNo +","+ row.seqNo + ']的检验结果为 合格？').then(function() {
        const id = row.id || this.idsInspectRequestItem;
        getInspectRequestItem(id).then(response => {
          registerGoodInspection(requestId, response.data)
            .then(response => {
              this.$modal.msgSuccess(response.msg);
              this.openInspectRequestItemregisterInspection = false;
              this.getMasterList();
            });
        });
      });
    },
    handleRegisterExceptionalInspection(row) {
      this.resetInspectRequestItemregisterInspection();
      const id = row.id || this.idsInspectRequestItem;
      getInspectRequestItem(id).then(response => {
        this.formInspectRequestItem = response.data;
        this.formInspectRequestItem.requestNo=this.masterNo;
        //this.$set(this.formInspectRequestItem, "quantityAssigning", this.formInspectRequestItem.quantityAvailable);
        this.openInspectRequestItemregisterInspection = true;
        this.title = "检异";
      });
    },
    handleRequestJugde(row) {
      this.resetInspectRequestItemRequestJugde();
      const id = row.id || this.idsInspectRequestItem;
      getInspectRequestItem(id).then(response => {
        this.formInspectRequestItem = response.data;
        this.formInspectRequestItem.requestNo=this.masterNo;
        //this.$set(this.formInspectRequestItem, "quantityAssigning", this.formInspectRequestItem.quantityAvailable);
        this.openInspectRequestItemRequestJugde = true;
        this.title = "请判";
      });
    },
    /** 提交按钮 */
    submitInspectRequestItemregisterExceptionalInspection() {
      this.$refs["formInspectRequestItem"].validate(valid => {
        if (valid) {
          if(this.formInspectRequestItem.quantity>=this.formInspectRequestItem.quantityExceptional && this.formInspectRequestItem.quantityExceptional>0){
            this.formInspectRequestItem.params = {
              "dealType":this.formInspectRequestItem.dealType,
              "quantityExceptional":this.formInspectRequestItem.quantityExceptional,
              "description":this.formInspectRequestItem.description,
              "categoryId":this.formInspectRequestItem.categoryId,
              "reasonTypeId":this.formInspectRequestItem.reasonTypeId,
              "solutionTypeId":this.formInspectRequestItem.solutionTypeId,
              "reasonDesc":this.formInspectRequestItem.reasonDesc,
              "solutionDesc":this.formInspectRequestItem.solutionDesc,
            };
            registerExceptionalInspection(this.masterId, this.formInspectRequestItem)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openInspectRequestItemregisterInspection = false;
                this.getMasterList();
              });
          }else{
            this.$modal.msgError("异常数量不能大于请检数量");
          };
        }
      });
    },
    // 取消子表单按钮
    cancelInspectRequestItemregisterExceptionalInspection() {
      this.openInspectRequestItemregisterInspection = false;
      this.resetInspectRequestItemregisterInspection();
    },
    /** 提交按钮 */
    submitInspectRequestItemRequestJugde() {
      this.$refs["formInspectRequestItem"].validate(valid => {
        if (valid) {
          if(this.formInspectRequestItem.quantity>=this.formInspectRequestItem.quantityExceptional && this.formInspectRequestItem.quantityExceptional>0){
            this.formInspectRequestItem.params = {
              "quantityExceptional":this.formInspectRequestItem.quantityExceptional,
              "description":this.formInspectRequestItem.description,
            };
            requestJugde(this.formInspectRequestItem)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openInspectRequestItemRequestJugde = false;
                this.getMasterList();
              });
          }else{
            this.$modal.msgError("异常数量不能大于请检数量");
          };
        }
      });
    },
    // 取消子表单按钮
    cancelInspectRequestItemRequestJugde() {
      this.openInspectRequestItemRequestJugde = false;
      this.resetInspectRequestItemRequestJugde();
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
