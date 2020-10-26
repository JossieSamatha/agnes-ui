<template>
    <dv-capsule-chart :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    export default {
        name: 'ct-capsule',
        props: {
            position: Object,
            compOption: Object,
            dataConfig: Object
        },
        data(){
          return {
              mockData: [{name: '南阳', value: 167}, {name: '周口', value: 67},
                  {name: '漯河', value: 123}, {name: '郑州', value: 55},
                  {name: '西峡', value: 98}],
              configParam: {}
          }
        },
        async created(){
            // 根据参数渲染表格
            const settingOption = !this.dataConfig ? this.compOption : this.dataConfig;
            const {unit, colors, showValue} = settingOption;
            this.getData(this.compOption, (gridData)=>{
                this.configParam = {
                    unit, colors, showValue,
                    data: gridData
                };
            });
        },
        watch: {
            compOption: {
                handler(val){
                    const settingOption = !this.dataConfig ? val : this.dataConfig;
                    const {unit, colors, showValue} = settingOption;
                    this.getData(this.compOption, (gridData)=>{
                        this.configParam = {
                            unit, colors, showValue,
                            data: gridData
                        };
                    });
                },
                deep: true
            }
        },
        methods: {
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