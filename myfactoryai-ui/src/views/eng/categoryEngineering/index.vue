<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
          <el-form-item prop="categoryNo" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>品类编号</strong></span>
          </span>
            <el-input
              v-model="queryParams.categoryNo"
              placeholder="请输入品类编号"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="categoryName" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>品类名称</strong></span>
          </span>
            <el-input
              v-model="queryParams.categoryName"
              placeholder="请输入品类名称"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item  prop="materialType" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>物料类型</strong></span>
          </span>
            <el-select v-model="queryParams.materialType" placeholder="请选择物料类型" class="searchInput" clearable size="mini">
              <el-option
                v-for="dict in dict.type.eng_material_producttype"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="daysCycletime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>生产周期(天)</strong></span>
          </span>
            <el-input
              v-model="queryParams.daysCycletime"
              placeholder="请输入产购周期"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="daysLeadtime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>生产提前期(天)</strong></span>
          </span>
            <el-input
              v-model="queryParams.daysLeadtime"
              placeholder="请输入提前时间"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="daysPosttime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>生产后置期(天)</strong></span>
          </span>
            <el-input
              v-model="queryParams.daysPosttime"
              placeholder="请输入后置时间"
              clearable
              size="mini"
              class="searchInput"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item  prop="status" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>在用否</strong></span>
          </span>
            <el-select v-model="queryParams.status" placeholder="请选择在用否" class="searchInput" clearable size="mini">
              <el-option
                v-for="dict in dict.type.object_status_enable"
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
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>
        <el-table ref="masterTable" v-loading="loading" border
                  height="340px"
                  :data="categoryEngineeringList"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  row-key="id"
                  :default-expand-all="true"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column label="品类编号" align="left" prop="categoryNo" width="300"/>
          <el-table-column label="品类名称" align="left" prop="categoryName" width="150"/>
          <el-table-column label="物料类型" align="center" prop="materialType" width="90">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.eng_material_producttype" :value="scope.row.materialType"/>
            </template>
          </el-table-column>
          <el-table-column label="产线" align="right" prop="lineId"  width="100">
            <template  slot-scope="scope">
              <template v-for="(item,index) in fkLineList">
                <span v-if="item.id==scope.row.lineId"
                      :key="index"
                      size="mini">{{item.lineName}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="损耗率(0-1)" align="right" prop="lossRate" width="110"/>
          <el-table-column label="生产周期(天)" align="right" prop="daysCycletime" width="110"/>
          <el-table-column label="生产提前期(天)" align="right" prop="daysLeadtime" width="110"/>
          <el-table-column label="生产后置期(天)" align="right" prop="daysPosttime" width="110"/>
          <el-table-column label="采购类型" align="center" prop="purchasingType" width="90">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.eng_material_purchasingtype" :value="scope.row.purchasingType"/>
            </template>
          </el-table-column>
          <el-table-column label="消耗类型" align="center" prop="consumingType" width="90">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumingType"/>
            </template>
          </el-table-column>
          <el-table-column label="在用否" align="center" prop="status" width="70">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark"/>
          <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="180">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-folder-add"
                           @click="handleFillChildren(scope.row)"
                      >填空下级</el-button>
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-folder-delete"
                           @click="handleCoverChildren(scope.row)"
                      >覆盖下级</el-button>
                  </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>

        <el-tabs>
            <el-tab-pane label="品类BOM">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngCategoryBom"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleCategoryBom"
                            @click="handleUpdateEngCategoryBom"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleCategoryBom"
                            @click="handleDeleteEngCategoryBom"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="categoryBom" border height="310px"
                        :data="categoryBomList"
                        highlight-current-row
                        :row-class-name="rowClassNameCategoryBom"
                        @selection-change="handleCategoryBomSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="序号" align="center" prop="seqNo" width="60"/>
                    <el-table-column label="料类编号" align="left" prop="materialId"  width="180">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkCategoryAllList">
                                <span v-if="item.id==scope.row.materialId"
                                    :key="index"
                                    size="mini">{{item.categoryNo}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="料类名称" align="left" prop="materialName" width="140"/>
                    <el-table-column label="标准用量" align="right" prop="standardQuantity" width="110"/>
                    <el-table-column label="损耗率" align="right" prop="lossRate" width="110"/>
                    <el-table-column label="消耗类型" align="center" prop="consumeType" width="90">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>
                        </template>
                    </el-table-column>
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
                                    size="mini">{{item.lineName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngCategoryBom(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngCategoryBom(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="品类工艺路线">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngCategoryRouting"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleCategoryRouting"
                            @click="handleUpdateEngCategoryRouting"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleCategoryRouting"
                            @click="handleDeleteEngCategoryRouting"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="categoryRouting" border  height="310px"
                        :data="categoryRoutingList"
                        highlight-current-row
                        :row-class-name="rowClassNameCategoryRouting"
                        @selection-change="handleCategoryRoutingSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="序号" align="center" prop="seqNo" width="60"/>
                    <el-table-column label="工序" align="left" prop="processId"  width="110">
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
                    <el-table-column label="工序类型" align="center" prop="processType" width="90">
                      <template slot-scope="scope">
                        <dict-tag :options="dict.type.eng_process_type" :value="scope.row.processType"/>
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
                    <el-table-column label="产线类型" align="center" prop="lineType" width="90">
                      <template slot-scope="scope">
                        <dict-tag :options="dict.type.res_type_line" :value="scope.row.lineType"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="100"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="100"/>
                    <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="100"/>
                    <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="100"/>
                    <el-table-column label="备料秒数" align="right" prop="secondsRm" width="90"/>
                    <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="90"/>
                    <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="90"/>
                    <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="90"/>
                    <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="90"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngCategoryRouting(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngCategoryRouting(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="品类SOP">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddEngCategorySop"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleCategorySop"
                            @click="handleUpdateEngCategorySop"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleCategorySop"
                            @click="handleDeleteEngCategorySop"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="categorySop" border height="310px"
                        :data="categorySopList"
                        highlight-current-row
                        :row-class-name="rowClassNameCategorySop"
                        @selection-change="handleCategorySopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="left" prop="stepTitle" width="150"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="300"/>
                    <el-table-column label="SOP地址" align="left" prop="sopUrl" width="500"/>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateEngCategorySop(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteEngCategorySop(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openCategoryBom对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openCategoryBom" width="500px" append-to-body>
            <el-form ref="formCategoryBom" :model="formCategoryBom" :rules="rulesCategoryBom" label-width="140px" :inline-message="true">
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryBom.seqNo" placeholder="请输入序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>料类</strong></span>
                      </span>
                      <treeselect v-model="formCategoryBom.materialId"
                                  class="inputWidth"
                                  :options="categoryOptions"
                                  :normalizer="normalizer"
                                  @select="onCatgoryBomMCategorySelected"
                                  placeholder="请选择料类"
                                  size="mini"/>
                  </el-form-item>
                   <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>料类名称</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formCategoryBom.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in categoryName"
                            :key="index"
                            :label="fkrow.categoryName"
                            :value="fkrow.categoryName"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="standardQuantity" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准用量(x.y)</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryBom.standardQuantity" placeholder="请输入标准用量" size="mini" />
                  </el-form-item>
                   <el-form-item prop="lossRate" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>损耗率(0-1)</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryBom.lossRate" placeholder="请输入损耗率" size="mini" />
                  </el-form-item>
                  <el-form-item  prop="calculateType" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>算料类型</strong></span>
                          </span>
                    <el-select class="inputWidth" v-model="formCategoryBom.calculateType" placeholder="请选择算料类型" size="mini" >
                      <el-option
                        v-for="dict in dict.type.eng_material_mrpcaltype"
                        :key="dict.value"
                        :label="dict.label"
                        size="mini"
                        :value="dict.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item  prop="consumeType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>消耗类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formCategoryBom.consumeType" placeholder="请选择消耗类型" size="mini" >
                          <el-option
                              v-for="dict in dict.type.eng_material_consumingtype"
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
                      <el-select class="inputWidth" v-model="formCategoryBom.lineId" placeholder="请选择产线"
                                 @change="onCategoryBomLineIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkLineList"
                             :key="index"
                             :label="fkrow.lineName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryBom.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCategoryBom">确 定</el-button>
                <el-button @click="cancelCategoryBom">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openCategoryRouting对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openCategoryRouting" width="500px" append-to-body>
            <el-form ref="formCategoryRouting" :model="formCategoryRouting" :rules="rulesCategoryRouting" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>品类ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formCategoryRouting.categoryId" placeholder="请输入品类ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.seqNo" placeholder="请输入序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="processId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formCategoryRouting.processId" placeholder="请选择工序"
                                 @change="onCategoryRoutingProcessIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkProcessList"
                             :key="index"
                             :label="fkrow.processCode+ '  '+fkrow.processName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item  prop="processType" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>工序类型</strong></span>
                          </span>
                    <el-select class="inputWidth" v-model="formCategoryRouting.processType" placeholder="请选择工序类型" size="mini" >
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
                    <el-select class="inputWidth" v-model="formCategoryRouting.lineId" placeholder="请选择产线" size="mini" >
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
                    <el-select class="inputWidth" v-model="formCategoryRouting.lineType" placeholder="请选择产线类型" size="mini" >
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
                    <el-input class="inputWidth" v-model="formCategoryRouting.lastSeqNo" placeholder="请输入上序号" size="mini" />
                  </el-form-item>
                  <el-form-item prop="nextSeqNo" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>下序号</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="formCategoryRouting.nextSeqNo" placeholder="请输入下序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsFixed" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准固定秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsFixed" placeholder="请输入标准固定秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsVariable" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>标准可变秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsVariable" placeholder="请输入标准可变秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsRm" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备料秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsRm" placeholder="请输入备料秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsSetup" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>架机秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsSetup" placeholder="请输入架机秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsStacking" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>堆垛秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsStacking" placeholder="请输入堆垛秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsTransfer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>移转秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsTransfer" placeholder="请输入移转秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="secondsBuffer" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>缓冲秒数</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.secondsBuffer" placeholder="请输入缓冲秒数" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategoryRouting.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCategoryRouting">确 定</el-button>
                <el-button @click="cancelCategoryRouting">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openCategorySop对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openCategorySop" width="500px" append-to-body>
            <el-form ref="formCategorySop" :model="formCategorySop" :rules="rulesCategorySop" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>品类ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formCategorySop.categoryId" placeholder="请输入品类ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategorySop.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategorySop.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>SOP地址</strong></span>
                      </span>
                      <imageUpload class="inputWidth" v-model="formCategorySop.sopUrl" size="mini" />
                  </el-form-item>
                  <el-form-item prop="description" class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>步骤描述</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="formCategorySop.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formCategorySop.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitCategorySop">确 定</el-button>
                <el-button @click="cancelCategorySop">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {listCategoryEngineering} from "@/api/eng/categoryEngineering";
import { fillChildren,coverChildren } from "@/api/eng/categoryEngineering";
import { listCategoryBom, getCategoryBom, delCategoryBom, addCategoryBom, updateCategoryBom } from "@/api/eng/categoryBom";
import { listCategoryRouting, getCategoryRouting, delCategoryRouting, addCategoryRouting, updateCategoryRouting } from "@/api/eng/categoryRouting";
import { listCategorySop, getCategorySop, delCategorySop, addCategorySop, updateCategorySop } from "@/api/eng/categorySop";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import {listCategory, listProductCategory} from "@/api/eng/category";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "CategoryEngineering",
    dicts: ['eng_material_mrpcaltype','eng_material_producttype', 'eng_material_purchasingtype', 'eng_material_consumingtype', 'object_status_enable', 'res_type_line', 'eng_process_type'],
    components: {Treeselect},
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
            // 品类工艺表格数据
            categoryEngineeringList: [],
            fkProcessList: [],
            fkCategoryList: [],
            fkLineList: [],
            // 物料分类管理树选项
            categoryOptions: [],
            fkCategoryAllList: [],
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
                categoryNo: [
                    { required: true, message: "品类编号不能为空", trigger: "blur" }
                ],
                materialType: [
                    { required: true, message: "物料类型不能为空", trigger: "change" }
                ],
                daysCycletime: [
                    { required: true, message: "产购周期不能为空", trigger: "blur" }
                ],
                daysLeadtime: [
                    { required: true, message: "提前时间不能为空", trigger: "blur" }
                ],
                daysPosttime: [
                    { required: true, message: "后置时间不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageEnable:true,
              pageNum: 1,
              pageSize: 200,
              categoryNo: null,
              categoryName: null,
              parentId: null,
              materialType: null,
              purchasingType: null,
              consumingType: null,
              lineId: null,
              daysCycletime: null,
              daysLeadtime: null,
              daysPosttime: null,
              status: null,
            },
            //子表信息
            categoryBomList:[],
            // 选中数组
            idsCategoryBom: [],
            captionsCategoryBom: [],
            // 非单个禁用
            singleCategoryBom: true,
            // 非多个禁用
            multipleCategoryBom: true,
            // 子表选中数据
            checkedCategoryBom: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openCategoryBom: false,
            formCategoryBom: {},
            rulesCategoryBom: {
                seqNo: [
                   { required: true, message: "序号不能为空", trigger: "blur" }
                ],
                // materialId: [
                //    { required: true, message: "物料ID不能为空", trigger: "blur" }
                // ],
                standardQuantity: [
                   { required: true, message: "标准用量不能为空", trigger: "blur" }
                ],
                lossRate: [
                  { required: true, message: "损耗率不能为空", trigger: "blur" }
                ],
                materialType: [
                   { required: true, message: "基本类型不能为空", trigger: "change" }
                ],
            },
            //子表信息
            categoryRoutingList:[],
            // 选中数组
            idsCategoryRouting: [],
            captionsCategoryRouting: [],
            // 非单个禁用
            singleCategoryRouting: true,
            // 非多个禁用
            multipleCategoryRouting: true,
            // 子表选中数据
            checkedCategoryRouting: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openCategoryRouting: false,
            formCategoryRouting: {},
            rulesCategoryRouting: {
                categoryId: [
                   { required: true, message: "品类ID不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "序号不能为空", trigger: "blur" }
                ],
                lineId: [
                   { required: true, message: "产线ID不能为空", trigger: "blur" }
                ],
                processId: [
                   { required: true, message: "工序ID不能为空", trigger: "blur" }
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
            categorySopList:[],
            // 选中数组
            idsCategorySop: [],
            captionsCategorySop: [],
            // 非单个禁用
            singleCategorySop: true,
            // 非多个禁用
            multipleCategorySop: true,
            // 子表选中数据
            checkedCategorySop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openCategorySop: false,
            formCategorySop: {},
            rulesCategorySop: {
                categoryId: [
                   { required: true, message: "品类ID不能为空", trigger: "blur" }
                ],
                stepSeq: [
                   { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                   { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                sopUrl: [
                   { required: true, message: "SOP地址不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Category数据 */
        this.getCategoryList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键MaterialInfo数据 */
        this.getBomCategoryList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listCategoryEngineering(this.queryParams).then(response => {
                this.categoryEngineeringList = this.handleTree(response.rows, "id", "parentId");
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
                this.getCategoryBomList();
                this.getCategoryRoutingList();
                this.getCategorySopList();
            }else {
                this.categoryBomList = null;
                this.categoryRoutingList = null;
                this.categorySopList = null;
            }
        },
        /** 查询外键Process数据 */
        getProcessList() {
            listProcess().then(res => {
                this.fkProcessList = res.rows;
            });
        },
        /** 查询外键Category数据 */
        getCategoryList() {
          listCategoryEngineering().then(res => {
                this.fkCategoryList = res.rows;
            });
        },
        /** 查询外键Line数据 */
        getLineList() {
            listLine().then(res => {
                this.fkLineList = res.rows;
            });
        },
        /** 查询BOM的料类数据 */
        getBomCategoryList() {
            listCategory().then(res => {
                this.fkCategoryAllList = res.rows;
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
            this.captions = selection.map(item => item.categoryName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },
        /** 主表的当前行切换 */
        handleCurrentChange(currentRow) {
            this.masterId = currentRow.id;
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
        /**主表外键ParentId被选择后触发事件*/
        onParentIdSelection(fkId){
            this.fkCategoryList.forEach(item=>{
                if(fkId === item.id){
                    this.form.parentId = item.id
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
        /** 子表外键CategoryId被选择后触发事件 **/
        onCategoryBomCategoryIdSelection(fkId){
            this.fkCategoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formCategoryBom.categoryId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onCatgoryBomMCategorySelected(node, instanceId){
          this.formCategoryBom.materialId = node.id;
          this.formCategoryBom.materialName = node.categoryName;
          //转换算料类型
          if (node.materialType==='0' || node.materialType==='3'){
            this.formCategoryBom.calculateType='0';
          }else if (node.materialType==='1' || node.materialType==='2'){
            this.formCategoryBom.calculateType="2";
          }
        },
        /** 子表外键LineId被选择后触发事件 **/
        onCategoryBomLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formCategoryBom.lineId = item.id
                }
            });
        },
        /** 子表外键CategoryId被选择后触发事件 **/
        onCategoryRoutingCategoryIdSelection(fkId){
            this.fkCategoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formCategoryRouting.categoryId = item.id
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onCategoryRoutingProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formCategoryRouting.processId = item.id;
                  this.formCategoryRouting.processName = item.processName;
                }
            });
        },
        /** 子表外键CategoryId被选择后触发事件 **/
        onCategorySopCategoryIdSelection(fkId){
            this.fkCategoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formCategorySop.categoryId = item.id
                }
            });
        },
        handleExport() {
            this.download('eng/categoryEngineering/export', {
              ...this.queryParams
            }, `categoryEngineering_${new Date().getTime()}.xlsx`)
        },
        handleFillChildren(row) {
            const categoryNamez = row.categoryName || this.captions;
            this.$modal.confirm('确定填空品类为"' + categoryNamez + '"的下级工艺吗？').then(function() {
              return fillChildren(row);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        handleCoverChildren(row) {
            const categoryNamez = row.categoryName || this.captions;
            this.$modal.confirm('确定覆盖品类为"' + categoryNamez + '"的下级工艺吗？').then(function() {
              return coverChildren(row);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        /** 查询子表品类BOM数据 */
        getCategoryBomList() {
            var params = {"categoryId":this.masterId};
            listCategoryBom(params).then(res => {
                this.categoryBomList = res.rows;
            });
        },
        // 多选框选中数据
        handleCategoryBomSelectionChange(selection) {
            this.idsCategoryBom = selection.map(item => item.id)
            this.captionsCategoryBom = selection.map(item => item.seqNo)
            this.singleCategoryBom = selection.length!==1
            this.multipleCategoryBom = !selection.length
        },
        /** 子表品类BOM的CSS行样式 */
        rowClassNameCategoryBom({ row, rowIndex }) {
            var clsName = ''

            if (this.idsCategoryBom.includes(row.id)){
                clsName = 'selected-row';
            }
            else if (row.priority == 1) {
                clsName = 'super-urgent-row';
            } else if (row.priority == 2) {
                clsName = 'urgent-row';
            }
            return clsName;
        },
        /** 转换物料分类管理数据结构 */
        normalizer(node) {
          if (node.children && !node.children.length) {
            delete node.children;
          }
          return {
            id: node.id,
            label: node.categoryName,
            children: node.children
          };
        },
        /** 查询物料分类管理下拉树结构 */
        getTreeselect() {
          listCategory().then(response => {
            this.categoryOptions = [];
            const data = { id: 0, categoryName: '顶级节点', children: [] };
            data.children = this.handleTree(response.rows, "id", "parentId");
            this.categoryOptions.push(data);
          });
        },
        // 子表单重置
        resetCategoryBom() {
            this.formCategoryBom = {
                id: null,
                categoryId: this.masterId,
                seqNo: null,
                standardQuantity: 0,
                lossRate: 0,
                consumeType: 1,
                materialType: '3',
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formCategoryBom");
            // 按关键字段值来初始化子表单数据
            this.onCategoryBomCategoryIdSelection(this.masterId);
        },
        handleAddEngCategoryBom() {
          this.resetCategoryBom();
          this.getTreeselect();
          this.openCategoryBom = true;
          this.title = "新增";
        },
        handleUpdateEngCategoryBom(row) {
          this.resetCategoryBom();
          const id = row.id || this.idsCategoryBom
          getCategoryBom(id).then(response => {
              this.formCategoryBom = response.data;
              this.openCategoryBom = true;
              this.title = "修改";
          });
          this.getTreeselect();
        },
        handleDeleteEngCategoryBom(row) {
          const ids = row.id || this.idsCategoryBom;
          const seqNoz = row.seqNo || this.captionsCategoryBom;

          this.$modal.confirm('确定删除序号为"' + seqNoz + '"的数据项？').then(function() {
              return delCategoryBom(ids);
          }).then(() => {
            this.getCategoryBomList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitCategoryBom() {
            this.$refs["formCategoryBom"].validate(valid => {
                if (valid) {
                  if(this.formCategoryBom.id==this.formCategoryBom.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formCategoryBom.id != null) {
                        updateCategoryBom(this.formCategoryBom)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategoryBom = false;
                            this.getCategoryBomList();
                        });
                    } else {
                        addCategoryBom(this.formCategoryBom)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategoryBom = false;
                            this.getCategoryBomList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelCategoryBom() {
            this.openCategoryBom = false;
            this.resetCategoryBom();
        },
        /** 查询子表品类工艺路线数据 */
        getCategoryRoutingList() {
            var params = {"categoryId":this.masterId};
            listCategoryRouting(params).then(res => {
                this.categoryRoutingList = res.rows;
            });
        },
        // 多选框选中数据
        handleCategoryRoutingSelectionChange(selection) {
            this.idsCategoryRouting = selection.map(item => item.id)
            this.captionsCategoryRouting = selection.map(item => item.seqNo)
            this.singleCategoryRouting = selection.length!==1
            this.multipleCategoryRouting = !selection.length
        },
        /** 子表品类工艺路线的CSS行样式 */
        rowClassNameCategoryRouting({ row, rowIndex }) {
            var clsName = ''

            if (this.idsCategoryRouting.includes(row.id)){
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
        resetCategoryRouting() {
            this.formCategoryRouting = {
                id: null,
                categoryId: this.masterId,
                seqNo: null,
                processId:null,
                processType: null,
                lineId: null,
                lineType: null,
                lastSeqNo: null,
                nextSeqNo: null,
                secondsFixed: 0,
                secondsVariable: 0,
                secondsRm: 0,
                secondsSetup: 0,
                secondsStacking: 0,
                secondsTransfer: 0,
                secondsBuffer: 0,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formCategoryRouting");
            // 按关键字段值来初始化子表单数据
            this.onCategoryRoutingCategoryIdSelection(this.masterId);
        },
        handleAddEngCategoryRouting() {
          this.resetCategoryRouting();
          this.openCategoryRouting = true;
          this.title = "新增";
        },
        handleUpdateEngCategoryRouting(row) {
          this.resetCategoryRouting();
          const id = row.id || this.idsCategoryRouting
          getCategoryRouting(id).then(response => {
              this.formCategoryRouting = response.data;
              this.openCategoryRouting = true;
              this.title = "修改";
          });
        },
        handleDeleteEngCategoryRouting(row) {
          const ids = row.id || this.idsCategoryRouting;
          const seqNoz = row.seqNo || this.captionsCategoryRouting;

          this.$modal.confirm('确定删除序号为"' + seqNoz + '"的数据项？').then(function() {
              return delCategoryRouting(ids);
          }).then(() => {
            this.getCategoryRoutingList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitCategoryRouting() {
            this.$refs["formCategoryRouting"].validate(valid => {
                if (valid) {
                  if(this.formCategoryRouting.id==this.formCategoryRouting.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formCategoryRouting.id != null) {
                        updateCategoryRouting(this.formCategoryRouting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategoryRouting = false;
                            this.getCategoryRoutingList();
                        });
                    } else {
                        addCategoryRouting(this.formCategoryRouting)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategoryRouting = false;
                            this.getCategoryRoutingList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelCategoryRouting() {
            this.openCategoryRouting = false;
            this.resetCategoryRouting();
        },
        /** 查询子表品类SOP数据 */
        getCategorySopList() {
            var params = {"categoryId":this.masterId};
            listCategorySop(params).then(res => {
                this.categorySopList = res.rows;
            });
        },
        // 多选框选中数据
        handleCategorySopSelectionChange(selection) {
            this.idsCategorySop = selection.map(item => item.id)
            this.captionsCategorySop = selection.map(item => item.stepSeq)
            this.singleCategorySop = selection.length!==1
            this.multipleCategorySop = !selection.length
        },
        /** 子表品类SOP的CSS行样式 */
        rowClassNameCategorySop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsCategorySop.includes(row.id)){
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
        resetCategorySop() {
            this.formCategorySop = {
                id: null,
                categoryId: this.masterId,
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
            this.resetForm("formCategorySop");
            // 按关键字段值来初始化子表单数据
            this.onCategorySopCategoryIdSelection(this.masterId);
        },
        handleAddEngCategorySop() {
          this.resetCategorySop();
          this.openCategorySop = true;
          this.title = "新增";
        },
        handleUpdateEngCategorySop(row) {
          this.resetCategorySop();
          const id = row.id || this.idsCategorySop
          getCategorySop(id).then(response => {
              this.formCategorySop = response.data;
              this.openCategorySop = true;
              this.title = "修改";
          });
        },
        handleDeleteEngCategorySop(row) {
          const ids = row.id || this.idsCategorySop;
          const stepSeqz = row.stepSeq || this.captionsCategorySop;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delCategorySop(ids);
          }).then(() => {
            this.getCategorySopList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitCategorySop() {
            this.$refs["formCategorySop"].validate(valid => {
                if (valid) {
                  if(this.formCategorySop.id==this.formCategorySop.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formCategorySop.id != null) {
                        updateCategorySop(this.formCategorySop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategorySop = false;
                            this.getCategorySopList();
                        });
                    } else {
                        addCategorySop(this.formCategorySop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openCategorySop = false;
                            this.getCategorySopList();
                        });
                    }
                  }
                }
            });
        },

        // 取消子表单按钮
        cancelCategorySop() {
            this.openCategorySop = false;
            this.resetCategorySop();
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
