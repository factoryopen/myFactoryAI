<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期" prop="day">
        <el-input
          v-model="queryParams.day"
          placeholder="请输入日期"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报废数量" prop="quantityScrap">
        <el-input
          v-model="queryParams.quantityScrap"
          placeholder="请输入报废数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重派数量" prop="quantityRedisp">
        <el-input
          v-model="queryParams.quantityRedisp"
          placeholder="请输入重派数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="返工数量" prop="quantityRework">
        <el-input
          v-model="queryParams.quantityRework"
          placeholder="请输入返工数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="待判数量" prop="quantityPending">
        <el-input
          v-model="queryParams.quantityPending"
          placeholder="请输入待判数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="特采次数" prop="quantityAod">
        <el-input
          v-model="queryParams.quantityAod"
          placeholder="请输入特采次数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="resultrendList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="日期" align="center" prop="day"/>
      <el-table-column label="报废数量" align="center" prop="quantityScrap"/>
      <el-table-column label="重派数量" align="center" prop="quantityRedisp"/>
      <el-table-column label="返工数量" align="center" prop="quantityRework"/>
      <el-table-column label="待判数量" align="center" prop="quantityPending"/>
      <el-table-column label="特采次数" align="center" prop="quantityAod"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
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

    <!-- 添加或修改质异结果对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="day">
          <el-input v-model="form.day" placeholder="请输入日期"/>
        </el-form-item>
        <el-form-item label="报废数量" prop="quantityScrap">
          <el-input v-model="form.quantityScrap" placeholder="请输入报废数量"/>
        </el-form-item>
        <el-form-item label="重派数量" prop="quantityRedisp">
          <el-input v-model="form.quantityRedisp" placeholder="请输入重派数量"/>
        </el-form-item>
        <el-form-item label="返工数量" prop="quantityRework">
          <el-input v-model="form.quantityRework" placeholder="请输入返工数量"/>
        </el-form-item>
        <el-form-item label="待判数量" prop="quantityPending">
          <el-input v-model="form.quantityPending" placeholder="请输入待判数量"/>
        </el-form-item>
        <el-form-item label="特采次数" prop="quantityAod">
          <el-input v-model="form.quantityAod" placeholder="请输入特采次数"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listResultrend, getResultrend, delResultrend, addResultrend, updateResultrend} from "@/api/idx/resultrend";

export default {
  name: "Resultrend",
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
      showSearch: true,
      // 总条数
      total: 0,
      // 质异结果表格数据
      resultrendList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        day: null,
        quantityScrap: null,
        quantityRedisp: null,
        quantityRework: null,
        quantityPending: null,
        quantityAod: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        day: [
          {required: true, message: "日期不能为空", trigger: "blur"}
        ],
        quantityScrap: [
          {required: true, message: "报废数量不能为空", trigger: "blur"}
        ],
        quantityRedisp: [
          {required: true, message: "重派数量不能为空", trigger: "blur"}
        ],
        quantityRework: [
          {required: true, message: "返工数量不能为空", trigger: "blur"}
        ],
        quantityPending: [
          {required: true, message: "待判数量不能为空", trigger: "blur"}
        ],
        quantityAod: [
          {required: true, message: "特采次数不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询质异结果列表 */
    getList() {
      this.loading = true;
      listResultrend(this.queryParams).then(response => {
        this.resultrendList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        day: null,
        quantityScrap: null,
        quantityRedisp: null,
        quantityRework: null,
        quantityPending: null,
        quantityAod: null
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加质异结果";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getResultrend(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改质异结果";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateResultrend(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addResultrend(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除质异结果编号为"' + ids + '"的数据项？').then(function () {
        return delResultrend(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('idx/resultrend/export', {
        ...this.queryParams
      }, `resultrend_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
