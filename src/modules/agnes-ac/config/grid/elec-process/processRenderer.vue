<template>
    <el-progress class="define-progress"
                 :percentage="percentage"
                 show-text
                 :color="statusColor"
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
            this.statusColor = this.$agnesAcUtils.getStepStatusMap();
        },
        methods: {
            getStatusColor(){
                return this.$lodash.find(this.stepStatus, {dictId: this.params.stepStatus});
            }
        }
    }
</script>