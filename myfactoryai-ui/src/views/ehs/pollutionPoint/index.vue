<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="name" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="pointDesc" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>设备描述</strong></span>
                </span>
                <el-input
                    v-model="queryParams.pointDesc"
                    placeholder="请输入设备描述"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.object_status_basic"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="location" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>位置</strong></span>
                </span>
                <el-input
                    v-model="queryParams.location"
                    placeholder="请输入位置"
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
                  :data="pollutionPointList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="名称" align="left" prop="name" width="140"/>
            <el-table-column label="设备描述" align="left" prop="pointDesc" width="140"/>
            <el-table-column label="状态" align="center" prop="status" width="55">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_basic" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="位置" align="center" prop="location" width="110"/>
            <el-table-column label="排放分类" align="right" prop="categoryId"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionCategoryList">
                        <span v-if="item.id==scope.row.categoryId"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排放指标1" align="right" prop="index1Id"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index1Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排放指标2" align="right" prop="index2Id"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index2Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排放指标3" align="right" prop="index3Id"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index3Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排放指标4" align="right" prop="index4Id"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index4Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="排放指标5" align="right" prop="index5Id"  width="120">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPollutionIndexList">
                        <span v-if="item.id==scope.row.index5Id"
                            :key="index"
                            size="mini">{{item.name}}</span>
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
                <el-form-item  prop="name" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.name" placeholder="请输入名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="pointDesc" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>设备描述</strong></span></span>
                     <el-input class="inputWidth" v-model="form.pointDesc" placeholder="请输入设备描述" size="mini" />
                </el-form-item>
                <el-form-item  prop="location" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>位置</strong></span></span>
                     <el-input class="inputWidth" v-model="form.location" placeholder="请输入位置" size="mini" />
                </el-form-item>
                <el-form-item prop="categoryId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放分类</strong></span></span>
                    <el-select class="inputWidth" v-model="form.categoryId" placeholder="请选择排放分类"
                               @change="onCategoryIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionCategoryList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index1Id" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放指标1</strong></span></span>
                    <el-select class="inputWidth" v-model="form.index1Id" placeholder="请选择排放指标1"
                               @change="onIndex1IdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index2Id" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放指标2</strong></span></span>
                    <el-select class="inputWidth" v-model="form.index2Id" placeholder="请选择排放指标2"
                               @change="onIndex2IdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index3Id" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放指标3</strong></span></span>
                    <el-select class="inputWidth" v-model="form.index3Id" placeholder="请选择排放指标3"
                               @change="onIndex3IdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index4Id" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放指标4</strong></span></span>
                    <el-select class="inputWidth" v-model="form.index4Id" placeholder="请选择排放指标4"
                               @change="onIndex4IdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index5Id" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>排放指标5</strong></span></span>
                    <el-select class="inputWidth" v-model="form.index5Id" placeholder="请选择排放指标5"
                               @change="onIndex5IdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPollutionIndexList"
                          :key="index"
                          :label="fkrow.name"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
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
import { listPollutionPoint, getPollutionPoint, delPollutionPoint, addPollutionPoint, updatePollutionPoint } from "@/api/ehs/pollutionPoint";
import { listPollutionCategory} from "@/api/ehs/pollutionCategory";
import { listPollutionIndex} from "@/api/ehs/pollutionIndex";

export default {
    name: "PollutionPoint",
    dicts: ['object_status_basic'],
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
        // 污染物排放点表格数据
        pollutionPointList: [],
        fkPollutionCategoryList: [],
        fkPollutionIndexList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          name: null,
          pointDesc: null,
          status: null,
          location: null,
          categoryId: null,
          index1Id: null,
          index2Id: null,
          index3Id: null,
          index4Id: null,
          index5Id: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            name: [
                { required: true, message: "名称不能为空", trigger: "blur" }
            ],
            status: [
                { required: true, message: "状态不能为空", trigger: "change" }
            ],
            location: [
                { required: true, message: "位置不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键PollutionCategory数据 */
          this.getPollutionCategoryList();
          /** 查询外键PollutionIndex数据 */
          this.getPollutionIndexList();
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
          /** 查询外键PollutionCategory数据 */
      getPollutionCategoryList() {
        listPollutionCategory().then(res => {
          this.fkPollutionCategoryList = res.rows;
        });
      },
          /** 查询外键PollutionIndex数据 */
      getPollutionIndexList() {
        listPollutionIndex().then(res => {
          this.fkPollutionIndexList = res.rows;
        });
      },

/**主表外键CategoryId被选择后触发事件*/
        onCategoryIdSelection(fkId){
            this.fkPollutionCategoryList.forEach(item=>{
                if(fkId === item.id){
                    this.form.categoryId = item.id
                }
            });
        },
/**主表外键Index1Id被选择后触发事件*/
        onIndex1IdSelection(fkId){
            this.fkPollutionIndexList.forEach(item=>{
                if(fkId === item.id){
                    this.form.index1Id = item.id
                }
            });
        },
/**主表外键Index2Id被选择后触发事件*/
        onIndex2IdSelection(fkId){
            this.fkPollutionIndexList.forEach(item=>{
                if(fkId === item.id){
                    this.form.index1Id = item.id
                }
            });
        },
/**主表外键Index3Id被选择后触发事件*/
        onIndex3IdSelection(fkId){
            this.fkPollutionIndexList.forEach(item=>{
                if(fkId === item.id){
                    this.form.index1Id = item.id
                }
            });
        },
/**主表外键Index4Id被选择后触发事件*/
        onIndex4IdSelection(fkId){
            this.fkPollutionIndexList.forEach(item=>{
                if(fkId === item.id){
                    this.form.index1Id = item.id
                }
            });
        },
/**主表外键Index5Id被选择后触发事件*/
        onIndex5IdSelection(fkId){
            this.fkPollutionIndexList.forEach(item=>{
                if(fkId === item.id){
                    this.form.index1Id = item.id
                }
            });
        },

        /** 查询污染物排放点列表 */
        getList() {
            this.loading = true;
        listPollutionPoint(this.queryParams).then(response => {
          this.pollutionPointList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              name: null,
              pointDesc: null,
              status: null,
              location: null,
              categoryId: null,
              index1Id: null,
              index2Id: null,
              index3Id: null,
              index4Id: null,
              index5Id: null,
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
              name: null,
              pointDesc: null,
              status: null,
              location: null,
              categoryId: null,
              index1Id: null,
              index2Id: null,
              index3Id: null,
              index4Id: null,
              index5Id: null,
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
              name: null,
              pointDesc: null,
              status: null,
              location: null,
              categoryId: null,
              index1Id: null,
              index2Id: null,
              index3Id: null,
              index4Id: null,
              index5Id: null,
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
            this.captions = selection.map(item => item.name)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增污染物排放点";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getPollutionPoint(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改污染物排放点";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const namez = row.name || this.captions;
            this.$modal.confirm('确认删除名称为"' + namez + '"的数据项？').then(function() {
              return delPollutionPoint(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('ehs/pollutionPoint/export', {
             ...this.queryParams
             }, `pollutionPoint_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updatePollutionPoint(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addPollutionPoint(this.form)
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
