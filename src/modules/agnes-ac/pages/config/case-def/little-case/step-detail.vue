<template>
    <div class="form-page">
        <div class="form__footer">
            <el-button class="primary" @click="saveForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
        <el-form ref="stepInfoForm"  class="task-def-form" :rules="caseStepRules"
                 :model="caseStepDef" label-width="105px">
            <el-form-item label="任务名称" prop="stepName">
                <gf-input v-model.trim="caseStepDef.stepName" :max-byte-len="120"/>
            </el-form-item>
            <el-form-item label="任务等级" prop="stepLevel">
                <el-rate v-model="caseStepDef.stepLevel"
                         :max="max"
                         show-text
                         :texts="texts"
                         :colors="rateColor">
                </el-rate>
            </el-form-item>
            <el-form-item label="任务编号" prop="stepCode">
                <gf-input v-model="caseStepDef.stepCode" clear-regex="[^0-9]" :max-byte-len="8" :min-byte-len="8"
                          placeholder="任务编号仅支持8位数字"/>
            </el-form-item>
            <el-form-item label="业务场景" prop="bizType">
                <gf-dict filterable clearable v-model="bizType" dict-type="AGNES_BIZ_CASE" :disabled="true"/>
            </el-form-item>
            <el-form-item label="业务标签" prop="bizTag">
                <el-select class="multiple-select" v-model="caseStepDef.stepTag"
                           multiple filterable clearable
                           default-first-option placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.dictId"
                            :label="item.dictName"
                            :value="item.dictId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务说明" prop="stepRemark">
                <gf-input v-model="caseStepDef.stepRemark" type="textarea"></gf-input>
            </el-form-item>
            <el-form-item label="执行时间配置" class="is-required">
                <div class="line none-shrink">
                    <el-form-item prop="startTime">
                        <el-time-picker v-model="caseStepDef.startTime"
                                        :picker-options=startTimeForDay
                                        placeholder="任意时间点"
                                        value-format="HH:mm" format="HH:mm">
                        </el-time-picker>
                    </el-form-item>
                    <span style="margin: 0 10px">~</span>
                    <el-form-item prop="endTime">
                        <el-time-picker v-model="caseStepDef.endTime"
                                        :picker-options=endTimeForDay
                                        placeholder="任意时间点"
                                        value-format="HH:mm" format="HH:mm">
                        </el-time-picker>
                    </el-form-item>
                    <gf-strbool-checkbox v-model="dayChecked" style="margin-left: 10px">跨日</gf-strbool-checkbox>
                </div>
            </el-form-item>
            <el-form-item label="通知人员" prop="">
                <gf-person-chosen ref="memberRef"
                                  :memberRefList="this.memberRefList"
                                  chosenType="user, group, roster"
                                  :rosterDate="this.rosterDate"
                                  @getMemberList="getMemberList">
                </gf-person-chosen>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '1'" label="执行逻辑选择" prop="stepActKey">
                <el-select style="width: 100%" v-model="caseStepDef.stepActKey" placeholder="请选择" filterable clearable>
                    <gf-filter-option
                            v-for="item in kpiOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="stepInfo.stepActType === '3'" label="流程定义" prop="stepActKey">
                <el-select v-model="caseStepDef.stepActKey" placeholder="请选择">
                    <el-option
                            v-for="item in flowData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执行频率配置" v-if="stepInfo.stepActType === '1'" prop="execScheduler">
                <el-button type="text" @click="editExecTime(caseStepDef.execScheduler,'执行频率配置')">
                    {{caseStepDef.execScheduler}}点击配置
                </el-button>
            </el-form-item>
            <el-form-item label="任务控制参数">
                <gf-strbool-checkbox v-model="caseStepDef.isTodo">是否进入待办</gf-strbool-checkbox>
                <gf-strbool-checkbox v-model="caseStepDef.forcePass">是否允许人工强制通过</gf-strbool-checkbox>
            </el-form-item>
            <el-form-item label="消息通知参数">
                <span class="default-checked">系统内部消息</span>
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
                        <el-form size="small" label-width="100px" v-show="msgInformItem === '0'">
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
                        <el-form size="small" label-width="100px" v-show="msgInformItem === '1'">
                            <el-form-item label="完成通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.finishRemind,'finishRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-form size="small" label-width="100px" v-show="msgInformItem === '2'">
                            <el-form-item label="超时通知配置">
                                <el-button type="text" @click="openRemindDlg(stepInfo.stepFormInfo.timeoutRemind,'timeoutRemind')">
                                    点击配置通知方式
                                </el-button>
                            </el-form-item>
                            <el-form-item label-width="113px"  label="服务水平承诺">
                                <el-select style="width: 30%" v-model="stepInfo.stepFormInfo.serviceResponseId" placeholder="请选择" @change="serviceResChange">
                                    <el-option
                                            v-for="item in serviceRes"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>按照每隔
                                <gf-input :value= "repeatMinutes" style="width: 10%" :disabled="true"></gf-input>分钟，执行
                                <gf-input :value= "maxRepeatCount" style="width: 15%" :disabled="true"></gf-input>次后退出
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
                        <el-form size="small" label-width="100px" v-show="msgInformItem === '3'">
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
            <el-form-item v-if="activeTerm === '2'">
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
            <el-form-item v-if="succeedRule === '1'">
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
            <el-form-item v-if="abnormalRule === '1'">
                <rule-table ref="ruleTable" :ruleTableData="stepInfo.stepFormInfo.failRuleTableData"></rule-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import dateUtils from "@hex/gf-ui/src/util/date-utils"
    function resetForm() {
        return {
            stepName: '',
            defType: "step",
            stepActType: '1',
            stepId: '',
            stepFormInfo: {
                caseStepDef: {
                    dayendDefId: '',
                    stepLevel: 1,
                    stepTag: '',
                    stepActOwner: '',
                    execMode: '1',
                    stepActKey: '',
                    stepActParam1: '',
                    startDay: '',
                    startTime: '',
                    endDay: '',
                    endTime: '',
                    execScheduler: '00#01#01#* * * * * ?',
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
                finishRemind: [],
                timeoutRemind: [],
                serviceResponseId: '',
                warningRemind: [],
                failRuleTableData: {},
                successRuleTableData: {},
                activeRuleTableData: {},
            },

        };
    }

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
            },
            stepCodeArr: {
                type: Array
            }
        },
        data() {
            return {
                memberRefList:[],
                rosterDate:'',
                stepInfo: resetForm(),
                initStepCode: '',
                texts: ['普通', '重要', '非常重要'],
                max: 3,
                forcePass: false,
                dayChecked: '0',
                activeTerm: '1',
                timeType: '1',
                caseSteptype: [],
                kpiOptions:[],
                serviceRes:[],
                startTimeForDay:'',
                endTimeForDay:'',
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
                    {label: '异常通知', value: '3'}],
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
                repeatMinutes: '',
                maxRepeatCount: '',
                rateColor: {1: {value: '#409EFF'}, 2: {value: '#E6A23C'}, 3: {value: '#F00'}},
                caseStepRules: {
                    stepName: [
                        {required: true, message: '任务名称必填', trigger: 'blur'},
                    ],
                    dayendDefId: [
                        {required: true, message: '基准日期必填', trigger: 'change'},
                    ],
                    stepLevel: [
                        {required: true, message: '任务等级必填', trigger: 'change'},
                    ],
                    stepCode: [
                        {validator: this.hasRepetCode, required: true, trigger: 'change'},
                    ],
                    startTime: [
                        {required: true, message: '运行周期开始时间必填', trigger: 'blur'},
                    ],
                    endTime: [
                        {required: true, message: '运行周期结束时间必填', trigger: 'blur'},
                    ],
                    execScheduler: [
                        {required: true, message: '指标执行频率必填', trigger: 'blur'},
                    ]
                }
            }
        },
        beforeMount(){
            if(this.args.stepList){
                let stepActOwner = this.args.stepList[this.args.stepIndex].stepFormInfo.caseStepDef.stepActOwner;
                if(stepActOwner){
                    this.memberRefList = JSON.parse(stepActOwner);
                }
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
                if (this.optionType !== 'add') {
                    this.onLoadForm();
                }
                this.msgInfoStr.forEach((strItem, index)=>{
                    if(this.stepInfo.stepFormInfo[strItem] && this.stepInfo.stepFormInfo[strItem].length>0){
                        this.msgInformParam.push(index+'');
                    }
                });
            });
            this.getKpiData();
            this.getServiceResponse();
            this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
            this.rosterDate = dateUtils.formatDate(new Date(),'yyyy-mm-dd')
        },
        methods: {
            getMemberList(val){
                this.memberRefList = val;
                this.stepInfo.stepFormInfo.caseStepDef.stepActOwner = JSON.stringify(val);
            },
            hasRepetCode(rule, value, callback) {
                if (!value) {
                    callback(new Error('任务编号必填'));
                }else if(value.length !== 8){
                    callback(new Error('任务编号需为8位数字'));
                }else if(this.stepCodeArr.includes(value) && value !== this.initStepCode){
                    callback(new Error('当前case中已含有相同任务编号，请勿重复'));
                }else{
                    callback();
                }
            },

            async serviceResChange(param){
                this.serviceRes.forEach((item)=>{
                    if(item.value === param){
                        this.repeatMinutes = item.repeatMinutes
                        this.maxRepeatCount = item.maxRepeatCount
                        return
                    }
                });
            },
            async getServiceResponse(){
                const serviceRes = this.$api.flowTaskApi.getServiceResponse();
                const serviceResData = await this.$app.blockingApp(serviceRes);
                const serviceResList = serviceResData.data;
                serviceResList.forEach((item)=>{
                    this.serviceRes.push({label:item.serviceResponseName,value:item.serviceResponseId,
                        repeatMinutes:item.repeatMinutes,maxRepeatCount:item.maxRepeatCount});
                });
            },
            async getKpiData(){
                const kpi = this.$api.kpiTaskApi.getAllKpiList();
                const kpiData = await this.$app.blockingApp(kpi);
                const kpiList = kpiData.data
                kpiList.forEach((item)=>{
                    this.kpiOptions.push({label:item.kpiName,value:item.kpiCode});
                });
            },
            editExecTime( execScheduler,title) {
                this.showDlg(execScheduler,title, this.setExecScheduler.bind(this));
            },
            showDlg(cornObj,title, action) {
                if (this.mode === 'view') {
                    return;
                }
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {
                            cornObj: cornObj,
                            action,
                            showType:'second,minute,extSetting'
                        },
                        width: '530px',
                        title: this.$dialog.formatTitle(title, "edit"),
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
                    'remind-def',
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
                this.bizType = this.args.bizType;
                this.bizTagArr = this.args.bizTagArr;
            },

            onLoadForm() {
                for (let key in this.formObj) {
                    if (this.stepInfo[key]) {
                        this.stepInfo[key] = this.formObj && this.formObj[key] ? this.formObj[key] : this.stepInfo[key];
                    } else {
                        this.stepInfo[key] = this.formObj[key];
                    }
                }
                this.initStepCode = this.stepInfo.stepFormInfo.caseStepDef.stepCode;
                this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                const activeRuleTableData = this.stepInfo.stepFormInfo.activeRuleTableData.ruleList || [];
                const successRuleTableData = this.stepInfo.stepFormInfo.successRuleTableData.ruleList || [];
                const failRuleTableData = this.stepInfo.stepFormInfo.failRuleTableData.ruleList || [];
                this.activeTerm = activeRuleTableData.length <= 0 ? '1' : '2'
                this.succeedRule = successRuleTableData.length <= 0 ? '0' : '1'
                this.abnormalRule = failRuleTableData.length <= 0 ? '0' : '1'
                const startDay = this.caseStepDef.startDay;
                const endDay = this.caseStepDef.endDay;
                this.dayChecked = startDay || endDay ? '1': '0'
            },

            // 保存表单数据
            saveForm() {
                this.$refs['stepInfoForm'].validate(valid=> {
                    if (!valid) {
                        return;
                    }
                    if (this.timeType === '2') {
                        this.stepInfo.stepFormInfo.caseStepDef.warningMintues = this.stepInfo.stepFormInfo.caseStepDef.warningMintues * 60
                    } else if (this.timeType === '3') {
                        this.stepInfo.stepFormInfo.caseStepDef.warningMintues = this.stepInfo.stepFormInfo.caseStepDef.warningMintues * 60 * 24
                    }
                    if (this.succeedRule === '0') {
                        this.stepInfo.stepFormInfo.successRuleTableData = {}
                    }
                    if (this.abnormalRule === '0') {
                        this.stepInfo.stepFormInfo.failRuleTableData = {}
                    }
                    if (this.activeTerm === '1') {
                        this.stepInfo.stepFormInfo.activeRuleTableData = {}
                    }
                    this.stepInfo.stepName = this.stepInfo.stepFormInfo.caseStepDef.stepName;
                    this.stepInfo.stepFormInfo.caseStepDef.stepActType = this.stepInfo.stepActType;
                    this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                    this.stepInfo.stepFormInfo.caseStepDef.stepActOwner = JSON.stringify(this.memberRefList);
                    this.stepInfo.stepCodeChange = this.initStepCode !== this.stepInfo.stepFormInfo.caseStepDef.stepCode;
                    this.$emit('saveStepInfo', {
                        optionType: this.optionType,
                        stepInfo: this.stepInfo,
                        taskArgs: this.args
                    });
                })
            },

            // 取消修改表单数据
            cancelForm() {
                this.$emit("cancelAction");
            },
        },
        watch: {
            'dayChecked'(val){
                if (val==='1') {
                    this.endTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                    this.startTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                    this.caseStepDef.endDay = '1';
                    this.caseStepDef.startDay = '0';
                } else {
                    this.endTimeForDay = {selectableRange:`${this.caseStepDef.startTime ? this.caseStepDef.startTime + ':00' : '00:00:00'}-23:59:59`};
                    this.startTimeForDay = {selectableRange:`00:00:00-${this.caseStepDef.endTime ? this.caseStepDef.endTime + ':00' : '23:59:59'}`};
                    this.caseStepDef.endDay = '';
                    this.caseStepDef.startDay = '';
                    this.caseStepDef.endTime = '';
                }
            }
        }
    }
</script>