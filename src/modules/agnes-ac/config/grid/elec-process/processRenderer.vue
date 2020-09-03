<template>
    <el-progress class="define-progress"
                 :percentage="percentage"
                 show-text
                 :color="getStatusColor"
                 style="width: 150px" :title="`${percentage}%`">
    </el-progress>
</template>

<script>
    export default {
        data(){
            return {
                percentage: 0,
                status: '',
                statusColor: ''
            }
        },
        beforeMount(){
            this.percentage = parseFloat(this.params.value)*100;
        },
        methods: {
            getStatusColor(){
                const colorSet = this.$agnesAcUtils.getStepStatusMap();
                return colorSet.get(this.params.data.stepStatus).color;
            }
        }
    }
</script>