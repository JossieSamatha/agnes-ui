<template>
    <basic-text class="roll-text" style="overflow: hidden"
                :compOption="compOption">
        <template slot="textSlot">
            <div style="white-space: nowrap;" :style="{animation: animation}">
                {{compOption.contentText ? compOption.contentText:"输入文本"}}
            </div>
        </template>
    </basic-text>
</template>

<script>
    import basicText from './basic-text'
    export default {
        name: 'roll-text',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        components: {
            'basic-text': basicText
        },
        computed:{
            animation(){
                return `${this.compOption.scrollSpeed}s linear 0s infinite normal none running ${this.compOption.scrollDir}`
            }
        }
    }
</script>

<style scoped>
    .roll-text {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>