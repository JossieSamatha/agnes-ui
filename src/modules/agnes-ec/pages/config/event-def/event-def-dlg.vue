<template>
    <div>
        <el-scrollbar style="height:100%;overflow-x: hidden;" wrap-class="el-scrollbar__wrap">

            <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="95px"
                     style="padding: 10px;">
                <el-form-item label="事件名称" prop="eventDef.eventName">
                    <gf-input type="text" v-model="form.eventDef.eventName"/>
                </el-form-item>

                <el-form-item label="事件代码" prop="eventDef.eventCode">
                    <gf-input type="text" v-model="form.eventDef.eventCode" :max-byte-len="32"
                              clear-regex="[^a-zA-Z\d\x00-\xff]"/>
                </el-form-item>

                <el-form-item label="执行区间" prop="eventDef.dateRange">
                    <gf-date-range-picker v-model="form.eventDef.dateRange" type="daterange"  range-separator="至"
                                          start-placeholder="开始日期"  end-placeholder="结束日期"
                                          @change="onDateRangeChange">
                    </gf-date-range-picker>
                    <el-checkbox v-model="form.eventDef.noEnd" @change="onNoEndChange">永不失效</el-checkbox>
                </el-form-item>

                <el-form-item label="执行方式" prop="eventDef.execMode">
                    <el-radio-group v-model="form.eventDef.execMode" @change="onExecModeChange">
                        <el-radio :label="'1'">重复执行</el-radio>
                        <el-radio :label="'2'">消息监听</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="执行频率" prop="eventDef.execScheduler" v-if="form.eventDef.execMode === '1'">
                    <el-button type="text"  ref="innerVueCron" @click="editExecTime('execScheduler', form.eventDef.execScheduler)">
                        {{form.eventDef.execScheduler}}点击配置
                    </el-button>
                </el-form-item>

                <el-form-item label="消息类型" prop="eventDef.msgId" v-if="form.eventDef.execMode === '2'">
<!--                    <gf-el-select v-model="form.eventDef.msgId" controller="msgDefineApi" method-name="queryMsgList"-->
<!--                                  value-field="msgId" label-field="msgName" />-->

                    <el-select v-model="form.eventDef.msgId" clearable filterable placeholder="请选择" style="width: 100%;"
                               @change="onMsgDefChange"
                               @clear="onMsgDefClear"
                    >
                        <el-option
                                v-for="item in msgDefList"
                                :key="item.msgId"
                                :label="item.msgName"
                                :value="item.msgId">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="匹配规则" prop="ruleTableData">
                    <rule-table ref="ruleTable" confType="fn, object" :ruleTableData="form.ruleTableData" :ruleTargetOp="ruleTargetOp"
                                tableHeight="200" tableMaxHeight="300" ></rule-table>
                </el-form-item>

            </el-form>
<!--            <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="save" :on-cancel="cancel"></dialog-footer>-->
        </el-scrollbar>

    </div>
</template>

<script>
import fecha from 'element-ui/src/utils/date';

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
            var checkDateRange = async (rule, value, callback) => {
                if (!this.form.eventDef.startTime || !this.form.eventDef.endTime) {
                    callback(new Error('请填写执行区间！'));
                }
            };
            var checkExecScheduler = async (rule, value, callback) => {
                if (this.form.eventDef.execMode === "1" && !this.form.eventDef.execScheduler) {
                    callback(new Error('请配置执行频率！'));
                }
            };
            var checkMsgId = async (rule, value, callback) => {
                if (this.form.eventDef.execMode === "2" && !this.form.eventDef.msgId) {
                    callback(new Error('请配置消息类型！'));
                }
            };
            var checkExistsEventCode = async (rule, value, callback) => {
                const resp = await this.$api.eventlDefConfigApi.existsEventCode(this.form.eventDef.eventCode);
                if(!this.form.eventDef.eventCode){
                    callback(new Error('请填写事件代码！'));
                }else if (resp.data === true) {
                    callback(new Error('事件代码已存在！'));
                }
            };
            // var checkRuleTableData = async (rule, value, callback) => {
            //     if(!this.ruleTableData
            //         || !this.ruleTableData.ruleList
            //         || this.ruleTableData.ruleList.length === 0){
            //         callback(new Error('请配置匹配规则！'));
            //     }
            //     if(!this.ruleTableData.judgeScript){
            //         callback(new Error('请配置规则判断逻辑表达式！'));
            //     }
            // };

            return {
                form: {
                    eventDef: {
                        eventId: '',
                        eventName: '',
                        eventCode: '',
                        startTime: '',
                        endTime: '',
                        execMode: '1',
                        execScheduler: '',
                        msgId: '',
                        mqGroup: 'default',
                        eventRule: '',
                        eventStatus: '',
                        jobId:'',
                        dateRange: '',
                        noEnd : ''
                    },
                    eventMsg: {
                        eventId: '',
                        funcId: '',
                        getValueParam: '',
                        modelTypeId: '',
                        fieldMapping: []
                    },
                    ruleTableData: {
                        ruleList:[],
                        judgeScript:'',
                        ruleBody:'',
                        ruleId:'',
                    }
                },
                rules: {
                    'eventDef.eventName': [{required: true, message: "请输入事件名称"}],
                    'eventDef.execMode': [{required: true, message: "请选择执行方式"}],
                    'eventDef.dateRange': [
                        { required: true, message: '请填写执行区间', trigger: 'change' },
                        { validator: checkDateRange, trigger: 'blur' }
                    ],
                    'eventDef.execScheduler': [{ validator: checkExecScheduler, trigger: 'blur' }],
                    'eventDef.msgId': [{ validator: checkMsgId, trigger: 'blur' }],
                    'eventDef.eventCode': [
                        { required: true, message: '请填写事件代码', trigger: 'change' },
                        { validator: checkExistsEventCode, trigger: 'blur' }
                    ],
                    // 'ruleTableData': [{ validator: checkRuleTableData, trigger: 'blur' }]
                },
                // ruleTableData: {},
                msgDefList:{},
                ruleTargetOp: {
                    object: [{
                    }]
                },

                modelTypeList:{},
                funcList:{},
            }
        },
        beforeMount() {
            Object.assign(this.form.eventDef, this.row);
            Object.assign(this.form.eventMsg, this.row);

            this.initEventDlg();
        },

            // beforeUpdate() {
        //     //消息对象JSON转换
        //     if(this.form.eventMsg.fieldMapping){
        //          this.form.eventMsg.fieldMapping= JSON.parse(this.form.eventMsg.fieldMapping);
        //     }
        //
        //     if(this.form.eventMsg.getValueParam){
        //         this.form.eventMsg.getValueParam= JSON.parse(this.form.eventMsg.getValueParam);
        //     }
        //
        // },
        methods: {
            async initEventDlg(){
                this.$set( this.form.eventDef, 'dateRange', [this.form.eventDef.startTime,this.form.eventDef.endTime] );
                if(this.form.eventDef.endTime && this.form.eventDef.endTime === "9999-12-31"){
                    this.form.eventDef.noEnd = true;
                }

                if (this.form.eventDef.eventId) {
                    const p = this.fetchEventMsg();
                    this.$app.blockingApp(p);
                }

                this.fetchRuleDef();
                this.fetchRuleDetail();
                this.fetchMsgDefList();

                // this.fetchRuleTargetOp();

                // this.fetchRuleTargetOp();
                // this.fetchModelType();
                // this.fetchFunc();
            },


            async fetchMsgDefList() {
                try {
                    const resp = await this.$api.msgDefineApi.queryMsgList();
                    this.msgDefList = resp.data;
                    await this.fetchRuleTargetOp();

                    // await this.fetchRuleDef();
                    // await this.fetchRuleDetail();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchEventMsg() {
                try {
                    if(this.form.eventDef.eventId){
                        const resp = await this.$api.eventlDefConfigApi.getEventMsg(this.form.eventDef.eventId);
                        this.form.eventMsg = resp.data;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async fetchRuleDef() {
                try {
                    if(this.form.eventDef.eventRule){
                        const resp = await this.$api.ruleConfigApi.getRuleDef(this.form.eventDef.eventRule);
                        this.form.ruleTableData.judgeScript = resp.data.judgeScript;
                        this.form.ruleTableData.ruleBody = resp.data.ruleBody;
                        this.form.ruleTableData.ruleId = resp.data.ruleId;

                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchRuleDetail() {
                try {
                    if(this.form.eventDef.eventRule){
                        const resp = await this.$api.ruleConfigApi.getRuleDetailList(this.form.eventDef.eventRule);
                        this.form.ruleTableData.ruleList = resp.data;
                        // this.form.ruleTableData.ruleList.forEach(item=>{
                        //     if(item.ruleParam){
                        //         item.ruleParam= JSON.parse(item.ruleParam);
                        //     }
                        // });
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchModelAndFieldById(modelTypeId) {
                try {
                    const resp = await this.$api.modelConfigApi.getModelAndFieldById(modelTypeId);
                    this.ruleTargetOp.object = [];
                    resp.data.fnType ="mail";
                    this.ruleTargetOp.object.push(resp.data);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                try {
                    let msg = '';
                    if(this.row.isCheck){
                        const p = this.$api.eventlDefConfigApi.approveEventDef(this.form.eventDef.eventId,"1");
                        await this.$app.blockingApp(p);
                        msg = '审核成功';
                    }else{

                        // 定义需要校验的列数组，数组内容为列filed值
                        const validatefieldArr = ['ruleTarget', 'ruleParam', 'ruleKey', 'ruleSign', 'ruleValue'];
                        const validator = this.$refs.ruleTable.validator(validatefieldArr);
                        if(!validator){
                            // 验证失败
                            // this.$msg.error("请填写匹配规则");
                            return;
                        }

                        if(!this.form.ruleTableData
                            || !this.form.ruleTableData.ruleList
                            || this.form.ruleTableData.ruleList.length === 0){
                            this.$msg.error("请填写匹配规则");
                            return;
                        }
                        if(!this.form.ruleTableData.judgeScript){
                            this.$msg.error("请配置规则判断逻辑表达式");
                            return;
                        }

                        // 获取规则表格整理后的json对象串
                        const outputJson = this.$refs.ruleTable.jsonFormatter();
                        if(!outputJson){
                            this.$msg.error("规则JSON不能为空");
                        }
                        this.form.ruleTableData.ruleBody = outputJson;

                        const p = this.$api.eventlDefConfigApi.saveEventDef(this.form);
                        await this.$app.blockingApp(p);
                        msg = '保存成功';
                    }

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success(msg);
                    this.$emit("onClose");
                    // this.$dialog.close(this);
                    // this.$nav.closeCurrentTab();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async onCancel() {
                if(this.row.isCheck){
                    const p = this.$api.eventlDefConfigApi.approveEventDef(this.form.eventDef.eventId,"0");
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('反审核成功');
                }
                this.$emit("onClose");
            },
            showDlg(data, action) {
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {cornObj: data, action},
                        width: '530px',
                        title: this.$dialog.formatTitle('编辑频率', "edit"),
                    }
                );
            },
            setExecScheduler(cron) {
                this.form.eventDef.execScheduler=cron;
            },
            editExecTime(execScheduler) {
                this.showDlg(execScheduler, this.setExecScheduler.bind(this));
            },
            onNoEndChange (){

//                alert(this.$refs.innerVueCron.cron);
//                this.form.eventDef.execScheduler = this.$refs.innerVueCron.cron;

                var startDate = this.form.eventDef.dateRange[0];
                if(!startDate){
                    startDate = fecha.format(new Date(), 'yyyy-MM-dd');
                }
                if(this.form.eventDef.noEnd === true){
                    this.$set( this.form.eventDef, 'dateRange', [startDate,'9999-12-31'] );
                }else{
                    this.$set( this.form.eventDef, 'dateRange', [startDate,startDate] );
                }

                if(this.form.eventDef.dateRange[0]){
                    this.form.eventDef.startTime = this.form.eventDef.dateRange[0];
                }
                if(this.form.eventDef.dateRange[1]){
                    this.form.eventDef.endTime = this.form.eventDef.dateRange[1];
                }
            },
            onDateRangeChange(){
                if(this.form.eventDef.dateRange[0]){
                    this.form.eventDef.startTime = this.form.eventDef.dateRange[0];
                }
                if(this.form.eventDef.dateRange[1]){
                    this.form.eventDef.endTime = this.form.eventDef.dateRange[1];
                }
            },
            async fetchRuleTargetOp(){
                try {
                    let msgIdParam = this.form.eventDef.msgId;
                    let msgObjId;
                    this.msgDefList.forEach((item)=>{
                        if(item.msgId === msgIdParam){
                            msgObjId = item.msgObjId;
                        }
                    });
                    // alert("msgObjId:"+msgObjId);
                    if (msgObjId) {
                        // const p = this.fetchModelAndFieldById(msgObjId);
                        // this.$app.blockingApp(p);
                        const resp = await this.$api.modelConfigApi.getModelAndFieldById(msgObjId);
                        this.ruleTargetOp.object = [];
                        resp.data.fnType ="mail";
                        this.ruleTargetOp.object.push(resp.data);
                        this.$refs.ruleTable.setRuleTargetOp(this.ruleTargetOp);
                    }else{
                        this.ruleTargetOp.object = [];
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            onMsgDefChange(param){
                let msgObjId;
                this.msgDefList.forEach((item)=>{
                    if(item.msgId === param){
                        msgObjId = item.msgObjId;
                    }
                });
                // alert("param:"+param+" msgObjId:"+msgObjId);
                if (msgObjId) {
                    const p = this.fetchModelAndFieldById(msgObjId);
                    this.$app.blockingApp(p);
                }else{
                    this.ruleTargetOp.object = [];
                }

                this.clearRuleListObject();
            },
            clearRuleListObject(){
                //消息类型变化，清空规则表中已有的类型为对象的行
                let arr = this.form.ruleTableData.ruleList;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].ruleType === "object") {
                        arr.splice(i, 1);
                        i--;
                    }
                }
            },
            onMsgDefClear(){
                this.form.eventDef.msgId = "";
                this.clearRuleListObject();
            },
            onExecModeChange(param){
                if(param === "1"){
                    this.onMsgDefClear();
                }else if(param === "2"){
                    this.form.eventDef.execScheduler = "";
                }
            }

        }
    }
</script>

<style scoped>

</style>
