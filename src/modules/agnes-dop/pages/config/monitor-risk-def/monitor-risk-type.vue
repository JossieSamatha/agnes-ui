<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <div class="err-title">异常记录</div>
            <el-form-item label="任务名称" prop="taskName">
                <span>{{form.taskName}}</span>
            </el-form-item>
            <el-form-item label="异常类型" prop="errType">
                <gf-dict-select :disabled="true" dict-type="AGNES_DOP_ERR_TYPE" v-model="form.errType"/>
            </el-form-item>
            <el-form-item label="异常原因" prop="errReason">
                <span>{{form.errReason}}</span>
            </el-form-item>
            <el-form-item label="异常描述" prop="errDesc">
                <span>{{form.errDesc}}</span>
            </el-form-item>

            <div class="err-title">风险分析</div>
            <el-form-item label="风险等级" prop="riskLevel">
                <gf-dict-select dict-type="AGNES_DOP_RISK_LEVEL" v-model="form.riskLevel"/>
            </el-form-item>
            <el-form-item label="风险类型" prop="riskType">
                <gf-dict-select dict-type="AGNES_DOP_RISK_TYPE" v-model="form.riskType"/>
            </el-form-item>
            <el-form-item label="风险描述" prop="riskDesc">
                <gf-input type="textarea" v-model="form.riskDesc"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" cancel-button-title="取消" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    taskName: "",
                    errType: "",
                    errReason: "",
                    errDesc: "",
                    riskLevel: "",
                    riskType: "",
                    riskDesc: "",
                },
                rules: {
                },
            };
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            ui:String,
            row: Object,
            actionOk: Function
        },
        mounted() {
            Object.assign(this.form, this.row);
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if (this.ui==="1"){
                        let dealRisk = this.$api.monitorRiskApi.dealRisk(this.form);
                        await this.$app.blockingApp(dealRisk);
                        this.$msg.success('保存成功');
                    }else if(this.ui==="2"){
                        let checkRisk = this.$api.monitorRiskApi.checkRisk("04", this.form);
                        await this.$app.blockingApp(checkRisk);
                        this.$msg.success('审核通过');
                    }else {
                        let checkRisk = this.$api.monitorRiskApi.checkRisk("03",this.form);
                        await this.$app.blockingApp(checkRisk);
                        this.$msg.success('发布成功');
                    }
                    if (this.actionOk){
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>
<style scoped>
    .err-title{
        color: #7acaec;
        font-size: 16px;
    }
</style>
