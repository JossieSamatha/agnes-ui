<template>
    <el-form ref="taskDefForm" class="acnt-apply-insert-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
             :rules="detailFormRules" label-width="180px">
        <div class="title">要素信息</div>
        <el-divider></el-divider>
        <!-- <div class="line"> -->
            <el-form-item label="账户类型" prop="typeCode">
                <el-select class="multiple-select" v-model="detailForm.typeCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.dictId"
                            :label="item.dictName"
                            :value="item.dictId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop="bizType">
                <gf-dict filterable clearable v-model="detailForm.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="业务发起部门" prop="baseStartDept">
                <gf-dict filterable clearable v-model="detailForm.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
            <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <gf-input v-model.trim="detailForm.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="业务描述" prop="baseDesc">
                <gf-input v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
            </el-form-item>
            <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <gf-dict filterable clearable v-model="detailForm.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select class="multiple-select" v-model="detailForm.baseAcceptGroup"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in groupOption"
                            :key="item.userGroupId"
                            :label="item.userGroupName"
                            :value="item.userGroupId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属机构" prop="baseOrgId">
                <el-select class="multiple-select" v-model="detailForm.baseOrgId"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.dictId"
                            :label="item.dictName"
                            :value="item.dictId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="经办人" prop="baseOperator">
                <gf-input v-model.trim="detailForm.baseOperator" placeholder="经办人"/>
            </el-form-item>
            <el-form-item label="基金代码" prop="productCode">
                <el-select class="multiple-select" v-model="detailForm.productCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productCode"
                            :value="item.productCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="基金名称" prop="productName">
                <gf-input v-model.trim="detailForm.productName" placeholder="基金名称"/>
            </el-form-item>
            <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group v-model="detailForm.isSendFinance">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <div class="title">账户信息</div>
        <!-- </div> -->
        <el-divider></el-divider>
        <!-- <div class="line"> -->
            <el-form-item label="账户名称" prop="acntName">
                <gf-input v-model.trim="detailForm.acntName" placeholder="账户名称"/>
            </el-form-item>
            <el-form-item label="账户简称" prop="acntShortName">
                <gf-input v-model.trim="detailForm.acntShortName" placeholder="账户简称"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="清算编号" prop="setTlementNo">
                <gf-input v-model.trim="detailForm.setTlementNo" placeholder="清算编号"/>
            </el-form-item>
            <el-form-item label="预留印鉴信息" prop="stampInfo">
                <gf-input v-model.trim="detailForm.stampInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="账号" prop="accNO">
                <gf-input v-model.trim="detailForm.accNO" placeholder="账号"/>
            </el-form-item>
            <el-form-item label="市场" prop="market">
                <gf-dict filterable clearable v-model="detailForm.market" dict-type="AGNES_ACNT_MARKET" />
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="账户所属地区" prop="region">
                <gf-input v-model.trim="detailForm.region" placeholder="账户所属地区"/>
            </el-form-item>
            <el-form-item label="币种" prop="currency">
                <gf-dict filterable clearable v-model="detailForm.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="资金账户名称" prop="fundAccName">
                <gf-input v-model.trim="detailForm.fundAccName" placeholder="资金账户名称"/>
            </el-form-item>
            <el-form-item label="利率" prop="rate">
                <gf-input v-model.trim="detailForm.rate" placeholder="利率"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                <gf-input v-model.trim="detailForm.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
            </el-form-item>
            <el-form-item label="三证合一变更情况" prop="threeLicenseInfo">
                <gf-input v-model.trim="detailForm.threeLicenseInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="大额支付号" prop="bigPayNo">
                <gf-input v-model.trim="detailForm.bigPayNo" placeholder="大额支付号"/>
            </el-form-item>
            <el-form-item label="开户网点/开户单位" prop="openBack">
                <gf-input v-model.trim="detailForm.openBack" placeholder="开户网点/开户单位"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="资金帐号" prop="fundAccNo">
                <gf-input v-model.trim="detailForm.fundAccNo" placeholder="资金帐号"/>
            </el-form-item>
            <!-- <el-form-item label="币种" prop="currency">
                <gf-dict filterable clearable v-model="detailForm.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item> -->
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="账户启用日期" prop="acntStartDT">
                <el-date-picker
                    v-model="detailForm.acntStartDT"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="账户启用日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="是否开立银企直联" prop="isOpenBankCorDirect">
                <el-radio-group v-model="detailForm.isOpenBankCorDirect">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="是否开立网银" prop="isOpenEBank">
                <el-radio-group v-model="detailForm.isOpenEBank">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="其他" prop="other">
                <gf-input v-model.trim="detailForm.other" placeholder="其他"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="账户用途描述" prop="acntPurpose">
                <gf-input v-model.trim="detailForm.acntPurpose" placeholder="账户用途描述"/>
            </el-form-item>
            <el-form-item label="账户状态" prop="acntStatus">
                <gf-dict filterable clearable v-model="detailForm.acntStatus" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
        <!-- </div> -->

        <!-- <div class="line"> -->
            <el-form-item label="到期提醒" prop="maturityDt">
                <el-date-picker
                    v-model="detailForm.maturityDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="到期提醒">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="开户时对方联系人" prop="openMan">
                <gf-input v-model.trim="detailForm.openMan" placeholder="开户时对方联系人"/>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="备付金账户对应的银行账户" prop="baseOperator">
                <el-select class="multiple-select" v-model="detailForm.productCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productCode"
                            :value="item.productCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡账户对应的对公户" prop="productCode">
                <el-select class="multiple-select" v-model="detailForm.productCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productCode"
                            :value="item.productCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        <!-- </div> -->
        <!-- <div class="line"> -->
            <el-form-item label="开户时对方联系人联系电话" prop="openManPhone">
                <gf-input v-model.trim="detailForm.openManPhone" placeholder="开户时对方联系人联系电话"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <gf-input v-model.trim="detailForm.remark" placeholder="备注"/>
            </el-form-item>
        <!-- </div> -->
    </el-form>
</template>

<script>
    // import loadsh from 'lodash';

    export default {
        name: "apply-define",
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
                rosterDate:'',
                memberRefList:[],
                serviceRes:[],
                staticData: {},
                detailForm: {
                    typeCode:'', 
                    bizType:'', 
                    baseStartDept:'', 
                    baseStartDeptLinkman:'', 
                    setTlementNo:'',
                    baseAcceptDept:'',
                    stampInfo:'',
                    stampLegalPersonInfo:'', 
                    threeLicenseInfo:'',
                    baseAcceptGroup:'', 
                    baseOrgId:'', 
                    productCode:'', 
                    productName:'',
                    isSendFinance:'0', 
                    acntName:'', 
                    acntShortName:'',
                    accNO:'',
                    market:'',
                    region:'',
                    currency:'',
                    fundAccName:'',
                    acntPurpose:'',
                    rate:'',
                    bigPayNo:'',
                    openBack:'',
                    fundAccNo:'',
                    isOpenEBank:'',
                    acntStartDT:'',
                    isOpenBankCorDirect:'',
                    maturityDt:'',
                    openMan:'',
                    acntStatus:'',
                    openManPhone:'',
                    remark:'',
                    other:'',
                },
                bizTagOption: [],        // 业务类型下拉
                groupOption: [],        // 群组下拉
                productList:[],     //产品代码群组
                detailFormRules: {
                    typeCode: [
                        {required: true, message: '账户类型必填', trigger: 'blur'},
                    ],
                },
            }
        },
        beforeMount() {
            Object.assign(this.detailForm, this.row);
            this.getOptionData()
        },
        methods: {
            async getOptionData(){
                try {
                    let groupOption = await this.$api.userGroupApi.getAllUserGroup();
                    this.groupOption = groupOption.data
                    let productList = await this.$api.acntApplyApi.getProductCodeList();
                    this.productList = productList.data
             
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
 
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
<style scoped>
    .title{
        color: deepskyblue;
        margin-left: 30px;
        font-size: 16px;
        margin-top: 20px;
        width: 100%;
    }
    .acnt-apply-insert-form{
        display: flex;
        flex-wrap: wrap;
    }
    .el-form-item {
        /* margin-bottom: 22px; */
        width: 49%;
    }
</style>
