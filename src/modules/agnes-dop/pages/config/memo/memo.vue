<template>
  <div style="height: 100%">
    <gf-grid ref="grid"
             grid-no="agnes-dop-memo-ru-list"
             toolbar="find,refresh,more"
             @row-double-click="showRuMemo"
             :query-args="queryArgs"
             height="100%"
    >
    </gf-grid>
  </div>
</template>

<script>
import MemoDlg from './memo-dlg'

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
        'memoDefId': ''
      }
    }
  },
  mounted() {
    if (this.row) {
      this.queryArgs.memoDefId = this.row.pkId;
    }
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
    async editRuMemo(param) {
      this.showTodoDlg('edit', param.data, this.onEditMemoDef.bind(this));
    },
    async showRuMemo(param) {
      this.showTodoDlg('show', param.data, this.onEditMemoDef.bind(this));
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
    // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
    async onCancel() {
      if (this.actionOk) {
        await this.actionOk();
      }
      this.$emit("onClose");
    },
    deleteRuMemo(param) {
      this.$confirm('是否删除同一批次所有数据?', '日历计划删除', {
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
            memoDefId: param.data.memoDefId,
            bizDate: window.bizDate,
            isDelete: action === 'confirm'
          }
          try {
            let p = this.$api.memoApi.deleteRuMemo(newObj);
            await this.$app.blockingApp(p);
            this.$msg.success('删除成功');
            this.reloadData();
            done();
          } catch (reason) {
            this.$msg.error(reason);
          }
        }
      })
    }

  }
}
</script>
