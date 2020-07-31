<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="agnes-case-field"
                 toolbar="find,refresh,more"
                 @row-double-click="showCaseStep"
         >
            <template slot="left">
                <gf-button class="action-btn" @click="addCaseDef" size="mini">添加</gf-button>
                <gf-button class="action-btn" @click="publishCaseDef" size="mini">发布</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import CaseDefDlg from "./case-field-dlg";
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData(true);
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    CaseDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '576px',
                        title: this.$dialog.formatTitle('case定义', mode),
                    }
                );
            },
            async onAddCaseDef() {
                await this.reloadData();
            },
            async onEditCaseDef() {
                await this.reloadData();
            },
            addCaseDef() {
                this.showDlg('add', {}, this.onAddCaseDef.bind(this));
            },
            showCaseDef(params) {
                this.showDlg('view', params.data);
            },
            editCaseDef(params) {
                this.showDlg('edit', params.data, this.onEditCaseDef.bind(this));
            },
            showCaseStep(params){
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    component: 'case-config-index',
                    wrapperClosable: true,
                    args: {caseDefInfo:params.data}
                })
            },
            async deleteCaseDef(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除case:[${row.caseDefName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.caseConfigApi.deleteCaseDef(row.caseDefId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
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
            async publishCaseDef(){
                let row;
                const rows = this.$refs.grid.getSelectedRows();
                if(rows.length>0){
                    row = rows[0];
                    if(row.caseStatus === '1'){
                        this.$msg.warning("该CASE已发布")
                        return;
                    }else{
                        row.caseStatus = '1';
                    }
                    if(!row.caseDefBody){
                        this.$msg.warning("请先配置CASE步骤再发布")
                        return;
                    }
                }else{
                    this.$msg.warning("请选择一条数据")
                    return;
                }
                try {
                    let rowAfterCheck = JSON.parse(row.caseDefBody)
                    let rowCaseDefBody = this.checkData(rowAfterCheck,row.caseDefKey,row.caseDefName)
                    row.caseDefBody = JSON.stringify(rowCaseDefBody)
                    const p = this.$api.caseConfigApi.publishCaseDef(row);
                    await this.$app.blockingApp(p);
                    this.$msg.success('发布成功');
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>
