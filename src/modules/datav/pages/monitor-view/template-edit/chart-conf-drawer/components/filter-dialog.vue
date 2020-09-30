<template>
    <!--设置过滤条件-->
    <el-dialog
            title="设置过滤条件"
            :visible.sync="showDialog"
            :modal-append-to-body="false"
            width="350px"
            :before-close="cancel"
            class="filterDialog">
        <div v-if="filterType === 'number'">
            <div id="num">{{filterLabel}}
                <div style="display: inline-block;width:48%">
                    <el-select v-model="numberCond" placeholder="请选择">
                        <el-option
                                v-for="item in numberFilterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input id="filter-option-input-num"
                          v-if="numberCond != 'empty' && numberCond != 'not_empty' && numberCond != 'range'"
                          v-model="filterNum" style="margin-top: 10px;"/>
                <div v-if="numberCond == 'range'" style="margin-top: 10px">
                    <div id="min" style="display: inline-block">
                        <el-input placeholder="最小值" v-model="minFil" style="width: 147px;"></el-input>
                    </div>
                    ~
                    <div id="max" style="display: inline-block">
                        <el-input placeholder="最大值" v-model="maxFil" style="width: 147px;"></el-input>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <el-button type="default" style="margin-left: 180px;" @click="cancel">取消
                    </el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </div>
            </div>
        </div>
        <div v-if="filterType === 'date'">
            <div id="date">{{filterLabel}}
                <div style="display: inline-block;width:48%">
                    <el-select v-model="numberCond" placeholder="请选择">
                        <el-option
                                v-for="item in dateFilterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div id="picker" style="width: 100%;">
                    <el-date-picker
                            v-if="numberCond !== 'empty' && numberCond !== 'not_empty' && numberCond !== 'range'"
                            style="margin-top: 10px;"
                            v-model="dateTime"
                            type="date"
                            placeholder="选择日期时间"
                            align="right">
                    </el-date-picker>
                </div>
                <div v-if="numberCond == 'range'" style="margin-top: 10px">
                    <div id="startDate" style="width: 100%;">
                        <el-date-picker
                                style="margin-top: 10px;"
                                v-model="startDateTime"
                                type="date"
                                placeholder="起始日期"
                                align="right">
                        </el-date-picker>
                    </div>
                    <div id="endDate" style="width: 100%;">
                        <el-date-picker
                                style="margin-top: 10px;"
                                v-model="endDateTime"
                                type="date"
                                placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <el-button type="default" style="margin-left: 180px;" @click="cancel">取消
                    </el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </div>
            </div>
        </div>
        <div v-if="filterType === 'text'">
            <div id="filter-options">
                <span style="padding-right: 10px">{{filterLabel}}</span>
                <div style="display: inline-block;width:48%">
                    <el-select @change="getOptions" v-model="numberCond" placeholder="请选择">
                        <el-option
                                v-for="item in textFilterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input id="filter-option-input-text"
                          v-if="numberCond !== 'empty' && numberCond !== 'not_empty' && numberCond !== 'range' && numberCond !== 'eq' && numberCond !== 'ne' && numberCond !== 'eq_random' && numberCond !== 'ne_random'"
                          v-model="filterNum" style="margin-top: 10px;">
                </el-input>
                <!--等于/不等于-->
                <div id="eqne" style="width: 100%;">
                    <el-cascader
                            style="margin-top: 10px"
                            v-if="numberCond === 'eq' || numberCond === 'ne'"
                            placeholder="搜索"
                            :options="selectDataList"
                            v-model="selectData"
                            filterable>
                    </el-cascader>
                </div>
                <!--等于任意一个/不等于任意一个-->
                <div id="eq-random" style="width: 100%;">
                    <el-cascader
                            style="margin-top: 10px"
                            v-if="numberCond === 'eq_random' || numberCond === 'ne_random'"
                            placeholder="搜索"
                            :options="checkDataList"
                            :props="props"
                            v-model="checkData"
                            filterable>
                    </el-cascader>
                </div>
                <div v-if="numberCond == 'range'" style="margin-top: 10px">
                    <el-input placeholder="最小值" v-model="minFil" style="width: 147px;"></el-input>
                    ~
                    <el-input placeholder="最大值" v-model="maxFil" style="width: 147px;"></el-input>
                </div>
                <div style="margin-top: 10px;">
                    <el-button type="default" style="margin-left: 180px;" @click="cancel">取消
                    </el-button>
                    <el-button type="primary" @click="confirm">保存</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import dataConfData from '../dataConf'

    export default {
        props: {
            filterDialog: Boolean,
            filterType: String,
            filterLabel: String,
            dataSourceId: String,
            filterField: String,
            filter: Array,
            filterOptionIndex: Number,
            filterEditIndex: Number,
            tempField: String,
        },
        name: "filter-dialog",
        data() {
            return {
                numberCond: '',
                minFil: '',
                maxFil: '',
                dateTime: '',
                editType: '',
                filterNum: '',
                numberFilterOptions: dataConfData.numberFilterOptions,
                dateFilterOptions: dataConfData.dateFilterOptions,
                textFilterOptions: dataConfData.textFilterOptions,
                showDialog: false,
                checkDataList: [],
                selectDataList: [],
                startDateTime: '',
                endDateTime: '',
            }
        },
        methods: {
            cancel() {
                this.showDialog = false;
                this.minFil = "";
                this.maxFil = "";
                this.filterNum = "";
                this.dateTime = '';
                this.$app.runCmd('clearEditFilter');
                this.$emit('closeEditDialog', false);
                this.numberCond = "";
            },
            confirm() {
                if (this.editType === 'grid') {
                    this.addFilterCond();
                    this.getGridDetail();
                } else {
                    this.filterEditOptions();
                    this.condValue();
                }
                this.cancel();
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
            getOptions(item) {
                /*过滤条件获取下拉数据*/
                this.selectDataList = [];
                if (item === 'eq' || item === 'ne' || item === 'eq_random' || item === 'ne_random') {
                    let params = {
                        dataSetId: "",
                        field: ''
                    };
                    params['dataSetId'] = this.dataSourceId;
                    params['field'] = this.filterField;
                    this.$api.DatavDatavApi.filterDownData(params).then(res => {
                        let filterData = this.$lodash.cloneDeep(res);
                        filterData.forEach(resItem => {
                            let selectObj = {};
                            this.$set(selectObj, 'value', resItem);
                            this.$set(selectObj, 'label', resItem);
                            this.selectDataList.push(selectObj);
                            this.checkDataList.push(selectObj);
                        });
                    })
                } else {
                    this.selectDataList = [];
                    this.checkDataList = [];
                }
                this.selectData = '';
                this.checkData = '';
            },
            getGridDetail() {
                this.header = []
                this.gridParams.dataSetId = this.dataSourceId;
                this.dataConfig = this.$lodash.cloneDeep(this.gridParams);
                for (let i of this.xAxis) {
                    let headerItem = {}
                    headerItem.headerName = i.headerName
                    headerItem.field = i.field
                    this.header.push(headerItem)
                }
                this.compName = "static-grid"
                // this.isUpdate = true
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
            checkTime(i) {
                /*过滤条件日期个位数添加0*/
                if (i < 10) {
                    i = "0" + i
                }
                return i;
            },
            checkedIndex(index) {
                this.filterEditIndex = index;
                if (this.filter.length > 0) {
                    this.filter.forEach((filterItem, filterIndex) => {
                            if (filterIndex === index) {
                                this.filterLabel = filterItem.headerName;
                                this.filterField = filterItem.field;
                                this.filterType = filterItem.typeName;
                            }
                        }
                    )
                }
            },
            filterEditOptions() {
                /*tag显示Label*/
                var numCondMap = new Map();
                this.numberFilterOptions.forEach(numItem => {
                    numCondMap.set(numItem.value, numItem.label)
                });
                this.filter.forEach((filterItem, filterIndex) => {
                    /*
                   * 判断两个index,保存过滤条件数据
                   * 1、filterEditIndex：当已选择了过滤条件，点击【修改筛选条件】时获取到的当前tag索引值
                   * 2、filterOptionIndex：拖拽字段到过滤条件时，dialog【设置过滤条件】获取到的当前tag索引值
                   * */
                    let indexOption = -1;
                    if (this.filterEditIndex > 0) {
                        indexOption = this.filterEditIndex;
                    } else {
                        indexOption = this.filterOptionIndex;
                    }
                    if (filterIndex === indexOption) {
                        /*日期类型*/
                        if (filterItem.typeName === 'date') {
                            /*等于、不等于*/
                            if (this.numberCond !== 'not_empty' && this.numberCond !== 'empty' && this.numberCond !== 'range' && this.numberCond !== 'act_filter' && this.numberCond.length > 0) {
                                var d = new Date(this.dateTime);
                                // var newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + this.checkTime(d.getHours()) + ':' + this.checkTime(d.getMinutes()) + ':' + this.checkTime(d.getSeconds());
                                var newDate = d.getFullYear() + '-' + this.checkTime((d.getMonth() + 1)) + '-' + this.checkTime(d.getDate());
                                this.$set(filterItem, 'dateTime', newDate);
                                if (filterItem.startDateTime) {
                                    delete filterItem.startDateTime;
                                }
                                if (filterItem.endDateTime) {
                                    delete filterItem.endDateTime;
                                }
                            }
                            /*选择范围*/
                            if (this.numberCond === 'range' && this.numberCond.length > 0) {
                                var s = new Date(this.startDateTime);
                                var e = new Date(this.endDateTime);
                                // var newS = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate() + ' ' + this.checkTime(s.getHours()) + ':' + this.checkTime(s.getMinutes()) + ':' + this.checkTime(s.getSeconds());
                                // var newE = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + this.checkTime(e.getHours()) + ':' + this.checkTime(e.getMinutes()) + ':' + this.checkTime(e.getSeconds());
                                var newS = s.getFullYear() + '-' + this.checkTime((s.getMonth() + 1)) + '-' + this.checkTime(s.getDate());
                                var newE = e.getFullYear() + '-' + this.checkTime((e.getMonth() + 1)) + '-' + this.checkTime(e.getDate());
                                if (filterItem.dateTime) {
                                    delete filterItem.dateTime;
                                }
                                this.$set(filterItem, 'startDateTime', newS);
                                this.$set(filterItem, 'endDateTime', newE);
                            }
                        }
                        /* TODO 目前text只判断了等于、不等于*/
                        if (filterItem.typeName === 'text') {
                            if (this.numberCond === 'eq' || this.numberCond == 'ne') {
                                if (this.selectData[0]) {
                                    this.$set(filterItem, 'numLabelValue', this.selectData[0]);
                                }
                            }
                            if (this.numberCond === 'eq_random' || this.numberCond == 'ne_random') {
                                if (this.checkData) {
                                    let checkList = [];
                                    this.checkDataList.forEach(item => {
                                        checkList.push(item.label)
                                    });
                                    this.$set(filterItem, 'checkList', checkList);
                                }
                            }
                            if (this.numberCond === 'include' || this.numberCond == 'not_include') {
                                if (this.filterNum) {
                                    this.$set(filterItem, 'filterNum', this.filterNum);
                                }
                            }

                        } else {
                            if (this.filterNum.length > 0) {
                                this.$set(filterItem, 'filterNum', this.filterNum)
                            }
                            if (this.minFil.length > 0) {
                                this.$set(filterItem, 'minFil', this.minFil);
                                this.$set(filterItem, 'maxFil', this.maxFil);
                            }
                        }
                        this.$set(filterItem, 'numLabel', numCondMap.get(this.numberCond));
                    }
                });
            },
            condValue() {
                /*图表渲染数据格式拼接value*/
                if (this.filter) {
                    this.filter.forEach(condItem => {
                        let value = [];
                        /*date*/
                        if (condItem.typeName === 'date') {
                            if (this.numberCond == 'range') {
                                if (condItem.startDateTime) {
                                    value.push(condItem.startDateTime);
                                    value.push(condItem.endDateTime);
                                }
                            } else {
                                if (condItem.dateTime) {
                                    value.push(condItem.dateTime);
                                }
                            }
                        }
                        /*text*/
                        if (condItem.typeName === 'text') {
                            if (this.numberCond === 'eq' || this.numberCond === 'ne') {
                                if (this.selectData) {
                                    value.push(this.selectData[0]);
                                }
                            } else if (this.numberCond === 'eq_random' || this.numberCond === 'ne_random') {
                                if (this.checkData) {
                                    this.checkData.forEach(item => {
                                        value.push(item);
                                    })
                                }
                            } else {
                                value.push(this.filterNum);
                            }
                        }
                        /*number*/
                        if (condItem.typeName === 'number') {
                            if (this.numberCond == 'range') {
                                value.push(this.minFil, this.maxFil);
                            } else {
                                value.push(this.filterNum);
                            }
                        }
                        if (condItem.field === this.tempField) {
                            condItem['method'] = this.numberCond;
                            this.$set(condItem, 'value', value);
                        }
                    })
                }
            },
        },
        watch: {
            filterDialog(val) {
                this.showDialog = val;
            }
        }
    }
</script>

<style scoped>

</style>