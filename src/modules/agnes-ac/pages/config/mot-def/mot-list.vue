<template>
    <gf-grid ref="grid"
             grid-no="agnes-kpi-task"
             quick-text-max-width="300px"
             height="100%"
             @row-double-click="showTask">
        <template slot="left">
            <gf-button class="action-btn" @click="addTask">新增</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import MotDetail from "./mot-detail";

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
                    component: MotDetail,
                    args: {row, mode, actionOk}
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

            // 复核
            async checkMotTask(params){
                const rowData = params.data;
                const ok = await this.$msg.ask(`确认复核任务:[${rowData.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                // try {
                //     let sendInfo = this.checkData(JSON.parse(rowData.caseDefBody), rowData.reTaskDef.caseKey,rowData.reTaskDef.taskName);
                //     rowData.caseDefJson = sendInfo;
                //     const p = this.$api.caseConfigApi.publishCaseDef(rowData);
                //     await this.$app.blockingApp(p);
                //     this.reloadData();
                // } catch (reason) {
                //     this.$msg.error(reason);
                // }
            },

            //切除数据层级
            checkData(dataOrigin,caseDefKey,caseDefName) {
                let data =JSON.parse(JSON.stringify(dataOrigin))
                let newCaseModelData = data.stages;
                for (let i = 0; i < newCaseModelData.length; i++) {
                    this.steps = [];
                    if (newCaseModelData[i].children && newCaseModelData[i].children.length > 0) {
                        this.recursionData(newCaseModelData[i].children, this.steps);
                    }
                    newCaseModelData[i].steps = this.steps;
                    // newCaseModelData[i].children = [];
                    delete newCaseModelData[i].children
                }
                data.stages=newCaseModelData;
                data.defType='case';
                data.defId='';
                data.caseDefKey=caseDefKey;
                data.defName=caseDefName;
                return data
            },
            //递归用函数
            recursionData(nowData,steps){
                for(let i=0;i<nowData.length;i++){
                    if(nowData[i].defType==='step'){
                        let currentData = nowData[i]
                        currentData.stepType = currentData.stepActType;
                        currentData.defName = currentData.stepName;
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
