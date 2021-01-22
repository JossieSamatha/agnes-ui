<template>
  <div>
    <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
             style="padding: 10px;">

      <el-form-item label="提醒日期" prop="memo.memoDate">
        <gf-date-picker v-model="form.memo.memoDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :disabled="true">
        </gf-date-picker>
      </el-form-item>

      <el-form-item label="记录事项" prop="memo.memoDesc">
        <gf-input v-model="form.memo.memoDesc" type="textarea" :max-byte-len="512"></gf-input>
      </el-form-item>

      <el-form-item label="通知人员" prop="memo.userName">
        <gf-input v-model="form.memo.userName" disabled="true"></gf-input>
      </el-form-item>
    </el-form>
    <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="save"></dialog-footer>
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
        memo: {
          pkId: '',
          memoDefId: '',
          memoDate: '',
          memoDesc: '',
          memoType: '',
          userName: '',
        },
        memoMemberRefList: []
      },
      activeName: 'userTab',
      rules: {
        'memo.memoDesc': [
          {required: true, message: '请填写记录事项', trigger: 'blur'}
        ]
      },
      rosterDate: ''
    }
  },

  beforeMount() {

    if (!(this.mode === 'add')) {
      Object.assign(this.form.memo, this.row);
    }
  },
  methods: {
    async save() {
      const ok = await this.$refs['form'].validate();
      if (!ok) {
        return;
      }

      //消息对象必填项校验
      if (this.form.memoMemberRefList.length == 0) {
        this.$msg.error("请选择参与人员");
        return;
      }

      try {
        const p = this.$api.memoApi.saveMemo(this.form);
        await this.$app.blockingApp(p);

        if (this.actionOk) {
          await this.actionOk(this.form, this.row);
        }
        this.$msg.success('保存成功');
        this.$dialog.close(this);
      } catch (reason) {
        this.$msg.error(reason);
      }
    },

    getMemberList(val) {
      this.form.memoMemberRefList = val;
    },

  }
}
</script>

<style scoped>
.el-tag {
  margin-left: 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
