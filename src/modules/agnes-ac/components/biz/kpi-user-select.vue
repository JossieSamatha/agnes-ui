<template>
    <div>
        <gf-grid grid-no="ares-user-select" ref="grid"></gf-grid>
        <dialog-footer  :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        props: {
            actionOk: Function
        },
        methods: {
            onSave() {
                const rows = this.$refs.grid.getSelectedRows();
                if(rows.length>1 || rows.length===0){
                    this.$msg.warning("请选择一个记录!");
                    return;
                }
                this.actionOk(rows[0]);
                this.cancel();
            },
            cancel(){
                this.$dialog.close(this.$parent);
            }
        },
        watch:{
        }
    }
</script>