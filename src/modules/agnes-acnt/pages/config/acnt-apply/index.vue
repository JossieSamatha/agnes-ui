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
        <gf-grid grid-no="acnt-apply-field" @load-data="dataChange" :query-args="queryArgs" ref="grid">
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
                tableData: [],
                status:{
                    '01':'发起申请',
                    '02':'待复核',
                    '03':'待提交OA',
                    '04':'资料准备',
                    '05':'财务流程',
                    '06':'账户待录入',
                    '07':'账户待复核',
                    '08':'已归档',
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
            dataChange(params) {
                this.tableData = [];
                this.forEach(params.rows, []);
                params.rows = this.tableData;
                params.total = this.tableData.length;
                this.$refs.grid.$emit("data-loaded", params);
            },
            forEach(data, orgHierarchy) {
                if (data&&data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].orgHierarchy = JSON.parse(JSON.stringify(orgHierarchy));
                        data[i].orgHierarchy.push(data[i].resId);
                        this.tableData.push(data[i]);
                        this.forEach(data[i].children, data[i].orgHierarchy);
                    }
                }
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
            showOpenDlg(mode, row, actionOk,isDisabled=false) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = '账户开户';
                if(mode==='check'){
                    title = '账户审核';
                }else if(mode==='detele'){
                    title = '账户作废';
                }else if(mode==='addInfo'){
                    title = '资料准备';
                }else if(mode==='checkFund'){
                    title = '财务审核';
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk,isDisabled},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='add'||mode==='addInfo'?'保存':'审核',
                    cancelButtonTitle:mode==='check'?'反审核':'关闭'
                })
            },
            onOpenApply(){
                this.reloadData();
            },
            openApply() {
                this.showOpenDlg('add', {}, this.onOpenApply.bind(this));
            },
            check(params) {
                this.showOpenDlg('check', params.data, this.onOpenApply.bind(this),true);
            },
            edit(params) {
                this.showOpenDlg('edit', params.data, this.onOpenApply.bind(this));
            },
            detele(params) {
                this.showOpenDlg('detele', params.data, this.onOpenApply.bind(this),true);
            },

            checkFund(params) {
                this.showOpenDlg('checkFund', params.data, this.onOpenApply.bind(this),true);
            },
            addInfo(params) {
                this.showOpenDlg('addInfo', params.data, this.onOpenApply.bind(this),false);
            },
            async nextaddInfo(params) {
                let token = true; //是否允许下一步
                if(params.data.children&&params.data.children.length>0){
                    for(let i=0;i<params.data.children.length;i++){
                        if(params.data.children[i].processStatus!='08'){
                            token = false
                        }
                    }
                }
                if(token){
                    let form =  JSON.parse(JSON.stringify(params.data)) 
                    // form.processStatus = '02';
                    if(params.data.isSendFinance=='1'){
                        form.processStatus = '05'; 
                    }else {
                        form.processStatus = '06';
                    }
                    const ok = await this.$msg.ask(`材料是否准备充足?`);
                    if (!ok) {
                        return
                    }
                    const p = this.$api.acntApplyApi.saveApply(form);
                    await this.$app.blockingApp(p);
                    await this.reloadData();
                    this.$msg.success('提交成功');
                }else{
                    this.$msg.warning('请先完成子流程');
                }

                // this.showOpenDlg('edit', params.data, this.onOpenApply.bind(this),false);
            },
            submitOA() {
                //此处通过该方法获取选中的数据，调用接口批量操作
                // let data  = this.$refs.grid.getSelectedRows();
                
            },

            showInsertDlg(mode, row, actionOk) {
                let title = '账户录入';
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                if(mode === 'check'){
                    title = '账户复核';
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='add'?'保存':'审核',
                    cancelButtonTitle:mode==='check'?'反审核':'关闭'
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            addAcc(params) {
                this.showInsertDlg('add', params.data, this.onOpenApply.bind(this));
            },
            checkAcc(params) {
                this.showInsertDlg('check', params.data, this.onOpenApply.bind(this));
            },
            // check(params) {
            //     this.showInsertDlg('check', params.data, this.onOpenApply.bind(this));
            // },

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
            showSteps(params) {
                this.showStepsDlg('add', params.data, this.onStepsApply.bind(this));
            },
        }
    }
</script>