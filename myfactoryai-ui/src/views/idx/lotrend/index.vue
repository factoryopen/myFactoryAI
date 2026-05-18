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
      <el-form-item label="在制批数" prop="quantityWip">
        <el-input
          v-model="queryParams.quantityWip"
          placeholder="请输入在制批数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="特急批数" prop="quantitySuperurgent">
        <el-input
          v-model="queryParams.quantitySuperurgent"
          placeholder="请输入特急批数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急批数" prop="quantityUrgent">
        <el-input
          v-model="queryParams.quantityUrgent"
          placeholder="请输入紧急批数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="冻结批数" prop="quantityFrozen">
        <el-input
          v-model="queryParams.quantityFrozen"
          placeholder="请输入冻结批数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="取消批数" prop="quantityKilled">
        <el-input
          v-model="queryParams.quantityKilled"
          placeholder="请输入取消批数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结案批数" prop="quantityCompleted">
        <el-input
          v-model="queryParams.quantityCompleted"
          placeholder="请输入结案批数"
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

    <el-table v-loading="loading" :data="lotrendList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="日期" align="center" prop="day"/>
      <el-table-column label="在制批数" align="center" prop="quantityWip"/>
      <el-table-column label="特急批数" align="center" prop="quantitySuperurgent"/>
      <el-table-column label="紧急批数" align="center" prop="quantityUrgent"/>
      <el-table-column label="冻结批数" align="center" prop="quantityFrozen"/>
      <el-table-column label="取消批数" align="center" prop="quantityKilled"/>
      <el-table-column label="结案批数" align="center" prop="quantityCompleted"/>
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

    <!-- 添加或修改批次现对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="day">
          <el-input v-model="form.day" placeholder="请输入日期"/>
        </el-form-item>
        <el-form-item label="在制批数" prop="quantityWip">
          <el-input v-model="form.quantityWip" placeholder="请输入在制批数"/>
        </el-form-item>
        <el-form-item label="特急批数" prop="quantitySuperurgent">
          <el-input v-model="form.quantitySuperurgent" placeholder="请输入特急批数"/>
        </el-form-item>
        <el-form-item label="紧急批数" prop="quantityUrgent">
          <el-input v-model="form.quantityUrgent" placeholder="请输入紧急批数"/>
        </el-form-item>
        <el-form-item label="冻结批数" prop="quantityFrozen">
          <el-input v-model="form.quantityFrozen" placeholder="请输入冻结批数"/>
        </el-form-item>
        <el-form-item label="取消批数" prop="quantityKilled">
          <el-input v-model="form.quantityKilled" placeholder="请输入取消批数"/>
        </el-form-item>
        <el-form-item label="结案批数" prop="quantityCompleted">
          <el-input v-model="form.quantityCompleted" placeholder="请输入结案批数"/>
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
import {listLotrend, getLotrend, delLotrend, addLotrend, updateLotrend} from "@/api/idx/lotrend";

export default {
  name: "Lotrend",
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
      // 批次现表格数据
      lotrendList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        day: null,
        quantityWip: null,
        quantitySuperurgent: null,
        quantityUrgent: null,
        quantityFrozen: null,
        quantityKilled: null,
        quantityCompleted: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        day: [
          {required: true, message: "日期不能为空", trigger: "blur"}
        ],
        quantityWip: [
          {required: true, message: "在制批数不能为空", trigger: "blur"}
        ],
        quantitySuperurgent: [
          {required: true, message: "特急批数不能为空", trigger: "blur"}
        ],
        quantityUrgent: [
          {required: true, message: "紧急批数不能为空", trigger: "blur"}
        ],
        quantityFrozen: [
          {required: true, message: "冻结批数不能为空", trigger: "blur"}
        ],
        quantityKilled: [
          {required: true, message: "取消批数不能为空", trigger: "blur"}
        ],
        quantityCompleted: [
          {required: true, message: "结案批数不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询批次现列表 */
    getList() {
      this.loading = true;
      listLotrend(this.queryParams).then(response => {
        this.lotrendList = response.rows;
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
        quantityWip: null,
        quantitySuperurgent: null,
        quantityUrgent: null,
        quantityFrozen: null,
        quantityKilled: null,
        quantityCompleted: null
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
      this.title = "添加批次现";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotrend(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改批次现";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotrend(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLotrend(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除批次现编号为"' + ids + '"的数据项？').then(function () {
        return delLotrend(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('idx/lotrend/export', {
        ...this.queryParams
      }, `lotrend_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
