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
        <gf-grid grid-no="acnt-apply-field" :query-args="queryArgs" ref="grid">
            <template slot="left">
                <gf-button  class="action-btn" @click="openApply">开户</gf-button>
                <gf-button  class="action-btn" @click="submitOA">提交OA</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntApplySteps from "./acnt-apply-steps";
    import AcntApplyOpen from "./acnt-apply-open";
    import AcntApplyInsert from "./acnt-apply-insert";
    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'account':'',
                    'taskType':'',
                    'taskStatus':'',
                },
                status:{
                    '01':'发起申请',
                    '02':'待复核',
                    '03':'待提交OA',
                    '04':'资料准备',
                    '05':'财务流程',
                    '06':'账户待录入',
                    '07':'账户待复核',
                    '08':'流程结束',
                    '09':'已作废',
                },
            }
        },
        beforeMount() {
      
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'account':'',
                    'taskType':'',
                    'taskStatus':'',
                };
                this.reloadData();
            },
            showOpenDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户开户'],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='submitOA'?'提交':'保存'
                })
            },
            onOpenApply(){
                this.reloadData();
            },
            openApply() {
                this.showOpenDlg('add', {}, this.onOpenApply.bind(this));
            },
            submitOA() {
                //此处通过该方法获取选中的数据，调用接口批量操作
                // let data  = this.$refs.grid.getSelectedRows();
                
            },

            showInsertDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['添加资料'],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='check'?'审核':'保存'
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            addData(params) {
                this.showInsertDlg('add', params.data, this.onOpenApply.bind(this));
            },
            check(params) {
                this.showInsertDlg('check', params.data, this.onOpenApply.bind(this));
            },

            showStepsDlg(mode, row, actionOk) {
                this.$drawerPage.create({
                    width: '215px',
                    title: ['流程节点'],
                    component: AcntApplySteps,
                    args: {row, mode, actionOk},
                    okButtonVisible:false,
                })
            },
            onStepsApply(){
                this.reloadData();
            },
            showSteps() {
                this.showStepsDlg('add', {}, this.onStepsApply.bind(this));
            },
        }
    }
</script>