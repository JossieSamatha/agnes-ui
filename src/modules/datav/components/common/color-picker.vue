<template>
    <el-color-picker v-model="color" show-alpha :predefine="predefineColors">
    </el-color-picker>
</template>

<script>
    export default {
        name: 'color-picker',
        props: {
            color: {
                type: String,
                default: 'rgba(255, 69, 0, 0.68)'
            }
        },
        data(){
            return {
                predefineColors: [
                    '#1e90ff',
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsla(209,100%,56%,0.73)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    '#c7158577'
                ]
            }
        }
    }
</script>