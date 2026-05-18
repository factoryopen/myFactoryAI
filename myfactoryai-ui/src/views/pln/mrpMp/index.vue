<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="status" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>状态</strong></span>
                </span>
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.bill_status_finishable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="mpsId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>主计划</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.mpsId" placeholder="请选择主计划" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkPlnMpsList"
                    :key="index"
                    :label="fkrow.billNo"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialId" placeholder="请选择物料" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.id"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialCode" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料编码</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialCode" placeholder="请选择物料编码" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialCode"
                    :value="fkrow.materialCode"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialName" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialName" placeholder="请选择物料名称" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialName"
                    :value="fkrow.materialName"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialSpec" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.materialSpec" placeholder="请选择物料规格" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialInfoList"
                    :key="index"
                    :label="fkrow.materialSpec"
                    :value="fkrow.materialSpec"
                    size="mini"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="materialSize" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>物料尺寸</strong></span>
                </span>
                <el-input
                    v-model="queryParams.materialSize"
                    placeholder="请输入物料尺寸"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="unitId" class="marginBottom5" >
                    <span slot="label">
                        <span class="fontSize12"><strong>单位</strong></span>
                    </span>
              <el-select class="inputWidth" v-model="queryParams.unitId" placeholder="请选择单位" size="mini">
                <el-option
                    v-for="(fkrow, index) in fkMaterialList"
                    :key="index"
                    :label="fkrow.unitId"
                    :value="fkrow.unitId"
                    size="mini"
                ></el-option>
              </el-select>
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
            <el-form-item prop="consumeType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>消耗类型</strong></span>
                </span>
                <el-select v-model="queryParams.consumeType" placeholder="请选择消耗类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_material_consumingtype"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="enableMust" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>必配料</strong></span>
                </span>
                <el-select v-model="queryParams.enableMust" placeholder="请选择必配料" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="enableReplace" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>可替代</strong></span>
                </span>
                <el-select v-model="queryParams.enableReplace" placeholder="请选择可替代" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item class="marginBottom5">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" icon="el-icon-plus" size="mini"
                    @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-paperclip" size="mini" :disabled="multiple"  @click="handleEnable"
                >启用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-shopping-cart-full" size="mini" :disabled="multiple"  @click="handleRequestPurchase"
                >请购</el-button>
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
                  :data="mrpMpList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.bill_status_finishable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="主计划" align="left" prop="mpsId"  width="125">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkPlnMpsList">
                        <span v-if="item.id==scope.row.mpsId"
                            :key="index"
                            size="mini">{{item.billNo}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="物料编码" align="left" prop="materialCode" width="180"/>
            <el-table-column label="物料名称" align="left" prop="materialName" width="180"/>
            <el-table-column label="物料规格" align="left" prop="materialSpec" width="120"/>
            <el-table-column label="物料尺寸" align="center" prop="materialSize" width="120"/>
            <el-table-column label="单位" align="center" prop="unitId"  width="60">
                <template  slot-scope="scope">
                    <template v-for="(item,index) in fkUnitList">
                        <span v-if="item.id==scope.row.unitId"
                            :key="index"
                            size="mini">{{item.unitName}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="需求量" align="right" prop="quantity" width="70"/>
            <el-table-column label="库存量" align="right" prop="quantityWhgood" width="70"/>
            <el-table-column label="库约量" align="right" prop="quantityWhbooked" width="70"/>
          <el-table-column label="库可用量" align="right" prop="quantityWhavailable" width="70"/>
<!--            <el-table-column label="消耗类型" align="center" prop="consumeType" width="90">-->
<!--                <template slot-scope="scope">-->
<!--                    <dict-tag :options="dict.type.eng_material_consumingtype" :value="scope.row.consumeType"/>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="必配料" align="center" prop="enableMust" width="110">-->
<!--                <template slot-scope="scope">-->
<!--                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableMust"/>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="可替代" align="center" prop="enableReplace" width="110">-->
<!--                <template slot-scope="scope">-->
<!--                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableReplace"/>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="126">
                <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-edit"
                              @click="handleEdit(scope.row)"
                          >编辑</el-button>
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
<!--                <el-form-item  prop="status" class="marginBottom0">-->
<!--                    <span slot="label">-->
<!--                        <span class="fontSize12"><strong>状态</strong></span>-->
<!--                    </span>-->
<!--                    <el-select class="inputWidth" v-model="form.status" placeholder="请选择状态" size="mini" >-->
<!--                      <el-option-->
<!--                          v-for="dict in dict.type.bill_status_finishable"-->
<!--                          :key="dict.value"-->
<!--                          :label="dict.label"-->
<!--                          size="mini"-->
<!--                          :value="parseInt(dict.value)"-->
<!--                      ></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item prop="mpsId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>主计划</strong></span></span>
                    <el-select class="inputWidth" v-model="form.mpsId" placeholder="请选择主计划"
                               @change="onMpsIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkPlnMpsList"
                          :key="index"
                          :label="fkrow.billNo"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="materialId" class="marginBottom0" >
                    <span slot="label"><span class="fontSize12"><strong>物料编码</strong></span></span>
                    <el-select class="inputWidth" v-model="form.materialId" placeholder="请选择物料"
                               @change="onMaterialIdSelection"  size="mini" >
                      <el-option
                          v-for="(fkrow, index) in fkMaterialList"
                          :key="index"
                          :label="fkrow.materialCode"
                          :value="fkrow.id"
                          size="mini"
                      ></el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item prop="materialCode" class="marginBottom0" >-->
<!--                    <span slot="label">-->
<!--                        <span class="fontSize12"><strong>物料编码</strong></span>-->
<!--                    </span>-->
<!--                  <el-select class="inputWidth" v-model="form.materialCode" placeholder="请选择物料编码" size="mini" disabled="true">-->
<!--                    <el-option-->
<!--                        v-for="(fkrow, index) in fkMaterialInfoList"-->
<!--                        :key="index"-->
<!--                        :label="fkrow.materialCode"-->
<!--                        :value="fkrow.materialCode"-->
<!--                        size="mini"-->
<!--                    ></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
                <el-form-item prop="materialName" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料名称</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialName" placeholder="请选择物料名称" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMaterialInfoList"
                        :key="index"
                        :label="fkrow.materialName"
                        :value="fkrow.materialName"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="materialSpec" class="marginBottom0" >
                    <span slot="label">
                        <span class="fontSize12"><strong>物料规格</strong></span>
                    </span>
                  <el-select class="inputWidth" v-model="form.materialSpec" placeholder="请选择物料规格" size="mini" disabled="true">
                    <el-option
                        v-for="(fkrow, index) in fkMaterialInfoList"
                        :key="index"
                        :label="fkrow.materialSpec"
                        :value="fkrow.materialSpec"
                        size="mini"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="materialSize" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>物料尺寸</strong></span></span>
                     <el-input class="inputWidth" v-model="form.materialSize" placeholder="请输入物料尺寸" size="mini" />
                </el-form-item>
                <el-form-item prop="unitId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>单位</strong></span></span>
                    <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位" size="mini" >
                        <el-option
                            v-for="(fkrow, index) in fkUnitList"
                            :key="index"
                            :label="fkrow.unitName"
                            :value="fkrow.id"
                            size="mini"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="quantity" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>数量</strong></span></span>
                     <el-input class="inputWidth" v-model="form.quantity" placeholder="请输入数量" size="mini" />
                </el-form-item>
                <el-form-item  prop="consumeType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>消耗类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.consumeType" placeholder="请选择消耗类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_material_consumingtype"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="enableMust" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>必配料</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.enableMust" placeholder="请选择必配料" size="mini" >
                      <el-option
                          v-for="dict in dict.type.sys_yes_no"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="enableReplace" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>可替代</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.enableReplace" placeholder="请选择可替代" size="mini" >
                      <el-option
                          v-for="dict in dict.type.sys_yes_no"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="dict.value"
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
import { listMrpMp, getMrpMp, delMrpMp, addMrpMp, updateMrpMp } from "@/api/pln/mrpMp";
import { enable,requestPurchase } from "@/api/pln/mrpMp";
import { listUnit} from "@/api/bas/unit";
import { listMaterial} from "@/api/eng/material";
import { listPlnMps} from "@/api/del/plnMps";
import { listMaterialInfo} from "@/api/eng/materialInfo";

export default {
    name: "MrpMp",
    dicts: ['bill_status_finishable', 'eng_material_consumingtype', 'sys_yes_no'],
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
        // 物料需求表格数据
        mrpMpList: [],
        fkUnitList: [],
        fkMaterialList: [],
        fkPlnMpsList: [],
        fkMaterialInfoList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          status: 0,
          mpsId: null,
          materialId: null,
          materialCode: null,
          materialName: null,
          materialSpec: null,
          materialSize: null,
          unitId: null,
          quantity: null,
          consumeType: null,
          enableMust: null,
          enableReplace: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            materialId: [
                { required: true, message: "物料ID不能为空", trigger: "blur" }
            ],
            unitId: [
                { required: true, message: "单位不能为空", trigger: "blur" }
            ],
            quantity: [
                { required: true, message: "数量不能为空", trigger: "blur" }
            ],
        },
      };
    },
    created() {
      this.getList();
          /** 查询外键Unit数据 */
          this.getUnitList();
          /** 查询外键Material数据 */
          this.getMaterialList();
          /** 查询外键PlnMps数据 */
          this.getPlnMpsList();
          /** 查询外键MaterialInfo数据 */
          this.getMaterialInfoList();
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
          /** 查询外键Material数据 */
      getMaterialList() {
        listMaterial().then(res => {
          this.fkMaterialList = res.rows;
        });
      },
          /** 查询外键PlnMps数据 */
      getPlnMpsList() {
        listPlnMps().then(res => {
          this.fkPlnMpsList = res.rows;
        });
      },
          /** 查询外键MaterialInfo数据 */
      getMaterialInfoList() {
        listMaterialInfo().then(res => {
          this.fkMaterialInfoList = res.rows;
        });
      },

/**主表外键MpsId被选择后触发事件*/
        onMpsIdSelection(fkId){
            this.fkPlnMpsList.forEach(item=>{
                if(fkId === item.id){
                    this.form.mpsId = item.id
                }
            });
        },
/**主表外键MaterialId被选择后触发事件*/
        onMaterialIdSelection(fkId){
            this.fkMaterialList.forEach(item=>{
                if(fkId === item.id){
                    this.form.materialId = item.id;
                    this.form.materialName = item.materialName;
                    this.form.materialSpec = item.materialSpec;
                    this.form.unitId = item.unitId;
                }
            });
        },
/**主表外键UnitId被选择后触发事件*/
        onUnitIdSelection(fkId){
            this.fkMaterialList.forEach(item=>{
                if(fkId === item.id){
                    this.form.materialId = item.id
                }
            });
        },

        /** 查询物料需求列表 */
        getList() {
            this.loading = true;
        listMrpMp(this.queryParams).then(response => {
          this.mrpMpList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

        reset (){
            this.form = {
              id: null,
              status: 0,
              mpsId: null,
              materialId: null,
              materialCode: null,
              materialName: null,
              materialSpec: null,
              materialSize: null,
              unitId: null,
              quantity: null,
              consumeType: null,
              enableMust: null,
              enableReplace: null,
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
            this.captions = selection.map(item => item.materialName)
            this.single = selection.length!==1
            this.multiple = !selection.length
        },

        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增";
        },
        handleDelete(row) {
            const ids = row.id || this.ids;
            const materialNamez = row.materialName || this.captions;
            this.$modal.confirm('确认删除物料名称为"' + materialNamez + '"的数据项？').then(function() {
              return delMrpMp(ids);
            }).then(() => {
              this.getList();
              this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        handleEnable(row) {
          const ids = row.id || this.ids;
          const materialNamez = row.materialName || this.captions;

          this.$modal.confirm('确定启用 物料名称为"' + materialNamez + '"的数据项吗？').then(function() {
            return enable(ids);
          }).then(() => {
            this.getList();
            this.$modal.msgSuccess("启用成功");
          });
        },
        handleRequestPurchase(row) {
            const ids = row.id || this.ids;
            const materialNamez = row.materialName || this.captions;

            this.$modal.confirm('确定请购 物料名称为"' + materialNamez + '"的数据项吗？').then(function() {
                 return requestPurchase(ids);
            }).then(response => {
                this.getList();
                this.$modal.msgSuccess(response.msg);
            });
        },
        handleExport() {
            this.download('pln/mrpMp/export', {
             ...this.queryParams
             }, `mrpMp_${new Date().getTime()}.xlsx`)
        },
        handleEdit(row) {
            const id = row.id || this.ids
            getMrpMp(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "编辑";
            });
        },

      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
              this.form.params = {"id":this.form.id};
              //TODO 上述两行代码须替代或删除

                if (this.form.id != null) {
                  updateMrpMp(this.form)
                  .then(response => {
                    this.$modal.msgSuccess(response.msg);
                    this.open = false;
                    this.getList();
                  })
                  .catch(error => {
                    this.$modal.msgError(error.msg);
                  });
                } else {
                  addMrpMp(this.form)
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
