<template>
    <div>
        <gf-grid @row-double-click="showRisk" grid-no="agnes-monitor-risk-type" ref="grid" toolbar="find,refresh,more"></gf-grid>
    </div>
</template>

<script>
    import MonitorRiskType from "./monitor-risk-type";
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, ui, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }

                let title = this.$dialog.formatTitle("处理风险",mode);
                if(mode == 'check'){
                    title = '';
                }
                this.$nav.showDialog(
                    MonitorRiskType,
                    {
                        args: {row, mode, ui, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async onAddRisk() {
                await this.reloadData();
            },
            showRisk(params) {
                this.showDlg('view', params.data);
            },
            editRisk(params) {
                this.showDlg('edit', params.data, "1", this.onAddRisk.bind(this));
            },
            approveRisk(params){
                this.showDlg('check', params.data, "2", this.onAddRisk.bind(this));

            },
            async deleteRisk(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中风险信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.monitorRiskApi.deleteRisk(row.pkId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
    }
</script>
