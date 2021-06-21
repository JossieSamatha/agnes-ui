<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="任务类型">
                    <gf-dict filterable clearable :aria-multiselectable="true" v-model="queryArgs.taskType" dict-type="AGNES_TASK_TYPE" />
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid ref="grid"
                 grid-no="agnes-mult-task-field"
                 :query-args="queryArgs"
                 quick-text-max-width="300px"
                 height="100%"
                 @selected-changed = "selectedChanged"
                 @row-double-click="showTask">
            <template slot="left">
                <gf-button class="action-btn" @click="addTask">添加</gf-button>
                <gf-button :disabled="!uploadStatus" class="action-btn"  @click="confFlowNode" size="mini" >{{title}}任务节点</gf-button>
                <gf-button class="action-btn" :disabled="!isCheckOne" @click="copyTask">复制</gf-button>
                <gf-button class="action-btn" :disabled="!isCheckOne" @click="exportFlow" size="mini"  v-if="$hasPermission('agnes.config.mult.task.exportFlow')">导出</gf-button>
                <el-upload style="margin-left: 4px"
                           ref="upload"
                           :limit="1"
                           action
                           :auto-upload="false"
                           :show-file-list="false"
                           :on-change="importFlow"
                           accept=".txt">
                    <gf-button class="action-btn" slot="trigger" size="mini"  v-if="$hasPermission('agnes.config.mult.task.importFlow')">导入</gf-button>
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
                    <gf-button  :disabled="!uploadStatus" class="action-btn" slot="trigger" size="mini"   v-if="$hasPermission('agnes.config.mult.task.uploadFile')">批量导入任务节点</gf-button>
                </el-upload>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import TaskDetail from "./mult-task-config";
    import {transferCaseDefData} from '../../../util/transferCaseData.js'

    export default {
        data() {
            return {
                title:'配置',
                uploadStatus:false,
                isCheckOne:false,
                queryArgs:{
                    'taskName':'',
                    'taskType':'',
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs.taskName = '';
                this.queryArgs.taskType = '';
                this.reloadData();
            },
            selectedChanged(){
                let rows = this.$refs.grid.getSelectedRows();
                if(rows.length==1){
                    this.isCheckOne = true;
                    if(rows[0].reTaskDef.taskType== "2" || rows[0].reTaskDef.taskType== "8"){
                        this.uploadStatus = true;
                        if(rows[0].reTaskDef.taskStatus != "03"){
                            this.title = '配置';
                        }else {
                            this.title = '查看';
                        }
                    }else {
                        this.uploadStatus = false;
                    }
                }else {
                    this.uploadStatus = false;
                    this.isCheckOne = false;
                }
            },
            async showDrawer(mode, row, actionOk) {
                if(mode!='add' && !row.reTaskDef.taskType.match(/2|8/)){
                    const p = this.$api.caseConfigApi.selectTaskCaseBody(row.caseDefId)
                    let  rep = await this.$app.blockingApp(p);
                    row.caseDefBody = rep.data.caseDefBody;
                }
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
                    width: 'calc(100% - 250px)',
                    title: ['综合任务配置',mode],
                    component: TaskDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: row.isCheck ? '审核' : '保存',
                    cancelButtonTitle: cancelTitle,
                    pageEl: this.$el
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
            async showTask(params) {
                this.showDrawer('view', params.data);
            },
            async editTask(params) {
                this.showDrawer('edit', params.data, this.onEditModel.bind(this));
            },
            async deleteTask(params) {
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
            async checkTask(params){
                if(!params.data.reTaskDef.taskType.match(/2|8/)){
                    const p = this.$api.caseConfigApi.selectTaskCaseBody(params.data.caseDefId)
                    let  rep = await this.$app.blockingApp(p);
                    params.data.caseDefBody = rep.data.caseDefBody;
                }
                if(params.data.reTaskDef.taskStatus.match(/01|04/)){
                    this.showDrawer('check', params.data, this.onAddModel.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }
            },

            // 发布
            async checkMotBeforePublish(params){
                const rowData = params.data;
                if(rowData.reTaskDef.taskStatus.match(/00|01|03|04/)){
                    this.$msg.warning("该状态无法发布!");
                    return ;
                }
                const ok = await this.$msg.ask(`确认发布任务:[${rowData.reTaskDef.taskName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                const p = this.$api.caseConfigApi.selectTaskCaseBody(rowData.caseDefId)
                let  rep = await this.$app.blockingApp(p);
                rowData.caseDefBody = rep.data.caseDefBody;
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
            confFlowNode(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }
                if(!row.reTaskDef.taskType.match(/2|8/)){
                    this.$msg.warning("请选择流程任务进行配置!");
                    return ;
                }
                let mode = 'add';
                if(row.reTaskDef.taskStatus == '03'){
                    mode = 'view'
                }
                this.showFlowNode({caseDefInfo:row},mode,this.onAddModel.bind(this))
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
            async copyTask(){
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
                copyRowData.caseDefId = '';
                copyRowData.reTaskDef.caseDefId = '';
                this.showDrawer('edit', copyRowData, this.onEditModel.bind(this));
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
