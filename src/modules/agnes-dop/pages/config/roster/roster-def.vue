<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-def-list"
             toolbar="find,refresh,more"
             @row-double-click="showRosterDef"
    >
      <template slot="left">
        <gf-button class="action-btn" @click="addRosterDef" size="mini">
          添加
        </gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import rosterDefDlg from '../memo/roster-type-dlg';

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
      this.showScheduleDlg('add', param.data, this.onEditRosterDef.bind(this));
    },
    addRosterDef() {
      this.showScheduleDlg('add', {}, this.onAddRosterDef.bind(this));
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
    }
  }
}
</script>
