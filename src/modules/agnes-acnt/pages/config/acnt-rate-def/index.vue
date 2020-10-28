<template>
    <div>
        <gf-grid grid-no="agnes-rate-def" ref="grid"  toolbar="find,refresh,more">
        </gf-grid>
    </div>
</template>

<script>
    import RateDefDlg from "./rate-def-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, ui, actionOk) {
                let title = this.$dialog.formatTitle("账户利率维护",mode);
                if(mode == 'check'){
                    title = '';
                }
                this.$nav.showDialog(
                    RateDefDlg,
                    {
                        args: {row, mode, ui, actionOk},
                        width: '50%',
                        title:title
                    }
                );
            },
            async onAdd() {
                this.reloadData();
            },

            editRateScheme(params) {
                this.showDlg('edit', params.data,"", this.onAdd.bind(this));
            },
            checkRateScheme(params) {
                this.showDlg('check', params.data,"1", this.onAdd.bind(this));
            },
            stopRateScheme(params) {
                this.startRateScheme(params);
            },
            async startRateScheme(params) {
                // const ok = await this.$msg.ask(`确认启用吗, 是否继续?`);
                // if (!ok) {
                //     return
                // }

                let msg = "确认启用吗, 是否继续?";
                if(params.data.status == '03'){
                    msg = "确认停用吗, 是否继续?";
                }
                const ok = await this.$msg.ask(msg);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntSchemeApi.startRateScheme(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("启用成功!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            async deleteRateScheme(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntSchemeApi.deleteRateScheme(row.pkId);
                    await this.$app.blockingApp(p);
                    this.$message.success("删除成功！")
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>
