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
            <el-form-item prop="status" class="marginBottom5">
                <el-input
                  v-model="queryParams.status"
                  v-show="false"
                />
            </el-form-item>
            <el-form-item prop="processProgress" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工序进度</strong></span>
                </span>
                <el-select v-model="queryParams.processProgress" placeholder="请选择工序进度" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.manufacturing_status_move"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
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
            <el-form-item prop="scheduleDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>上线日期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.scheduleDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择上线日期">
                </el-date-picker>
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
            <el-form-item prop="mlType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>批次类型</strong></span>
                </span>
                <el-select v-model="queryParams.mlType" placeholder="请选择批次类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.pln_ml_type"
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
                type="primary"
                icon="el-icon-finished"
                size="mini"
                :disabled="multiple"
                @click="handleFinish"
              >结案
              </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="600px"
                  :data="mlFinishingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  @row-dblclick="handleMasterCellDblclick"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="批次号" align="left" prop="billNo" width="140" show-overflow-tooltip/>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168" show-overflow-tooltip/>
            <el-table-column label="产品名称" align="left" prop="productName" width="168" show-overflow-tooltip/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_ml" :value="scope.row.status"/>
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
            <el-table-column label="产出数量" align="right" prop="quantityOutput"  width="70"/>
            <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="70"/>
            <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="70"/>
            <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="70"/>
            <el-table-column label="返工数量" align="right" prop="quantityRework"  width="70"/>
            <el-table-column label="待判数量" align="right" prop="quantityPending"  width="70"/>
            <el-table-column label="特采次数" align="right" prop="quantityAod"  width="70"/>
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
            <el-table-column label="批次类型" align="center" prop="mlType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.openProcessMoves对话框 -->
        <el-dialog :title="title" class="dialogPreviewMove" :visible.sync="openProcessMoves" width="1408px" height="900px" append-to-body>
          <el-table ref="processMovesTable" v-loading="loading" border width="100%" height="600px"
                    :data="fkProcessMovesList"
                    :row-class-name="rowClassName"
                    :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                    :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column label="工序号" align="center" prop="processSeq"  width="65"/>
            <el-table-column label="产线" align="left" prop="lineId"  width="100">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkLineList">
                      <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="工序码" align="left" prop="processId"  width="100">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                              :key="index"
                              size="mini">{{item.processCode}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" width="65">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center" prop="unitId"  width="55">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                              :key="index"
                              size="mini">{{item.unitName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="接收数量" align="right" prop="quantityReceive"  width="80"/>
            <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="80"/>
            <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="80"/>
            <el-table-column label="返工数量" align="right" prop="quantityRework"  width="80"/>
            <el-table-column label="待判数量" align="right" prop="quantityPending"  width="80"/>
            <el-table-column label="特采次数" align="right" prop="quantityAod"  width="80"/>
            <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="80"/>
            <el-table-column label="转出数量" align="right" prop="quantityPost"  width="80"/>
            <el-table-column label="接收时间" align="center" prop="receiveTime" width="120">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="接收人" align="center" prop="receiveBy"  width="70">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkUserList">
                    <span v-if="item.userId==scope.row.receiveBy" :key="index" size="mini">{{item.nickName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="转出时间" align="center" prop="postTime" width="120">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.postTime, '{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="转出人" align="center" prop="postBy"  width="70">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkUserList">
                    <span v-if="item.userId==scope.row.postBy" :key="index" size="mini">{{item.nickName}} </span>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

        <el-tabs>
          <el-tab-pane label="制造批次尾情">
            <el-row :gutter="10" class="mb8">
            </el-row>
            <el-table ref="mlHistoryTail" border
                      :data="mlHistoryTailList"
                      highlight-current-row
                      :row-class-name="rowClassNameMlHistoryTail"
                      @selection-change="handleMlHistoryTailSelectionChange"
                      :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                      :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
              <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
              <el-table-column label="项目" align="center" prop="projectId"  width="80">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkProjectList">
                                  <span v-if="item.id==scope.row.projectId"
                                        :key="index"
                                        size="mini">{{item.projectName}}
                                  </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="来源批次" align="left" prop="sourceMlId"  width="125">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkMlList">
                                  <span v-if="item.id==scope.row.sourceMlId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="工单" align="left" prop="woId"  width="120">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkWoList">
                                  <span v-if="item.id==scope.row.woId"
                                        :key="index"
                                        size="mini">{{item.billNo}}
                                  </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="派工时间" align="center" prop="dispatchingTime" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.dispatchingTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="派工人" align="right" prop="dispatchingBy"  width="70">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkUserList">
                                  <span v-if="item.userId==scope.row.dispatchingBy"
                                        :key="index"
                                        size="mini">{{item.nickName}}
                                  </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="接收时间" align="center" prop="acceptingTime" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.acceptingTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="接收人" align="right" prop="acceptingBy"  width="70">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkUserList">
                                  <span v-if="item.userId==scope.row.acceptingBy"
                                        :key="index"
                                        size="mini">{{item.nickName}}
                                  </span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="请入库时间" align="center" prop="stockreqTime" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.stockreqTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="请入库人" align="right" prop="stockreqBy" width="70"/>
              <el-table-column label="入库时间" align="center" prop="stockinTime" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.stockinTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入库人" align="right" prop="stockinBy"  width="70">
                <template  slot-scope="scope">
                  <template v-for="(item,index) in fkUserList">
                                  <span v-if="item.userId==scope.row.stockinBy"
                                        :key="index"
                                        size="mini">{{item.nickName}}
                                  </span>
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
import {finishMl} from "@/api/exe/mlOperating";
import {listMlFinishing} from "@/api/pln/ml";
import { listMlHistoryTail} from "@/api/exe/mlHistoryTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listWo} from "@/api/pln/wo";
import { listProcessMoves} from "@/api/exe/processMoves";
import pdf from "vue-pdf";

export default {
    name: "MlOperating",
    components: {pdf},
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'manufacturing_status_worksegment', 'bill_priority', 'pln_ml_type'],
    data() {
        return {
            //base url
            baseUrl: process.env.VUE_APP_BASE_API,
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
            // 车间班组作业表格数据
            mlFinishingList: [],
            fkProcessMovesList:[],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkLineList: [],
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
            form: {
              id: null,
              billNo: null,
              status: null,
              processProgress: null,
              priority: null,
              currentProcessSeq: null,
              quantityDispatched: null,
              quantityAccepted: null,
              quantityScrap: null,
              quantityRedisp: null,
              quantityRework: null,
              quantityPending: null,
              quantityAod: null,
              quantitySplit: null,
              quantityOutput: null,
              scheduleDay: null,
              deliveryDay: null,
              mlType: null,
              dispatchingTime: null,
              acceptingTime: null,
              startTime: null,
              finishTime: null,
              stockreqTime: null,
              stockreqBy: null,
              stockinTime: null,
              sopUrl: null,
              drawingUrl: null,
              videoUrl: null,
              routingSopUrl: null,
              routingDrawingUrl: null,
              routingVideoUrl: null,
              quantityAvailable:null,
              wsNo:null,
              quantityStart:null,
              quantityFinish:null,
              remark: null,
              createTime: null,
              createBy: null,
              updateTime: null,
              updateBy: null
            },
            rules: {},
            formProcessMoves: {},
            openProcessMoves: false, //工序作业弹出框
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 20,
              billNo: null,
              productId: null,
              productName: null,
              productSpec: null,
              status: null,
              processProgress: null,
              priority: null,
              currentProcessId: null,
              currentWorkgroupId: null,
              scheduleDay: null,
              deliveryDay: null,
              lineId: null,
              projectId: null,
              mlType: null,
              sourceMlId: null,
              woId: null,
            },
            mlHistoryTailList:[],
            // 选中数组
            idsMlHistoryTail: [],
            captionsMlHistoryTail: [],
            // 非单个禁用
            singleMlHistoryTail: true,
            // 非多个禁用
            multipleMlHistoryTail: true,
            // 子表选中数据
            checkedMlHistoryTail: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlHistoryTail: false,
            formMlHistoryTail: {},
            rulesMlHistoryTail: {},
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
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键Wo数据 */
        this.getWoList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listMlFinishing(this.queryParams).then(response => {
              this.mlFinishingList = response.rows;
              this.total = response.total;
              if (this.mlFinishingList && this.mlFinishingList.length>0) {
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
            this.getMlHistoryTailList();
          }else {
            this.mlHistoryTailList = null;
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
        /** 查询外键Wo数据 */
        getWoList() {
            listWo().then(res => {
                this.fkWoList = res.rows;
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
        /** 点击单元格操作 */
        handleMasterCellDblclick(row, event) {
            this.formProcessMoves.mlId = row.id;
            listProcessMoves(this.formProcessMoves).then(res => {
              this.fkProcessMovesList = res.rows;
              this.title="工序移转记录["+row.billNo+"]";
              this.openProcessMoves=true;
            });
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
       handleFinish(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;
          this.$modal.confirm('确定结案 批次号为"' + billNoz + '"的数据项吗？').then(function() {
            return finishMl(ids);
          }).then(response => {
            this.getMasterList();
            this.$modal.msgSuccess(response.msg);
          });
        },        /** 子表工序出工的CSS行样式 */
        rowClassNameProcessWork({ row, rowIndex }) {
          var clsName = '';

          if (this.idsProcessWork.includes(row.id)){
            clsName = 'selected-row';
          }
          else if (row.priority == 1) {
            clsName = 'super-urgent-row';
          } else if (row.priority == 2) {
            clsName = 'urgent-row';
          }

          return clsName;
        },
        /** 查询子表制造批次尾情数据 */
        getMlHistoryTailList() {
            var params = {"id":this.masterId};
            listMlHistoryTail(params).then(res => {
                this.mlHistoryTailList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlHistoryTailSelectionChange(selection) {
            this.idsMlHistoryTail = selection.map(item => item.id)
            this.captionsMlHistoryTail = selection.map(item => item.billNo)
            this.singleMlHistoryTail = selection.length!==1
            this.multipleMlHistoryTail = !selection.length
        },
        /** 子表制造批次尾情的CSS行样式 */
        rowClassNameMlHistoryTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlHistoryTail.includes(row.id)){
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
  .dialogPreview .el-dialog__body {
    padding: 0;
    margin: 0;
    background: #000000;
  }
  .dialogPreviewMove .el-dialog__body {
    padding: 0;
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
