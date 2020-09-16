<template>
  <div>
    <template>
      <gf-grid grid-no="agnes-service-conf-list" ref="grid" quick-text-max-width="300px" height="100%"
               @row-double-click="editService" >
        <template slot="left">
          <gf-button class="action-btn" @click="addService" >添加</gf-button>
        </template>
      </gf-grid>
    </template>
  </div>
</template>

<script>
import ServiceDlg from "./service-dlg";

export default {
  props: {
    rowData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    rowData(value) {
      if (this.grid) {
        this.grid.setRowData(value);
      }
    }
  },
  methods: {
    reloadData() {
      this.$refs.grid.reloadData();
    },
    onReady() {
      this.grid = this.$refs.grid;
      this.refreshRows();
    },
    refreshRows() {
      this.grid.setRowData(this.rowData);
    },
    addService(){
      this.showDlg('add', {}, this.onAddService.bind(this));
    },
    async onAddService() {
      this.reloadData();
    },
    editService(params){
      this.showDlg('edit', params.data, this.onEditService.bind(this));
    },
    async onEditService() {
      this.reloadData();
    },
    approveModelDef(params) {
      this.showDlg('check', params.data, this.onEditService.bind(this));
    },
    async publishModelDef(params){
      try {
        const p = this.$api.ServiceConfApi.changeServiceStatus({serviceResponseId:params.data.serviceResponseId,status:'03'});
        await this.$app.blockingApp(p);
        this.reloadData();
        this.$msg.success('发布成功');
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    showDlg(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      let title = this.$dialog.formatTitle('服务响应等级配置', mode);
      if(mode == 'check'){
        title = '服务响应等级配置 - 审核';
      }
      this.$nav.showDialog(
          ServiceDlg,
          {
            args: {row, mode, actionOk},
            width: '50%',
            title: title,
          }
      );
    },
    async deleteService(params) {
      const row = params.data;
      const ok = await this.$msg.ask(`确认删除字段:[${row.serviceResponseName}]吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.ServiceConfApi.deleteService(row.serviceResponseId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    }
  }
}
</script>

<style scoped>

</style>
