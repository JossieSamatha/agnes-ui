<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.acntName"></el-input>
                </el-form-item>
                <el-form-item label="账号" >
                    <el-input v-model="queryArgs.accNos"></el-input>
                </el-form-item>
                <el-form-item label="资金账号" >
                    <el-input v-model="queryArgs.fundAccNos"></el-input>
                </el-form-item>

                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="账户类型">
                    <el-select class="multiple-select" v-model="queryArgs.typeCode"
                               filterable clearable
                               placeholder="请选择">
                        <el-option-group
                                v-for="group in typeCodeOption"
                                :key="group.label"
                                :label="group.label">
                            <el-option
                                    v-for="item in group.options"
                                    :key="item.typeCode"
                                    :label="`${group.label} - ${item.typeName}`"
                                    :value="item.typeCode">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>

                <el-form-item label="业务类型">
                    <gf-dict filterable clearable v-model="queryArgs.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
                </el-form-item>

                <el-form-item label="流程节点">
                    <gf-dict filterable clearable v-model="queryArgs.processStatus" dict-type="AGNES_ACNT_APPLY_STATUS" />
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="acnt-apply-field" @load-data="dataChange" :query-args="queryArgs" ref="grid"
                 @row-double-click="showDetail">
            <template slot="left">
                <gf-button  class="action-btn" @click="openApply"
                            v-if="$hasPermission('agnes.acnt.apply.openApply')">开户</gf-button>
                <gf-button  class="action-btn" @click="submitOA"
                            v-if="$hasPermission('agnes.acnt.apply.submitOA')">提交OA</gf-button>
                <gf-button  class="action-btn" @click="addInfoFile"
                            v-if="$hasPermission('agnes.acnt.apply.addInfoFile')">资料准备</gf-button>
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
                    'typeCode':'',
                    'acntName':'',
                    'accNos':'',
                    'fundAccNos':'',
                    'processStatus':'',
                    'bizType':''
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
                typeCodeOption: [{
                    label: 'TA',
                    options: []
                },{
                    label: 'FA',
                    options: []
                }]
            }
        },
        beforeMount() {
            const p = this.getOptionData();
            this.$app.blockingApp(p);
        },
        methods: {
            async getOptionData(){
                try {
                    let typeCodeOption = await this.$api.acntApplyApi.getAcntTypeList();
                    typeCodeOption.data.forEach(item=>{
                        if(item.processType === 'TA'){
                            this.typeCodeOption[0].options.push(item);
                        }else if(item.processType === 'FA'){
                            this.typeCodeOption[1].options.push(item);
                        }
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
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
                    'typeCode':'',
                    'acntName':'',
                    'accNos':'',
                    'fundAccNos':'',
                    'processStatus':'',
                    'bizType':''
                };
                this.reloadData();
            },
            showOpenDlg(mode, row, actionOk,isDisabled=false) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = '账户开户';
                let okButtonTitle = '保存';//add addInfo edit
                if(mode==='check'){
                    title = '账户审核';
                    okButtonTitle = '审核';
                }else if(mode==='detele'){
                    title = '账户作废';
                    okButtonTitle = '作废';
                }else if(mode==='addInfo'){
                    title = '资料准备';
                    okButtonTitle = '保存';
                }else if(mode==='checkFund'){
                    title = '财务审核';
                    okButtonTitle = '审核';
                }

                if(!this.$lodash.isEmpty(row.applySubId)){
                    title = title + '-子流程'
                }

                let customOpBtn = [];
                if(mode==='check' || mode==='checkFund'){
                    customOpBtn = [
                        {title: okButtonTitle, className: 'primary', action: 'onSave'},
                        {title: '反审核', className: 'primary', action: 'onCancelCheck'},
                        {title: '取消', action: 'onCancel'},
                    ]
                }else if(mode==='view'){
                    customOpBtn = [
                        {title: '关闭', action: 'onCancel'}
                    ]
                }else{
                    customOpBtn = [
                        {title: okButtonTitle, className: 'primary', action: 'onSave'},
                        {title: '取消', action: 'onCancel'}
                    ]
                }

                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk,isDisabled},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:okButtonTitle,
                    cancelButtonTitle:mode==='view'?'关闭':'取消',
                    customOpBtn: customOpBtn
                })
            },
            onOpenApply(){
                this.reloadData();
            },
            openApply() {
                this.showOpenDlg('add', {}, this.onOpenApply.bind(this));
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
                        if(params.data.children[i].processStatus!='08'
                            && params.data.children[i].processStatus!='09'){
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

            async submitOA() {
                //此处通过该方法获取选中的数据，调用接口批量操作
                let data  = this.$refs.grid.getSelectedRows();
                if (data.length === 0) {
                    this.$msg.warning('请选择数据');
                    return;
                }

                let applyIds = [];
                let applySubIds = [];

                let firstTypeCode = data[0].typeCode;
                for(let i=0;i<data.length;i++){
                    let item = data[i];
                    //校验：节点状态 是否为待提交OA
                    if(item.processStatus !== '03'){
                        this.$msg.warning('所选数据流程节点必须为【待提交OA】');
                        return;
                    }

                    if(firstTypeCode !== item.typeCode){
                        this.$msg.warning('所选数据必须为同一账户类型');
                        return;
                    }

                    //
                    if(!this.$lodash.isEmpty(item.applySubId)){
                        applySubIds.push(item.applySubId)
                    }else if(!this.$lodash.isEmpty(item.applyId)){
                        applyIds.push(item.applyId)
                    }
                }

                const ok = await this.$msg.ask(`确认提交所选数据吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.acntApplyApi.submitOa(applyIds,applySubIds);
                    await this.$app.blockingApp(p);
                    this.$msg.success("提交成功!");
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            showInsertDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }

                let title = '账户录入';
                if(mode === 'check'){
                    title = '账户复核';
                }

                let customOpBtn = [];
                if(mode==='check'){
                    customOpBtn = [
                        {title: '审核', className: 'primary', action: 'onSave'},
                        {title: '反审核', className: 'primary', action: 'onCancelCheck'},
                        {title: '取消', action: 'onCancel'},
                    ]
                }else if(mode==='view'){
                    customOpBtn = [
                        {title: '关闭', action: 'onCancel'}
                    ]
                }else{
                    customOpBtn = [
                        {title: '保存', className: 'primary', action: 'onSave'},
                        {title: '取消', action: 'onCancel'}
                    ]
                }

                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='check'?'审核':'保存',
                    cancelButtonTitle:mode==='view'?'关闭':'取消',
                    customOpBtn: customOpBtn
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
                    width: '200px',
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
                this.showStepsDlg('view', params.data, this.onStepsApply.bind(this));
            },

            //整合编辑按钮：编辑 账户录入
            showDetail(params) {
                if(params.data.processStatus === '01' || params.data.processStatus === '02'
                    || params.data.processStatus === '03'|| params.data.processStatus === '04'
                    || params.data.processStatus === '05' || !this.$lodash.isEmpty(params.data.applySubId)){
                    this.showOpenDlg('view', params.data, this.onOpenApply.bind(this),true);
                }else if(params.data.processStatus === '06' || params.data.processStatus === '07'
                    || params.data.processStatus === '08'){
                    this.showInsertDlg('view', params.data, this.onOpenApply.bind(this));
                }
            },

            //整合编辑按钮：编辑 账户录入
            edit(params) {
                if(params.data.processStatus === '01'){
                    //edit 编辑
                    this.showOpenDlg('edit', params.data, this.onOpenApply.bind(this));
                }else if(params.data.processStatus === '06'){
                    //addAcc 账户录入
                    this.showInsertDlg('add', params.data, this.onOpenApply.bind(this));
                }
            },

            detele(params) {
                this.showOpenDlg('detele', params.data, this.onOpenApply.bind(this),true);
            },

            //整合审核按钮：编辑
            check(params) {
                if(params.data.processStatus === '02'){
                    //check 复核
                    this.showOpenDlg('check', params.data, this.onOpenApply.bind(this),true);
                }else if(params.data.processStatus === '04'){
                    //nextaddInfo 资料准备完成
                    this.nextaddInfo(params);
                }else if(params.data.processStatus === '05'){
                    //checkFund 财务审核
                    this.showOpenDlg('checkFund', params.data, this.onOpenApply.bind(this),true);
                }else if(params.data.processStatus === '07'){
                    //checkAcc 账户复核
                    this.showInsertDlg('check', params.data, this.onOpenApply.bind(this));
                }

            },


            async addInfoFile() {
                //此处通过该方法获取选中的数据，调用接口批量操作
                let selectedRows  = this.$refs.grid.getSelectedRows();
                if (selectedRows.length !== 1) {
                    this.$msg.warning('请选择一条数据');
                    return;
                }
                if (selectedRows[0].applySubId) {
                    this.$msg.warning('请选择账户申请主流程');
                    return;
                }
                if (selectedRows[0].processStatus !== '04') {
                    this.$msg.warning('请选择流程节点为资料准备数据');
                    return;
                }

                this.showOpenDlg('addInfo', selectedRows[0], this.onOpenApply.bind(this),false);

            }
        }
    }
</script>