<template>
    <div>
        <el-form :model="memoForm" :disabled="mode==='view'" ref="memoForm" :rules="memoFormRules" label-width="105px"
                 style="padding: 10px;">
            <el-form-item label="记录事项" prop="memoDesc">
                <gf-input v-model="memoForm.memoDesc" type="textarea" :max-byte-len="512"></gf-input>
            </el-form-item>
            <el-form-item label="创建方式选择" prop="createType" required>
                <el-radio-group class="alter-radio-btn" v-model="memoForm.createType" size="small"
                                @change="clearMemoRules(['memoDate', 'memoStartDate', 'memoEndDate','memoCron'])">
                    <el-radio label="01">按照指定日期</el-radio>
                    <el-radio label="02">按照自定义频率</el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-if="memoForm.createType === '01'">
                <el-form-item label="指定日期方式" required>
                    <el-radio-group class="alter-radio-btn" v-model="dateType" size="small"
                                    @change="clearMemoRules(['memoDate', 'memoStartDate', 'memoEndDate'])">
                        <el-radio label="01">提醒日期</el-radio>
                        <el-radio label="02">创建周期</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="提醒日期" prop="memoDate" v-if="dateType === '01'">
                    <gf-date-picker v-model="memoForm.memoDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="指定日期"
                                    style="width: 223px"
                    >
                    </gf-date-picker>
                </el-form-item>
                <el-form-item label="创建周期" v-else>
                    <div class="line">
                        <el-form-item prop="memoStartDate">
                            <gf-date-picker v-model="memoForm.memoStartDate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="开始日期"
                            ></gf-date-picker>
                        </el-form-item>
                        <span style="margin: 0 15px">至</span>
                        <el-form-item prop="memoEndDate">
                            <gf-date-picker v-model="memoForm.memoEndDate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="结束日期"
                            ></gf-date-picker>
                        </el-form-item>
                    </div>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="创建频率配置" prop="memoCron">
                    <el-button type="text" @click="editExecTime(memoForm.memoCron)">
                        {{memoForm.memoCron}}点击配置
                    </el-button>
                </el-form-item>
            </template>
            <el-form-item label="日历类型" prop="memoType" required>
                <el-radio-group class="alter-radio-btn" v-model="memoForm.memoType" size="small"
                                @change="clearMemoRules('memberRefList')">
                    <el-radio label="01">我的日历</el-radio>
                    <el-radio label="02">部门日历</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="通知人员" prop="memberRefList" v-if="memoForm.memoType === '01'">
              <gf-person-chosen ref="memberRef"
                                :memberRefList="memoForm.memberRefList"
                                chosenType="user, group, roster"
                                :rosterDate="rosterDate"
                                @getMemberList="getMemberList"
                                :disabled="mode==='view'">
              </gf-person-chosen>
            </el-form-item>
        </el-form>
        <span class="note">注：值班类型多选与值班人员多选一致，会按照顺序进行对应批量生产排班，可以选择时调整顺序。</span>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="save"></dialog-footer>
    </div>
</template>

<script>
    export default {
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
                dateType: '01',
                memoForm: {
                  memoDesc: '',
                  createType: '01',
                  memoType: '01',
                  memoDate: '',
                  memoStartDate: '',
                  memoEndDate: '',
                  memoCron: '',
                  memoNoticeUsermemoNoticeUser: '',
                  memberRefList: []
                },
                rosterDate: '',
                memoFormRules: {
                    memoDesc: [{ required: true, message: '请补充记录事项', trigger: 'blur' }],
                    memoDate: [{ required: true, message: '请补充提请日期', trigger: 'change' }],
                    memoStartDate: [{ required: true, message: '请补充开始日期', trigger: 'change' }],
                    memoEndDate: [{ required: true, message: '请补充结束日期', trigger: 'change' }],
                    memoCron: [{ required: true, message: '请补充创建频率', trigger: 'change' }],
                    memberRefList: [{ type: 'array', required: true, message: '请补充通知人员', trigger: 'change' }]
                }
            }
        },

        beforeMount() {
            this.rosterDate = window.bizDate;

            if(!(this.mode === 'add')){
                this.$lodash.assign(this.memoForm, this.row);
                if(this.row.memoStartDate){
                    this.dateType = '02'
                }
                this.memoForm.memberRefList = JSON.parse(this.row.memoNoticeUser);
            }
        },
        methods: {
            async fetchMemberRefList() {
                try {
                    const resp = await this.$api.memoApi.getMemoMemberRefList(this.form.memo.memoId);
                    this.$refs.memberRef.initChosenData(resp.data);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            clearMemoRules(fields){
                this.$refs.memoForm.clearValidate(fields);
            },

            async save() {
                const ok = await this.$refs.memoForm.validate();
                if (!ok) {
                    return;
                }
                try {
                    const memoFormCopy = this.$lodash.cloneDeep(this.memoForm);
                    if(memoFormCopy.createType === '01'){
                        memoFormCopy.memoCron = '';
                    } else if(memoFormCopy.dateType === '01'){
                        this.memoForm.memoStartDate = '';
                        this.memoForm.memoEndDate = '';
                    }else{
                        this.memoForm.memoDate = '';
                    }
                    if(memoFormCopy.memoType === '01'){
                        this.memoForm.memoNoticeUser = '';
                        this.memoForm.memberRefList = [];
                    }
                    memoFormCopy.memoNoticeUser = JSON.stringify(memoFormCopy.memberRefList);
                    const p = this.$api.memoApi.saveMemoDef(memoFormCopy);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            getMemberList(val){
                this.memoForm.memberRefList = val;
            },

            editExecTime(data) {
                if (this.mode === 'view') {
                    return;
                }
                const _that = this;
                this.$nav.showDialog(
                    'gf-cron-modal',
                    {
                        args: {
                            showType: 'day,month',
                            cornObj: data,
                            action: (cronData)=>{
                                _that.memoForm.memoCron = cronData;
                            }
                        },
                        width: '530px',
                        title: this.$dialog.formatTitle('创建频率配置', "edit"),
                    }
                );
            },
        }
    }
</script>

<style scoped>
    .el-tag{
        margin-left: 10px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
        margin-top: 10px;
    }

    .note {
        color: #999;
        text-indent: 2em;
    }
</style>
