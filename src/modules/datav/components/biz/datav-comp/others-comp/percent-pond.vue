<template>
    <dv-percent-pond ref="percentPond" :config="config" style="width: 100%; height: 100%"/>
</template>

<script>
    export default {
        name: 'percent-pond',
        props: {
            position: Object,
            compOption: Object
        },
        computed: {
            config(){
                return {
                    ...this.compOption,
                    value: this.compOption.value,
                    colors: [this.compOption.color1, this.compOption.color2],
                    lineDash: [this.compOption.lineWidth, this.compOption.lineGap],
                    formatter: this.compOption.formatter
                }
            }
        },
        watch: {
            position: {
                handler(){
                    this.$nextTick(()=>{
                        this.$refs.percentPond.init();
                    });
                },
                deep: true
            }
        }

    }
</script>