<template>
  <div style="height: 100%">
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-ru-list"
             toolbar="find,refresh,more"
             height="100%"
             :query-args="queryArgs"
    >
      <template slot="left">
        <gf-button v-if="$hasPermission('agnes.dop.roster.def.export')" @click="exportExcel" class="action-btn">导出
        </gf-button>
        <menu-config-upload v-if="$hasPermission('agnes.dop.roster.def.import')" :res-name=menuConfigInfo.resName
                            :if-pk-id="menuConfigInfo.inputParam">
        </menu-config-upload>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import rosterDlg from './roster-dlg'
export default {
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    row: Object,
    actionOk: Function
  },
  data() {
    return {
      queryArgs: {
        'rosterDefId': ''
      },
      menuConfigInfo: {},
    }
  },
  mounted() {
    this.queryArgs.rosterDefId = this.row.pkId;
    this.initData();
  },
  methods: {
    async initData() {
      let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl': this.$app.nav.tabBar.currentTabKey});
      if (resp1) {
        this.menuConfigInfo = resp1.data;
      }
    },
    reloadData() {
      this.$refs.grid.reloadData(true);
    },
    editRuRoster(param) {
      this.showScheduleDlg('edit', param.data, this.onEditRoster.bind(this));
    },
    async onEditRoster() {
      this.reloadData();
    },
    showScheduleDlg(mode, row, actionOk) {
      this.$nav.showDialog(
          rosterDlg,
          {
            args: {row, mode, actionOk},
            width: '650px',
            closeOnClickModal: false,
            title: this.$dialog.formatTitle('智能排班', mode),
          }
      );
    },
    deleteRuRoster(param) {
      this.$confirm('是否删除同一批次所有数据?', '排班计划删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '批次删除',
        cancelButtonText: '单条删除',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'close') {
            done();
            return;
          }
          let newObj = {
            pkId: param.data.pkId,
            rosterDefId: param.data.rosterDefId,
            isDelete: action === 'confirm',
            bizDate: window.bizDate,
          }
          try {
            let p = this.$api.rosterApi.deleteRuRoster(newObj);
            await this.$app.blockingApp(p);
            this.$msg.success('删除成功');
            this.reloadData();
            done();
          } catch (reason) {
            this.$msg.error(reason);
          }
        }
      })
    },
    async onCancel() {
      if (this.actionOk) {
        await this.actionOk();
      }
      this.$emit("onClose");
    },
    async exportExcel() {
      if (this.menuConfigInfo == undefined || this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined) {
        this.$msg.error('请完善导出相关配置！');
        return;
      }
      let pkIds = '';
      let rows = this.$refs.grid.getSelectedRows();
      if (rows.length == 0) {
        rows = this.$refs.grid.getRowData();
      }
      rows.forEach((item) => {
        pkIds = pkIds + item.pkId + ",";
      });
      pkIds = pkIds.substring(0, pkIds.lastIndexOf(","));
      let pkId = this.menuConfigInfo.outputParam;
      let fileName = this.menuConfigInfo.resName;
      const basePath = window.location.href.split("#/")[0];
      window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId=" + pkId + "&fileName=" + fileName + "&pkIds=" + pkIds);
    },
  }
}

</script>
