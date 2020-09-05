<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
             :rules="detailFormRules" label-width="150px">
        <el-form-item label="产品名称" prop="productName">
            <gf-input v-model.trim="detailForm.productName" placeholder="产品名称"/>
        </el-form-item>
        <el-form-item label="产品简称" prop="productShortName">
            <gf-input v-model.trim="detailForm.productShortName" placeholder="产品简称"/>
        </el-form-item>
        <el-form-item label="产品代码" prop="productCode">
            <gf-input v-model.trim="detailForm.productCode" placeholder="产品名称"/>
        </el-form-item>
        <el-form-item label="产品种类" prop="productClass">
            <gf-dict filterable clearable v-model="detailForm.productClass" dict-type="AGNES_PRODUCT_CLASS"/>
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
            <gf-dict filterable clearable v-model="detailForm.productType" dict-type="AGNES_PRODUCT_TYPE"/>
        </el-form-item>
        <el-form-item label="产品阶段" prop="productStage">
            <gf-dict filterable clearable v-model="detailForm.productStage" dict-type="AGNES_PRODUCT_STAGE"/>
        </el-form-item>
        <el-form-item label="当前状态" prop="productStatus">
            <gf-dict filterable clearable v-model="detailForm.productStatus" dict-type="AGNES_PRODUCT_STATUS"/>
        </el-form-item>
        <el-form-item label="成立日期" prop="startDate">
            <el-date-picker
                    v-model="detailForm.startDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="执行时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="基金托管人" prop="productCustodian">
            <gf-input v-model.trim="detailForm.productCustodian" placeholder="基金托管人"/>
        </el-form-item>
        <el-form-item label="基金托管人(境外)" prop="productCustodianOverseas">
            <gf-input v-model.trim="detailForm.productCustodianOverseas" placeholder="基金托管人(境外)"/>
        </el-form-item>
        <el-form-item label="基金注册登记机构" prop="productRegistrationOrg">
            <gf-input v-model.trim="detailForm.productRegistrationOrg" placeholder="基金注册登记机构"/>
        </el-form-item>
        <el-form-item label="基金律师事务所" prop="productLawFirm">
            <gf-input v-model.trim="detailForm.productLawFirm" placeholder="基金律师事务所"/>
        </el-form-item>
        <el-form-item label="基金会计事务所" prop="productAccountFirm">
            <gf-input v-model.trim="detailForm.productAccountFirm" placeholder="基金会计事务所"/>
        </el-form-item>
        <el-form-item label="申赎交易确认天数" prop="redemptionTransConfirmDays">
            <gf-input type='number' v-model.trim="detailForm.redemptionTransConfirmDays" placeholder="申赎交易确认天数"/>
        </el-form-item>
        <el-form-item label="赎回清算天数" prop="redemptionSettlementDays">
            <gf-input type='number' v-model.trim="detailForm.redemptionSettlementDays" placeholder="赎回清算天数"/>
        </el-form-item>
    </el-form>

</template>

<script>

    export default {
        name: "task-define",
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
                detailForm:{
                    productName:'',
                    productShortName:'',
                    productCode:'',
                    productClass:'',
                    productType:'',
                    productStage:'',
                    productStatus:'',
                    startDate:'',
                    productCustodian:'',
                    productCustodianOverseas:'',
                    productRegistrationOrg:'',
                    productLawFirm:'',
                    productAccountFirm:'',
                    redemptionTransConfirmDays:'',
                    redemptionSettlementDays:'',
                },
                detailFormRules: {
                    productName: [
                        {required: true, message: '产品名称必填', trigger: 'blur'},
                    ],
                    productShortName: [
                        {required: true, message: '产品简称必填', trigger: 'blur'},
                    ],
                    productCode: [
                        {required: true, message: '产品代码必填', trigger: 'change'},
                    ],
                    productClass: [
                        {required: true, message: '产品种类必填', trigger: 'blur'},
                    ],
                    productType: [
                        {required: true, message: '产品类型必填', trigger: 'change'},
                    ],
                },
            }
        },
        beforeMount() {
            if(this.mode!=="add") {
                Object.assign(this.detailForm, this.row);
            }
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let paramData = this.detailForm;
                    if(this.mode==='add'){
                        const res = await this.$api.productApi.checkCodeExist(paramData.productCode);
                        if(res.data!==0){
                            this.$msg.success('产品代码已存在');
                            return;
                        }
                        const p = this.$api.productApi.saveProdut(this.detailForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功');
                    }else if(this.mode==='edit') {
                        const p = this.$api.productApi.saveProdut(this.detailForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('修改成功');
                    }else if(this.mode==='check'){
                        let updateParam = {
                            productId:paramData.productId,
                            productStatus:'1'
                        }
                        const p = this.$api.productApi.updateStatus(updateParam);
                        await this.$app.blockingApp(p);
                        this.$msg.success('复核成功');
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },

        watch: {
    
        }
    }
</script>
