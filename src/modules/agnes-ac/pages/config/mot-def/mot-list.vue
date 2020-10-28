<template>
    <gf-grid ref="grid"
             grid-no="agnes-mot-field"
             quick-text-max-width="300px"
             height="100%"
             @row-double-click="showTask">
        <template slot="left">
            <gf-button class="action-btn" @click="addTask" v-if="$hasPermission('agnes.config.mot.add')">添加</gf-button>
            <gf-button class="action-btn" @click="copyMotTask" v-if="$hasPermission('agnes.config.mot.copy')">复制</gf-button>
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
                let cancelTitle = '取消';
                if(mode==='view'){
                    cancelTitle = '关闭';
                }
                let isShow = true;
                row.isCheck=false;
                if(mode==='check'){
                    mode='view';
                    row.isCheck=true;
                    cancelTitle = '反审核';
                }
                if(!row.isCheck && mode==='view'){
                    isShow = false;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['MOT任务配置',mode],
                    component: MotDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: row.isCheck ? '审核' : '保存',
                    cancelButtonTitle: cancelTitle,
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
            //停止
            async stopAndCancelTask(params){
                const ok = await this.$msg.ask(`确认停止任务:[${params.data.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.taskDefineApi.stopAndCancelTask({"taskId":params.data.reTaskDef.taskId});
                    await this.$app.blockingApp(p);
                    this.$msg.success("任务已停止!");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            //复核
            checkTask(params){
                if(params.data.reTaskDef.taskStatus.match(/01|04/)){
                    this.showDrawer('check', params.data, this.onAddModel.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }
            },

            // 发布
            async checkMotBeforePulish(params){
                const rowData = params.data;
                if(rowData.reTaskDef.taskStatus.match(/00|01|03|04/)){
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
                    this.$msg.success('发布成功');
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            copyMotTask(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }else{
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let copyRowData = this.$utils.deepClone(row);
                copyRowData.reTaskDef.taskId = '';
                copyRowData.reTaskDef.taskName = '';
                copyRowData.reTaskDef.caseKey = '';
                copyRowData.reTaskDef.jobId = '';
                copyRowData.reTaskDef.taskStatus = '01';
                copyRowData.caseDefId = '';
                copyRowData.reTaskDef.caseDefId = '';
                this.showDrawer('edit', copyRowData, this.onEditModel.bind(this));
            }

        }
    }
</script>