<template>
    <div>
        <gf-grid grid-no="agnes-acnt-linkman-choose" ref="grid" quick-text-max-width="300px">
        </gf-grid>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        name: "linkman-add-dlg",
        props: {
            mode: {
                type: String,
                default: 'add'
            },
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