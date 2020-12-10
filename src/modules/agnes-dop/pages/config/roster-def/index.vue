<template>
    <div>
      <el-form class="search-panel" label-width="75px">
        <div class="line">
          <el-form-item label="值班类型">
            <gf-dict-select dict-type="AGNES_ROSTER_TYPE" v-model="queryParam.rosterType"></gf-dict-select>
          </el-form-item>
          <el-form-item label="值班日期">
            <el-date-picker
                v-model="queryParam.rosterDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="">
            </el-date-picker>
          </el-form-item>
          <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
          <el-button @click="reSetSearch" class="option-btn">重置</el-button>
        </div>
      </el-form>
      <gf-grid @row-double-click="showRoster" grid-no="agnes-roster-type" ref="grid" toolbar="find,refresh,more"
               :query-args="queryParam">
        <template slot="left">
          <gf-button v-if="$hasPermission('agnes.dop.roster.add')" class="action-btn" @click="addRoster"
                     size="mini">添加
          </gf-button>
          <gf-button v-if="$hasPermission('agnes.dop.roster.import')" @click="exportExcel" class="action-btn">导出
          </gf-button>
        </template>
      </gf-grid>
    </div>
</template>

<script>
    import RosterTypeDlg from "./roster-type-dlg";
    import RosterList from "./roster-list";

    export default {
      props: {
        pageType: {
          type: Object,
          default: null
        }

      },
      data() {
        return {
          queryParam: {
            pageType: 'personal',
            rosterDate: '',
            rosterType: ''
          }
        }
      },
      mounted() {
        if (this.pageType !== null && this.pageType !== '') {
          this.queryParam.pageType = this.pageType;
        }
      },
      methods: {

        reloadData() {
          this.$refs.grid.reloadData();
        },
        reSetSearch() {
          this.queryParam = {
            'rosterDate': '',
            'rosterType': ''
          };
          this.$refs.grid.reloadData();
        },
        showDlg(mode, row, actionOk) {
          if (mode !== 'add' && !row) {
            this.$msg.warning("请选中一条记录!");
            return;
          }
          this.$nav.showDialog(
              RosterTypeDlg,
              {
                args: {row, mode, actionOk},
                width: '50%',
                title: this.$dialog.formatTitle('值班信息', mode),
              }
          );
        },
        async onAddRoster() {
          await this.reloadData();
        },

        async onEditRoster() {
          await this.reloadData();
        },

        addRoster() {
          this.showDlg('add', {}, this.onAddRoster.bind(this));
        },
        personnel(param) {
          this.showDrawer('check', param.data, this.onEditRoster.bind(this));
        },
        showDrawer(mode, row, actionOk) {
          this.$drawerPage.create({
            width: 'calc(97% - 215px)',
            title: ['值班人员', 'view'],
            component: RosterList,
            args: {row, mode, actionOk},
                    okButtonVisible: false,
                    cancelButtonTitle: '取消',
                });
            },
            showRoster(params) {
                this.showDlg('view', params.data);
            },

            editRoster(params) {
                this.showDlg('edit', params.data, this.onEditRoster.bind(this));
            },

            async deleteRoster(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中值班信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.rosterApi.deleteRoster(row.rosterId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async approveRoster(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认复核所选记录吗, 是否继续?`);
                // const ok = await this.$msg.ask(`确认复核所选日历吗, 是否继续?`);
              if (!ok) {
                return
              }
              try {
                const p = this.$api.rosterApi.updateRosterStatus(row.rosterId, "04");
                await this.$app.blockingApp(p);
                this.reloadData();
              } catch (reason) {
                this.$msg.error(reason);
              }
            },
        exportExcel() {
          const basePath = window.location.href.split("#/")[0];
          window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId=92636dd481ee4314b54686440ad5e4d0&fileName=ces.xls");
        },
      },
    }
</script>
