<template>
    <div>
        <gf-grid ref="grid" grid-no="agnes-fun-type" @row-double-click="showModel">
            <template slot="right-before">
                <gf-button @click="addModel" size="mini">添加</gf-button>
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
                this.$nav.showDialog(
                    FunTypeDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '70%',
                        title: this.$dialog.formatTitle('函数', mode),
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

<style scoped>

</style>