<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>发货单编号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入发货单编号"
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
                v-for="dict in dict.type.bill_status_finished"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item prop="deliveryDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.deliveryDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择交期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="expressNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物流单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.expressNo"
                    placeholder="请输入物流单号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="invoiceNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>发票单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.invoiceNo"
                    placeholder="请输入发票单号"
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
                  :data="deliveryOrderList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="发货单编号" align="center" prop="billNo"  width="115"/>
              <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_finished" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="客户" align="left" prop="customerId"  width="130">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="交期" align="center" prop="deliveryDay" width="100">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
               <el-table-column label="发货地址" align="right" prop="addressId"  width="250">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerAddressList">
                        <span v-if="item.id==scope.row.addressId"
                            :key="index"
                            size="mini">{{item.address}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="联系人" align="center" prop="contact" width="70"/>
                <el-table-column label="手机" align="left" prop="phone" width="110"/>
                <el-table-column label="物流单号" align="left" prop="expressNo"  width="140"/>
                <el-table-column label="发票单号" align="left" prop="invoiceNo"  width="140"/>
                <el-table-column label="项目" align="center" prop="projectId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.projectId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="销售员" align="center" prop="salesId"  width="70">
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
            <el-tab-pane label="发货单明细">
                <el-table ref="gdItem" border
                        :data="gdItemList"
                        highlight-current-row
                        :row-class-name="rowClassNameGdItem"
                        @selection-change="handleGdItemSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                  <el-table-column label="产品编码" align="left" prop="productCode" width="130" show-overflow-tooltip/>
                  <el-table-column label="产品名称" align="left" prop="productName" width="110" show-overflow-tooltip/>
                  <el-table-column label="图号" align="left" prop="drawNo" width="130" show-overflow-tooltip/>
                  <el-table-column label="规格型号" align="left" prop="productSpec" width="100" show-overflow-tooltip/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="计划数" align="right" prop="quantity" width="75"/>
                  <el-table-column label="发货数" align="right" prop="quantity" width="75"/>
                  <el-table-column label="发货计划" align="center" prop="dpId"  width="115">
                    <template  slot-scope="scope">
                      <template v-for="(item,index) in fkDpList">
                                  <span v-if="item.id==scope.row.dpId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                      </template>
                    </template>
                    </el-table-column>
                    <el-table-column label="销售订单" align="center" prop="soId"  width="115">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkSoList">
                                  <span v-if="item.id==scope.row.soId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="项次" align="center" prop="soItemId"  width="50">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkSoItemList">
                                  <span v-if="item.id==scope.row.soItemId"
                                        :key="index"
                                        size="mini">{{item.seqNo}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="仓库" align="center" prop="houseId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWareHouseList">
                                <span v-if="item.id==scope.row.houseId"
                                    :key="index"
                                    size="mini">{{item.houseName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="储位" align="center" prop="positionId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWarePositionList">
                                <span v-if="item.id==scope.row.positionId"
                                    :key="index"
                                    size="mini">{{item.positionName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="批号" align="left" prop="lotNo" width="130"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { listDeliveryOrderHistory, getDeliveryOrder, delDeliveryOrder, addDeliveryOrder, updateDeliveryOrder } from "@/api/del/deliveryOrder";
import { listGdItem, getGdItem, delGdItem, addGdItem, updateGdItem } from "@/api/del/gdItem";
import { listCustomer} from "@/api/cha/customer";
import { listCustomerAddress} from "@/api/cha/customerAddress";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listSo} from "@/api/ord/so";
import { listSoItem} from "@/api/ord/soItem";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listProject} from "@/api/ord/project";
import { listPlanItem} from "@/api/del/planItem";

export default {
    name: "DeliveryOrder",
    dicts: ['bill_status_finished'],
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
            // 发货单管理表格数据
            deliveryOrderList: [],
            fkCustomerList: [],
            fkCustomerAddressList: [],
            fkSalesList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDpList: [],
            fkSoList: [],
            fkSoItemList: [],
            fkWareHouseList: [],
            fkWarePositionList: [],
            fkProjectList: [],
            fkDeliveryOrderList: [],
            //主表当前行的ID
            masterId:"",
            //当前tab名
            activeTabName:"",
            // 弹出层标题
            title: "",
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 10,
              billNo: null,
              status: null,
              customerId: null,
              deliveryDay: null,
              addressId: null,
              contact: null,
              phone: null,
              expressNo: null,
              invoiceNo: null,
              projectId: null,
              salesId: null,
            },
            //子表信息
            gdItemList:[],
            // 选中数组
            idsGdItem: [],
            captionsGdItem: [],
            // 非单个禁用
            singleGdItem: true,
            // 非多个禁用
            multipleGdItem: true,
            // 子表选中数据
            checkedGdItem: [],
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Customer数据 */
        this.getCustomerList();
        /** 查询外键CustomerAddress数据 */
        this.getCustomerAddressList();
        /** 查询外键Sales数据 */
        this.getSalesList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询交付计划DP数据 */
        this.getDpList();
        /** 查询外键So数据 */
        this.getSoList();
        /** 查询外键SoItem数据 */
        this.getSoItemList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
        /** 查询外键WarePosition数据 */
        this.getWarePositionList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键DeliveryOrder数据 */
        this.getDeliveryOrderList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listDeliveryOrderHistory(this.queryParams).then(response => {
              this.deliveryOrderList = response.rows;
              this.total = response.total;
              if (this.deliveryOrderList && this.deliveryOrderList.length>0) {
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
                this.getGdItemList();
            }else {
                this.gdItemList = null;
            }
        },
        /** 查询外键Customer数据 */
        getCustomerList() {
            listCustomer().then(res => {
                this.fkCustomerList = res.rows;
            });
        },
        /** 查询外键CustomerAddress数据 */
        getCustomerAddressList() {
            listCustomerAddress().then(res => {
                this.fkCustomerAddressList = res.rows;
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
        /** 查询外键Unit数据 */
        getUnitList() {
            listUnit().then(res => {
                this.fkUnitList = res.rows;
            });
        },
        /** 查询外键DP数据 */
        getDpList() {
          listPlanItem().then(res => {
            this.fkDpList = res.rows;
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
        /** 查询外键WareHouse数据 */
        getWareHouseList() {
            listWareHouse().then(res => {
                this.fkWareHouseList = res.rows;
            });
        },
        /** 查询外键WarePosition数据 */
        getWarePositionList() {
            listWarePosition().then(res => {
                this.fkWarePositionList = res.rows;
            });
        },
        /** 查询外键Project数据 */
        getProjectList() {
            listProject().then(res => {
                this.fkProjectList = res.rows;
            });
        },
        /** 查询外键DeliveryOrder数据 */
        getDeliveryOrderList() {
          listDeliveryOrderHistory().then(res => {
                this.fkDeliveryOrderList = res.rows;
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
        /**主表外键AddressId被选择后触发事件*/
        onAddressIdSelection(fkId){
            this.fkCustomerAddressList.forEach(item=>{
                if(fkId === item.id){
                    this.form.addressId = item.id
                    this.form.contact = item.contact
                    this.form.phone = item.phone
                }
            });
        },
        /**主表外键ProjectId被选择后触发事件*/
        onProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                    this.form.projectId = item.id
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
        /** 子表外键GdId被选择后触发事件 **/
        onGdItemGdIdSelection(fkId){
            this.fkDeliveryOrderList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.gdId = item.id
                }
            });
        },
        /** 子表外键SoId被选择后触发事件 **/
        onGdItemSoIdSelection(fkId){
            this.fkSoList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.soId = item.id
                }
            });
        },
        /** 子表外键SoItemId被选择后触发事件 **/
        onGdItemSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.soItemId = item.id
                }
            });
        },
        /** 子表外键HouseId被选择后触发事件 **/
        onGdItemHouseIdSelection(fkId){
            this.fkWareHouseList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.houseId = item.id
                }
            });
        },
        /** 子表外键PositionId被选择后触发事件 **/
        onGdItemPositionIdSelection(fkId){
            this.fkWarePositionList.forEach(item=>{
                if(fkId === item.id){
                   this.formGdItem.positionId = item.id
                }
            });
        },
        handleExport() {
            this.download('del/deliveryOrder/exportHistory', {
              ...this.queryParams
            }, `deliveryOrder_${new Date().getTime()}.xlsx`)
        },
        /** 查询子表发货单明细数据 */
        getGdItemList() {
            var params = {"gdId":this.masterId};
            listGdItem(params).then(res => {
                this.gdItemList = res.rows;
            });
        },
        // 多选框选中数据
        handleGdItemSelectionChange(selection) {
            this.idsGdItem = selection.map(item => item.id)
            this.captionsGdItem = selection.map(item => item.seqNo)
            this.singleGdItem = selection.length!==1
            this.multipleGdItem = !selection.length
        },
        /** 子表发货单明细的CSS行样式 */
        rowClassNameGdItem({ row, rowIndex }) {
            var clsName = ''

            if (this.idsGdItem.includes(row.id)){
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
