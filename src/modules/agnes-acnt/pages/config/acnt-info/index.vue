<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="账号" >
                    <el-input v-model="queryArgs.account"></el-input>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="账户类型">
                    <gf-dict filterable clearable v-model="queryArgs.taskType" dict-type="AGNES_TASK_TYPE" />
                </el-form-item>
                <el-form-item label="状态">
                    <gf-dict filterable clearable v-model="queryArgs.taskStatus" dict-type="AGNES_TASK_MGR_STATUS"/>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid @row-double-click="editEventDef" :query-args="queryArgs" grid-no="agnes-acnt-info" ref="grid">
            <template slot="left">
               <gf-button class="action-btn" @click="exoprtV45" size="mini">导出v45</gf-button>
               <gf-button class="action-btn" @click="registration" size="mini">账户登记</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntApplyOpen from "../acnt-apply/acnt-apply-open";
    import AcntApplyInsert from "../acnt-apply/acnt-apply-insert";
    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'execStartTime':'',
                    'taskType':'',
                    'taskStatus':'',
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showOpenDlg(mode, row, actionOk,isDisabled=false) {
                if (!row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = '账户销户';
                if(mode==='addChange'){
                    title = '变更资料';
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk,isDisabled},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='detele'?'提交':'保存'
                })
            },
            onOpenApply(){
                this.reloadData();
            },
            delete(params) {
                this.showOpenDlg('deteleApply', params.data, this.onOpenApply.bind(this),false);
            },
            changeData(params) {
                this.showOpenDlg('addChange', params.data, this.onOpenApply.bind(this));
            },



            showInsertDlg(mode, row, actionOk) {
                if (!row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户登记'],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='check'?'审核':'保存'
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            registration() {
                this.showInsertDlg('registration', {}, this.onOpenApply.bind(this));
            },
            // check(params) {
            //     this.showInsertDlg('check', params.data, this.onOpenApply.bind(this));
            // },

        }
    }
</script>

<style scoped>

</style>
