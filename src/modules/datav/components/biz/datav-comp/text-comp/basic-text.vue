<template>
    <span class="basic-text" :style="textStyle">
        <slot name="textSlot"></slot>
        <span v-if="!compOption.slot">{{compOption.contentText ? compOption.contentText:"输入文本"}}</span>
    </span>
</template>

<script>
    export default {
        name: 'basic-text',
        props: ['compOption'],
        computed: {
            textStyle(){
                const needPx = ['border-width','border-radius', 'font-size', 'padding-top', 'padding-left', 'padding-bottom', 'padding-right'];
                let needPxObj = {};
                needPx.forEach((item)=>{
                    needPxObj[item] = this.compOption[item] + 'px';
                });
                const bold = this.compOption['font-style'].includes('bold');
                const italic = this.compOption['font-style'].includes('italic');
                const underline = this.compOption['font-style'].includes('underline');
                const style = {
                    ...this.compOption,
                    ...needPxObj,
                    'font-weight': bold ? 'bold' : 'normal',
                    'font-style': italic ? 'italic' : 'normal',
                    'text-decoration': underline ? 'underline' : 'none',
                    'text-shadow': `${this.compOption.shadowColor} ${this.compOption.shadowOffsetX}px ${this.compOption.shadowOffsetY}px ${this.compOption.shadowBlur}px`,
                    'box-shadow': `${this.compOption.bgShadowColor} ${this.compOption.bgShadowOffsetX}px ${this.compOption.bgShadowOffsetY}px ${this.compOption.bgShadowBlur}px ${this.compOption.bgShadowDir}`
                }
                return style;
            }
        }
    }
</script>

<style scoped>
    .basic-text {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>