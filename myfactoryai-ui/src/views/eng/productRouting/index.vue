<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">


            <el-form-item prop="productId" class="marginBottom5" >
              <span slot="label">
                  <span class="fontSize12"><strong>产品编码</strong></span>
              </span>
              <el-select class="searchInput" v-model="queryParams.productId" filterable placeholder="请选择产品" size="mini">
                <el-option
                  v-for="(fkrow, index) in fkMaterialList"
                  :key="index"
                  :label="fkrow.materialCode+' '+fkrow.materialName"
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
                    type="primary"
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDelete"
                >删除</el-button>
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
                  height="460px"
                  :data="productRoutingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="项序" align="center" prop="seqNo"  width="55"/>
               <el-table-column label="产线" align="center" prop="lineId"  width="100">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="工序" align="center" prop="processId"  width="100">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processName}}</span>
                    </template>
                </template>
            </el-table-column>
                <el-table-column label="上序号" align="center" prop="lastSeqNo"  width="60"/>
                <el-table-column label="下序号" align="center" prop="nextSeqNo"  width="60"/>
                <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="110"/>
                <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="110"/>
                <el-table-column label="备料秒数" align="right" prop="secondsRm" width="90"/>
                <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="90"/>
                <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="90"/>
                <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="90"/>
                <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="90"/>
              <el-table-column label="工序类型" align="center" prop="processType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
                </template>
            </el-table-column>
              <el-table-column label="产线类型" align="center" prop="lineType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_type_line" :value="scope.row.lineType"/>
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
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
                <el-form-item prop="productId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产品编码</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.productId" placeholder="请选择产品编码"
                               @change="onProductIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProductBasisList"
                            :key="index"
                            :label="fkrow.materialName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="seqNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>项序</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.seqNo" placeholder="请输入项序" size="mini" />
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
                <el-form-item prop="processId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>工序</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processId" placeholder="请选择工序"
                               @change="onProcessIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkProcessList"
                            :key="index"
                            :label="fkrow.processName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="lastSeqNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>上序号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.lastSeqNo" placeholder="请输入上序号" size="mini" />
                </el-form-item>
                <el-form-item  prop="nextSeqNo" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>下序号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.nextSeqNo" placeholder="请输入下序号" size="mini" />
                </el-form-item>
                <el-form-item prop="secondsFixed" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>标准固定秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsFixed" placeholder="请选择标准固定秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsFixed"
                        :value="fkrow.secondsFixed"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsVariable" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>标准可变秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsVariable" placeholder="请选择标准可变秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsVariable"
                        :value="fkrow.secondsVariable"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsRm" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>备料秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsRm" placeholder="请选择备料秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsRm"
                        :value="fkrow.secondsRm"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsSetup" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>架机秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsSetup" placeholder="请选择架机秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsSetup"
                        :value="fkrow.secondsSetup"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsStacking" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>堆垛秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsStacking" placeholder="请选择堆垛秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsStacking"
                        :value="fkrow.secondsStacking"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsTransfer" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>移转秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsTransfer" placeholder="请选择移转秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsTransfer"
                        :value="fkrow.secondsTransfer"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="secondsBuffer" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>缓冲秒数</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.secondsBuffer" placeholder="请选择缓冲秒数" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkProcessList"
                        :key="index"
                        :label="fkrow.secondsBuffer"
                        :value="fkrow.secondsBuffer"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="processType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>工序类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.processType" placeholder="请选择工序类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.eng_process_type"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="lineType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>产线类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.lineType" placeholder="请选择产线类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.res_type_line"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
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
               <el-button type="primary" @click="submit">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="产品关重料">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductRoutingkiparts"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductRoutingkiparts"
                            @click="handleUpdateEngProductRoutingkiparts"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductRoutingkiparts"
                            @click="handleDeleteEngProductRoutingkiparts"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="productRoutingkiparts" border
                        :data="productRoutingkipartsList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductRoutingkiparts"
                        @selection-change="handleProductRoutingkipartsSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="物料编码" align="left" prop="materialId"  width="168">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMaterialList">
                                <span v-if="item.id==scope.row.materialId"
                                    :key="index"
                                    size="mini">{{item.materialCode}}
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
                               @click="handleUpdateEngProductRoutingkiparts(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngProductRoutingkiparts(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品工具">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductRoutingtool"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductRoutingtool"
                            @click="handleUpdateEngProductRoutingtool"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductRoutingtool"
                            @click="handleDeleteEngProductRoutingtool"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="productRoutingtool" border
                        :data="productRoutingtoolList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductRoutingtool"
                        @selection-change="handleProductRoutingtoolSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="right" prop="itemSeq" width="50"/>
                    <el-table-column label="工具类型" align="center" prop="toolId"  width="110">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkToolList">
                                <span v-if="item.id==scope.row.toolId"
                                    :key="index"
                                    size="mini">{{item.toolDesc}}
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
                               @click="handleUpdateEngProductRoutingtool(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngProductRoutingtool(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品工序图">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductRoutingdrawing"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductRoutingdrawing"
                            @click="handleUpdateEngProductRoutingdrawing"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductRoutingdrawing"
                            @click="handleDeleteEngProductRoutingdrawing"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="productRoutingdrawing" border
                        :data="productRoutingdrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductRoutingdrawing"
                        @selection-change="handleProductRoutingdrawingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="图纸描述" align="left" prop="description" width="500"/>
                    <el-table-column label="图纸链接" align="center" prop="drawingUrl" width="400"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewDrawing(scope.row)"
                           >预览</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngProductRoutingdrawing(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品SOP">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngPruductRoutingsop"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePruductRoutingsop"
                            @click="handleUpdateEngPruductRoutingsop"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePruductRoutingsop"
                            @click="handleDeleteEngPruductRoutingsop"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pruductRoutingsop" border
                        :data="pruductRoutingsopList"
                        highlight-current-row
                        :row-class-name="rowClassNamePruductRoutingsop"
                        @selection-change="handlePruductRoutingsopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="left" prop="stepTitle" width="140"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="SOP地址" align="left" prop="sopUrl" width="400"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewSop(scope.row)"
                           >预览</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngPruductRoutingsop(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品作业视频">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngPruductRoutingvideo"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePruductRoutingvideo"
                            @click="handleUpdateEngPruductRoutingvideo"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                            icon="el-icon-download"
                            :disabled="multiplePruductRoutingvideo"
                            @click="handleExportEngPruductRoutingvideo"
                        >导出</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pruductRoutingvideo" border
                        :data="pruductRoutingvideoList"
                        highlight-current-row
                        :row-class-name="rowClassNamePruductRoutingvideo"
                        @selection-change="handlePruductRoutingvideoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="left" prop="stepTitle" width="140"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="视频地址" align="left" prop="videoUrl" width="400"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-view"
                               @click="handlePreviewVideo(scope.row)"
                           >预览</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngPruductRoutingvideo(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openProductRoutingkiparts对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductRoutingkiparts" width="500px" append-to-body>
            <el-form ref="formProductRoutingkiparts" :model="formProductRoutingkiparts" :rules="rulesProductRoutingkiparts" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formProductRoutingkiparts.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductRoutingkiparts.materialId" placeholder="请选择物料编码"
                                 @change="onProductRoutingkipartsMaterialIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMaterialList"
                             :key="index"
                             :label="fkrow.materialCode"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRoutingkiparts.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductRoutingkiparts">确 定</el-button>
                <el-button @click="cancelProductRoutingkiparts">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openProductRoutingtool对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductRoutingtool" width="500px" append-to-body>
            <el-form ref="formProductRoutingtool" :model="formProductRoutingtool" :rules="rulesProductRoutingtool" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>路线</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formProductRoutingtool.routingId" placeholder="请输入路线" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="itemSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRoutingtool.itemSeq" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="toolId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工具类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductRoutingtool.toolId" placeholder="请选择工具类型"
                                 @change="onProductRoutingtoolToolIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkToolList"
                             :key="index"
                             :label="fkrow.toolDesc"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRoutingtool.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductRoutingtool">确 定</el-button>
                <el-button @click="cancelProductRoutingtool">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openProductRoutingdrawing对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductRoutingdrawing" width="500px" append-to-body>
            <el-form ref="formProductRoutingdrawing" :model="formProductRoutingdrawing" :rules="rulesProductRoutingdrawing" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formProductRoutingdrawing.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRoutingdrawing.description" placeholder="请输入图纸描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸链接</strong></span>
                      </span>
                      <imageUpload class="inputWidth" v-model="formProductRoutingdrawing.drawingUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRoutingdrawing.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductRoutingdrawing">确 定</el-button>
                <el-button @click="cancelProductRoutingdrawing">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openProductRoutingdrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openProductRoutingdrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formProductRoutingdrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openPruductRoutingsop对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPruductRoutingsop" width="500px" append-to-body>
            <el-form ref="formPruductRoutingsop" :model="formPruductRoutingsop" :rules="rulesPruductRoutingsop" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPruductRoutingsop.routingId" placeholder="请输入产品路线" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingsop.stepSeq" placeholder="请输入步号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingsop.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingsop.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>SOP地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formPruductRoutingsop.sopUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingsop.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPruductRoutingsop">确 定</el-button>
                <el-button @click="cancelPruductRoutingsop">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openPruductRoutingsoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openPruductRoutingsoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.formPruductRoutingsop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openPruductRoutingvideo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPruductRoutingvideo" width="500px" append-to-body>
            <el-form ref="formPruductRoutingvideo" :model="formPruductRoutingvideo" :rules="rulesPruductRoutingvideo" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPruductRoutingvideo.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingvideo.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingvideo.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingvideo.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>视频地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formPruductRoutingvideo.videoUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductRoutingvideo.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPruductRoutingvideo">确 定</el-button>
                <el-button @click="cancelPruductRoutingvideo">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openPruductRoutingvideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openPruductRoutingvideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.openPruductRoutingvideopreviewVideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listProductRouting, getProductRouting, delProductRouting, addProductRouting, updateProductRouting } from "@/api/eng/productRouting";
import { listProductRoutingkiparts, getProductRoutingkiparts, delProductRoutingkiparts, addProductRoutingkiparts, updateProductRoutingkiparts } from "@/api/eng/productRoutingkiparts";
import { listProductRoutingtool, getProductRoutingtool, delProductRoutingtool, addProductRoutingtool, updateProductRoutingtool } from "@/api/eng/productRoutingtool";
import { listProductRoutingdrawing, getProductRoutingdrawing, delProductRoutingdrawing, addProductRoutingdrawing, updateProductRoutingdrawing } from "@/api/eng/productRoutingdrawing";
import { listPruductRoutingsop, getPruductRoutingsop, delPruductRoutingsop, addPruductRoutingsop, updatePruductRoutingsop } from "@/api/eng/pruductRoutingsop";
import { listPruductRoutingvideo, getPruductRoutingvideo, delPruductRoutingvideo, addPruductRoutingvideo, updatePruductRoutingvideo } from "@/api/eng/pruductRoutingvideo";
import { listProcess} from "@/api/eng/process";
import { listProductingMaterialInfo} from "@/api/eng/materialInfo";
import { listLine} from "@/api/res/line";
import { listTool} from "@/api/res/tool";
import { listProductBasis} from "@/api/eng/productBasis";
import pdf from "vue-pdf";

export default {
    name: "ProductRouting",
    components: {pdf},
    dicts: ['eng_process_type', 'res_type_line'],
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
            // 制造工艺管理表格数据
            productRoutingList: [],
            fkProcessList: [],
            fkProductRoutingList: [],
            fkMaterialList: [],
            fkLineList: [],
            fkToolList: [],
            fkProductBasisList: [],
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
                processType: [
                    { required: true, message: "工序类型不能为空", trigger: "change" }
                ],
                lineType: [
                    { required: true, message: "产线类型不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              productId: null,
              seqNo: null,
              lineId: null,
              processId: null,
              lastSeqNo: null,
              nextSeqNo: null,
              secondsFixed: null,
              secondsVariable: null,
              secondsRm: null,
              secondsSetup: null,
              secondsStacking: null,
              secondsTransfer: null,
              secondsBuffer: null,
              processType: null,
              lineType: null,
            },
            //子表信息
            productRoutingkipartsList:[],
            // 选中数组
            idsProductRoutingkiparts: [],
            captionsProductRoutingkiparts: [],
            // 非单个禁用
            singleProductRoutingkiparts: true,
            // 非多个禁用
            multipleProductRoutingkiparts: true,
            // 子表选中数据
            checkedProductRoutingkiparts: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductRoutingkiparts: false,
            formProductRoutingkiparts: {},
            rulesProductRoutingkiparts: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            productRoutingtoolList:[],
            // 选中数组
            idsProductRoutingtool: [],
            captionsProductRoutingtool: [],
            // 非单个禁用
            singleProductRoutingtool: true,
            // 非多个禁用
            multipleProductRoutingtool: true,
            // 子表选中数据
            checkedProductRoutingtool: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductRoutingtool: false,
            formProductRoutingtool: {},
            rulesProductRoutingtool: {
                routingId: [
                   { required: true, message: "路线不能为空", trigger: "blur" }
                ],
                itemSeq: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                toolId: [
                   { required: true, message: "工具类型不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            productRoutingdrawingList:[],
            // 选中数组
            idsProductRoutingdrawing: [],
            captionsProductRoutingdrawing: [],
            // 非单个禁用
            singleProductRoutingdrawing: true,
            // 非多个禁用
            multipleProductRoutingdrawing: true,
            // 子表选中数据
            checkedProductRoutingdrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductRoutingdrawing: false,
            formProductRoutingdrawing: {},
            rulesProductRoutingdrawing: {
                routingId: [
                   { required: true, message: "产品路线ID不能为空", trigger: "blur" }
                ],
                description: [
                   { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                   { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            openProductRoutingdrawingpreviewDrawing: false,
            rulesProductRoutingdrawingpreviewDrawing: {
                routingId: [
                    { required: true, message: "产品路线ID不能为空", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                    { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            pruductRoutingsopList:[],
            // 选中数组
            idsPruductRoutingsop: [],
            captionsPruductRoutingsop: [],
            // 非单个禁用
            singlePruductRoutingsop: true,
            // 非多个禁用
            multiplePruductRoutingsop: true,
            // 子表选中数据
            checkedPruductRoutingsop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPruductRoutingsop: false,
            formPruductRoutingsop: {},
            rulesPruductRoutingsop: {
                routingId: [
                   { required: true, message: "产品路线不能为空", trigger: "blur" }
                ],
                stepSeq: [
                   { required: true, message: "步号不能为空", trigger: "blur" }
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
            openPruductRoutingsoppreviewSop: false,
            rulesPruductRoutingsoppreviewSop: {
                routingId: [
                    { required: true, message: "产品路线不能为空", trigger: "blur" }
                ],
                stepSeq: [
                    { required: true, message: "步号不能为空", trigger: "blur" }
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
            pruductRoutingvideoList:[],
            // 选中数组
            idsPruductRoutingvideo: [],
            captionsPruductRoutingvideo: [],
            // 非单个禁用
            singlePruductRoutingvideo: true,
            // 非多个禁用
            multiplePruductRoutingvideo: true,
            // 子表选中数据
            checkedPruductRoutingvideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPruductRoutingvideo: false,
            formPruductRoutingvideo: {},
            rulesPruductRoutingvideo: {
                routingId: [
                   { required: true, message: "产品路线ID不能为空", trigger: "blur" }
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
            openPruductRoutingvideopreviewVideo: false,
            rulesPruductRoutingvideopreviewVideo: {
                routingId: [
                    { required: true, message: "产品路线ID不能为空", trigger: "blur" }
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
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键ProductRouting数据 */
        this.getProductRoutingList();
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Tool数据 */
        this.getToolList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listProductRouting(this.queryParams).then(response => {
              this.productRoutingList = response.rows;
              this.total = response.total;
              if (this.productRoutingList && this.productRoutingList.length>0) {
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
                this.getProductRoutingkipartsList();
                this.getProductRoutingtoolList();
                this.getProductRoutingdrawingList();
                this.getPruductRoutingsopList();
                this.getPruductRoutingvideoList();
            }else {
                this.productRoutingkipartsList = null;
                this.productRoutingtoolList = null;
                this.productRoutingdrawingList = null;
                this.pruductRoutingsopList = null;
                this.pruductRoutingvideoList = null;
            }
        },
        /** 查询外键Process数据 */
        getProcessList() {
            listProcess().then(res => {
                this.fkProcessList = res.rows;
            });
        },
        /** 查询外键ProductRouting数据 */
        getProductRoutingList() {
            listProductRouting().then(res => {
                this.fkProductRoutingList = res.rows;
            });
        },
        /** 查询外键Material数据 */
        getMaterialList() {
          listProductingMaterialInfo().then(res => {
                this.fkMaterialList = res.rows;
            });
        },
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
            });
        },
        /** 查询外键Tool数据 */
        getToolList() {
            listTool().then(res => {
                this.fkToolList = res.rows;
            });
        },
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
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
            this.captions = selection.map(item => item.seqNo)
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
        /**主表外键ProcessId被选择后触发事件*/
        onProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.processId = item.id
                    this.form.secondsFixed = item.secondsFixed
                    this.form.secondsVariable = item.secondsVariable
                    this.form.secondsRm = item.secondsRm
                    this.form.secondsSetup = item.secondsSetup
                    this.form.secondsStacking = item.secondsStacking
                    this.form.secondsTransfer = item.secondsTransfer
                    this.form.secondsBuffer = item.secondsBuffer
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onProductRoutingkipartsRoutingIdSelection(fkId){
            this.fkProductRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRoutingkiparts.routingId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onProductRoutingkipartsMaterialIdSelection(fkId){
            this.fkMaterialList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRoutingkiparts.materialId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onProductRoutingtoolRoutingIdSelection(fkId){
            this.fkProductRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRoutingtool.routingId = item.id
                }
            });
        },
        /** 子表外键ToolId被选择后触发事件 **/
        onProductRoutingtoolToolIdSelection(fkId){
            this.fkToolList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRoutingtool.toolId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onProductRoutingdrawingRoutingIdSelection(fkId){
            this.fkProductRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRoutingdrawing.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onPruductRoutingsopRoutingIdSelection(fkId){
            this.fkProductRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formPruductRoutingsop.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onPruductRoutingvideoRoutingIdSelection(fkId){
            this.fkProductRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formPruductRoutingvideo.routingId = item.id
                }
            });
        },
        /** 重设主表的新增对话框数据 */
        reset (){
            this.form = {
                id: null,
                seqNo: null,
                lastSeqNo: null,
                nextSeqNo: null,
                processType: null,
                lineType: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增制造工艺管理";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getProductRouting(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改制造工艺管理";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const seqNoz = row.seqNo || this.captions;
            this.$modal.confirm('确认删除项序为"' + seqNoz + '"的数据项？').then(function() {
                return delProductRouting(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('eng/productRouting/export', {
              ...this.queryParams
            }, `productRouting_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateProductRouting(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        });
                    } else {
                        addProductRouting(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        });
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
        /** 查询子表产品关重料数据 */
        getProductRoutingkipartsList() {
            var params = {"routingId":this.masterId};
            listProductRoutingkiparts(params).then(res => {
                this.productRoutingkipartsList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductRoutingkipartsSelectionChange(selection) {
            this.idsProductRoutingkiparts = selection.map(item => item.id)
            this.captionsProductRoutingkiparts = selection.map(item => item.id)
            this.singleProductRoutingkiparts = selection.length!==1
            this.multipleProductRoutingkiparts = !selection.length
        },
        /** 子表产品关重料的CSS行样式 */
        rowClassNameProductRoutingkiparts({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductRoutingkiparts.includes(row.id)){
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
        resetProductRoutingkiparts() {
            this.formProductRoutingkiparts = {
                id: null,
                routingId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductRoutingkiparts");
            // 按关键字段值来初始化子表单数据
            this.onProductRoutingkipartsRoutingIdSelection(this.masterId);
        },
        handleAddEngProductRoutingkiparts() {
          this.resetProductRoutingkiparts();
          this.openProductRoutingkiparts = true;
          this.title = "新增产品关重料";
        },
        handleUpdateEngProductRoutingkiparts(row) {
          this.resetProductRoutingkiparts();
          const id = row.id || this.idsProductRoutingkiparts
          getProductRoutingkiparts(id).then(response => {
              this.formProductRoutingkiparts = response.data;
              this.openProductRoutingkiparts = true;
              this.title = "修改产品关重料";
          });
        },
        handleDeleteEngProductRoutingkiparts(row) {
          const ids = row.id || this.idsProductRoutingkiparts;
          const idz = row.id || this.captionsProductRoutingkiparts;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delProductRoutingkiparts(ids);
          }).then(() => {
            this.getProductRoutingkipartsList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitProductRoutingkiparts() {
            this.$refs["formProductRoutingkiparts"].validate(valid => {
                if (valid) {
                  if(this.formProductRoutingkiparts.id==this.formProductRoutingkiparts.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProductRoutingkiparts.id != null) {
                        updateProductRoutingkiparts(this.formProductRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingkiparts = false;
                            this.getProductRoutingkipartsList();
                        });
                    } else {
                        addProductRoutingkiparts(this.formProductRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingkiparts = false;
                            this.getProductRoutingkipartsList();
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
        cancelProductRoutingkiparts() {
            this.openProductRoutingkiparts = false;
            this.resetProductRoutingkiparts();
        },
        /** 查询子表产品工具数据 */
        getProductRoutingtoolList() {
            var params = {"routingId":this.masterId};
            listProductRoutingtool(params).then(res => {
                this.productRoutingtoolList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductRoutingtoolSelectionChange(selection) {
            this.idsProductRoutingtool = selection.map(item => item.id)
            this.captionsProductRoutingtool = selection.map(item => item.itemSeq)
            this.singleProductRoutingtool = selection.length!==1
            this.multipleProductRoutingtool = !selection.length
        },
        /** 子表产品工具的CSS行样式 */
        rowClassNameProductRoutingtool({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductRoutingtool.includes(row.id)){
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
        resetProductRoutingtool() {
            this.formProductRoutingtool = {
                id: null,
                routingId: this.masterId,
                itemSeq: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductRoutingtool");
            // 按关键字段值来初始化子表单数据
            this.onProductRoutingtoolRoutingIdSelection(this.masterId);
        },
        handleAddEngProductRoutingtool() {
          this.resetProductRoutingtool();
          this.openProductRoutingtool = true;
          this.title = "新增产品工具";
        },
        handleUpdateEngProductRoutingtool(row) {
          this.resetProductRoutingtool();
          const id = row.id || this.idsProductRoutingtool
          getProductRoutingtool(id).then(response => {
              this.formProductRoutingtool = response.data;
              this.openProductRoutingtool = true;
              this.title = "修改产品工具";
          });
        },
        handleDeleteEngProductRoutingtool(row) {
          const ids = row.id || this.idsProductRoutingtool;
          const itemSeqz = row.itemSeq || this.captionsProductRoutingtool;

          this.$modal.confirm('确定删除项序为"' + itemSeqz + '"的数据项？').then(function() {
              return delProductRoutingtool(ids);
          }).then(() => {
            this.getProductRoutingtoolList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitProductRoutingtool() {
            this.$refs["formProductRoutingtool"].validate(valid => {
                if (valid) {
                  if(this.formProductRoutingtool.id==this.formProductRoutingtool.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProductRoutingtool.id != null) {
                        updateProductRoutingtool(this.formProductRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingtool = false;
                            this.getProductRoutingtoolList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addProductRoutingtool(this.formProductRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingtool = false;
                            this.getProductRoutingtoolList();
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
        cancelProductRoutingtool() {
            this.openProductRoutingtool = false;
            this.resetProductRoutingtool();
        },
        /** 查询子表产品工序图数据 */
        getProductRoutingdrawingList() {
            var params = {"routingId":this.masterId};
            listProductRoutingdrawing(params).then(res => {
                this.productRoutingdrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductRoutingdrawingSelectionChange(selection) {
            this.idsProductRoutingdrawing = selection.map(item => item.id)
            this.captionsProductRoutingdrawing = selection.map(item => item.id)
            this.singleProductRoutingdrawing = selection.length!==1
            this.multipleProductRoutingdrawing = !selection.length
        },
        /** 子表产品工序图的CSS行样式 */
        rowClassNameProductRoutingdrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductRoutingdrawing.includes(row.id)){
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
        resetProductRoutingdrawing() {
            this.formProductRoutingdrawing = {
                id: null,
                routingId: this.masterId,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onProductRoutingdrawingRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetProductRoutingdrawingpreviewDrawing() {
            this.formProductRoutingdrawing = {
                id: null,
                routingId: this.masterId,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onProductRoutingdrawingRoutingIdSelection(this.masterId);
        },
        handleAddEngProductRoutingdrawing() {
          this.resetProductRoutingdrawing();
          this.openProductRoutingdrawing = true;
          this.title = "新增产品工序图";
        },
        handleUpdateEngProductRoutingdrawing(row) {
          this.resetProductRoutingdrawing();
          const id = row.id || this.idsProductRoutingdrawing
          getProductRoutingdrawing(id).then(response => {
              this.formProductRoutingdrawing = response.data;
              this.openProductRoutingdrawing = true;
              this.title = "修改产品工序图";
          });
        },
        handleDeleteEngProductRoutingdrawing(row) {
          const ids = row.id || this.idsProductRoutingdrawing;
          const idz = row.id || this.captionsProductRoutingdrawing;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delProductRoutingdrawing(ids);
          }).then(() => {
            this.getProductRoutingdrawingList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewDrawing(row) {
          this.resetProductRoutingdrawing();
          const id = row.id || this.idsProductRoutingdrawing
          getProductRoutingdrawing(id).then(response => {
            this.formProductRoutingdrawing = response.data;
            this.openProductRoutingdrawingpreviewDrawing = true;
            this.title = "预览产品工序图";
          });
        },

        /** 提交按钮 */
        submitProductRoutingdrawing() {
            this.$refs["formProductRoutingdrawing"].validate(valid => {
                if (valid) {
                  if(this.formProductRoutingdrawing.id==this.formProductRoutingdrawing.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProductRoutingdrawing.id != null) {
                        updateProductRoutingdrawing(this.formProductRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingdrawing = false;
                            this.getProductRoutingdrawingList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addProductRoutingdrawing(this.formProductRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRoutingdrawing = false;
                            this.getProductRoutingdrawingList();
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
        cancelProductRoutingdrawing() {
            this.openProductRoutingdrawing = false;
            this.resetProductRoutingdrawing();
        },
        /** 查询子表产品SOP数据 */
        getPruductRoutingsopList() {
            var params = {"routingId":this.masterId};
            listPruductRoutingsop(params).then(res => {
                this.pruductRoutingsopList = res.rows;
            });
        },
        // 多选框选中数据
        handlePruductRoutingsopSelectionChange(selection) {
            this.idsPruductRoutingsop = selection.map(item => item.id)
            this.captionsPruductRoutingsop = selection.map(item => item.stepSeq)
            this.singlePruductRoutingsop = selection.length!==1
            this.multiplePruductRoutingsop = !selection.length
        },
        /** 子表产品SOP的CSS行样式 */
        rowClassNamePruductRoutingsop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPruductRoutingsop.includes(row.id)){
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
        resetPruductRoutingsop() {
            this.formPruductRoutingsop = {
                id: null,
                routingId: this.masterId,
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
            this.resetForm("formPruductRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onPruductRoutingsopRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetPruductRoutingsoppreviewSop() {
            this.formPruductRoutingsop = {
                id: null,
                routingId: this.masterId,
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
            this.resetForm("formPruductRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onPruductRoutingsopRoutingIdSelection(this.masterId);
        },
        handleAddEngPruductRoutingsop() {
          this.resetPruductRoutingsop();
          this.openPruductRoutingsop = true;
          this.title = "新增产品SOP";
        },
        handleUpdateEngPruductRoutingsop(row) {
          this.resetPruductRoutingsop();
          const id = row.id || this.idsPruductRoutingsop
          getPruductRoutingsop(id).then(response => {
              this.formPruductRoutingsop = response.data;
              this.openPruductRoutingsop = true;
              this.title = "修改产品SOP";
          });
        },
        handleDeleteEngPruductRoutingsop(row) {
          const ids = row.id || this.idsPruductRoutingsop;
          const stepSeqz = row.stepSeq || this.captionsPruductRoutingsop;

          this.$modal.confirm('确定删除步号为"' + stepSeqz + '"的数据项？').then(function() {
              return delPruductRoutingsop(ids);
          }).then(() => {
            this.getPruductRoutingsopList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewSop(row) {
          this.resetPruductRoutingsop();
          const id = row.id || this.idsPruductRoutingsop
          getPruductRoutingsop(id).then(response => {
            this.formPruductRoutingsop = response.data;
            this.openPruductRoutingsoppreviewSop = true;
            this.title = "预览产品SOP";
          });
        },

        /** 提交按钮 */
        submitPruductRoutingsop() {
            this.$refs["formPruductRoutingsop"].validate(valid => {
                if (valid) {
                  if(this.formPruductRoutingsop.id==this.formPruductRoutingsop.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPruductRoutingsop.id != null) {
                        updatePruductRoutingsop(this.formPruductRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductRoutingsop = false;
                            this.getPruductRoutingsopList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPruductRoutingsop(this.formPruductRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductRoutingsop = false;
                            this.getPruductRoutingsopList();
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
        cancelPruductRoutingsop() {
            this.openPruductRoutingsop = false;
            this.resetPruductRoutingsop();
        },
        /** 查询子表产品作业视频数据 */
        getPruductRoutingvideoList() {
            var params = {"routingId":this.masterId};
            listPruductRoutingvideo(params).then(res => {
                this.pruductRoutingvideoList = res.rows;
            });
        },
        // 多选框选中数据
        handlePruductRoutingvideoSelectionChange(selection) {
            this.idsPruductRoutingvideo = selection.map(item => item.id)
            this.captionsPruductRoutingvideo = selection.map(item => item.stepSeq)
            this.singlePruductRoutingvideo = selection.length!==1
            this.multiplePruductRoutingvideo = !selection.length
        },
        /** 子表产品作业视频的CSS行样式 */
        rowClassNamePruductRoutingvideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPruductRoutingvideo.includes(row.id)){
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
        resetPruductRoutingvideo() {
            this.formPruductRoutingvideo = {
                id: null,
                routingId: this.masterId,
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
            this.resetForm("formPruductRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onPruductRoutingvideoRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetPruductRoutingvideopreviewVideo() {
            this.formPruductRoutingvideo = {
                id: null,
                routingId: this.masterId,
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
            this.resetForm("formPruductRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onPruductRoutingvideoRoutingIdSelection(this.masterId);
        },
        handleAddEngPruductRoutingvideo() {
          this.resetPruductRoutingvideo();
          this.openPruductRoutingvideo = true;
          this.title = "新增产品作业视频";
        },
        handleUpdateEngPruductRoutingvideo(row) {
          this.resetPruductRoutingvideo();
          const id = row.id || this.idsPruductRoutingvideo
          getPruductRoutingvideo(id).then(response => {
              this.formPruductRoutingvideo = response.data;
              this.openPruductRoutingvideo = true;
              this.title = "修改产品作业视频";
          });
        },
        handleExportEngPruductRoutingvideo() {
          this.download('eng/PruductRoutingvideo/export', {
           ...this.queryParams
          }, `PruductRoutingvideo_${new Date().getTime()}.xlsx`)
        },
        handlePreviewVideo(row) {
          this.resetPruductRoutingvideo();
          const id = row.id || this.idsPruductRoutingvideo
          getPruductRoutingvideo(id).then(response => {
            this.formPruductRoutingvideo = response.data;
            this.openPruductRoutingvideopreviewVideo = true;
            this.title = "预览产品作业视频";
          });
        },

        /** 提交按钮 */
        submitPruductRoutingvideo() {
            this.$refs["formPruductRoutingvideo"].validate(valid => {
                if (valid) {
                  if(this.formPruductRoutingvideo.id==this.formPruductRoutingvideo.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPruductRoutingvideo.id != null) {
                        updatePruductRoutingvideo(this.formPruductRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductRoutingvideo = false;
                            this.getPruductRoutingvideoList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPruductRoutingvideo(this.formPruductRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductRoutingvideo = false;
                            this.getPruductRoutingvideoList();
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
        cancelPruductRoutingvideo() {
            this.openPruductRoutingvideo = false;
            this.resetPruductRoutingvideo();
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
