<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="day" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>日期</strong></span>
                </span>
                <el-input
                    v-model="queryParams.day"
                    placeholder="请输入日期"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="quantity" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>数量</strong></span>
                </span>
                <el-input
                    v-model="queryParams.quantity"
                    placeholder="请输入数量"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="index1Value" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>指标1值</strong></span>
                </span>
                <el-input
                    v-model="queryParams.index1Value"
                    placeholder="请输入指标1值"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="index2Value" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>指标2值</strong></span>
                </span>
                <el-input
                    v-model="queryParams.index2Value"
                    placeholder="请输入指标2值"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="index3Value" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>指标3值</strong></span>
                </span>
                <el-input
                    v-model="queryParams.index3Value"
                    placeholder="请输入指标3值"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="index4Value" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>指标4值</strong></span>
                </span>
                <el-input
                    v-model="queryParams.index4Value"
                    placeholder="请输入指标4值"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="index5Value" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>指标5值</strong></span>
                </span>
                <el-input
                    v-model="queryParams.index5Value"
                    placeholder="请输入指标5值"
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
                <el-button type="primary" icon="el-icon-plus" size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-edit" size="mini"
 :disabled="single"                     @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini"
 :disabled="multiple"                     @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="pollutionRecordList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="设备" align="right" prop="foodieId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionPointList">
                        <span v-if="item.id==scope.row.foodieId"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="日期" align="center" prop="day" width="85"/>
            <el-table-column label="数量" align="right" prop="quantity" width="80"/>
            <el-table-column label="指标1" align="right" prop="index1Id" width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index1Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="指标1值" align="right" prop="index1Value" width="110"/>
            <el-table-column label="指标2" align="right" prop="index2Id" width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index2Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="指标2值" align="right" prop="index2Value" width="110"/>
            <el-table-column label="指标3" align="right" prop="index3Id" width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index3Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="指标3值" align="right" prop="index3Value" width="110"/>
            <el-table-column label="指标4" align="right" prop="index4Id" width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index4Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="指标4值" align="right" prop="index4Value" width="110"/>
            <el-table-column label="指标5" align="right" prop="index5Id" width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index5Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="指标5值" align="right" prop="index5Value" width="110"/>
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
                <el-form-item prop="foodieId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>设备</strong></span></span>
                    <el-select class="inputWidth" v-model="form.foodieId" placeholder="请选择设备"
                               @change="onFoodieIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionPointList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="day" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>日期</strong></span></span>
                     <el-input class="inputWidth" v-model="form.day" placeholder="请输入日期" size="mini" />
                </el-form-item>
                <el-form-item  prop="quantity" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入数量" size="mini" />
                </el-form-item>
                <el-form-item prop="index1Id" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>指标1</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.index1Id" placeholder="请选择指标1" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="index1Value" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>指标1值</strong></span></span>
                     <el-input class="inputWidth" v-model="form.index1Value" placeholder="请输入指标1值" size="mini" />
                </el-form-item>
                <el-form-item prop="index2Id" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>指标2</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.index2Id" placeholder="请选择指标2" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="index2Value" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>指标2值</strong></span></span>
                     <el-input class="inputWidth" v-model="form.index2Value" placeholder="请输入指标2值" size="mini" />
                </el-form-item>
                <el-form-item prop="index3Id" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>指标3</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.index3Id" placeholder="请选择指标3" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="index3Value" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>指标3值</strong></span></span>
                     <el-input class="inputWidth" v-model="form.index3Value" placeholder="请输入指标3值" size="mini" />
                </el-form-item>
                <el-form-item prop="index4Id" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>指标4</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.index4Id" placeholder="请选择指标4" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="index4Value" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>指标4值</strong></span></span>
                     <el-input class="inputWidth" v-model="form.index4Value" placeholder="请输入指标4值" size="mini" />
                </el-form-item>
                <el-form-item prop="index5Id" class="marginBottom0">
                    <span slot="label">
                         <span class="fontSize12"><strong>指标5</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.index5Id" placeholder="请选择指标5" size="mini" disabled="true">
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="index5Value" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>指标5值</strong></span></span>
                     <el-input class="inputWidth" v-model="form.index5Value" placeholder="请输入指标5值" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
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
import { listPollutionRecord, getPollutionRecord, delPollutionRecord, addPollutionRecord, updatePollutionRecord } from "@/api/ehs/pollutionRecord";
import { listPollutionIndex} from "@/api/ehs/pollutionIndex";
import { listPollutionPoint} from "@/api/ehs/pollutionPoint";

export default {
    name: "PollutionRecord",
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
        // 污染物排放登记表格数据
        pollutionRecordList: [],
        fkPollutionIndexList: [],
        fkPollutionPointList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          foodieId: null,
          day: null,
          quantity: null,
          index1Id: null,
          index1Value: null,
          index2Id: null,
          index2Value: null,
          index3Id: null,
          index3Value: null,
          index4Id: null,
          index4Value: null,
          index5Id: null,
          index5Value: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            foodieId: [
                { required: true, message: "设备ID不能为空", trigger: "blur" }
            ],
            day: [
                { required: true, message: "日期不能为空", trigger: "blur" }
            ],
            quantity: [
                { required: true, message: "数量不能为空", trigger: "blur" }
            ],
            index1Value: [
                { required: true, message: "指标1值不能为空", trigger: "blur" }
            ],
            index2Value: [
                { required: true, message: "指标2值不能为空", trigger: "blur" }
            ],
            index3Value: [
                { required: true, message: "指标3值不能为空", trigger: "blur" }
            ],
            index4Value: [
                { required: true, message: "指标4值不能为空", trigger: "blur" }
            ],
            index5Value: [
                { required: true, message: "指标5值不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键PollutionIndex数据 */
          this.getPollutionIndexList();
          /** 查询外键PollutionPoint数据 */
          this.getPollutionPointList();
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
          /** 查询外键PollutionIndex数据 */
      getPollutionIndexList() {
        listPollutionIndex().then(res => {
          this.fkPollutionIndexList = res.rows;
        });
      },
          /** 查询外键PollutionPoint数据 */
      getPollutionPointList() {
        listPollutionPoint().then(res => {
          this.fkPollutionPointList = res.rows;
        });
      },

/**主表外键FoodieId被选择后触发事件*/
        onFoodieIdSelection(fkId){
            this.fkPollutionPointList.forEach(item=>{
                if(fkId === item.id){
                    this.form.foodieId = item.id
                    this.form.index1Id = item.index1Id
                    this.form.index2Id = item.index2Id
                    this.form.index3Id = item.index3Id
                    this.form.index4Id = item.index4Id
                    this.form.index5Id = item.index5Id
                }
            });
        },

        /** 查询污染物排放登记列表 */
        getList() {
            this.loading = true;
        listPollutionRecord(this.queryParams).then(response => {
          this.pollutionRecordList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              foodieId: null,
              day: null,
              quantity: null,
              index1Id: null,
              index1Value: null,
              index2Id: null,
              index2Value: null,
              index3Id: null,
              index3Value: null,
              index4Id: null,
              index4Value: null,
              index5Id: null,
              index5Value: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              foodieId: null,
              day: null,
              quantity: null,
              index1Id: null,
              index1Value: null,
              index2Id: null,
              index2Value: null,
              index3Id: null,
              index3Value: null,
              index4Id: null,
              index4Value: null,
              index5Id: null,
              index5Value: null,
              remark: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null
            };
            this.resetForm("form");
        },
        reset (){
            this.form = {
              id: null,
              foodieId: null,
              day: null,
              quantity: null,
              index1Id: null,
              index1Value: null,
              index2Id: null,
              index2Value: null,
              index3Id: null,
              index3Value: null,
              index4Id: null,
              index4Value: null,
              index5Id: null,
              index5Value: null,
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
            this.captions = selection.map(item => item.id)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增污染物排放登记";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getPollutionRecord(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改污染物排放登记";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const idz = row.id || this.captions;
            this.$modal.confirm('确认删除ID为"' + idz + '"的数据项？').then(function() {
              return delPollutionRecord(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('ehs/pollutionRecord/export', {
             ...this.queryParams
             }, `pollutionRecord_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updatePollutionRecord(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addPollutionRecord(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
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
