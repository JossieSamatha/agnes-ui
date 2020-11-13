<template>
    <div>
        <div v-html="helpHtml"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                helpHtml: ''
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            async init(){
                try {
                    const resp = await this.$api.helpDefApi.getHelpInfo();
                    if(resp.data){
                        this.helpHtml = resp.data.content;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }

            },

            onCancel() {
                this.$emit("onClose");
            },
        }
    }
</script>

<style scoped>

</style>