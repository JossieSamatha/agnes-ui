<template>
    <el-form ref="taskDefForm" class="taskDefForm" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px" style="max-width: 850px">
        <module-card title="基本信息" shadow="never">
            <template slot="content">
                <el-form-item label="任务名称" prop="taskName">
                    <gf-input v-model.trim="detailForm.taskName" placeholder="任务名称" :max-byte-len="120"/>
                </el-form-item>
                <el-form-item label="任务编号" prop="caseKey">
                    <gf-input v-model.trim="detailForm.caseKey" placeholder="任务编号" clear-regex="[^0-9]" :max-byte-len="8"/>
                </el-form-item>
                <el-form-item label="任务类型" prop="taskType">
                    <gf-dict filterable clearable v-model="detailForm.taskType" dict-type="AGNES_TASK_TYPE"/>
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
            </template>
        </module-card>

        <module-card title="运行规则" shadow="never">
            <template slot="content">
                <el-form-item label="运行周期配置" prop="startTime">
                    <div class="line none-shrink">
                        <el-form-item prop="startTime"  style="margin-left:1px">
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
                <el-form-item label="基准日期" prop="dayendDefId" >
                    <gf-dict clearable dict-type="AGNES_BASE_DATE" filterable v-model="detailForm.dayendDefId"/>
                </el-form-item>
                <el-form-item label="创建方式选择" prop="execMode">
                    <el-radio-group v-model="detailForm.execMode">
                        <el-radio label="1">按运行周期创建一次</el-radio>
                        <el-radio label="2">按自定义频率创建</el-radio>
                        <el-radio label="3">按外部事件触发时创建</el-radio>
                        <el-radio label="4">手动触发</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="创建频率配置" v-if="detailForm.execMode==='2'" prop="execScheduler">
                    <el-button type="text" @click="editExecTime(detailForm.execScheduler,'创建频率配置')">
                        {{detailForm.execScheduler}}点击配置
                    </el-button>
                </el-form-item>
                <el-form-item label="外部事件选择" v-if="detailForm.execMode==='3'">
                    <el-select v-model="eventKey" placeholder="请选择" filterable clearable>
                        <gf-filter-option
                                v-for="item in eventOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </gf-filter-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="detailForm.execMode==='4'" label="任务参数">
                    <div class="rule-table">
                        <el-table header-row-class-name="rule-header-row"
                                  header-cell-class-name="rule-header-cell"
                                  row-class-name="rule-row"
                                  cell-class-name="rule-cell"
                                  :data="this.paramList"
                                  border stripe
                                  :header-cell-style="{'text-align':'center'}">
                            style="width: 100%">
                            <el-table-column prop="accNo" label="参数编号">
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
            </template>
        </module-card>

        <module-card title="业务关联" shadow="never">
            <template slot="content">
                <el-form-item label="业务范围" v-if="!hasEventParam">
                    <biz-param-chosen
                            :paramRefList="this.paramRefList"
                            @getParamList="getParamList"
                            chosenType="prdt,prdtType"
                            ref="bizParamRef">
                    </biz-param-chosen>
                </el-form-item>
                <el-checkbox v-model="taskInitTypeBoolen" style="margin-left: 50px">根据不同的业务数据产生多条任务</el-checkbox>
            </template>
        </module-card>

        <module-card title="任务展示" shadow="never">
            <template slot="content">
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
                        <el-col :span="14">
                            <el-popover
                                    placement="top-start"
                                    title=""
                                    width="380"
                                    trigger="hover">
                                <div class="popover-content" v-html="taskNameParams"></div>
                                <span slot="reference" style="color: #4E9DE2">可选参数</span>
                            </el-popover>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-checkbox v-model="isNeedApprove" style="margin-left: 50px">需要复核通过后展示任务</el-checkbox>
            </template>
        </module-card>
    </el-form>
</template>

<script>
    import readMeStr from "../mult-task-def/taskNameParams";
    import staticData from "../../../util/dataFormat";

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
            const checkFormat = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                  let dateResult = false;
                  let eventResult = false;
                  const dateReg1 = /\$\{yyyy-MM-dd}/;
                  const dateReg2 = /\$\{yyyyMMdd}/;
                  const dateReg4 = /\$\{yyyyMM}/;
                  const dateReg3 = /\$\{.*?}/;
                  if (dateReg1.test(value) || dateReg2.test(value) || dateReg4.test(value)) {
                    dateResult = true;
                  }
                  if (this.eventParam !== null && this.eventParam.length > 0) {
                    this.eventParam.forEach(param => {
                      const reg = new RegExp("\\$\\{" + param.fieldKey + "}")
                      const result = reg.test(value);
                      if (result) {
                        eventResult = true;
                      }
                    })
                    }
                    if (eventResult) {
                        if (!(this.detailForm.eventId && this.hasEventRuleName)) {
                            callback(new Error("输入参数不在可选参数范围内"));
                        } else {
                            callback();
                        }
                    } else if (dateResult) {
                        callback();
                    } else if (dateReg3.test(value)) {
                        callback(new Error("输入参数不在可选参数范围内"))
                    } else {
                        callback();
                    }
                }
            };
            return {
                caseModelData: {},
                isCheckCode:false,
                staticData: staticData(),
                eventParam: [],
                hasEventParam: false,
                drawerVisible: false,
                isNeedApprove: false,
                taskInitTypeBoolen: false,
                stepDetailProps: {},
                nameCreateRule: '0',
                paramRefList:[],
                paramList:[],
                taskNameParams: '',
                eventKey:'',
                detailForm: {execScheduler:'* * * * * ?',
                    taskName:'',
                    caseKey:'',
                    configType:'1',
                    bizType:'',
                    bizTagArr:'',
                    startTime:'',
                    endTime:'',
                    execMode:'2',
                    eventId:'',
                    taskType:'',
                    dayendDefId:'',
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
                    bizType: [
                        {required: true, message: '业务场景必选', trigger: 'blur'},
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
                    taskType: [
                        {required: true, message: '流程类型必填', trigger: 'blur'},
                    ],
                    taskNameExp: [{validator: checkFormat, trigger: ['blur', 'change']}]
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
        beforeMount() {
            if (this.row.reTaskDef.bizParam) {
                this.paramRefList = JSON.parse(this.row.reTaskDef.bizParam);
            }
        },
        mounted() {
            this.$app.registerCmd("openDialog", this.onShowDialog);
            if(this.mode!='add'){
                Object.assign(this.detailForm, this.row.reTaskDef);
                this.onLoadForm();
                if(this.detailForm.execMode=='4'){
                    this.getRollBackParamList();
                }
            }
            this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
            this.getEventOptions();
            this.changeTaskNameParams();
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
                if(val.length>0){
                    this.detailForm.bizParam = JSON.stringify(val);
                }else {
                    this.detailForm.bizParam = '';
                }
            },
            changeTaskNameParams() {
                this.taskNameParams = '';
              let title = '<p class="title">可选参数</p>' +
                  '<table>' +
                  '<th>参数类型</th>' +
                  '<th>参数含义</th>' +
                  '<th>参数格式</th>' +
                  '<tbody>' +
                  '<tr><td rowspan="2" style="min-width: 100px">基本参数</td><td rowspan="2" style="min-width: 100px">业务日期</td><td style="min-width: 150px">${yyyy-MM-dd}</td></tr>' +
                  '<tr><td style="min-width: 150px">${yyyyMMdd}</td></tr>' +
                  '<tr><td style="min-width: 150px">${yyyyMM}</td></tr>';
              let eventMsg = '';
                if (this.eventParam != null && this.eventParam.length > 0 && this.hasEventRuleName) {
                    eventMsg = '<tr><td rowspan="' + this.eventParam.length + '" style="min-width: 100px">事件参数</td>'
                    this.eventParam.forEach(param => {
                        eventMsg = eventMsg + '<td style="min-width: 100px">' + param.fieldName + '</td><td style="min-width: 150px">${' + param.fieldKey + '}</td></tr>';
                    })
                }
                this.taskNameParams = title + eventMsg + '</tbody></table>';
            },
            async getEventParam() {
                this.eventOptions.forEach((item)=>{
                    if(item.value==this.eventKey){
                        this.detailForm.eventId = item.eventId;
                    }
                });
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
                this.eventOptions.forEach((item) => {
                    if (item.value == this.eventKey) {
                        this.detailForm.eventId = item.eventId;
                    }
                });
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
                if(this.isNeedApprove){
                    this.detailForm.needApprove = '1';
                }else {
                    this.detailForm.needApprove = '0';
                }
                if(this.taskInitTypeBoolen){
                    this.detailForm.taskInitType = '1';
                }else {
                    this.detailForm.taskInitType = '0';
                }
                if(this.detailForm.execMode == '3' && this.detailForm.eventId == ''){
                    this.$message.warning("请选择触发事件！");
                    return ;
                }
                if (this.nameCreateRule === '0') {
                    this.detailForm.taskNameExp = ''
                }
                if(this.detailForm.execMode == '2' && this.detailForm.execScheduler == ''){
                    this.$message.warning("请选择任务创建频率！");
                    return ;
                }
                try {
                    this.detailForm.bizTag = this.detailForm.bizTagArr.join(",");
                    let resData = this.detailForm;
                    let msg = '';
                    if(this.mode === 'add'){
                        this.isCheckCode=true;
                    }else if(this.row.reTaskDef.caseKey != resData.caseKey){
                        this.isCheckCode=true;
                    }
                    if(this.row.isCheck){
                        const p = this.$api.kpiTaskApi.checkTask({reTaskDef:resData,isPass:'1'});
                        await this.$app.blockingApp(p);
                        msg = '审核成功';
                    }else{
                        //保存事件参数
                        if(this.detailForm.execMode == '3'){
                            this.eventOptions.forEach((item)=>{
                                if(item.value==this.eventKey){
                                    this.detailForm.eventId = item.eventId;
                                }
                            });
                            if(this.eventParam.length==0){
                                resData.isClear = true;
                                const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                                await this.$app.blockingApp(c);
                            }else {
                                let eventTaskParam = [];
                                this.eventParam.forEach(item=>{
                                    eventTaskParam.push({'paramKey':item.fieldKey,'paramName':item.fieldName,'paramType':'string'})
                                });
                                let resData = {
                                    paramList : eventTaskParam,
                                    reTaskDef:{caseKey:this.detailForm.caseKey}
                                };
                                resData.isClear = false;
                                const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                                const resp1 = await this.$app.blockingApp(c);
                                if(resp1 && resp1.code == 'existKey'){
                                    this.$msg.error(resp1.message);
                                    return ;
                                }
                            }
                        }
                        //手动触发，保存参数
                        if(this.detailForm.execMode == '4'){
                            if(this.paramList.length==0){
                                resData.isClear = true;
                                const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                                await this.$app.blockingApp(c);
                            }else {
                                let resData = {
                                    paramList : this.paramList,
                                    reTaskDef:{caseKey:this.detailForm.caseKey}
                                };
                                resData.isClear = false;
                                const c = this.$api.motConfigApi.checkAndSaveReCaseParams(resData);
                                const resp1 = await this.$app.blockingApp(c);
                                if(resp1 && resp1.code == 'existKey'){
                                    this.$msg.error(resp1.message);
                                    return ;
                                }
                            }
                        }
                        let data = {reTaskDef:resData,
                            caseDefId: this.detailForm.caseDefId, caseDefBody: this.detailForm.caseDefBody,versionId:this.detailForm.versionId,isCheckCode:this.isCheckCode}
                        const p = this.$api.motConfigApi.saveTask(data);
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
            async getCaseBody(caseDefId){
                if(caseDefId && !this.row.caseDefBody){
                    const p = this.$api.caseConfigApi.selectTaskCaseBody(caseDefId)
                    let  rep = await this.$app.blockingApp(p);
                    if(rep.data.caseDefBody){
                        this.caseModelData  = rep.data.caseDefBody;
                        this.row.caseDefBody  = rep.data.caseDefBody;
                    }else {
                        this.caseModelData  = JSON.stringify({stages:[{children:[{stepFormInfo:{stepCode:this.detailForm.caseKey,stepName:this.detailForm.taskName}}]}]});
                        this.row.caseDefBody  = JSON.stringify({stages:[{children:[{stepFormInfo:{stepCode:this.detailForm.caseKey,stepName:this.detailForm.taskName}}]}]});
                    }
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
            async getRollBackParamList(){
                let repData = {caseKey:this.detailForm.caseKey,stepCode:''};
                const c = this.$api.motConfigApi.queryReCaseParams(repData);
                const resp = await this.$app.blockingApp(c);
                if(resp.data){
                    this.paramList = resp.data;
                }
            },
            onLoadForm(){
                if (this.row.reTaskDef.taskNameExp) {
                    this.nameCreateRule = '1'
                }
                if(this.row.caseDefBody){
                    this.detailForm.caseDefBody  = this.row.caseDefBody;
                }
                if(this.detailForm.taskInitType == '1'){
                    this.taskInitTypeBoolen = true;
                }
                if(this.detailForm.needApprove == '1'){
                    this.isNeedApprove = true;
                }
                this.getCaseBody(this.row.caseDefId);
                if (this.mode && this.mode !== 'add') {
                    if (this.detailForm.endTime && this.detailForm.endTime.toString().startsWith('9999-12-31')) {
                        this.startAllTime = true;
                    }
                    if (this.detailForm.bizTag) {
                        this.detailForm.bizTagArr = this.detailForm.bizTag.split(",");
                    }
                }
            },
            // 新增step
            openStep() {
                if(this.mode=='add'){
                    this.$app.runCmd('openDialog', 'add', {}, { stepType: this.detailForm.taskType});
                }else {
                    let caseDefBody = JSON.parse(this.row.caseDefBody);
                    let stepFormInfo = this.$utils.deepClone(caseDefBody.stages[0].children[0]);
                    console.log("ddd")
                    this.$app.runCmd('openDialog', this.mode, stepFormInfo, { stepType: this.detailForm.taskType});
                }
            },
            openStepDetail() {
                let caseDefInfo = {};
                if (this.mode == 'add' && !this.caseModelData) {
                    caseDefInfo = {
                        reTaskDef: {
                            bizType: '',
                            caseKey: '',
                        }
                    };
                } else {
                    caseDefInfo = this.row;
                }
                if (this.caseModelData) {
                    caseDefInfo.caseDefBody = this.caseModelData;
                }
                if(!this.detailForm.caseKey){
                    this.$message.warning("请先填写任务编号！");
                    return;
                }
                caseDefInfo.reTaskDef.caseKey = this.detailForm.caseKey;
                caseDefInfo.reTaskDef.bizType = this.detailForm.bizType;
                let mode = 'addMult';
                if(this.mode == 'view'){
                    mode = 'view';
                }
                this.showFlowNode({caseDefInfo: caseDefInfo}, mode, this.onEditFlowInfo.bind(this))
            },
            //多节点相关操作
            async onEditFlowInfo(item) {
                this.caseModelData = item;
                this.row.caseDefBody = item;
            },
            showFlowNode(row, mode, actionOk) {
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['任务节点配置'],
                    component: 'case-config-index',
                    okButtonVisible: mode == 'view' ? false : true,
                    args: {row, mode, actionOk},
                })
            },
            // 打开step详情配置页
            onShowDialog(optionType, dialogForm, args) {
                if(!this.detailForm.bizType){
                    this.detailForm.bizType='';
                }
                if(!this.detailForm.caseKey){
                    this.$msg.warning('请填写任务编号！');
                    return ;
                }
                args.bizType = this.detailForm.bizType;
                args.caseKey = this.detailForm.caseKey;
                args.bizTagArr = this.detailForm.bizTagArr;
                this.drawerVisible = true;
                if(this.mode == 'view'){
                    optionType = 'view';
                }
                this.stepDetailProps = {
                    optionType: optionType,
                    formObj: dialogForm,
                    stepCodeArr: [],
                    args: args
                }
            },
            // 保存step详情配置页数据
            saveStepInfo(stepObj){
                // 获得表单数据
                let caseDef = this.$utils.deepClone(this.staticData.caseDef);
                let defId = this.$agnesUtils.randomString(32);
                let defName = this.detailForm.taskName;
                this.detailForm.stepName = defName;
                caseDef.stages[0].defId = defId;
                caseDef.stages[0].children[0].stepId = defId;
                // caseDef.stages[0].children[0].stepActType = this.detailForm.taskType;
                caseDef.stages[0].defName = defName;
                caseDef.stages[0].children[0].stepName = defName;
                let stepFormInfo = this.$utils.deepClone(stepObj.stepInfo.stepFormInfo);
                // stepFormInfo.stepInitType = this.detailForm.stepInitType;
                stepFormInfo.caseStepDef.stepName =  this.detailForm.taskName;
                stepFormInfo.caseStepDef.stepCode =  this.detailForm.caseKey;
                caseDef.stages[0].children[0].stepFormInfo = stepFormInfo;
                this.detailForm.caseDefBody = caseDef;
                this.$refs.stepDetailDrawer.closeDrawer();
            },

            cancelAction(){
                this.$refs.stepDetailDrawer.closeDrawer();
            },
            async getEventOptions(){
                if (this.detailForm.eventId) {
                    this.eventKey = this.detailForm.eventId.split('_')[0];
                }
                const event = this.$api.eventlDefConfigApi.getEventDefList();
                const eventR = await this.$app.blockingApp(event);
                const eventList = eventR.data
                eventList.forEach((item)=>{
                    this.eventOptions.push({label:item.eventName,value:item.eventKey,eventId:item.eventId});
                });
            }
        },
        watch: {
            eventParam: {
                handler() {
                    this.changeTaskNameParams();
                },
                deep: true
            },
            'eventKey'() {
                this.getEventParam();
            },
            'startAllTime' (val) {
                if (val) {
                    this.detailForm.endTime = '9999-12-31'
                } else {
                    this.detailForm.endTime = ''
                }
            },
            'detailForm.execMode'(val){
                this.hasEventParam = false;
                this.eventParam = [];
                if(val === '2'){
                    this.detailForm.eventId = '';
                    this.eventKey = '';
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
