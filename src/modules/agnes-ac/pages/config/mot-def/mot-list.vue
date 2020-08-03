<template>
    <gf-grid ref="grid"
             grid-no="agnes-mot-field"
             quick-text-max-width="300px"
             height="100%"
             @row-double-click="showTask">
        <template slot="left">
            <gf-button class="action-btn" @click="addTask">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import MotDetail from "./mot-detail";
    import {transferCaseDefData} from '../../../util/transferCaseData.js'

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['MOT任务编辑',mode],
                    component: MotDetail,
                    args: {row, mode, actionOk},
                    okButtonTitle: row.isCheck ? '审核' : '保存',
                    cancelButtonTitle: row.isCheck ? '反审核' : '取消',
                });
            },
            async onAddModel() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addTask() {
                this.showDrawer('add', {}, this.onAddModel.bind(this));
            },
            showTask(params) {
                this.showDrawer('view', params.data);
            },
            editKpiTask(params) {
                this.showDrawer('edit', params.data, this.onEditModel.bind(this));
            },
            async deleteKpiTask(params) {
                const row = params.data.reTaskDef;
                const ok = await this.$msg.ask(`确认删除任务:[${row.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskDefineApi.deleteTask(row.taskId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            //复核
            checkKpiTask(params){
                if(params.data.reTaskDef.needApprove==='1'&&params.data.reTaskDef.taskStatus==='01' || params.data.reTaskDef.needApprove==='1'&&params.data.reTaskDef.taskStatus==='04'){
                    params.data.isCheck = true;
                    this.showDrawer('view', params.data, this.onAddModel.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }
            },

            // 发布
            async publishKpiTask(params){
                const rowData = params.data;
                if(rowData.reTaskDef.taskStatus === '00' || rowData.reTaskDef.taskStatus === '01' || rowData.reTaskDef.taskStatus === '04' || rowData.reTaskDef.taskStatus === '03'){
                    this.$msg.warning("该状态无法发布!");
                    return ;
                }
                const ok = await this.$msg.ask(`确认发布任务:[${rowData.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    let sendInfo = transferCaseDefData(JSON.parse(rowData.caseDefBody), rowData.reTaskDef.caseKey,rowData.reTaskDef.taskName,'list');
                    rowData.caseDefJson = JSON.stringify(sendInfo);
                    const p = this.$api.caseConfigApi.publishCaseDef(rowData);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

        }
    }
</script>

<style scoped>

</style>
