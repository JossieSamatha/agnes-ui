<template>
    <dv-capsule-chart :config="configParam" style="width: 100%;height: 100%"/>
</template>

<script>
    import mockInterData from "../../../../pages/monitor-view/mockInterData";
    export default {
        name: 'ct-capsule',
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
        }
    }
</script>

<style scoped>

</style>