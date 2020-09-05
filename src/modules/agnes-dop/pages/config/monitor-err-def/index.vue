<template>
    <div>
        <gf-grid  grid-no="agnes-monitor-err-type" ref="grid" toolbar="find,refresh,more">
            <template slot="left">
                <gf-button class="action-btn" @click="dealErr" size="mini">处理异常</gf-button>
                <gf-button class="action-btn" @click="checkErr" size="mini">复核</gf-button>
                <gf-button class="action-btn" @click="transferRisk" size="mini">调入风险事项</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import MonitorErrType from "./monitor-err-type";
    import MonitorErrList from "./monitor-err-list";
    export default {
        methods: {

            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row,ui, actionOk,type) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                if (type==='transfer'){
                    this.$nav.showDialog(
                        MonitorErrList,
                        {
                            args: {row, mode, actionOk},
                            width: '50%',
                            title: this.$dialog.formatTitle('调入风险', mode),
                        }
                    );
               }else {
                    this.$nav.showDialog(
                        MonitorErrType,
                        {
                            args: {row, mode, actionOk,ui},
                            width: '50%',
                            title: this.$dialog.formatTitle('处理异常', mode),
                        }
                    );
                }
            },
            async onAddErr() {
                await this.reloadData();
            },

            dealErr() {
                let t = this.$refs.grid.getSelectedRows();
                this.showDlg('edit',t[0],1, this.onAddErr.bind(this));

            },
            checkErr(){
                let t = this.$refs.grid.getSelectedRows();
                this.showDlg('edit',t[0],2, this.onAddErr.bind(this));

            },
            transferRisk(){
                let t = this.$refs.grid.getSelectedRows();
                this.showDlg('edit',t[0],null,this.onAddErr.bind(this),'transfer');
            },

            async deleteErr(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中异常信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.monitorErrApi.deleteErr(row.pkId);
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
