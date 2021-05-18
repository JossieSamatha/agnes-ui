<template>
  <el-form ref="form" class="task-def-form" :model="detailForm"
           :rules="detailFormRules" label-width="110px">
    <el-form-item label="任务名称" prop="taskId">
      <el-select clearable filterable placeholder="请选择" style="width: 50%" v-model="detailForm.taskId">
        <gf-filter-option
                :key="item.taskId"
                :label="item.taskName"
                :value="item.taskId"
                v-for="item in taskOptions">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <el-form-item label="参数类型选择" v-if="!hasParam">
      <el-select clearable filterable placeholder="请选择" style="width: 50%" v-model="detailForm.bizType">
        <gf-filter-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in bizTypeOptions">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <el-form-item label="参数选择" v-if="detailForm.bizType=='1'">
      <el-select clearable filterable  placeholder="请选择" style="width: 50%" v-model="detailForm.prdtCode">
        <gf-filter-option
                :key="item.productId"
                :label="item.productName"
                :value="item.productId"
                v-for="item in productOptions">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <el-form-item label="参数选择" v-if="detailForm.bizType=='2'">
      <el-select clearable filterable  placeholder="请选择" style="width: 50%" v-model="detailForm.acntCode">
        <gf-filter-option
                :key="item.acntId"
                :label="item.acntName"
                :value="item.acntId"
                v-for="item in acntOptions">
        </gf-filter-option>
      </el-select>
    </el-form-item>
    <template v-if="hasParam">
      <el-form-item
              v-for="(item,index) in fieldOption"
              :key="index"
              :label="item.fieldName"
              :prop="item.fieldKey"
      >
        <el-input v-model="detailForm.eventParams[item.fieldKey]" clearable  style="width: 50%"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="执行方式" prop="execMode">
      <el-radio-group v-model="detailForm.execMode">
        <el-radio label="1">立即执行</el-radio>
        <el-radio label="2">预约执行</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="执行日期" prop="startTime" v-if="detailForm.execMode=='2'">
      <el-date-picker
            v-model="detailForm.startTime"
            type="datetime"
            style="width: 50%"
            placeholder="选择执行日期时间">
    </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      hasParam:false,
      fieldOption:[],
      detailForm:{
        execMode:'1',
        bizType:'',
        prdtCode:'',
        acntCode:'',
        eventParams:{},
      },
      bizTypeOptions:[{value:'1',label:'产品'},{value:'2',label:'账户'}],
      productOptions:[],
      taskOptions:[],
      acntOptions:[],
      detailFormRules: {
        taskId: [
          {required: true, message: '任务名称必选', trigger: 'blur'},
        ]
      },
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData(){
      const e = this.$api.taskDefineApi.getTaskListByType({taskTypes:['2']});
      const taskR = await this.$app.blockingApp(e);
      if(taskR.data) {
        this.taskOptions = taskR.data
      }
      const p = this.$api.productApi.getAllProductList();
      const prdt = await this.$app.blockingApp(p);
      if(prdt.data) {
        this.productOptions = prdt.data
      }
      const a = this.$api.acntInfoApi.getAcntInfoList();
      const acnt = await this.$app.blockingApp(a);
      if(acnt.data) {
        this.acntOptions = acnt.data
      }
    },
    onCancel() {
      this.$emit("onClose");
    },

    async onSave() {
      const ok = await this.$refs['form'].validate();
      if (!ok) {
        return;
      }
      if(this.detailForm.execMode == '2' && this.detailForm.startTime == null){
        this.$msg.warning("请选择执行时间！");
        return;
      }
      const ask = await this.$msg.ask(`确认发布该任务吗?`);
      if (!ask) {
        return
      }
      try {
        const r = this.$api.productCalendarApi.addTempTask(this.detailForm);
        const resp = await this.$app.blockingApp(r);
        if (resp && resp.code == 'error') {
          this.$msg.warning(resp.message);
          return;
        }
        this.$msg.success("发布成功！");
        this.$emit("onClose");
      }catch (e) {
        this.$msg.error(e);
      }
    },

    async checkHasParam(){
      let eventId = '';
      this.taskOptions.forEach(item=>{
        if(item.taskId == this.detailForm.taskId){
          if(item.execMode == '3' && item.eventId){
            eventId = item.eventId;
          }
        }
      });
      this.hasParam = false;
      this.detailForm.bizType = '';
      this.detailForm.prdtCode ='';
      this.detailForm.acntCode ='';
      this.detailForm.eventParams = {};
      this.fieldOption = [];
      if(eventId!=''){
        const e = this.$api.modelConfigApi.getFieldByEventId(eventId);
        const eventR = await this.$app.blockingApp(e);
        if (eventR.data && eventR.data.length>0) {
          this.fieldOption = eventR.data;
          this.fieldOption.forEach((item)=>{
            this.$set(this.detailForm.eventParams, item.fieldKey, '');
          });
          this.hasParam = true;
        }
      }
    },
    bizTypeChange(){
      this.detailForm.prdtCode ='';
      this.detailForm.acntCode ='';
    }
  },
  watch:{
    'detailForm.taskId'(){
      this.checkHasParam();
    },
    'detailForm.bizType'(){
      this.bizTypeChange();
    },
    'detailForm.execMode'(val){
      if(val=="1"){
        this.detailForm.startTime=null;
      }
    },
  }
}
</script>

<style scoped>
</style>
