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
                        v-for="dict in dict.type.sup_purchasing_type"
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
                    type="success"
                    icon="el-icon-check"
                    size="mini"
                    :disabled="multiple"
                    @click="handleAuditPass"
                >过审</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-close"
                    size="mini"
                    :disabled="single"
                    @click="handleAuditReject"
                >驳审</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-refresh-right"
                    size="mini"
                    :disabled="multiple"
                    @click="handleToPlan"
                >转计划</el-button>
            </el-col>
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
                  :data="purchaseRequestAuditList"
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
                    <dict-tag :options="dict.type.sup_purchasing_type" :value="scope.row.purchasingType"/>
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
                </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>


        <el-tabs>
            <el-tab-pane label="采购申请明细">
                <el-row :gutter="10" class="mb8">
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
                    <el-table-column label="订单数量" align="right" prop="quantity" width="120"/>
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
                    <el-table-column label="源单ID" align="right" prop="requestBillId" width="70"/>
                    <el-table-column label="源单编号" align="left" prop="requestBillNo" width="130"/>
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
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listPurchaseRequestAudit} from "@/api/sup/purchaseRequestAudit";
import { auditPass,auditReject,toPlan } from "@/api/sup/purchaseRequestAudit";
import { listPurchaseRequestItem } from "@/api/sup/purchaseRequestItem";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listPurchaseRequest} from "@/api/sup/purchaseRequest";

export default {
    name: "PurchaseRequestAudit",
    dicts: ['purchasing_status_pr', 'sup_purchasing_type', 'bill_priority', 'eng_material_consumingtype', 'sys_yes_no'],
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
            // 请购审核表格数据
            purchaseRequestAuditList: [],
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
                prId: [
                   { required: true, message: "采购申请不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
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
        /** 查询外键PurchaseRequest数据 */
        this.getPurchaseRequestList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPurchaseRequestAudit(this.queryParams).then(response => {
              this.purchaseRequestAuditList = response.rows;
              this.total = response.total;
              if (this.purchaseRequestAuditList && this.purchaseRequestAuditList.length>0) {
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
       handleAuditPass(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定过审 采购申请号为"' + billNoz + '"的数据项吗？').then(function() {
           return auditPass(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("过审成功");
         }).catch(() => {});
       },
       handleAuditReject(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定驳审 采购申请号为"' + billNoz + '"的数据项吗？').then(function() {
           return auditReject(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("驳审成功");
         }).catch(() => {});
       },
        handleToPlan(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确定转计划 采购申请号为"' + billNoz + '"的数据项吗？').then(function() {
              return toPlan(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        handleDownload() {
            this.download('sup/purchaseRequestAudit/export', {
              ...this.queryParams
            }, `purchaseRequestAudit_${new Date().getTime()}.xlsx`)
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
