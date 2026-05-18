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
            <el-form-item prop="boxName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>包装容器</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxName"
                    placeholder="请输入包装容器"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="boxMaterial" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>包材名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxMaterial"
                    placeholder="请输入包材名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="boxSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>包材规格</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxSpec"
                    placeholder="请输入包材规格"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="boxLength" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>外包装长</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxLength"
                    placeholder="请输入外包装长"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="boxWidth" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>外包装宽</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxWidth"
                    placeholder="请输入外包装宽"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="boxHeight" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>外包装高</strong></span>
                </span>
                <el-input
                    v-model="queryParams.boxHeight"
                    placeholder="请输入外包装高"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="enableChild" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>内包否</strong></span>
                </span>
                <el-select v-model="queryParams.enableChild" placeholder="请选择内包否" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.object_status_enable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="childboxName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>内包装容器</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childboxName"
                    placeholder="请输入内包装容器"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="childboxMaterial" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>内包装名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childboxMaterial"
                    placeholder="请输入内包装名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="childboxSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>内包装规格</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childboxSpec"
                    placeholder="请输入内包装规格"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="childLongnum" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>长面个数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childLongnum"
                    placeholder="请输入长面个数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="childWidenum" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>宽面个数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childWidenum"
                    placeholder="请输入宽面个数"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="childHighnum" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>高面个数</strong></span>
                </span>
                <el-input
                    v-model="queryParams.childHighnum"
                    placeholder="请输入高面个数"
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
                  :data="packagePatternList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="方式名称" align="center" prop="patternName" width="95"/>
            <el-table-column label="包装容器" align="center" prop="boxName" width="120"/>
            <el-table-column label="包材名称" align="left" prop="boxMaterial" width="120"/>
            <el-table-column label="包材规格" align="left" prop="boxSpec" width="120"/>
            <el-table-column label="外包装长" align="right" prop="boxLength" width="80"/>
            <el-table-column label="外包装宽" align="center" prop="boxWidth" width="80"/>
            <el-table-column label="外包装高" align="right" prop="boxHeight" width="80"/>
            <el-table-column label="重量单位" align="center" prop="weightUnitId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.weightUnitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="内包否" align="center" prop="enableChild" width="70">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.object_status_enable" :value="scope.row.enableChild"/>
                </template>
            </el-table-column>
            <el-table-column label="内包装容器" align="left" prop="childboxName" width="120"/>
            <el-table-column label="内包装名称" align="left" prop="childboxMaterial" width="120"/>
            <el-table-column label="内包装规格" align="left" prop="childboxSpec" width="120"/>
            <el-table-column label="长面个数" align="right" prop="childLongnum" width="70"/>
            <el-table-column label="宽面个数" align="center" prop="childWidenum" width="70"/>
            <el-table-column label="高面个数" align="right" prop="childHighnum" width="70"/>
            <el-table-column label="内装单位" align="center" prop="childUnitId"  width="70">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.childUnitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="71">
                <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-edit"
                              @click="handleUpdate(scope.row)"
                          >修改</el-button>
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
                <el-form-item  prop="patternName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>方式名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.patternName" placeholder="请输入方式名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>包装容器</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxName" placeholder="请输入包装容器" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxMaterial" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>包材名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxMaterial" placeholder="请输入包材名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>包材规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxSpec" placeholder="请输入包材规格" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxLength" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>外包装长</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxLength" placeholder="请输入外包装长" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxWidth" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>外包装宽</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxWidth" placeholder="请输入外包装宽" size="mini" />
                </el-form-item>
                <el-form-item  prop="boxHeight" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>外包装高</strong></span></span>
                     <el-input class="inputWidth" v-model="form.boxHeight" placeholder="请输入外包装高" size="mini" />
                </el-form-item>
                <el-form-item prop="weightUnitId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>重量单位</strong></span></span>
                    <el-select class="inputWidth" v-model="form.weightUnitId" placeholder="请选择重量单位"
                               @change="onWeightUnitIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkUnitList"
                          :key="index"
                          :label="fkrow.unitName"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="enableChild" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>内包否</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.enableChild" placeholder="请选择内包否" size="mini" >
                      <el-option
                          v-for="dict in dict.type.object_status_enable"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="childboxName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>内包装容器</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childboxName" placeholder="请输入内包装容器" size="mini" />
                </el-form-item>
                <el-form-item  prop="childboxMaterial" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>内包装名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childboxMaterial" placeholder="请输入内包装名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="childboxSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>内包装规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childboxSpec" placeholder="请输入内包装规格" size="mini" />
                </el-form-item>
                <el-form-item  prop="childLongnum" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>长面个数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childLongnum" placeholder="请输入长面个数" size="mini" />
                </el-form-item>
                <el-form-item  prop="childWidenum" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>宽面个数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childWidenum" placeholder="请输入宽面个数" size="mini" />
                </el-form-item>
                <el-form-item  prop="childHighnum" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>高面个数</strong></span></span>
                     <el-input class="inputWidth" v-model="form.childHighnum" placeholder="请输入高面个数" size="mini" />
                </el-form-item>
                <el-form-item prop="childUnitId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>内装单位</strong></span></span>
                    <el-select class="inputWidth" v-model="form.childUnitId" placeholder="请选择内装单位"
                               @change="onChildUnitIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkUnitList"
                          :key="index"
                          :label="fkrow.unitName"
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
import { listPackagePattern, getPackagePattern, delPackagePattern, addPackagePattern, updatePackagePattern } from "@/api/ord/packagePattern";
import { listUnit} from "@/api/bas/unit";

export default {
    name: "PackagePattern",
    dicts: ['object_status_enable'],
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
        // 包装方式预配表格数据
        packagePatternList: [],
        fkUnitList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          patternName: null,
          boxName: null,
          boxMaterial: null,
          boxSpec: null,
          boxLength: null,
          boxWidth: null,
          boxHeight: null,
          weightUnitId: null,
          enableChild: null,
          childboxName: null,
          childboxMaterial: null,
          childboxSpec: null,
          childLongnum: null,
          childWidenum: null,
          childHighnum: null,
          childUnitId: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            patternName: [
                { required: true, message: "方式名称不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
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
          /** 查询外键Unit数据 */
      getUnitList() {
        listUnit().then(res => {
          this.fkUnitList = res.rows;
        });
      },

/**主表外键WeightUnitId被选择后触发事件*/
        onWeightUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.weightUnitId = item.id
                }
            });
        },
/**主表外键ChildUnitId被选择后触发事件*/
        onChildUnitIdSelection(fkId){
            this.fkUnitList.forEach(item=>{
                if(fkId === item.id){
                    this.form.weightUnitId = item.id
                }
            });
        },

        /** 查询包装方式预配列表 */
        getList() {
            this.loading = true;
        listPackagePattern(this.queryParams).then(response => {
          this.packagePatternList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              patternName: null,
              boxName: null,
              boxMaterial: null,
              boxSpec: null,
              boxLength: null,
              boxWidth: null,
              boxHeight: null,
              weightUnitId: null,
              enableChild: null,
              childboxName: null,
              childboxMaterial: null,
              childboxSpec: null,
              childLongnum: null,
              childWidenum: null,
              childHighnum: null,
              childUnitId: null,
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
              patternName: null,
              boxName: null,
              boxMaterial: null,
              boxSpec: null,
              boxLength: null,
              boxWidth: null,
              boxHeight: null,
              weightUnitId: null,
              enableChild: null,
              childboxName: null,
              childboxMaterial: null,
              childboxSpec: null,
              childLongnum: null,
              childWidenum: null,
              childHighnum: null,
              childUnitId: null,
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
              patternName: null,
              boxName: null,
              boxMaterial: null,
              boxSpec: null,
              boxLength: null,
              boxWidth: null,
              boxHeight: null,
              weightUnitId: null,
              enableChild: null,
              childboxName: null,
              childboxMaterial: null,
              childboxSpec: null,
              childLongnum: null,
              childWidenum: null,
              childHighnum: null,
              childUnitId: null,
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
            this.captions = selection.map(item => item.patternName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增包装方式预配";
        },
        handleUpdate(row) {
            const id = row.id || this.ids
            getPackagePattern(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "修改包装方式预配";
            });
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const patternNamez = row.patternName || this.captions;
            this.$modal.confirm('确认删除方式名称为"' + patternNamez + '"的数据项？').then(function() {
              return delPackagePattern(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleExport() {
            this.download('ord/packagePattern/export', {
             ...this.queryParams
             }, `packagePattern_${new Date().getTime()}.xlsx`)
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updatePackagePattern(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addPackagePattern(this.form)
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
