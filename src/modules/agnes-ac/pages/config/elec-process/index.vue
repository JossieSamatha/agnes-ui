<template>
    <div class="elec-process">
        <section class="top-section" :style="{height: ifTopExpand?'70px':'300px'}">
            <div class="top left fixed">
                <p class="section-title">任务类型</p>
                <gf-dict clearable dict-type="AGNES_CASE_FLOWTYPE" size="mini" style="width: 200px"/>
            </div>
            <div class="top left">
                <p class="section-title">任务流程</p>
                <div class="task-board">
                    <el-radio-group v-model="currentTask" size="mini" @change="chooseTask">
                        <el-radio v-for="task in proTask" :key="task.taskId" :label="task.taskId" :title="task.taskName" border>{{task.taskName}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="top right">
                <p class="section-title">业务日期：</p>
                <p class="expand-more" @click="expandTop">
                    <span v-show="ifTopExpand">展开更多</span>
                    <span v-show="!ifTopExpand">收起面板</span>
                </p>
                <el-date-picker v-model="bizDate"
                        type="date"
                        size="mini"
                        align="center"
                        :clearable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
                <i class="el-icon-refresh" title="全部刷新"></i>
            </div>
        </section>
        <section class="bottom-section">
            <span class="rightExpandBtn" @click="foldBottomRight">
                <i class="menuicon" v-html="ifRightExpand?svgImg.refoldIcon:svgImg.foldIcon"></i>
            </span>
            <div class="bottom left" id="taskContainerLeft">
                <p class="section-title">
                    <span>流程图</span>
                    <span v-if="curTask.taskName"> -- {{curTask.taskName}}</span>
                </p>
                <div class="flow-container">
                    <div class="stage-item"
                         v-for="stage in taskStage"
                         :key="stage.defId"
                         :class="curStage.defId === stage.defId ? 'active' : ''"
                         @click="chooseTaskStage(stage)">
                        <div class="stage-item-title" title="stage.defName">{{stage.defName}}</div>
                        <el-progress class="define-progress" :percentage="stage.percentage" :status="stage.status ? stage.status : null"></el-progress>
                    </div>
                </div>
                <div v-show="!ifGridExpand" class="drag-bar-line">
                    <p @click="ifGridExpand = !ifGridExpand">
                        <i class="fa fa-caret-down"></i>
                        <i class="fa fa-caret-up"></i>
                    </p>
                </div>
                <div v-show="ifGridExpand" class="drag-column" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn">
                    <div v-show="ifGridExpand" class="drag-bar-line">
                        <p @click="ifGridExpand = !ifGridExpand">
                            <i class="fa fa-caret-down"></i>
                            <i class="fa fa-caret-up"></i>
                        </p>
                    </div>
                    <gf-grid ref="grid"
                             height="calc(100% - 21px)"
                             grid-no="agnes-elec-process-field"
                    ></gf-grid>
                </div>
            </div>
            <div class="bottom right" v-show="ifRightExpand">
                <div class="chart-container">
                    <p class="section-title">任务进度</p>
                    <pie-chart :chart-data="executePieData" :color-set="['#476DBE','#E0E0E0']"></pie-chart>
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
                            <i class="fa fa-circle"></i>
                            <span>{{execItem.content}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import mockData from "./mockData";
    export default {
        data(){
            return {
                svgImg: this.$svgImg,
                dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 'n'},
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
                curStage: {}
            }
        },
        methods: {
            // 展开/收起顶部栏面板
            expandTop(){
                this.ifTopExpand = !this.ifTopExpand;
            },

            // 展开/收起底部右侧
            foldBottomRight(){
                this.ifRightExpand = !this.ifRightExpand
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