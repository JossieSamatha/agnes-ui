<template>
    <el-progress v-if="params.data"
                 :percentage="percentage"
                 show-text
                 :color="getStatusColor"
                 :style="{color: params.data.stepStatus === '01' ? '#4ACE69' : '#EE924C'}"
                 style="width: 120px" :title="`${percentage}%`">
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
            if(this.params.data){
                this.percentage = parseInt(this.params.value*100) || 0;
            }
        },
        methods: {
            getStatusColor(){
                if(this.percentage > 100){
                    return '#F5222E';
                }else{
                    return this.params.data.stepStatus === '01' ? '#4ACE69' : '#EE924C';
                }
            }
        }
    }
</script>

<style scoped>
    .el-progress >>> .el-progress__text {
        font-size: 12px!important;
        color: inherit;
    }
</style>