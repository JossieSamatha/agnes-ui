<template>
    <div>
        <template>
            <gf-grid grid-no="agnes-service-conf-list" ref="grid" quick-text-max-width="300px"
                     @row-double-click="editService" @grid-ready="onReady">
                <template slot="left">
                    <gf-button class="action-btn" @click="addService" size="mini">新增</gf-button>
                </template>
            </gf-grid>
        </template>
    </div>
</template>

<script>
import ServiceDlg from "./service-dlg";

export default {
    props: {
        rowData: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        rowData(value) {
            if (this.grid) {
                this.grid.setRowData(value);
            }
        }
    },
    methods: {
        reloadData() {
            this.$refs.grid.reloadData();
        },
        onReady() {
            this.grid = this.$refs.grid;
            this.refreshRows();
        },
        refreshRows() {
            this.grid.setRowData(this.rowData);
        },
        addService(){
            this.showDlg('add', {}, this.onAddService.bind(this));
        },
        async onAddService() {
            this.reloadData();
        },
        editService(params){
            this.showDlg('edit', params.data, this.onEditService.bind(this));
        },
        async onEditService() {
            this.reloadData();
        },
        showDlg(mode, row, actionOk) {
            if (mode !== 'add' && !row) {
                this.$msg.warning("请选中一条记录!");
                return;
            }
            this.$nav.showDialog(
                ServiceDlg,
                {
                    args: {row, mode, actionOk},
                    width: '50%',
                    title: this.$dialog.formatTitle('服务响应等级配置', mode),
                }
            );
        },
        async deleteService(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认删除字段:[${row.serviceResponseName}]吗, 是否继续?`);
            if (!ok) {
                return
            }
            try {
                const p = this.$api.ServiceConfApi.deleteService(row.serviceResponseId);
                await this.$app.blockingApp(p);
                this.reloadData();
            } catch (reason) {
                this.$msg.error(reason);
            }
        }
    }
}
</script>

<style scoped>

</style>
