<template>
  <div style="height: 100%">
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-ru-list"
             toolbar="find,refresh,more"
             height="100%"
             :query-args="queryArgs"
    >
    </gf-grid>
  </div>
</template>

<script>
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
        'rosterDefId': ''
      }
    }
  },
  mounted() {
    this.queryArgs.rosterDefId = this.row.pkId;
  },
  methods: {
    reloadData() {
      this.$refs.grid.reloadData(true);
    },
    deleteRuRoster(param) {
      this.$confirm('是否删除同一批次所有数据?', '排班计划删除', {
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
            rosterDefId: param.data.rosterDefId,
            isDelete: action === 'confirm'
          }
          try {
            let p = this.$api.rosterApi.deleteRuRoster(newObj);
            await this.$app.blockingApp(p);
            this.$msg.success('删除成功');
            this.reloadData();
            done();
          } catch (reason) {
            this.$msg.error(reason);
          }
        }
      })
    },
    async onCancel() {
      if (this.actionOk) {
        await this.actionOk();
      }
      this.$emit("onClose");
    },
  }
}

</script>
