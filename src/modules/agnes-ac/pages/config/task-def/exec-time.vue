<template>
    <div>
        <gf-cron ref="innerVueCron" :data="cron" @change="onSave" @close="onCancel"></gf-cron>
    </div>
</template>

<script>
    export default {
        name: "editExecTime",
        props: {
            data: {type: String},
            action: Function
        },
        data() {
            return {
                cron:this.data,
            }
        },
        mounted() {
        },
        methods: {
            async onSave (cronValue) {
                this.cron = cronValue;
                this.action(this.cron);
                this.$dialog.close(this, 'ok');
            },
            onCancel () {
                this.$dialog.close(this, 'cancel');
            }
        },
    }
</script>