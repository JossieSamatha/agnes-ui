<template>
    <div class="monitor-pages product-monitor">
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
            <div class="monitor-container-right pagescroll">
                <section class="module-container">
                    <p class="module-title">产品详情</p>
                    <el-form label-width="50%" class="infoForm" size="mini" :disabled="true">
                        <div class="line">
                            <el-form-item label="产品名称" prop="proName">
                                <span>{{prdtData.productName}}</span>
                            </el-form-item>
                            <el-form-item label="产品简称" prop="proNo">
                                <span>{{prdtData.productShortName}}</span>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="产品代码" prop="proNo">
                                <span>{{prdtData.productCode}}</span>
                            </el-form-item>
                            <el-form-item label="产品种类" prop="proType">
                                <gf-dict filterable clearable v-model="prdtData.productClass" dict-type="AGNES_PRODUCT_CLASS"/>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="产品类型" prop="proScale">
                                <gf-dict filterable clearable v-model="prdtData.productType" dict-type="AGNES_PRODUCT_TYPE"/>
                            </el-form-item>
                            <el-form-item label="产品阶段" prop="proScale">
                                <gf-dict filterable clearable v-model="prdtData.productStage" dict-type="AGNES_PRODUCT_STAGE"/>
                            </el-form-item>
                        </div>
                        <template v-if="productDetailShow">
                            <div class="line">
                                <el-form-item label="成立日期" prop="foundDate">
                                    <span>{{prdtData.startDate}}</span>
                                </el-form-item>
                                <el-form-item label="预计结束日期" prop="preEndDate">
                                    <span>{{prdtData.dueDate}}</span>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="关账日期" prop="closeDate">
                                    <el-date-picker
                                            v-model="prdtData.closeDate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="清算日期" prop="settlementDate">
                                    <el-date-picker
                                            v-model="prdtData.settlementDate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="托管费率" prop="trustRate">
                                    <span>{{prdtData.trustRate}}</span>
                                </el-form-item>
                                <el-form-item label="浮动管理费" prop="floatingManagementFee">
                                    <span>{{prdtData.floatingManagementFee}}</span>
                                </el-form-item>
                            </div>
                        </template>
                    </el-form>
                    <p class="fold-arrow" @click="productDetailShow = !productDetailShow">
                        <em class="iconfont icon-double-arrow-down" v-if="!productDetailShow"></em>
                        <em class="iconfont icon-double-arrow-up" v-else></em>
                    </p>
                </section>
                <section class="module-container">
                    <p class="module-title">产品任务</p>
                    <el-tabs class="none-border-tabs task-tabs" v-model="tabIndex">
                            <el-tab-pane v-for="item in proTaskArr" :key="item.key" :name="item.key" >
                                <span slot="label">
                                    <el-badge :value="item.num" :hidden="!item.num">
                                        <span>{{item.label}}</span>
                                    </el-badge>
                                </span>
                                <div class="elec-process">
                                    <section class="section">
                                        <div class="section-title">
                                            <span>业务事件流程</span>
                                            <div class="flow-legend">
                                                <span v-for="(status, statusColor) in stageStatus" :key="statusColor">
                                                    <em class="fa fa-circle" :style="{color: statusColor}"></em>{{status}}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="card-container new-style" :style="{'max-height': foldContainer ? '370px' : 'auto'}">
                                            <div class="card-item" v-for="bizItem in item.taskData" :key="bizItem.taskId">
                                                <div class="card-left">
                                                    <p class="title">
                                                        <span>{{bizItem.prdtName}}</span>
                                                        <span class="time">{{subStrTime(bizItem.execStartTime)}}-{{subStrTime(bizItem.execEndTime)}}</span>
                                                    </p>
                                                    <div class="content">
                                                        <div class="stage-item" v-for="stage in bizItem.stageList" :key="stage.pkId">
                                                            <div @click="showStageDetail(stage)">
                                                            <el-progress class="define-progress"
                                                                         type="circle"
                                                                         :percentage="getPercentage(stage.percentage)"
                                                                         :color="getStatusColor(stage.stageStatus)"
                                                                         :style="{color: getStatusColor(stage.stageStatus)}"
                                                                         :width="56"
                                                                         :stroke-width="10"
                                                            ></el-progress>
                                                            <div class="stage-item-title" :title="stage.stageName" >{{ stage.stageName }}</div>
                                                            <div class="stage-item-num" :style="{color: getStatusColor(stage.stageStatus)}">{{ stage.stageFinishdStepNum}}/{{ stage.stageToatlStepNum }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-right">
                                                    <el-progress class="define-progress"
                                                                 type="circle"
                                                                 :percentage="getPercentage(bizItem.percentage)"
                                                                 :color="getStatusColor('02')"
                                                                 :style="{color: getStatusColor('02')}"
                                                                 :width="72"
                                                                 :stroke-width="10"
                                                    ></el-progress>
                                                    <div class="stage-item-title">完成进度</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="fold-arrow" v-if="item.taskData.length>2" @click="foldContainer = !foldContainer">
                                            <em class="iconfont icon-double-arrow-down" v-if="foldContainer"></em>
                                            <em class="iconfont icon-double-arrow-up" v-else></em>
                                        </p>
                                    </section>
                                    <section class="section risk">
                                        <div class="section-title red">
                                            <span>风险事项</span>
                                        </div>
                                        <div class="card-container new-style">
                                            <div class="card-item">
                                                <div class="card-right">
                                                    <el-progress class="define-progress"
                                                                 type="circle"
                                                                 :percentage="getPercentage(riskNum.percentage)"
                                                                 :color="getStatusColor('02')"
                                                                 :style="{color: getStatusColor('02')}"
                                                                 :width="72"
                                                                 :stroke-width="10"
                                                    ></el-progress>
                                                    <div class="stage-item-title">处理进度</div>
                                                </div>
                                                <div class="card-left">
                                                    <p class="risk-item" v-for="riskItem in riskNumArr" :key="riskItem.key">
                                                        <label>{{riskItem.label}}</label>
                                                        <span :style="{color: riskItem.color}">{{riskNum[riskItem.key]}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </el-tab-pane>
                    </el-tabs>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import detailPage from "../../../../agnes-dop/pages/config/op-calendar-workbench/detailPage";
    export default {
        data() {
            return {
                mockTreeData: [],
                treeOptions: [{
                    treeData: [],
                    defaultProps: {
                        showCheckbox: false
                    },
                    defaultActions: {
                        'current-change': this.oneTreeNodeClickOne
                    }
                },{
                    treeData: [],
                    defaultProps: {
                        showCheckbox: false
                    },
                    defaultActions: {
                        'current-change': this.twoTreeNodeClickOne

                    }
                }],
                oneTreePrdtCode:'',
                twoTreePrdtCode:'',
                tabIndex:'all',
                prdtCode:'',
                prdtData:{},
                riskNum: {},
                productDetailShow: false,
                proInfoBoardArr: [
                    {id:'proInfo', label:'产品信息', icon:'proInfo'},
                    {id:'proTask', label:'产品任务', icon:'proTask'},
                    {id:'guestRequire', label:'客户需求', icon:'guestRequire'},
                    {id:'riskEvent', label:'风险事件', icon:'riskEvent'},
                    {id:'bizStatistics', label:'业务统计', icon:'bizStatistics'},
                    {id:'111', label:'业务统计', icon:'bizStatistics'},
                    {id:'222', label:'业务统计', icon:'bizStatistics'},
                    {id:'333', label:'业务统计', icon:'bizStatistics'},
                    {id:'444', label:'业务统计', icon:'bizStatistics'},
                    {id:'5555', label:'业务统计', icon:'bizStatistics'}
                ],
                proTaskArr: [],
                stageStatus: {
                    '#DFE1E5': '未开始',
                    '#4A8EF0': '执行中',
                    '#F5222E': '已异常/已超时',
                    '#FAAE14': '干预通过',
                    '#52C41C': '已完成'
                },
                foldContainer: true,
                riskNumArr: [
                    {label: '风险事件总数', key: 'total', color: '#4A8EF0'},
                    {label: '已处理件数', key: 'finishd', color: '#52C41C'},
                    {label: '未处理件数', key: 'unfinishd', color: '#ccc'}]
            }
        },
        mounted() {
            this.initData();
            this.initTreeData();
        },
        methods: {
            async initTreeData(){
                const p1 = this.$api.bizMonitorApi.getRisksSurvey();
                const resp1 = await this.$app.blockingApp(p1);
                if(resp1.data){
                    this.riskNum = resp1.data;
                }
                const p2 = this.$api.bizMonitorApi.getTreeData({type:"prdt",isChecked:'1'});
                const resp2 = await this.$app.blockingApp(p2);
                if(resp2.data){
                    this.mockTreeData = resp2.data;
                    const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
                    treeOptions[0].treeData = [this.mockTreeData[0]];
                    treeOptions[1].treeData = [this.mockTreeData[1]];
                    this.treeOptions = treeOptions;
                }
            },
            async initData(){
                let code = '';
                this.proTaskArr = [];
                this.prdtData = {};
                if(this.oneTreePrdtCode){
                    code = this.oneTreePrdtCode;
                }
                if(this.twoTreePrdtCode){
                    code = this.twoTreePrdtCode;
                }
                if(!code){
                    return ;
                }
                const p = this.$api.bizMonitorApi.getPrdtMonitorData({productCode:code});
                const resp = await this.$app.blockingApp(p);
                this.tabIndex='all';
                if(resp.data){
                    this.prdtData = resp.data;
                    if(this.prdtData.dictTypes){
                        let allTasks = [];
                        this.prdtData.dictTypes.forEach(item=>{
                            let num = item.taskList?item.taskList.length:0;
                            let taskData = item.taskList?item.taskList:[];
                            if(item.taskList){
                                allTasks = allTasks.concat(item.taskList);
                            }
                            this.proTaskArr.push({label: item.lable,key:item.id,num: num,taskData:taskData});
                        });
                        this.proTaskArr.splice(0,0,{label:'全部',key:"all",num: allTasks.length,taskData:allTasks});
                    }
                }
            },
            showStageDetail(params) {
                let title = [];
                title.push(params.taskName)
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: title,
                    okButtonVisible: false,
                    cancelButtonTitle: '返回',
                    component: detailPage,
                    args: {row: params, mode: 'view'},
                    pageEl: this.$el
                })
            },

            getPercentage(percentage) {
                return parseInt(percentage * 100);
            },

            getStatusColor(statusId) {
                const stepStatus = this.$agnesAcUtils.getStepStatusMap();
                return stepStatus.get(statusId).color;
            },
            // 弹框选择数据以后，赋值给组件树
            manageCheckNodes(val){
                const treeOptions = this.$lodash.cloneDeep(this.treeOptions);
                treeOptions[0].treeData = [val[0]];
                treeOptions[1].treeData = [val[1]];
                this.treeOptions = treeOptions;
            },
            // 首棵树点击事件
            oneTreeNodeClickOne(nodeObj){
                this.oneTreePrdtCode = '';
                if(nodeObj.type && nodeObj.type == 'prdt'){
                    this.oneTreePrdtCode = nodeObj.code;
                }
                this.initData();
            },

            // 第二颗树勾选事件
            twoTreeNodeClickOne(nodeObj){
                this.twoTreePrdtCode = '';
                if(nodeObj.type && nodeObj.type == 'prdt'){
                    this.twoTreePrdtCode = nodeObj.code;
                }
                this.initData();
            },

            subStrTime(time){
                // return time.substr(0, 10);
                return time;
            }
        }
    }
</script>

<style scoped>
    .monitor-container-right {
        margin-left: 13px;
        padding-right: 25px;
        margin-right: -25px;
    }

    .monitor-container-right.pagescroll {
        overflow-y: auto;
    }

    .ag-cell.link-option-cell:hover .ag-cell-value{
        cursor: pointer;
        text-decoration: underline;
    }

    .fold-arrow {
        margin-top: 12px;
        text-align: center;
        cursor: pointer;
    }
    .stage-item .define-progress {
        cursor: pointer;
    }

    .fold-arrow > .iconfont {
        color: #999;
    }

    .monitor-pages .elec-process{
        background: #F5F7FA;
        border-radius: 8px;
        padding: 16px;
    }

    .monitor-pages .section-title {
        width: 100%;
        color: #666;
        font-size: 18px;
        font-family: SourceHanSansCN-Medium;
        margin-bottom: 14px;
    }

    .monitor-pages .elec-process > .section {
        flex-direction: column;
    }

    .monitor-pages .elec-process > .section .section-title::before {
        display: block;
        position: absolute;
        content: '';
        width: 4px;
        height: 16px;
        background: #0f5eff;
        left: -10px;
        top: 7px;
        border-radius: 2px;
    }

    .monitor-pages .elec-process > .section .section-title.red::before {
        background: #F5222E;
    }
    .none-border-tabs.task-tabs.el-tabs >>> .el-tabs__header .el-tabs__nav {
        width: auto;
    }
    .none-border-tabs >>> .el-badge .el-badge__content {
        top: -3px;
        left: calc(100% - 5px);
    }

    .none-border-tabs.el-tabs >>> .el-tabs__header .el-tabs__item {
        padding: 0 8px;
    }
</style>