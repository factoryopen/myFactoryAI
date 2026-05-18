<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="categoryNo" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>品类编号</strong></span>
          </span>
        <el-input
          v-model="queryParams.categoryNo"
          placeholder="请输入品类编号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="categoryName" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>品类名称</strong></span>
          </span>
        <el-input
          v-model="queryParams.categoryName"
          placeholder="请输入品类名称"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="purchasingType" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>物料类型</strong></span>
          </span>
        <el-select v-model="queryParams.materialType" placeholder="请选择物料类型" class="searchInput" clearable size="mini">
          <el-option
            v-for="dict in dict.type.eng_material_basictype"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item  prop="purchasingType" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>采购类型</strong></span>
          </span>
        <el-select v-model="queryParams.purchasingType" placeholder="请选择采购类型" class="searchInput" clearable size="mini">
          <el-option
            v-for="dict in dict.type.eng_material_purchasingtype"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item  prop="consumingType" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>消耗类型</strong></span>
          </span>
        <el-select v-model="queryParams.consumingType" placeholder="请选择消耗类型" class="searchInput" clearable size="mini">
          <el-option
            v-for="dict in dict.type.eng_material_consumingtype"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="daysCycletime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>采购周期(天)</strong></span>
          </span>
        <el-input
          v-model="queryParams.daysCycletime"
          placeholder="请输入产购周期"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="daysLeadtime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>采购提前期(天)</strong></span>
          </span>
        <el-input
          v-model="queryParams.daysLeadtime"
          placeholder="请输入提前时间"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="daysPosttime" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>采购后置期(天)</strong></span>
          </span>
        <el-input
          v-model="queryParams.daysPosttime"
          placeholder="请输入后置时间"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="status" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>在用否</strong></span>
          </span>
        <el-select v-model="queryParams.status" placeholder="请选择在用否" class="searchInput" clearable size="mini">
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
    <el-row :gutter="10" class="mb8">      <el-col :span="1.5">
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" border
              height="650px"
              :data="categoryList"
              row-key="id"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}"
              :default-expand-all="false"
              :row-class-name="rowClassName"
              @selection-change="handleSelectionChange"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="品类编号" align="left" prop="categoryNo" width="280"/>
      <el-table-column label="品类名称" align="left" prop="categoryName" width="150"/>
      <el-table-column label="物料类型" align="center" prop="materialType" width="90">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_basictype" :value="scope.row.materialType"/>
        </template>
      </el-table-column>
      <el-table-column label="采购类型" align="center" prop="purchasingType" width="90">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_purchasingtype" :value="scope.row.purchasingType"/>
        </template>
      </el-table-column>
      <el-table-column label="消耗类型" align="center" prop="consumingType" width="90">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumingType"/>
        </template>
      </el-table-column>
      <el-table-column label="损耗率(0-1)" align="right" prop="lossRate" width="110"/>
      <el-table-column label="产购周期(天)" align="right" prop="daysCycletime" width="110"/>
      <el-table-column label="采购提前期(天)" align="right" prop="daysLeadtime" width="110"/>
      <el-table-column label="采购后置期(天)" align="right" prop="daysPosttime" width="110"/>
      <el-table-column label="在用否" align="center" prop="status" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="left" prop="remark"/>
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleNodeAdd(scope.row)"
          >新增</el-button>
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 创建master.open对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item prop="categoryNo" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>品类编号</strong></span>
                  </span>
          <el-input class="inputWidth" v-model="form.categoryNo" placeholder="请输入品类编号" size="mini" />
        </el-form-item>
        <el-form-item prop="categoryName" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>品类名称</strong></span>
                  </span>
          <el-input class="inputWidth" v-model="form.categoryName" placeholder="请输入品类名称" size="mini" />
        </el-form-item>
        <el-form-item prop="parentId" class="marginBottom0">
                  <span slot="label">
                      <span class="fontSize12"><strong>父品类</strong></span>
                  </span>
          <treeselect v-model="form.parentId"
                      class="inputWidth"
                      :options="categoryOptions"
                      :normalizer="normalizer"
                      placeholder="请选择父品类"
                      size="mini"/>
        </el-form-item>
        <el-form-item prop="materialType" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>物料类型</strong></span>
                  </span>
          <el-select class="inputWidth" v-model="form.materialType" filterable placeholder="请选择物料类型" size="mini">
            <el-option
              v-for="dict in dict.type.eng_material_basictype"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="purchasingType" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>采购类型</strong></span>
                  </span>
          <el-select class="inputWidth" v-model="form.purchasingType" filterable placeholder="请选择采购类型" size="mini">
            <el-option
              v-for="dict in dict.type.eng_material_purchasingtype"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="consumingType" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>消耗类型</strong></span>
                  </span>
          <el-select class="inputWidth" v-model="form.consumingType" filterable placeholder="请选择消耗类型" size="mini">
            <el-option
              v-for="dict in dict.type.eng_material_consumingtype"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="lossRate" class="marginBottom0">
          <span slot="label">
                 <span class="fontSize12"><strong>损耗率(0-1)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.lossRate" placeholder="请输入损耗率" size="mini" />
        </el-form-item>
        <el-form-item prop="daysCycletime" class="marginBottom0">
          <span slot="label">
             <span class="fontSize12"><strong>采购周期(天)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.daysCycletime" placeholder="请输入产购周期" size="mini" />
        </el-form-item>
        <el-form-item prop="daysLeadtime" class="marginBottom0">
          <span slot="label">
             <span class="fontSize12"><strong>采购提前期(天)</strong></span>
          </span>
          <el-input class="inputWidth" v-model="form.daysLeadtime" placeholder="请输入提前时间" size="mini" />
        </el-form-item>
        <el-form-item prop="daysPosttime" class="marginBottom0">
        <span slot="label">
               <span class="fontSize12"><strong>采购后置期(天)</strong></span>
        </span>
          <el-input class="inputWidth" v-model="form.daysPosttime" placeholder="请输入后置时间" size="mini" />
        </el-form-item>
        <el-form-item prop="status" class="marginBottom0">
          <span slot="label">
                 <span class="fontSize12"><strong>在用否</strong></span>
          </span>
          <el-select class="inputWidth" v-model="form.status" placeholder="请选择在用否" size="mini">
            <el-option
              v-for="dict in dict.type.object_status_enable"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="parseInt(dict.value)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
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
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listCategory, getCategory, delCategory, addCategory, updateCategory } from "@/api/eng/category";
import { listLine} from "@/api/res/line";

export default {
  name: "Category",
  dicts: ['eng_material_basictype', 'eng_material_purchasingtype', 'eng_material_consumingtype', 'object_status_enable'],
  components: {Treeselect},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      captions: [],
      // 显示搜索条件
      showSearch: false,
      // 弹出层标题
      title: "",
      single:null,
      multiple:null,
      total: 0,
      // 物料分类管理表格数据
      categoryList: [],
      // 物料分类管理树选项
      categoryOptions: [],
      fkCategoryList: [],
      fkLineList: [],
      // 查询参数
      queryParams: {
        pageEnable:true,
        pageNum: 1,
        pageSize: 200,
        categoryNo: null,
        categoryName: null,
        parentId: null,
        materialType: null,
        purchasingType: null,
        consumingType: null,
        lineId: null,
        daysCycletime: null,
        daysLeadtime: null,
        daysPosttime: null,
        status: null,
      },
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        categoryNo: [
          { required: true, message: "品类编号不能为空", trigger: "blur" }
        ],
        categoryName: [
          { required: true, message: "品类名称不能为空", trigger: "blur" }
        ],
        materialType: [
          { required: true, message: "物料类型不能为空", trigger: "change" }
        ],
        parentId: [
          { required: true, message: "父品类不能为空", trigger: "blur" }
        ],
      },
    };
  },
  created() {
    this.getList();
    /** 查询外键${fkComment}数据 */
    this.getCategoryList();
    /** 查询外键${fkComment}数据 */
    this.getLineList();
  },
  methods: {
    /** 表格行样式 */
    rowClassName({ row, rowIndex }) {
      var className = ''
      if (this.ids.includes(row.id)){
        className = 'selected-row';
      }
      else if (row.priority == 1) {
        className = 'super-urgent-row';
      } else if (row.priority == 2) {
        className = 'urgent-row';
      }


      return className;
    },
    /** 查询外键${fkComment}数据 */
    getCategoryList() {
      listCategory().then(res => {
        this.fkCategoryList = res.rows;
      });
    },
    /** 查询外键${fkComment}数据 */
    getLineList() {
      listLine().then(res => {
        this.fkLineList = res.rows;
      });
    },
    /** 查询物料分类管理列表 */
    getList() {
      this.loading = true;
      listCategory(this.queryParams).then(response => {
        this.total = response.total;
        this.categoryList = this.handleTree(response.rows, "id", "parentId");
        this.loading = false;
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
    reset (){
      this.form = {
        id: null,
        categoryNo: null,
        categoryName: null,
        parentId: null,
        materialType: null,
        consumingType: null,//普通消耗
        purchasingType:null,//生产采购
        lossRate: 0,
        daysCycletime: 0,
        daysLeadtime: 0,
        daysPosttime: 0,
        status: 4,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.captions = selection.map(item => item.categoryName)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    handleAdd() {
      this.reset();
      this.getTreeselect();
      this.open = true;
      this.title = "新增分类";
    },
    handleNodeAdd(row) {
      this.reset();
      this.getTreeselect();
      this.form.parentId = row.id;
      this.open = true;
      this.title = "新增分类";
    },
    handleUpdate(row) {
      const id = row.id || this.ids
      getCategory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分类";
      });
      this.getTreeselect();
    },
    handleDelete(row) {
      const ids = row.id || this.ids;
      const categoryNamez = row.categoryName || this.captions;

      this.$modal.confirm('确认删除分类名称为"' + categoryNamez + '"的数据项？').then(function() {
        return delCategory(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handleExport() {
      this.download('eng/category/export', {
        ...this.queryParams
      }, `category_${new Date().getTime()}.xlsx`)
    },

    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.id==this.form.id){
            this.form.params = {"id":this.form.id};
            //TODO 上述两行代码须替代或删除

            if (this.form.id != null) {
              updateCategory(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getList();
                });
            } else {
              addCategory(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.open = false;
                  this.getList();
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
