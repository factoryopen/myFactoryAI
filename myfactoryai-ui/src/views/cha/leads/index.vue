<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
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
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.cha_status_lead"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
                        v-for="dict in dict.type.cha_lead_sourcetype"
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
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="leadsList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="线索编码" align="center" prop="billNo" width="115"/>
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
            <el-table-column label="商机描述" align="left" prop="description" width="300"/>
            <el-table-column label="联系人" align="center" prop="contact" width="65"/>
            <el-table-column label="电话" align="center" prop="phone" width="95"/>
            <el-table-column label="来源类型" align="center" prop="sourceType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.crm_chance_sourcetype" :value="scope.row.sourceType"/>
                </template>
            </el-table-column>
            <el-table-column label="微信" align="left" prop="wechat" width="110"/>
            <el-table-column label="邮箱" align="right" prop="email" width="140"/>
            <el-table-column label="地址" align="left" prop="address" width="200"/>
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
                    <span slot="label"><span class="fontSize12"><strong>线索编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入线索编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="status" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>状态</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.status" placeholder="请选择状态" size="mini" >
                      <el-option
                          v-for="dict in dict.type.cha_status_lead"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="customerId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>目标客户</strong></span></span>
                    <el-select class="inputWidth" v-model="form.customerId" placeholder="请选择目标客户"
                               @change="onCustomerIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkCustomerList"
                          :key="index"
                          :label="fkrow.customerName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="description" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>商机描述</strong></span></span>
                     <el-input class="inputWidth" v-model="form.description" placeholder="请输入商机描述" size="mini" />
                </el-form-item>
                <el-form-item  prop="contact" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>联系人</strong></span></span>
                     <el-input class="inputWidth" v-model="form.contact" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="phone" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>电话</strong></span></span>
                     <el-input class="inputWidth" v-model="form.phone" placeholder="请输入电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="sourceType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>来源类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.sourceType" placeholder="请选择来源类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.cha_lead_sourcetype"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="wechat" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>微信</strong></span></span>
                     <el-input class="inputWidth" v-model="form.wechat" placeholder="请输入微信" size="mini" />
                </el-form-item>
                <el-form-item  prop="email" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>邮箱</strong></span></span>
                     <el-input class="inputWidth" v-model="form.email" placeholder="请输入邮箱" size="mini" />
                </el-form-item>
                <el-form-item  prop="address" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>地址</strong></span></span>
                     <el-input class="inputWidth" v-model="form.address" placeholder="请输入地址" size="mini" />
                </el-form-item>
                <el-form-item prop="salesId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>销售员</strong></span></span>
                    <el-select class="inputWidth" v-model="form.salesId" placeholder="请选择销售员" size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUserList"
                            :key="index"
                            :label="fkrow.nickName"
                            :value="fkrow.userId"
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
import {getNextBillno, updateBillSeq } from "@/api/cha/leads";
import { listLeads, getLeads, delLeads, addLeads, updateLeads } from "@/api/cha/leads";
import { listCustomer} from "@/api/cha/customer";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";

export default {
    name: "Leads",
    dicts: ['cha_status_lead', 'cha_lead_sourcetype'],
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
        // 线索备案表格数据
        leadsList: [],
        fkCustomerList: [],
        fkSalesList: [],
        fkUserList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          customerId: null,
          description: null,
          contact: null,
          phone: null,
          sourceType: null,
          wechat: null,
          email: null,
          address: null,
          salesId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
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
      };
    },
    created() {
      this.getList();
          /** 查询外键Customer数据 */
          this.getCustomerList();
          /** 查询外键Sales数据 */
          this.getSalesList();
          /** 查询外键User数据 */
          this.getUserList();
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

/**主表外键CustomerId被选择后触发事件*/
        onCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                    this.form.customerId = item.id
                }
            });
        },
/**主表外键SalesId被选择后触发事件*/
        onSalesIdSelection(fkId){
            this.fkSalesList.forEach(item=>{
                if(fkId === item.id){
                    this.form.salesId = item.id
                }
            });
        },

        /** 查询线索备案列表 */
        getList() {
            this.loading = true;
        listLeads(this.queryParams).then(response => {
          this.leadsList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
        reset (){
            this.form = {
              id: null,
              billNo: null,
              status: null,
              customerId: null,
              description: null,
              contact: null,
              phone: null,
              sourceType: null,
              wechat: null,
              email: null,
              address: null,
              salesId: null,
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
            this.title = "新增线索备案";
            getNextBillno("110").then(res => {
                this.form.billNo = res
            });
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getLeads(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改线索备案";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除线索编码为"' + billNoz + '"的数据项？').then(function() {
              return delLeads(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('cha/leads/export', {
             ...this.queryParams
             }, `leads_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateLeads(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                } else {
                  addLeads(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                  updateBillSeq("110").then(res => {});
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
