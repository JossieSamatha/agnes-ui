<template>
    <span class="roll-text" :style="compOption">{{compOption.contentText ? compOption.contentText:"输入文本"}}</span>
</template>

<script>
    export default {
        name: 'roll-text',
        props: ['compOption'],
    }
</script>

<style scoped>
    .roll-text {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>