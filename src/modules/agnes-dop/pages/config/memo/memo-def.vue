<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-memo-def-list"
             toolbar="find,refresh,more"
             @row-double-click="showMemoDef"
             height="100%"
    >
      <template slot="left">
        <gf-button v-if="$hasPermission('agnes.dop.memo.def.add') && this.display === '01'" class="action-btn"
                   @click="addMemoDef"
                   size="mini">添加
        </gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>
import MemoDefDlg from "./memo-def-dlg-new";
import MemoDetail from "./memo"

export default {
  props: {
    display: {
      type: String,
      default: '01'
    },
  },
  mounted() {
    console.log(this.display)
  },
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
      this.showDrawer('view', param.data, this.onEditMemoDef.bind(this))
    },
    showDrawer(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: ['运营日历', mode],
        component: MemoDetail,
        args: {row, mode, actionOk},
        okButtonVisible: false,                             // 保存按钮是否显示
        okButtonTitle: '保存',       // 保存按钮名称按需传入
        cancelButtonTitle: '取消', // 取消按钮名称按需传入
      });
    },
  }
}
</script>
