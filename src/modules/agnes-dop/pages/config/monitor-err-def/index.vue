<template>
    <div>
        <gf-grid @row-double-click="showErr" grid-no="agnes-monitor-err-type" ref="grid" toolbar="find,refresh,more">
            <template slot="left">
                <gf-button class="action-btn" @click="transferErr" size="mini">调入风险事项</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import MonitorErrType from "./monitor-err-type";
    import MonitorErrList from "./monitor-err-list";
    import loadsh from 'lodash';
    export default {
        methods: {

            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row,ui, actionOk,type) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                if (type==='transfer'){
                    this.$nav.showDialog(
                        MonitorErrList,
                        {
                            args: {row, mode, actionOk},
                            width: '50%',
                            title: this.$dialog.formatTitle('调入风险', mode),
                        }
                    );
               }else {
                    let title = this.$dialog.formatTitle("处理异常",mode);
                    if(mode == 'check'){
                        title = '审核';
                    }
                    this.$nav.showDialog(
                        MonitorErrType,
                        {
                            args: {row, mode, actionOk,ui},
                            width: '50%',
                            title: title,

                        }
                    );
                }
            },
            async onAddErr() {
                await this.reloadData();
            },
            showErr(params) {
                this.showDlg('view', params.data);
            },
            editErr(params) {
                this.showDlg('edit', params.data, "1", this.onAddErr.bind(this));
            },
            approveErr(params){
                this.showDlg('check', params.data, "2", this.onAddErr.bind(this));
            },
            transferErr(){
                let t = this.$refs.grid.getSelectedRows();
                if(loadsh.isEmpty(t)){
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                if (t[0].isRisk.match(/0/) && t[0].status.match(/04/)){
                    this.showDlg('edit',t[0],null,this.onAddErr.bind(this),'transfer');
                }else {
                    this.$msg.warning("该状态无法调入!");
                    return;
                }
            },

            async deleteErr(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除选中异常信息?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.monitorErrApi.deleteErr(row.pkId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
    }
</script>
