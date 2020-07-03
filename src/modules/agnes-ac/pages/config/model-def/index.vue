<template>
    <div>
        <gf-grid @row-double-click="editModel" grid-no="agnes-model-type" ref="grid">
            <template slot="right-before">
                <gf-button @click="addModel" size="mini">添加</gf-button>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    import ModelTypeDlg from "./model-type-dlg";

    export default {
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
                    ModelTypeDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('模型类型', mode),
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
                const ok = await this.$msg.ask(`确认删除模型类型:[${row.typeName}]吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.modelConfigApi.deleteModel(row.modelTypeId);
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
