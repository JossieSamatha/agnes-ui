<template>
  <div>
    <!-- <el-scrollbar style="height:500px"> -->
    <el-form :model="form" :disabled=this.isNoEdit ref="form" :rules="rules" label-width="110px"
             style="padding: 10px">
      <el-form-item label="响应等级名称" prop="serviceResponseName" >
        <gf-input v-model="form.serviceResponseName"/>
      </el-form-item>
      <el-form-item label="响应等级编号" prop="serviceResponseCode" >
        <gf-input v-model.trim="form.serviceResponseCode" placeholder="响应等级编号" :max-byte-len="8" />
      </el-form-item>
      <el-form-item label="重复时间间隔" prop="repeatMinutes" >
        <el-input-number :min="1" :step="1" :precision="0" size="small" v-model="form.repeatMinutes"/>
        <gf-dict-select dict-type="AGNES_TIME_TYPE" v-model="timeType" style="width: 100px"/>
      </el-form-item>
      <el-form-item label="紧急度提升" prop="degreeScore" >
        <el-input-number :min="1" :step="1" :precision="0" size="small" v-model="form.degreeScore"/>
      </el-form-item>
      <el-form-item label="最大重复次数" prop="maxRepeatCount" >
        <el-input-number :min="1" :step="1" :precision="0" size="small"  v-model="form.maxRepeatCount"/>
      </el-form-item>
    </el-form>
    <!-- </el-scrollbar> -->
    <dialog-footer :on-save="save" :ok-button-title="okTitle" :ok-button-visible="mode != 'view'"></dialog-footer>
  </div>
</template>

<script>
import lodash from 'lodash';
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
    var checkName = async (rule, value, callback) => {
      const resp = await this.$api.ServiceConfApi.getService(this.form);
      if (resp.data != null) {
        callback(new Error('服务响应等级已存在！'));
      }
    };
    return {
      form:{
        serviceResponseName:'',
        serviceResponseCode:'',
        serviceResponseId:'',
        status:'',
        repeatMinutes: 1,
        degreeScore: 1,
        maxRepeatCount: 1,
        isNeedCheck:false
      },
      isNoEdit:false,
      okTitle:'保存',
      timeType: '1',
      rules: {
        serviceResponseName: [
          { required: true, message: '请输入服务响应等级', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        serviceResponseCode: [
          { required: true, message: '请输入服务响应编号', trigger: 'blur' }
        ],
      },
    }
  },

  beforeMount() {
    if (this.mode != "add" ) {
      let minutes=this.row.repeatMinutes;
      const temp=lodash.cloneDeep(this.row);
      if(minutes%60===0){
        temp.repeatMinutes=temp.repeatMinutes/60;
        this.timeType='2';
      }
      Object.assign(this.form, temp);
      if(this.mode != 'edit'){
        this.isNoEdit = true;
        this.okTitle = '审核';
      }
    }
  },
  methods: {
    async save() {
      if(this.mode == 'check'){
        try {
          const p = this.$api.ServiceConfApi.changeServiceStatus({serviceResponseId:this.form.serviceResponseId,status:'02'});
          await this.$app.blockingApp(p);
          this.$msg.success('审核成功');
          this.$dialog.close(this);
          if (this.actionOk) {
            await this.actionOk();
          }
        }catch (reason) {
          this.$msg.error(reason);
        }
      }else {
        const ok = await this.$refs['form'].validate();
        if (!ok) {
          return;
        }
        if(this.timeType==='2'){
          this.form.repeatMinutes=this.form.repeatMinutes*60;
        }
        if(this.row.serviceResponseCode != this.form.serviceResponseCode){
          this.form.isNeedCheck=true;
        }
        try {
          const p = this.$api.ServiceConfApi.saveService({reServiceResponse:this.form,isNeedCheck:this.form.isNeedCheck});
          let resp = await this.$app.blockingApp(p);
          if(resp.data == "0011"){
            this.$msg.warning("该编号已存在!");
            return;
          }else {
            this.$msg.success('保存成功');
            this.$dialog.close(this);
            if (this.actionOk) {
              await this.actionOk();
            }
          }
        } catch (reason) {
          this.$msg.error(reason);
        }
      }
    },
  }

}
</script>

<style scoped>

</style>
