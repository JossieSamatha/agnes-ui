<template>
    <gf-grid grid-no="agnes-acnt-linkman-ref" ref="grid" quick-text-max-width="300px" height="100%">
        <template slot="left">
            <gf-button class="action-btn" @click="addLinkman" size="mini">新增</gf-button>
            <gf-button class="action-btn" @click="review" size="mini">状态切换</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import linkmanRefAddDlg from './linkman-ref-add-dlg'

    export default {
        data() {
            return {}
        },
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
                    linkmanRefAddDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('账户联系人维护', mode),
                    }
                );
            },
            async onAddLinkMan() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            editModel(params) {
                this.showDlg('edit', params.data, this.onEditModel.bind(this));
            },
            async deleteModel(params) {
                const row = params.data;
                let rows = this.$refs.grid.getSelectedRows();
                if (!rows) {
                    this.$msg.warning("请选中一条记录!");
                    return
                }
                const ok = await this.$msg.ask(`确认删除当前选中记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.linkmanRefApi.deleteLinkmanRef(row);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            addLinkman() {
                this.showDlg('add', {}, this.onAddLinkMan.bind(this));
            },
            async review() {
                let rows = this.$refs.grid.getSelectedRows();
                if (rows.length === 0) {
                    this.$msg.warning("请选中一条记录!");
                    return
                }
                const req = rows[0];
                req.endDt = '9999-12-30 23:59:59'
                try {
                    const p = this.$api.linkmanRefApi.saveLinkmanRef(req);
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