<template>
    <div>
        <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="100px"
                 style="padding: 10px;">
            <el-form-item label="日切频率" prop="taskExecScheduler">
                <el-button type="text" @click="editExecTime(form.execScheduler)">
                    {{form.execScheduler}}点击配置
                </el-button>
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
                    execScheduler:'',
                },
                rules: {
                    execScheduler: [{required: true, message: "请选择频率"}],
                },
            };
        },
        props: {
            execScheduler: {
                type: String,
                default: ''
            },
            actionOk: Function
        },
        mounted() {
            this.form.execScheduler = this.execScheduler;
        },
        methods: {
            editExecTime(execScheduler) {
                this.showDlg(execScheduler, this.setExecScheduler.bind(this));
            },
            showDlg(data, action) {
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {cornObj: data, action},
                        width: '530px',
                        title: this.$dialog.formatTitle('编辑频率', "edit"),
                    }
                );
            },
            setExecScheduler(cron) {
                this.form.execScheduler = cron;
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.changeDataApi.changeDayendByJob(this.form);
                    await this.$app.blockingApp(p);
                    //此处调用借口判断所有待办任务是否处理完成
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
