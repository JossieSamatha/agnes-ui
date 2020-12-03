<template>
  <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
           :rules="detailFormRules" label-width="150px" style="width: 90%">
    <div class="line">
      <el-form-item label="产品名称" prop="productName">
        <gf-input v-model.trim="detailForm.productName" placeholder="产品名称"/>
      </el-form-item>
      <el-form-item label="产品简称" prop="productShortName">
        <gf-input v-model.trim="detailForm.productShortName" placeholder="产品简称"/>
      </el-form-item>
    </div>
    <div class="line">
      <el-form-item label="产品代码" prop="productCode">
        <gf-input v-model.trim="detailForm.productCode" placeholder="产品代码"/>
      </el-form-item>
      <el-form-item label="产品种类" prop="productClass">
        <gf-dict filterable clearable v-model="detailForm.productClass" dict-type="AGNES_PRODUCT_CLASS"/>
      </el-form-item>
    </div>
    <div class="line">
      <el-form-item label="产品类型" prop="productType">
        <gf-dict filterable clearable v-model="detailForm.productType" dict-type="AGNES_PRODUCT_TYPE"/>
      </el-form-item>
      <el-form-item label="产品阶段" prop="productStage">
        <gf-dict filterable clearable v-model="detailForm.productStage" dict-type="AGNES_PRODUCT_STAGE"/>
      </el-form-item>
    </div>
    <div class="line" style="width: 100%">
      <el-form-item label="当前状态" prop="productStatus">
        <gf-dict filterable clearable v-model="detailForm.productCurStatus" dict-type="AGNES_PRODUCT_STATUS"/>
      </el-form-item>
      <el-form-item label="成立日期" prop="startDate" style="width: 100%">
        <el-date-picker
            v-model="detailForm.startDate"
            style="width: 100%;"
            type="date"
        >
        </el-date-picker>
      </el-form-item>
    </div>
    <div class="line">
      <el-form-item label="基金托管人" prop="productCustodian">
        <gf-input v-model.trim="detailForm.productCustodian" placeholder="基金托管人"/>
      </el-form-item>
      <el-form-item label="基金托管人(境外)" prop="productCustodianOverseas">
        <gf-input v-model.trim="detailForm.productCustodianOverseas" placeholder="基金托管人(境外)"/>
      </el-form-item>
    </div>
    <div class="line">
      <el-form-item label="基金注册登记机构" prop="productRegistrationOrg">
        <gf-input v-model.trim="detailForm.productRegistrationOrg" placeholder="基金注册登记机构"/>
      </el-form-item>
      <el-form-item label="基金律师事务所" prop="productLawFirm">
        <gf-input v-model.trim="detailForm.productLawFirm" placeholder="基金律师事务所"/>
      </el-form-item>
    </div>
    <div class="line">
      <el-form-item label="基金会计事务所" prop="productAccountFirm">
        <gf-input v-model.trim="detailForm.productAccountFirm" placeholder="基金会计事务所"/>
      </el-form-item>
      <el-form-item label="申赎交易确认天数" prop="redemptionTransConfirmDays">
        <gf-input type='number' v-model.trim="detailForm.redemptionTransConfirmDays" placeholder="申赎交易确认天数"/>
      </el-form-item>
    </div>
    <el-form-item label="赎回清算天数" prop="redemptionSettlementDays" style="width: 50%">
      <gf-input type='number' v-model.trim="detailForm.redemptionSettlementDays" placeholder="赎回清算天数"/>
    </el-form-item>
    <el-form-item label="专用参数" prop="redemptionSettlementDays">
      <div class="rule-table">
        <el-tabs>
          <el-tab-pane label="FA专用">
            <el-table
                :data="this.detailForm.fAPrdtRuInfoParamRefVo"
                border stripe
                style="width: 100%"
                header-row-class-name="rule-header-row"
                header-cell-class-name="rule-header-cell"
                row-class-name="rule-row"
                cell-class-name="rule-cell">
              <!--              <el-table-column prop="paramBizType" label="业务归属" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <gf-dict v-model="scope.row.paramBizType" dict-type="AGNES_PRODUCT_PARAM_BIZTYPE" disabled></gf-dict>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column prop="paramName" label="参数名称" min-width="100">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.paramName" filterable placeholder="请选择" @change="faChanges(scope.row)">
                    <el-option
                        v-for="item in faProductParams"
                        :key="item.productParamId"
                        :label="item.paramName"
                        :value="item.paramName"
                    >
                    </el-option>
                  </el-select>
                </template>

              </el-table-column>
              <!--              <el-table-column prop="paramCode" label="参数代码" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-input v-model="scope.row.paramCode" disabled></el-input>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <!--              <el-table-column prop="paramType" label="参数类型" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <gf-dict v-model="scope.row.paramType" dict-type="AGNES_PRODUCT_PARAM_TYPE" disabled/>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <!--              <el-table-column prop="paramValue" label="参数值" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-input v-model="scope.row.paramValue" v-if="scope.row.paramType !== 'boolean'" disabled/>-->
              <!--                  <gf-dict v-model="scope.row.paramValue" v-if="scope.row.paramType === 'boolean'"-->
              <!--                           dict-type="AGNES_PRODUCT_BOOLEAN" />-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column prop="paramValue" label="参数值" min-width="100">
                <template slot-scope="scope">
                  <el-input type="number" :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                            v-model="scope.row.paramValue" v-if="scope.row.paramType === 'number'"/>
                  <el-input :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                            v-model="scope.row.paramValue" v-if="scope.row.paramType === 'str'"/>
                  <gf-dict-select :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                                  dict-type="AGNES_PRODUCT_BOOLEAN" v-model="scope.row.paramValue"
                                  v-if="scope.row.paramType === 'boolean'"/>
                  <el-date-picker
                      v-if="scope.row.paramType==='date'"
                      v-model="scope.row.paramValue"
                      :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="effectiveDate" label="生效时间" min-width="100">
                <template slot-scope="scope">
                  <el-date-picker
                      v-model="scope.row.effectiveDate"
                      :style="!scope.row.effectiveDate ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="failureDate" label="失效时间" min-width="100">
                <template slot-scope="scope">
                  <el-date-picker
                      v-model="scope.row.failureDate"
                      :style="!scope.row.failureDate ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="option" label="操作" width="60" align="center">
                <template slot-scope="scope">
                  <span class="option-span" @click="deleteFA(scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="addFA()" class="rule-add-btn" size="small">新增</el-button>
          </el-tab-pane>
          <el-tab-pane label="TA专用">
            <el-table
                :data="this.detailForm.tAPrdtRuInfoParamRefVo"
                border stripe
                style="width: 100%"
                header-row-class-name="rule-header-row"
                header-cell-class-name="rule-header-cell"
                row-class-name="rule-row"
                cell-class-name="rule-cell">
              <!--              <el-table-column prop="paramBizType" label="业务归属" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <gf-dict v-model="scope.row.paramBizType" dict-type="AGNES_PRODUCT_PARAM_BIZTYPE" disabled></gf-dict>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column prop="paramName" label="参数名称" min-width="100">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.paramName" filterable placeholder="请选择" @change="taChanges(scope.row)">
                    <el-option
                        v-for="item in taProductParams"
                        :key="item.productParamId"
                        :label="item.paramName"
                        :value="item.paramName"
                    >
                    </el-option>
                  </el-select>
                </template>

              </el-table-column>
              <!--              <el-table-column prop="paramCode" label="参数代码" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-input v-model="scope.row.paramCode" disabled></el-input>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <!--              <el-table-column prop="paramType" label="参数类型" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <gf-dict v-model="scope.row.paramType" dict-type="AGNES_PRODUCT_PARAM_TYPE" disabled/>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <!--              <el-table-column prop="paramValue" label="参数值" min-width="100">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-input v-model="scope.row.paramValue" v-if="scope.row.paramType !== 'boolean'" disabled/>-->
              <!--                  <gf-dict v-model="scope.row.paramValue" v-if="scope.row.paramType === 'boolean'"-->
              <!--                           dict-type="AGNES_PRODUCT_BOOLEAN" />-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column prop="paramValue" label="参数值" min-width="100">
                <template slot-scope="scope">
                  <el-input type="number" :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                            v-model="scope.row.paramValue" v-if="scope.row.paramType === 'number'"/>
                  <el-input :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                            v-model="scope.row.paramValue" v-if="scope.row.paramType === 'str'"/>
                  <gf-dict-select :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                                  dict-type="AGNES_PRODUCT_BOOLEAN" v-model="scope.row.paramValue"
                                  v-if="scope.row.paramType === 'boolean'"/>
                  <el-date-picker
                      v-if="scope.row.paramType==='date'"
                      v-model="scope.row.paramValue"
                      :style="!scope.row.paramValue ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="effectiveDate" label="生效时间" min-width="100">
                <template slot-scope="scope">
                  <el-date-picker
                      v-model="scope.row.effectiveDate"
                      :style="!scope.row.effectiveDate ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="failureDate" label="失效时间" min-width="100">
                <template slot-scope="scope">
                  <el-date-picker
                      v-model="scope.row.failureDate"
                      :style="!scope.row.failureDate ? 'border:1px solid #f00':''"
                      type="date"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="option" label="操作" width="60" align="center">
                <template slot-scope="scope">
                  <span class="option-span" @click="deleteTA(scope.$index)">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="addTA()" class="rule-add-btn" size="small">新增</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form-item>

  </el-form>

</template>

<script>
import lodash from 'lodash';

export default {
  name: "task-define",
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    row: Object,
    actionOk: Function
  },
  data() {
    return {
      detailForm: {
        productName: '',
        productShortName: '',
        productCode: '',
        productClass: '',
        productType: '',
        productStage: '',
        productStatus: '',
        productCurStatus: '',
        startDate: '',
        productCustodian: '',
        productCustodianOverseas: '',
        productRegistrationOrg: '',
        productLawFirm: '',
        productAccountFirm: '',
        redemptionTransConfirmDays: '',
        redemptionSettlementDays: '',
        tAPrdtRuInfoParamRefVo: [],
        fAPrdtRuInfoParamRefVo: [],
      },
      taProductParams: [],
      faProductParams: [],
      detailFormRules: {
        productName: [
          {required: true, message: '产品名称必填', trigger: 'blur'},
        ],
        productShortName: [
          {required: true, message: '产品简称必填', trigger: 'blur'},
        ],
        productCode: [
          {required: true, message: '产品代码必填', trigger: 'change'},
        ],
        productClass: [
          {required: true, message: '产品种类必填', trigger: 'blur'},
        ],
        productType: [
          {required: true, message: '产品类型必填', trigger: 'change'},
        ],
      },
    }
  },
  beforeMount() {
    if (this.mode !== "add") {
      //this.detailForm.tAPrdtRuInfoParamRefVo = [];
      //this.detailForm.fAPrdtRuInfoParamRefVo = [];
      this.detailForm = this.$lodash.cloneDeep(this.row);
      //Object.assign(this.detailForm, this.row);
    }
  },
  mounted() {
    this.getParams();
  },
  methods: {
    async getParams() {
      this.taProductParams = [];
      this.faProductParams = [];
      const taRes = await this.$api.productParamApi.getParamList("TA");
      if (taRes.data) {
        this.taProductParams = taRes.data;
      }
      const faRes = await this.$api.productParamApi.getParamList("FA");
      if (faRes.data) {
        this.faProductParams = faRes.data;
      }
    },
    faChanges(params) {
      let _that = this;
      const productParam = lodash.find(_that.faProductParams, function (item) {
        return item.paramName === params.paramName
      });
      params.paramCode = productParam.paramCode;
      params.paramType = productParam.paramType;
      params.paramValue = productParam.paramValue;
      params.effectiveDate = productParam.effectiveDate;
      params.failureDate = productParam.failureDate;
      params.productParamId = productParam.productParamId;
    },
    taChanges(params) {
      let _that = this;
      const productParam = lodash.find(_that.taProductParams, function (item) {
        return item.paramName === params.paramName
      });
      params.paramCode = productParam.paramCode;
      params.paramType = productParam.paramType;
      params.paramValue = productParam.paramValue;
      params.effectiveDate = productParam.effectiveDate;
      params.failureDate = productParam.failureDate;
      params.productParamId = productParam.productParamId;
    },
    addFA() {
      const newFileTableObj = {
        paramBizType: 'FA',
        paramCode: '',
        paramName: '',
        paramType: '',
        paramValue: '',
        effectiveDate: '',
        failureDate: '',
      };
      this.detailForm.fAPrdtRuInfoParamRefVo.push(newFileTableObj);
    },
    addTA() {
      const newFileTableObj = {
        paramBizType: 'TA',
        paramCode: '',
        paramName: '',
        paramType: '',
        paramValue: '',
        effectiveDate: '',
        failureDate: '',
      };
      this.detailForm.tAPrdtRuInfoParamRefVo.push(newFileTableObj);
    },
    // 删除行
    deleteFA(rowIndex) {
      this.detailForm.fAPrdtRuInfoParamRefVo.splice(rowIndex, 1);
    },
    deleteTA(rowIndex) {
      this.detailForm.tAPrdtRuInfoParamRefVo.splice(rowIndex, 1);
    },
    // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
    async onSave() {
      const ok = await this.$refs['taskDefForm'].validate();
      if (!ok) {
        return;
      }
      let validate = true;
      const prdtRuInfoParam = lodash.concat(this.detailForm.fAPrdtRuInfoParamRefVo, this.detailForm.tAPrdtRuInfoParamRefVo);
      if (prdtRuInfoParam) {
        for (let i = 0; i < prdtRuInfoParam.length; i++) {
          if (prdtRuInfoParam[i].paramCode === '' ||
              prdtRuInfoParam[i].paramName === '' ||
              prdtRuInfoParam[i].paramType === '' ||
              prdtRuInfoParam[i].paramValue === '' ||
              prdtRuInfoParam[i].effectiveDate === '' ||
              prdtRuInfoParam[i].failureDate === '') {
            validate = false;
            break;
          }
        }
      }
      if (!validate) {
        this.$msg.warning("请补充完整参数表格!");
        return;
      }
      try {
        let paramData = this.detailForm;
        if (this.mode === 'add') {
          const res = await this.$api.productApi.checkCodeExist(paramData.productCode);
          if (res.data !== 0) {
            this.$msg.success('产品代码已存在');
            return;
          }
          const p = this.$api.productApi.saveProdut(this.detailForm);
          await this.$app.blockingApp(p);
          this.$msg.success('保存成功');
        } else if (this.mode === 'edit') {
          const p = this.$api.productApi.saveProdut(this.detailForm);
          await this.$app.blockingApp(p);
          this.$msg.success('修改成功');
        } else {
          let updateParam = {
            productId: paramData.productId,
            productStatus: '04'
          }
          const p = this.$api.productApi.updateStatus(updateParam);
          await this.$app.blockingApp(p);
          this.$msg.success('复核成功');
        }
        if (this.actionOk) {
          await this.actionOk();
        }
        this.$emit("onClose");
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");

    async onCancel() {
      this.detailForm.tAPrdtRuInfoParamRefVo = [];
      this.detailForm.fAPrdtRuInfoParamRefVo = [];
      this.$emit("onClose");
    },
  },
  watch: {}
}
</script>
