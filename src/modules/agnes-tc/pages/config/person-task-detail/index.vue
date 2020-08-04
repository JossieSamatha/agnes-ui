<template>
    <div>
        <el-form :model="form" label-width="100px" ref="form">
            <el-row>
                <el-col :span="24"><p style="text-align: center;font-size:24px">人工任务详情</p></el-col>
            </el-row>
            <el-row style="margin-top: 12px">
                <el-col :span="24">
                    <el-form-item label="任务名称:" prop="taskName" >
                        {{form.taskName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务日期:" prop="taskDate" >
                        {{form.taskDate}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="计划执行时间:" prop="taskTime" >
                        {{form.taskTime}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="任务说明:" prop="taskInfo" >
                        {{form.taskInfo}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务事件:" prop="taskMethod" >
                        {{form.taskMethod}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务场景:" prop="taskScene" >
                        {{form.taskScene}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="完成时间:" prop="finishTime" >
                        {{form.finishTime}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注:" prop="remark" >
                        {{form.remark}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>

    export default {
        props: {
            kpiCode: String,
            bizDate: String,
            caseId:String,
            stepCode:String,
            toolbar: {
                default: "more"
            }
        },
        data() {
            return {
                form:{
                    taskName:"测试任务",
                    taskDate:"2020-02-20",
                    taskTime:"23:22:22",
                    taskInfo:'测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明',
                    taskMethod:'测试事件',
                    taskScene:'测试场景',
                    finishTime:"23:22:22",
                    remark:'测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明测试说明',
                },
                charData:[],
                colorSet:[],
                showChar:  false,
                kpiDetail:{},
                gridOptions: {
                    columnDefs: [],
                    rowData:[],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false,

                    },
                },
                data:{q:{}},
                opStatus:false
            }
        },
        mounted() {
            //页面需要数据可在此处调用接口赋值

            // let _this=this;
            // this.kpiDetail.kpiCode=this.kpiCode;
            // this.form.bizDate=this.bizDate;
            // this.kpiDetail.bizDate=this.bizDate;
            // this.$api.kpiDefineApi.queryKpiInfoMation(this.kpiDetail).then((resp) => {
            //     if(resp.status){
            //         _this.form.kpiName =resp.data.kpiName;
            //     }
            // });
            // this.$api.kpiDefineApi.getKpiDetail(this.kpiDetail).then((resp) => {
            //     if(resp.status){
            //         _this.kpiDetail =resp.data;
            //     }
            // });
            // this.data.q =this.kpiDetail;
            // this.$api.kpiDefineApi.getKpiDetails(this.data).then((resp) => {
            //     if(resp.data && resp.data.length>0){
            //         var rows=resp.data;
            //         let keys = Object.keys(rows[0]);
            //         _this.getPicData(rows,keys);
            //         var columnDefsArray=_this.getSqlGridOptions(keys);
            //         if(keys.indexOf("FACTOR_VALUE")>-1 && keys.indexOf("MANUAL_TAG")>-1){
            //             _this.opStatus=true;
            //             _this.gridOptions.api.setColumnDefs(_this.setColumnFiled(columnDefsArray));
            //         }else{
            //             _this.gridOptions.api.setColumnDefs(columnDefsArray);
            //         }
            //         _this.gridOptions.api.setRowData(rows);
            //     }
            // });
            // this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode).then((resp) => {
            //     if(resp.data && resp.data.length>0){
            //         var columnDefsArray=_this.getKpiGridOptions(resp.data);
            //         if(_this.opStatus){
            //             _this.gridOptions.api.setColumnDefs(_this.setColumnFiled(columnDefsArray));
            //         }else{
            //             _this.gridOptions.api.setColumnDefs(columnDefsArray);
            //         }
            //
            //     }
            // });
        },
        methods: {
            onCancel() {
                this.$emit("onClose");
            },
            reloadData() {
                let _this =this;
                this.$api.kpiDefineApi.getKpiDetails(this.data).then((resp) => {
                    if(resp.data && resp.data.length>0){
                        _this.gridOptions.api.setRowData(resp.data);
                    }
                });
            },
            getSqlGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item, field: item, cellClass: "left", suppressMovable:true}});
            },
            getKpiGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item.columnName, field: item.fieldName, cellClass: "left", suppressMovable:true}});
            },
            setColumnFiled(columnDefsArray){
                columnDefsArray.push({
                    colId: "#op", headerName: "操作", cellRenderer: "OpCellRender", pinned: "right",
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
            // executeKpi(){
            //     let _this=this;
            //     this.$api.kpiDefineApi.execTask(this.caseId,this.stepCode).then((resp) => {
            //         if(resp.status){
            //             _this.$message.success(resp.message);
            //             _this.reloadData();
            //         } else{
            //             _this.$message.error(resp.message);
            //         }
            //     });
            // },
            getPicData(rows,keys){
                let _this=this;
                if(keys.indexOf("FACTOR_VALUE")>-1){
                    rows.map(function(item){
                        if(item.FACTOR_VALUE == 1){
                            if(keys.indexOf("MANUAL_TAG")>-1 && item.MANUAL_TAG == 1){
                                _this.form.artificialCon++;
                            } else{
                                _this.form.normal++;
                            }
                        } else if(item.FACTOR_VALUE == 0) {
                            _this.form.abnormal++;
                        }
                    });
                    let normal ={};
                    normal.value=this.form.normal;
                    normal.name="正常数";
                    this.charData.push(normal);
                    this.colorSet.push("green");
                    let abnormal ={};
                    abnormal.value=this.form.abnormal;
                    abnormal.name="异常数";
                    this.colorSet.push("red");
                    this.charData.push(abnormal);
                    let artificialCon ={};
                    artificialCon.value=this.form.artificialCon;
                    artificialCon.name="人工一致";
                    this.colorSet.push("orange");
                    this.charData.push(artificialCon);
                    this.showChar=true;
                }
            },
            updateManul(param){
                let _this=this;
                const factor ={};
                factor.kpiCode=this.kpiDetail.kpiCode;
                factor.bizDate=new Date(this.form.bizDate);
                factor.bizNo=param.data.BIZ_NO;
                this.$api.kpiDefineApi.updateManul(factor).then((resp) => {
                    if(resp.status){
                        _this.reloadData();
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
