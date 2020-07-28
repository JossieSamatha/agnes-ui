<template>
    <el-card class="module-card" :shadow="shadow">
        <div slot="header" class="clearfix" v-if="title!=''">
            <span>{{title}}</span>
            <slot name="headOption"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </el-card>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            shadow: {
                type: String,
                default: "hover"
            }
        }

    }
</script>