<template>
    <div>
        <div v-show="pointerShow" class="pointer-mask" @click="pointerShow = false"></div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.acntName"></el-input>
                </el-form-item>
                <el-form-item label="资金账号" >
                    <el-input v-model="queryArgs.fundAccNos"></el-input>
                </el-form-item>
<!--                <el-form-item label="证券账号" >-->
<!--                    <el-input v-model="queryArgs.accNos"></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="申请超时状态">
                    <gf-dict filterable clearable v-model="queryArgs.applyDeadlineStatus" dict-type="AGNES_ACNT_APPLY_DEADLINE_STATUS" />
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

<!--                <el-form-item></el-form-item>-->
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <div class="acnt-apply-container">
            <gf-grid class="acnt-apply-grid" ref="grid"
                     grid-no="acnt-apply-field"
                     @load-data="dataChange"
                     :query-args="queryArgs"
                     @row-double-click="showDetail"
                     :options="applyGridOption(this)"
                     height="100%">
                <template slot="left">
                    <gf-button class="action-btn" @click="openApply"
                                v-if="$hasPermission('agnes.acnt.apply.openApply')">开户</gf-button>
                    <gf-button class="action-btn"
                               :class="pointerShow ? 'pointerShow' : '' "
                               @click="submitOA" style="position: relative;"
                                v-if="$hasPermission('agnes.acnt.apply.submitOA')">
                        <span>批量提交OA</span>
                        <span v-show="pointerShow" class="svg-pointer" v-html="svgImg.pointer"></span>
                    </gf-button>
                    <gf-button class="action-btn" @click="addInfoFile"
                                v-if="$hasPermission('agnes.acnt.apply.addInfoFile')">资料补充</gf-button>
                </template>
                <template slot="right-before">
                    <el-switch class="inner-switch"
                               v-model="queryArgs.isShowAll"
                               :width = 65
                               active-text="全部"
                               inactive-text="申请中"
                               active-value=""
                               inactive-value="0"
                               active-color="#13ce66"
                               inactive-color="#409eff"
                               @change="switchChange">
                    </el-switch>
                </template>
            </gf-grid>
            <acnt-apply-steps v-if="crtStepRow"
                              class="steps-comp"
                              :stepData="crtStepRow"
                              @stepEdit="edit"
                              @stepCheck="check"
                              @stepDelete="detele"
                              @submitOA="setPointerAni"
            >
            </acnt-apply-steps>
        </div>
    </div>
</template>

<script>
    import AcntApplySteps from "./acnt-apply-steps";
    import AcntApplyOpen from "./acnt-apply-open";
    import AcntApplyInsert from "./acnt-apply-insert";
    export default {
        data() {
            return {
                svgImg: this.$svgImg,
                queryArgs:{
                    'typeCode':'',
                    'acntName':'',
                    'accNos':'',
                    'fundAccNos':'',
                    'processStatus':'',
                    'bizType':'',
                    'applyDeadlineStatus':'',
                    'isShowAll':'1'
                },
                tableData: [],
                status:{
                    '01':'发起申请',
                    '02':'复核申请',
                    '03':'待提交OA',
                    '04':'资料完备',
                    '05':'财务流程',
                    '06':'信息录入',
                    '07':'信息复核',
                    '08':'归档申请',
                    '09':'作废申请',
                },
                typeCodeOption: [{
                    label: 'TA',
                    options: []
                },{
                    label: 'FA',
                    options: []
                }],
                crtStepRow: null,
                applyGridOption: (_that)=>{
                    return {
                        onRowClicked: (params)=>{
                            _that.crtStepRow = params.data
                        }
                    }
                },
                pointerShow: false
            }
        },
        components: {
            'acnt-apply-steps': AcntApplySteps
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
            switchChange(){
                if(this.queryArgs.isShowAll === true){
                    this.queryArgs.isShowAll = ""
                }
                this.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            dataChange(params) {
                this.tableData = [];
                this.orgHierarchyFunc(params.rows, []);
                params.rows = this.tableData;
                params.total = this.tableData.length;
                this.crtStepRow = params.rows[0];
                this.$refs.grid.$emit("data-loaded", params);
            },
            orgHierarchyFunc(data, orgHierarchy) {
                if (data&&data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].orgHierarchy = JSON.parse(JSON.stringify(orgHierarchy));
                        data[i].orgHierarchy.push(data[i].resId);
                        this.tableData.push(data[i]);
                        this.orgHierarchyFunc(data[i].children, data[i].orgHierarchy);
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
                    'bizType':'',
                    'applyDeadlineStatus':'',
                    'isShowAll':'1'
                };
                this.$refs.grid.reloadData();
            },
            showOpenDlg(mode, row, actionOk,isDisabled=false) {
              if (mode !== 'add' && !row) {
                this.$msg.warning("请选中一条记录!");
                return;
              }
              let title = '发起申请';
              let okButtonTitle = '提交';//add addInfo edit
              if (mode === 'check') {
                title = '账户审核';
                okButtonTitle = '审核';
              } else if (mode === 'detele') {
                title = '作废申请';
                okButtonTitle = '作废';
              } else if (mode === 'addInfo') {
                title = '资料准备';
                okButtonTitle = '提交';
              } else if (mode === 'checkFund') {
                    title = '财务流程';
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
                  let form = JSON.parse(JSON.stringify(params.data))
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

                // let firstTypeCode = data[0].typeCode;
                for(let i=0;i<data.length;i++){
                    let item = data[i];
                    //校验：节点状态 是否为待提交OA
                    if(item.processStatus !== '03'){
                        this.$msg.warning('所选数据流程节点必须为【待提交OA】');
                        return;
                    }

                    // if(firstTypeCode !== item.typeCode){
                    //     this.$msg.warning('所选数据必须为同一账户类型');
                    //     return;
                    // }

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

                let title = '信息录入';
                if(mode === 'check'){
                    title = '信息复核';
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

            showStepsDlg(params) {
                this.crtStepRow = params.data;
            },
            onStepsApply(){
                this.reloadData();
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

            },

            setPointerAni(){
                this.pointerShow = true;
                setTimeout(()=>{
                    this.pointerShow = false;
                }, 4500)
            }
        }
    }
</script>

<style scoped>
    .acnt-apply-container {
        display: flex;
        height: 100%;
    }

    .acnt-apply-container .steps-comp {
        flex: none;
        width: 200px;
        height: calc(100% - 30px);
        padding: 0 20px 30px;
        margin-top: 30px;
        margin-left: 10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
    }

    .ag-grid-box.acnt-apply-grid {
        overflow: initial;
    }

    .action-btn .svg-pointer {
        position: absolute;
        top: -40px;
        right: -30px;
        width: 30px;
        height: auto;
        animation: moveVertical 1.5s infinite linear;
        animation-iteration-count:3;
        z-index: 1005;
    }

    .pointer-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
    }

    @keyframes moveVertical {
        0% {
            top: -40px;
            right: -30px;
        }
        25% {
            top: -30px;
            right: -20px;
        }
        50% {
            top: -20px;
            right: -10px;
        }
        75% {
            top: -30px;
            right: -20px;
        }
        100% {
            top: -40px;
            right: -30px;
        }
    }
</style>

<style>
    .ag-grid-box .grid-action-panel .action-btn.pointerShow {
        color: #0F5EFF;
        border-color: #0F5EFF;
        background: #fff;
        z-index: 1008;
        box-shadow: 0px 0px 2px 1px #409eff;
    }

    .acnt-apply-grid .ag-theme-balham .ag-ltr .ag-group-expanded,
    .acnt-apply-grid .ag-theme-balham .ag-ltr .ag-group-contracted{
        margin-right: 0;
    }

    .acnt-apply-grid .ag-theme-balham .ag-ltr .ag-group-expanded .ag-icon,
    .acnt-apply-grid .ag-theme-balham .ag-ltr .ag-group-contracted .ag-icon{
        color: blue;
    }

    .acnt-apply-grid .ag-theme-balham .ag-row-group-expanded .ag-cell:not([col-id="#cbox"]),
    .acnt-apply-grid .ag-theme-balham .ag-row-group-contracted .ag-cell:not([col-id="#cbox"]){
        color: blue;
        background: #F6F8FA;
    }

    .acnt-apply-grid .gf-ag-grid.ag-theme-balham .ag-row-even,
    .acnt-apply-grid .gf-ag-grid.ag-theme-balham .ag-row-odd {
        background: #fff;
    }

    .acnt-apply-grid .gf-ag-grid.ag-theme-balham .ag-row.ag-row-level-1 {
        border: none;
    }
    .acnt-apply-grid .ag-cell .ag-group-value{
        margin-left: 0!important;
    }

    .acnt-apply-grid .ag-theme-balham .ag-ltr .ag-row-level-1 .ag-row-group-leaf-indent {
        margin-left: 0;
    }
    .acnt-apply-container .ag-grid-box .grid-action-panel .right .el-input {
        width: 200px;
    }
</style>
