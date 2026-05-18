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
                    :disabled="multiple"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getMasterList"></right-toolbar>
        </el-row>

        <el-table ref="masterTable" v-loading="loading" border
                  :data="pexceptionCategorytypeList"
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
                <el-table-column label="备注" align="center" prop="remark"/>
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
            <el-tab-pane label="采购质量异常原因">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaPexceptionReasontype"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePexceptionReasontype"
                            @click="handleUpdateQuaPexceptionReasontype"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePexceptionReasontype"
                            @click="handleDeleteQuaPexceptionReasontype"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pexceptionReasontype" border
                        :data="pexceptionReasontypeList"
                        highlight-current-row
                        :row-class-name="rowClassNamePexceptionReasontype"
                        @selection-change="handlePexceptionReasontypeSelectionChange"
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
                    <el-table-column label="备注" align="center" prop="remark"/>
                    <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                       <template slot-scope="scope">
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="handleUpdateQuaPexceptionReasontype(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaPexceptionReasontype(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="采购质量异常处理类型">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaPexceptionSolutiontype"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singlePexceptionSolutiontype"
                            @click="handleUpdateQuaPexceptionSolutiontype"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multiplePexceptionSolutiontype"
                            @click="handleDeleteQuaPexceptionSolutiontype"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="pexceptionSolutiontype" border
                        :data="pexceptionSolutiontypeList"
                        highlight-current-row
                        :row-class-name="rowClassNamePexceptionSolutiontype"
                        @selection-change="handlePexceptionSolutiontypeSelectionChange"
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
                               @click="handleUpdateQuaPexceptionSolutiontype(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaPexceptionSolutiontype(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openPexceptionReasontype对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPexceptionReasontype" width="500px" append-to-body>
            <el-form ref="formPexceptionReasontype" :model="formPexceptionReasontype" :rules="rulesPexceptionReasontype" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常分类ID</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPexceptionReasontype.categoryId" placeholder="请输入异常分类ID" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="reasonCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常原因码</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionReasontype.reasonCode" placeholder="请输入异常原因码" size="mini" />
                  </el-form-item>
                   <el-form-item prop="reasonDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常原因描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionReasontype.reasonDesc" placeholder="请输入异常原因描述" size="mini" />
                  </el-form-item>
                   <el-input class="inputWidth" v-model="formPexceptionReasontype.status" v-show="false"/>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionReasontype.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPexceptionReasontype">确 定</el-button>
                <el-button @click="cancelPexceptionReasontype">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openPexceptionSolutiontype对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openPexceptionSolutiontype" width="500px" append-to-body>
            <el-form ref="formPexceptionSolutiontype" :model="formPexceptionSolutiontype" :rules="rulesPexceptionSolutiontype" label-width="140px" :inline-message="true">
                    <el-form-item prop="categoryId" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>异常分类</strong></span>
                      </span>
                    <el-input class="inputWidth" v-model="formPexceptionSolutiontype.categoryId" placeholder="请输入异常分类" size="mini" disabled="true"/>
                  </el-form-item>
                   <el-form-item prop="dealtypeCode" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理类型码</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionSolutiontype.dealtypeCode" placeholder="请输入处理类型码" size="mini" />
                  </el-form-item>
                   <el-form-item prop="dealtypeDesc" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>处理类型描述</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionSolutiontype.dealtypeDesc" placeholder="请输入处理类型描述" size="mini" />
                  </el-form-item>
                   <el-input class="inputWidth" v-model="formPexceptionSolutiontype.status" v-show="false"/>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formPexceptionSolutiontype.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPexceptionSolutiontype">确 定</el-button>
                <el-button @click="cancelPexceptionSolutiontype">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listPexceptionCategorytype, getPexceptionCategorytype, delPexceptionCategorytype, addPexceptionCategorytype, updatePexceptionCategorytype } from "@/api/qua/pexceptionCategorytype";
import { listPexceptionReasontype, getPexceptionReasontype, delPexceptionReasontype, addPexceptionReasontype, updatePexceptionReasontype } from "@/api/qua/pexceptionReasontype";
import { listPexceptionSolutiontype, getPexceptionSolutiontype, delPexceptionSolutiontype, addPexceptionSolutiontype, updatePexceptionSolutiontype } from "@/api/qua/pexceptionSolutiontype";

export default {
    name: "PexceptionCategorytype",
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
            // 采购异常分类表格数据
            pexceptionCategorytypeList: [],
            fkPexceptionCategorytypeList: [],
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
              categoryCode: null,
              categoryDesc: null,
              status: null,
            },
            //子表信息
            pexceptionReasontypeList:[],
            // 选中数组
            idsPexceptionReasontype: [],
            captionsPexceptionReasontype: [],
            // 非单个禁用
            singlePexceptionReasontype: true,
            // 非多个禁用
            multiplePexceptionReasontype: true,
            // 子表选中数据
            checkedPexceptionReasontype: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPexceptionReasontype: false,
            formPexceptionReasontype: {},
            rulesPexceptionReasontype: {
                categoryId: [
                   { required: true, message: "异常分类ID不能为空", trigger: "blur" }
                ],
                reasonCode: [
                   { required: true, message: "异常原因码不能为空", trigger: "blur" }
                ],
                reasonDesc: [
                   { required: true, message: "异常原因描述不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            pexceptionSolutiontypeList:[],
            // 选中数组
            idsPexceptionSolutiontype: [],
            captionsPexceptionSolutiontype: [],
            // 非单个禁用
            singlePexceptionSolutiontype: true,
            // 非多个禁用
            multiplePexceptionSolutiontype: true,
            // 子表选中数据
            checkedPexceptionSolutiontype: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openPexceptionSolutiontype: false,
            formPexceptionSolutiontype: {},
            rulesPexceptionSolutiontype: {
                categoryId: [
                   { required: true, message: "异常分类不能为空", trigger: "blur" }
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
        /** 查询外键PexceptionCategorytype数据 */
        this.getPexceptionCategorytypeList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listPexceptionCategorytype(this.queryParams).then(response => {
                this.pexceptionCategorytypeList = response.rows;
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
                this.getPexceptionReasontypeList();
                this.getPexceptionSolutiontypeList();
            }else {
                this.pexceptionReasontypeList = null;
                this.pexceptionSolutiontypeList = null;
            }
        },
        /** 查询外键PexceptionCategorytype数据 */
        getPexceptionCategorytypeList() {
            listPexceptionCategorytype().then(res => {
                this.fkPexceptionCategorytypeList = res.rows;
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
        onPexceptionReasontypeCategoryIdSelection(fkId){
            this.fkPexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                   this.formPexceptionReasontype.categoryId = item.id
                }
            });
        },
        /** 子表外键CategoryId被选择后触发事件 **/
        onPexceptionSolutiontypeCategoryIdSelection(fkId){
            this.fkPexceptionCategorytypeList.forEach(item=>{
                if(fkId === item.id){
                   this.formPexceptionSolutiontype.categoryId = item.id
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
            getPexceptionCategorytype(id).then(response => {
                this.form = response.data;
              this.open = true;
              this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;
            this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
                return delPexceptionCategorytype(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('qua/pexceptionCategorytype/export', {
              ...this.queryParams
            }, `pexceptionCategorytype_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updatePexceptionCategorytype(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPexceptionCategorytype(this.form)
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





        /** 查询子表采购质量异常原因数据 */
        getPexceptionReasontypeList() {
            var params = {"categoryId":this.masterId};
            listPexceptionReasontype(params).then(res => {
                this.pexceptionReasontypeList = res.rows;
            });
        },
        // 多选框选中数据
        handlePexceptionReasontypeSelectionChange(selection) {
            this.idsPexceptionReasontype = selection.map(item => item.id)
            this.captionsPexceptionReasontype = selection.map(item => item.id)
            this.singlePexceptionReasontype = selection.length!==1
            this.multiplePexceptionReasontype = !selection.length
        },
        /** 子表采购质量异常原因的CSS行样式 */
        rowClassNamePexceptionReasontype({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPexceptionReasontype.includes(row.id)){
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
        resetPexceptionReasontype() {
            this.formPexceptionReasontype = {
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
            this.resetForm("formPexceptionReasontype");
            // 按关键字段值来初始化子表单数据
            this.onPexceptionReasontypeCategoryIdSelection(this.masterId);
        },
        handleAddQuaPexceptionReasontype() {
          this.resetPexceptionReasontype();
          this.openPexceptionReasontype = true;
          this.title = "新增";
        },
        handleUpdateQuaPexceptionReasontype(row) {
          this.resetPexceptionReasontype();
          const id = row.id || this.idsPexceptionReasontype
          getPexceptionReasontype(id).then(response => {
              this.formPexceptionReasontype = response.data;
              this.openPexceptionReasontype = true;
              this.title = "修改";
          });
        },
        handleDeleteQuaPexceptionReasontype(row) {
          const ids = row.id || this.idsPexceptionReasontype;
          const idz = row.id || this.captionsPexceptionReasontype;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delPexceptionReasontype(ids);
          }).then(() => {
            this.getPexceptionReasontypeList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitPexceptionReasontype() {
            this.$refs["formPexceptionReasontype"].validate(valid => {
                if (valid) {
                  if(this.formPexceptionReasontype.id==this.formPexceptionReasontype.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPexceptionReasontype.id != null) {
                        updatePexceptionReasontype(this.formPexceptionReasontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPexceptionReasontype = false;
                            this.getPexceptionReasontypeList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPexceptionReasontype(this.formPexceptionReasontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPexceptionReasontype = false;
                            this.getPexceptionReasontypeList();
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
        cancelPexceptionReasontype() {
            this.openPexceptionReasontype = false;
            this.resetPexceptionReasontype();
        },
        /** 查询子表采购质量异常处理类型数据 */
        getPexceptionSolutiontypeList() {
            var params = {"categoryId":this.masterId};
            listPexceptionSolutiontype(params).then(res => {
                this.pexceptionSolutiontypeList = res.rows;
            });
        },
        // 多选框选中数据
        handlePexceptionSolutiontypeSelectionChange(selection) {
            this.idsPexceptionSolutiontype = selection.map(item => item.id)
            this.captionsPexceptionSolutiontype = selection.map(item => item.id)
            this.singlePexceptionSolutiontype = selection.length!==1
            this.multiplePexceptionSolutiontype = !selection.length
        },
        /** 子表采购质量异常处理类型的CSS行样式 */
        rowClassNamePexceptionSolutiontype({ row, rowIndex }) {
            var clsName = ''

            if (this.idsPexceptionSolutiontype.includes(row.id)){
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
        resetPexceptionSolutiontype() {
            this.formPexceptionSolutiontype = {
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
            this.resetForm("formPexceptionSolutiontype");
            // 按关键字段值来初始化子表单数据
            this.onPexceptionSolutiontypeCategoryIdSelection(this.masterId);
        },
        handleAddQuaPexceptionSolutiontype() {
          this.resetPexceptionSolutiontype();
          this.openPexceptionSolutiontype = true;
          this.title = "新增";
        },
        handleUpdateQuaPexceptionSolutiontype(row) {
          this.resetPexceptionSolutiontype();
          const id = row.id || this.idsPexceptionSolutiontype
          getPexceptionSolutiontype(id).then(response => {
              this.formPexceptionSolutiontype = response.data;
              this.openPexceptionSolutiontype = true;
              this.title = "修改";
          });
        },
        handleDeleteQuaPexceptionSolutiontype(row) {
          const ids = row.id || this.idsPexceptionSolutiontype;
          const idz = row.id || this.captionsPexceptionSolutiontype;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delPexceptionSolutiontype(ids);
          }).then(() => {
            this.getPexceptionSolutiontypeList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitPexceptionSolutiontype() {
            this.$refs["formPexceptionSolutiontype"].validate(valid => {
                if (valid) {
                  if(this.formPexceptionSolutiontype.id==this.formPexceptionSolutiontype.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formPexceptionSolutiontype.id != null) {
                        updatePexceptionSolutiontype(this.formPexceptionSolutiontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPexceptionSolutiontype = false;
                            this.getPexceptionSolutiontypeList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addPexceptionSolutiontype(this.formPexceptionSolutiontype)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openPexceptionSolutiontype = false;
                            this.getPexceptionSolutiontypeList();
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
        cancelPexceptionSolutiontype() {
            this.openPexceptionSolutiontype = false;
            this.resetPexceptionSolutiontype();
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
