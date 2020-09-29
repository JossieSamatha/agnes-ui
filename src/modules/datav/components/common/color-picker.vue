<template>
    <el-color-picker v-model="componentMeta[type]" show-alpha :predefine="predefineColors">
    </el-color-picker>
</template>

<script>
    export default {
        name: 'color-picker',
        props: {
            componentMeta: {
                type: Object,
                default(){
                    return {}
                }
            },
            type: String
        },
        data(){
            return {
                predefineColors: [
                    '#37a2da',
                    '#32c5e9',
                    '#67e0e3',
                    '#9fe6b8',
                    '#ffdb5c',
                    '#ff9f7f',
                    '#fb7293',
                    '#e062ae',
                    '#e690d1',
                    '#e7bcf3',
                    '#9d96f5',
                    '#8378ea',
                    '#96bfff'
                ]
            }
        }
    }
</script>