<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-memo-def-list"
             toolbar="find,refresh,more"
             @row-double-click="showMemoDef"
             height="100%"

    >
    </gf-grid>
  </div>
</template>

<script>
import MemoDefDlg from "./memo-def-dlg-new";
import MemoDetail from "./memo"

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
    showMemoDef(param) {
      this.showTodoDlg('view', param.data, this.onEditMemoDef.bind(this));

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
        const p = this.$api.memoApi.approve(param.data.pkId);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (reason) {
        this.$msg.error(reason);
      }
    },
    async viewDetail(param) {
      this.showDrawer('view', param.data)
    },
    showDrawer(mode, row) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: ['运营日历', mode],
        component: MemoDetail,
        args: {row, mode},
        okButtonVisible: false,                             // 保存按钮是否显示
        okButtonTitle: '保存',       // 保存按钮名称按需传入
        cancelButtonTitle: '取消', // 取消按钮名称按需传入
      });
    },
  }
}
</script>
