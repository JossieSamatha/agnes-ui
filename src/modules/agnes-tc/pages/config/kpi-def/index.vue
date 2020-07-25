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
                    <pie-chart :chart-data="charData" :color-set="colorSet" style=""></pie-chart>
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
                jobStatus:true,
                kpiDetail:{kpiName:"123"},
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
            this.kpiDetail.kpiCode="AGNES_ACCOUNT_TOCHECK";
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
            const data = {};
            data.q =this.kpiDetail;
            this.$api.kpiDefineApi.getKpiDetails(data).then((resp) => {
                if(resp.data && resp.data.length>0){
                    var rows=resp.data;
                    let keys = Object.keys(rows[0]);
                    _this.getPicData(rows,keys);
                    _this.gridOptions.api.setColumnDefs(_this.getSqlGridOptions(keys,false));
                    _this.gridOptions.api.setRowData(rows);
                }
            });
            this.$api.kpiDefineApi.getKpiFields(this.kpiDetail).then((resp) => {
                if(resp.data && resp.data.length>0){
                    _this.gridOptions.api.setColumnDefs(_this.getSqlGridOptions(resp.data,true));
                }
            });

        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            getSqlGridOptions(resp,flag) {
                let columnDefsArray = [];
                if(flag){
                    for(var i =0;i<resp.length;i++){
                        columnDefsArray.push({
                            headerName: resp[i].columnName, field: resp[i].fieldName, cellClass: "left", suppressMovable:true
                        });
                    }
                }else{
                      for(var j =0;j<resp.length;j++){
                        columnDefsArray.push({
                            headerName: resp[j], field: resp[j], cellClass: "left", suppressMovable:true
                        });
                    }
                }
                columnDefsArray.push({
                    colId: "#op", headerName: "操作", cellRenderer: "OpCellRender", pinned: "right",cellRenderParams: {
                        opButtons: this.buildbutton()
                    }
                });
                return columnDefsArray;
            },
            executeKpi(){

            },
            getPicData(rows,keys){
                if(keys.indexOf("KPI_STATUS")>-1){
                    for(var i=0;i<rows.length;i++){
                        if(rows[i].KPI_STATUS == 0){
                            this.form.normal++;
                        } else if(rows[i].KPI_STATUS == 1){
                            this.form.abnormal++;
                        } else{
                            this.form.artificialCon++;
                        }
                    }
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
                }
            },
            buildbutton(){
                let opButtons = [];
                const colButtons = [
                    {key: 'editOrgType', title: '设为人工一致'}
                ];
                colButtons.forEach(x => {
                    const item = {
                        key: x.key,
                        title: x.title,
                        cellClass: x.cellClass,
                        onClick: (params) => {
                            params.api.execCmd(x.command || x.key, params);
                        }
                    };
                    opButtons.push(item);
                });
                return opButtons;
            }
        }
    }
</script>

<style scoped>

</style>
