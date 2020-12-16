<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="网点名称">
                    <el-input v-model="queryArgs.branchName"></el-input>
                </el-form-item>
<!--                <el-form-item label="网点代码" >-->
<!--                    <el-input v-model="queryArgs.branchCode"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="大额支付号" >
                    <el-input v-model="queryArgs.bigPayNo"></el-input>
                </el-form-item>

                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>

        <gf-grid ref="grid" :query-args="queryArgs"
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
        data(){
            return {
                queryArgs:{
                    'branchCode':'',
                    'branchName':'',
                    'bigPayNo':''
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'branchCode':'',
                    'branchName':'',
                    'bigPayNo':''
                };
                this.reloadData();
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
                const ok = await this.$msg.ask(`确认删除网点信息:[${params.data.branchName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                const p = this.$api.branchApi.deteleData(params.data.bankBranchId);
                await this.$app.blockingApp(p);
                this.reloadData();
            },
        }
    }
</script>
