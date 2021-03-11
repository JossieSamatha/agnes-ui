<template>
    <div class="datavPage" style="position: relative; height: 100%;padding: 0;">
        <el-checkbox-group class="bizTypeCheck" v-model="checkedGroupType" size="small">
            <el-checkbox key="-1" label="-1" border  @change="selectAll" >全部</el-checkbox>
            <el-checkbox v-for="item in groupArr" :key="item.id" :label="item.id" border  @change="selectByItem(params,'gruop')" >{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group class="bizTypeCheck" v-model="checkedBizType" size="small">
            <el-checkbox v-for="item in bizTypeArr" :key="item.dictId" :label="item.dictId" border  @change="selectByItem(params,'bizType')">{{item.dictName}}</el-checkbox>
        </el-checkbox-group>
        <div class="container">
            <module-card title="产品任务">
                <template slot="content">
                    <gf-grid ref="productGrid" grid-no="product-task-field" :query-args="productQuery" height="410px" style="margin-top: -40px"></gf-grid>
                </template>
            </module-card>
            <module-card title="风险事件">
                <template slot="content">
                    <RiskTask style="height: 300px;margin-top: -40px"></RiskTask>
                </template>
            </module-card>
        </div>
    </div>
</template>

<script>
    import RiskTask from "../../../../agnes-dop/pages/config/monitor-risk-def";

    export default {
        components: {
            RiskTask
        },
        data() {
            return {
                groupArr: [],
                bizTypeArr: [],
                checkedGroupType:[],
                checkedBizType:[],
                bizDate: window.bizDate,
                groupIds:[],
                bizTypes:[],
                productQuery:{
                    groupIds:'',
                    bizTypes:'',
                    bizDate: window.bizDate,
                },
                riskQuery:{},
            }
        },
        mounted() {
            this.initParams();
        },
        methods:{
            productGridReloadData() {
                let checkedGroupTypeStr = '';
                this.groupIds.forEach(((item,index)=>{
                    if(index!=0){
                        checkedGroupTypeStr=checkedGroupTypeStr+','
                    }
                    checkedGroupTypeStr=checkedGroupTypeStr+item;
                }));
                let checkedBizTypeStr = '';
                this.bizTypes.forEach(((item,index)=>{
                    if(index!=0){
                        checkedBizTypeStr=checkedBizTypeStr+','
                    }
                    checkedBizTypeStr=checkedBizTypeStr+item;
                }));
                this.productQuery.groupIds=checkedGroupTypeStr;
                this.productQuery.bizTypes=checkedBizTypeStr;
                this.$refs.productGrid.reloadData();
            },
            async initParams(){
                this.bizTypeArr = this.$app.dict.getDictItems('AGNES_BIZ_CASE');
                const p = this.$api.userGroupApi.getUserGroupByTag({'userGroupTag': '03'});
                const resp = await this.$app.blockingApp(p);
                if(resp){
                    let groupList = resp.data;
                    groupList.forEach((item)=>{
                       this.groupArr.push({id: item.userGroupId,label: item.userGroupName});
                        this.checkedGroupType.push(item.userGroupId);
                    });
                    this.groupIds = this.checkedGroupType;
                    this.productGridReloadData();
                    this.checkedGroupType.push("-1");
                }
            },
            selectAll(params){
                this.checkedGroupType=[];
                this.groupIds = [];
                this.bizTypes = [];
                if(params){
                    this.groupArr.forEach((item)=>{
                        this.checkedGroupType.push(item.id);
                    })
                    this.groupIds = this.checkedGroupType;
                    this.bizTypes = this.checkedBizType;
                    this.productGridReloadData();
                    this.checkedGroupType.push("-1");
                }else {
                    this.productGridReloadData();
                }
            },
            selectByItem(params,type){
                this.groupIds = [];
                this.bizTypes = [];
                if(type != 'bizType'){
                    if(!params && this.checkedGroupType.includes("-1")){
                        this.checkedGroupType.splice(this.checkedGroupType.indexOf("-1"), 1);
                    }
                }
                this.groupIds = this.checkedGroupType;
                this.bizTypes = this.checkedBizType;
                this.productGridReloadData();
            },
            // 重新执行
            reExecute(params) {
                const rowData = params.data;
                let kpiTaskReq = {}
                kpiTaskReq.caseId = rowData.caseId;
                kpiTaskReq.stepCode = rowData.stepCode;
                kpiTaskReq.bizDate = this.bizDate;
                kpiTaskReq.taskId = rowData.taskId;
                this.$api.kpiDefineApi.execTask(kpiTaskReq).then((resp) => {
                    if (resp.data.status) {
                        this.$msg.success("重新执行成功");
                        this.productGridReloadData();
                    } else {
                        this.$msg.error("操作失败");
                    }
                });
            },

            // 手工确认
            async actionConfirm(params) {
                let taskCommit = {
                    stepInfo: {},
                    inst: {
                        taskId: "",
                    },
                    paramListStr:'',
                };
                taskCommit.stepInfo.remark = params.data.remark;
                taskCommit.stepInfo.stepStatus = "06";
                taskCommit.stepInfo.jobId = params.data.jobId;
                taskCommit.inst.taskId = params.data.taskId;
                taskCommit.stepInfo.stepCode = params.data.stepCode;
                taskCommit.stepInfo.bizDate = this.bizDate;
                taskCommit.stepInfo.caseId = params.data.caseId;
                taskCommit.paramListStr = JSON.stringify(params.data.paramList);
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.productGridReloadData(); // 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 干预通过
            async forcePass(params) {
                let taskCommit = {
                    stepInfo: {},
                    inst: {
                        taskId: "",
                    },
                };

                taskCommit.stepInfo.remark = params.data.remark;
                taskCommit.stepInfo.stepStatus = "07";
                taskCommit.stepInfo.jobId = params.data.jobId;
                taskCommit.inst.taskId = params.data.taskId;
                taskCommit.stepInfo.stepCode = params.data.stepCode;
                taskCommit.stepInfo.bizDate = this.bizDate;
                taskCommit.stepInfo.caseId = params.data.caseId;
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(taskCommit)
                    const resp = await this.$app.blockingApp(p);
                    if (resp.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.productGridReloadData();// 刷新页面数据
                        this.$emit("onClose");
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },

            // 查看指标详情
            showIndexDetail(params) {
                const row = params.data;
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(100% - 250px)',
                    title: [row.stepName],
                    component: 'monitor-detail-page',
                    args: {stepCode: row.stepCode, stepActKey: row.stepActKey, bizDate: this.bizDate, status: 3},
                    cancelButtonTitle: '返回',
                    okButtonVisible: false
                });
            },
        }
    }
</script>

<style scoped>
    .container {
        flex: 1;
        height: calc(100% - 110px);
        overflow: auto;
    }
</style>