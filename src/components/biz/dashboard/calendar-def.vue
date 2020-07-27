<template>
    <el-calendar v-model="moduleObj.calendarVal" :first-day-of-week="7">
    </el-calendar>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            }
        }
    }
</script>