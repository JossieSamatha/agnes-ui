<template>
    <div>
        <el-form  ref="taskDefFormBefore" class="acnt-apply-insert-form" :model="detailFormBefore" :disabled="true"
                 :rules="detailFormRules" label-width="180px">
            <module-card title="基础信息" shadow="never">
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
                            <gf-input type='textarea' :disabled="true"  v-model.trim="detailFormBefore.productName" placeholder="基金名称"/>
                        </el-form-item>

                        <el-form-item label="账户状态" prop="acntStatus" width="100%">
                            <gf-dict filterable clearable v-model="detailFormBefore.acntStatus" dict-type="AGNES_ACNT_INFO_STATUS" />
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
                            </el-table>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="showRules.fundAccNo&&showRules.fundAccNo.isShow" label="资金帐号">
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
                            <gf-input type='textarea' v-model="detailFormBefore.stampInfo" placeholder="预留印鉴信息"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.stampLegalPersonInfo&&showRules.stampLegalPersonInfo.isShow" label="印鉴法人变更情况" prop="stampLegalPersonInfo">
                            <gf-input type='textarea' v-model="detailFormBefore.stampLegalPersonInfo" placeholder="印鉴法人变更情况"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.threeLicenseInfo&&showRules.threeLicenseInfo.isShow" label="三证合一变更情况" prop="threeLicenseInfo">
                            <gf-input type='textarea' v-model="detailFormBefore.threeLicenseInfo" placeholder="三证合一变更情况"/>
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
                            <gf-input type='textarea' v-model="detailFormBefore.acntPurpose" placeholder="账户用途描述"/>
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
                            <gf-input type='textarea' v-model="detailFormBefore.futuresCompany" placeholder="期货公司"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.limits&&showRules.limits.isShow" label="额度" prop="limits">
                            <gf-input type='textarea' v-model="detailFormBefore.limits" placeholder="额度"/>
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
                            <gf-input type='textarea' v-model="detailFormBefore.other" placeholder="其他"/>
                        </el-form-item>

                        <el-form-item v-if="showRules.remark&&showRules.remark.isShow" label="备注" prop="remark">
                            <gf-input type='textarea' v-model="detailFormBefore.remark" placeholder="备注"/>
                        </el-form-item>
                    </div>
                    <el-form-item v-show="this.mode=='view'" label="附件上传" prop="fileTable">
                        <div class="rule-table">
                            <acc-ecm-upload style="width: 100%;"
                                            :disabled="true"
                                            :applyType="this.receipt"
                                            :showRemove="false"
                                            :src-doc-id="this.fjSrcId"
                                            :file-list="this.receiptFileList">
                            </acc-ecm-upload>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="this.mode=='view'" label="OA用印文件" prop="fileTable">
                        <div class="rule-table">
                            <acc-ecm-upload style="width: 100%;"
                                            :disabled="true"
                                            :showRemove="false"
                                            :src-doc-id="this.srcDocId" :file-list="this.fileList">
                            </acc-ecm-upload>
                        </div>
                    </el-form-item>

                </template>
            </module-card>
        </el-form>

    </div>

</template>

<script>
    import loadsh from 'lodash';
    // import BranchDetail from "../../../../agnes-dop/pages/config/branch/branch-detail";

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
                receiptFileList: [],
                fileList: [],
                fjSrcId:'',
                srcDocId:'',
                detailForm: {
                    applyId:'',
                    typeCode:'', 
                    bizType:'', 
                    baseStartDept:'00',
                    baseStartDeptLinkman:'', 
                    settlementNo:'',
                    baseAcceptDept:'00',
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
                    accNoMarket:'',
                    region:'',
                    currency:'',
                    fundAccName:'',
                    acntPurpose:'',
                    rateId:'',
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
                    typeCode:'', 
                    bizType:'', 
                    baseStartDept:'', 
                    baseStartDeptLinkman:'', 
                    settlementNo:'',
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
                    accNoMarket:'',
                    region:'',
                    currency:'',
                    fundAccName:'',
                    acntPurpose:'',
                    rateId:'',
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
            Object.assign(this.detailForm, this.row);

            const p = this.getOptionData();
            this.$app.blockingApp(p);

            const p2 = this.loadShowRule();
            this.$app.blockingApp(p2);
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

                    //账户详情界面无需加载 网点选项，直接显示即可
                    // let openBankList = await this.$api.branchApi.listByPayNo(this.detailForm.bigPayNo);
                    // this.openBankList = openBankList.data

                    //以下加载填写的数据
                    let detailFormBefore = await this.$api.acntInfoApi.getAcntInfoByAcntId(this.detailForm.acntId);
                    this.detailFormBefore = detailFormBefore.data

                    this.loadProductNameBeafore();

                    //资料文件列表加载
                    if(this.detailForm.acntId){
                        let fileList = await this.$api.acntMaterialApi.getAcntMaterialList(this.detailForm.acntId);
                        if(fileList.data != null){
                            for(let i=0;i<fileList.data.length;i++){
                                if(fileList.data[i].type === '1'){
                                    this.srcDocId = fileList.data[i].docId;
                                    this.fileList.push(fileList.data[i]);
                                }else if(fileList.data[i].type === '2'){
                                    this.fileList.push(fileList.data[i]);
                                }else {
                                    this.fjSrcId = fileList.data[i].docId;
                                    this.receiptFileList.push(fileList.data[i]);
                                }
                            }
                        }

                    }

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
                for(let key  in showRules){
                    let detailFormRulesOne = showRules[key];
                    detailFormRulesOne.message = '必填';
                    detailFormRulesOne.required = showRules[key].mustFill=='1';
                    detailFormRulesOne.trigger = 'blur';
                    this.detailFormRules[key] = [detailFormRulesOne]
                    if(key === 'accNo' && showRules[key].mustFill === '1'){
                        this.isAccNoMustFill = true;
                    }
                    if(key === 'fundAccNo' && showRules[key].mustFill === '1'){
                        this.isMoneyAccNoMustFill = true;
                    }
                    if(key === 'bankLinkMan' && showRules[key].mustFill === '1'){
                        this.isBankLinkManMustFill = true;
                    }
                    if(key === 'provisionBankAcntIds' && showRules[key].mustFill === '1'){
                        this.isProvisionBankAcntIdsMustFill = true;
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

            // async onBaseOrgIdChange(){
            //     let linkManList = await this.$api.acntApplyApi.getLinkMan(this.detailForm.baseOrgId);
            //     this.linkManList = linkManList.data;
            //     this.detailForm.bankLinkMan = [];
            // }

            async onCancel() {
                try {
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }

        },

        watch: {
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
         color: #0f5eff;
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
