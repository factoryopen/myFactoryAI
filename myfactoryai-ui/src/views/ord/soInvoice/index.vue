<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item prop="customerId" class="marginBottom5" >
        <span slot="label">
            <span class="fontSize12"><strong>客户</strong></span>
        </span>
        <el-select class="searchInput" v-model="queryParams.customerName" filterable placeholder="请选择客户" size="mini">
          <el-option
            v-for="(fkrow, index) in fkCustomerList"
            :key="index"
            :label="fkrow.customerName+'['+fkrow.customerCode+']'"
            :value="fkrow.customerName"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contractNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>合同号</strong></span>
                </span>
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="soId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>销售订单</strong></span>
            </span>
        <el-select class="searchInput" v-model="queryParams.soId" filterable placeholder="请选择销售订单" size="mini">
          <el-option
            v-for="(fkrow, index) in fkSoList"
            :key="index"
            :label="fkrow.billNo"
            :value="fkrow.id"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
          <el-option
            v-for="dict in dict.type.sales_status_so"
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
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
    </el-row>

    <el-table ref="masterTable" v-loading="loading" border
              height="650px"
              :data="soFinanceList"
              :highlight-current-row="true"
              :row-class-name="rowClassName"
              :cell-style="cellStyle"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column label="客户名称" align="left" prop="customerName" width="90"/>
      <el-table-column label="合同编号" align="left" prop="contractNo" width="140"/>
      <el-table-column label="销售订单" align="center" prop="soId" width="115">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkSoList">
            <span v-if="item.id==scope.row.soId" :key="index" size="mini">{{ item.billNo }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="项次" align="center" prop="seqNo" width="50"/>
      <el-table-column label="状态" align="center" prop="status" width="65">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sales_status_so" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="产品编码" align="left" prop="productCode" width="150"/>
      <el-table-column label="产品名称" align="left" prop="productName" width="130"/>
      <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
      <el-table-column label="产品规格" align="left" prop="productSpec" width="110"/>
      <el-table-column label="客户料号" align="left" prop="customerProductNo" width="110"/>
      <el-table-column label="单位" align="center" prop="unitId" width="50">
        <template slot-scope="scope">
          <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{ item.unitName }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单量" align="right" prop="quantityOrder" style="color:sandybrown" width="65"/>
      <el-table-column label="单价" align="right" prop="price" width="70"/>
      <el-table-column label="未税金额" align="right" prop="amount" width="75"/>
      <el-table-column label="完发量" align="right" prop="quantityDelivered" width="65"/>
      <el-table-column label="开票量" align="right" prop="quantityInvoiced" width="65"/>
      <el-table-column label="开票金额" align="right" prop="amountInvoiced" width="75"/>
      <el-table-column label="备注" align="left" prop="remark"/>
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-folder-delete"
            @click="handleInvoice(scope.row)"
          >开票
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getMasterList"/>
    <!-- 创建master.openInvoice对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="openInvoice" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rulesInvoice" label-width="120px" :inline-message="true">
        <el-form-item prop="contractNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>合同编号</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.contractNo" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="customerName" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>客户名称</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.customerName" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="soId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>销售订单</strong></span>
                    </span>
          <el-select class="inputWidth" v-model="form.soId" placeholder="请选择销售订单"
                     @change="onSoIdSelection" size="mini" disabled="true">
            <el-option
              v-for="(fkrow, index) in fkSoList"
              :key="index"
              :label="fkrow.billNo"
              :value="fkrow.id"
              size="mini"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="seqNo" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>项次</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.seqNo" placeholder="请输入订单项" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="productId" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>产品编码</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码"
                     @change="onProductIdSelection" size="mini" disabled="true">
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
        <el-form-item prop="price" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>单价</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.price" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityOrder" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>订单数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityOrder" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityInvoiced" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>已开票数</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityInvoiced" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="amountInvoiced" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>已票金额</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.amountInvoiced" size="mini" disabled="true"/>
        </el-form-item>
        <hr>
        <el-form-item class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>未开票数</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityOrder-form.quantityInvoiced" size="mini" disabled="true"/>
        </el-form-item>
        <el-form-item prop="quantityInvoicing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>应开票数量</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.quantityInvoicing" @change="onQuantityInvoicingChang" placeholder="请输入应开票数量" size="mini"/>
        </el-form-item>
        <el-form-item prop="amountInvoicing" class="marginBottom0">
          <span slot="label">
              <span class="fontSize12"><strong>应票金额</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.amountInvoicing" size="mini" disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitInvoice">确 定</el-button>
        <el-button @click="cancelInvoice">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listSoFinance, getSoFinance, registerInvoice} from "@/api/ord/soFinance";
import {listUser} from "@/api/system/user";
import {listUnit} from "@/api/bas/unit";
import {listSo} from "@/api/ord/so";
import {listSoItem} from "@/api/ord/soItem";
import {listProject} from "@/api/ord/project";
import {listProductBasis} from "@/api/eng/productBasis";
import {listSoTrace} from "@/api/ord/soTrace";
import {listCustomer} from "@/api/cha/customer";

export default {
  name: "DeliveryInvoice",
  dicts: ['sales_status_so','bill_priority'],
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
      masterTable: [],
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 订单明细表格数据
      soFinanceList: [],
      fkCustomerList: [],
      fkUserList: [],
      fkUnitList: [],
      fkSoList: [],
      fkSoItemList: [],
      fkProjectList: [],
      fkProductBasisList: [],
      fkDeliveryDealList: [],
      fkSoTraceList: [],
      //主表当前行的ID
      masterId: "",
      //当前tab名
      activeTabName: "",
      // 弹出层标题
      title: "",
      /*
       * 3类Master对话框的显示、表单、校验 *
       */
      open: false,
      form: {
        id: null,
        contractNo:null,
        customerName:null,
        soId:null,
        seqNo: null,
        status: null,
        productId:null,
        quantityOrder: 0,
        price: 0,
        amount: 0,
        quantityDelivered: 0,
        quantityInvoiced: 0,
        quantityInvoicing: 0,
        amountInvoicing: 0,
        remark: null,
      },
      rules: {},
      openInvoice: false,
      rulesInvoice: {
        quantityActual: [
          {required: true, message: "自制数量不能为空", trigger: "blur"}
        ],
        promiseDay: [
          {required: true, message: "承诺交期不能为空", trigger: "blur"}
        ],
      },
      // 主查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        soId: null,
        seqNo: null,
        status: null,
        productId: null,
        productName: null,
        productSpec: null,
        unitId: null,
        priority: null,
        needDay: null,
        promiseDay: null,
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
    /** 查询外键So数据 */
    this.getSoList();
    /** 查询外键SoItem数据 */
    this.getSoItemList();
    /** 查询外键Project数据 */
    this.getProjectList();
    /** 查询外键ProductBasis数据 */
    this.getProductBasisList();
    /** 查询外键DeliveryDeal数据 */
    this.getDeliveryDealList();
    /** 查询外键SoTrace数据 */
    this.getSoTraceList();
  },
  mounted: function () {
  },
  methods: {
    /** 查询主表 */
    getMasterList() {
      this.loading = true;
      listSoFinance(this.queryParams).then(response => {
        this.soFinanceList = response.rows;
        this.total = response.total;
        if (this.soFinanceList && this.soFinanceList.length>0) {
          this.$refs.masterTable.setCurrentRow(response.rows[0], true);
          this.masterId = response.rows[0].id;
        }else{
          this.$refs.masterTable.setCurrentRow(null, true);
          this.masterId = null;
        }

        this.loading = false;
      });
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
    /** 查询外键So数据 */
    getSoList() {
      listSo().then(res => {
        this.fkSoList = res.rows;
      });
    },
    /** 查询外键SoItem数据 */
    getSoItemList() {
      listSoItem().then(res => {
        this.fkSoItemList = res.rows;
      });
    },
    /** 查询外键Project数据 */
    getProjectList() {
      listProject().then(res => {
        this.fkProjectList = res.rows;
      });
    },
    /** 查询外键ProductBasis数据 */
    getProductBasisList() {
      listProductBasis().then(res => {
        this.fkProductBasisList = res.rows;
      });
    },
    /** 查询外键DeliveryDeal数据 */
    getDeliveryDealList() {
      listDeliveryDealPublished().then(res => {
        this.fkDeliveryDealList = res.rows;
      });
    },
    /** 查询外键SoTrace数据 */
    getSoTraceList() {
      listSoTrace().then(res => {
        this.fkSoTraceList = res.rows;
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 主表的当前行切换 */
    handleCurrentChange(currentRow) {
      if (currentRow){
        this.masterId = currentRow.id;
      }
    },
    /** 主表的CSS行样式 */
    rowClassName({row, rowIndex}) {
      var className = ''

      if (this.ids.includes(row.id)) {
        className = 'selected-row';
      } else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }

      return className;
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      var className = "fontSize:12px;padding:1px 0px;";

      if (columnIndex==0 || columnIndex==1 || columnIndex==7) {
        className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
      }
      else if (columnIndex==11 || columnIndex==13) {
        className = "fontSize:12px; color:sandybrown; padding:1px 0px;";
      }
      else if (columnIndex==12) {
        className = "fontSize:12px; color:rosybrown; padding:1px 0px;";
      }
      else if (columnIndex==14 || columnIndex==15) {
        className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
      }
      else if (columnIndex==16) {
        className = "fontSize:12px; color:lawngreen; padding:1px 0px;";
      }

      return className;
    },
    /**主表外键SoId被选择后触发事件*/
    onSoIdSelection(fkId) {
      this.fkSoList.forEach(item => {
        if (fkId === item.id) {
          this.form.soId = item.id
        }
      });
    },
    /**主表外键ProductId被选择后触发事件*/
    onProductIdSelection(fkId) {
      this.fkProductBasisList.forEach(item => {
        if (fkId === item.id) {
          this.form.productId = item.id
          this.form.productName = item.materialName
          this.form.productSpec = item.materialSpec
          this.form.unitId = item.unitId
        }
      });
    },
    /**quantityInvoicing被修改后触发事件*/
    onQuantityInvoicingChang() {
      this.form.amountInvoicing = this.form.quantityInvoicing * this.form.price;
    },
    /** 重设主表的投产对话框数据 */
    resetInvoice() {
      this.form = {
        id: null,
        contractNo:null,
        customerName:null,
        soId:null,
        seqNo: null,
        status: null,
        productId:null,
        quantityOrder: 0,
        price: 0,
        amount: 0,
        quantityDelivered: 0,
        quantityInvoiced: 0,
        quantityInvoicing: 0,
        amountInvoicing: 0,
        remark: null,
      };
      this.resetForm("form");
    },
    handleExport() {
      this.download('ord/soFinance/export', {
        ...this.queryParams
      }, `soFinance${new Date().getTime()}.xlsx`)
    },
    handleInvoice(row) {
      this.resetInvoice();

      const id = row.id || this.ids;
      getSoFinance(id).then(response => {
        this.form = response.data;
        this.$set(this.form, "quantityInvoicing",this.form.quantityOrder-this.form.quantityInvoiced);
        this.$set(this.form, "amountInvoicing",this.form.price*(this.form.quantityOrder-this.form.quantityInvoiced));
        this.openInvoice = true;
        this.title = "开票登记";
      });
    },
    /** 提交按钮 */
    submitInvoice() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.quantityInvoicing <= this.form.quantityOrder-this.form.quantityInvoiced && this.form.quantityInvoicing > 0) {
            this.form.params = {"quantityInvoicing": this.form.quantityInvoicing, "amountInvoicing": this.form.amountInvoicing};

            registerInvoice(this.form)
              .then(response => {
                this.$modal.msgSuccess(response.msg);
                this.openInvoice = false;
                this.getMasterList();
              })
              .catch(error => {
                this.$modal.msgError(error.msg);
              });
          } else {
            this.$modal.msgWarning("[应开票数量] 不能大于 [可开票数量], 且不能小于零");
          }
        }
      });
    },
    // 取消按钮
    cancelInvoice() {
      this.openInvoice = false;
      this.resetInvoice();
    },
  }
};
</script>

<style>
.marginBottom5 {
  margin-bottom: 5px !important
}

.marginBottom0 {
  margin-bottom: 0;
}

.fontSize12 {
  font-size: 12px
}

.inputWidth {
  width: 60% !important
}

.searchInput {
  width: 180px !important
}

.el-input__inner {
  width: 100%
}

.dialogConfig .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: deepskyblue !important;
  color: honeydew;
}

.el-table__body tr.current-row > td {
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
  color: sandybrown;
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
