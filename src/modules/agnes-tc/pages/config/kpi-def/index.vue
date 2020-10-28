<template>
    <div>
        <el-form :model="form" label-width="90px" ref="form" style="height: 100%" :rules="remarkRule">
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
                        <gf-input
                                :max-byte-len="2000"
                                :readonly="type==='done'"
                                type="textarea"
                                :rows="2"
                                :placeholder= "placeholder"
                                v-model="form.remark">
                        </gf-input>
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
            },
            actionOk: Function
        },
        data() {
            return {
                height: "300px",
                form:{kpiName:"",createTime:"",bizDate:"",normal:0,abnormal:0,artificialCon:0,remark:''},
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
                        remark: "",
                        caseId: "",
                        stepCode: ""
                    }
                },
                remarkRule: {
                    remark: [
                        {required: true, message: '备注必填'},
                    ],
                },
                placeholder: "请输入备注",
            }
        },
        mounted() {
          this.taskCommit.inst.taskId = this.row.taskId;
          this.taskCommit.stepInfo.caseId = this.row.caseId;
          this.taskCommit.stepInfo.stepCode = this.row.stepCode;
          this.kpiDetail.kpiCode= this.row.taskKey;
          this.form.bizDate= this.row.bizDt;
          this.form.createTime = this.row.taskStartTm
          this.data.q.bizDate = this.row.bizDt;
            if(this.type === 'done'){
                this.placeholder = '';
            }
            if(this.row.allowManualConfirm && this.row.allowManualConfirm === '1' && this.type === 'todo'){
                this.remarkRule =  {remark: [
                    {required: true, message: '备注必填'},
                ]}
            }else{
                this.remarkRule = {}
            }
          this.init();
        },
        methods: {
            async init(){
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
                const p2 = this.$api.kpiDefineApi.getKpiDetails(this.data);
                const resp2 = await this.$app.blockingApp(p2);
                if(resp2.data && resp2.data.length>0){
                  const rows=resp2.data;
                  const keys = Object.keys(rows[0]);
                  this.getPicData(rows,keys);
                  const columnDefsArray=this.getSqlGridOptions(keys);
                  if(keys.indexOf("STATUS")>-1){
                    this.opStatus=true;
                    this.gridOptions.api.setColumnDefs(this.setColumnFiled(columnDefsArray));
                  }else{
                    this.gridOptions.api.setColumnDefs(columnDefsArray);
                  }
                  this.gridOptions.api.setRowData(rows);
                }
                const p3 = this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode);
                const resp3 = await this.$app.blockingApp(p3);
                if(resp3.data && resp3.data.length>0){
                  const columnDefsArray=this.getKpiGridOptions(resp3.data);
                  if(this.opStatus){
                    this.gridOptions.api.setColumnDefs(this.setColumnFiled(columnDefsArray));
                  }else{
                    this.gridOptions.api.setColumnDefs(columnDefsArray);
                  }
                }
              } catch (reason) {
                this.$msg.error(reason);
              }
            },
            onCancel() {
                this.$emit("onClose");
            },
            onSave() { //点击重新执行的事件
                this.executeKpi()
            },
            async onExtendButton(){//点击强制通过的事件
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                    this.taskCommit.stepInfo.remark = this.form.remark;
                    this.taskCommit.stepInfo.stepStatus = "07";
                    this.taskCommit.stepInfo.jobId = this.row.jobId;
                    try {
                        const p = this.$api.taskTodoApi.confirmKpiTask(this.taskCommit)
                        const resp = await this.$app.blockingApp(p);
                        if (resp.data) {
                            if (this.actionOk) {
                                await this.actionOk();
                            }
                            this.$msg.success('提交成功');
                            this.$emit("onClose");
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
                            return !(params.data.STATUS === "0");
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
                if(keys.indexOf("STATUS")>-1){
                    rows.map(function(item){
                        if(item.STATUS === '0'){
                          _this.form.abnormal++;
                        } else if(item.STATUS === '1') {
                          _this.form.artificialCon++;
                        } else if(item.STATUS === '2'){
                          _this.form.normal++;
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
                factor.bizKey=param.data.PRODUCT_CODE;
                const factors =[];
                factors.push(factor);
                const params ={"factors":factors,"remarks":""};
                this.$api.kpiDefineApi.updateManul(params).then((resp) => {
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
    }

    .first{
        margin-top: 25px;
        margin-bottom: 30px;
        margin-left: 40px;
        float: left;
    }
</style>