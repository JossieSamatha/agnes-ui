<template>
    <div>
        <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"
                 style="padding: 10px;">
<!--            <el-form-item label="账户名称"  prop="acntName">-->
<!--                <gf-input v-model="form.acntName" :disabled="true" placeholder="账户名称" style="width: 80%" :max-byte-len="120"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="账号"  prop="accountNo">-->
<!--                <gf-input v-model="form.accountNo" :disabled="true" placeholder="账号" style="width: 80%" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="开户机构"  prop="extOrgName">-->
<!--                <gf-input v-model="form.extOrgName" :disabled="true" placeholder="开户机构" style="width: 80%" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="利率(%)" prop="rate">-->
<!--                <gf-input v-model="form.rate" :disabled="true" placeholder="利率(%)" style="width: 80%"/>-->
<!--            </el-form-item>-->

            <el-form-item label="账户名称"  prop="acntId">
                <el-select style="width: 80%"  class="multiple-select" v-model="form.acntId"
                           filterable clearable
                           placeholder="请选择账户名称">
                    <gf-filter-option
                            v-for="item in acntList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>

            <el-form-item label="利率" prop="rateId">
                    <el-select style="width: 80%" class="multiple-select" v-model="form.rateId"
                               clearable filterable
                               placeholder="请选择">
                        <gf-filter-option
                                v-for="item in rateList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </gf-filter-option>
                    </el-select>
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
                acntList: [],
                rateList: [],
                rules: {

                }
            }
        },

        beforeMount() {
            Object.assign(this.form, this.row);
            this.getOptionAcntData()
            this.getOptionRateListData();
        },

        methods: {
            async getOptionAcntData() {
                try {
                    let groupOption = await this.$api.acntInfoApi.getAcntInfoList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                        this.acntList.push({label:item.acntName, value: item.acntId});
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async getOptionRateListData() {
                try {
                    let rateList = await this.$api.rateDefApi.getAllPulishRateList();
                    let list = rateList.data
                    list.forEach((item) => {
                        this.rateList.push({label:item.rateName, value: item.rateId});
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
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
