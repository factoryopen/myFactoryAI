<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
          <el-form-item prop="woId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>工单编号</strong></span>
            </span>
            <el-select class="searchInput" v-model="queryParams.woId" filterable placeholder="请选择工单编号" size="mini">
              <el-option
                v-for="(fkrow, index) in fkWoList"
                :key="index"
                :label="fkrow.billNo"
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
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    @click="handleDownload"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="460px"
                  :data="woRoutingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="工单" align="left" prop="woId"  width="125">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWoList">
                        <span v-if="item.id==scope.row.woId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
             <el-table-column label="项序" align="center" prop="seqNo"  width="50"/>
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
            <el-table-column label="标准固定秒数" align="right" prop="secondsFixed"  width="110"/>
            <el-table-column label="标准可变秒数" align="right" prop="secondsVariable"  width="110"/>
            <el-table-column label="备料秒数" align="right" prop="secondsRm"  width="110"/>
            <el-table-column label="架机秒数" align="right" prop="secondsSetup"  width="110"/>
            <el-table-column label="堆垛秒数" align="right" prop="secondsStacking"  width="110"/>
            <el-table-column label="移转秒数" align="right" prop="secondsTransfer"  width="110"/>
            <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer"  width="110"/>
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
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>


        <el-tabs>
            <el-tab-pane label="工单关重料">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnWoRoutingkiparts"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWoRoutingkiparts"
                            @click="handleUpdatePlnWoRoutingkiparts"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWoRoutingkiparts"
                            @click="handleDeletePlnWoRoutingkiparts"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="woRoutingkiparts" border
                        :data="woRoutingkipartsList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRoutingkiparts"
                        @selection-change="handleWoRoutingkipartsSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="物料编码" align="left" prop="materialCode"  width="168"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdatePlnWoRoutingkiparts(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeletePlnWoRoutingkiparts(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单工具">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnWoRoutingtool"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWoRoutingtool"
                            @click="handleUpdatePlnWoRoutingtool"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWoRoutingtool"
                            @click="handleDeletePlnWoRoutingtool"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="woRoutingtool" border
                        :data="woRoutingtoolList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRoutingtool"
                        @selection-change="handleWoRoutingtoolSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="序号" align="center" prop="seqNo" width="50"/>
                    <el-table-column label="工具类型" align="center" prop="toolId"  width="110">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkToolList">
                                <span v-if="item.id==scope.row.toolId"
                                    :key="index"
                                    size="mini">{{item.toolCode}}
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
                               @click="handleUpdatePlnWoRoutingtool(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeletePlnWoRoutingtool(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单工序SOP">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnWoRoutingsop"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWoRoutingsop"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWoRoutingsop"
                            @click="handleDeletePlnWoRoutingsop"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="woRoutingsop" border
                        :data="woRoutingsopList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRoutingsop"
                        @selection-change="handleWoRoutingsopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="right" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="left" prop="stepTitle" width="110"/>
                    <el-table-column label="SOP类型" align="center" prop="sopType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.eng_sop_type" :value="scope.row.sopType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="步骤描述" align="left" prop="description" width="250"/>
                    <el-table-column label="SOP地址" align="center" prop="sopUrl" width="400"/>
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
                               @click="handleUpdatePlnWoRoutingsop(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单工序图纸">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnWoRoutingdrawing"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWoRoutingdrawing"
                            @click="handleUpdatePlnWoRoutingdrawing"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWoRoutingdrawing"
                            @click="handleDeletePlnWoRoutingdrawing"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="woRoutingdrawing" border
                        :data="woRoutingdrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRoutingdrawing"
                        @selection-change="handleWoRoutingdrawingSelectionChange"
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
                               @click="handleUpdatePlnWoRoutingdrawing(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工单工序视频">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnWoRoutingvideo"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWoRoutingvideo"
                            @click="handleUpdatePlnWoRoutingvideo"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWoRoutingvideo"
                            @click="handleDeletePlnWoRoutingvideo"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="woRoutingvideo" border
                        :data="woRoutingvideoList"
                        highlight-current-row
                        :row-class-name="rowClassNameWoRoutingvideo"
                        @selection-change="handleWoRoutingvideoSelectionChange"
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
                               @click="handleUpdatePlnWoRoutingvideo(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openWoRoutingkiparts对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRoutingkiparts" width="500px" append-to-body>
            <el-form ref="formWoRoutingkiparts" :model="formWoRoutingkiparts" :rules="rulesWoRoutingkiparts" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWoRoutingkiparts.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>物料编码</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWoRoutingkiparts.materialId" placeholder="请选择物料编码"
                                 @change="onWoRoutingkipartsMaterialIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMaterialList"
                             :key="index"
                             :label="fkrow.materialName +' ['+fkrow.materialName+']'"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingkiparts.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWoRoutingkiparts">确 定</el-button>
                <el-button @click="cancelWoRoutingkiparts">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingtool对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRoutingtool" width="500px" append-to-body>
            <el-form ref="formWoRoutingtool" :model="formWoRoutingtool" :rules="rulesWoRoutingtool" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWoRoutingtool.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingtool.seqNo" placeholder="请输入序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="toolId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工具类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWoRoutingtool.toolId" placeholder="请选择工具类型"
                                 @change="onWoRoutingtoolToolIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkToolList"
                             :key="index"
                             :label="fkrow.toolCode"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingtool.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWoRoutingtool">确 定</el-button>
                <el-button @click="cancelWoRoutingtool">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingsop对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRoutingsop" width="500px" append-to-body>
            <el-form ref="formWoRoutingsop" :model="formWoRoutingsop" :rules="rulesWoRoutingsop" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWoRoutingsop.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingsop.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingsop.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingsop.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>SOP地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formWoRoutingsop.sopUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingsop.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWoRoutingsop">确 定</el-button>
                <el-button @click="cancelWoRoutingsop">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingsoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoRoutingsoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="this.baseUrl+this.formWoRoutingsop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingdrawing对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRoutingdrawing" width="500px" append-to-body>
            <el-form ref="formWoRoutingdrawing" :model="formWoRoutingdrawing" :rules="rulesWoRoutingdrawing" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWoRoutingdrawing.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingdrawing.description" placeholder="请输入图纸描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸链接</strong></span>
                      </span>
                      <imageUpload class="inputWidth" v-model="formWoRoutingdrawing.drawingUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingdrawing.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWoRoutingdrawing">确 定</el-button>
                <el-button @click="cancelWoRoutingdrawing">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingdrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoRoutingdrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formWoRoutingdrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingvideo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWoRoutingvideo" width="500px" append-to-body>
            <el-form ref="formWoRoutingvideo" :model="formWoRoutingvideo" :rules="rulesWoRoutingvideo" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWoRoutingvideo.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingvideo.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingvideo.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingvideo.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>视频地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formWoRoutingvideo.videoUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWoRoutingvideo.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWoRoutingvideo">确 定</el-button>
                <el-button @click="cancelWoRoutingvideo">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWoRoutingvideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openWoRoutingvideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.formWoRoutingvideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listWoRouting, getWoRouting, delWoRouting, addWoRouting, updateWoRouting } from "@/api/pln/woRouting";
import { listWoRoutingkiparts, getWoRoutingkiparts, delWoRoutingkiparts, addWoRoutingkiparts, updateWoRoutingkiparts } from "@/api/pln/woRoutingkiparts";
import { listWoRoutingtool, getWoRoutingtool, delWoRoutingtool, addWoRoutingtool, updateWoRoutingtool } from "@/api/pln/woRoutingtool";
import { listWoRoutingsop, getWoRoutingsop, delWoRoutingsop, addWoRoutingsop, updateWoRoutingsop } from "@/api/pln/woRoutingsop";
import { listWoRoutingdrawing, getWoRoutingdrawing, delWoRoutingdrawing, addWoRoutingdrawing, updateWoRoutingdrawing } from "@/api/pln/woRoutingdrawing";
import { listWoRoutingvideo, getWoRoutingvideo, delWoRoutingvideo, addWoRoutingvideo, updateWoRoutingvideo } from "@/api/pln/woRoutingvideo";
import { listProcess} from "@/api/eng/process";
import { listMaterial} from "@/api/eng/material";
import { listLine} from "@/api/res/line";
import { listTool} from "@/api/res/tool";
import { listWo} from "@/api/pln/wo";
import pdf from "vue-pdf";

export default {
    name: "WoRouting",
    components: {pdf},
    dicts: ['res_type_line', 'eng_process_type', 'eng_sop_type'],
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
            // 工单工艺管理表格数据
            woRoutingList: [],
            fkProcessList: [],
            fkMaterialList: [],
            fkLineList: [],
            fkToolList: [],
            fkWoList: [],
            fkWoRoutingList: [],
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
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              woId: null,
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
              lineType: null,
              processType: null,
            },
            //子表信息
            woRoutingkipartsList:[],
            // 选中数组
            idsWoRoutingkiparts: [],
            captionsWoRoutingkiparts: [],
            // 非单个禁用
            singleWoRoutingkiparts: true,
            // 非多个禁用
            multipleWoRoutingkiparts: true,
            // 子表选中数据
            checkedWoRoutingkiparts: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRoutingkiparts: false,
            formWoRoutingkiparts: {},
            rulesWoRoutingkiparts: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woRoutingtoolList:[],
            // 选中数组
            idsWoRoutingtool: [],
            captionsWoRoutingtool: [],
            // 非单个禁用
            singleWoRoutingtool: true,
            // 非多个禁用
            multipleWoRoutingtool: true,
            // 子表选中数据
            checkedWoRoutingtool: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRoutingtool: false,
            formWoRoutingtool: {},
            rulesWoRoutingtool: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "序号不能为空", trigger: "blur" }
                ],
                toolId: [
                   { required: true, message: "工具类型不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woRoutingsopList:[],
            // 选中数组
            idsWoRoutingsop: [],
            captionsWoRoutingsop: [],
            // 非单个禁用
            singleWoRoutingsop: true,
            // 非多个禁用
            multipleWoRoutingsop: true,
            // 子表选中数据
            checkedWoRoutingsop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRoutingsop: false,
            formWoRoutingsop: {},
            rulesWoRoutingsop: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                stepSeq: [
                   { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                   { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                sopType: [
                   { required: true, message: "SOP类型不能为空", trigger: "change" }
                ],
                description: [
                   { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                sopUrl: [
                   { required: true, message: "SOP地址不能为空", trigger: "blur" }
                ],
            },
            openWoRoutingsoppreviewSop: false,
            rulesWoRoutingsoppreviewSop: {
                routingId: [
                    { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                stepSeq: [
                    { required: true, message: "步序号不能为空", trigger: "blur" }
                ],
                stepTitle: [
                    { required: true, message: "步骤标题不能为空", trigger: "blur" }
                ],
                sopType: [
                    { required: true, message: "SOP类型不能为空", trigger: "change" }
                ],
                description: [
                    { required: true, message: "步骤描述不能为空", trigger: "blur" }
                ],
                sopUrl: [
                    { required: true, message: "SOP地址不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            woRoutingdrawingList:[],
            // 选中数组
            idsWoRoutingdrawing: [],
            captionsWoRoutingdrawing: [],
            // 非单个禁用
            singleWoRoutingdrawing: true,
            // 非多个禁用
            multipleWoRoutingdrawing: true,
            // 子表选中数据
            checkedWoRoutingdrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRoutingdrawing: false,
            formWoRoutingdrawing: {},
            rulesWoRoutingdrawing: {
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
            openWoRoutingdrawingpreviewDrawing: false,
            rulesWoRoutingdrawingpreviewDrawing: {
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
            woRoutingvideoList:[],
            // 选中数组
            idsWoRoutingvideo: [],
            captionsWoRoutingvideo: [],
            // 非单个禁用
            singleWoRoutingvideo: true,
            // 非多个禁用
            multipleWoRoutingvideo: true,
            // 子表选中数据
            checkedWoRoutingvideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWoRoutingvideo: false,
            formWoRoutingvideo: {},
            rulesWoRoutingvideo: {
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
            openWoRoutingvideopreviewVideo: false,
            rulesWoRoutingvideopreviewVideo: {
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
        /** 查询外键Material数据 */
        this.getMaterialList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Tool数据 */
        this.getToolList();
        /** 查询外键Wo数据 */
        this.getWoList();
        /** 查询外键WoRouting数据 */
        this.getWoRoutingList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listWoRouting(this.queryParams).then(response => {
              this.woRoutingList = response.rows;
              this.total = response.total;
              if (this.woRoutingList && this.woRoutingList.length>0) {
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
                this.getWoRoutingkipartsList();
                this.getWoRoutingtoolList();
                this.getWoRoutingsopList();
                this.getWoRoutingdrawingList();
                this.getWoRoutingvideoList();
            }else {
                this.woRoutingkipartsList = null;
                this.woRoutingtoolList = null;
                this.woRoutingsopList = null;
                this.woRoutingdrawingList = null;
                this.woRoutingvideoList = null;
            }
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
        /** 查询外键Tool数据 */
        getToolList() {
            listTool().then(res => {
                this.fkToolList = res.rows;
            });
        },
        /** 查询外键Wo数据 */
        getWoList() {
            listWo().then(res => {
                this.fkWoList = res.rows;
            });
        },
        /** 查询外键WoRouting数据 */
        getWoRoutingList() {
            listWoRouting().then(res => {
                this.fkWoRoutingList = res.rows;
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
        /**主表外键WoId被选择后触发事件*/
        onWoIdSelection(fkId){
            this.fkWoList.forEach(item=>{
                if(fkId === item.id){
                    this.form.woId = item.id
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
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onWoRoutingkipartsRoutingIdSelection(fkId){
            this.fkWoRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingkiparts.routingId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onWoRoutingkipartsMaterialIdSelection(fkId){
            this.fkMaterialList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingkiparts.materialId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onWoRoutingtoolRoutingIdSelection(fkId){
            this.fkWoRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingtool.routingId = item.id
                }
            });
        },
        /** 子表外键ToolId被选择后触发事件 **/
        onWoRoutingtoolToolIdSelection(fkId){
            this.fkToolList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingtool.toolId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onWoRoutingsopRoutingIdSelection(fkId){
            this.fkWoRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingsop.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onWoRoutingdrawingRoutingIdSelection(fkId){
            this.fkWoRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingdrawing.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onWoRoutingvideoRoutingIdSelection(fkId){
            this.fkWoRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formWoRoutingvideo.routingId = item.id
                }
            });
        },

        handleDownload() {
            this.download('pln/woRouting/export', {
              ...this.queryParams
            }, `woRouting_${new Date().getTime()}.xlsx`)
        },

        /** 查询子表工单关重料数据 */
        getWoRoutingkipartsList() {
            var params = {"routingId":this.masterId};
            listWoRoutingkiparts(params).then(res => {
                this.woRoutingkipartsList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingkipartsSelectionChange(selection) {
            this.idsWoRoutingkiparts = selection.map(item => item.id)
            this.captionsWoRoutingkiparts = selection.map(item => item.id)
            this.singleWoRoutingkiparts = selection.length!==1
            this.multipleWoRoutingkiparts = !selection.length
        },
        /** 子表工单关重料的CSS行样式 */
        rowClassNameWoRoutingkiparts({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRoutingkiparts.includes(row.id)){
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
        resetWoRoutingkiparts() {
            this.formWoRoutingkiparts = {
                id: null,
                routingId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoRoutingkiparts");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingkipartsRoutingIdSelection(this.masterId);
        },
        handleAddPlnWoRoutingkiparts() {
          this.resetWoRoutingkiparts();
          this.openWoRoutingkiparts = true;
          this.title = "新增工单关重料";
        },
        handleUpdatePlnWoRoutingkiparts(row) {
          this.resetWoRoutingkiparts();
          const id = row.id || this.idsWoRoutingkiparts
          getWoRoutingkiparts(id).then(response => {
              this.formWoRoutingkiparts = response.data;
              this.openWoRoutingkiparts = true;
              this.title = "修改工单关重料";
          });
        },
        handleDeletePlnWoRoutingkiparts(row) {
          const ids = row.id || this.idsWoRoutingkiparts;
          const idz = row.id || this.captionsWoRoutingkiparts;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delWoRoutingkiparts(ids);
          }).then(() => {
            this.getWoRoutingkipartsList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWoRoutingkiparts() {
            this.$refs["formWoRoutingkiparts"].validate(valid => {
                if (valid) {
                  if(this.formWoRoutingkiparts.id==this.formWoRoutingkiparts.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWoRoutingkiparts.id != null) {
                        updateWoRoutingkiparts(this.formWoRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingkiparts = false;
                            this.getWoRoutingkipartsList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWoRoutingkiparts(this.formWoRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingkiparts = false;
                            this.getWoRoutingkipartsList();
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
        cancelWoRoutingkiparts() {
            this.openWoRoutingkiparts = false;
            this.resetWoRoutingkiparts();
        },
        /** 查询子表工单工具数据 */
        getWoRoutingtoolList() {
            var params = {"routingId":this.masterId};
            listWoRoutingtool(params).then(res => {
                this.woRoutingtoolList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingtoolSelectionChange(selection) {
            this.idsWoRoutingtool = selection.map(item => item.id)
            this.captionsWoRoutingtool = selection.map(item => item.seqNo)
            this.singleWoRoutingtool = selection.length!==1
            this.multipleWoRoutingtool = !selection.length
        },
        /** 子表工单工具的CSS行样式 */
        rowClassNameWoRoutingtool({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRoutingtool.includes(row.id)){
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
        resetWoRoutingtool() {
            this.formWoRoutingtool = {
                id: null,
                routingId: this.masterId,
                seqNo: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoRoutingtool");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingtoolRoutingIdSelection(this.masterId);
        },
        handleAddPlnWoRoutingtool() {
          this.resetWoRoutingtool();
          this.openWoRoutingtool = true;
          this.title = "新增工单工具";
        },
        handleUpdatePlnWoRoutingtool(row) {
          this.resetWoRoutingtool();
          const id = row.id || this.idsWoRoutingtool
          getWoRoutingtool(id).then(response => {
              this.formWoRoutingtool = response.data;
              this.openWoRoutingtool = true;
              this.title = "修改工单工具";
          });
        },
        handleDeletePlnWoRoutingtool(row) {
          const ids = row.id || this.idsWoRoutingtool;
          const seqNoz = row.seqNo || this.captionsWoRoutingtool;

          this.$modal.confirm('确定删除序号为"' + seqNoz + '"的数据项？').then(function() {
              return delWoRoutingtool(ids);
          }).then(() => {
            this.getWoRoutingtoolList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWoRoutingtool() {
            this.$refs["formWoRoutingtool"].validate(valid => {
                if (valid) {
                  if(this.formWoRoutingtool.id==this.formWoRoutingtool.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWoRoutingtool.id != null) {
                        updateWoRoutingtool(this.formWoRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingtool = false;
                            this.getWoRoutingtoolList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWoRoutingtool(this.formWoRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingtool = false;
                            this.getWoRoutingtoolList();
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
        cancelWoRoutingtool() {
            this.openWoRoutingtool = false;
            this.resetWoRoutingtool();
        },
        /** 查询子表工单工序SOP数据 */
        getWoRoutingsopList() {
            var params = {"routingId":this.masterId};
            listWoRoutingsop(params).then(res => {
                this.woRoutingsopList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingsopSelectionChange(selection) {
            this.idsWoRoutingsop = selection.map(item => item.id)
            this.captionsWoRoutingsop = selection.map(item => item.stepSeq)
            this.singleWoRoutingsop = selection.length!==1
            this.multipleWoRoutingsop = !selection.length
        },
        /** 子表工单工序SOP的CSS行样式 */
        rowClassNameWoRoutingsop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRoutingsop.includes(row.id)){
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
        resetWoRoutingsop() {
            this.formWoRoutingsop = {
                id: null,
                routingId: this.masterId,
                stepSeq: null,
                stepTitle: null,
                sopType: null,
                description: null,
                sopUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingsopRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetWoRoutingsoppreviewSop() {
            this.formWoRoutingsop = {
                id: null,
                routingId: this.masterId,
                stepSeq: null,
                stepTitle: null,
                sopType: null,
                description: null,
                sopUrl: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWoRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingsopRoutingIdSelection(this.masterId);
        },
        handleAddPlnWoRoutingsop() {
          this.resetWoRoutingsop();
          this.openWoRoutingsop = true;
          this.title = "新增工单工序SOP";
        },
        handleUpdatePlnWoRoutingsop(row) {
          this.resetWoRoutingsop();
          const id = row.id || this.idsWoRoutingsop
          getWoRoutingsop(id).then(response => {
              this.formWoRoutingsop = response.data;
              this.openWoRoutingsop = true;
              this.title = "修改工单工序SOP";
          });
        },
        handleDeletePlnWoRoutingsop(row) {
          const ids = row.id || this.idsWoRoutingsop;
          const stepSeqz = row.stepSeq || this.captionsWoRoutingsop;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delWoRoutingsop(ids);
          }).then(() => {
            this.getWoRoutingsopList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewSop(row) {
          this.resetWoRoutingsop();
          const id = row.id || this.idsWoRoutingsop
          getWoRoutingsop(id).then(response => {
            this.formWoRoutingsop = response.data;
            this.openWoRoutingsoppreviewSop = true;
            this.title = "预览工单工序SOP";
          });
        },

        /** 提交按钮 */
        submitWoRoutingsop() {
            this.$refs["formWoRoutingsop"].validate(valid => {
                if (valid) {
                  if(this.formWoRoutingsop.id==this.formWoRoutingsop.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWoRoutingsop.id != null) {
                        updateWoRoutingsop(this.formWoRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingsop = false;
                            this.getWoRoutingsopList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWoRoutingsop(this.formWoRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingsop = false;
                            this.getWoRoutingsopList();
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
        cancelWoRoutingsop() {
            this.openWoRoutingsop = false;
            this.resetWoRoutingsop();
        },
        /** 查询子表工单工序图纸数据 */
        getWoRoutingdrawingList() {
            var params = {"routingId":this.masterId};
            listWoRoutingdrawing(params).then(res => {
                this.woRoutingdrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingdrawingSelectionChange(selection) {
            this.idsWoRoutingdrawing = selection.map(item => item.id)
            this.captionsWoRoutingdrawing = selection.map(item => item.id)
            this.singleWoRoutingdrawing = selection.length!==1
            this.multipleWoRoutingdrawing = !selection.length
        },
        /** 子表工单工序图纸的CSS行样式 */
        rowClassNameWoRoutingdrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRoutingdrawing.includes(row.id)){
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
        resetWoRoutingdrawing() {
            this.formWoRoutingdrawing = {
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
            this.resetForm("formWoRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingdrawingRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetWoRoutingdrawingpreviewDrawing() {
            this.formWoRoutingdrawing = {
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
            this.resetForm("formWoRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingdrawingRoutingIdSelection(this.masterId);
        },
        handleAddPlnWoRoutingdrawing() {
          this.resetWoRoutingdrawing();
          this.openWoRoutingdrawing = true;
          this.title = "新增工单工序图纸";
        },
        handleUpdatePlnWoRoutingdrawing(row) {
          this.resetWoRoutingdrawing();
          const id = row.id || this.idsWoRoutingdrawing
          getWoRoutingdrawing(id).then(response => {
              this.formWoRoutingdrawing = response.data;
              this.openWoRoutingdrawing = true;
              this.title = "修改工单工序图纸";
          });
        },
        handleDeletePlnWoRoutingdrawing(row) {
          const ids = row.id || this.idsWoRoutingdrawing;
          const idz = row.id || this.captionsWoRoutingdrawing;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delWoRoutingdrawing(ids);
          }).then(() => {
            this.getWoRoutingdrawingList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewDrawing(row) {
          this.resetWoRoutingdrawing();
          const id = row.id || this.idsWoRoutingdrawing
          getWoRoutingdrawing(id).then(response => {
            this.formWoRoutingdrawing = response.data;
            this.openWoRoutingdrawingpreviewDrawing = true;
            this.title = "预览工单工序图纸";
          });
        },

        /** 提交按钮 */
        submitWoRoutingdrawing() {
            this.$refs["formWoRoutingdrawing"].validate(valid => {
                if (valid) {
                  if(this.formWoRoutingdrawing.id==this.formWoRoutingdrawing.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWoRoutingdrawing.id != null) {
                        updateWoRoutingdrawing(this.formWoRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingdrawing = false;
                            this.getWoRoutingdrawingList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWoRoutingdrawing(this.formWoRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingdrawing = false;
                            this.getWoRoutingdrawingList();
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
        cancelWoRoutingdrawing() {
            this.openWoRoutingdrawing = false;
            this.resetWoRoutingdrawing();
        },
        /** 查询子表工单工序视频数据 */
        getWoRoutingvideoList() {
            var params = {"routingId":this.masterId};
            listWoRoutingvideo(params).then(res => {
                this.woRoutingvideoList = res.rows;
            });
        },
        // 多选框选中数据
        handleWoRoutingvideoSelectionChange(selection) {
            this.idsWoRoutingvideo = selection.map(item => item.id)
            this.captionsWoRoutingvideo = selection.map(item => item.stepSeq)
            this.singleWoRoutingvideo = selection.length!==1
            this.multipleWoRoutingvideo = !selection.length
        },
        /** 子表工单工序视频的CSS行样式 */
        rowClassNameWoRoutingvideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWoRoutingvideo.includes(row.id)){
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
        resetWoRoutingvideo() {
            this.formWoRoutingvideo = {
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
            this.resetForm("formWoRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingvideoRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetWoRoutingvideopreviewVideo() {
            this.formWoRoutingvideo = {
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
            this.resetForm("formWoRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onWoRoutingvideoRoutingIdSelection(this.masterId);
        },
        handleAddPlnWoRoutingvideo() {
          this.resetWoRoutingvideo();
          this.openWoRoutingvideo = true;
          this.title = "新增工单工序视频";
        },
        handleUpdatePlnWoRoutingvideo(row) {
          this.resetWoRoutingvideo();
          const id = row.id || this.idsWoRoutingvideo
          getWoRoutingvideo(id).then(response => {
              this.formWoRoutingvideo = response.data;
              this.openWoRoutingvideo = true;
              this.title = "修改工单工序视频";
          });
        },
        handleDeletePlnWoRoutingvideo(row) {
          const ids = row.id || this.idsWoRoutingvideo;
          const stepSeqz = row.stepSeq || this.captionsWoRoutingvideo;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delWoRoutingvideo(ids);
          }).then(() => {
            this.getWoRoutingvideoList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewVideo(row) {
          this.resetWoRoutingvideo();
          const id = row.id || this.idsWoRoutingvideo
          getWoRoutingvideo(id).then(response => {
            this.formWoRoutingvideo = response.data;
            this.openWoRoutingvideopreviewVideo = true;
            this.title = "预览工单工序视频";
          });
        },

        /** 提交按钮 */
        submitWoRoutingvideo() {
            this.$refs["formWoRoutingvideo"].validate(valid => {
                if (valid) {
                  if(this.formWoRoutingvideo.id==this.formWoRoutingvideo.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWoRoutingvideo.id != null) {
                        updateWoRoutingvideo(this.formWoRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingvideo = false;
                            this.getWoRoutingvideoList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWoRoutingvideo(this.formWoRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWoRoutingvideo = false;
                            this.getWoRoutingvideoList();
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
        cancelWoRoutingvideo() {
            this.openWoRoutingvideo = false;
            this.resetWoRoutingvideo();
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
