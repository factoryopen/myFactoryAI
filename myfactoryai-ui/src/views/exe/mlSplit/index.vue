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
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-crop"
                    size="mini"
                    :disabled="single"
                    @click="handleSplitMl"
                >分批</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="mlSplitList"
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
                  <el-table-column label="项目" align="center" prop="lineId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProjectList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.projectName}}</span>
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

        <!-- 创建master.opensplitMl对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opensplitMl" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulessplitMl" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>批次号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入批次号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码"
                               @change="onProductIdSelection" size="mini"  disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkProductBasisList"
                            :key="index"
                            :label="fkrow.materialCode"
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
                        v-for="(fkrow, index) in fkProductBasisList"
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
                        v-for="(fkrow, index) in fkProductBasisList"
                        :key="index"
                        :label="fkrow.materialSpec"
                        :value="fkrow.materialSpec"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="currentProcessSeq" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>现工序</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.currentProcessSeq" placeholder="请输入现工序" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="currentProcessId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>现工序码</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.currentProcessId" placeholder="请选择现工序码"
                               @change="onCurrentProcessIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProcessList"
                            :key="index"
                            :label="fkrow.processCode"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="processProgress" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序进度</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.processProgress" placeholder="请选择工序进度" size="mini" disabled="true">
                    <el-option
                      v-for="dict in dict.type.manufacturing_status_move"
                      :key="dict.value"
                      :label="dict.label"
                      size="mini"
                      :value="parseInt(dict.value)"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <hr>
                <el-form-item prop="unitId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位"
                               @change="onUnitIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUnitList"
                            :key="index"
                            :label="fkrow.unitName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="quantityAvailable" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>可分批数量</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.quantityAvailable" size="mini" :disabled="true"/>
                </el-form-item>
                <el-form-item prop="quantityStart" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>实分批数量</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.quantitySpliting" placeholder="请输入分批数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitsplitMl">确 定</el-button>
               <el-button @click="cancelsplitMl">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="子批次">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="ml" border
                        :data="mlList"
                        highlight-current-row
                        :row-class-name="rowClassNameMl"
                        @selection-change="handleMlSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="批次号" align="center" prop="billNo" width="125"/>
                    <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProductBasisList">
                                <span v-if="item.id==scope.row.productId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="现工序" align="center" prop="currentProcessSeq" width="60"/>
                    <el-table-column label="现工序码" align="center" prop="currentProcessId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.currentProcessId"
                                    :key="index"
                                    size="mini">{{item.processCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="现班组" align="center" prop="currentWorkgroupId"  width="90">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWorkgroupList">
                                <span v-if="item.id==scope.row.currentWorkgroupId"
                                    :key="index"
                                    size="mini">{{item.groupName}}
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
                    <el-table-column label="派工数量" align="right" prop="quantityDispatched" width="70"/>
                    <el-table-column label="接收数量" align="right" prop="quantityAccepted" width="70"/>
                    <el-table-column label="报废数量" align="right" prop="quantityScrap" width="70"/>
                    <el-table-column label="重派数量" align="right" prop="quantityRedisp" width="70"/>
                    <el-table-column label="返工数量" align="right" prop="quantityRework" width="70"/>
                    <el-table-column label="待判数量" align="right" prop="quantityPending" width="70"/>
                    <el-table-column label="特采次数" align="right" prop="quantityAod" width="70"/>
                    <el-table-column label="分批数量" align="right" prop="quantitySplit" width="70"/>
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
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="批次类型" align="center" prop="mlType" width="70">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { listMlSplit, getMlSplit, delMlSplit, addMlSplit, updateMlSplit } from "@/api/exe/mlSplit";
import {getNextBillno, updateBillSeq } from "@/api/exe/mlSplit";
import { splitMl } from "@/api/exe/mlSplit";
import { listMl, getMl, delMl, addMl, updateMl } from "@/api/pln/ml";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listProductBasis} from "@/api/eng/productBasis";
import { listWo} from "@/api/pln/wo";

export default {
    name: "MlSplit",
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'bill_priority', 'pln_ml_type'],
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
            // 制造批次分拆表格数据
            mlSplitList: [],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkLineList: [],
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
            opensplitMl: false,
            rulessplitMl: {
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
            },
            //子表信息
            mlList:[],
            // 选中数组
            idsMl: [],
            captionsMl: [],
            // 非单个禁用
            singleMl: true,
            // 非多个禁用
            multipleMl: true,
            // 子表选中数据
            checkedMl: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMl: false,
            formMl: {},
            rulesMl: {
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
            listMlSplit(this.queryParams).then(response => {
              this.mlSplitList = response.rows;
              this.total = response.total;
              if (this.mlSplitList && this.mlSplitList.length>0) {
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
                this.getChildMlList();
            }else {
                this.mlList = null;
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
        /**主表外键ProjectId被选择后触发事件*/
        onProjectIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                    this.form.projectId = item.id
                }
            });
        },
        /**主表外键LineId被选择后触发事件*/
        onLineIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                    this.form.lineId = item.id
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
        /** 子表外键ProductId被选择后触发事件 **/
        onMlProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.productId = item.id
                    this.formMl.productName = item.materialName
                    this.formMl.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键CurrentProcessId被选择后触发事件 **/
        onMlCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.currentProcessId = item.id
                }
            });
        },
        /** 子表外键CurrentWorkgroupId被选择后触发事件 **/
        onMlCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.currentWorkgroupId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.unitId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMlLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.lineId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onMlProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.projectId = item.id
                }
            });
        },
        /** 子表外键SourceMlId被选择后触发事件 **/
        onMlSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.sourceMlId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onMlWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.woId = item.id
                }
            });
        },
        /** 子表外键StartBy被选择后触发事件 **/
        onMlStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.startBy = item.userId
                }
            });
        },
        /** 子表外键FinishBy被选择后触发事件 **/
        onMlFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMl.startBy = item.userId
                }
            });
        },

        /** 重设主表的分批对话框数据 */
        resetsplitMl (){
            this.form = {
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
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        handleSplitMl(row) {
            const id = row.id || this.ids
            getMlSplit(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.opensplitMl = true;
                this.title = "批次分拆";
            });
        },
        /** 提交按钮 */
        submitsplitMl() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  splitMl(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.opensplitMl = false;
                      this.getMasterList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                }
              }
          });
        },
        // 取消按钮
        cancelsplitMl() {
            this.opensplitMl = false;
            this.resetsplitMl();
        },
        /** 查询子表子批次数据 */
        getChildMlList() {
            var params = {"sourceMlId":this.masterId};
            listMl(params).then(res => {
                this.mlList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlSelectionChange(selection) {
            this.idsMl = selection.map(item => item.id)
            this.captionsMl = selection.map(item => item.billNo)
            this.singleMl = selection.length!==1
            this.multipleMl = !selection.length
        },
        /** 子表子批次的CSS行样式 */
        rowClassNameMl({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMl.includes(row.id)){
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
