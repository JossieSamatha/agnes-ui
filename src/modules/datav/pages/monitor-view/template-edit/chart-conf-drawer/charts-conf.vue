<template>
    <div>
        <section class="confSection">
            <div class="conf-row">
                <p class="conf-row-title">图表颜色</p>
                <div class="conf-row-item colorset">
                    <div class="row-inp" v-for="(set, setIndex) in colorSet" :key="setIndex">
                        <el-color-picker v-model="set.value"
                                         color-format="hex" size="mini"
                                         :predefine="predefineColors">
                        </el-color-picker>
                        <span>{{set.label}}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="confSection">
            <div class="conf-row">
                <div class="conf-row">
                    <p class="conf-row-title">图表工具</p>
                    <div class="conf-row-item switchItem">
                        <div class="row-inp" v-for="(tool, toolIndex) in gridTool" :key="toolIndex">
                            <el-switch v-model="tool.value" @change="toolChange(tool)"></el-switch>
                            <span class="center bottom">{{tool.label}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                colorSet: [{label: '创新TA', value:'#1790cf'},
                    {label: '直销中心', value:'#1bb2d8'},
                    {label: '数据收发', value:'#88b0bb'}],
                color: '#1790cf',
                predefineColors: [
                    '#1790cf',
                    '#1bb2d8',
                    '#99d2dd',
                    '#88b0bb',
                    '#1c7099',
                    '#038cc4',
                    '#75abd0',
                    '#afd6dd',
                    '#ecf0f1',
                    '#95a5a6'
                ],
                gridTool: [
                    {label: '鼠标提示', value: false},
                    {label: '指标维度', value: false},
                    {label: 'Y轴注释', value: false},
                    // {label: '工具栏', value:'false'},
                    // {label: '适应大小', value:'false'},
                    {label: '图例', value:false},
                    // {label: '平滑', value:'false'},
                    // {label: '数据点', value:'false'},
                    // {label: '网格横线', value:'false'},
                    // {label: '网格竖线', value:'false'},
                    // {label: '平均线', value:'false'},
                    {label: '面积', value: false},
                    // {label: '数值轴适应', value:'false'},
                    // {label: '类目轴标签', value:false},
                    {label: '显示数据', value:false},
                    {label: '数值横轴', value:false},
                    {label: '堆叠', value: false},
                    {label: "数值百分比", value: false}],
                    // {label: '极值标记', value:'false'}]
                itemInfo: Object,
                toolTip: true,
            }
        },
        mounted() {
            this.itemInfo = this.$store.state.editItem.comp.componentMeta
            this.initConfig()
        },
        methods: {
            toolChange(val) {
                this.$app.runCmd('editTool', val)
            },
            initConfig() {
                let iset = this.itemInfo.chartSettings
                this.gridTool[0].value = this.toolTip
                this.gridTool[1].value =  iset.metrics ? true : false
                // this.gridTool[2].value = iset.yAxisName.length != 0 ? true : false
                this.gridTool[3].value = iset.dimension ? true : false
                this.gridTool[4].value = iset.area
                // this.gridTool[5].value = this.itemInfo.extend.series.label.normal.show
                // this.gridTool[6].value = iset.xAxisType.length != 0 ? true : false
                this.gridTool[7].value = JSON.stringify(iset.stack) != "{}" ? true : false
                // this.gridTool[8].value = iset.yAxisType.length != 0 ? true : false
            }
        }
    }
</script>