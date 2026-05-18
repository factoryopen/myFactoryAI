<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
          <el-form-item prop="materialCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品编码</strong></span>
                </span>
            <el-input
              v-model="queryParams.materialCode"
              placeholder="请输入产品编码"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="materialName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品名称</strong></span>
                </span>
            <el-input
              v-model="queryParams.materialName"
              placeholder="请输入产品名称"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="materialSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品规格</strong></span>
                </span>
            <el-input
              v-model="queryParams.materialSpec"
              placeholder="请输入产品规格"
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
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleUpdate"
                >修改</el-button>
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
                  :data="productEngineeringList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                <el-table-column label="物料名称" align="left" prop="materialName"  width="140"/>
                <el-table-column label="物料规格" align="left" prop="materialSpec"  width="120"/>
                <el-table-column label="单位" align="center" prop="unitId"  width="50">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="品类" align="center" prop="categoryId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                            :key="index"
                            size="mini">{{item.categoryNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="消耗类型" align="center" prop="consumeType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                </template>
            </el-table-column>
               <el-table-column label="产线" align="center" prop="lineId"  width="85">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="损耗率%" align="right" prop="rateLoss"  width="75"/>
            <el-table-column label="生产周期" align="right" prop="daysCycletime"  width="75"/>
            <el-table-column label="提前期" align="right" prop="daysLeadtime"  width="75"/>
            <el-table-column label="后置期" align="right" prop="daysPosttime"  width="75"/>
            <el-table-column label="状态" align="center" prop="status" width="55">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.resource_status_basic" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="90">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-folder-add"
                  @click="handleInheritEngineering(scope.row)"
                >继承工艺</el-button>
              </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <!-- 创建master.open对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
                <el-form-item  prop="consumeType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>消耗类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.consumeType" placeholder="请选择消耗类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.eng_material_consumingtype"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
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
                <el-form-item  prop="daysCycletime" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>生产周期</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.daysCycletime" placeholder="请输入生产周期" size="mini" />
                </el-form-item>
                <el-form-item  prop="daysLeadtime" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>提前时间</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.daysLeadtime" placeholder="请输入提前时间" size="mini" />
                </el-form-item>
                <el-form-item  prop="daysPosttime" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>后置时间</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.daysPosttime" placeholder="请输入后置时间" size="mini" />
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
            <el-tab-pane label="BOM">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductBom"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductBom"
                            @click="handleUpdateEngProductBom"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductBom"
                            @click="handleDeleteEngProductBom"
                        >删除</el-button>
                    </el-col>
                  <el-col :span="1.5">
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      icon="el-icon-upload2"
                      @click="handleImportProductBom"
                    >导入BOM
                    </el-button>
                  </el-col>
                </el-row>
                <el-table ref="productBom" border height="435px"
                        :data="productBomList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductBom"
                        @selection-change="handleProductBomSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="55"/>
                    <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
                    <el-table-column label="规格型号" align="left" prop="materialSpec" width="120"/>
                    <el-table-column label="尺寸" align="left" prop="materialSize" width="120"/>
                    <el-table-column label="材质" align="left" prop="compoundId" width="120"/>
                    <el-table-column label="物料分类" align="center" prop="categoryId"  width="120">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkCategoryList">
                          <span v-if="item.id==scope.row.categoryId"
                                :key="index"
                                size="mini">{{item.categoryNo}}</span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="标准用量" align="right" prop="standardQuantity" width="80"/>
                    <el-table-column label="损耗率%" align="right" prop="lossRate" width="85"/>
                    <el-table-column label="算料类型" align="center" prop="calculateType" width="90">
                      <template slot-scope="scope">
                        <dict-tag :options="dict.type.eng_material_mrpcaltype" :value="scope.row.calculateType"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="产线" align="center" prop="lineId"  width="100">
                      <template  slot-scope="scope">
                        <template v-for="(item,index) in fkLineList">
                                  <span v-if="item.id==scope.row.lineId"
                                        :key="index"
                                        size="mini">{{item.lineName}}</span>
                        </template>
                      </template>
                    </el-table-column>
                    <el-table-column label="消耗类型" align="center" prop="consumeType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="220">
                       <template slot-scope="scope">
                         <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-edit"
                           @click="handleGenerateMaterialCode(scope.row)"
                         >生成料号</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngProductBom(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngProductBom(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工艺路线">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductRouting"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductRouting"
                            @click="handleUpdateEngProductRouting"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductRouting"
                            @click="handleDeleteEngProductRouting"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="productRouting" border
                        :data="productRoutingList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductRouting"
                        @selection-change="handleProductRoutingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="55"/>
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
                    <el-table-column label="工序编码" align="center" prop="processId"  width="100">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.processId"
                                    :key="index"
                                    size="mini">{{item.processCode}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="工序名称" align="left" prop="processName" width="100"/>
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="60"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="60"/>
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
                               @click="handleUpdateEngProductRouting(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngProductRouting(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="产品图纸">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngProductDrawing"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleProductDrawing"
                            @click="handleUpdateEngProductDrawing"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleProductDrawing"
                            @click="handleDeleteEngProductDrawing"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="productDrawing" border
                        :data="productDrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameProductDrawing"
                        @selection-change="handleProductDrawingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="图纸描述" align="left" prop="description" width="500"/>
                    <el-table-column label="图纸链接" align="left" prop="drawingUrl" width="400"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
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
                               @click="handleUpdateEngProductDrawing(scope.row)"
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
                            @click="handleAddEngPruductSop"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePruductSop"
                            @click="handleUpdateEngPruductSop"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePruductSop"
                            @click="handleDeleteEngPruductSop"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pruductSop" border
                        :data="pruductSopList"
                        highlight-current-row
                        :row-class-name="rowClassNamePruductSop"
                        @selection-change="handlePruductSopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="SOP地址" align="center" prop="sopUrl" width="400"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
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
                               @click="handleUpdateEngPruductSop(scope.row)"
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
                            @click="handleAddEngPruductVideo"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePruductVideo"
                            @click="handleUpdateEngPruductVideo"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePruductVideo"
                            @click="handleDeleteEngPruductVideo"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pruductVideo" border
                        :data="pruductVideoList"
                        highlight-current-row
                        :row-class-name="rowClassNamePruductVideo"
                        @selection-change="handlePruductVideoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="视频地址" align="center" prop="videoUrl" width="400"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
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
                               @click="handleUpdateEngPruductVideo(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openProductBom对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductBom" width="500px" append-to-body>
            <el-form ref="formProductBom" :model="formProductBom" :rules="rulesProductBom" label-width="140px" :inline-message="true">
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductBom.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductBom.materialId" filterable placeholder="请选择物料编码"
                                 @change="onProductBomMaterialIdSelection"  size="mini" >
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
                      <el-input class="inputWidth" v-model="formProductBom.materialName" placeholder="请选择物料名称" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="compoundId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>材质</strong></span>
                    </span>
                      <treeselect v-model="formProductBom.compoundId"
                                  class="inputWidth"
                                  :options="compoundOptions"
                                  :normalizer="normalizeCompound"
                                  placeholder="请选择材质"
                                  @select="onCompoundIdSelection"
                                  size="mini" disabled="false"/>
                  </el-form-item>
                  <el-form-item  prop="materialSpec" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>规格型号</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="formProductBom.materialSpec" placeholder="请输入规格型号" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item  prop="materialSize" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>尺寸</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="formProductBom.materialSize" placeholder="请输入尺寸" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="calculateType" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>算料类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="formProductBom.calculateType" placeholder="请选择算料类型" size="mini">
                      <el-option
                        v-for="dict in dict.type.eng_material_mrpcaltype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                      />
                    </el-select>
                  </el-form-item>
                  <hr>
                   <el-form-item prop="standardQuantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准用量</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductBom.standardQuantity" placeholder="请输入标准用量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="lossRate" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>损耗率</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductBom.lossRate" placeholder="请输入损耗率" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="consumeType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>消耗类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductBom.consumeType" placeholder="请选择消耗类型" size="mini" >
                          <el-option
                              v-for="dict in dict.type.eng_material_consumingtype"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="parseInt(dict.value)"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="lineId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产线</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductBom.lineId" filterable placeholder="请选择产线" size="mini">
                          <el-option
                              v-for="(fkrow, index) in fkLineList"
                              :key="index"
                              :label="fkrow.lineName"
                              :value="fkrow.id"
                              size="mini"
                              :disabled="true"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductBom.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductBom">确 定</el-button>
                <el-button @click="cancelProductBom">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建master.openImportProductBom对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openImportProductBom" width="500px" append-to-body>
          <el-form ref="formImportProductBom" :model="formImportProductBom" :rules="rulesImportProductBom" label-width="80px" :inline-message="true">
            <el-form-item  class="marginBottom0">
            <span slot="label">
                <span class="fontSize12"><strong>Excel地址</strong></span>
            </span>
            <fileUpload class="inputWidth" v-model="formImportProductBom.excelUrl" :fileType="['xls','xlsx']" :limit="1" size="mini" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitImportProductBom">确 定</el-button>
            <el-button @click="cancelImportProductBom">取 消</el-button>
          </div>
        </el-dialog>
      <!-- 创建slaver.openProductBom.GenerateCode对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openGenerateProductBom" width="500px" append-to-body>
          <el-form ref="formGenerateProductBom" :model="formGenerateProductBom" :rules="rulesGenerateProductBom" label-width="120px" :inline-message="true">
            <el-form-item prop="categoryId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>品类</strong></span>
              </span>
              <treeselect v-model="formGenerateProductBom.categoryId"
                          class="inputWidth"
                          :options="categoryOptions"
                          :normalizer="normalizer"
                          placeholder="请选择父品类"
                          @select="onCategoryIdSelection"
                          size="mini"/>
            </el-form-item>
            <el-form-item prop="calculateType" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>算料类型</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formGenerateProductBom.calculateType" placeholder="请选择算料类型" size="mini">
                <el-option
                  v-for="dict in dict.type.eng_material_mrpcaltype"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item  prop="drawNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>图号</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formGenerateProductBom.drawNo" @change="onDrawNoChanged" placeholder="请输入图号" size="mini" />
            </el-form-item>
            <el-form-item prop="compoundId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>材质</strong></span>
              </span>
              <treeselect v-model="formGenerateProductBom.compoundId"
                          class="inputWidth"
                          :options="compoundOptions"
                          :normalizer="normalizeCompound"
                          placeholder="请选择材质"
                          @select="onCompoundIdSelection"
                          size="mini"/>
            </el-form-item>
            <el-form-item  prop="materialSpec" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>规格型号</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formGenerateProductBom.materialSpec" placeholder="请输入规格型号" @change="onMaterialSpecChanged" size="mini" />
            </el-form-item>
            <hr>
            <el-form-item  prop="materialCode" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>物料编码</strong></span>
              </span>
            <el-input class="inputWidth" v-model="formGenerateProductBom.materialCode" placeholder="请输入物料编码" size="mini"/>
            </el-form-item>
            <el-form-item  prop="materialName" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>物料名称</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formGenerateProductBom.materialName" placeholder="请输入物料名称" size="mini" />
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>单位</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formGenerateProductBom.unitId" placeholder="请选择单位"
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
            <el-form-item  prop="materialSize" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>尺寸</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formGenerateProductBom.materialSize" placeholder="请输入尺寸" size="mini" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitGenerateCode">确 定</el-button>
            <el-button @click="cancelGenerateCode">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 创建slaver.openProductRouting对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductRouting" width="500px" append-to-body>
            <el-form ref="formProductRouting" :model="formProductRouting" :rules="rulesProductRouting" label-width="140px" :inline-message="true">
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRouting.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="processId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formProductRouting.processId" filterable placeholder="请选择工序"
                                 @change="onProductRoutingProcessIdSelection"  size="mini" >
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
                    <el-select class="inputWidth" v-model="formProductRouting.processType" placeholder="请选择工序类型" size="mini" >
                      <el-option
                        v-for="dict in dict.type.eng_process_type"
                        :key="parseInt(dict.value)"
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
                    <el-select class="inputWidth" v-model="formProductRouting.lineId" filterable placeholder="请选择产线"
                               @change="onProductRoutingLineIdSelection"  size="mini" >
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
                    <el-select class="inputWidth" v-model="formProductRouting.lineType" placeholder="请选择产线类型" size="mini" >
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
                      <el-input class="inputWidth" v-model="formProductRouting.lastSeqNo" placeholder="请输入上序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="nextSeqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>下序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRouting.nextSeqNo" placeholder="请输入下序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsFixed" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>标准固定秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsFixed" placeholder="请选择标准固定秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsVariable" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>标准可变秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsVariable" placeholder="请选择标准可变秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsRm" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>备料秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsRm" placeholder="请选择备料秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsSetup" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>架机秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsSetup" placeholder="请选择架机秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsStacking" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>堆垛秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsStacking" placeholder="请选择堆垛秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsTransfer" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>移转秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsTransfer" placeholder="请选择移转秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsBuffer" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>缓冲秒数</strong></span>
                    </span>
                     <el-input class="inputWidth" v-model="formProductRouting.secondsBuffer" placeholder="请选择缓冲秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductRouting.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductRouting">确 定</el-button>
                <el-button @click="cancelProductRouting">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openProductDrawing对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openProductDrawing" width="500px" append-to-body>
            <el-form ref="formProductDrawing" :model="formProductDrawing" :rules="rulesProductDrawing" label-width="140px" :inline-message="true">
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductDrawing.description" placeholder="请输入图纸描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸链接</strong></span>
                      </span>
                      <imageUpload class="inputWidth" v-model="formProductDrawing.drawingUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formProductDrawing.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitProductDrawing">确 定</el-button>
                <el-button @click="cancelProductDrawing">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openProductDrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openProductDrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formProductDrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openPruductSop对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPruductSop" width="500px" append-to-body>
            <el-form ref="formPruductSop" :model="formPruductSop" :rules="rulesPruductSop" label-width="140px" :inline-message="true">
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductSop.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductSop.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductSop.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>SOP地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formPruductSop.sopUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductSop.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPruductSop">确 定</el-button>
                <el-button @click="cancelPruductSop">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openPruductSoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openPruductSoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.formPruductSop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openPruductVideo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPruductVideo" width="500px" append-to-body>
            <el-form ref="formPruductVideo" :model="formPruductVideo" :rules="rulesPruductVideo" label-width="140px" :inline-message="true">
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductVideo.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductVideo.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductVideo.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>视频地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formPruductVideo.videoUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPruductVideo.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPruductVideo">确 定</el-button>
                <el-button @click="cancelPruductVideo">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openPruductVideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openPruductVideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="baseUrl+this.formPruductVideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listProductEngineering, getProductEngineering, delProductEngineering, addProductEngineering, updateProductEngineering} from "@/api/eng/productEngineering";
import { inheritEngineering,generateCode } from "@/api/eng/productEngineering";
import { importBomExcel, listProductBom, getProductBom,  delProductBom,  addProductBom,  updateProductBom } from "@/api/eng/productBom";
import { listProductRouting, getProductRouting, delProductRouting, addProductRouting, updateProductRouting } from "@/api/eng/productRouting";
import { listProductDrawing, getProductDrawing, delProductDrawing, addProductDrawing, updateProductDrawing } from "@/api/eng/productDrawing";
import { listPruductSop, getPruductSop, delPruductSop, addPruductSop, updatePruductSop } from "@/api/eng/pruductSop";
import { listPruductVideo, getPruductVideo, delPruductVideo, addPruductVideo, updatePruductVideo } from "@/api/eng/pruductVideo";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import {listCategory, listPureMaterialOrProductCategory} from "@/api/eng/category";
import {getNextMaterialCode, listMaterial} from "@/api/eng/material";
import { listLine} from "@/api/res/line";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import {listCompound} from "@/api/eng/compound";

import pdf from "vue-pdf";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "ProductEngineering",
    components: {pdf, Treeselect},
    dicts: ['eng_material_mrpcaltype', 'eng_material_purchasingtype', 'eng_material_consumingtype', 'resource_status_basic', 'sys_yes_no', 'eng_process_type', 'res_type_line'],
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
            // 产品工艺管理表格数据
            productEngineeringList: [],
            // 物料分类管理树选项
            categoryOptions: [],
            // 材质数据树选项
            compoundOptions: [],
            fkUnitList: [],
            fkProcessList: [],
            fkCategoryList: [],
            fkMaterialList: [],
            fkLineList: [],
            fkProductBasisList: [],
            fkMaterialInfoList: [],
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
                materialCode: [
                    { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                materialName: [
                    { required: true, message: "物料名称不能为空", trigger: "blur" }
                ],
                unitId: [
                    { required: true, message: "单位不能为空", trigger: "blur" }
                ],
                consumeType: [
                    { required: true, message: "消耗类型不能为空", trigger: "change" }
                ],
                lineId: [
                    { required: true, message: "产线ID不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              materialCode: null,
              materialName: null,
              materialSpec: null,
              unitId: null,
              categoryId: null,
              consumeType: null,
              lineId: null,
              status: null,
            },
            //子表信息
            productBomList:[],
            // 选中数组
            idsProductBom: [],
            captionsProductBom: [],
            // 非单个禁用
            singleProductBom: true,
            // 非多个禁用
            multipleProductBom: true,
            // 子表选中数据
            checkedProductBom: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductBom: false,
            formProductBom: {},
            rulesProductBom: {
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                standardQuantity: [
                   { required: true, message: "标准用量不能为空", trigger: "blur" }
                ],
                rateLoss: [
                  { required: true, message: "损耗率不能为空", trigger: "blur" }
                ],
            },
            openImportProductBom: false,
            formImportProductBom: {},
            rulesImportProductBom: {
              excelUrl: [
                {required: true, message: "合同明细Excel地址不能为空", trigger: "blur"}
              ],
            },
            openGenerateProductBom: false,
            formGenerateProductBom:{},
            rulesGenerateProductBom: {
              materialCode: [
                { required: true, message: "物料编码不能为空", trigger: "blur" }
              ],
              materialName: [
                { required: true, message: "物料名称不能为空", trigger: "blur" }
              ],
              categoryId: [
                { required: true, message: "品类不能为空", trigger: "blur" }
              ],
              unitId: [
                { required: true, message: "单位不能为空", trigger: "blur" }
              ],
            },
            //子表信息
            productRoutingList:[],
            // 选中数组
            idsProductRouting: [],
            captionsProductRouting: [],
            // 非单个禁用
            singleProductRouting: true,
            // 非多个禁用
            multipleProductRouting: true,
            // 子表选中数据
            checkedProductRouting: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductRouting: false,
            formProductRouting: {},
            rulesProductRouting: {
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
            //子表信息
            productDrawingList:[],
            // 选中数组
            idsProductDrawing: [],
            captionsProductDrawing: [],
            // 非单个禁用
            singleProductDrawing: true,
            // 非多个禁用
            multipleProductDrawing: true,
            // 子表选中数据
            checkedProductDrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProductDrawing: false,
            formProductDrawing: {},
            rulesProductDrawing: {
                productId: [
                   { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                description: [
                   { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                   { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            openProductDrawingpreviewDrawing: false,
            rulesProductDrawingpreviewDrawing: {
                productId: [
                    { required: true, message: "产品编码不能为空", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "图纸描述不能为空", trigger: "blur" }
                ],
                drawingUrl: [
                    { required: true, message: "图纸链接不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            pruductSopList:[],
            // 选中数组
            idsPruductSop: [],
            captionsPruductSop: [],
            // 非单个禁用
            singlePruductSop: true,
            // 非多个禁用
            multiplePruductSop: true,
            // 子表选中数据
            checkedPruductSop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPruductSop: false,
            formPruductSop: {},
            rulesPruductSop: {
                productId: [
                   { required: true, message: "产品ID不能为空", trigger: "blur" }
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
            openPruductSoppreviewSop: false,
            rulesPruductSoppreviewSop: {
                productId: [
                    { required: true, message: "产品ID不能为空", trigger: "blur" }
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
            pruductVideoList:[],
            // 选中数组
            idsPruductVideo: [],
            captionsPruductVideo: [],
            // 非单个禁用
            singlePruductVideo: true,
            // 非多个禁用
            multiplePruductVideo: true,
            // 子表选中数据
            checkedPruductVideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPruductVideo: false,
            formPruductVideo: {},
            rulesPruductVideo: {
                productId: [
                   { required: true, message: "产品ID不能为空", trigger: "blur" }
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
            openPruductVideopreviewVideo: false,
            rulesPruductVideopreviewVideo: {
                productId: [
                    { required: true, message: "产品ID不能为空", trigger: "blur" }
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

            //料号生成参数
            materialType:null,
            categoryNo:null,
            drawNo:null,
            compoundNo:null,
            materialSpec:null,
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Unit数据 */
        this.getUnitList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Category数据 */
        this.getCategoryList();
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        this.getTreeselect();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listProductEngineering(this.queryParams).then(response => {
              this.productEngineeringList = response.rows;
              this.total = response.total;
              if (this.productEngineeringList && this.productEngineeringList.length>0) {
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
                this.getProductBomList();
                this.getProductRoutingList();
                this.getProductDrawingList();
                this.getPruductSopList();
                this.getPruductVideoList();
            }else {
                this.productBomList = null;
                this.productRoutingList = null;
                this.productDrawingList = null;
                this.pruductSopList = null;
                this.pruductVideoList = null;
            }
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
        /** 查询外键Category数据 */
        getCategoryList() {
            listCategory().then(res => {
                this.fkCategoryList = res.rows;
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
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
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
            this.captions = selection.map(item => item.materialName)
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
        /** 子表外键ProductId被选择后触发事件 **/
        onProductBomProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductBom.productId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onProductBomMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{
                if(fkId === item.id){
                  this.formProductBom.materialId = item.id;
                  this.formProductBom.materialCode = item.materialCode;
                  this.formProductBom.materialName = item.materialName;
                  this.formProductBom.materialSpec = item.materialSpec;
                  this.formProductBom.categoryId = item.categoryId;
                  this.formProductBom.compoundId = item.compoundId;
                  this.formProductBom.lineId = item.lineId;
                  this.formProductBom.lossRate=item.lossRate;
                  this.formProductBom.consumeType=item.consumeType;
                  //转换算料类型
                  if (item.baseType==='0' || item.baseType==='3'){
                    this.formProductBom.calculateType='0';
                  }else if (item.baseType==='1' || item.baseType==='2'){
                    this.formProductBom.calculateType='2';
                  }
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onProductRoutingProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRouting.productId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onProductRoutingLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRouting.lineId = item.id
                  this.formProductRouting.lineType = item.lineType;
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onProductRoutingProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductRouting.processId = item.id;
                   this.formProductRouting.processName = item.processName;
                   this.formProductRouting.processType = item.processType;
                   this.formProductRouting.secondsFixed = item.secondsFixed;
                   this.formProductRouting.secondsVariable = item.secondsVariable;
                   this.formProductRouting.secondsRm = item.secondsRm;
                   this.formProductRouting.secondsSetup = item.secondsSetup;
                   this.formProductRouting.secondsStacking = item.secondsStacking;
                   this.formProductRouting.secondsTransfer = item.secondsTransfer;
                   this.formProductRouting.secondsBuffer = item.secondsBuffer;
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onProductDrawingProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProductDrawing.productId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onPruductSopProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formPruductSop.productId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onPruductVideoProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formPruductVideo.productId = item.id
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                baseType: null,
                purchaseType: null,
                consumeType: null,
                daysCycletime: null,
                daysLeadtime: null,
                daysPosttime: null,
                status: null,
                quantityQualified: null,
                quantityExpired: null,
                quantityScraped: null,
                quantityFrozen: null,
                quantityPending: null,
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
            this.title = "新增产品工艺管理";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getProductEngineering(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改产品工艺管理";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const materialNamez = row.materialName || this.captions;
            this.$modal.confirm('确认删除物料名称为"' + materialNamez + '"的数据项？').then(function() {
                return delProductEngineering(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('eng/productEngineering/export', {
              ...this.queryParams
            }, `productEngineering_${new Date().getTime()}.xlsx`)
        },
        handleInheritEngineering(row) {
          const materialNamez = row.materialName || this.captions;
          this.$modal.confirm('确定继承产成品为"' + materialNamez + '"的品类工艺吗？').then(function() {
            return inheritEngineering(row.id);
          }).then(response => {
            this.getMasterList();
            this.$modal.msgSuccess(response.msg);
          });
        },
        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateProductEngineering(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addProductEngineering(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
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
        /** 查询子表BOM数据 */
        getProductBomList() {
            var params = {"productId":this.masterId};
            listProductBom(params).then(res => {
                this.productBomList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductBomSelectionChange(selection) {
            this.idsProductBom = selection.map(item => item.id)
            this.captionsProductBom = selection.map(item => item.seqNo)
            this.singleProductBom = selection.length!==1
            this.multipleProductBom = !selection.length
        },
        /** 子表BOM的CSS行样式 */
        rowClassNameProductBom({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductBom.includes(row.id)){
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
        resetProductBom() {
            this.formProductBom = {
                id: null,
                productId: this.masterId,
                seqNo: null,
                standardQuantity: 1,
                lossRate: 0,
                consumeType: null,
                enableMust: null,
                enableReplace: null,
                calculateType: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductBom");
            // 按关键字段值来初始化子表单数据
            this.onProductBomProductIdSelection(this.masterId);
        },
        resetImportProductBom(){
          this.openImportProductBom = {
            excelUrl: null,
          }
        },
        resetGenerateProductBom (){
          this.formGenerateProductBom = {
            id: null,
            materialId: null,
            materialCode:null,
            materialName:null,
            materialSpec:null,
            materialSize:null,
            calculateType:null,
            drawNo:null,
            categoryId:null,
            compoundId:null,
            unitId:null,
            params:[],
          };
          this.resetForm("formGenerateProductBom");
        },
         /**主表外键CategoryId被选择后触发事件*/
        onCategoryIdSelection(node, instanceId){
          this.categoryNo = node.categoryNo;
          this.formGenerateProductBom.baseType = node.materialType;
          this.baseType = this.formGenerateProductBom.baseType;
          this.drawNo = this.formGenerateProductBom.drawNo;
          this.materialSpec = this.formGenerateProductBom.materialSpec;

          this.formGenerateProductBom.materialCode ="";
          if (this.categoryNo!=null) this.formGenerateProductBom.materialCode=this.categoryNo;
          if (this.baseType==1){
            //if (this.drawNo!=null) this.formGenerateProductBom.materialCode += "-"+this.drawNo;
          }else if (this.baseType==3){
           // if(this.compoundNo!=null) this.formGenerateProductBom.materialCode += "-"+this.compoundNo;
            if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateProductBom.materialCode += "-"+this.materialSpec;
          }

           getNextMaterialCode(this.formGenerateProductBom.materialCode).then(response => {
             this.formGenerateProductBom.materialCode = response.data["materialCode"];
           });
        },
        /**主表外键CategoryId被选择后触发事件*/
        onCompoundIdSelection(node, instanceId){
          // this.compoundNo = node.compoundNo;
          // this.baseType = this.formGenerateProductBom.baseType;
          // this.drawNo = this.formGenerateProductBom.drawNo;
          // this.materialSpec = this.formGenerateProductBom.materialSpec;
          //
          // this.formGenerateProductBom.materialCode ="";
          // if (this.categoryNo!=null) this.formGenerateProductBom.materialCode=this.categoryNo;
          // if (this.baseType==1){
          //   if (this.drawNo!=null) this.formGenerateProductBom.materialCode += "-"+this.drawNo;
          // }else if (this.baseType==3){
          //   if(this.compoundNo!=null) this.formGenerateProductBom.materialCode += "-"+this.compoundNo;
          //   if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateProductBom.materialCode += "-"+this.materialSpec;
          // }
          //
          // getNextMaterialCode(this.formGenerateProductBom.materialCode).then(response => {
          //   this.formGenerateProductBom.materialCode = response.data["materialCode"];
          // });
        },
        /**主表外键CategoryId被选择后触发事件*/
        onDrawNoChanged(){
          this.drawNo = this.formGenerateProductBom.drawNo;
          this.baseType = this.formGenerateProductBom.baseType;
          this.materialSpec = this.formGenerateProductBom.materialSpec;

          this.formGenerateProductBom.materialCode ="";
          if (this.categoryNo!=null) this.formGenerateProductBom.materialCode=this.categoryNo;
          if (this.baseType==1){
            if (this.drawNo!=null) this.formGenerateProductBom.materialCode += "-"+this.drawNo;
          }else if (this.baseType==3){
            if(this.compoundNo!=null) this.formGenerateProductBom.materialCode += "-"+this.compoundNo;
            if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateProductBom.materialCode += "-"+this.materialSpec;
          }

          getNextMaterialCode(this.formGenerateProductBom.materialCode).then(response => {
            this.formGenerateProductBom.materialCode = response.data["materialCode"];
          });
        },
        /**主表外键CategoryId被选择后触发事件*/
        onMaterialSpecChanged(fkId){
          this.materialSpec = this.formGenerateProductBom.materialSpec;
          this.baseType = this.formGenerateProductBom.baseType;
          this.drawNo = this.formGenerateProductBom.drawNo;

          this.formGenerateProductBom.materialCode ="";
          if (this.categoryNo!=null) this.formGenerateProductBom.materialCode=this.categoryNo;
          if (this.baseType==1){
            if (this.drawNo!=null) this.formGenerateProductBom.materialCode += "-"+this.drawNo;
          }else if (this.baseType==3){
            if(this.compoundNo!=null) this.formGenerateProductBom.materialCode += "-"+this.compoundNo;
            if (this.materialSpec!=null && this.materialSpec!="") this.formGenerateProductBom.materialCode += "-"+this.materialSpec;
          }

          getNextMaterialCode(this.formGenerateProductBom.materialCode).then(response => {
            this.formGenerateProductBom.materialCode = response.data["materialCode"];
          });
        },
        /** 转换物料分类管理数据结构 */
        normalizer(node) {
          if (node.children && !node.children.length) {
            delete node.children;
          }
          return {
            id: node.id,
            label: node.categoryNo+" ["+node.categoryName+"]",
            children: node.children
          };
        },
        /** 转换物料分类和材质管理数据结构 */
        normalizeCompound(node) {
          if (node.children && !node.children.length) {
            delete node.children;
          }
          return {
            id: node.id,
            label: node.compoundNo+" ["+node.compoundDesc+"]",
            children: node.children,
          };
        },
        /** 查询物料分类管理下拉树结构 */
        getTreeselect() {
          listPureMaterialOrProductCategory().then(response => {
            this.categoryOptions = [];
            const data = { id: 0, categoryNo:"",categoryName: '顶级节点', children: [] };
            data.children = this.handleTree(response.rows, "id", "parentId");
            this.categoryOptions.push(data);
          });
          listCompound().then(response => {
            this.compoundOptions = [];
            const data = { id: 0, compoundNo:"", compoundDesc: '顶级节点', children: [] };
            data.children = this.handleTree(response.rows, "id", "parentId");
            this.compoundOptions.push(data);
          });
        },
        handleAddEngProductBom() {
          this.resetProductBom();
          this.openProductBom = true;
          this.title = "新增BOM";
        },
        handleUpdateEngProductBom(row) {
          this.resetProductBom();
          const id = row.id || this.idsProductBom
          getProductBom(id).then(response => {
              this.formProductBom = response.data;
              this.openProductBom = true;
              this.title = "修改BOM";
          });
        },
        handleDeleteEngProductBom(row) {
          const ids = row.id || this.idsProductBom;
          const seqNoz = row.seqNo || this.captionsProductBom;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delProductBom(ids);
          }).then(() => {
            this.getProductBomList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handleImportProductBom() {
          this.resetImportProductBom();
          this.openImportProductBom = true;
          this.title = "导入BOM";
        },
        handleGenerateMaterialCode(row) {
          const id = row.id || this.ids;
          getProductBom(id).then(response => {
            this.formGenerateProductBom = response.data;
            //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
            this.openGenerateProductBom = true;
            this.title = "生成料号";
          });
          this.getTreeselect();
        },
        /** 提交按钮 */
        submitProductBom() {
            this.$refs["formProductBom"].validate(valid => {
                if (valid) {
                  if(this.formProductBom.id==this.formProductBom.id){
                    if (this.formProductBom.id != null) {
                        updateProductBom(this.formProductBom)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductBom = false;
                            this.getProductBomList();
                        });
                    } else {
                        addProductBom(this.formProductBom)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductBom = false;
                            this.getProductBomList();
                        });
                    }
                  }
                }
            });
        },
        // 取消子表单按钮
        cancelProductBom() {
            this.openProductBom = false;
            this.resetProductBom();
        },
        /** 提交按钮 */
        submitImportProductBom() {
          this.$refs["formImportProductBom"].validate(valid => {
            if (valid) {
              importBomExcel(this.masterId, this.formImportProductBom.excelUrl)
                .then(response => {
                  this.openImportProductBom = false;
                  this.getProductBomList();
                  this.$modal.msgSuccess(response.msg);
                });
            }
          });
        },
        // 取消子表单按钮
        cancelImportProductBom() {
          this.openImportProductBom = false;
          this.resetImportProductBom();
        },
        submitGenerateCode() {
          this.$refs["formGenerateProductBom"].validate(valid => {
            if (valid) {
              if(this.formGenerateProductBom.drawNo==null && this.formGenerateProductBom.compoundId==null
                && this.formGenerateProductBom.materialSpec==null){
                this.$modal.msgWarning("图号、材质、型号，至少有一个不能为空！");
              }else{
                this.formGenerateProductBom.params = {"unitId":this.formGenerateProductBom.unitId};
                generateCode(this.formGenerateProductBom)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.openGenerateProductBom = false;
                    this.getProductBomList();
                  });
              }
            }
          });
        },
        // 取消按钮
        cancelGenerateCode() {
          this.openGenerateProductBom = false;
          this.resetGenerateProductBom();
        },
        /** 查询子表工艺路线数据 */
        getProductRoutingList() {
            var params = {"productId":this.masterId};
            listProductRouting(params).then(res => {
                this.productRoutingList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductRoutingSelectionChange(selection) {
            this.idsProductRouting = selection.map(item => item.id)
            this.captionsProductRouting = selection.map(item => item.seqNo)
            this.singleProductRouting = selection.length!==1
            this.multipleProductRouting = !selection.length
        },
        /** 子表工艺路线的CSS行样式 */
        rowClassNameProductRouting({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductRouting.includes(row.id)){
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
        resetProductRouting() {
            this.formProductRouting = {
                id: null,
                productId: this.masterId,
                seqNo: null,
                lastSeqNo: null,
                nextSeqNo: null,
                processType: null,
                lineType: null,
                secondsFixed:0,
                secondsVariable:0,
                secondsRm:0,
                secondsSetup:0,
                secondsStacking:0,
                secondsTransfer:0,
                secondsBuffer:0,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductRouting");
            // 按关键字段值来初始化子表单数据
            this.onProductRoutingProductIdSelection(this.masterId);
        },
        handleAddEngProductRouting() {
          this.resetProductRouting();
          this.openProductRouting = true;
          this.title = "新增工艺路线";
        },
        handleUpdateEngProductRouting(row) {
          this.resetProductRouting();
          const id = row.id || this.idsProductRouting
          getProductRouting(id).then(response => {
              this.formProductRouting = response.data;
              this.openProductRouting = true;
              this.title = "修改工艺路线";
          });
        },
        handleDeleteEngProductRouting(row) {
          const ids = row.id || this.idsProductRouting;
          const seqNoz = row.seqNo || this.captionsProductRouting;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delProductRouting(ids);
          }).then(() => {
            this.getProductRoutingList();
            this.$modal.msgSuccess("删除成功");
          });
        },

        /** 提交按钮 */
        submitProductRouting() {
            this.$refs["formProductRouting"].validate(valid => {
                if (valid) {
                  if(this.formProductRouting.id==this.formProductRouting.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProductRouting.id != null) {
                        updateProductRouting(this.formProductRouting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRouting = false;
                            this.getProductRoutingList();
                        });
                    } else {
                        addProductRouting(this.formProductRouting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductRouting = false;
                            this.getProductRoutingList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelProductRouting() {
            this.openProductRouting = false;
            this.resetProductRouting();
        },
        /** 查询子表产品图纸数据 */
        getProductDrawingList() {
            var params = {"productId":this.masterId};
            listProductDrawing(params).then(res => {
                this.productDrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleProductDrawingSelectionChange(selection) {
            this.idsProductDrawing = selection.map(item => item.id)
            this.captionsProductDrawing = selection.map(item => item.id)
            this.singleProductDrawing = selection.length!==1
            this.multipleProductDrawing = !selection.length
        },
        /** 子表产品图纸的CSS行样式 */
        rowClassNameProductDrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProductDrawing.includes(row.id)){
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
        resetProductDrawing() {
            this.formProductDrawing = {
                id: null,
                productId: this.masterId,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductDrawing");
            // 按关键字段值来初始化子表单数据
            this.onProductDrawingProductIdSelection(this.masterId);
        },
        // 子表单重置
        resetProductDrawingpreviewDrawing() {
            this.formProductDrawing = {
                id: null,
                productId: this.masterId,
                description: null,
                drawingUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formProductDrawing");
            // 按关键字段值来初始化子表单数据
            this.onProductDrawingProductIdSelection(this.masterId);
        },
        handleAddEngProductDrawing() {
          this.resetProductDrawing();
          this.openProductDrawing = true;
          this.title = "新增产品图纸";
        },
        handleUpdateEngProductDrawing(row) {
          this.resetProductDrawing();
          const id = row.id || this.idsProductDrawing
          getProductDrawing(id).then(response => {
              this.formProductDrawing = response.data;
              this.openProductDrawing = true;
              this.title = "修改产品图纸";
          });
        },
        handleDeleteEngProductDrawing(row) {
          const ids = row.id || this.idsProductDrawing;
          const idz = row.id || this.captionsProductDrawing;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delProductDrawing(ids);
          }).then(() => {
            this.getProductDrawingList();
            this.$modal.msgSuccess("删除成功");
          });
        },
        handlePreviewDrawing(row) {
          this.resetProductDrawing();
          const id = row.id || this.idsProductDrawing
          getProductDrawing(id).then(response => {
            this.formProductDrawing = response.data;
            this.openProductDrawingpreviewDrawing = true;
            this.title = "预览产品图纸";
          });
        },

        /** 提交按钮 */
        submitProductDrawing() {
            this.$refs["formProductDrawing"].validate(valid => {
                if (valid) {
                  if(this.formProductDrawing.id==this.formProductDrawing.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formProductDrawing.id != null) {
                        updateProductDrawing(this.formProductDrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductDrawing = false;
                            this.getProductDrawingList();
                        });
                    } else {
                        addProductDrawing(this.formProductDrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openProductDrawing = false;
                            this.getProductDrawingList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelProductDrawing() {
            this.openProductDrawing = false;
            this.resetProductDrawing();
        },
        /** 查询子表产品SOP数据 */
        getPruductSopList() {
            var params = {"productId":this.masterId};
            listPruductSop(params).then(res => {
                this.pruductSopList = res.rows;
            });
        },
        // 多选框选中数据
        handlePruductSopSelectionChange(selection) {
            this.idsPruductSop = selection.map(item => item.id)
            this.captionsPruductSop = selection.map(item => item.stepSeq)
            this.singlePruductSop = selection.length!==1
            this.multiplePruductSop = !selection.length
        },
        /** 子表产品SOP的CSS行样式 */
        rowClassNamePruductSop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPruductSop.includes(row.id)){
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
        resetPruductSop() {
            this.formPruductSop = {
                id: null,
                productId: this.masterId,
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
            this.resetForm("formPruductSop");
            // 按关键字段值来初始化子表单数据
            this.onPruductSopProductIdSelection(this.masterId);
        },
        // 子表单重置
        resetPruductSoppreviewSop() {
            this.formPruductSop = {
                id: null,
                productId: this.masterId,
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
            this.resetForm("formPruductSop");
            // 按关键字段值来初始化子表单数据
            this.onPruductSopProductIdSelection(this.masterId);
        },
        handleAddEngPruductSop() {
          this.resetPruductSop();
          this.openPruductSop = true;
          this.title = "新增产品SOP";
        },
        handleUpdateEngPruductSop(row) {
          this.resetPruductSop();
          const id = row.id || this.idsPruductSop
          getPruductSop(id).then(response => {
              this.formPruductSop = response.data;
              this.openPruductSop = true;
              this.title = "修改产品SOP";
          });
        },
        handleDeleteEngPruductSop(row) {
          const ids = row.id || this.idsPruductSop;
          const stepSeqz = row.stepSeq || this.captionsPruductSop;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delPruductSop(ids);
          }).then(() => {
            this.getPruductSopList();
            this.$modal.msgSuccess("删除成功");
          });
        },
        handlePreviewSop(row) {
          this.resetPruductSop();
          const id = row.id || this.idsPruductSop
          getPruductSop(id).then(response => {
            this.formPruductSop = response.data;
            this.openPruductSoppreviewSop = true;
            this.title = "预览产品SOP";
          });
        },

        /** 提交按钮 */
        submitPruductSop() {
            this.$refs["formPruductSop"].validate(valid => {
                if (valid) {
                  if(this.formPruductSop.id==this.formPruductSop.id){

                    if (this.formPruductSop.id != null) {
                        updatePruductSop(this.formPruductSop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductSop = false;
                            this.getPruductSopList();
                        });
                    } else {
                        addPruductSop(this.formPruductSop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductSop = false;
                            this.getPruductSopList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelPruductSop() {
            this.openPruductSop = false;
            this.resetPruductSop();
        },
        /** 查询子表产品作业视频数据 */
        getPruductVideoList() {
            var params = {"productId":this.masterId};
            listPruductVideo(params).then(res => {
                this.pruductVideoList = res.rows;
            });
        },
        // 多选框选中数据
        handlePruductVideoSelectionChange(selection) {
            this.idsPruductVideo = selection.map(item => item.id)
            this.captionsPruductVideo = selection.map(item => item.stepSeq)
            this.singlePruductVideo = selection.length!==1
            this.multiplePruductVideo = !selection.length
        },
        /** 子表产品作业视频的CSS行样式 */
        rowClassNamePruductVideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPruductVideo.includes(row.id)){
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
        resetPruductVideo() {
            this.formPruductVideo = {
                id: null,
                productId: this.masterId,
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
            this.resetForm("formPruductVideo");
            // 按关键字段值来初始化子表单数据
            this.onPruductVideoProductIdSelection(this.masterId);
        },
        // 子表单重置
        resetPruductVideopreviewVideo() {
            this.formPruductVideo = {
                id: null,
                productId: this.masterId,
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
            this.resetForm("formPruductVideo");
            // 按关键字段值来初始化子表单数据
            this.onPruductVideoProductIdSelection(this.masterId);
        },
        handleAddEngPruductVideo() {
          this.resetPruductVideo();
          this.openPruductVideo = true;
          this.title = "新增产品作业视频";
        },
        handleUpdateEngPruductVideo(row) {
          this.resetPruductVideo();
          const id = row.id || this.idsPruductVideo
          getPruductVideo(id).then(response => {
              this.formPruductVideo = response.data;
              this.openPruductVideo = true;
              this.title = "修改产品作业视频";
          });
        },
        handleDeleteEngPruductVideo(row) {
          const ids = row.id || this.idsPruductVideo;
          const stepSeqz = row.stepSeq || this.captionsPruductVideo;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delPruductVideo(ids);
          }).then(() => {
            this.getPruductVideoList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewVideo(row) {
          this.resetPruductVideo();
          const id = row.id || this.idsPruductVideo
          getPruductVideo(id).then(response => {
            this.formPruductVideo = response.data;
            this.openPruductVideopreviewVideo = true;
            this.title = "预览产品作业视频";
          });
        },

        /** 提交按钮 */
        submitPruductVideo() {
            this.$refs["formPruductVideo"].validate(valid => {
                if (valid) {
                  if(this.formPruductVideo.id==this.formPruductVideo.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPruductVideo.id != null) {
                        updatePruductVideo(this.formPruductVideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductVideo = false;
                            this.getPruductVideoList();
                        });
                    } else {
                        addPruductVideo(this.formPruductVideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPruductVideo = false;
                            this.getPruductVideoList();
                        });
                    }
                  }
                }
            });
        },
        // 取消子表单按钮
        cancelPruductVideo() {
            this.openPruductVideo = false;
            this.resetPruductVideo();
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
