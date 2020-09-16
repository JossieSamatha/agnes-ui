<template>
    <div>
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">

            <el-form-item label="渠道代码" prop="dopReChannel.channelCode">
                <gf-input type="text" v-model="form.dopReChannel.channelCode"  :max-byte-len="8"/>
            </el-form-item>

            <el-form-item label="渠道名称" prop="dopReChannel.channelName">
                <gf-input type="text" v-model="form.dopReChannel.channelName"/>
            </el-form-item>

            <el-form-item label="渠道类型" prop="dopReChannel.channelType">
<!--                <gf-input type="text" v-model="form.dopReChannel.channelType"/>-->
                <gf-dict-select dict-type="AGNES_DOP_CHANNEL_TYPE" v-model="form.dopReChannel.channelType"/>
            </el-form-item>

        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="save" :on-cancel="cancel"></dialog-footer>
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
                    dopReChannel: {
                        channelId: '',
                        channelCode: '',
                        channelName: '',
                        channelType: '',
                        channelStatus: ''
                    },
                },
                rules: {
                    'dopReChannel.channelCode': [
                        {  required: true, message: '请填写渠道代码', trigger: 'change' }
                    ],
                    'dopReChannel.channelName': [
                        { required: true, message: '请填写渠道名称', trigger: 'change' }
                    ],
                    'dopReChannel.channelType': [
                        { required: true, message: '请选择渠道类型', trigger: 'change' }
                    ]
                }
            }
        },

        beforeMount() {
            Object.assign(this.form.dopReChannel, this.row);
        },
        methods: {
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                try {
                    const p = this.$api.channelApi.saveChannel(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }

        }
    }
</script>

<style scoped>
    .el-tag{
        margin-left: 10px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
