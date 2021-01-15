<template>
    <div>
        <img src="./detail.png" width="100%" height="auto" style="max-width: 1080px;margin-left: -30px;">
    </div>
</template>

<script>
    export default {
        methods: {
            onCancel() {
                this.$emit("onClose");
            },

            onSave() {
                this.$emit("onClose");
            }
        },
    }
</script>