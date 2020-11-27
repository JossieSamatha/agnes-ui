<template>
  <div>
    <el-form ref="taskDefForm" class="fit-box" :model="detailForm"
             :rules="detailFormRules" label-width="100px">
      <el-form-item label="生效时间" prop="effectiveDate">
        <el-date-picker
            v-model="detailForm.effectiveDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="生效时间"/>
      </el-form-item>
      <el-form-item label="失效时间" prop="failureDate">
        <el-date-picker
            v-model="detailForm.failureDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="失效时间"/>
      </el-form-item>
      <el-form-item label="关联产品">
        <gf-grid grid-no="agnes-product-info-beyond-param" ref="grid" quick-text-max-width="300px"
                 :query-args="queryArgs">
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
        productParamId: '',
      },
      detailForm: {
        productParamId: '',
        effectiveDate: '',
        failureDate: '',
        productIds: [],
      },
      detailFormRules: {
        effectiveDate: [
          {required: true, message: '生效日期', trigger: 'blur'},
        ],
        failureDate: [
          {required: true, message: '失效日期', trigger: 'blur'},
        ],
      },
    }
  },
  mounted() {
    this.queryArgs.productParamId = this.row.productParamId;
    this.detailForm.productParamId = this.row.productParamId;
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
      console.log("保存")
      try {
        let that = this;
        const productInfos = this.$refs.grid.getSelectedRows();
        productInfos.forEach(productInfo => {
          that.detailForm.productIds.push(productInfo.productId)
        })
        const req = this.$api.productParamApi.saveProductParamRef(that.detailForm);
        await this.$app.blockingApp(req);
        this.$msg.success('保存成功');
        if (this.actionOk) {
          await this.actionOk();
        }
        this.$dialog.close(this);
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
  },
  watch: {
    'detailForm.paramType': {
      handler: function (val) {
        console.log(val)
        this.detailForm.paramValue = '';
        this.detailForm.paramType = val;
      }
    }
  }
}
</script>
