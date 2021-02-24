<template>
  <div style="height: 100%">
    <el-form class="search-panel" label-width="100px">
      <div class="line">
        <el-form-item label="账户名称">
          <el-input v-model="queryArgs.acntName"></el-input>
        </el-form-item>
        <el-form-item label="资金账号">
          <el-input v-model="queryArgs.fundAccNos"></el-input>
        </el-form-item>
        <el-form-item label="归属机构">
          <el-select v-model="orgIdList" multiple collapse-tags filterable placeholder="请选择">
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

        <el-form-item label="产品阶段">
          <el-select class="multiple-select" v-model="productStages" multiple collapse-tags filterable
                     placeholder="请选择">
            <gf-filter-option
                    v-for="item in productStageDict"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
            </gf-filter-option>
          </el-select>
        </el-form-item>

        <el-button @click="reSetSearch" class="option-btn">重置</el-button>
      </div>
    </el-form>
    <gf-grid ref="grid" height="calc(100% - 100px)"
             @row-double-click="showDetail"
             :query-args="queryArgs"
             grid-no="agnes-acnt-info-ta">
      <template slot="left">
<!--        <gf-button class="action-btn" @click="exoprtV45" size="mini"-->
<!--                   v-if="$hasPermission('agnes.acnt.info.ta.exportV45')">导出v45-->
<!--        </gf-button>-->
        <gf-button class="action-btn" @click="registration" size="mini"
                   v-if="$hasPermission('agnes.acnt.info.ta.registration')">账户登记
        </gf-button>
      </template>

      <template slot="right-before">
        <el-radio-group v-model="queryArgs.acntStatus" @change="reloadData"  size="mini" style="width:290px;">
          <el-radio-button label="01">正常</el-radio-button>
          <el-radio-button label="04">久悬</el-radio-button>
          <el-radio-button label="03">锁定</el-radio-button>
          <el-radio-button label="02">销户</el-radio-button>
        </el-radio-group>
<!--        <el-switch class="inner-switch"-->
<!--                   v-model="queryArgs.isShowAll"-->
<!--                   :width = 65-->
<!--                   active-text="全部"-->
<!--                   inactive-text="默认"-->
<!--                   active-value=""-->
<!--                   inactive-value="0"-->
<!--                   active-color="#13ce66"-->
<!--                   inactive-color="#409eff"-->
<!--                   @change="switchChange">-->
<!--        </el-switch>-->
      </template>
    </gf-grid>
  </div>
</template>

<script>
import AcntApplyOpen from "../acnt-apply/acnt-apply-open";
import AcntApplyInsert from "../acnt-apply/acnt-apply-insert";
import AcntInfoDetail from "./acnt-info-detail";
import AcntInfoStatusDlg from "./acnt-info-status-dlg";
import AcntHiInfoTaDlg from "./acnt-hi-info-ta";

export default {
  data() {
    return {
      productStageDict:[],
      orgIdList:[],
      productStages:[],
      queryArgs: {
        'processType': 'TA',
        'typeCode': '',
        'acntName': '',
        'accNos': '',
        'productName':'',
        'fundAccNos': '',
        'acntStatus': '01',
        // 'isShowAll':'1',
        'isShowAll':'',
        'orgIdListStr': '',
        'productStagesStr': '',
      },
      menuConfigInfo:{},
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
      this.productStageDict = this.$app.dict.getDictItems("AGNES_PRODUCT_STAGE").map((dictItem) => {
        return {
          typeId: dictItem.dictId,
          typeName: dictItem.dictName
        }
      });
      try {
        let typeCodeOption = await this.$api.acntApplyApi.getAcntTypeList();
        typeCodeOption.data.forEach(item => {
          if (item.processType === 'TA') {
            this.typeCodeOption[0].options.push(item);
          }
        });
        let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl':this.$app.nav.tabBar.currentTabKey});
        if(resp1){
          this.menuConfigInfo = resp1.data;
        }
      } catch (reason) {
        this.$msg.error(reason);
      }
    },

    reloadData() {
      let orgIdListStr = '';
      this.orgIdList.forEach(((item,index)=>{
        if(index!=0){
          orgIdListStr=orgIdListStr+','
        }
        orgIdListStr=orgIdListStr+item;
      }));
      let productStagesStr = '';
      this.productStages.forEach(((item,index)=>{
        if(index!=0){
          productStagesStr=productStagesStr+','
        }
        productStagesStr=productStagesStr+item;
      }));
      this.queryArgs.orgIdListStr = orgIdListStr;
      this.queryArgs.productStagesStr = productStagesStr;
      this.$refs.grid.reloadData();
    },
    reSetSearch() {
      this.queryArgs.processType = 'TA';
      this.queryArgs.typeCode = '';
      this.queryArgs.acntName = '';
      this.queryArgs.accNos = '';
      this.queryArgs.productName = '';
      this.queryArgs.fundAccNos = '';
      this.queryArgs.acntStatus = '01';
      this.queryArgs.isShowAll = '';
      this.productStages = [];
      this.orgIdList = [];
      this.queryArgs.orgIdListStr = '';
      this.queryArgs.productStagesStr = '';
      this.reloadData();
    },
    showOpenDlg(mode, row, actionOk, isDisabled = false) {
      if (!row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      let title = '销户申请';
      if (mode === 'addChange') {
        title = '变更申请';
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: [title],
        component: AcntApplyOpen,
        args: {row, mode, actionOk, isDisabled},
        okButtonVisible: mode !== 'view',
        okButtonTitle: '提交',
        pageEl: this.$el
      })
    },
    onOpenApply() {
      this.reloadData();
    },
    delete(params) {
      this.showOpenDlg('deteleApply', params.data, this.onOpenApply.bind(this), false);
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
        okButtonVisible: mode !== 'view',
        okButtonTitle: mode === 'check' ? '审核' : '保存',
        pageEl: this.$el
      })
    },
    onInsertApply() {
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
    showAcntInfoDlg(mode, row, actionOk, isDisabled = false) {
      if (!row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      let title = '账户信息';
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: [title],
        component: AcntInfoDetail,
        args: {row, mode, actionOk, isDisabled},
        okButtonVisible: mode !== 'view',
        okButtonTitle: mode === 'detele' ? '提交' : '保存',
        cancelButtonTitle: mode === 'view' ? '关闭' : '取消',
        pageEl: this.$el
      })
    },

    showDetail(params) {
      this.showAcntInfoDlg('view', params.data, this.onOpenApply.bind(this), true);
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
        component: AcntHiInfoTaDlg,
        args: {row},
        okButtonVisible:false,
        pageEl: this.$el
      })
    },

    async exoprtV45() {
      if(this.menuConfigInfo == undefined || this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined){
        this.$msg.error('请完善导出相关配置！');
        return ;
      }
      let pkIds = '';
      let rows = this.$refs.grid.getSelectedRows();
      if(rows.length == 0){
        rows = this.$refs.grid.getRowData();
      }
      rows.forEach((item)=>{
        pkIds = pkIds + item.acntId +",";
      });
      pkIds = pkIds.substring(0, pkIds.lastIndexOf(","));
      let pkId = this.menuConfigInfo.outputParam;
      let fileName = "账户信息导出V45";
      const basePath = window.location.href.split("#/")[0];
      window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId="+pkId+"&fileName="+fileName+"&pkIds="+pkIds);
    },
  }
}
</script>
