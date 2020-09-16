<template>
    <div class="top-main">
        <div class="dash-chart-content" style="height: calc(100% - 60px);">
            <!--左侧内容-->
            <data-left
                    class="dash-chart-left dash-chart-data"
                    ref="dataLeft"
                    @dataSetIdLeft="dataSetIdLeft"
                    @getStrList="getStrList"
            ></data-left>
            <!--设置过滤条件-->
            <filter-dialog
                    :filterDialog="filterDialog"
                    :filterType="filterType"
                    :filterLabel="filterLabel"
                    :filterField="filterField"
                    :dataSourceId="dataSourceId"
                    :filter="filter"
                    :tempField="tempField"
                    :filterEditIndex="filterEditIndex"
                    :filterOptionIndex="filterOptionIndex"
                    @closeEditDialog="closeEditDialog">
            </filter-dialog>
            <!--中间内容-->
            <div class="dash-chart-main">
                <div class="datav-chart-head">
                    <axis v-for="(axisItem ,axisIndex) in axisDataList"
                          :key="axisIndex"
                          :axisItem="axisItem"
                          @getPivotData="getPivotData">
                        <template slot="axis-content">
                            <draggable v-model="axisItem.axisData"
                                       :options="{group:{name:'list'}}"
                                       class="content-center"
                                       @add="textAdd(axisItem,axisItem.axisData)">
                                <template v-for="(element,index) in axisItem.axisData">
                                    <axis-tag
                                            :key="element.field"
                                            :index="index"
                                            :axisIndex="axisIndex"
                                            :element="element"
                                            :axisItem="axisItem"
                                            @panelChange="panelChange"
                                            @closeAxisData="closeAxisData(axisIndex,index)">
                                    </axis-tag>
                                </template>
                            </draggable>
                        </template>
                    </axis>
                </div>
                <div class="chart-main">
                    <div class="chart-title-wrapper">
                        <div class="chart-title"><span>{{chartLabel}}</span></div>
                    </div>
                    <div v-if="isUpdate" class="datav-chart-head"
                         :style="{height: chartHeight, width: chartWidth, margin: chartMargin}">
                        <component :is="compName"
                                   :compOption="dataOption"
                                   :dataConfig="dataConfig"
                                   :header="header"
                                   :dataSetId="dataSourceId"
                                   :dimRow="dimRow"
                                   :dimCol="dimCol"
                                   :pivotIndex="pivotIndex"
                                   :pivotFilter="pivotFilter"
                                   :formatterInfo="formatterInfoTemp"
                                   :curElement="curElement"
                        ></component>
                    </div>
                    <div v-if="!isUpdate && editType == 'chart'" class="chart-widget">
                        <div class="component-content">
                            <img src="../../../../assets/drawer-icon/dash-guide.png" alt="" class="guide-image">
                            <div class="guide-tip">
                                拖拽左侧字段到上方
                                <a href="#" class="guide-link">维度</a>、
                                <a href="#" class="guide-link">指标</a>
                                栏来添加数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧内容-->
            <div class="dash-chart-right chart-config" id="input-config" v-if="editType == 'chart'">
                <div>
                    <div style="margin-top: 10px;">图表类型</div>
                    <div class="config-type" style="position: relative">
                        <el-row>
                            <template>
                                <el-col>
                                    <div class="chart-type" v-for="(item, idx) in iconList"
                                         :key="item.label"
                                         :class="{'select':idx==index && item.disable===false,'disable':chartTypeDisabled(item)}"
                                         @click="switchChartType(item,idx)">
                                        <el-popover
                                                ref="popover1"
                                                placement="left-start"
                                                width="200"
                                                popper-class="chart-svg-popper"
                                                :open-delay="0"
                                                :close-delay="0"
                                                trigger="hover">
                                            <div style="margin-left: 10px;">{{item.label}}</div>
                                            <div style="font-size: 12px; color: #666; margin-top: 5px; margin-left: 10px;">
                                                {{item.detail}}
                                            </div>
                                            <div style="font-size: 12px; color: #666; margin-top: 5px; margin-left: 10px;">
                                                {{item.detail2}}
                                            </div>
                                            <div class="chart-container" slot="reference">
                                                <svg class="icon type-icon"
                                                     aria-hidden="true">
                                                    <use :xlink:href=item.icon></use>
                                                </svg>
                                            </div>
                                        </el-popover>
                                    </div>
                                </el-col>
                            </template>
                        </el-row>
                    </div>
                </div>
                <div>
                    <div v-if="editItemType == 'ct-line-bar'">
                        <div>双轴图类型</div>
                        <div class="block-body">
                            <div class="config-type" style="position: relative">
                                <!--左轴-->
                                <el-row>
                                    <template>
                                        <el-col>
                                            <span class="metric-span">左轴</span>
                                            <div class="left-type" v-for="(item, index) in metricsIconList"
                                                 :key="index"
                                                 :class="{'select':index==metricsLeftIndex}"
                                                 @click="switchMetricsLeftChartType(item,index)">
                                                <el-popover
                                                        ref="popoverLeft"
                                                        placement="top"
                                                        width="150"
                                                        popper-class="chart-svg-popper"
                                                        :open-delay="0"
                                                        :close-delay="0"
                                                        trigger="hover">
                                                    <div style="margin-left: 10px;">{{item.label}}</div>
                                                    <div class="chart-container" slot="reference">
                                                        <svg class="icon type-icon"
                                                             aria-hidden="true">
                                                            <use :xlink:href=item.icon></use>
                                                        </svg>
                                                    </div>
                                                </el-popover>
                                            </div>
                                        </el-col>
                                    </template>
                                </el-row>
                                <!--右轴-->
                                <el-row>
                                    <template>
                                        <el-col>
                                            <span class="metric-span">右轴</span>
                                            <div class="left-type" v-for="(item, index) in metricsIconList"
                                                 :key="index"
                                                 :class="{'select':index==metricsRightIndex}"
                                                 @click="switchMetricsRightChartType(item,index)">
                                                <el-popover
                                                        ref="popoverLeft"
                                                        placement="top"
                                                        width="150"
                                                        popper-class="chart-svg-popper"
                                                        :open-delay="0"
                                                        :close-delay="0"
                                                        trigger="hover">
                                                    <div style="margin-left: 10px;">{{item.label}}</div>
                                                    <div class="chart-container" slot="reference">
                                                        <svg class="icon type-icon"
                                                             aria-hidden="true">
                                                            <use :xlink:href=item.icon></use>
                                                        </svg>
                                                    </div>
                                                </el-popover>
                                            </div>
                                        </el-col>
                                    </template>
                                </el-row>

                            </div>
                        </div>
                    </div>
                    <div class="config-block"
                         v-if="editItemType == 'ct-line' || editItemType == 'ct-area' || editItemType == 'ct-bar' || editItemType == 'ct-pie' || editItemType == 'ct-radar' || editItemType == 'ct-strip'">
                        <div>显示配置</div>
                        <div class="block-body">
                            <div class="show-label"
                                 v-if="editItemType == 'ct-line' || editItemType == 'ct-area' || editItemType == 'ct-bar' || editItemType == 'ct-strip'">
                                <el-checkbox v-model="showSeries" @change="changeLabel">显示数据标签</el-checkbox>
                            </div>
                            <div class="block-body" v-if="editItemType == 'ct-pie'">
                                <el-checkbox v-model="roseType" @change="changePieSty">玫瑰图</el-checkbox>
                                <el-checkbox v-model="innerLabel" @change="changeLabelPos">内部标签
                                </el-checkbox>
                                <el-checkbox v-model="formatterLabel" @change="changePieLabel">显示百分比</el-checkbox>
                            </div>
                            <div class="block-body" v-if="editItemType == 'ct-radar'">
                                <el-checkbox v-model="pieLabel" @change="changePieLabel">显示数据标签</el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="config-block"

                         v-if="editItemType == 'ct-line' || editItemType == 'ct-bar'  || editItemType == 'ct-area'">
                        <div>坐标X轴</div>
                        <div class="block-body">
                            <div class="custom-xaxis">
                                <div class="rotation">
                                    <div class="label">标签文字显示方向</div>
                                    <div class="label-rotation">
                                        <el-select v-model="dirVal" @change="changeDir()">
                                            <el-option
                                                    v-for="(item, index) in dirArr"
                                                    :label="item.label"
                                                    :value="item.value"
                                                    :key="index">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="config-block"
                         v-if="editItemType == 'ct-line' || editItemType == 'ct-bar' || editItemType == 'ct-area'">
                        <div class="">坐标Y轴</div>
                        <div class="block-body">
                            <div class="custom-yaxis">
                                <div class="yaxis-config">
                                    <div class="title">
                                        <div class="label">标题</div>
                                        <div class="axis-limit" style="width: 190px;height: 30px;">
                                            <el-input v-model="yTitle" @change="changeYTitle"
                                                      placeholder="请输入内容"></el-input>
                                        </div>
                                    </div>
                                    <div class="max">
                                        <div class="label">最大值</div>
                                        <div class="axis-limit" style="width: 190px;height: 30px;">
                                            <el-input v-model="yMax" @change="changeYMax"
                                                      placeholder="请输入内容"></el-input>
                                        </div>
                                    </div>
                                    <div class="min">
                                        <div class="label">最小值</div>
                                        <div class="axis-limit" style="width: 190px;height: 30px;">
                                            <el-input v-model="yMin" @change="changeYMin"
                                                      placeholder="请输入内容"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--                    //数据显示-->
                    <div class="config-block" v-if="editItemType != 'pivot-grid'">
                        <div class="">数据显示</div>
                        <div class="block-body data-display">
                            <div class="top-data">
                                <div class="top-data-check">
                                    <el-checkbox v-model="displayRange">显示前</el-checkbox>
                                </div>
                                <div class="number-input">
                                    <div class="fui_text x-ui-disable"
                                         style="width: 70px; height: 30px;">
                                        <el-input v-model="inputDisplay" :disabled="!displayRange"
                                                  @blur="dataCount"></el-input>
                                    </div>
                                </div>
                                <div class="top-data-text">条数据</div>
                            </div>
                        </div>
                    </div>
                    <div class="config-block" v-if="editItemType != 'pivot-grid'">
                        <div class="">图例</div>
                        <div class="block-body data-display">
                            <div class="top-data">
                                <div class="top-data-check">
                                    <el-checkbox v-model="dataOption.ifShowLegend">显示图例</el-checkbox>
                                </div>
                                <div class="one-line legend">
                                    <span>图例显示在图表</span>
                                    <el-select v-model="dataOption.legendPosition" :disabled="!dataOption.ifShowLegend">
                                        <el-option label="底部" value="bottom"></el-option>
                                        <el-option label="顶部" value="top"></el-option>
                                        <el-option label="左侧" value="left"></el-option>
                                        <el-option label="右侧" value="right"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--                    //维度冻结-->
                    <div class="config-block" v-if="editItemType==='pivot-grid'">
                        <div class="">维度冻结</div>
                        <div class="block-body">
                            <div class="x-check">
                                <el-checkbox v-model="demensionRow">冻结行维度</el-checkbox>
                            </div>
                            <div class="x-check">
                                <el-checkbox v-model="demensionCloumn">冻结列维度</el-checkbox>
                            </div>
                        </div>
                    </div>
                    <!-- 颜色-->
                    <div class="config-block">
                        <div class="">颜色</div>
                        <div class="body-btn" style="width: 100%;">
                            <div class="inner-wrapper">
                                <span class="btn-text">颜色设置</span>
                            </div>
                        </div>
                    </div>
                    <!-- 数据预警-->
                    <div class="config-block">
                        <div class="">数据预警</div>
                        <div class="block-body">
                            <div class="body-btn">
                                <i class="icon iconfont icon-icon_add "></i>
                                <span>添加预警</span>
                            </div>
                        </div>
                    </div>
                    <!-- 图表联动-->
                    <div class="config-block">
                        <div class="">图表联动</div>
                        <div class="block-body">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange"><span style="color: #476DBE">全选</span>
                            </el-checkbox>
                            <el-checkbox-group v-model="checkedCharts" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="chart in chartsList" :label="chart" :key="chart">{{chart}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-chart-right chart-config" v-if="editType == 'grid'">
                <div class="config-block">
                    <div>操作权限</div>
                    <div class="block-body">
                        <el-checkbox @change="changeAuth">可导出数据</el-checkbox>
                    </div>
                </div>
                <div class="config-block" v-if="editItemType != 'pivot-grid'">
                    <div class="">数据显示</div>
                    <el-checkbox @change="enableIndex">显示序号</el-checkbox>
                    <div class="block-body data-display">
                        <div class="top-data">
                            <div class="top-data-check">
                                <el-checkbox v-model="displayRange">显示前</el-checkbox>
                            </div>
                            <div class="number-input">
                                <div class="fui_text x-ui-disable"
                                     style="width: 70px; height: 30px;">
                                    <el-input v-model="inputDisplay" :disabled="true"></el-input>
                                </div>
                            </div>
                            <div class="top-data-text">条数据</div>
                        </div>
                    </div>
                </div>
                <div class="config-block">
                    <div>表格冻结</div>
                    <div class="block-body">
                        <div class="top-data-check">
                            <el-checkbox v-model="displayRange">固定前</el-checkbox>
                            <el-select v-model="calmRows" placeholder=""
                                       style="width: 70px; height: 30px; margin: 0 5px;">
                                <el-option v-for="i in rowNum" :key="i" :value="i">{{i}}</el-option>
                            </el-select>
                            行
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <data-formatter-dia
                :dialogVisible="dataFormatterDia"
                :chartType="editItemType"
                @cancelFormatter="hideDataFormatterDia"
                @getFormatterInfo="getFormatterInfo"
        >
        </data-formatter-dia>
    </div>
</template>

<script>
    import dataConfData from './dataConf'
    import dataLeft from './options/data-left'
    import DataFormatterDia from "./components/data-formatter-dia";

    export default {
        name: "data-conf",
        components: {
            DataFormatterDia,
            'data-left': dataLeft
        },
        data() {
            return {
                dataDraggable: [],
                axisList: dataConfData.axisList,
                doubleLineAxisList: dataConfData.doubleLineAxisList,
                options: [
                    {
                        value: '1',
                        label: '数据集表单中的全部数据'
                    },
                    {
                        value: '2',
                        label: '用户访问组件时可以查看组件中的全部数据'
                    }
                ],
                yTitle: "",
                yMax: "",
                yMin: "",
                dirVal: "transverse",
                dirArr: dataConfData.dirArr,
                value: '',
                checked: false,
                input: '',
                displayRange: '',
                inputDisplay: '',
                demensionRow: '',
                demensionCloumn: '',
                activeName: 'table',
                dataSetName: [],
                columnDefsList: [],
                yAxis: [],
                xAxis: [],
                filter: [],
                filterType: "",
                filterLabel: "",
                numberFilterOptions: dataConfData.numberFilterOptions,
                dateFilterOptions: dataConfData.dateFilterOptions,
                textFilterOptions: dataConfData.textFilterOptions,
                numberCond: "",
                filterNum: '',
                minFil: "",
                maxFil: "",
                filterDialog: false,
                filterCond: {},
                grid: {
                    bottom: 5
                },
                chartData: {
                    rows: []
                },
                chart: null,
                isUpdate: false,
                compName: '',
                dataOption: {
                    chartSettings: {
                        label: {
                            "position": "",
                            "formatter": "{b}"
                        },
                    },
                    ifShowLegend: true,       // 是否显示图例
                    legendPosition: 'bottom',     // 显示图例位置
                    extend: {
                        "rotate": 0,
                        "series": true
                    }
                },
                iconList: dataConfData.iconList,
                metricsIconList: dataConfData.metricsIconList,
                editItemType: "",
                editType: "",
                svgImg: this.$svgImg,
                visValue: "",
                enClick: false,
                addCalcColDialog: false,
                calmRows: "0",
                rowNum: [],
                calcStr: "",
                dataSourceId: "",
                index: -1,
                gridParams: {
                    "dataSetId": "",
                    "xFields": []
                },
                cond: [],
                tempField: '',
                filterOptionIndex: -1,/*选中的过滤条件tag索引*/
                numLabel: '',
                startDateTime: '',
                endDateTime: '',
                chartLabel: "未命名图表",
                selectDataList: [],
                checkData: '',
                checkDataList: [],
                selectData: '',
                props: {multiple: true},
                filterField: '',
                filterEditIndex: -1,
                iconListRule: '',
                iconListItemIndex: -1,
                roseType: false,
                innerLabel: false,
                formatterLabel: false,
                showSeries: true,
                pieLabel: false,
                metricsLeftIndex: -1, //双轴图类型-左轴点击index
                metricsRightIndex: -1, //双轴图类型-右轴点击Index
                yAxisRight: [],
                yAxisLeft: [],
                switchMetricsLeftType: '',
                switchMetricsRightType: '',
                cloneLeftStack: [],
                cloneRightStack: [],
                cloneLeftShowLine: [],
                cloneRightShowLine: [],
                mountedTip: false,
                header: [],
                dataConfig: {},
                gridConf: {},
                axisDataList: [],
                leftList: [],
                rightList: [],
                xAxisList: [],
                notMounted: true,
                doubleAxisListMounted: [],
                axisListMounted: [],
                dimRow: [],
                dimCol: [],
                pivotIndex: [],
                pivotFilter: {},
                strList: [],
                headerName: '',
                axisNumOptions: dataConfData.axisNumOptions,
                axisDateOptions: dataConfData.axisDateOptions,
                tagList: [],
                handleData: '',
                doubleLineTip: false,
                isEndDraggable: false,
                dataFormatterDia: false,
                formatterInfoTemp: {},
                curElement: {},
                filterCondData: {},
                compOptionData: {},

                checkAll: false,
                checkedCharts: [],
                chartsList: ['未命名图表'],
                isIndeterminate: true,
                chartsOptions: ['未命名图表']
            }
        },
        methods: {
            getPivotData(val) {
                if (this.compName == 'pivot-grid') {
                    for (let i = 0; i < 4; i++) {
                        if (this.$lodash.isEqual(this.axisDataList[i].axisData, val)) {
                            if (i == 0) {
                                this.dimRow = val
                            }
                            if (i == 1) {
                                this.dimCol = val
                            }
                            if (i == 2) {
                                this.pivotIndex = val
                            }
                            if (i == 3) {
                                return "#"
                            }
                        }
                    }
                }
            },
            createChart() {
                if (this.editItemType === 'ct-line-bar') {
                    if (this.lineBarAxis && this.lineBarAxis.length > 0) {
                        this.yAxis = this.lineBarAxis;
                    }
                }
                if (this.xAxis && this.yAxis && this.xAxis.length > 0 && this.yAxis.length > 0) {
                    this.initChartData(this.xAxis, this.yAxis, this.filter, this.editItemType);
                    this.isUpdate = true;
                } else {
                    this.isUpdate = false;
                }
            },
            initChartData(xAxis, yAxis, filter, type) {
                /*图表渲染*/
                let xAxisList = [];
                let yAxisList = [];
                let filterObj = {
                    cond: [],
                    rel: '',
                };
                xAxisList = xAxis.map(item => {
                    if (item) {
                        return item.field;
                    }
                });
                yAxisList = yAxis.map(item => {
                    if (item) {
                        return item.field;
                    }
                });
                if (this.cond) {
                    this.$set(filterObj, 'cond', this.cond)
                }
                let chartSettings = this.dataOption.chartSettings;
                if (chartSettings.axisSite && chartSettings.axisSite.right.length <= 0) {
                    delete chartSettings.axisSite;
                }
                chartSettings.metrics = yAxisList;
                chartSettings.dimension = xAxisList;
                let extend = this.dataOption.extend;
                this.compName = type;
                let compStaticData = {};
                if (this.editItemState && this.editItemState.comp.componentMeta && this.editItemState.comp.componentMeta.compStaticData) {
                    compStaticData = this.editItemState.comp.componentMeta.compStaticData;
                }
                var compOption = {
                    'dataSourceId': this.dataSourceId,
                    'xFields': xAxis,
                    'metrics': yAxis,
                    'filter': filterObj,
                    'chartSettings': chartSettings,
                    'type': this.compName,
                    'extend': extend,
                    'ifShowLegend': this.dataOption.ifShowLegend,
                    'legendPosition': this.dataOption.legendPosition,
                    'dataCount': this.inputDisplay,
                    'compStaticData': compStaticData,
                };
                this.compOptionData = compOption;
                this.dataOption = compOption;
            },
            cancelEdit() {
                this.$app.runCmd('closeDrawerCmd');
                this.dataOption = [];
                this.xAxis = [];
                this.yAxis = [];
                this.dataSourceId = '';
                this.editItemType = '';
                this.columnDefsList = [];
                this.chartLabel = '';
                this.axisDataList = [];
                this.doubleLineAxisList = [];
                this.axisList = [];
            },
            saveChart() {
                if (this.isUpdate) {
                    if (this.compName == "static-grid") {
                        this.$app.runCmd("dataConfigure", this.gridConf, this.chartLabel, this.editItemType)
                    } else {
                        this.$set(this.dataOption, 'chartLabel', this.chartLabel);
                        this.$app.runCmd('dataConfigure', this.dataOption, this.chartLabel, this.editItemType)
                    }
                    this.$app.runCmd('closeDrawerCmd')
                    this.$store.commit("changeApiTip", false);
                    let id = this.$store.state.id;
                    let upperId = this.$store.state.upperId;
                    let userTd = this.$app.session.data.user.userId;
                    let chartData = this.$store.state.chartData;
                    let params = {
                        id: id,
                        upperId: upperId,
                        userId: userTd,
                        content: JSON.stringify(chartData)
                    };
                    this.$api.DatavDatavApi.saveEveComp(params).then(res => {
                        if (res.message == "ok" && res.status == "0000") {
                            return;
                        }
                    })
                } else if (this.isUpdate && this.editItemType == "pivot-grid") {
                    let meta = {
                        dataSetId: this.dataSourceId,
                        dimRow: this.dimRow,
                        dimCol: this.dimCol,
                        pivotIndex: this.pivotIndex,
                        pivotFilter: this.pivotFilter,
                        type: "pivot-grid"
                    }
                    this.$app.runCmd("dataConfigure", meta, this.chartLabel, this.editItemType)
                    this.$app.runCmd("closeDrawerCmd")
                } else {
                    this.$message({
                        message: '请选择对应的维度、指标',
                        type: 'warning'
                    });
                }
            },
            getStrList(val) {
                this.strList = val
            },
            switchChartType(item, idx) {
                if (!item.disable) {
                    this.index = idx;
                    this.editItemType = item.type;
                    this.compName = this.editItemType;
                    if (this.compName == "pivot-grid") {
                        this.isUpdate = true
                        // this.$app.runCmd("initGridDataCmd", this.strList)
                    }
                    let typeArr = ["ct-bar", "ct-line", "ct-line-bar", "ct-pie", "ct-radar", 'ct-strip', 'ct-map', 'ct-area'];
                    let type = item.type;
                    if (item.type === 'ct-line-bar' && item.type === 'ct-line-bar' && this.metricsLeftIndex === -1 && this.metricsRightIndex === -1) {
                        this.doubleLineTip = true;
                    } else {
                        this.doubleLineTip = false;
                        this.metricsLeftIndex = -1;
                        this.metricsRightIndex = -1;
                    }
                    if (typeArr.includes(type)) {
                        this.createChart();
                    }
                } else {
                    return;
                }
                /*坐标Y轴:非指定图表类型删除特定属性*/
                let setting = this.dataOption.chartSettings;
                let type = this.dataOption.type;
                if (type !== 'ct-line' && type !== 'ct-bar' && type !== 'ct-area') {
                    if (setting.yAxisName) {
                        delete setting.yAxisName
                    }
                    if (setting.max) {
                        delete setting.max;
                    }
                    if (setting.min) {
                        delete setting.min;
                    }
                } else {
                    if (this.yTitle.length > 0) {
                        this.changeYTitle(this.yTitle);
                    }
                    if (this.yMax.length > 0) {
                        this.changeYMax(this.yMax);
                    }
                    if (this.yMin.length > 0) {
                        this.changeYMin(this.yMin);
                    }
                }
                /* 删除双轴图特定属性*/
                let settingDataOption = this.dataOption.chartSettings;
                if (this.editItemType !== 'ct-line-bar') {
                    if (settingDataOption.showLine) {
                        delete settingDataOption.showLine;
                    }
                    if (settingDataOption.axisSite) {
                        delete settingDataOption.axisSite;
                    }
                    if (settingDataOption.stack) {
                        delete settingDataOption.stack;
                    }
                }
            },
            changeLabel(val) {
                if (val) {
                    this.$set(this.dataOption.extend, "series", true)
                } else {
                    this.$set(this.dataOption.extend, "series", false)
                }
                this.createChart()
            },
            changeDir() {
                if (this.dirVal == "transverse") {
                    this.$set(this.dataOption.extend, "rotate", 0)
                }
                if (this.dirVal == "lrotate") {
                    this.$set(this.dataOption.extend, "rotate", 45)
                }
                if (this.dirVal == "rrotate") {
                    this.$set(this.dataOption.extend, "rotate", -45)
                }
                if (this.dirVal == "longitudinal") {
                    this.$set(this.dataOption.extend, "rotate", 90)
                }
            },
            changeYTitle(val) {
                this.$set(this.dataOption.chartSettings, "yName", [val])
            },
            changeYMax(val) {
                this.$set(this.dataOption.chartSettings, "max", [val])
            },
            changeYMin(val) {
                this.$set(this.dataOption.chartSettings, "min", [val])
            },
            changePieSty(val) {
                if (val) {
                    this.$set(this.dataOption.chartSettings, "roseType", "radius")
                } else {
                    this.$set(this.dataOption.chartSettings, "roseType", "")
                }
            },
            changeLabelPos(val) {
                if (val) {
                    this.$set(this.dataOption.chartSettings.label, "position", "inner")
                } else {
                    this.$set(this.dataOption.chartSettings.label, "position", "")
                }
            },
            changePieLabel(val) {
                if (val) {
                    this.$set(this.dataOption.chartSettings.label, "formatter", "{b}-{d}%")
                } else {
                    this.$set(this.dataOption.chartSettings.label, "formatter", "{b}")
                }
            },
            changeAuth(val) {
                return val
            },
            enableIndex(val) {
                return val
            },
            addFilterCond() {
                let filterCond = {
                    "cond": []
                };
                for (let i of this.filter) {
                    let condItem = {}
                    condItem.field = i.field
                    condItem.typeName = i.typeName
                    condItem.method = this.numberCond
                    if (this.numberCond == 'range') {
                        condItem.value = [this.minFil, this.maxFil]
                    } else if (this.numberCond != 'empty' && this.numberCond != 'not_empty') {
                        condItem.value = [this.filterNum]
                    } else {
                        condItem.value = []
                    }
                    filterCond.cond.push(condItem)
                }
                filterCond.rel = "and"
                this.filterCond = filterCond
                this.gridParams.filter = filterCond
            },
            getGridDetail() {
                this.header = []
                this.gridParams.dataSetId = this.dataSourceId
                this.dataConfig = this.$lodash.cloneDeep(this.gridParams)
                for (let i of this.xAxis) {
                    let headerItem = {}
                    headerItem.headerName = i.headerName
                    headerItem.field = i.field
                    this.header.push(headerItem)
                }
                this.gridConf = {
                    dataConfig: this.dataConfig,
                    header: this.header
                }
                this.compName = "static-grid"
                this.isUpdate = true
                // this.$api.DatavDatavApi.getTableList(this.gridParams).then(res => {
                //     this.compName = this.editItemType
                //     let header = []
                //     for (let i of this.xAxis) {
                //         let headerItem = {}
                //         headerItem.field = i.field
                //         headerItem.headerName = i.headerName
                //         this.header.push(headerItem)
                //     }
                //     this.dataOption = {
                //         header: header,
                //         data: res
                //     }
                //     this.isUpdate = true
                // })
            },
            updateLabel(label) {
                this.chartLabel = label;
                this.$store.commit('changeChartLabel', label);
            },
            checkedIndex(index, element) {
                this.filterEditIndex = index;
                this.filterLabel = element.headerName;
                this.filterField = element.field;
                this.filterType = element.typeName;
            },
            editItemData() {
                let itemDate = this.editItemState;
                let type = itemDate.comp.componentMeta.type;
                let setting = itemDate.comp.componentMeta.chartSettings;
                let id = itemDate.comp.componentMeta.dataSourceId;
                let metaDate = itemDate.comp.componentMeta;
                let dataCount = itemDate.comp.componentMeta.dataCount;
                this.dataSourceId = id;
                /*维度指标过滤条件赋值*/
                this.mountedAxis(type, metaDate);
                /*数据集*/
                this.$refs.dataLeft.initData(id);
                /*图表类型*/
                this.editType = itemDate.comp.type;
                this.editItemType = itemDate.comp.compName;
                for (let i = 0; i < 20; i++) {
                    this.rowNum.push(i.toString())
                }
                /*选中的图标类型*/
                this.iconList.forEach((iconItem, iconIndex) => {
                    if (iconItem.type === this.editItemType) {
                        this.index = iconIndex;
                    }
                });
                /*右侧配置属性*/
                /* 坐标X轴*/
                if (itemDate.comp.componentMeta.extend) {
                    if (itemDate.comp.componentMeta.extend.rotate) {
                        let rotate = itemDate.comp.componentMeta.extend.rotate;
                        let dirVal = new Map();
                        dirVal.set(0, 'transverse');
                        dirVal.set(45, 'lrotate',);
                        dirVal.set(-45, 'rrotate');
                        dirVal.set(90, 'longitudinal');
                        this.dirVal = dirVal.get(rotate);
                        this.changeDir();
                    }
                }
                /*饼图-显示配置*/
                if (type === 'ct-pie') {
                    if (setting) {
                        if (setting.roseType) {
                            this.roseType = true;
                            this.$set(this.dataOption.chartSettings, "roseType", "radius")
                        }
                        //TODO 显示类目名没生效
                        if (setting.label && setting.label.position && setting.label.position === 'inner') {
                            this.innerLabel = true;
                            this.$set(this.dataOption.chartSettings.label, "position", "inner");
                        }
                        //TODO 显示类目名没生效
                        if (setting.label && setting.label.formatter && setting.label.formatter === '{b}-{d}%') {
                            this.formatterLabel = true;
                            this.$set(this.dataOption.chartSettings.label, "formatter", "{b}-{d}%");
                        }
                    }
                }
                /*折线图、面积图、条形图、柱状图显示配置*/
                if (type === 'ct-line' || type === 'ct-area' || type === 'ct-strip' || type === 'ct-bar') {
                    if (itemDate.comp.componentMeta.extend) {
                        let series = itemDate.comp.componentMeta.extend.series;
                        this.showSeries = series;
                        this.formatterLabel = series;
                        this.changeLabel(series);
                    }
                }
                /*雷达图-显示配置*/
                if (type === 'ct-radar') {
                    //TODO 显示类目名没生效
                    if (setting.label.formatter === '{b}-{d}%') {
                        this.pieLabel = true;
                        this.$set(this.dataOption.chartSettings.label, "formatter", "{b}-{d}%");
                    }
                }
                /*坐标Y轴*/
                if (type === 'ct-line' || type === 'ct-bar' || type === 'ct-area') {
                    if (setting.yName) {
                        let name = setting.yName[0];
                        this.yTitle = name;
                        this.changeYTitle(this.yTitle);
                    }
                    if (setting.max) {
                        let max = setting.max[0];
                        this.yMax = max;
                        this.changeYMax(this.yMax);
                    }
                    if (setting.min) {
                        let min = setting.min[0];
                        this.yMin = min;
                        this.changeYMin(this.yMin);
                    }
                } else {
                    if (setting.yName) {
                        this.yTitle = '';
                        this.changeYTitle(this.yTitle);
                    }
                    if (setting.max) {
                        this.yMax = '';
                        this.changeYMax(this.yMax);
                    }
                    if (setting.min) {
                        this.yMin = '';
                        this.changeYMin(this.yMin);
                    }
                }
                /*图例*/
                if (itemDate.comp.componentMeta.ifShowLegend) {
                    let showLegend = itemDate.comp.componentMeta.ifShowLegend;
                    this.$set(this.dataOption, 'ifShowLegend', showLegend);

                    if (itemDate.comp.componentMeta.legendPosition) {
                        let position = itemDate.comp.componentMeta.legendPosition;
                        this.$set(this.dataOption, 'legendPosition', position);
                    }
                } else {
                    this.$set(this.dataOption, 'ifShowLegend', true);
                }
                /*双轴图类型*/
                // TODO 双轴图回显
                if (setting.leftTip || setting.rightTip) {
                    let yData = metaDate.metrics;
                    let listLeft = [];
                    let listRight = [];
                    let leftRightTip = false;
                    if (yData && yData.length > 0) {
                        yData.forEach(yItem => {
                            if (yItem.yTip && yItem.yTip === 'left') {
                                listLeft.push(yItem);
                                leftRightTip = true;
                            }
                            if (yItem.yTip && yItem.yTip === 'right') {
                                listRight.push(yItem);
                                leftRightTip = true;
                            }
                        });
                    }
                    if (leftRightTip) {
                        this.doubleLineAxisList[0].axisData = metaDate.xFields;
                        this.doubleLineAxisList[1].axisData = listLeft;
                        this.doubleLineAxisList[2].axisData = listRight;
                        this.yAxisLeft = listLeft;
                        this.yAxisRight = listRight;
                    }
                    /*左右轴类型渲染*/
                    if (this.yAxisRight) {
                        let obj = {right: []};
                        let filter = this.yAxisRight.map(yItem => {
                            return yItem.field;
                        });
                        obj.right = filter;
                        this.$set(this.dataOption.chartSettings, 'axisSite', obj);
                    }
                    if (setting.leftTip === 'ct-bar') {
                        this.metricsLeftIndex = 0;
                        this.switchMetricsLeftType = 'ct-bar';
                        this.switchMetricsLeftChartType('ct-bar', 0);
                    }
                    if (setting.leftTip === 'ct-line') {
                        this.metricsLeftIndex = 1;
                        this.switchMetricsLeftChartType('ct-line', 1);
                        this.switchMetricsLeftType = 'ct-line';
                    }
                    if (setting.leftTip === 'ct-stack-bar') {
                        this.metricsLeftIndex = 2;
                        this.switchMetricsLeftChartType('ct-stack-bar', 2);
                        this.switchMetricsLeftType = 'ct-stack-bar';
                    }
                    if (setting.rightTip === 'ct-bar') {
                        this.metricsRightIndex = 0;
                        this.switchMetricsRightChartType('ct-bar', 0);
                        this.switchMetricsRightType = 'ct-bar';
                    }
                    if (setting.rightTip === 'ct-line') {
                        this.metricsRightIndex = 1;
                        this.switchMetricsRightChartType('ct-line', 1);
                        this.switchMetricsRightType = 'ct-line';
                    }
                    if (setting.rightTip === 'ct-stack-bar') {
                        this.metricsRightIndex = 2;
                        this.switchMetricsRightChartType('ct-stack-bar', 2);
                        this.switchMetricsRightType = 'ct-stack-bar';
                    }
                }
                /*数据显示*/
                if (dataCount) {
                    this.displayRange = true;
                    this.inputDisplay = dataCount;
                    this.$set(this.dataOption, 'dataCount', dataCount);
                }
                this.mountedTip = false;
                // leftRightTip = false;
                /*图表名称*/
                if (metaDate.chartLabel) {
                    this.chartLabel = metaDate.chartLabel;
                    this.$store.commit("changeChartLabel", metaDate.chartLabel);
                }
            },
            chartTypeDisabled(item) {
                let tip = true;
                let label = item.label;
                let xLength = this.xAxisLength;
                let yLength = this.yAxisLength;
                if (label === '指标图' || label === '雷达图' || label === '地图') {
                    return tip = true;
                }
                if (label === '透视表') {
                    if ((xLength === 1 && yLength === 1) || (xLength === 1 && yLength === 'multiple')) {
                        return tip = false;
                    }
                    if ((xLength === 2 && yLength === 1) || (xLength === 2 && yLength === 'multiple')) {
                        return tip = false;
                    }
                    if ((xLength === 'multiple' && yLength === 'multiple') || (xLength === 'multiple' && yLength === 1)) {
                        return tip = false;
                    }
                    if ((xLength <= 2 && yLength === 0) || (xLength === 0 && yLength === 1) || (xLength === 0 && yLength === 'multiple') || (xLength === 'multiple' && yLength === 0)) {
                        return tip = false;
                    }
                }
                if (label === '柱状图' || label === '条形图' || label === '折线图' || label === '面积图') {
                    if ((xLength === 1 && yLength === 1) || (xLength === 1 && yLength === 'multiple')) {
                        return tip = false;
                    }
                    if (xLength === 2 && yLength === 1) {
                        return tip = false;
                    }
                    if ((xLength <= 2 && yLength === 0) || (xLength === 0 && yLength === 1) || (xLength === 0 && yLength === 'multiple')) {
                        return tip = false;
                    }
                }
                if (label === '双轴图') {
                    if ((xLength === 1 && yLength === 1) || (xLength === 1 && yLength === 'multiple')) {
                        return tip = false;
                    }
                    if ((xLength === 1 && yLength === 0) || (xLength === 0 && yLength === 1) || (xLength === 0 && yLength === 'multiple')) {
                        return tip = false;
                    }
                }
                if (label === '饼图') {
                    if (xLength === 1 && yLength === 1) {
                        return tip = false;
                    }
                    if ((xLength === 1 && yLength === 0) || (xLength === 0 && yLength === 1)) {
                        return tip = false;
                    }
                }
                if (this.axisDataList.length === 3) {
                    if (this.axisDataList[0].axisData.length <= 0 && this.axisDataList[1].axisData.length <= 0) {
                        return tip = false;
                    }
                }
                if (this.axisDataList.length === 4) {
                    if (this.axisDataList[0].axisData.length <= 0 && this.axisDataList[1].axisData.length <= 0 && this.axisDataList[2].axisData.length <= 0) {
                        return tip = false;
                    }
                }
                item.disable = tip;
                return tip;
            },
            switchMetricsLeftChartType(item, index) {
                if (this.mountedTip) {
                    this.switchMetricsLeftType = item.type;
                    let setting = this.editItemState.comp.componentMeta.chartSettings;
                    if (setting.rightTip) {
                        this.switchMetricsRightType = setting.rightTip;
                    }
                } else {
                    if (item.type) {
                        this.switchMetricsLeftType = item.type;
                    } else {
                        this.switchMetricsLeftType = item;
                    }
                }
                this.metricsLeftIndex = index;
                let type = this.switchMetricsRightType;
                let data = '';
                if (type !== item.type) {
                    data = this.yAxisLeft;
                }
                if (type === item.type && this.yAxisRight.length > 0) {
                    data = this.yAxisLeft.concat(this.yAxisRight);
                }
                this.switchMetricCommon(data, 'left')
            },
            switchMetricsRightChartType(item, index) {
                if (this.mountedTip) {
                    this.switchMetricsRightType = item.type;
                    let setting = this.editItemState.comp.componentMeta.chartSettings;
                    if (setting.leftTip) {
                        this.switchMetricsLeftType = setting.leftTip;
                    }
                } else {
                    if (item.type) {
                        this.switchMetricsRightType = item.type;
                    } else {
                        this.switchMetricsRightType = item;
                    }
                }
                this.metricsRightIndex = index;
                let type = this.switchMetricsLeftType;
                let data = '';
                if (type !== item.type) {
                    data = this.yAxisRight;
                }
                if (type === item.type) {
                    data = this.yAxisRight.concat(this.yAxisLeft);
                }
                this.switchMetricCommon(data, 'right')
            },
            yAxisRightData() {
                if (this.yAxisRight) {
                    let obj = {right: []};
                    let filter = this.yAxisRight.map(yItem => {
                        return yItem.field;
                    });
                    obj.right = filter;
                    this.$set(this.dataOption.chartSettings, 'axisSite', obj);
                }
            },
            setStackType(lineArr, barArr, tip) {
                const chartSettings = this.dataOption.chartSettings;
                let leftType = this.switchMetricsLeftType;
                let rightType = this.switchMetricsRightType;
                barArr.push(lineArr);
                if (barArr && barArr.length > 0) {
                    chartSettings.stack = {[barArr[0]]: barArr};
                    if (tip === 'left') {
                        if (leftType !== 'ct-stack-bar' && rightType !== 'ct-stack-bar') {
                            this.cloneLeftStack = chartSettings.stack;
                        }
                    }
                    if (tip === 'right') {
                        if (leftType !== 'ct-stack-bar' && rightType !== 'ct-stack-bar') {
                            this.cloneRightStack = chartSettings.stack;
                        }
                    }
                    if (chartSettings.showLine) {
                        delete chartSettings.showLine;
                    }
                }
                this.$set(this.dataOption, 'chartSettings', chartSettings);
            },
            setLineType(lineArr, barArr, tip) {
                const chartSettings = this.dataOption.chartSettings;
                let leftType = this.switchMetricsLeftType;
                let rightType = this.switchMetricsRightType;
                barArr.push(lineArr);
                if (barArr && barArr.length > 0) {
                    chartSettings.showLine = barArr;
                    if (tip === 'left') {
                        if (leftType !== 'ct-line' && rightType !== 'ct-line') {
                            this.cloneLeftShowLine = chartSettings.showLine;
                        }
                    }
                    if (tip === 'right') {
                        if (leftType !== 'ct-line' && rightType !== 'ct-line') {
                            this.cloneRightShowLine = chartSettings.showLine;
                        }
                    }
                    if (chartSettings.stack) {
                        delete chartSettings.stack;
                    }
                }
                this.$set(this.dataOption, 'chartSettings', chartSettings);
            },
            switchMetricCommon(data, tip) {
                const chartSettings = this.dataOption.chartSettings;
                let leftType = this.switchMetricsLeftType;
                let rightType = this.switchMetricsRightType;
                /*左轴*/
                if (leftType === 'ct-bar') {
                    // TODO bar类型转换问题
                    if (chartSettings.showLine) {
                        delete chartSettings.showLine;
                    }
                    if (rightType === 'ct-line') {
                        this.$set(this.dataOption.chartSettings, 'showLine', this.cloneRightShowLine);
                    }
                    if (chartSettings.stack) {
                        delete chartSettings.stack;
                    }
                    if (rightType === 'ct-stack-bar') {
                        this.$set(chartSettings, 'stack', this.cloneRightStack);
                    }
                    this.$set(this.dataOption.chartSettings, 'leftTip', 'ct-bar');
                }
                if (leftType === 'ct-line') {
                    //保存左轴的showline
                    const leftItem = this.yAxisLeft.map(item => {
                        return item.field
                    });
                    this.cloneLeftShowLine = leftItem;
                    this.$set(chartSettings, 'showLine', this.cloneLeftShowLine);
                    if (data && data.length > 0) {
                        const [lineItem, ...barItem] = data.map(item => {
                            return item.field
                        });
                        this.setLineType(lineItem, barItem, tip);
                        //保存右轴的showline
                        if (rightType === 'ct-line') {
                            const rightItem = this.yAxisRight.map(item => {
                                return item.field
                            });
                            this.cloneRightShowLine = rightItem;

                            let yData = this.yAxisLeft.concat(this.yAxisRight);
                            const newRightItem = yData.map(item => {
                                return item.field
                            });
                            this.$set(chartSettings, 'showLine', newRightItem);
                        }
                        if (rightType === 'ct-stack-bar') {
                            this.$set(chartSettings, 'stack', this.cloneRightStack);
                        }
                        if (rightType === 'ct-bar') {
                            if (chartSettings.showLine) {
                                delete chartSettings.showLine;
                            }
                            if (chartSettings.stack) {
                                delete chartSettings.stack;
                            }
                        }
                        this.$set(this.dataOption.chartSettings, 'leftTip', 'ct-line');
                    }
                }
                if (leftType === 'ct-stack-bar') {
                    let leftItem = this.yAxisLeft.map(item => {
                        return item.field
                    });
                    this.cloneLeftStack = {[leftItem[0]]: leftItem};
                    this.$set(chartSettings, 'stack', this.cloneLeftStack);
                    if (data && data.length > 0) {
                        const [lineItem, ...barItem] = data.map(item => {
                            return item.field
                        });
                        this.setStackType(lineItem, barItem, tip);
                        //保存右轴的stack
                        if (rightType === 'ct-stack-bar') {
                            let rightItem = this.yAxisRight.map(item => {
                                return item.field
                            });
                            this.cloneRightStack = {[rightItem[0]]: rightItem};
                            let yData = this.yAxisLeft.concat(this.yAxisRight);
                            let newRightItem = yData.map(item => {
                                return item.field
                            });
                            let data = {[newRightItem[0]]: newRightItem};
                            this.$set(chartSettings, 'stack', data);
                        }
                        if (rightType === 'ct-line') {
                            this.$set(chartSettings, 'showLine', this.cloneRightShowLine);
                        }
                        this.$set(this.dataOption.chartSettings, 'leftTip', 'ct-stack-bar');
                    }
                }
                /*右轴*/
                if (rightType === 'ct-bar') {
                    if (chartSettings.showLine) {
                        delete chartSettings.showLine;
                    }
                    if (leftType === 'ct-line') {
                        this.$set(chartSettings, 'showLine', this.cloneLeftShowLine);
                    }
                    if (chartSettings.stack) {
                        delete chartSettings.stack;
                    }
                    if (leftType === 'ct-stack-bar') {
                        this.$set(chartSettings, 'stack', this.cloneLeftStack);
                    }
                    this.$set(this.dataOption.chartSettings, 'rightTip', 'ct-bar');

                }
                if (rightType === 'ct-line') {
                    //保存右轴的showline
                    const rightItem = this.yAxisRight.map(item => {
                        return item.field
                    });
                    this.cloneRightShowLine = rightItem;

                    if (data && data.length > 0) {
                        const [lineItem, ...barItem] = data.map(item => {
                            return item.field
                        });
                        this.setLineType(lineItem, barItem, tip);
                        //保存左轴的showline
                        if (leftType === 'ct-line') {
                            const leftItem = this.yAxisLeft.map(item => {
                                return item.field
                            });
                            this.cloneLeftShowLine = leftItem;
                            let yData = this.yAxisRight.concat(this.yAxisLeft);
                            const newYData = yData.map(item => {
                                return item.field
                            });
                            this.$set(chartSettings, 'showLine', newYData);
                        }
                        if (leftType === 'ct-stack-bar') {
                            this.$set(chartSettings, 'stack', this.cloneLeftStack);
                        }
                        if (leftType === 'ct-bar') {
                            if (chartSettings.showLine) {
                                delete chartSettings.showLine;
                            }
                            this.$set(chartSettings, 'showLine', this.cloneRightShowLine);
                            if (chartSettings.stack) {
                                delete chartSettings.stack;
                            }
                        }
                        this.$set(this.dataOption.chartSettings, 'rightTip', 'ct-line');
                    }
                }
                if (rightType === 'ct-stack-bar') {
                    let rightItem = this.yAxisRight.map(item => {
                        return item.field
                    });
                    this.cloneRightStack = {[rightItem[0]]: rightItem};
                    this.$set(chartSettings, 'stack', this.cloneRightStack);
                    if (data && data.length > 0) {
                        const [lineItem, ...barItem] = data.map(item => {
                            return item.field
                        });
                        this.setStackType(lineItem, barItem, tip);
                        //保存左轴各自的stack
                        if (leftType === 'ct-stack-bar') {
                            let leftItem = this.yAxisLeft.map(item => {
                                return item.field
                            });
                            this.cloneLeftStack = {[leftItem[0]]: leftItem};
                            let yData = this.yAxisRight.concat(this.yAxisLeft);
                            let newLeftItem = yData.map(item => {
                                return item.field
                            });
                            let data = {[newLeftItem[0]]: newLeftItem};
                            this.$set(chartSettings, 'stack', data);
                        }
                        if (leftType === 'ct-line') {
                            this.$set(chartSettings, 'showLine', this.cloneLeftShowLine);
                        }
                        if (leftType === 'ct-bar') {
                            if (chartSettings.stack) {
                                delete chartSettings.stack;
                            }
                            this.$set(chartSettings, 'stack', this.cloneRightStack);
                        }
                        this.$set(this.dataOption.chartSettings, 'rightTip', 'ct-stack-bar');
                    }
                }
                this.initChartData(this.xAxis, this.yAxis, this.filter, this.editItemType);
            },
            handleNodeClick(data, checked) {
                if (checked === true) {
                    this.checkedId = data.id;
                    this.$refs.dataSetTree.setCheckedKeys([data.id]);
                } else {
                    if (this.checkedId == data.id) {
                        this.$refs.dataSetTree.setCheckedKeys([data.id]);
                    }
                }
            },
            dataCount() {
                this.$set(this.dataOption, 'dataCount', this.inputDisplay)
            },
            dataSetIdLeft(val) {
                this.dataSourceId = val;
            },
            closeEditDialog(val) {
                this.filterDialog = val;
            },
            typeAxisDataList(type) {
                if (this.notMounted) {
                    if (type === 'ct-line-bar') {
                        this.axisDataList = this.doubleLineAxisList;
                        this.doubleAxisValues();
                    } else {
                        this.axisDataList = this.axisList;
                        this.axisValues();
                    }
                } else {
                    if (type === 'ct-line-bar') {
                        this.axisDataList = this.doubleAxisListMounted;
                        this.doubleAxisValues();
                    } else {
                        this.axisDataList = this.axisListMounted;
                        this.axisValues();
                    }
                }
                if (!this.dataSourceId) {
                    this.axisDataList.forEach(item => {
                        item.axisData = [];
                    })
                }
            },
            mountedAxis(type, metaDate) {
                let list = [];
                if (type !== 'ct-line-bar') {
                    list.push(metaDate.xFields);
                    list.push(metaDate.metrics);
                    if (metaDate.filter && metaDate.filter.cond.length > 0) {
                        list.push(metaDate.filter);
                    }
                    if (list.length > 0) {
                        this.$set(this.axisList[0], 'axisData', list[0]);
                        this.$set(this.axisList[1], 'axisData', list[1]);
                        if (list.length >= 3) {
                            this.$set(this.axisList[2], 'axisData', list[2]);
                        }
                        this.axisListMounted = this.$lodash.cloneDeep(this.axisList);
                    }
                } else {
                    if (metaDate.metrics && metaDate.metrics.length > 0) {
                        let left = metaDate.metrics.filter(item => item.yTip === 'left');
                        let right = metaDate.metrics.filter(item => item.yTip !== 'left');
                        list.push(left);
                        list.push(right);
                        if (metaDate.filter && metaDate.filter.cond.length > 0) {
                            list.push(metaDate.filter);
                        }
                        if (list.length > 0) {
                            this.$set(this.doubleLineAxisList[0], 'axisData', list[0]);
                            this.$set(this.doubleLineAxisList[1], 'axisData', list[1]);
                            this.$set(this.doubleLineAxisList[2], 'axisData', list[2]);
                            if (list.length >= 4) {
                                this.$set(this.doubleLineAxisList[3], 'axisData', list[3]);
                            }
                            this.doubleAxisListMounted = this.$lodash.cloneDeep(this.doubleLineAxisList);
                        }
                    }
                }
            },
            doubleAxisValues() {
                this.xAxis = this.axisDataList[0].axisData;
                this.yAxisLeft = this.axisDataList[1].axisData;
                this.yAxisRight = this.axisDataList[2].axisData;
            },
            axisValues() {
                this.xAxis = this.axisDataList[0].axisData;
                this.yAxis = this.axisDataList[1].axisData;
            },
            orderCommon(field) {
                this.axisList.forEach(aItem => {
                    if (aItem.axisData.length > 0) {
                        for (var i = 0; i < aItem.axisData.length; i++) {
                            if (aItem.axisData[i].field !== field) {
                                if (aItem.axisData[i].isAscending) {
                                    aItem.axisData[i].isAscending = false;
                                }
                                if (aItem.axisData[i].isDescending) {
                                    aItem.axisData[i].isDescending = false;
                                }
                                if (aItem.axisData[i].order) {
                                    delete aItem.axisData[i].order;
                                }
                            }
                        }
                    }
                });
            },
            hideDataFormatterDia(val) {
                this.dataFormatterDia = val
            },
            getFormatterInfo(val) {
                this.formatterInfoTemp = val
            },
            panelChange(index, name, element, axisIndex) {
                this.curElement = element
                if (name[0] == "dataFormatter") {
                    this.dataFormatterDia = true
                } else {
                    this.dataFormatterDia = false
                }
                let indexAxisData = this.axisDataList[axisIndex].axisData;
                //排序
                let data = name;
                let newYAxisItem = indexAxisData[index];
                let field = indexAxisData[index].field;
                this.$store.commit('changeYField', newYAxisItem.field);
                this.$store.commit('changeYType', newYAxisItem.typeName);
                if (data.length >= 2 && data[0] === 'order') {
                    if (data[1] === 'riseOrder') {
                        newYAxisItem.isAscending = true;
                        newYAxisItem.order = 'ascending';
                        indexAxisData.splice(index, 1, newYAxisItem);
                        this.orderCommon(field);
                        this.$store.commit('changeYRiseOrder', true);
                        this.$store.commit('changeXRiseOrder', false);
                        this.$store.commit('changeXRiseOrder', false);
                    } else {
                        newYAxisItem.isAscending = false;
                        indexAxisData.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYRiseOrder', false);
                    }
                    if (data[1] === 'dropOrder') {
                        newYAxisItem.isDescending = true;
                        newYAxisItem.order = 'descending';
                        indexAxisData.splice(index, 1, newYAxisItem);
                        this.orderCommon(field);
                        this.$store.commit('changeYDropOrder', true);
                        this.$store.commit('changeXDropOrder', false);
                        this.$store.commit('changeXRiseOrder', false);
                    } else {
                        newYAxisItem.isDescending = false;
                        indexAxisData.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYDropOrder', false);
                    }
                    if (data[1] === 'normal') {
                        newYAxisItem.isDescending = false;
                        newYAxisItem.isAscending = false;
                        this.orderCommon(field);
                        newYAxisItem.order = 'default';
                        this.$store.commit('changeYRiseOrder', false);
                        this.$store.commit('changeYDropOrder', false);
                    }

                } else {
                    newYAxisItem.isDescending = false;
                    newYAxisItem.isAscending = false;
                    this.$store.commit('changeYDropOrder', false);
                    this.$store.commit('changeYRiseOrder', false);
                }
                //删除指标
                if (data[0] === 'deleteFiled') {
                    indexAxisData.splice(index, 1);
                }
                let mapNum = new Map();
                let mapDate = new Map();
                for (let num in this.axisNumOptions) {
                    mapNum.set(num, this.axisNumOptions[num]);
                }
                for (let date in this.axisDateOptions) {
                    mapDate.set(date, this.axisDateOptions[date]);
                }
                //高级计算
                if (data.length >= 2 && data[1] === 'proportion') {
                    let option = mapNum.get('proportion');
                    this.$set(indexAxisData[index], 'hasPercent', true);
                    indexAxisData[index]['hasPercentName'] = '-' + option;
                }
                if (data.length >= 2 && data[1] === 'none') {
                    this.$set(indexAxisData[index], 'hasPercent', false);
                    if (data.length >= 2 && indexAxisData[index]['hasPercentName']) {
                        indexAxisData[index]['hasPercentName'] = indexAxisData[index]['hasPercentName'].split('-')[0];
                    }
                }
                //汇总方式
                var option = '';
                if (data.length >= 2 && data[0] === 'op') {
                    if (indexAxisData[index].typeName === 'number') {
                        option = mapNum.get(data[1]);
                        this.$set(indexAxisData[index], 'op', data[1]);
                        this.$set(indexAxisData[index], 'opName', option);
                    }
                    if (indexAxisData[index].typeName === 'text' || indexAxisData[index].typeName === 'date') {
                        option = '计数';
                        this.$set(indexAxisData[index], 'op', 'count');
                        indexAxisData[index]['opName'] = option;
                    }
                }
                if (data.length >= 2 && data[0] === 'groupRule') {
                    if (indexAxisData[index].typeName === 'date') {
                        option = mapDate.get(data[1]);
                        this.$set(indexAxisData[index], 'groupRule', data[1]);
                        indexAxisData[index]['groupRuleName'] = option;
                    }
                }
                //修改显示名称
                this.headerName = newYAxisItem.headerName;
                if (data.length > 0 && data[0].indexOf('updateName') > -1) {
                    this.$set(newYAxisItem, 'isEdit', true);
                }
                this.$app.runCmd('checkedIndex', index, element);
                //修改筛选条件
                if (data[0] === 'updateFiled') {
                    this.filterDialog = true;
                }
            },
            closeAxisData(axisIndex, index) {
                if (this.axisDataList[axisIndex].axisData.cond) {
                    this.axisDataList[axisIndex].axisData.cond.splice(index, 1);
                } else {
                    this.axisDataList[axisIndex].axisData.splice(index, 1);
                }
                this.iconList.filter((iconItem, iconIndex) => {
                    if (iconItem.disable) {
                        this.$set(this.iconList[iconIndex], 'disable', false);
                    }
                })
            },
            textAdd(item, data) {
                if (this.editItemType == "pivot-grid") {
                    this.getPivotData(data)
                }
                if (!data) {
                    this.$set(data, 'axisData', []);
                } else {
                    this.$emit('getPivotData', data)
                }
                /* if (item.label === "过滤条件") {
                     this.isEndDraggable = true;
                     console.log('this.isEndDraggable', this.isEndDraggable)
                 }*/
            },
            handleCheckAllChange(val) {
                this.checkedCharts = val ? this.chartsOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.chartsList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.chartsList.length;
            }
        },
        mounted() {
            this.$app.registerCmd("cancelEditCmd", this.cancelEdit);
            this.$app.registerCmd("saveChartCmd", this.saveChart);
            this.$app.registerCmd("updateChartLabelCmd", this.updateLabel);
            this.$app.registerCmd("checkedIndex", this.checkedIndex);
            this.mountedTip = true;
            this.notMounted = false;
            this.editItemData();
            if (this.axisDataList && this.axisDataList.length > 0) {
                this.axisDataList.forEach((item, index) => {
                    if (typeof item.axisData == 'undefined') {
                        this.$set(this.axisDataList[index], 'axisData', []);
                    }
                })
            }
        },
        computed: {
            chartHeight() {
                if (this.editItemType == "pivot-grid") {
                    return "calc(100% - 50px)"
                } else {
                    return "400px"
                }
            },
            chartWidth() {
                if (this.editItemType == "pivot-grid") {
                    return "100%"
                } else {
                    return "calc(100% - 40px)"
                }
            },
            chartMargin() {
                return "0 auto"
            },
            editItemState() {
                return this.$store.state.editItem
            },
            lineBarAxis() {
                let data = [];
                if ((this.yAxisLeft && this.yAxisLeft.length > 0) || (this.yAxisRight && this.yAxisRight.length > 0)) {
                    data = this.yAxisLeft.concat(this.yAxisRight);
                } else {
                    data = this.yAxis;
                }
                return data;
            },
            xAxisLength() {
                if (this.editItemType === 'pivot-grid') {
                    let lengthLeft = 0;
                    let lengthRight = 0;
                    let length = 0;
                    lengthLeft = this.axisDataList[0].axisData.length;
                    lengthRight = this.axisDataList[1].axisData.length;
                    length = parseInt(lengthLeft) + parseInt(lengthRight);
                    return length > 2 ? 'multiple' : length;
                } else {
                    return this.axisDataList[0].axisData.length > 2 ? 'multiple' : this.axisDataList[0].axisData.length
                }
            },
            yAxisLength() {
                if (this.editItemType === 'ct-line-bar') {
                    let lengthLeft = 0;
                    let lengthRight = 0;
                    let length = 0;
                    lengthLeft = this.yAxisLeft.length;
                    lengthRight = this.yAxisRight.length;
                    length = parseInt(lengthLeft) + parseInt(lengthRight);
                    return length > 1 ? 'multiple' : length;
                } else {
                    return this.axisDataList[1].axisData.length > 1 ? 'multiple' : this.axisDataList[1].axisData.length
                }
            },
        },
        watch: {
            xAxis: {
                handler(val) {
                    this.$store.commit("changeXlist", val)
                    // this.createChart();
                    this.gridParams.xFields = [];
                    if (val != undefined) {
                        if (this.editType == 'grid' && val.length >= 1) {
                            for (let v of val) {
                                let xItem = {}
                                xItem.field = v.field
                                xItem.typeName = v.typeName
                                this.gridParams.xFields.push(xItem)
                            }
                            if (this.filter.length >= 1) {
                                this.gridParams.filter = this.filterCond
                            }
                            this.getGridDetail()
                        }
                    }
                }
                ,
                deep: true,
                immediate:
                    true
            },
            yAxis: function (newVal) {
                this.$store.commit("changeYlist", newVal)
                /* if (!this.$lodash.isEqual(newVal, oldVal)) {
                     this.createChart();
                 }*/
            },
            filter: function (val, oldVal) {
                /*表格事件处理*/
                if (this.editType === 'grid') {
                    if (val.length > oldVal.length) {
                        let temp = {}
                        for (let i = 0; i < val.length; i++) {
                            if (oldVal.indexOf(val[i]) == -1) {
                                temp = val[i]
                            }
                        }
                        this.filterType = temp.typeName;
                        this.filterLabel = temp.headerName;
                        if (temp.typeName == 'date' || temp.typeName == 'number' || temp.typeName == 'text') {
                            // this.filterDialog = !this.filterDialog
                        }
                    } else {
                        this.filterDialog = false;
                        this.addFilterCond();
                        this.getGridDetail();
                    }
                } else {
                    /*图表事件处理*/
                    this.createChart();
                    this.cond = val;
                    if (val.length > oldVal.length) {
                        let temp = {};
                        for (let i = 0; i < val.length; i++) {
                            if (oldVal.indexOf(val[i]) == -1) {
                                temp = val[i];
                                /*当前选中的过滤条件tag,初始添加filter字段时的index*/
                                this.filterOptionIndex = i;
                            }
                        }
                        this.tempField = temp.field;
                        this.filterType = temp.typeName;
                        this.filterLabel = temp.headerName;
                        this.filterField = temp.field;
                        this.filterDialog = !this.filterDialog;
                    } else {
                        this.filterDialog = false;
                    }
                }
            },
            lineBarAxis: function (val) {
                this.yAxis = val;
            },
            editItemType: {
                handler(val, oldVal) {
                    if (val == "pivot-grid") {
                        this.axisDataList = dataConfData.pivotList
                    } else if (val == "static-grid") {
                        this.axisDataList = dataConfData.staticList
                    } else {
                        this.typeAxisDataList(val);
                    }
                    if (oldVal == "pivot-grid" && val != oldVal) {
                        this.axisDataList[0].axisData = this.dimRow.concat(this.dimCol)
                        if (val != "ct-line-bar") {
                            this.axisDataList[1].axisData = this.pivotIndex
                        } else {
                            this.axisDataList[1].axisData = [this.pivotIndex[0]]
                            this.axisDataList[2].axisData = [...this.pivotIndex.unshift()]
                        }
                    }
                    if (val == "pivot-grid" && val != oldVal) {
                        this.dimRow = this.axisDataList[0].axisData
                        if (oldVal == "ct-line-bar") {
                            this.pivotIndex = this.axisDataList[1].axisData.concat(this.axisDataList[2].axisData)
                        } else {
                            this.pivotIndex = this.axisDataList[1].axisData
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            axisList: {
                handler(val) {
                    this.xAxis = val[0].axisData;
                    this.yAxis = val[1].axisData;
                    this.axisList[0].axisData = val[0].axisData;
                    this.axisList[1].axisData = val[1].axisData;
                    if (val.length >= 3) {
                        this.axisList[2].axisData = val[2].axisData;
                        this.filter = val[2].axisData;
                    }
                    this.createChart();
                },
                deep: true,
            },
            doubleLineAxisList: {
                handler(val) {
                    if (val[1].axisData && val[1].axisData.length > 0) {
                        val[1].axisData.forEach(item => {
                            this.$set(item, 'yTip', 'left');
                        });
                    }
                    if (val[2].axisData && val[2].axisData.length > 0) {
                        val[2].axisData.forEach(item => {
                            this.$set(item, 'yTip', 'right');
                        });
                    }
                    if ((val[1].axisData && val[1].axisData.length > 0) || (val[2].axisData && val[2].axisData.length > 0)) {
                        this.yAxis = val[1].axisData.concat(val[2].axisData);
                    }
                    this.xAxis = val[0].axisData;
                    this.axisList[1].axisData = this.yAxis;
                    this.axisList[0].axisData = this.xAxis;
                    if (this.leftList.length > 0 || this.rightList.length > 0) {
                        this.yAxisLeft = this.leftList;
                        this.yAxisRight = this.rightList;
                    } else {
                        this.yAxisLeft = val[1].axisData;
                        this.yAxisRight = val[2].axisData;
                    }
                    if (val.length >= 4) {
                        this.filter = val[3].axisData;
                    }
                    if (this.doubleLineTip) {
                        if (this.metricsLeftIndex === -1 && this.metricsRightIndex === -1) {
                            this.switchMetricsLeftChartType('ct-bar', 0);
                            this.switchMetricsRightChartType('ct-line', 1);
                        }
                    }
                    /*新建一个双轴图时，默认右轴折线*/
                    if (this.metricsRightIndex === 1) {
                        this.switchMetricsRightChartType('ct-line', 1);
                    }
                    this.createChart();
                    this.yAxisRightData();
                }
                ,
                deep: true
            },
            axisDataList: {
                handler(val, old) {
                    if (this.editItemType != "pivot-grid") {
                        this.notMounted = true;
                        if (!this.$lodash.isEqual(val, old)) {
                            this.typeAxisDataList(this.editItemType);
                        }
                        /*其他类型—处理指标数据:指标左:[0]；指标右除索引0之外的所有数据*/
                        let dataList = [];
                        if (val.length === 3) {
                            this.xAxisList = [];
                            this.leftList = [];
                            this.rightList = [];
                            if (this.axisList[1].axisData && this.axisList[1].axisData.length > 0) {
                                dataList = this.$lodash.cloneDeep(this.axisList[1].axisData);
                                dataList.splice(0, 1);
                            }
                            if (this.axisList[1].axisData && this.axisList[1].axisData[0]) {
                                this.leftList.push(this.axisList[1].axisData[0]);
                            }
                            this.rightList = dataList;
                            this.xAxisList = this.axisList[0].axisData;
                            /* if (val[2].axisData && val[2].axisData.length > 0) {
                                 this.filter = val[2].axisData;
                                 this.filterCondData = this.filter.cond;
                                 this.axisList[2].axisData = this.filter;
                             }*/
                        }
                        /*双轴图—其他类型切换到双轴图时更新指标左右数据*/
                        if (val.length === 4) {
                            if (this.leftList.length > 0 || this.rightList.length > 0) {
                                this.yAxisLeft = this.leftList;
                                this.yAxisRight = this.rightList;
                                this.xAxis = this.xAxisList;
                                this.doubleLineAxisList[0].axisData = this.xAxisList;
                                this.doubleLineAxisList[1].axisData = this.leftList;
                                this.doubleLineAxisList[2].axisData = this.rightList;
                                /* if (val[3].axisData && val[3].axisData.length > 0) {
                                     this.filter = val[3].axisData;
                                     this.doubleLineAxisList[3].axisData = this.filter;
                                     this.filterCondData = this.filter.cond;
                                 }*/
                                // TODO  filter类型问题（
                                //  filter：{
                                // cond:[]
                                //  }
                                //  ）
                                this.leftList = [];
                                this.rightList = [];
                                this.xAxisList = [];
                            } else {
                                this.yAxisLeft = val[1].axisData;
                                this.yAxisRight = val[2].axisData;
                            }
                        }
                        this.createChart();
                    }
                },
                deep: true
            },
            isUpdate: {
                handler() {
                    if (this.compName == "pivot-grid") {
                        this.isUpdate = true
                    }
                },
                deep: true,
                immediate: true
            },
            compOptionData: {
                handler(val, old) {
                    if (JSON.stringify(old) !== '{}') {
                        this.$app.runCmd('cancelTip', true)
                    }
                },
                deep: true
            }
        }
    }
</script>
