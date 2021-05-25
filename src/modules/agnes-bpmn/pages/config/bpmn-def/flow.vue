<template>
  <el-container height="100%">
    <el-header height="400px">
      <div style="width:100%;height:100%;padding:5px;">
        <iframe height="100%" width="100%" scrolling="auto" :src="viewSrc"></iframe>
      </div>
    </el-header>
    <el-main style="height: calc(100% - 400px)">
      <gf-grid :query-args="queryArgs" grid-no="bpmn-flow" ref="grid" toolbar="find,refresh,more"></gf-grid>
    </el-main>
  </el-container>
</template>

<script>

    export default {
        name: "",
        props: {
          mode: {
            type: String,
            default: 'viewerBpmn'
          },
          processId: String,
          procDefId: String,
          actionOk: Function
        },
        data() {
            return {
              viewSrc: '',
              queryArgs: {
                'procDefId': '',
              },
            }
        },
        beforeMount() {
          if (this.procDefId) {
            this.queryArgs.procDefId = this.procDefId;
          }
          // this.viewSrc = 'api/dop-bpmn/goframe/p/bpmn.viewer?instId=' + this.processId;

        },
        methods:{
            async onCancel() {
                await this.actionOk();
                this.$emit("onClose");
            },
        }
    }
</script>
