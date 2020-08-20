<template>
    <component :is="compOption.dynamicType"  v-bind="compOption">{{compOption.title ? compOption.title : ''}}</component>
</template>

<script>
    export default {
        name: 'dynamic-comp',
        props: {
            compOption: {
                type: Object,
                default: function () {
                    return 'dv-decoration-3'
                }
            },
        },
    }
</script>