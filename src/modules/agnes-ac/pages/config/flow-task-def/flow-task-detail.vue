<template>
    <el-form ref="taskDefForm" class="taskDefForm" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px" style="max-width: 850px">
        <el-form-item label="任务名称" prop="taskName">
            <gf-input v-model.trim="detailForm.taskName" placeholder="任务名称"/>
        </el-form-item>
        <el-form-item label="任务编号" prop="caseKey">
            <gf-input v-model.trim="detailForm.caseKey" placeholder="任务编号"/>
        </el-form-item>
        <el-form-item label="业务场景" prop="bizType">
            <gf-dict filterable clearable v-model="detailForm.bizType" dict-type="AGNES_BIZ_CASE"/>
        </el-form-item>
        <el-form-item label="业务标签" prop="bizTag">
            <el-select v-model="detailForm.bizTagArr" placeholder="请选择" filterable clearable multiple>
                <gf-filter-option
                        v-for="item in bizTagOption"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId">
                </gf-filter-option>
            </el-select>
        </el-form-item>
        <el-form-item label="运行周期" prop="startTimeStr">
            <div class="line none-shrink">
                <el-form-item prop="startTime">
                    <el-date-picker
                            v-model="detailForm.startTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <span style="margin: 0 10px">~</span>
                <el-form-item prop="endTime">
                    <el-date-picker
                            v-model="detailForm.endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期" :disabled="startAllTime">
                    </el-date-picker>
                </el-form-item>
                <el-checkbox v-model="startAllTime" style="margin-left: 10px">永久有效</el-checkbox>
            </div>
        </el-form-item>
        <el-form-item label="启动方式" prop="execMode">
            <el-radio-group v-model="detailForm.execMode">
                <el-radio label="0">执行一次</el-radio>
                <el-radio label="1">重复执行</el-radio>
                <el-radio label="2">事件触发执行</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="detailForm.execMode==='1'" label="任务创建频率" prop="execScheduler">
            <gf-input v-model.trim="detailForm.execScheduler" placeholder="* * * * * ?"
                      @click.native="openCron" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="事件选择" v-if="detailForm.execMode==='2'">
            <el-select v-model="detailForm.eventId" placeholder="请选择" filterable clearable>
                <gf-filter-option
                        v-for="item in detailForm.eventOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </gf-filter-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    import CronDef from "../case-def/little-case/cron-def";

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
                detailForm: {execScheduler:'* * * * * ?'},
                dayChecked: false,  // 跨日
                startAllTime: false,       // 是否永久有效
                // 规则选择类型选项
                ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
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
                        {required: true, message: '任务编号必填', trigger: 'blur'},
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
                    ]
                },
                bizTagOption:[]
            }
        },
        mounted() {
            Object.assign(this.detailForm, this.row);
            this.onLoadForm();
            this.bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
        },
        methods: {
            openCron() {
                this.showDlg(this.detailForm.execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(cornObj, action) {
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
                this.detailForm.execScheduler = cron;
            },
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            onCancel() {
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    this.detailForm.bizTag = this.detailForm.bizTagArr.join(",");
                    let resData = this.detailForm;
                    if(this.mode === 'add'){
                        resData.taskType = '02';
                    }
                    const p = this.$api.flowTaskApi.saveTask({reTaskDef:resData});
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('保存成功');
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            onLoadForm(){
                if (this.mode && this.mode !== 'add') {
                    if (this.detailForm.endTime && this.detailForm.endTime.toString().startsWith('9999-12-31')) {
                        this.startAllTime = true;
                    }
                    if (this.detailForm.bizTag) {
                        this.detailForm.bizTagArr = this.detailForm.bizTag.split(",");
                    }
                }
            },
        },



        watch: {
            'startAllTime' (val) {
                if (val) {
                    this.detailForm.endTime = '9999-12-31'
                } else {
                    this.detailForm.endTime = ''
                }
            }
        }
    }
</script>
