<template>
    <dv-capsule-chart :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    export default {
        name: 'ct-capsule',
        props: {
            position: Object,
            compOption: Object
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
            const gridData = await this.getData(this.compOption);
            const {unit, colors, showValue} = this.compOption;
            this.configParam = {
                unit, colors, showValue,
                data: gridData
            };
        },
        watch: {
            compOption: {
                handler(val){
                    const {unit, colors, showValue} = val;
                    this.getData(this.compOption).then((res)=>{
                        this.configParam = {
                            unit, colors, showValue,
                            data: res
                        };
                    });
                }
            }
        },
        methods: {
            async getData(dataParams){
                if(dataParams.dataSourceId && dataParams.metrics.length>0 && dataParams.xFields.length>0){
                    const {dataSourceId, xFields, metrics, filter} = dataParams;
                    const params = {dataSetId: dataSourceId, xFields, metrics, filter};
                    this.$api.DatavDatavApi.createChart(params).then(res => {
                        if (this.$utils.isArray(res) && res.length > 0) {
                            return res;
                        }else{
                            return [];
                        }
                    });
                }else{
                    return this.mockData;
                }
            }
        }
    }
</script>

<style scoped>

</style>