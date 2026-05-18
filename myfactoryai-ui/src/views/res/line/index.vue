<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="lineName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产线名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.lineName"
                    placeholder="请输入产线名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="lineType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产线类型</strong></span>
                </span>
                <el-select v-model="queryParams.lineType" placeholder="请选择产线类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.res_type_line"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
              <el-form-item prop="supplierId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>外协厂商</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.supplierId" placeholder="请选择外协厂商" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierList"
                      :key="index"
                      :label="fkrow.supplierName"
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
                  :data="lineList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="产线名称" align="left" prop="lineName"  width="120"/>
            <el-table-column label="产线类型" align="center" prop="lineType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_type_line" :value="scope.row.lineType"/>
                </template>
            </el-table-column>
                <el-table-column label="外协厂商" align="left" prop="supplierId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
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
                <el-form-item  prop="lineName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>产线名称</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.lineName" placeholder="请输入产线名称" size="mini" />
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
                <el-form-item prop="supplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>外协厂商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.supplierId" placeholder="请选择外协厂商"
                               @change="onSupplierIdSelection"  size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkSupplierList"
                            :key="index"
                            :label="fkrow.supplierName"
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
            <el-tab-pane label="班组">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResWorkgroup"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWorkgroup"
                            @click="handleUpdateResWorkgroup"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWorkgroup"
                            @click="handleDeleteResWorkgroup"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="workgroup" border
                        :data="workgroupList"
                        highlight-current-row
                        :row-class-name="rowClassNameWorkgroup"
                        @selection-change="handleWorkgroupSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="班组名称" align="left" prop="groupName" width="120"/>
                    <el-table-column label="班制" align="left" prop="shiftsysId"  width="110">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkShiftsysList">
                                <span v-if="item.id==scope.row.shiftsysId"
                                    :key="index"
                                    size="mini">{{item.shiftsysName}}
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
                               @click="handleUpdateResWorkgroup(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResWorkgroup(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="机台">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResMachine"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMachine"
                            @click="handleUpdateResMachine"
                        >修改</el-button>
                    </el-col>
                </el-row>
                <el-table ref="machine" border
                        :data="machineList"
                        highlight-current-row
                        :row-class-name="rowClassNameMachine"
                        @selection-change="handleMachineSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="机台编号" align="left" prop="machineCode" width="140"/>
                    <el-table-column label="机台名称" align="left" prop="machineName" width="120"/>
                    <el-table-column label="机型" align="left" prop="typeId"  width="120">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMachineTypeList">
                                <span v-if="item.id==scope.row.typeId"
                                    :key="index"
                                    size="mini">{{item.typeName}}
                                </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="数采否" align="center" prop="enableIiot" width="80">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableIiot"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="IP" align="center" prop="ip" width="140"/>
                    <el-table-column label="购买日期" align="center" prop="buyDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.buyDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="在制否" align="center" prop="isBusy" width="80">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isBusy"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateResMachine(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResMachine(scope.row)"
                               :disabled="scope.row.isBusy==true"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="工具">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResTool"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleTool"
                            @click="handleUpdateResTool"
                        >修改</el-button>
                    </el-col>
                </el-row>
                <el-table ref="tool" border
                        :data="toolList"
                        highlight-current-row
                        :row-class-name="rowClassNameTool"
                        @selection-change="handleToolSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="工具编号" align="center" prop="toolCode" width="140"/>
                    <el-table-column label="工具描述" align="left" prop="toolDesc" width="140"/>
                    <el-table-column label="工具类型" align="center" prop="toolType" width="75">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.res_tool_type" :value="scope.row.toolType"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购日期" align="center" prop="buyDay" width="85">
                        <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.buyDay, '{y}-{m}-{d}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="在制否" align="center" prop="isBusy" width="80">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.isBusy"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateResTool(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResTool(scope.row)"
                               :disabled="scope.row.isBusy==true"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openWorkgroup对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWorkgroup" width="500px" append-to-body>
            <el-form ref="formWorkgroup" :model="formWorkgroup" :rules="rulesWorkgroup" label-width="140px" :inline-message="true">
                    <el-form-item class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>产线</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                    </el-form-item>
                    <el-form-item prop="groupName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班组名称</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWorkgroup.groupName" placeholder="请输入班组名称" size="mini" />
                   </el-form-item>
                   <el-form-item prop="shiftsysId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>班制</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formWorkgroup.shiftsysId" placeholder="请选择班制"
                                 @change="onWorkgroupShiftsysIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkShiftsysList"
                             :key="index"
                             :label="fkrow.shiftsysName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWorkgroup.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWorkgroup">确 定</el-button>
                <el-button @click="cancelWorkgroup">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMachine对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMachine" width="500px" append-to-body>
            <el-form ref="formMachine" :model="formMachine" :rules="rulesMachine" label-width="140px" :inline-message="true">
                  <el-form-item class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>产线</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="machineCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>机台编号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMachine.machineCode" placeholder="请输入机台编号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="machineName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>机台名称</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMachine.machineName" placeholder="请输入机台名称" size="mini" />
                  </el-form-item>
                   <el-form-item prop="typeId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>机型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formMachine.typeId" placeholder="请选择机型"
                                 @change="onMachineTypeIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMachineTypeList"
                             :key="index"
                             :label="fkrow.typeName"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item  prop="enableIiot" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>数采否</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formMachine.enableIiot" placeholder="请选择数采否" size="mini" >
                          <el-option
                              v-for="dict in dict.type.sys_yes_no"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="dict.value"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="ip" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>IP</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMachine.ip" placeholder="请输入IP" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="buyDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>购买日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formMachine.buyDay"
                               class="inputWidth"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择购买日期">
                      </el-date-picker>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMachine.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMachine">确 定</el-button>
                <el-button @click="cancelMachine">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openTool对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openTool" width="500px" append-to-body>
            <el-form ref="formTool" :model="formTool" :rules="rulesTool" label-width="140px" :inline-message="true">
                  <el-form-item class="marginBottom0">
                          <span slot="label">
                              <span class="fontSize12"><strong>产线</strong></span>
                          </span>
                    <el-input class="inputWidth" v-model="masterCode" size="mini" disabled="true"/>
                  </el-form-item>
                  <el-form-item prop="toolCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工具编号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formTool.toolCode" placeholder="请输入工具编号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="toolDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工具描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formTool.toolDesc" placeholder="请输入工具描述" size="mini" />
                  </el-form-item>
                   <el-form-item  prop="toolType" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>工具类型</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formTool.toolType" placeholder="请选择工具类型" size="mini" >
                          <el-option
                              v-for="dict in dict.type.res_tool_type"
                              :key="dict.value"
                              :label="dict.label"
                              size="mini"
                              :value="dict.value"
                          ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item  prop="buyDay" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>采购日期</strong></span>
                      </span>
                      <el-date-picker clearable size="mini"
                               v-model="formTool.buyDay"
                               class="inputWidth"
                               type="date"
                               value-format="yyyy-MM-dd"
                               placeholder="选择采购日期">
                      </el-date-picker>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formTool.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitTool">确 定</el-button>
                <el-button @click="cancelTool">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listLine, getLine, delLine, addLine, updateLine } from "@/api/res/line";
import { listWorkgroup, getWorkgroup, delWorkgroup, addWorkgroup, updateWorkgroup } from "@/api/res/workgroup";
import { listMachine, getMachine, delMachine, addMachine, updateMachine } from "@/api/res/machine";
import { listTool, getTool, delTool, addTool, updateTool } from "@/api/res/tool";
import { listProcess} from "@/api/eng/process";
import { listShiftsys} from "@/api/res/shiftsys";
import { listSupplier} from "@/api/sup/supplier";
import { listMachineType} from "@/api/res/machineType";

export default {
    name: "Line",
    dicts: ['res_type_line', 'sys_yes_no', 'res_tool_type'],
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
            // 产线管理表格数据
            lineList: [],
            fkProcessList: [],
            fkLineList: [],
            fkShiftsysList: [],
            fkSupplierList: [],
            fkMachineTypeList: [],
            //主表当前行的ID
            masterId:null,
            masterCode:null,
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
                lineType: [
                    { required: true, message: "产线类型不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              lineName: null,
              lineType: null,
              supplierId: null,
            },
            //子表信息
            workgroupList:[],
            // 选中数组
            idsWorkgroup: [],
            captionsWorkgroup: [],
            // 非单个禁用
            singleWorkgroup: true,
            // 非多个禁用
            multipleWorkgroup: true,
            // 子表选中数据
            checkedWorkgroup: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWorkgroup: false,
            formWorkgroup: {},
            rulesWorkgroup: {
                groupName: [
                   { required: true, message: "班组名称不能为空", trigger: "blur" }
                ],
                shiftsysId: [
                  { required: true, message: "班制不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            machineList:[],
            // 选中数组
            idsMachine: [],
            captionsMachine: [],
            // 非单个禁用
            singleMachine: true,
            // 非多个禁用
            multipleMachine: true,
            // 子表选中数据
            checkedMachine: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMachine: false,
            formMachine: {},
            rulesMachine: {
                machineCode: [
                   { required: true, message: "机台编号不能为空", trigger: "blur" }
                ],
                machineName: [
                   { required: true, message: "机台名称不能为空", trigger: "blur" }
                ],
                typeId: [
                  { required: true, message: "机型不能为空", trigger: "blur" }
                ],
                enableIiot: [
                   { required: true, message: "数采否不能为空", trigger: "change" }
                ],
            },
            //子表信息
            toolList:[],
            // 选中数组
            idsTool: [],
            captionsTool: [],
            // 非单个禁用
            singleTool: true,
            // 非多个禁用
            multipleTool: true,
            // 子表选中数据
            checkedTool: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openTool: false,
            formTool: {},
            rulesTool: {
                toolCode: [
                   { required: true, message: "工具编号不能为空", trigger: "blur" }
                ],
                toolType: [
                  { required: true, message: "工具类型不能为空", trigger: "blur" }
                ],
                toolDesc: [
                   { required: true, message: "工具描述不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Process数据 */
        this.getProcessList();
        /** 查询外键Line数据 */
        this.getLineList();
        /** 查询外键Shiftsys数据 */
        this.getShiftsysList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键MachineType数据 */
        this.getMachineTypeList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listLine(this.queryParams).then(response => {
                this.lineList = response.rows;
                var temp=response.rows[0];
                this.$refs.masterTable.setCurrentRow(temp,true);
                this.total = response.total;
                if(response.total) {
                  this.masterId = response.rows[0].id;
                  this.masterCode = response.rows[0].lineName;
                }
                this.loadChildData();
                this.loading = false;
            });
        },
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getWorkgroupList();
                this.getMachineList();
                this.getToolList();
            }else {
                this.workgroupList = null;
                this.machineList = null;
                this.toolList = null;
            }
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
        /** 查询外键Shiftsys数据 */
        getShiftsysList() {
            listShiftsys().then(res => {
                this.fkShiftsysList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键MachineType数据 */
        getMachineTypeList() {
            listMachineType().then(res => {
                this.fkMachineTypeList = res.rows;
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
            this.captions = selection.map(item => item.lineName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },
        /** 主表的当前行切换 */
        handleCurrentChange(currentRow) {
            this.masterId = currentRow.id;
            this.masterCode = currentRow.lineName;
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
        /**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
        },
        /** 子表外键ShiftsysId被选择后触发事件 **/
        onWorkgroupShiftsysIdSelection(fkId){
            this.fkShiftsysList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroup.shiftsysId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onWorkgroupLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formWorkgroup.lineId = item.id
                }
            });
        },
        /** 子表外键TypeId被选择后触发事件 **/
        onMachineTypeIdSelection(fkId){
            this.fkMachineTypeList.forEach(item=>{
                if(fkId === item.id){
                   this.formMachine.typeId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onMachineLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formMachine.lineId = item.id
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onMachineProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formMachine.processId = item.id
                }
            });
        },
        /** 子表外键LineId被选择后触发事件 **/
        onToolLineIdSelection(fkId){
            this.fkLineList.forEach(item=>{
                if(fkId === item.id){
                   this.formTool.lineId = item.id
                }
            });
        },
        /** 子表外键ProcessId被选择后触发事件 **/
        onToolProcessIdSelection(fkId){
            this.fkProcessList.forEach(item=>{
                if(fkId === item.id){
                   this.formTool.processId = item.id
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                lineName: null,
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
            this.title = "新增";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getLine(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const lineNamez = row.lineName || this.captions;
            this.$modal.confirm('确认删除产线名称为"' + lineNamez + '"的数据项？').then(function() {
                return delLine(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/line/export', {
              ...this.queryParams
            }, `line_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateLine(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addLine(this.form)
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
        /** 查询子表班组数据 */
        getWorkgroupList() {
            var params = {"lineId":this.masterId};
            listWorkgroup(params).then(res => {
                this.workgroupList = res.rows;
            });
        },
        // 多选框选中数据
        handleWorkgroupSelectionChange(selection) {
            this.idsWorkgroup = selection.map(item => item.id)
            this.captionsWorkgroup = selection.map(item => item.groupName)
            this.singleWorkgroup = selection.length!==1
            this.multipleWorkgroup = !selection.length
        },
        /** 子表班组的CSS行样式 */
        rowClassNameWorkgroup({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWorkgroup.includes(row.id)){
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
        resetWorkgroup() {
            this.formWorkgroup = {
                id: null,
                groupName: null,
                lineId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWorkgroup");
            // 按关键字段值来初始化子表单数据
            this.onWorkgroupLineIdSelection(this.masterId);
        },
        handleAddResWorkgroup() {
          this.resetWorkgroup();
          this.openWorkgroup = true;
          this.title = "新增";
        },
        handleUpdateResWorkgroup(row) {
          this.resetWorkgroup();
          const id = row.id || this.idsWorkgroup
          getWorkgroup(id).then(response => {
              this.formWorkgroup = response.data;
              this.openWorkgroup = true;
              this.title = "修改";
          });
        },
        handleDeleteResWorkgroup(row) {
          const ids = row.id || this.idsWorkgroup;
          const groupNamez = row.groupName || this.captionsWorkgroup;

          this.$modal.confirm('确定删除班组名称为"' + groupNamez + '"的数据项？').then(function() {
              return delWorkgroup(ids);
          }).then(() => {
            this.getWorkgroupList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWorkgroup() {
            this.$refs["formWorkgroup"].validate(valid => {
                if (valid) {
                  if(this.formWorkgroup.id==this.formWorkgroup.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWorkgroup.id != null) {
                        updateWorkgroup(this.formWorkgroup)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroup = false;
                            this.getWorkgroupList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWorkgroup(this.formWorkgroup)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWorkgroup = false;
                            this.getWorkgroupList();
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
        cancelWorkgroup() {
            this.openWorkgroup = false;
            this.resetWorkgroup();
        },
        /** 查询子表机台数据 */
        getMachineList() {
            var params = {"lineId":this.masterId};
            listMachine(params).then(res => {
                this.machineList = res.rows;
            });
        },
        // 多选框选中数据
        handleMachineSelectionChange(selection) {
            this.idsMachine = selection.map(item => item.id)
            this.captionsMachine = selection.map(item => item.machineName)
            this.singleMachine = selection.length!==1
            this.multipleMachine = !selection.length
        },
        /** 子表机台的CSS行样式 */
        rowClassNameMachine({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMachine.includes(row.id)){
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
        resetMachine() {
            this.formMachine = {
                id: null,
                machineCode: null,
                machineName: null,
                lineId: this.masterId,
                enableIiot: null,
                ip: null,
                buyDay: null,
                isBusy: null,
                ioTime: null,
                wsId: null,
                wsNo: null,
                mlId: null,
                mlNo: null,
                processSeq: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMachine");
            // 按关键字段值来初始化子表单数据
            this.onMachineLineIdSelection(this.masterId);
        },
        handleAddResMachine() {
          this.resetMachine();
          this.openMachine = true;
          this.title = "新增";
        },
        handleUpdateResMachine(row) {
          this.resetMachine();
          const id = row.id || this.idsMachine
          getMachine(id).then(response => {
              this.formMachine = response.data;
              this.openMachine = true;
              this.title = "修改";
          });
        },
        handleDeleteResMachine(row) {
          const ids = row.id || this.idsMachine;
          const machineNamez = row.machineName || this.captionsMachine;

          this.$modal.confirm('确定删除机台名称为"' + machineNamez + '"的数据项？').then(function() {
              return delMachine(ids);
          }).then(() => {
            this.getMachineList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitMachine() {
            this.$refs["formMachine"].validate(valid => {
                if (valid) {
                  if(this.formMachine.id==this.formMachine.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMachine.id != null) {
                        updateMachine(this.formMachine)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMachine = false;
                            this.getMachineList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMachine(this.formMachine)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMachine = false;
                            this.getMachineList();
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
        cancelMachine() {
            this.openMachine = false;
            this.resetMachine();
        },
        /** 查询子表工具数据 */
        getToolList() {
            var params = {"lineId":this.masterId};
            listTool(params).then(res => {
                this.toolList = res.rows;
            });
        },
        // 多选框选中数据
        handleToolSelectionChange(selection) {
            this.idsTool = selection.map(item => item.id)
            this.captionsTool = selection.map(item => item.processSeq)
            this.singleTool = selection.length!==1
            this.multipleTool = !selection.length
        },
        /** 子表工具的CSS行样式 */
        rowClassNameTool({ row, rowIndex }) {
            var clsName = ''

            if (this.idsTool.includes(row.id)){
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
        resetTool() {
            this.formTool = {
                id: null,
                toolCode: null,
                toolDesc: null,
                toolType: null,
                lineId: this.masterId,
                buyDay: null,
                isBusy: null,
                ioTime: null,
                wsId: null,
                wsNo: null,
                mlId: null,
                mlNo: null,
                processSeq: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formTool");
            // 按关键字段值来初始化子表单数据
            this.onToolLineIdSelection(this.masterId);
        },
        handleAddResTool() {
          this.resetTool();
          this.openTool = true;
          this.title = "新增";
        },
        handleUpdateResTool(row) {
          this.resetTool();
          const id = row.id || this.idsTool
          getTool(id).then(response => {
              this.formTool = response.data;
              this.openTool = true;
              this.title = "修改";
          });
        },
        handleDeleteResTool(row) {
          const ids = row.id || this.idsTool;
          const processSeqz = row.processSeq || this.captionsTool;

          this.$modal.confirm('确定删除工序号为"' + processSeqz + '"的数据项？').then(function() {
              return delTool(ids);
          }).then(() => {
            this.getToolList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitTool() {
            this.$refs["formTool"].validate(valid => {
                if (valid) {
                  if(this.formTool.id==this.formTool.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formTool.id != null) {
                        updateTool(this.formTool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openTool = false;
                            this.getToolList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addTool(this.formTool)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openTool = false;
                            this.getToolList();
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
        cancelTool() {
            this.openTool = false;
            this.resetTool();
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
