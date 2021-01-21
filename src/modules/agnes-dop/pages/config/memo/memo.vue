<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-memo-ru-list"
             toolbar="find,refresh,more"
             @row-double-click="showMemo"
    >
    </gf-grid>
  </div>
</template>

<script>
import MemoDlg from './memo-dlg'

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
    async editRuMemo(param) {
      this.showTodoDlg('add', param.date, this.onEditMemoDef.bind(this));
    },
    showTodoDlg(mode, row, actionOk) {
      this.$nav.showDialog(
          MemoDlg,
          {
            args: {row, mode, actionOk},
            width: '650px',
            closeOnClickModal: false,
            title: this.$dialog.formatTitle('运营日历', mode),
          }
      );
    },
    async deleteRuMemo(param) {
      const ok = await this.$msg.ask(`是否一同删除本批次运营日历?`);
      param.date.isDelete == ok;
      try {
        const p = this.$api.memoApi.deleteMemo(param.date);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },

  }
}
</script>
