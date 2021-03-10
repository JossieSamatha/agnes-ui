<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-def-list"
             toolbar="find,refresh,more"
             @row-double-click="showRosterDef"
             height="100%"
    >
    </gf-grid>
  </div>
</template>

<script>
import rosterDefDlg from './roster-type-dlg';
import rosterDetail from './roster'

export default {
  methods: {
    reloadData() {
      this.$refs.grid.reloadData(true);
    },
    async onAddRosterDef() {
      this.reloadData();
    },
    async onEditRosterDef() {
      this.reloadData();
    },
    editRosterDef(param) {
      this.showScheduleDlg('edit', param.data, this.onEditRosterDef.bind(this));
    },
    addRosterDef() {
      this.showScheduleDlg('add', {}, this.onAddRosterDef.bind(this));
    },
    showRosterDef(param) {
      this.showScheduleDlg('view', param.data, this.onAddRosterDef.bind(this));
    },
    showScheduleDlg(mode, row, actionOk) {
      this.$nav.showDialog(
          rosterDefDlg,
          {
            args: {row, mode, actionOk},
            width: '650px',
            closeOnClickModal: false,
            title: this.$dialog.formatTitle('智能排班', mode),
          }
      );
    },
    async deleteRosterDef(param) {
      const ok = await this.$msg.ask(`确认删除所选排班数据吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.rosterApi.deleteRef(param.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async approveRosterDef(param) {
      const ok = await this.$msg.ask(`确认复核所选排班数据吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.rosterApi.approve(param.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async viewDetail(param) {
      this.showDrawer('view', param.data, this.onEditRosterDef.bind(this))
    },
    showDrawer(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: ['运营日历明细', mode],
        component: rosterDetail,
        args: {row, mode, actionOk},
        okButtonVisible: false,                             // 保存按钮是否显示
        okButtonTitle: '保存',       // 保存按钮名称按需传入
        cancelButtonTitle: '取消', // 取消按钮名称按需传入
      });
    },
  }
}
</script>
