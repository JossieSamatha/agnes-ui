<template>
    <component ref="dynamicComp" :is="compOption.dynamicType"
               :color="color"
               :title="compOption.title"
               :reverse="compOption.reverse"
               style="width: 100%;height: 100%"
    ><span :style="style">{{compOption.title ? compOption.title : ''}}</span></component>
</template>

<script>
    export default {
        name: 'dynamic-comp',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        computed: {
            color(){
                let colorArr = [];
                if(this.compOption.color1){
                    colorArr.push(this.compOption.color1);
                }
                if(this.compOption.color2){
                    colorArr.push(this.compOption.color2);
                }
                return colorArr;
            },
            style(){
                return {
                    color: this.compOption.fontColor,
                    'font-size':  this.compOption.fontSize + 'px',
                    'padding': `0 ${this.compOption.padding}px`
                }
            }
        },
        watch: {
            position: {
                handler(){
                    if(this.compOption.dynamicType === 'dv-decoration-12'){
                        this.$refs.dynamicComp.init();
                    }
                },
                deep: true
            }
        }
    }
</script>