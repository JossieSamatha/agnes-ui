<template>
    <div class="form-page">
        <el-form ref="stepInfoForm" :model="stepInfo" label-width="85px">
            <el-form-item label="任务名称" prop="stepName">
                <gf-input v-model.trim="stepInfo.stepName"/>
            </el-form-item>
            <el-form-item label="日期类型" prop="dayendDefId">
                <el-select v-model="stepInfo.stepFormInfo.dayendDefId" placeholder="请选择">
                    <el-option
                            v-for="item in dataType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务等级" prop="stepLevel">
                <el-rate
                        v-model="stepInfo.stepFormInfo.caseStepDef.stepLevel"
                        :max="max"
                        show-text
                        :texts="texts"
                >
                </el-rate>
            </el-form-item>
            <el-form-item label="任务索引" prop="stepCode">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepCode"/>
            </el-form-item>
            <el-form-item label="责任人" prop="stepActOwner">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepActOwner"/>
            </el-form-item>
            <el-form-item label="任务类型" prop="stepActType">
                <gf-dict v-model="stepInfo.stepActType" dictType="AC_STEP_ACT_TYPE"></gf-dict>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '1'" label="指标" prop="stepActKey">
                <el-select v-model="stepInfo.stepFormInfo.stepActKey" placeholder="请选择">
                    <el-option
                            v-for="item in kpiData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '1'" label="指标参数" prop="stepActParam1">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepActParam1"/>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '2'" label="流程定义" prop="stepActKey">
                <el-select v-model="stepInfo.stepFormInfo.stepActKey" placeholder="请选择">
                    <el-option
                            v-for="item in flowData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '3'" label="确认事项" prop="stepActKey">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepActKey"/>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '3'" label="确认人" prop="stepActParam1">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepActParam1"></gf-input>
            </el-form-item>
            <el-form-item label="执行时间" prop="">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.startDay" style="width: 10%" v-if="dayChecked===true"></gf-input>
                <span v-if="dayChecked===true">日</span>
                <el-time-picker
                        style="width: 20%"
                        v-model="stepInfo.stepFormInfo.caseStepDef.startTime"
                        placeholder="任意时间点"
                        value-format="HH:mm">
                </el-time-picker>~
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.endDay" style="width: 10%" v-if="dayChecked===true"></gf-input>
                <span v-if="dayChecked===true">日</span>
                <el-time-picker
                        style="width: 20%"
                        v-model="stepInfo.stepFormInfo.caseStepDef.endTime"
                        placeholder="任意时间点"
                        value-format="HH:mm">
                </el-time-picker>
                <el-checkbox v-model="dayChecked">跨日</el-checkbox>
            </el-form-item>
            <el-form-item label="执行策略" v-if="stepInfo.stepActType === '1'" prop="">
                <el-radio v-model="stepInfo.stepFormInfo.caseStepDef.execMode" label="1">仅执行一次</el-radio>
                <el-radio v-model="stepInfo.stepFormInfo.caseStepDef.execMode" label="2">重复执行</el-radio>
                <el-form-item label="执行频率">
                    <gf-input v-model.trim="stepInfo.stepFormInfo.caseStepDef.execScheduler"  placeholder="* * * * * ?"  @click.native="openCron" style="width: 50%"/>
                </el-form-item>
            </el-form-item>
            <el-form-item label="预警通知" prop="warningList">
                <el-checkbox v-model="warningNotice">
                    <el-button type="text" :disabled="!warningNotice" @click="openRemindDlg(stepInfo.warningList)">告警方式配置</el-button>
                </el-checkbox>
            </el-form-item>
            <el-form-item label="超时通知">
                <el-checkbox v-model="timeoutNotice">超时通知</el-checkbox>
                <el-form-item v-if="timeoutNotice">
                    <el-form-item label="告警方式">
                        <remindDef :remindProps="stepInfo.stepFormInfo.timeoutList"></remindDef>
                    </el-form-item>
                    <el-form-item label="异常记录">
                        <el-checkbox true-label="1" false-label="0" v-model="stepInfo.stepFormInfo.caseStepDef.isRecordTimeoutError" >记入异常</el-checkbox>
                    </el-form-item>
                    <el-form-item v-if="stepInfo.stepFormInfo.caseStepDef.isRecordTimeoutError === '1'">
                        <el-form-item label="异常类型">
                            <el-select v-model="stepInfo.stepFormInfo.caseStepDef.timeoutErrorType" placeholder="请选择">
                                <el-option
                                        v-for="item in errorTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="异常内容">
                            <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.timeoutErrorContent"  type="textarea"></gf-input>
                        </el-form-item>
                    </el-form-item>
                </el-form-item>
            </el-form-item>
            <el-form-item label="任务说明" prop="stepRemark">
                <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.stepRemark" type="textarea"></gf-input>
            </el-form-item>
            <el-form-item label="激活条件" prop="">
                <el-radio v-model = "activeTerm" label="1">随CASE启动</el-radio>
                <el-radio v-model = "activeTerm" label="2">条件触发</el-radio>
            </el-form-item>
            <el-form-item label="激活规则" v-if="activeTerm === '2'" prop="">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.activeRuleTableData"></rule-table>
            </el-form-item>
            <el-form-item label="完成规则" prop="">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.successRuleTableData"></rule-table>
            </el-form-item>
            <el-form-item label="" prop="">
                <el-checkbox v-model="stepInfo.stepFormInfo.caseStepDef.forcePass"
                             true-label = 1 false-label	= 2>是否允许强制通过</el-checkbox>
            </el-form-item>
            <el-form-item label="" prop="finishtNotice">
                <el-checkbox v-model="finishtNotice">完成通知</el-checkbox>
                <el-form-item v-if="finishtNotice">
                    <el-form-item label="告警方式">
                        <remindDef :remindProps="stepInfo.stepFormInfo.finishtList"></remindDef>
                    </el-form-item>
                </el-form-item>
            </el-form-item>
            <el-form-item label="异常规则" prop="">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.failRuleTableData"></rule-table>
            </el-form-item>
            <el-form-item prop="exceptionNotice">
                <el-checkbox v-model="exceptionNotice">异常通知</el-checkbox>
                <el-form-item label="告警方式" v-if="exceptionNotice" >
                    <remindDef :remindProps="stepInfo.stepFormInfo.exceptionList"></remindDef>
                </el-form-item>
                <el-form-item v-if="exceptionNotice" label="异常记录">
                    <el-checkbox true-label = "1" false-label = "0" v-model="stepInfo.stepFormInfo.caseStepDef.isRecordError" >记入异常</el-checkbox>
                </el-form-item>
                <el-form-item v-if="stepInfo.stepFormInfo.caseStepDef.isRecordError === '1'">
                    <el-form-item label="异常类型">
                        <el-select v-model="stepInfo.stepFormInfo.caseStepDef.errorType" placeholder="请选择">
                            <el-option
                                    v-for="item in errorTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="异常内容">
                        <gf-input v-model="stepInfo.stepFormInfo.caseStepDef.errorContent"  type="textarea"></gf-input>
                    </el-form-item>
                </el-form-item>

            </el-form-item>
        </el-form>
        <div class="form__footer">
            <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
    </div>
</template>

<script>
    function resetForm() {
        return {
            stepName: '',
            defType: "step",
            stepActType: '1',
            stepId:'',
            stepFormInfo: {
                caseStepDef:{
                    dayendDefId:'',
                    stepLevel:0,
                    stepTag:'',
                    stepActOwner:'',
                    execMode:'1',
                    stepActKey:'',
                    stepActParam1:'',
                    startDay:'',
                    startTime:'',
                    endDay:'',
                    endTime:'',
                    execScheduler:'',
                    stepRemark:'',
                    forcePass:'',
                    isRecordError:'',
                    errorType:'',
                    errorContent:'',
                    isRecordTimeoutError:'',
                    timeoutErrorType:'',
                    timeoutErrorContent:'',
                },
                exceptionList: [],
                finishtList: [],
                failRuleTableData: {},
                successRuleTableData: {},
                activeRuleTableData: {},
            },
            timeoutList: [],
            warningList: [{
                remindUser: '',
                remindCc: '',
                remindBcc: '',
                remindTitle: '',
                remindContent: '',
                remindMode: '',
                stepNoticeType: '2'
            },{
                remindUser: '哈哈',
                remindContent: '提醒哈哈',
                stepNoticeType: '3'
            },{
                remindUser: '',
                remindContent: '',
                stepNoticeType: '4'
            }],
        };
    }
    import CronDef from "./cron-def";
    import RemindDef from './remind-def'
    export default {
        name: "stepInfo",
        props: {
            optionType: {
                required: true
            },
            formObj: {
                type: Object,
                required: true
            },
            args: {
                type: Object
            }
        },
        data() {
            return {
                stepInfo: resetForm(),
                texts: ['普通', '重要', '非常重要'],
                max: 3,
                warningNotice: false,
                timeoutNotice: false,
                finishtNotice: false,
                exceptionNotice: false,
                forcePass: false,
                dayChecked:false,
                activeTerm: '1',
                flowData: [{
                    value: '1001',
                    label: '分TA流程'
                }, {
                    value: '1002',
                    label: '测试流程'
                }],
                dataType: [{value:' 2001', label: '业务日期'},{value:' 2002',label: '系统日期'}],
                kpiData:[{value:' 3001', label: 'FA指标'},{value:' 3002',label: 'TA指标'}],
                errorTypeData:[{value:' 4001', label: '业务异常'},{value:' 4002',label: '系统异常'}],
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.onCreateForm();
                if (this.optionType != 'add') {
                    this.onLoadForm();
                }
            });
        },
        methods: {
            openCron() {
                this.showDlg(this.stepInfo.stepFormInfo.caseStepDef.execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(cornObj,action){
                if(this.mode==='view'){
                    return;
                }
                this.$nav.showDialog(
                    CronDef,
                    {
                        args: {cornObj, action},
                        width: '530px',
                        title: this.$dialog.formatTitle('执行频率', "edit"),
                    }
                );
            },
            setExecScheduler(cron) {
                this.stepInfo.stepFormInfo.caseStepDef.execScheduler=cron;
            },

            // 告警方式配置，打开弹框
            openRemindDlg(remindProp){
                this.$nav.showDialog(
                    RemindDef,
                    {
                        args: {remindProp},
                        width: '530px',
                        title: this.$dialog.formatTitle('告警方式配置',"edit"),
                    }
                );
            },

            resetFormFields() {
                if (this.$refs.stepInfoForm) {
                    this.$refs.stepInfoForm.resetFields();
                }
            },

            onCreateForm() {
                this.stepInfo = resetForm();
                this.stepInfo.stepActType = this.args.stepData;
                this.resetFormFields();
            },

            onLoadForm() {
                for (let key in this.formObj) {
                    if(this.stepInfo[key]){
                        this.stepInfo[key] = this.formObj && this.formObj[key] ? this.formObj[key] : this.stepInfo[key];
                    }else{
                        this.stepInfo[key] = this.formObj[key];
                    }
                }
                let activeRuleTableData = this.stepInfo.stepFormInfo.activeRuleTableData
                this.activeTerm = Object.keys(activeRuleTableData).length === 0 ? '1' : '2'
                let startDay = this.stepInfo.stepFormInfo.caseStepDef.startDay;
                let endDay = this.stepInfo.stepFormInfo.caseStepDef.endDay;
                this.dayChecked = !!(startDay || endDay)
            },

            // 保存表单数据
            saveForm(){
                this.stepInfo.stepFormInfo.caseStepDef.stepActType = this.stepInfo.stepActType;
                this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                this.$emit('saveStepInfo', {optionType: this.optionType, stepInfo: this.stepInfo, taskArgs: this.args});
            },
        },
    }
</script>
