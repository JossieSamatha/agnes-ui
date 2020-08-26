<template>
    <div class="elec-process">
        <section class="top-section">
            <div class="flowType">
                <p class="section-label">流程类型</p>
                <gf-dict class="flow-type-select" clearable dict-type="AGNES_CASE_FLOWTYPE" size="mini" style="width: 175px;margin-right: 12px;"/>
                <el-radio-group class="task-board" v-model="currentTask" size="mini" @change="chooseTask">
                    <el-radio v-for="task in proTask" :key="task.taskId" :label="task.taskId" :title="task.taskName" border>
                        <i :class="task.icon"></i>
                        <span>{{task.taskName}}</span>
                    </el-radio>
                </el-radio-group>
            </div>
            <div class="date-search">
                <p class="section-label">业务日期</p>
                <el-date-picker v-model="bizDate"
                                type="date"
                                size="mini"
                                align="center"
                                :clearable="false"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"  style="width: 175px">
                </el-date-picker>
                <i class="el-icon-refresh" title="全部刷新"></i>
            </div>
        </section>
        <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <i class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></i>
            </span>
            <div class="bottom left" id="taskContainerLeft">
                <div class="section-title">
                    <span>流程图</span>
                    <span v-if="curTask.taskName"> -- {{curTask.taskName}}</span>
                    <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                        <span v-for="legend in legendType" :key="legend.label">
                            <i class="fa fa-circle"
                               :style="{color: legend.color}"
                            ></i>{{legend.label}}
                        </span>
                    </div>
                </div>
                <div class="flow-container" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn"
                     :style="{height: ifGridExpand?'135px':'100%'}">
                    <div class="stage-item"
                         v-for="stage in taskStage"
                         :key="stage.defId"
                         :class="curStage.defId === stage.defId ? 'active' : ''"
                         @click="chooseTaskStage(stage)">
                        <div class="stage-item-title" title="stage.defName">{{stage.defName}}</div>
                        <el-progress class="define-progress" :percentage="stage.percentage" :status="stage.status ? stage.status : null"></el-progress>
                    </div>
                    <div class="drag-bar-line">
                        <p @click="ifGridExpand = !ifGridExpand">
                            <i class="fa fa-caret-down"></i>
                            <i class="fa fa-caret-up"></i>
                        </p>
                    </div>
                </div>
                <div v-show="ifGridExpand" class="drag-column">
                    <gf-grid ref="elecGrid"
                             height="100%"
                             grid-no="agnes-elec-process-field"
                    ></gf-grid>
                </div>
            </div>
            <div class="bottom right" v-show="ifRightExpand">
                <div class="chart-container">
                    <p class="section-title">任务进度</p>
                    <pie-chart ref="pieChart" :chart-data="executePieData" :color-set="['#476DBE','#E0E0E0']"></pie-chart>
                </div>
                <div class="exec-container">
                    <p class="section-title">执行情况</p>
                    <ul class="exec-ul">
                        <li class="exec-li"
                            v-for="execItem in execLog"
                            :key="execItem.id"
                            :class="[execItem.status, execItem.expand]"
                            @dblclick="expandMore(execItem)"
                        >
                            <span v-html="lcImg[execItem.status]"></span>
                            <span>{{execItem.content}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import mockData from "../mockData";
    export default {
        data(){
            return {
                svgImg: this.$svgImg,
                lcImg: this.$lcImg,
                dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 's'},
                bizDate: '',
                currentTask: '',
                proTask: mockData().proTask,
                executePieData: [
                    {name: '完成', value: 5},
                    {name: '未完成', value: 40}
                ],
                taskStage: mockData().taskStage,
                execLog: mockData().execLog,
                ifTopExpand: true,
                ifRightExpand: true,
                ifGridExpand: true,
                curTask: {},
                curStage: {},
                legendType: [{color: '#DFE1E5', label: '未执行'},
                    {color: '#4A8EF0', label: '执行中'},
                    {color: '#FAAE14', label: '异常'},
                    {color: '#F5222E', label: '超时'},
                    {color: '#52C41C', label: '已完成'}, ]
            }
        },
        methods: {

            // 展开/收起底部右侧
            foldBottomRight(){
                this.ifRightExpand = !this.ifRightExpand;
                this.$nextTick(()=>{
                    if(this.ifRightExpand){
                        this.$refs.pieChart.pieChart.resize()
                    }
                });

            },

            // 任务流程 -- 选择
            chooseTask(val){
                const curTask =  this.$lodash.find(this.proTask, {taskId: val})
                this.curTask = curTask;
            },

            // 任务流程 -- 指定stage -- 选择
            chooseTaskStage(stage){
                this.curStage = stage;
            },

            // 纵向拉伸宽度问题处理
            dragColumnUpdate() {
                this.$refs.dragColumn.style.width = '100%';
            },

            // 点击展开更多日志信息
            expandMore(execItem) {
                if(!execItem.expand){
                    this.$set(execItem, 'expand', 'expand');
                }else{
                    execItem.expand = '';
                }
            }
        }
    }
</script>