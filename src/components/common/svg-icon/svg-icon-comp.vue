<template>
    <em class="svg-icon" v-html="iconHtml" :style="{width: width, height: height, fill: color}"></em>
</template>

<script>
    import svgIcon from './svg-icon-obj'
    export default {
        props: {
            name: {
                type: String,
                require: true
            },
            width: {
                type: String,
                default: 'auto'
            },
            height: {
                type: String,
                default: '18px'
            },
            color: String
        },
        computed: {
            iconHtml(){
                if(svgIcon[this.name]){
                    return svgIcon[this.name];
                }else{
                    return svgIcon.defaultMenuIcon;
                }
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        display: block;
        text-align: center;
    }

</style>

<style>
    .svg-icon>svg {
        width: auto;
        height: 100%;
        fill: inherit;
    }
</style>