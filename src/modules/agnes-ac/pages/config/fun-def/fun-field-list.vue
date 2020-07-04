<template>

    <gf-grid grid-no="agnes-fun-field" ref="grid" quick-text-max-width="300px"
             @row-double-click="showField" @grid-ready="onReady">
        <template slot="right-before">
            <gf-button @click="addField">新增</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import FunFieldDlg from "./fun-field-dlg";

    export default {
        data() {
            return {}
        },
        props: {
            rowData: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            rowData(value) {
                if (this.grid) {
                    this.grid.setRowData(value);
                }
            }
        },
        methods: {
            onReady() {
                this.grid = this.$refs.grid;
                this.refreshRows();
            },
            refreshRows() {
                this.grid.setRowData(this.rowData);
            },
            showDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$nav.showDialog(
                    FunFieldDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('字段', mode),
                    }
                );
            },
            async onAddField(field) {
                this.rowData.push(field);
                this.refreshRows();
            },
            async onEditField(field, row) {
                Object.assign(row, field);
                this.refreshRows();
            },
            addField() {
                this.showDlg('add', {}, this.onAddField.bind(this));
            },
            showField(params) {
                this.showDlg('view', params.data);
            },
            editField(params) {
                this.showDlg('edit', params.data, this.onEditField.bind(this));
            },
            async deleteField(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除字段:[${row.fieldName}]吗, 是否继续?`);
                if (ok) {
                    this.$utils.removeFromArray(this.rowData, row);
                    this.refreshRows();
                }
            }
        }
    }
</script>

<style scoped>

</style>
