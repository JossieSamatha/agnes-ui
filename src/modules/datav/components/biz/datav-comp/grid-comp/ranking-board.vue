<template>
    <dv-scroll-ranking-board :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    import mockInterData from "../../../../pages/monitor-view/mockInterData";
    export default {
        name: 'ranking-board',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        computed: {
            configParam(){
                if(this.compOption.columnArr && this.compOption.columnArr.length>0){
                    this.getTableData();
                }
                const config = {
                    ...this.compOption,
                    waitTime: this.compOption.waitTimeSec*1000,
                }
                if(this.compOption.formatter === 'money'){
                    config.valueFormatter = this.mapNumType;
                }
                return config;
            }
        },
        watch: {
            compOption(val){
                this.compOption = val;
            },
            header(){
                this.getTableData();
            },
            dataConfig(){
                this.getTableData();
            },
        },
        methods: {
            mapNumType({value}){
                return this.$fmt.formateThousandthMoney(value) + '&nbsp;&nbsp;' + this.compOption.unit;
            },
            getTableData(){
                // 模拟数据挂载
                /* =============  start  ==================*/
                const mockData = mockInterData().capsuleData;
                const columnArr = this.compOption.columnArr
                const fields = columnArr.map((headItem)=>{return headItem.field});
                const filterMockData = mockData.filter((dataItem)=>{
                    return fields.includes(dataItem.field);
                });

                this.compOption.data = filterMockData;
                /* =============  end  ==================*/
            }
        },
    }
</script>

<style scoped>

</style>