<template>
    <el-progress class="define-progress" :percentage="percentage" show-text :status="status" style="width: 150px" :title="`${percentage}%`">
    </el-progress>
</template>

<script>
    export default {
        data(){
            return {
                percentage: 0,
                status: '',
            }
        },
        beforeMount(){
            this.percentage = parseInt(this.params.value);
            const statusDict = {
                finish: 'success',
                abnormal: 'warning',
                outTime: 'exception'
            }
            this.status = statusDict[this.params.data.statusId] || null;
        }
    }
</script>