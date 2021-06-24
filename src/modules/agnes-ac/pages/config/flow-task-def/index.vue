<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="flow-task-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showFlowTaskDetail"
                 @selected-changed = "selectedChanged"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFlowTask" size="mini" v-if="$hasPermission('agnes.app.business.flowconf.add')">添加</gf-button>
                <gf-button :disabled="!uploadStatus" class="action-btn"  @click="confFlowNode" size="mini" >{{title}}任务节点</gf-button>
                <gf-button class="action-btn" :disabled="!isCheckOne" @click="copyFlow" size="mini" v-if="$hasPermission('agnes.app.business.flowconf.copy')">复制</gf-button>
                <gf-button class="action-btn" :disabled="!uploadStatus" @click="exportFlow" size="mini"  v-if="$hasPermission('agnes.app.business.flowconf.exportFlow')">导出</gf-button>
                <el-upload style="margin-left: 4px"
                        ref="upload"
                        :limit="1"
                        action
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="importFlow"
                        accept=".txt">
                    <gf-button class="action-btn" slot="trigger" size="mini"  v-if="$hasPermission('agnes.app.business.flowconf.importFlow')">导入</gf-button>
                </el-upload>
                <el-upload style="margin-left: 4px"
                        ref="uploadCase"
                        :limit="1"
                        action="/api/agnes-ac/v1/ac/flow/task/case/upload-case-file"
                        :auto-upload="false"
                        :show-file-list="false"
                        :data="getFileData()"
                        :on-change="uploadFile"
                        :disabled="!uploadStatus"
                        :on-success="handleAvatarSuccess"
                        accept=".xls,.xlsx">
                    <gf-button  :disabled="!uploadStatus" class="action-btn" slot="trigger" size="mini"   v-if="$hasPermission('agnes.app.business.flowconf.uploadFile')">批量导入任务节点</gf-button>
                </el-upload>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import FlowTaskDetail from './flow-task-detail'

    export default {
        data() {
            return {
                title:'配置',
                uploadStatus:false,
                isCheckOne:false,
            }
        },
        methods: {
            selectedChanged(){
                let rows = this.$refs.grid.getSelectedRows();
                if(rows.length==1){
                    this.uploadStatus = true;
                    this.isCheckOne = true;
                    if(rows[0].reTaskDef.taskStatus != "03"){
                        this.title = '配置';
                    }else {
                        this.title = '查看';
                    }
                }else{
                    this.uploadStatus = false;
                    this.isCheckOne = false;
                }
            },
            showFlowTask(row, mode, actionOk){
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

                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['电子流程任务配置',mode],
                    component: FlowTaskDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: row.isCheck ? '审核' : '保存',
                    cancelButtonTitle: cancelTitle,
                    pageEl: this.$el

                })
            },
            reloadData() {
                this.$refs.grid.reloadData();
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
                this.showFlowTask(params.data, 'edit', this.onUpdateFlowTask.bind(this));
            },
            showFlowTaskDetail(params){
              this.showFlowTask(params.data, 'view', this.onUpdateFlowTask.bind(this));
            },
            confFlowNode(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }
                let mode = 'add';
                if(row.reTaskDef.taskStatus == '03'){
                    mode = 'view'
                }
                this.showFlowNode({caseDefInfo:row},mode,this.onAddFlowTask.bind(this))
            },
            showFlowNode(row, mode, actionOk) {
                // 抽屉创建
                if (row.caseDefInfo.length === 0) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['任务节点配置'],
                    component: 'case-config-index',
                    okButtonVisible:mode=='view'?false:true,
                    args: {row, mode, actionOk},
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
            checkFlowTask(params){
                if(params.data.reTaskDef.taskStatus.match(/01|04/)){
                  this.showFlowTask(params.data, 'check', this.onAddFlowTask.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }

            },
            async publishFlowTask(params) {
                const rowData = params.data;
                if(rowData.reTaskDef.taskStatus.match(/00|01|04|03/)){
                    this.$msg.warning("该状态无法发布!");
                    return ;
                }
                if(!rowData.caseDefBody || JSON.parse(rowData.caseDefBody).stepCodeArr.length===0){
                    this.$msg.warning(`[${rowData.reTaskDef.taskName}]，未配置流程任务节点`);
                    return;
                }
                const ok = await this.$msg.ask(`确认发布任务:[${rowData.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                const p = this.$api.caseConfigApi.selectTaskCaseBody(rowData.caseDefId)
                let  rep = await this.$app.blockingApp(p);
                rowData.caseDefBody = rep.data.caseDefBody;
                try {
                    rowData.caseDefJson = JSON.stringify(this.checkData(JSON.parse(rowData.caseDefBody), rowData.reTaskDef.caseKey,rowData.reTaskDef.taskName));
                    const p = this.$api.caseConfigApi.publishCaseDef(rowData);
                    await this.$app.blockingApp(p);
                    this.$msg.success("发布成功!");
                    this.$emit("onClose");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            checkData(dataOrigin,caseDefKey,caseDefName) {
                let data =JSON.parse(JSON.stringify(dataOrigin))
                delete data.stepCodeArr
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
                        let stepActType = '';
                        if(nowData[i].stepActType === '6'){
                            stepActType = 'form'
                        }else {
                            stepActType = 'action';
                        }
                        currentData['@stepType'] = stepActType;
                        Object.assign(currentData, nowData[i]);
                        delete currentData.stepName;
                        delete currentData.stepCode;
                        if(currentData.stepFormInfo){
                            let temporaryData = JSON.parse(JSON.stringify(currentData.stepFormInfo));
                            delete currentData.stepFormInfo
                            let sentryInData = {};
                            let sentryOut = {};
                            let sentryEx = {};
                            let sentryTsOut = {};
                            sentryInData.ifExpr = temporaryData.activeRuleTableData.ruleBody
                            sentryOut.ifExpr = temporaryData.successRuleTableData.ruleBody
                            sentryEx.ifExpr = temporaryData.failRuleTableData.ruleBody
                            if(temporaryData.timeoutRuleTableData){
                                sentryTsOut.ifExpr = temporaryData.timeoutRuleTableData.ruleBody
                            }
                            currentData.defId = temporaryData.caseStepDef.stepCode;
                            currentData.sentryIn = sentryInData
                            currentData.sentryOut= sentryOut
                            currentData.sentryEx = sentryEx
                            currentData.sentryTsOut = sentryTsOut
                            currentData.actionDef = {'automation':true}
                            currentData.autoActive = !temporaryData.activeRuleTableData.ruleBody;
                        }
                        steps.push(currentData)
                        //如需改变数据，在此处修改
                    }else if(nowData[i].defType==='group'){
                        this.recursionData(nowData[i].steps,steps)
                    }
                }
            },

            async copyFlow(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }else{
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let copyRowData = this.$utils.deepClone(row);
                const p = this.$api.caseConfigApi.selectTaskCaseBody(copyRowData.caseDefId)
                let  rep = await this.$app.blockingApp(p);
                copyRowData.caseDefBody = rep.data.caseDefBody;
                copyRowData.reTaskDef.taskId = '';
                copyRowData.reTaskDef.taskName = '';
                copyRowData.reTaskDef.caseKey = '';
                copyRowData.reTaskDef.jobId = '';
                copyRowData.reTaskDef.taskStatus = '01';
              copyRowData.reTaskDef.caseDefId = '';
              this.showFlowTask(copyRowData, 'edit', this.onUpdateFlowTask.bind(this));
            },
            async exportFlow(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }else{
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                row.reTaskDef.taskId = ''
                row.reTaskDef.jobId = ''
                let fileName = row.reTaskDef.taskName + ".txt";
                const p = this.$api.caseConfigApi.selectTaskCaseBody(row.caseDefId)
                let  rep = await this.$app.blockingApp(p);
                row.caseDefBody = rep.data.caseDefBody;
                row.isCheckCode = true;
                const rowData =  JSON.stringify(row);
                this.exportRaw(fileName,rowData);
            },
            fakeClick(obj) {
                let ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                obj.dispatchEvent(ev);
            },
            exportRaw(name, data) {
                let urlObject = window.URL || window.webkitURL || window;
                let export_blob = new Blob([data]);
                let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                save_link.href = urlObject.createObjectURL(export_blob);
                save_link.download = name;
                this.fakeClick(save_link);
            },
            async importFlow(file){
                let fileName = file.name;
                if(!fileName.endsWith(".txt")){
                    this.$msg.warning("请导入TXT文件！");
                    return ;
                }
                let reader = new FileReader()
                reader.readAsText(file.raw)
                let data;
                reader.onload = async (e) => {
                    try {
                        data = JSON.parse(e.target.result);
                        const p = this.$api.taskDefineApi.queryTaskByCaseId(data.reTaskDef.caseKey)
                        const resp = await this.$app.blockingApp(p);
                        if(resp.data){
                            this.$msg.warning("["+data.reTaskDef.caseKey+"]-已存在该任务");
                            return ;
                        }
                        await this.$api.flowTaskApi.saveFlowTask(data);
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.reloadData();
                        this.$msg.success("导入成功");
                    } catch (reason) {
                        this.$msg.error(reason);
                    }
                }
                this.$refs.upload.clearFiles()
            },
            getFileData(){
                if(this.uploadStatus){
                    let rows = this.$refs.grid.getSelectedRows();
                    let caseTaskDto = rows[0];
                    let caseData = JSON.stringify(caseTaskDto);
                    let bizTagOption = this.$app.dict.getDictItems("AGNES_BIZ_TAG");
                    return {caseData:caseData,bizTag:JSON.stringify(bizTagOption)};
                }
            },
            handleAvatarSuccess(){

                this.$refs.uploadCase.clearFiles()
                this.$msg.success("上传解析成功!");
                this.$emit("onClose");
                this.reloadData();
            },

            uploadFile(){
                this.$refs.uploadCase.submit();
            }
        }
    }
</script>
