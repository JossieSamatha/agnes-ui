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
        <dialog-footer :ok-button="mode !== 'view'" :on-cancel="onBack" :on-save="onSave" :cancel-button-title="ui==1?'取消':'驳回'" :ok-button-title="ui==1?'提交':'通过'"></dialog-footer>
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
            async onBack()  {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if (this.ui===2){
                        await this.$api.monitorErrApi.checkErr("02",this.form);
                        this.$msg.success('驳回成功');
                    }
                    if (this.actionOk){
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if (this.ui===1){
                        await this.$api.monitorErrApi.dealErr(this.form);
                        this.$msg.success('提交成功');
                    }else{
                        await this.$api.monitorErrApi.checkErr("03",this.form);
                        this.$msg.success('通过成功');
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

</style>
