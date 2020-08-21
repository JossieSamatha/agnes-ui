<template>
    <span class="basic-text" :style="compOption">{{compOption.contentText ? compOption.contentText:"输入文本"}}</span>
</template>

<script>
    export default {
        name: 'basic-text',
        props: ['compOption'],
    }
</script>

<style scoped>
    .basic-text {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>