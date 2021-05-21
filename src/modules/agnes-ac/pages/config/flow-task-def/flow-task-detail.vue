<template>
    <el-form ref="taskDefForm" class="taskDefForm" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px" style="max-width: 850px">
        <el-form-item label="任务名称" prop="taskName">
            <gf-input v-model.trim="detailForm.taskName" placeholder="任务名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="任务编号" prop="caseKey">
            <gf-input v-model.trim="detailForm.caseKey" placeholder="任务编号" clear-regex="[^0-9]" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="任务图标" prop="taskIcon">
            <gf-input v-model.trim="detailForm.taskIcon"
                      placeholder="任务图标"
                      style="width: calc(100% - 30px); margin-right: 10px"
            />
            <el-popover placement="bottom"
                    title="图标库使用"
                    width="220"
                    trigger="click"
                    popper-class="question-popover">
                <el-button slot="reference"
                           icon="fa fa-question-circle-o"
                           style="border: none;padding: 0;font-size: 20px;vertical-align: middle"
                ></el-button>
                <p>图标库中选择需要的图标对应名称，前面加上【fa fa-】前缀即可。</p>
                <p>如：<span><em class="fa fa-bus"></em> bus</span>填写为【fa fa-bus】</p>
                <p>图标库链接地址为：
                    <a href="https://fontawesome.dashgame.com/" target="_blank" rel="noopener noreferrer" style="color: #4183C4;">点我跳转</a>
                </p>
            </el-popover>
        </el-form-item>
        <el-form-item label="流程类型" prop="flowType">
            <gf-dict filterable clearable v-model="detailForm.flowType" dict-type="AGNES_CASE_FLOWTYPE"/>
        </el-form-item>
        <el-form-item label="业务场景" prop="bizType">
            <gf-dict filterable clearable v-model="detailForm.bizType" dict-type="AGNES_BIZ_CASE"/>
        </el-form-item>
        <el-form-item label="业务标签" prop="bizTag">
            <el-select style="width: 100%" v-model="detailForm.bizTagArr" placeholder="请选择" filterable clearable multiple>
                <gf-filter-option
                        v-for="item in bizTagOption"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="运行周期配置" prop="startTime">
            <div class="line none-shrink">
                <el-form-item prop="startTime">
                    <el-date-picker
                            v-model="detailForm.startTime"
                            :picker-options="pickerOptionsStart"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <span style="margin: 0 10px">~</span>
                <el-form-item prop="endTime">
                    <el-date-picker
                            v-model="detailForm.endTime"
                            :picker-options="pickerOptionsEnd"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期" :disabled="startAllTime">
                    </el-date-picker>
                </el-form-item>
                <el-checkbox v-model="startAllTime" style="margin-left: 10px">永久有效</el-checkbox>
            </div>
        </el-form-item>
        <el-form-item label="创建方式选择" prop="execMode">
            <el-radio-group v-model="detailForm.execMode">
                <el-radio label="1">按运行周期创建一次</el-radio>
                <el-radio label="2">按自定义频率创建</el-radio>
                <el-radio label="3">按外部事件触发时创建</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="创建频率配置" v-if="detailForm.execMode==='2'" prop="execScheduler">
            <el-button type="text" @click="editExecTime(detailForm.execScheduler,'创建频率配置')">
                {{detailForm.execScheduler}}点击配置
            </el-button>
        </el-form-item>
        <el-form-item label="外部事件选择" v-if="detailForm.execMode==='3'">
            <el-select v-model="detailForm.eventId" placeholder="请选择" filterable clearable>
                <gf-filter-option
                        v-for="item in eventOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="取值参数列表" v-if="hasEventParam">
            <div class="rule-table">
                <el-table :data="eventParam"
                          :header-cell-style="{'text-align':'center'}"
                          border
                          cell-class-name="rule-cell"
                          header-cell-class-name="rule-header-cell"
                          header-row-class-name="rule-header-row" row-class-name="rule-row"
                          stripe>
                    style="width: 100%">
                    <el-table-column label="参数代码">
                        <template slot-scope="scope">
                            <el-input :disabled="true" v-model="scope.row.fieldKey"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="参数名称">
                        <template slot-scope="scope">
                            <el-input :disabled="true" v-model="scope.row.fieldName"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form-item>
        <el-form-item label="取值参数选择" v-if="!hasEventParam">
            <biz-param-chosen
                    :paramRefList="this.paramRefList"
                    @getParamList="getParamList"
                    chosenType="prdt,prdtType"
                    ref="bizParamRef">
            </biz-param-chosen>
        </el-form-item>
        <el-form-item label="任务名称展示">
            <el-radio-group v-model="nameCreateRule">
                <el-radio :key="ruleNameType.value"
                          :label="ruleNameType.value"
                          v-for="ruleNameType in ruleNameTypeOp">
                    {{ ruleNameType.label }}
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="nameCreateRule == '1'" prop="taskNameExp">
            <el-row :gutter="20">
                <el-col :span="10">
                    <gf-input v-model="detailForm.taskNameExp"/>
                </el-col>
                <el-col :span="14"><em @click="openHelpFile" class="question el-icon-question" title="可选参数"></em></el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="任务控制参数">
            <gf-strbool-checkbox v-model="detailForm.needApprove">是否需要复核</gf-strbool-checkbox>
            <gf-strbool-checkbox v-model="detailForm.taskInitType">任务分发</gf-strbool-checkbox>
        </el-form-item>
    </el-form>
</template>

<script>
    import readMeStr from "../mult-task-def/taskNameParams";

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
                isCheckCode:false,
                eventParam: [],
                hasEventParam: false,
                nameCreateRule: '0',
                paramRefList:[],
                detailForm: {execScheduler:'* * * * * ?',
                    taskName:'',
                    caseKey:'',
                    bizType:'',
                    bizTagArr:'',
                    startTime:'',
                    endTime:'',
                    execMode:'0',
                    eventId:'',
                    flowType:'',
                    taskInitType: '0',          // 任务实例化方式 -- 0：共享；1：分发
                    needApprove:'0',
                    bizParam:'',
                    taskIcon:''},
                dayChecked: false,  // 跨日
                startAllTime: false,       // 是否永久有效
                // 规则选择类型选项
                ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
                ruleNameTypeOp: [{label: '默认生成规则', value: '0'}, {label: '自定义生成规则', value: '1'}],
                // 消息配置类型类型选项
                msgInformOp: [{label: '提前通知', value: '0'}, {label: '完成通知', value: '1'}, {label: '超时通知', value: '2'},
                    {label: '异常通知', value: '3'}, {label: '系统内部消息', value: '4'}],
                eventOptions :[],
                detailFormRules: {
                    taskName: [
                        {required: true, message: '任务名称必填', trigger: 'blur'},
                    ],
                    stepLevel: [
                        {required: true, message: '任务等级必填', trigger: 'blur'},
                    ],
                    caseKey: [
                        {validator: this.hasRepetCode, required: true, trigger: 'change'},
                    ],
                    startTime: [
                        {required: true, message: '运行周期开始时间必填', trigger: 'blur'},
                    ],
                    endTime: [
                        {required: true, message: '运行周期结束时间必填', trigger: 'blur'},
                    ],
                    execMode: [
                        {required: true, message: '启动方式必填', trigger: 'blur'},
                    ],
                    execScheduler: [
                        {required: true, message: '任务创建频率必填', trigger: 'blur'},
                    ],
                    dayendDefId: [
                        {required: true, message: '基准日期必填', trigger: 'blur'},
                    ],
                    flowType: [
                        {required: true, message: '流程类型必填', trigger: 'blur'},
                    ]
                },
                bizTagOption:[],
                pickerOptionsStart: {
                    disabledDate: time => {
                        let endDateVal = this.detailForm.endTime;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        let beginDateVal = this.detailForm.startTime;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime() - 24 * 60 * 60 * 1000
                            );
                        }
                    }
                },
            }
        },
        mounted() {
            if(this.mode!='add'){
                Object.assign(this.detailForm, this.row);
                this.onLoadForm();
            }
            this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
            this.getEventOptions();
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
            getParamList(val) {
                this.paramRefList = val;
                this.detailForm.bizParam = JSON.stringify(val);
            },
            async getEventParam() {
                this.hasEventParam = false;
                this.eventParam = [];
                if (this.detailForm.eventId) {
                    const e = this.$api.modelConfigApi.getFieldByEventId(this.detailForm.eventId);
                    const eventR = await this.$app.blockingApp(e);
                    if (eventR.data && eventR.data.length>0) {
                        this.paramRefList = [];
                        this.detailForm.bizParam = '';
                        this.hasEventParam = true;
                        this.eventParam = eventR.data;
                    }
                }
                this.getEventFun();
            },

            async getEventFun() {
                if (this.detailForm.eventId) {
                    const f = this.$api.funDefineApi.selectFunByEventId(this.detailForm.eventId);
                    const eventF = await this.$app.blockingApp(f);
                    if (eventF && eventF.data && (eventF.data.isReturnArray === '0' || (eventF.data.isReturnArray === '1' && this.stepInitTypeBox2 === '1'))) {
                        this.hasEventRuleName = true;
                    } else {
                        this.hasEventRuleName = false;
                    }
                }
            },

            // 打开帮助文档
            openHelpFile() {
                if (this.helpNotify && this.helpNotify.close) {
                    this.helpNotify.close();
                }
                this.helpNotify = this.$notify({
                    width: 400,
                    title: '任务名称可选参数',
                    customClass: 'cronHelpNotify',
                    dangerouslyUseHTMLString: true,
                    duration: 0,
                    message: readMeStr()
                });
            },
            openCron() {
                this.showDlg(this.detailForm.execScheduler, this.setExecScheduler.bind(this));
            },
            editExecTime( execScheduler,title) {
                this.showDlg(execScheduler,title, this.setExecScheduler.bind(this));
            },
            showDlg(cornObj,title, action) {
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {
                            cornObj:cornObj,
                            action
                        },
                        width: '530px',
                        title: this.$dialog.formatTitle(title, "edit"),
                    }
                );
            },
            setExecScheduler(cron) {
                this.detailForm.execScheduler = cron;
            },
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                if(this.row.isCheck){
                    let resData = this.detailForm;
                    const p = this.$api.kpiTaskApi.checkTask({reTaskDef:resData,isPass:'0'});
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('反审核成功');
                }
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                if(this.detailForm.execMode == '3' && this.detailForm.eventId == ''){
                    this.$message.warning("请选择触发事件！");
                    return ;
                }
                if (this.nameCreateRule === '0') {
                    this.detailForm.taskNameExp = ''
                }
                try {
                    this.detailForm.bizTag = this.detailForm.bizTagArr.join(",");
                    let resData = this.detailForm;
                    let msg = '';
                    if(this.mode === 'add'){
                        resData.taskType = '2';
                        this.isCheckCode=true;
                    }else if(this.row.caseKey != resData.caseKey){
                        this.isCheckCode=true;
                    }
                    if(this.row.isCheck){
                        const p = this.$api.kpiTaskApi.checkTask({reTaskDef:resData,isPass:'1'});
                        await this.$app.blockingApp(p);
                        msg = '审核成功';
                    }else{
                        let data = {reTaskDef:resData,
                            caseDefId: this.detailForm.caseDefId, caseDefBody: this.detailForm.caseDefBody,versionId:this.detailForm.versionId,isCheckCode:this.isCheckCode}
                        const p = this.$api.flowTaskApi.saveFlowTask(data);
                        let resp = await this.$app.blockingApp(p);
                        if(resp && resp.code == 'rwbhycz'){
                            this.$msg.error(resp.message);
                            return ;
                        }
                        msg = '保存成功';

                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success(msg);
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            onLoadForm(){
                if (this.row.taskNameExp) {
                    this.nameCreateRule = '1'
                }
                if (this.detailForm.bizParam) {
                    this.paramRefList = JSON.parse(this.row.bizParam);
                }
                if (this.mode && this.mode !== 'add') {
                    if (this.detailForm.endTime && this.detailForm.endTime.toString().startsWith('9999-12-31')) {
                        this.startAllTime = true;
                    }
                    if (this.detailForm.bizTag) {
                        this.detailForm.bizTagArr = this.detailForm.bizTag.split(",");
                    }
                }
            },
            async getEventOptions(){
                const event = this.$api.eventlDefConfigApi.getEventDefList();
                const eventR = await this.$app.blockingApp(event);
                const eventList = eventR.data
                eventList.forEach((item)=>{
                    this.eventOptions.push({label:item.eventName,value:item.eventId});
                });
            }
        },
        watch: {
            'startAllTime' (val) {
                if (val) {
                    this.detailForm.endTime = '9999-12-31'
                } else {
                    this.detailForm.endTime = ''
                }
            },
            'detailForm.eventId'() {
                this.getEventParam();
            },
            'detailForm.execMode'(val){
                if(val === '2'){
                    this.detailForm.eventId = '';
                }else if(val === '3'){
                    this.detailForm.execScheduler= ''
                }else {
                    this.detailForm.eventId = '';
                    this.detailForm.execScheduler= ''
                }
            },

        }
    }
</script>
