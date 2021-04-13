<template>
    <div>
        <el-form :model="form" :disabled="mode=='view'" ref="form" :rules="rules" label-width="110px"
                 style="padding: 10px">
            <el-form-item label="业务编号" prop="bizKey">
                <gf-input v-model="form.bizKey" clear-regex="[^0-9]"  style="width: 60%"/>
            </el-form-item>
            <el-form-item label="业务类别" prop="taskId">
                <el-select v-model="form.taskId" placeholder="请选择"  style="width: 60%">
                    <el-option
                            v-for="item in taskTypeOptions"
                            :key="item.taskId"
                            :label="item.taskName"
                            :value="item.taskId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件上传">
                <div class="rule-table">
                    <task-file-upload style="width: 100%;"
                                    :disabled="this.mode=='add'?false:true"
                                    :showRemove="this.mode=='add'?true:false"
                                    :src-doc-id="this.docId"
                                      :folder="3"
                                    :file-list="this.form.taskFiles">
                    </task-file-upload>
                </div>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="save" :ok-button-title="okTitle" :ok-button-visible="mode != 'view'"></dialog-footer>
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
                    bizKey:'',
                    taskId:'',
                    taskFiles:[],
                },
                taskTypeOptions:[],
                isNoEdit: false,
                okTitle: '保存',
                docId: '',
                receipt: 'receipt',
                rules: {
                    bizKey: [
                        {required: true, message: '请输入业务编号', trigger: 'blur'}
                    ],
                    taskId: [
                        {required: true, message: '请选择业务类别', trigger: 'blur'}
                    ],
                },
            }
        },

        beforeMount() {
            if (this.mode != "add") {
                Object.assign(this.form, this.row);
            }
            this.initData();
        },
        methods: {
            async initData(){
                const e = this.$api.taskDefineApi.getTaskListByType({taskType:'8'});
                const taskR = await this.$app.blockingApp(e);
                if(taskR.data) {
                    this.taskTypeOptions = taskR.data
                }
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                if(this.form.taskFiles.length<1){
                    this.$msg.warning('请上传文件！');
                    return ;
                }
                try {
                    const p = this.$api.icrTaskApi.saveIcrTask(this.form);
                    let resp = await this.$app.blockingApp(p);
                    if(resp.code=='error'){
                        this.$msg.warning(resp.message);
                        return ;
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }

    }
</script>
