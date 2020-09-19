<template>
  <div>
    <gf-grid @row-double-click="showOrgType" grid-no="agnes-org-type-list" ref="grid">
      <template slot="left">
        <gf-button @click="addOrgType" class="action-btn">添加</gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import OrgTypeDlg from "./org-type-dlg";

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
      this.$nav.showDialog(
          OrgTypeDlg,
          {
            args: {row, mode, actionOk},
            width: '40%',
            closeOnClickModal: false,
            title: this.$dialog.formatTitle('机构类型维护', mode),
          }
      );
    },
    async onAddOrgType() {
      this.reloadData();
    },
    async onEditOrgType() {
      this.reloadData();
    },
    addOrgType() {
      this.showDlg('add', {}, this.onAddOrgType.bind(this));
    },
    showOrgType(params) {
      this.showDlg('view', params.data);
    },
    editOrgType(params) {
      this.showDlg('edit', params.data, this.onEditOrgType.bind(this));
    },
    async deleteOrgType(params) {
      const row = params.data;
      const ok = await this.$msg.ask(`确认删除选中的机构类型吗, 是否继续?`);
      if (!ok) {
        return
      }
      const orgTypeIds = [];
      orgTypeIds.push(row.orgTypeId);
      try {
        const p = this.$api.orgTypeApi.deleteOrgType(orgTypeIds);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async approveOrgType(params) {
      const row = params.data;
      const ok = await this.$msg.ask(`确认复核所选机构:[${row.orgTypeName}]吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.orgTypeApi.updateOrgTypeStatus(row.orgTypeId, "04");
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
  }
}
</script>

<style scoped>

</style>
