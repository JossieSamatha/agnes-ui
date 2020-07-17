<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="case编码" prop="caseDefKey">
                <gf-input type="text" v-model="form.caseDefKey" :disabled="disabledStatus"/>
            </el-form-item>
            <el-form-item label="case名称" prop="caseDefName">
                <gf-input type="text" v-model="form.caseDefName"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {

        data() {
            let isHas=(rule, value, callback) => {
                let _that = this ;
                    if (!value) {
                        callback();
                    } else {
                        const p = _that.$api.caseConfigApi.checkCaseDefKey(this.form.caseDefKey);
                        p.then(function (resp) {
                            if (resp.data===1 && _that.mode === 'add') {
                                callback(new Error("该CASE编码已存在！"));
                            } else {
                                callback();
                            }
                        });
                    }
                };
            return {
                form: {
                    caseDefKey: '',
                    caseDefName: '',
                },
                rules: {
                    caseDefKey: [{required: true, message: "请输入case编码"},
                        {validator:isHas,trigger: 'change'}],
                    caseDefName: [{required: true, message: "请输入case名称"}]
                },
                disabledStatus: this.mode === 'add'? false: true
            };
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
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
                    const p = this.$api.caseConfigApi.saveCaseDef(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
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
