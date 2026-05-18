<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
        <el-form-item prop="patternName" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>方式名称</strong></span>
            </span>
            <el-input
                v-model="queryParams.patternName"
                placeholder="请输入方式名称"
                clearable
                size="mini"
                class="searchInput"
                @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item prop="patternRate" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>税率</strong></span>
            </span>
            <el-input
                v-model="queryParams.patternRate"
                placeholder="请输入税率"
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
              :data="invoicePatternList"
              highlight-current-row
              :row-class-name="rowInvoicePatternIndex"
              @selection-change="handleSelectionChange"
              :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="方式名称" align="center" prop="patternName" width="140"/>
        <el-table-column label="税率" align="right" prop="patternRate" width="110"/>
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
import { listInvoicePattern, getInvoicePattern, delInvoicePattern, addInvoicePattern, updateInvoicePattern } from "@/api/bas/invoicePattern";

export default {
    name: "InvoicePattern",
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
        // 开票方式表格数据
        invoicePatternList: [],
        // 弹出层标题
        title: "",
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          patternName: null,
          patternRate: null,
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
      rowInvoicePatternIndex({ row, rowIndex }) {
        var className = ''
        if (row.priority == 1) {
          className = 'super-urgent-row';
        } else if (row.priority == 2) {
          className = 'urgent-row';
        }
        return className;
      },

      /** 查询开票方式列表 */
      getList() {
        this.loading = true;
        listInvoicePattern(this.queryParams).then(response => {
          this.invoicePatternList = response.rows;
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
        patternName: null,
        patternRate: null,
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
