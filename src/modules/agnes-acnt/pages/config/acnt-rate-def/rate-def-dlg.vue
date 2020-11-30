<template>
    <div>
        <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"
                 style="padding: 10px;">
            <el-form-item label="账户名称"  prop="acntId">
                <el-select style="width: 80%"  class="multiple-select" v-model="form.acntId"
                           filterable clearable :disabled="mode==='edit'"
                           placeholder="请选择账户名称">
                    <gf-filter-option
                            v-for="item in acntList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>

            <el-form-item label="利率" prop="rateCode">
                    <el-select style="width: 80%" class="multiple-select" v-model="form.rateCode"
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
            <el-form-item label="有效日期" prop="startDt">
                <div class="line none-shrink">
                    <el-form-item prop="startDt">
                        <el-date-picker
                                v-model="form.startDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptionsStart"
                                placeholder="开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <span style="margin: 0 10px">~</span>
                    <el-form-item prop="endDt">
                        <el-date-picker
                                v-model="form.endDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptionsEnd"
                                placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
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
                    rateCode: '',
                    startDt: window.bizDate,
                    endDt: '9999-12-31',
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
                        this.rateList.push({label:item.rateCode+'-'+item.rateName+'-'+item.rate, value: item.rateCode});
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
