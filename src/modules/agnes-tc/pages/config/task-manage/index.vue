<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="发起时间" >
                    <el-date-picker
                            style="width:100%"
                            v-model="queryArgs.execStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="任务类型">
                    <gf-dict filterable clearable v-model="queryArgs.taskType" dict-type="AGNES_TASK_TYPE" />
                </el-form-item>
                <el-form-item label="完成状态">
                    <gf-dict filterable clearable v-model="queryArgs.taskStatus" dict-type="AGNES_TASK_MGR_STATUS"/>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="agnes-task-manage" :query-args="queryArgs" ref="grid">

        </gf-grid>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'execStartTime':'',
                    'taskType':'',
                    'taskStatus':'',
                }
            }
        },
        beforeMount() {
            this.getExeTime();
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'execStartTime':'',
                    'taskType':'',
                    'taskStatus':'',
                };
                this.reloadData();
            },
            async getExeTime() {
                this.queryArgs.execStartTime = window.bizDate;
                await this.reloadData();
            },
            async checkTask(params){
                const rowData = params.data;
                if(rowData.taskStatus !== '00'){
                    this.$msg.warning("该状态无法复核!");
                    return ;
                }
                const ok = await this.$msg.ask(`是否复核通过?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskManageApi.checkTask({pkId:rowData.pkId,taskId:rowData.taskId,taskStatus:'02'});
                    await this.$app.blockingApp(p);
                    this.$msg.success('复核成功');
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async cancelTask(params){
                const rowData = params.data;
                if(rowData.taskStatus.match(/06|05/)){
                    this.$msg.warning("该状态无法作废!");
                    return ;
                }
                const ok = await this.$msg.ask(`是否作废该任务?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskManageApi.cancelTask(rowData);
                    await this.$app.blockingApp(p);
                    this.$msg.success('作废成功');
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }

        }
    }
</script>