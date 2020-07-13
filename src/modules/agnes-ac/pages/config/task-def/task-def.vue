<template>
    <el-form ref="form" :model="form"  :disabled="mode==='view'" :rules="rules" label-width="110px"  style="margin-left: 15%;" class="taskDefForm">
        <el-form-item label="任务名称" prop="taskName">
            <gf-input v-model.trim="form.taskName"  placeholder="任务名称" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="业务场景">
            <gf-dict v-model="form.bizType" dict-type="EC_BIZ_TYPE" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="业务标签">
            <el-select v-model="form.bizTagArr" multiple
                       filterable allow-create default-first-option
                       placeholder="请选择"  style="width: 50%">
                <el-option
                        v-for="item in bizTagOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="任务有效期" >
            <el-date-picker
                    v-model="form.startTimeStr"
                    type="datetime"
                    style="width: 24.4%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="开始日期">
            </el-date-picker>
            ~
            <el-date-picker
                    v-model="form.endTimeStr"
                    type="datetime"
                    style="width: 24.4%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="结束日期" :disabled="form.startAllTime">
            </el-date-picker>
            <el-checkbox v-model="form.startAllTime" style="margin-left: 10px">永久有效</el-checkbox>
        </el-form-item>
        <el-checkbox v-model="form.isDependOnBiz" style="margin-left: 110px;margin-bottom: 18px;width: 20%;">根据业务参数批量生成任务</el-checkbox>
        <el-form-item label="关联产品"  v-show="form.isDependOnBiz" >
            <el-select v-model="form.involeProduct" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关联case" >
            <el-select v-model="form.caseId" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-link :underline="false" style="margin-left: 10px">编辑</el-link>
            <el-link :underline="false" style="margin-left: 10px">查看</el-link>
        </el-form-item>
        <el-form-item label="启动方式" >
            <el-radio v-model="form.execMode" label="1">重复执行</el-radio>
            <el-radio v-model="form.execMode" label="2">事件触发执行</el-radio>
        </el-form-item>
        <el-form-item label="执行频率"  v-if="form.execMode==1">
            <gf-input v-model.trim="form.execScheduler"  placeholder="请编辑执行频率" :readonly="true" style="width: 50%"/>
            <i class="fa fa-edit"  style="font-size: 20px;margin-left: 10px" @click="editExecTime"></i>
        </el-form-item>
        <el-form-item label="事件选择" v-else>
            <el-select v-model="form.eventId" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否需要审批">
            <gf-dict v-model="form.needApprove" dict-type="GF_BOOL_TYPE" style="width: 50%"/>
        </el-form-item>
<!--        <el-checkbox v-model="form.needAppRove" style="margin-left: 60px;margin-bottom: 18px;width: 10%;">是否需要审批</el-checkbox>-->
        <el-row class="gf-form-btn2" style="margin-left: 25%" v-show="mode!=='view'">
            <el-button type="primary" @click="save()" icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    import ExecTimeEdit from "./exec-time";
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
                options:[{value:"xit",label:"系统数据源"},{value:"waibu",label:"外部数据源"},{value:"ces",label:"测试数据源"}],
                bizTagOption:[],
                form:{taskName:'',bizType:'', bizTagArr:[],bizTag:'',startTimeStr:'',endTimeStr:'',startTime:null,endTime:null
                    ,startAllTime:false,caseId:'',involeProduct:'',isDependOnBiz:false
                    ,execMode:"1",execScheduler:'* * * * * ? *',eventId:'',needApprove:''},
                rules: {
                    taskName: [
                        {required: true, message: '业务参数名称必填', trigger: 'blur'},
                    ]
                }
            }
        },
        beforeMount() {
            this.row.startTimeStr=this.$dateUtils.formatDate(new Date(this.row.startTime),"yyyy-MM-dd HH:mm:ss");
            this.row.endTimeStr=this.$dateUtils.formatDate(new Date(this.row.endTime),"yyyy-MM-dd HH:mm:ss");
            if(this.row.endTimeStr==='9999-12-31 23:59:59'){
                this.form.startAllTime=true;
            }
            Object.assign(this.form, this.row);
            if(this.form.bizTag){
                this.form.bizTagArr = this.form.bizTag.split(",");
            }
            let item =this.form.bizTag.split(",");
            for(let i=0;i<item.length;i++){
                this.bizTagOption.push({value:item[i],label:item[i]});
            }
        },
        methods: {
            editExecTime() {
                this.showDlg(this.form.execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(data,action){
                if(this.mode==='view'){
                    return;
                }
                this.$nav.showDialog(
                    ExecTimeEdit,
                    {
                        args: {data, action},
                        width: '530px',
                        title: this.$dialog.formatTitle('编辑执行频率'),
                    }
                );
            },
            setExecScheduler(cron) {
                this.form.execScheduler=cron;
            },
            dateStringToDate(s){
                var d = new Date();
                d.setYear(parseInt(s.substring(0,4),10));
                d.setMonth(parseInt(s.substring(5,7)-1,10));
                d.setDate(parseInt(s.substring(8,10),10));
                d.setHours(parseInt(s.substring(11,13),10));
                d.setMinutes(parseInt(s.substring(14,16),10));
                d.setSeconds(parseInt(s.substring(17,19),10));
                return d;
            },
            close(){
                this.$dialog.close(this);
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    this.form.startTime = this.dateStringToDate(this.form.startTimeStr);
                    this.form.endTime = this.dateStringToDate(this.form.endTimeStr);
                    this.form.bizTag = this.form.bizTagArr.join(",");
                    const p = this.$api.taskDefineApi.saveTask({"taskDef":this.form});
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },

        watch: {
            'form.startAllTime':function (val) {
                if(val){
                    this.form.endTimeStr='9999-12-31 23:59:59'
                }else {
                    this.form.endTimeStr=''
                }
            },
        }
    }
</script>

<style scoped>

</style>

