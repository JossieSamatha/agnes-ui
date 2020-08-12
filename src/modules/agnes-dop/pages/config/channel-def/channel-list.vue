<template>
    <gf-grid grid-no="agnes-channel-field" ref="grid" quick-text-max-width="300px"
             height="100%" @row-double-click="showChannel"
             :query-args="queryParam">
        <template slot="left">
            <gf-button class="action-btn" @click="addChannel" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import ChannelDefDlg from "./channel-def-dlg";

    export default {
        data() {
            return {
                queryParam:{
                    channelName: {
                        type: "str",
                        op: "like",
                        value: ""
                    },
                    channelType: {
                        type: "str",
                        value: ""
                    },
                    channelStatus: {
                        type: "str",
                        value: ""
                    },
                    channelId: {
                        type: "str",
                        value: ""
                    },
                    channelCode: {
                        type: "str",
                        op: "like",
                        value: ""
                    }
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData(true);
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row ) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    ChannelDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('日历维护', mode),
                    }
                );
            },
            async onAddChannel() {
                this.reloadData();
            },
            async onEditChannel() {
                this.reloadData();
            },
            addChannel() {
                this.showDlg('add', {}, this.onAddChannel.bind(this));
            },
            showChannel(params) {
                this.showDlg('view', params.data);
            },
            editChannel(params) {
                this.showDlg('edit', params.data, this.onEditChannel.bind(this));
            },
            async deleteChannel(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除渠道:[${row.channelName}]吗, 是否继续?`);
                // const ok = await this.$msg.ask(`确认删除所选日历吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.channelApi.deleteChannel(row.channelId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async approveChannel(params) {
                const row = params.data;
                if(row.channelStatus === '1'){
                    this.$msg.alert("所选复核已生效")
                    return;
                }
                const ok = await this.$msg.ask(`确认复核所选渠道:[${row.channelName}]吗, 是否继续?`);
                // const ok = await this.$msg.ask(`确认复核所选日历吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.channelApi.updateChannel(row.channelId,"1");
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