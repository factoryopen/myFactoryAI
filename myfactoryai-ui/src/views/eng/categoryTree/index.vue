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
    <el-row :gutter="10" class="mb8">
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
      <el-table-column label="品类名称" align="left" prop="categoryName" width="200"/>
      <el-table-column label="物料类型" align="center" prop="materialType" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_basictype" :value="scope.row.materialType"/>
        </template>
      </el-table-column>
      <el-table-column label="采购类型" align="center" prop="purchasingType" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_purchasingtype" :value="scope.row.purchasingType"/>
        </template>
      </el-table-column>
      <el-table-column label="消耗类型" align="center" prop="consumingType" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumingType"/>
        </template>
      </el-table-column>
      <el-table-column label="损耗率(0-1)" align="right" prop="lossRate" width="120"/>
      <el-table-column label="产购周期(天)" align="right" prop="daysCycletime" width="120"/>
      <el-table-column label="采购提前期(天)" align="right" prop="daysLeadtime" width="120"/>
      <el-table-column label="采购后置期(天)" align="right" prop="daysPosttime" width="120"/>
      <el-table-column label="在用否" align="center" prop="status" width="80">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.object_status_enable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="left" prop="remark"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
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
    handleExport() {
      this.download('eng/category/export', {
        ...this.queryParams
      }, `category_${new Date().getTime()}.xlsx`)
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
