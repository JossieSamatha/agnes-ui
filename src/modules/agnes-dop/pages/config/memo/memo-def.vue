<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-memo-def-list"
             toolbar="find,refresh,more"
             @row-double-click="showMemoDef"
    >
      <template slot="left">
        <gf-button class="action-btn" @click="addMemoDef" size="mini">
          添加
        </gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import MemoDefDlg from "./memo-def-dlg-new";

export default {
  methods: {
    reloadData() {
      this.$refs.grid.reloadData(true);
    },
    async onAddMemoDef() {
      this.reloadData();
    },
    async onEditMemoDef() {
      this.reloadData();
    },
    editMemoDef(param) {
      this.showTodoDlg('edit', param.data, this.onEditMemoDef.bind(this));
    },
    addMemoDef() {
      this.showTodoDlg('add', {}, this.onAddMemoDef.bind(this));
    },
    showTodoDlg(mode, row, actionOk) {
      this.$nav.showDialog(
          MemoDefDlg,
          {
            args: {row, mode, actionOk},
            width: '650px',
            closeOnClickModal: false,
            title: this.$dialog.formatTitle('运营日历', mode),
          }
      );
    },
    async deleteMemoDef(param) {
      const ok = await this.$msg.ask(`确认删除所选运营日历数据吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.memoApi.deleteMemoDef(param.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async approveMemoDef(param) {
      const ok = await this.$msg.ask(`确认复核所选运营日历数据吗, 是否继续?`);
      if (!ok) {
        return
      }
      try {
        console.log(param)
        const p = this.$api.memoApi.approve(param.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    }
  }
}
</script>
