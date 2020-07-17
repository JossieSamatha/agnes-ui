<template>
    <div>
    <gf-grid grid-no="agnes-linkman-group-field" ref="grid" quick-text-max-width="300px">
    </gf-grid>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        watch: {
            rowData(value) {
                if (this.grid) {
                    this.grid.setRowData(value);
                }
            }
        },
        methods: {
            async onSave() {
                const rows = this.$refs.grid.getSelectedRows();
                try {
                    await this.actionOk(rows, this.row);
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>

<style scoped>

</style>