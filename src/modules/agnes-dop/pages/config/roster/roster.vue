<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-ru-list"
             toolbar="find,refresh,more"

    >
    </gf-grid>
  </div>
</template>

<script>
export default {
  methods: {
    // async deleteRuRoster(param) {
    //   const ok = await this.$msg.ask(`确认删除所选排班数据吗, 是否继续?`);
    //   if (!ok) {
    //     return
    //   }
    //   try {
    //     const p = this.$api.rosterApi.deleteRef(param.data.pkId);
    //     await this.$app.blockingApp(p);
    //     this.reloadData();
    //   } catch (reason) {
    //     this.$msg.error(reason);
    //   }
    // },
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
    }
  }
}

</script>
