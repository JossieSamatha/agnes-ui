<template>
    <div>
        <div v-if="showChange" class="title-top">变更前</div>
        <el-divider v-if="showChange"></el-divider>
        <el-form v-if="showChange" ref="taskDefFormBefore" class="acnt-apply-insert-form" :model="detailFormBefore" :disabled="true"
             :rules="detailFormRules" label-width="180px">
            <module-card title="要素信息" shadow="never">
                <template slot="content">
                    <div class="line">
                        <el-form-item label="账户类型" prop="typeCode">
                            <el-select class="multiple-select" v-model="detailFormBefore.typeCode"
                                       filterable clearable
                                       placeholder="请选择">
                                <el-option-group
                                        v-for="group in bizTagOption"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option
                                            v-for="item in group.options"
                                            :key="item.typeCode"
                                            :label="`${group.label} - ${item.typeName}`"
                                            :value="item.typeCode">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item></el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="业务发起部门" prop="baseStartDept">
                            <gf-dict filterable clearable v-model="detailFormBefore.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />
                        </el-form-item>
                        <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                            <gf-input v-model.trim="detailFormBefore.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="业务描述" prop="baseDesc">
                            <gf-input v-model.trim="detailFormBefore.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
                        </el-form-item>
                        <el-form-item label="业务受理部门" prop="baseAcceptDept">
                            <gf-dict filterable clearable v-model="detailFormBefore.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />
                        </el-form-item>
                    </div>
                    <div class="line">
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
                                        :label="`${item.extOrgCode} - ${item.extOrgName} - ${item.orgTypeName}`"
                                        :value="item.extOrgId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
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
                                        :label="`${item.productCode} - ${item.productName}`"
                                        :value="item.productCode">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="基金名称" prop="productName">
                            <gf-input :disabled="true"  v-model.trim="detailFormBefore.productName" placeholder="基金名称"/>
                        </el-form-item>
                        <el-form-item label="提交财务流程" prop="isSendFinance">
                            <el-radio-group v-model="detailFormBefore.isSendFinance">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </template>
            </module-card>

            <module-card title="账户信息" shadow="never">
                <template slot="content">
                    <el-form-item v-if="showRules.accNo&&showRules.accNo.isShow" label="证券账号" prop="accNo">
                        <div class="rule-table">
                            <el-table header-row-class-name="rule-header-row"
                                      header-cell-class-name="rule-header-cell"
                                      row-class-name="rule-row"
                                      cell-class-name="rule-cell"
                                      :data="detailFormBefore.accNoList"
                                      border stripe
                                      style="width: 100%">
                                <el-table-column prop="accNo" label="证券账号">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.accNo"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="market" label="市场">
                                    <template slot-scope="scope">
                                        <gf-dict filterable clearable v-model="scope.row.market" dict-type="AGNES_ACNT_MARKET" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号" prop="fundAccNo">
                        <div class="rule-table">
                            <el-table header-row-class-name="rule-header-row"
                                      header-cell-class-name="rule-header-cell"
                                      row-class-name="rule-row"
                                      cell-class-name="rule-cell"
                                      :data="detailFormBefore.moneyAccNoList"
                                      border stripe
                                      style="width: 100%">
                                <el-table-column prop="accNo" label="资金帐号">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.accNo"></el-input>
                                    </template>
                                </el-table-column>
                                <!--                                <el-table-column prop="accName" label="资金账户名称">-->
                                <!--                                    <template slot-scope="scope">-->
                                <!--                                        <el-input v-model="scope.row.accName"></el-input>-->
                                <!--                                    </template>-->
                                <!--                                </el-table-column>-->
                                <el-table-column prop="currency" label="币种">
                                    <template slot-scope="scope">
                                        <gf-dict filterable clearable v-model="scope.row.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                    <div class="line wrap">
                        <el-form-item v-if="showRules.acntName&&showRules.acntName.isShow" label="账户名称" prop="acntName">
                            <gf-input v-model.trim="detailFormBefore.acntName" placeholder="账户名称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.acntShortName&&showRules.acntShortName.isShow" label="账户简称" prop="acntShortName">
                            <gf-input v-model.trim="detailFormBefore.acntShortName" placeholder="账户简称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.fundAccName&&showRules.fundAccName.isShow" label="资金账户名称" prop="fundAccName">
                            <gf-input v-model.trim="detailFormBefore.fundAccName" placeholder="资金账户名称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.market&&showRules.market.isShow" label="市场" prop="market">
                            <gf-dict filterable clearable v-model="detailFormBefore.market" dict-type="AGNES_ACNT_MARKET" />
                        </el-form-item>

                        <el-form-item v-if="showRules.acntStatus&&showRules.acntStatus.isShow" label="账户状态" prop="acntStatus">
                            <gf-dict filterable clearable v-model="detailFormBefore.acntStatus" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                        </el-form-item>

                        <el-form-item v-if="showRules.settlementNo&&showRules.settlementNo.isShow" label="清算编号" prop="settlementNo">
                            <gf-input v-model.trim="detailFormBefore.settlementNo" placeholder="清算编号"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.bigPayNo&&showRules.bigPayNo.isShow" label="大额支付号" prop="bigPayNo">
                            <gf-input v-model.trim="detailFormBefore.bigPayNo" placeholder="大额支付号"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.openBank&&showRules.openBank.isShow" label="开户网点/开户单位" prop="openBank">
                            <gf-input v-model.trim="detailFormBefore.openBank" placeholder="开户网点/开户单位"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.region&&showRules.region.isShow" label="账户所属地区" prop="region">
                            <gf-input v-model.trim="detailFormBefore.region" placeholder="账户所属地区"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.currency&&showRules.currency.isShow" label="币种" prop="currency">
                            <gf-dict filterable clearable v-model="detailFormBefore.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                        </el-form-item>

                        <el-form-item v-if="showRules.rateCode&&showRules.rateCode.isShow" label="利率" prop="rateCode">
                            <el-select v-model="detailFormBefore.rateCode"
                                       clearable
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in rateList"
                                        :key="item.rateCode"
                                        :label="`${item.rateCode} - ${item.rateName} - ${item.rate}`"
                                        :value="item.rateCode">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.stampInfo&&showRules.stampInfo.isShow" label="预留印鉴信息" prop="stampInfo">
                            <gf-input v-model.trim="detailFormBefore.stampInfo" placeholder="预留印鉴信息"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                            <gf-input v-model.trim="detailFormBefore.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                            <gf-input v-model.trim="detailFormBefore.threeLicenseInfo" placeholder="三证合一变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.acntStartDt&&showRules.acntStartDt.isShow" label="账户启用日期" prop="acntStartDt">
                            <el-date-picker
                                    v-model="detailFormBefore.acntStartDt"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="账户启用日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item v-if="showRules.acntPurpose&&showRules.acntPurpose.isShow" label="账户用途描述" prop="acntPurpose">
                            <gf-input v-model.trim="detailFormBefore.acntPurpose" placeholder="账户用途描述"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.isOpenEbank&&showRules.isOpenEbank.isShow" label="是否开立网银" prop="isOpenEbank">
                            <el-radio-group v-model="detailFormBefore.isOpenEbank">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item v-if="showRules.isOpenBankCorDirect&&showRules.isOpenBankCorDirect.isShow" label="是否开立银企直联" prop="isOpenBankCorDirect">
                            <el-radio-group v-model="detailFormBefore.isOpenBankCorDirect">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item v-if="showRules.provisionBankAcntIds&&showRules.provisionBankAcntIds.isShow" label="备付金账户对应的银行账户" prop="baseOperator">
                            <el-select style="width: 100%" class="multiple-select" v-model="detailFormBefore.provisionBankAcntIds"
                                       filterable clearable multiple
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in acntList"
                                        :key="item.acntId"
                                        :label="item.acntName"
                                        :value="item.acntId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.cardCorporateAcntId&&showRules.cardCorporateAcntId.isShow" label="卡账户对应的对公户" prop="productCode">
                            <el-select style="width: 100%" class="multiple-select" v-model="detailFormBefore.cardCorporateAcntId"
                                       filterable clearable
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in acntList"
                                        :key="item.acntId"
                                        :label="item.acntName"
                                        :value="item.acntId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.maturityDt&&showRules.maturityDt.isShow" label="到期提醒" prop="maturityDt">
                            <el-date-picker
                                v-model="detailFormBefore.maturityDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="到期提醒">
                            </el-date-picker>
                        </el-form-item>

                      <el-form-item v-if="showRules.futuresCompany&&showRules.futuresCompany.isShow" label="期货公司"
                                    prop="futuresCompany">
                        <gf-input v-model.trim="detailFormBefore.futuresCompany" placeholder="期货公司"/>
                      </el-form-item>

                      <el-form-item v-if="showRules.limits&&showRules.limits.isShow" label="额度" prop="limits">
                        <gf-input v-model.trim="detailFormBefore.limits" placeholder="额度" input-lang="money"/>
                      </el-form-item>

                      <el-form-item v-if="showRules.bankLinkMan&&showRules.bankLinkMan.isShow" label="银行/开户时对方联系人"
                                    prop="bankLinkMan">
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

                        <el-form-item v-if="showRules.other&&showRules.other.isShow" label="其他" prop="other">
                            <gf-input v-model.trim="detailFormBefore.other" placeholder="其他"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                            <gf-input v-model.trim="detailFormBefore.remark" placeholder="备注"/>
                        </el-form-item>

<!--                        <el-form-item v-if="showRules.openManPhone&&showRules.openManPhone.isShow" label="开户时对方联系人联系电话" prop="openManPhone">-->
<!--                            <gf-input v-model.trim="detailFormBefore.openManPhone" placeholder="开户时对方联系人联系电话"/>-->
<!--                        </el-form-item>-->

<!--                        <el-form-item v-if="showRules.accNo&&showRules.accNo.isShow" label="账号" prop="accNo">-->
<!--                            <gf-input v-model.trim="detailFormBefore.accNo" placeholder="账号"/>-->
<!--                        </el-form-item>-->

<!--                        <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号" prop="fundAccNo">-->
<!--                            <gf-input v-model.trim="detailFormBefore.fundAccNo" placeholder="资金账号"/>-->
<!--                        </el-form-item>-->

                    </div>

                </template>
            </module-card>
        </el-form>
        <div v-if="showChange" class="title-top">变更后</div>
        <el-divider v-if="showChange"></el-divider>
        <el-form ref="taskDefForm" class="acnt-apply-insert-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
             :rules="detailFormRules" label-width="180px">
            <module-card title="要素信息" shadow="never">
                <template slot="content">
                    <div class="line">
                        <el-form-item label="账户类型" prop="typeCode">
                            <el-select class="multiple-select" v-model="detailForm.typeCode" :disabled="mode!=='registration'"
                                       filterable clearable
                                       placeholder="请选择"
                                       @change="onTypeCodeChange">
                                <el-option-group
                                        v-for="group in bizTagOption"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option
                                            v-for="item in group.options"
                                            :key="item.typeCode"
                                            :label="`${group.label} - ${item.typeName}`"
                                            :value="item.typeCode">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业务类型" prop="bizType">
                            <gf-dict :disabled="true" filterable clearable v-model="detailForm.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="业务发起部门" prop="baseStartDept">
                            <gf-dict filterable clearable v-model="detailForm.baseStartDept" dict-type="AGNES_ROSTER_DEPT"
                                     :disabled="mode!=='registration'"/>
                        </el-form-item>
                        <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                            <gf-input v-model.trim="detailForm.baseStartDeptLinkman" placeholder="业务发起部门联系人"
                                      :disabled="mode!=='registration'"/>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="业务描述" prop="baseDesc">
                            <gf-input v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"
                                      :disabled="mode!=='registration'"/>
                        </el-form-item>
                        <el-form-item label="业务受理部门" prop="baseAcceptDept">
                            <gf-dict filterable clearable v-model="detailForm.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT"
                                     :disabled="mode!=='registration'"/>
                        </el-form-item>
                    </div>
                    <div class="line">
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
                                        :label="`${item.extOrgCode} - ${item.extOrgName} - ${item.orgTypeName}`"
                                        :value="item.extOrgId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="经办人" prop="baseOperator">
                            <gf-input :disabled="true" v-model.trim="detailForm.baseOperator" placeholder="经办人" />
                        </el-form-item>
                        <el-form-item label="基金代码" prop="productCode">
                            <el-select class="multiple-select" v-model="detailForm.productCode"
                                       filterable clearable :disabled="mode!=='registration'"
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in productList"
                                        :key="item.productCode"
                                        :label="`${item.productCode} - ${item.productName}`"
                                        :value="item.productCode">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="基金名称" prop="productName">
                            <gf-input :disabled="true"  v-model.trim="detailForm.productName" placeholder="基金名称"/>
                        </el-form-item>

                      <!--                        <el-form-item  label="申请截止日期" prop="applyDeadlineDt">-->
                      <!--                            <el-date-picker-->
                      <!--                                    v-model="detailForm.applyDeadlineDt"-->
                      <!--                                    type="date"-->
                      <!--                                    value-format="yyyy-MM-dd"-->
                      <!--                                    placeholder="申请日期">-->
                      <!--                            </el-date-picker>-->
                      <!--                        </el-form-item>-->
                    </div>
                  <!--                    <div class="line">-->
                  <!--                        <el-form-item label="提交财务流程" prop="isSendFinance">-->
                  <!--                            <el-radio-group :disabled="true" v-model="detailForm.isSendFinance">-->
                  <!--                                <el-radio label="1">是</el-radio>-->
                  <!--                                <el-radio label="0">否</el-radio>-->
                  <!--                            </el-radio-group>-->
                  <!--                        </el-form-item>-->
                  <!--                    </div>-->
                </template>
            </module-card>

            <module-card title="账户信息" shadow="never" v-if="detailForm.typeCode">
                <template slot="content">
                    <el-form-item v-if="showRules.accNo&&showRules.accNo.isShow" label="证券账号" prop="accNo">
                        <div class="rule-table">
                            <el-table header-row-class-name="rule-header-row"
                                      header-cell-class-name="rule-header-cell"
                                      row-class-name="rule-row"
                                      cell-class-name="rule-cell"
                                      :data="accNoList"
                                      border stripe
                                      style="width: 100%">
                              <el-table-column prop="accNo" label="账号">
                                <template slot-scope="scope">
                                  <el-input v-model="scope.row.accNo"></el-input>
                                </template>
                              </el-table-column>
                                <el-table-column prop="market" label="市场">
                                    <template slot-scope="scope">
                                        <gf-dict filterable clearable v-model="scope.row.market" dict-type="AGNES_ACNT_MARKET" />
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="mode!=='view'" prop="option" label="操作" width="52" align="center">
                                    <template slot-scope="scope">
                                        <span class="option-span" @click="deleteAccRuleRow(scope.$index)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button  @click="addAccRule()" class="rule-add-btn" size="small">新增</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号" prop="fundAccNo">
                        <div class="rule-table">
                            <el-table header-row-class-name="rule-header-row"
                                      header-cell-class-name="rule-header-cell"
                                      row-class-name="rule-row"
                                      cell-class-name="rule-cell"
                                      :data="moneyAccNoList"
                                      border stripe
                                      style="width: 100%">
                                <el-table-column prop="accNo" label="资金帐号">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.accNo"></el-input>
                                    </template>
                                </el-table-column>
                                <!--                                <el-table-column prop="accName" label="资金账户名称">-->
                                <!--                                    <template slot-scope="scope">-->
                                <!--                                        <el-input v-model="scope.row.accName"></el-input>-->
                                <!--                                    </template>-->
                                <!--                                </el-table-column>-->
                                <el-table-column prop="currency" label="币种">
                                    <template slot-scope="scope">
                                        <gf-dict filterable clearable v-model="scope.row.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="mode!=='view'"  prop="option" label="操作" width="52" align="center">
                                    <template slot-scope="scope">
                                        <span class="option-span" @click="deleteMoneyAccRuleRow(scope.$index)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button  @click="addMoneyAccRule" class="rule-add-btn" size="small">新增</el-button>
                        </div>
                    </el-form-item>
                    <div class="line wrap">
                        <el-form-item v-if="showRules.acntName&&showRules.acntName.isShow" label="账户名称" prop="acntName">
                            <gf-input v-model.trim="detailForm.acntName" placeholder="账户名称"/>
                        </el-form-item>
                        <el-form-item v-if="showRules.acntShortName&&showRules.acntShortName.isShow" label="账户简称" prop="acntShortName">
                            <gf-input v-model.trim="detailForm.acntShortName" placeholder="账户简称"/>
                        </el-form-item>
                        <el-form-item v-if="showRules.fundAccName&&showRules.fundAccName.isShow" label="资金账户名称" prop="fundAccName">
                            <gf-input v-model.trim="detailForm.fundAccName" placeholder="资金账户名称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.market&&showRules.market.isShow" label="市场" prop="market">
                            <gf-dict filterable clearable v-model="detailForm.market" dict-type="AGNES_ACNT_MARKET" />
                        </el-form-item>

                        <el-form-item v-if="showRules.acntStatus&&showRules.acntStatus.isShow" label="账户状态" prop="acntStatus">
                            <gf-dict filterable clearable v-model="detailForm.acntStatus" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                        </el-form-item>

                        <el-form-item v-if="showRules.settlementNo&&showRules.settlementNo.isShow" label="清算编号" prop="settlementNo">
                            <gf-input v-model.trim="detailForm.settlementNo" placeholder="清算编号"/>
                        </el-form-item>
                        <el-form-item v-if="showRules.bigPayNo&&showRules.bigPayNo.isShow" label="大额支付号" prop="bigPayNo">

                            <div class="line">
                                <el-select class="multiple-select" v-model="detailForm.bigPayNo" style="width: 90%"
                                           clearable
                                           filterable
                                           remote
                                           reserve-keyword
                                           placeholder="请输入关键词或空格搜索"
                                           :remote-method="remoteLoadOpenBankList"
                                           :loading="loading"
                                           @change="loadNameByBigPayNo">
                                    <gf-filter-option
                                            v-for="item in openBankList"
                                            :key="item.bigPayNo"
                                            :label="`${item.bigPayNo} - ${item.branchName}`"
                                            :value="item.bigPayNo">
                                    </gf-filter-option>
                                </el-select>

                                <!--<em class="el-icon-refresh-left" @click="loadNameByBigPayNo"/>-->
                                <el-button style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle" icon="el-icon-edit-outline" @click="defendOpenBank"/>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="showRules.openBank&&showRules.openBank.isShow" label="开户网点/开户单位" prop="openBank">
                            <!--                            <gf-input v-model.trim="detailForm.openBank" placeholder="开户网点/开户单位" style="width: 80%"-->
                            <!--                                      :disabled="showRules.bigPayNo&&showRules.bigPayNo.isShow"/>-->

<!--                            <gf-input v-model.trim="detailForm.openBank" placeholder="开户网点/开户单位" :disabled="true"/>-->

                            <div class="line">
                                <el-select class="multiple-select" v-model="detailForm.openBank" style="width: 90%"
                                           clearable
                                           filterable
                                           remote
                                           reserve-keyword
                                           placeholder="请输入关键词或空格搜索"
                                           :remote-method="remoteLoadOpenBankList"
                                           :loading="loading"
                                           :disabled="showRules.bigPayNo && showRules.bigPayNo.isShow==='1'">
                                    <gf-filter-option
                                            v-for="item in openBankList"
                                            :key="item.bigPayNo"
                                            :label="`${item.bigPayNo} - ${item.branchName}`"
                                            :value="item.branchName">
                                    </gf-filter-option>
                                </el-select>
                                <el-button v-if="!showRules.bigPayNo || !showRules.bigPayNo.isShow" style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle" icon="el-icon-edit-outline" @click="defendOpenBank"/>
                            </div>
                        </el-form-item>

                        <el-form-item v-if="showRules.region&&showRules.region.isShow" label="账户所属地区" prop="region">
                            <gf-input v-model.trim="detailForm.region" placeholder="账户所属地区"/>
                        </el-form-item>
                        <el-form-item v-if="showRules.currency&&showRules.currency.isShow" label="币种" prop="currency">
                            <gf-dict filterable clearable v-model="detailForm.currency" dict-type="AGNES_ACNT_CURRENCY_TYPE" />
                        </el-form-item>

                        <el-form-item v-if="showRules.rateCode&&showRules.rateCode.isShow" label="利率" prop="rateCode">
                            <el-select v-model="detailForm.rateCode"
                                       clearable
                                       filterable
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in rateList"
                                        :key="item.rateCode"
                                        :label="`${item.rateCode} - ${item.rateName} - ${item.rate}`"
                                        :value="item.rateCode">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.stampInfo&&showRules.stampInfo.isShow" label="预留印鉴信息" prop="stampInfo">
                            <gf-input v-model.trim="detailForm.stampInfo" placeholder="预留印鉴信息"/>
                        </el-form-item>


                        <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                            <gf-input v-model.trim="detailForm.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                            <gf-input v-model.trim="detailForm.threeLicenseInfo" placeholder="三证合一变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.acntStartDt&&showRules.acntStartDt.isShow" label="账户启用日期" prop="acntStartDt">
                            <el-date-picker
                                    v-model="detailForm.acntStartDt"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="账户启用日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="showRules.acntPurpose&&showRules.acntPurpose.isShow" label="账户用途描述" prop="acntPurpose">
                            <gf-input v-model.trim="detailForm.acntPurpose" placeholder="账户用途描述"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.isOpenEbank&&showRules.isOpenEbank.isShow" label="是否开立网银" prop="isOpenEbank">
                            <el-radio-group v-model="detailForm.isOpenEbank">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item v-if="showRules.isOpenBankCorDirect&&showRules.isOpenBankCorDirect.isShow" label="是否开立银企直联" prop="isOpenBankCorDirect">
                            <el-radio-group v-model="detailForm.isOpenBankCorDirect">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item  v-if="showRules.provisionBankAcntIds&&showRules.provisionBankAcntIds.isShow" label="备付金账户对应的银行账户" prop="baseOperator">
                            <el-select style="width: 100%" class="multiple-select" v-model="detailForm.provisionBankAcntIds"
                                       filterable clearable multiple
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in acntList"
                                        :key="item.acntId"
                                        :label="item.acntName"
                                        :value="item.acntId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.cardCorporateAcntId&&showRules.cardCorporateAcntId.isShow" label="卡账户对应的对公户" prop="productCode">
                            <el-select style="width: 100%"  class="multiple-select" v-model="detailForm.cardCorporateAcntId"
                                       filterable clearable
                                       placeholder="请选择">
                                <gf-filter-option
                                        v-for="item in acntList"
                                        :key="item.acntId"
                                        :label="item.acntName"
                                        :value="item.acntId">
                                </gf-filter-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="showRules.maturityDt&&showRules.maturityDt.isShow" label="到期提醒" prop="maturityDt">
                            <el-date-picker
                                v-model="detailForm.maturityDt"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="到期提醒">
                            </el-date-picker>
                        </el-form-item>

                      <el-form-item v-if="showRules.futuresCompany&&showRules.futuresCompany.isShow" label="期货公司"
                                    prop="futuresCompany">
                        <gf-input v-model.trim="detailForm.futuresCompany" placeholder="期货公司"/>
                      </el-form-item>

                      <el-form-item v-if="showRules.limits&&showRules.limits.isShow" label="额度" prop="limits">
                        <gf-input v-model.trim="detailFormBefore.limits" placeholder="额度" input-lang="money"/>
                      </el-form-item>

                      <el-form-item v-if="showRules.bankLinkMan&&showRules.bankLinkMan.isShow" label="银行/开户时对方联系人"
                                    prop="bankLinkMan">
                        <div class="line">
                          <el-select class="multiple-select" v-model="detailForm.bankLinkMan"
                                     filterable clearable multiple
                                     placeholder="请选择"
                                     style="width: 90%">
                            <gf-filter-option
                                v-for="item in linkManList"
                                :key="item.linkmanId"
                                  :label="item.linkmanName"
                                  :value="item.linkmanId">
                              </gf-filter-option>
                            </el-select>
                            <el-button style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle"
                                       icon="el-icon-edit-outline" @click="addLinKman"/>
                          </div>
                        </el-form-item>

                        <el-form-item v-if="showRules.other&&showRules.other.isShow" label="其他" prop="other">
                            <gf-input v-model.trim="detailForm.other" placeholder="其他"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                            <gf-input v-model.trim="detailForm.remark" placeholder="备注"/>
                        </el-form-item>

<!--                        <el-form-item v-if="showRules.openManPhone&&showRules.openManPhone.isShow" label="开户时对方联系人联系电话" prop="openManPhone">-->
<!--                            <gf-input v-model.trim="detailForm.openManPhone" placeholder="开户时对方联系人联系电话"/>-->
<!--                        </el-form-item>-->

                    </div>

                </template>
            </module-card>
        </el-form>

    </div>

</template>

<script>
    import loadsh from 'lodash';
    import BranchDetail from "../../../../agnes-dop/pages/config/branch/branch-detail";
    import LinkmanBaseDlg from "../../../../agnes-dop/pages/config/linkman-def/linkman-base-dlg"


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
                loading: false,
                rosterDate:'',
                memberRefList:[],
                serviceRes:[],
                staticData: {},
                detailForm: {
                  applyId: '',
                  applyDeadlineDt: '9999-12-31',
                  typeCode: '',
                  bizType: '',
                  baseStartDept: '00',
                  baseStartDeptLinkman: '',
                  settlementNo: '',
                  baseAcceptDept: '00',
                  stampInfo: '',
                  stampLegalPersonInfo: '',
                  threeLicenseInfo: '',
                  baseAcceptGroup: '',
                  baseOrgId: '',
                  productCode: '',
                  productName: '',
                  isSendFinance: '0',
                  acntName: '',
                  acntShortName: '',
                  baseOperator: this.$app.session.data.user.userName,
                  accNo: '',
                  market: '',
                  accNoMarket: '',
                  region: '',
                  currency: '',
                  fundAccName: '',
                  acntPurpose: '',
                  rateId: '',
                    rateCode:'',
                    bigPayNo:'',
                    openBank:'',
                    fundAccNo:'',
                    isOpenEbank:'',
                    acntStartDt:'',
                    isOpenBankCorDirect:'',
                    maturityDt:'',
                    bankLinkMan:[],
                    acntStatus:'',
                    openManPhone:'',
                    remark:'',
                    other:'',
                    futuresCompany:'',
                    cardCorporateAcntId:'',
                    provisionBankAcntIds:[],
                    fields:[],
                    crtUser:'',
                    updateUser:''
                },
                detailFormBefore: {
                  typeCode: '',
                  bizType: '',
                  baseStartDept: '',
                  baseStartDeptLinkman: '',
                  settlementNo: '',
                  baseAcceptDept: '',
                  stampInfo: '',
                  stampLegalPersonInfo: '',
                  threeLicenseInfo: '',
                  baseAcceptGroup: '',
                  baseOrgId: '',
                  productCode: '',
                  productName: '',
                  isSendFinance: '0',
                  acntName: '',
                  acntShortName: '',
                  baseOperator: this.$app.session.data.user.userName,
                  accNo: '',
                  market: '',
                  accNoMarket: '',
                  region: '',
                  currency: '',
                  fundAccName: '',
                  acntPurpose: '',
                  rateId: '',
                    rateCode:'',
                    bigPayNo:'',
                    openBank:'',
                    fundAccNo:'',
                    isOpenEbank:'',
                    acntStartDt:'',
                    isOpenBankCorDirect:'',
                    maturityDt:'',
                    openMan:'',
                    bankLinkMan:[],
                    acntStatus:'',
                    openManPhone:'',
                    remark:'',
                    other:'',
                    futuresCompany:'',
                    cardCorporateAcntId:'',
                    provisionBankAcntIds:[],
                    accNoList:[],
                    moneyAccNoList:[],
                    fields:[],
                    crtUser:'',
                    updateUser:''
                },
                showChange:false,
                isAccNoMustFill:false,
                isMoneyAccNoMustFill:false,
                isBankLinkManMustFill:false,
                isProvisionBankAcntIdsMustFill:false,
                // 业务类型下拉
                bizTagOption: [{
                    label: 'TA',
                    options: []
                },{
                    label: 'FA',
                    options: []
                }],
                groupOption: [],        // 群组下拉
                productList:[],     //产品代码群组
                OrgList:[],         //机构列表
                linkManList:[],     //机构联系人列表
                rateList:[],     //利率列表
                accNoList:[],
                moneyAccNoList:[],
                acntList:[],    //账户列表
                openBankList:[],
                showRules:{

                },
                detailFormRules: {
                  typeCode: [
                    {required: true, message: '账户类型必填', trigger: 'blur'},
                  ],
                  // applyDeadlineDt: [
                  //     {required: true, message: '申请截止日期必填', trigger: 'blur'},
                  // ],
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

            // const p3 = this.loadAccNoRefList();
            // this.$app.blockingApp(p3);

        },
        methods: {
          addLinKman() {
            let actionOk = this.reloadLinkmanList.bind(this);
            let mode = 'add'
            let _this = this;
            this.$nav.showDialog(
                LinkmanBaseDlg,
                {
                  args: {row: {'extOrgId': _this.detailForm.baseOrgId}, mode, actionOk},
                  width: '50%',
                  title: this.$dialog.formatTitle('联系人维护', 'add'),
                }
            );
          },
          async reloadLinkmanList() {
            let linkManList = await this.$api.acntApplyApi.getLinkMan(this.detailForm.baseOrgId);
            this.linkManList = linkManList.data
          },
          // 账号新增、删除服务行
          addAccRule() {
            const newAccTableObj = {
              accNo: '',
              market: '',
              accNoType: '01',
            };
            this.accNoList.push(newAccTableObj);
          },
          deleteAccRuleRow(rowIndex) {
                this.accNoList.splice(rowIndex, 1);
            },
            // 资金账号新增、删除服务行
            addMoneyAccRule(){
                const newMoneyTableObj = {
                    accNo: '',
                    accName: '',
                    currency: '',
                    accNoType: '02',
                };
                this.moneyAccNoList.push(newMoneyTableObj);
            },
            deleteMoneyAccRuleRow(rowIndex){
                this.moneyAccNoList.splice(rowIndex, 1);
            },
            async loadNameByBigPayNo(){
                if(this.detailForm.bigPayNo){
                    let resp = await this.$api.branchApi.searchByPayNo(this.detailForm.bigPayNo);
                    if(resp.data){
                        this.detailForm.openBank = resp.data.branchName;
                    }else {
                        this.detailForm.openBank = '';
                        this.$msg.warning('该大额支付号未匹配到相应的网点信息！');
                    }
                }else{
                    this.detailForm.openBank = '';
                }
            },

            async remoteLoadOpenBankList(query){
                this.loading = true;
                let openBankList = await this.$api.branchApi.listByBigPayNoAndBranchName(query,query);
                this.openBankList = openBankList.data
                this.loading = false;
            },

            async loadOpenBankListByBigPayNo(){
                this.detailForm.openBank = '';
                let openBankList = await this.$api.branchApi.listByBigPayNoAndBranchName(this.detailForm.bigPayNo,"");
                this.openBankList = openBankList.data
            },

            defendOpenBank(){
                // this.defendOpenBankDlg(null,'add',() => {
                //     this.loadOpenBankListByBigPayNo();
                // });
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
            async getOptionData(){
                try {
                    let bizTagOption = await this.$api.acntApplyApi.getAcntTypeList();
                    // this.bizTagOption = bizTagOption.data
                    bizTagOption.data.forEach(item=>{
                        if(item.processType === 'TA'){
                            this.bizTagOption[0].options.push(item);
                        }else if(item.processType === 'FA'){
                            this.bizTagOption[1].options.push(item);
                        }
                    });
                    // let groupOption = await this.$api.userGroupApi.getAllGfUserGroup();
                    let groupOption = await this.$api.userGroupApi.getAllUserGroupForAcnt();
                    this.groupOption = groupOption.data
                    let productList = await this.$api.acntApplyApi.getProductCodeList();
                    this.productList = productList.data
                    let OrgList = await this.$api.orgDefineApi.getOrgList();
                    this.OrgList = OrgList.data

                    let linkManList = await this.$api.acntApplyApi.getLinkMan(this.detailForm.baseOrgId);
                    this.linkManList = linkManList.data

                    let rateList = await this.$api.rateDefApi.getAllPulishRateList();
                    this.rateList = rateList.data;

                    let acntList = await this.$api.acntInfoApi.getAcntInfoList();
                    this.acntList = acntList.data;

                    // let openBankList = await this.$api.branchApi.listByPayNo(this.detailForm.bigPayNo);
                    // this.openBankList = openBankList.data

                    //以下加载填写的数据
                    if(this.showChange){
                        let detailFormBefore = await this.$api.acntInfoApi.getAcntInfoByAcntId(this.detailForm.acntId);
                        this.detailFormBefore = detailFormBefore.data
                    }

                    //获取账户关联表数据
                    let bankLinkMan = await this.$api.acntApplyApi.getApplyLinkmanRefIdsByApplyId(this.detailForm.applyId);
                    this.detailForm.bankLinkMan = bankLinkMan.data;

                    let provisionBankAcntIds = await this.$api.acntApplyApi.getApplyProvisionBankAcntIdsByApplyId(this.detailForm.applyId);
                    this.detailForm.provisionBankAcntIds = provisionBankAcntIds.data;

                    let resp = await this.$api.acntApplyApi.getAcntRuApplyAccNoRefListByApplyId({'applyId':this.detailForm.applyId});
                    let allList = resp.data;
                    for(let i=0;i< allList.length;i++){
                        if(allList[i].accNoType === '01'){
                            this.accNoList.push(allList[i]);
                        }else {
                            this.moneyAccNoList.push(allList[i]);
                        }
                    }


                    this.loadProductName();
                    this.loadProductNameBeafore();

                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async arrValidate(rule, value, callback) {
                if (rule.field === 'accNo') {
                    const accNoHasValue = await this.isTableHasValues(this.accNoList, true);
                    if (!accNoHasValue) {
                        callback(new Error('账号信息必填'));
                    }
                } else if(rule.field === 'fundAccNo'){
                    const applyAccNoHasValue = await this.isTableHasValues(this.moneyAccNoList, true);
                    if (!applyAccNoHasValue) {
                        callback(new Error('资金账号必填'));
                    }
                } else if (!value || value.length < 1) {
                    const factorName = this.showRules[rule.field].factorName;
                    callback(new Error(factorName + '必填'));
                }else{
                    callback();
                }
            },

            async loadShowRule(){
                let resp = await this.$api.acntApplyApi.getConfig(this.detailForm.typeCode);
                let showRules = resp.data;
                this.showRules = showRules;
                const detailFormRules = {};
                for(let key  in showRules){
                    const arrItem = ['accNo', 'fundAccNo', 'bankLinkMan', 'provisionBankAcntIds'];
                    if(showRules[key].mustFill === '1'){
                        if(arrItem.includes(key)){
                            detailFormRules[key] = [{ required: true, validator: this.arrValidate, trigger: 'change'}];
                        }else{
                            detailFormRules[key] =[{ message: showRules[key].factorName+'必填', required: true, trigger: 'change'}];
                        }
                    }
                }

                detailFormRules['typeCode'] = [{ message: '账户类型必填', required: true, trigger: 'change'}];
                detailFormRules['baseStartDept'] = [{ message: '必填', required: true, trigger: 'change'}];
                detailFormRules['baseAcceptDept'] = [{ message: '必填', required: true, trigger: 'change'}];

                this.$nextTick(()=>{
                    if(this.$refs.taskDefForm){
                        this.$refs.taskDefForm.clearValidate();
                    }
                    this.detailFormRules = detailFormRules;
                })
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
                  let form = JSON.parse(JSON.stringify(this.detailForm))
                    form.processStatus = '07';
                    form.accNoList = this.accNoList;
                    form.moneyAccNoList = this.moneyAccNoList;
                    if(!loadsh.isEmpty(this.detailForm.processStatus)){
                        //状态机控制
                        if(this.detailForm.processStatus=='06'){
                            form.processStatus = '07';
                        }else if(this.detailForm.processStatus=='07'){
                            form.processStatus = '08';
                        }
                    }
                    if(!loadsh.isEmpty(this.detailForm.processStatus) && this.detailForm.processStatus=='07'){
                        let opUser = form.updateUser;
                        if(this.$lodash.isEmpty(opUser)){
                            opUser = form.crtUser;
                        }

                        if(opUser === this.$app.session.data.user.userId){
                            this.$msg.warning('您不能进行该岗操作！');
                            return ;
                        }
                    }

                    if(form.processStatus === '07' && !this.$lodash.isEmpty(form.acntName)){
                        const check = await this.$api.acntApplyApi.checkAcntName(form);
                        if(form.bizType.match(/01|04/) && check.code==='exit'){
                            this.$msg.warning(check.message);
                            return ;
                        }
                        if(form.bizType === '02' && form.acntName !== this.row.acntName && check.code==='exit'){
                            this.$msg.warning(check.message);
                            return ;
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
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async onCancelCheck() {
                try {
                    if(this.detailForm.processStatus=='07' && this.mode!=='view'){
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
            },
            async isTableHasValues(fields,mustFill){
                let validate = true;
                for(let i =0;i<fields.length;i++){
                    if(fields[i].accNo === ''){
                        validate = false;
                    }
                    if(!validate && mustFill){
                        return false;
                    }
                }
                if(fields.length === 0 && mustFill){
                    return false;
                }
                return true;
            },

            async onTypeCodeChange(typeCode){
                this.detailForm = {
                    'applyId':'',
                    'applyDeadlineDt':'9999-12-31',
                    'typeCode':typeCode,
                    'bizType':'',
                    'baseStartDept':'00',
                    'baseStartDeptLinkman':'',
                    'settlementNo':'',
                    'baseAcceptDept':'00',
                    'stampInfo':'',
                    'stampLegalPersonInfo':'',
                    'threeLicenseInfo':'',
                    'baseAcceptGroup':'',
                    'baseOrgId':'',
                    'productCode':'',
                    'productName':'',
                    'isSendFinance':'0',
                    'acntName':'',
                    'acntShortName':'',
                    'baseOperator':this.$app.session.data.user.userName,
                    'accNo':'',
                    'market':'',
                    'accNoMarket':'',
                    'region':'',
                    'currency':'',
                    'fundAccName':'',
                    'acntPurpose':'',
                    'rateId':'',
                    'rateCode':'',
                    'bigPayNo':'',
                    'openBank':'',
                    'fundAccNo':'',
                    'isOpenEbank':'',
                    'acntStartDt':'',
                    'isOpenBankCorDirect':'',
                    'maturityDt':'',
                    'bankLinkMan':[],
                    'acntStatus':'',
                    'openManPhone':'',
                    'remark':'',
                    'other':'',
                    'futuresCompany':'',
                    'cardCorporateAcntId':'',
                    'provisionBankAcntIds':[],
                    'fields':[],
                    'crtUser':'',
                    'updateUser':''
                };

                if(this.mode=='registration'){
                    this.detailForm.bizType='04'
                }else{
                    this.detailForm.bizType='01'
                }
                Object.assign(this.detailForm, this.row);
                if(this.detailForm.bizType=='02'){
                    this.showChange = true;
                }

                this.loadShowRule();
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

    .acnt-apply-insert-form {
        padding: 0;
    }

    .acnt-apply-insert-form .line.wrap {
        flex-wrap: wrap;
    }

    .acnt-apply-insert-form .line.wrap>div {
        flex: none;
        width: 50%;
    }
     .el-icon-refresh-left {
         color: #476DBE;
         margin-left:10px;
         vertical-align: middle;
         font-size: 16px;
         font-weight: bold;
         cursor: pointer;
     }

    .module-card {
        box-shadow: none;
    }


</style>
