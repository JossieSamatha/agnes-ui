<template>
    <div>
        <gf-grid ref="grid"
                 grid-no="agnes-dop-memo-list"
                 toolbar="find,refresh,more"
                 @row-double-click="showMemo"
                 :query-args="queryParam"
         >
            <template slot="left">
                <gf-button v-if="$hasPermission('agnes.dop.memo.add')" class="action-btn" @click="addMemo" size="mini">
                  添加
                </gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import MemoDefDlg from "./memo-def-dlg";

    export default {
      data() {
        return {
          queryParam: {
            memoDt: "",
            pageType: 'department',
          }
        }
      },
      props: {
        pageType: {
          type: String,
          default: null
        },
        memoDt: {
          type: String,
          default: null
        },
      },

      mounted() {
        if (this.memoDt !== null && this.memoDt !== null) {
          this.queryParam.memoDt = this.memoDt;
        }
        if (this.pageType !== null && this.pageType !== '') {
          this.queryParam.pageType = this.pageType;
        }
      },
      methods: {
        reloadData() {
          this.$refs.grid.reloadData(true);
        },
        showDlg(mode, row, actionOk) {
          if (mode !== 'add' && !row) {
            this.$msg.warning("请选中一条记录!");
            return;
          }
          this.$nav.showDialog(
              MemoDefDlg,
                    {
                      args: {row, mode, actionOk},
                      width: '50%',
                      closeOnClickModal: false,
                      title: this.$dialog.formatTitle('运营日历维护', mode),
                    }
                );
            },
            async onAddMemo() {
                this.reloadData();
            },
            async onEditMemo() {
                this.reloadData();
            },
            addMemo() {
                this.showDlg('add', {}, this.onAddMemo.bind(this));
            },
            showMemo(params) {
                this.showDlg('view', params.data);
            },
            editMemo(params) {
                this.showDlg('edit', params.data, this.onEditMemo.bind(this));
            },
            async deleteMemo(params) {
                const row = params.data;
                // const ok = await this.$msg.ask(`确认删除日历:[${row.memoDesc}]吗, 是否继续?`);
                const ok = await this.$msg.ask(`确认删除所选运营日历数据吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.memoApi.deleteMemo(row.memoId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async approveMemo(params) {
                const row = params.data;
                // const ok = await this.$msg.ask(`确认复核所选日历:[${row.memoDesc}]吗, 是否继续?`);
                const ok = await this.$msg.ask(`确认复核所选运营日历数据吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.memoApi.updateMemo(row.memoId,"04");
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }

        }
    }
</script>
