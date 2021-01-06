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
<!--                <el-form-item label="证券账号" >-->
<!--                    <el-input v-model="queryArgs.accNos"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="归属机构">
                  <el-select class="multiple-select" v-model="queryArgs.orgIdList" multiple collapse-tags filterable
                             placeholder="请选择">
                    <gf-filter-option
                        v-for="item in orgOption"
                        :key="item.value"
                        :label="`${item.extOrgCode} - ${item.extOrgName} - ${item.orgTypeName}`"
                        :value="item.extOrgId">
                    </gf-filter-option>
                  </el-select>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">

                <el-form-item label="基金信息" >
                    <el-input v-model="queryArgs.productName" placeholder="基金代码/名称"></el-input>
                </el-form-item>

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

                <el-form-item></el-form-item>
<!--              <el-form-item label="账户状态">-->
<!--                <gf-dict filterable clearable v-model="queryArgs.acntStatus" dict-type="AGNES_ACNT_INFO_STATUS"/>-->
<!--              </el-form-item>-->

              <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>

<!--            <div class="line">-->

<!--            </div>-->
        </el-form>
        <gf-grid ref="grid" height="calc(100% - 100px)"
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

            <template slot="right-before">
                <el-radio-group v-model="queryArgs.acntStatus" @change="reloadData"  size="mini" style="width:290px;">
                    <el-radio-button label="01">正常</el-radio-button>
                    <el-radio-button label="04">久悬</el-radio-button>
                    <el-radio-button label="03">锁定</el-radio-button>
                    <el-radio-button label="02">销户</el-radio-button>
                </el-radio-group>

<!--                <el-switch class="inner-switch"-->
<!--                           v-model="queryArgs.isShowAll"-->
<!--                           :width = 65-->
<!--                           active-text="全部"-->
<!--                           inactive-text="默认"-->
<!--                           active-value=""-->
<!--                           inactive-value="0"-->
<!--                           active-color="#13ce66"-->
<!--                           inactive-color="#409eff"-->
<!--                           @change="switchChange">-->
<!--                </el-switch>-->
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import AcntApplyOpen from "../acnt-apply/acnt-apply-open";
    import AcntApplyInsert from "../acnt-apply/acnt-apply-insert";
    import AcntInfoDetail from "../acnt-info/acnt-info-detail";
    import AcntInfoStatusDlg from "../acnt-info/acnt-info-status-dlg";
    import AcntHiInfoFaDlg from "../acnt-info/acnt-hi-info-fa";

    export default {
        data() {
            return {
                queryArgs: {
                  'processType': 'FA',
                  'typeCode': '',
                  'acntName': '',
                  'accNos': '',
                  'productName':'',
                  'fundAccNos': '',
                  'acntStatus': '01',
                  'isShowAll':'',
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
              this.queryArgs.productName = '';
              this.queryArgs.fundAccNos = '';
              this.queryArgs.acntStatus = '01';
              this.queryArgs.isShowAll = '';
              this.queryArgs.orgIdList = [];
              this.reloadData();
            },
            showOpenDlg(mode, row, actionOk,isDisabled=false) {
                if (!row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = '销户申请';
                if(mode==='addChange'){
                    title = '变更申请';
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyOpen,
                    args: {row, mode, actionOk,isDisabled},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='detele'?'提交':'保存',
                    pageEl: this.$el
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

                let title = '账户登记';
                if(mode==='editData'){
                    title = '编辑';
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: [title],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    okButtonTitle:mode==='check'?'审核':'保存',
                    pageEl: this.$el
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            registration() {
                this.showInsertDlg('registration', {}, this.onOpenApply.bind(this));
            },

            editData(params) {
              this.showInsertDlg('editData', params.data, this.onOpenApply.bind(this));
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
                    cancelButtonTitle:mode==='view'?'关闭':'取消',
                    pageEl: this.$el
                })
            },

            showDetail(params) {
                this.showAcntInfoDlg('view', params.data, this.onOpenApply.bind(this),true);
            },

          async logicDelete(params) {
              const row = params.data;
              const ok = await this.$msg.ask(`确认删除账户信息:[${row.acntName}]吗, 是否继续?`);
              if (!ok) {
                  return
              }
              try {
                  const p = this.$api.acntInfoApi.logicDelete(row.acntId);
                  await this.$app.blockingApp(p);
                  this.$msg.success("删除成功!");
                  this.reloadData();
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
          showAcntStatusDlg(mode, row, ui, actionOk) {
              if (!row) {
                  this.$msg.warning("请选中一条记录!");
                  return;
              }
              let title = '变更状态';

              this.$nav.showDialog(
                  AcntInfoStatusDlg,
                  {
                      args: {row, mode, ui, actionOk},
                      width: '50%',
                      title:title
                  }
              );
          },
          updateAcntStatus(params) {
              this.showAcntStatusDlg('edit', params.data,"", this.onOpenApply.bind(this));
          },

          showHis(params) {
              let row = params.data;
              if (!row) {
                  this.$msg.warning("请选中一条记录!");
                  return;
              }
              let title = '账户历史';
              this.$drawerPage.create({
                  width: 'calc(97% - 215px)',
                  title: [title],
                  component: AcntHiInfoFaDlg,
                  args: {row},
                  okButtonVisible:false,
                  pageEl: this.$el
              })
          },

          exoprtV45(){}
        }
    }
</script>
