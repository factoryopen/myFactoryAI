<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
          <el-form-item prop="woId" class="marginBottom5" >
            <span slot="label">
                <span class="fontSize12"><strong>批次编号</strong></span>
            </span>
            <el-select class="inputWidth" v-model="queryParams.mlId" filterable placeholder="请选择批次编号" size="mini">
              <el-option
                v-for="(fkrow, index) in fkMlTraceList"
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
                  :data="mlRoutingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="制造批" align="left" prop="mlId"  width="140">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMlTraceList">
                        <span v-if="item.id==scope.row.mlId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="状态" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.status"/>
                </template>
            </el-table-column>
                <el-table-column label="产品编码" align="left" prop="productId"  width="168">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProductBasisList">
                        <span v-if="item.id==scope.row.productId"
                            :key="index"
                            size="mini">{{item.materialCode}}</span>
                    </template>
                </template>
            </el-table-column>
                    <el-table-column label="工序号" align="right" prop="processSeq"  width="60"/>
                <el-table-column label="工序码" align="center" prop="processId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                            :key="index"
                            size="mini">{{item.processCode}}</span>
                    </template>
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
                <el-table-column label="上序号" align="center" prop="lastSeqNo"  width="60"/>
                <el-table-column label="下序号" align="center" prop="nextSeqNo"  width="60"/>
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
                <el-table-column label="部门" align="center" prop="deptId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkDeptList">
                        <span v-if="item.deptId==scope.row.deptId"
                            :key="index"
                            size="mini">{{item.deptName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="标准固定秒数" align="right" prop="secondsFixed"  width="110"/>
            <el-table-column label="标准可变秒数" align="right" prop="secondsVariable"  width="110"/>
            <el-table-column label="备料秒数" align="right" prop="secondsRm"  width="75"/>
            <el-table-column label="架机秒数" align="right" prop="secondsSetup"  width="75"/>
            <el-table-column label="堆垛秒数" align="right" prop="secondsStacking"  width="75"/>
            <el-table-column label="移转秒数" align="right" prop="secondsTransfer"  width="75"/>
            <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer"  width="75"/>
            <el-table-column label="备注" align="left" prop="remark"/>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getMasterList"/>


        <el-tabs>
            <el-tab-pane label="批次关重料">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnMlRoutingkiparts"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMlRoutingkiparts"
                            @click="handleUpdatePlnMlRoutingkiparts"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMlRoutingkiparts"
                            @click="handleDeletePlnMlRoutingkiparts"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mlRoutingkiparts" border
                        :data="mlRoutingkipartsList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlRoutingkiparts"
                        @selection-change="handleMlRoutingkipartsSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="物料编码" align="left" prop="materialCode" width="168"/>
                    <el-table-column label="物料名称" align="left" prop="materialName" width="140"/>
                    <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdatePlnMlRoutingkiparts(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeletePlnMlRoutingkiparts(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次工具">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnMlRoutingtool"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMlRoutingtool"
                            @click="handleUpdatePlnMlRoutingtool"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMlRoutingtool"
                            @click="handleDeletePlnMlRoutingtool"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mlRoutingtool" border
                        :data="mlRoutingtoolList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlRoutingtool"
                        @selection-change="handleMlRoutingtoolSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="项序" align="center" prop="seqNo" width="50"/>
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
                               @click="handleUpdatePlnMlRoutingtool(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeletePlnMlRoutingtool(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次工序SOP">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnMlRoutingsop"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMlRoutingsop"
                            @click="handleUpdatePlnMlRoutingsop"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMlRoutingsop"
                            @click="handleDeletePlnMlRoutingsop"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mlRoutingsop" border
                        :data="mlRoutingsopList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlRoutingsop"
                        @selection-change="handleMlRoutingsopSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="right" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="left" prop="stepTitle" width="110"/>
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
                               @click="handleUpdatePlnMlRoutingsop(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次工序图纸">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnMlRoutingdrawing"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMlRoutingdrawing"
                            @click="handleUpdatePlnMlRoutingdrawing"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMlRoutingdrawing"
                            @click="handleDeletePlnMlRoutingdrawing"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mlRoutingdrawing" border
                        :data="mlRoutingdrawingList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlRoutingdrawing"
                        @selection-change="handleMlRoutingdrawingSelectionChange"
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
                               @click="handleUpdatePlnMlRoutingdrawing(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="批次工序视频">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddPlnMlRoutingvideo"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMlRoutingvideo"
                            @click="handleUpdatePlnMlRoutingvideo"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMlRoutingvideo"
                            @click="handleDeletePlnMlRoutingvideo"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mlRoutingvideo" border
                        :data="mlRoutingvideoList"
                        highlight-current-row
                        :row-class-name="rowClassNameMlRoutingvideo"
                        @selection-change="handleMlRoutingvideoSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="步序号" align="center" prop="stepSeq" width="60"/>
                    <el-table-column label="步骤标题" align="center" prop="stepTitle" width="110"/>
                    <el-table-column label="步骤描述" align="left" prop="description" width="500"/>
                    <el-table-column label="视频地址" align="left" prop="videoUrl" width="400"/>
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
                               @click="handleUpdatePlnMlRoutingvideo(scope.row)"
                           >修改</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工序移转记尾情">
                <el-row :gutter="10" class="mb8">
                </el-row>
                <el-table ref="processMovesTail" border
                        :data="processMovesTailList"
                        highlight-current-row
                        :row-class-name="rowClassNameProcessMovesTail"
                        @selection-change="handleProcessMovesTailSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="上序号" align="center" prop="lastSeqNo" width="60"/>
                    <el-table-column label="下序号" align="center" prop="nextSeqNo" width="60"/>
                    <el-table-column label="部门" align="center" prop="deptId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkDeptList">
                                <span v-if="item.deptId==scope.row.deptId"
                                    :key="index"
                                    size="mini">{{item.deptName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="班组" align="center" prop="groupId"  width="80">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkWorkgroupList">
                                <span v-if="item.id==scope.row.groupId"
                                    :key="index"
                                    size="mini">{{item.groupName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="标准固定秒数" align="right" prop="secondsFixed" width="110"/>
                    <el-table-column label="标准可变秒数" align="right" prop="secondsVariable" width="110"/>
                    <el-table-column label="备料秒数" align="right" prop="secondsRm" width="75"/>
                    <el-table-column label="架机秒数" align="right" prop="secondsSetup" width="75"/>
                    <el-table-column label="堆垛秒数" align="right" prop="secondsStacking" width="75"/>
                    <el-table-column label="移转秒数" align="right" prop="secondsTransfer" width="75"/>
                    <el-table-column label="缓冲秒数" align="right" prop="secondsBuffer" width="75"/>
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
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openMlRoutingkiparts对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMlRoutingkiparts" width="500px" append-to-body>
            <el-form ref="formMlRoutingkiparts" :model="formMlRoutingkiparts" :rules="rulesMlRoutingkiparts" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMlRoutingkiparts.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料编码</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formMlRoutingkiparts.materialId" placeholder="请选择物料编码" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialInfoList"
                            :key="index"
                            :label="fkrow.materialName +' ['+fkrow.materialName+']'"
                            :value="fkrow.materialName"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                      <el-select class="inputWidth" v-model="formMlRoutingkiparts.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
                        <el-option
                            v-for="(fkrow, index) in fkMaterialInfoList"
                            :key="index"
                            :label="fkrow.materialSpec"
                            :value="fkrow.materialSpec"
                            size="mini"
                        ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="materialSpec" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物料规格</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingkiparts.materialSpec" placeholder="请输入物料规格" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingkiparts.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMlRoutingkiparts">确 定</el-button>
                <el-button @click="cancelMlRoutingkiparts">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingtool对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMlRoutingtool" width="500px" append-to-body>
            <el-form ref="formMlRoutingtool" :model="formMlRoutingtool" :rules="rulesMlRoutingtool" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMlRoutingtool.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="seqNo" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>项序</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingtool.seqNo" placeholder="请输入项序" size="mini" />
                  </el-form-item>
                   <el-form-item prop="toolId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工具类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formMlRoutingtool.toolId" placeholder="请选择工具类型"
                                 @change="onMlRoutingtoolToolIdSelection"  size="mini" >
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
                      <el-input class="inputWidth" v-model="formMlRoutingtool.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMlRoutingtool">确 定</el-button>
                <el-button @click="cancelMlRoutingtool">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingsop对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMlRoutingsop" width="500px" append-to-body>
            <el-form ref="formMlRoutingsop" :model="formMlRoutingsop" :rules="rulesMlRoutingsop" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMlRoutingsop.routingId" placeholder="请输入工序" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingsop.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingsop.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingsop.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>SOP地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formMlRoutingsop.sopUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingsop.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMlRoutingsop">确 定</el-button>
                <el-button @click="cancelMlRoutingsop">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingsoppreviewSop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlRoutingsoppreviewSop" width="800px" append-to-body>
          <div><pdf :src="this.baseUrl+this.formMlRoutingsop.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingdrawing对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMlRoutingdrawing" width="500px" append-to-body>
            <el-form ref="formMlRoutingdrawing" :model="formMlRoutingdrawing" :rules="rulesMlRoutingdrawing" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMlRoutingdrawing.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingdrawing.description" placeholder="请输入图纸描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>图纸链接</strong></span>
                      </span>
                      <imageUpload class="inputWidth" v-model="formMlRoutingdrawing.drawingUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingdrawing.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMlRoutingdrawing">确 定</el-button>
                <el-button @click="cancelMlRoutingdrawing">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingdrawingpreviewDrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlRoutingdrawingpreviewDrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.formMlRoutingdrawing.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingvideo对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMlRoutingvideo" width="500px" append-to-body>
            <el-form ref="formMlRoutingvideo" :model="formMlRoutingvideo" :rules="rulesMlRoutingvideo" label-width="140px" :inline-message="true">
                    <el-form-item prop="routingId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产品路线ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMlRoutingvideo.routingId" placeholder="请输入产品路线ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="stepSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingvideo.stepSeq" placeholder="请输入步序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="stepTitle" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤标题</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingvideo.stepTitle" placeholder="请输入步骤标题" size="mini" />
                  </el-form-item>
                   <el-form-item prop="description" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>步骤描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingvideo.description" placeholder="请输入步骤描述" size="mini" />
                  </el-form-item>
                   <el-form-item  class="marginBottom0">
                     <span slot="label">
                         <span class="fontSize12"><strong>视频地址</strong></span>
                     </span>
                     <fileUpload class="inputWidth" v-model="formMlRoutingvideo.videoUrl" limit="1" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMlRoutingvideo.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMlRoutingvideo">确 定</el-button>
                <el-button @click="cancelMlRoutingvideo">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMlRoutingvideopreviewVideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openMlRoutingvideopreviewVideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.formMlRoutingvideo.videoUrl"/>
          </video>
        </el-dialog>
    </div>
</template>

<script>
import { listMlRouting, getMlRouting, delMlRouting, addMlRouting, updateMlRouting } from "@/api/pln/mlRouting";
import { listMlRoutingkiparts, getMlRoutingkiparts, delMlRoutingkiparts, addMlRoutingkiparts, updateMlRoutingkiparts } from "@/api/pln/mlRoutingkiparts";
import { listMlRoutingtool, getMlRoutingtool, delMlRoutingtool, addMlRoutingtool, updateMlRoutingtool } from "@/api/pln/mlRoutingtool";
import { listMlRoutingsop, getMlRoutingsop, delMlRoutingsop, addMlRoutingsop, updateMlRoutingsop } from "@/api/pln/mlRoutingsop";
import { listMlRoutingdrawing, getMlRoutingdrawing, delMlRoutingdrawing, addMlRoutingdrawing, updateMlRoutingdrawing } from "@/api/pln/mlRoutingdrawing";
import { listMlRoutingvideo, getMlRoutingvideo, delMlRoutingvideo, addMlRoutingvideo, updateMlRoutingvideo } from "@/api/pln/mlRoutingvideo";
import { listProcessMovesTail, getProcessMovesTail, delProcessMovesTail, addProcessMovesTail, updateProcessMovesTail } from "@/api/exe/processMovesTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listDept} from "@/api/system/dept";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listTool} from "@/api/res/tool";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProductBasis} from "@/api/eng/productBasis";
import { listMlTrace} from "@/api/exe/mlTrace";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import pdf from "vue-pdf";

export default {
    name: "MlRouting",
    components: {pdf},
    dicts: ['manufacturing_status_move', 'res_type_line', 'eng_process_type'],
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
            // 批次工艺管理表格数据
            mlRoutingList: [],
            fkUserList: [],
            fkUnitList: [],
            fkDeptList: [],
            fkProcessList: [],
            fkLineList: [],
            fkToolList: [],
            fkWorkgroupList: [],
            fkProductBasisList: [],
            fkMlTraceList: [],
            fkMlHistoryList: [],
            fkMaterialInfoList: [],
            fkMlRoutingList: [],
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
                processSeq: [
                    { required: true, message: "工序号不能为空", trigger: "blur" }
                ],
                processId: [
                    { required: true, message: "工序码不能为空", trigger: "blur" }
                ],
                lineId: [
                    { required: true, message: "产线不能为空", trigger: "blur" }
                ],
                lineType: [
                    { required: true, message: "产线类型不能为空", trigger: "change" }
                ],
                processType: [
                    { required: true, message: "工序类型不能为空", trigger: "change" }
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
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              mlId: null,
              status: null,
              productName: null,
              processId: null,
              lastSeqNo: null,
              nextSeqNo: null,
              lineType: null,
              processType: null,
              secondsFixed: null,
              secondsVariable: null,
              secondsRm: null,
              secondsSetup: null,
              secondsStacking: null,
              secondsTransfer: null,
              secondsBuffer: null,
            },
            //子表信息
            mlRoutingkipartsList:[],
            // 选中数组
            idsMlRoutingkiparts: [],
            captionsMlRoutingkiparts: [],
            // 非单个禁用
            singleMlRoutingkiparts: true,
            // 非多个禁用
            multipleMlRoutingkiparts: true,
            // 子表选中数据
            checkedMlRoutingkiparts: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlRoutingkiparts: false,
            formMlRoutingkiparts: {},
            rulesMlRoutingkiparts: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "物料编码不能为空", trigger: "blur" }
                ],
                materialName: [
                   { required: true, message: "物料名称不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            mlRoutingtoolList:[],
            // 选中数组
            idsMlRoutingtool: [],
            captionsMlRoutingtool: [],
            // 非单个禁用
            singleMlRoutingtool: true,
            // 非多个禁用
            multipleMlRoutingtool: true,
            // 子表选中数据
            checkedMlRoutingtool: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlRoutingtool: false,
            formMlRoutingtool: {},
            rulesMlRoutingtool: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
                ],
                seqNo: [
                   { required: true, message: "项序不能为空", trigger: "blur" }
                ],
                toolId: [
                   { required: true, message: "工具类型不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            mlRoutingsopList:[],
            // 选中数组
            idsMlRoutingsop: [],
            captionsMlRoutingsop: [],
            // 非单个禁用
            singleMlRoutingsop: true,
            // 非多个禁用
            multipleMlRoutingsop: true,
            // 子表选中数据
            checkedMlRoutingsop: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlRoutingsop: false,
            formMlRoutingsop: {},
            rulesMlRoutingsop: {
                routingId: [
                   { required: true, message: "工序不能为空", trigger: "blur" }
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
            openMlRoutingsoppreviewSop: false,
            rulesMlRoutingsoppreviewSop: {
                routingId: [
                    { required: true, message: "工序不能为空", trigger: "blur" }
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
            mlRoutingdrawingList:[],
            // 选中数组
            idsMlRoutingdrawing: [],
            captionsMlRoutingdrawing: [],
            // 非单个禁用
            singleMlRoutingdrawing: true,
            // 非多个禁用
            multipleMlRoutingdrawing: true,
            // 子表选中数据
            checkedMlRoutingdrawing: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlRoutingdrawing: false,
            formMlRoutingdrawing: {},
            rulesMlRoutingdrawing: {
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
            openMlRoutingdrawingpreviewDrawing: false,
            rulesMlRoutingdrawingpreviewDrawing: {
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
            mlRoutingvideoList:[],
            // 选中数组
            idsMlRoutingvideo: [],
            captionsMlRoutingvideo: [],
            // 非单个禁用
            singleMlRoutingvideo: true,
            // 非多个禁用
            multipleMlRoutingvideo: true,
            // 子表选中数据
            checkedMlRoutingvideo: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMlRoutingvideo: false,
            formMlRoutingvideo: {},
            rulesMlRoutingvideo: {
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
            openMlRoutingvideopreviewVideo: false,
            rulesMlRoutingvideopreviewVideo: {
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
            //子表信息
            processMovesTailList:[],
            // 选中数组
            idsProcessMovesTail: [],
            captionsProcessMovesTail: [],
            // 非单个禁用
            singleProcessMovesTail: true,
            // 非多个禁用
            multipleProcessMovesTail: true,
            // 子表选中数据
            checkedProcessMovesTail: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openProcessMovesTail: false,
            formProcessMovesTail: {},
            rulesProcessMovesTail: {
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
        /** 查询外键Tool数据 */
        this.getToolList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键ProductBasis数据 */
        this.getProductBasisList();
        /** 查询外键MlTrace数据 */
        this.getMlTraceList();
        /** 查询外键MlHistory数据 */
        this.getMlHistoryList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键MlRouting数据 */
        this.getMlRoutingList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMlRouting(this.queryParams).then(response => {
              this.mlRoutingList = response.rows;
              this.total = response.total;
              if (this.mlRoutingList && this.mlRoutingList.length>0) {
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
                this.getMlRoutingkipartsList();
                this.getMlRoutingtoolList();
                this.getMlRoutingsopList();
                this.getMlRoutingdrawingList();
                this.getMlRoutingvideoList();
                this.getProcessMovesTailList();
            }else {
                this.mlRoutingkipartsList = null;
                this.mlRoutingtoolList = null;
                this.mlRoutingsopList = null;
                this.mlRoutingdrawingList = null;
                this.mlRoutingvideoList = null;
                this.processMovesTailList = null;
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
        /** 查询外键Tool数据 */
        getToolList() {
            listTool().then(res => {
                this.fkToolList = res.rows;
            });
        },
        /** 查询外键Workgroup数据 */
        getWorkgroupList() {
            listWorkgroup().then(res => {
                this.fkWorkgroupList = res.rows;
            });
        },
        /** 查询外键ProductBasis数据 */
        getProductBasisList() {
            listProductBasis().then(res => {
                this.fkProductBasisList = res.rows;
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
            listMlTrace().then(res => {
                this.fkMlHistoryList = res.rows;
            });
        },
        /** 查询外键MaterialInfo数据 */
        getMaterialInfoList() {
            listMaterialInfo().then(res => {
                this.fkMaterialInfoList = res.rows;
            });
        },
        /** 查询外键MlRouting数据 */
        getMlRoutingList() {
            listMlRouting().then(res => {
                this.fkMlRoutingList = res.rows;
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
            this.captions = selection.map(item => item.productName)
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
        /**主表外键MlId被选择后触发事件*/
        onMlIdSelection(fkId){
            this.fkMlTraceList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mlId = item.id
                }
            });
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
        /**主表外键ProcessId被选择后触发事件*/
        onProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                    this.form.processId = item.id
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
        /**主表外键UnitId被选择后触发事件*/
        onUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.unitId = item.id
                }
            });
        },
        /**主表外键DeptId被选择后触发事件*/
        onDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                    this.form.deptId = item.deptId
                }
            });
        },
        /**主表外键GroupId被选择后触发事件*/
        onGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                    this.form.groupId = item.id
                }
            });
        },
        /**主表外键ReceiveBy被选择后触发事件*/
        onReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.receiveBy = item.userId
                    this.form.postBy = item.userId
                }
            });
        },
        /**主表外键PostBy被选择后触发事件*/
        onPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                    this.form.receiveBy = item.userId
                    this.form.postBy = item.userId
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onMlRoutingkipartsRoutingIdSelection(fkId){
            this.fkMlRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingkiparts.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onMlRoutingtoolRoutingIdSelection(fkId){
            this.fkMlRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingtool.routingId = item.id
                }
            });
        },
        /** 子表外键ToolId被选择后触发事件 **/
        onMlRoutingtoolToolIdSelection(fkId){
            this.fkToolList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingtool.toolId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onMlRoutingsopRoutingIdSelection(fkId){
            this.fkMlRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingsop.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onMlRoutingdrawingRoutingIdSelection(fkId){
            this.fkMlRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingdrawing.routingId = item.id
                }
            });
        },
        /** 子表外键RoutingId被选择后触发事件 **/
        onMlRoutingvideoRoutingIdSelection(fkId){
            this.fkMlRoutingList.forEach(item=>{
                if(fkId === item.id){
                   this.formMlRoutingvideo.routingId = item.id
                }
            });
        },
        /** 子表外键MlId被选择后触发事件 **/
        onProcessMovesTailMlIdSelection(fkId){
            this.fkMlHistoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.mlId = item.id
                }
            });
        },
        /** 子表外键ProductId被选择后触发事件 **/
        onProcessMovesTailProductIdSelection(fkId){
            this.fkProductBasisList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.productId = item.id
                    this.formProcessMovesTail.productName = item.materialName
                    this.formProcessMovesTail.productSpec = item.materialSpec
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onProcessMovesTailProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.processId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onProcessMovesTailLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.lineId = item.id
                }
            });
        },
        /** 子表外键UnitId被选择后触发事件 **/
        onProcessMovesTailUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.unitId = item.id
                }
            });
        },
        /** 子表外键DeptId被选择后触发事件 **/
        onProcessMovesTailDeptIdSelection(fkId){
            this.fkDeptList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.deptId = item.deptId
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onProcessMovesTailGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.groupId = item.id
                }
            });
        },
        /** 子表外键ReceiveBy被选择后触发事件 **/
        onProcessMovesTailReceiveBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.receiveBy = item.userId
                }
            });
        },
        /** 子表外键PostBy被选择后触发事件 **/
        onProcessMovesTailPostBySelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formProcessMovesTail.receiveBy = item.userId
                }
            });
        },

        handleDownload() {
            this.download('pln/mlRouting/export', {
              ...this.queryParams
            }, `mlRouting_${new Date().getTime()}.xlsx`)
        },

        /** 查询子表批次关重料数据 */
        getMlRoutingkipartsList() {
            var params = {"routingId":this.masterId};
            listMlRoutingkiparts(params).then(res => {
                this.mlRoutingkipartsList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlRoutingkipartsSelectionChange(selection) {
            this.idsMlRoutingkiparts = selection.map(item => item.id)
            this.captionsMlRoutingkiparts = selection.map(item => item.materialName)
            this.singleMlRoutingkiparts = selection.length!==1
            this.multipleMlRoutingkiparts = !selection.length
        },
        /** 子表批次关重料的CSS行样式 */
        rowClassNameMlRoutingkiparts({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlRoutingkiparts.includes(row.id)){
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
        resetMlRoutingkiparts() {
            this.formMlRoutingkiparts = {
                id: null,
                routingId: this.masterId,
                materialSpec: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMlRoutingkiparts");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingkipartsRoutingIdSelection(this.masterId);
        },
        handleAddPlnMlRoutingkiparts() {
          this.resetMlRoutingkiparts();
          this.openMlRoutingkiparts = true;
          this.title = "新增批次关重料";
        },
        handleUpdatePlnMlRoutingkiparts(row) {
          this.resetMlRoutingkiparts();
          const id = row.id || this.idsMlRoutingkiparts
          getMlRoutingkiparts(id).then(response => {
              this.formMlRoutingkiparts = response.data;
              this.openMlRoutingkiparts = true;
              this.title = "修改批次关重料";
          });
        },
        handleDeletePlnMlRoutingkiparts(row) {
          const ids = row.id || this.idsMlRoutingkiparts;
          const materialNamez = row.materialName || this.captionsMlRoutingkiparts;

          this.$modal.confirm('确定删除物料名称为"' + materialNamez + '"的数据项？').then(function() {
              return delMlRoutingkiparts(ids);
          }).then(() => {
            this.getMlRoutingkipartsList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitMlRoutingkiparts() {
            this.$refs["formMlRoutingkiparts"].validate(valid => {
                if (valid) {
                  if(this.formMlRoutingkiparts.id==this.formMlRoutingkiparts.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMlRoutingkiparts.id != null) {
                        updateMlRoutingkiparts(this.formMlRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingkiparts = false;
                            this.getMlRoutingkipartsList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMlRoutingkiparts(this.formMlRoutingkiparts)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingkiparts = false;
                            this.getMlRoutingkipartsList();
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
        cancelMlRoutingkiparts() {
            this.openMlRoutingkiparts = false;
            this.resetMlRoutingkiparts();
        },
        /** 查询子表批次工具数据 */
        getMlRoutingtoolList() {
            var params = {"routingId":this.masterId};
            listMlRoutingtool(params).then(res => {
                this.mlRoutingtoolList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlRoutingtoolSelectionChange(selection) {
            this.idsMlRoutingtool = selection.map(item => item.id)
            this.captionsMlRoutingtool = selection.map(item => item.seqNo)
            this.singleMlRoutingtool = selection.length!==1
            this.multipleMlRoutingtool = !selection.length
        },
        /** 子表批次工具的CSS行样式 */
        rowClassNameMlRoutingtool({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlRoutingtool.includes(row.id)){
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
        resetMlRoutingtool() {
            this.formMlRoutingtool = {
                id: null,
                routingId: this.masterId,
                seqNo: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMlRoutingtool");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingtoolRoutingIdSelection(this.masterId);
        },
        handleAddPlnMlRoutingtool() {
          this.resetMlRoutingtool();
          this.openMlRoutingtool = true;
          this.title = "新增批次工具";
        },
        handleUpdatePlnMlRoutingtool(row) {
          this.resetMlRoutingtool();
          const id = row.id || this.idsMlRoutingtool
          getMlRoutingtool(id).then(response => {
              this.formMlRoutingtool = response.data;
              this.openMlRoutingtool = true;
              this.title = "修改批次工具";
          });
        },
        handleDeletePlnMlRoutingtool(row) {
          const ids = row.id || this.idsMlRoutingtool;
          const seqNoz = row.seqNo || this.captionsMlRoutingtool;

          this.$modal.confirm('确定删除项序为"' + seqNoz + '"的数据项？').then(function() {
              return delMlRoutingtool(ids);
          }).then(() => {
            this.getMlRoutingtoolList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitMlRoutingtool() {
            this.$refs["formMlRoutingtool"].validate(valid => {
                if (valid) {
                  if(this.formMlRoutingtool.id==this.formMlRoutingtool.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMlRoutingtool.id != null) {
                        updateMlRoutingtool(this.formMlRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingtool = false;
                            this.getMlRoutingtoolList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMlRoutingtool(this.formMlRoutingtool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingtool = false;
                            this.getMlRoutingtoolList();
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
        cancelMlRoutingtool() {
            this.openMlRoutingtool = false;
            this.resetMlRoutingtool();
        },
        /** 查询子表批次工序SOP数据 */
        getMlRoutingsopList() {
            var params = {"routingId":this.masterId};
            listMlRoutingsop(params).then(res => {
                this.mlRoutingsopList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlRoutingsopSelectionChange(selection) {
            this.idsMlRoutingsop = selection.map(item => item.id)
            this.captionsMlRoutingsop = selection.map(item => item.stepSeq)
            this.singleMlRoutingsop = selection.length!==1
            this.multipleMlRoutingsop = !selection.length
        },
        /** 子表批次工序SOP的CSS行样式 */
        rowClassNameMlRoutingsop({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlRoutingsop.includes(row.id)){
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
        resetMlRoutingsop() {
            this.formMlRoutingsop = {
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
            this.resetForm("formMlRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingsopRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetMlRoutingsoppreviewSop() {
            this.formMlRoutingsop = {
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
            this.resetForm("formMlRoutingsop");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingsopRoutingIdSelection(this.masterId);
        },
        handleAddPlnMlRoutingsop() {
          this.resetMlRoutingsop();
          this.openMlRoutingsop = true;
          this.title = "新增批次工序SOP";
        },
        handleUpdatePlnMlRoutingsop(row) {
          this.resetMlRoutingsop();
          const id = row.id || this.idsMlRoutingsop
          getMlRoutingsop(id).then(response => {
              this.formMlRoutingsop = response.data;
              this.openMlRoutingsop = true;
              this.title = "修改批次工序SOP";
          });
        },
        handleDeletePlnMlRoutingsop(row) {
          const ids = row.id || this.idsMlRoutingsop;
          const stepSeqz = row.stepSeq || this.captionsMlRoutingsop;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delMlRoutingsop(ids);
          }).then(() => {
            this.getMlRoutingsopList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewSop(row) {
          this.resetMlRoutingsop();
          const id = row.id || this.idsMlRoutingsop
          getMlRoutingsop(id).then(response => {
            this.formMlRoutingsop = response.data;
            this.openMlRoutingsoppreviewSop = true;
            this.title = "预览批次工序SOP";
          });
        },

        /** 提交按钮 */
        submitMlRoutingsop() {
            this.$refs["formMlRoutingsop"].validate(valid => {
                if (valid) {
                  if(this.formMlRoutingsop.id==this.formMlRoutingsop.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMlRoutingsop.id != null) {
                        updateMlRoutingsop(this.formMlRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingsop = false;
                            this.getMlRoutingsopList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMlRoutingsop(this.formMlRoutingsop)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingsop = false;
                            this.getMlRoutingsopList();
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
        cancelMlRoutingsop() {
            this.openMlRoutingsop = false;
            this.resetMlRoutingsop();
        },
        /** 查询子表批次工序图纸数据 */
        getMlRoutingdrawingList() {
            var params = {"routingId":this.masterId};
            listMlRoutingdrawing(params).then(res => {
                this.mlRoutingdrawingList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlRoutingdrawingSelectionChange(selection) {
            this.idsMlRoutingdrawing = selection.map(item => item.id)
            this.captionsMlRoutingdrawing = selection.map(item => item.id)
            this.singleMlRoutingdrawing = selection.length!==1
            this.multipleMlRoutingdrawing = !selection.length
        },
        /** 子表批次工序图纸的CSS行样式 */
        rowClassNameMlRoutingdrawing({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlRoutingdrawing.includes(row.id)){
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
        resetMlRoutingdrawing() {
            this.formMlRoutingdrawing = {
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
            this.resetForm("formMlRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingdrawingRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetMlRoutingdrawingpreviewDrawing() {
            this.formMlRoutingdrawing = {
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
            this.resetForm("formMlRoutingdrawing");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingdrawingRoutingIdSelection(this.masterId);
        },
        handleAddPlnMlRoutingdrawing() {
          this.resetMlRoutingdrawing();
          this.openMlRoutingdrawing = true;
          this.title = "新增批次工序图纸";
        },
        handleUpdatePlnMlRoutingdrawing(row) {
          this.resetMlRoutingdrawing();
          const id = row.id || this.idsMlRoutingdrawing
          getMlRoutingdrawing(id).then(response => {
              this.formMlRoutingdrawing = response.data;
              this.openMlRoutingdrawing = true;
              this.title = "修改批次工序图纸";
          });
        },
        handleDeletePlnMlRoutingdrawing(row) {
          const ids = row.id || this.idsMlRoutingdrawing;
          const idz = row.id || this.captionsMlRoutingdrawing;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delMlRoutingdrawing(ids);
          }).then(() => {
            this.getMlRoutingdrawingList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewDrawing(row) {
          this.resetMlRoutingdrawing();
          const id = row.id || this.idsMlRoutingdrawing
          getMlRoutingdrawing(id).then(response => {
            this.formMlRoutingdrawing = response.data;
            this.openMlRoutingdrawingpreviewDrawing = true;
            this.title = "预览批次工序图纸";
          });
        },

        /** 提交按钮 */
        submitMlRoutingdrawing() {
            this.$refs["formMlRoutingdrawing"].validate(valid => {
                if (valid) {
                  if(this.formMlRoutingdrawing.id==this.formMlRoutingdrawing.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMlRoutingdrawing.id != null) {
                        updateMlRoutingdrawing(this.formMlRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingdrawing = false;
                            this.getMlRoutingdrawingList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMlRoutingdrawing(this.formMlRoutingdrawing)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingdrawing = false;
                            this.getMlRoutingdrawingList();
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
        cancelMlRoutingdrawing() {
            this.openMlRoutingdrawing = false;
            this.resetMlRoutingdrawing();
        },
        /** 查询子表批次工序视频数据 */
        getMlRoutingvideoList() {
            var params = {"routingId":this.masterId};
            listMlRoutingvideo(params).then(res => {
                this.mlRoutingvideoList = res.rows;
            });
        },
        // 多选框选中数据
        handleMlRoutingvideoSelectionChange(selection) {
            this.idsMlRoutingvideo = selection.map(item => item.id)
            this.captionsMlRoutingvideo = selection.map(item => item.stepSeq)
            this.singleMlRoutingvideo = selection.length!==1
            this.multipleMlRoutingvideo = !selection.length
        },
        /** 子表批次工序视频的CSS行样式 */
        rowClassNameMlRoutingvideo({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMlRoutingvideo.includes(row.id)){
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
        resetMlRoutingvideo() {
            this.formMlRoutingvideo = {
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
            this.resetForm("formMlRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingvideoRoutingIdSelection(this.masterId);
        },
        // 子表单重置
        resetMlRoutingvideopreviewVideo() {
            this.formMlRoutingvideo = {
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
            this.resetForm("formMlRoutingvideo");
            // 按关键字段值来初始化子表单数据
            this.onMlRoutingvideoRoutingIdSelection(this.masterId);
        },
        handleAddPlnMlRoutingvideo() {
          this.resetMlRoutingvideo();
          this.openMlRoutingvideo = true;
          this.title = "新增批次工序视频";
        },
        handleUpdatePlnMlRoutingvideo(row) {
          this.resetMlRoutingvideo();
          const id = row.id || this.idsMlRoutingvideo
          getMlRoutingvideo(id).then(response => {
              this.formMlRoutingvideo = response.data;
              this.openMlRoutingvideo = true;
              this.title = "修改批次工序视频";
          });
        },
        handleDeletePlnMlRoutingvideo(row) {
          const ids = row.id || this.idsMlRoutingvideo;
          const stepSeqz = row.stepSeq || this.captionsMlRoutingvideo;

          this.$modal.confirm('确定删除步序号为"' + stepSeqz + '"的数据项？').then(function() {
              return delMlRoutingvideo(ids);
          }).then(() => {
            this.getMlRoutingvideoList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },
        handlePreviewVideo(row) {
          this.resetMlRoutingvideo();
          const id = row.id || this.idsMlRoutingvideo
          getMlRoutingvideo(id).then(response => {
            this.formMlRoutingvideo = response.data;
            this.openMlRoutingvideopreviewVideo = true;
            this.title = "预览批次工序视频";
          });
        },

        /** 提交按钮 */
        submitMlRoutingvideo() {
            this.$refs["formMlRoutingvideo"].validate(valid => {
                if (valid) {
                  if(this.formMlRoutingvideo.id==this.formMlRoutingvideo.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMlRoutingvideo.id != null) {
                        updateMlRoutingvideo(this.formMlRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingvideo = false;
                            this.getMlRoutingvideoList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMlRoutingvideo(this.formMlRoutingvideo)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMlRoutingvideo = false;
                            this.getMlRoutingvideoList();
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
        cancelMlRoutingvideo() {
            this.openMlRoutingvideo = false;
            this.resetMlRoutingvideo();
        },
        /** 查询子表工序移转记尾情数据 */
        getProcessMovesTailList() {
            var params = {"id":this.masterId};
            listProcessMovesTail(params).then(res => {
                this.processMovesTailList = res.rows;
            });
        },
        // 多选框选中数据
        handleProcessMovesTailSelectionChange(selection) {
            this.idsProcessMovesTail = selection.map(item => item.id)
            this.captionsProcessMovesTail = selection.map(item => item.productName)
            this.singleProcessMovesTail = selection.length!==1
            this.multipleProcessMovesTail = !selection.length
        },
        /** 子表工序移转记尾情的CSS行样式 */
        rowClassNameProcessMovesTail({ row, rowIndex }) {
            var clsName = ''

            if (this.idsProcessMovesTail.includes(row.id)){
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
