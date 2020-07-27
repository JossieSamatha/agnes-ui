<template>
    <div>
        <gf-grid grid-no="agnes-acnt-choose-field" ref="grid" quick-text-max-width="300px">
        </gf-grid>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        name: "acnt-choose-dlg",
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        methods: {
            async onSave() {
                const rows = this.$refs.grid.getSelectedRows();
                try {
                    await this.actionOk(rows);
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