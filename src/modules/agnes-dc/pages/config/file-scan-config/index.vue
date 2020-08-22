<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="file-scan-config-field"
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
import FileScanConfigDetail from './file-scan-config-detail'
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
            addFileAnaly() {
                this.showFileAnalyConfig({},'add', this.onAdd.bind(this));
            },
            editFileAnaly(params){
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
                    title: ['文件扫描配置',mode],
                    component: FileScanConfigDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            startFileMove(params){
                this.updateFileMove(params,'1');
            },
            stopFileMove(params){
                this.updateFileMove(params,'0');
            },
            async updateFileMove(params,status){
                const p = this.$api.fileScan.updateStatus(params.data.scanId,status);
                await this.$app.blockingApp(p);
                this.reloadData();
            },
            async deleteFileAnaly(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除配置:[${row.scanName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.fileScan.deleteFileScan(row.scanId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>