<template>
    <div>
        <!--维度-->
        <div class="chart-axis">
            <div class="row xAxis-style">
                <div style="margin-left: 10px;white-space: nowrap;" v-if="editType == 'chart'">维度&nbsp;</div>
                <div style="margin-left: 10px;" v-if="editType == 'grid'">显示字段
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-button class="el-icon-plus"
                                       style="border: none; padding: 2px 5px;font-weight: 700;"></el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in columnDefsList"
                                              :key="index"
                                              style="width: 150px; text-align: center;"
                                              :value="item.headerName"
                                              @click.native="addColumn(item)">
                                {{item.headerName}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div style="border:none;">
                    <draggable v-model="xAxis" :options="{group:{name:'list'}}" class="content-center">
                        <el-tag class="xAxisTag" :key="element.field"
                                v-for="(element,index) in xAxis"
                                closable
                                @close="closeXAxis(index, element)"
                                @click="cascadeContent(element)"
                                style="margin-right:5px;margin-bottom: 6px">
                            <i class="icon el-icon-arrow-down" style="marigin-right: 5px"></i>
                            <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
                               style="margin-right: 5px"></i>
                            <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
                               style="margin-right: 5px"></i>
                            {{element.headerName}}
                            <span v-if="element.typeName==='date' && !element.groupRuleName">(年-月)</span>
                            <span v-if="element.typeName==='date' && element.groupRuleName">({{element.groupRuleName}})</span>
                            <el-cascader-panel
                                    ref="xAxisCascaderPanel"
                                    v-model="xAxisPanelName"
                                    @change="xAxisChange(index)"
                                    :clearable="true"
                                    :options="element.typeName ==='date' ? xAxisDataOptions:xAxisOptions ">
                            </el-cascader-panel>
                            <div class="edit-name" v-if="element.isEdit">
                                <div class="text">
                                    <el-input v-model="headerName">{{element.headerName}}</el-input>
                                </div>
                                <div class="btn">
                                    <el-button plain @click="xCloseEdit(element,index)">取消</el-button>
                                    <el-button type="primary" @click="xSaveEditName(element,headerName,index)">确定
                                    </el-button>
                                </div>
                            </div>
                        </el-tag>
                    </draggable>
                </div>
            </div>
        </div>
        <!--指标-->
        <div class="chart-axis" v-if="editType == 'chart' && editItemType!=='ct-line-bar'">
            <div class="row yAxis-style">
                <div style="margin-left: 10px;white-space: nowrap;">指标&nbsp;</div>
                <div style="border: none" id="axis-two">
                    <draggable v-model="yAxis" :options="{group:{name:'list'}}" class="content-center">
                        <template v-for="(element,index) in yAxis">
                            <el-tag class="yAxisTag" :key="element.field" closable @close="closeYAxis(index, element)"
                                    style="margin-right:5px;margin-bottom: 6px">
                                <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
                                <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
                                   style="margin-right: 5px"></i>
                                <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
                                   style="margin-right: 5px"></i>
                                {{element.headerName}}
                                <span v-if="!element.op && element.typeName!=='number'">(计数</span>
                                <span v-if="!element.op && element.typeName==='number'">(求和</span>
                                <span v-if="element.op">({{element.opName}}</span>
                                <span>{{element.hasPercentName}})</span>
                                <el-cascader-panel
                                        ref="yAxisCascaderPanel"
                                        v-model="yAxisPanelName"
                                        @change="yAxisChange(index)"
                                        :options="element.typeName ==='number' ? yAxisNumOptions:yAxisDataOptions ">
                                </el-cascader-panel>
                                <div class="edit-name" v-if="element.isEdit">
                                    <div class="text">
                                        <el-input v-model="headerName">{{element.headerName}}</el-input>
                                    </div>
                                    <div class="btn">
                                        <el-button plain @click="yCloseEdit(element,index)">取消</el-button>
                                        <el-button type="primary" @click="ySaveEditName(element,headerName,index)">确定
                                        </el-button>
                                    </div>
                                </div>
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <!--指标(左)-->
        <div class="chart-axis" v-if="editType == 'chart' && editItemType==='ct-line-bar'">
            <div class="row yAxis-style">
                <div style="margin-left: 10px;white-space: nowrap;">指标(左)&nbsp;
                </div>
                <div style="border: none">
                    <draggable ref="leftAxisDrag" v-model="yAxisLeft" :options="{group:{name:'list'}}"
                               class="content-center"
                               @add="addHandleLeft">
                        <template v-for="(element,index) in yAxisLeft">
                            <el-tag class="yAxisTag" :key="element.field" closable
                                    @close="closeYAxisLeft(index, element)"
                                    style="margin-right:5px;margin-bottom: 6px">
                                <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
                                <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
                                   style="margin-right: 5px"></i>
                                <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
                                   style="margin-right: 5px"></i>
                                {{element.headerName}}
                                <span v-if="!element.op && element.typeName!=='number'">(计数</span>
                                <span v-if="!element.op && element.typeName==='number'">(求和</span>
                                <span v-if="element.op">({{element.opName}}</span>
                                <span>{{element.hasPercentName}})</span>
                                <el-cascader-panel
                                        ref="yAxisCascaderPanelLeft"
                                        v-model="yAxisLeftPanelName"
                                        @change="yAxisLeftChange(index)"
                                        :options="element.typeName ==='number' ? yAxisNumOptions:yAxisDataOptions ">
                                </el-cascader-panel>
                                <div class="edit-name" v-if="element.isEdit">
                                    <div class="text">
                                        <el-input v-model="headerName">{{element.headerName}}</el-input>
                                    </div>
                                    <div class="btn">
                                        <el-button plain @click="yCloseEdit(element,index)">取消</el-button>
                                        <el-button type="primary" @click="ySaveEditName(element,headerName,index)">确定
                                        </el-button>
                                    </div>
                                </div>
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <!--指标(右)-->
        <div class="chart-axis" v-if="editType == 'chart' && editItemType==='ct-line-bar'">
            <div class="row yAxis-style">
                <div style="margin-left: 10px;white-space: nowrap;">指标(右)&nbsp;
                </div>
                <div style="border: none">
                    <draggable v-model="yAxisRight" :options="{group:{name:'list'}}"
                               @add="addHandleRight"
                               class="content-center">
                        <template v-for="(element,index) in yAxisRight">
                            <el-tag class="yAxisTag" :key="element.field" closable
                                    @close="closeYAxisRight(index, element)"
                                    style="margin-right:5px;margin-bottom: 6px">
                                <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
                                <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
                                   style="margin-right: 5px"></i>
                                <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
                                   style="margin-right: 5px"></i>
                                {{element.headerName}}
                                <span v-if="!element.op && element.typeName!=='number'">(计数</span>
                                <span v-if="!element.op && element.typeName==='number'">(求和</span>
                                <span v-if="element.op">({{element.opName}}</span>
                                <span>{{element.hasPercentName}})</span>
                                <el-cascader-panel
                                        ref="yAxisCascaderPanelRight"
                                        v-model="yAxisRightPanelName"
                                        @change="yAxisRightChange(index)"
                                        :options="element.typeName ==='number' ? yAxisNumOptions:yAxisDataOptions ">
                                </el-cascader-panel>
                                <div class="edit-name" v-if="element.isEdit">
                                    <div class="text">
                                        <el-input v-model="headerName">{{element.headerName}}</el-input>
                                    </div>
                                    <div class="btn">
                                        <el-button plain @click="yCloseEdit(element,index)">取消</el-button>
                                        <el-button type="primary" @click="ySaveEditName(element,headerName,index)">确定
                                        </el-button>
                                    </div>
                                </div>
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <!--过滤条件-->
        <div class="chart-axis">
            <div class="row filter-style">
                <div style="margin-left: 10px;white-space: nowrap;">过滤条件&nbsp;</div>
                <div style="border: none">
                    <draggable v-model="filter" :options="{group:{name:'list'}}" class="content-center">
                        <template v-for="(element,index) in filter">
                            <el-tag class="fAxisTag" :key="element.field" closable @close="closeFilter(index, element)"
                                    style="margin-right:5px;margin-bottom: 6px">
                                <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
                                <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
                                   style="margin-right: 5px"></i>
                                <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
                                   style="margin-right: 5px"></i>
                                {{element.headerName}}&nbsp;
                                <span v-if="!element.minFil && !element.startDateTime">{{element.numLabel}}</span>&nbsp;
                                <span v-if="element.numLabelValue">{{element.numLabelValue}}</span>&nbsp;
                                <!--                                <span v-if="element.checkList">{{element.checkList}}</span>&nbsp;-->
                                <span v-if="!element.dateTime">{{element.filterNum}}</span>&nbsp;
                                <span v-if="element.dateTime">{{element.dateTime}}</span>&nbsp;
                                <span v-if="element.minFil">在{{element.minFil}}到{{element.maxFil}}之间</span>
                                <span v-if="element.startDateTime">在{{element.startDateTime}}到{{element.endDateTime}}之间</span>
                                <el-cascader-panel
                                        ref="filterCascaderPanel"
                                        v-model="fAxisPanelName"
                                        @change="fAxisChange(index)"
                                        :options="filterOptions">
                                </el-cascader-panel>
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dataConf from '../../conf-section/dataConf';
    // import DataFormat from '../../../components/data-formater'

    export default {
        name: 'chart-axis',
        props: {
            editType: String,
            editItemType: String,
            columnDefsList: Array,
            xAxisParent: {type: Array},
            yAxisParent: {type: Array},
            filterParent: {type: Array},
            iconList: {type: Array},
        },
        data() {
            return {
                xAxis: [],
                yAxis: [],
                filter: [],
                showCascader: false,
                curCascader: {},
                xAxisOptions: dataConf.xAxisOptions,
                xAxisDataOptions: dataConf.xAxisDataOptions,
                yAxisDataOptions: dataConf.yAxisDataOptions,
                yAxisNumOptions: dataConf.yAxisNumOptions,
                filterOptions: dataConf.filterOptions,
                xAxisPanelName: '',
                yAxisPanelName: '',
                fAxisPanelName: '',
                headerName: '',
                yAxisLeft: [],
                yAxisRight: [],
                yAxisRightPanelName: '',
                yAxisLeftPanelName: '',
                onceTip: false,
            }
        },
        mounted() {
            this.onceTip = true;
        },
        methods: {
            removeByIndex(arry, index) {
                let sliced = arry.slice(index + 1);
                arry.length = index;
                arry.push.apply(arry, sliced);
            },
            remove(array, index, row) {
                this.removeByIndex(array, index);
                this.$emit('resetField', row);
            },
            closeXAxis(index) {
                this.showCascader = false;
                this.remove(this.xAxis, index);
                this.iconList.filter((iconItem, iconIndex) => {
                    if (iconItem.disable) {
                        this.$set(this.iconList[iconIndex], 'disable', false);
                    }
                })
            },
            closeYAxis(index) {
                this.showCascader = false;
                this.remove(this.yAxis, index);
            },
            closeYAxisLeft(index) {
                this.showCascader = false;
                this.remove(this.yAxisLeft, index);
            },
            closeYAxisRight(index) {
                this.showCascader = false;
                this.remove(this.yAxisRight, index);
            },
            closeFilter(index) {
                this.showCascader = false;
                this.remove(this.filter, index);
            },
            cascadeContent(element) {
                this.curCascader = element;
                this.$set(element, 'showCascader', true);
            },
            xAxisChange(index) {
                //排序
                let data = this.xAxisPanelName;
                let newXAxisItem = this.xAxis[index];
                this.$store.commit('changeXField', newXAxisItem.field);
                this.$store.commit('changeXType', newXAxisItem.typeName);
                if (data.length >= 2 && data[0] === 'order') {
                    data.forEach(dataItem => {
                        if (dataItem.indexOf('riseOrder') > -1) {
                            newXAxisItem.isAscending = true;
                            this.xAxis.splice(index, 1, newXAxisItem);
                            this.yAxis.forEach(yItem => {
                                if (yItem.isAscending) {
                                    yItem.isAscending = false;
                                }
                                if (yItem.isDescending) {
                                    yItem.isDescending = false;
                                }
                            });
                            this.$store.commit('changeXRiseOrder', true);
                            this.$store.commit('changeYRiseOrder', false);
                            this.$store.commit('changeYDropOrder', false);
                        } else {
                            newXAxisItem.isAscending = false;
                            this.xAxis.splice(index, 1, newXAxisItem);
                            this.$store.commit('changeXRiseOrder', false);
                        }
                        if (dataItem.indexOf('dropOrder') > -1) {
                            newXAxisItem.isDescending = true;
                            this.xAxis.splice(index, 1, newXAxisItem);
                            this.yAxis.forEach(yItem => {
                                if (yItem.isAscending) {
                                    yItem.isAscending = false;
                                }
                                if (yItem.isDescending) {
                                    yItem.isDescending = false;
                                }
                            });
                            this.$store.commit('changeXDropOrder', true);
                            this.$store.commit('changeYDropOrder', false);
                            this.$store.commit('changeYDropOrder', false);
                        } else {
                            newXAxisItem.isDescending = false;
                            this.xAxis.splice(index, 1, newXAxisItem);
                            this.$store.commit('changeXDropOrder', false);
                        }
                    })
                } else {
                    newXAxisItem.isDescending = false;
                    newXAxisItem.isAscending = false;
                    this.xAxis.splice(index, 1, newXAxisItem);
                    this.$store.commit('changeXDropOrder', false);
                    this.$store.commit('changeXRiseOrder', false);
                }
                //删除字段
                if (data[0] === 'deleteFiled') {
                    this.xAxisPanelName = [];
                    this.closeXAxis(index);
                }
                //汇总方式
                let xAxisOptions = {
                    year_quarter: '年-季',
                    year_month: '年-月',
                    year_week: '年-周',
                    year_month_day: '年-月-日',
                    year: '年'
                };
                let mapDate = new Map();
                for (let xDate in xAxisOptions) {
                    mapDate.set(xDate, xAxisOptions[xDate]);
                }
                if (this.xAxis[index].typeName === 'date') {
                    this.xAxis[index]['formater'] = "yyyy-MM-dd";
                    if (data.length >= 2) {
                        let option = mapDate.get(data[1]);
                        this.xAxis[index]['groupRule'] = data[1];
                        this.xAxis[index]['groupRuleName'] = option;
                    }
                }
                //修改显示名称
                this.headerName = newXAxisItem.headerName;
                if (data[0].indexOf('updateName') > -1) {
                    this.$set(newXAxisItem, 'isEdit', true);
                }
                this.xAxisPanelName = '';
            },
            yAxisChange(index) {
                //指标排序
                let data = this.yAxisPanelName;
                let newYAxisItem = this.yAxis[index];
                this.$store.commit('changeYField', newYAxisItem.field);
                this.$store.commit('changeYType', newYAxisItem.typeName);
                if (data.length >= 2 && data[0] === 'order') {
                    data.forEach(dataItem => {
                        if (dataItem.indexOf('riseOrder') > -1) {
                            newYAxisItem.isAscending = true;
                            this.yAxis.splice(index, 1, newYAxisItem);
                            this.xAxis.forEach(xItem => {
                                if (xItem.isAscending) {
                                    xItem.isAscending = false;
                                }
                                if (xItem.isDescending) {
                                    xItem.isDescending = false;
                                }
                            });
                            this.$store.commit('changeYRiseOrder', true);
                            this.$store.commit('changeXRiseOrder', false);
                            this.$store.commit('changeXRiseOrder', false);
                        } else {
                            newYAxisItem.isAscending = false;
                            this.yAxis.splice(index, 1, newYAxisItem);
                            this.$store.commit('changeYRiseOrder', false);
                        }
                        if (dataItem.indexOf('dropOrder') > -1) {
                            newYAxisItem.isDescending = true;
                            this.yAxis.splice(index, 1, newYAxisItem);
                            this.xAxis.forEach(xItem => {
                                if (xItem.isAscending) {
                                    xItem.isAscending = false;
                                }
                                if (xItem.isDescending) {
                                    xItem.isDescending = false;
                                }
                            });
                            this.$store.commit('changeYDropOrder', true);
                            this.$store.commit('changeXDropOrder', false);
                            this.$store.commit('changeXRiseOrder', false);
                        } else {
                            newYAxisItem.isDescending = false;
                            this.yAxis.splice(index, 1, newYAxisItem);
                            this.$store.commit('changeYDropOrder', false);
                        }
                        if (dataItem.indexOf('normal') > -1) {
                            newYAxisItem.isDescending = false;
                            newYAxisItem.isAscending = false;
                            this.$store.commit('changeYRiseOrder', false);
                            this.$store.commit('changeYDropOrder', false);
                        }
                    })
                } else {
                    newYAxisItem.isDescending = false;
                    newYAxisItem.isAscending = false;
                    this.$store.commit('changeYDropOrder', false);
                    this.$store.commit('changeYRiseOrder', false);
                }
                //删除指标
                if (data[0] === 'deleteFiled') {
                    this.yAxisPanelName = [];
                    this.closeYAxis(index);
                }
                let yAxisOptions = {
                    sum: '求和',
                    avg: '平均',
                    max: '最大值',
                    min: '最小值',
                    proportion: '占比',
                    count: '计数',
                };
                let mapDate = new Map();
                for (let yDate in yAxisOptions) {
                    mapDate.set(yDate, yAxisOptions[yDate]);
                }
                //高级计算
                if (data.length >= 2 && data[1] === 'proportion') {
                    let option = mapDate.get('proportion');
                    this.yAxis[index]['hasPercent'] = true;
                    this.yAxis[index]['hasPercentName'] = '-' + option;
                }
                if (data.length >= 2 && data[1] === 'none') {
                    this.yAxis[index]['hasPercent'] = false;
                    if (data.length >= 2 && this.yAxis[index]['hasPercentName']) {
                        this.yAxis[index]['hasPercentName'] = this.yAxis[index]['hasPercentName'].split('-')[0];
                    }
                }
                //汇总方式
                if (this.yAxis[index].typeName === 'number') {
                    if (data.length >= 2 && data[0] === 'op') {
                        let option = mapDate.get(data[1]);
                        this.yAxis[index]['op'] = data[1];
                        this.yAxis[index]['opName'] = option;
                    }
                }
                //修改显示名称
                this.headerName = newYAxisItem.headerName;
                if (data[0].indexOf('updateName') > -1) {
                    this.$set(newYAxisItem, 'isEdit', true);
                }
                //数据格式
                // if (data[0].indexOf('format') > -1) {
                //     this.$dialog.create({
                //         title: '数据格式',
                //         width: '500px',
                //         component: DataFormat,
                //         closeOnClickModal: true,
                //         showClose: true,
                //         args: {yAxisItem: newYAxisItem, actionOk: this.newYAxisData},
                //     })
                // }
                // this.yAxisChangeIndex = index;
                this.yAxisPanelName = '';
            },
            newYAxisData(params) {
                this.$set(this.yAxis[this.yAxisChangeIndex], params);
            },
            fAxisChange(index) {
                let data = this.fAxisPanelName;
                if (data[0] === 'deleteFiled') {
                    this.fAxisPanelName = [];
                    this.closeFilter(index);
                }
                /* 过滤条件-编辑条件*/
                if (data[0] === 'updateFiled') {
                    this.$emit('updateFilterOption');
                    this.showCascader = false;
                }
                this.fAxisPanelName = [];
                this.$app.runCmd('filterHoverIndex', index);
                this.fAxisPanelName = '';
            },
            addColumn(item) {
                this.xAxis.push(item)
            },
            addHandleLeft(e) {
                //TODO 拖拽效果
                if (this.yAxisLeft[e.newIndex]) {
                    const needYTip = !this.yAxisLeft[e.newIndex].yTip;
                    if (needYTip) {
                        this.$set(this.yAxisLeft[e.newIndex], 'yTip', 'left');
                    } else {
                        this.yAxisLeft[e.newIndex].yTip = 'left';
                    }
                }
            },
            addHandleRight(e) {
                //TODO 拖拽效果
                if (this.yAxisRight) {
                    const needYTip = !this.yAxisRight[e.newIndex].yTip;
                    if (needYTip) {
                        this.$set(this.yAxisRight[e.newIndex], 'yTip', 'right');
                    } else {
                        this.yAxisRight[e.newIndex].yTip = 'right';
                    }
                }
            },
            initLoad() {
                this.xAxis = this.xAxisParent;
                this.yAxis = this.yAxisParent;
                this.filter = this.filterParent;
            },
            xSaveEditName(element, headerName, index) {
                element.isEdit = false;
                element.headerName = headerName;
                if (this.$refs.xAxisCascaderPanel && this.$refs.xAxisCascaderPanel[index]) {
                    let data = '';
                    if (this.$refs.xAxisCascaderPanel[index].getCheckedNodes() && this.$refs.xAxisCascaderPanel[index].getCheckedNodes()[0]) {
                        data = this.$refs.xAxisCascaderPanel[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.xAxisCascaderPanel[index].clearCheckedNodes();
                    }
                }
            },
            xCloseEdit(element, index) {
                element.isEdit = false;
                if (this.$refs.xAxisCascaderPanel && this.$refs.xAxisCascaderPanel[index]) {
                    let data = '';
                    if (this.$refs.xAxisCascaderPanel[index].getCheckedNodes() && this.$refs.xAxisCascaderPanel[index].getCheckedNodes()[0]) {
                        data = this.$refs.xAxisCascaderPanel[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.xAxisCascaderPanel[index].clearCheckedNodes();
                    }
                }
            },
            ySaveEditName(element, headerName, index) {
                element.isEdit = false;
                element.headerName = headerName;
                if (this.$refs.yAxisCascaderPanel && this.$refs.yAxisCascaderPanel[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanel[index].getCheckedNodes() && this.$refs.yAxisCascaderPanel[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanel[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanel[index].clearCheckedNodes();
                    }
                }

                if (this.$refs.yAxisCascaderPanelLeft && this.$refs.yAxisCascaderPanelLeft[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes() && this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanelLeft[index].clearCheckedNodes();
                    }
                }

                if (this.$refs.yAxisCascaderPanelRight && this.$refs.yAxisCascaderPanelRight[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes() && this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanelRight[index].clearCheckedNodes();
                    }
                }
            },
            yCloseEdit(element, index) {
                element.isEdit = false;
                if (this.$refs.yAxisCascaderPanel && this.$refs.yAxisCascaderPanel[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanel[index].getCheckedNodes() && this.$refs.yAxisCascaderPanel[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanel[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanel[index].clearCheckedNodes();
                    }
                }

                if (this.$refs.yAxisCascaderPanelLeft && this.$refs.yAxisCascaderPanelLeft[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes() && this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanelLeft[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanelLeft[index].clearCheckedNodes();
                    }
                }

                if (this.$refs.yAxisCascaderPanelRight && this.$refs.yAxisCascaderPanelRight[index]) {
                    let data = '';
                    if (this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes() && this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes()[0]) {
                        data = this.$refs.yAxisCascaderPanelRight[index].getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName') {
                        this.$refs.yAxisCascaderPanelRight[index].clearCheckedNodes();
                    }
                }
            },
            yAxisRightChange(index) {
                //右指标排序
                let data = this.yAxisRightPanelName;
                let newYAxisItem = this.yAxisRight[index];
                this.$store.commit('changeYRightField', newYAxisItem.field);
                this.$store.commit('changeYRightType', newYAxisItem.typeName);
                if (data.length >= 2 && data[0] === 'order') {
                    let dataItem = this.yAxisRightPanelName[1];
                    if (dataItem.indexOf('riseOrder') > -1) {
                        newYAxisItem.isAscending = true;
                        this.yAxisRight.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYRightRiseOrder', true);
                    } else {
                        newYAxisItem.isAscending = false;
                        this.yAxisRight.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYRightRiseOrder', false);
                    }
                    if (dataItem.indexOf('dropOrder') > -1) {
                        newYAxisItem.isDescending = true;
                        this.yAxisRight.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYRightDropOrder', true);
                    } else {
                        newYAxisItem.isDescending = false;
                        this.yAxisRight.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYRightDropOrder', false);
                    }
                    if (dataItem.indexOf('normal') > -1) {
                        newYAxisItem.isDescending = false;
                        newYAxisItem.isAscending = false;
                        this.$store.commit('changeYRightRiseOrder', false);
                        this.$store.commit('changeYRightDropOrder', false);
                    }
                } else {
                    newYAxisItem.isDescending = false;
                    newYAxisItem.isAscending = false;
                    this.$store.commit('changeYRightRiseOrder', false);
                    this.$store.commit('changeYRightDropOrder', false);
                }
                //删除右指标
                if (data[0] === 'deleteFiled') {
                    this.closeYAxisRight(index);
                    this.yAxisRightPanelName = [];
                }
                let yAxisOptions = {
                    sum: '求和',
                    avg: '平均',
                    max: '最大值',
                    min: '最小值',
                    proportion: '占比',
                    count: '计数',
                };
                let mapDate = new Map();
                for (let yDate in yAxisOptions) {
                    mapDate.set(yDate, yAxisOptions[yDate]);
                }
                //高级计算
                if (data.length >= 2 && data[1] === 'proportion') {
                    let option = mapDate.get('proportion');
                    this.$set(newYAxisItem, 'hasPercent', true);
                    this.$set(newYAxisItem, 'hasPercentName', '-' + option);
                }
                if (data.length >= 2 && data[1] === 'none') {
                    newYAxisItem['hasPercent'] = false;
                    if (newYAxisItem['hasPercentName']) {
                        this.$set(newYAxisItem, 'hasPercentName', newYAxisItem['hasPercentName'].split('-')[0]);
                    }
                }
                //汇总方式
                if (this.yAxisRight.length > 0 && newYAxisItem.typeName === 'number') {
                    if (data.length >= 2 && data[0] === 'op') {
                        let option = mapDate.get(data[1]);
                        this.$set(newYAxisItem, 'op', data[1]);
                        this.$set(newYAxisItem, 'opName', option);
                    }
                }
                //修改显示名称
                this.headerName = newYAxisItem.headerName;
                if (data[0].indexOf('updateName') > -1) {
                    this.$set(newYAxisItem, 'isEdit', true);
                }
                this.yAxisRightPanelName = '';
            },
            yAxisLeftChange(index) {
                //左指标排序
                let data = this.yAxisLeftPanelName;
                let newYAxisItem = this.yAxisLeft[index];
                this.$store.commit('changeYLeftField', newYAxisItem.field);
                this.$store.commit('changeYLeftType', newYAxisItem.typeName);
                if (data.length >= 2 && data[0] === 'order') {
                    let dataItem = '';
                    if (dataItem.indexOf('riseOrder') > -1) {
                        newYAxisItem.isAscending = true;
                        this.yAxisLeft.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYLeftRiseOrder', true);
                    } else {
                        newYAxisItem.isAscending = false;
                        this.yAxisLeft.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYLeftRiseOrder', false);
                    }
                    if (dataItem.indexOf('dropOrder') > -1) {
                        newYAxisItem.isDescending = true;
                        this.yAxisLeft.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYLeftDropOrder', true);
                    } else {
                        newYAxisItem.isDescending = false;
                        this.yAxisLeft.splice(index, 1, newYAxisItem);
                        this.$store.commit('changeYLeftDropOrder', false);

                    }
                    if (dataItem.indexOf('normal') > -1) {
                        newYAxisItem.isDescending = false;
                        newYAxisItem.isAscending = false;
                        this.$store.commit('changeYLeftDropOrder', false);
                        this.$store.commit('changeYLeftRiseOrder', false);
                    }
                } else {
                    newYAxisItem.isDescending = false;
                    newYAxisItem.isAscending = false;
                    this.$store.commit('changeYLeftRiseOrder', false);
                    this.$store.commit('changeYLeftDropOrder', false);
                }
                //删除右指标
                if (data[0] === 'deleteFiled') {
                    this.closeYAxisLeft(index);
                    this.yAxisLeftPanelName = [];
                }
                let yAxisOptions = {
                    sum: '求和',
                    avg: '平均',
                    max: '最大值',
                    min: '最小值',
                    proportion: '占比',
                    count: '计数',
                };
                let mapDate = new Map();
                for (let yDate in yAxisOptions) {
                    mapDate.set(yDate, yAxisOptions[yDate]);
                }
                //高级计算
                if (data.length >= 2 && data[1] === 'proportion') {
                    let option = mapDate.get('proportion');
                    this.$set(newYAxisItem, 'hasPercent', true);
                    this.$set(newYAxisItem, 'hasPercentName', '-' + option);
                }
                if (data.length >= 2 && data[1] === 'none') {
                    newYAxisItem['hasPercent'] = false;
                    if (newYAxisItem['hasPercentName']) {
                        this.$set(newYAxisItem, 'hasPercentName', newYAxisItem['hasPercentName'].split('-')[0]);
                    }
                }
                //汇总方式
                if (this.yAxisLeft.length > 0 && newYAxisItem.typeName === 'number') {
                    if (data.length >= 2 && data[0] === 'op') {
                        let option = mapDate.get(data[1]);
                        this.$set(newYAxisItem, 'op', data[1]);
                        this.$set(newYAxisItem, 'opName', option);
                    }
                }
                //修改显示名称
                this.headerName = newYAxisItem.headerName;
                if (data[0].indexOf('updateName') > -1) {
                    this.$set(newYAxisItem, 'isEdit', true);
                }
                this.yAxisLeftPanelName = '';
            }
        },
        watch: {
            xAxis: {
                handler() {
                    /*维度date类型默认汇总方式是年-月*/
                    if (this.xAxis && this.xAxis.length > 0) {
                        let index = this.xAxis.length - 1;
                        if (this.xAxis[index] && this.xAxis[index].typeName === 'date') {
                            this.xAxis[index]['groupRule'] = "year_month";
                            this.xAxis[index]['formater'] = "yyyy-MM-dd";
                        }
                    }
                    this.$emit('initCoordinates', this.xAxis, this.yAxis, this.filter);
                },
                deep: true,
                immediate: true
            },
            yAxis: {
                handler(newVal, oldVal) {
                    /*指标-number类型默认求和*/
                    if (!this.$lodash.isEqual(newVal, oldVal)) {
                        if (this.yAxis && this.yAxis.length > 0) {
                            let index = this.yAxis.length - 1;
                            if (this.yAxis[index].typeName === "number") {
                                this.yAxis[index]['op'] = 'sum';
                                this.yAxis[index]['opName'] = '求和';
                            }
                        }
                    }
                    this.$emit('initCoordinates', this.xAxis, this.yAxis, this.filter);
                },
                deep: true,
                immediate: true
            },
            yAxisLeft: {
                handler(val) {
                    this.$emit('yAxisLeftData', val);
                },
                deep: true,
                immediate: true
            },
            yAxisRight: {
                handler(val) {
                    this.$emit('yAxisRightData', val);
                },
                deep: true,
                immediate: true
            },
            filter: {
                handler() {
                    this.$emit('initCoordinates', this.xAxis, this.yAxis, this.filter);
                    if (this.$refs.filterCascaderPanel && this.$refs.filterCascaderPanel[0] && this.$refs.filterCascaderPanel[0].getCheckedNodes()[0]) {
                        this.$emit('filterCascaderPanel', this.$refs.filterCascaderPanel[0]);
                    }
                },
                deep: true,
                immediate: true
            },
            xAxisPanelName: {
                handler() {
                    this.$emit('initCoordinates', this.xAxis, this.yAxis, this.filter);
                },
                deep: true,
                immediate: true
            },
            yAxisPanelName: {
                handler() {
                    this.$emit('initCoordinates', this.xAxis, this.yAxis, this.filter);
                },
                deep: true,
                immediate: true
            },
            /*监听父级传过来的维度、指标数据*/
            xAxisParent() {
                this.initLoad();
            },
            yAxisParent(newVal, oldVal) {
                if (this.$lodash.isEqual(newVal, oldVal)) {
                    return false;
                }
                this.initLoad();
                if (this.onceTip) {
                    if (this.editItemType === 'ct-line-bar') {
                        this.yAxisLeft = [];
                        this.yAxisRight = [];
                        newVal.forEach((yAxisItem) => {
                            if (yAxisItem.yTip && yAxisItem.yTip === 'left') {
                                this.yAxisLeft.push(yAxisItem);
                            } else {
                                this.yAxisRight.push(yAxisItem);
                            }
                        });
                    }
                }
                this.onceTip = false;
            },
            filterParent() {
                this.initLoad();
            },
        },
    }
</script>

<style scoped>
    .chart-axis {
        border: 1px dashed #eaeaea;
        padding: 6px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .row {
        line-height: 32px;
        /* height: 32px; */
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .row > div:last-child {
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        border: 1px #ddd solid;
        padding: 0px 5px;
        border-radius: 4px;
        line-height: 28px;
    }
</style>