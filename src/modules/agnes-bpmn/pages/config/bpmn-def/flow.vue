<template>
    <div style="width:100%;height:100%;padding:5px;">
        <iframe height="100%" width="100%" scrolling="auto" :src="viewSrc"></iframe>
    </div>
</template>

<script>

    export default {
        name: "",
        props: {
            mode: {
                type: String,
                default: 'viewerBpmn'
            },
            processId: String,
            actionOk: Function
        },
        data() {
            return {
                viewSrc:''
            }
        },
        beforeMount() {
            this.viewSrc = 'api/dop-bpmn/goframe/p/bpmn.viewer?instId=' + this.processId;

        },
        methods:{
            async onCancel() {
                await this.actionOk();
                this.$emit("onClose");
            },
        }
    }
</script>