<template>
    <gf-grid grid-no="agnes-change-data-field" ref="grid" quick-text-max-width="300px"
             height="100%">
    </gf-grid>
</template>

<script>
    export default {
        data() {
            return {
                form:{

                },
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        watch: {

        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            onCancel() {
                this.$emit("onClose");
            },
        },
    }
</script>