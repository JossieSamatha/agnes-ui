<template>
    <div>

        <module-card :title="this.detailTitlePrefix+'基础信息'" shadow="never">
        <template slot="content">
          <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="isDisabled"
                   :rules="detailFormRules" label-width="160px">
            <div class="line" >

              <el-form-item  label="账户类型" prop="typeCode">
                <el-select :disabled="isSubDis || this.detailForm.bizType==='03'" class="multiple-select" v-model="detailForm.typeCode"
                           filterable clearable
                           placeholder="请选择"
                           @change="loadShowRule">
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
              <el-form-item  label="业务类型" prop="bizType">
                <gf-dict disabled filterable clearable v-model="detailForm.bizType" dict-type="AGNES_ACNT_BIZ_TYPE" />
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="业务发起部门" prop="baseStartDept">
                <gf-dict :disabled="isSubDis" filterable clearable v-model="detailForm.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />
              </el-form-item>
              <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="业务描述" prop="baseDesc">
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
              </el-form-item>
              <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <gf-dict :disabled="isSubDis" filterable clearable v-model="detailForm.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select :disabled="isSubDis" class="multiple-select" v-model="detailForm.baseAcceptGroup"
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
                <el-select :disabled="isSubDis || this.detailForm.bizType==='03'" class="multiple-select" v-model="detailForm.baseOrgId"
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
                <gf-input :disabled="isSubDis" v-model.trim="detailForm.baseOperator" placeholder="经办人"/>
              </el-form-item>
              <el-form-item label="基金代码" prop="productCode">
                <div class="line">
                  <el-select :disabled="isSubDis || this.detailForm.bizType==='03'" class="multiple-select" v-model="detailForm.productCode"
                             filterable clearable
                             placeholder="请选择">
                    <gf-filter-option
                        v-for="item in productList"
                        :key="item.productCode"
                        :label="`${item.productCode} - ${item.productName}`"
                        :value="item.productCode">
                    </gf-filter-option>
                  </el-select>

                  <el-button style="border: none;padding-left: 5px;font-size: 17px;vertical-align: middle" icon="el-icon-edit-outline" @click="addProduct"/>
                </div>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="基金名称" prop="productName">
                <gf-input type='textarea' disabled v-model.trim="detailForm.productName" placeholder="基金名称"/>
              </el-form-item>

              <el-form-item label="申请截止日期" prop="applyDeadlineDt">
                <el-date-picker
                    v-model="detailForm.applyDeadlineDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="申请日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="提交OA流程" prop="isSendOa">
                <el-radio-group v-model="detailForm.isSendOa" :disabled="this.mode === 'addInfo'">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group :disabled="isSubDis || isSendFinanceDis" v-model="detailForm.isSendFinance">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item label="账户状态" prop="acntStatus" v-if="this.detailForm.bizType === '02'" width="100%">
                <el-select v-model="detailForm.acntStatus" placeholder="">
                  <el-option
                      v-for="item in acntStatusOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item>

            </div>
            <div v-if="detailForm.isSendOa==='1'" class="line">
              <el-form-item label="标题" prop="oaTitle">
                <gf-input v-model.trim="detailForm.oaTitle" placeholder="标题"/>
              </el-form-item>
              <el-form-item label="申请部门" prop="oaDept">
                <gf-input v-model.trim="detailForm.oaDept" placeholder="申请部门"/>
              </el-form-item>
            </div>
            <div v-if="detailForm.isSendOa==='1'" class="line">
              <el-form-item label="申请人" prop="oaOperator">
                <gf-input disabled v-model.trim="detailForm.oaOperator" placeholder="申请人"/>
              </el-form-item>
              <el-form-item label="申请事由" prop="oaRemark">
                <gf-input type='textarea' v-model.trim="detailForm.oaRemark" placeholder="申请事由"/>
              </el-form-item>
            </div>
            <div v-if="detailForm.isSendOa==='1'" class="line">
              <el-form-item label="是否需要合规法务审核" prop="oaIsNeedAudit">
                <el-radio-group v-model="detailForm.oaIsNeedAudit">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div v-if="detailForm.isSendOa==='1'" class="line">
              <el-form-item label="是否需要加盖法人章" prop="oaIsNeedStamp">
                <el-radio-group v-model="detailForm.oaIsNeedStamp">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用印日期" prop="oaPrintDt">
                <el-date-picker
                    v-model="detailForm.oaPrintDt"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="用印日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div v-if="detailForm.isSendOa==='1'" class="line">
              <el-form-item v-if="detailForm.isSendOa==='1'" label="用印文件" prop="fileTable">
                <div class="rule-table">
                  <acc-ecm-upload style="width: 100%;"
                                  :disabled="this.mode !== 'add' && this.mode !=='addChange' && this.mode !=='edit' && this.mode !=='addInfo' && this.mode !=='deteleApply'"
                                  :showRemove="this.mode === 'add' || this.mode ==='addChange' || this.mode ==='edit' || this.mode ==='addInfo'|| this.mode ==='deteleApply'"
                                  :src-doc-id="srcDocId" :file-list="detailForm.fileList">
                  </acc-ecm-upload>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </module-card>

        <el-form v-if="showChange" ref="taskDefFormBefore" class="acnt-apply-insert-form" :model="detailFormBefore" :disabled="true"
                 :rules="detailFormRules" label-width="180px">
            <module-card :title="this.beforeTitlePrefix+'基础信息'" shadow="never">
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

                        <el-form-item label="基金名称" prop="productName">
                            <gf-input type='textarea' :disabled="true"  v-model.trim="detailFormBefore.productName" placeholder="基金名称"/>
                        </el-form-item>
                    </div>

                </template>
            </module-card>

            <module-card :title="this.beforeTitlePrefix+'账户信息'" shadow="never">
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
                            <gf-input type='textarea' v-model.trim="detailFormBefore.acntName" placeholder="账户名称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.acntShortName&&showRules.acntShortName.isShow" label="账户简称" prop="acntShortName">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.acntShortName" placeholder="账户简称"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.fundAccName&&showRules.fundAccName.isShow" label="资金账户名称" prop="fundAccName">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.fundAccName" placeholder="资金账户名称"/>
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
                            <gf-input type='textarea' v-model.trim="detailFormBefore.stampInfo" placeholder="预留印鉴信息"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.threeLicenseInfo" placeholder="三证合一变更情况"/>
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
                            <gf-input type='textarea' v-model.trim="detailFormBefore.acntPurpose" placeholder="账户用途描述"/>
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
                                        :label="item.acntLabel"
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
                                        :label="item.acntLabel"
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
                            <gf-input type='textarea' v-model.trim="detailFormBefore.futuresCompany" placeholder="期货公司"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.limits&&showRules.limits.isShow" label="额度" prop="limits">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.limits" placeholder="额度"/>
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
                            <gf-input type='textarea' v-model.trim="detailFormBefore.other" placeholder="其他"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                            <gf-input type='textarea' v-model.trim="detailFormBefore.remark" placeholder="备注"/>
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

        <!--        <module-card v-if="showChange" :title="showChange ? '变更前-基础信息': '基础信息'" shadow="never">-->
<!--            <template slot="content">-->
<!--                <el-form ref="taskDefFormBefore" class="task-def-form" :model="detailFormBefore" disabled-->
<!--                         :rules="detailFormRules" label-width="160px">-->
<!--                    <div class="line">-->
<!--                        <el-form-item  label="账户类型" prop="typeCode">-->
<!--                            <el-select :disabled="isSubDis" class="multiple-select" v-model="detailFormBefore.typeCode"-->
<!--                                       filterable clearable-->
<!--                                       placeholder="请选择">-->
<!--                                <el-option-group-->
<!--                                        v-for="group in bizTagOption"-->
<!--                                        :key="group.label"-->
<!--                                        :label="group.label">-->
<!--                                    <el-option-->
<!--                                            v-for="item in group.options"-->
<!--                                            :key="item.typeCode"-->
<!--                                            :label="`${group.label} - ${item.typeName}`"-->
<!--                                            :value="item.typeCode">-->
<!--                                    </el-option>-->
<!--                                </el-option-group>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item></el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="业务发起部门" prop="baseStartDept">-->
<!--                            <gf-dict :disabled="isSubDis" filterable clearable v-model="detailFormBefore.baseStartDept" dict-type="AGNES_ROSTER_DEPT" />-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">-->
<!--                            <gf-input :disabled="isSubDis" v-model.trim="detailFormBefore.baseStartDeptLinkman" placeholder="业务发起部门联系人"/>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="业务描述" prop="baseDesc">-->
<!--                            <gf-input :disabled="isSubDis" v-model.trim="detailFormBefore.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="业务受理部门" prop="baseAcceptDept">-->
<!--                            <gf-dict :disabled="isSubDis" filterable clearable v-model="detailFormBefore.baseAcceptDept" dict-type="AGNES_ROSTER_DEPT" />-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="业务受理组" prop="baseAcceptGroup">-->
<!--                            <el-select :disabled="isSubDis" class="multiple-select" v-model="detailFormBefore.baseAcceptGroup"-->
<!--                                       filterable clearable-->
<!--                                       placeholder="请选择">-->
<!--                                <gf-filter-option-->
<!--                                        v-for="item in groupOption"-->
<!--                                        :key="item.userGroupId"-->
<!--                                        :label="item.userGroupName"-->
<!--                                        :value="item.userGroupId">-->
<!--                                </gf-filter-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="归属机构" prop="baseOrgId">-->
<!--                            <el-select :disabled="isSubDis" class="multiple-select" v-model="detailFormBefore.baseOrgId"-->
<!--                                       filterable clearable-->
<!--                                       placeholder="请选择">-->
<!--                                <gf-filter-option-->
<!--                                        v-for="item in OrgList"-->
<!--                                        :key="item.extOrgId"-->
<!--                                        :label="`${item.extOrgCode} - ${item.extOrgName} - ${item.orgTypeName}`"-->
<!--                                        :value="item.extOrgId">-->
<!--                                </gf-filter-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="经办人" prop="baseOperator">-->
<!--                            <gf-input :disabled="isSubDis" v-model.trim="detailFormBefore.baseOperator" placeholder="经办人"/>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="基金代码" prop="productCode">-->
<!--                            <el-select :disabled="isSubDis" class="multiple-select" v-model="detailFormBefore.productCode"-->
<!--                                       filterable clearable-->
<!--                                       placeholder="请选择">-->
<!--                                <gf-filter-option-->
<!--                                        v-for="item in productList"-->
<!--                                        :key="item.productCode"-->
<!--                                        :label="`${item.productCode} - ${item.productName}`"-->
<!--                                        :value="item.productCode">-->
<!--                                </gf-filter-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="基金名称" prop="productName">-->
<!--                            <gf-input disabled v-model.trim="detailFormBefore.productName" placeholder="基金名称"/>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="提交财务流程" prop="isSendFinance">-->
<!--                            <el-radio-group :disabled="isSubDis" v-model="detailFormBefore.isSendFinance">-->
<!--                                <el-radio label="1">是</el-radio>-->
<!--                                <el-radio label="0">否</el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div class="line">-->
<!--                      <el-form-item label="提交OA流程" prop="isSendOa">-->
<!--                        <el-radio-group v-model="detailFormBefore.isSendOa">-->
<!--                          <el-radio label="1">是</el-radio>-->
<!--                          <el-radio label="0">否</el-radio>-->
<!--                        </el-radio-group>-->
<!--                      </el-form-item>-->
<!--                      <el-form-item label="账户状态" prop="acntStatus" v-if="this.detailForm.bizType === '02'">-->
<!--                        <el-select v-model="detailFormBefore.acntStatus" placeholder="">-->
<!--                          <el-option-->
<!--                              v-for="item in acntStatusOption"-->
<!--                              :key="item.value"-->
<!--                              :label="item.label"-->
<!--                              :value="item.value">-->
<!--                          </el-option>-->
<!--                        </el-select>-->
<!--                      </el-form-item>-->
<!--                    </div>-->
<!--                    <div v-if="detailFormBefore.isSendOa==='1'" class="line">-->
<!--                        <el-form-item label="标题" prop="oaTitle">-->
<!--                            <gf-input v-model.trim="detailFormBefore.oaTitle" placeholder="标题"/>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="申请部门" prop="oaDept">-->
<!--                            <gf-input v-model.trim="detailFormBefore.oaDept" placeholder="申请部门"/>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div v-if="detailFormBefore.isSendOa==='1'" class="line">-->
<!--                        <el-form-item label="申请人" prop="oaOperator">-->
<!--                            <gf-input disabled v-model.trim="detailFormBefore.oaOperator" placeholder="申请人"/>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="申请事由" prop="oaRemark">-->
<!--                            <gf-input v-model.trim="detailFormBefore.oaRemark" placeholder="申请事由"/>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div v-if="detailFormBefore.isSendOa==='1'" class="line">-->
<!--                        <el-form-item label="是否需要合规法务审核" prop="oaIsNeedAudit">-->
<!--                            <el-radio-group v-model="detailFormBefore.oaIsNeedAudit">-->
<!--                                <el-radio label="1">是</el-radio>-->
<!--                                <el-radio label="0">否</el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div v-if="detailFormBefore.isSendOa==='1'" class="line">-->
<!--                        <el-form-item label="是否需要加盖法人章" prop="oaIsNeedStamp">-->
<!--                            <el-radio-group v-model="detailFormBefore.oaIsNeedStamp">-->
<!--                                <el-radio label="1">是</el-radio>-->
<!--                                <el-radio label="0">否</el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="用印日期" prop="oaPrintDt">-->
<!--                            <el-date-picker-->
<!--                                    v-model="detailFormBefore.oaPrintDt"-->
<!--                                    type="date"-->
<!--                                    value-format="yyyy-MM-dd"-->
<!--                                    placeholder="用印日期">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <el-form-item v-if="detailFormBefore.isSendOa==='1'" label="用印文件" prop="fileTable">-->
<!--                        <div class="rule-table">-->
<!--                            <el-table header-row-class-name="rule-header-row"-->
<!--                                      header-cell-class-name="rule-header-cell"-->
<!--                                      row-class-name="rule-row"-->
<!--                                      cell-class-name="rule-cell"-->
<!--                                      :data="detailFormBefore.fields"-->
<!--                                      border stripe-->
<!--                                      style="width: 100%">-->
<!--                                <el-table-column prop="fileName" label="用印文件名">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-input :style="!scope.row.fileName ? 'border:1px solid #f00':''" v-model="scope.row.fileName"></el-input>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                                <el-table-column prop="fileNumber" label="份数">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-input type="number" :style="!scope.row.fileNumber ? 'border:1px solid #f00':''" v-model="scope.row.fileNumber"></el-input>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                                <el-table-column prop="fileRemark" label="备注">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-input v-model="scope.row.fileRemark"></el-input>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                                <el-table-column  prop="option" label="操作" width="52" align="center">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
<!--                            </el-table>-->
<!--                            <el-button  @click="addRule()" class="rule-add-btn" size="small">新增</el-button>-->
<!--                        </div>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--            </template>-->
<!--        </module-card>-->

    </div>
</template>

<script>
    import loadsh from 'lodash';
    import AcntApplyInsert from "./acnt-apply-insert";
    import ProductDetail from "../../../../agnes-dop/pages/config/product-def/product-detail";

    export default {
        name: "apply-define",
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            isDisabled:Boolean,
            actionOk: Function
        },
        data() {
            return {
              rosterDate: '',
              memberRefList: [],
              serviceRes: [],
              staticData: {},
              isSubDis: false,
              isSendFinanceDis: false,
              acntStatusOption: [{value: '01', label: '正常'}, {value: '03', label: '锁定'}, {value: '04', label: '久悬户'}],
              // detailFormBefore: {
              //   typeCode: '',
              //   bizType: '01',
              //   baseStartDept: '',
              //   baseStartDeptLinkman: '',
              //   baseAcceptDept: '',
              //   baseAcceptGroup: '',
              //   baseOrgId: '',
              //   productCode: '',
              //   baseOperator: this.$app.session.data.user.userName,
              //   productName: '',
              //   isSendFinance: '0',
              //   isSendOa: '0',
              //   oaTitle: '用印申请流程',
              //   oaDept: '基金运营部',
              //   oaOperator: this.$app.session.data.user.userName,
              //   oaRemark: '业务描述',
              //   oaLeader: '',
              //   oaIsNeedAudit: '0',
              //   oaIsNeedStamp: '0',
              //   oaPrintDt: '',
              //   crtUser: '',
              //   updateUser: '',
              //   fields: [],
              //   acntStatus: '',
              // },
                detailForm: {
                  applyDeadlineDt: '9999-12-31',
                  typeCode: '',
                  bizType: '01',
                  baseStartDept: '00',
                  baseStartDeptLinkman: '',
                  baseAcceptDept: '00',
                  baseAcceptGroup: '',
                  baseOrgId: '',
                  productCode: '',
                  baseOperator: this.$app.session.data.user.userName,
                  productName: '',
                  isSendFinance: '0',
                  isSendOa: '0',
                  oaTitle: '用印申请流程',
                  oaDept: '基金运营部',
                  oaOperator: this.$app.session.data.user.userName,
                  // oaRemark: '业务描述',
                  oaRemark: '',
                  oaLeader: '',
                  oaIsNeedAudit: '0',
                  oaIsNeedStamp: '0',
                  oaPrintDt: '',
                  fields: [],
                  crtUser: '',
                  updateUser: '',
                  fileList: [],
                  acntStatus: '',
                  // fileList:[ { "name": "1.ecmtest - 副本.txt", "objectId": "0801000017711", "docId": "09014b11", "uid": 1603950217954, "status": "success", "pieceNum": "1", "remark": "11" },
                  //     { "name": "1.ecmtest.txt", "objectId": "0801000017721", "docId": "09014b11", "uid": 1603950217955, "status": "success", "pieceNum": "2", "remark": "22" } ]
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
                srcDocId:'',
                showEcmRemove:true,
                showChange:false,
                beforeTitlePrefix:'变更前-',
                detailTitlePrefix:'',
                mustFillField: ['fileName','fileNumber'],
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
                rateList:[],
                acntList:[],    //账户列表
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
            if(this.mode=='addChange'){
                this.detailForm.bizType='02';
                this.detailFormBefore.bizType='02';
            }else if(this.mode=='deteleApply'){
                this.detailForm.bizType='03'
            }else{
                this.detailForm.bizType='01'
            }
            Object.assign(this.detailForm, this.row);
            if(this.detailForm.bizType=='02'){
                this.showChange = true;
                this.beforeTitlePrefix = '变更前-';
                this.detailTitlePrefix = '待变更-';
            }else if(this.detailForm.bizType=='03'){
                this.showChange = true;
                this.beforeTitlePrefix = '销户前-';
                this.detailTitlePrefix = '待销户-';
            }

            if(this.mode === 'add' || this.mode === 'addChange' ||this.mode === 'deteleApply'){
                this.detailForm.oaTitle = '用印申请流程'
                if(this.detailForm.bizType=='01'){
                    this.detailForm.oaTitle = '用印申请流程-开户'
                }else if(this.detailForm.bizType=='02'){
                    this.detailForm.oaTitle = '用印申请流程-变更'
                }else if(this.detailForm.bizType=='03'){
                    this.detailForm.oaTitle = '用印申请流程-销户'
                }
            }

            this.setSubApplyOA();
            this.checkIsSub()
            this.getOptionData()
            // this.checkIsSub()
            this.loadShowRule()
        },
        methods: {
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

                    if(this.showChange){
                        let detailFormBefore = await this.$api.acntInfoApi.getAcntInfoByAcntId(this.detailForm.acntId);
                        this.detailFormBefore = detailFormBefore.data
                    }

                    //资料文件列表加载(主流程)
                    if(this.detailForm.applyId && !this.isSubDis){
                        let fileList = await this.$api.acntMaterialApi.getApplyMaterialList(this.detailForm.applyId,'0');
                        if(fileList.data != null){
                            this.detailForm.fileList = fileList.data;
                            if(this.detailForm.fileList[0] != null){
                                this.srcDocId = this.detailForm.fileList[0].docId;
                            }
                        }
                    }else if(this.detailForm.applySubId && this.isSubDis){
                        let fileList = await this.$api.acntMaterialApi.getApplySubMaterialList(this.detailForm.applySubId);
                        if(fileList.data != null){
                            this.detailForm.fileList = fileList.data;
                            if(this.detailForm.fileList[0] != null){
                                this.srcDocId = this.detailForm.fileList[0].docId;
                            }
                        }
                    }

                    this.loadProductName();
                    this.loadProductNameBeafore();
                } catch (reason) {
                    this.$msg.error(reason);
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
                            // detailFormRules[key] = [{ required: true, validator: this.arrValidate, trigger: 'change'}];
                            //20210104仅展示用无需校验
                            continue;
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

            setSubApplyOA(){
                if(this.mode=='addInfo'){
                    this.detailForm.isSendOa = "1";
                }
            },

            checkIsSub(){
                if(!loadsh.isEmpty(this.row.applySubId)||this.mode==='addInfo'){
                    this.isSubDis = true;
                }
            },
            // 新增服务行
            addRule(){
                const newFileTableObj = {
                    fileName: '',
                    fileNumber: '',
                    fileRemark: '',
                };
                this.detailForm.fields.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex){
                this.detailForm.fields.splice(rowIndex, 1);
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                // this.insertApply()
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                let validate = true;
                if(this.detailForm.fields&&this.detailForm.isSendOa==='1'){
                    for(let i =0;i<this.detailForm.fields.length;i++){
                        for (let key in this.detailForm.fields[i]) {
                            if(this.mustFillField.indexOf(key) !== -1 && loadsh.isEmpty(this.form.detailForm.fields[i][key])){
                                validate = false;
                            }
                        }
                    }
                    if(!validate){
                        this.$msg.warning("请补充完整必填项!");
                        return;
                    }
                }

                if(this.detailForm.isSendOa==='1'){
                    if(!this.detailForm.fileList || this.detailForm.fileList.length === 0){
                        this.$msg.warning("请上传文件!");
                        return;
                    }
                }

                try {
                  let form = JSON.parse(JSON.stringify(this.detailForm))
                  let openSub = false;
                    let isdel = false;
                    if(!loadsh.isEmpty(this.detailForm.applySubId)){
                        openSub = true;
                    }

                    //对于作废 这里不控制节点，作废按钮处已控制
                    if(this.mode=='detele'){
                        isdel = true;
                    }

                    form.processStatus = '02';
                    if(!loadsh.isEmpty(this.detailForm.processStatus)){
                        //状态机控制
                        if(this.detailForm.processStatus=='01'){
                            form.processStatus = '02';
                            if(this.mode=='detele'){
                                isdel = true;
                            }
                        }else if(this.detailForm.processStatus=='02'){
                            if(this.detailForm.isSendOa=='1'){
                              form.processStatus = '03';
                            }else {
                                if(this.detailForm.children){
                                    form.processStatus = '04';
                                }else{
                                    form.processStatus = '08';
                                }

                            }
                        }else if(this.detailForm.processStatus=='03'){
                            form.processStatus = '04';
                        }else if(this.detailForm.processStatus=='04'){
                            openSub = true;
                            form.processStatus = '02';
                          // if(this.detailForm.isSendFinance=='1'){
                          //     form.processStatus = '05';
                          // }else {
                            //     form.processStatus = '06';
                            // }
                        }else if(this.detailForm.processStatus=='05'){
                            //销户流程 财务审核后直接完成
                            if(this.detailForm.bizType === '03'){
                                form.processStatus = '08';
                            }else{
                                form.processStatus = '06';
                            }
                        }
                    }
                    if(isdel){
                        form.processStatus = '09';
                        if(openSub){
                            const p = this.$api.acntApplyApi.cancelSubApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('作废成功');
                        }else{
                            const p = this.$api.acntApplyApi.cancelApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('作废成功');
                        }

                    }else{
                        if(!loadsh.isEmpty(this.detailForm.processStatus) && this.detailForm.processStatus=='02'){
                            let opUser = form.updateUser;
                            if(this.$lodash.isEmpty(opUser)){
                                opUser = form.crtUser;
                            }

                            if(opUser === this.$app.session.data.user.userId){
                                this.$msg.warning('您无法对该岗进行操作！');
                                return ;
                            }
                        }

                        if(openSub){
                            const p = this.$api.acntApplyApi.saveSubApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }else{
                            const p = this.$api.acntApplyApi.saveApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }
                    }



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
                    if((this.detailForm.processStatus=='02' || this.detailForm.processStatus=='05') && this.mode!=='view'){
                        let openSub = false;
                        if(!loadsh.isEmpty(this.detailForm.applySubId)){
                            openSub = true;
                        }
                        let form =  JSON.parse(JSON.stringify(this.detailForm))
                        form.processStatus = '01';
                        if(openSub){
                            const p = this.$api.acntApplyApi.cancelSubApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }else{
                            if(this.detailForm.processStatus=='05'){
                                form.processStatus = '04';
                            }
                            const p = this.$api.acntApplyApi.cancelApply(form);
                            await this.$app.blockingApp(p);
                            this.$msg.success('提交成功');
                        }
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            showInsertDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户录入'],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view',
                    pageEl: this.$el
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            insertApply() {
                this.showInsertDlg('view', {}, this.onInsertApply.bind(this));
            },

            addProduct() {
                this.showProductDetailDrawer('add', {}, this.reloadProduct.bind(this));
            },
            async reloadProduct() {
                let productList = await this.$api.acntApplyApi.getProductCodeList();
                this.productList = productList.data
            },
            showProductDetailDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let isShow = true;
                row.isCheck = false;
                if (mode === 'check') {
                    mode = 'view';
                    row.isCheck = true;
                }
                if (!row.isCheck && mode === 'view') {
                    isShow = false;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['产品信息', mode],
                    component: ProductDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible: isShow,
                    okButtonTitle: row.isCheck ? "复核" : '提交',
                    cancelButtonTitle: '取消',
                    pageEl: this.$el
                });
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

    .el-form.task-def-form {
        width: 100%;
    }

    .module-card {
        box-shadow: none;
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
</style>
