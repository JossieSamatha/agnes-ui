<template>
    <div>
        <gf-grid @row-double-click="showModel" grid-no="agnes-msg-def" ref="grid">
            <template slot="left">
                <gf-button @click="addModel" class="action-btn">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import MsgDefDlg from "./msg-def-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    MsgDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '40%',
                        title: this.$dialog.formatTitle('消息定义', mode),
                    }
                );
            },
            async onAddModel() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addModel() {
                this.showDlg('add', {}, this.onAddModel.bind(this));
            },
            showModel(params) {
                this.showDlg('view', params.data);
            },
            editModel(params) {
                this.showDlg('edit', params.data, this.onEditModel.bind(this));
            },
            async deleteModel(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除消息:[${row.msgName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.msgDefineApi.deleteMsg(row.msgId);
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
