<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="flow-task-field"
                 toolbar="find,refresh,more"
                 @row-double-click="showFlowTaskDetail"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFlowTask" size="mini">新增电子流程任务</gf-button>
                <gf-button class="action-btn" @click="confFlowNode" size="mini">配置流程任务节点</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import FlowTaskDetail from './flow-task-detail'
    export default {
        methods: {
            showFlowTask(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['电子流程任务',mode],
                    component: FlowTaskDetail,
                    wrapperClosable: false,
                    args: {row, mode, actionOk}
                })
            },
            reloadData() {
                this.$refs.grid.reloadData(true);
            },
            async onAddFlowTask() {
                await this.reloadData();
            },
            async onUpdateFlowTask() {
                await this.reloadData();
            },
            addFlowTask() {
                this.showFlowTask({},'add', this.onAddFlowTask.bind(this));
            },
            updateFlowTask(params){
                this.showFlowTask(params.data.reTaskDef,'edit' , this.onUpdateFlowTask.bind(this));
            },
            showFlowTaskDetail(params){
                this.showFlowTask(params.data.reTaskDef,'view' , this.onUpdateFlowTask.bind(this));
            },
            confFlowNode(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }
                this.showFlowNode({caseDefInfo:row},'add',this.onAddFlowTask.bind(this))
            },
            showFlowNode(row, mode, actionOk) {
                // 抽屉创建
                if (row.caseDefInfo.length === 0) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['流程任务节点配置'],
                    component: 'case-config-index',
                    args: {row, mode, actionOk}
                })
            },
            async deleteFlowTask(params) {
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
            async reviewFlowTask(params) {
                const rowData = params.data;
                if(rowData.reTaskDef.taskStatus === '2'){
                    this.$msg.warning(`[${rowData.reTaskDef.taskName}]，已复核`);
                    return;
                }
                if(!rowData.caseDefBody){
                    this.$msg.warning(`[${rowData.reTaskDef.taskName}]，未配置流程任务节点`);
                    return;
                }
                const ok = await this.$msg.ask(`确认复核任务:[${rowData.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    rowData.caseDefJson = JSON.stringify(this.checkData(JSON.parse(rowData.caseDefBody), rowData.reTaskDef.caseKey,rowData.reTaskDef.taskName));
                    const p = this.$api.caseConfigApi.publishCaseDef(rowData);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

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
                        let currentData = {};
                        currentData['@stepType'] = nowData[i].stepActType;
                        Object.assign(currentData, nowData[i]);
                        delete currentData.stepName;
                        delete currentData.stepCode;
                        if(currentData.stepFormInfo){
                            let temporaryData = JSON.parse(JSON.stringify(currentData.stepFormInfo));
                            delete currentData.stepFormInfo
                            let sentryInData = {};
                            let sentryOut = {};
                            sentryInData.ifExpr = temporaryData.activeRuleTableData
                            sentryOut.ifExpr = temporaryData.successRuleTableData
                            currentData.defId = temporaryData.caseStepDef.stepCode;
                            currentData.sentryIn = sentryInData
                            currentData. sentryOut= sentryOut
                            currentData.actionDef = {'automation':true}
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