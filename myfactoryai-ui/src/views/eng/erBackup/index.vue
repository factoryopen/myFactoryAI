<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item prop="billNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>采购申请号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.billNo"
                    placeholder="请输入采购申请号"
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
                        v-for="dict in dict.type.eng_status_er"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="erType" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>类型</strong></span>
                </span>
                <el-select v-model="queryParams.erType" placeholder="请选择类型" clearable size="mini" class="searchInput">
                    <el-option
                        v-for="dict in dict.type.eng_er_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="mpsId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>主计划ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.mpsId"
                    placeholder="请输入主计划ID"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="mpsNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>主计划号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.mpsNo"
                    placeholder="请输入主计划号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="mlId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>制造批ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.mlId"
                    placeholder="请输入制造批ID"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="mlNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>制造批号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.mlNo"
                    placeholder="请输入制造批号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="productId" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品ID</strong></span>
                </span>
                <el-input
                    v-model="queryParams.productId"
                    placeholder="请输入产品ID"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="productCode" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品编码</strong></span>
                </span>
                <el-input
                    v-model="queryParams.productCode"
                    placeholder="请输入产品编码"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="productName" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品名称</strong></span>
                </span>
                <el-input
                    v-model="queryParams.productName"
                    placeholder="请输入产品名称"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="productSpec" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>产品规格</strong></span>
                </span>
                <el-input
                    v-model="queryParams.productSpec"
                    placeholder="请输入产品规格"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="drawNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>图号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.drawNo"
                    placeholder="请输入图号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="customerProductNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>客户料号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.customerProductNo"
                    placeholder="请输入客户料号"
                    clearable
                    size="mini"
                    class="searchInput"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item prop="abroadProductNo" class="marginBottom5">
                <span slot="label">
                    <span class="fontSize12"><strong>进口料号</strong></span>
                </span>
                <el-input
                    v-model="queryParams.abroadProductNo"
                    placeholder="请输入进口料号"
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
                <el-button type="success" icon="el-icon-finished" size="mini" :disabled="single" @click="handleFinish">完成</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini" :disabled="multiple" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" border
                  height="650px"
                  :data="erList"
                  highlight-current-row
                  :row-class-name="rowClassName"
                  @selection-change="handleSelectionChange"
                  :cell-style="{fontSize: '12px',padding:'1px 0px'}" :header-cell-style="{height:'34px' , padding:'0px',fontSize: '12px',textAlign:'center'}">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="采购申请号" align="left" prop="billNo" width="130"/>
            <el-table-column label="状态" align="center" prop="status" width="65">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_status_er" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="类型" align="center" prop="erType" width="80">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.eng_er_type" :value="scope.row.erType"/>
                </template>
            </el-table-column>
            <el-table-column label="主计划号" align="left" prop="mpsNo" width="130"/>
            <el-table-column label="制造批号" align="left" prop="mlNo" width="130"/>
            <el-table-column label="产品编码" align="left" prop="productCode" width="150"/>
            <el-table-column label="产品名称" align="left" prop="productName" width="200"/>
            <el-table-column label="产品规格" align="left" prop="productSpec" width="180"/>
            <el-table-column label="图号" align="left" prop="drawNo" width="120"/>
            <el-table-column label="客户料号" align="left" prop="customerProductNo" width="120"/>
            <el-table-column label="进口料号" align="left" prop="abroadProductNo" width="120"/>
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width" width="336">
                <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-magic-stick"
                              @click="handleGenerateCode(scope.row)"
                          >生成料号</el-button>
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-s-fold"
                              @click="handleUpdateBom(scope.row)"
                          >维护BOM</el-button>
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-guide"
                              @click="handleUpdateRouting(scope.row)"
                          >维护路线</el-button>
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-reading"
                              @click="handleUpdateDocs(scope.row)"
                          >维护文档</el-button>
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
<!-- 创建master.opengenerateCode对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="opengenerateCode" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesgenerateCode" label-width="120px" :inline-message="true">
              <el-form-item  prop="productName" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>物料名称</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.productName" type="textarea" :row="3" placeholder="请输入物料名称" size="mini" />
              </el-form-item>
              <el-form-item prop="categoryId" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>品类</strong></span>
                </span>
                <treeselect v-model="form.categoryId"
                            class="inputWidth"
                            :options="categoryOptions"
                            :normalizer="normalizeCategory"
                            placeholder="请选择父品类"
                            @select="onCategoryIdSelection"
                            size="mini"/>
              </el-form-item>
              <el-form-item  prop="drawNo" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>图号</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.drawNo" type="textarea" :row="3" placeholder="请输入图号"  @change="onDrawNoChanged" size="mini"/>
              </el-form-item>
              <el-form-item  prop="productCode" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>物料编码</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.productCode" placeholder="请输入物料编码" size="mini" disabled="true"/>
              </el-form-item>
              <el-form-item  prop="productSpec" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>规格型号</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.productSpec" type="textarea" :row="3" placeholder="请输入规格型号" size="mini" />
              </el-form-item>
              <el-form-item  prop="customerProductNo" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>客户料号</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请输入客户料号" size="mini" />
              </el-form-item>
              <el-form-item  prop="abroadProductNo" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>进口图料号</strong></span>
                </span>
                <el-input class="inputWidth" v-model="form.abroadProductNo" placeholder="请输入进口料号" size="mini" />
              </el-form-item>
              <el-form-item prop="compoundId" class="marginBottom0">
                <span slot="label">
                    <span class="fontSize12"><strong>材质</strong></span>
                </span>
                <treeselect v-model="form.compoundId" class="inputWidth" :options="compoundOptions" :normalizer="normalizeCompound" placeholder="请选择材质" ize="mini"/>
              </el-form-item>
              <el-form-item prop="unitId" class="marginBottom0" >
                <span slot="label">
                    <span class="fontSize12"><strong>单位</strong></span>
                </span>
                <el-select class="inputWidth" v-model="form.unitId" placeholder="请选择单位"
                           @change="onUnitIdSelection"  size="mini" >
                  <el-option
                    v-for="(fkrow, index) in fkUnitList"
                    :key="index"
                    :label="fkrow.unitName"
                    :value="fkrow.id"
                    size="mini"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitgenerateCode">确 定</el-button>
                <el-button @click="cancelgenerateCode">取 消</el-button>
            </div>
        </el-dialog>
<!-- 创建master.openupdateBom对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openupdateBom" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesupdateBom" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>采购申请号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购申请号" size="mini" />
                </el-form-item>
                <el-form-item  prop="status" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>状态</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.status" placeholder="请选择状态" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_status_er"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="erType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.erType" placeholder="请选择类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_er_type"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="mpsId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsId" placeholder="请输入主计划ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mpsNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsNo" placeholder="请输入主计划号" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlId" placeholder="请输入制造批ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlNo" placeholder="请输入制造批号" size="mini" />
                </el-form-item>
                <el-form-item  prop="productId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productId" placeholder="请输入产品ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="productCode" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productCode" placeholder="请输入产品编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="productName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productName" placeholder="请输入产品名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="productSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productSpec" placeholder="请输入产品规格" size="mini" />
                </el-form-item>
                <el-form-item  prop="drawNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>图号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.drawNo" placeholder="请输入图号" size="mini" />
                </el-form-item>
                <el-form-item  prop="customerProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请输入客户料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="abroadProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>进口料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.abroadProductNo" placeholder="请输入进口料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
                     <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitupdateBom">确 定</el-button>
                <el-button @click="cancelupdateBom">取 消</el-button>
            </div>
        </el-dialog>
<!-- 创建master.openupdateRouting对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openupdateRouting" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesupdateRouting" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>采购申请号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购申请号" size="mini" />
                </el-form-item>
                <el-form-item  prop="status" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>状态</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.status" placeholder="请选择状态" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_status_er"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="erType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.erType" placeholder="请选择类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_er_type"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="mpsId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsId" placeholder="请输入主计划ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mpsNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsNo" placeholder="请输入主计划号" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlId" placeholder="请输入制造批ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlNo" placeholder="请输入制造批号" size="mini" />
                </el-form-item>
                <el-form-item  prop="productId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productId" placeholder="请输入产品ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="productCode" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productCode" placeholder="请输入产品编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="productName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productName" placeholder="请输入产品名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="productSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productSpec" placeholder="请输入产品规格" size="mini" />
                </el-form-item>
                <el-form-item  prop="drawNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>图号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.drawNo" placeholder="请输入图号" size="mini" />
                </el-form-item>
                <el-form-item  prop="customerProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请输入客户料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="abroadProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>进口料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.abroadProductNo" placeholder="请输入进口料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
                     <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitupdateRouting">确 定</el-button>
                <el-button @click="cancelupdateRouting">取 消</el-button>
            </div>
        </el-dialog>
<!-- 创建master.openupdateDocs对话框 -->
        <el-dialog :title="title" class="dialogConfig" :visible.sync="openupdateDocs" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rulesupdateDocs" label-width="120px" :inline-message="true">
                <el-form-item  prop="billNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>采购申请号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.billNo" placeholder="请输入采购申请号" size="mini" />
                </el-form-item>
                <el-form-item  prop="status" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>状态</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.status" placeholder="请选择状态" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_status_er"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="erType" class="marginBottom0">
                    <span slot="label">
                        <span class="fontSize12"><strong>类型</strong></span>
                    </span>
                    <el-select class="inputWidth" v-model="form.erType" placeholder="请选择类型" size="mini" >
                      <el-option
                          v-for="dict in dict.type.eng_er_type"
                          :key="dict.value"
                          :label="dict.label"
                          size="mini"
                          :value="parseInt(dict.value)"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="mpsId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsId" placeholder="请输入主计划ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mpsNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>主计划号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mpsNo" placeholder="请输入主计划号" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlId" placeholder="请输入制造批ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="mlNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>制造批号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.mlNo" placeholder="请输入制造批号" size="mini" />
                </el-form-item>
                <el-form-item  prop="productId" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品ID</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productId" placeholder="请输入产品ID" size="mini" />
                </el-form-item>
                <el-form-item  prop="productCode" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品编码</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productCode" placeholder="请输入产品编码" size="mini" />
                </el-form-item>
                <el-form-item  prop="productName" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品名称</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productName" placeholder="请输入产品名称" size="mini" />
                </el-form-item>
                <el-form-item  prop="productSpec" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>产品规格</strong></span></span>
                     <el-input class="inputWidth" v-model="form.productSpec" placeholder="请输入产品规格" size="mini" />
                </el-form-item>
                <el-form-item  prop="drawNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>图号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.drawNo" placeholder="请输入图号" size="mini" />
                </el-form-item>
                <el-form-item  prop="customerProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>客户料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.customerProductNo" placeholder="请输入客户料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="abroadProductNo" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>进口料号</strong></span></span>
                     <el-input class="inputWidth" v-model="form.abroadProductNo" placeholder="请输入进口料号" size="mini" />
                </el-form-item>
                <el-form-item  prop="remark" class="marginBottom0">
                    <span slot="label"><span class="fontSize12"><strong>备注</strong></span></span>
                     <el-input class="inputWidth" v-model="form.remark" placeholder="请输入备注" size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitupdateDocs">确 定</el-button>
                <el-button @click="cancelupdateDocs">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getNextBillno, updateBillSeq } from "@/api/eng/er";
import { listEr, getEr, delEr, addEr, updateEr } from "@/api/eng/er";
import { finish,generateCode,updateBom,updateRouting,updateDocs } from "@/api/eng/er";
import {listProductCategory} from "@/api/eng/category";
import {listCompound} from "@/api/eng/compound";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    name: "Er",
    dicts: ['eng_status_er', 'eng_er_type'],
    components: {Treeselect},
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
        // 物料分类管理树选项
        categoryOptions: [],
        // 材质管理树选项
        compoundOptions: [],
        // 工艺处理请求表格数据
        erList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          billNo: null,
          status: null,
          erType: null,
          mpsId: null,
          mpsNo: null,
          mlId: null,
          mlNo: null,
          productId: null,
          productCode: null,
          productName: null,
          productSpec: null,
          drawNo: null,
          customerProductNo: null,
          abroadProductNo: null,
        },
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          productCode: [
            { required: true, message: "产品编码不能为空", trigger: "blur" }
          ],
          productName: [
            { required: true, message: "产品名称不能为空", trigger: "blur" }
          ],
          unitId: [
            { required: true, message: "单位不能为空", trigger: "blur" }
          ],
          categoryId: [
            { required: true, message: "品类不能为空", trigger: "blur" }
          ],
          drawNo: [
            { required: true, message: "图号不能为空", trigger: "blur" }
          ],
        },
      opengenerateCode: false,
      rulesgenerateCode: {
                    billNo: [
                { required: true, message: "采购申请号不能为空", trigger: "blur" }
              ],
                    status: [
                { required: true, message: "状态不能为空", trigger: "change" }
              ],
                    erType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
                    mpsId: [
                { required: true, message: "主计划ID不能为空", trigger: "blur" }
              ],
                    mpsNo: [
                { required: true, message: "主计划号不能为空", trigger: "blur" }
              ],
                    productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
              ],
                    productCode: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
                    productName: [
                { required: true, message: "产品名称不能为空", trigger: "blur" }
              ],
      },
      openupdateBom: false,
      rulesupdateBom: {
                    billNo: [
                { required: true, message: "采购申请号不能为空", trigger: "blur" }
              ],
                    status: [
                { required: true, message: "状态不能为空", trigger: "change" }
              ],
                    erType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
                    mpsId: [
                { required: true, message: "主计划ID不能为空", trigger: "blur" }
              ],
                    mpsNo: [
                { required: true, message: "主计划号不能为空", trigger: "blur" }
              ],
                    productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
              ],
                    productCode: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
                    productName: [
                { required: true, message: "产品名称不能为空", trigger: "blur" }
              ],
      },
      openupdateRouting: false,
      rulesupdateRouting: {
                    billNo: [
                { required: true, message: "采购申请号不能为空", trigger: "blur" }
              ],
                    status: [
                { required: true, message: "状态不能为空", trigger: "change" }
              ],
                    erType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
                    mpsId: [
                { required: true, message: "主计划ID不能为空", trigger: "blur" }
              ],
                    mpsNo: [
                { required: true, message: "主计划号不能为空", trigger: "blur" }
              ],
                    productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
              ],
                    productCode: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
                    productName: [
                { required: true, message: "产品名称不能为空", trigger: "blur" }
              ],
      },
      openupdateDocs: false,
      rulesupdateDocs: {
                    billNo: [
                { required: true, message: "采购申请号不能为空", trigger: "blur" }
              ],
                    status: [
                { required: true, message: "状态不能为空", trigger: "change" }
              ],
                    erType: [
                { required: true, message: "类型不能为空", trigger: "change" }
              ],
                    mpsId: [
                { required: true, message: "主计划ID不能为空", trigger: "blur" }
              ],
                    mpsNo: [
                { required: true, message: "主计划号不能为空", trigger: "blur" }
              ],
                    productId: [
                { required: true, message: "产品ID不能为空", trigger: "blur" }
              ],
                    productCode: [
                { required: true, message: "产品编码不能为空", trigger: "blur" }
              ],
                    productName: [
                { required: true, message: "产品名称不能为空", trigger: "blur" }
              ],
      },
      };
    },
    created() {
      this.getList();
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
      /** 查询工艺处理请求列表 */
      getList() {
        this.loading = true;
        listEr(this.queryParams).then(response => {
          this.erList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

      resetgenerateCode (){
          this.form = {
            id: null,
            productId: null,
            productName: null,
            categoryId:null,
            drawNo: null,
            productCode: null,
            productSpec: null,
            customerProductNo: null,
            abroadProductNo: null,
            compoundId:null,
            unitId:null,
          };
          this.resetForm("form");
      },
      resetupdateBom (){
          this.form = {
            id: null,
            billNo: null,
            status: null,
            erType: null,
            mpsId: null,
            mpsNo: null,
            mlId: null,
            mlNo: null,
            productId: null,
            productCode: null,
            productName: null,
            productSpec: null,
            drawNo: null,
            customerProductNo: null,
            abroadProductNo: null,
            remark: null,
            createBy: null,
            createTime: null,
            updateBy: null,
            updateTime: null
          };
          this.resetForm("form");
      },
      resetupdateRouting (){
          this.form = {
            id: null,
            billNo: null,
            status: null,
            erType: null,
            mpsId: null,
            mpsNo: null,
            mlId: null,
            mlNo: null,
            productId: null,
            productCode: null,
            productName: null,
            productSpec: null,
            drawNo: null,
            customerProductNo: null,
            abroadProductNo: null,
            remark: null,
            createBy: null,
            createTime: null,
            updateBy: null,
            updateTime: null
          };
          this.resetForm("form");
      },
      resetupdateDocs (){
          this.form = {
            id: null,
            billNo: null,
            status: null,
            erType: null,
            mpsId: null,
            mpsNo: null,
            mlId: null,
            mlNo: null,
            productId: null,
            productCode: null,
            productName: null,
            productSpec: null,
            drawNo: null,
            customerProductNo: null,
            abroadProductNo: null,
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
      /** 转换物料分类和材质管理数据结构 */
      normalizeCategory(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.categoryNo+" ["+node.categoryName+"]",
          children: node.children
        };
      },
      /** 转换物料分类和材质管理数据结构 */
      normalizeCompound(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.compoundNo+" ["+node.compoundDesc+"]",
          children: node.children,
        };
      },
      /** 查询物料分类和材质管理下拉树结构 */
      getTreeselect() {
        listProductCategory().then(response => {
          this.categoryOptions = [];
          const data = { id: 0, categoryNo:'', categoryName: '顶级节点', children: [] };
          data.children = this.handleTree(response.rows, "id", "parentId");
          this.categoryOptions.push(data);
        });
        listCompound().then(response => {
          this.compoundOptions = [];
          const data = { id: 0, compoundNo:'', compoundDesc: '顶级节点', children: [] };
          data.children = this.handleTree(response.rows, "id", "parentId");
          this.compoundOptions.push(data);
        });
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
          this.ids = selection.map(item => item.id)
          this.captions = selection.map(item => item.billNo)
          this.single = selection.length!==1
          this.multiple = !selection.length
      },
      handleFinish(row) {
        const ids = row.id || this.ids;
        const billNoz = row.billNo || this.captions;

        this.$modal.confirm('确定完成 采购申请号为"' + billNoz + '"的数据项吗？').then(function() {
          return finish(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("完成成功");
        }).catch(() => {});
      },
      handleExport() {
          this.download('eng/er/export', {
           ...this.queryParams
           }, `er_${new Date().getTime()}.xlsx`)
      },
      handleGenerateCode(row) {
          const id = row.id || this.ids
          getEr(id).then(response => {
            this.form = response.data;
            //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
            this.opengenerateCode = true;
            this.title = "生成料号";
          });
          this.getTreeselect();
      },
      handleUpdateBom(row) {
          const id = row.id || this.ids
          getEr(id).then(response => {
            this.form = response.data;
            //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
            this.openupdateBom = true;
            this.title = "维护BOM";
          });
      },
      handleUpdateRouting(row) {
          const id = row.id || this.ids
          getEr(id).then(response => {
            this.form = response.data;
            //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
            this.openupdateRouting = true;
            this.title = "维护路线";
          });
      },
      handleUpdateDocs(row) {
          const id = row.id || this.ids
          getEr(id).then(response => {
            this.form = response.data;
            //this.$set(this.form, "quantityAssigning", this.form.quantityAvailable);
            this.openupdateDocs = true;
            this.title = "维护文档";
          });
      },
      /**主表外键CategoryId被选择后触发事件*/
      onCategoryIdSelection(node, instanceId){
        this.categoryNo = node.categoryNo;
        this.drawNo = this.form.drawNo;

        this.form.productCode ="";
        if (this.categoryNo!=null) this.form.productCode=this.categoryNo;
        if (this.drawNo!=null) this.form.productCode += "-"+this.drawNo;
        this.form.productCode += "-01";
      },
      /**主表外键CategoryId被选择后触发事件*/
      onDrawNoChanged(){
        this.drawNo = this.form.drawNo;
        this.form.productCode ="";
        if (this.categoryNo!=null) this.form.productCode=this.categoryNo;
        if (this.drawNo!=null) this.form.productCode += "-"+this.drawNo;
        this.form.productCode += "-01";
      },
      submitgenerateCode() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
                this.form.params = {"categoryId":this.form.categoryId,"compoundId":this.form.compoundId,"unitId":this.form.unitId};
                //TODO 上述两行代码须替代或删除

                generateCode(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.opengenerateCode = false;
                  this.getMasterList();
                });
            }
          }
        });
      },
      // 取消按钮
      cancelgenerateCode() {
        this.opengenerateCode = false;
        this.resetgenerateCode();
      },
      submitupdateBom() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
                this.form.params = {"id":this.form.id};
                //TODO 上述两行代码须替代或删除

                updateBom(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openupdateBom = false;
                  this.getMasterList();
                });
            }
          }
        });
      },
      // 取消按钮
      cancelupdateBom() {
        this.openupdateBom = false;
        this.resetupdateBom();
      },
      submitupdateRouting() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
                this.form.params = {"id":this.form.id};
                //TODO 上述两行代码须替代或删除

                updateRouting(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openupdateRouting = false;
                  this.getMasterList();
                });
            }
          }
        });
      },
      // 取消按钮
      cancelupdateRouting() {
        this.openupdateRouting = false;
        this.resetupdateRouting();
      },
      submitupdateDocs() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.form.id==this.form.id){
                this.form.params = {"id":this.form.id};
                //TODO 上述两行代码须替代或删除

                updateDocs(this.form)
                .then(response => {
                  this.$modal.msgSuccess(response.msg);
                  this.openupdateDocs = false;
                  this.getMasterList();
                });
            }
          }
        });
      },
      // 取消按钮
      cancelupdateDocs() {
        this.openupdateDocs = false;
        this.resetupdateDocs();
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
