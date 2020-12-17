<template>
  <div>
    <gf-grid @row-double-click="showConfigInfo" grid-no="agnes-func-config-list" ref="grid">
      <template slot="left">
        <gf-button  @click="addConfigInfo" class="action-btn">添加</gf-button>
        <gf-button  @click="exportExcel" class="action-btn">导出</gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import AddConfigDlg from "./add-config";

export default {
  methods: {
    reloadData() {
      this.$refs.grid.reloadData();
    },
    showDlg(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: ['功能帮助配置维护',mode],
        component: AddConfigDlg,
        args: {row, mode, actionOk},
        okButtonVisible:mode!=='view',
        pageEl: this.$el
      });
    },
    async onAddConfigInfo() {
      this.reloadData();
    },
    async onEditConfigInfo() {
      this.reloadData();
    },
    addConfigInfo() {
      this.showDlg('add', {}, this.onAddConfigInfo.bind(this));
    },
    exportExcel() {
      const basePath = window.location.href.split("#/")[0];
      window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId=92636dd481ee4314b54686440ad5e4d0&fileName=ces.xls");
    },
    showConfigInfo(params) {
      this.showDlg('view', params.data);
    },
    editConfigInfo(params) {
      this.showDlg('edit', params.data, this.onEditConfigInfo.bind(this));
    },
    async deleteConfigInfo(params) {
      const row = params.data;
      const ok = await this.$msg.ask(`确认删除选中记录吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.funcConfigApi.deleteFuncConfig(row);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
  }
}
</script>
