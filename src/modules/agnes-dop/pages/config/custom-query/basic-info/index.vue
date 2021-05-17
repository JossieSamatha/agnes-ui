<template>
  <gf-grid grid-no="agnes-custom-rule-list" ref="grid" quick-text-max-width="300px" height="100%"
           @row-double-click="showCustomQueryRule">
    <template slot="left">
      <gf-button class="action-btn" @click="addCustomRule" size="mini">
        添加
      </gf-button>
    </template>
  </gf-grid>
</template>

<script>
import RuleAdd from './rule-add-dlg'

export default {
  name: "index",
  data() {
    return {}
  },
  methods: {
    async reloadData() {
      this.$refs.grid.reloadData();
    },
    addCustomRule() {
      this.showDrawer('add', {}, this.reloadData.bind(this))
    },
    editRow(param) {
      this.showDrawer('edit', param.data, this.reloadData.bind(this))
    },
    showCustomQueryRule(param) {
      this.showDrawer('view', param.data, this.reloadData.bind(this))
    },
    stop(row) {
      this.updateStatus(row.data, '2');
    },
    start(row) {
      this.updateStatus(row.data, '1');
    },
    async updateStatus(param, status) {
      try {
        const p = this.$api.customQueryApi.updateStatus(param.pkId, status);
        await this.$app.blockingApp(p);
        this.reloadData();
      } catch (e) {
        this.$msg.error(e);
      }
    },
    async removeRow(param) {
      const ok = await this.$msg.ask(`确认删除所选规则?`);
      if (!ok) {
        return
      }
      try {
        const p = this.$api.customQueryApi.removeCustomerQuery(param.data.pkId);
        await this.$app.blockingApp(p);
        this.$msg.success('删除成功');
        this.reloadData();
      } catch (e) {
        this.$msg.error(e);
      }
    },
    showDrawer(mode, row, actionOk) {
      if (mode !== 'add' && !row) {
        this.$msg.warning("请选中一条记录!");
        return;
      }
      let isShow = true;
      if (mode === 'view') {
        isShow = false;
      }
      this.$drawerPage.create({
        width: 'calc(97% - 215px)',
        title: ['自定义查询规则', mode],
        component: RuleAdd,
        args: {row, mode, actionOk},
        okButtonVisible: isShow,                             // 保存按钮是否显示
        okButtonTitle: '保存',       // 保存按钮名称按需传入
        cancelButtonTitle: row.isCheck ? '反审核' : '取消', // 取消按钮名称按需传入
      });
    },
  }
}
</script>

<style scoped>

</style>
