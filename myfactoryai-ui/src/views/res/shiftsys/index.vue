<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="shiftsysName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>班制名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.shiftsysName"
                    placeholder="请输入班制名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="shiftQuantity" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>班别数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.shiftQuantity"
                    placeholder="请输入班别数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="hoursWork" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>上班时数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.hoursWork"
                    placeholder="请输入上班时数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="hoursExtra" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>加班时数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.hoursExtra"
                    placeholder="请输入加班时数"
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
                  :data="shiftsysList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="班制名称" align="center" prop="shiftsysName"  width="120"/>
                <el-table-column label="班别数" align="center" prop="shiftQuantity"  width="80"/>
                <el-table-column label="上班时数" align="right" prop="hoursWork"  width="110"/>
                <el-table-column label="加班时数" align="right" prop="hoursExtra"  width="110"/>
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
                <el-form-item  prop="shiftsysName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>班制名称</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.shiftsysName" placeholder="请输入班制名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="shiftQuantity" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>班别数</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.shiftQuantity" placeholder="请输入班别数" size="mini" />
                </el-form-item>
                <el-form-item  prop="hoursWork" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>上班时数</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.hoursWork" placeholder="请输入上班时数" size="mini" />
                </el-form-item>
                <el-form-item  prop="hoursExtra" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>加班时数</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.hoursExtra" placeholder="请输入加班时数" size="mini" />
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
            <el-tab-pane label="班别">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResShift"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleShift"
                            @click="handleUpdateResShift"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleShift"
                            @click="handleDeleteResShift"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="shift" border
                        :data="shiftList"
                        highlight-current-row
                        :row-class-name="rowClassNameShift"
                        @selection-change="handleShiftSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="班别序号" align="right" prop="shiftSeq" width="90"/>
                    <el-table-column label="班别描述" align="center" prop="shiftDesc" width="140"/>
                    <el-table-column label="开始时间" align="center" prop="timeBegin" width="110"/>
                    <el-table-column label="结束时间" align="center" prop="timeEnd" width="110"/>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateResShift(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResShift(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openShift对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openShift" width="500px" append-to-body>
            <el-form ref="formShift" :model="formShift" :rules="rulesShift" label-width="140px" :inline-message="true">
                    <el-form-item prop="shiftsysId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班制</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formShift.shiftsysId" placeholder="请输入班制" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="shiftSeq" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班别序号</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formShift.shiftSeq" placeholder="请输入班别序号" size="mini" />
                  </el-form-item>
                   <el-form-item prop="shiftDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>班别描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formShift.shiftDesc" placeholder="请输入班别描述" size="mini" />
                  </el-form-item>
                   <el-form-item prop="timeBegin" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>开始时间</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formShift.timeBegin" placeholder="请输入开始时间" size="mini" />
                  </el-form-item>
                   <el-form-item prop="timeEnd" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>结束时间</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formShift.timeEnd" placeholder="请输入结束时间" size="mini" />
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formShift.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitShift">确 定</el-button>
                <el-button @click="cancelShift">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listShiftsys, getShiftsys, delShiftsys, addShiftsys, updateShiftsys } from "@/api/res/shiftsys";
import { listShift, getShift, delShift, addShift, updateShift } from "@/api/res/shift";

export default {
    name: "Shiftsys",
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
            // 班制管理表格数据
            shiftsysList: [],
            fkShiftsysList: [],
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
                shiftsysName: [
                    { required: true, message: "班制名称不能为空", trigger: "blur" }
                ],
                shiftQuantity: [
                    { required: true, message: "班别数不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 15,
              shiftsysName: null,
              shiftQuantity: null,
              hoursWork: null,
              hoursExtra: null,
            },
            //子表信息
            shiftList:[],
            // 选中数组
            idsShift: [],
            captionsShift: [],
            // 非单个禁用
            singleShift: true,
            // 非多个禁用
            multipleShift: true,
            // 子表选中数据
            checkedShift: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openShift: false,
            formShift: {},
            rulesShift: {
                shiftsysId: [
                   { required: true, message: "班制不能为空", trigger: "blur" }
                ],
                shiftSeq: [
                   { required: true, message: "班别序号不能为空", trigger: "blur" }
                ],
                timeBegin: [
                   { required: true, message: "开始时间不能为空", trigger: "blur" }
                ],
                timeEnd: [
                   { required: true, message: "结束时间不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Shiftsys数据 */
        this.getShiftsysList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listShiftsys(this.queryParams).then(response => {
                this.shiftsysList = response.rows;
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
                this.getShiftList();
            }else {
                this.shiftList = null;
            }
        },
        /** 查询外键Shiftsys数据 */
        getShiftsysList() {
            listShiftsys().then(res => {
                this.fkShiftsysList = res.rows;
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
            this.captions = selection.map(item => item.shiftsysName)
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
        /** 子表外键ShiftsysId被选择后触发事件 **/
        onShiftShiftsysIdSelection(fkId){
            this.fkShiftsysList.forEach(item=>{
                if(fkId === item.id){
                   this.formShift.shiftsysId = item.id
                }
            });
        },

        /** 重设主表的新增对话框数据 */
        reset (){
            this.form = {
                id: null,
                shiftsysName: null,
                shiftQuantity: null,
                hoursWork: null,
                hoursExtra: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                shiftsysName: null,
                shiftQuantity: null,
                hoursWork: null,
                hoursExtra: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
            };
            this.resetForm("form");
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                shiftsysName: null,
                shiftQuantity: null,
                hoursWork: null,
                hoursExtra: null,
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
            getShiftsys(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const shiftsysNamez = row.shiftsysName || this.captions;
            this.$modal.confirm('确认删除班制名称为"' + shiftsysNamez + '"的数据项？').then(function() {
                return delShiftsys(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/shiftsys/export', {
              ...this.queryParams
            }, `shiftsys_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateShiftsys(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addShiftsys(this.form)
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





        /** 查询子表班别数据 */
        getShiftList() {
            var params = {"shiftsysId":this.masterId};
            listShift(params).then(res => {
                this.shiftList = res.rows;
            });
        },
        // 多选框选中数据
        handleShiftSelectionChange(selection) {
            this.idsShift = selection.map(item => item.id)
            this.captionsShift = selection.map(item => item.shiftSeq)
            this.singleShift = selection.length!==1
            this.multipleShift = !selection.length
        },
        /** 子表班别的CSS行样式 */
        rowClassNameShift({ row, rowIndex }) {
            var clsName = ''

            if (this.idsShift.includes(row.id)){
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
        resetShift() {
            this.formShift = {
                id: null,
                shiftsysId: this.masterId,
                shiftSeq: null,
                shiftDesc: null,
                timeBegin: null,
                timeEnd: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formShift");
            // 按关键字段值来初始化子表单数据
            this.onShiftShiftsysIdSelection(this.masterId);
        },
        handleAddResShift() {
          this.resetShift();
          this.openShift = true;
          this.title = "新增";
        },
        handleUpdateResShift(row) {
          this.resetShift();
          const id = row.id || this.idsShift
          getShift(id).then(response => {
              this.formShift = response.data;
              this.openShift = true;
              this.title = "修改";
          });
        },
        handleDeleteResShift(row) {
          const ids = row.id || this.idsShift;
          const shiftSeqz = row.shiftSeq || this.captionsShift;

          this.$modal.confirm('确定删除班别序号为"' + shiftSeqz + '"的数据项？').then(function() {
              return delShift(ids);
          }).then(() => {
            this.getShiftList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitShift() {
            this.$refs["formShift"].validate(valid => {
                if (valid) {
                  if(this.formShift.id==this.formShift.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formShift.id != null) {
                        updateShift(this.formShift)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openShift = false;
                            this.getShiftList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addShift(this.formShift)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openShift = false;
                            this.getShiftList();
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
        cancelShift() {
            this.openShift = false;
            this.resetShift();
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
