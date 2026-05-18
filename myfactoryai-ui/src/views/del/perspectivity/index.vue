<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
              <el-form-item prop="customerId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>客户</strong></span>
                    </span>
                <el-select class="searchInput" v-model="queryParams.customerId" filterable clearable placeholder="请选择客户" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkCustomerList"
                      :key="index"
                      :label="fkrow.customerName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="soNo" class="marginBottom5">
                    <span slot="label">
                        <span class="fontSize12"><strong>订单编号</strong></span>
                    </span>
                <el-input v-model="queryParams.soNo"  class="searchInput" placeholder="请输入订单编号" size="mini"/>
              </el-form-item>
              <el-form-item prop="productCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品编码</strong></span>
                </span>
                <el-input v-model="queryParams.productCode"  class="searchInput" placeholder="请输入产品编码" size="mini"/>
              </el-form-item>
              <el-form-item prop="drawNo" class="marginBottom5">
                    <span slot="label">
                        <span class="fontSize12"><strong>图号</strong></span>
                    </span>
                <el-input v-model="queryParams.drawNo"  class="searchInput" placeholder="请输入图号" size="mini"/>
              </el-form-item>
              <el-form-item prop="productName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品名称</strong></span>
                </span>
                <el-input v-model="queryParams.productName"  class="searchInput" placeholder="请输入产品名称" size="mini"/>
              </el-form-item>
              <el-form-item prop="productSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>规格型号</strong></span>
                </span>
                <el-input v-model="queryParams.productSpec"  class="searchInput" placeholder="请输入规格型号" size="mini"/>
              </el-form-item>
              <el-form-item prop="projectId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项目</strong></span>
                    </span>
                <el-select class="searchInput" v-model="queryParams.projectId" filterable clearable placeholder="请选择项目" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkProjectList"
                      :key="index"
                      :label="fkrow.projectName"
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
                    type="success"
                    icon="el-icon-bicycle"
                    size="mini"
                    @click="handleCalculatePerspectivity"
                >透算</el-button>
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
                  height="590px"
                  :data="perspectivityList"
                  :span-method="objectSpanMethod"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  :cell-style="cellStyle"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
             <el-table-column label="客户" align="left" prop="customerId" width="120" fixed="left" >
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCustomerList">
                        <span v-if="item.id==scope.row.customerId"
                            :key="index"
                            size="mini">{{item.customerName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="订单编号" align="left" prop="soNo" width="130" show-overflow-tooltip fixed="left"/>
            <el-table-column label="单项" align="center" prop="soItemSeq" width="50" show-overflow-tooltip fixed="left"/>
            <el-table-column label="产品编码" align="left" prop="productCode" width="130" show-overflow-tooltip fixed="left"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120" show-overflow-tooltip fixed="left"/>
            <el-table-column label="产品名称" align="left" prop="productName" width="100" show-overflow-tooltip/>
            <el-table-column label="规格型号" align="left" prop="productSpec" width="80" show-overflow-tooltip/>
            <el-table-column label="客户料号" align="left" prop="customerProductNo" width="80" show-overflow-tooltip/>
            <el-table-column label="单项状" align="center" prop="soItemStatus" width="60">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.bill_status_full" :value="scope.row.soItemStatus"/>
              </template>
            </el-table-column>
            <el-table-column label="类序" align="center" prop="dpTypeSeq"  width="50"/>
            <el-table-column label="筹类" align="center" prop="dpTypeDesc"  width="50"/>
            <el-table-column label="筹交单号" align="left" prop="dpBillno"  width="130"/>
            <el-table-column label="筹交态" align="center" prop="dpStatus" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_full" :value="scope.row.dpStatus"/>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" prop="woSeq"  width="50"/>
            <el-table-column label="工单" align="left" prop="woId"  width="125">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWoInfoList">
                        <span v-if="item.id==scope.row.woId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="工单态" align="center" prop="woStatus" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_wo" :value="scope.row.woStatus"/>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" prop="mlSeq"  width="50"/>
            <el-table-column label="批次" align="left" prop="mlId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlHistoryTailList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="批次态" align="center" prop="mlStatus" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_ml" :value="scope.row.mlStatus"/>
                </template>
            </el-table-column>
               <el-table-column label="批现产线" align="center" prop="mlLineId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.mlLineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="批现工序" align="center" prop="mlProccessId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.mlProccessId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="工序态" align="center" prop="mlProcessStatus" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.mlProcessStatus"/>
                </template>
            </el-table-column>
            <el-table-column label="任务数" align="right" prop="quantityTask"  width="70" fixed="right"/>
            <el-table-column label="完成数" align="right" prop="quantityOutput"  width="70" fixed="right"/>
          </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <el-tabs>
            <el-tab-pane label="订单透视尾情">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="perspectivityTail" border
                        :data="perspectivityTailList"
                        highlight-current-row
                        :row-class-name="rowClassNamePerspectivityTail"
                        @selection-change="handlePerspectivityTailSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column label="产品名称" align="left" prop="productName" width="168"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="75"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="75"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="75"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="75"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="75"/>
                    <el-table-column label="分批数量" align="right" prop="quantitySplit" width="75"/>
                    <el-table-column label="项目" align="center" prop="projectId"  width="100">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkProjectList">
                          <span v-if="item.id==scope.row.projectId"
                                :key="index"
                                size="mini">{{item.projectName}}</span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listPerspectivity} from "@/api/del/perspectivity";
import { calculatePerspectivity } from "@/api/del/perspectivity";
import { listPerspectivityTail} from "@/api/del/perspectivityTail";
import { listCustomer} from "@/api/cha/customer";
import { listUser} from "@/api/system/user";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMlHistoryTail} from "@/api/exe/mlHistoryTail";
import { listWoInfo} from "@/api/pln/woInfo";

export default {
    name: "Perspectivity",
    dicts: ['bill_status_full', 'manufacturing_status_wo', 'manufacturing_status_ml', 'manufacturing_status_move'],
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
            // 订单透视表表格数据
            perspectivityList: [],
            fkCustomerList: [],
            fkUserList: [],
            fkProcessList: [],
            fkLineList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkMlHistoryTailList: [],
            fkWoInfoList: [],
            //主表当前行的ID
            masterId:"",
            //当前tab名
            activeTabName:"",
            // 弹出层标题
            title: "",
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              customerId: null,
              soId: null,
              projectId: null,
            },
            //子表信息
            perspectivityTailList:[],
            // 选中数组
            idsPerspectivityTail: [],
            captionsPerspectivityTail: [],
            // 非单个禁用
            singlePerspectivityTail: true,
            // 非多个禁用
            multiplePerspectivityTail: true,
            // 子表选中数据
            checkedPerspectivityTail: [],
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Customer数据 */
        this.getCustomerList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键MlHistoryTail数据 */
        this.getMlHistoryTailList();
        /** 查询外键WoInfo数据 */
        this.getWoInfoList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPerspectivity(this.queryParams).then(response => {
              this.perspectivityList = response.rows;
              this.total = response.total;
              if (this.perspectivityList && this.perspectivityList.length>0) {
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
                this.getPerspectivityTailList();
            }else {
                this.perspectivityTailList = null;
            }
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
        /** 查询外键MlHistoryTail数据 */
        getMlHistoryTailList() {
            listMlHistoryTail().then(res => {
                this.fkMlHistoryTailList = res.rows;
            });
        },
        /** 查询外键WoInfo数据 */
        getWoInfoList() {
            listWoInfo().then(res => {
                this.fkWoInfoList = res.rows;
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
            this.captions = selection.map(item => item.productName)
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
        cellStyle({row, column, rowIndex, columnIndex}) {
          var className = "fontSize:12px;padding:1px 0px;";

          if (columnIndex>=9 && columnIndex<=12) {
            className = "fontSize:12px; color:dodgerblue; padding:1px 0px;";
          }
          else if (columnIndex>=13 && columnIndex<=15) {
            className = "fontSize:12px; color:green; padding:1px 0px;";
          }
          else if (columnIndex>=16 && columnIndex<=21) {
            className = "fontSize:12px; color:orange; padding:1px 0px;";
          }
          else if (columnIndex==22 || columnIndex==23) {
            className = "fontSize:12px; color:red; padding:1px 0px;";
          }

          return className;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if(columnIndex<2) {
            const currentValue = row[column.property];
            const preRow = this.perspectivityList[rowIndex - 1];
            const preValue = preRow!=null ? preRow[column.property] : null;

            //如果当前值和上一行的值相同，则将当前单元格隐藏
            if (currentValue === preValue)
            {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
            else
            {
              // 否则计算当前单元格应该跨越多少行
              let rowspan = 1;
              for (let i = rowIndex + 1; i < this.perspectivityList.length; i++) {
                const nextRow = this.perspectivityList[i];
                const nextValue = nextRow[column.property];
                if (nextValue === currentValue) {
                  rowspan++;
                }
              }
              return {
                rowspan,
                colspan: 1
              }
            }
          }
          else if(columnIndex<9) {
            const currentValue = row["soItemId"];
            const preRow = this.perspectivityList[rowIndex - 1];
            const preValue = preRow!=null ? preRow["soItemId"] : null;

            //如果当前值和上一行的值相同，则将当前单元格隐藏
            if (currentValue === preValue)
            {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
            else
            {
              // 否则计算当前单元格应该跨越多少行
              let rowspan = 1;
              for (let i = rowIndex + 1; i < this.perspectivityList.length; i++) {
                const nextRow = this.perspectivityList[i];
                const nextValue = nextRow["soItemId"];
                if (nextValue === currentValue) {
                  rowspan++;
                }
              }
              return {
                rowspan,
                colspan: 1
              }
            }
          }
          else if(columnIndex<13) {
            const currentValue1 = row["soItemId"];
            const currentValue2 = row["dpTypeSeq"];
            const preRow = this.perspectivityList[rowIndex - 1];
            const preValue1 = preRow!=null ? preRow["soItemId"] : null;
            const preValue2 = preRow!=null ? preRow["dpTypeSeq"] : null;

            if (currentValue1 === preValue1 && currentValue2 === preValue2)
            {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
            else
            {
              // 否则计算当前单元格应该跨越多少行
              let rowspan = 1;
              for (let i = rowIndex + 1; i < this.perspectivityList.length; i++) {
                const nextRow = this.perspectivityList[i];
                const nextValue1 = nextRow["soItemId"];
                const nextValue2 = nextRow["dpTypeSeq"];
                if (currentValue1 === nextValue1 && currentValue2 === nextValue2) {
                  rowspan++;
                }
              }
              return {
                rowspan,
                colspan: 1
              }
            }
          }
          else if(columnIndex<15) {
            const currentValue1 = row["soItemId"];
            const currentValue2 = row["dpTypeSeq"];
            const currentValue3 = row["woId"];
            const preRow = this.perspectivityList[rowIndex - 1];
            const preValue1 = preRow!=null ? preRow["soItemId"] : null;
            const preValue2 = preRow!=null ? preRow["dpTypeSeq"] : null;
            const preValue3 = preRow!=null ? preRow["woId"] : null;

            //如果当前值和上一行的值相同，则将当前单元格隐藏
            if (currentValue1 === preValue1 && currentValue2 === preValue2 && currentValue3 === preValue3)
            {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
            else
            {
              // 否则计算当前单元格应该跨越多少行
              let rowspan = 1;
              for (let i = rowIndex + 1; i < this.perspectivityList.length; i++) {
                const nextRow = this.perspectivityList[i];
                const nextValue1 = nextRow["soItemId"];
                const nextValue2 = nextRow["dpTypeSeq"];
                const nextValue3 = nextRow["woId"];
                if (currentValue1 === nextValue1 && currentValue2 === nextValue2 && currentValue3 === nextValue3) {
                  rowspan++;
                }
              }
              return {
                rowspan,
                colspan: 1
              }
            }
          }

        },
        /**主表外键UserId被选择后触发事件*/
        onUserIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.userId = item.user_id
                }
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
        /**主表外键SoId被选择后触发事件*/
        onSoIdSelection(fkId){
        },
        /**主表外键SoItemId被选择后触发事件*/
        onSoItemIdSelection(fkId){
        },
        /**主表外键ProductId被选择后触发事件*/
        onProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id
                    this.form.productName = item.materialName
                }
            });
        },
        /**主表外键ProductName被选择后触发事件*/
        onProductNameSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id
                    this.form.productName = item.materialName
                }
            });
        },
        /**主表外键WoId被选择后触发事件*/
        onWoIdSelection(fkId){
            this.fkWoInfoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.woId = item.id
                }
            });
        },
        /**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlHistoryTailList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                }
            });
        },
        /**主表外键MlLineId被选择后触发事件*/
        onMlLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlLineId = item.id
                }
            });
        },
        /**主表外键MlProccessId被选择后触发事件*/
        onMlProccessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlProccessId = item.id
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
        /** 子表外键UserId被选择后触发事件 **/
        onPerspectivityTailUserIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formPerspectivityTail.userId = item.user_id
                }
            });
        },
        /** 子表外键CustomerId被选择后触发事件 **/
        onPerspectivityTailCustomerIdSelection(fkId){
            this.fkCustomerList.forEach(item=>{
                if(fkId === item.id){
                   this.formPerspectivityTail.customerId = item.id
                }
            });
        },
        handleCalculatePerspectivity(row) {
            this.$modal.confirm('透算会删除过去的结果，您确定吗？').then(function() {
              return calculatePerspectivity();
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        handleDownload() {
            this.download('del/perspectivity/export', {
              ...this.queryParams
            }, `perspectivity_${new Date().getTime()}.xlsx`)
        },
        /** 查询子表订单透视尾情数据 */
        getPerspectivityTailList() {
            var params = {"id":this.masterId};
            listPerspectivityTail(params).then(res => {
                this.perspectivityTailList = res.rows;
            });
        },
        // 多选框选中数据
        handlePerspectivityTailSelectionChange(selection) {
            this.idsPerspectivityTail = selection.map(item => item.id)
            this.captionsPerspectivityTail = selection.map(item => item.productName)
            this.singlePerspectivityTail = selection.length!==1
            this.multiplePerspectivityTail = !selection.length
        },
        /** 子表订单透视尾情的CSS行样式 */
        rowClassNamePerspectivityTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPerspectivityTail.includes(row.id)){
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
