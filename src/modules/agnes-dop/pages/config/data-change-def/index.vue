<template>
    <div class="box-body">
        <el-card class="box-card" body-style="with:100%;height:100%" >
            <el-form class="list-body" ref="form" >
                <div>
                    <el-row class="list-row" type="flex" justify="end" :gutter="3">
                      <el-button size="small" @click="openChangeList" class="el-button">查看日切记录</el-button>
                      <el-button v-if="$hasPermission('agnes.app.conf.dayend.change')" size="small"
                                 @click="addChangeData" type="primary" class="el-button">日切
                      </el-button>
                      <el-button v-if="$hasPermission('agnes.app.conf.dayend.rule')" size="small" @click="addChangeRule"
                                 type="primary" class="el-button">日切规则
                      </el-button>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row class="list-row" type="flex" justify="space-between" >
                        <span class="data-font"><span class="gray-font-color">上一业务日期</span>{{lastTaskData}}</span>
                        <span class="data-font"><span class="gray-font-color">下一业务日期</span>{{nextTaskData}}</span>
                    </el-row>
                </div>

                <el-row class="list-row" type="flex" justify="center" >
                    <el-col :span="24" class="list-col">
                        <span class="data-font_large gray-font-color">当前业务日期</span>
                        <el-date-picker
                                v-model="nowTaskData"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="list-row" type="flex" justify="center" >
                    <el-col :span="24" class="list-col">
                        <span class="data-font"><span class="gray-font-color">操作人员</span>{{person}}</span>
                        <span style="margin-left: 50px" class="data-font"><span class="gray-font-color">操作时间</span>{{changeData}}</span>
                    </el-col>
                </el-row>
            </el-form>
    </el-card>
    </div>


</template>

<script>
    import ChangeDataDlg from "./change-data-dlg"
    import ChangeRuleDlg from "./change-rule-dlg"
    import ChangeDataList from "./change-data-list"

    export default {
        name: "index",
        components: {

        },
        data() {
            return {
                lastTaskData:'',
                nextTaskData:'',
                nowTaskData:'',
                person:'',
                changeData:'',
                execScheduler:'',
                dayendId:'',
            }
        },
        mounted() {
            this.loadChangeData();

        },
        watch: {

        },
        methods: {
            reloadData() {

            },
            async loadChangeData() {
                try {
                    const resp = await this.$api.changeDataApi.getChangeData();
                    let resChangeData = resp.data
                    this.lastTaskData = resChangeData.lastBizDate;
                    this.nextTaskData = resChangeData.nextBizDate;
                    this.execScheduler = resChangeData.execScheduler;
                    this.nowTaskData = resChangeData.bizDate;
                    this.person = resChangeData.updateUser;
                    this.changeData = resChangeData.updateTs;
                    this.dayendId = resChangeData.dayendId;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            showDlg(actionOk,type,execScheduler) {
                if(type==='data'){
                    this.$nav.showDialog(
                        ChangeDataDlg,
                        {
                            args: {actionOk},
                            width: '576px',
                            title: this.$dialog.formatTitle('日切'),
                        }
                    );
                }else if(type==='rule'){
                    this.$nav.showDialog(
                        ChangeRuleDlg,
                        {
                            args: {actionOk,execScheduler},
                            width: '600px',
                            title: this.$dialog.formatTitle('日切规则','edit'),
                        }
                    );
                }

            },
            async onAddChangeData() {
                await this.loadChangeData();
            },
            async addChangeData() {
                if (!this.nowTaskData) {
                    this.$message({
                        type: 'warning',
                        message: '请选择日切时间!'
                    });
                    return;
                }
                try {
                    let judgeTaskResp = await this.$api.changeDataApi.judgeTask();
                    if(judgeTaskResp.data&&judgeTaskResp.data===true){
                        this.$confirm('存在待办任务未处理完成，是否强制切换？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.stopAndChangeDay(this.nowTaskData)
                        }).catch(() => {
                            this.$message({
                            type: 'info',
                            message: '已取消'
                            });
                        });
                    }else{
                        this.checkWorkDay(this.nowTaskData)
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            checkWorkDay(nowTaskData){
                this.$confirm('确定要执行日期切换?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.changeWorkDay(nowTaskData);
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消'
                    });
                });

            },
          async stopAndChangeDay(nowTaskData) {
            try {
                let forwardBizDate = window.bizDate;
                let p = this.$api.changeDataApi.deleteTaskJobByBizDate(nowTaskData,forwardBizDate);
                let res = await this.$app.blockingApp(p);
                if(res.code==='success'){
                    await this.$api.changeDataApi.queryChangeData(nowTaskData);
                    await this.$message({type: 'success',message: '切换成功!'});
                    await this.loadChangeData();
                }else{
                    this.$msg.error('切换失败!');
                }

            } catch (e) {
              this.$msg.error(e);
            }
          },
            async changeWorkDay(nowTaskData){
                let p = this.$api.changeDataApi.queryChangeData(nowTaskData);
                await this.$app.blockingApp(p);
                await this.$message({type: 'success',message: '切换成功!'});
                await this.loadChangeData();
            },
            addChangeRule(){
                this.showDlg(this.onAddChangeData.bind(this),'rule',this.execScheduler);
            },
            openChangeList(){
                this.$drawerPage.create({
                    width: 'calc(100% - 250px)',
                    title: ['日切记录表'],
                    component: ChangeDataList,
                    args: {},
                    okButtonVisible:false,
                    cancelButtonTitle:'关闭',
                });
            },
        },
    }
</script>

<style scoped>
    .box-card{
        width: 80%;
        height: 90%;
    }
    .box-body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .list-body{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .el-button{
        width: 100px;
    }
    .list-row{
        margin-bottom: 12px;
    }
    .data-font{
        font-size: 14px;
    }
    .data-font_large{
        font-size: 18px;
    }
    .gray-font-color{
        color: #A9A9A9;
        margin-right: 8px;
    }
    .list-col{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    /*.el-border {*/
    /*    border: 1px solid rgb(238, 238, 238);*/
    /*}*/

</style>
