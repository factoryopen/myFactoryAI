<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>批次号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入批次号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="priority" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>优先级</strong></span>
                </span>
                <el-select v-model="queryParams.priority" placeholder="请选择优先级" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.bill_priority"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="deliveryDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>生产交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.deliveryDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择生产交期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="stockreqTime" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>请入库时间</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.stockreqTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择请入库时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="stockreqBy" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>请入库人</strong></span>
                </span>
                <el-input
                    v-model="queryParams.stockreqBy"
                    placeholder="请输入请入库人"
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
                    type="success"
                    icon="el-icon-house"
                    size="mini"
                    :disabled="multiple"
                    @click="handleProductStockin"
                >入库</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="mlStockinList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="批次号" align="center" prop="billNo"  width="125"/>
                <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
                      <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
                      <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="派工数量" align="right" prop="quantityDispatched"  width="70"/>
                <el-table-column label="接收数量" align="right" prop="quantityAccepted"  width="70"/>
                <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="70"/>
                <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="70"/>
                <el-table-column label="返工数量" align="right" prop="quantityRework"  width="70"/>
                <el-table-column label="待判数量" align="right" prop="quantityPending"  width="70"/>
                <el-table-column label="特采次数" align="right" prop="quantityAod"  width="70"/>
                <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="70"/>
                <el-table-column label="上线日期" align="center" prop="scheduleDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.scheduleDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="生产交期" align="center" prop="deliveryDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
                <el-table-column label="产线" align="center" prop="lineId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="批次类型" align="center" prop="mlType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                </template>
            </el-table-column>
                                              </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>


        <el-tabs>
            <el-tab-pane label="入库历史">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="inventoryIo" border
                        :data="inventoryIoList"
                        highlight-current-row
                        :row-class-name="rowClassNameInventoryIo"
                        @selection-change="handleInventoryIoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="单据编号" align="center" prop="billNo" width="115"/>
                    <el-table-column label="交易类型" align="center" prop="ioType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.exe_inventory_iotype" :value="scope.row.ioType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="现仓库" align="center" prop="houseId"  width="110">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWareHouseList">
                                <span v-if="item.id==scope.row.houseId"
                                    :key="index"
                                    size="mini">{{item.houseCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="现储位" align="center" prop="positionId"  width="110">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWarePositionList">
                                <span v-if="item.id==scope.row.positionId"
                                    :key="index"
                                    size="mini">{{item.positionName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="物料编码" align="left" prop="materialId"  width="168">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProductBasisList">
                                <span v-if="item.id==scope.row.materialId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}</span>
                            </template>
                       </template>
                    </el-table-column>
                    <el-table-column label="单价" align="right" prop="price" width="80"/>
                    <el-table-column label="数量" align="right" prop="quantity" width="80"/>
                    <el-table-column label="金额" align="right" prop="amount" width="80"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listMlStockin, getMlStockin, delMlStockin, addMlStockin, updateMlStockin } from "@/api/exe/mlStockin";
import {getNextBillno, updateBillSeq } from "@/api/exe/mlStockin";
import { productStockin } from "@/api/exe/mlStockin";
import { listInventoryIo, getInventoryIo, delInventoryIo, addInventoryIo, updateInventoryIo } from "@/api/snc/inventoryIo";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listMaterial} from "@/api/eng/material";
import { listLine} from "@/api/res/line";
import { listWareHouse} from "@/api/res/wareHouse";
import { listWarePosition} from "@/api/res/warePosition";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listWo} from "@/api/pln/wo";
import { listMl} from "@/api/pln/ml";

export default {
    name: "MlStockin",
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'bill_priority', 'pln_ml_type', 'exe_inventory_iotype'],
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
            // 产成品入库表格数据
            mlStockinList: [],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkMaterialList: [],
            fkLineList: [],
            fkWareHouseList: [],
            fkWarePositionList: [],
            fkWorkgroupList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkWoList: [],
            fkMlList: [],
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
                    { required: true, message: "批次号不能为空", trigger: "blur" }
                ],
                productId: [
                    { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                priority: [
                    { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                currentProcessSeq: [
                    { required: true, message: "现工序不能为空", trigger: "blur" }
                ],
                currentProcessId: [
                    { required: true, message: "现工序码不能为空", trigger: "blur" }
                ],
                unitId: [
                    { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantityDispatched: [
                    { required: true, message: "派工数量不能为空", trigger: "blur" }
                ],
                quantityAccepted: [
                    { required: true, message: "接收数量不能为空", trigger: "blur" }
                ],
                quantityScrap: [
                    { required: true, message: "报废数量不能为空", trigger: "blur" }
                ],
                quantityRedisp: [
                    { required: true, message: "重派数量不能为空", trigger: "blur" }
                ],
                quantityRework: [
                    { required: true, message: "返工数量不能为空", trigger: "blur" }
                ],
                quantityPending: [
                    { required: true, message: "待判数量不能为空", trigger: "blur" }
                ],
                quantityAod: [
                    { required: true, message: "特采次数不能为空", trigger: "blur" }
                ],
                quantitySplit: [
                    { required: true, message: "分批数量不能为空", trigger: "blur" }
                ],
                quantityOutput: [
                    { required: true, message: "产出数量不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              billNo: null,
              productName: null,
              productSpec: null,
              priority: null,
              deliveryDay: null,
              lineId: null,
              stockreqTime: null,
              stockreqBy: null,
            },
            //子表信息
            inventoryIoList:[],
            // 选中数组
            idsInventoryIo: [],
            captionsInventoryIo: [],
            // 非单个禁用
            singleInventoryIo: true,
            // 非多个禁用
            multipleInventoryIo: true,
            // 子表选中数据
            checkedInventoryIo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openInventoryIo: false,
            formInventoryIo: {},
            rulesInventoryIo: {
                billNo: [
                   { required: true, message: "单据编号不能为空", trigger: "blur" }
                ],
                ioType: [
                   { required: true, message: "交易类型不能为空", trigger: "change" }
                ],
                houseId: [
                   { required: true, message: "现仓库不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                price: [
                   { required: true, message: "单价不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
                amount: [
                   { required: true, message: "金额不能为空", trigger: "blur" }
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
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
        /** 查询外键WarePosition数据 */
        this.getWarePositionList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键Wo数据 */
        this.getWoList();
        /** 查询外键Ml数据 */
        this.getMlList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlStockin(this.queryParams).then(response => {
              this.mlStockinList = response.rows;
              this.total = response.total;
              if (this.mlStockinList && this.mlStockinList.length>0) {
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
                this.getInventoryIoList();
            }else {
                this.inventoryIoList = null;
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
        /** 查询外键Material数据 */
        getMaterialList() {
            listMaterial().then(res => {
                this.fkMaterialList = res.rows;
            });
        },
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
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
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
            });
        },
        /** 查询外键Wo数据 */
        getWoList() {
            listWo().then(res => {
                this.fkWoList = res.rows;
            });
        },
        /** 查询外键Ml数据 */
        getMlList() {
            listMl().then(res => {
                this.fkMlList = res.rows;
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
        /**主表外键ProductId被选择后触发事件*/
        onProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                    this.form.productId = item.id
                    this.form.productName = item.materialName
                    this.form.productSpec = item.materialSpec
                }
            });
        },
        /**主表外键CurrentProcessId被选择后触发事件*/
        onCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currentProcessId = item.id
                }
            });
        },
        /**主表外键CurrentWorkgroupId被选择后触发事件*/
        onCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.currentWorkgroupId = item.id
                }
            });
        },
        /**主表外键UnitId被选择后触发事件*/
        onUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.unitId = item.id
                }
            });
        },
        /**主表外键LineId被选择后触发事件*/
        onLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.lineId = item.id
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
        /**主表外键SourceMlId被选择后触发事件*/
        onSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                    this.form.sourceMlId = item.id
                }
            });
        },
        /**主表外键WoId被选择后触发事件*/
        onWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.woId = item.id
                }
            });
        },
        /**主表外键DispatchingBy被选择后触发事件*/
        onDispatchingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键AcceptingBy被选择后触发事件*/
        onAcceptingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键StartBy被选择后触发事件*/
        onStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键FinishBy被选择后触发事件*/
        onFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /**主表外键StockinBy被选择后触发事件*/
        onStockinBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.dispatchingBy = item.userId
                    this.form.acceptingBy = item.userId
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                    this.form.stockinBy = item.userId
                }
            });
        },
        /** 子表外键HouseId被选择后触发事件 **/
        onInventoryIoHouseIdSelection(fkId){
            this.fkWareHouseList.forEach(item=>{
                if(fkId === item.id){
                   this.formInventoryIo.houseId = item.id
                }
            });
        },
        /** 子表外键PositionId被选择后触发事件 **/
        onInventoryIoPositionIdSelection(fkId){
            this.fkWarePositionList.forEach(item=>{
                if(fkId === item.id){
                   this.formInventoryIo.positionId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onInventoryIoMaterialIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formInventoryIo.materialId = item.id
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onInventoryIoMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formInventoryIo.mlId = item.id
                }
            });
        },

        handleProductStockin(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定入库 批次号为"' + billNoz + '"的数据项吗？').then(function() {
              return productStockin(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            }).catch(error => {
              this.$modal.msgError(error.msg);
            });
        },

        /** 查询子表入库历史数据 */
        getInventoryIoList() {
            var params = {"mlId":this.masterId};
            listInventoryIo(params).then(res => {
                this.inventoryIoList = res.rows;
            });
        },
        // 多选框选中数据
        handleInventoryIoSelectionChange(selection) {
            this.idsInventoryIo = selection.map(item => item.id)
            this.captionsInventoryIo = selection.map(item => item.billNo)
            this.singleInventoryIo = selection.length!==1
            this.multipleInventoryIo = !selection.length
        },
        /** 子表入库历史的CSS行样式 */
        rowClassNameInventoryIo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsInventoryIo.includes(row.id)){
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
