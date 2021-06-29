<template>
  <div class="containers">
    <div id="canvas" class="canvas" ref="canvas"></div>
  </div>
</template>
<script>
import BpmnJS from 'bpmn-js' // 引入 bpmn-js
export default {
  data () {
    return{
      data:{

      },
      xml:''
    }

  },
  created(){

  },
  watch: {
    '$route':
     'openBpmn'
  },
  methods:{
    getParams(){
      // 取到路由带过来的参数
      const routerParams = this.$route.params.xmlDtl
      // const routerBpmnParams = this.$route.query.bpmnData
      // 将数据放在当前组件的数据内
      this.xml = routerParams;
      alert(this.$route.query.xmlDtl)
    },
    openBpmn(){
      var viewer = new BpmnJS({
        container: '#canvas'
      })
      viewer.importXML(this.$route.query.xmlDtl, function(err){
        if (!err) {
          console.log('success!')
          viewer.get('canvas').zoom('fit-viewport')
          console.log('success...')
        } else {
          console.log('something went wrong:', err)
        }
        // 获取到属性ref为“canvas”的dom节点
        const canvas = this.$refs.canvas
        // zoom to fit full viewport
        canvas.zoom('fit-viewport');
        var i=0;
        //已执行
        var hisActivities = '';//data.hisActivities;
        if(hisActivities && hisActivities.length>0){
          for(i=0;i<hisActivities.length;i++){
            canvas.addMarker(hisActivities[i], 'hasdo-task');
          }
        }

        //待执行
        var currentActivities ='';// data.currentActivities;
        if(currentActivities && currentActivities.length>0){
          for(i=0;i<currentActivities.length;i++) {
            canvas.addMarker(currentActivities[i], 'todo-task');
          }
        }

        //连接线
        var sequenceFlows ='';// data.sequenceFlows;
        if(sequenceFlows && sequenceFlows.length>0){
          for(i=0;i<sequenceFlows.length;i++){
            this.$refs('g[data-element-id="' + sequenceFlows[i] + '"] path').style.stroke='red';
          }
        }

        //callActivity
        // var subProcessActivities ='';// data.subProcessActivities;
        // if(subProcessActivities && subProcessActivities.length>0){
        //   for(i=0;i<subProcessActivities.length;i++){
        //     this.$('g[data-element-id="' + subProcessActivities[i] + '"] .djs-visual').click(function(){
        //       var callActivity = this.$(this).parent('g').attr('data-element-id');
        //       window.open({
        //         url:'${basePath}/goframe/func/bpmn.subProcess_list?processInstId=${instId}&callActivity=' + callActivity,
        //         title : '子流程列表',
        //         width : 465,
        //         height : 375,
        //         onload:function(){
        //
        //         },
        //
        //       });
        //     });
        //   }
        // }

      })
    }
  },
  mounted() {

  }
}
</script>
<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;

  .canvas{
    width: 100%;
    height: 100%;
  }
  .bjs-powered-by {
    display: none;
  }
  .diagram-note {
    background-color: rgba(66, 180, 21, 0.7);
    color: White;
    border-radius: 5px;
    font-family: Arial;
    font-size: 12px;
    padding: 5px;
    min-height: 16px;
    width: 50px;
    text-align: center;
  }

  .needs-discussion:not(.djs-connection) .djs-visual > :nth-child(1) {
    stroke: rgba(66, 180, 21, 0.7) !important; /* color elements as red */
  }

  .highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: green !important; /* color elements as green */
  }

  .todo-task:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: rgba(255, 178, 96, 0.2) !important;
    stroke: rgba(255, 178, 96, 1) !important;
  }
  .hasdo-task:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: rgba(0, 140, 122, 0.2) !important;
    stroke: rgba(0, 140, 122, 1) !important;
  }

  .hasdo-line:not(.djs-shape) .djs-visual > :nth-child(1) {
    stroke: rgba(0, 140, 122, 0.7) !important;
  }
}
</style>
