<template>
    <dv-scroll-board ref="staticGrid" :config="configParam"/>
</template>

<script>
    import mockInterData from "../../../../pages/monitor-view/mockInterData";
    export default {
        name: 'static-grid',
        props: {
            position: Object,
            compOption: {
                type: Object,
            }
        },
        computed: {
            configParam: {
                get(){
                    if(this.compOption.columnArr && this.compOption.columnArr.length>0){
                        this.getTableData();
                    }
                    const config = {
                        ...this.compOption,
                        data: JSON.parse(this.compOption.dataStr),
                        waitTime: this.compOption.waitTimeSec*1000
                    };
                    if(this.compOption.index){
                        config.columnWidth = [this.compOption.indexWidth];
                    }
                    return config;
                },
                set(val){
                    this.configParam = val;
                }
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
                const mockData = mockInterData().chartData;
                const columnArr = this.compOption.columnArr
                const fields = columnArr.map((headItem)=>{return headItem.field});
                const filterMockData = mockData.map((dataItem)=>{
                    return this.$lodash.pickBy(dataItem, (val, key)=>{
                        return fields.includes(key);
                    })
                });

                let header = [], rowData = [];
                header = columnArr.map((headItem)=>{return headItem.headerName});
                rowData = filterMockData.map((rowItem)=>{
                    return this.$lodash.toArray(rowItem)
                });

                this.compOption.header = header;
                this.compOption.dataStr = JSON.stringify(rowData);
                /* =============  end  ==================*/


                this.$api.DatavDatavApi.getTableList(this.compOption.columnArr).then(res => {
                    if (res != "") {
                        this.dataOption = {
                            header: this.gridConf.header,
                            data: res
                        }
                    } else {
                        this.dataOption = {
                            header: [],
                            data: []
                        }
                    }
                })
            }

        }
    }
</script>