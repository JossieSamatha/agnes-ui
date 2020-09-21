<template>
  <div class="optional-cell" v-if="params.data">
    <el-popover ref="popover"
                placement="top-start"
                title="备注"
                width="300"
                trigger="manual"
                v-model="popoverVisible"
    >
      <el-input type="textarea" :rows="1" placeholder="请输入备注内容"
                v-model="remark">
      </el-input>
      <div style="text-align: right; margin-top: 10px">
        <el-button class="op-btn" size="mini" type="text" @click="popoverVisible = false">取消</el-button>
        <el-button class="op-btn primary" size="mini" @click="confirmRemark">保存</el-button>
      </div>
    </el-popover>
    <el-button size="mini" type="text"
               v-popover:popover v-if="actionShow"
               @click="popoverClick('actionConfirm')"
               title="手工确认"
               :disabled="isDisabled"
    >
      <span class="svgSpan" v-html="svgImg.actionConfirm"></span>
    </el-button>
    <el-button size="mini" type="text"
               v-popover:popover
               v-if="indexSetShow"
               @click="popoverClick('forcePass')"
               title="强制通过"
               :disabled="isPopoverDisabled"
    >
      <span class="svgSpan" v-html="svgImg.forcePass"></span>
    </el-button>
    <el-button size="mini" type="text"
               v-if="indexSetShow"
               @click="reExecute('reExecute')"
               title="重新执行"
               :disabled="isDisabled"
    >
      <span class="svgSpan" v-html="svgImg.reExecute"></span>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remark: '',
      popoverVisible: false,
      actionType: '',
      svgImg: this.$lcImg,
    }
  },
  beforeMount() {
    if (this.params.data) {
      this.remark = this.params.data.remark;
    }
  },
  computed: {
    actionShow() {
      return this.params.data.stepActType === '6';
    },
    indexSetShow() {
      return this.params.data.stepActType === '1';
    },
    isDisabled() {
      const kpi = this.params.data.stepActType === '1';
      const artificial = this.params.data.stepActType === '6';
      const stepStatus = this.params.data.stepStatus;
      if (kpi && (stepStatus === '03' || stepStatus === '04')) {
        return false;
      } else if (artificial && (stepStatus === '02' || stepStatus === '03' || stepStatus === '04')) {
        return false;
      } else {
        return true;
      }
    },

    isPopoverDisabled() {
      const kpi = this.params.data.stepActType === '1';
      const artificial = this.params.data.stepActType === '6';
      const stepStatus = this.params.data.stepStatus;
      if (this.params.data.allowManualConfirm === '1') {
        return false;
      } else if (kpi && (stepStatus === '03' || stepStatus === '04')) {
        return false;
      } else if (artificial && (stepStatus === '02' || stepStatus === '03' || stepStatus === '04')) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    popoverClick(actionType) {
      this.remark = this.params.data.remark;
      this.popoverVisible = true;
      this.actionType = actionType;
    },

    async reExecute(actionType) {
      this.actionType = actionType;
      const ok = await this.$msg.ask(`是否确认重新执行`);
      if (ok) {
        this.handleCmd(this.actionType);
      }
    },

    // 备注确定 -- 保存
    confirmRemark() {
      this.popoverVisible = false;
      this.params.data.remark = this.remark;
      this.params.api.refreshCells(this.params.node)
      this.handleCmd(this.actionType);
    },

    handleCmd(actionType) {
      this.params.api.execCmd(actionType, this.params);
    }
  }
}
</script>


<style scoped>
.optional-cell {
  line-height: 1;
}

.optional-cell .svgSpan {
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.optional-cell .svgSpan >>> svg {
  width: 100%;
  height: 100%;
}

.optional-cell > span + span {
  margin-left: 10px;
}

.optional-cell .svgSpan > svg {
  width: 100%;
  height: 100%;
}

.op-btn {
  height: 25px;
  padding: 5px 19px;
  border-color: #E1E4E8;
  color: #333;
  background: transparent;
  font-size: 14px;
}

.op-btn.primary {
  color: #fff;
  background: #476DBE;
  border-color: #476DBE;
}
</style>
