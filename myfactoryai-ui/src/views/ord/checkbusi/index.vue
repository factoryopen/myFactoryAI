<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="startDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>开始日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.startDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择开始日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="finishDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>结束日</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.finishDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结束日">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-c-scale-to-original" size="mini"
                    @click="handleCheckOrderBusi"
                >对账</el-button>
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
                  :data="checkbusiList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="客户" align="left" prop="customerId"  width="180">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="开始日期" align="center" prop="startDay" width="110">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.startDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="结束日" align="center" prop="finishDay" width="110">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.finishDay, '{y}-{m}-{d}') }}</span>
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
            <el-table-column label="部门" align="center" prop="deptId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
    </div>
</template>

<script>
import { listCheckbusi, getCheckbusi, delCheckbusi, addCheckbusi, updateCheckbusi } from "@/api/ord/checkbusi";
import { checkOrderBusi } from "@/api/ord/checkbusi";
import { listCustomer} from "@/api/cha/customer";
import { listSales} from "@/api/cha/sales";
import { listUser} from "@/api/system/user";
import { listDept} from "@/api/system/dept";

export default {
    name: "Checkbusi",
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
        // 订单对账服务表格数据
        checkbusiList: [],
        fkCustomerList: [],
        fkSalesList: [],
        fkUserList: [],
        fkDeptList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          customerId: null,
          startDay: null,
          finishDay: null,
          salesId: null,
          deptId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            startDay: [
                { required: true, message: "开始日期不能为空", trigger: "blur" }
            ],
            finishDay: [
                { required: true, message: "结束日不能为空", trigger: "blur" }
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
          /** 查询外键Dept数据 */
          this.getDeptList();
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
          /** 查询外键Dept数据 */
      getDeptList() {
        listDept().then(res => {
          this.fkDeptList = res.data;
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
/**主表外键DeptId被选择后触发事件*/
        onDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.deptId = item.deptId
                }
            });
        },

        /** 查询订单对账服务列表 */
        getList() {
            this.loading = true;
        listCheckbusi(this.queryParams).then(response => {
          this.checkbusiList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
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
            this.captions = selection.map(item => item.id)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleCheckOrderBusi(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;

            this.$modal.confirm('确定对账 ID为"' + idz + '"的数据项吗？').then(function() {
                 return checkOrderBusi(ids);
            }).then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
            }).catch(error => {
                this.$modal.msgError(error.msg);
            });
        },
        handleExport() {
            this.download('ord/checkbusi/export', {
             ...this.queryParams
             }, `checkbusi_${new Date().getTime()}.xlsx`)
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
