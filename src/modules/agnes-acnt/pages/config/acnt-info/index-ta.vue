<template>
    <div style="height: 100%">
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.acntName"></el-input>
                </el-form-item>
                <el-form-item label="账号" >
                    <el-input v-model="queryArgs.accNo"></el-input>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="账户类型">
                    <el-select class="multiple-select" v-model="queryArgs.typeCode"
                               filterable clearable
                               placeholder="请选择">
                        <gf-filter-option
                                v-for="item in typeCodeOption"
                                :key="item.typeCode"
                                :label="item.typeName"
                                :value="item.typeCode">
                        </gf-filter-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <gf-dict filterable clearable v-model="queryArgs.acntStatus" dict-type="AGNES_ACNT_INFO_STATUS"/>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid ref="grid" height="calc(100% - 70px)"
                @row-double-click="editEventDef"
                :query-args="queryArgs"
                grid-no="agnes-acnt-info-ta">
            <template slot="left">
               <gf-button class="action-btn" @click="exoprtV45" size="mini"
                          v-if="$hasPermission('agnes.acnt.info.ta.exoprtV45')">导出v45</gf-button>
               <gf-button class="action-btn" @click="registration" size="mini"
                          v-if="$hasPermission('agnes.acnt.info.ta.registration')">账户登记</gf-button>
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
                    'processType':'TA',
                    'typeCode':'',
                    'acntName':'',
                    'accNo':'',
                    'acntStatus':''
                },
                typeCodeOption:[]
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
                    this.typeCodeOption = typeCodeOption.data
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'processType':'TA',
                    'typeCode':'',
                    'acntName':'',
                    'accNo':'',
                    'acntStatus':''
                };
                this.reloadData();
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
