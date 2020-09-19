<template>
    <dv-water-level-pond ref="waterPond"
                         :config="config"
                         style="width: 100%; height: 100%">
    </dv-water-level-pond>
</template>

<script>
    export default {
        name: 'water-pond',
        props: {
            position: Object,
            compOption: Object
        },
        computed: {
            config(){
                return {
                    ...this.compOption,
                    data: [this.compOption.data],
                    formatter: this.compOption.formatter,
                    colors: [this.compOption.color1, this.compOption.color2],
                }
            }
        },
        watch: {
            position: {
                handler(){
                    this.$nextTick(()=>{
                        this.$refs.waterPond.init();
                    });
                },
                deep: true
            }
        }
    }
</script>