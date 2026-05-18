<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>订单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入订单号"
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
            <el-form-item prop="customerId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>客户</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.customerId" placeholder="请选择客户" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkCustomerList"
                    :key="index"
                    :label="fkrow.customerName"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="salesId" class="marginBottom5" >
                        <span slot="label">
                            <span class="fontSize12"><strong>销售员</strong></span>
                        </span>
              <el-select class="inputWidth" v-model="queryParams.salesId" placeholder="请选择销售员" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkSalesList"
                  :key="index"
                  :label="fkrow.userId"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="productId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.productId" placeholder="请选择产品" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="productName" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品名称</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.productName" placeholder="请选择产品名称" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialName"
                    :value="fkrow.materialName"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="productSpec" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.productSpec" placeholder="请选择产品规格" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialSpec"
                    :value="fkrow.materialSpec"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="invoicePatternId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>开票方式</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.invoicePatternId" placeholder="请选择开票方式" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkInvoicePatternList"
                    :key="index"
                    :label="fkrow.patternName"
                    :value="fkrow.id"
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
            <el-form-item prop="orderDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>下单日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.orderDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择下单日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-plus" size="mini" @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-delete" size="mini"  :disabled="multiple" @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-paperclip" size="mini" :disabled="multiple" @click="handleEnable"
                >启用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-s-promotion" size="mini" :disabled="multiple" @click="handleDelivery"
                >发货</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini" :disabled="multiple" @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="soQuicklyList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="订单号" align="center" prop="billNo" width="140"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_processing" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="客户" align="left" prop="customerId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品" align="left" prop="productId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMaterialInfoList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId" width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="单价" align="right" prop="price" width="90"/>
            <el-table-column label="数量" align="right" prop="quantity" width="90"/>
            <el-table-column label="开票方式" align="left" prop="invoicePatternId"  width="90">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkInvoicePatternList">
                        <span v-if="item.id==scope.row.invoicePatternId"
                            :key="index"
                            size="mini">{{item.patternName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="合同号" align="left" prop="contractNo" width="140"/>
            <el-table-column label="下单日期" align="center" prop="orderDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="销售员" align="center" prop="salesId"  width="90">
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
                    <span slot="label"><span class="fontSize12"><strong>订单号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入订单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="customerId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>客户</strong></span></span>
                    <el-select class="inputWidth" v-model="form.customerId" filterable placeholder="请选择客户"
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
                <el-form-item prop="productId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>产品</strong></span></span>
                    <el-select class="inputWidth" v-model="form.productId" filterable placeholder="请选择产品"
                               @change="onProductIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMaterialInfoList"
                          :key="index"
                          :label="fkrow.materialCode+' ['+fkrow.materialName+']'"
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
                        v-for="(fkrow, index) in fkMaterialInfoList"
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
                        v-for="(fkrow, index) in fkMaterialInfoList"
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
                    <span slot="label"><span class="fontSize12"><strong>数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入数量" size="mini" />
                </el-form-item>
                <el-form-item prop="price" class="marginBottom0" >
                  <span slot="label"><span class="fontSize12"><strong>单价</strong></span></span>
                  <el-input class="inputWidth" v-model="form.price" placeholder="请输入单价" size="mini" />
                </el-form-item>
                <el-form-item prop="invoicePatternId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>开票方式</strong></span></span>
                    <el-select class="inputWidth" v-model="form.invoicePatternId" placeholder="请选择开票方式"
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
                <el-form-item  prop="contractNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>合同号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.contractNo" placeholder="请输入合同号" size="mini" />
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
import {getNextBillno, updateBillSeq } from "@/api/ord/soQuickly";
import { listSoQuickly, getSoQuickly, delSoQuickly, addSoQuickly, updateSoQuickly } from "@/api/ord/soQuickly";
import { enable,deliveryQuickly } from "@/api/ord/soQuickly";
import { listCustomer} from "@/api/cha/customer";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listInvoicePattern} from "@/api/bas/invoicePattern";
import { listUnit} from "@/api/bas/unit";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "SoQuickly",
    dicts: ['bill_status_processing'],
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
        // 急出订单表格数据
        soQuicklyList: [],
        fkCustomerList: [],
        fkSalesList: [],
        fkUserList: [],
        fkInvoicePatternList: [],
        fkUnitList: [],
        fkMaterialInfoList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          customerId: null,
          productId: null,
          productName: null,
          productSpec: null,
          unitId: null,
          price: null,
          quantity: null,
          invoicePatternId: null,
          contractNo: null,
          orderDay: null,
          salesId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            salesId: [
                { required: true, message: "订单号不能为空", trigger: "blur" }
            ],
            customerId: [
                { required: true, message: "客户ID不能为空", trigger: "blur" }
            ],
            productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
            ],
            price: [
                { required: true, message: "单价不能为空", trigger: "blur" }
            ],
            quantity: [
                { required: true, message: "数量不能为空", trigger: "blur" }
            ],
            invoicePatternId: [
              { required: true, message: "数量不能为空", trigger: "blur" }
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
          /** 查询外键InvoicePattern数据 */
          this.getInvoicePatternList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
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
          /** 查询外键InvoicePattern数据 */
      getInvoicePatternList() {
        listInvoicePattern().then(res => {
          this.fkInvoicePatternList = res.rows;
        });
      },
          /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
        });
      },
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
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
/**主表外键ProductId被选择后触发事件*/
        onProductIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id;
                    this.form.productName = item.materialName;
                    this.form.productSpec = item.materialSpec;
                    this.form.unitId = item.unitId;
                    this.form.price = item.priceLast;
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
/**主表外键SalesId被选择后触发事件*/
        onSalesIdSelection(fkId){
            this.fkSalesList.forEach(item=>{
                if(fkId === item.id){
                    this.form.salesId = item.id
                }
            });
        },

        /** 查询急出订单列表 */
        getList() {
            this.loading = true;
        listSoQuickly(this.queryParams).then(response => {
          this.soQuicklyList = response.rows;
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
              productId: null,
              productName: null,
              productSpec: null,
              unitId: null,
              price: 0,
              quantity: 0,
              invoicePatternId: 8,
              contractNo: null,
              orderDay: null,
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
            this.title = "新增";
            getNextBillno("141").then(res => {
                this.form.billNo = res
            });
        },
        handleUpdate(row) {
            if (row.status>=4){
              this.$modal.msgWarning("已发布过的急单不能修改！");
            }else{
              const id = row.id || this.ids;
              getSoQuickly(id).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改";
              });
            }
        },
        handleDelete(row) {
          if (row.status>=4){
            this.$modal.msgWarning("已发布过的急单不能删除！");
          }else{
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确认删除 急单号为"' + billNoz + '"的数据项？').then(function() {
              return delSoQuickly(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
          }
        },
        handleEnable(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;

          this.$modal.confirm('确定发布 急单号为"' + billNoz + '"的数据项吗？').then(function() {
            return enable(ids);
          }).then(() => {
            this.getList();
            this.$modal.msgSuccess("发布成功");
          });
        },
        handleDelivery(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;
            this.$modal.confirm('确定发货 急单号为"' + billNoz + '"的数据项吗？').then(function() {
                 return deliveryQuickly(ids);
            }).then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
            });
        },
        handleExport() {
            this.download('ord/soQuickly/export', {
             ...this.queryParams
             }, `soQuickly_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateSoQuickly(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addSoQuickly(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                  updateBillSeq("141").then(res => {});
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
