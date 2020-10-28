<template>
    <div>
        <gf-grid @row-double-click="showRoster" grid-no="agnes-roster-type" ref="grid" toolbar="find,refresh,more">
            <template slot="left">
                <gf-button v-if="$hasPermission('agnes.dop.roster.add')" class="action-btn" @click="addRoster"
                           size="mini">添加
                </gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import RosterTypeDlg from "./roster-type-dlg";
    import RosterList from "./roster-list";

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
                    RosterTypeDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('值班信息', mode),
                    }
                );
            },
            async onAddRoster() {
                await this.reloadData();
            },

            async onEditRoster() {
                await this.reloadData();
            },

            addRoster() {
                this.showDlg('add', {}, this.onAddRoster.bind(this));
            },
            personnel(param) {
                this.showDrawer('check', param.data, this.onEditRoster.bind(this));
            },
            showDrawer(mode, row, actionOk) {
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['值班人员', 'view'],
                    component: RosterList,
                    args: {row, mode, actionOk},
                    okButtonVisible: false,
                    cancelButtonTitle: '取消',
                });
            },
            showRoster(params) {
                this.showDlg('view', params.data);
            },

            editRoster(params) {
                this.showDlg('edit', params.data, this.onEditRoster.bind(this));
            },

            async deleteRoster(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中值班信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rosterApi.deleteRoster(row.rosterId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async approveRoster(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认复核所选记录吗, 是否继续?`);
                // const ok = await this.$msg.ask(`确认复核所选日历吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rosterApi.updateRosterStatus(row.rosterId, "04");
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
    }
</script>

<style scoped>

</style>
