<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="auto">
              <el-form-item prop="supplierId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                <el-select class="inputWidth" v-model="queryParams.supplierId" placeholder="请选择供应商" size="mini">
                  <el-option
                      v-for="(fkrow, index) in fkSupplierList"
                      :key="index"
                      :label="fkrow.supplierName"
                      :value="fkrow.id"
                      size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
            <el-form-item prop="freeLevel" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>免检水平</strong></span>
                </span>
                <el-select v-model="queryParams.freeLevel" placeholder="请选择免检水平" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.qua_freeinspect_policy"
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
                  height="340px"
                  :data="freeinspectList"
                  :highlight-current-row="true"
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                  :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="50" align="center" />
                 <el-table-column label="供应商" align="left" prop="supplierId"  width="200">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkSupplierList">
                        <span v-if="item.id==scope.row.supplierId"
                            :key="index"
                            size="mini">{{item.supplierName}}</span>
                    </template>
                </template>
            </el-table-column>
              <el-table-column label="免检水平" align="left" prop="freeLevel" width="120">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.qua_freeinspect_policy" :value="scope.row.freeLevel"/>
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
                <el-form-item prop="supplierId" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>供应商</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.supplierId" filterable placeholder="请选择供应商"
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
                <el-form-item  prop="freeLevel" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>免检水平</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.freeLevel" placeholder="请选择免检水平" size="mini" >
                        <el-option
                            v-for="dict in dict.type.qua_freeinspect_policy"
                            :key="dict.value"
                            :label="dict.label"
                            size="mini"
                            :value="parseInt(dict.value)"
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
            <el-tab-pane label="免检品类">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaFreeinspectCategory"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleFreeinspectCategory"
                            @click="handleUpdateQuaFreeinspectCategory"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleFreeinspectCategory"
                            @click="handleDeleteQuaFreeinspectCategory"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="freeinspectCategory" border
                        :data="freeinspectCategoryList"
                        highlight-current-row
                        :row-class-name="rowClassNameFreeinspectCategory"
                        @selection-change="handleFreeinspectCategorySelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="免检品类" align="left" prop="categoryId"  width="240">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkCategoryList">
                                <span v-if="item.id==scope.row.categoryId"
                                    :key="index"
                                    size="mini">{{item.categoryNo+" ["+item.categoryName+"]"}}
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
                               @click="handleUpdateQuaFreeinspectCategory(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaFreeinspectCategory(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="免检物料">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            icon="el-icon-plus"
                            @click="handleAddQuaFreeinspectMaterial"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="success"
                            plain
                            icon="el-icon-edit"
                            :disabled="singleFreeinspectMaterial"
                            @click="handleUpdateQuaFreeinspectMaterial"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            :disabled="multipleFreeinspectMaterial"
                            @click="handleDeleteQuaFreeinspectMaterial"
                        >删除</el-button>
                    </el-col>
                </el-row>
                <el-table ref="freeinspectMaterial" border
                        :data="freeinspectMaterialList"
                        highlight-current-row
                        :row-class-name="rowClassNameFreeinspectMaterial"
                        @selection-change="handleFreeinspectMaterialSelectionChange"
                        :cell-style="{fontSize: '12px',padding:'1px 0px'}"
                        :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="免检物料" align="left" prop="materialId"  width="240">
                        <template  slot-scope="scope">
                            <template v-for="(item,index) in fkMaterialInfoList">
                                <span v-if="item.id==scope.row.materialId"
                                    :key="index"
                                    size="mini">{{item.materialCode+" ["+item.materialName+"]"}}
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
                               @click="handleUpdateQuaFreeinspectMaterial(scope.row)"
                           >修改</el-button>
                           <el-button
                               size="mini"
                               type="text"
                               icon="el-icon-delete"
                               @click="handleDeleteQuaFreeinspectMaterial(scope.row)"
                           >删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!-- 创建slaver.openFreeinspectCategory对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openFreeinspectCategory" width="500px" append-to-body>
            <el-form ref="formFreeinspectCategory" :model="formFreeinspectCategory" :rules="rulesFreeinspectCategory" label-width="140px" :inline-message="true">
                  <el-form-item prop="categoryId" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>免检品类</strong></span>
                    </span>
                    <treeselect v-model="formFreeinspectCategory.categoryId"
                                class="inputWidth"
                                :options="categoryOptions"
                                :normalizer="normalizer"
                                placeholder="请选择父品类"
                                size="mini"/>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formFreeinspectCategory.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFreeinspectCategory">确 定</el-button>
                <el-button @click="cancelFreeinspectCategory">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 创建slaver.openFreeinspectMaterial对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openFreeinspectMaterial" width="500px" append-to-body>
            <el-form ref="formFreeinspectMaterial" :model="formFreeinspectMaterial" :rules="rulesFreeinspectMaterial" label-width="140px" :inline-message="true">
                   <el-form-item prop="materialId" class="marginBottom0" >
                      <span slot="label">
                          <span class="fontSize12"><strong>免检物料</strong></span>
                      </span>
                      <el-select class="inputWidth" v-model="formFreeinspectMaterial.materialId" filterable placeholder="请选择免检物料"
                                 @change="onFreeinspectMaterialMaterialIdSelection"  size="mini" >
                         <el-option
                             v-for="(fkrow, index) in fkMaterialInfoList"
                             :key="index"
                             :label="fkrow.materialCode"
                             :value="fkrow.id"
                             size="mini"
                         ></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item prop="remark" class="marginBottom0">
                      <span slot="label">
                          <span class="fontSize12"><strong>备注</strong></span>
                      </span>
                      <el-input class="inputWidth" v-model="formFreeinspectMaterial.remark" placeholder="请输入备注" size="mini" />
                  </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFreeinspectMaterial">确 定</el-button>
                <el-button @click="cancelFreeinspectMaterial">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listFreeinspect, getFreeinspect, delFreeinspect, addFreeinspect, updateFreeinspect } from "@/api/qua/freeinspect";
import { listFreeinspectCategory, getFreeinspectCategory, delFreeinspectCategory, addFreeinspectCategory, updateFreeinspectCategory } from "@/api/qua/freeinspectCategory";
import { listFreeinspectMaterial, getFreeinspectMaterial, delFreeinspectMaterial, addFreeinspectMaterial, updateFreeinspectMaterial } from "@/api/qua/freeinspectMaterial";
import {listCategory, listMaterialCategory} from "@/api/eng/category";
import { listSupplier} from "@/api/sup/supplier";
import { listMaterialInfo} from "@/api/eng/materialInfo";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "Freeinspect",
    dicts: ['qua_freeinspect_policy'],
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
            // 免检策略管理表格数据
            freeinspectList: [],
            // 物料分类管理树选项
            categoryOptions: [],
            fkCategoryList: [],
            fkSupplierList: [],
            fkMaterialInfoList: [],
            fkFreeinspectList: [],
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
                supplierId: [
                    { required: true, message: "供应商ID不能为空", trigger: "blur" }
                ],
                freeLevel: [
                    { required: true, message: "免检水平不能为空", trigger: "change" }
                ],
            },
            // 主查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              supplierId: null,
              freeLevel: null,
            },
            //子表信息
            freeinspectCategoryList:[],
            // 选中数组
            idsFreeinspectCategory: [],
            captionsFreeinspectCategory: [],
            // 非单个禁用
            singleFreeinspectCategory: true,
            // 非多个禁用
            multipleFreeinspectCategory: true,
            // 子表选中数据
            checkedFreeinspectCategory: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openFreeinspectCategory: false,
            formFreeinspectCategory: {},
            rulesFreeinspectCategory: {
                policyId: [
                   { required: true, message: "免检策略ID不能为空", trigger: "blur" }
                ],
                categoryId: [
                   { required: true, message: "免检品类ID不能为空", trigger: "blur" }
                ],
            },
            //子表信息
            freeinspectMaterialList:[],
            // 选中数组
            idsFreeinspectMaterial: [],
            captionsFreeinspectMaterial: [],
            // 非单个禁用
            singleFreeinspectMaterial: true,
            // 非多个禁用
            multipleFreeinspectMaterial: true,
            // 子表选中数据
            checkedFreeinspectMaterial: [],
            /*
             * 3类Slaver对话框的显示、表单、校验 *
             */
            openFreeinspectMaterial: false,
            formFreeinspectMaterial: {},
            rulesFreeinspectMaterial: {
                policyId: [
                   { required: true, message: "免检策略ID不能为空", trigger: "blur" }
                ],
                materialId: [
                   { required: true, message: "免检物料ID不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getMasterList();
        /** 查询外键Category数据 */
        this.getCategoryList();
        /** 查询外键Supplier数据 */
        this.getSupplierList();
        /** 查询外键MaterialInfo数据 */
        this.getMaterialInfoList();
        /** 查询外键Freeinspect数据 */
        this.getFreeinspectList();
    },
    mounted: function () {
    },
    methods: {
        /** 查询主表 */
        getMasterList() {
          this.loading = true;
            listFreeinspect(this.queryParams).then(response => {
                this.freeinspectList = response.rows;
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
                this.getFreeinspectCategoryList();
                this.getFreeinspectMaterialList();
            }else {
                this.freeinspectCategoryList = null;
                this.freeinspectMaterialList = null;
            }
        },
        /** 查询外键Category数据 */
        getCategoryList() {
          listCategory().then(res => {
                this.fkCategoryList = res.rows;
            });
        },
        /** 查询外键Supplier数据 */
        getSupplierList() {
            listSupplier().then(res => {
                this.fkSupplierList = res.rows;
            });
        },
        /** 查询外键MaterialInfo数据 */
        getMaterialInfoList() {
            listMaterialInfo().then(res => {
                this.fkMaterialInfoList = res.rows;
            });
        },
        /** 查询外键Freeinspect数据 */
        getFreeinspectList() {
            listFreeinspect().then(res => {
                this.fkFreeinspectList = res.rows;
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
        /**主表外键SupplierId被选择后触发事件*/
        onSupplierIdSelection(fkId){
            this.fkSupplierList.forEach(item=>{
                if(fkId === item.id){
                    this.form.supplierId = item.id
                }
            });
        },
        /** 子表外键PolicyId被选择后触发事件 **/
        onFreeinspectCategoryPolicyIdSelection(fkId){
            this.fkFreeinspectList.forEach(item=>{
                if(fkId === item.id){
                   this.formFreeinspectCategory.policyId = item.id
                }
            });
        },
        /** 子表外键CategoryId被选择后触发事件 **/
        onFreeinspectCategoryCategoryIdSelection(fkId){
            this.fkCategoryList.forEach(item=>{
                if(fkId === item.id){
                   this.formFreeinspectCategory.categoryId = item.id
                }
            });
        },
        /** 子表外键PolicyId被选择后触发事件 **/
        onFreeinspectMaterialPolicyIdSelection(fkId){
            this.fkFreeinspectList.forEach(item=>{
                if(fkId === item.id){
                   this.formFreeinspectMaterial.policyId = item.id
                }
            });
        },
        /** 子表外键MaterialId被选择后触发事件 **/
        onFreeinspectMaterialMaterialIdSelection(fkId){
            this.fkMaterialInfoList.forEach(item=>{


                if(fkId === item.id){
                   this.formFreeinspectMaterial.materialId = item.id
                }
            });
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
        /** 重设主表的修改对话框数据 */
        reset (){
            this.form = {
                id: null,
                freeLevel: null,
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
            getFreeinspect(id).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;
            this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
                return delFreeinspect(ids);
            }).then(() => {
                this.getMasterList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('qua/freeinspect/export', {
              ...this.queryParams
            }, `freeinspect_${new Date().getTime()}.xlsx`)
        },

        /** 提交按钮 */
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                  if(this.form.id==this.form.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.form.id != null) {
                        updateFreeinspect(this.form)
                        .then(response => {
                          this.$modal.msgSuccess(response.msg);
                          this.open = false;
                          this.getMasterList();
                        })
                        .catch(error => {
                          this.$modal.msgError(error.msg);
                        });
                    } else {
                        addFreeinspect(this.form)
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
        /** 查询子表免检品类数据 */
        getFreeinspectCategoryList() {
            var params = {"policyId":this.masterId};
            listFreeinspectCategory(params).then(res => {
                this.freeinspectCategoryList = res.rows;
            });
        },
        // 多选框选中数据
        handleFreeinspectCategorySelectionChange(selection) {
            this.idsFreeinspectCategory = selection.map(item => item.id)
            this.captionsFreeinspectCategory = selection.map(item => item.id)
            this.singleFreeinspectCategory = selection.length!==1
            this.multipleFreeinspectCategory = !selection.length
        },
        /** 子表免检品类的CSS行样式 */
        rowClassNameFreeinspectCategory({ row, rowIndex }) {
            var clsName = ''

            if (this.idsFreeinspectCategory.includes(row.id)){
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
        resetFreeinspectCategory() {
            this.formFreeinspectCategory = {
                id: null,
                policyId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formFreeinspectCategory");
            // 按关键字段值来初始化子表单数据
            this.onFreeinspectCategoryPolicyIdSelection(this.masterId);
        },
        handleAddQuaFreeinspectCategory() {
          this.resetFreeinspectCategory();
          this.getTreeselect();
          this.openFreeinspectCategory = true;
          this.title = "新增";
        },
        handleUpdateQuaFreeinspectCategory(row) {
          this.resetFreeinspectCategory();
          const id = row.id || this.idsFreeinspectCategory
          getFreeinspectCategory(id).then(response => {
              this.formFreeinspectCategory = response.data;
              this.openFreeinspectCategory = true;
              this.title = "修改";
              this.getTreeselect();
          });
        },
        handleDeleteQuaFreeinspectCategory(row) {
          const ids = row.id || this.idsFreeinspectCategory;
          const idz = row.id || this.captionsFreeinspectCategory;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delFreeinspectCategory(ids);
          }).then(() => {
            this.getFreeinspectCategoryList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitFreeinspectCategory() {
            this.$refs["formFreeinspectCategory"].validate(valid => {
                if (valid) {
                  if(this.formFreeinspectCategory.id==this.formFreeinspectCategory.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formFreeinspectCategory.id != null) {
                        updateFreeinspectCategory(this.formFreeinspectCategory)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openFreeinspectCategory = false;
                            this.getFreeinspectCategoryList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addFreeinspectCategory(this.formFreeinspectCategory)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openFreeinspectCategory = false;
                            this.getFreeinspectCategoryList();
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
        cancelFreeinspectCategory() {
            this.openFreeinspectCategory = false;
            this.resetFreeinspectCategory();
        },
        /** 查询子表免检物料数据 */
        getFreeinspectMaterialList() {
            var params = {"policyId":this.masterId};
            listFreeinspectMaterial(params).then(res => {
                this.freeinspectMaterialList = res.rows;
            });
        },
        // 多选框选中数据
        handleFreeinspectMaterialSelectionChange(selection) {
            this.idsFreeinspectMaterial = selection.map(item => item.id)
            this.captionsFreeinspectMaterial = selection.map(item => item.id)
            this.singleFreeinspectMaterial = selection.length!==1
            this.multipleFreeinspectMaterial = !selection.length
        },
        /** 子表免检物料的CSS行样式 */
        rowClassNameFreeinspectMaterial({ row, rowIndex }) {
            var clsName = ''

            if (this.idsFreeinspectMaterial.includes(row.id)){
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
        resetFreeinspectMaterial() {
            this.formFreeinspectMaterial = {
                id: null,
                policyId: this.masterId,
                remark: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
            };
            this.resetForm("formFreeinspectMaterial");
            // 按关键字段值来初始化子表单数据
            this.onFreeinspectMaterialPolicyIdSelection(this.masterId);
        },
        handleAddQuaFreeinspectMaterial() {
          this.resetFreeinspectMaterial();
          this.openFreeinspectMaterial = true;
          this.title = "新增";
        },
        handleUpdateQuaFreeinspectMaterial(row) {
          this.resetFreeinspectMaterial();
          const id = row.id || this.idsFreeinspectMaterial
          getFreeinspectMaterial(id).then(response => {
              this.formFreeinspectMaterial = response.data;
              this.openFreeinspectMaterial = true;
              this.title = "修改";
          });
        },
        handleDeleteQuaFreeinspectMaterial(row) {
          const ids = row.id || this.idsFreeinspectMaterial;
          const idz = row.id || this.captionsFreeinspectMaterial;

          this.$modal.confirm('确定删除ID为"' + idz + '"的数据项？').then(function() {
              return delFreeinspectMaterial(ids);
          }).then(() => {
            this.getFreeinspectMaterialList();
            this.$modal.msgSuccess("删除成功");
          }).catch(() => {});
        },

        /** 提交按钮 */
        submitFreeinspectMaterial() {
            this.$refs["formFreeinspectMaterial"].validate(valid => {
                if (valid) {
                  if(this.formFreeinspectMaterial.id==this.formFreeinspectMaterial.id){
                    //TODO 上述一行代码须替代或删除

                    if (this.formFreeinspectMaterial.id != null) {
                        updateFreeinspectMaterial(this.formFreeinspectMaterial)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openFreeinspectMaterial = false;
                            this.getFreeinspectMaterialList();
                        })
                        .catch(error => {
                            this.$modal.msgError(error.msg);
                        });
                    } else {
                        addFreeinspectMaterial(this.formFreeinspectMaterial)
                        .then(response => {
                            this.$modal.msgSuccess(response.msg);
                            this.openFreeinspectMaterial = false;
                            this.getFreeinspectMaterialList();
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
        cancelFreeinspectMaterial() {
            this.openFreeinspectMaterial = false;
            this.resetFreeinspectMaterial();
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
