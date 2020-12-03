<template>
  <div>
    <el-form ref="taskDefForm" class="fit-box" :model="detailForm"
             :rules="detailFormRules" label-width="100px">
      <!--      <el-form-item label="生效时间" prop="effectiveDate">-->
      <!--        <el-date-picker-->
      <!--            v-model="detailForm.effectiveDate"-->
      <!--            type="date"-->
      <!--            value-format="yyyy-MM-dd"-->
      <!--            :picker-options="pickerOptionsStart"-->
      <!--            placeholder="生效时间"/>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="失效时间" prop="failureDate">-->
      <!--        <el-date-picker-->
      <!--            v-model="detailForm.failureDate"-->
      <!--            type="date"-->
      <!--            value-format="yyyy-MM-dd"-->
      <!--            :picker-options="pickerOptionsEnd"-->
      <!--            placeholder="失效时间"/>-->
      <!--      </el-form-item>-->
      <el-form-item prop="dateValue" label="有效日期">
        <div class="el-select">
          <el-date-picker
              v-model="detailForm.dateValue"
              type="daterange"
              range-separator="-"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="el-input__inner">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="参数值" prop="paramValue">
        <gf-input v-if="detailForm.paramType==='str'" v-model.trim="detailForm.paramValue" placeholder="参数值"/>
        <el-input v-if="detailForm.paramType==='number'" v-model="detailForm.paramValue"
                  placeholder="参数值"/>
        <el-date-picker
            v-if="detailForm.paramType==='date'"
            v-model="detailForm.paramValue"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="参数值">
        </el-date-picker>
        <gf-dict v-model="detailForm.paramValue" v-if="detailForm.paramType==='boolean'"
                 dict-type="AGNES_PRODUCT_BOOLEAN"/>

      </el-form-item>
      <el-form-item label="关联产品">
        <gf-grid grid-no="agnes-product-info-beyond-param" ref="grid" quick-text-max-width="300px"
        >
        </gf-grid>
        <template slot="left">
          <gf-button class="action-btn" style="margin-right: 20px" @click="addProduct">添加</gf-button>
        </template>
      </el-form-item>
    </el-form>
    <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
  </div>
</template>
<script>

export default {
  name: "task-define",
  props: {
    row: Object,
    actionOk: Function
  },
  data() {
    return {
      queryArgs: {
        paramCode: '',
      },
      detailForm: {
        paramCode: '',
        effectiveDate: window.bizDate,
        failureDate: '9999-12-31',
        paramType: '',
        paramValue: '',
        productCodes: [],
        dateValue: [window.bizDate, '9999-12-31'],
      },
      detailFormRules: {
        dateValue: [
          {required: true, message: '生效日期', trigger: 'blur'},
        ],
        paramValue: [
          {required: true, message: '参数值', trigger: 'blur'},
        ],
      },
    }
  },
  mounted() {
    this.queryArgs.paramCode = this.row.paramCode;
    this.detailForm.paramCode = this.row.paramCode;
    this.detailForm.paramType = this.row.paramType;
  },
  methods: {
    addProduct() {

    },
    // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
    async onSave() {
      const ok = await this.$refs['taskDefForm'].validate();
      if (!ok) {
        return;
      }
      const row = this.$refs.grid.getSelectedRows();
      if (row.length === 0) {
        this.$msg.warning("关联产品不可为空")
        return;
      }
      try {
        let that = this;
        const productInfos = this.$refs.grid.getSelectedRows();
        productInfos.forEach(productInfo => {
          that.detailForm.productCodes.push(productInfo.productCode)
        });
        that.detailForm.effectiveDate = that.detailForm.dateValue[0];
        that.detailForm.failureDate = that.detailForm.dateValue[1];
        const req = this.$api.productParamApi.saveProductParamRef(that.detailForm);
        const resDate = await this.$app.blockingApp(req);
        if (resDate.data) {
          this.$msg.warning(resDate.data);
          return;
        } else {
          this.$msg.success('保存成功');
        }
        if (this.actionOk) {
          await this.actionOk();
        }
        this.$dialog.close(this);
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
  },
}
</script>
