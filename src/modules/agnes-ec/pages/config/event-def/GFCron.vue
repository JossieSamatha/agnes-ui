<template>
  <div>
    <el-input @click.native="openModal"
              placeholder="corn表达式"
              v-model="cron"
              prefix-icon="el-icon-date"
    >
    </el-input>
    <el-dialog
      :visible.sync="dialogVisible"
      title="corn表达式"
      append-to-body
      center>
      <GFCronModal ref="innerVueCron" :data="cron"></GFCronModal>
      <div style="text-align: right">
        <el-button
                size="small"
                icon="el-icon-check"
                type="primary"
          @click="ok()"
        >
          确认
        </el-button>
        <el-button
                size="small"
                icon="el-icon-close"
          @click="cancel()"
        >取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GFCronModal from './GFCronModal'
export default {
  name: 'GFCron',
  components: {
    GFCronModal
  },
  props: {
    value: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      dialogVisible: false,
      cron: this.value
    }
  },
  methods: {
    openModal () {
      this.dialogVisible = true
    },
    ok () {
      this.cron = this.$refs.innerVueCron.cron
      this.dialogVisible = false
    },
    cancel () {
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>

</style>
