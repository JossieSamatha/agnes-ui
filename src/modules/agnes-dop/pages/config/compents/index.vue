<template>
    <div>
        <gf-grid grid-no="agnes-comp-field" ref="grid">
            <template slot="left">
                <gf-button v-if="$hasPermission('agnes.dop.comp.add')" @click="addCompType" class="action-btn">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>

    import CompTypeDlg from "./comp-type-dlg";

    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            addCompType(){
                this.showDrawer('add', {}, this.onAddModel.bind(this));
            },
            editCompType(params) {
                this.showDrawer('edit', params.data, this.onAddModel.bind(this));
            },
            async deleteCompType(params){
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中记录吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.compBoardApi.deleteComponents(row);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onAddModel() {
                this.reloadData();
            },
            showDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['组件信息', mode],
                    component: CompTypeDlg,
                    args: {row, mode, actionOk},
                    pageEl: this.$el
                });
            },
        }
    }
</script>
