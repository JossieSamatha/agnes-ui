<template>
    <div class="org">
    <el-container style="border: 1px solid #eee;border-radius: 0;">
        <el-aside style="width: 240px;border: 1px solid #eee;border-radius: 0;padding: 0px 16px 0px 16px" class="el-border">
            <el-row style="margin-top: 5px">
                <el-input v-model="filterText" size="mini" placeholder="检索应用..."
                          suffix-icon="fa fa-search"></el-input>
            </el-row>
            <el-tree ref="tree"
                     :data="treeData"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     :expand-on-click-node="false"
                     @check="handleNodeCheck"
                     :filter-node-method="filterNode"
            style="height: 97%;margin-top:4px">
            </el-tree>
        </el-aside>
        <el-main style="height: 100%;padding-top: 0px;padding-bottom: 0px">
            <gf-grid grid-no="acnt-rate-field" ref="grid" @row-double-click="listShowOrg" quick-text-max-width="300px" height="100%"  @grid-ready="onReady">
                <template slot="left">
                    <gf-button class="action-btn" @click="addOrg">添加</gf-button>
                </template>
            </gf-grid>
        </el-main>
    </el-container>
    </div>
</template>

<script>
    import AcntRateDetail from "./acnt-rate-detail";

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
            async listDeleteOrg(params){
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除所选择的机构吗, 是否继续?`);
                if (ok) {
                    const ids = [];
                    this.expandKeys=this.$refs.tree.getCheckedKeys();
                    let index = this.expandKeys.indexOf(row.id);
                    if (index > -1) {
                        this.expandKeys.splice(index, 1);
                    }
                    ids.push(row.extOrgId);
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
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['银行利率方案',mode],
                    component: AcntRateDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
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
                let nodeInfo = {id:"root",label:"机构树",extOrgNameShort:'机构树'};
                this.showDlg('add', nodeInfo, this.onAddOrg.bind(this));
            },
            async deleteOrg(params) {
                let ids = [];
                ids.push(params.data.extOrgId);
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
