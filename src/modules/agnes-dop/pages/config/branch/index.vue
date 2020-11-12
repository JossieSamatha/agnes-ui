<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="branch-field"
                 toolbar="find,refresh,more"
                 quick-text-max-width="300px"
                 @row-double-click="showDetail"
        >
            <template slot="left">
                <gf-button v-if="$hasPermission('agnes.dop.branch.add')" class="action-btn" @click="addFileAnaly"
                           size="mini">添加
                </gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
import BranchDetail from './branch-detail'
    export default {
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async onAdd() {
                await this.reloadData();
            },
            async onUpdate() {
                await this.reloadData();
            },
            addFileAnaly() {
                this.showFileAnalyConfig({},'add', this.onAdd.bind(this));
            },
            editBranch(params){
                this.showFileAnalyConfig(params.data,'edit' , this.onUpdate.bind(this));
            },
            showDetail(params){
                this.showFileAnalyConfig(params.data,'view' , this.onUpdate.bind(this));
            },
            showFileAnalyConfig(row, mode, actionOk){
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['网点维护',mode],
                    component: BranchDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            async deleteBranch(params){
                const p = this.$api.branchApi.deteleData(params.data.bankBranchId);
                await this.$app.blockingApp(p);
                this.reloadData();
            },
        }
    }
</script>
