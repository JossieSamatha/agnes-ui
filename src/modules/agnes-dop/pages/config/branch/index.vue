<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="branch-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFileAnaly" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
import BranchDetail from './branch-detail'
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async onAdd() {
                await this.reloadData();
            },
            async onUpdate() {
                await this.reloadData();
            },
            // copyFileScanConfig(){
            //     let rows = this.$refs.grid.getSelectedRows();
            //     let row =[];
            //     if(rows.length>0){
            //         row = rows[0];
            //     }else{
            //         this.$msg.warning("请选中一条记录!");
            //         return;
            //     }
            //     let copyRowData = this.$utils.deepClone(row);
            //     copyRowData.jobId = "";
            //     copyRowData.scanCode = "";
            //     copyRowData.scanId = "";
            //     copyRowData.scanName = "";
            //     this.showFileAnalyConfig(copyRowData,'edit' , this.onUpdate.bind(this));
            // },
            addFileAnaly() {
                this.showFileAnalyConfig({},'add', this.onAdd.bind(this));
            },
            editBranch(params){
                this.showFileAnalyConfig(params.data,'edit' , this.onUpdate.bind(this));
            },
            showDetail(params){
                this.showFileAnalyConfig(params.data,'view' , this.onUpdate.bind(this));
            },
            showFileAnalyConfig(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['网点维护',mode],
                    component: BranchDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            // startFileMove(params){
            //     this.updateFileMove(params,'03');
            // },
            // stopFileMove(params){
            //     this.updateFileMove(params,'00');
            // },
            // checkFile(params){
            //     this.updateFileMove(params,'02');
            // },
            async deleteBranch(params){
                const p = this.$api.branchApi.deteleData(params.data.bankBranchId);
                await this.$app.blockingApp(p);
                this.reloadData();
            },
            // async deleteFileAnaly(params) {
            //     const row = params.data;
            //     const ok = await this.$msg.ask(`确认删除配置:[${row.scanName}]吗, 是否继续?`);
            //     if (!ok) {
            //         return
            //     }
            //     try {
            //         const p = this.$api.fileScan.deleteFileScan(row.scanId);
            //         await this.$app.blockingApp(p);
            //         this.reloadData();
            //     } catch (reason) {
            //         this.$msg.error(reason);
            //     }
            // },
        }
    }
</script>