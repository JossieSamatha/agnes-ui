
<template>

    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="标题:">
                  <el-input v-model="queryArgs.title"></el-input>
                </el-form-item>
              <el-form-item label="KEY:">
                <el-input v-model="queryArgs.title"></el-input>
              </el-form-item>
              <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
              <el-button @click="reSetSearch" class="option-btn" type="primary">重置</el-button>
            </div>
        </el-form>

        <el-dialog  title="新增"
                    :visible="addVisible"
                    width="90%"
                    :before-close="doCloseAdd"
                    >
          <el-row style="height:400px">
          <bpmn />
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="doCloseAdd">取 消</el-button>
            <el-button type="primary" @click="doCloseAdd">确 定</el-button>
          </span>
        </el-dialog>
      <el-dialog  title="编辑"
                    :visible="editVisible"
                    width="90%"
                  :before-close="editUnVisible"
                    >
        <el-row style="height:400px">
          <bpmn/>
        </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editUnVisible">取 消</el-button>
            <el-button type="primary" @click="editUnVisible">确 定</el-button>
          </span>
        </el-dialog>
        <gf-grid  :query-args="queryArgs" grid-no="process-define" ref="grid" toolbar="find,refresh,more">
          <template slot="left">
            <el-button class="action-btn" type="primary" @click="doShowAdd()" >新增</el-button>
            <el-button class="action-btn" type="primary" @click="edit()" >编辑</el-button>
          </template>
        </gf-grid>
    </div>



</template>

<script>


    import bpmn from "./bpmn";

    export default {
      components:{bpmn},
        data() {
            return {
                queryArgs:{
                    'title':'',
                    'processDefinitionName':'',
                },
            }
        },
        beforeMount() {
        },
      watch: {
        '$route': 'edit'
      },
        methods: {
          edit(){
            let rows = this.$refs.grid.getSelectedRows();
            let row =[];
            if(rows.length>0){
              row = rows[0];
            }else{
              this.$msg.warning("请选中一条记录!");
              return;
            }
            const id=row.activityName;
            const p = this.$api.fileScan.updateFileMove(id,status);
            this.$app.blockingApp(p);
            this.$router.push({
              path:'',
              query:{
                xmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
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
                    '</bpmn:definitions>\n'}
            });
            this.reSetSearch();
            this.editVisible=true
          },

          doCloseAdd() {
            this.addVisible = false;
          },
          editUnVisible() {

            this.reSetSearch()
            this.editVisible = false;
          },
          doShowAdd() {
            this.addVisible = true;
            this.queryArgs = {
              'title':'',
              'processDefinitionName':''
            };
            this.$refs.grid.reloadData();
          },
            switchChange(){
                this.reloadData();
            },
          invokeHtmlMethod() {
            window.frames['iframeMap'].lodaTable()
          },
          reloadData() {
              this.$refs.grid.reloadData();
          },
          reSetSearch() {
              this.queryArgs = {
                  'title':'',
                  'processDefinitionName':''
              };
              this.$refs.grid.reloadData();
          },
        }
    }
</script>

<style>
    .inner-switch .el-switch__label {
        display: none;
        position: absolute;
        margin: 0;
        font-size: 12px;
        transform: scale(.8);
    }

    .inner-switch .el-switch__label.el-switch__label--right{
        left: 3px;
    }

    .inner-switch .el-switch__label.el-switch__label--left{
        right: 12px;
        z-index: 1;
    }

    .inner-switch .el-switch__label.is-active {
        display: block;
        color: #fff;
    }
    .inner-switch{
        padding-right: 10px;
    }
    .el-dialog {
      margin: 5vh auto !important;
    }
    this.el-dialog__body {
      margin-top: 0vh;
      width: 90%;
      height: 1000px;
    }

</style>
