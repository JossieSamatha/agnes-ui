<template>
    <div>
        <gf-grid @row-double-click="showMsg" grid-no="agnes-msg-def" ref="grid">
            <template slot="left">
                <gf-button @click="addMsg" class="action-btn"
                           v-if="$hasPermission('agnes.msg.def.add')">添加</gf-button>
                <gf-button class="action-btn" @click="copyMsg" size="mini"
                           v-if="$hasPermission('agnes.msg.def.copy')">复制</gf-button>
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
                row.isCheck=false;
                let title = this.$dialog.formatTitle('消息定义配置', mode);
                if(mode==='copy'){
                    title = '消息定义配置 - 复制';
                }

                if(mode == 'check'){
                    row.isCheck=true;
                    title = '消息定义配置 - 审核';
                }
                this.$nav.showDialog(
                    MsgDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '40%',
                        title: title,
                    }
                );
            },
            async onAddMsg() {
                this.reloadData();
            },
            async onEditMsg() {
                this.reloadData();
            },
            addMsg() {
                this.showDlg('add', {}, this.onAddMsg.bind(this));
            },
            showMsg(params) {
                this.showDlg('view', params.data);
            },
            editMsg(params) {
                this.showDlg('edit', params.data, this.onEditMsg.bind(this));
            },
            copyMsg() {
              let rows = this.$refs.grid.getSelectedRows();
              let row =[];
              if(rows.length>0){
                row = rows[0];
              }else{
                this.$msg.warning("请选中一条记录!");
                return;
              }
                this.showDlg('copy', row, this.onEditMsg.bind(this));
            },
            approveMsg(params) {
                this.showDlg('check', params.data, this.onEditMsg.bind(this));
            },
            async deleteMsg(params) {
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
            },
            async publishMsg(params) {
                const row = params.data;
                if(params.data.msgStatus !== '02'){
                    this.$msg.warning("该状态无法发布!");
                    return;
                }

                const ok = await this.$msg.ask(`确认发布消息:[${row.msgName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.msgDefineApi.publishMsg(row.msgId);
                    await this.$app.blockingApp(p);
                    this.$msg.success("发布成功!");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async stopMsg(params) {
                const row = params.data;
                if(params.data.msgStatus !== '03'){
                    this.$msg.warning("该状态无法停止!");
                    return;
                }

                const ok = await this.$msg.ask(`确认停用消息:[${row.msgName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.msgDefineApi.stopMsg(row.msgId);
                    await this.$app.blockingApp(p);
                    this.$msg.success("停用成功!");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }

        }
    }
</script>