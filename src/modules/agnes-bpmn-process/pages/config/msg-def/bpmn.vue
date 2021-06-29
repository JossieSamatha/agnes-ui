<template>
  <div class="containers" ref="content">
    <div style="height: 350px">
    <div class="canvas" ref="canvas"></div>
    </div>
    <div id="js-properties-panel" class="panel"></div>

    <div style="max-height: 10%">
    <el-button-group>
    <el-button @click="downloadBpmn">
      <el-icon type="download"/>
      DownLoadBPMN
    </el-button>
    <el-button @click="downloadSvg">
      <a-icon type="download"/>
      DownLoadSVG
    </el-button>
    </el-button-group>
    <el-button-group>
    <el-upload
        :file-list="uploadBpmnFileList"
        :before-upload="beforeUpload"
    >
      <el-button>
        <el-icon type="upload"/>
        导入BPMN
      </el-button>
    </el-upload>
    </el-button-group>
    <el-button-group>
      <el-button @click="handlerUndo">撤销</el-button>
      <el-button @click="handlerRedo">恢复</el-button>
    </el-button-group>
    <el-button-group>
      <el-button @click="handlerSaveBpmn">保存Bpmn</el-button>
      <el-button @click="handlerSaveSvg">保存Svg</el-button>
      <el-button @click="handlerPublish">发布</el-button>
    </el-button-group>

    <el-button-group>
      <el-button @click="handlerZoom(0.1)">放大</el-button>
      <el-button @click="handlerZoom(-0.1)">缩小</el-button>
      <el-button @click="handlerZoom(0)">还原</el-button>
    </el-button-group>

    <a hidden ref="downloadLink"></a>
    </div>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
// import bpmnModdleDescriptor from 'bpmn-moddle/resources/bpmn/json/bpmn.json';

// // BPMN国际化
// import customTranslate from './customTranslate/translationsGerman';

// 自定义汉化模块
// var customTranslateModule = {
//   translate: ['value', customTranslate]
// };

export default {
  data () {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      // uploadBpmnFileList: [],
      // scale: 1,
      order:{
        bpmnXml:''
      }
    }
  },
  methods: {
    createNewDiagram () {
      const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '  <bpmn:process id="Process_1" isExecutable="false">\n' +
          '    <bpmn:startEvent id="StartEvent_1" name="begin&#10;">\n' +
          '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <bpmn:task id="Task_0ho18x0" name="hello&#10;">\n' +
          '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
          '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
          '    </bpmn:task>\n' +
          '    <bpmn:task id="Task_1ymuvem" name="world">\n' +
          '      <bpmn:incoming>SequenceFlow_00ho26x</bpmn:incoming>\n' +
          '      <bpmn:outgoing>SequenceFlow_18df8vb</bpmn:outgoing>\n' +
          '    </bpmn:task>\n' +
          '    <bpmn:endEvent id="EndEvent_1c0ed2n" name="end">\n' +
          '      <bpmn:incoming>SequenceFlow_18df8vb</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" sourceRef="StartEvent_1" targetRef="Task_0ho18x0" />\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_00ho26x" sourceRef="Task_0ho18x0" targetRef="Task_1ymuvem" />\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_18df8vb" sourceRef="Task_1ymuvem" targetRef="EndEvent_1c0ed2n" />\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
          '        <bpmndi:BPMNLabel>\n' +
          '          <dc:Bounds x="178" y="145" width="27" height="27" />\n' +
          '        </bpmndi:BPMNLabel>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Task_0ho18x0_di" bpmnElement="Task_0ho18x0">\n' +
          '        <dc:Bounds x="485" y="244" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Task_1ymuvem_di" bpmnElement="Task_1ymuvem">\n' +
          '        <dc:Bounds x="712" y="391" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="EndEvent_1c0ed2n_di" bpmnElement="EndEvent_1c0ed2n">\n' +
          '        <dc:Bounds x="1056" y="568" width="36" height="36" />\n' +
          '        <bpmndi:BPMNLabel>\n' +
          '          <dc:Bounds x="1065" y="611" width="19" height="14" />\n' +
          '        </bpmndi:BPMNLabel>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="347" y="120" />\n' +
          '        <di:waypoint x="347" y="284" />\n' +
          '        <di:waypoint x="485" y="284" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_00ho26x_di" bpmnElement="SequenceFlow_00ho26x">\n' +
          '        <di:waypoint x="585" y="284" />\n' +
          '        <di:waypoint x="649" y="284" />\n' +
          '        <di:waypoint x="649" y="431" />\n' +
          '        <di:waypoint x="712" y="431" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_18df8vb_di" bpmnElement="SequenceFlow_18df8vb">\n' +
          '        <di:waypoint x="812" y="431" />\n' +
          '        <di:waypoint x="934" y="431" />\n' +
          '        <di:waypoint x="934" y="586" />\n' +
          '        <di:waypoint x="1056" y="586" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>\n'
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
        if (err) {
          console.error(err)
        } else {
          // 这里还没用到这个，先注释掉吧
          // that.success()
        }
      })
    },


    handlerRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    handlerUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    handlerSaveBpmn() {
      try{
        this.bpmnModeler.saveXML({format: true}, (err, xml) => {

          if (!err) {
            this.order.bpmnXml=xml
            const p = this.$api.BpmnProcessApi.handlerSaveBpmn(this.order)
            this.$app.blockingApp(p);
            this.$msg.success("任务提交成功!");
            this.reloadData();
          }
        })
      }catch (e) {
        this.$msg.error(e);
      }

    },
    handlerSaveSvg() {
      try {
        // 从建模器画布中提取svg图形标签
        let context = "";
        const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
        for (let item of djsGroupAll) {
          context += item.innerHTML;
        }
        // 获取svg的基本数据，长宽高
        const viewport = this.$refs.canvas
            .querySelector(".viewport")
            .getBBox();

        // 将标签和数据拼接成一个完整正常的svg图形
        const svg = `
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="${viewport.width}"
                            height="${viewport.height}"
                            viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
                            version="1.1"
                            >
                            ${context}
                          </svg>
                        `;
            const p = this.$api.BpmnApi.commitTask(svg)
            this.$app.blockingApp(p);
            this.$msg.success("任务提交成功!");
            this.reloadData();
      } catch (e) {
        this.$msg.error(e);
      }

    },
    handlerPublish() {
      this.bpmnModeler.get("commandStack").undo();
    },
    handlerZoom(radio) {
      const newScale = !radio ? 1.0 : this.scale + radio;
      this.bpmnModeler.get("canvas").zoom(newScale);
      this.scale = newScale;
    },

    beforeUpload(file) {
      // this.uploadBpmnFileList = [];
      this.openBpmn(file);
      return false;
    },


    openBpmn(file) {
      const reader = new FileReader();
      // 读取File对象中的文本信息，编码格式为UTF-8
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        // 读取完毕后将文本信息导入到Bpmn建模器
        this.createNewDiagram(reader.result);
      };
      return false;
    },

    downloadBpmn() {
      this.bpmnModeler.saveXML({format: true}, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.bpmn`;
          // 将文件名以及数据交给下载方法
          this.download({name: name, data: xml});
        }
      });
    },

    downloadSvg() {
      this.bpmnModeler.saveXML({format: true}, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.svg`;

          // 从建模器画布中提取svg图形标签
          let context = "";
          const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
          for (let item of djsGroupAll) {
            context += item.innerHTML;
          }
          // 获取svg的基本数据，长宽高
          const viewport = this.$refs.canvas
              .querySelector(".viewport")
              .getBBox();

          // 将标签和数据拼接成一个完整正常的svg图形
          const svg = `
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="${viewport.width}"
                          height="${viewport.height}"
                          viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
                          version="1.1"
                          >
                          ${context}
                        </svg>
                      `;
          // 将文件名以及数据交给下载方法
          this.download({name: name, data: svg});
        }
      });
    },

    download({name = "diagram.bpmn", data}) {
      // 这里就获取到了之前设置的隐藏链接
      const downloadLink = this.$refs.downloadLink;
      // 把输就转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);

      if (data) {
        // 将数据给到链接
        downloadLink.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        // 设置文件名
        downloadLink.download = name;
        // 触发点击事件开始下载
        downloadLink.click();
      }
    },

    getFilename(xml) {
      let start = xml.indexOf("process");
      let filename = xml.substr(start, xml.indexOf(">"));
      filename = filename.substr(filename.indexOf("id") + 4);
      filename = filename.substr(0, filename.indexOf('"'));
      return filename;
    },

  },

  mounted () {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule,
        // // 国际化
        // customTranslateModule
      ],
      // moddleExtensions: {
      //   camunda: bpmnModdleDescriptor
      // }
    })
    this.createNewDiagram(this.bpmnModeler)
  }
}
</script>

<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
/*右边工具栏样式*/
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
.containers{
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 1000px;
}
.canvas{
  width: 100%;
  height: 100%;
}
.panel{
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
