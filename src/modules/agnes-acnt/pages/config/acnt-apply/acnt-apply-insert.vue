<template>
    <div>
        <div v-if="showChange" class="title-top">变更前</div>
        <el-divider v-if="showChange"></el-divider>
        <el-form v-if="showChange" ref="taskDefFormBefore" class="acnt-apply-insert-form" :model="detailFormBefore" disabled
             :rules="detailFormRules" label-width="180px">
        <div class="title">要素信息</div>
        <el-divider></el-divider>
            <el-form-item label="账户类型" prop="typeCode">
                <el-select class="multiple-select" v-model="detailFormBefore.typeCode"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.typeCode"
                            :label="item.typeName"
                            :value="item.typeCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop="bizType">
                <gf-dict disabled filterable clearable v-model="detailFormBefore.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
            </el-form-item>
            <el-form-item label="业务发起部门" prop="baseStartDept">
                <gf-dict filterable clearable v-model="detailFormBefore.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
            <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <gf-input v-model.trim="detailFormBefore.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>
            </el-form-item>
            <el-form-item label="业务描述" prop="baseDesc">
                <gf-input v-model.trim="detailFormBefore.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
            </el-form-item>
            <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <gf-dict filterable clearable v-model="detailFormBefore.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />
            </el-form-item>
            <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select class="multiple-select" v-model="detailFormBefore.baseAcceptGroup"
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
                <el-select class="multiple-select" v-model="detailFormBefore.baseOrgId"
                        filterable clearable
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in OrgList"
                            :key="item.extOrgId"
                            :label="item.extOrgName"
                            :value="item.extOrgId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经办人" prop="baseOperator">
                <gf-input v-model.trim="detailFormBefore.baseOperator" placeholder="经办人"/>
            </el-form-item>
            <el-form-item label="基金代码" prop="productCode">
                <el-select class="multiple-select" v-model="detailFormBefore.productCode"
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
            <el-form-item label="基金名称" prop="productName">
                <gf-input disabled  v-model.trim="detailFormBefore.productName" placeholder="基金名称"/>
            </el-form-item>
            <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group v-model="detailFormBefore.isSendFinance">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="title">账户信息</div>
            <el-divider></el-divider>
            <el-form-item v-if="showRules.acntName&&showRules.acntName.isShow" label="账户名称" prop="acntName">
                <gf-input v-model.trim="detailFormBefore.acntName" placeholder="账户名称"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntShortName&&showRules.acntShortName.isShow" label="账户简称" prop="acntShortName">
                <gf-input v-model.trim="detailFormBefore.acntShortName" placeholder="账户简称"/>
            </el-form-item>
            <el-form-item v-if="showRules.setTlementNo&&showRules.setTlementNo.isShow" label="清算编号" prop="setTlementNo">
                <gf-input v-model.trim="detailFormBefore.setTlementNo" placeholder="清算编号"/>
            </el-form-item>
            <el-form-item v-if="showRules.stampInfo&&showRules.stampInfo.isShow" label="预留印鉴信息" prop="stampInfo">
                <gf-input v-model.trim="detailFormBefore.stampInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
            <el-form-item v-if="showRules.accNo&&showRules.accNo.isShow" label="账号" prop="accNo">
                <gf-input v-model.trim="detailFormBefore.accNo" placeholder="账号"/>
            </el-form-item>
            <el-form-item v-if="showRules.market&&showRules.market.isShow" label="市场" prop="market">
                <gf-dict filterable clearable v-model="detailFormBefore.market" dict-type="AGNES_ACNT_MARKET" />
            </el-form-item>
            <el-form-item v-if="showRules.region&&showRules.region.isShow" label="账户所属地区" prop="region">
                <gf-input v-model.trim="detailFormBefore.region" placeholder="账户所属地区"/>
            </el-form-item>
            <el-form-item v-if="showRules.currency&&showRules.currency.isShow" label="币种" prop="currency">
                <gf-dict filterable clearable v-model="detailFormBefore.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
            <el-form-item v-if="showRules.fundAccName&&showRules.fundAccName.isShow" label="资金账户名称" prop="fundAccName">
                <gf-input v-model.trim="detailFormBefore.fundAccName" placeholder="资金账户名称"/>
            </el-form-item>
            <el-form-item v-if="showRules.rateId&&showRules.rateId.isShow" label="利率" prop="rateId">
                <el-select v-model="detailFormBefore.rateId"
                           clearable
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in rateList"
                            :key="item.rateId"
                            :label="item.rateName"
                            :value="item.rateId">
                    </gf-filter-option>
                </el-select>

            </el-form-item>
            <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                <gf-input v-model.trim="detailFormBefore.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
            </el-form-item>
            <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                <gf-input v-model.trim="detailFormBefore.threeLicenseInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
            <el-form-item v-if="showRules.bigPayNo&&showRules.bigPayNo.isShow" label="大额支付号" prop="bigPayNo">
                <gf-input v-model.trim="detailFormBefore.bigPayNo" placeholder="大额支付号"/>
            </el-form-item>
            <el-form-item v-if="showRules.openBack&&showRules.openBack.isShow" label="开户网点/开户单位" prop="openBack">
                <gf-input v-model.trim="detailFormBefore.openBack" placeholder="开户网点/开户单位"/>
            </el-form-item>
            <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号" prop="fundAccNo">
                <gf-input v-model.trim="detailFormBefore.fundAccNo" placeholder="资金账号"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntStartDt&&showRules.acntStartDt.isShow" label="账户启用日期" prop="acntStartDt">
                <el-date-picker
                    v-model="detailFormBefore.acntStartDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="账户启用日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="showRules.isOpenBankCorDirect&&showRules.isOpenBankCorDirect.isShow" label="是否开立银企直联" prop="isOpenBankCorDirect">
                <el-radio-group v-model="detailFormBefore.isOpenBankCorDirect">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showRules.isOpenEBank&&showRules.isOpenEBank.isShow" label="是否开立网银" prop="isOpenEBank">
                <el-radio-group v-model="detailFormBefore.isOpenEBank">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showRules.other&&showRules.other.isShow" label="其他" prop="other">
                <gf-input v-model.trim="detailFormBefore.other" placeholder="其他"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntPurpose&&showRules.acntPurpose.isShow" label="账户用途描述" prop="acntPurpose">
                <gf-input v-model.trim="detailFormBefore.acntPurpose" placeholder="账户用途描述"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntStatus&&showRules.acntStatus.isShow" label="账户状态" prop="acntStatus">
                <gf-dict filterable clearable v-model="detailFormBefore.acntStatus" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
            <el-form-item v-if="showRules.maturityDt&&showRules.maturityDt.isShow" label="到期提醒" prop="maturityDt">
                <el-date-picker
                    v-model="detailFormBefore.maturityDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="到期提醒">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="showRules.bankLinkMan&&showRules.bankLinkMan.isShow" label="银行联系人" prop="bankLinkMan">
                <el-select class="multiple-select" v-model="detailFormBefore.bankLinkMan"
                        filterable clearable multiple
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in linkManList"
                            :key="item.linkmanId"
                            :label="item.linkmanName"
                            :value="item.linkmanId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showRules.productCode&&showRules.productCode.isShow" label="备付金账户对应的银行账户" prop="baseOperator">
                <el-select class="multiple-select" v-model="detailFormBefore.productCode"
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
            <el-form-item v-if="showRules.productCode&&showRules.productCode.isShow" label="卡账户对应的对公户" prop="productCode">
                <el-select class="multiple-select" v-model="detailFormBefore.productCode"
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
            <el-form-item v-if="showRules.openManPhone&&showRules.openManPhone.isShow" label="开户时对方联系人联系电话" prop="openManPhone">
                <gf-input v-model.trim="detailFormBefore.openManPhone" placeholder="开户时对方联系人联系电话"/>
            </el-form-item>
            <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                <gf-input v-model.trim="detailFormBefore.remark" placeholder="备注"/>
            </el-form-item>
        </el-form>
        <div v-if="showChange" class="title-top">变更后</div>
        <el-divider v-if="showChange"></el-divider>
        <el-form ref="taskDefForm" class="acnt-apply-insert-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
             :rules="detailFormRules" label-width="180px">
        <div class="title">要素信息</div>
        <el-divider></el-divider>
            <el-form-item label="账户类型" prop="typeCode">
                <el-select class="multiple-select" v-model="detailForm.typeCode" :disabled="mode!=='registration'"
                        filterable clearable
                        placeholder="请选择"
                        @change="loadShowRule">
                    <gf-filter-option
                            v-for="item in bizTagOption"
                            :key="item.typeCode"
                            :label="item.typeName"
                            :value="item.typeCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop="bizType">
                <gf-dict disabled filterable clearable v-model="detailForm.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
            </el-form-item>
            <el-form-item label="业务发起部门" prop="baseStartDept">
                <gf-dict filterable clearable v-model="detailForm.baseStartDept" dict-type="AGNES_ROSTER_DEPT"
                         :disabled="mode!=='registration'"/>
            </el-form-item>
            <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <gf-input v-model.trim="detailForm.baseStartDeptLinkman" placeholder="业务发起部门联系人"
                          :disabled="mode!=='registration'"/>
            </el-form-item>
            <el-form-item label="业务描述" prop="baseDesc">
                <gf-input v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"
                          :disabled="mode!=='registration'"/>
            </el-form-item>
            <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <gf-dict filterable clearable v-model="detailForm.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT"
                         :disabled="mode!=='registration'"/>
            </el-form-item>
            <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select class="multiple-select" v-model="detailForm.baseAcceptGroup"
                        filterable clearable :disabled="mode!=='registration'"
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
                        filterable clearable :disabled="mode!=='registration'"
                        placeholder="请选择"
                           @change="onBaseOrgIdChange">
                    <gf-filter-option
                            v-for="item in OrgList"
                            :key="item.extOrgId"
                            :label="item.extOrgName"
                            :value="item.extOrgId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经办人" prop="baseOperator">
                <gf-input disabled v-model.trim="detailForm.baseOperator" placeholder="经办人" />
            </el-form-item>
            <el-form-item label="基金代码" prop="productCode">
                <el-select class="multiple-select" v-model="detailForm.productCode"
                        filterable clearable :disabled="mode!=='registration'"
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productCode"
                            :value="item.productCode">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="基金名称" prop="productName">
                <gf-input disabled  v-model.trim="detailForm.productName" placeholder="基金名称"/>
            </el-form-item>
            <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group disabled v-model="detailForm.isSendFinance">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="title">账户信息</div>
            <el-divider></el-divider>
            <el-form-item v-if="showRules.acntName&&showRules.acntName.isShow" label="账户名称" prop="acntName">
                <gf-input v-model.trim="detailForm.acntName" placeholder="账户名称"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntShortName&&showRules.acntShortName.isShow" label="账户简称" prop="acntShortName">
                <gf-input v-model.trim="detailForm.acntShortName" placeholder="账户简称"/>
            </el-form-item>
            <el-form-item v-if="showRules.setTlementNo&&showRules.setTlementNo.isShow" label="清算编号" prop="setTlementNo">
                <gf-input v-model.trim="detailForm.setTlementNo" placeholder="清算编号"/>
            </el-form-item>
            <el-form-item v-if="showRules.stampInfo&&showRules.stampInfo.isShow" label="预留印鉴信息" prop="stampInfo">
                <gf-input v-model.trim="detailForm.stampInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
            <el-form-item v-if="showRules.accNo&&showRules.accNo.isShow" label="账号" prop="accNo">
                <gf-input v-model.trim="detailForm.accNo" placeholder="账号"/>
            </el-form-item>
            <el-form-item v-if="showRules.market&&showRules.market.isShow" label="市场" prop="market">
                <gf-dict filterable clearable v-model="detailForm.market" dict-type="AGNES_ACNT_MARKET" />
            </el-form-item>
            <el-form-item v-if="showRules.region&&showRules.region.isShow" label="账户所属地区" prop="region">
                <gf-input v-model.trim="detailForm.region" placeholder="账户所属地区"/>
            </el-form-item>
            <el-form-item v-if="showRules.currency&&showRules.currency.isShow" label="币种" prop="currency">
                <gf-dict filterable clearable v-model="detailForm.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
            <el-form-item v-if="showRules.fundAccName&&showRules.fundAccName.isShow" label="资金账户名称" prop="fundAccName">
                <gf-input v-model.trim="detailForm.fundAccName" placeholder="资金账户名称"/>
            </el-form-item>
            <el-form-item v-if="showRules.rateId&&showRules.rateId.isShow" label="利率" prop="rateId">
<!--                <gf-input v-model.trim="detailForm.rate" placeholder="利率"/>-->
                <el-select v-model="detailForm.rateId"
                           clearable
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in rateList"
                            :key="item.rateId"
                            :label="item.rateName"
                            :value="item.rateId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                <gf-input v-model.trim="detailForm.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
            </el-form-item>
            <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                <gf-input v-model.trim="detailForm.threeLicenseInfo" placeholder="预留印鉴信息"/>
            </el-form-item>
            <el-form-item v-if="showRules.bigPayNo&&showRules.bigPayNo.isShow" label="大额支付号" prop="bigPayNo">
                <gf-input v-model.trim="detailForm.bigPayNo" placeholder="大额支付号"/>
            </el-form-item>
            <el-form-item v-if="showRules.openBack&&showRules.openBack.isShow" label="开户网点/开户单位" prop="openBack">
                <gf-input v-model.trim="detailForm.openBack" placeholder="开户网点/开户单位"/>
            </el-form-item>
            <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号" prop="fundAccNo">
                <gf-input v-model.trim="detailForm.fundAccNo" placeholder="资金帐号"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntStartDt&&showRules.acntStartDt.isShow" label="账户启用日期" prop="acntStartDt">
                <el-date-picker
                    v-model="detailForm.acntStartDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="账户启用日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="showRules.isOpenBankCorDirect&&showRules.isOpenBankCorDirect.isShow" label="是否开立银企直联" prop="isOpenBankCorDirect">
                <el-radio-group v-model="detailForm.isOpenBankCorDirect">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showRules.isOpenEBank&&showRules.isOpenEBank.isShow" label="是否开立网银" prop="isOpenEBank">
                <el-radio-group v-model="detailForm.isOpenEBank">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showRules.other&&showRules.other.isShow" label="其他" prop="other">
                <gf-input v-model.trim="detailForm.other" placeholder="其他"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntPurpose&&showRules.acntPurpose.isShow" label="账户用途描述" prop="acntPurpose">
                <gf-input v-model.trim="detailForm.acntPurpose" placeholder="账户用途描述"/>
            </el-form-item>
            <el-form-item v-if="showRules.acntStatus&&showRules.acntStatus.isShow" label="账户状态" prop="acntStatus">
                <gf-dict filterable clearable v-model="detailForm.acntStatus" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
            </el-form-item>
            <el-form-item v-if="showRules.maturityDt&&showRules.maturityDt.isShow" label="到期提醒" prop="maturityDt">
                <el-date-picker
                    v-model="detailForm.maturityDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="到期提醒">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="showRules.bankLinkMan&&showRules.bankLinkMan.isShow" label="银行联系人" prop="detailForm.bankLinkMan">
                <el-select class="multiple-select" v-model="detailForm.bankLinkMan"
                        filterable clearable multiple
                        placeholder="请选择">
                    <gf-filter-option
                            v-for="item in linkManList"
                            :key="item.linkmanId"
                            :label="item.linkmanName"
                            :value="item.linkmanId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="showRules.productCode&&showRules.productCode.isShow" label="备付金账户对应的银行账户" prop="baseOperator">
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
            <el-form-item v-if="showRules.productCode&&showRules.productCode.isShow" label="卡账户对应的对公户" prop="productCode">
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
            <el-form-item v-if="showRules.openManPhone&&showRules.openManPhone.isShow" label="开户时对方联系人联系电话" prop="openManPhone">
                <gf-input v-model.trim="detailForm.openManPhone" placeholder="开户时对方联系人联系电话"/>
            </el-form-item>
            <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                <gf-input v-model.trim="detailForm.remark" placeholder="备注"/>
            </el-form-item>
        </el-form>
        {{detailForm}}

    </div>

</template>

<script>
    import loadsh from 'lodash';

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
                    applyId:'',
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
                    baseOperator:this.$app.session.data.user.userName,
                    accNo:'',
                    market:'',
                    region:'',
                    currency:'',
                    fundAccName:'',
                    acntPurpose:'',
                    rateId:'',
                    bigPayNo:'',
                    openBack:'',
                    fundAccNo:'',
                    isOpenEBank:'',
                    acntStartDt:'',
                    isOpenBankCorDirect:'',
                    maturityDt:'',
                    bankLinkMan:[],
                    acntStatus:'',
                    openManPhone:'',
                    remark:'',
                    other:'',
                },
                detailFormBefore: {
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
                    baseOperator:this.$app.session.data.user.userName,
                    accNo:'',
                    market:'',
                    region:'',
                    currency:'',
                    fundAccName:'',
                    acntPurpose:'',
                    rateId:'',
                    bigPayNo:'',
                    openBack:'',
                    fundAccNo:'',
                    isOpenEBank:'',
                    acntStartDt:'',
                    isOpenBankCorDirect:'',
                    maturityDt:'',
                    openMan:'',
                    bankLinkMan:[],
                    acntStatus:'',
                    openManPhone:'',
                    remark:'',
                    other:'',
                },
                showChange:false,
                bizTagOption: [],        // 业务类型下拉
                groupOption: [],        // 群组下拉
                productList:[],     //产品代码群组
                OrgList:[],         //机构列表
                linkManList:[],     //机构联系人列表
                rateList:[],     //利率列表
                showRules:{
           
                },
                detailFormRules: {
                    typeCode: [
                        {required: true, message: '账户类型必填', trigger: 'blur'},
                    ],
                    baseStartDept: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    baseAcceptDept: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ]
                },
            }
        },
        beforeMount() {
            if(this.mode=='registration'){
                this.detailForm.bizType='04'
            }else{
                this.detailForm.bizType='01'
            }
            Object.assign(this.detailForm, this.row);
            if(this.detailForm.bizType=='02'){
                this.showChange = true;
            }
            const p = this.getOptionData();
            this.$app.blockingApp(p);

            const p2 = this.loadShowRule();
            this.$app.blockingApp(p2);

        },
        methods: {
            async getOptionData(){
                try {
                    let bizTagOption = await this.$api.acntApplyApi.getAcntTypeList();
                    this.bizTagOption = bizTagOption.data
                    // let groupOption = await this.$api.userGroupApi.getAllGfUserGroup();
                    let groupOption = await this.$api.userGroupApi.getAllUserGroup();
                    this.groupOption = groupOption.data
                    let productList = await this.$api.acntApplyApi.getProductCodeList();
                    this.productList = productList.data
                    let OrgList = await this.$api.orgDefineApi.getOrgList();
                    this.OrgList = OrgList.data

                    let linkManList = await this.$api.acntApplyApi.getLinkMan(this.detailForm.baseOrgId);

                    this.linkManList = linkManList.data
                    let rateList = await this.$api.rateDefApi.getAllPulishRateList();
                    this.rateList = rateList.data

                    if(this.showChange){
                        let detailFormBefore = await this.$api.acntInfoApi.getAcntInfoByAcntId(this.detailForm.acntId);
                        this.detailFormBefore = detailFormBefore.data

                        let bankLinkMan = await this.$api.linkmanRefApi.queryAcntLinkmanRefIdsByApplyId(this.detailForm.acntId);
                        this.detailFormBefore.bankLinkMan = bankLinkMan.data;
                    }

                    if(this.showChang && this.detailForm.processStatus=='06'){
                        let bankLinkMan = await this.$api.linkmanRefApi.queryAcntLinkmanRefIdsByApplyId(this.detailForm.acntId);
                        this.detailForm.bankLinkMan = bankLinkMan.data;
                    }else{
                        let bankLinkMan = await this.$api.acntApplyApi.getApplyLinkmanRefIdsByApplyId(this.detailForm.applyId);
                        this.detailForm.bankLinkMan = bankLinkMan.data;
                    }

                    // let bankLinkMan = await this.$api.acntApplyApi.getApplyLinkmanRefIdsByApplyId(this.detailForm.applyId);
                    // this.detailForm.bankLinkMan = bankLinkMan.data;


                    this.loadProductName();
                    this.loadProductNameBeafore();

                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async loadShowRule(){
                let resp = await this.$api.acntApplyApi.getConfig(this.detailForm.typeCode);
                let showRules = resp.data;
                // let showRules = {
                //     acntName:{isShow:true,required:true},
                //     acntShortName:{isShow:true,required:true},
                // };
                this.showRules = showRules;
                // let detailFormRules = {};
                for(let key  in showRules){
                    let detailFormRulesOne = showRules[key];
                    detailFormRulesOne.message = '必填';
                    detailFormRulesOne.required = showRules[key].mustFill=='1';
                    detailFormRulesOne.trigger = 'blur';
                    this.detailFormRules[key] = [detailFormRulesOne]
                }
                // this.detailFormRules = detailFormRules;
            },
            async loadProductName(){
                if(loadsh.isEmpty(this.detailForm.productCode)){
                    this.detailForm.productName=''
                }else{
                    for(let i=0;i<this.productList.length;i++){
                        if(this.productList[i].productCode==this.detailForm.productCode){
                            this.detailForm.productName=this.productList[i].productName;
                        }
                    }
                }
            },
            async loadProductNameBeafore(){
                if(loadsh.isEmpty(this.detailFormBefore.productCode)){
                    this.detailFormBefore.productName='';
                }else{
                    for(let i=0;i<this.productList.length;i++){
                        if(this.productList[i].productCode==this.detailFormBefore.productCode){
                            this.detailFormBefore.productName=this.productList[i].productName;
                        }
                    }
                }
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }

                try {
                    let form =  JSON.parse(JSON.stringify(this.detailForm)) 
                    form.processStatus = '07';
                    if(!loadsh.isEmpty(this.detailForm.processStatus)){
                        //状态机控制
                        if(this.detailForm.processStatus=='06'){
                            form.processStatus = '07';
                        }else if(this.detailForm.processStatus=='07'){
                            form.processStatus = '08';
                        }
                    }
                    const p = this.$api.acntApplyApi.saveApply(form);
                    await this.$app.blockingApp(p);
                    this.$msg.success('提交成功');
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            // 保存onCancel事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                try {
                    if(this.detailForm.processStatus=='07'){
                        let form =  JSON.parse(JSON.stringify(this.detailForm)) 
                        form.processStatus = '06';
                        const p = this.$api.acntApplyApi.cancelApply(form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('提交成功');
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async onBaseOrgIdChange(){
                let linkManList = await this.$api.acntApplyApi.getLinkMan(this.detailForm.baseOrgId);
                this.linkManList = linkManList.data;
                this.detailForm.bankLinkMan = [];
            }

        },

        watch: {
              'detailForm.productCode'(val){
                if(loadsh.isEmpty(val)){
                    this.detailForm.productName=''
                }else{
                    for(let i=0;i<this.productList.length;i++){
                        if(this.productList[i].productCode==val){
                            this.detailForm.productName=this.productList[i].productName
                        }
                    }
                }
            },
        }
    }
</script>
<style scoped>
    .title-top{
        color: black;
        margin-left: 10px;
        font-size: 20px;
        margin-top: 10px;
        width: 100%;
    }
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
