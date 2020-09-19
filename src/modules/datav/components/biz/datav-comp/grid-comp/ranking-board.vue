<template>
    <dv-scroll-ranking-board :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    export default {
        name: 'ranking-board',
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
                    waitTime: this.compOption.waitTimeSec*1000,
                }
                if(this.compOption.formatter === 'money'){
                    config.valueFormatter = this.mapNumType;
                }
                return config;
            }
        },
        methods: {
            mapNumType({value}){
                return this.$fmt.formateThousandthMoney(value) + this.compOption.unit;
            }
        },
    }
</script>

<style scoped>

</style>