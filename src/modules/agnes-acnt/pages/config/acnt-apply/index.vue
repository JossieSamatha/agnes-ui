<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="账号" >
                    <el-input v-model="queryArgs.account"></el-input>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="账户类型">
                    <gf-dict filterable clearable v-model="queryArgs.taskType" dict-type="AGNES_TASK_TYPE" />
                </el-form-item>
                <el-form-item label="状态">
                    <gf-dict filterable clearable v-model="queryArgs.taskStatus" dict-type="AGNES_TASK_MGR_STATUS"/>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="acnt-apply-field" :query-args="queryArgs" ref="grid">
            <template slot="left">
                <gf-button  class="action-btn" @click="openApply">开户</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntApplyOpen from "./acnt-apply-open";
    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'account':'',
                    'taskType':'',
                    'taskStatus':'',
                }
            }
        },
        beforeMount() {
      
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'account':'',
                    'taskType':'',
                    'taskStatus':'',
                };
                this.reloadData();
            },
            showOpenDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户开户',mode],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            onOpenApply(){
                this.reloadData();
            },
            openApply() {
                this.showOpenDlg('add', {}, this.onOpenApply.bind(this));
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