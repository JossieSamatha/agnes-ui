<template>
    <component :is="compOption.borderType" v-bind="compOption" :titleWidth="titleWidth"></component>
</template>

<script>
    export default {
        name: 'border-comp',
        props: {
            compOption: {
                type: Object
            }
        },
        computed: {
            titleWidth(){
                return parseInt(this.compOption.titleWidthStr);
            }
        }
    }
</script>