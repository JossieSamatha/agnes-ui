<template>
  <div>
    <el-form ref="taskDefForm" class="fit-box" :model="detailForm"
             :rules="detailFormRules" label-width="100px">
      <el-form-item label="产品代码" prop="effectiveDate">
        <el-input v-model="detailForm.productCode" disabled/>
      </el-form-item>
      <el-form-item label="产品全称" prop="effectiveDate">
        <el-input v-model="detailForm.productName" disabled/>
      </el-form-item>
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
        <el-date-picker
            v-model="detailForm.dateValue"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
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
        productName: '',
        productCode: '',
        effectiveDate: '',
        failureDate: '',
        paramType: '',
        paramValue: '',
        productCodes: [],
        dateValue: [],
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
    this.detailForm = this.$lodash.cloneDeep(this.row)
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
      try {
        this.detailForm.effectiveDate = this.detailForm.dateValue[0];
        this.detailForm.failureDate = this.detailForm.dateValue[1];
        const req = this.$api.productParamApi.updateRef(this.detailForm);
        const resDate = await this.$app.blockingApp(req);
        if (resDate.data) {
          this.$msg.warning(resDate.data);
          return;
        } else {
          this.$msg.success('修改成功');
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
