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
          <gf-button v-if="$hasPermission('agnes.dop.roster.export')" @click="exportExcel" class="action-btn">导出
          </gf-button>
          <menu-config-upload v-if="$hasPermission('agnes.dop.roster.import')" :res-name=menuConfigInfo.resName
                              :if-pk-id="menuConfigInfo.inputParam">
          </menu-config-upload>
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
        },
        rosterType: {
          type: String,
          default: null
        },

      },
      data() {
        return {
          queryParam: {
            pageType: 'department',
            rosterDate: '',
            rosterType: ''
          },
          menuConfigInfo: {
            resName:'',
            inputParam:'',},
        }
      },
      mounted() {
        if (this.pageType !== null && this.pageType !== '') {
          this.queryParam.pageType = this.pageType;
        }
        if (this.rosterType !== null && this.rosterType !== '') {
          this.queryParam.rosterType = this.rosterType;
        }
        this.initData();
      },
      methods: {
        async initData() {
          let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl': this.$app.nav.tabBar.currentTabKey});
          if (resp1.data) {
            this.menuConfigInfo = resp1.data;
          }
        },

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
            pageEl: this.$el
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
        async exportExcel() {
          if(this.menuConfigInfo == undefined || this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined){
            this.$msg.error('请完善导出相关配置！');
            return ;
          }
          let pkIds = '';
          let rows = this.$refs.grid.getSelectedRows();
          if(rows.length == 0){
            rows = this.$refs.grid.getRowData();
          }
          rows.forEach((item)=>{
            pkIds = pkIds + item.rosterId +",";
          });
          pkIds = pkIds.substring(0, pkIds.lastIndexOf(","));
          let pkId = this.menuConfigInfo.outputParam;
          let fileName = this.menuConfigInfo.resName;
          const basePath = window.location.href.split("#/")[0];
          window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId="+pkId+"&fileName="+fileName+"&pkIds="+pkIds);
        },
      },
    }
</script>
