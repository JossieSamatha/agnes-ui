<template>
  <div>
    <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="85px"
             style="padding: 10px;">
      <el-form-item label="地区" prop="areaCode">
        <gf-dict-select dict-type="AC_AREA" v-model="form.areaCode"></gf-dict-select>
      </el-form-item>
      <el-form-item label="日期" prop="year">
        <el-date-picker
            v-model="form.year"
            type="year"
            value-format="yyyy"
            placeholder="选择年">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        areaCode: '',
        year: ''
      },
      areaList: [],
      rules: {
        areaCode: [{required: true, message: "请输入区域"}],
        year: [{required: true, message: "请选择日期"}]
      },
    };
  },

  methods: {
    async onSave() {
      const ok = await this.$refs['form'].validate();
      if (!ok) {
        return;
      }
      const init = await this.$msg.ask("初始化将重置"+this.form.year+"年度所有数据, 是否继续?");
      if (!init) {
        return;
      }
      try {
        const p = this.$api.workdayConfigApi.initWorkDay(this.form.areaCode, this.form.year);
        await this.$app.blockingApp(p);

        if (this.actionOk) {
          await this.actionOk(this.form, this.row);
        }
        this.$msg.success('初始化成功');
        this.$dialog.close(this);
      } catch (reason) {
        this.$msg.error(reason);
      }
    },

  }
}
</script>
