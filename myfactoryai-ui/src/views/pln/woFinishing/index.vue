<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>工单号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入工单号"
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
                v-for="dict in dict.type.manufacturing_status_wo"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item prop="needDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>生产交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.needDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择生产交期">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="promiseDay" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>承诺交期</strong></span>
                </span>
                <el-date-picker
                    clearable
                    size="mini"
                    class="searchInput"
                    v-model="queryParams.promiseDay"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择承诺交期">
                </el-date-picker>
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
            <el-form-item prop="woType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>类型</strong></span>
                </span>
                <el-select v-model="queryParams.woType" placeholder="请选择类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.pln_wo_type"
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
                    type="success"
                    icon="el-icon-paperclip"
                    size="mini"
                    :disabled="multiple"
                    @click="handleEnable"
                >发放</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleChangeWo"
                >变更</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-ice-cream-round"
                    size="mini"
                    :disabled="single"
                    @click="handleFrozeWo"
                >冻结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="single"
                    @click="handleDisableWo"
                >停用</el-button>
            </el-col>
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
                  :data="woList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="cellStyle"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="工单号" align="center" prop="billNo"  width="125"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
              <template slot-scope="scope">
                  <dict-tag :options="dict.type.manufacturing_status_wo" :value="scope.row.status"/>
              </template>
            </el-table-column>
            <el-table-column label="产品编码" align="left" prop="productCode" width="168"/>
            <el-table-column label="产品名称" align="left" prop="productName" width="140"/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="120"/>
            <el-table-column label="图号" align="left" prop="drawNo"  width="120"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                             :key="index"
                             size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="计划数量" align="right" prop="quantityPlanned"  width="80"/>
            <el-table-column label="派工数量" align="right" prop="quantityAssigned"  width="80"/>
            <el-table-column label="产出数量" align="right" prop="quantityOutput"  width="80"/>
            <el-table-column label="生产交期" align="center" prop="needDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.needDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="承诺交期" align="center" prop="promiseDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.promiseDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="下单日期" align="center" prop="orderDay" width="90">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.orderDay, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
              <el-table-column label="优先级" align="center" prop="priority" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_priority" :value="scope.row.priority"/>
                </template>
            </el-table-column>
            <el-table-column label="类型" align="center" prop="woType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_wo_type" :value="scope.row.woType"/>
                </template>
            </el-table-column>
            <el-table-column label="主计划" align="center" prop="mpsId"  width="125">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMpsList">
                        <span v-if="item.id==scope.row.mpsId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="订单" align="right" prop="soId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoTraceList">
                        <span v-if="item.id==scope.row.soId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
               <el-table-column label="项次" align="center" prop="soItemId"  width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSoItemList">
                        <span v-if="item.id==scope.row.soItemId"
                            :key="index"
                            size="mini">{{item.seqNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="项目" align="center" prop="projectId"  width="85">
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
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.openchangeWo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeWo" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeWo" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>工单号</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入工单号" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.productCode" placeholder="请选择产品编码" size="mini"  disabled="true"/>
                </el-form-item>
                <el-form-item prop="productName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品名称</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item  prop="woType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>类型</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.woType" placeholder="请选择类型" size="mini" disabled="true">
                    <el-option
                      v-for="dict in dict.type.pln_wo_type"
                      :key="dict.value"
                      :label="dict.label"
                      size="mini"
                      :value="parseInt(dict.value)"
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
                <hr>
                <el-form-item prop="quantityPlanned" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>计划数量</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.quantityPlanned" placeholder="请输入订单数量" size="mini"/>
                </el-form-item>
                <el-form-item prop="needDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>生产交期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.needDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择生产交期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="priority" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>优先级</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.priority" placeholder="请选择优先级" size="mini" >
                        <el-option
                            v-for="dict in dict.type.bill_priority"
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
                    <el-select class="inputWidth" v-model="form.lineId" placeholder="请选择产线"
                               @change="onLineIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkLineList"
                            :key="index"
                            :label="fkrow.lineName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="projectId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>项目</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.projectId" placeholder="请选择项目"
                               @change="onProjectIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProjectList"
                            :key="index"
                            :label="fkrow.projectName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitchangeWo">确 定</el-button>
               <el-button @click="cancelchangeWo">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="工单备料单">
              <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    @click="handleAddPlnWoMaterial"
                  >新增</el-button>
                </el-col>
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    icon="el-icon-edit"
                    :disabled="singleWoMaterial"
                    @click="handleUpdatePlnWoMaterial"
                  >修改</el-button>
                </el-col>
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    icon="el-icon-delete"
                    :disabled="multipleWoMaterial"
                    @click="handleDeletePlnWoMaterial"
                  >删除</el-button>
                </el-col>
              </el-row>
              <el-table ref="woMaterial" border
                        :data="woMaterialList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoMaterial"
                        @selection-change="handleWoMaterialSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="序号" align="center" prop="seqNo" width="60"/>
                    <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
                    <el-table-column label="规格型号" align="left" prop="materialSpec" width="120"/>
                    <el-table-column label="尺寸" align="left" prop="materialSize" width="120"/>
                    <el-table-column label="单位" align="center" prop="unitId"  width="60">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUnitList">
                                <span v-if="item.id==scope.row.unitId"
                                    :key="index"
                                    size="mini">{{item.unitName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" align="right" prop="quantity" width="110"/>
                    <el-table-column label="消耗类型" align="center" prop="consumeType" width="90">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                          @click="handleUpdatePlnWoMaterial(scope.row)"
                        >修改</el-button>
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          @click="handleDeletePlnWoMaterial(scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单工艺路线">
              <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    @click="handleAddPlnWoRouting"
                  >新增</el-button>
                </el-col>
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    icon="el-icon-edit"
                    :disabled="singleWoRouting"
                    @click="handleUpdatePlnWoRouting"
                  >修改</el-button>
                </el-col>
                <el-col :span="1.5">
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    icon="el-icon-delete"
                    :disabled="multipleWoRouting"
                    @click="handleDeletePlnWoRouting"
                  >删除</el-button>
                </el-col>
              </el-row>
              <el-table ref="woRouting" border
                        :data="woRoutingList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRouting"
                        @selection-change="handleWoRoutingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="产线" align="center" prop="lineId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkLineList">
                                <span v-if="item.id==scope.row.lineId"
                                    :key="index"
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="工序" align="center" prop="processId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.processId"
                                    :key="index"
                                    size="mini">{{item.processName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="60"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="60"/>
                    <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="110"/>
                    <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="110"/>
                    <el-table-column label="备料秒数" align="right" prop="secondsRm" width="110"/>
                    <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="110"/>
                    <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="110"/>
                    <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="110"/>
                    <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="110"/>
                    <el-table-column label="产线类型" align="center" prop="lineType" width="70">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.res_type_line" :value="scope.row.lineType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="工序类型" align="center" prop="processType" width="70">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                          @click="handleUpdatePlnWoRouting(scope.row)"
                        >修改</el-button>
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          @click="handleDeletePlnWoRouting(scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单图纸">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="woDrawing" border
                        :data="woDrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoDrawing"
                        @selection-change="handleWoDrawingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="图纸描述" align="left" prop="description" width="250"/>
                    <el-table-column label="图纸链接" align="left" prop="drawingUrl" width="400"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewDrawing(scope.row)"
                           >预览</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单SOP">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="woSop" border
                        :data="woSopList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoSop"
                        @selection-change="handleWoSopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="SOP地址" align="center" prop="sopUrl" width="400"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewSop(scope.row)"
                           >预览</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单作业视频">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="woVideo" border
                        :data="woVideoList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoVideo"
                        @selection-change="handleWoVideoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="视频地址" align="center" prop="videoUrl" width="400"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewVideo(scope.row)"
                           >预览</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

      <!-- 创建slaver.openWoMaterial对话框 -->
      <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoMaterial" width="500px" append-to-body>
        <el-form ref="formWoMaterial" :model="formWoMaterial" :rules="rulesWoMaterial" label-width="140px" :inline-message="true">
          <el-form-item prop="woId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工单ID</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoMaterial.woId" placeholder="请输入工单ID" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>序号</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoMaterial.seqNo" placeholder="请输入序号" size="mini" />
          </el-form-item>
          <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="formWoMaterial.materialId" placeholder="请选择物料"
                       @change="onWoMaterialMaterialIdSelection"  size="mini" >
              <el-option
                v-for="(fkrow, index) in fkMaterialInfoList"
                :key="index"
                :label="fkrow.materialCode+' ['+fkrow.materialName+']'"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
            <el-select class="inputWidth" v-model="formWoMaterial.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
              <el-option
                v-for="(fkrow, index) in fkMaterialInfoList"
                :key="index"
                :label="fkrow.materialName"
                :value="fkrow.materialName"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="materialSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
            <el-select class="inputWidth" v-model="formWoMaterial.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
              <el-option
                v-for="(fkrow, index) in fkMaterialInfoList"
                :key="index"
                :label="fkrow.materialSpec"
                :value="fkrow.materialSpec"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="unitId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>单位</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="formWoMaterial.unitId" placeholder="请选择单位"
                       @change="onWoMaterialUnitIdSelection"  size="mini" >
              <el-option
                v-for="(fkrow, index) in fkUnitList"
                :key="index"
                :label="fkrow.unitName"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="quantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>数量</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoMaterial.quantity" placeholder="请输入数量" size="mini" />
          </el-form-item>
          <el-form-item  prop="consumeType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>消耗类型</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="formWoMaterial.consumeType" placeholder="请选择消耗类型" size="mini" >
              <el-option
                v-for="dict in dict.type.eng_material_consumingtype"
                :key="dict.value"
                :label="dict.label"
                size="mini"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoMaterial.remark" placeholder="请输入备注" size="mini" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitWoMaterial">确 定</el-button>
          <el-button @click="cancelWoMaterial">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 创建slaver.openWoRouting对话框 -->
      <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRouting" width="500px" append-to-body>
        <el-form ref="formWoRouting" :model="formWoRouting" :rules="rulesWoRouting" label-width="140px" :inline-message="true">
          <el-form-item prop="woId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工单</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.woId" placeholder="请输入工单" size="mini" disabled="true"/>
          </el-form-item>
          <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.seqNo" placeholder="请输入项序" size="mini" />
          </el-form-item>
          <el-form-item prop="processId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="formWoRouting.processId" placeholder="请选择工序"
                       @change="onWoRoutingProcessIdSelection"  size="mini" >
              <el-option
                v-for="(fkrow, index) in fkProcessList"
                :key="index"
                :label="fkrow.processName"
                :value="fkrow.id"
                size="mini"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="processType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序类型</strong></span>
                      </span>
            <el-select class="inputWidth" v-model="formWoRouting.processType" placeholder="请选择工序类型" size="mini" >
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
            <el-select class="inputWidth" v-model="formWoRouting.lineId" placeholder="请选择产线"
                       @change="onWoRoutingLineIdSelection"  size="mini" >
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
            <el-select class="inputWidth" v-model="formWoRouting.lineType" placeholder="请选择产线类型" size="mini" >
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
            <el-input class="inputWidth" v-model="formWoRouting.lastSeqNo" placeholder="请输入上序号" size="mini" />
          </el-form-item>
          <el-form-item prop="nextSeqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>下序号</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.nextSeqNo" placeholder="请输入下序号" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsFixed" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准固定秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsFixed" placeholder="请输入标准固定秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsVariable" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准可变秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsVariable" placeholder="请输入标准可变秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsRm" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备料秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsRm" placeholder="请输入备料秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsSetup" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>架机秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsSetup" placeholder="请输入架机秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsStacking" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>堆垛秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsStacking" placeholder="请输入堆垛秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsTransfer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>移转秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsTransfer" placeholder="请输入移转秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="secondsBuffer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>缓冲秒数</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.secondsBuffer" placeholder="请输入缓冲秒数" size="mini" />
          </el-form-item>
          <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
            <el-input class="inputWidth" v-model="formWoRouting.remark" placeholder="请输入备注" size="mini" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitWoRouting">确 定</el-button>
          <el-button @click="cancelWoRouting">取 消</el-button>
        </div>
      </el-dialog>

        <!-- 创建slaver.openWoDrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoDrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formWoDrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openWoSoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoSoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.formWoSop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openWoVideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoVideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.formWoVideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listWo, getWo, delWo, addWo, updateWo } from "@/api/pln/wo";
import { enable,changeWo,frozeWo,disableWo } from "@/api/pln/wo";
import { listWoMaterial, getWoMaterial, delWoMaterial, addWoMaterial, updateWoMaterial } from "@/api/pln/woMaterial";
import { listWoRouting, getWoRouting, delWoRouting, addWoRouting, updateWoRouting } from "@/api/pln/woRouting";
import { listWoDrawing, getWoDrawing, delWoDrawing, addWoDrawing, updateWoDrawing } from "@/api/pln/woDrawing";
import { listWoSop, getWoSop, delWoSop, addWoSop, updateWoSop } from "@/api/pln/woSop";
import { listWoVideo, getWoVideo, delWoVideo, addWoVideo, updateWoVideo } from "@/api/pln/woVideo";
import { listUnit} from "@/api/bas/unit";
import { listSoItem} from "@/api/ord/soItem";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listProject} from "@/api/ord/project";
import { listMps} from "@/api/del/mps";
import { listSoTrace} from "@/api/ord/soTrace";
import { listWoInfo} from "@/api/pln/woInfo";
import { listMaterialInfo} from "@/api/eng/materialInfo";

import pdf from "vue-pdf";

export default {
    name: "Wo",
    components: {pdf},
    dicts: ['manufacturing_status_wo', 'bill_priority', 'pln_wo_type', 'eng_material_consumingtype', 'sys_yes_no', 'res_type_line', 'eng_process_type'],
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
            // 工单管理表格数据
            woList: [],
            fkMaterialInfoList: [],
            fkUnitList: [],
            fkSoItemList: [],
            fkProcessList: [],
            fkLineList: [],
            fkProjectList: [],
            fkProductBasisList: [],
            fkWoList: [],
            fkMpsList: [],
            fkSoTraceList: [],
            fkWoInfoList: [],
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
            rules: {},
            openchangeWo: false,
            ruleschangeWo: {
              quantityPlanned: [
                { required: true, message: "计划数量不能为空", trigger: "blur" }
              ],
              needDay: [
                { required: true, message: "生产交期不能为空", trigger: "blur" }
              ],
              priority: [
                { required: true, message: "优先级不能为空", trigger: "change" }
              ],
              lineId: [
                { required: true, message: "产线不能为空", trigger: "blur" }
              ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              billNo: null,
              status: null,
              productId: null,
              productName: null,
              productSpec: null,
              needDay: null,
              promiseDay: null,
              orderDay: null,
              priority: null,
              lineId: null,
              woType: null,
              mpsId: null,
              projectId: null,
              soId: null,
              soItemId: null,
            },
            //子表信息
            woMaterialList:[],
            // 选中数组
            idsWoMaterial: [],
            captionsWoMaterial: [],
            // 非单个禁用
            singleWoMaterial: true,
            // 非多个禁用
            multipleWoMaterial: true,
            // 子表选中数据
            checkedWoMaterial: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoMaterial: false,
            formWoMaterial: {},
            rulesWoMaterial: {
                woId: [
                   { required: true, message: "工单ID不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "序号不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料ID不能为空", trigger: "blur" }
                ],
                materialName: [
                   { required: true, message: "物料名称不能为空", trigger: "blur" }
                ],
                unitId: [
                   { required: true, message: "单位ID不能为空", trigger: "blur" }
                ],
                quantity: [
                   { required: true, message: "数量不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woRoutingList:[],
            // 选中数组
            idsWoRouting: [],
            captionsWoRouting: [],
            // 非单个禁用
            singleWoRouting: true,
            // 非多个禁用
            multipleWoRouting: true,
            // 子表选中数据
            checkedWoRouting: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRouting: false,
            formWoRouting: {},
            rulesWoRouting: {
                woId: [
                   { required: true, message: "工单不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                lineId: [
                   { required: true, message: "产线ID不能为空", trigger: "blur" }
                ],
                processId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
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
                lineType: [
                   { required: true, message: "产线类型不能为空", trigger: "change" }
                ],
                processType: [
                   { required: true, message: "工序类型不能为空", trigger: "change" }
                ],
            },
            //子表信息
            woDrawingList:[],
            // 选中数组
            idsWoDrawing: [],
            captionsWoDrawing: [],
            // 非单个禁用
            singleWoDrawing: true,
            // 非多个禁用
            multipleWoDrawing: true,
            // 子表选中数据
            checkedWoDrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoDrawing: false,
            formWoDrawing: {},
            rulesWoDrawing: {
                woId: [
                   { required: true, message: "工单不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                description: [
                   { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                   { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            openWoDrawingpreviewDrawing: false,
            rulesWoDrawingpreviewDrawing: {
                woId: [
                    { required: true, message: "工单不能为空", trigger: "blur" }
                ],
                seqNo: [
                    { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                    { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woSopList:[],
            // 选中数组
            idsWoSop: [],
            captionsWoSop: [],
            // 非单个禁用
            singleWoSop: true,
            // 非多个禁用
            multipleWoSop: true,
            // 子表选中数据
            checkedWoSop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoSop: false,
            formWoSop: {},
            rulesWoSop: {
                woId: [
                   { required: true, message: "工单ID不能为空", trigger: "blur" }
                ],
                stepSeq: [
                   { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                   { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                description: [
                   { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                sopUrl: [
                   { required: true, message: "SOP地址不能为空", trigger: "blur" }
                ],
            },
            openWoSoppreviewSop: false,
            rulesWoSoppreviewSop: {
                woId: [
                    { required: true, message: "工单ID不能为空", trigger: "blur" }
                ],
                stepSeq: [
                    { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                    { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                sopUrl: [
                    { required: true, message: "SOP地址不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woVideoList:[],
            // 选中数组
            idsWoVideo: [],
            captionsWoVideo: [],
            // 非单个禁用
            singleWoVideo: true,
            // 非多个禁用
            multipleWoVideo: true,
            // 子表选中数据
            checkedWoVideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoVideo: false,
            formWoVideo: {},
            rulesWoVideo: {
                woId: [
                   { required: true, message: "工单ID不能为空", trigger: "blur" }
                ],
                stepSeq: [
                   { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                   { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                description: [
                   { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                videoUrl: [
                   { required: true, message: "视频地址不能为空", trigger: "blur" }
                ],
            },
            openWoVideopreviewVideo: false,
            rulesWoVideopreviewVideo: {
                woId: [
                    { required: true, message: "工单ID不能为空", trigger: "blur" }
                ],
                stepSeq: [
                    { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                    { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                videoUrl: [
                    { required: true, message: "视频地址不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键SoItem数据 */
        this.getSoItemList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键Wo数据 */
        this.getWoList();
        /** 查询外键WoComputing数据 */
        this.getWoComputingList();
        /** 查询外键SoTrace数据 */
        this.getSoTraceList();
        /** 查询外键WoInfo数据 */
        this.getWoInfoList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listWo(this.queryParams).then(response => {
              this.woList = response.rows;
              this.total = response.total;
              if (this.woList && this.woList.length>0) {
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
                this.getWoMaterialList();
                this.getWoRoutingList();
                this.getWoDrawingList();
                this.getWoSopList();
                this.getWoVideoList();
            }else {
                this.woMaterialList = null;
                this.woRoutingList = null;
                this.woDrawingList = null;
                this.woSopList = null;
                this.woVideoList = null;
            }
        },
        /** 查询外键Unit数据 */
        getUnitList() {
            listUnit().then(res => {
                this.fkUnitList = res.rows;
            });
        },
        /** 查询外键SoItem数据 */
        getSoItemList() {
            listSoItem().then(res => {
                this.fkSoItemList = res.rows;
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
        /** 查询外键Wo数据 */
        getWoList() {
            listWo().then(res => {
                this.fkWoList = res.rows;
            });
        },
        /** 查询外键WoComputing数据 */
        getWoComputingList() {
          listMps().then(res => {
                this.fkMpsList = res.rows;
            });
        },
        /** 查询外键SoTrace数据 */
        getSoTraceList() {
            listSoTrace().then(res => {
                this.fkSoTraceList = res.rows;
            });
        },
        /** 查询外键WoInfo数据 */
        getWoInfoList() {
            listWoInfo().then(res => {
                this.fkWoInfoList = res.rows;
            });
        },
        /** 查询外键MaterialInfo数据 */
        getMaterialInfoList() {
          listMaterialInfo().then(res => {
            this.fkMaterialInfoList = res.rows;
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
        cellStyle({row, column, rowIndex, columnIndex}) {
          var className = "fontSize:12px;padding:1px 0px;";

          if (columnIndex==2 && row.status==3) {
            className = "fontSize:12px; fontWeight:bold; color:rosybrown; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==4) {
            className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==5) {
            className = "fontSize:12px; color:lightgreen; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==8) {
            className = "fontSize:12px; color:green; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==12) {
            className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
          }
          else if (columnIndex==2 && row.status==13) {
            className = "fontSize:12px; color:red; padding:1px 0px;";
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
                    this.form.unitId = item.unitId
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
        /**主表外键MpsId被选择后触发事件*/
        onMpsIdSelection(fkId){
            this.fkMpsList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mpsId = item.id
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
        /**主表外键SoId被选择后触发事件*/
        onSoIdSelection(fkId){
            this.fkSoTraceList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soId = item.id
                }
            });
        },
        /**主表外键SoItemId被选择后触发事件*/
        onSoItemIdSelection(fkId){
            this.fkSoItemList.forEach(item=>{
                if(fkId === item.id){
                    this.form.soItemId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onWoMaterialWoIdSelection(fkId){
            this.fkWoInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoMaterial.woId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onWoMaterialMaterialIdSelection(fkId){
          this.fkMaterialInfoList.forEach(item=>{
            if(fkId === item.id){
              this.formWoMaterial.materialId = item.id
              this.formWoMaterial.materialCode = item.materialCode
              this.formWoMaterial.materialName = item.materialName
              this.formWoMaterial.materialSpec = item.materialSpec
              this.formWoMaterial.unitId = item.unitId
            }
          });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onWoMaterialUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoMaterial.unitId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onWoRoutingWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRouting.woId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onWoRoutingLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRouting.lineId = item.id
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onWoRoutingProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRouting.processId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onWoDrawingWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoDrawing.woId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onWoSopWoIdSelection(fkId){
            this.fkWoInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoSop.woId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onWoVideoWoIdSelection(fkId){
            this.fkWoInfoList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoVideo.woId = item.id
                }
            });
        },

        /** 重设主表的变更对话框数据 */
        resetchangeWo (){
            this.form = {
                id: null,
                billNo: null,
                status: null,
                quantityPlanned: null,
                quantityAssigned: null,
                needDay: null,
                promiseDay: null,
                orderDay: null,
                priority: null,
                woType: null,
                quantityScrap: null,
                quantityRedisp: null,
                quantityRework: null,
                quantityPending: null,
                quantityAod: null,
                quantityOutput: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
       handleEnable(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定发放 工单号为"' + billNoz + '"的数据项吗？').then(function() {
           return enable(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("发放成功");
         }).catch(() => {});
       },
        handleChangeWo(row) {
            const id = row.id || this.ids
            getWo(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeWo = true;
                this.title = "变更工单";
            });
        },
       handleFrozeWo(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 工单号为"' + billNoz + '"的数据项吗？').then(function() {
           return frozeWo(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleDisableWo(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 工单号为"' + billNoz + '"的数据项吗？').then(function() {
           return disableWo(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
        handleExport() {
            this.download('pln/wo/export', {
              ...this.queryParams
            }, `wo_${new Date().getTime()}.xlsx`)
        },
        /** 提交按钮 */
        submitchangeWo() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeWo(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeWo = false;
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
        cancelchangeWo() {
            this.openchangeWo = false;
            this.resetchangeWo();
        },
        /** 查询子表工单备料单数据 */
        getWoMaterialList() {
            var params = {"woId":this.masterId};
            listWoMaterial(params).then(res => {
                this.woMaterialList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoMaterialSelectionChange(selection) {
            this.idsWoMaterial = selection.map(item => item.id)
            this.captionsWoMaterial = selection.map(item => item.seqNo)
            this.singleWoMaterial = selection.length!==1
            this.multipleWoMaterial = !selection.length
        },
        /** 子表工单备料单的CSS行样式 */
        rowClassNameWoMaterial({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoMaterial.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }

            return clsName;
        },
        /** 查询子表工单工艺路线数据 */
        getWoRoutingList() {
            var params = {"woId":this.masterId};
            listWoRouting(params).then(res => {
                this.woRoutingList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingSelectionChange(selection) {
            this.idsWoRouting = selection.map(item => item.id)
            this.captionsWoRouting = selection.map(item => item.seqNo)
            this.singleWoRouting = selection.length!==1
            this.multipleWoRouting = !selection.length
        },
        /** 子表工单工艺路线的CSS行样式 */
        rowClassNameWoRouting({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRouting.includes(row.id)){
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
      resetWoMaterial() {
        this.formWoMaterial = {
          id: null,
          woId: this.masterId,
          seqNo: null,
          quantity: 0,
          unitId:1,
          consumeType: null,
          remark: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
        };
        this.resetForm("formWoMaterial");
        // 按关键字段值来初始化子表单数据
        this.onWoMaterialWoIdSelection(this.masterId);
      },
      handleAddPlnWoMaterial() {
        this.resetWoMaterial();
        this.openWoMaterial = true;
        this.title = "新增物料";
      },
      handleUpdatePlnWoMaterial(row) {
        this.resetWoMaterial();
        const id = row.id || this.idsWoMaterial
        getWoMaterial(id).then(response => {
          this.formWoMaterial = response.data;
          this.openWoMaterial = true;
          this.title = "修改物料";
        });
      },
      handleDeletePlnWoMaterial(row) {
        const ids = row.id || this.idsWoMaterial;
        const seqNoz = row.seqNo || this.captionsWoMaterial;

        this.$modal.confirm('确定删除序号为"' + seqNoz + '"的数据项？').then(function() {
          return delWoMaterial(ids);
        }).then(() => {
          this.getWoMaterialList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 提交按钮 */
      submitWoMaterial() {
        this.$refs["formWoMaterial"].validate(valid => {
          if (valid) {
            if(this.formWoMaterial.id==this.formWoMaterial.id){
              //TODO 上述一行代码须替代或删除

              if (this.formWoMaterial.id != null) {
                updateWoMaterial(this.formWoMaterial)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openWoMaterial = false;
                    this.getWoMaterialList();
                  });
              } else {
                addWoMaterial(this.formWoMaterial)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openWoMaterial = false;
                    this.getWoMaterialList();
                  });
              }
            }
          }
        });
      },
      // 取消子表单按钮
      cancelWoMaterial() {
        this.openWoMaterial = false;
        this.resetWoMaterial();
      },

      // 子表单重置
      resetWoRouting() {
        this.formWoRouting = {
          id: null,
          woId: this.masterId,
          seqNo: null,
          lastSeqNo: null,
          nextSeqNo: null,
          secondsFixed: 0,
          secondsVariable: 0,
          secondsRm: 0,
          secondsSetup: 0,
          secondsStacking: 0,
          secondsTransfer: 0,
          secondsBuffer: 0,
          lineType: null,
          processType: null,
          remark: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
        };
        this.resetForm("formWoRouting");
        // 按关键字段值来初始化子表单数据
        this.onWoRoutingWoIdSelection(this.masterId);
      },
      handleAddPlnWoRouting() {
        this.resetWoRouting();
        this.openWoRouting = true;
        this.title = "新增工序";
      },
      handleUpdatePlnWoRouting(row) {
        this.resetWoRouting();
        const id = row.id || this.idsWoRouting
        getWoRouting(id).then(response => {
          this.formWoRouting = response.data;
          this.openWoRouting = true;
          this.title = "修改工序";
        });
      },
      handleDeletePlnWoRouting(row) {
        const ids = row.id || this.idsWoRouting;
        const seqNoz = row.seqNo || this.captionsWoRouting;

        this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
          return delWoRouting(ids);
        }).then(() => {
          this.getWoRoutingList();
          this.$modal.msgSuccess("删除成功");
        });
      },
      /** 提交按钮 */
      submitWoRouting() {
        this.$refs["formWoRouting"].validate(valid => {
          if (valid) {
            if(this.formWoRouting.id==this.formWoRouting.id){
              //TODO 上述一行代码须替代或删除

              if (this.formWoRouting.id != null) {
                updateWoRouting(this.formWoRouting)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openWoRouting = false;
                    this.getWoRoutingList();
                  });
              } else {
                addWoRouting(this.formWoRouting)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openWoRouting = false;
                    this.getWoRoutingList();
                  });
              }
            }
          }
        });
      },
      // 取消子表单按钮
      cancelWoRouting() {
        this.openWoRouting = false;
        this.resetWoRouting();
      },

      /** 查询子表工单图纸数据 */
        getWoDrawingList() {
            var params = {"woId":this.masterId};
            listWoDrawing(params).then(res => {
                this.woDrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoDrawingSelectionChange(selection) {
            this.idsWoDrawing = selection.map(item => item.id)
            this.captionsWoDrawing = selection.map(item => item.seqNo)
            this.singleWoDrawing = selection.length!==1
            this.multipleWoDrawing = !selection.length
        },
        /** 子表工单图纸的CSS行样式 */
        rowClassNameWoDrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoDrawing.includes(row.id)){
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
        resetWoDrawingpreviewDrawing() {
            this.formWoDrawing = {
                id: null,
                woId: this.masterId,
                seqNo: null,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoDrawing");
            // 按关键字段值来初始化子表单数据
            this.onWoDrawingWoIdSelection(this.masterId);
        },
        handlePreviewDrawing(row) {
          this.resetWoDrawingpreviewDrawing();
          const id = row.id || this.idsWoDrawing
          getWoDrawing(id).then(response => {
            this.formWoDrawing = response.data;
            this.openWoDrawingpreviewDrawing = true;
            this.title = "预览工单图纸";
          });
        },
        /** 查询子表工单SOP数据 */
        getWoSopList() {
            var params = {"woId":this.masterId};
            listWoSop(params).then(res => {
                this.woSopList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoSopSelectionChange(selection) {
            this.idsWoSop = selection.map(item => item.id)
            this.captionsWoSop = selection.map(item => item.stepSeq)
            this.singleWoSop = selection.length!==1
            this.multipleWoSop = !selection.length
        },
        /** 子表工单SOP的CSS行样式 */
        rowClassNameWoSop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoSop.includes(row.id)){
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
        resetWoSoppreviewSop() {
            this.formWoSop = {
                id: null,
                woId: this.masterId,
                stepSeq: null,
                stepTitle: null,
                description: null,
                sopUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoSop");
            // 按关键字段值来初始化子表单数据
            this.onWoSopWoIdSelection(this.masterId);
        },
        handlePreviewSop(row) {
          this.resetWoSoppreviewSop();
          const id = row.id || this.idsWoSop
          getWoSop(id).then(response => {
            this.formWoSop = response.data;
            this.openWoSoppreviewSop = true;
            this.title = "预览工单SOP";
          });
        },
        /** 查询子表工单作业视频数据 */
        getWoVideoList() {
            var params = {"woId":this.masterId};
            listWoVideo(params).then(res => {
                this.woVideoList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoVideoSelectionChange(selection) {
            this.idsWoVideo = selection.map(item => item.id)
            this.captionsWoVideo = selection.map(item => item.stepSeq)
            this.singleWoVideo = selection.length!==1
            this.multipleWoVideo = !selection.length
        },
        /** 子表工单作业视频的CSS行样式 */
        rowClassNameWoVideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoVideo.includes(row.id)){
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
        resetWoVideopreviewVideo() {
            this.formWoVideo = {
                id: null,
                woId: this.masterId,
                stepSeq: null,
                stepTitle: null,
                description: null,
                videoUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoVideo");
            // 按关键字段值来初始化子表单数据
            this.onWoVideoWoIdSelection(this.masterId);
        },
        handlePreviewVideo(row) {
          this.resetWoVideopreviewVideo();
          const id = row.id || this.idsWoVideo
          getWoVideo(id).then(response => {
            this.formWoVideo = response.data;
            this.openWoVideopreviewVideo = true;
            this.title = "预览工单作业视频";
          });
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
