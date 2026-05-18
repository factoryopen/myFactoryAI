<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="customerName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.customerName"
                    placeholder="请输入客户名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="customerFullname" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户全名</strong></span>
                </span>
                <el-input
                    v-model="queryParams.customerFullname"
                    placeholder="请输入客户全名"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="customerCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.customerCode"
                    placeholder="请输入客户编码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="customerType" class="marginBottom5">
                <el-input
                    v-model="queryParams.customerType"
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
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.object_status_basic"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
                  :data="customerPotentialList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="客户名称" align="left" prop="customerName" width="130"/>
            <el-table-column label="客户全名" align="left" prop="customerFullname" width="240"/>
            <el-table-column label="客户编码" align="center" prop="customerCode" width="110"/>
            <el-table-column label="客户类型" align="center" prop="customerType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.customer_type" :value="scope.row.customerType"/>
                </template>
            </el-table-column>
            <el-table-column label="联系人" align="center" prop="contact" width="65"/>
            <el-table-column label="电话" align="center" prop="phone" width="95"/>
            <el-table-column label="地址" align="left" prop="address" width="200"/>
            <el-table-column label="付款方式" align="center" prop="payPatternId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPayPatternList">
                        <span v-if="item.id==scope.row.payPatternId"
                            :key="index"
                            size="mini">{{item.patternName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="发票类型" align="center" prop="invoicePatternId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                            :key="index"
                            size="mini">{{item.patternName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="币别" align="center" prop="currencyId"  width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCurrencyList">
                        <span v-if="item.id==scope.row.currencyId"
                            :key="index"
                            size="mini">{{item.currencyName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="出货方式" align="center" prop="shipmentTypeId"  width="100">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkShipmentTypeList">
                        <span v-if="item.id==scope.row.shipmentTypeId"
                            :key="index"
                            size="mini">{{item.typeCode}}</span>
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
            <el-table-column label="状态" align="center" prop="status" width="55">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_basic" :value="scope.row.status"/>
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
                <el-form-item  prop="customerName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerName" placeholder="请输入客户名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="customerFullname" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户全名</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerFullname" placeholder="请输入客户全名" size="mini" />
                </el-form-item>
                <el-form-item  prop="customerCode" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerCode" placeholder="请输入客户编码" size="mini" />
                </el-form-item>
                <el-input class="inputWidth" v-model="form.customerType" v-show="false"/>
                <el-form-item  prop="contact" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>联系人</strong></span></span>
                     <el-input class="inputWidth" v-model="form.contact" placeholder="请输入联系人" size="mini" />
                </el-form-item>
                <el-form-item  prop="phone" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>电话</strong></span></span>
                     <el-input class="inputWidth" v-model="form.phone" placeholder="请输入电话" size="mini" />
                </el-form-item>
                <el-form-item  prop="address" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>地址</strong></span></span>
                     <el-input class="inputWidth" v-model="form.address" placeholder="请输入地址" size="mini" />
                </el-form-item>
                <el-form-item prop="payPatternId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>付款方式</strong></span></span>
                    <el-select class="inputWidth" v-model="form.payPatternId" placeholder="请选择付款方式"
                               @change="onPayPatternIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPayPatternList"
                          :key="index"
                          :label="fkrow.patternName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="invoicePatternId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>发票类型</strong></span></span>
                    <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择发票类型"
                               @change="onInvoicePatternIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkInvoicePatternList"
                          :key="index"
                          :label="fkrow.patternName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="currencyId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>币别</strong></span></span>
                    <el-select class="inputWidth" v-model="form.currencyId" placeholder="请选择币别"
                               @change="onCurrencyIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkCurrencyList"
                          :key="index"
                          :label="fkrow.currencyName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="shipmentTypeId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>出货方式</strong></span></span>
                    <el-select class="inputWidth" v-model="form.shipmentTypeId" placeholder="请选择出货方式"
                               @change="onShipmentTypeIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkShipmentTypeList"
                          :key="index"
                          :label="fkrow.typeCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
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
import { listCustomerPotential, getCustomerPotential, delCustomerPotential, addCustomerPotential, updateCustomerPotential } from "@/api/cha/customerPotential";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listCurrency} from "@/api/bas/currency";
import { listInvoicePattern} from "@/api/bas/invoicePattern";
import { listPayPattern} from "@/api/bas/payPattern";
import { listShipmentType} from "@/api/bas/shipmentType";

export default {
    name: "CustomerPotential",
    dicts: ['customer_type', 'object_status_basic'],
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
        // 潜客备案表格数据
        customerPotentialList: [],
        fkSalesList: [],
        fkUserList: [],
        fkCurrencyList: [],
        fkInvoicePatternList: [],
        fkPayPatternList: [],
        fkShipmentTypeList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          customerName: null,
          customerFullname: null,
          customerCode: null,
          customerType: null,
          contact: null,
          phone: null,
          address: null,
          payPatternId: null,
          invoicePatternId: null,
          currencyId: null,
          shipmentTypeId: null,
          salesId: null,
          status: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            customerType: [
                { required: true, message: "客户类型不能为空", trigger: "change" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Sales数据 */
          this.getSalesList();
          /** 查询外键User数据 */
          this.getUserList();
          /** 查询外键Currency数据 */
          this.getCurrencyList();
          /** 查询外键InvoicePattern数据 */
          this.getInvoicePatternList();
          /** 查询外键PayPattern数据 */
          this.getPayPatternList();
          /** 查询外键ShipmentType数据 */
          this.getShipmentTypeList();
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
          /** 查询外键Currency数据 */
      getCurrencyList() {
        listCurrency().then(res => {
          this.fkCurrencyList = res.rows;
        });
      },
          /** 查询外键InvoicePattern数据 */
      getInvoicePatternList() {
        listInvoicePattern().then(res => {
          this.fkInvoicePatternList = res.rows;
        });
      },
          /** 查询外键PayPattern数据 */
      getPayPatternList() {
        listPayPattern().then(res => {
          this.fkPayPatternList = res.rows;
        });
      },
          /** 查询外键ShipmentType数据 */
      getShipmentTypeList() {
        listShipmentType().then(res => {
          this.fkShipmentTypeList = res.rows;
        });
      },

/**主表外键PayPatternId被选择后触发事件*/
        onPayPatternIdSelection(fkId){
            this.fkPayPatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.payPatternId = item.id
                }
            });
        },
/**主表外键InvoicePatternId被选择后触发事件*/
        onInvoicePatternIdSelection(fkId){
            this.fkInvoicePatternList.forEach(item=>{
                if(fkId === item.id){
                    this.form.invoicePatternId = item.id
                }
            });
        },
/**主表外键CurrencyId被选择后触发事件*/
        onCurrencyIdSelection(fkId){
            this.fkCurrencyList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currencyId = item.id
                }
            });
        },
/**主表外键ShipmentTypeId被选择后触发事件*/
        onShipmentTypeIdSelection(fkId){
            this.fkShipmentTypeList.forEach(item=>{
                if(fkId === item.id){
                    this.form.shipmentTypeId = item.id
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

        /** 查询潜客备案列表 */
        getList() {
            this.loading = true;
        listCustomerPotential(this.queryParams).then(response => {
          this.customerPotentialList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              customerName: null,
              customerFullname: null,
              customerCode: null,
              customerType: null,
              contact: null,
              phone: null,
              address: null,
              payPatternId: null,
              invoicePatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              salesId: null,
              status: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              customerName: null,
              customerFullname: null,
              customerCode: null,
              customerType: null,
              contact: null,
              phone: null,
              address: null,
              payPatternId: null,
              invoicePatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              salesId: null,
              status: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              customerName: null,
              customerFullname: null,
              customerCode: null,
              customerType: null,
              contact: null,
              phone: null,
              address: null,
              payPatternId: null,
              invoicePatternId: null,
              currencyId: null,
              shipmentTypeId: null,
              salesId: null,
              status: null,
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
            this.captions = selection.map(item => item.customerName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增潜客备案";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getCustomerPotential(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改潜客备案";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const customerNamez = row.customerName || this.captions;
            this.$modal.confirm('确认删除客户名称为"' + customerNamez + '"的数据项？').then(function() {
              return delCustomerPotential(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('cha/customerPotential/export', {
             ...this.queryParams
             }, `customerPotential_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateCustomerPotential(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                } else {
                  addCustomerPotential(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
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
