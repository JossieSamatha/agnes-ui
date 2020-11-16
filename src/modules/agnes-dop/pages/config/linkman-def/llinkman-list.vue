<template>
    <gf-grid grid-no="agnes-linkman-field" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button v-if="$hasPermission('agnes.dop.linkman.add')" class="action-btn" @click="addLinkMan"
                       size="mini">添加
            </gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import linkManBaseDlg from "./linkman-base-dlg"
    export default {
        data() {
            return {
                queryArgs:{
                    'extOrgId':'',
                }
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        watch: {
            reqData:{
                handler() {
                    this.queryArgs.extOrgId = this.reqData.extOrgId;
                    this.reloadData();

                },
                deep:true
            }
        },
        methods: {
          reloadData() {
            this.$refs.grid.reloadData();
          },
          showDlg(mode, row, actionOk) {
            if (mode !== 'add' && !row) {
              this.$msg.warning("请选中一条记录!");
              return;
            }
            this.$nav.showDialog(
                linkManBaseDlg,
                {
                  args: {row, mode, actionOk},
                  width: '50%%',
                  title: this.$dialog.formatTitle('联系人信息', mode),
                }
            );
          },
          async onAddLoad() {
            this.reloadData()
          },
          addLinkMan() {
            this.showDlg('add', {"extOrgId": this.reqData.extOrgId}, this.onAddLoad.bind(this));
          },
          showLinkman(params) {
            this.showDlg('view', params.data);
          },
          editLinkMan(params) {
            this.showDlg('edit', params.data, this.onAddLoad.bind(this));
          },
          async deleteLinkMan(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认删除选中的联系人吗, 是否继续?`);
            if (!ok) {
              return
            }
            try {
              const p = this.$api.linkmanApi.deleteLinkMan(row);
              await this.$app.blockingApp(p);
              this.reloadData();
            } catch (reason) {
              this.$msg.error(reason);
            }
          },
          async approveLinkman(params) {
            const row = params.data;
            const ok = await this.$msg.ask(`确认复核所选记录吗, 是否继续?`);
            if (!ok) {
              return
            }
            try {
              const p = this.$api.linkmanApi.updateLinkmanStatus(row.linkmanId, "04");
              await this.$app.blockingApp(p);
              this.reloadData();
            } catch (reason) {
              this.$msg.error(reason);
            }
          }
        }
    }
</script>
