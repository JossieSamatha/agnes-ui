<template>
    <div>
        <gf-grid  grid-no="agnes-monitor-risk-type" ref="grid" toolbar="find,refresh,more">
            <template slot="left">
                <gf-button class="action-btn" @click="dealRisk" size="mini">处理风险</gf-button>
                <gf-button class="action-btn" @click="checkRisk" size="mini">复核</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import MonitorRiskType from "./monitor-risk-type";
    export default {
        methods: {

            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row,ui, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    MonitorRiskType,
                    {
                        args: {row, mode, actionOk,ui},
                        width: '50%',
                        title: this.$dialog.formatTitle('处理风险', mode),
                    }
                );
            },
            async onAddRisk() {
                await this.reloadData();
            },

            dealRisk() {
                let t = this.$refs.grid.getSelectedRows();
                if (t[0].status.match(/00/)){
                    this.showDlg('edit',t[0],1, this.onAddRisk.bind(this));
                }else {
                    this.$msg.warning("该状态无法处理!");
                    return;
                }
            },
            checkRisk(){
                let t = this.$refs.grid.getSelectedRows();
                if (t[0].status.match(/01/)){
                    this.showDlg('ed it',t[0],2, this.onAddRisk.bind(this));
                }else {
                    this.$msg.warning("该状态无法处理!");
                    return;
                }
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

<style scoped>

</style>
