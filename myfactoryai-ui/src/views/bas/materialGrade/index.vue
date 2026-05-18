<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
        <el-form-item prop="grade" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>等级</strong></span>
            </span>
            <el-input
                v-model="queryParams.grade"
                placeholder="请输入等级"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading"
              height="650px"
              :data="materialGradeList"
              highlight-current-row
              :row-class-name="rowMaterialGradeIndex"
              @selection-change="handleSelectionChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="等级" align="left" prop="grade" width="70"/>
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
import { listMaterialGrade, getMaterialGrade, delMaterialGrade, addMaterialGrade, updateMaterialGrade } from "@/api/bas/materialGrade";

export default {
    name: "MaterialGrade",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: false,
        // 总条数
        total: 0,
        // 物料等级表格数据
        materialGradeList: [],
        // 弹出层标题
        title: "",
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          grade: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        },
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** ${childFunctionName}表格行样式 */
      rowMaterialGradeIndex({ row, rowIndex }) {
        var className = ''
        if (row.priority == 1) {
          className = 'super-urgent-row';
        } else if (row.priority == 2) {
          className = 'urgent-row';
        }
        return className;
      },

      /** 查询物料等级列表 */
      getList() {
        this.loading = true;
        listMaterialGrade(this.queryParams).then(response => {
          this.materialGradeList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // cancel() {
      //   this.$modal.confirm('取消后，所做修改不会保存，是否确认取消该操作？').then(function() {
      //   }).then(() => {
      //     this.open = false;
      //     this.reset();
      //     this.$modal.msgSuccess("您已取消");
      //   }).catch(() => {
      //   });
      // },
      // 表单重置
      reset() {
        this.form = {
        id: null,
        grade: null,
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
        this.queryParams.pageNum = 1;
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
        this.single = selection.length!==1
        this.multiple = !selection.length
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
  .el-table .super-urgent-row {
    background: #e0ab98;
  }

  .el-table .urgent-row {
    background: #e5b55f;
  }
</style>
