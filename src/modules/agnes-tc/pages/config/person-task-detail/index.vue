<template>
    <div>
        <el-form :model="remarkForm" label-width="100px" ref="remarkForm" :rules="remarkRule">
            <el-row>
                <el-col :span="24"><p style="text-align: center;font-size: 20px; margin-bottom: 20px">人工任务详情</p></el-col>
            </el-row>
            <el-row style="margin-top: 12px">
                <el-col :span="24">
                    <el-form-item label="任务名称:" prop="stepName" >
                        {{stepName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务处理日期:" prop="taskStartTm" >
                        {{taskStartTm}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="计划执行时间:" prop="bizDate" >
                        {{bizDate}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="任务说明:" prop="taskRemark" >
                        {{taskRemark}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item v-if="type==='done'" label="备注:">
                        {{remarkForm.remark}}
                    </el-form-item>
                    <el-form-item v-if="type==='todo'" label="备注:" prop="remark" >
                        <gf-input
                                :max-byte-len="2000"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入任务说明"
                                v-model="remarkForm.remark">
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
            }
        },
        data() {
            return {
                remarkForm:{remark:''},
                stepName:'',
                taskRemark:'',
                taskId:'',
                bizDate: '',
                taskStartTm:'',
                caseId:'',
                stepCode:'',
                remark: '',
                remarkRule: {
                    remark: [
                        {required: true, message: '备注必填'},
                    ],
                },
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
            }
        },
        mounted() {
            this.stepName = this.row.stepName
            this.taskRemark = this.row.taskRemark
            this.taskId = this.row.taskId
            this.bizDate = this.row.bizDt
            this.taskStartTm = this.row.taskStartTm
            this.caseId = this.row.caseId
            this.stepCode = this.row.stepCode
            this.remarkForm.remark = this.row.remark
        },
        methods: {
            onCancel() {
                this.$emit("onClose");
            },
            async onSave(){
                const ok = await this.$refs['remarkForm'].validate();
                if (!ok) {
                    return;
                }
                this.taskCommit.inst.taskId = this.row.taskId;
                this.taskCommit.stepInfo.caseId = this.row.caseId;
                this.taskCommit.stepInfo.stepCode = this.row.stepCode;
                this.taskCommit.stepInfo.remark = this.remarkForm.remark;
                this.taskCommit.stepInfo.stepStatus = "06";
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
        }
    }
</script>

<style scoped>

</style>
