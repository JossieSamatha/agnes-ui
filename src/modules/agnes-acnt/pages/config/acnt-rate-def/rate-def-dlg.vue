<template>
    <div>
        <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"
                 style="padding: 10px;">
            <el-form-item label="账户名称"  prop="acntName">
                <gf-input v-model="form.acntName" :disabled="true" placeholder="账户名称" style="width: 80%" :max-byte-len="120"/>
            </el-form-item>
            <el-form-item label="账号"  prop="accountNo">
                <gf-input v-model="form.accountNo" :disabled="true" placeholder="账号" style="width: 80%" />
            </el-form-item>
            <el-form-item label="开户机构"  prop="extOrgName">
                <gf-input v-model="form.extOrgName" :disabled="true" placeholder="开户机构" style="width: 80%" />
            </el-form-item>
            <el-form-item label="利率(%)" prop="rate">
                <gf-input v-model="form.rate" :disabled="true" placeholder="利率(%)" style="width: 80%"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            ui: String,
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                form: {
                    acntId: '',
                    rateId: '',
                    startDt: '',
                    endDt: '',
                    acntName: '',
                    rateName: '',
                    accountNo: '',
                    extOrgName:''
                },
                rules: {

                }
            }
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
                    if (this.ui === "1") {
                        let p = this.$api.acntSchemeApi.checkRateScheme(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('审核通过');

                    } else {
                        let p = this.$api.acntSchemeApi.saveRateScheme(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功');
                    }
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            watch: {}
        }
    }
</script>

<style scoped>

</style>
