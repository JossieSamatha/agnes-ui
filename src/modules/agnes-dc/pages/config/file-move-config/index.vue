<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="file-move-config-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFileMove" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
import FileMoveConfigDetail from './file-move-config-detail'
import FileMoveConfigModel from './file-move-config-Model'
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
            addFileMove() {
                this.showFileMoveConfig({},'add', this.onAdd.bind(this));
            },
            editFileMove(params){
                this.showFileMoveConfig(params.data,'edit' , this.onUpdate.bind(this));
            },
            showDetail(params){
                this.showFileMoveConfig(params.data,'view' , this.onUpdate.bind(this));
            },
            editFromServer(params){
                this.showMoveModel(params.data,'edit' , this.onUpdate.bind(this));
            },
            showMoveModel(row, mode, actionOk){
                this.$nav.showDialog(
                    FileMoveConfigModel,
                    {
                        args: {row, mode, actionOk},
                        width: '900px',
                        title: this.$dialog.formatTitle('从服务器配置', mode),
                    }
                );
            },
            showFileMoveConfig(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['文件搬运配置',mode],
                    component: FileMoveConfigDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            async deleteFileMove(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除配置:[${row.copyName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.fileMove.deleteCopyConf(row.copyId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>