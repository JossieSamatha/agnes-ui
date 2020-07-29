<template>
    <div>
        <el-form class="fit-box" ref="form" :model="form" :rules="rules">
            <el-form-item label="原因" label-width="95px" prop="reason">
                <gf-input type="text" v-model="form.reason"/>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="save" ok-button-title="提交"></dialog-footer>
    </div>
</template>

<script>

    export default {
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                form: {
                    inst: {
                        taskId: "",
                    },
                    userId: "",
                    reason: ""
                },
                rules: {
                    'reason': [{required: true, message: "请输入原因"}],
                },
            }
        },
        mounted() {
            this.form.inst.taskId = this.row.taskId;
        },
        methods: {
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.taskTodoApi.confirmKpiTask(this.form)
                    await this.$app.blockingApp(p);

                    if (p.data) {
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$msg.success('提交成功');
                        this.$dialog.close(this);
                    } else {
                        this.$msg.warning('提交失败');
                    }
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }

</script>