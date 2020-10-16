<template>
    <div class="gf-fit">
        <div class="gf-auth">
            <div class="gf-auth-role">
                <el-header height="40px" style="line-height:40px;">
                    <gf-button class="action-btn" @click="addUserGroups" size="mini">添加组</gf-button>
                    <gf-button class="action-btn" @click="editUserGroups" size="mini">编辑组</gf-button>
                    <gf-button class="action-btn" @click="deleteUserGroups" size="mini">删除组</gf-button>
                </el-header>
                <gf-grid ref="grid" grid-no="agnes-group-user" height="100%"
                         @selected-changed="initAuthPage">
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
                currentRow: null
            };
        },
        methods: {
            initAuthPage(gridState) {
                this.currentRow = gridState.selectedRow;
                console.log("currentRow:"+this.currentRow);
            },
            addUserGroups() {
                this.showGroupDlg('add', {}, this.onAddGroup.bind(this));
            },
            editUserGroups() {
                const data = this.$refs.grid.selectedRow()[0];
                if (data && !data.children && data.userGroupId) {
                    this.showGroupDlg('edit', data, this.onAddGroup.bind(this));
                }
            },
            async deleteUserGroups() {
                const data = this.$refs.grid.selectedRow()[0];
                if (data && !data.children && data.userGroupId) {
                    const ok = await this.$msg.ask(`确认删除选中的组吗, 是否继续?`);
                    if (!ok) {
                        return
                    }
                    try {
                        const p = this.$api.userGroupApi.deleteUserGroup(data);
                        await this.$app.blockingApp(p);

                        this.$msg.success('删除成功');
                        this.loaduserGroup();
                    } catch (reason) {
                        this.$msg.error(reason);
                    }
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

    /*.gf-auth-body .el-tabs__content {*/
    /*    display: none;*/
    /*}*/

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