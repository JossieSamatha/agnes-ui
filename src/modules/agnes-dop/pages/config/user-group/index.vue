<template>
    <el-container>
        <el-container style="height: 100%">
            <el-header height="40px" class="el-border" style="line-height:40px;">
                <gf-button class="action-btn" @click="addUserGroups" size="mini">添加群组</gf-button>
                <gf-button class="action-btn" @click="editUserGroups" size="mini">编辑群组</gf-button>
                <gf-button class="action-btn" @click="deleteUserGroups" size="mini">删除群组</gf-button>
            </el-header>
            <el-container style="height: calc(100% - 40px)">
                <el-aside width="150px" class="el-border" style="height: 100%;overflow-y: auto">
                    <el-tree :data="userGroups" ref="groupTree"
                             default-expand-all  :props="defaultProps"
                             @node-click="handleGroupNodeClick"></el-tree>
                </el-aside>
                <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
                    <groupUserList :reqData="reqData"></groupUserList>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import groupUserList from "./group-user-list"
    import userGroup from "./group-user-dlg"

    export default {
        name: "index",
        components: {
            groupUserList
        },
        data() {
            return {
                reqData: {
                    userGroupId: ''
                },
                defaultProps: {
                    children: 'children',
                    label: 'userGroupName'
                },
                userGroups: [{
                    userGroupName: "群组管理",
                    children: []
                }],

            }
        },
        mounted() {
            this.loaduserGroup();
        },
        methods: {
            loaduserGroup() {
                this.userGroups[0].children = [];
                this.$api.userGroupApi.getAllUserGroup().then(resp => {
                    if (resp && resp.data) {
                        resp.data.forEach(group => {
                            this.userGroups[0].children.push({
                                userGroupName: group.userGroupName,
                                userGroupId: group.userGroupId,
                            })
                        })
                    }

                })
            },
            async onAddGroup(userGroupId) {
                this.loaduserGroup();
                this.reqData.userGroupId = userGroupId;
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
                        width: '50%',
                        title: this.$dialog.formatTitle('群组', mode),
                    }
                );
            },
            handleNodeClick(data) {
                this.reqData.userGroupId='';
                if (data.userGroupId) {
                    this.reqData.userGroupId = data.userGroupId
                }
            },
            handleGroupNodeClick(data) {
                if (!data.children) {
                    this.reqData.userGroupId = data.userGroupId;
                }
            },
            addUserGroups() {
                this.showGroupDlg('add', {}, this.onAddGroup.bind(this));
            },
            editUserGroups() {
                const data = this.$refs.groupTree.getCurrentNode();
                if (data && !data.children && data.userGroupId) {
                    this.showGroupDlg('edit', data, this.onAddGroup.bind(this));
                }
            },
            async deleteUserGroups() {
                const data = this.$refs.groupTree.getCurrentNode();
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
        },
    }
</script>

<style scoped>
    .el-border {
        border: 1px solid rgb(238, 238, 238);
    }

</style>