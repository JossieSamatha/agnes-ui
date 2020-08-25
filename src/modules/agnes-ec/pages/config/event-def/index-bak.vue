<template>
    <div>
        <gf-grid @row-double-click="showEventDef" grid-no="agnes-event-def" ref="grid">
            <template slot="left">
                <gf-button @click="addEventDef" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import EventDefDlg from "./event-def-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDrawer(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let cancelTitle = '取消';
                if(mode==='view'){
                    cancelTitle = '关闭';
                }
                let isShow = true;
                row.isCheck=false;
                if(mode==='check'){
                    mode='view';
                    row.isCheck=true;
                    cancelTitle = '反审核';
                }
                if(!row.isCheck && mode==='view'){
                    isShow = false;
                }

                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['事件定义配置',mode],
                    component: EventDefDlg,
                    args: {row, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: row.isCheck ? '审核' : '保存',
                    cancelButtonTitle: cancelTitle,

                })
            },

            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    EventDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '60%',
                        title: this.$dialog.formatTitle('事件定义', mode),
                    }
                );
            },
            showTab(viewId,mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }

                // let viewId = 'agnes.config.event.add';
                let pageView = this.$app.views.getView(viewId);
                let tabView = Object.assign({args: {row, mode, actionOk}, id: viewId}, pageView);
                this.$nav.showView(tabView);
            },
            async onAddEventDef() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addEventDef() {
                this.showTab('agnes.config.event.add','add', {}, this.onAddEventDef.bind(this));
            },
            showEventDef(params) {
                this.showTab('agnes.config.event.edit','view', params.data);
            },
            editEventDef(params) {
                this.showTab('agnes.config.event.edit','edit', params.data, this.onEditModel.bind(this));

            },
            async deleteEventDef(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除事件定义:[${row.eventName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.eventlDefConfigApi.deleteEventDef(row.eventId);
                    await this.$app.blockingApp(p);
                    this.$msg.success("删除成功!");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async approveEventDef(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认复核事件定义:[${row.eventName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.eventlDefConfigApi.approveEventDef(row.eventId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async publishEventDef(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认发布事件定义:[${row.eventName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.eventlDefConfigApi.publishEventDef(row.eventId);
                    await this.$app.blockingApp(p);
                    this.$msg.success("发布成功!");
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
