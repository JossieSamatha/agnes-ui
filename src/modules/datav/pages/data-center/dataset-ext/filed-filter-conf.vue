<template>
    <div>
        <div class="chart-axis">
            <div class="row filter-style">
                <div style="margin-left: 10px;">数据集名&nbsp;:</div>
                <div style="border: none">
                    <el-input v-model="filterArgs.dataset.dataSetName" placeholder="请输入数据集名称">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="chart-axis">
            <div class="row yAxis-style">
                <div style="margin-left: 10px;">显示字段&nbsp;:</div>
                <div style="border: none">
                    <draggable v-model="filterArgs.fields" :options="{group:{name:'list'}}" class="content-center">
                        <template v-for="(element,index) in filterArgs.fields">
                            <el-tag class="yAxisTag"
                                    :key="element.field"
                                    closable
                                    @close="closeField(index, element)"
                                    style="margin-right:5px">
                                <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
                                {{element.columnLabel}}
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="chart-axis">
            <div class="row filter-style">
                <div style="margin-left: 10px;">过滤条件&nbsp;:</div>
                <div style="border: none">
                    <el-input v-model="filterArgs.dataset.filter" placeholder="请输入过滤条件">
                        <el-button slot="append" icon="el-icon-search" @click="loadData()">读取数据</el-button>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'field-filter',
        props: {
            filterArgs: {
                type: Object,
                default() {
                    return {
                        dataset: {
                            dataSetName: '',
                            filter: ''
                        },
                        fields: []
                    }
                }
            }
        },
        components: {
            draggable
        },
        methods: {
            loadData() {
                this.$emit('setGridData');
            },
            removeByIndex(arry, index) {
                let sliced = arry.slice(index + 1);
                arry.length = index;
                arry.push.apply(arry, sliced);
            },
            remove(array, index) {
                this.removeByIndex(array, index);
            },
            closeField(index) {
                this.remove(this.filterArgs.fields, index);
            }
        }
    }
</script>

<style scoped>
    .chart-axis {
        border: 1px dashed #eaeaea;
        padding: 6px;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .dash-chart-main .chart-axis .axis-head {
        position: absolute;
        top: 0;
        left: 10px;
    }

    .chart-axis .drag-target {
        padding: 2.5px 10px 2.5px 78px;
        min-height: 34px;
        max-height: 90px;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .drag-tip {
        margin-left: 30px;
        font-size: 12px;
        color: #91A1B7;
        font-family: "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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