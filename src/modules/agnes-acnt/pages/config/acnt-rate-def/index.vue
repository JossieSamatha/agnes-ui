<template>
    <div>
        <gf-grid grid-no="agnes-rate-def" ref="grid">
            <template slot="left">
                <gf-button @click="addRate" size="mini">新增</gf-button>
                <gf-button @click="updateStatus" size="mini">状态切换</gf-button>
            </template>
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
            async updateStatus(){
                let selectRow = this.$refs.grid.getSelectedRows()[0];
                if(!selectRow){
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                selectRow.status=selectRow.status=='0'?'1':'0';
                selectRow.endDt = '9999-12-30 23:59:59';
                const p = this.$api.rateDefineApi.changeStatus(selectRow);
                await this.$app.blockingApp(p);
                this.$msg.success('修改成功');
                this.reloadData();
            },
            showDlg(mode, row, actionOk) {
                this.$nav.showDialog(
                    RateDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('账户利率维护', mode),
                    }
                );
            },
            async onAddRate() {
                this.reloadData();
            },
            addRate() {
                this.showDlg('add', {}, this.onAddRate.bind(this));
            },
            async deleteRate(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rateDefineApi.deleteRate(row.pkId);
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

<style scoped>

</style>
