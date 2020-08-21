<template style="height: 100%">
    <el-container style="height: 100%">
        <el-header height="150px" style="width: 100%">
            <el-form :model="form" label-width="100px" ref="form" style="height: 100%" :rules="rule">
                <el-form-item label="任务名称" prop="taskName">
                    <gf-input type="text" v-model="form.taskName"></gf-input>
                </el-form-item>
                <el-form-item label="任务代码" prop="taskCode">
                    <gf-input type="text" v-model="form.taskCode"></gf-input>
                </el-form-item>
                <el-form-item label="任务执行频率" prop="exeCron">
                    <el-button type="text" @click="openCron">
                        {{form.exeCron}}点击配置
                    </el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main style="height: calc(100% - 150px);padding: 20px">
            <div style="padding: 20px;height: 100%">
                <el-row style="height: 100%"  :gutter="20">
                    <el-col style="text-align:right;line-height: 28px;color: #666;padding-right: 10px;font-size: 14px;width: 100px;margin-left: 10px">
                        任务步骤
                    </el-col>
                    <el-col style="height: 100%;width:calc(100% - 130px);padding: 0px">
                        <gf-grid grid-no="data-pipe-task-field" ref="grid" :options="gridOptions" class="grid-class" height="100%">
                            <template slot="left">
                                <gf-button class="action-btn" @click="add" size="mini">添加</gf-button>
                            </template>
                        </gf-grid>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import taskStep from "./data-pipe-task-add-dlg"
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
            return {
                form:{
                    taskName:'',
                    taskCode:'',
                    exeCron:'',
                    dopETLReTaskStepList:[],

                },
                taskInfo:[],
                gridOptions:{},
                rule: {
                    remark: [
                        {taskName: true, message: '任务名称不能为空',trigger: 'blur'},
                        {taskCode: true, message: '任务代码不能为空',trigger: 'blur'},
                        {exeCron: true, message: '任务执行频率不能为空',trigger: 'blur'},
                    ],
                },
            }
        },
        mounted() {
            Object.assign(this.form, this.row);
            this.loadTaskInfo();
        },
        methods:{
            async loadTaskInfo(){
                try{
                    const p = this.$api.dataPipeApi.queryStepByTaskId(this.row);
                    const res = await this.$app.blockingApp(p);
                    this.form.dopETLReTaskStepList = res.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
                this.loadTaskStep();
            },
            loadTaskStep(){
                this.gridOptions.api.setRowData(this.form.dopETLReTaskStepList);
            },

            async onAddStep(row){
                this.gridOptions.api.updateRowData({add: [row]});
            },
            async onEditStep(row){
                this.gridOptions.api.updateRowData({update: [row]});
            },
            add(){
                this.showDlg('add',{},this.onAddStep.bind(this))
            },
            deleteTaskStep(params){
                this.gridOptions.api.updateRowData({remove: [params.data]});
            },
            editTaskStep(params){
                this.showDlg('edit',params,this.onEditStep.bind(this))
            },

            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    taskStep,
                    {
                        args: {row, mode, actionOk},
                        width: '40%',
                        title: this.$dialog.formatTitle('任务步骤', mode),
                    }
                );
            },
            openCron() {
                this.showHzDlg(this.form.exeCron, this.setExecScheduler.bind(this));
            },

            showHzDlg(cornObj, action) {
                this.$nav.showDialog(
                    'gf-cron-modal',                    //  时间频率组件，组件名传入即可
                    {
                        args: {
                            showType:'second,minute,hour,day',     //  显示频率操作类型，默认'second,minute,hour,day,month'
                            cornObj,                    //  时间频率串，形如：00#01#01#* * * * * ?
                            action                      //  操作完成回调
                        },
                        width: '530px',
                        title: this.$dialog.formatTitle('执行频率', "edit"),
                    }
                );
            },

            setExecScheduler(cron) {
                this.form.exeCron = cron;
            },
            onCancel() {
                this.$emit("onClose");
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                this.form.dopETLReTaskStepList = this.gridOptions.api.getRenderedNodes().map(node=> {
                    return node.data;
                })
                if(this.form.dopETLReTaskStepList===null || this.form.dopETLReTaskStepList.length===0 ){
                    this.$msg.warning('任务步骤不能为空');
                    return ;
                }
                try {
                    if(this.mode==="add"){
                        const p = this.$api.dataPipeApi.addTask(this.form);
                        await this.$app.blockingApp(p);
                    }else{
                        const p = this.$api.dataPipeApi.updateTask(this.form);
                        await this.$app.blockingApp(p);
                    }
                    if (this.actionOk) {
                        await this.actionOk();  // 传入的结束回调事件
                    }
                    this.$msg.success('保存成功');
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>

<style scoped>

</style>
