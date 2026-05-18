<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="compoundNo" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>材质编号</strong></span>
          </span>
        <el-input
          v-model="queryParams.compoundNo"
          placeholder="请输入材质编号"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="compoundDesc" class="marginBottom5">
          <span slot="label">
                 <span class="fontSize12"><strong>材质名称</strong></span>
          </span>
        <el-input
          v-model="queryParams.compoundDesc"
          placeholder="请输入材质名称"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="parentId" class="marginBottom5" >
                        <span slot="label">
                            <span class="fontSize12"><strong>父材质</strong></span>
                        </span>
        <el-select class="inputWidth" v-model="queryParams.parentId" placeholder="请选择父材质" size="mini">
          <el-option
              v-for="(fkrow, index) in fkCompoundList"
              :key="index"
              :label="fkrow.compoundNo"
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
            :disabled="multiple"
            @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" border
      height="650px"
      :data="compoundList"
      row-key="id"
      :cell-style="{fontSize: '12px',padding:'1px 0px'}"
      :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}"
      :default-expand-all="true"
      :row-class-name="rowClassName"
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
    <el-table-column label="材质编号" align="left" prop="compoundNo" width="250"/>
    <el-table-column label="材质名称" align="left" prop="compoundDesc" width="140"/>
    <el-table-column label="父材质" align="left" prop="parentId"  width="120">
        <template  slot-scope="scope">
            <template v-for="(item,index) in fkCompoundList">
        <span v-if="item.id==scope.row.parentId"
              :key="index"
              size="mini">{{item.compoundNo}}</span>
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
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
      <!-- 创建master.open对话框 -->
      <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
              <el-form-item prop="compoundNo" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>材质编号</strong></span>
                  </span>
                  <el-input class="inputWidth" v-model="form.compoundNo" placeholder="请输入材质编号" size="mini" />
              </el-form-item>
              <el-form-item prop="compoundDesc" class="marginBottom0">
                  <span slot="label">
                         <span class="fontSize12"><strong>材质名称</strong></span>
                  </span>
                  <el-input class="inputWidth" v-model="form.compoundDesc" placeholder="请输入材质名称" size="mini" />
              </el-form-item>
              <el-form-item prop="parentId" class="marginBottom0">
                  <span slot="label">
                      <span class="fontSize12"><strong>父材质ID</strong></span>
                  </span>
                  <treeselect v-model="form.parentId"
                              class="inputWidth"
                              :options="compoundOptions"
                              :normalizer="normalizer"
                              placeholder="请选择父材质ID"
                              size="mini"/>
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
import { listCompound, getCompound, delCompound, addCompound, updateCompound } from "@/api/eng/compound";

export default {
  name: "Compound",
  components: {
    Treeselect
  },
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
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 材质数据表格数据
      compoundList: [],
      // 材质数据树选项
      compoundOptions: [],
      fkCompoundList: [],
      // 查询参数
      queryParams: {
        pageEnable:true,
        pageNum: 1,
        pageSize:200,
        compoundNo: null,
        compoundDesc: null,
        parentId: null,
      },
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        compoundNo: [
          { required: true, message: "材质编号不能为空", trigger: "blur" }
        ],
      },
    };
  },
  created() {
    this.getList();
    /** 查询外键${fkComment}数据 */
    this.getCompoundList();
    this.getTreeselect();
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
    /** 查询材质数据列表 */
    getList() {
      this.loading = true;
      listCompound(this.queryParams).then(response => {
        this.total = response.total;
        this.compoundList = this.handleTree(response.rows, "id", "parentId");
        this.loading = false;
      });
    },
    /** 查询外键${fkComment}数据 */
    getCompoundList() {
        listCompound().then(res => {
          this.fkCompoundList = res.rows;
        });
    },
    /** 转换材质数据数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.compoundNo,
        children: node.children
      };
    },
    /** 查询材质数据下拉树结构 */
    getTreeselect() {
      listCompound().then(response => {
        this.compoundOptions = [];
        const data = { id: 0, compoundNo: '顶级节点', children: [] };
        data.children = this.handleTree(response.rows, "id", "parentId");
        this.compoundOptions.push(data);
      });
    },
    reset (){
      this.form = {
        id: null,
        compoundNo: null,
        compoundDesc: null,
        parentId: null,
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
        this.captions = selection.map(item => item.id)
        this.single = selection.length!==1
        this.multiple = !selection.length
    },
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增";
    },

    handleUpdate(row) {
      const id = row.id || this.ids
      getCompound(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },

    handleDelete(row) {
      const ids = row.id || this.ids;
      const idz = row.id || this.captions;

      this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
        return delCompound(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handleExport() {
      this.download('eng/compound/export', {
        ...this.queryParams
      }, `compound_${new Date().getTime()}.xlsx`)
    },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateCompound(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  });
                } else {
                  addCompound(this.form)
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
