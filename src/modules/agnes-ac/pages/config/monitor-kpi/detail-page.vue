<template>
    <div style="height: 100%; padding: 10px;">
        <gf-grid ref="grid" height="100%" grid-no="kpi-detail-list"></gf-grid>
    </div>
</template>

<script>
    export default {
        props: {
            kpiCode: String,
            bizDate: String,
            status: Number
        },
        data(){
            return {
                charData:[],
                colorSet:[],
                form:{kpiName:"",createTime:"",bizDate:"",normal:0,abnormal:0,artificialCon:0,remark:''},
                data:{q:{}},
                kpiDetail:{kpiCode:"",bizDate:"",status:""},
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init(){
                this.kpiDetail.kpiCode = this.kpiCode
                this.kpiDetail.bizDate = this.bizDate
                this.kpiDetail.status = this.status.toString()
                try {
                    const p = this.$api.kpiDefineApi.queryKpiInfoMation(this.kpiDetail);
                    const resp = await this.$app.blockingApp(p);
                    if(resp.status){
                        this.form.kpiName =resp.data.kpiName;
                    }
                    const p1 = this.$api.kpiDefineApi.getKpiDetail(this.kpiDetail);
                    const resp1 = await this.$app.blockingApp(p1);
                    if(resp1.status){
                        this.kpiDetail =resp1.data;
                    }
                    this.data.q.kpiCode =this.kpiDetail.kpiCode;
                    this.data.q.status = this.status.toString();
                    this.data.q.bizDate = this.bizDate;
                    const p2 = this.$api.kpiDefineApi.getKpiDetails(this.data);
                    const resp2 = await this.$app.blockingApp(p2);
                    if(resp2.data && resp2.data.length>0){
                        const rows=resp2.data;
                        const keys = Object.keys(rows[0]);
                        const columnDefsArray=this.getSqlGridOptions(keys);
                        if(keys.indexOf("STATUS")>-1){
                            this.opStatus=true;
                            this.$refs.grid.gridController.gridApi.setColumnDefs(this.setColumnFiled(columnDefsArray));
                        }else{
                            this.$refs.grid.gridController.gridApi.setColumnDefs(columnDefsArray);
                        }
                        this.$refs.grid.setRowData(rows);
                    }
                    const p3 = this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode);
                    const resp3 = await this.$app.blockingApp(p3);
                    if(resp3.data && resp3.data.length>0){
                        const columnDefsArray=this.getKpiGridOptions(resp3.data);
                        if(this.opStatus){
                            this.$refs.grid.gridController.gridApi.setColumnDefs(this.setColumnFiled(columnDefsArray));
                        }else{
                            this.$refs.grid.gridController.gridApi.setColumnDefs(columnDefsArray);
                        }
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            reloadData() {
                let _this =this;
                this.$api.kpiDefineApi.getKpiDetails(this.data).then((resp) => {
                    if(resp.data && resp.data.length>0){
                        _this.$refs.grid.setRowData(resp.data);
                    }
                });
            },
            getSqlGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item, field: item, cellClass: "left", suppressMovable:true,
                    valueFormatter:function (params){
                        if(params.colDef.field === 'C_STATUS'){
                            if (params.value) {
                                return window.$gfui.$app.dict.getDictItem('OPDS_KPI_STATUS', params.value).dictName;
                            }
                            return "";
                        }
                    }}});
            },
            getKpiGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item.columnName, field: item.fieldName, cellClass: "left", suppressMovable:true,
                    valueFormatter:function (params){
                        if(params.colDef.field === 'C_STATUS'){
                            if (params.value) {
                                return window.$gfui.$app.dict.getDictItem('OPDS_KPI_STATUS', params.value).dictName;
                            }
                            return "";
                        }
                    }}});
            },
            setColumnFiled(columnDefsArray){
                columnDefsArray.push({
                    colId: "#op", headerName: "操作", cellRenderer: "OpCellRender", pinned: "right",
                    cellClassRules: {
                        'invisible-cell': function(params) {
                            return params.data.STATUS !== "0";
                        },
                    },
                    cellRenderParams:{
                        opButtons: [
                            {
                                key: "update",
                                title: "设为人工一致",
                                onClick: (params)=>{
                                    params.api.execCmd("updateManul", params);
                                }
                            }
                        ]
                    }
                });
                return columnDefsArray;
            },
            updateManul(param){
                let _this=this;
                const factor ={};
                factor.kpiCode=this.kpiCode;
                factor.bizDate=new Date(this.bizDate);
                factor.bizKey=param.data.PRODUCT_CODE;
                const factors =[];
                factors.push(factor);
                const params ={"factors":factors,"remarks":""};
                this.$api.kpiDefineApi.updateManul(params).then((resp) => {
                    if(resp.status){
                        _this.reloadData();
                    }
                });
            },
            // 返回关闭抽屉;
            onCancel(){
                this.$emit("onClose");
            }
        }
    }
</script>