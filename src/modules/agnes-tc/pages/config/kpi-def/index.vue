<template>
    <div>
        <el-form :model="form" label-width="90px" ref="form" style="height: 100%">
            <el-row>
                <el-col :span="24"><p style="text-align: center;font-size: 20px; margin-bottom: 20px">指标任务详情</p></el-col>
            </el-row>
            <el-row :gutter="16" style="margin-bottom: 20px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>指标详情</span>
                    </div>
                    <div class="text item">
                        <span class="first">指标名称:{{form.kpiName}}</span>
                    </div>
                    <div class="clear"></div>
                    <div class="text item" >
                        <span class="span">业务日期:{{form.bizDate}}</span>
                        <span class="span">执行时间:{{form.createTime}}</span>
                    </div>
                    <div class="clear"></div>
                    <div class="text item">
                        <span class="span">正常数:{{form.normal}}</span>
                        <span class="span">异常数:{{form.abnormal}}</span>
                        <span class="span">人工一致:{{form.artificialCon}}</span>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>数据图表</span>
                    </div>
                    <div style="text-align: center">
                        <pie-chart v-show="showChar" :chart-data="charData" :color-set="colorSet"></pie-chart>
                        <img v-show="!showChar" :src="require('../../../../../assets/img/no-data.png')" style="margin-top:-20px">
                        <p v-show="!showChar" style="margin-top: 20px">未关联指标状态</p>
                    </div>
                </el-card>
            </el-row>
            <gf-grid ref="grid" :options="gridOptions" class="grid-class" :height="height">
            </gf-grid>
            <el-row  style="marginTop:12px;marginLeft:-10px">
                <el-col :span="24">
                    <el-form-item label-width="0px"  label="" prop="remark" >
                        <el-input
                                :readonly="type==='done'"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注"
                                v-model="form.reason">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>

    export default {
        props: {
            type:String,
            row: Object,
            toolbar: {
                default: "more"
            }
        },
        data() {
            return {
                height: "calc(100% - 348px)",
                form:{kpiName:"",createTime:"",bizDate:"",normal:0,abnormal:0,artificialCon:0},
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
                opStatus:false,
                taskCommit: {
                    inst: {
                        taskId: "",
                    },
                    stepInfo :{
                        reason: "",
                        caseId: "",
                        stepCode: ""
                    }
                },
            }
        },
        mounted() {
            let _this=this;
            _this.taskCommit.inst.taskId = _this.row.taskId;
            _this.taskCommit.stepInfo.caseId = _this.row.caseId;
            _this.taskCommit.stepInfo.stepCode = _this.row.stepCode;
            this.kpiDetail.kpiCode=this.row.taskKey;
            this.form.bizDate=this.row.bizDt;
            this.form.createTime = this.row.taskStartTm
            this.kpiDetail.bizDate=this.row.bizDt;
            this.$api.kpiDefineApi.queryKpiInfoMation(this.kpiDetail).then((resp) => {
                if(resp.status){
                    _this.form.kpiName =resp.data.kpiName;
                }
            });
            this.$api.kpiDefineApi.getKpiDetail(this.kpiDetail).then((resp) => {
                if(resp.status){
                    _this.kpiDetail =resp.data;
                }
            });
            this.data.q =this.kpiDetail;
            this.$api.kpiDefineApi.getKpiDetails(this.data).then((resp) => {
                if(resp.data && resp.data.length>0){
                    var rows=resp.data;
                    let keys = Object.keys(rows[0]);
                    _this.getPicData(rows,keys);
                    var columnDefsArray=_this.getSqlGridOptions(keys);
                    if(keys.indexOf("FACTOR_VALUE")>-1 && keys.indexOf("MANUAL_TAG")>-1){
                        _this.opStatus=true;
                        _this.gridOptions.api.setColumnDefs(_this.setColumnFiled(columnDefsArray));
                    }else{
                        _this.gridOptions.api.setColumnDefs(columnDefsArray);
                    }
                    _this.gridOptions.api.setRowData(rows);
                }
            });
            this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode).then((resp) => {
                if(resp.data && resp.data.length>0){
                    var columnDefsArray=_this.getKpiGridOptions(resp.data);
                    if(_this.opStatus){
                        _this.gridOptions.api.setColumnDefs(_this.setColumnFiled(columnDefsArray));
                    }else{
                        _this.gridOptions.api.setColumnDefs(columnDefsArray);
                    }

                }
            });
        },
        methods: {
            onCancel() {
                this.$emit("onClose");
            },
            onSave() { //点击重新执行的事件
                this.executeKpi()
            },
            async onExtendButton(){//点击强制通过的事件
                    this.taskCommit.stepInfo.reason = this.form.reason;
                    this.taskCommit.stepInfo.stepStatus = "07";
                    try {
                        const p = this.$api.taskTodoApi.confirmKpiTask(this.taskCommit)
                        const resp = await this.$app.blockingApp(p);
                        if (resp.data) {
                            if (this.actionOk) {
                                await this.actionOk();
                            }
                            this.$msg.success('提交成功');
                            this.$dialog.close(this);
                        } else {
                            this.$msg.warning('提交失败');
                        }
                    } catch (e) {
                        this.$msg.error(e);
                    }

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
                    cellClassRules: {
                        'invisible-cell': function(params) {
                            return !(params.data.FACTOR_VALUE === "1" && params.data.MANUAL_TAG === "1");
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
            executeKpi(){
                let _this=this;
                let kpiTaskReq = {}
                kpiTaskReq.caseId = this.row.caseId;
                kpiTaskReq.stepCode = this.row.stepCode;
                kpiTaskReq.bizDate = this.row.bizDt;
                kpiTaskReq.taskId = _this.row.taskId;
                this.$api.kpiDefineApi.execTask(kpiTaskReq).then((resp) => {
                    if(resp.status){
                        _this.$message.success(resp.message);
                        _this.reloadData();
                    } else{
                        _this.$message.error(resp.message);
                    }
                });
            },
            getPicData(rows,keys){
                let _this=this;
                if(keys.indexOf("FACTOR_VALUE")>-1){
                    rows.map(function(item){
                        if(item.FACTOR_VALUE === 1){
                            if(keys.indexOf("MANUAL_TAG")>-1 && item.MANUAL_TAG === 1){
                                _this.form.artificialCon++;
                            } else{
                                _this.form.normal++;
                            }
                        } else if(item.FACTOR_VALUE === 0) {
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
    .box-card {
        width: 49%;
        float: left;
        height: 300px;
        margin-right: 1%;
    }

    .grid-class{
        margin-left: -10px;
    }

    .text {
        font-size: 16px;
    }

    .item {
        /*margin-bottom: 18px;*/
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .clear{
        clear:both;
    }
    .span{
        margin-top: 10px;
        margin-bottom: 30px;
        margin-left: 40px;
        margin-right: 40px;
        float: left;
        /*width: 33%;*/
        /*max-width: 180px;*/
    }

    .first{
        margin-top: 25px;
        margin-bottom: 30px;
        margin-left: 40px;
        float: left;
    }
</style>