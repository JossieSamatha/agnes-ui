<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="160px">
        <div class="line">
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
                <el-select class="multiple-select" v-model="detailForm.bizType"
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
        </div>
        <div class="line">
            <el-form-item label="业务发起部门" prop="baseStartDept">
                <el-select class="multiple-select" v-model="detailForm.baseStartDept"
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
            <el-form-item label="业务发起部门联系人" prop="baseStartDeptLinkman">
                <el-select class="multiple-select" v-model="detailForm.baseStartDeptLinkman"
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
        </div>
        <div class="line">
            <el-form-item label="业务描述" prop="baseDesc">
                <gf-input v-model.trim="detailForm.baseDesc" type='textarea' placeholder="业务描述" :max-len="200"/>
            </el-form-item>
            <el-form-item label="业务受理部门" prop="baseAcceptDept">
                <el-select class="multiple-select" v-model="detailForm.baseAcceptDept"
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
        </div>
        <div class="line">
            <el-form-item label="业务受理组" prop="baseAcceptGroup">
                <el-select class="multiple-select" v-model="detailForm.baseAcceptGroup"
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
        </div>
        <div class="line">
            <el-form-item label="经办人" prop="baseOperator">
                <gf-input v-model.trim="detailForm.baseOperator" placeholder="经办人"/>
            </el-form-item>
            <el-form-item label="基金代码" prop="productCode">
                <el-select class="multiple-select" v-model="detailForm.productCode"
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
        </div>
        <div class="line">
            <el-form-item label="基金名称" prop="productName">
                <gf-input v-model.trim="detailForm.productName" placeholder="基金名称"/>
            </el-form-item>
            <el-form-item label="提交财务流程" prop="isSendFinance">
                <el-radio-group v-model="detailForm.isSendFinance">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div class="line">
            <el-form-item label="提交OA流程" prop="isSendOA">
                <el-radio-group v-model="detailForm.isSendOA">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOA==='1'" class="line">
            <el-form-item label="标题" prop="OATitle">
                <gf-input v-model.trim="detailForm.OATitle" placeholder="标题"/>
            </el-form-item>
            <el-form-item label="申请部门" prop="OADept">
                <gf-input v-model.trim="detailForm.OADept" placeholder="申请部门"/>    
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOA==='1'" class="line">
            <el-form-item label="申请人" prop="OAOperator">
                <gf-input v-model.trim="detailForm.OAOperator" placeholder="申请人"/>
            </el-form-item>
            <el-form-item label="申请事由" prop="OARemark">
                <gf-input v-model.trim="detailForm.OARemark" placeholder="申请事由"/>    
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOA==='1'" class="line">
            <el-form-item label="公司领导" prop="OALeader">
                <gf-input v-model.trim="detailForm.OALeader" placeholder="公司领导"/>
            </el-form-item>
            <el-form-item label="是否需要合规法务审核" prop="OAIsNeedAudit">
                <el-radio-group v-model="detailForm.OAIsNeedAudit">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="detailForm.isSendOA==='1'" class="line">
            <el-form-item label="是否需要加盖法人章" prop="OAIsNeedStamp">
                <el-radio-group v-model="detailForm.OAIsNeedStamp">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用印日期" prop="OAPrintDT">
                <el-date-picker
                        v-model="detailForm.OAPrintDT"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="用印日期">
                </el-date-picker>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
    // import loadsh from 'lodash';
    import AcntApplyInsert from "./acnt-apply-insert";
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
                    baseAcceptDept:'',
                    baseAcceptGroup:'', 
                    baseOrgId:'', 
                    productCode:'', 
                    productName:'',
                    isSendFinance:'0', 
                    isSendOA:'0', 
                    OATitle:'用印申请流程', 
                    OADept:'基金运营部', 
                    OAOperator:'',
                    OARemark:'业务描述', 
                    OALeader:'', 
                    OAIsNeedAudit:'0', 
                    OAIsNeedStamp:'0',
                    OAPrintDT:'',
                },
                dayChecked: '0',  // 跨日
                endTimeForDay:null,
                startTimeForDay:null,
                succeedRule: '0',
                abnormalRule: '0',
                repeatMinutes: '',
                maxRepeatCount: '',
                curExecScheduler: '',    // 当前频率对象字段
                msgInformParam: [],      // 消息通知参数类型数组
                startAllTime: '0',       // 是否永久有效
                bizTagOption: [],        // 业务类型下拉
                // 消息配置类型类型选项
                msgInformOp: [{label: '提前通知', value: '0'}, {label: '完成通知', value: '1'}, {label: '超时通知', value: '2'},
                    {label: '异常通知', value: '3'}],
                msgInfoStr: ['warningRemind', 'finishRemind', 'timeoutRemind', 'exceptionRemind'],
                // 规则选择类型选项
                ruleTypeOp: [{label: '默认完成规则', value: '0'}, {label: '自定义完成规则', value: '1'}],
                ruleErrorTypeOp: [{label: '默认异常规则', value: '0'}, {label: '自定义异常规则', value: '1'}],
                detailFormRules: {
                    typeCode: [
                        {required: true, message: '账户类型必填', trigger: 'blur'},
                    ],
                },
            }
        },
        beforeMount() {
   
        },
        methods: {
 
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                this.insertApply()
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
            showInsertDlg(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['账户录入',mode],
                    component: AcntApplyInsert,
                    args: {row, mode, actionOk},
                    okButtonVisible:mode!=='view'
                })
            },
            onInsertApply(){
                this.reloadData();
            },
            insertApply() {
                this.showInsertDlg('add', {}, this.onInsertApply.bind(this));
            },

        },

        watch: {
  
        }
    }
</script>
