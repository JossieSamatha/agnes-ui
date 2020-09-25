<template>
    <div>
        <gf-grid @row-double-click="showEventDef" grid-no="agnes-event-def" ref="grid">
            <template slot="left">
                <gf-button class="action-btn" @click="addEventDef" size="mini">添加</gf-button>
                <gf-button class="action-btn" @click="copyEventDef" size="mini">复制</gf-button>
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

                let title = this.$dialog.formatTitle('事件定义配置', mode);
                if(mode==='copy'){
                    title = '事件定义配置 - 复制';
                }

                let isShow = true;
                row.isCheck=false;
                if(mode==='check'){
                    mode='view';
                    row.isCheck=true;
                    cancelTitle = '反审核';
                    title = '事件定义配置-审核';
                }
                if(!row.isCheck && mode==='view'){
                    isShow = false;
                }

                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
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
            async onEditEventDef() {
                this.reloadData();
            },
            addEventDef() {
                // this.showTab('agnes.config.event.add','add', {}, this.onAddEventDef.bind(this));
                this.showDrawer({},'add', this.onAddEventDef.bind(this));
            },
            showEventDef(params) {
                // this.showTab('agnes.config.event.edit','view', params.data);
                this.showDrawer(params.data,'view' , this.onEditEventDef.bind(this));
            },
            editEventDef(params) {
                // this.showTab('agnes.config.event.edit','edit', params.data, this.onEditModel.bind(this));
                this.showDrawer(params.data,'edit' , this.onEditEventDef.bind(this));
            },
            copyEventDef(params) {
              let rows = this.$refs.grid.getSelectedRows();
              if(rows.length>0){
                //
              }else{
                this.$msg.warning("请选中一条记录!");
                return;
              }
                // this.showTab('agnes.config.event.edit','edit', params.data, this.onEditModel.bind(this));
                this.showDrawer(params.data,'copy' , this.onEditEventDef.bind(this));
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

                if(params.data.eventStatus === '01' || params.data.eventStatus === '02'){
                    this.showDrawer(params.data,'check', this.onAddEventDef.bind(this));
                }else {
                    this.$msg.warning("该状态无法审核!");
                    return;
                }
            },
            async publishEventDef(params) {
                const row = params.data;
                if(params.data.eventStatus !== '02'){
                    this.$msg.warning("该状态无法发布!");
                    return;
                }

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
            },
            async stopEventDef(params) {
                const row = params.data;
                if(params.data.eventStatus !== '03'){
                    this.$msg.warning("该状态无法停用!");
                    return;
                }

                const ok = await this.$msg.ask(`确认停用事件定义:[${row.eventName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.eventlDefConfigApi.stopEventDef(row.eventId);
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
