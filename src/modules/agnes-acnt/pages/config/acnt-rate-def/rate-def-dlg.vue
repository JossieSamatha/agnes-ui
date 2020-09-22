<template>
    <div>
        <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"  style="margin-left: 25%;">
            <el-form-item label="账户名称" prop="acntName">
                <gf-input type="text" v-model="form.acntName" :readonly="true" style="width: 50%">
                    <i slot="suffix" class="el-input__icon el-icon-edit-outline" @click="chooseAcnt"/>
                </gf-input>
            </el-form-item>
            <el-form-item label="利率方案类型" prop="rateName">
                <gf-input type="text" v-model="form.rateName" :readonly="true" style="width: 50%">
                    <i slot="suffix" class="el-input__icon el-icon-edit-outline" @click="chooseRate"/>
                </gf-input>
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
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    import AcntInfo from "./acnt-info-dlg"
    import RateInfo from "./rate-info-dlg"
    export default {
        name: "rate-def-dlg",
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
                form:{acntId:'',rateId:'',startDt:'',acntName:'',rateName:''},
                rules: {
                    acntName: [
                        {required: true, message: '请选择账户名称', trigger: 'blur'},
                    ],
                    rateName: [
                        {required: true, message: '请选择利率方案类型', trigger: 'blur'},
                    ],
                    startDt:[
                        {required: true, message: '请选择生效时间', trigger: 'blur'},
                    ],
                }
            }
        },
        beforeMount() {
            Object.assign(this.form, this.row);
        },
        methods: {
             getAcntValue(acntInfo){
                this.form.acntId = acntInfo.acntId;
                 this.form.acntName = acntInfo.acntName;
            },
             getRateValue(rateInfo){
                this.form.rateId = rateInfo.rateId;
                this.form.rateName = rateInfo.rateName;
            },
             chooseAcnt() {
                this.showDlg(this.getAcntValue.bind(this),AcntInfo,'账户信息');
            },
             chooseRate() {
                this.showDlg(this.getRateValue.bind(this),RateInfo,'利率方案');
            },
            showDlg(actionOk,Tab,title) {
                this.$nav.showDialog(
                    Tab,
                    {
                        args: { actionOk},
                        width: '50%',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle(title, 'view'),
                    }
                );
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            cancel(){
                this.$dialog.close(this.$parent);
            }
        },
        watch:{
        }
    }
</script>

<style scoped>

</style>
