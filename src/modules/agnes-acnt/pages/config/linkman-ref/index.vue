<template>
    <gf-grid grid-no="agnes-acnt-linkman-ref" ref="grid" toolbar="find,refresh,more" quick-text-max-width="300px" height="100%">
        <template slot="left">
            <gf-button class="action-btn" @click="onAddLinkman" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import linkmanRefAddDlg from './linkman-ref-add-dlg'

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
                let title = this.$dialog.formatTitle("账户联系人关系维护",mode);
                if(mode == 'check'){
                    title = '';
                }
                this.$nav.showDialog(
                    linkmanRefAddDlg,
                    {
                        args: {row, mode, ui, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
            async onAddLinkMan() {
                this.reloadData();
            },
            async onEditLinkMan() {
                this.reloadData();
            },
            onAddLinkman() {
                this.showDlg('add', {},"", this.onAddLinkMan.bind(this));
            },
            editLinkman(params) {
                this.showDlg('edit', params.data,"", this.onEditLinkMan.bind(this));
            },
            stopLinkman(params) {
                this.startLinkman(params);
            },
            checkLinkman(params) {
                this.showDlg('check', params.data,"1", this.onEditLinkMan.bind(this));
            },

            async startLinkman(params) {
                let msg = "确认启用吗, 是否继续?";
                if(params.data.status == '03'){
                    msg = "确认停用吗, 是否继续?";
                }
                const ok = await this.$msg.ask(msg);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.linkmanRefApi.startLinkman(params.data);
                    await this.$app.blockingApp(p);
                    this.$msg.success("启用成功!");
                    this.reloadData();
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            async deleteLinkman(params) {
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
        },
    }
</script>
