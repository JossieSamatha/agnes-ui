<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="任务名称" prop="taskName">
            <gf-input v-model.trim="detailForm.taskName" placeholder="任务名称"/>
        </el-form-item>
        <el-form-item label="任务等级" prop="stepLevel">
            <el-rate v-model="detailForm.stepLevel" show-text
                     :max="3"
                     :low-threshold="1"
                     :high-threshold="3"
                     :texts="['一般', '重要', '紧急']"
                     :colors="detailForm.rateColor">
            </el-rate>
        </el-form-item>
        <el-form-item label="任务编号" prop="caseKey">
            <gf-input v-model.trim="detailForm.caseKey" placeholder="任务编号" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="业务场景" prop="bizType">
            <gf-dict filterable clearable v-model="detailForm.bizType" dict-type="AGNES_BIZ_CASE"/>
        </el-form-item>
        <el-form-item label="业务标签" prop="bizTag">
            <el-select class="multiple-select" v-model="detailForm.bizTagArr"
                       filterable clearable multiple
                       placeholder="请选择">
                <gf-filter-option
                        v-for="item in bizTagOption"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="任务说明" prop="stepRemark">
            <gf-input type="textarea" v-model.trim="detailForm.stepRemark" placeholder="任务说明"/>
        </el-form-item>
        <el-form-item label="运行周期配置" prop="task_startTime">
            <div class="line none-shrink">
                <el-form-item prop="task_startTime">
                    <el-date-picker
                            v-model="detailForm.task_startTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptionsStart"
                            placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <span style="margin: 0 10px">~</span>
                <el-form-item prop="task_endTime">
                    <el-date-picker
                            v-model="detailForm.task_endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptionsEnd"
                            placeholder="结束日期" :disabled="startAllTime === '1'">
                    </el-date-picker>
                </el-form-item>
                <gf-strbool-checkbox v-model="startAllTime" style="margin-left: 10px">永久有效</gf-strbool-checkbox>
            </div>
        </el-form-item>
        <!--        <el-form-item label="基准日期" prop="dayendDefId">-->
        <!--            <gf-dict filterable clearable v-model="detailForm.dayendDefId" dict-type="AGNES_BASE_DATE" style="width: 30%;"/>-->
        <!--        </el-form-item>-->
        <el-form-item label="创建方式选择" prop="task_execMode">
            <el-radio-group v-model="detailForm.task_execMode">
                <el-radio label="1">按运行周期创建一次</el-radio>
                <el-radio label="2">按自定义频率创建</el-radio>
                <el-radio label="3">按外部事件触发时创建</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="detailForm.task_execMode==2">
            <el-form-item label="创建频率配置" prop="step_execScheduler">
                <el-button type="text" @click="editExecTime('task_execScheduler', detailForm.task_execScheduler)">
                    {{detailForm.task_execScheduler}}点击配置
                </el-button>
            </el-form-item>
        </template>
        <el-form-item label="外部事件选择" v-if="detailForm.task_execMode==3">
            <el-select v-model="detailForm.eventId" placeholder="请选择" filterable clearable style="width: 32%">
                <gf-filter-option
                        v-for="item in detailForm.eventOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="执行时间配置" prop="step_startTime">
            <div class="line none-shrink">
                <el-form-item prop="step_startTime">
                    <el-time-picker
                            v-model="detailForm.step_startTime"
                            :picker-options=startTimeForDay
                            placeholder="执行开始时间"
                            value-format="HH:mm" @change="startTimeChange">
                    </el-time-picker>
                </el-form-item>
                <span style="margin: 0 10px">~</span>
                <el-form-item prop="step_endTime">
                    <el-time-picker
                            v-model="detailForm.step_endTime"
                            :picker-options=endTimeForDay
                            placeholder="执行结束时间"
                            value-format="HH:mm" @change="endTimeChange">
                    </el-time-picker>
                </el-form-item>
                <gf-strbool-checkbox v-model="dayChecked" style="margin-left: 10px">跨日</gf-strbool-checkbox>
            </div>
        </el-form-item>
        <el-form-item label="通知人员">
            <gf-person-chosen ref="memberRef"
                              :memberRefList="this.memberRefList"
                              chosenType="user, group, roster"
                              :rosterDate="this.rosterDate"
                              @getMemberList="getMemberList">
            </gf-person-chosen>
        </el-form-item>
        <el-form-item label="任务控制参数">
            <gf-strbool-checkbox v-model="detailForm.needApprove">是否需要复核</gf-strbool-checkbox>
            <gf-strbool-checkbox v-model="detailForm.isTodo">是否进入待办</gf-strbool-checkbox>
            <gf-strbool-checkbox v-model="detailForm.forcePass">是否允许人工强制通过</gf-strbool-checkbox>
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
                    <el-form size="small" label-width="100px" v-show="msgInformItem == '0'">
                        <el-form-item label="提前通知配置">
                            <el-button type="text" @click="openRemindDlg(detailForm.warningRemind,'warningRemind')">
                                点击配置通知方式
                            </el-button>
                        </el-form-item>
                        <el-form-item label="预警时间">提前
                            <gf-input v-model="detailForm.warningMintues" style="width: 30%"></gf-input>
                            <el-select v-model="detailForm.warningTimeType" placeholder="请选择">
                                <el-option
                                        v-for="item in detailForm.timeTypeData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form size="small" label-width="100px" v-show="msgInformItem == '1'">
                        <el-form-item label="完成通知配置">
                            <el-button type="text" @click="openRemindDlg(detailForm.finishRemind,'finishRemind')"> 点击配置通知方式
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-form size="small" label-width="100px" v-show="msgInformItem == '2'">
                        <el-form-item label="超时通知配置">
                            <el-button type="text" @click="openRemindDlg(detailForm.timeoutRemind,'timeoutRemind')"> 点击配置通知方式
                            </el-button>
                        </el-form-item>
                        <el-form-item label="服务水平承诺">
                            <el-select v-model="detailForm.serviceResponseId" placeholder="请选择" @change="serviceResChange">
                                <el-option
                                        v-for="item in serviceRes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            按照每隔
                            <gf-input  :value="repeatMinutes" style="width: 20%" :disabled="true"></gf-input>分钟，执行
                            <gf-input  :value="maxRepeatCount" style="width: 20%" :disabled="true"></gf-input>次后退出
                        </el-form-item>
                        <el-form-item label="异常记录">
                            <gf-strbool-checkbox v-model="detailForm.isRecordTimeoutError">记入异常
                            </gf-strbool-checkbox>
                        </el-form-item>
                        <el-form-item v-if="detailForm.isRecordTimeoutError === '1'">
                            <el-form-item label="异常类型">
                                <el-select v-model="detailForm.timeoutErrorType" placeholder="请选择">
                                    <el-option
                                            v-for="item in detailForm.errorTypeData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="异常内容">
                                <gf-input v-model="detailForm.timeoutErrorContent" type="textarea" :rows="1"></gf-input>
                            </el-form-item>
                        </el-form-item>
                    </el-form>
                    <el-form size="small" label-width="100px" v-show="msgInformItem == '3'">
                        <el-form-item label="异常通知配置">
                            <el-button type="text"  @click="openRemindDlg(detailForm.exceptionRemind,'exceptionRemind')"> 点击配置通知方式
                            </el-button>
                        </el-form-item>
                        <el-form-item label="异常记录">
                            <gf-strbool-checkbox v-model="detailForm.isRecordError">记录异常</gf-strbool-checkbox>
                        </el-form-item>
                        <el-form-item v-if="detailForm.isRecordError === '1'">
                            <el-form-item label="异常类型">
                                <el-select v-model="detailForm.errorType" placeholder="请选择">
                                    <el-option
                                            v-for="item in detailForm.errorTypeData"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="异常内容">
                                <gf-input v-model="detailForm.errorContent" type="textarea" :rows="1"></gf-input>
                            </el-form-item>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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
            <rule-table ref="ruleTable" :ruleTableData="detailForm.successRuleTableData"></rule-table>
        </el-form-item>
        <el-form-item label="异常规则">
            <el-radio-group v-model="abnormalRule">
                <el-radio v-for="ruleType in ruleErrorTypeOp"
                          :key="ruleType.value"
                          :label="ruleType.value">
                    {{ruleType.label}}
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="abnormalRule == '1'">
            <rule-table ref="ruleTable" :ruleTableData="detailForm.failRuleTableData"></rule-table>
        </el-form-item>
    </el-form>
</template>

<script>
    import loadsh from 'lodash';
    import staticData from '../../../util/dataFormat'
    import initData from '../../../util/initData'
    import dateUtils from "@hex/gf-ui/src/util/date-utils"

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
                rosterDate:'',
                memberRefList:[],
                serviceRes:[],
                staticData: staticData(),
                detailForm: initData(),
                dayChecked: '0',  // 跨日
                endTimeForDay:null,
                startTimeForDay:null,
                succeedRule: '0',
                abnormalRule: '0',
                repeatMinutes: '',
                maxRepeatCount: '',
                curExecScheduler: '',    // 当前频率对象字段
                msgInformParam: [],      // 消息通知参数类型数组
                startAllTime: '0',       // 是否永久有效
                bizTagOption: [],        // 业务类型下拉
                // 消息配置类型类型选项
                msgInformOp: [{label: '提前通知', value: '0'}, {label: '完成通知', value: '1'}, {label: '超时通知', value: '2'},
                    {label: '异常通知', value: '3'}],
                msgInfoStr: ['warningRemind', 'finishRemind', 'timeoutRemind', 'exceptionRemind'],
                // 规则选择类型选项
                ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
                ruleErrorTypeOp: [{label: '默认异常规则', value: '0'}, {label: '自定义异常规则', value: '1'}],
                detailFormRules: {
                    stepLevel: [
                        {required: true, message: '任务等级必填', trigger: 'blur'},
                    ],
                    taskName: [
                        {required: true, message: '任务名称必填', trigger: 'blur'},
                    ],
                    caseKey: [
                        {validator: this.hasRepetCode, required: true, trigger: 'change'},
                    ],
                    task_endTime: [
                        {required: true, message: '运行周期结束时间必填', trigger: 'blur'},
                    ],
                    // dayendDefId: [
                    //     {required: true, message: '基准日期必填', trigger: 'change'},
                    // ],
                    task_execMode: [
                        {required: true, message: '启动方式必填', trigger: 'blur'},
                    ],
                    task_execScheduler: [
                        {required: true, message: '任务创建频率必填', trigger: 'blur'},
                    ],
                    step_startTime: [
                        {required: true, message: '执行开始时间必填', trigger: 'change'},
                    ],
                    task_startTime: [
                        {required: true, message: '运行周期开始时间必填', trigger: 'blur'},
                    ],
                    stepRemark: [
                        {required: true, message: '任务说明必填', trigger: 'blur'},
                    ],
                    step_endTime: [
                        {required: true, message: '执行结束时间必填', trigger: 'change'},
                    ]
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        let beginDateVal = this.detailForm.task_startTime;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                            );
                        }
                    }
                },
                pickerOptionsStart: {
                    disabledDate: time => {
                        let endDateVal = this.detailForm.task_endTime;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                }
            }
        },
        beforeMount() {
            this.startTimeForDay = {selectableRange:`00:00:00-${this.detailForm.step_endTime ? this.detailForm.step_endTime + ':00' : '23:59:59'}`};
            this.endTimeForDay = {selectableRange:`${this.detailForm.step_startTime ? this.detailForm.step_startTime + ':00' : '00:00:00'}-23:59:59`};
            this.reDataTransfer();
            this.getOptions();
            this.getServiceResponse();
        },
        methods: {
            hasRepetCode(rule, value, callback) {
                if (!value) {
                    callback(new Error('任务编号必填'));
                }else if(value.length !== 8){
                    callback(new Error('任务编号需为8位数字'));
                }else{
                    callback();
                }
            },
            async getOptions(){
                this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
                const e = this.$api.eventlDefConfigApi.getEventDefList();
                const eventR = await this.$app.blockingApp(e);
                const eventList = eventR.data
                eventList.forEach((item)=>{
                    this.detailForm.eventOptions.push({label:item.eventName,value:item.eventId});
                });
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
                const serviceRes = this.$api.kpiTaskApi.getServiceResponse();
                const serviceResData = await this.$app.blockingApp(serviceRes);
                const serviceResList = serviceResData.data;
                serviceResList.forEach((item)=>{
                    this.serviceRes.push({label:item.serviceResponseName,value:item.serviceResponseId,
                        repeatMinutes:item.repeatMinutes,maxRepeatCount:item.maxRepeatCount});
                });
            },
            getMemberList(val){
                this.memberRefList = val;
                this.detailForm.stepActOwner = JSON.stringify(val);
            },
            editExecTime(curObj, execScheduler) {
                this.curExecScheduler = curObj;
                this.showDlg(execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(data, action) {
                if (this.mode === 'view') {
                    return;
                }
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {cornObj: data, action},
                        width: '530px',
                        title: this.$dialog.formatTitle('创建频率配置', "edit"),
                    }
                );
            },
            setExecScheduler(cron) {
                this.detailForm[this.curExecScheduler] = cron;
            },
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                if(this.row.isCheck){
                    let resData = this.dataTransfer();
                    resData.isPass = '0';
                    const p = this.$api.kpiTaskApi.checkTask(resData);
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                }
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let resData = this.dataTransfer();
                    resData.reTaskDef.taskType = '6'
                    if(this.row.isCheck){
                        resData.isPass = '1';
                        const p = this.$api.kpiTaskApi.checkTask(resData);
                        await this.$app.blockingApp(p);
                        this.$msg.success('审核成功');
                    }else {
                        const p = this.$api.motConfigApi.saveTask(resData);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功');
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },


            async showRemind(remindProp,remindSort){
                this.detailForm[remindSort] = remindProp;
            },
            // 告警方式配置，打开弹框
            openRemindDlg(remindProp,remindSort) {
                this.showRemindDlg(remindProp,remindSort, this.showRemind.bind(this));
            },
            showRemindDlg(remindProp,remindSort, actionOk) {
                this.$nav.showDialog(
                    'remind-def',
                    {
                        args: {remindProp, remindSort, actionOk},
                        width: '530px',
                        title: this.$dialog.formatTitle('通知方式配置', "edit"),
                    }
                );
            },

            // 数据结构转换
            dataTransfer() {
                //完成规则判断是否勾选
                if(this.succeedRule==='0'){
                    this.detailForm.successRuleTableData={}
                }
                if(this.abnormalRule==='0'){
                    this.detailForm.failRuleTableData={}
                }
                //消息通知参数判断是否勾选
                if(this.msgInformParam.indexOf('0') === -1){
                    this.detailForm.warningRemind=[];
                }
                if(this.msgInformParam.indexOf('1') === -1){
                    this.detailForm.finishRemind=[];
                }
                if(this.msgInformParam.indexOf('2') === -1){
                    this.detailForm.timeoutRemind=[];
                }
                if(this.msgInformParam.indexOf('3') === -1){
                    this.detailForm.exceptionRemind=[];
                }
                let kpiTaskDef = this.$utils.deepClone(this.staticData.kpiTaskDef);
                this.detailForm.bizTag = this.detailForm.bizTagArr.join(",");
                this.detailForm.stepCode = this.detailForm.caseKey;
                this.detailForm.caseDefKey = this.detailForm.caseKey;
                this.keyToValue(kpiTaskDef, 'task_');
                let caseDef = this.$utils.deepClone(this.staticData.caseDef);
                let defId = this.$agnesUtils.randomString(32);
                let defName = this.detailForm.taskName;
                this.detailForm.stepName = defName;
                caseDef.stages[0].defId = defId;
                caseDef.stages[0].children[0].stepId = defId;
                caseDef.stages[0].defName = defName;
                caseDef.stages[0].children[0].stepName = defName;
                let stepFormInfo = this.$utils.deepClone(this.staticData.caseDef.stages[0].children[0].stepFormInfo);
                Object.keys(stepFormInfo).forEach((key) => {
                    if (key === 'caseStepDef') {
                        this.keyToValue(stepFormInfo.caseStepDef, 'step_');
                    } else {
                        stepFormInfo[key] = this.detailForm[key] || stepFormInfo[key];
                    }
                })
                caseDef.stages[0].children[0].stepFormInfo = stepFormInfo;
                return {reTaskDef: kpiTaskDef, caseDefId: this.row.caseDefId, caseDefBody: JSON.stringify(caseDef),versionId:this.detailForm.versionId};
            },

            reDataTransfer() {
                this.rosterDate = dateUtils.getNowFormatDate();
                if (this.mode && this.mode !== 'add') {
                    let kpiTaskDef = this.$utils.deepClone(this.row.reTaskDef);
                    this.reKeyToValue(kpiTaskDef, 'task_');
                    let caseDefBody = JSON.parse(this.row.caseDefBody);
                    let stepFormInfo = this.$utils.deepClone(caseDefBody.stages[0].children[0].stepFormInfo);
                    Object.keys(stepFormInfo).forEach((key) => {
                        if (key === 'caseStepDef') {
                            this.reKeyToValue(stepFormInfo.caseStepDef, 'step_');
                        } else {
                            this.detailForm[key] = stepFormInfo[key] || this.detailForm[key];
                        }
                    })
                    if(this.detailForm.stepActOwner){
                        this.memberRefList = JSON.parse(this.detailForm.stepActOwner);
                    }
                    if (this.detailForm.task_endTime === '9999-12-31') {
                        this.startAllTime = true;
                    }
                    if (this.detailForm.bizTag) {
                        this.detailForm.bizTagArr = this.detailForm.bizTag.split(",");
                    }
                    if(!loadsh.isEmpty(this.detailForm.successRuleTableData)){
                        this.succeedRule ='1'
                    }
                    if(!loadsh.isEmpty(this.detailForm.failRuleTableData)){
                        this.abnormalRule ='1'
                    }
                    if(this.detailForm.endDay === '1' && this.detailForm.startDay === '0'){
                        this.dayChecked = '1';
                    }
                    //消息通知参数回显
                    this.msgInfoStr.forEach((strItem, index)=>{
                        if(this.detailForm[strItem] && this.detailForm[strItem].length>0){
                            this.msgInformParam.push(index+'');
                        }
                    });
                }
            },

            keyToValue(obj, type) {
                Object.keys(obj).forEach((key) => {
                    const extraKeyArr = ['startTime', 'endTime', 'execMode', 'execScheduler'];
                    if (extraKeyArr.indexOf(key) === -1) {
                        obj[key] = this.detailForm[key] || obj[key];
                    } else {
                        obj[key] = this.detailForm[type + key] || obj[key];
                    }
                });
            },

            reKeyToValue(obj, type) {
                Object.keys(obj).forEach((key) => {
                    const extraKeyArr = ['startTime', 'endTime', 'execMode', 'execScheduler'];
                    if (extraKeyArr.indexOf(key) === -1) {
                        this.detailForm[key] = obj[key] || this.detailForm[key];
                    } else {
                        this.detailForm[type + key] = obj[key] || this.detailForm[key];
                    }
                });
            },
            endTimeChange(){
                if(this.dayChecked == '1'){
                    this.startTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                }else {
                    this.startTimeForDay = {selectableRange:`00:00:00-${this.detailForm.step_endTime ? this.detailForm.step_endTime + ':00' : '23:59:59'}`};
                }
            },
            startTimeChange(){
                if(this.dayChecked == '1'){
                    this.endTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                }else {
                    this.endTimeForDay = {selectableRange:`${this.detailForm.step_startTime ? this.detailForm.step_startTime + ':00' : '00:00:00'}-23:59:59`};
                }
            }
        },

        watch: {
            'startAllTime'(val) {
                if (val) {
                    this.detailForm.task_endTime = '9999-12-31'
                } else {
                    this.detailForm.task_endTime = ''
                }
            },
            'detailForm.task_execMode'(val){
                if(val === '2'){
                    this.detailForm.eventId = '';
                }else if(val === '3'){
                    this.detailForm.task_execScheduler= ''
                }else {
                    this.detailForm.eventId = '';
                    this.detailForm.task_execScheduler= ''
                }
            },
            'dayChecked'(val){
                if (val==='1') {
                    this.endTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                    this.startTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                    this.detailForm.endDay = '1';
                    this.detailForm.startDay = '0';
                } else {
                    this.endTimeForDay = {selectableRange:`${this.detailForm.step_startTime ? this.detailForm.step_startTime + ':00' : '00:00:00'}-23:59:59`};
                    this.startTimeForDay = {selectableRange:`00:00:00-${this.detailForm.step_endTime ? this.detailForm.step_endTime + ':00' : '23:59:59'}`};
                    this.detailForm.endDay = '';
                    this.detailForm.startDay = '';
                    this.detailForm.step_endTime = '';
                }
            }
        }
    }
</script>
