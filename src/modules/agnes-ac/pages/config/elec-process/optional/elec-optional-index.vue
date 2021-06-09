<template>
    <div class="monitor-pages" v-loading="loading">
        <div class="monitor-container">
            <div class="monitor-container-left">
                <complex-widget
                    :manage-tree-data="mockTreeData"
                    compTitle="产品员工信息"
                    @manageCheckNodes="manageCheckNodes"
                    :treeOptions="treeOptions"
                >
                </complex-widget>
            </div>
            <div class="elec-process monitor-container-right">
                <el-tabs class="none-border-tabs task-tabs" v-model="choosedTaskId" @tab-click="chooseTask">
                    <el-tab-pane v-for="task in proTask" :key="task.taskId" :name="task.taskId" >
                            <span slot="label">
                                <em v-if="task.taskIcon" :class="task.taskIcon"></em>
                                <em v-else class="fa fa-cogs"></em>
                                <span>{{ task.taskName }}</span>
                            </span>
                    </el-tab-pane>
                </el-tabs>
                <section class="bottom-section">
                    <div class="bottom left" id="taskContainerLeft">
                        <div class="section-title">
                            <div class="date-search">
                                <p class="section-label">业务日期：</p>
                                <el-date-picker v-model="bizDate"
                                                type="date"
                                                size="mini"
                                                align="center"
                                                :clearable="false"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期"
                                                style="width: 175px"
                                                @change="bizDateChange"
                                >
                                </el-date-picker>
                                <em class="iconfont icon-reset" title="全部刷新" @click="freshFlowData(true)"></em>
                                <div class="interval-ctrl">
                            <span v-html="svgImg.startInterval"
                                  v-show="ifIntervalStart"
                                  title="定时刷新已开启"
                                  @contextmenu.prevent="intervalListShow = true"
                                  @click="clearFreshInterval(true)"
                            ></span>
                                    <span v-html="svgImg.stopInterval"
                                          v-show="!ifIntervalStart"
                                          title="定时刷新已暂停"
                                          @contextmenu.prevent="intervalListShow = true"
                                          @click="startFreshInterval(true)"
                                    ></span>
                                    <ul class="interval-list" v-show="intervalListShow" v-clickoutside="outsideClick">
                                        <li v-for="inter in intervalList"
                                            :class="intervalMin === inter.value ? 'is-select' : ''"
                                            :key="inter.value"
                                            @click="chooseIntervalMin(inter.value)"
                                        >
                                            {{inter.label}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flow-legend" :style="{right: ifRightExpand?'0':'35px'}">
                                <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                                    <em class="fa fa-circle" :style="{color: statusColor}"></em>{{status}}
                                </span>
                            </div>
                        </div>
                        <div class="flow-container" v-dragx="dragColumn" @bindUpdate="dragColumnUpdate" ref="dragColumn"
                             :style="{height: ifGridExpand?'150px':'100%'}">
                            <div class="stage-item"
                                 v-for="stage in taskStage"
                                 :key="stage.pkId">
                                <div>
                                    <el-progress class="define-progress"
                                                 type="circle"
                                                 :percentage="getPercentage(stage.percentage)"
                                                 :color="getStatusColor(stage.stageStatus)"
                                                 :width="56"
                                                 :stroke-width="6"
                                    ></el-progress>
                                    <div class="stage-item-title" title="stage.stageName">{{stage.stageName}}</div>
                                </div>
                            </div>
                            <div class="drag-bar-line">
                                <p @click="ifGridExpand = !ifGridExpand">
                                    <em class="fa fa-caret-down"></em>
                                    <em class="fa fa-caret-up"></em>
                                </p>
                            </div>
                        </div>
                        <div v-show="ifGridExpand" class="drag-column fixed-drag-column">
                            <gf-grid ref="elecGrid" class="elec-grid elec-optional-grid"
                                     :class="isBizDate ? 'isBizDate': ''"
                                     height="100%"
                                     :options="gridOptions"
                            ></gf-grid>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    // import {taskArr} from "./data";
    // import {respData} from "./data2";
    import AcUtil from '../../../../util/common'
    import detailPage from "../../../../../agnes-dop/pages/config/op-calendar-workbench/detailPage";
    import processRenderer from "./processRenderer";

    export default {
        data() {
            return {
              svgImg: this.$svgImg,
              lcImg: this.$lcImg,
              dragColumn: {dragContainerId: "taskContainerLeft", dragDirection: 's'},
              bizDate: '',
              oneTreeData: [],
              towTreeData: [],
              prdtCodes: [],
              currentTaskObj: {},
              choosedTaskId: '',
              proTask: [],
              executePieData: [],
              pieTitle: '',
              taskStage: [],
              execLog: [],
              ifRightExpand: false,
              ifGridExpand: true,
              curStage: {},
              stageStatus: {
                '#DFE1E5': '未开始',
                '#4A8EF0': '执行中',
                    '#F5222E': '已异常/已超时',
                    '#FAAE14': '干预通过',
                    '#52C41C': '已完成'
                },
                freshInterval: null,
                ifIntervalStart: true,
                intervalMin: 1,
                intervalList: [{label: '1分钟', value: 1}, {label: '3分钟', value: 3}, {label: '5分钟', value: 5}],
                intervalListShow: false,
                execTypeChecked: ['OVERTIME', 'EXCEPTION'],
                execTypeOp: [
                    {id: 'AHEAD', label: '提前', icon: 'executing'}, {id: 'FINISHED', label: '完成', icon: 'finish'},
                    {id: 'OVERTIME', label: '超时', icon: 'outTime'}, {id: 'EXCEPTION', label: '异常', icon: 'abnormal'}
                ],
                taskIdList: [],
                loading: false,
                elecGridSelected: null,
                gridOptions: {
                    columnDefs: [],
                    rowData: [],
                    onCellClicked: this.showDetail,
                    defaultColDef: {
                        filter: true,
                        enableRowGroup: true,
                        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
                    },
                    groupUseEntireRow: true,
                    rowGroupPanelShow: "always",
                    suppressDragLeaveHidesColumns: true,
                    tooltipShowDelay: 0,
                    frameworkComponents: {
                        processRenderer,
                    },
                    groupDefaultExpanded: -1,
                    ext: {
                        pagingMode: false, //不分页
                        checkboxColumn: 0, //是否显示checkbox列,
                        enableExportLocal: true,
                        autoFitColumnMode: 1,
                    },
                },
                mockTreeData: [],
                treeOptions: [{
                    treeData: [],
                    defaultProps: {
                        showCheckbox: true
                    },
                    defaultActions: {
                        'check': this.oneTreeNodeClickTwo
                    }
                },{
                    treeData: [],
                    defaultProps: {
                        showCheckbox: true
                    },
                    defaultActions: {
                        'check': this.twoTreeNodeClickTwo

                    }
                }]
            }
        },
        beforeMount() {
            this.initTreeData();
        },
        created() {
            // 默认系统业务日期
            this.bizDate = window.bizDate;
            this.getAllFlow(this.bizDate);
            this.startFreshInterval();
        },
        beforeDestroy() {
            this.clearFreshInterval();
        },
        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (from.path === '/agnes.elec.operate') {
                    this.clearFreshInterval();
                }
                if (to.path === '/agnes.elec.operate') {
                    if (this.ifIntervalStart) {
                        this.startFreshInterval();
                    }
                }
            }
        },

        computed: {
            isBizDate() {
                return this.bizDate && this.bizDate === window.bizDate;
            }
        },
        methods: {
            async initTreeData(){
                const p = this.$api.bizMonitorApi.getTreeData("prdt");
                const resp = await this.$app.blockingApp(p);
                if(resp.data){
                    this.mockTreeData = JSON.parse(JSON.stringify(resp.data));
                    const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
                    treeOptions[0].treeData = [this.mockTreeData[0]];
                    treeOptions[1].treeData = [this.mockTreeData[1]];
                    this.treeOptions = treeOptions;
                }
            },
            // 获取所有流程数据
            async getAllFlow(bizDate) {
                const flowDataList = await this.$api.bizMonitorApi.getBizEventFlowList();
                // const flowDataList = taskArr;
                if (flowDataList.data && flowDataList.data.length > 0) {
                    this.proTask = flowDataList.data;
                    // 默认加载第一项流程数据
                    this.choosedTaskId = this.proTask[0].taskId;
                    this.currentTaskObj = this.proTask[0];
                    this.getFLowDetail(this.proTask[0].taskId, bizDate, true);
                } else {
                    this.proTask = [];
                    this.taskStage = [];
                    this.executePieData = [];
                    this.pieTitle = '';
                    this.execLog = [];
                    this.initGrid();
                }
            },
            showDetail(param){
                if(param.colDef.field.match(/prdtName|percentage|execStartTime|execEndTime/)){
                    return;
                }
                let pkId = param.colDef.field;
                let title = [];
                title.push(param.data.taskName+'-'+param.data.prdtName)
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: title,
                    okButtonVisible: false,
                    cancelButtonTitle: '返回',
                    component: detailPage,
                    args: {row: {caseId:param.data.caseId,pkId}, mode: 'view'},
                    pageEl: this.$el
                })
            },

            // 根据流程id及业务日期加载流程信息{"taskId":"","bizDate":""}、获取任务状态、获取执行情况
            async getFLowDetail(taskId, bizDate, ifLoading) {
                if (ifLoading) {
                    this.loading = true;
                }
                if(!bizDate){
                    this.taskStage = [];
                    this.executePieData = [];
                    this.pieTitle = '';
                    this.execLog = [];
                    this.loading = false;
                    this.initGrid();
                    return ;
                }
                try {
                    this.prdtCodes = [];
                    if(this.oneTreeData && this.oneTreeData.length>0){
                        this.prdtCodes = this.prdtCodes.concat(this.oneTreeData);
                    }
                    if(this.twoTreeData && this.twoTreeData.length>0){
                        this.prdtCodes = this.prdtCodes.concat(this.twoTreeData);
                    }
                    const flowDetailStr = await this.$api.bizMonitorApi.getBizEventFlowListByPrdtCode({taskId, bizDate,prdtCodes:this.prdtCodes});

                    if (flowDetailStr.data) {
                        const flowDetailParse = flowDetailStr.data;
                        if (flowDetailParse && flowDetailParse.caseStageVos.length > 0) {
                            this.taskStage = flowDetailParse.caseStageVos;
                            if (this.curStage && this.curStage.pkId) {
                                const hasStage = this.$lodash.find(flowDetailParse.caseStageVos, {pkId: this.curStage.pkId});
                                if (hasStage) {
                                    this.curStage = hasStage;
                                } else {
                                    this.curStage = flowDetailParse.caseStageVos[0];
                                }
                            } else {
                                this.curStage = flowDetailParse.caseStageVos[0];
                            }
                            this.loading = false;
                            const columns = [];
                            let firstColumn = {
                                headerName: '产品名称',
                                field: 'prdtName'
                            };
                            columns.push(firstColumn);
                            this.taskStage.forEach((stage,index)=>{
                                let column = {
                                    headerName: stage.stageName,
                                    field: stage.pkId,
                                    cellStyle: function (params) {
                                        if(params.data.stageList&&params.data.stageList[index]){
                                            const colorSet = AcUtil.getStepStatusMap();
                                            const status = params.data.stageList[index].stageStatus;
                                            const color = colorSet.get(status).color
                                            return {color: color};
                                        }else {
                                            return '#DFE1E5';
                                        }
                                    },
                                    cellClass: ['fa fa-circle', 'status-circle-cell', 'link-cell'],
                                    valueFormatter: function (params) {
                                        let item = params.data;
                                        if(item && item.stageList[index]){
                                            let info = item.stageList[index].stageFinishdStepNum+"/"+item.stageList[index].stageToatlStepNum;
                                            return info;
                                        }else {
                                            return '';
                                        }
                                    }
                                };
                                columns.push(column);
                            });
                            let percentageColumn ={
                                        headerName: "完成进度", field: "percentage", enableRowGroup: false,
                                        cellRenderer: 'processRenderer',
                                        width: '120',
                                        suppressSizeToFit: true,
                                        tooltipField: 'proportion',
                                    };
                            columns.push(percentageColumn);
                            let startTimeColumn = {
                                headerName: '开始时间',
                                field: 'execStartTime'
                            };
                            columns.push(startTimeColumn);
                            let endTimeColumn = {
                                headerName: '结束时间',
                                field: 'execEndTime'
                            };

                            columns.push(endTimeColumn);
                            if(this.gridOptions.api && columns){
                                // this.gridOptions.columnDefs = columns;
                                this.gridOptions.api.setColumnDefs(columns)
                            }
                            if(flowDetailParse.taskVos && flowDetailParse.taskVos.length>0){
                                // this.gridOptions.rowData = flowDetailParse.taskVos;
                                this.gridOptions.api.setRowData(flowDetailParse.taskVos)
                            }else {
                                this.gridOptions.api.setRowData([])
                            }
                        } else {
                            this.taskStage = [];
                            this.executePieData = [];
                            this.taskIdList = [];
                            this.loading = false;
                            this.initGrid();
                        }
                    } else {
                        this.taskStage = [];
                        this.executePieData = [];
                        this.execLog = [];
                        this.initGrid();
                        this.loading = false;
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 任务流程 -- 选择
            chooseTask() {
                const taskId = this.choosedTaskId;
                this.curStage = {};
                this.getFLowDetail(taskId, this.bizDate, true);
                this.currentTaskObj = this.$lodash.find(this.proTask, {taskId});
                this.choosedTaskId = taskId;
            },
            initGrid(){
                this.gridOptions.columnDefs = [];
                this.gridOptions.rowData = [];
                this.gridOptions.api.setRowData([])
            },

            // 任务流程 -- 指定stage -- 选择
            chooseTaskStage(stage) {
                this.curStage = stage;
                if (stage.ruCaseStepList) {
                    // this.setGridData(stage.ruCaseStepList);
                }
            },

            // 表格数据塞入
            setGridData(data) {
                this.$refs.elecGrid.setRowData(data);
            },

            // 业务日期切换
            bizDateChange(val) {
                this.getAllFlow(val);
            },

            // 展开/收起底部右侧
            foldBottomRight() {
                this.ifRightExpand = !this.ifRightExpand;
                this.$nextTick(() => {
                    if (this.ifRightExpand) {
                        this.$refs.pieChart.pieChart.resize()
                    }
                });

            },

            // 纵向拉伸宽度问题处理
            dragColumnUpdate() {
                this.$refs.dragColumn.style.width = '100%';
            },

            // 点击展开更多日志信息
            expandMore(execItem) {
                if (!execItem.expand) {
                    this.$set(execItem, 'expand', 'expand');
                } else {
                    execItem.expand = '';
                }
            },

            getPercentage(percentage) {
                return parseInt(percentage * 100);
            },

            getStatusColor(statusId) {
                const stepStatus = this.$agnesAcUtils.getStepStatusMap();
                return stepStatus.get(statusId).color;
            },
            // 执行情况类型切换
            execTypeChange(val) {
                this.getExecuteData(this.taskIdList, val);
            },

            freshFlowData(ifLoading) {
                this.getFLowDetail(this.choosedTaskId, this.bizDate, ifLoading);
            },

            getExecIcon(status) {
                const icon = this.$lodash.find(this.execTypeOp, {id: status}).icon;
                return this.lcImg[icon];
            },

            // 开启刷新定时器
            async startFreshInterval(ifAsk) {
                if (ifAsk) {
                    const ok = await this.$msg.ask('是否开启定时刷新？');
                    if (!ok) {
                        return
                    }
                    this.ifIntervalStart = true;
                }
                const intervalMin = this.intervalMin * 60 * 1000;
                this.freshInterval = setInterval(() => {
                    if (!this.loading) {
                        this.freshFlowData(true);
                    }
                }, intervalMin);
            },

            // 关闭刷新定时器
            async clearFreshInterval(ifAsk) {
                if (ifAsk) {
                    const ok = await this.$msg.ask('是否关闭定时刷新？');
                    if (!ok) {
                        return
                    }
                    this.ifIntervalStart = false;
                }
                clearInterval(this.freshInterval);
            },

            // 定时频率选择
            async chooseIntervalMin(chooseMin) {
                const ok = await this.$msg.ask(`是否切换刷新频率为${chooseMin}分钟？`);
                if (!ok) {
                    return
                }
                this.clearFreshInterval();
                this.intervalMin = chooseMin;
                if (this.ifIntervalStart) {
                    this.startFreshInterval();
                }
                this.$msg.success('刷新频率设置成功！');
            },

            outsideClick() {
                this.intervalListShow = false;
            },

            // 弹框选择数据以后，赋值给组件树
            manageCheckNodes(val){
                const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
                treeOptions[0].treeData = [val[0]];
                treeOptions[1].treeData = [val[1]];
                this.treeOptions = treeOptions;
            },

            // 首棵树点击事件
            oneTreeNodeClickTwo(nodeObj, nodeData){
                console.log(nodeData);
                this.oneTreeData=[];
                if(nodeData.checkedNodes.length>0){
                    nodeData.checkedNodes.forEach((item)=>{
                        if(item.type && item.type=='prdt'){
                            this.oneTreeData.push(item.code);
                        }
                    })
                }
                this.getFLowDetail(this.choosedTaskId, this.bizDate, true);
            },

            // 第二颗树勾选事件
            twoTreeNodeClickTwo(nodeObj, nodeData){
                console.log(nodeData);
                this.twoTreeData=[];
                if(nodeData.checkedNodes.length>0){
                    nodeData.checkedNodes.forEach((item)=>{
                        if(item.type && item.type=='prdt'){
                            this.twoTreeData.push(item.code);
                        }
                    })
                }
                this.getFLowDetail(this.choosedTaskId, this.bizDate, true);
            }
        },
    }
</script>

<style scoped>
    .elec-process.gf-tab-view .el-loading-mask {
        z-index: inherit;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .elec-process .elec-grid:not(.isBizDate) >>> .optional-cell .el-button:not(.detail-btn) {
        display: none;
    }

    .elec-process .elec-grid {
        position: relative;
    }

    .elec-process .elec-grid >>> .grid-action-panel{
        position: absolute;
        top: -4px;
        right: 0;
        z-index: 1;
    }

    .elec-process .elec-grid >>> .grid-action-panel .right .el-input {
        width: 200px!important;
    }

    .interval-ctrl {
        line-height: 22px;
        margin-left: 10px;
    }

    .elec-process > section .section-title {
        font-size: 14px;
        margin: 0;
    }

    .elec-process > section .section-title::before {
        display: none;
    }

    .none-border-tabs {
        margin-top: -15px;
        margin-bottom: 10px;
    }

    .none-border-tabs.el-tabs >>> .el-tabs__header .el-tabs__item {
        height: 35px;
        line-height: 35px;
        color: #A8AED3;
    }

    .none-border-tabs.el-tabs >>> .el-tabs__header .el-tabs__item.is-active {
        color: #0f5eff;
    }

    .none-border-tabs.el-tabs >>> .el-tabs__header .el-tabs__item>span>em {
        margin-right: 5px;
    }

    .none-border-tabs.el-tabs >>> .el-tabs__content {
        display: none;
    }

    .none-border-tabs.task-tabs.el-tabs >>> .el-tabs__header .el-tabs__nav {
        width: auto;
    }

    .none-border-tabs.task-tabs.el-tabs >>> .el-tabs__nav-next,
    .none-border-tabs.task-tabs.el-tabs >>> .el-tabs__nav-prev {
        line-height: 52px;
    }

    .elec-grid.elec-optional-grid >>> .gf-ag-grid.ag-theme-balham
    .link-cell.status-circle-cell:hover .ag-cell-value{
        color: inherit;
        text-decoration: underline;
        cursor: pointer;
    }

</style>
