<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="业务类别" prop="taskId">
                    <el-select v-model="queryArgs.taskId" placeholder="请选择">
                        <el-option
                                v-for="item in taskTypeOptions"
                                :key="item.taskId"
                                :label="item.taskName"
                                :value="item.taskId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审单状态" >
                    <el-select v-model="queryArgs.approveStatus" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="上传时间" style="max-width: 700px">
                    <el-date-picker
                            v-model="uploadTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="agnes-icr-task" :query-args="queryArgs" ref="grid"  quick-text-max-width="300px">
            <template slot="left">
                <gf-button class="action-btn" @click="addIcrTask">添加</gf-button>
                <gf-button class="action-btn" @click="icrResultQuery">识别结果刷新</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import IcrTaskDlg from "./icr-task-dlg";

    export default {
        data() {
            return {
                uploadTime:[],
                queryArgs:{
                    'taskId':'',
                    'approveStatus':'',
                    'startDate':'',
                    'endDate':'',
                },
                taskTypeOptions:[],
                options: [{
                    value: '06',
                    label: '通过'
                }, {
                    value: '0',
                    label: '不通过'
                }],
            }
        },
        beforeMount() {
            this.getOptions();
        },
        methods: {
            async getOptions(){
                const e = this.$api.taskDefineApi.getTaskListByType({taskType:'8'});
                const taskR = await this.$app.blockingApp(e);
                if(taskR.data) {
                    this.taskTypeOptions = taskR.data
                }
            },
            reloadData() {
                if(this.uploadTime){
                    this.queryArgs.startDate = this.uploadTime[0];
                    this.queryArgs.endDate = this.uploadTime[1];
                }else {
                    this.queryArgs.startDate = '';
                    this.queryArgs.endDate = '';
                }
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskId':'',
                    'approveStatus':'',
                    'startDate':'',
                    'endDate':'',
                };
                this.reloadData();
            },
            async addIcrTask() {
                this.showDrawer('add', {}, this.onAddModel.bind(this));
            },
            async viewTask(param) {
                this.showDrawer('view', param.data, this.onAddModel.bind(this));
            },
            toShowTaskProcess(param){
                let task = param.data;
                this.$agnesUtils.closeTab('agnes.icr.elec.operate');
                let clientView = this.$app.views.getView('agnes.icr.elec.operate');
                let clientTabView = Object.assign({args: {taskExecId:task.taskExecId,taskFlowType:task.flowType}, id: 'agnes.icr.elec.operate'}, clientView);
                this.$nav.showView(clientTabView);
            },
            showDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = this.$dialog.formatTitle('新增任务', mode);
                if(mode == 'view'){
                    title = '查看任务';
                }
                this.$nav.showDialog(
                    IcrTaskDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '60%',
                        title: title,
                    }
                );
            },
            async onAddModel() {
                this.reloadData();
            },
            async icrResultQuery(){
                try {
                    const p = this.$api.icrTaskApi.icrResultQuery();
                    await this.$app.blockingApp(p);
                    this.$msg.success('识别结果刷新完成！');
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async deleteTask(params){
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除该任务吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.icrTaskApi.deleteIcrTask(row.taskExecId);
                    await this.$app.blockingApp(p);
                    this.$msg.success('删除成功');
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }

            }
        }
    }
</script>