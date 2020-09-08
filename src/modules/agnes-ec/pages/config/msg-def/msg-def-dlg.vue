<template>
  <div>
    <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="85px"  style="padding: 10px">
      <el-form-item label="消息名称" prop="msgName">
        <gf-input v-model.trim="form.msgName"  maxlength="64" placeholder="渠道收件消息" style="width: 100%"/>
      </el-form-item>
      <el-form-item label="消息编号" prop="msgCode">
        <gf-input v-model.trim="form.msgCode" placeholder="消息编号" :max-byte-len="8" />
      </el-form-item>
      <el-form-item label="消息类型" prop="msgTopic">
        <gf-dict v-model="form.msgTopic" dict-type="AC_MSG_TOPIC" style="width: 100%"/>
      </el-form-item>
      <el-form-item label="业务对象" prop="msgObjId">
        <el-select v-model="form.msgObjId" filterable placeholder="请选择" style="width: 100%">
          <el-option
              v-for="item in msgObjOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="保存"></dialog-footer>
  </div>
</template>

<script>
export default {
  name: "msg-def-dlg",
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
      form:{msgName:'',msgTopic:'',msgObjId:''},
      msgObjOptions:[],
      rules: {
        msgName: [
          {required: true, message: '消息名称必填', trigger: 'blur'},
        ],
        msgCode: [
          {required: true, message: '消息编码必填', trigger: 'blur'},
        ],
        msgTopic: [
          {required: true, message: '消息类型必选', trigger: 'change'},
        ],
        msgObjId: [
          {required: true, message: '消息对象必选', trigger: 'change'},
        ]
      }
    }
  },
  beforeMount() {
    this.fetchObjType();
    Object.assign(this.form, this.row);
  },
  methods: {
    async fetchObjType() {
      const resp = await this.$api.modelConfigApi.getModelTypeList();
      let objList = resp.data;
      objList.forEach((item)=>{
        this.msgObjOptions.push({value:item.modelTypeId,label:item.typeName});
      });
    },
    async onSave() {
      const ok = await this.$refs['form'].validate();
      if (!ok) {
        return;
      }
      try {
        if(this.row.msgTopic !== this.form.msgTopic || this.row.msgName !== this.form.msgName || this.row.msgObjId !== this.form.msgObjId){
          const checkP = this.$api.msgDefineApi.check(this.form);
          const resp = await this.$app.blockingApp(checkP);
          if(resp.data !== 0){
            this.$msg.warning('该消息定义已存在');
            return ;
          }
        }
        const p = this.$api.msgDefineApi.saveMsg(this.form);
        await this.$app.blockingApp(p);
        const that = this;
        p.then(function () {
          that.$msg.success('保存成功');
          that.$dialog.close(that);
        });
        if (this.actionOk) {
          await this.actionOk();
        }
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    cancel(){
      this.$dialog.close(this.$parent);
    }
  },
  watch:{
  }
}
</script>