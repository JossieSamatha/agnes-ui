<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="file-analy-config-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <gf-button class="action-btn" @click="addFileAnaly" size="mini" v-if="$hasPermission('dataservice.fileanaly.config.add')">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
import FileAnalyConfigDetail from './file-analy-config-detail'
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
                    width: 'calc(100% - 250px)',
                    title: ['文件解析配置',mode],
                    component: FileAnalyConfigDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            async deleteFileAnaly(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除配置:[${row.ifName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.fileAnaly.delete(row.pkId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>