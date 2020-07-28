<template>
    <div class="form-page">
        <div class="form__footer">
            <el-button class="primary" @click="saveForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
        <el-form ref="stepInfoForm"  class="task-def-form" :model="caseStepDef" label-width="100px">
            <el-form-item label="任务名称" prop="stepName">
                <gf-input v-model.trim="stepInfo.stepName"/>
            </el-form-item>
            <el-form-item label="基准日期" prop="dayendDefId">
                <gf-dict v-model="caseStepDef.dayendDefId" dict-type="AGNES_BASE_DATE"></gf-dict>
            </el-form-item>
            <el-form-item label="任务等级" prop="stepLevel">
                <el-rate
                        v-model="caseStepDef.stepLevel"
                        :max="max"
                        show-text
                        :texts="texts"
                >
                </el-rate>
            </el-form-item>
            <el-form-item label="任务编号" prop="stepCode">
                <gf-input v-model="caseStepDef.stepCode"/>
            </el-form-item>
            <el-form-item label="业务场景" prop="bizType">
                <gf-dict filterable clearable v-model="bizType" dict-type="EC_BIZ_TYPE"/>
            </el-form-item>
            <el-form-item label="业务标签" prop="bizTag">
                <el-select class="multiple-select" v-model="bizTagArr"
                           multiple filterable clearable
                           allow-create
                           default-first-option placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务说明" prop="stepRemark">
                <gf-input v-model="caseStepDef.stepRemark" type="textarea"></gf-input>
            </el-form-item>
            <el-form-item label="参与人员" prop="stepActOwner">
                <gf-input v-model="caseStepDef.stepActOwner"/>
            </el-form-item>
            <el-form-item label="执行时间" prop="">
                <div class="line none-shrink">
                    <gf-input v-model="caseStepDef.startDay" v-if="dayChecked===true"></gf-input>
                    <span v-if="dayChecked===true" style="margin: 0 5px">日</span>
                    <el-form-item prop="startTime">
                        <el-time-picker v-model="caseStepDef.startTime"
                                placeholder="任意时间点"
                                value-format="HH:mm">
                        </el-time-picker>
                    </el-form-item>
                    <span style="margin: 0 10px">~</span>
                    <gf-input v-model="caseStepDef.endDay" v-if="dayChecked===true"></gf-input>
                    <span v-if="dayChecked===true" style="margin: 0 5px">日</span>
                    <el-form-item prop="endTime">
                        <el-time-picker v-model="caseStepDef.endTime"
                                placeholder="任意时间点"
                                value-format="HH:mm">
                        </el-time-picker>
                    </el-form-item>
                    <el-checkbox v-model="dayChecked" style="margin-left: 5px">跨日</el-checkbox>
                </div>
            </el-form-item>
            <el-form-item label="任务类型" prop="stepActType">
                <gf-dict v-model="stepInfo.stepActType" dictType="AGNES_CASE_STEPTYPE"></gf-dict>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '01'" label="指标" prop="stepActKey">
                <el-select v-model="caseStepDef.stepActKey" placeholder="请选择">
                    <el-option
                            v-for="item in kpiData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '01'" label="指标参数" prop="stepActParam1">
                <gf-input v-model="caseStepDef.stepActParam1"/>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '03'" label="流程定义" prop="stepActKey">
                <el-select v-model="caseStepDef.stepActKey" placeholder="请选择">
                    <el-option
                            v-for="item in flowData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '00'" label="确认事项" prop="stepActKey">
                <gf-input v-model="caseStepDef.stepActKey"/>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '00'" label="确认人" prop="stepActParam1">
                <gf-input v-model="caseStepDef.stepActParam1"></gf-input>
            </el-form-item>
            <el-form-item label="指标执行频率">
                <gf-input v-model.trim="caseStepDef.execScheduler" placeholder="* * * * * ?"
                              @click.native="openCron" style="width: 235px"/>
            </el-form-item>
            <el-form-item label="任务控制参数">
                <gf-strbool-checkbox v-model="caseStepDef.isTodo">是否进入待办</gf-strbool-checkbox>
                <gf-strbool-checkbox v-model="caseStepDef.forcePass">是否允许人工强制通过</gf-strbool-checkbox>
            </el-form-item>
            <el-form-item label="消息通知参数">
                <el-checkbox-group v-model="msgInformParam">
                    <el-checkbox v-for="msgInform in msgInformOp"
                                 :key="msgInform.value"
                                 :label="msgInform.value">
                        {{msgInform.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="msgInformParam.length>0">
                <el-tabs type="card" style="height: 290px;">
                    <el-tab-pane v-for="(msgInformItem, msgInformIndex) in msgInformParam" :key="msgInformIndex"
                                 :name="msgInformIndex+''">
                        <span class="tab-label" slot="label">
                            <span>{{msgInformOp[msgInformItem].label}}</span>
                        </span>
                        <el-form size="small" label-width="100px" v-show="msgInformItem == '0'">
                            <el-form-item label="提前通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.warningRemind,'warningRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                            <el-form-item label="预警时间">提前
                                <gf-input v-model="caseStepDef.warningMintues" style="width: 30%"></gf-input>
                                <el-select v-model="timeType" placeholder="请选择">
                                    <el-option
                                            v-for="item in timeTypeData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form size="small" label-width="100px" v-show="msgInformItem == '1'">
                            <el-form-item label="完成通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.finishRemind,'finishRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-form size="small" label-width="100px" v-show="msgInformItem == '2'">
                            <el-form-item label="超时通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.timeoutRemind,'timeoutRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                            <el-form-item label-width="113px"  label="服务水平承诺">
                                <gf-input style="width: 20%"></gf-input>按照每隔
<!--                                <gf-el-select  style="width: 20%"></gf-el-select>按照每隔-->
                                <gf-input style="width: 20%"></gf-input>分钟，执行
                                <gf-input style="width: 20%"></gf-input>次后退出
                            </el-form-item>
                            <el-form-item label="异常记录">
                                <gf-strbool-checkbox v-model="caseStepDef.isRecordTimeoutError">记入异常</gf-strbool-checkbox>
                            </el-form-item>
                            <el-form-item v-if="caseStepDef.isRecordTimeoutError === '1'">
                                <el-form-item label="异常类型">
                                    <el-select v-model="caseStepDef.timeoutErrorType" placeholder="请选择">
                                        <el-option
                                                v-for="item in errorTypeData"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="异常内容">
                                    <gf-input v-model="caseStepDef.timeoutErrorContent"  type="textarea"></gf-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form size="small" label-width="100px" v-show="msgInformItem == '3'">
                            <el-form-item label="异常通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.exceptionRemind,'exceptionRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                            <el-form-item label="异常记录">
                                <gf-strbool-checkbox v-model="caseStepDef.isRecordError">记入异常</gf-strbool-checkbox>
                            </el-form-item>
                            <el-form-item v-if="caseStepDef.isRecordError === '1'">
                                <el-form-item label="异常类型">
                                    <el-select v-model="caseStepDef.errorType" placeholder="请选择">
                                        <el-option
                                                v-for="item in errorTypeData"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="异常内容">
                                    <gf-input v-model="caseStepDef.errorContent"  type="textarea"></gf-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-form-item>
            <el-form-item label="激活条件">
                <el-radio-group v-model="activeTerm">
                    <el-radio v-for="activeItem in activeConfOp"
                              :key="activeItem.value"
                              :label="activeItem.value">
                        {{activeItem.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="activeTerm == '2'">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.activeRuleTableData"></rule-table>
            </el-form-item>
            <el-form-item label="完成规则">
                <el-radio-group v-model="succeedRule">
                    <el-radio v-for="ruleType in ruleTypeOp"
                              :key="ruleType.value"
                              :label="ruleType.value">
                        {{ruleType.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="succeedRule == '1'">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.successRuleTableData"></rule-table>
            </el-form-item>
            <el-form-item label="异常规则">
                <el-radio-group v-model="abnormalRule">
                    <el-radio v-for="ruleType in ruleTypeOp"
                              :key="ruleType.value"
                              :label="ruleType.value">
                        {{ruleType.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="abnormalRule == '1'">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.failRuleTableData"></rule-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    function resetForm() {
        return {
            stepName: '',
            defType: "step",
            stepActType: '1',
            stepId: '',
            stepFormInfo: {
                caseStepDef: {
                    dayendDefId: '',
                    stepLevel: 0,
                    stepTag: '',
                    stepActOwner: '',
                    execMode: '1',
                    stepActKey: '',
                    stepActParam1: '',
                    startDay: '',
                    startTime: '',
                    endDay: '',
                    endTime: '',
                    execScheduler: '* * * * * ?',
                    stepRemark: '',
                    forcePass: '',
                    isRecordError: '',
                    errorType: '',
                    errorContent: '',
                    isRecordTimeoutError: '',
                    timeoutErrorType: '',
                    timeoutErrorContent: '',
                    isTodo:'1',
                    warningMintues:''
                },
                exceptionRemind: [],
                finishtRemind: [],
                timeoutRemind: [],
                warningRemind: [],
                failRuleTableData: {},
                successRuleTableData: {},
                activeRuleTableData: {},
            },
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
                exceptionNotice: false,
                forcePass: false,
                dayChecked: false,
                activeTerm: '1',
                timeType: '1',
                caseSteptype: [],
                flowData: [{
                    value: '1001',
                    label: '分TA流程'
                }, {
                    value: '1002',
                    label: '测试流程'
                }],
                dataType: [{value: ' 2001', label: '业务日期'}, {value: ' 2002', label: '系统日期'}],
                kpiData: [{value: ' 3001', label: 'FA指标'}, {value: ' 3002', label: 'TA指标'}],
                errorTypeData: [{value: ' 4001', label: '业务异常'}, {value: ' 4002', label: '系统异常'}],
                timeTypeData: [{value: '1', label: '分钟'}, {value: '2', label: '小时'}, {value: '3', label: '天'}],
                // 业务场景
                bizType: '',
                // 消息配置类型类型选项
                msgInformParam: [],
                msgInformOp: [{label: '提前通知', value: '0'}, {label: '完成通知', value: '1'}, {label: '超时通知', value: '2'},
                    {label: '异常通知', value: '3'}, {label: '系统内部消息', value: '4'}],
                msgInfoStr: ['warningRemind', 'finishRemind', 'timeoutRemind', 'exceptionRemind'],
                // 业务标签
                bizTagArr: [],
                bizTagOption: [],        // 业务类型下拉
                // 规则选择类型选项
                ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
                // 激活条件类型选项
                activeConfOp: [{label: '随case启动', value: '1'}, {label: '条件触发', value: '2'}],
                succeedRule: '0',
                abnormalRule: '0',
            }
        },
        computed:{
            caseStepDef(){
                return this.stepInfo.stepFormInfo.caseStepDef;
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.onCreateForm();
                if (this.optionType != 'add') {
                    this.onLoadForm();
                }
                this.msgInfoStr.forEach((strItem, index)=>{
                    if(this.stepInfo.stepFormInfo[strItem] && this.stepInfo.stepFormInfo[strItem].length>0){
                        this.msgInformParam.push(index+'');
                    }
                });
            });
        },
        methods: {
            openCron() {
                this.showDlg(this.caseStepDef.execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(cornObj, action) {
                if (this.mode === 'view') {
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
                this.caseStepDef.execScheduler = cron;
            },

            async showRemind(remindProp,remindSort){
                this.stepInfo.stepFormInfo[remindSort] = remindProp;
            },
            // 告警方式配置，打开弹框
            openRemindDlg(remindProp,remindSort) {
                this.showRemindDlg(remindProp,remindSort, this.showRemind.bind(this));
            },

            showRemindDlg(remindProp,remindSort, actionOk) {
                this.$nav.showDialog(
                    RemindDef,
                    {
                        args: {remindProp,remindSort, actionOk},
                        width: '530px',
                        title: this.$dialog.formatTitle('通知方式配置',"edit"),
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
                    if (this.stepInfo[key]) {
                        this.stepInfo[key] = this.formObj && this.formObj[key] ? this.formObj[key] : this.stepInfo[key];
                    } else {
                        this.stepInfo[key] = this.formObj[key];
                    }
                }
                let activeRuleTableData = this.stepInfo.stepFormInfo.activeRuleTableData
                this.activeTerm = Object.keys(activeRuleTableData).length === 0 ? '1' : '2'
                this.warningNotice = this.stepInfo.stepFormInfo.warningRemind.length !== 0;
                this.timeoutNotice = this.stepInfo.stepFormInfo.timeoutRemind.length !== 0;
                this.finishtNotice = this.stepInfo.stepFormInfo.finishtRemind.length !== 0;
                this.exceptionNotice = this.stepInfo.stepFormInfo.exceptionRemind.length !== 0;
                let startDay = this.caseStepDef.startDay;
                let endDay = this.caseStepDef.endDay;
                this.dayChecked = !!(startDay || endDay)
            },

            // 保存表单数据
            saveForm() {
                if(this.timeType === '2'){
                    this.stepInfo.stepFormInfo.caseStepDef.warningMintues =   this.stepInfo.stepFormInfo.caseStepDef.warningMintues * 60
                }else if (this.timeType === '3'){
                    this.stepInfo.stepFormInfo.caseStepDef.warningMintues =   this.stepInfo.stepFormInfo.caseStepDef.warningMintues * 60 * 24
                }
                this.stepInfo.stepFormInfo.caseStepDef.stepActType = this.stepInfo.stepActType;
                this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                this.$emit('saveStepInfo', {optionType: this.optionType, stepInfo: this.stepInfo, taskArgs: this.args});
            },

            // 取消修改表单数据
            cancelForm() {
                this.$emit("cancelAction");
            },
        },
    }
</script>
