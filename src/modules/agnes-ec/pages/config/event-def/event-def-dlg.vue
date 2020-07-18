<template>
    <div>
<!--        <el-scrollbar wrap-style="max-height: 90%;" wrap-class="el-scrollbar__wrap">-->
        <el-scrollbar style="height:100%;overflow-x: hidden;" wrap-class="el-scrollbar__wrap">

            <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="95px"
                     style="padding: 10px;">
                <el-form-item label="事件名称" prop="eventDef.eventName">
                    <gf-input type="text" v-model="form.eventDef.eventName"/>
                </el-form-item>


                <el-form-item label="执行区间" prop="eventDef.dateRange">
                    <gf-date-range-picker v-model="form.eventDef.dateRange" type="daterange"  range-separator="至"
                                          start-placeholder="开始日期"  end-placeholder="结束日期"
                                          @change="onDateRangeChange">
                    </gf-date-range-picker>
                    <el-checkbox v-model="form.eventDef.noEnd" @change="onNoEndChange">永不失效</el-checkbox>
                </el-form-item>

                <el-form-item label="执行方式" prop="eventDef.execMode">
                    <el-radio-group v-model="form.eventDef.execMode">
                        <el-radio :label="'1'">重复执行</el-radio>
                        <el-radio :label="'2'">消息监听</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="执行频率" prop="eventDef.execScheduler" v-if="form.eventDef.execMode === '1'">
                    <g-f-cron ref="innerVueCron" v-model="form.eventDef.execScheduler"></g-f-cron>
                </el-form-item>

                <el-form-item label="消息类型" prop="eventDef.msgId" v-if="form.eventDef.execMode === '2'">
                    <gf-el-select v-model="form.eventDef.msgId" controller="msgDefineApi" method-name="queryMsgList"
                                  value-field="msgId" label-field="msgName"/>
                </el-form-item>

                <el-form-item label="匹配规则" prop="eventMsg.getValueParam">
                    <rule-table ref="ruleTable" :ruleTableData="form.ruleTableData" tableHeight="200" tableMaxHeight="300"></rule-table>
                </el-form-item>

                <el-form-item label="取值函数" prop="eventMsg.funcId">
                    <el-select v-model="form.eventMsg.funcId" clearable filterable placeholder="请选择" style="width: 100%;"
                               @change="onfuncIdChange" @clear="onfuncIdClear">
                        <el-option
                                v-for="item in funcList"
                                :key="item.fnId"
                                :label="item.fnName"
                                :value="item.fnId">
                        </el-option>
                    </el-select>

                </el-form-item>

                <el-form-item label="参数设置" prop="eventMsg.getValueParam">
                    <el-table
                            max-height="250"
                            style="width: calc(100% - 40px); margin: 20px auto"
                            :data="this.form.eventMsg.getValueParam">
                        <el-table-column prop="fieldKey" label="英文"></el-table-column>
                        <el-table-column prop="fieldName" label="中文"></el-table-column>
                        <el-table-column prop="mustFill" label="是否必填">
                            <template slot-scope="scope">
                                {{scope.row.mustFill === '1' ? '是' : '否'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="fieldValue" label="设置">
                            <template slot-scope="scope">
                                <el-input :class="scope.row.mustFill === 'true' && !scope.row.fieldValue ? 'error': ''" v-model="scope.row.fieldValue"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item label="消息对象类型"  prop="eventMsg.modelTypeId">
<!--                    <gf-el-select v-model="form.eventMsg.modelTypeId" controller="modelConfigApi" method-name="getModelTypeList"-->
<!--                                  value-field="modelTypeId" label-field="typeName"/>-->


                    <el-select v-model="form.eventMsg.modelTypeId" clearable filterable placeholder="请选择" style="width: 100%;"
                        @change="onModelTypeIdChange" @clear="onModelTypeIdClear">
                        <el-option
                                v-for="item in modelTypeList"
                                :key="item.modelTypeId"
                                :label="item.typeName"
                                :value="item.modelTypeId">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="消息对象" prop="eventMsg.fieldMapping">
                    <el-table
                              max-height="250"
                              style="width: calc(100% - 40px); margin: 20px auto"
                              :data="this.form.eventMsg.fieldMapping">
                        <el-table-column prop="fieldKey" label="英文"></el-table-column>
                        <el-table-column prop="fieldName" label="中文"></el-table-column>
                        <el-table-column prop="mustFill" label="是否必填">
                            <template slot-scope="scope">
                                {{scope.row.mustFill === '1' ? '是' : '否'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="fieldValue" label="设置">
                            <template slot-scope="scope">
                                <el-input :class="scope.row.mustFill === 'true' && !scope.row.fieldValue ? 'error': ''" v-model="scope.row.fieldValue"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

            </el-form>
            <dialog-footer :on-save="save"></dialog-footer>
            <gf-button @click="test">test</gf-button>
        </el-scrollbar>

    </div>
</template>

<script>
import fecha from 'element-ui/src/utils/date';
import GFCron from "./GFCron";

    export default {
        components: {GFCron},
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
                form: {
                    eventDef: {
                        eventId: '',
                        eventName: '',
                        startTime: '',
                        endTime: '',
                        execMode: '1',
                        execScheduler: '',
                        msgId: '',
                        mqGroup: 'default',
                        eventRule: '',
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
                        tableData:[],
                        judgeScript:''
                    }
                },
                rules: {
                    'eventDef.eventName': [{required: true, message: "请输入事件名称"}],
                },
                // ruleTableData: {},
                modelTypeList:{},
                funcList:{}
            }
        },
        beforeMount() {
            Object.assign(this.form.eventDef, this.row);
            Object.assign(this.form.eventMsg, this.row);

            this.initEventDlg();
        },
        beforeUpdate() {
            //消息对象JSON转换
            if(this.form.eventMsg.fieldMapping){
                 this.form.eventMsg.fieldMapping= JSON.parse(this.form.eventMsg.fieldMapping);
            }

            if(this.form.eventMsg.getValueParam){
                this.form.eventMsg.getValueParam= JSON.parse(this.form.eventMsg.getValueParam);
            }

        },
        methods: {
            initEventDlg(){
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
                this.fetchModelType();
                this.fetchFunc();

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
            async fetchModelType() {
                try {
                    const resp = await this.$api.modelConfigApi.getModelTypeList();
                    this.modelTypeList = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchFields() {
                try {
                    const resp = await this.$api.modelConfigApi.getModelFieldList(this.form.eventMsg.modelTypeId);

                    let rows = [];
                    resp.data.forEach(function (rowInfo) {
                        if(rowInfo.fieldType === '01'){
                            rows.push(rowInfo);
                        }
                    });
                    this.form.eventMsg.fieldMapping = rows;
                    // this.form.eventMsg.fieldMapping = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchFunc() {
                try {
                    const resp = await this.$api.funDefineApi.queryFunList();
                    this.funcList = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchFunModelFields() {
                try {
                    if(this.form.eventMsg.funcId){
                        const funResp = await this.$api.funDefineApi.getByFnId(this.form.eventMsg.funcId);
                        if(funResp.data.fnArgs){
                            const resp = await this.$api.modelConfigApi.getModelFieldList(funResp.data.fnArgs);

                            let rows = [];
                            resp.data.forEach(function (rowInfo) {
                                if(rowInfo.fieldType === '01'){
                                    rows.push(rowInfo);
                                }
                            });
                            this.form.eventMsg.getValueParam = rows;
                        }
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
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async fetchRuleDetail() {
                try {
                    if(this.form.eventDef.eventRule){
                        const resp = await this.$api.ruleConfigApi.getRuleDetailList(this.form.eventDef.eventRule);
                        this.form.ruleTableData.tableData = resp.data;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async test() {
                this.$msg.alert("created:"+this.form.eventMsg.fieldMapping);
                this.form.eventMsg.fieldMapping = JSON.parse(this.form.eventMsg.fieldMapping);
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                //消息对象必填项校验
                let validate = true;
                if(this.form.eventMsg.fieldMapping && this.form.eventMsg.fieldMapping.forEach){
                    this.form.eventMsg.fieldMapping.forEach(function (rowInfo) {
                        if(rowInfo.mustFill === '1' && !rowInfo.fieldValue){
                            validate = false;
                        }
                    });
                }
                if(!validate){
                    this.$message({
                        message: '请补充完整[消息对象]必填项',
                        type: 'warning'
                    });
                    return;
                }


                try {
                    if(this.form.eventDef.execMode && this.form.eventDef.execMode === "1" && this.$refs.innerVueCron.cron){
                        this.form.eventDef.execScheduler = this.$refs.innerVueCron.cron;
                    }

                    const p = this.$api.eventlDefConfigApi.saveEventDef(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    // this.$dialog.close(this);
                    this.$nav.closeCurrentTab();
                } catch (reason) {
                    this.$msg.error(reason);
                }
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
            onModelTypeIdChange(){
                if (this.form.eventMsg.modelTypeId) {
                    const p = this.fetchFields();
                    this.$app.blockingApp(p);
                }

            },
            onfuncIdChange(){
                if (this.form.eventMsg.funcId) {
                    const p = this.fetchFunModelFields();
                    this.$app.blockingApp(p);
                }
            },
            onModelTypeIdClear(){
                this.form.eventMsg.modelTypeId = '';
                this.form.eventMsg.fieldMapping = [];
            },
            onfuncIdClear(){
                this.form.eventMsg.funcId = '';
                this.form.eventMsg.getValueParam = [];
            }
            // // 保存筛选条件
            // savefilterConf(){
            //     let validate = true;
            //     this.form.eventMsg.fieldMapping.forEach(function (rowInfo) {
            //         if(rowInfo.mustFill === 'true' && !rowInfo.fieldValue){
            //             validate = false;
            //         }
            //     });
            //     if(validate){
            //         this.filterConfCheck = false;
            //         this.ruleTableData.tableData[this.editRowIndex].ruleParam = JSON.stringify(this.filterConfFormData);
            //         this.filterConfDialog = false;
            //     }else{
            //         this.filterConfCheck = true;
            //         this.$message({
            //             message: '请补充完整必填项',
            //             type: 'warning'
            //         });
            //     }
            // },

        }
    }
</script>

<style scoped>

</style>
