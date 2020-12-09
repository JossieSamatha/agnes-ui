<template>
    <div style="height: 100%">
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="账户名称">
                    <el-input v-model="queryArgs.acntName"></el-input>
                </el-form-item>
                <el-form-item label="资金账号" >
                    <el-input v-model="queryArgs.fundAccNos"></el-input>
                </el-form-item>
                <el-form-item label="证券账号" >
                    <el-input v-model="queryArgs.accNos"></el-input>
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
              <el-form-item label="状态">
                <gf-dict filterable clearable v-model="queryArgs.acntStatus" dict-type="AGNES_ACNT_INFO_STATUS"/>
              </el-form-item>
              <el-form-item label="归属机构">
                <el-select v-model="queryArgs.orgIdList" multiple placeholder="请选择">
                  <el-option
                      v-for="item in orgOption"
                      :key="item.value"
                      :label="item.extOrgName"
                      :value="item.extOrgId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid ref="grid" height="calc(100% - 70px)"
                 @row-double-click="showDetail"
                :query-args="queryArgs"
                grid-no="agnes-acnt-info-fa">
            <template slot="left">
               <gf-button class="action-btn" @click="exoprtV45" size="mini"
                          v-if="$hasPermission('agnes.acnt.info.fa.exportV45')">导出v45接口
               </gf-button>
               <gf-button class="action-btn" @click="registration" size="mini"
                          v-if="$hasPermission('agnes.acnt.info.fa.registration')">账户登记</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntApplyOpen from "../acnt-apply/acnt-apply-open";
    import AcntApplyInsert from "../acnt-apply/acnt-apply-insert";
    import AcntInfoDetail from "../acnt-info/acnt-info-detail";
    export default {
        data() {
            return {
                queryArgs: {
                  'processType': 'FA',
                  'typeCode': '',
                  'acntName': '',
                  'accNos': '',
                  'fundAccNos': '',
                  'acntStatus': '',
                  'orgIdList': [],
                },
              typeCodeOption: [{
                label: 'TA',
                options: []
              }, {
                label: 'FA',
                options: []
              }],
              orgOption: [],
            }
        },
      beforeMount() {
        const p = this.getOptionData();
        this.$app.blockingApp(p);
      },
      mounted() {
        this.loadExtOrg();
      },
      methods: {
        async loadExtOrg() {
          try {
            this.$api.orgDefineApi.getOrgList().then(resp => {
              if (resp && resp.data) {
                this.orgOption = resp.data;
              }
            })
          } catch (e) {
            this.$msg.error(e);
          }
        },
        async getOptionData() {
          try {
            let typeCodeOption = await this.$api.acntApplyApi.getAcntTypeList();
            typeCodeOption.data.forEach(item => {
              if (item.processType === 'FA') {
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
            reSetSearch() {
              this.queryArgs.processType = 'FA';
              this.queryArgs.typeCode = '';
              this.queryArgs.acntName = '';
              this.queryArgs.accNos = '';
              this.queryArgs.fundAccNos = '';
              this.queryArgs.acntStatus = '';
              this.queryArgs.orgIdList = [];
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

            showAcntInfoDlg(mode, row, actionOk,isDisabled=false) {
                if (!row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = '账户信息';
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntInfoDetail,
                    args: {row, mode, actionOk,isDisabled},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='detele'?'提交':'保存',
                    cancelButtonTitle:mode==='view'?'关闭':'取消'
                })
            },

            showDetail(params) {
                this.showAcntInfoDlg('view', params.data, this.onOpenApply.bind(this),true);
            },

            exoprtV45(){}
        }
    }
</script>
