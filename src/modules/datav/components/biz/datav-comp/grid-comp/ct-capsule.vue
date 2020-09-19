<template>
    <dv-capsule-chart :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    export default {
        name: 'ct-capsule',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        computed: {
            configParam(){
                const config = {
                    ...this.compOption,
                }
                return config;
            }
        }
    }
</script>

<style scoped>

</style>