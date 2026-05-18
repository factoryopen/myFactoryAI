<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="houseCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>仓库码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.houseCode"
                    placeholder="请输入仓库码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="houseName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>仓库名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.houseName"
                    placeholder="请输入仓库名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="houseLocation" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物理地点</strong></span>
                </span>
                <el-input
                    v-model="queryParams.houseLocation"
                    placeholder="请输入物理地点"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="houseType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>仓库类型</strong></span>
                </span>
                <el-select v-model="queryParams.houseType" placeholder="请选择仓库类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.res_warehouse_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>在用否</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择在用否" clearable size="mini" class="searchInput">
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
                  :data="wareHouseList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="仓库码" align="center" prop="houseCode"  width="120"/>
                <el-table-column label="仓库名称" align="left" prop="houseName"  width="160"/>
                <el-table-column label="物理地点" align="left" prop="houseLocation"  width="200"/>
              <el-table-column label="仓库类型" align="center" prop="houseType" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.res_warehouse_type" :value="scope.row.houseType"/>
                </template>
            </el-table-column>
              <el-table-column label="在用否" align="center" prop="status" width="60">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
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
                <el-form-item  prop="houseCode" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.houseCode" placeholder="请输入仓库码" size="mini" />
                </el-form-item>
                <el-form-item  prop="houseName" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库名称</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.houseName" placeholder="请输入仓库名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="houseLocation" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>物理地点</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.houseLocation" placeholder="请输入物理地点" size="mini" />
                </el-form-item>
                <el-form-item  prop="houseType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>仓库类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.houseType" placeholder="请选择仓库类型" size="mini" >
                        <el-option
                            v-for="dict in dict.type.res_warehouse_type"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="dict.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-input class="inputWidth" v-model="form.status" v-show="false"/>
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
            <el-tab-pane label="储位">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddResWarePosition"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleWarePosition"
                            @click="handleUpdateResWarePosition"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleWarePosition"
                            @click="handleDeleteResWarePosition"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="warePosition" border height="434px"
                        :data="warePositionList"
                        highlight-current-row
                        :row-class-name="rowClassNameWarePosition"
                        @selection-change="handleWarePositionSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="库位编码" align="center" prop="positionCode" width="120"/>
                    <el-table-column label="库位名称" align="left" prop="positionName" width="160"/>
                    <el-table-column label="物理地点" align="left" prop="positionLocation" width="290"/>
                    <el-table-column label="停用否" align="center" prop="status" width="60">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateResWarePosition(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteResWarePosition(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openWarePosition对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openWarePosition" width="500px" append-to-body>
            <el-form ref="formWarePosition" :model="formWarePosition" :rules="rulesWarePosition" label-width="140px" :inline-message="true">
                    <el-form-item prop="positionCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>库位编码</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWarePosition.positionCode" placeholder="请输入库位编码" size="mini" />
                  </el-form-item>
                   <el-form-item prop="positionName" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>库位名称</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWarePosition.positionName" placeholder="请输入库位名称" size="mini" />
                  </el-form-item>
                   <el-form-item prop="positionLocation" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>物理地点</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWarePosition.positionLocation" placeholder="请输入物理地点" size="mini" />
                  </el-form-item>
                   <el-form-item prop="houseId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>仓库</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formWarePosition.houseId" placeholder="请输入仓库" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-input class="inputWidth" v-model="formWarePosition.status" v-show="false"/>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formWarePosition.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitWarePosition">确 定</el-button>
                <el-button @click="cancelWarePosition">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listWareHouse, getWareHouse, delWareHouse, addWareHouse, updateWareHouse } from "@/api/res/wareHouse";
import { listWarePosition, getWarePosition, delWarePosition, addWarePosition, updateWarePosition } from "@/api/res/warePosition";

export default {
    name: "WareHouse",
    dicts: ['res_warehouse_type', 'sys_normal_disable'],
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
            // 仓库管理表格数据
            wareHouseList: [],
            fkWareHouseList: [],
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
                houseType: [
                    { required: true, message: "仓库类型不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              pageEnable:true,
              houseCode: null,
              houseName: null,
              houseLocation: null,
              houseType: null,
              status: null,
            },
            //子表信息
            warePositionList:[],
            // 选中数组
            idsWarePosition: [],
            captionsWarePosition: [],
            // 非单个禁用
            singleWarePosition: true,
            // 非多个禁用
            multipleWarePosition: true,
            // 子表选中数据
            checkedWarePosition: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openWarePosition: false,
            formWarePosition: {},
            rulesWarePosition: {
                positionCode: [
                   { required: true, message: "库位编码不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键WareHouse数据 */
        this.getWareHouseList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listWareHouse(this.queryParams).then(response => {
              this.wareHouseList = response.rows;
              this.total = response.total;
              if (this.wareHouseList && this.wareHouseList.length>0) {
                this.$refs.masterTable.setCurrentRow(response.rows[0], true);
                this.masterId = response.rows[0].id;
                this.masterStatus = response.rows[0].status;
              }else{
                this.$refs.masterTable.setCurrentRow(null, true);
                this.masterId = null;
                this.masterStatus = null;
              }

              this.loadChildData();
              this.loading = false;
            });
        },
        /** 成批加载子表数据 */
        loadChildData() {
            if (this.masterId) {
                this.getWarePositionList();
            }else {
                this.warePositionList = null;
            }
        },
        /** 查询外键WareHouse数据 */
        getWareHouseList() {
            listWareHouse().then(res => {
                this.fkWareHouseList = res.rows;
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
            this.captions = selection.map(item => item.houseName)
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
        /** 子表外键HouseId被选择后触发事件 **/
        onWarePositionHouseIdSelection(fkId){
            this.fkWareHouseList.forEach(item=>{
                if(fkId === item.id){
                   this.formWarePosition.houseId = item.id
                }
            });
        },
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                houseCode: null,
                houseName: null,
                houseLocation: null,
                houseType: null,
                status: null,
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
            getWareHouse(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const houseNamez = row.houseName || this.captions;
            this.$modal.confirm('确认删除仓库名称为"' + houseNamez + '"的数据项？').then(function() {
                return delWareHouse(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('res/wareHouse/export', {
              ...this.queryParams
            }, `wareHouse_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateWareHouse(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWareHouse(this.form)
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





        /** 查询子表储位数据 */
        getWarePositionList() {
            var params = {"houseId":this.masterId};
            listWarePosition(params).then(res => {
                this.warePositionList = res.rows;
            });
        },
        // 多选框选中数据
        handleWarePositionSelectionChange(selection) {
            this.idsWarePosition = selection.map(item => item.id)
            this.captionsWarePosition = selection.map(item => item.positionName)
            this.singleWarePosition = selection.length!==1
            this.multipleWarePosition = !selection.length
        },
        /** 子表储位的CSS行样式 */
        rowClassNameWarePosition({ row, rowIndex }) {
            var clsName = ''

            if (this.idsWarePosition.includes(row.id)){
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
        resetWarePosition() {
            this.formWarePosition = {
                id: null,
                positionCode: null,
                positionName: null,
                positionLocation: null,
                houseId: this.masterId,
                status: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formWarePosition");
            // 按关键字段值来初始化子表单数据
            this.onWarePositionHouseIdSelection(this.masterId);
        },
        handleAddResWarePosition() {
          this.resetWarePosition();
          this.openWarePosition = true;
          this.title = "新增";
        },
        handleUpdateResWarePosition(row) {
          this.resetWarePosition();
          const id = row.id || this.idsWarePosition
          getWarePosition(id).then(response => {
              this.formWarePosition = response.data;
              this.openWarePosition = true;
              this.title = "修改";
          });
        },
        handleDeleteResWarePosition(row) {
          const ids = row.id || this.idsWarePosition;
          const positionNamez = row.positionName || this.captionsWarePosition;

          this.$modal.confirm('确定删除库位名称为"' + positionNamez + '"的数据项？').then(function() {
              return delWarePosition(ids);
          }).then(() => {
            this.getWarePositionList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitWarePosition() {
            this.$refs["formWarePosition"].validate(valid => {
                if (valid) {
                  if(this.formWarePosition.id==this.formWarePosition.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formWarePosition.id != null) {
                        updateWarePosition(this.formWarePosition)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWarePosition = false;
                            this.getWarePositionList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addWarePosition(this.formWarePosition)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openWarePosition = false;
                            this.getWarePositionList();
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
        cancelWarePosition() {
            this.openWarePosition = false;
            this.resetWarePosition();
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
