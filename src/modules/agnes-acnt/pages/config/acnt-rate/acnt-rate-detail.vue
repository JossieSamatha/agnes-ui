<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="方案代码" prop="rateCode" v-if="mode!=='add'">
                <gf-input v-model="form.rateCode" style="width: 80%" placeholder="方案代码" :disabled="true"/>
            </el-form-item>
            <el-form-item label="方案名称" prop="rateName">
                <gf-input v-model="form.rateName" placeholder="方案名称" style="width: 80%" />
            </el-form-item>
            <el-form-item label="网点名称" prop="bankBranchId">
                <div class="line">
                    <el-select class="multiple-select" v-model="form.bankBranchId" style="width: 80%"
                               clearable
                               filterable
                               remote
                               reserve-keyword
                               placeholder="请输入关键词或空格搜索"
                               :remote-method="remoteLoadOpenBankList"
                               :loading="loading">
                        <gf-filter-option
                                v-for="item in branchList"
                                :key="item.bankBranchId"
                                :label="`${item.bigPayNo} - ${item.branchName}`"
                                :value="item.bankBranchId">
                        </gf-filter-option>
                    </el-select>
                    <el-button style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle" icon="el-icon-edit-outline" @click="defendOpenBank"/>
                </div>

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
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    import BranchDetail from "../../../../agnes-dop/pages/config/branch/branch-detail";

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
                    startDt: window.bizDate,
                    endDt: '9999-12-31',
                    rate: '',
                    status: '',
                    bankBranchId: '',
                    rateId: '',
                },
                branchList: [],
                rules: {
                    'rateName': [{required: true, message: "方案名称不能为空"}],
                    'startDt': [{required: true, message: "开始日期不能为空"}],
                    'endDt': [{required: true, message: "结束日期不能为空"}],
                    'rate': [{required: true, message: "方案利率不能为空"}],
                    'status': [{required: true, message: "状态不能为空"}],
                },
                pickerOptionsStart: {
                    disabledDate: time => {
                        let endDateVal = this.form.endDt;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        let beginDateVal = this.form.startDt;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                            );
                        }
                    }
                },
            }
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.remoteLoadOpenBankList(this.row.bigPayNo);
        },

        methods: {
            async remoteLoadOpenBankList(query){
                this.loading = true;
                let openBankList = await this.$api.branchApi.listByBigPayNoAndBranchName(query,query);
                this.branchList = openBankList.data
                this.loading = false;
            },
            defendOpenBank(){
                this.defendOpenBankDlg(null,'add',null);
            },
            defendOpenBankDlg(row, mode, actionOk){
                // 抽屉创建
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['网点维护',mode],
                    component: BranchDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
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
            }
        }


    }
</script>
