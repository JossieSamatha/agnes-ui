<template>
    <div style="height: 100%">
        <gf-grid ref="grid" height="calc(100% - 0px)"
                 @row-double-click="showDetail"
                :query-args="queryArgs"
                grid-no="agnes-acnt-hi-info-ta">
        </gf-grid>
    </div>
</template>

<script>

    export default {
        props: {
            mode: {
                type: String,
                default: 'view'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                queryArgs: {
                  'acntId': this.row.acntId
                }
            }
        },
        methods:{
            async onCancel() {
                try {
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    }
</script>
