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
      <el-form-item label="订单量" prop="quantityOrder">
        <el-input
          v-model="queryParams.quantityOrder"
          placeholder="请输入订单量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划量" prop="quantityPlan">
        <el-input
          v-model="queryParams.quantityPlan"
          placeholder="请输入计划量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产量" prop="quantityWork">
        <el-input
          v-model="queryParams.quantityWork"
          placeholder="请输入生产量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="质检量" prop="quantityInspection">
        <el-input
          v-model="queryParams.quantityInspection"
          placeholder="请输入质检量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库量" prop="quantityStock">
        <el-input
          v-model="queryParams.quantityStock"
          placeholder="请输入入库量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货量" prop="quantityDelivery">
        <el-input
          v-model="queryParams.quantityDelivery"
          placeholder="请输入发货量"
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

    <el-table v-loading="loading" :data="hadaytrendList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="日期" align="center" prop="day"/>
      <el-table-column label="订单量" align="center" prop="quantityOrder"/>
      <el-table-column label="计划量" align="center" prop="quantityPlan"/>
      <el-table-column label="生产量" align="center" prop="quantityWork"/>
      <el-table-column label="质检量" align="center" prop="quantityInspection"/>
      <el-table-column label="入库量" align="center" prop="quantityStock"/>
      <el-table-column label="发货量" align="center" prop="quantityDelivery"/>
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

    <!-- 添加或修改日现对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日期" prop="day">
          <el-input v-model="form.day" placeholder="请输入日期"/>
        </el-form-item>
        <el-form-item label="订单量" prop="quantityOrder">
          <el-input v-model="form.quantityOrder" placeholder="请输入订单量"/>
        </el-form-item>
        <el-form-item label="计划量" prop="quantityPlan">
          <el-input v-model="form.quantityPlan" placeholder="请输入计划量"/>
        </el-form-item>
        <el-form-item label="生产量" prop="quantityWork">
          <el-input v-model="form.quantityWork" placeholder="请输入生产量"/>
        </el-form-item>
        <el-form-item label="质检量" prop="quantityInspection">
          <el-input v-model="form.quantityInspection" placeholder="请输入质检量"/>
        </el-form-item>
        <el-form-item label="入库量" prop="quantityStock">
          <el-input v-model="form.quantityStock" placeholder="请输入入库量"/>
        </el-form-item>
        <el-form-item label="发货量" prop="quantityDelivery">
          <el-input v-model="form.quantityDelivery" placeholder="请输入发货量"/>
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
import {listHadaytrend, getHadaytrend, delHadaytrend, addHadaytrend, updateHadaytrend} from "@/api/idx/hadaytrend";

export default {
  name: "Hadaytrend",
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
      // 日现表格数据
      hadaytrendList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        day: null,
        quantityOrder: null,
        quantityPlan: null,
        quantityWork: null,
        quantityInspection: null,
        quantityStock: null,
        quantityDelivery: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        day: [
          {required: true, message: "日期不能为空", trigger: "blur"}
        ],
        quantityOrder: [
          {required: true, message: "订单量不能为空", trigger: "blur"}
        ],
        quantityPlan: [
          {required: true, message: "计划量不能为空", trigger: "blur"}
        ],
        quantityWork: [
          {required: true, message: "生产量不能为空", trigger: "blur"}
        ],
        quantityInspection: [
          {required: true, message: "质检量不能为空", trigger: "blur"}
        ],
        quantityStock: [
          {required: true, message: "入库量不能为空", trigger: "blur"}
        ],
        quantityDelivery: [
          {required: true, message: "发货量不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询日现列表 */
    getList() {
      this.loading = true;
      listHadaytrend(this.queryParams).then(response => {
        this.hadaytrendList = response.rows;
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
        quantityOrder: null,
        quantityPlan: null,
        quantityWork: null,
        quantityInspection: null,
        quantityStock: null,
        quantityDelivery: null
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
      this.title = "添加日现";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHadaytrend(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改日现";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHadaytrend(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHadaytrend(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除日现编号为"' + ids + '"的数据项？').then(function () {
        return delHadaytrend(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('idx/hadaytrend/export', {
        ...this.queryParams
      }, `hadaytrend_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
