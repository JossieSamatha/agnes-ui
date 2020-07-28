<template>
    <gf-grid grid-no="agnes-linkman-group" ref="grid" quick-text-max-width="300px"
             @grid-ready="onReady">
        <template slot="left">
            <gf-button class="action-btn" @click="addField" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import GroupFieldDLg from "./linkman-group-list-dlg"

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
            },
            extOrgId: {
                type: String
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
                    GroupFieldDLg,
                    {
                        args: {row, mode, actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle('联系人分组', mode),
                    }
                );
            },
            async onAddField(rows) {
                rows.forEach(row => {
                    this.rowData.push(row);
                })
                this.refreshRows();
            },
            async onEditField(field, row) {
                Object.assign(row, field);
                this.refreshRows();
            },
            addField() {
                this.showDlg('add', {"extOrgId": this.extOrgId}, this.onAddField.bind(this));
            },
            showField(params) {
                this.showDlg('view', params.data);
            },
            editField(params) {
                this.showDlg('edit', params.data, this.onEditField.bind(this));
            },
            async deleteField(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认删除联系人:[${row.linkmanName}]吗, 是否继续?`);
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