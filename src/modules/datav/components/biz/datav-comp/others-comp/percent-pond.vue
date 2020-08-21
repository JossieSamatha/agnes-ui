<template>
    <dv-percent-pond :config="config"/>
</template>

<script>
    export default {
        name: 'percent-pond',
        props: {
            config: {
                type: Object,
                default(){
                    return {
                        value: 66,
                        borderWidth: 5,
                        borderRadius: 10,
                        borderGap: 5
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>