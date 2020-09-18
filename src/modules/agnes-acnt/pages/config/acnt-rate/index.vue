<template>
    <div>
        <gf-grid grid-no="acnt-rate-field" ref="grid" @row-double-click="showRate" toolbar="find,refresh,more">
            <template slot="left">
                    <gf-button class="action-btn" @click="addRate" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntRateDetail from "./acnt-rate-detail";

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

                let title = this.$dialog.formatTitle("利率方案",mode);
                if(mode == 'check'){
                    title = '';
                }
                this.$nav.showDialog(
                    AcntRateDetail,
                    {
                        args: {row, mode,ui, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async onAddRate() {
                await this.reloadData();
            },

            addRate() {
                this.showDlg('add', {},"", this.onAddRate.bind(this));
            },
            editRate(params) {
                this.showDlg('edit', params.data,"", this.onAddRate.bind(this));
            },
            showRate(params) {
                this.showDlg('view', params.data);
            },

            check(param) {
                this.showDlg('check', param.data,"1", this.onAddRate.bind(this));
            },

            async deleteRate(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中利率信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rateDefApi.deleteRate(row.rateId);
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
