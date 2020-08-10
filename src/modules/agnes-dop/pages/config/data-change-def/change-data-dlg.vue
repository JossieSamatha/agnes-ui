<template>
    <div>
        <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="日切时间" prop="changeDataTime">
                <el-date-picker
                        v-model="form.changeDataTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                form:{
                    changeDataTime: '',
                },
                rules: {
                    changeDataTime: [{required: true, message: "请选择日切时间"}],
                },
            };
        },
        props: {
            actionOk: Function
        },
        mounted() {

        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    // const p = this.$api.caseConfigApi.saveCaseDef(this.form);
                    // await this.$app.blockingApp(p);
                    //此处调用借口判断所有待办任务是否处理完成
                    this.$confirm('存在未处理完成的代办任务, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //调用接口处理所有任务
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                    if (this.actionOk) {
                        await this.actionOk(this.form);
                    }
                    this.$msg.success('保存成功');
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
