<template>
    <div>
        <el-form :model="form" label-width="90px" ref="form">
            <el-row>
                <el-col :span="24"><p style="text-align: center">指标任务详情</p></el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-row style="margin-top: 70px">
                        <el-col :span="15">
                            <el-form-item label="指标名称:" prop="kpiName" >
                                {{form.kpiName}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="业务日期:" prop="bizDate" >
                                {{form.bizDate}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="执行时间:" prop="createTime" >
                                {{form.createTime}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="正常数:" prop="normal" >
                                {{form.normal}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="异常数:" prop="abnormal" >
                                {{form.abnormal}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="人工一致:" prop="artificialCon" >
                                {{form.artificialCon}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="9">
                    <pie-chart v-show="showChar" :chart-data="charData" :color-set="colorSet" style=""></pie-chart>
                </el-col>
            </el-row>

            <gf-grid ref="grid" :options="gridOptions">
                <template slot="left">
                    <gf-button @click="executeKpi" v-show="jobStatus"  size="mini" icon="el-icon-video-play">执行</gf-button>
                    <gf-button @click="executeKpi" v-show="!jobStatus" size="mini" icon="el-icon-refresh">重新执行</gf-button>
                </template>
            </gf-grid>
            <p style="margin:20px 0">*根据不同的指标任务场景。显示相应的指标明细</p>
        </el-form>
    </div>
</template>

<script>

    export default {
        props: {
            kpiCode: String,
            bizDate: String,
            toolbar: {
                default: "more"
            }
        },
        data() {
            return {
                data:{},
                form:{kpiName:"",createTime:"",bizDate:"",normal:0,abnormal:0,artificialCon:0},
                charData:[],
                colorSet:[],
                showChar:  false,
                jobStatus: true,
                kpiDetail:{kpiName:""},
                gridOptions: {
                    columnDefs: [],
                    rowData:[],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false,

                    },
                },
            }
        },
        mounted() {
            let _this=this;
            this.kpiDetail.kpiCode=this.kpiCode;
            this.form.bizDate=this.bizDate;
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
            this.reloadData();
        },
        methods: {
            reloadData() {
                let _this=this;
                const data = {};
                data.q =this.kpiDetail;
                this.$api.kpiDefineApi.getKpiDetails(data).then((resp) => {
                    if(resp.data && resp.data.length>0){
                        var rows=resp.data;
                        let keys = Object.keys(rows[0]);
                        _this.getPicData(rows,keys);
                        _this.gridOptions.api.setColumnDefs(_this.getSqlGridOptions(keys));
                        _this.gridOptions.api.setRowData(rows);
                    }
                });
                this.$api.kpiDefineApi.getKpiFields(this.kpiDetail.kpiCode).then((resp) => {
                    if(resp.data && resp.data.length>0){
                        _this.gridOptions.api.setColumnDefs(_this.getKpiGridOptions(resp.data));
                    }
                });
            },
            getSqlGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item, field: item, cellClass: "left", suppressMovable:true}});
            },
            getKpiGridOptions(resp) {
                return resp.map((item)=>{return {headerName: item.columnName, field: item.fieldName, cellClass: "left", suppressMovable:true}});
            },
            executeKpi(){

            },
            getPicData(rows,keys){
                if(keys.indexOf("KPI_STATUS")>-1){
                    rows.map(function(item){
                        if(item.KPI_STATUS == 0){
                            this.form.normal++;
                        } else if(item.KPI_STATUS == 1){
                            this.form.abnormal++;
                        } else{
                            this.form.artificialCon++;
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
                this.$api.kpiDefineApi.updateReasonAndManul(param).then((resp) => {
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
