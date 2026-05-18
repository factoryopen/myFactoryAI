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
                  <span slot="label">
                      <span class="fontSize12"><strong>状态</strong></span>
                  </span>
              <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                <el-option
                  v-for="dict in dict.type.manufacturing_status_ml"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
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
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                >补批</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleChangeMl"
                >变更</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-ice-cream-round"
                    size="mini"
                    :disabled="multiple"
                    @click="handleFrozeMl"
                >冻结</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDisableMl"
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
                  :data="mlList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="cellStyle"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="批次号" align="left" prop="billNo"  width="125" show-overflow-tooltip/>
            <el-table-column label="产品编码" align="left" prop="productCode"  width="168" show-overflow-tooltip/>
            <el-table-column label="产品名称" align="left" prop="productName"  width="168" show-overflow-tooltip/>
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
                <el-table-column label="现班组" align="center" prop="currentWorkgroupId"  width="90">
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
            <el-table-column label="产线" align="center" prop="lineId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="批次类型" align="center" prop="mlType" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                </template>
            </el-table-column>
          <el-table-column label="上线日期" align="center" prop="scheduleDay" width="85" fixed="right">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.scheduleDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产交期" align="center" prop="deliveryDay" width="85" fixed="right">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.deliveryDay, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
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
                    <el-select class="inputWidth" v-model="form.productCode" placeholder="请选择产品编码"
                               @change="onProductCodeSelection"  size="mini" >
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
                  <el-input class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="unitId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位"
                               @change="onUnitIdSelection"  size="mini" disabled="true">
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
                <el-form-item  prop="quantityDispatched" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>派工数量</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.quantityDispatched" placeholder="请输入派工数量" size="mini" />
                </el-form-item>
                <el-form-item prop="sourceMlId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>来源批次</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.sourceMlId" placeholder="请选择来源批次"
                             @change="onSourceMlIdSelection"  size="mini" >
                    <el-option
                      v-for="(fkrow, index) in fkMlList"
                      :key="index"
                      :label="fkrow.billNo"
                      :value="fkrow.id"
                      size="mini"
                    ></el-option>
                  </el-select>
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
                <el-form-item prop="deliveryDay" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>生产交期</strong></span>
                          </span>
                  <el-date-picker clearable size="mini"
                                  v-model="form.deliveryDay"
                                  class="inputWidth"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择生产交期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="scheduleDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>上线日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.scheduleDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择上线日期">
                    </el-date-picker>
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
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input type="textarea" :row="3" class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submit">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.openchangeMl对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openchangeMl" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="ruleschangeMl" label-width="120px" :inline-message="true">
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
                    <el-select class="inputWidth" v-model="form.productCode" placeholder="请选择产品编码"
                               @change="onProductCodeSelection"  size="mini" disabled="true">
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
                  <el-input class="inputWidth" v-model="form.productName" placeholder="请选择产品名称" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="productSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品规格</strong></span>
                    </span>
                  <el-input class="inputWidth" v-model="form.productSpec" placeholder="请选择产品规格" size="mini" disabled="true"/>
                </el-form-item>
                <el-form-item prop="unitId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>单位</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位"
                             @change="onUnitIdSelection"  size="mini" disabled="true">
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
                <el-form-item  prop="quantityDispatched" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>派工数量</strong></span>
                      </span>
                  <el-input class="inputWidth" v-model="form.quantityDispatched" placeholder="请输入派工数量" size="mini" />
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
                <el-form-item prop="deliveryDay" class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>生产交期</strong></span>
                        </span>
                  <el-date-picker clearable size="mini"
                                  v-model="form.deliveryDay"
                                  class="inputWidth"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  placeholder="选择生产交期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="scheduleDay" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>上线日期</strong></span>
                    </span>
                    <el-date-picker clearable size="mini"
                                     v-model="form.scheduleDay"
                                     class="inputWidth"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择上线日期">
                    </el-date-picker>
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
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>备注</strong></span>
                    </span>
                    <el-input type="textarea" :rows="3" class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="submitchangeMl">确 定</el-button>
               <el-button @click="cancelchangeMl">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="批次备料单">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlMaterial" border
                        :data="mlMaterialList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlMaterial"
                        @selection-change="handleMlMaterialSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
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
                    <el-table-column label="消耗类型" align="center" prop="consumeType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次移转记录">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlMoves" border
                        :data="mlMovesList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlMoves"
                        @selection-change="handleMlMovesSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="状态" align="center" prop="status" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="工序号" align="center" prop="processSeq" width="60"/>
                    <el-table-column label="工序码" align="center" prop="processId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.processId"
                                    :key="index"
                                    size="mini">{{item.processCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="60"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="60"/>
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
                    <el-table-column label="排配接收时间" align="center" prop="receiveTimeScheduled" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.receiveTimeScheduled, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="排配转出时间" align="center" prop="postTimeScheduled" width="120">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.postTimeScheduled, '{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
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
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次图纸">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlDrawing" border
                        :data="mlDrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlDrawing"
                        @selection-change="handleMlDrawingSelectionChange"
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
            <el-tab-pane label="批次SOP">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlSop" border
                        :data="mlSopList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlSop"
                        @selection-change="handleMlSopSelectionChange"
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
            <el-tab-pane label="批次作业视频">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="mlVideo" border
                        :data="mlVideoList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlVideo"
                        @selection-change="handleMlVideoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="视频地址" align="left" prop="videoUrl" width="400"/>
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

        <!-- 创建slaver.openMlDrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlDrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formMlDrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openMlSoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlSoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.formMlSop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openMlVideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlVideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.formMlVideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listMl, getMl, delMl, addMl, updateMl } from "@/api/pln/ml";
import {getNextBillno, updateBillSeq } from "@/api/pln/ml";
import { changeMl,frozeMl,disableMl } from "@/api/pln/ml";
import { listMlMaterial, getMlMaterial, delMlMaterial, addMlMaterial, updateMlMaterial } from "@/api/pln/mlMaterial";
import { listMlMoves, getMlMoves, delMlMoves, addMlMoves, updateMlMoves } from "@/api/pln/mlMoves";
import { listMlDrawing, getMlDrawing, delMlDrawing, addMlDrawing, updateMlDrawing } from "@/api/pln/mlDrawing";
import { listMlSop, getMlSop, delMlSop, addMlSop, updateMlSop } from "@/api/pln/mlSop";
import { listMlVideo, getMlVideo, delMlVideo, addMlVideo, updateMlVideo } from "@/api/pln/mlVideo";
import { listMlHistoryTail, getMlHistoryTail, delMlHistoryTail, addMlHistoryTail, updateMlHistoryTail } from "@/api/exe/mlHistoryTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listWo} from "@/api/pln/wo";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listMlHistory} from "@/api/exe/mlHistory";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import pdf from "vue-pdf";

export default {
    name: "Ml",
    components: {pdf},
    dicts: ['manufacturing_status_ml', 'manufacturing_status_move', 'bill_priority', 'pln_ml_type', 'eng_material_consumingtype', 'sys_yes_no', 'res_type_line', 'eng_process_type'],
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
            // 批次管理表格数据
            mlList: [],
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
            fkMlTraceList: [],
            fkMlHistoryList: [],
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
                productId: [
                    { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                sourceMlId: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                ],
                priority: [
                  { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                deliveryDay: [
                  { required: true, message: "生产交期不能为空", trigger: "blur" }
                ],
                lineId: [
                  { required: true, message: "产线不能为空", trigger: "blur" }
                ],
            },
            openchangeMl: false,
            ruleschangeMl: {
                quantityDispatched: [
                    { required: true, message: "派工数量不能为空", trigger: "blur" }
                ],
                priority: [
                  { required: true, message: "优先级不能为空", trigger: "change" }
                ],
                deliveryDay: [
                  { required: true, message: "生产交期不能为空", trigger: "blur" }
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
            //子表信息
            mlMaterialList:[],
            // 选中数组
            idsMlMaterial: [],
            captionsMlMaterial: [],
            // 非单个禁用
            singleMlMaterial: true,
            // 非多个禁用
            multipleMlMaterial: true,
            // 子表选中数据
            checkedMlMaterial: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlMaterial: false,
            formMlMaterial: {},
            rulesMlMaterial: {
                mlId: [
                   { required: true, message: "制造批不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
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
            mlMovesList:[],
            // 选中数组
            idsMlMoves: [],
            captionsMlMoves: [],
            // 非单个禁用
            singleMlMoves: true,
            // 非多个禁用
            multipleMlMoves: true,
            // 子表选中数据
            checkedMlMoves: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlMoves: false,
            formMlMoves: {},
            rulesMlMoves: {
                mlId: [
                   { required: true, message: "制造批不能为空", trigger: "blur" }
                ],
                status: [
                   { required: true, message: "状态不能为空", trigger: "change" }
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
            },
            //子表信息
            mlDrawingList:[],
            // 选中数组
            idsMlDrawing: [],
            captionsMlDrawing: [],
            // 非单个禁用
            singleMlDrawing: true,
            // 非多个禁用
            multipleMlDrawing: true,
            // 子表选中数据
            checkedMlDrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlDrawing: false,
            formMlDrawing: {},
            rulesMlDrawing: {
                mlId: [
                   { required: true, message: "制造批不能为空", trigger: "blur" }
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
            openMlDrawingpreviewDrawing: false,
            rulesMlDrawingpreviewDrawing: {
                mlId: [
                    { required: true, message: "制造批不能为空", trigger: "blur" }
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
            mlSopList:[],
            // 选中数组
            idsMlSop: [],
            captionsMlSop: [],
            // 非单个禁用
            singleMlSop: true,
            // 非多个禁用
            multipleMlSop: true,
            // 子表选中数据
            checkedMlSop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlSop: false,
            formMlSop: {},
            rulesMlSop: {
                mlId: [
                   { required: true, message: "批次ID不能为空", trigger: "blur" }
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
            openMlSoppreviewSop: false,
            rulesMlSoppreviewSop: {
                mlId: [
                    { required: true, message: "批次ID不能为空", trigger: "blur" }
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
            mlVideoList:[],
            // 选中数组
            idsMlVideo: [],
            captionsMlVideo: [],
            // 非单个禁用
            singleMlVideo: true,
            // 非多个禁用
            multipleMlVideo: true,
            // 子表选中数据
            checkedMlVideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlVideo: false,
            formMlVideo: {},
            rulesMlVideo: {
                mlId: [
                   { required: true, message: "批次ID不能为空", trigger: "blur" }
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
            openMlVideopreviewVideo: false,
            rulesMlVideopreviewVideo: {
                mlId: [
                    { required: true, message: "批次ID不能为空", trigger: "blur" }
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
            //子表信息
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
            rulesMlHistoryTail: {
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
        /** 查询外键MlTrace数据 */
        this.getMlTraceList();
        /** 查询外键MlHistory数据 */
        this.getMlHistoryList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMl(this.queryParams).then(response => {
              this.mlList = response.rows;
              this.total = response.total;
              if (this.mlList && this.mlList.length>0) {
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
                this.getMlMaterialList();
                this.getMlMovesList();
                this.getMlDrawingList();
                this.getMlSopList();
                this.getMlVideoList();
                this.getMlHistoryTailList();
            }else {
                this.mlMaterialList = null;
                this.mlMovesList = null;
                this.mlDrawingList = null;
                this.mlSopList = null;
                this.mlVideoList = null;
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
        /** 查询外键Dept数据 */
        getDeptList() {
            listDept().then(res => {
                this.fkDeptList = res.data;
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
          listMaterialInfo().then(res => {
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
        /** 查询外键MlTrace数据 */
        getMlTraceList() {
            listMlTrace().then(res => {
                this.fkMlTraceList = res.rows;
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

          if (columnIndex==4 && row.status==4) {
            className = "fontSize:12px; fontWeight:bold; color:orange; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==5) {
            className = "fontSize:12px; fontWeight:bold; color:blue; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==8) {
            className = "fontSize:12px; fontWeight:bold; color:dodgerblue; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==9) {
            className = "fontSize:12px; fontWeight:bold; color:green; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==11) {
            className = "fontSize:12px; color:darkgreen; padding:1px 0px;";
          }
          else if (columnIndex==4 && row.status==13) {
            className = "fontSize:12px; color:darkred; padding:1px 0px;";
          }

          return className;
        },
        /**主表外键ProductId被选择后触发事件*/
        onProductCodeSelection(fkCode){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.materialCode){
                    this.form.productId = item.id;
                    this.form.productName = item.materialName;
                    this.form.productSpec = item.materialSpec;
                    this.form.drawNo = item.drawNo;
                    this.form.unitId = item.unitId;
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
        /**主表外键StartBy被选择后触发事件*/
        onStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                }
            });
        },
        /**主表外键FinishBy被选择后触发事件*/
        onFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.startBy = item.userId
                    this.form.finishBy = item.userId
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onMlMaterialMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMaterial.mlId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlMaterialUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMaterial.unitId = item.id
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onMlMovesMlIdSelection(fkId){
            this.fkMlHistoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.mlId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onMlMovesProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.productId = item.id
                    this.formMlMoves.productName = item.materialName
                    this.formMlMoves.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onMlMovesProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.processId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMlMovesLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.lineId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlMovesUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.unitId = item.id
                }
            });
        },
        /** 子表外键DeptId被选择后触发事件 **/
        onMlMovesDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.deptId = item.deptId
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onMlMovesGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.groupId = item.id
                }
            });
        },
        /** 子表外键ReceiveBy被选择后触发事件 **/
        onMlMovesReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.receiveBy = item.userId
                }
            });
        },
        /** 子表外键PostBy被选择后触发事件 **/
        onMlMovesPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlMoves.receiveBy = item.userId
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onMlDrawingMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlDrawing.mlId = item.id
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onMlSopMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlSop.mlId = item.id
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onMlVideoMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlVideo.mlId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onMlHistoryTailProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.productId = item.id
                    this.formMlHistoryTail.productName = item.materialName
                    this.formMlHistoryTail.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键CurrentProcessId被选择后触发事件 **/
        onMlHistoryTailCurrentProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.currentProcessId = item.id
                }
            });
        },
        /** 子表外键CurrentWorkgroupId被选择后触发事件 **/
        onMlHistoryTailCurrentWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.currentWorkgroupId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onMlHistoryTailUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.unitId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMlHistoryTailLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.lineId = item.id
                }
            });
        },
        /** 子表外键ProjectId被选择后触发事件 **/
        onMlHistoryTailProjectIdSelection(fkId){
            this.fkProjectList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.projectId = item.id
                }
            });
        },
        /** 子表外键SourceMlId被选择后触发事件 **/
        onMlHistoryTailSourceMlIdSelection(fkId){
            this.fkMlList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.sourceMlId = item.id
                }
            });
        },
        /** 子表外键WoId被选择后触发事件 **/
        onMlHistoryTailWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.woId = item.id
                }
            });
        },
        /** 子表外键DispatchingBy被选择后触发事件 **/
        onMlHistoryTailDispatchingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键AcceptingBy被选择后触发事件 **/
        onMlHistoryTailAcceptingBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键StartBy被选择后触发事件 **/
        onMlHistoryTailStartBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键FinishBy被选择后触发事件 **/
        onMlHistoryTailFinishBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },
        /** 子表外键StockinBy被选择后触发事件 **/
        onMlHistoryTailStockinBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlHistoryTail.dispatchingBy = item.userId
                }
            });
        },

        /** 重设主表的补批对话框数据 */
        reset (){
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
                dispatchingBy: null,
                acceptingTime: null,
                acceptingBy: null,
                startTime: null,
                finishTime: null,
                stockreqTime: null,
                stockreqBy: null,
                stockinTime: null,
                stockinBy: null,
                remark: null,
                createTime: null,
                createBy: null,
                updateTime: null,
                updateBy: null
            };
            this.resetForm("form");
        },
        /** 重设主表的变更对话框数据 */
        resetchangeMl (){
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
                dispatchingBy: null,
                acceptingTime: null,
                acceptingBy: null,
                startTime: null,
                finishTime: null,
                stockreqTime: null,
                stockreqBy: null,
                stockinTime: null,
                stockinBy: null,
                remark: null,
                createTime: null,
                createBy: null,
                updateTime: null,
                updateBy: null
            };
            this.resetForm("form");
        },
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "补批批次管理";
            getNextBillno("440").then(res => {
              this.form.billNo = res
            });
        },
        handleChangeMl(row) {
            const id = row.id || this.ids
            getMl(id).then(response => {
                this.form = response.data;
                //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
                this.openchangeMl = true;
                this.title = "变更制造批";
            });
        },
       handleFrozeMl(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定冻结 批次号为"' + billNoz + '"的数据项吗？').then(function() {
           return frozeMl(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("冻结成功");
         }).catch(() => {});
       },
       handleDisableMl(row) {
         const ids = row.id || this.ids;
         const billNoz = row.billNo || this.captions;

         this.$modal.confirm('确定停用 批次号为"' + billNoz + '"的数据项吗？').then(function() {
           return disableMl(ids);
         }).then(() => {
           this.getMasterList();
           this.$modal.msgSuccess("停用成功");
         }).catch(() => {});
       },
        handleExport() {
            this.download('pln/ml/export', {
              ...this.queryParams
            }, `ml_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateMl(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMl(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                        updateBillSeq("440").then(res => {});
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

        /** 提交按钮 */
        submitchangeMl() {
          this.$refs["form"].validate(valid => {
              if (valid) {
                if(this.form.id==this.form.id){
                  this.form.params = {"id":this.form.id};
                  //TODO 上述两行代码须替代或删除

                  changeMl(this.form)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openchangeMl = false;
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
        cancelchangeMl() {
            this.openchangeMl = false;
            this.resetchangeMl();
        },



        /** 查询子表批次备料单数据 */
        getMlMaterialList() {
            var params = {"mlId":this.masterId};
            listMlMaterial(params).then(res => {
                this.mlMaterialList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlMaterialSelectionChange(selection) {
            this.idsMlMaterial = selection.map(item => item.id)
            this.captionsMlMaterial = selection.map(item => item.seqNo)
            this.singleMlMaterial = selection.length!==1
            this.multipleMlMaterial = !selection.length
        },
        /** 子表批次备料单的CSS行样式 */
        rowClassNameMlMaterial({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlMaterial.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }


            return clsName;
        },
        /** 查询子表批次移转记录数据 */
        getMlMovesList() {
            var params = {"mlId":this.masterId};
            listMlMoves(params).then(res => {
                this.mlMovesList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlMovesSelectionChange(selection) {
            this.idsMlMoves = selection.map(item => item.id)
            this.captionsMlMoves = selection.map(item => item.productName)
            this.singleMlMoves = selection.length!==1
            this.multipleMlMoves = !selection.length
        },
        /** 子表批次移转记录的CSS行样式 */
        rowClassNameMlMoves({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlMoves.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }


            return clsName;
        },
        /** 查询子表批次图纸数据 */
        getMlDrawingList() {
            var params = {"mlId":this.masterId};
            listMlDrawing(params).then(res => {
                this.mlDrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlDrawingSelectionChange(selection) {
            this.idsMlDrawing = selection.map(item => item.id)
            this.captionsMlDrawing = selection.map(item => item.seqNo)
            this.singleMlDrawing = selection.length!==1
            this.multipleMlDrawing = !selection.length
        },
        /** 子表批次图纸的CSS行样式 */
        rowClassNameMlDrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlDrawing.includes(row.id)){
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
        resetMlDrawingpreviewDrawing() {
            this.formMlDrawing = {
                id: null,
                mlId: this.masterId,
                seqNo: null,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMlDrawing");
            // 按关键字段值来初始化子表单数据
            this.onMlDrawingMlIdSelection(this.masterId);
        },
        handlePreviewDrawing(row) {
          this.resetMlDrawingpreviewDrawing();
          const id = row.id || this.idsMlDrawing
          getMlDrawing(id).then(response => {
            this.formMlDrawing = response.data;
            this.openMlDrawingpreviewDrawing = true;
            this.title = "预览批次图纸";
          });
        },
        /** 查询子表批次SOP数据 */
        getMlSopList() {
            var params = {"mlId":this.masterId};
            listMlSop(params).then(res => {
                this.mlSopList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlSopSelectionChange(selection) {
            this.idsMlSop = selection.map(item => item.id)
            this.captionsMlSop = selection.map(item => item.stepSeq)
            this.singleMlSop = selection.length!==1
            this.multipleMlSop = !selection.length
        },
        /** 子表批次SOP的CSS行样式 */
        rowClassNameMlSop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlSop.includes(row.id)){
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
        resetMlSoppreviewSop() {
            this.formMlSop = {
                id: null,
                mlId: this.masterId,
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
            this.resetForm("formMlSop");
            // 按关键字段值来初始化子表单数据
            this.onMlSopMlIdSelection(this.masterId);
        },
        handlePreviewSop(row) {
          this.resetMlSoppreviewSop();
          const id = row.id || this.idsMlSop
          getMlSop(id).then(response => {
            this.formMlSop = response.data;
            this.openMlSoppreviewSop = true;
            this.title = "预览批次SOP";
          });
        },
        /** 查询子表批次作业视频数据 */
        getMlVideoList() {
            var params = {"mlId":this.masterId};
            listMlVideo(params).then(res => {
                this.mlVideoList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlVideoSelectionChange(selection) {
            this.idsMlVideo = selection.map(item => item.id)
            this.captionsMlVideo = selection.map(item => item.stepSeq)
            this.singleMlVideo = selection.length!==1
            this.multipleMlVideo = !selection.length
        },
        /** 子表批次作业视频的CSS行样式 */
        rowClassNameMlVideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlVideo.includes(row.id)){
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
        resetMlVideopreviewVideo() {
            this.formMlVideo = {
                id: null,
                mlId: this.masterId,
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
            this.resetForm("formMlVideo");
            // 按关键字段值来初始化子表单数据
            this.onMlVideoMlIdSelection(this.masterId);
        },
        handlePreviewVideo(row) {
          this.resetMlVideopreviewVideo();
          const id = row.id || this.idsMlVideo
          getMlVideo(id).then(response => {
            this.formMlVideo = response.data;
            this.openMlVideopreviewVideo = true;
            this.title = "预览批次作业视频";
          });
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
