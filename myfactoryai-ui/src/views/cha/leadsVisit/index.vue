<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>线索编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入线索编码"
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
            <el-form-item prop="contact" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>联系人</strong></span>
                </span>
                <el-input
                    v-model="queryParams.contact"
                    placeholder="请输入联系人"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="description" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>商机描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.description"
                    placeholder="请输入商机描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="phone" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>电话</strong></span>
                </span>
                <el-input
                    v-model="queryParams.phone"
                    placeholder="请输入电话"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="sourceType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>来源类型</strong></span>
                </span>
                <el-select v-model="queryParams.sourceType" placeholder="请选择来源类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.crm_chance_sourcetype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="wechat" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>微信</strong></span>
                </span>
                <el-input
                    v-model="queryParams.wechat"
                    placeholder="请输入微信"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="email" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>邮箱</strong></span>
                </span>
                <el-input
                    v-model="queryParams.email"
                    placeholder="请输入邮箱"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="address" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>地址</strong></span>
                </span>
                <el-input
                    v-model="queryParams.address"
                    placeholder="请输入地址"
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
                  height="220px"
                  :data="leadsVisitList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="线索编码" align="center" prop="billNo"  width="115"/>
              <el-table-column label="状态" align="center" prop="status" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.cha_status_lead" :value="scope.row.status"/>
                </template>
            </el-table-column>
               <el-table-column label="目标客户" align="left" prop="customerId"  width="180">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="联系人" align="center" prop="contact"  width="65"/>
                <el-table-column label="商机描述" align="left" prop="description"  width="300"/>
                <el-table-column label="电话" align="center" prop="phone"  width="110"/>
              <el-table-column label="来源类型" align="center" prop="sourceType" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.crm_chance_sourcetype" :value="scope.row.sourceType"/>
                </template>
            </el-table-column>
                <el-table-column label="微信" align="left" prop="wechat"  width="110"/>
                <el-table-column label="邮箱" align="right" prop="email"  width="130"/>
                <el-table-column label="地址" align="left" prop="address"  width="200"/>
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


        <el-tabs>
            <el-tab-pane label="线索拜访">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddChaLeadsVisiting"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleLeadsVisiting"
                            @click="handleUpdateChaLeadsVisiting"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleLeadsVisiting"
                            @click="handleDeleteChaLeadsVisiting"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="leadsVisiting" border
                        :data="leadsVisitingList"
                        highlight-current-row
                        :row-class-name="rowClassNameLeadsVisiting"
                        @selection-change="handleLeadsVisitingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="拜访日期" align="center" prop="visitDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.visitDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="接待级别" align="center" prop="talkLevel" width="130">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.cha_lead_talklevel" :value="scope.row.talkLevel"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="拜访记录" align="left" prop="description" width="968"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateChaLeadsVisiting(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteChaLeadsVisiting(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openLeadsVisiting对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openLeadsVisiting" width="500px" append-to-body>
            <el-form ref="formLeadsVisiting" :model="formLeadsVisiting" :rules="rulesLeadsVisiting" label-width="140px" :inline-message="true">
                    <el-form-item prop="leadId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>线索</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formLeadsVisiting.leadId" placeholder="请输入线索" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formLeadsVisiting.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="visitDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>拜访日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formLeadsVisiting.visitDay"
                               class="inputWidth"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择拜访日期">
                      </el-date-picker>
                  </el-form-item>
                   <el-form-item  prop="talkLevel" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>接待级别</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formLeadsVisiting.talkLevel" placeholder="请选择接待级别" size="mini" >
                          <el-option
                              v-for="dict in dict.type.cha_lead_talklevel"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="dict.value"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>拜访记录</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formLeadsVisiting.description" placeholder="请输入拜访记录" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formLeadsVisiting.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitLeadsVisiting">确 定</el-button>
                <el-button @click="cancelLeadsVisiting">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listLeadsVisit, getLeadsVisit, delLeadsVisit, addLeadsVisit, updateLeadsVisit } from "@/api/cha/leadsVisit";
import {getNextBillno, updateBillSeq } from "@/api/cha/leadsVisit";
import { listLeadsVisiting, getLeadsVisiting, delLeadsVisiting, addLeadsVisiting, updateLeadsVisiting } from "@/api/cha/leadsVisiting";
import { listCustomer} from "@/api/cha/customer";
import { listLeads} from "@/api/cha/leads";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";

export default {
    name: "LeadsVisit",
    dicts: ['cha_status_lead', 'crm_chance_sourcetype', 'cha_lead_talklevel'],
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
            // 客访登记表格数据
            leadsVisitList: [],
            fkCustomerList: [],
            fkLeadsList: [],
            fkSalesList: [],
            fkUserList: [],
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
                    { required: true, message: "线索编码不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                customerId: [
                    { required: true, message: "目标客户ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              billNo: null,
              status: null,
              customerId: null,
              contact: null,
              description: null,
              phone: null,
              sourceType: null,
              wechat: null,
              email: null,
              address: null,
              salesId: null,
            },
            //子表信息
            leadsVisitingList:[],
            // 选中数组
            idsLeadsVisiting: [],
            captionsLeadsVisiting: [],
            // 非单个禁用
            singleLeadsVisiting: true,
            // 非多个禁用
            multipleLeadsVisiting: true,
            // 子表选中数据
            checkedLeadsVisiting: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openLeadsVisiting: false,
            formLeadsVisiting: {},
            rulesLeadsVisiting: {
                leadId: [
                   { required: true, message: "线索不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Customer数据 */
        this.getCustomerList();
        /** 查询外键Leads数据 */
        this.getLeadsList();
        /** 查询外键Sales数据 */
        this.getSalesList();
        /** 查询外键User数据 */
        this.getUserList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listLeadsVisit(this.queryParams).then(response => {
              this.leadsVisitList = response.rows;
              this.total = response.total;
              if (this.leadsVisitList && this.leadsVisitList.length>0) {
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
                this.getLeadsVisitingList();
            }else {
                this.leadsVisitingList = null;
            }
        },
        /** 查询外键Customer数据 */
        getCustomerList() {
            listCustomer().then(res => {
                this.fkCustomerList = res.rows;
            });
        },
        /** 查询外键Leads数据 */
        getLeadsList() {
            listLeads().then(res => {
                this.fkLeadsList = res.rows;
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
        /**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
                }
            });
        },
        /** 子表外键LeadId被选择后触发事件 **/
        onLeadsVisitingLeadIdSelection(fkId){
            this.fkLeadsList.forEach(item=>{
                if(fkId === item.id){
                   this.formLeadsVisiting.leadId = item.id
                }
            });
        },

        handleExport() {
            this.download('cha/leadsVisit/export', {
              ...this.queryParams
            }, `leadsVisit_${new Date().getTime()}.xlsx`)
        },

        /** 查询子表线索拜访数据 */
        getLeadsVisitingList() {
            var params = {"leadId":this.masterId};
            listLeadsVisiting(params).then(res => {
                this.leadsVisitingList = res.rows;
            });
        },
        // 多选框选中数据
        handleLeadsVisitingSelectionChange(selection) {
            this.idsLeadsVisiting = selection.map(item => item.id)
            this.captionsLeadsVisiting = selection.map(item => item.seqNo)
            this.singleLeadsVisiting = selection.length!==1
            this.multipleLeadsVisiting = !selection.length
        },
        /** 子表线索拜访的CSS行样式 */
        rowClassNameLeadsVisiting({ row, rowIndex }) {
            var clsName = ''

            if (this.idsLeadsVisiting.includes(row.id)){
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
        resetLeadsVisiting() {
            this.formLeadsVisiting = {
                id: null,
                leadId: this.masterId,
                seqNo: null,
                visitDay: null,
                talkLevel: null,
                description: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formLeadsVisiting");
            // 按关键字段值来初始化子表单数据
            this.onLeadsVisitingLeadIdSelection(this.masterId);
        },
        handleAddChaLeadsVisiting() {
          this.resetLeadsVisiting();
          this.openLeadsVisiting = true;
          this.title = "新增线索拜访";
        },
        handleUpdateChaLeadsVisiting(row) {
          this.resetLeadsVisiting();
          const id = row.id || this.idsLeadsVisiting
          getLeadsVisiting(id).then(response => {
              this.formLeadsVisiting = response.data;
              this.openLeadsVisiting = true;
              this.title = "修改线索拜访";
          });
        },
        handleDeleteChaLeadsVisiting(row) {
          const ids = row.id || this.idsLeadsVisiting;
          const seqNoz = row.seqNo || this.captionsLeadsVisiting;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delLeadsVisiting(ids);
          }).then(() => {
            this.getLeadsVisitingList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitLeadsVisiting() {
            this.$refs["formLeadsVisiting"].validate(valid => {
                if (valid) {
                  if(this.formLeadsVisiting.id==this.formLeadsVisiting.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formLeadsVisiting.id != null) {
                        updateLeadsVisiting(this.formLeadsVisiting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openLeadsVisiting = false;
                            this.getLeadsVisitingList();
                        });
                    } else {
                        addLeadsVisiting(this.formLeadsVisiting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openLeadsVisiting = false;
                            this.getLeadsVisitingList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelLeadsVisiting() {
            this.openLeadsVisiting = false;
            this.resetLeadsVisiting();
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
