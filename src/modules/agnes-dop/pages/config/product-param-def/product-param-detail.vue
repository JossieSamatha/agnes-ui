<template>
  <div>
    <el-form ref="taskDefForm" class="fit-box" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="100px">
      <el-form-item label="业务归属" prop="paramBizType">
        <gf-dict filterable clearable v-model="detailForm.paramBizType" dict-type="AGNES_PRODUCT_PARAM_BIZTYPE"/>
      </el-form-item>
      <el-form-item label="参数代码" prop="paramCode">
        <gf-input v-model.trim="detailForm.paramCode" placeholder="参数代码"/>
      </el-form-item>
      <el-form-item label="参数名称" prop="paramName">
        <gf-input v-model.trim="detailForm.paramName" placeholder="参数名称"/>
      </el-form-item>
      <el-form-item label="参数类型" prop="paramType">
        <gf-dict v-model="detailForm.paramType" dict-type="AGNES_PRODUCT_PARAM_TYPE" @change="paramTypeChange"/>
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
    <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
  </div>
</template>
<script>

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
        productParamId: '',
        paramBizType: '',
        paramCode: '',
        paramName: '',
        paramValue: '',
      },
      detailFormRules: {
        paramBizType: [
          {required: true, message: '业务归属必填', trigger: 'blur'},
        ],
        paramCode: [
          {required: true, message: '参数代码必填', trigger: 'blur'},
        ],
        paramName: [
          {required: true, message: '参数名称必填', trigger: 'change'},
        ],
        paramType: [
          {required: true, message: '参数类型必填', trigger: 'blur'},
        ],
        paramValue: [
          {required: true, message: '参数值必填', trigger: 'change'},
        ],
      },
      isFirst: false
    }
  },
  mounted() {
    this.isFirst = true
    if (this.mode !== 'add') {
      this.detailForm = this.row
    }
  },
  methods: {
    // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
    async onSave() {
      const ok = await this.$refs['taskDefForm'].validate();
      if (!ok) {
        return;
      }
      try {
        if (this.mode === 'add') {
          const p = this.$api.productParamApi.saveProdutParam(this.detailForm);
          await this.$app.blockingApp(p);
          this.$msg.success('保存成功');
        } else if (this.mode === 'edit') {
          const p = this.$api.productParamApi.saveProdutParam(this.detailForm);
          await this.$app.blockingApp(p);
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
    paramTypeChange() {
      if (!this.isFirst) {
        this.detailForm.paramValue = '';
      }
      this.isFirst = false;
    }
  }
}
</script>
