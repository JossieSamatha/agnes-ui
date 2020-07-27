<template>
    <el-calendar v-model="calendarVal">
    </el-calendar>
</template>

<script>
    export default {
        props: {
            calendarVal: {
                type: String,
                default: new Date()
            },
        }
    }
</script>