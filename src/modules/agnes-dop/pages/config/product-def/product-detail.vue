<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="150px">
        <el-form-item label="产品名称" prop="productName">
            <gf-input v-model.trim="detailForm.productName" placeholder="产品名称"/>
        </el-form-item>
        <el-form-item label="产品简称" prop="productNameShort">
            <gf-input v-model.trim="detailForm.productNameShort" placeholder="产品简称"/>
        </el-form-item>
        <el-form-item label="产品代码" prop="productCode">
            <gf-input v-model.trim="detailForm.productCode" placeholder="产品名称"/>
        </el-form-item>
        <el-form-item label="产品种类" prop="productKind">
            <gf-dict filterable clearable v-model="detailForm.productKind" dict-type="AGNES_PRODUCT_CLASS"/>
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
            <gf-dict filterable clearable v-model="detailForm.productType" dict-type="AGNES_PRODUCT_TYPE"/>
        </el-form-item>
        <el-form-item label="产品阶段" prop="productStep">
            <gf-dict filterable clearable v-model="detailForm.productStep" dict-type="AGNES_PRODUCT_STAGE"/>
        </el-form-item>
        <el-form-item label="当前状态" prop="nowStatus">
            <gf-dict filterable clearable v-model="detailForm.nowStatus" dict-type="AGNES_PRODUCT_STATUS"/>
        </el-form-item>
        <el-form-item label="成立日期" prop="establishmentData">
            <el-date-picker
                    v-model="detailForm.establishmentData"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="执行时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="基金托管人" prop="productTrustee">
            <gf-input v-model.trim="detailForm.productTrustee" placeholder="基金托管人"/>
        </el-form-item>
        <el-form-item label="基金托管人(境外)" prop="productTrusteeOut">
            <gf-input v-model.trim="detailForm.productTrusteeOut" placeholder="基金托管人(境外)"/>
        </el-form-item>
        <el-form-item label="基金注册登记机构" prop="productOrganization">
            <gf-input v-model.trim="detailForm.productOrganization" placeholder="基金注册登记机构"/>
        </el-form-item>
        <el-form-item label="基金律师事务所" prop="productOffice">
            <gf-input v-model.trim="detailForm.productOffice" placeholder="基金律师事务所"/>
        </el-form-item>
        <el-form-item label="基金会计事务所" prop="productAccounting">
            <gf-input v-model.trim="detailForm.productAccounting" placeholder="基金会计事务所"/>
        </el-form-item>
        <el-form-item label="申赎交易确认天数" prop="productCheckDay">
            <gf-input v-model.trim="detailForm.productCheckDay" placeholder="申赎交易确认天数"/>
        </el-form-item>
        <el-form-item label="赎回清算天数" prop="productRedemption">
            <gf-input v-model.trim="detailForm.productRedemption" placeholder="赎回清算天数"/>
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
                    productNameShort:'',
                    productCode:'',
                    productKind:'',
                    productType:'',
                    productStep:'',
                    nowStatus:'',
                    establishmentData:'',
                    productTrustee:'',
                    productTrusteeOut:'',
                    productOrganization:'',
                    productOffice:'',
                    productAccounting:'',
                    productCheckDay:'',
                    productRedemption:'',
                },
                detailFormRules: {
                    productName: [
                        {required: true, message: '产品名称必填', trigger: 'blur'},
                    ],
                    productNameShort: [
                        {required: true, message: '产品简称必填', trigger: 'blur'},
                    ],
                    productCode: [
                        {required: true, message: '产品代码必填', trigger: 'change'},
                    ],
                    productKind: [
                        {required: true, message: '产品种类必填', trigger: 'blur'},
                    ],
                    productType: [
                        {required: true, message: '产品类型必填', trigger: 'change'},
                    ],
                    productStep: [
                        {required: true, message: '产品阶段必填', trigger: 'blur'},
                    ],
                    nowStatus: [
                        {required: true, message: '当前状态必填', trigger: 'blur'},
                    ],
                    establishmentData: [
                        {required: true, message: '成立日期必填', trigger: 'change'},
                    ],
                    productTrustee: [
                        {required: true, message: '基金托管人必填', trigger: 'blur'},
                    ],
                    productTrusteeOut: [
                        {required: true, message: '基金托管人(境外)必填', trigger: 'change'},
                    ],
                    productOrganization: [
                        {required: true, message: '基金注册登记机构必填', trigger: 'change'},
                    ],
                    productOffice: [
                        {required: true, message: '基金律师事务所必填', trigger: 'change'},
                    ],
                    productAccounting: [
                        {required: true, message: '基金会计事务所必填', trigger: 'change'},
                    ],
                    productCheckDay: [
                        {required: true, message: '申赎交易确认天数必填', trigger: 'change'},
                    ],
                    productRedemption: [
                        {required: true, message: '赎回清算天数必填', trigger: 'change'},
                    ],
                },
            }
        },
        beforeMount() {

            },
        methods: {
   
        },

        watch: {
    
        }
    }
</script>
