<template>
    <dv-scroll-board ref="staticGrid" :config="configParam"/>
</template>

<script>
    export default {
        name: 'static-grid',
        props: {
            position: Object,
            compOption: Object,
            dataOption: Object
        },
        data(){
            return {
                mockGridData: {
                    header: ['列1', '列2', '列3'],
                    data: [
                        ['行1列1', '行1列2', '行1列3'],
                        ['行2列1', '行2列2', '行2列3'],
                        ['行3列1', '行3列2', '行3列3'],
                        ['行4列1', '行4列2', '行4列3'],
                        ['行5列1', '行5列2', '行5列3'],
                        ['行6列1', '行6列2', '行6列3'],
                        ['行7列1', '行7列2', '行7列3'],
                        ['行8列1', '行8列2', '行8列3'],
                        ['行9列1', '行9列2', '行9列3'],
                        ['行10列1', '行10列2', '行10列3']
                    ]
                },
                configParam: {}
            }
        },
        async created(){
            // 根据参数渲染表格
            let gridData = null;
            if(this.dataOption && this.dataOption.dataSetId && this.dataOption.columnArr && this.dataOption.columnArr.length>0){
                gridData = await this.getGridData(this.dataOption);
            }else{
                gridData = this.mockGridData;
            }
            const config = {
                ...this.compOption,
                ...gridData,
                waitTime: this.compOption.waitTimeSec*1000
            };
            if(this.compOption.index){
                if(!this.compOption.indexWidth){
                    this.compOption.indexWidth = 50;
                }
                config.columnWidth = [this.compOption.indexWidth];
            }
            this.configParam = config;
        },
        watch: {
            compOption: {
                handler(val){
                    const gridData = {
                        header: this.configParam.header,
                        data: this.configParam.data
                    }
                    const config = {
                        ...val,
                        ...gridData,
                        waitTime: val.waitTimeSec*1000
                    };
                    if(val.index){
                        if(!val.indexWidth){
                            val.indexWidth = 50;
                        }
                        config.columnWidth = [val.indexWidth];
                    }else{
                        delete config.indexWidth;
                    }
                    this.configParam = config;
                },
                deep: true
            },
            async dataOption(val) {
                const gridData = await this.getGridData(val);
                if(gridData && gridData.data && gridData.data.length>0){
                    let configParam = this.$lodash.clone(this.configParam);
                    configParam = {
                        ...configParam,
                        ...gridData
                    }
                    this.configParam = configParam;
                }
            }
        },
        methods: {
            async getGridData(dataParams){
                let params = {
                    dataSetId: dataParams.dataSetId,
                    xFields: dataParams.shownStr
                }
                const header = dataParams.columnArr.map((headItem) => {
                    return headItem.headerName;
                });
                const res = await this.$api.DatavDatavApi.getTableList(params);
                if(res && res.length>0){
                    const dataArr = res.map((resItem)=>{
                        return this.$lodash.values(resItem)
                    });
                    return {header, data: dataArr};
                }else{
                    return {header: [], data: []};
                }
            }
        }
    }
</script>