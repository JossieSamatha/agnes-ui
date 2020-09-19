<template>
    <dv-scroll-board ref="scrollBoard" :config="configParam"/>
</template>

<script>
    export default {
        name: 'scroll-board',
        props: {
            position: Object,
            compOption: {
                type: Object,
            }
        },
        computed: {
            configParam(){
                const config = {
                    ...this.compOption,
                    data: JSON.parse(this.compOption.dataStr),
                    waitTime: this.compOption.waitTimeSec*1000
                };
                if(this.compOption.index){
                    config.columnWidth = [this.compOption.indexWidth];
                }
                return config;
            }
        },
        watch: {
            configParam(){
                this.$refs.scrollBoard
            }
        }

    }
</script>