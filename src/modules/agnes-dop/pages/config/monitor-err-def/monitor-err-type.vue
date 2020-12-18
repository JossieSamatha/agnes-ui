<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="任务名称" prop="taskName">
                <span>{{form.taskName}}</span>
            </el-form-item>
            <el-form-item label="异常原因" prop="errReason">
                <gf-input type="textarea" v-model="form.errReason"/>
            </el-form-item>
            <el-form-item label="异常类型" prop="errType">
                <gf-dict-select dict-type="AGNES_DOP_ERR_TYPE" v-model="form.errType"/>
            </el-form-item>
            <el-form-item label="异常描述" prop="errDesc">
                <gf-input type="textarea" v-model="form.errDesc"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'"  :on-save="onSave" cancel-button-title="取消" ok-button-title="确定"></dialog-footer>
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
                        let dealErr = this.$api.monitorErrApi.dealErr(this.form);
                        await this.$app.blockingApp(dealErr);
                        this.$msg.success('保存成功');
                    }else if(this.ui==="2"){
                        let checkErr = this.$api.monitorErrApi.checkErr("04", this.form);
                        await this.$app.blockingApp(checkErr);
                        this.$msg.success('审核通过');
                    }else{
                        let checkErr = this.$api.monitorErrApi.checkErr("03",this.form);
                        await this.$app.blockingApp(checkErr);
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
