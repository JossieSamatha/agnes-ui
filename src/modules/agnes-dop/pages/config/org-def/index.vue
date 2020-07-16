<template>
    <div class="org">
    <el-container style="border: 1px solid #eee;border-radius: 0;">
        <el-aside style="width: 20%;border: 1px solid #eee;border-radius: 0;padding: 0px 16px 0px 16px" class="el-border">
            <el-row style="padding: 6px 4px 4px 4px;">
                <gf-button @click="addOrg()" style="line-height: 14px;height: 34px">新增</gf-button>
                <gf-button @click="editOrg()" style="line-height: 14px;height: 34px">修改</gf-button>
                <gf-button @click="deleteOrg()" style="line-height: 14px;height: 34px">删除</gf-button>
            </el-row>
            <div style="border: 1px solid #eee;border-radius: 0;height: 100%;margin-top:5px">
            <el-row>
                <el-input v-model="filterText" size="mini" placeholder="检索应用..."
                          suffix-icon="fa fa-search"></el-input>
            </el-row>
            <el-tree ref="tree"
                     :data="treeData"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     @check="handleNodeCheck"
                     :filter-node-method="filterNode"
            style="border: 1px solid #eee;border-radius: 0;overflow-y: auto;height: 97%;margin-top:4px">
            </el-tree>
            </div>
        </el-aside>
        <el-main style="height: 100%;padding-top: 0px;padding-bottom: 0px">
            <gf-grid grid-no="agnes-org-list" ref="grid" @row-double-click="listShowOrg" quick-text-max-width="300px" height="100%"  @grid-ready="onReady">
                <template slot="left">
                    <gf-button @click="listDeleteOrg">删除</gf-button>
                    <gf-button @click="addLinkMan">添加联系人</gf-button>
                </template>
            </gf-grid>
        </el-main>
    </el-container>
    </div>
</template>

<script>
    import OrgDefDlg from "./org-define";
    import LinkManDef from "../linkman-def/linkman-base-dlg"

    export default {
        data() {
            return {
                filterText: '',
                treeData: [],
                expandKeys: [],
                rowData:[],
            }
        },
        beforeMount() {
            this.getOrgTreeNodes();
        },
        methods: {
            //表格相关
            onReady() {
                this.grid = this.$refs.grid;
                this.refreshRows();
            },
            refreshRows() {
                this.grid.setRowData(this.rowData);
            },
            listShowOrg(params) {
                this.showDlg('view', params.data);
            },
            listEditOrg(params) {
                this.showDlg('edit', params.data, this.onEditOrg.bind(this));
            },
            addLinkMan() {
                const rows = this.$refs.grid.getSelectedRows();
                if(rows.length>1 || rows.length===0){
                    this.$msg.warning("请选择一个机构进行操作!");
                    return;
                }
                let row = rows[0];
                let action = null;
                let mode = 'add';
                this.$nav.showDialog(
                    LinkManDef,
                    {
                        args: {row, mode, action},
                        width: '60%',
                        title: this.$dialog.formatTitle('联系人', mode),
                    }
                );

            },
            async listDeleteOrg(){
                const row = this.$refs.grid.getSelectedRows();
                const ok = await this.$msg.ask(`确认删除所选择的机构吗, 是否继续?`);
                if (ok) {
                    const ids = [];
                    this.expandKeys=this.$refs.tree.getCheckedKeys();
                    row.forEach(item=>{
                        ids.push(item.extOrgId);
                        let index = this.expandKeys.indexOf(item.id);
                        if (index > -1) {
                            this.expandKeys.splice(index, 1);
                        }
                    });
                    // 调后台删除接口
                    // 删除成功，调取回调函数
                    try {
                        const that = this;
                        const p = this.$api.orgDefineApi.deleteOrg(ids).then(function () {
                            that.$refs.tree.setCheckedKeys(that.expandKeys);
                            that.reloadData();
                            that.handleNodeCheck();
                        });
                        await this.$app.blockingApp(p);
                    } catch (reason) {
                        this.$msg.error(reason);
                    }
                }
        },
            //树相关
            async getOrgTreeNodes(){
                try {
                    const resp = await this.$api.orgDefineApi.getOrgTreeNodes();
                    this.treeData = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async reloadData(){
                await this.getOrgTreeNodes();
                this.rowData = this.$refs.tree.getCheckedNodes();
            },
            filterNode(value, data) {
                return data.label.indexOf(value) >= 0;
            },
            handleNodeCheck() {
                this.rowData = this.$refs.tree.getCheckedNodes();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    OrgDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '60%',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('机构', mode),
                    }
                );
            },
            async onAddOrg() {
                this.expandKeys=this.$refs.tree.getCheckedNodes(true);
                await this.reloadData();
                this.$refs.tree.setCheckedNodes(this.expandKeys);
                this.handleNodeCheck();
            },
            async onEditOrg() {
                this.expandKeys=this.$refs.tree.getCheckedNodes(true);
                await this.reloadData();
                this.$refs.tree.setCheckedNodes(this.expandKeys);
                this.handleNodeCheck();
            },
            addOrg() {
                let nodeInfo = this.$refs.tree.getCurrentNode(true);
                if(!nodeInfo){
                    nodeInfo={id:"root",label:"机构树"};
                }
                this.showDlg('add', nodeInfo, this.onAddOrg.bind(this));
            },
            editOrg() {
                let nodeInfo = this.$refs.tree.getCurrentNode(true);
                if(!nodeInfo){
                    this.$msg.warning("请选择一条记录进行修改！");
                    return;
                }
                if(nodeInfo.id === 'root'){
                    this.$msg.warning("机构树不能修改！");
                    return
                }
                this.showDlg('edit', nodeInfo, this.onEditOrg.bind(this));
            },
            async deleteOrg() {
                let ids = this.$refs.tree.getCheckedKeys(true);
                let isRoot = false;
                ids.forEach(item =>{
                    if(item==="root"){
                        isRoot=true;
                        return false;
                    }
                });
                if(isRoot){
                    this.$msg.warning("机构树不能删除！");
                    return ;
                }
                if(ids.length===0){
                    this.$msg.warning("请至少选择一条记录！");
                    return;
                }
                const ok = await this.$msg.ask(`确认删除所选机构吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    let that = this;
                    const p = this.$api.orgDefineApi.deleteOrg(ids).then(function () {
                        that.reloadData();
                    });
                    await this.$app.blockingApp(p);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            rowData(value) {
                if (this.grid) {
                    let hasNoRootData = [] ;
                    value.forEach(item=>{
                       if(item.id!=='root'){
                           hasNoRootData.push(item);
                       }
                    });
                    this.grid.setRowData(hasNoRootData);
                }
            }
        },
    }
</script>

<style>


</style>
