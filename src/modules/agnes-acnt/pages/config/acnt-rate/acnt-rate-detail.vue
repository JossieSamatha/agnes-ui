<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="方案代码" prop="rateCode">
                <gf-input v-model="form.rateCode" style="width: 80%" placeholder="方案代码" />
            </el-form-item>
            <el-form-item label="方案名称" prop="rateName">
                <gf-input v-model="form.rateName" placeholder="方案名称" style="width: 80%" />
            </el-form-item>
            <el-form-item label="网点名称" prop="bankBranchId">
                <el-select style="width: 80%"  class="multiple-select" v-model="form.bankBranchId"
                           filterable clearable
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in branchList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="利率" prop="rate">
                <gf-input v-model="form.rate" placeholder="利率" style="width: 80%" />
            </el-form-item>
            <el-form-item label="有效日期" prop="startDt">
                <div class="line none-shrink">
                    <el-form-item prop="startDt">
                        <el-date-picker
                                v-model="form.startDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <span style="margin: 0 10px">~</span>
                    <el-form-item prop="endDt">
                        <el-date-picker
                                v-model="form.endDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
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
                    rateCode: '',
                    rateName: '',
                    branchCode: '',
                    branchName: '',
                    startDt: '',
                    endDt: '',
                    rate: '',
                    status: '',
                    bankBranchId: '',
                    rateId: '',
                },
                branchList: [],
                rules: {
                    'rateCode': [{required: true, message: "方案代码不能为空"}],
                    'rateName': [{required: true, message: "方案名称不能为空"}],
                    'bankBranchId': [{required: true, message: "网点名称不能为空"}],
                    'startDt': [{required: true, message: "开始日期不能为空"}],
                    'endDt': [{required: true, message: "结束日期不能为空"}],
                    'rate': [{required: true, message: "方案利率不能为空"}],
                    'status': [{required: true, message: "状态不能为空"}],
                },
            }
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.getOptionData()
        },

        methods: {
            async getOptionData() {
                try {
                    let groupOption = await this.$api.rateDefApi.getBranchList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                        let branchName = '(' + item.branchCode + ')' + item.branchName;
                        this.branchList.push({label: branchName, value: item.bankBranchId});
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
                        let p = this.$api.rateDefApi.check(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('审核通过!');

                    } else {
                        let p = this.$api.rateDefApi.saveRate(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功!');
                    }
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            },
        },


    }
</script>
