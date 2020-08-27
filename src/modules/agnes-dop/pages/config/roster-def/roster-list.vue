<template>
    <gf-grid grid-no="agnes-roster-list" ref="grid" quick-text-max-width="300px"
             :query-args="queryArgs" height="100%" >
    </gf-grid>
</template>

<script>

    export default {
        data() {
            return {
                queryArgs:{
                    'rosterId':this.row.rosterId,
                }
            }
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async onCancel() {
                this.$emit("onClose");
            },
        },
    }
</script>

<style scoped>

</style>
