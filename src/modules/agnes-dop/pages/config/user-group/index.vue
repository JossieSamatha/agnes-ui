<template>
    <div class="gf-fit">
        <div class="gf-auth">
            <div class="gf-auth-role">
                <gf-grid ref="grid" grid-no="agnes-group-user" height="100%"
                         @selected-changed="initAuthPage">
                    <template slot="left">
                        <gf-button class="action-btn"  style="margin-right: 20px" @click="addUserGroups">添加</gf-button>
                    </template>
                </gf-grid>
            </div>
            <div class="gf-auth-body">
                <div class="gf-auth-content">
                    <el-tabs v-model="authType">
                        <el-tab-pane label="数据授权" name="res" :lazy="true"></el-tab-pane>
                        <el-tab-pane label="用户管理" name="user" :lazy="true"></el-tab-pane>
                    </el-tabs>
                    <div class="gf-auth-content-data">
                        <ResAuth :row="currentRow" v-if="authType=='res'"/>
                        <UserAuth :row="currentRow" v-else/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import ResAuth from "./res";
    import UserAuth from "./user";
    import userGroup from "./group-user-dlg"

    export default {
        name: 'gf-auth',
        components: {
            ResAuth,
            UserAuth
        },
        props: {
            toolbar: {
                default: "find"
            }
        },
        data() {
            return {
                authType: 'res',
                currentRow: null,
                groupId:'',
            };
        },
        methods: {
            initAuthPage(gridState) {
                this.currentRow = gridState.selectedRow;
            },
            showGroupDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    userGroup,
                    {
                      args: {row, mode, actionOk},
                      width: '40%',
                      title: this.$dialog.formatTitle('群组', mode),
                    }
                );
            },
            async onAddGroup() {
                this.$refs.grid.reloadData(true);
            },
            addUserGroups() {
                this.showGroupDlg('add', {}, this.onAddGroup.bind(this));
            },
            editUser(params) {
                const data = params.data;
                if (data && !data.children && data.userGroupId) {
                    this.showGroupDlg('edit', data, this.onAddGroup.bind(this));
                }
            },
            async deleteUser(params) {
                const data = params.data;
                const ok = await this.$msg.ask(`确认删除选中的组吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.userGroupApi.deleteUserGroup(data);
                    await this.$app.blockingApp(p);
                    this.$msg.success('删除成功');
                    this.$refs.grid.reloadData(true);
                } catch (reason) {
                    this.$msg.error(reason);
                }

            },
        }
    }
</script>
<style>
    .gf-auth {
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .gf-auth-role {
        flex-grow: 0;
        width: 355px;
        padding-right: 5px;
    }

    .gf-auth-body {
        flex: 1;
        width: 0;
    }

    .gf-auth-body .el-tabs__header {
        margin-bottom: 0px;
    }

    .gf-auth-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .gf-auth-content .el-tabs {
        flex-grow: 0;
        flex-shrink: 0;
    }

    .gf-auth-content .gf-auth-content-data {
        flex: 1;
        height: 0;
    }
</style>
