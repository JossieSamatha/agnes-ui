<template>
  <div>
    <el-form class="fit-box" :model="form" ref="form" :rules="rules"
             label-width="85px"
             style="padding: 10px;">
      <el-form-item label="值班日期" prop="rosterDate">
        <el-form-item prop="rosterDate">
          <el-date-picker
              v-model="form.rosterDate"
              align="left"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :disabled="true">
          </el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="值班类型" prop="rosterType">
        <el-select v-model="form.rosterType" clearable :disabled="true">
          <el-option v-for="item in rosterTypeDict" :key="item.dictId" :label="item.dictName" :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="值班人员" prop="memberRefList">
        <gf-person-chosen ref="memberRef"
                          :disabled="mode !== 'add' && mode !== 'edit'"
                          :memberRefList="form.memberRefList"
                          chosenType="user,group"
                          @getMemberList="getMemberList"
        >
        </gf-person-chosen>
      </el-form-item>
    </el-form>
    <dialog-footer v-if="mode=== 'add' || mode === 'edit'" :ok-button-visible="mode !== 'view'"
                   :on-save="onSave"></dialog-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rosterTypeDict: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
      form: {
        rosterDate: '',
        rosterType: '',
        memberRefList: [],
        rosterNoticeUser: '',
        workday: '0',
      },
      rules: {
        'memberRefList': [{type: 'array', required: true, message: "请选择值班人员"}],
      },
    };
  },
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    row: Object,
    actionOk: Function
  },

  beforeMount() {
    if (!(this.mode === 'add')) {
      this.$lodash.assign(this.form, this.row);
      //this.form.memberRefList = this.row.rosterNoticeUser.split(',');
      this.form.rosterType = this.row.rosterType;
      let memberRef = []
      memberRef.push({
        refType: '1',
        memeberId: this.row.rosterNoticeUser,
        memberDesc: this.row.userName,
      })
      this.form.memberRefList = memberRef;
    }
  },
  methods: {
    getMemberList(val) {
      this.form.memberRefList = val;
    },
    async onSave() {
      const ok = await this.$refs.form.validate();
      if (!ok) {
        return;
      }
      try {
        this.form.rosterNoticeUser = this.form.memberRefList[0].memberId;
        const p = this.$api.rosterApi.save(this.form);
        const req = await this.$app.blockingApp(p);
        if (req.data != null) {
          this.$msg.warning(req.data);
          return;
        }
        if (this.actionOk) {
          await this.actionOk(this.form, this.row);
        }
        this.$msg.success('保存成功');
        this.$dialog.close(this);
      } catch (e) {
        this.$msg.error(e);
      }
    },
    async approveRosterDef() {
      try {
        const p = this.$api.rosterApi.approve(this.form.pkId);
        await this.$app.blockingApp(p);
        if (this.actionOk) {
          await this.actionOk();
        }
        this.$dialog.close(this);
      } catch (reason) {
        this.$msg.error(reason);
      }
    }
  }
}
</script>

<style scoped>
.note {
  color: #999;
  text-indent: 2em;
}
</style>
