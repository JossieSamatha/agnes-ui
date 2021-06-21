<template>
    <div class="form-page">
        <div class="form__footer">
            <el-button class="primary" v-show="optionType!='view'" @click="saveForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
        <el-form ref="stepInfoForm" :disabled="optionType=='view'"  class="task-def-form" :rules="caseStepRules"
                 :model="caseStepDef" label-width="105px">
            <module-card title="任务内容" shadow="never">
                <template slot="content">
                    <el-form-item label="任务名称" prop="stepName">
                        <gf-input v-model.trim="caseStepDef.stepName" :max-byte-len="120"/>
                    </el-form-item>
                    <el-form-item label="任务编号" prop="stepCode">
                        <gf-input v-model="caseStepDef.stepCode" clear-regex="[^0-9]" :max-byte-len="8" :min-byte-len="8"
                                  placeholder="任务编号仅支持8位数字"/>
                    </el-form-item>
                    <el-form-item label="任务等级" prop="stepLevel">
                        <el-rate v-model="caseStepDef.stepLevel"
                                 :max="max"
                                 show-text
                                 :texts="texts"
                                 :colors="rateColor"
                        >
                        </el-rate>
                        <em class="el-icon-refresh-left" @click="caseStepDef.stepLevel = 0" v-show="optionType!='view'"></em>
                    </el-form-item>
                    <el-form-item label="任务说明" prop="stepRemark">
                        <gf-input v-model="caseStepDef.stepRemark" type="textarea"></gf-input>
                    </el-form-item>
                    <el-form-item label="任务类型" prop="stepActType">
                        <gf-dict v-model="stepInfo.stepActType" dictType="AGNES_CASE_STEPTYPE" @change="stepActTypeChange"></gf-dict>
                    </el-form-item>
                    <el-form-item v-if="stepInfo.stepActType === '1' || stepInfo.stepActType === '8'" label="执行逻辑选择" prop="stepActKey">
                        <el-select style="width: 100%" v-model="caseStepDef.stepActKey" placeholder="请选择" filterable clearable>
                            <gf-filter-option
                                    v-for="item in kpiOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </gf-filter-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="stepInfo.stepActType === '3'" label="流程定义选择" prop="stepActKey">
                        <!--                <el-select v-model="caseStepDef.stepActKey" placeholder="请选择">-->
                        <!--                    <el-option-->
                        <!--                            v-for="item in bpmnOptions"-->
                        <!--                            :key="item.value"-->
                        <!--                            :label="item.label"-->
                        <!--                            :value="item.value">-->
                        <!--                    </el-option>-->
                        <!--                </el-select>-->
                        <el-input v-model="caseStepDef.stepActKey"></el-input>
                    </el-form-item>
                    <el-form-item v-if="stepInfo.stepActType === '4'" label="机器人选择" prop="stepActKey">
                        <el-select style="width: 100%" v-model="caseStepDef.stepActKey" placeholder="请选择" filterable clearable>
                            <gf-filter-option
                                    v-for="item in rpaOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </gf-filter-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="stepInfo.stepActType === '6'" label="回填参数">
                        <div class="rule-table">
                            <el-table header-row-class-name="rule-header-row"
                                      header-cell-class-name="rule-header-cell"
                                      row-class-name="rule-row"
                                      cell-class-name="rule-cell"
                                      :data="this.paramList"
                                      border stripe
                                      :header-cell-style="{'text-align':'center'}">
                                style="width: 100%">
                                <el-table-column prop="accNo" label="参数关键字">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.paramKey"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="accNo" label="参数名称">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.paramName"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="market" label="参数类型">
                                    <template slot-scope="scope">
                                        <gf-dict filterable clearable v-model="scope.row.paramType" dict-type="TASK_DEF_DATATYPE"/>
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="option" label="操作" width="52" align="center">
                                    <template slot-scope="scope">
                                        <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button  @click="addRule()" class="rule-add-btn" size="small">新增</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="执行频率配置" v-if="stepInfo.stepActType === '1' || stepInfo.stepActType === '4' || stepInfo.stepActType === '8'" prop="execScheduler">
                        <el-button type="text" @click="editExecTime(caseStepDef.execScheduler,'执行频率配置')">
                            {{caseStepDef.execScheduler}}点击配置
                        </el-button>
                    </el-form-item>

                </template>
            </module-card>

            <module-card title="执行规则" shadow="never">
                <template slot="content">
                    <el-form-item label="执行开始时间" prop="step_startTime" style="width: 90%">
                        <div class="line none-shrink">
                            <el-input v-model.number="caseStepDef.startDay" v-show="startDayChecked === '1'" style="width: 10%;margin-right: 10px"></el-input>
                            <span v-show="startDayChecked === '1'" >天
                        </span>
                            <el-time-picker
                                    v-model="caseStepDef.startTime"
                                    :picker-options=startTimeForDay
                                    placeholder="执行开始时间"
                                    value-format="HH:mm" @change="timeChange" style="margin-left: 10px">
                            </el-time-picker>
                            <gf-strbool-checkbox v-model="startDayChecked" style="margin-left: 10px">跨日</gf-strbool-checkbox>
                        </div>
                        <gf-strbool-checkbox v-model="startStepRuleChecked" style="margin-left: 10px">自定义激活规则</gf-strbool-checkbox>
                    </el-form-item>
                    <el-form-item v-if="startStepRuleChecked == '1'">
                        <rule-table :isDisable="optionType=='view'" ref="activeRuleTable" confType="fn,step,event" :ruleTableData="stepInfo.stepFormInfo.activeRuleTableData"
                                    :ruleTargetOp="ruleTargetOp"></rule-table>
                    </el-form-item>
                    <el-form-item label="执行结束时间" prop="step_endTime" style="width: 90%">
                        <div class="line none-shrink">
                            <el-input v-model.number="caseStepDef.endDay" v-show="endDayChecked === '1'" style="width: 10%;margin-right: 10px"></el-input>
                            <span v-show="endDayChecked === '1'" >天
                        </span>
                            <el-time-picker
                                    v-model="caseStepDef.endTime"
                                    :picker-options=endTimeForDay
                                    placeholder="执行结束时间"
                                    value-format="HH:mm" @change="timeChange" style="margin-left: 10px">
                            </el-time-picker>
                            <gf-strbool-checkbox v-model="endDayChecked" style="margin-left: 10px">跨日</gf-strbool-checkbox>
                        </div>
                        <gf-strbool-checkbox v-model="timeoutRuleChecked" style="margin-left: 10px">自定义超时规则</gf-strbool-checkbox>
                    </el-form-item>
                    <el-form-item v-if="timeoutRuleChecked == '1'">
                        <rule-table :isDisable="optionType=='view'" ref="timeoutRuleTable" confType="fn,step,event" :ruleTableData="stepInfo.stepFormInfo.timeoutRuleTableData"></rule-table>
                    </el-form-item>
                    <el-form-item label="执行人" prop="" v-if="stepInfo.stepActType !== '3'">
                <gf-person-chosen ref="memberRef"
                                  :disabled="optionType=='view'"
                                  :memberRefList="this.memberRefList"
                                  chosenType="user, group, roster"
                                  :rosterDate="this.rosterDate"
                                  @getMemberList="getMemberList">
                </gf-person-chosen>
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
                        <rule-table :isDisable="optionType=='view'" ref="successRuleTable" confType="fn,step,event" :ruleTableData="stepInfo.stepFormInfo.successRuleTableData"
                                    :ruleTargetOp="ruleTargetOp"></rule-table>
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
                        <rule-table :isDisable="optionType=='view'" ref="failRuleTable" confType="fn,step,event" :ruleTableData="stepInfo.stepFormInfo.failRuleTableData"
                                    :ruleTargetOp="ruleTargetOp"></rule-table>
                    </el-form-item>
                    <el-form-item label="任务控制参数">
                        <gf-strbool-checkbox v-model="caseStepDef.isTodo">是否进入待办</gf-strbool-checkbox>
                        <gf-strbool-checkbox v-model="caseStepDef.allowManualConfirm">是否允许人工干预通过</gf-strbool-checkbox>
                        <!--                <gf-strbool-checkbox v-model="stepInitTypeBox1" @change="stepInitTypeChange1">任务分发</gf-strbool-checkbox>-->
                    </el-form-item>
                </template>
            </module-card>

            <module-card title="消息通知" shadow="never">
                <template slot="content">
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
                                <gf-input v-model="caseStepDef.warningMintues" style="width: 40%"></gf-input>
                                <el-select style="width: 20%" v-model="timeType" placeholder="请选择">
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
                                        <gf-filter-option
                                                v-for="item in errorTypeData"
                                                :key="item.dictId"
                                                :label="item.dictName"
                                                :value="item.dictId">
                                        </gf-filter-option>
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
                                        <gf-filter-option
                                                v-for="item in errorTypeData"
                                                :key="item.dictId"
                                                :label="item.dictName"
                                                :value="item.dictId">
                                        </gf-filter-option>
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
                </template>
            </module-card>
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
                    stepInitType: '0',    // 关联表创建方式
                    execMode: '1',
                    stepActKey: '',
                    stepId: '',
                    stepActParam1: '',
                    startDay: '',
                    startTime: '',
                    endDay: '',
                    endTime: '',
                    execScheduler: '00#01#01#* * * * * ?',
                    stepRemark: '',
                    allowManualConfirm: '0',
                    isRecordError: '',
                    errorType: '',
                    errorContent: '',
                    isRecordTimeoutError: '',
                    timeoutErrorType: '',
                    timeoutErrorContent: '',
                    isTodo:'0',
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
                timeoutRuleTableData: {},
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
                type: Object
            }
        },
        data() {
            return {
                memberRefList:[],
                rosterDate:'',
                stepInfo: resetForm(),
                paramList:[],
                caseKey:'',
                hisStepCode:'',
                initStepCode: '',
                texts: ['普通', '重要', '非常重要'],
                max: 3,
                startDayChecked: '0',  // 执行开始时间跨日
                endDayChecked: '0',  // 执行结束时间跨日
                timeoutRuleChecked: '0',  // 超时规则确认框
                startStepRuleChecked: '0',  // 激活规则确认框
                activeTerm: '1',
                timeType: '1',
                stepInitTypeBox1: '0',
                stepInitTypeBox2: '0',
                caseSteptype: [],
                kpiOptions:[],
                rpaOptions:[],
                bpmnOptions:[],
                serviceRes:[],
                startTimeForDay:null,
                endTimeForDay:null,
                flowData: [{
                    value: '1001',
                    label: '分TA流程'
                }, {
                    value: '1002',
                    label: '测试流程'
                }],
                dataType: [{value: ' 2001', label: '业务日期'}, {value: ' 2002', label: '系统日期'}],
                kpiData: [{value: ' 3001', label: 'FA指标'}, {value: ' 3002', label: 'TA指标'}],
                errorTypeData: [],
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
                ruleTypeOp: [{label: '默认规则', value: '0'}, {label: '自定义规则', value: '1'}],
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
                        {required: true, message: '任务等级必填', trigger: 'blur'},
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
                    ],
                    stepRemark: [
                        {required: true, message: '任务说明必填', trigger: 'blur'},
                    ]
                },
                ruleTargetOp: {
                   step: this.stepCodeArr
                },
            }
        },
        beforeMount(){
            this.startTimeForDay = {selectableRange:`00:00:00-${this.caseStepDef.endTime ? this.caseStepDef.endTime + ':00' : '23:59:59'}`};
            this.endTimeForDay = {selectableRange:`${this.caseStepDef.startTime ? this.caseStepDef.startTime + ':00' : '00:00:00'}-23:59:59`};
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
            // this.getBpmnData();
            // this.getRpaData();
            this.getKpiData();
            this.getServiceResponse();
            this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
            this.errorTypeData = this.$app.dict.getDictItems("AGNES_DOP_ERR_TYPE");
            this.rosterDate = window.bizDate
        },
        methods: {
            stepActTypeChange(){
                if(this.optionType == 'add'){
                    if(this.stepInfo.stepActType==='6'){
                        this.caseStepDef.allowManualConfirm = '1'
                    }else{
                        this.caseStepDef.allowManualConfirm = '0'
                    }
                }
            },
            getMemberList(val){
                this.memberRefList = val;
                this.stepInfo.stepFormInfo.caseStepDef.stepActOwner = JSON.stringify(val);
            },
            hasRepetCode(rule, value, callback) {
                const stepCodeArr = Object.keys(this.stepCodeArr);
                if (!value) {
                    callback(new Error('任务编号必填'));
                }else if(value.length !== 8){
                    callback(new Error('任务编号需为8位数字'));
                }else if(stepCodeArr.includes(value) && value !== this.hisStepCode){
                    callback(new Error('当前case中已含有相同任务编号，请勿重复'));
                }else{
                    callback();
                }
            },
            stepInitTypeChange1(val){
                if('1' === val){
                    this.caseStepDef.stepInitType = '1';
                }else {
                    this.caseStepDef.stepInitType = '0';
                }
            },

            async getParamList(){
                let repData = {caseKey:this.args.caseKey?this.args.caseKey:'',stepCode:this.caseStepDef.stepCode};
                const c = this.$api.motConfigApi.queryReCaseParams(repData);
                const resp = await this.$app.blockingApp(c);
                if(resp.data){
                    this.paramList = resp.data;
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
                if(serviceResData.data) {
                    const serviceResList = serviceResData.data;
                    serviceResList.forEach((item) => {
                        this.serviceRes.push({
                            label: item.serviceResponseName, value: item.serviceResponseId,
                            repeatMinutes: item.repeatMinutes, maxRepeatCount: item.maxRepeatCount
                        });
                    });
                }
            },
            async getKpiData(){
                const kpi = this.$api.kpiTaskApi.getAllKpiList();
                const kpiData = await this.$app.blockingApp(kpi);
                if(kpiData.data) {
                    const kpiList = kpiData.data
                    kpiList.forEach((item) => {
                        let kpiName = '(' + item.kpiCode + ')' + item.kpiName
                        this.kpiOptions.push({label: kpiName, value: item.kpiCode});
                    });
                }
            },
            async getRpaData(){
                const rpa = this.$api.flowTaskApi.queryAllRPAList();
                const rpaOptions = await this.$app.blockingApp(rpa);
                if(rpaOptions.data){
                    const rpaList = rpaOptions.data
                    rpaList.forEach((item)=>{
                        let robotName = item.robotName;
                        this.rpaOptions.push({label:robotName,value:item.robotId});
                    });
                }
            },
            async getBpmnData(){
                const bpmn = this.$api.BpmnApi.queryBpmnAll();
                const bpmnOptions = await this.$app.blockingApp(bpmn);
                if(bpmnOptions) {
                    bpmnOptions.forEach((item) => {
                        let bpmnName = '(' + item.key + ')' + item.title
                        this.bpmnOptions.push({label: bpmnName, value: item.key});
                    });
                }
            },
            // 回填参数新增、删除服务行
            addRule() {
                const newTableObj = {
                    paramKey:'',
                    paramName:'',
                    paramType:'',
                };
                this.paramList.push(newTableObj);
            },
            deleteRuleRow(rowIndex) {
                this.paramList.splice(rowIndex, 1);
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
                if(this.args.stepData){
                    this.stepInfo.stepActType = this.args.stepData;
                }
                this.resetFormFields();
                this.bizType = this.args.bizType;
                this.caseKey = this.args.caseKey?this.args.caseKey:'';
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
                if (this.optionType !== 'add') {
                    console.log(this.stepInfo.stepFormInfo.caseStepDef);
                    this.hisStepCode = JSON.parse(JSON.stringify(this.stepInfo.stepFormInfo.caseStepDef.stepCode));
                }
                this.initStepCode = this.stepInfo.stepFormInfo.caseStepDef.stepCode;
                this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                const activeRuleTableData = this.stepInfo.stepFormInfo.activeRuleTableData.ruleList || [];
                const successRuleTableData = this.stepInfo.stepFormInfo.successRuleTableData.ruleList || [];
                const failRuleTableData = this.stepInfo.stepFormInfo.failRuleTableData.ruleList || [];
                const timeoutRuleTableData = this.stepInfo.stepFormInfo.timeoutRuleTableData.ruleList || [];
                this.startStepRuleChecked = activeRuleTableData.length <= 0 ? '0' : '1'
                this.succeedRule = successRuleTableData.length <= 0 ? '0' : '1'
                this.abnormalRule = failRuleTableData.length <= 0 ? '0' : '1'
                this.timeoutRuleChecked = timeoutRuleTableData.length <= 0 ? '0' : '1'
                const startDay = this.caseStepDef.startDay;
                const endDay = this.caseStepDef.endDay;
                if (this.stepInfo.stepFormInfo.caseStepDef.stepInitType == '1') {
                    this.stepInitTypeBox1 = '1';
                }
                if(startDay){
                    this.startDayChecked = '1';
                }
                if(endDay){
                    this.endDayChecked = '1';
                }
                this.dayChecked = startDay || endDay ? '1': '0'
                if(this.stepInfo.stepActType=='6'){
                    this.getParamList();
                }
            },
            timeChange(){
                if(this.endDayChecked == '1' || this.startDayChecked == '1'){
                    this.startTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                    this.endTimeForDay = {selectableRange:'00:00:00-23:59:59'};
                }else {
                    this.startTimeForDay = {selectableRange:`00:00:00-${this.caseStepDef.endTime ? this.caseStepDef.endTime + ':00' : '23:59:59'}`};
                    this.endTimeForDay = {selectableRange:`${this.caseStepDef.startTime ? this.caseStepDef.startTime + ':00' : '00:00:00'}-23:59:59`};
                }
            },

            // 保存表单数据
            async saveForm() {
                try {
                    if(this.stepInfo.stepActType=='6'){
                        if(!this.caseStepDef.stepCode){
                            this.$message.warning("请填写step编号！");
                            return ;
                        }
                        let resData = {
                            paramList : this.paramList,
                            reTaskDef:{caseKey:this.caseKey},
                            stepCode:this.caseStepDef.stepCode,
                        };
                        if(this.paramList.length==0){
                            resData.isClear = true;
                            const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                            await this.$app.blockingApp(c);
                        }
                        if(this.paramList.length>0){
                            resData.isClear = false;
                            this.paramList.forEach((item)=>{
                                if(item.paramKey == ''){
                                    this.$message.warning("回填参数中，参数关键字必填！");
                                    return ;
                                }
                            });
                            if(this.hisStepCode != '' && this.caseStepDef.stepCode!=this.hisStepCode){
                                resData.hisStepCode = this.hisStepCode;
                            }
                            const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                            const resp1 = await this.$app.blockingApp(c);
                            if(resp1 && resp1.code == 'existKey'){
                                this.$msg.error(resp1.message);
                                return ;
                            }
                        }
                    }
                    } catch (reason) {
                        this.$msg.error(reason);
                    }
                if(!this.stepInfo.stepFormInfo.caseStepDef.stepActOwner){
                    this.$message.warning("请选择通知人员！");
                    return ;
                }
                if(this.startDayChecked == '1' && !this.stepInfo.stepFormInfo.caseStepDef.startDay){
                    this.$message.warning("请输入执行开始时间的跨日天数！");
                    return ;
                }
                if(this.endDayChecked == '1' && !this.stepInfo.stepFormInfo.caseStepDef.endDay){
                    this.$message.warning("请输入执行结束时间的跨日天数！");
                    return ;
                }
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
                    if (this.startStepRuleChecked === '0') {
                        this.stepInfo.stepFormInfo.activeRuleTableData = {}
                    }
                    if (this.timeoutRuleChecked === '0') {
                        this.stepInfo.stepFormInfo.timeoutRuleTableData = {}
                    }
                    if(this.stepInfo.stepFormInfo.activeRuleTableData
                        && this.stepInfo.stepFormInfo.activeRuleTableData.ruleList){
                        const activeRuleJson = this.$refs.activeRuleTable.jsonFormatter();
                        this.stepInfo.stepFormInfo.activeRuleTableData.ruleBody = activeRuleJson;
                    }
                    if(this.stepInfo.stepFormInfo.successRuleTableData
                        && this.stepInfo.stepFormInfo.successRuleTableData.ruleList){
                        const successRuleJson = this.$refs.successRuleTable.jsonFormatter();
                        this.stepInfo.stepFormInfo.successRuleTableData.ruleBody = successRuleJson;
                    }
                    if(this.stepInfo.stepFormInfo.timeoutRuleTableData
                        && this.stepInfo.stepFormInfo.timeoutRuleTableData.ruleList){
                        const timeoutRuleJson = this.$refs.timeoutRuleTable.jsonFormatter();
                        this.stepInfo.stepFormInfo.timeoutRuleTableData.ruleBody = timeoutRuleJson;
                    }
                    if(this.stepInfo.stepFormInfo.failRuleTableData
                        && this.stepInfo.stepFormInfo.failRuleTableData.ruleList){
                        const failRuleJson = this.$refs.failRuleTable.jsonFormatter();
                        this.stepInfo.stepFormInfo.failRuleTableData.ruleBody = failRuleJson;
                    }
                    this.stepInfo.stepName = this.stepInfo.stepFormInfo.caseStepDef.stepName;
                    this.stepInfo.stepFormInfo.caseStepDef.stepActType = this.stepInfo.stepActType;
                    this.stepInfo.stepFormInfo.caseStepDef.stepName = this.stepInfo.stepName;
                    this.stepInfo.stepFormInfo.caseStepDef.stepActOwner = JSON.stringify(this.memberRefList);
                    this.stepInfo.initialStepCode = this.initStepCode;
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
            'stepInfo.stepActType'(val){
                if(!val.match(/1|4|8/)){
                    this.caseStepDef.stepActKey = "";
                    this.caseStepDef.execScheduler = "";
                }
            },
            'endDayChecked'(val){
                if (val==='0') {
                    this.caseStepDef.endDay = '';
                }
                this.timeChange();
            },
            'startDayChecked'(val){
                if (val==='0'){
                    this.caseStepDef.startDay = '';
                }
                this.timeChange();
            }
        }
    }
</script>

<style scoped>
    .el-icon-refresh-left {
        color: #0f5eff;
        margin-left:10px;
        vertical-align: text-top;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
</style>
