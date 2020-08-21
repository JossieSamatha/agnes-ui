<template>
    <dv-water-level-pond ref="waterPond" :config="config" :style="{width: compWidth+'px', height: compHeight+'px'}"/>
</template>

<script>
    export default {
        name: 'water-pond',
        props: {
            config: {
                type: Object,
                default(){
                    return {
                        data: [45],
                        shape: 'round',
                        waveHeight: 25,
                    }
                }
            },
            compOption: {
                type: Object
            }
        },
        computed: {
            compWidth(){
                return this.compOption.width;
            },

            compHeight(){
                return this.compOption.height;
            }
        },

        watch: {
            compWidth(){
                this.$refs.waterPond.init();
            },

            compHeight(){
                this.$refs.waterPond.init();
            }
        }
    }
</script>