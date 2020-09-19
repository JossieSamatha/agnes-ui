<template>
    <component :is="compOption.borderType" v-bind="compOption"
               :titleWidth="titleWidth"
               :color="color"
    ></component>
</template>

<script>
    export default {
        name: 'border-comp',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        computed: {
            titleWidth() {
                return parseInt(this.compOption.titleWidthStr);
            },
            color() {
                let colorArr = [];
                if (this.compOption.color1) {
                    colorArr.push(this.compOption.color1);
                }
                if (this.compOption.color2) {
                    colorArr.push(this.compOption.color2);
                }
                return colorArr;
            }
        }
    }
</script>