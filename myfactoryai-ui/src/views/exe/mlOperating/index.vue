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
                    icon="el-icon-folder-add"
                    size="mini"
                    :disabled="multiple"
                    @click="handleAcceptMl"
                >接收</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-phone-outline"
                    size="mini"
                    :disabled="multiple"
                    @click="handleRequestMaterial"
                >请料</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    icon="el-icon-folder-remove"
                    size="mini"
                    :disabled="multiple"
                    @click="handlePostMl"
                >转出</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-bell"
                size="mini"
                :disabled="multiple"
                @click="handleStockinRequest"
              >请入库</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-guide"
                    size="mini"
                    :disabled="single"
                    @click="handlePreviewMlsop"
                >SOP</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-picture"
                    size="mini"
                    :disabled="single"
                    @click="handlePreviewMldrawing"
                >图纸</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-video-camera"
                    size="mini"
                    :disabled="single"
                    @click="handlePreviewMlvideo"
                >视频</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  height="500px"
                  :data="mlOperatingList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  :cell-style="cellStyle"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  @row-dblclick="handleMasterCellDblclick"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="批次号" align="left" prop="billNo"  width="140"/>
            <el-table-column label="产品编码" align="left" prop="productCode"  width="168"/>
            <el-table-column label="产品名称" align="left" prop="productName"  width="168"/>
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
            <el-table-column label="现工序" align="center" prop="currentProcessSeq"  width="60"/>
            <el-table-column label="现工序名" align="center" prop="currentProcessId"  width="80">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.currentProcessId"
                            :key="index"
                            size="mini">{{item.processName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="工序进度" align="center" prop="processProgress" width="70">
              <template slot-scope="scope">
                <dict-tag :options="dict.type.manufacturing_status_move" :value="scope.row.processProgress"/>
              </template>
            </el-table-column>
            <el-table-column label="现产线名" align="center" prop="lineId"  width="90">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkLineList">
                            <span v-if="item.id==scope.row.lineId"
                                  :key="index"
                                  size="mini">{{item.lineName}}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="现班组" align="center" prop="currentWorkgroupId"  width="90">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkWorkgroupList">
                        <span v-if="item.id==scope.row.currentWorkgroupId" :key="index" ize="mini">{{item.groupName}}</span>
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
            <el-table-column label="批次类型" align="center" prop="mlType" width="75">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.pln_ml_type" :value="scope.row.mlType"/>
                </template>
            </el-table-column>
               <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="291">
                  <template slot-scope="scope">
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-video-play"
                           :disabled="scope.row.processProgress!=4 && scope.row.processProgress!=5 && scope.row.processProgress!=6"
                           @click="handleStartWork(scope.row)"
                      >开工</el-button>
                      <el-button
                           size="mini"
                           type="text"
                           icon="el-icon-video-pause"
                           :disabled="scope.row.processProgress!=5 && scope.row.processProgress!=6"
                           @click="handleFinishWork(scope.row)"
                      >完工</el-button>
<!--                      <el-button-->
<!--                           size="mini"-->
<!--                           type="text"-->
<!--                           icon="el-icon-guide"-->
<!--                           @click="handlePreviewRoutingsop(scope.row)"-->
<!--                      >SOP</el-button>-->
<!--                      <el-button-->
<!--                           size="mini"-->
<!--                           type="text"-->
<!--                           icon="el-icon-picture"-->
<!--                           @click="handlePreviewRoutingdraw(scope.row)"-->
<!--                      >图纸</el-button>-->
<!--                      <el-button-->
<!--                           size="mini"-->
<!--                           type="text"-->
<!--                           icon="el-icon-video-camera"-->
<!--                           @click="handlePreviewRoutingvideo(scope.row)"-->
<!--                      >视频</el-button>-->
                  </template>
              </el-table-column>
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
            <el-table-column label="工序名" align="left" prop="processId"  width="100">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkProcessList">
                        <span v-if="item.id==scope.row.processId"
                              :key="index"
                              size="mini">{{item.processName}}</span>
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

        <!-- 创建master.openpreview对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreview" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.form.sopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建master.openpreviewMldrawing对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreviewMldrawing" width="800px" append-to-body>
          <img :src="this.baseUrl+this.form.drawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建master.openpreviewMlvideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreviewMlvideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.form.videoUrl"/>
          </video>
        </el-dialog>

        <!-- 创建master.openstartWork对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openstartWork" width="500px" append-to-body>
          <el-form ref="formstartWork" :model="formstartWork" :rules="rulesstartWork" label-width="120px" :inline-message="true">
            <el-form-item  prop="billNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>制造批</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.billNo" size="mini" :disabled="true" />
            </el-form-item>
            <el-form-item prop="productId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>产品编码</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.productCode" size="mini" :disabled="true"/>
            </el-form-item>
            <el-form-item prop="productName" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>产品名称</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.productName"  size="mini" :disabled="true"/>
            </el-form-item>
            <el-form-item  prop="processSeq" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>工序号</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.currentProcessSeq" size="mini" :disabled="true" />
            </el-form-item>
            <el-form-item prop="processId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>工序码</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formstartWork.currentProcessId"
                         @change="onProcessIdSelection"  size="mini" :disabled="true" >
                <el-option
                  v-for="(fkrow, index) in fkProcessList"
                  :key="index"
                  :label="fkrow.processCode"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>单位</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formstartWork.unitId" placeholder="请选择单位"
                         @change="onUnitIdSelection"  size="mini" :disabled="true" >
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
                  <span class="fontSize12"><strong>可开工数量</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.quantityAvailable" size="mini" :disabled="true"/>
            </el-form-item>
            <hr>
            <el-form-item prop="quantityStart" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>实开工数量</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.quantityStart" placeholder="请输入转出数量" size="mini" />
            </el-form-item>
            <el-form-item  prop="machineId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>可开工机台</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formstartWork.machineId" placeholder="请选择机台" size="mini">
                <el-option
                  v-for="(fkrow, index) in startableMachineList"
                  :key="index"
                  :label="fkrow.machineName"
                  :value="fkrow.machineId"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="operator" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>作业者</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formstartWork.operator" size="mini" :disabled="true"/>
            </el-form-item>
<!--            <el-form-item prop="groupName" class="marginBottom0">-->
<!--              <span slot="label">-->
<!--                  <span class="fontSize12"><strong>作业班组</strong></span>-->
<!--              </span>-->
<!--              <el-input class="inputWidth" v-model="formstartWork.groupName" size="mini" :disabled="true"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item prop="lineName" class="marginBottom0">-->
<!--              <span slot="label">-->
<!--                  <span class="fontSize12"><strong>作业产线</strong></span>-->
<!--              </span>-->
<!--              <el-input class="inputWidth" v-model="formstartWork.lineName" size="mini" :disabled="true"/>-->
<!--            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitstartWork">确 定</el-button>
             <el-button @click="cancelstartWork">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 创建master.openfinishWork对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openfinishWork" width="500px" append-to-body>
          <el-form ref="formfinishWork" :model="formfinishWork" :rules="rulesfinishWork" label-width="120px" :inline-message="true">
            <el-form-item  prop="billNo" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>制造批</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.billNo"  size="mini"  disabled="false" />
            </el-form-item>
            <el-form-item prop="productId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>产品编码</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.productCode" size="mini"  disabled="true" />
            </el-form-item>
            <el-form-item prop="productName" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>产品名称</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.productName" size="mini" disabled="true"/>
            </el-form-item>
            <el-form-item  prop="processSeq" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>工序号</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.currentProcessSeq" placeholder="请输入工序号" size="mini"  disabled="true" />
            </el-form-item>
            <el-form-item prop="processId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>工序码</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formfinishWork.currentProcessId" placeholder="请选择工序码"
                         @change="onProcessIdSelection"  size="mini"  disabled="true" >
                <el-option
                  v-for="(fkrow, index) in fkProcessList"
                  :key="index"
                  :label="fkrow.processCode"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom0" >
              <span slot="label">
                  <span class="fontSize12"><strong>单位</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formfinishWork.unitId" placeholder="请选择单位"
                         @change="onUnitIdSelection"  size="mini"  disabled="true" >
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
            <el-form-item  prop="wsId" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>开工单号</strong></span>
              </span>
              <el-select class="inputWidth" v-model="formfinishWork.wsId" placeholder="请选择开工单" @change="onWorkSegemntSelection" size="mini">
                <el-option
                  v-for="(fkrow, index) in unfinishedWorksegmentList"
                  :key="index"
                  :label="fkrow.billNo"
                  :value="fkrow.id"
                  size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  prop="quantityFinish" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>完工数量</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.quantityFinish" size="mini" disabled="true"/>
            </el-form-item>
            <el-form-item prop="operator" class="marginBottom0">
              <span slot="label">
                  <span class="fontSize12"><strong>作业者</strong></span>
              </span>
              <el-input class="inputWidth" v-model="formfinishWork.operator" size="mini" :disabled="true"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="submitfinishWork">确 定</el-button>
             <el-button @click="cancelfinishWork">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 创建master.openpreviewRoutingsop对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreviewRoutingsop" width="800px" append-to-body>
          <div><pdf :src="baseUrl+this.form.routingSopUrl" ></pdf></div>
        </el-dialog>
        <!-- 创建master.openpreviewRoutingdraw对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreviewRoutingdraw" width="800px" append-to-body>
          <img :src="this.baseUrl+this.form.routingDrawingUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
        <!-- 创建master.openpreviewRoutingvideo对话框 -->
        <el-dialog :title="title" class="dialogPreview" :visible.sync="openpreviewRoutingvideo" width="800px" append-to-body>
          <video controls="controls" width="800px">
            <source type="video/mp4" :src="this.baseUrl+this.form.routingVideoUrl"/>
          </video>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="工序出工">
              <el-row :gutter="10" class="mb8">
              </el-row>
              <el-table ref="processWork" border
                        :data="processWorkList"
                        highlight-current-row
                        :row-class-name="rowClassNameProcessWork"
                        @selection-change="handleProcessWorkSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="开工单号" align="center" prop="billNo" width="125"/>
                <el-table-column label="状态" align="center" prop="status" width="60">
                  <template slot-scope="scope">
                    <dict-tag :options="dict.type.manufacturing_status_worksegment" :value="scope.row.status"/>
                  </template>
                </el-table-column>
                <el-table-column label="班别" align="center" prop="workShifitId"  width="90">
                  <template  slot-scope="scope">
                    <template v-for="(item,index) in fkShiftList">
                                  <span v-if="item.id==scope.row.workShifitId"
                                        :key="index"
                                        size="mini">{{item.shiftDesc}}
                                  </span>
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
                <el-table-column label="出工数" align="right" prop="quantityStart" width="70"/>
                <el-table-column label="分批数" align="right" prop="quantitySplit" width="70"/>
                <el-table-column label="报废数" align="right" prop="quantityScrap" width="70"/>
                <el-table-column label="重派数" align="right" prop="quantityRedisp" width="70"/>
                <el-table-column label="返工数" align="right" prop="quantityRework" width="70"/>
                <el-table-column label="待判数" align="right" prop="quantityPending" width="70"/>
                <el-table-column label="特采次" align="right" prop="quantityAod" width="70"/>
                <el-table-column label="完工数" align="right" prop="quantityFinish" width="70"/>
                <el-table-column label="出工时间" align="center" prop="startTime" width="120">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="出工人" align="center" prop="startBy"  width="70">
                  <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                                  <span v-if="item.userId==scope.row.startBy"
                                        :key="index"
                                        size="mini">{{item.nickName}}
                                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="收工时间" align="center" prop="finishTime" width="120">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.finishTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="收工人" align="center" prop="finishBy"  width="70">
                  <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUserList">
                                  <span v-if="item.userId==scope.row.finishBy"
                                        :key="index"
                                        size="mini">{{item.nickName}}
                                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="机台" align="left" prop="machineId"  width="80">
                  <template  slot-scope="scope">
                    <template v-for="(item,index) in fkMachineList">
                                  <span v-if="item.id==scope.row.machineId"
                                        :key="index"
                                        size="mini">{{item.machineCode}}
                                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="模具" align="right" prop="moldId"  width="80">
                  <template  slot-scope="scope">
                    <template v-for="(item,index) in fkToolList">
                          <span v-if="item.id==scope.row.moldId"
                                :key="index"
                                size="mini">{{item.toolCode}}
                          </span>
                    </template>
                  </template>
                </el-table-column>
<!--                <el-table-column label="工具" align="right" prop="toolId"  width="80">-->
<!--                  <template  slot-scope="scope">-->
<!--                    <template v-for="(item,index) in fkToolList">-->
<!--                                  <span v-if="item.id==scope.row.toolId"-->
<!--                                        :key="index"-->
<!--                                        size="mini">{{item.toolCode}}-->
<!--                                  </span>-->
<!--                    </template>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="量具" align="right" prop="gaugeId"  width="80">-->
<!--                  <template  slot-scope="scope">-->
<!--                    <template v-for="(item,index) in fkToolList">-->
<!--                                  <span v-if="item.id==scope.row.gaugeId"-->
<!--                                        :key="index"-->
<!--                                        size="mini">{{item.toolCode}}-->
<!--                                  </span>-->
<!--                    </template>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <el-table-column label="备注" align="left" prop="remark"/>
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

    </div>
</template>

<script>
import {getMlOperating, requestStockin, listMlOperatingByOperator,listStartableMachine,listUnfinishedWs} from "@/api/exe/mlOperating";
import { acceptMl,requestMaterial,postMl,startWork,finishWork } from "@/api/exe/mlOperating";
import { listProcessWork, listProcessingWorkByMl} from "@/api/exe/processWork";
import { listMlHistoryTail} from "@/api/exe/mlHistoryTail";
import { listUser} from "@/api/system/user";
import { listUnit} from "@/api/bas/unit";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listWorkgroup} from "@/api/res/workgroup";
import { listProject} from "@/api/ord/project";
import { listWo} from "@/api/pln/wo";
import {listMlTrace} from "@/api/exe/mlTrace";
import { listProcessMoves} from "@/api/exe/processMoves";
import pdf from "vue-pdf";
import {listMachine} from "@/api/res/machine";
import {listTool} from "@/api/res/tool";
import {listShift} from "@/api/res/shift";

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
            mlOperatingList: [],
            startableMachineList:[],
            unfinishedWorksegmentList:[],
            fkProcessMovesList:[],
            fkMlTraceList:[],
            fkUserList: [],
            fkUnitList: [],
            fkProcessList: [],
            fkLineList: [],
            fkMachineList: [],
            fkToolList: [],
            fkWorkgroupList: [],
            fkProjectList: [],
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
            openpreview: false,
            rulespreview: {},
            openpreviewMldrawing: false,
            rulespreviewMldrawing: {},
            openpreviewMlvideo: false,
            rulespreviewMlvideo: {},
            formstartWork:{},
            openstartWork: false,
            rulesstartWork: {
              quantityStart: [
                { required: true, message: "开工数量不能为空", trigger: "blur" }
              ],
            },
            formfinishWork:{},
            openfinishWork: false,
            rulesfinishWork: {
              wsId: [
                { required: true, message: "开工单号不能为空", trigger: "blur" }
              ],
              quantityFinish: [
                { required: true, message: "完工数量不能为空", trigger: "blur" }
              ],
            },
            openpreviewRoutingsop: false,
            rulespreviewRoutingsop: {},
            openpreviewRoutingdraw: false,
            rulespreviewRoutingdraw: {},
            openpreviewRoutingvideo: false,
            rulespreviewRoutingvideo: {},
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
            processWorkList:[],
            // 选中数组
            idsProcessWork: [],
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
        /** 查询外键Machine数据 */
        this.getMachineList();
        /** 查询外键Tool数据 */
        this.getToolList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
        /** 查询外键Shift数据 */
        this.getShiftList();
        /** 查询外键Project数据 */
        this.getProjectList();
        /** 查询外键Wo数据 */
        this.getWoList();
        /** 查询外键Ml数据 */
        this.getMlTraceList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
          listMlOperatingByOperator(this.queryParams).then(response => {
              this.mlOperatingList = response.rows;
              this.total = response.total;
              if (this.mlOperatingList && this.mlOperatingList.length>0) {
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
            this.getProcessWorkList();
            this.getMlHistoryTailList();
          }else {
            this.processWorkList = null;
            this.mlHistoryTailList = null;
          }
        },
        /** 查询外键User数据 */
        getMlTraceList() {
          listMlTrace().then(res => {
            this.fkMlTraceList = res.rows;
          });
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
        /** 查询外键Machine数据 */
        getMachineList() {
          listMachine().then(res => {
            this.fkMachineList = res.rows;
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
        /** 查询外键Shift数据 */
        getShiftList() {
          listShift().then(res => {
            this.fkShiftList = res.rows;
          });
        },
        /** 查询待完工的开工数据 */
        getStartableMachineList(data) {
          listStartableMachine(data).then(res => {
            this.startableMachineList = res.rows;
          });
        },
      /** 查询待完工的开工数据 */
      getUnfinishedWsList(data) {
        listUnfinishedWs(data).then(res => {
          this.unfinishedWorksegmentList = res.rows;
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
        /**主表外键ProcessId被选择后触发事件*/
        onProcessIdSelection(fkId){
          this.fkProcessList.forEach(item=>{
            if(fkId === item.id){
              this.form.processId = item.id
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
        /**开工单被选择后触发事件*/
        onWorkSegemntSelection(fkId){
          this.unfinishedWorksegmentList.forEach(item=>{
            if(fkId === item.id){
              this.formfinishWork.quantityFinish = item.quantityStart-item.quantitySplit-item.quantityScrap-item.quantityRedisp-item.quantityPending;
            }
          });
        },
        /** 重设主表的开工对话框数据 */
        resetstartWork (){
            this.formstartWork = {
              quantityAvailable:null,
              quantityStart:null,
              machineId:null,
            };
            this.resetForm("formstartWork");
        },
        /** 重设主表的完工对话框数据 */
        resetfinishWork (){
            this.formfinishWork = {
              wsId:null,
              quantityFinish:null,
            };
            this.resetForm("formfinishWork");
        },
        handleAcceptMl(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定接收 批次号为"' + billNoz + '"的数据项吗？').then(function() {
              return acceptMl(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        handleRequestMaterial(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定请料 批次号为"' + billNoz + '"的数据项吗？').then(function() {
              return requestMaterial(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
        handlePostMl(row) {
            const ids = row.id || this.ids;
            const billNoz = row.billNo || this.captions;

            this.$modal.confirm('确定转出 批次号为"' + billNoz + '"的数据项吗？').then(function() {
              return postMl(ids);
            }).then(response => {
              this.getMasterList();
              this.$modal.msgSuccess(response.msg);
            });
        },
      handleStockinRequest(row) {
          const ids = row.id || this.ids;
          const billNoz = row.billNo || this.captions;

          this.$modal.confirm('确定请入库 批次号为"' + billNoz + '"的数据项吗？').then(function() {
            return requestStockin(ids);
          }).then(response => {
            this.getMasterList();
            this.$modal.msgSuccess(response.msg);
          });
        },
        handlePreviewMlsop(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.sopUrl!=null){
              this.openpreview = true;
              this.title = "预览制造批SOP";
            }else{
              this.$modal.msgWarning("无任何SOP")
            }
          });
        },
        handlePreviewMldrawing(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.drawingUrl!=null){
              this.openpreviewMldrawing = true;
              this.title = "预览制造批图纸";
            }else{
              this.$modal.msgWarning("无任何图纸")
            }
          });
        },
        handlePreviewMlvideo(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.videoUrl!=null){
              this.openpreviewMlvideo = true;
              this.title = "预览制造批视频";
            }else{
              this.$modal.msgWarning("无任何视频")
            }
          });
        },
        handleStartWork(row) {
            this.getStartableMachineList(row);

            const id = row.id || this.ids;
            getMlOperating(id).then(response => {
                this.resetstartWork();
                this.formstartWork = response.data;
                this.formstartWork.quantityAvailable=this.formstartWork.quantityDispatched
                                                    -this.formstartWork.quantitySplit-this.formstartWork.quantityScrap
                                                    -this.formstartWork.quantityRedisp-this.formstartWork.quantityPending;
                this.$set(this.formstartWork, "quantityStart", this.formstartWork.quantityAvailable);
                this.formstartWork.operator = sessionStorage.getItem("nickName");
                this.formstartWork.groupName = sessionStorage.getItem("groupId");
                this.formstartWork.lineName = sessionStorage.getItem("lineId");
                this.openstartWork = true;
                this.title = "开工";
            });
        },
        handleFinishWork(row) {
            this.getUnfinishedWsList(row);

            const id = row.id || this.ids;
            getMlOperating(id).then(response => {
                this.formfinishWork = response.data;
                this.formfinishWork.operator = sessionStorage.getItem("nickName");
                this.formfinishWork.groupName = sessionStorage.getItem("groupId");
                this.formfinishWork.lineName = sessionStorage.getItem("lineId");
                this.openfinishWork = true;
                this.title = "完工";
            });
        },
        handlePreviewRoutingsop(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.routingSopUrl!=null){
              this.openpreviewRoutingsop = true;
              this.title = "预览工序SOP";
            }else{
              this.$modal.msgWarning("无任何SOP")
            }
          });
        },
        handlePreviewRoutingdraw(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.routingDrawingUrl!=null){
              this.openpreviewRoutingdraw = true;
              this.title = "预览工序图纸";
            }else{
              this.$modal.msgWarning("无任何图纸")
            }
          });
        },
        handlePreviewRoutingvideo(row) {
          const id = row.id || this.ids;
          getMlOperating(id).then(response => {
            this.form = response.data;
            if(this.form.routingVideoUrl!=null){
              this.openpreviewRoutingvideo = true;
              this.title = "预览工序视频";
            }else{
              this.$modal.msgWarning("无任何视频")
            }
          });
        },
        /** 提交按钮 */
        submitstartWork() {
          this.$refs["formstartWork"].validate(valid => {
              if (valid) {
                if(this.formstartWork.quantityStart<=this.formstartWork.quantityAvailable && this.formstartWork.quantityStart>0){
                  this.formstartWork.params = {"quantityStart":this.formstartWork.quantityStart,"machineId":this.formstartWork.machineId};

                  startWork(this.formstartWork)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openstartWork = false;
                      this.getMasterList();
                  });
                }else{
                  this.$modal.msgError("请输入正确的开工数量!");
                }
              }
          });
        },
        // 取消按钮
        cancelstartWork() {
            this.openstartWork = false;
            this.resetstartWork();
        },
        /** 提交按钮 */
        submitfinishWork() {
          this.$refs["formfinishWork"].validate(valid => {
              if (valid) {
                if(this.formfinishWork.wsId!=null && this.formfinishWork.quantityFinish>0){
                  this.formfinishWork.params = {"wsId":this.formfinishWork.wsId};

                  finishWork(this.formfinishWork)
                  .then(response => {
                      this.$modal.msgSuccess(response.msg);
                      this.openfinishWork = false;
                      this.getMasterList();
                  });
                }
              }else{
                this.$modal.msgError("请输入正确的出工单号!");
              }
          });
        },
        // 取消按钮
        cancelfinishWork() {
            this.openfinishWork = false;
            this.resetfinishWork();
        },
        // 多选框选中数据
        handleProcessWorkSelectionChange(selection) {
          this.idsProcessWork = selection.map(item => item.id)
          this.captionsProcessWork = selection.map(item => item.billNo)
          this.singleProcessWork = selection.length!==1
          this.multipleProcessWork = !selection.length
        },
        /** 子表工序出工的CSS行样式 */
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
        /** 查询子表工序出工数据 */
        getProcessWorkList() {
          var params = {"id":this.masterId};
          listProcessingWorkByMl(params).then(res => {
            this.processWorkList = res.rows;
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
