<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
            <el-form-item prop="categoryCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常分类码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.categoryCode"
                    placeholder="请输入异常分类码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="categoryDesc" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>异常分类描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.categoryDesc"
                    placeholder="请输入异常分类描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
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
                  :data="mexceptionCategorytypeList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                  <el-table-column label="异常分类码" align="center" prop="categoryCode"  width="140"/>
                <el-table-column label="异常分类描述" align="left" prop="categoryDesc"  width="140"/>
              <el-table-column label="在用否" align="center" prop="status" width="65">
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
                <el-form-item  prop="categoryCode" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>异常分类码</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.categoryCode" placeholder="请输入异常分类码" size="mini" />
                </el-form-item>
                <el-form-item  prop="categoryDesc" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>异常分类描述</strong></span>
                    </span>
                    <el-input class="inputWidth" v-model="form.categoryDesc" placeholder="请输入异常分类描述" size="mini" />
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
            <el-tab-pane label="异常原因分类">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaMexceptionReasontype"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMexceptionReasontype"
                            @click="handleUpdateQuaMexceptionReasontype"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMexceptionReasontype"
                            @click="handleDeleteQuaMexceptionReasontype"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mexceptionReasontype" border
                        :data="mexceptionReasontypeList"
                        highlight-current-row
                        :row-class-name="rowClassNameMexceptionReasontype"
                        @selection-change="handleMexceptionReasontypeSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="异常原因码" align="center" prop="reasonCode" width="140"/>
                    <el-table-column label="异常原因描述" align="left" prop="reasonDesc" width="140"/>
                    <el-table-column label="在用否" align="center" prop="status" width="65">
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
                               @click="handleUpdateQuaMexceptionReasontype(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaMexceptionReasontype(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="质量异常处理类型">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaMexceptionSolutiontype"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleMexceptionSolutiontype"
                            @click="handleUpdateQuaMexceptionSolutiontype"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleMexceptionSolutiontype"
                            @click="handleDeleteQuaMexceptionSolutiontype"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="mexceptionSolutiontype" border
                        :data="mexceptionSolutiontypeList"
                        highlight-current-row
                        :row-class-name="rowClassNameMexceptionSolutiontype"
                        @selection-change="handleMexceptionSolutiontypeSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="处理类型码" align="center" prop="dealtypeCode" width="140"/>
                    <el-table-column label="处理类型描述" align="left" prop="dealtypeDesc" width="140"/>
                    <el-table-column label="在用否" align="center" prop="status" width="65">
                        <template slot-scope="scope">
                              <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateQuaMexceptionSolutiontype(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaMexceptionSolutiontype(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openMexceptionReasontype对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMexceptionReasontype" width="500px" append-to-body>
            <el-form ref="formMexceptionReasontype" :model="formMexceptionReasontype" :rules="rulesMexceptionReasontype" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常分类</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMexceptionReasontype.categoryId" placeholder="请输入异常分类" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="reasonCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常原因码</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionReasontype.reasonCode" placeholder="请输入异常原因码" size="mini" />
                  </el-form-item>
                   <el-form-item prop="reasonDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常原因描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionReasontype.reasonDesc" placeholder="请输入异常原因描述" size="mini" />
                  </el-form-item>
                    <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionReasontype.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMexceptionReasontype">确 定</el-button>
                <el-button @click="cancelMexceptionReasontype">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openMexceptionSolutiontype对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openMexceptionSolutiontype" width="500px" append-to-body>
            <el-form ref="formMexceptionSolutiontype" :model="formMexceptionSolutiontype" :rules="rulesMexceptionSolutiontype" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>分类ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formMexceptionSolutiontype.categoryId" placeholder="请输入分类ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="dealtypeCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理类型码</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionSolutiontype.dealtypeCode" placeholder="请输入处理类型码" size="mini" />
                  </el-form-item>
                   <el-form-item prop="dealtypeDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理类型描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionSolutiontype.dealtypeDesc" placeholder="请输入处理类型描述" size="mini" />
                  </el-form-item>
                    <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formMexceptionSolutiontype.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMexceptionSolutiontype">确 定</el-button>
                <el-button @click="cancelMexceptionSolutiontype">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listMexceptionCategorytype, getMexceptionCategorytype, delMexceptionCategorytype, addMexceptionCategorytype, updateMexceptionCategorytype } from "@/api/qua/mexceptionCategorytype";
import { listMexceptionReasontype, getMexceptionReasontype, delMexceptionReasontype, addMexceptionReasontype, updateMexceptionReasontype } from "@/api/qua/mexceptionReasontype";
import { listMexceptionSolutiontype, getMexceptionSolutiontype, delMexceptionSolutiontype, addMexceptionSolutiontype, updateMexceptionSolutiontype } from "@/api/qua/mexceptionSolutiontype";

export default {
    name: "MexceptionCategorytype",
    dicts: ['object_status_enable'],
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
            // 制造异常分类表格数据
            mexceptionCategorytypeList: [],
            fkMexceptionCategorytypeList: [],
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
                categoryCode: [
                    { required: true, message: "异常分类码不能为空", trigger: "blur" }
                ],
                categoryDesc: [
                    { required: true, message: "异常分类描述不能为空", trigger: "blur" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              categoryCode: null,
              categoryDesc: null,
              status: null,
            },
            //子表信息
            mexceptionReasontypeList:[],
            // 选中数组
            idsMexceptionReasontype: [],
            captionsMexceptionReasontype: [],
            // 非单个禁用
            singleMexceptionReasontype: true,
            // 非多个禁用
            multipleMexceptionReasontype: true,
            // 子表选中数据
            checkedMexceptionReasontype: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMexceptionReasontype: false,
            formMexceptionReasontype: {},
            rulesMexceptionReasontype: {
                categoryId: [
                   { required: true, message: "异常分类不能为空", trigger: "blur" }
                ],
                reasonCode: [
                   { required: true, message: "异常原因码不能为空", trigger: "blur" }
                ],
                reasonDesc: [
                   { required: true, message: "异常原因描述不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            mexceptionSolutiontypeList:[],
            // 选中数组
            idsMexceptionSolutiontype: [],
            captionsMexceptionSolutiontype: [],
            // 非单个禁用
            singleMexceptionSolutiontype: true,
            // 非多个禁用
            multipleMexceptionSolutiontype: true,
            // 子表选中数据
            checkedMexceptionSolutiontype: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openMexceptionSolutiontype: false,
            formMexceptionSolutiontype: {},
            rulesMexceptionSolutiontype: {
                categoryId: [
                   { required: true, message: "分类ID不能为空", trigger: "blur" }
                ],
                dealtypeCode: [
                   { required: true, message: "处理类型码不能为空", trigger: "blur" }
                ],
                dealtypeDesc: [
                   { required: true, message: "处理类型描述不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键MexceptionCategorytype数据 */
        this.getMexceptionCategorytypeList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listMexceptionCategorytype(this.queryParams).then(response => {
                this.mexceptionCategorytypeList = response.rows;
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
                this.getMexceptionReasontypeList();
                this.getMexceptionSolutiontypeList();
            }else {
                this.mexceptionReasontypeList = null;
                this.mexceptionSolutiontypeList = null;
            }
        },
        /** 查询外键MexceptionCategorytype数据 */
        getMexceptionCategorytypeList() {
            listMexceptionCategorytype().then(res => {
                this.fkMexceptionCategorytypeList = res.rows;
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
            this.captions = selection.map(item => item.id)
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
        /** 子表外键CategoryId被选择后触发事件 **/
        onMexceptionReasontypeCategoryIdSelection(fkId){
            this.fkMexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                   this.formMexceptionReasontype.categoryId = item.id
                }
            });
        },
        /** 子表外键CategoryId被选择后触发事件 **/
        onMexceptionSolutiontypeCategoryIdSelection(fkId){
            this.fkMexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                   this.formMexceptionSolutiontype.categoryId = item.id
                }
            });
        },

        /** 重设主表的新增对话框数据 */
        reset (){
            this.form = {
                id: null,
                categoryCode: null,
                categoryDesc: null,
                status: null,
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
                categoryCode: null,
                categoryDesc: null,
                status: null,
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
                categoryCode: null,
                categoryDesc: null,
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
            getMexceptionCategorytype(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;
            this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
                return delMexceptionCategorytype(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('qua/mexceptionCategorytype/export', {
              ...this.queryParams
            }, `mexceptionCategorytype_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateMexceptionCategorytype(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMexceptionCategorytype(this.form)
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





        /** 查询子表异常原因分类数据 */
        getMexceptionReasontypeList() {
            var params = {"categoryId":this.masterId};
            listMexceptionReasontype(params).then(res => {
                this.mexceptionReasontypeList = res.rows;
            });
        },
        // 多选框选中数据
        handleMexceptionReasontypeSelectionChange(selection) {
            this.idsMexceptionReasontype = selection.map(item => item.id)
            this.captionsMexceptionReasontype = selection.map(item => item.id)
            this.singleMexceptionReasontype = selection.length!==1
            this.multipleMexceptionReasontype = !selection.length
        },
        /** 子表异常原因分类的CSS行样式 */
        rowClassNameMexceptionReasontype({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMexceptionReasontype.includes(row.id)){
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
        resetMexceptionReasontype() {
            this.formMexceptionReasontype = {
                id: null,
                categoryId: this.masterId,
                reasonCode: null,
                reasonDesc: null,
                status: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMexceptionReasontype");
            // 按关键字段值来初始化子表单数据
            this.onMexceptionReasontypeCategoryIdSelection(this.masterId);
        },
        handleAddQuaMexceptionReasontype() {
          this.resetMexceptionReasontype();
          this.openMexceptionReasontype = true;
          this.title = "新增";
        },
        handleUpdateQuaMexceptionReasontype(row) {
          this.resetMexceptionReasontype();
          const id = row.id || this.idsMexceptionReasontype
          getMexceptionReasontype(id).then(response => {
              this.formMexceptionReasontype = response.data;
              this.openMexceptionReasontype = true;
              this.title = "修改";
          });
        },
        handleDeleteQuaMexceptionReasontype(row) {
          const ids = row.id || this.idsMexceptionReasontype;
          const idz = row.id || this.captionsMexceptionReasontype;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delMexceptionReasontype(ids);
          }).then(() => {
            this.getMexceptionReasontypeList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitMexceptionReasontype() {
            this.$refs["formMexceptionReasontype"].validate(valid => {
                if (valid) {
                  if(this.formMexceptionReasontype.id==this.formMexceptionReasontype.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMexceptionReasontype.id != null) {
                        updateMexceptionReasontype(this.formMexceptionReasontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMexceptionReasontype = false;
                            this.getMexceptionReasontypeList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMexceptionReasontype(this.formMexceptionReasontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMexceptionReasontype = false;
                            this.getMexceptionReasontypeList();
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
        cancelMexceptionReasontype() {
            this.openMexceptionReasontype = false;
            this.resetMexceptionReasontype();
        },
        /** 查询子表质量异常处理类型数据 */
        getMexceptionSolutiontypeList() {
            var params = {"categoryId":this.masterId};
            listMexceptionSolutiontype(params).then(res => {
                this.mexceptionSolutiontypeList = res.rows;
            });
        },
        // 多选框选中数据
        handleMexceptionSolutiontypeSelectionChange(selection) {
            this.idsMexceptionSolutiontype = selection.map(item => item.id)
            this.captionsMexceptionSolutiontype = selection.map(item => item.id)
            this.singleMexceptionSolutiontype = selection.length!==1
            this.multipleMexceptionSolutiontype = !selection.length
        },
        /** 子表质量异常处理类型的CSS行样式 */
        rowClassNameMexceptionSolutiontype({ row, rowIndex }) {
            var clsName = ''

            if (this.idsMexceptionSolutiontype.includes(row.id)){
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
        resetMexceptionSolutiontype() {
            this.formMexceptionSolutiontype = {
                id: null,
                categoryId: this.masterId,
                dealtypeCode: null,
                dealtypeDesc: null,
                status: null,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formMexceptionSolutiontype");
            // 按关键字段值来初始化子表单数据
            this.onMexceptionSolutiontypeCategoryIdSelection(this.masterId);
        },
        handleAddQuaMexceptionSolutiontype() {
          this.resetMexceptionSolutiontype();
          this.openMexceptionSolutiontype = true;
          this.title = "新增";
        },
        handleUpdateQuaMexceptionSolutiontype(row) {
          this.resetMexceptionSolutiontype();
          const id = row.id || this.idsMexceptionSolutiontype
          getMexceptionSolutiontype(id).then(response => {
              this.formMexceptionSolutiontype = response.data;
              this.openMexceptionSolutiontype = true;
              this.title = "修改";
          });
        },
        handleDeleteQuaMexceptionSolutiontype(row) {
          const ids = row.id || this.idsMexceptionSolutiontype;
          const idz = row.id || this.captionsMexceptionSolutiontype;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delMexceptionSolutiontype(ids);
          }).then(() => {
            this.getMexceptionSolutiontypeList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitMexceptionSolutiontype() {
            this.$refs["formMexceptionSolutiontype"].validate(valid => {
                if (valid) {
                  if(this.formMexceptionSolutiontype.id==this.formMexceptionSolutiontype.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formMexceptionSolutiontype.id != null) {
                        updateMexceptionSolutiontype(this.formMexceptionSolutiontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMexceptionSolutiontype = false;
                            this.getMexceptionSolutiontypeList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addMexceptionSolutiontype(this.formMexceptionSolutiontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openMexceptionSolutiontype = false;
                            this.getMexceptionSolutiontypeList();
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
        cancelMexceptionSolutiontype() {
            this.openMexceptionSolutiontype = false;
            this.resetMexceptionSolutiontype();
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
