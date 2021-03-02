<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="85px"
             style="padding: 10px">
      <el-form-item label="用户名" prop="userName">
        <gf-input type="text" v-model="form.userName" :disabled="true"/>
      </el-form-item>
      <el-form-item label="序号" prop="sequenceNum">
        <gf-input type="text" v-model.number="form.sequenceNum"/>
      </el-form-item>
    </el-form>
    <dialog-footer :on-save="save"></dialog-footer>
  </div>
</template>

<script>
export default {
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
      form: {
        userGroupRefId:'',
        userName:'',
        sequenceNum:null,
      },
      isNoEdit:false,
      okTitle:'保存',
      modelType: [],
      rules: {
        'sequenceNum': [{required: true, message: "请输入序号", trigger: 'blur'}],
      },
    }
  },

  beforeMount() {
    Object.assign(this.form, this.row);
  },
  methods: {
    async save() {
        const ok = await this.$refs['form'].validate();
        if (!ok) {
          return;
        }
        try {
          const p = this.$api.userGroupApi.updateSequenceNum(this.form);
          const resp = await this.$app.blockingApp(p);
          if(resp.code == "cswk"){
            this.$msg.warning(resp.msg);
            return;
          }else {
            if (this.actionOk) {
              await this.actionOk();
            }
            this.$msg.success('修改成功');
            this.$dialog.close(this);
          }
        } catch (reason) {
          this.$msg.error(reason);
        }
    },
  },
}
</script>