<template>
  <el-progress class="define-progress" v-if="params.data"
               :percentage="percentage"
               show-text
               :color="getStatusColor"
               style="width: 120px" :title="`${percentage}%`">
  </el-progress>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0,
      status: '',
      statusColor: ''
    }
  },
  beforeMount() {
    if (this.params.data) {
      this.percentage = parseInt(this.params.value * 100);
    }
  },
  methods: {
    getStatusColor() {
      if (this.percentage > 100) {
        return '#F5222E';
      } else {
        const colorSet = this.$agnesAcUtils.getStepStatusMap();
        return colorSet.get(this.params.data.stageStatus).color;
      }
    }
  }
}
</script>
