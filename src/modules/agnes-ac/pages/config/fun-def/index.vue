<template>
    <div>
        <gf-grid ref="grid" grid-no="agnes-fun-type" @row-double-click="showModel">
            <template slot="left">
                <gf-button class="action-btn" @click="addModel" v-if="$hasPermission('agnes.define.fun.add')" size="mini">添加</gf-button>
                <gf-button class="action-btn" @click="copyFun" v-if="$hasPermission('agnes.define.fun.copy')">复制</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import FunTypeDlg from "./fun-type-dlg"
    export default {
        methods:{
            reloadData() {
                this.$refs.grid.reloadData();
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let title = this.$dialog.formatTitle('函数定义', mode);
                if(mode == 'check'){
                    title = '函数定义 - 审核';
                }
                this.$nav.showDialog(
                    FunTypeDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: title,
                    }
                );
            },
        async onAddModel() {
                this.reloadData();
            },
            async onEditModel() {
                this.reloadData();
            },
            addModel() {
                this.showDlg('add', {}, this.onAddModel.bind(this));
            },
            showModel(params) {
                this.showDlg('view', params.data);
            },
            editModel(params) {
                this.showDlg('edit', params.data, this.onEditModel.bind(this));
            },
            approveModelDef(params) {
                this.showDlg('check', params.data, this.onEditModel.bind(this));
            },
            copyFun(){
                let rows = this.$refs.grid.getSelectedRows();
                let row =[];
                if(rows.length>0){
                    row = rows[0];
                }else{
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let copyRowData = this.$utils.deepClone(row);
                copyRowData.fnCode='';
                copyRowData.fnName='';
                copyRowData.fnId='';
                copyRowData.status='01';
                this.showDlg('edit', copyRowData, this.onEditModel.bind(this));
            },
            async publishModelDef(params){
                try {
                    const p = this.$api.funDefineApi.changeFunDefStatus({fnId:params.data.fnId,status:'03'});
                    await this.$app.blockingApp(p);
                    this.reloadData();
                    this.$msg.success('发布成功');
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async deleteModel(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除函数:[${row.fnName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.funDefineApi.deleteFunDef(row.fnId);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>