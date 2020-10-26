<template>
    <dv-scroll-ranking-board :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    export default {
        name: 'ranking-board',
        props: {
            position: Object,
            compOption: Object,
            dataConfig: Object
        },
        data(){
            return {
                mockData: [{name: '周口', value: 1155}, {name: '南阳', value: 12340},
                    {name: '西峡', value: 718}, {name: '驻马店', value: 6236},
                    {name: '新乡', value: 8230}, {name: '信阳', value: 415},
                    {name: '漯河', value: 229}, {name: '安徽', value: 2119},
                    {name: '桐城', value: 292}, {name: '西安', value: 291}],
                configParam: {}
            }
        },
        async created(){
            // 根据参数渲染表格
            let gridParam = {};
            const settingOption = !this.dataConfig ? this.compOption : this.dataConfig;
            const {rowNum, waitTimeSec, carousel, sort, unit, formatter, colors} = settingOption;
            gridParam = {
                waitTime: waitTimeSec*1000,
                rowNum, carousel, sort, unit, formatter, colors,
            };
            if(formatter === 'money'){
                gridParam.valueFormatter = this.mapNumType;
            }
            this.getData(this.compOption, (gridData)=>{
                this.configParam = {
                    ...gridParam,
                    data: gridData
                };
            });
        },
        watch: {
            compOption: {
                handler(val){
                    const settingOption = !this.dataConfig ? val : this.dataConfig;
                    const {rowNum, waitTimeSec, carousel, sort, unit, formatter, colors} = settingOption;
                    this.getData(this.compOption, (gridData)=>{
                        this.configParam = {
                            waitTime: waitTimeSec*1000,
                            rowNum, carousel, sort, unit, formatter, colors,
                            data: gridData
                        };
                    });
                },
                deep: true
            }
        },
        methods: {
            mapNumType({value}){
                return this.$fmt.formateThousandthMoney(value) + '&nbsp;&nbsp;' + this.compOption.unit;
            },

            async getData(dataParams, fun){
                if(dataParams.dataSourceId && dataParams.metrics.length>0 && dataParams.xFields.length>0){
                    const {dataSourceId, xFields, metrics, filter} = dataParams;
                    const params = {dataSetId: dataSourceId, xFields, metrics, filter};
                    this.$api.DatavDatavApi.createChart(params).then(res => {
                        const nameField = xFields[0].field;
                        const valueField = metrics[0].field;
                        if (this.$utils.isArray(res) && res.length > 0) {
                            const gridData = res.map((resItem)=>{
                                return {
                                    name: resItem[nameField],
                                    value: resItem[valueField]
                                }
                            });
                            fun(gridData);
                        }else{
                            fun([]);
                        }
                    });
                }else{
                    fun(this.mockData);
                }
            }
        }
    }
</script>

<style scoped>

</style>