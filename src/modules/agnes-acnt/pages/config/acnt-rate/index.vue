<template>
    <div>
        <gf-grid grid-no="acnt-rate-field" ref="grid" toolbar="find,refresh,more">
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
            check(params) {
                this.showDlg('check', params.data,"1", this.onAddRate.bind(this));
            },
            async start(params) {
                if(params.data.status.match(/05/)){
                    this.$msg.warning("该状态无法启用!");
                    return ;
                }
                const ok = await this.$msg.ask(`确认启用方案:[${params.data.rateName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rateDefApi.start(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("方案已启用!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            async stop(params){
                const ok = await this.$msg.ask(`确认停用方案:[${params.data.rateName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rateDefApi.stop(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("方案已停用!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
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