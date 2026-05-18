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
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="220px"
                  :data="mlRoutingChangeList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="批次号" align="left" prop="billNo"  width="140" show-overflow-tooltip/>
            <el-table-column label="产品编码" align="left" prop="productId" width="168" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="产品名称" align="left" prop="productName" width="168" show-overflow-tooltip/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_ml" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="工序进度" align="center" prop="processProgress" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.processProgress"/>
                </template>
            </el-table-column>
            <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
            <el-table-column label="现工序" align="center" prop="currentProcessSeq"  width="60"/>
            <el-table-column label="现工序码" align="center" prop="currentProcessId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.currentProcessId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="现班组" align="center" prop="currentWorkgroupId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.currentWorkgroupId"
                            :key="index"
                            size="mini">{{item.groupName}}</span>
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
            <el-table-column label="派工数量" align="right" prop="quantityDispatched"  width="70"/>
            <el-table-column label="接收数量" align="right" prop="quantityAccepted"  width="70"/>
            <el-table-column label="报废数量" align="right" prop="quantityScrap"  width="70"/>
            <el-table-column label="重派数量" align="right" prop="quantityRedisp"  width="70"/>
            <el-table-column label="返工数量" align="right" prop="quantityRework"  width="70"/>
            <el-table-column label="待判数量" align="right" prop="quantityPending"  width="70"/>
            <el-table-column label="特采次数" align="right" prop="quantityAod"  width="70"/>
            <el-table-column label="分批数量" align="right" prop="quantitySplit"  width="70"/>
            <el-table-column label="生产交期" align="center" prop="deliveryDay" width="85">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上线日期" align="center" prop="scheduleDay" width="85">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.scheduleDay, '{y}-{m}-{d}') }}</span>
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
            <el-tab-pane label="工序移转记录">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddExeProcessMoves"
                        >新增</el-button>
                    </el-col>
                </el-row>
                <el-table ref="processMoves" border
                        :data="processMovesList"
                        highlight-current-row
                        :row-class-name="rowClassNameProcessMoves"
                        @selection-change="handleProcessMovesSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column label="工序号" align="center" prop="processSeq" width="60"/>
                    <el-table-column label="状态" align="center" prop="status" width="65">
                      <template slot-scope="scope">
                        <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="工序码" align="left" prop="processId"  width="90">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkProcessList">
                                  <span v-if="item.id==scope.row.processId"
                                        :key="index"
                                        size="mini">{{item.processCode}}
                                  </span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="工序类型" align="left" prop="processType" width="70">
                      <template slot-scope="scope">
                        <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="产线" align="left" prop="lineId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkLineList">
                                <span v-if="item.id==scope.row.lineId"
                                    :key="index"
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" prop="unitId"  width="50">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="接收数量" align="right" prop="quantityReceive" width="70"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="70"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="70"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="70"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="70"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="70"/>
                    <el-table-column label="分批数量" align="right" prop="quantitySplit" width="70"/>
                    <el-table-column label="转出数量" align="right" prop="quantityPost" width="70"/>
                    <el-table-column label="接收时间" align="center" prop="receiveTime" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="接收人" align="center" prop="receiveBy"  width="70">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.receiveBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
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
                                <span v-if="item.userId==scope.row.postBy"
                                    :key="index"
                                    size="mini">{{item.nickName}}
                                </span>
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
                               :disabled="scope.row.processSeq<currentProcessSeq || (scope.row.processSeq===currentProcessSeq && scope.row.status!==0)"
                               @click="handleUpdateExeProcessMoves(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               :disabled="scope.row.processSeq<=currentProcessSeq"
                               @click="handleDeleteExeProcessMoves(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openProcessMoves对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProcessMoves" width="500px" append-to-body>
            <el-form ref="formProcessMoves" :model="formProcessMoves" :rules="rulesProcessMoves" label-width="140px" :inline-message="true">
<!--                    <el-form-item prop="mlId" class="marginBottom0">-->
<!--                      <span slot="label">-->
<!--                          <span class="fontSize12"><strong>制造批</strong></span>-->
<!--                      </span>-->
<!--                    <el-input class="inputWidth" v-model="formProcessMoves.mlId" placeholder="请输入制造批" size="mini" disabled="true"/>-->
<!--                  </el-form-item>-->
<!--                    <el-form-item prop="productId" class="marginBottom0" >-->
<!--                      <span slot="label">-->
<!--                          <span class="fontSize12"><strong>产品编码</strong></span>-->
<!--                      </span>-->
<!--                      <el-select class="inputWidth" v-model="formProcessMoves.productId" placeholder="请选择产品编码"-->
<!--                                 @change="onProcessMovesProductIdSelection"  size="mini" >-->
<!--                         <el-option-->
<!--                             v-for="(fkrow, index) in fkProductBasisList"-->
<!--                             :key="index"-->
<!--                             :label="fkrow.materialCode"-->
<!--                             :value="fkrow.id"-->
<!--                             size="mini"-->
<!--                         ></el-option>-->
<!--                      </el-select>-->
<!--                  </el-form-item>-->
<!--                   <el-form-item prop="productName" class="marginBottom0" >-->
<!--                    <span slot="label">-->
<!--                        <span class="fontSize12"><strong>产品名称</strong></span>-->
<!--                    </span>-->
<!--                      <el-select class="inputWidth" v-model="formProcessMoves.productName" placeholder="请选择产品名称" size="mini" disabled="true">-->
<!--                        <el-option-->
<!--                            v-for="(fkrow, index) in fkProductBasisList"-->
<!--                            :key="index"-->
<!--                            :label="fkrow.materialName"-->
<!--                            :value="fkrow.materialName"-->
<!--                            size="mini"-->
<!--                        ></el-option>-->
<!--                      </el-select>-->
<!--                  </el-form-item>-->
<!--                   <el-form-item prop="productSpec" class="marginBottom0" >-->
<!--                    <span slot="label">-->
<!--                        <span class="fontSize12"><strong>产品规格</strong></span>-->
<!--                    </span>-->
<!--                      <el-select class="inputWidth" v-model="formProcessMoves.productSpec" placeholder="请选择产品规格" size="mini" disabled="true">-->
<!--                        <el-option-->
<!--                            v-for="(fkrow, index) in fkProductBasisList"-->
<!--                            :key="index"-->
<!--                            :label="fkrow.materialSpec"-->
<!--                            :value="fkrow.materialSpec"-->
<!--                            size="mini"-->
<!--                        ></el-option>-->
<!--                      </el-select>-->
<!--                  </el-form-item>-->
                   <el-form-item prop="processSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.processSeq" placeholder="请输入工序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="processId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工序码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProcessMoves.processId" placeholder="请选择工序码"
                                 @change="onProcessMovesProcessIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkProcessList"
                             :key="index"
                             :label="fkrow.processCode+' ['+fkrow.processName+']'"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item  prop="processType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>工序类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="formProcessMoves.processType" placeholder="请选择工序类型" size="mini" >
                      <el-option
                        v-for="dict in dict.type.eng_process_type"
                        :key="dict.value"
                        :label="dict.label"
                        size="mini"
                        :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="lineId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>产线</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProcessMoves.lineId" placeholder="请选择产线"
                                 @change="onProcessMovesLineIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkLineList"
                             :key="index"
                             :label="fkrow.lineName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item  prop="lineType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>产线类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="formProcessMoves.lineType" placeholder="请选择产线类型" size="mini" >
                      <el-option
                        v-for="dict in dict.type.res_type_line"
                        :key="dict.value"
                        :label="dict.label"
                        size="mini"
                        :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item prop="lastSeqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>上序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.lastSeqNo" placeholder="请输入上序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="nextSeqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>下序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.nextSeqNo" placeholder="请输入下序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsFixed" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准固定秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsFixed" placeholder="请输入标准固定秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsVariable" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准可变秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsVariable" placeholder="请输入标准可变秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsRm" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备料秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsRm" placeholder="请输入备料秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsSetup" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>架机秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsSetup" placeholder="请输入架机秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsStacking" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>堆垛秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsStacking" placeholder="请输入堆垛秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsTransfer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>移转秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsTransfer" placeholder="请输入移转秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsBuffer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>缓冲秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProcessMoves.secondsBuffer" placeholder="请输入缓冲秒数" size="mini" />
                  </el-form-item>
                  <el-form-item prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="formProcessMoves.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProcessMoves">确 定</el-button>
                <el-button @click="cancelProcessMoves">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listMlRoutingChange, getMlRoutingChange, delMlRoutingChange, addMlRoutingChange, updateMlRoutingChange } from "@/api/exe/mlRoutingChange";
import {getNextBillno, updateBillSeq } from "@/api/exe/mlRoutingChange";
import { listProcessMoves, getProcessMoves, delProcessMoves, addProcessMoves, updateProcessMoves } from "@/api/exe/processMoves";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listWo} from "@/api/pln/wo";
import { listMl} from "@/api/pln/ml";
import { listMlHistory} from "@/api/exe/mlHistory";

export default {
    name: "MlRoutingChange",
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'bill_priority', 'pln_ml_type', 'res_type_line', 'eng_process_type'],
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
            // 批次制程变更表格数据
            mlRoutingChangeList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkProcessList: [],
            fkLineList: [],
            fkWorkgroupList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkWoList: [],
            fkMlList: [],
            fkMlHistoryList: [],
            //主表当前行的ID
            masterId:"",
            currentProcessSeq:null,
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
              pageSize: 5,
              billNo: null,
            },
            //子表信息
            processMovesList:[],
            // 选中数组
            idsProcessMoves: [],
            captionsProcessMoves: [],
            // 非单个禁用
            singleProcessMoves: true,
            // 非多个禁用
            multipleProcessMoves: true,
            // 子表选中数据
            checkedProcessMoves: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProcessMoves: false,
            formProcessMoves: {},
            rulesProcessMoves: {
                mlId: [
                   { required: true, message: "制造批不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
                ],
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                processSeq: [
                   { required: true, message: "工序号不能为空", trigger: "blur" }
                ],
                processId: [
                   { required: true, message: "工序码不能为空", trigger: "blur" }
                ],
                lineId: [
                   { required: true, message: "产线不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                quantityReceive: [
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
                quantityPost: [
                   { required: true, message: "转出数量不能为空", trigger: "blur" }
                ],
                lineType: [
                   { required: true, message: "产线类型不能为空", trigger: "change" }
                ],
                processType: [
                   { required: true, message: "工序类型不能为空", trigger: "change" }
                ],
                deptId: [
                   { required: true, message: "部门不能为空", trigger: "blur" }
                ],
                secondsFixed: [
                   { required: true, message: "标准固定秒数不能为空", trigger: "blur" }
                ],
                secondsVariable: [
                   { required: true, message: "标准可变秒数不能为空", trigger: "blur" }
                ],
                secondsRm: [
                   { required: true, message: "备料秒数不能为空", trigger: "blur" }
                ],
                secondsSetup: [
                   { required: true, message: "架机秒数不能为空", trigger: "blur" }
                ],
                secondsStacking: [
                   { required: true, message: "堆垛秒数不能为空", trigger: "blur" }
                ],
                secondsTransfer: [
                   { required: true, message: "移转秒数不能为空", trigger: "blur" }
                ],
                secondsBuffer: [
                   { required: true, message: "缓冲秒数不能为空", trigger: "blur" }
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
        /** 查询外键Dept数据 */
        this.getDeptList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
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
        /** 查询外键MlHistory数据 */
        this.getMlHistoryList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlRoutingChange(this.queryParams).then(response => {
                this.mlRoutingChangeList = response.rows;
                var temp=response.rows[0];
                this.$refs.masterTable.setCurrentRow(temp,true);
                this.total = response.total;
                if(response.total) this.masterId = response.rows[0].id;
                this.loadChildData();
                this.loading = false;
            });
        },
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getProcessMovesList();
            }else {
                this.processMovesList = null;
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.rows;
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
        /** 查询外键MlHistory数据 */
        getMlHistoryList() {
            listMlHistory().then(res => {
                this.fkMlHistoryList = res.rows;
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
            this.masterId = currentRow.id;
            this.currentProcessSeq = currentRow.currentProcessSeq;
            this.loadChildData();
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
        /** 子表外键MlId被选择后触发事件 **/
        onProcessMovesMlIdSelection(fkId){
            this.fkMlHistoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.mlId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onProcessMovesProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.productId = item.id
                    this.formProcessMoves.productName = item.materialName
                    this.formProcessMoves.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onProcessMovesProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.processId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onProcessMovesLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.lineId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onProcessMovesUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.unitId = item.id
                }
            });
        },
        /** 子表外键DeptId被选择后触发事件 **/
        onProcessMovesDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.deptId = item.deptId
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onProcessMovesGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.groupId = item.id
                }
            });
        },
        /** 子表外键ReceiveBy被选择后触发事件 **/
        onProcessMovesReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.receiveBy = item.userId
                }
            });
        },
        /** 子表外键PostBy被选择后触发事件 **/
        onProcessMovesPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMoves.receiveBy = item.userId
                }
            });
        },

        /** 查询子表工序移转记录数据 */
        getProcessMovesList() {
            var params = {"mlId":this.masterId};
            listProcessMoves(params).then(res => {
                this.processMovesList = res.rows;
            });
        },
        // 多选框选中数据
        handleProcessMovesSelectionChange(selection) {
            this.idsProcessMoves = selection.map(item => item.id)
            this.captionsProcessMoves = selection.map(item => item.productName)
            this.singleProcessMoves = selection.length!==1
            this.multipleProcessMoves = !selection.length
        },
        /** 子表工序移转记录的CSS行样式 */
        rowClassNameProcessMoves({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProcessMoves.includes(row.id)){
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
        resetProcessMoves() {
            this.formProcessMoves = {
                id: null,
                mlId: this.masterId,
                status: null,
                processSeq: null,
                lastSeqNo: null,
                nextSeqNo: null,
                quantityReceive: null,
                quantityScrap: null,
                quantityRedisp: null,
                quantityRework: null,
                quantityPending: null,
                quantityAod: null,
                quantitySplit: null,
                quantityPost: null,
                receiveTimeScheduled: null,
                postTimeScheduled: null,
                lineType: null,
                processType: null,
                remark: null,
                secondsFixed: 0,
                secondsVariable: 0,
                secondsRm: 0,
                secondsSetup: 0,
                secondsStacking: 0,
                secondsTransfer: 0,
                secondsBuffer: 0,
                receiveTime: null,
                postTime: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProcessMoves");
            // 按关键字段值来初始化子表单数据
            this.onProcessMovesMlIdSelection(this.masterId);
        },
        handleAddExeProcessMoves() {
          this.resetProcessMoves();
          this.openProcessMoves = true;
          this.title = "新增";
        },
        handleUpdateExeProcessMoves(row) {
          this.resetProcessMoves();
          const id = row.id || this.idsProcessMoves
          getProcessMoves(id).then(response => {
              this.formProcessMoves = response.data;
              this.openProcessMoves = true;
              this.title = "修改";
          });
        },
        handleDeleteExeProcessMoves(row) {
          const ids = row.id || this.idsProcessMoves;
          const productNamez = row.productName || this.captionsProcessMoves;

          this.$modal.confirm('确定删除产品名称为"' + productNamez + '"的数据项？').then(function() {
              return delProcessMoves(ids);
          }).then(() => {
            this.getProcessMovesList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitProcessMoves() {
            this.$refs["formProcessMoves"].validate(valid => {
                if (valid) {
                  if(this.formProcessMoves.id==this.formProcessMoves.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProcessMoves.id != null) {
                        updateProcessMoves(this.formProcessMoves)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProcessMoves = false;
                            this.getProcessMovesList();
                            this.getMasterList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addProcessMoves(this.formProcessMoves)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProcessMoves = false;
                            this.getProcessMovesList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelProcessMoves() {
            this.openProcessMoves = false;
            this.resetProcessMoves();
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
