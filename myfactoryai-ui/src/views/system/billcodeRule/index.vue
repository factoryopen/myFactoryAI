<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item prop="billCode" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>单码</strong></span>
            </span>
        <el-input
          v-model="queryParams.billCode"
          placeholder="请输入单码"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="billName" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>单名</strong></span>
            </span>
        <el-input
          v-model="queryParams.billName"
          placeholder="请输入单名"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="disableRule" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>启用规则否</strong></span>
            </span>
        <el-select v-model="queryParams.disableRule" placeholder="请选择启用规则否" clearable size="mini"
                   class="searchInput">
          <el-option
            v-for="dict in dict.type.sys_selected_ornot"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="disableCode" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>单码否</strong></span>
            </span>
        <el-select v-model="queryParams.disableCode" placeholder="请选择单码否" clearable size="mini"
                   class="searchInput">
          <el-option
            v-for="dict in dict.type.sys_selected_ornot"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="disablePrefix" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>启用前缀否</strong></span>
            </span>
        <el-select v-model="queryParams.disablePrefix" placeholder="请选择启用前缀否" clearable size="mini"
                   class="searchInput">
          <el-option
            v-for="dict in dict.type.sys_selected_ornot"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="prefixChars" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>前缀字符</strong></span>
            </span>
        <el-input
          v-model="queryParams.prefixChars"
          placeholder="请输入前缀字符"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="disablePeriod" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>启用时期否</strong></span>
            </span>
        <el-select v-model="queryParams.disablePeriod" placeholder="请选择启用时期否" clearable size="mini"
                   class="searchInput">
          <el-option
            v-for="dict in dict.type.sys_selected_ornot"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="periodPattern" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>时期样式</strong></span>
            </span>
        <el-input
          v-model="queryParams.periodPattern"
          placeholder="请输入时期样式"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="disableNumber" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>启用数字否</strong></span>
            </span>
        <el-select v-model="queryParams.disableNumber" placeholder="请选择启用数字否" clearable size="mini"
                   class="searchInput">
          <el-option
            v-for="dict in dict.type.sys_selected_ornot"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="numberSize" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>数字位数</strong></span>
            </span>
        <el-input
          v-model="queryParams.numberSize"
          placeholder="请输入数字位数"
          clearable
          size="mini"
          class="searchInput"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="lastDate" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>最后日期</strong></span>
            </span>
        <el-date-picker
          clearable
          size="mini"
          class="searchInput"
          v-model="queryParams.lastDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择最后日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="nextNumber" class="marginBottom5">
            <span slot="label">
                <span class="fontSize12"><strong>下一序号</strong></span>
            </span>
        <el-input
          v-model="queryParams.nextNumber"
          placeholder="请输入下一序号"
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
    <el-table v-loading="loading" :data="billcodeRuleList" highlight-current-row
              @selection-change="handleSelectionChange" :cell-style="{fontSize: '12px',padding:'1px 0px'}"
              :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id" width="60"/>
      <el-table-column label="单码" align="center" prop="billCode" width="70"/>
      <el-table-column label="单名" align="left" prop="billName" width="140"/>
      <el-table-column label="规则否" align="center" prop="disableRule" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_selected_ornot" :value="scope.row.disableRule"/>
        </template>
      </el-table-column>
      <el-table-column label="单码否" align="center" prop="disableCode" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_selected_ornot" :value="scope.row.disableCode"/>
        </template>
      </el-table-column>
      <el-table-column label="前缀否" align="center" prop="disablePrefix" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_selected_ornot" :value="scope.row.disablePrefix"/>
        </template>
      </el-table-column>
      <el-table-column label="前缀字符" align="center" prop="prefixChars" width="110"/>
      <el-table-column label="时期否" align="center" prop="disablePeriod" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_selected_ornot" :value="scope.row.disablePeriod"/>
        </template>
      </el-table-column>
      <el-table-column label="时期样式" align="center" prop="periodPattern" width="110"/>
      <el-table-column label="数字否" align="center" prop="disableNumber" width="70">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_selected_ornot" :value="scope.row.disableNumber"/>
        </template>
      </el-table-column>
      <el-table-column label="数字位数" align="center" prop="numberSize" width="110"/>
      <el-table-column label="最后日期" align="center" prop="lastDate" width="110"/>
      <el-table-column label="下一序号" align="center" prop="nextNumber" width="110"/>
      <el-table-column label="备注" align="left" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="120">
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

    <!-- 添加或修改单据规则对话框 -->
    <el-dialog :title="title" class="dialogConfig" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline-message="true">
        <el-form-item prop="billCode" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>单码</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.billCode" placeholder="请输入单码" size="mini"/>
        </el-form-item>
        <el-form-item prop="billName" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>单名</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.billName" placeholder="请输入单名" size="mini"/>
        </el-form-item>
        <el-form-item prop="disableRule" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>启用规则否</strong></span>
                </span>
          <el-select class="inputWidth" v-model="form.disableRule" placeholder="请选择启用规则否" size="mini">
            <el-option
              v-for="dict in dict.type.sys_selected_ornot"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="disableCode" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>单码否</strong></span>
                </span>
          <el-select class="inputWidth" v-model="form.disableCode" placeholder="请选择单码否" size="mini">
            <el-option
              v-for="dict in dict.type.sys_selected_ornot"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="disablePrefix" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>启用前缀否</strong></span>
                </span>
          <el-select class="inputWidth" v-model="form.disablePrefix" placeholder="请选择启用前缀否" size="mini">
            <el-option
              v-for="dict in dict.type.sys_selected_ornot"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="prefixChars" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>前缀字符</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.prefixChars" placeholder="请输入前缀字符" size="mini"/>
        </el-form-item>
        <el-form-item prop="disablePeriod" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>启用时期否</strong></span>
                </span>
          <el-select class="inputWidth" v-model="form.disablePeriod" placeholder="请选择启用时期否" size="mini">
            <el-option
              v-for="dict in dict.type.sys_selected_ornot"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="periodPattern" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>时期样式</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.periodPattern" placeholder="请输入时期样式" size="mini"/>
        </el-form-item>
        <el-form-item prop="disableNumber" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>启用数字否</strong></span>
                </span>
          <el-select class="inputWidth" v-model="form.disableNumber" placeholder="请选择启用数字否" size="mini">
            <el-option
              v-for="dict in dict.type.sys_selected_ornot"
              :key="dict.value"
              :label="dict.label"
              size="mini"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="numberSize" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>数字位数</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.numberSize" placeholder="请输入数字位数" size="mini"/>
        </el-form-item>
        <el-form-item prop="lastDate" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>最后日期</strong></span>
                    </span>
          <el-date-picker
            clearable
            size="mini"
            v-model="form.lastDate"
            class="inputWidth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择最后日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="nextNumber" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>下一序号</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.nextNumber" placeholder="请输入下一序号" size="mini"/>
        </el-form-item>
        <el-form-item prop="remark" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>备注</strong></span>
                </span>
          <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini"/>
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
import {
  listBillcodeRule,
  getBillcodeRule,
  delBillcodeRule,
  addBillcodeRule,
  updateBillcodeRule
} from "@/api/system/billcodeRule";

export default {
  name: "BillcodeRule",
  dicts: ['sys_selected_ornot'],
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
      // 单据规则表格数据
      billcodeRuleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        billCode: null,
        billName: null,
        disableRule: null,
        disableCode: null,
        disablePrefix: null,
        prefixChars: null,
        disablePeriod: null,
        periodPattern: null,
        disableNumber: null,
        numberSize: null,
        lastDate: null,
        nextNumber: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        billCode: [
          {required: true, message: "单码不能为空", trigger: "blur"}
        ],
        billName: [
          {required: true, message: "单名不能为空", trigger: "blur"}
        ],
        disableRule: [
          {required: true, message: "启用规则否不能为空", trigger: "change"}
        ],
        disableCode: [
          {required: true, message: "单码否不能为空", trigger: "change"}
        ],
        disablePrefix: [
          {required: true, message: "启用前缀否不能为空", trigger: "change"}
        ],
        disablePeriod: [
          {required: true, message: "启用时期否不能为空", trigger: "change"}
        ],
        periodPattern: [
          {required: true, message: "时期样式不能为空", trigger: "blur"}
        ],
        disableNumber: [
          {required: true, message: "启用数字否不能为空", trigger: "change"}
        ],
        numberSize: [
          {required: true, message: "数字位数不能为空", trigger: "blur"}
        ],
        lastDate: [
          {required: true, message: "最后日期不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {

    /** 查询单据规则列表 */
    getList() {
      this.loading = true;
      listBillcodeRule(this.queryParams).then(response => {
        this.billcodeRuleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.$modal.msgSuccess("您已取消");
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
        billCode: null,
        billName: null,
        disableRule: null,
        disableCode: null,
        disablePrefix: null,
        prefixChars: null,
        disablePeriod: null,
        periodPattern: null,
        disableNumber: null,
        numberSize: null,
        lastDate: null,
        nextNumber: null,
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加单据规则";

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const id = row.id || this.ids
      getBillcodeRule(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单据规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBillcodeRule(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBillcodeRule(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除单据规则编号为"' + ids + '"的数据项？').then(function () {
        return delBillcodeRule(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('mdt/billcodeRule/export', {
        ...this.queryParams
      }, `billcodeRule_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style>
.marginBottom5 {
  margin-bottom: 5px !important
}

.marginBottom0 {
  margin-bottom: 0;
}

.fontSize12 {
  font-size: 12px
}

.inputWidth {
  width: 60% !important
}

.searchInput {
  width: 180px !important
}

.el-input__inner {
  width: 100%
}

.dialogConfig .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
