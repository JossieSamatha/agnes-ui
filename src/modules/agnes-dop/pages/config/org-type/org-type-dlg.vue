<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="110px"
                 style="padding: 10px;">
          <el-form-item label="机构类型名称" prop="orgTypeName">
            <gf-input type="text" maxlength="64" v-model="form.orgTypeName"/>
          </el-form-item>
          <el-form-item label="机构类型代码" prop="orgTypeCode">
            <gf-input type="text" maxlength="32" v-model="form.orgTypeCode"/>
          </el-form-item>
        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="保存"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    orgTypeName: '',
                    orgTypeCode: '',
                },
                rules: {
                    orgTypeName: [{required: true, message: "请输入机构类型名称"}],
                    orgTypeCode: [{required: true, message: "请输入机构类型代码"}]
                },
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
                    if(this.row.orgTypeCode !== this.form.orgTypeCode || this.row.orgTypeName !== this.form.orgTypeName){
                        const checkP = this.$api.orgTypeApi.checkOrgType(this.form);
                        const resp = await this.$app.blockingApp(checkP);
                        if(resp.data !== 0){
                            this.$msg.warning('该机构类型定义已存在');
                            return ;
                        }
                    }
                    let that = this;
                    const p = this.$api.orgTypeApi.saveOrgType(this.form);
                    p.then(function () {
                        if (that.actionOk) {
                            that.actionOk();
                        }
                    });
                    await this.$app.blockingApp(p);
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
