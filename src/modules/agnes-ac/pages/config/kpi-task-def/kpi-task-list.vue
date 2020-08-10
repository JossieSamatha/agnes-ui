<template>
    <gf-grid ref="grid"
             grid-no="agnes-kpi-task"
             quick-text-max-width="300px"
             height="100%"
             @row-double-click="showTask">
        <template slot="left">
            <gf-button class="action-btn" @click="addTask">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import KpiTaskDetail from "./kpi-task-detail";
    // import {transferCaseDefData} from '../../../util/transferCaseData.js'

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
                    title: ['监控指标任务配置',mode],
                    component: KpiTaskDetail,
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

            //复核
            checkKpiTask(params){
                if(params.data.reTaskDef.taskStatus.match(/01|04/)){
                    this.showDrawer('check', params.data, this.onAddModel.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }

            },

            async checkBeforePulish(params){
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
                    const p = this.$api.kpiTaskApi.checkBeforePulish({taskId:rowData.reTaskDef.taskId});
                    const resp = await this.$app.blockingApp(p);
                    if(resp.code !== '00000000'){
                        this.$msg.warning(resp.message);
                        return ;
                    }
                    await this.publishKpiTask(params);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            // 发布
            async publishKpiTask(params){
                const rowData = params.data;
                try {
                    let sendInfo = this.handleData(JSON.parse(rowData.caseDefBody), rowData.reTaskDef.caseKey,rowData.reTaskDef.taskName);
                    rowData.caseDefJson = JSON.stringify(sendInfo);
                    const p = this.$api.caseConfigApi.publishCaseDef(rowData);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            //切除数据层级
            handleData(dataOrigin,caseDefKey,caseDefName) {
                let caseDef =JSON.parse(JSON.stringify(dataOrigin))
                let newCaseModelData = caseDef.stages;
                for (let i = 0; i < newCaseModelData.length; i++) {
                    const steps = [];
                    if (newCaseModelData[i].children && newCaseModelData[i].children.length > 0) {
                        this.recursionData(newCaseModelData[i].children, steps,caseDefKey);
                    }
                    newCaseModelData[i].steps = steps;
                    // newCaseModelData[i].children = [];
                    delete newCaseModelData[i].children
                }
                caseDef.stages=newCaseModelData;
                caseDef.defType='case';
                caseDef.defId='';
                caseDef.caseDefKey=caseDefKey;
                caseDef.defName=caseDefName;
                return caseDef
            },
            //递归用函数
            recursionData(nowData,steps,caseDefKey){
                for(let i=0;i<nowData.length;i++){
                    if(nowData[i].defType==='step'){
                        let currentData = {};
                        currentData['@stepType'] = nowData[i].stepActType;
                        Object.assign(currentData, nowData[i]);
                        currentData.autoActive = true;
                        currentData.defName = currentData.stepName;
                        currentData.defId = caseDefKey;
                        let actionDef = {
                            "automation":true,
                        };
                        currentData.actionDef = actionDef;
                        delete currentData.stepName;
                        delete currentData.stepCode;
                        if(currentData.stepFormInfo){
                            let temporaryData = JSON.parse(JSON.stringify(currentData.stepFormInfo));
                            delete currentData.stepFormInfo
                            let sentryInData = {};
                            let sentryOut = {};
                            sentryInData.ifExpr = temporaryData.activeRuleTableData
                            sentryOut.ifExpr = temporaryData.successRuleTableData
                            currentData.sentryIn = sentryInData
                            currentData.sentryOut = sentryOut
                        }
                        steps.push(currentData)
                        //如需改变数据，在此处修改
                    }else if(nowData[i].defType==='group'){
                        this.recursionData(nowData[i].steps,steps)
                    }
                }
            },

        }
    }
</script>

<style scoped>

</style>
