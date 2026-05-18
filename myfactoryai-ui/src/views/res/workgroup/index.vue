<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="groupName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>班组名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.groupName"
                    placeholder="请输入班组名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
              <el-form-item prop="shiftsysId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>班制</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.shiftsysId" placeholder="请选择班制" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkShiftsysList"
                      :key="index"
                      :label="fkrow.shiftsysName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="lineId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>产线</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.lineId" placeholder="请选择产线" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkLineList"
                      :key="index"
                      :label="fkrow.lineName"
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
                  height="220px"
                  :data="workgroupList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="班组名称" align="left" prop="groupName"  width="120"/>
            <el-table-column label="产线" align="left" prop="lineId"  width="110">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkLineList">
                        <span v-if="item.id==scope.row.lineId"
                            :key="index"
                            size="mini">{{item.lineName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="班制" align="center" prop="shiftsysId"  width="110">
              <template  slot-scope="scope">
                <template v-for="(item,index) in fkShiftsysList">
                          <span v-if="item.id==scope.row.shiftsysId"
                                :key="index"
                                size="mini">{{item.shiftsysName}}</span>
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
                <el-form-item  prop="groupName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>班组名称</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.groupName" placeholder="请输入班组名称" size="mini" />
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
                <el-form-item prop="shiftsysId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>班制</strong></span>
                      </span>
                  <el-select class="inputWidth" v-model="form.shiftsysId" placeholder="请选择班制"
                             @change="onShiftsysIdSelection"  size="mini" >
                    <el-option
                      v-for="(fkrow, index) in fkShiftsysList"
                      :key="index"
                      :label="fkrow.shiftsysName"
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
               <el-button type="primary" @click="submit">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <el-tabs>
            <el-tab-pane label="班组工人">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResLabor"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleLabor"
                            @click="handleUpdateResLabor"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleLabor"
                            @click="handleDeleteResLabor"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="labor" border
                        :data="laborList"
                        highlight-current-row
                        :row-class-name="rowClassNameLabor"
                        @selection-change="handleLaborSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="用户" align="left" prop="userId"  width="150">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkUserList">
                                <span v-if="item.userId==scope.row.userId"
                                    :key="index"
                                    size="mini">{{item.userName+"："+item.nickName}}
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
                               @click="handleUpdateResLabor(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResLabor(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="班组机台">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResWorkgroupMachine"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWorkgroupMachine"
                            @click="handleUpdateResWorkgroupMachine"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWorkgroupMachine"
                            @click="handleDeleteResWorkgroupMachine"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="workgroupMachine" border
                        :data="workgroupMachineList"
                        highlight-current-row
                        :row-class-name="rowClassNameWorkgroupMachine"
                        @selection-change="handleWorkgroupMachineSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="机台" align="left" prop="machineId"  width="160">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMachineList">
                                <span v-if="item.id==scope.row.machineId"
                                    :key="index"
                                    size="mini">{{item.machineCode+"："+item.machineName}}
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
                               @click="handleUpdateResWorkgroupMachine(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResWorkgroupMachine(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="班组工具">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResWorkgroupTool"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWorkgroupTool"
                            @click="handleUpdateResWorkgroupTool"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWorkgroupTool"
                            @click="handleDeleteResWorkgroupTool"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="workgroupTool" border
                        :data="workgroupToolList"
                        highlight-current-row
                        :row-class-name="rowClassNameWorkgroupTool"
                        @selection-change="handleWorkgroupToolSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="工具" align="left" prop="toolId"  width="160">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkToolList">
                                <span v-if="item.id==scope.row.toolId"
                                    :key="index"
                                    size="mini">{{item.toolCode+"："+item.toolDesc}}
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
                               @click="handleUpdateResWorkgroupTool(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResWorkgroupTool(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="班组工序">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResWorkgroupProcess"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWorkgroupProcess"
                            @click="handleUpdateResWorkgroupProcess"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWorkgroupProcess"
                            @click="handleDeleteResWorkgroupProcess"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="workgroupProcess" border
                        :data="workgroupProcessList"
                        highlight-current-row
                        :row-class-name="rowClassNameWorkgroupProcess"
                        @selection-change="handleWorkgroupProcessSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="工序" align="left" prop="processId"  width="160">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkProcessList">
                                <span v-if="item.id==scope.row.processId"
                                    :key="index"
                                    size="mini">{{item.processCode+"："+item.processName}}
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
                               @click="handleUpdateResWorkgroupProcess(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResWorkgroupProcess(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openLabor对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openLabor" width="500px" append-to-body>
            <el-form ref="formLabor" :model="formLabor" :rules="rulesLabor" label-width="140px" :inline-message="true">
                   <el-form-item class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班组</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                   </el-form-item>
                   <el-form-item prop="userId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>用户</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formLabor.userId" placeholder="请选择用户"
                                 @change="onLaborUserIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkUserList"
                             :key="index"
                             :label="fkrow.userName+'：' +fkrow.nickName"
                             :value="fkrow.userId"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formLabor.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitLabor">确 定</el-button>
                <el-button @click="cancelLabor">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWorkgroupMachine对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWorkgroupMachine" width="500px" append-to-body>
            <el-form ref="formWorkgroupMachine" :model="formWorkgroupMachine" :rules="rulesWorkgroupMachine" label-width="140px" :inline-message="true">
                   <el-form-item class="marginBottom0">
                        <span slot="label">
                            <span class="fontSize12"><strong>班组</strong></span>
                        </span>
                       <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                   </el-form-item>
                   <el-form-item prop="machineId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>机台</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWorkgroupMachine.machineId" placeholder="请选择机台"
                                 @change="onWorkgroupMachineMachineIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMachineList"
                             :key="index"
                             :label="fkrow.machineCode+'：' +fkrow.machineName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWorkgroupMachine.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWorkgroupMachine">确 定</el-button>
                <el-button @click="cancelWorkgroupMachine">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWorkgroupTool对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWorkgroupTool" width="500px" append-to-body>
            <el-form ref="formWorkgroupTool" :model="formWorkgroupTool" :rules="rulesWorkgroupTool" label-width="140px" :inline-message="true">
                   <el-form-item class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班组</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                   </el-form-item>
                   <el-form-item prop="toolId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工具</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWorkgroupTool.toolId" placeholder="请选择工具"
                                 @change="onWorkgroupToolToolIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkToolList"
                             :key="index"
                             :label="fkrow.toolCode+'：' +fkrow.toolDesc"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWorkgroupTool.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWorkgroupTool">确 定</el-button>
                <el-button @click="cancelWorkgroupTool">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openWorkgroupProcess对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWorkgroupProcess" width="500px" append-to-body>
            <el-form ref="formWorkgroupProcess" :model="formWorkgroupProcess" :rules="rulesWorkgroupProcess" label-width="140px" :inline-message="true">
                   <el-form-item class="marginBottom0">
                       <span slot="label">
                          <span class="fontSize12"><strong>班组</strong></span>
                       </span>
                       <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                   </el-form-item>
                   <el-form-item prop="processId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>工序</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWorkgroupProcess.processId" placeholder="请选择工序"
                                 @change="onWorkgroupProcessProcessIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkProcessList"
                             :key="index"
                             :label="fkrow.processCode+'：' +fkrow.processName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWorkgroupProcess.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWorkgroupProcess">确 定</el-button>
                <el-button @click="cancelWorkgroupProcess">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listWorkgroup, getWorkgroup, delWorkgroup, addWorkgroup, updateWorkgroup } from "@/api/res/workgroup";
import { listLabor, getLabor, delLabor, addLabor, updateLabor } from "@/api/res/labor";
import { listWorkgroupMachine, getWorkgroupMachine, delWorkgroupMachine, addWorkgroupMachine, updateWorkgroupMachine } from "@/api/res/workgroupMachine";
import { listWorkgroupTool, getWorkgroupTool, delWorkgroupTool, addWorkgroupTool, updateWorkgroupTool } from "@/api/res/workgroupTool";
import { listWorkgroupProcess, getWorkgroupProcess, delWorkgroupProcess, addWorkgroupProcess, updateWorkgroupProcess } from "@/api/res/workgroupProcess";
import { listUser} from "@/api/system/user";
import { listProcess} from "@/api/eng/process";
import { listLine} from "@/api/res/line";
import { listMachine} from "@/api/res/machine";
import { listShiftsys} from "@/api/res/shiftsys";
import { listTool} from "@/api/res/tool";

export default {
    name: "Workgroup",
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
            // 班组管理表格数据
            workgroupList: [],
            fkUserList: [],
            fkProcessList: [],
            fkLineList: [],
            fkMachineList: [],
            fkShiftsysList: [],
            fkToolList: [],
            fkWorkgroupList: [],
            //主表当前行的ID
            masterId:null,
            masterCode:null,
            masterLineId:null,
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
                shiftsysId: [
                    { required: true, message: "班制不能为空", trigger: "blur" }
                ],
                lineId: [
                    { required: true, message: "产线不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              groupName: null,
              shiftsysId: null,
              lineId: null,
            },
            //子表信息
            laborList:[],
            // 选中数组
            idsLabor: [],
            captionsLabor: [],
            // 非单个禁用
            singleLabor: true,
            // 非多个禁用
            multipleLabor: true,
            // 子表选中数据
            checkedLabor: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openLabor: false,
            formLabor: {},
            rulesLabor: {
                userId: [
                   { required: true, message: "用户不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            workgroupMachineList:[],
            // 选中数组
            idsWorkgroupMachine: [],
            captionsWorkgroupMachine: [],
            // 非单个禁用
            singleWorkgroupMachine: true,
            // 非多个禁用
            multipleWorkgroupMachine: true,
            // 子表选中数据
            checkedWorkgroupMachine: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWorkgroupMachine: false,
            formWorkgroupMachine: {},
            rulesWorkgroupMachine: {
                machineId: [
                  { required: true, message: "机器不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            workgroupToolList:[],
            // 选中数组
            idsWorkgroupTool: [],
            captionsWorkgroupTool: [],
            // 非单个禁用
            singleWorkgroupTool: true,
            // 非多个禁用
            multipleWorkgroupTool: true,
            // 子表选中数据
            checkedWorkgroupTool: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWorkgroupTool: false,
            formWorkgroupTool: {},
            rulesWorkgroupTool: {
                toolId: [
                  { required: true, message: "工具不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            workgroupProcessList:[],
            // 选中数组
            idsWorkgroupProcess: [],
            captionsWorkgroupProcess: [],
            // 非单个禁用
            singleWorkgroupProcess: true,
            // 非多个禁用
            multipleWorkgroupProcess: true,
            // 子表选中数据
            checkedWorkgroupProcess: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWorkgroupProcess: false,
            formWorkgroupProcess: {},
            rulesWorkgroupProcess: {
                processId: [
                  { required: true, message: "工序不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键User数据 */
        this.getUserList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Machine数据 */
        /** 查询外键Shiftsys数据 */
        this.getShiftsysList();
        /** 查询外键Workgroup数据 */
        this.getWorkgroupList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listWorkgroup(this.queryParams).then(response => {
                this.workgroupList = response.rows;
                var temp=response.rows[0];
                this.$refs.masterTable.setCurrentRow(temp,true);
                this.total = response.total;
                if(response.total){
                  this.masterId = response.rows[0].id;
                  this.masterCode = response.rows[0].groupName;
                  this.masterLineId = response.rows[0].lineId;
                }
                this.loadChildData();
                this.loading = false;
            });
        },
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getLaborList();
                this.getWorkgroupMachineList();
                this.getWorkgroupToolList();
                this.getWorkgroupProcessList();
                /** 查询外键Machine数据 */
                this.getMachineList();
                /** 查询外键Tool数据 */
                this.getToolList();
            }else {
                this.laborList = null;
                this.workgroupMachineList = null;
                this.workgroupToolList = null;
                this.workgroupProcessList = null;
                this.fkMachineList=null;
                this.fkToolList=null;
            }
        },
        /** 查询外键User数据 */
        getUserList() {
            listUser().then(res => {
                this.fkUserList = res.rows;
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
            var data={'lineId':this.masterLineId,};
            listMachine(data).then(res => {
                this.fkMachineList = res.rows;
            });
        },
        /** 查询外键Shiftsys数据 */
        getShiftsysList() {
            listShiftsys().then(res => {
                this.fkShiftsysList = res.rows;
            });
        },
        /** 查询外键Tool数据 */
        getToolList() {
            var data={'lineId':this.masterLineId,};
            listTool(data).then(res => {
                this.fkToolList = res.rows;
            });
        },
        /** 查询外键Workgroup数据 */
        getWorkgroupList() {
            listWorkgroup().then(res => {
                this.fkWorkgroupList = res.rows;
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
            this.captions = selection.map(item => item.groupName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },
        /** 主表的当前行切换 */
        handleCurrentChange(currentRow) {
            this.masterId = currentRow.id;
            this.masterCode = currentRow.groupName;
            this.masterLineId = currentRow.lineId;
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
        /**主表外键ShiftsysId被选择后触发事件*/
        onShiftsysIdSelection(fkId){
            this.fkShiftsysList.forEach(item=>{
                if(fkId === item.id){
                    this.form.shiftsysId = item.id
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
        /** 子表外键WorkgroupId被选择后触发事件 **/
        onLaborWorkgroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formLabor.workgroupId = item.id
                }
            });
        },
        /** 子表外键UserId被选择后触发事件 **/
        onLaborUserIdSelection(fkId){
            this.fkUserList.forEach(item=>{
                if(fkId === item.id){
                   this.formLabor.userId = item.userId
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onWorkgroupMachineGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupMachine.groupId = item.id
                }
            });
        },
        /** 子表外键MachineId被选择后触发事件 **/
        onWorkgroupMachineMachineIdSelection(fkId){
            this.fkMachineList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupMachine.machineId = item.id
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onWorkgroupToolGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupTool.groupId = item.id
                }
            });
        },
        /** 子表外键ToolId被选择后触发事件 **/
        onWorkgroupToolToolIdSelection(fkId){
            this.fkToolList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupTool.toolId = item.id
                }
            });
        },
        /** 子表外键GroupId被选择后触发事件 **/
        onWorkgroupProcessGroupIdSelection(fkId){
            this.fkWorkgroupList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupProcess.groupId = item.id
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onWorkgroupProcessProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroupProcess.processId = item.id
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                groupName: null,
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
            this.title = "新增";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getWorkgroup(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const groupNamez = row.groupName || this.captions;
            this.$modal.confirm('确认删除班组名称为"' + groupNamez + '"的数据项？').then(function() {
                return delWorkgroup(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/workgroup/export', {
              ...this.queryParams
            }, `workgroup_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateWorkgroup(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWorkgroup(this.form)
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





        /** 查询子表工人管理数据 */
        getLaborList() {
            var params = {"workgroupId":this.masterId};
            listLabor(params).then(res => {
                this.laborList = res.rows;
            });
        },
        // 多选框选中数据
        handleLaborSelectionChange(selection) {
            this.idsLabor = selection.map(item => item.id)
            this.captionsLabor = selection.map(item => item.id)
            this.singleLabor = selection.length!==1
            this.multipleLabor = !selection.length
        },
        /** 子表工人管理的CSS行样式 */
        rowClassNameLabor({ row, rowIndex }) {
            var clsName = ''

            if (this.idsLabor.includes(row.id)){
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
        resetLabor() {
            this.formLabor = {
                id: null,
                workgroupId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formLabor");
            // 按关键字段值来初始化子表单数据
            this.onLaborWorkgroupIdSelection(this.masterId);
        },
        handleAddResLabor() {
          this.resetLabor();
          this.openLabor = true;
          this.title = "新增";
        },
        handleUpdateResLabor(row) {
          this.resetLabor();
          const id = row.id || this.idsLabor
          getLabor(id).then(response => {
              this.formLabor = response.data;
              this.openLabor = true;
              this.title = "修改";
          });
        },
        handleDeleteResLabor(row) {
          const ids = row.id || this.idsLabor;
          const idz = row.id || this.captionsLabor;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delLabor(ids);
          }).then(() => {
            this.getLaborList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitLabor() {
            this.$refs["formLabor"].validate(valid => {
                if (valid) {
                  if(this.formLabor.id==this.formLabor.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formLabor.id != null) {
                        updateLabor(this.formLabor)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openLabor = false;
                            this.getLaborList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addLabor(this.formLabor)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openLabor = false;
                            this.getLaborList();
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
        cancelLabor() {
            this.openLabor = false;
            this.resetLabor();
        },
        /** 查询子表班组工序数据 */
        getWorkgroupMachineList() {
            var params = {"groupId":this.masterId};
            listWorkgroupMachine(params).then(res => {
                this.workgroupMachineList = res.rows;
            });
        },
        // 多选框选中数据
        handleWorkgroupMachineSelectionChange(selection) {
            this.idsWorkgroupMachine = selection.map(item => item.id)
            this.captionsWorkgroupMachine = selection.map(item => item.id)
            this.singleWorkgroupMachine = selection.length!==1
            this.multipleWorkgroupMachine = !selection.length
        },
        /** 子表班组工序的CSS行样式 */
        rowClassNameWorkgroupMachine({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWorkgroupMachine.includes(row.id)){
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
        resetWorkgroupMachine() {
            this.formWorkgroupMachine = {
                id: null,
                groupId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWorkgroupMachine");
            // 按关键字段值来初始化子表单数据
            this.onWorkgroupMachineGroupIdSelection(this.masterId);
        },
        handleAddResWorkgroupMachine() {
          this.resetWorkgroupMachine();
          this.openWorkgroupMachine = true;
          this.title = "新增";
        },
        handleUpdateResWorkgroupMachine(row) {
          this.resetWorkgroupMachine();
          const id = row.id || this.idsWorkgroupMachine
          getWorkgroupMachine(id).then(response => {
              this.formWorkgroupMachine = response.data;
              this.openWorkgroupMachine = true;
              this.title = "修改";
          });
        },
        handleDeleteResWorkgroupMachine(row) {
          const ids = row.id || this.idsWorkgroupMachine;
          const idz = row.id || this.captionsWorkgroupMachine;

          this.$modal.confirm('确定删除产线ID为"' + idz + '"的数据项？').then(function() {
              return delWorkgroupMachine(ids);
          }).then(() => {
            this.getWorkgroupMachineList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWorkgroupMachine() {
            this.$refs["formWorkgroupMachine"].validate(valid => {
                if (valid) {
                  if(this.formWorkgroupMachine.id==this.formWorkgroupMachine.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWorkgroupMachine.id != null) {
                        updateWorkgroupMachine(this.formWorkgroupMachine)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupMachine = false;
                            this.getWorkgroupMachineList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWorkgroupMachine(this.formWorkgroupMachine)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupMachine = false;
                            this.getWorkgroupMachineList();
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
        cancelWorkgroupMachine() {
            this.openWorkgroupMachine = false;
            this.resetWorkgroupMachine();
        },
        /** 查询子表班组工序数据 */
        getWorkgroupToolList() {
            var params = {"groupId":this.masterId};
            listWorkgroupTool(params).then(res => {
                this.workgroupToolList = res.rows;
            });
        },
        // 多选框选中数据
        handleWorkgroupToolSelectionChange(selection) {
            this.idsWorkgroupTool = selection.map(item => item.id)
            this.captionsWorkgroupTool = selection.map(item => item.id)
            this.singleWorkgroupTool = selection.length!==1
            this.multipleWorkgroupTool = !selection.length
        },
        /** 子表班组工序的CSS行样式 */
        rowClassNameWorkgroupTool({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWorkgroupTool.includes(row.id)){
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
        resetWorkgroupTool() {
            this.formWorkgroupTool = {
                id: null,
                groupId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWorkgroupTool");
            // 按关键字段值来初始化子表单数据
            this.onWorkgroupToolGroupIdSelection(this.masterId);
        },
        handleAddResWorkgroupTool() {
          this.resetWorkgroupTool();
          this.openWorkgroupTool = true;
          this.title = "新增";
        },
        handleUpdateResWorkgroupTool(row) {
          this.resetWorkgroupTool();
          const id = row.id || this.idsWorkgroupTool
          getWorkgroupTool(id).then(response => {
              this.formWorkgroupTool = response.data;
              this.openWorkgroupTool = true;
              this.title = "修改";
          });
        },
        handleDeleteResWorkgroupTool(row) {
          const ids = row.id || this.idsWorkgroupTool;
          const idz = row.id || this.captionsWorkgroupTool;

          this.$modal.confirm('确定删除产线ID为"' + idz + '"的数据项？').then(function() {
              return delWorkgroupTool(ids);
          }).then(() => {
            this.getWorkgroupToolList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWorkgroupTool() {
            this.$refs["formWorkgroupTool"].validate(valid => {
                if (valid) {
                  if(this.formWorkgroupTool.id==this.formWorkgroupTool.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWorkgroupTool.id != null) {
                        updateWorkgroupTool(this.formWorkgroupTool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupTool = false;
                            this.getWorkgroupToolList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWorkgroupTool(this.formWorkgroupTool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupTool = false;
                            this.getWorkgroupToolList();
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
        cancelWorkgroupTool() {
            this.openWorkgroupTool = false;
            this.resetWorkgroupTool();
        },
        /** 查询子表班组工序数据 */
        getWorkgroupProcessList() {
            var params = {"groupId":this.masterId};
            listWorkgroupProcess(params).then(res => {
                this.workgroupProcessList = res.rows;
            });
        },
        // 多选框选中数据
        handleWorkgroupProcessSelectionChange(selection) {
            this.idsWorkgroupProcess = selection.map(item => item.id)
            this.captionsWorkgroupProcess = selection.map(item => item.id)
            this.singleWorkgroupProcess = selection.length!==1
            this.multipleWorkgroupProcess = !selection.length
        },
        /** 子表班组工序的CSS行样式 */
        rowClassNameWorkgroupProcess({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWorkgroupProcess.includes(row.id)){
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
        resetWorkgroupProcess() {
            this.formWorkgroupProcess = {
                id: null,
                groupId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWorkgroupProcess");
            // 按关键字段值来初始化子表单数据
            this.onWorkgroupProcessGroupIdSelection(this.masterId);
        },
        handleAddResWorkgroupProcess() {
          this.resetWorkgroupProcess();
          this.openWorkgroupProcess = true;
          this.title = "新增";
        },
        handleUpdateResWorkgroupProcess(row) {
          this.resetWorkgroupProcess();
          const id = row.id || this.idsWorkgroupProcess
          getWorkgroupProcess(id).then(response => {
              this.formWorkgroupProcess = response.data;
              this.openWorkgroupProcess = true;
              this.title = "修改";
          });
        },
        handleDeleteResWorkgroupProcess(row) {
          const ids = row.id || this.idsWorkgroupProcess;
          const idz = row.id || this.captionsWorkgroupProcess;

          this.$modal.confirm('确定删除产线ID为"' + idz + '"的数据项？').then(function() {
              return delWorkgroupProcess(ids);
          }).then(() => {
            this.getWorkgroupProcessList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWorkgroupProcess() {
            this.$refs["formWorkgroupProcess"].validate(valid => {
                if (valid) {
                  if(this.formWorkgroupProcess.id==this.formWorkgroupProcess.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWorkgroupProcess.id != null) {
                        updateWorkgroupProcess(this.formWorkgroupProcess)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupProcess = false;
                            this.getWorkgroupProcessList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWorkgroupProcess(this.formWorkgroupProcess)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroupProcess = false;
                            this.getWorkgroupProcessList();
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
        cancelWorkgroupProcess() {
            this.openWorkgroupProcess = false;
            this.resetWorkgroupProcess();
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
