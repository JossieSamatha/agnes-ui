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
                    title: ['任务类型编辑',mode],
                    component: KpiTaskDetail,
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
