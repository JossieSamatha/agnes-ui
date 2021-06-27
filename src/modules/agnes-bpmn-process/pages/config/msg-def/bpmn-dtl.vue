<template>
  <div class="containers">
    <div id="canvas" class="canvas" ref="canvas"></div>
  </div>
</template>
<script>
import BpmnJS from 'bpmn-js' // 引入 bpmn-js
export default {
  data () {
  },
  mounted() {
    var viewer = new BpmnJS({
      container: '#canvas'
    })

    // var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
    // // var diagramUrl = 'http://localhost:8080/pizza-collaboration.bpmn20.xml';
    // this.$http.get(diagramUrl)
    //     .then(function(res){
          viewer.importXML(res.data, function(err){
            if (!err) {
              console.log('success!')
              viewer.get('canvas').zoom('fit-viewport')
              console.log('success...')
            } else {
              console.log('something went wrong:', err)
            }
          })
  //       })
  //       .catch(function(err){
  //         console.log(err)
  //       })
  }
}
</script>
<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
.containers{
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
}
</style>
