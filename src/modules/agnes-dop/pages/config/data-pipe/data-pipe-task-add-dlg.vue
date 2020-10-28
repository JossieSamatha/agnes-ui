<template>
    <div>
        <el-form :model="form" label-width="90px" ref="form" style="height: 100%">
            <el-form-item label="当前操作" prop="taskName" style="width: 100%">
                <template>
                    <el-select ref="option" v-model="form.curStep" filterable placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in options"
                                :key="item.confId"
                                :label="item.confName"
                                :value="item.confId">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="使用状态" prop="status">
                <gf-dict-select dict-type="DATA_PIPE_TASK_STATUS" v-model="form.status"></gf-dict-select>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        name: "data-pipe-task-add-dlg",
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
                    confName: '',
                    status: '',
                    curStep: ''
                },
                options: []
            }
        },
        mounted() {
            if (this.mode == "edit") {
                this.form = this.row.data
            }
            this.loadTaskInfo();
        },
        methods: {
            async loadTaskInfo() {
                try {
                    const p = this.$api.dataPipeApi.queryDbList();
                    const res = await this.$app.blockingApp(p);
                    this.options = res.data
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                this.form.confName = this.$refs.option._data.query;
                try {
                    if (this.actionOk) {
                        await this.actionOk(this.form);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        },
    }
</script>