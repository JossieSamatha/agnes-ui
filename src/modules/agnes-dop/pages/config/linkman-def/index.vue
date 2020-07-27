<template>
    <el-container>
        <el-aside width="200px" class="el-border">
            <el-row>
                <el-input v-model="filterText" size="mini" placeholder="检索机构..."
                          suffix-icon="fa fa-search"></el-input>
            </el-row>
            <el-tree ref="tree"
                     :data="treeData"
                     node-key="id"
                     default-expand-all
                     @node-click="handleNodeClick"
                     :filter-node-method="filterNode"
                     style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: 97%;margin-top:4px">
            </el-tree>
        </el-aside>
        <el-container style="height: 100%">
            <el-header height="40px" class="el-border" style="line-height:40px;">
                <gf-button class="action-btn" @click="addLinkMnaGroups" size="mini">新建组</gf-button>
                <gf-button class="action-btn" @click="editLinkMnaGroups" size="mini">修改组</gf-button>
                <gf-button class="action-btn" @click="deleteLinkMnaGroups" size="mini">删除组</gf-button>
            </el-header>
            <el-container style="height: calc(100% - 40px)">
                <el-aside width="150px" class="el-border" style="height: 100%;overflow-y: auto">
                    <el-tree :data="linkmanGroups" :props="defaultProps" ref="groupTree"
                             @node-click="handleGroupNodeClick"></el-tree>
                </el-aside>
                <el-main height="100%" style="padding-top: 0px;padding-bottom: 0px" class="el-border">
                    <linkManList :reqData="reqData"></linkManList>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import linkManList from "./llinkman-list"
    import LinkManGroup from "./linkman-group-dlg"

    export default {
        name: "index",
        components: {
            linkManList
        },
        data() {
            return {
                filterText: '',
                treeData: [],
                reqData: {
                    extOrgId: '',
                    linkmanGroupId: ''
                },
                linkmanGroups: [{
                    linkmanGroupName: "管理组",
                    children: []
                }],
                defaultProps: {
                    children: 'children',
                    label: 'linkmanGroupName'
                },

            }
        },
        mounted() {
            this.loadTreeNodes();
            this.loadLinkManGroup();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
        },
        methods: {
            reloadData() {

            },
            filterNode(value, data) {
                return data.label.indexOf(value) >= 0;
            },
            loadLinkManGroup() {
                this.linkmanGroups[0].children = [];
                this.linkmanGroups[0].children.push({
                    linkmanGroupName: '所有组',
                    linkmanGroupId: '',
                })
                this.$api.linkmanApi.queryLinkManGroup().then(resp => {
                    if (resp && resp.data) {
                        resp.data.forEach(group => {
                            this.linkmanGroups[0].children.push({
                                linkmanGroupName: group.linkmanGroupName,
                                linkmanGroupId: group.linkmanGroupId,
                            })
                        })
                    }

                })
            },
            async loadTreeNodes() {
                try {
                    const resp = await this.$api.orgDefineApi.getOrgTreeNodes();
                    this.treeData = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onAddGroup() {
                this.loadLinkManGroup();
            },
            showGroupDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    LinkManGroup,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('联系人', mode),
                    }
                );
            },
            handleNodeClick(data) {
                this.reqData.extOrgId='';
                if (data.extOrgId) {
                    this.reqData.extOrgId = data.extOrgId
                }
            },
            handleGroupNodeClick(data) {
                if (!data.children) {
                    this.reqData.linkmanGroupId = data.linkmanGroupId;
                }
            },
            addLinkMnaGroups() {
                this.showGroupDlg('add', {}, this.onAddGroup.bind(this));
            },
            editLinkMnaGroups() {
                const data = this.$refs.groupTree.getCurrentNode();
                if (data && !data.children && data.linkmanGroupId) {
                    this.showGroupDlg('edit', data, this.onAddGroup.bind(this));
                }
            },
            async deleteLinkMnaGroups() {
                const data = this.$refs.groupTree.getCurrentNode();
                if (data && !data.children && data.linkmanGroupId) {
                    const ok = await this.$msg.ask(`确认删除选中的联系人组吗, 是否继续?`);
                    if (!ok) {
                        return
                    }
                    try {
                        const p = this.$api.linkmanApi.deleteLinkManGroup(data);
                        await this.$app.blockingApp(p);

                        this.$msg.success('删除成功');
                        this.loadLinkManGroup();
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