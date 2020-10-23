<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules"
                 label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="群组名称" prop="userGroupName" style="width: 60%">
                <gf-input type="text" v-model="form.userGroupName"/>
            </el-form-item>
            <el-form-item label="群组代码" prop="userGroupCode" style="width: 60%">
                <gf-input type="text" v-model="form.userGroupCode"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="保存"></dialog-footer>
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
                    'userGroupName':'',
                    'userGroupId':'',
                    'userGroupCode':'',
                },
                memberRefList:[],
                rosterDate:'',
                rules: {
                    'userGroupName': [{required: true, message: "请输入群组名称", trigger: 'blur'}],
                    'userGroupCode': [{required: true, message: "请输入群组代码", trigger: 'blur'}],
                },
            }
        },
        beforeMount() {
            Object.assign(this.form, this.row);
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.userGroupApi.saveUserGroup(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk();
                    }

                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>

<style scoped>

</style>