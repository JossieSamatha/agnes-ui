<template>
    <div>
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">

            <el-form-item label="提醒日期" prop="memo.memoDt">
                <gf-date-picker v-model="form.memo.memoDt"
                    type="date"
                    value-format="yyyy-MM-dd">
                </gf-date-picker>
            </el-form-item>

            <el-form-item label="记录事项" prop="memo.memoDesc">
                <gf-input v-model="form.memo.memoDesc" type="textarea" :max-byte-len="512"></gf-input>
            </el-form-item>

            <el-form-item label="通知人员">
              <gf-person-chosen ref="memberRef"
                                :memberRefList="form.memoMemberRefList"
                                chosenType="user, group, roster"
                                :rosterDate="rosterDate"
                                @getMemberList="getMemberList">
              </gf-person-chosen>
            </el-form-item>
        </el-form>
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
                form: {
                    memo: {
                        memoId: '',
                        memoDt: '',
                        memoDesc: '',
                        memoStatus: '0',
                    },
                    memoMemberRefList:[]
                },
                activeName: 'userTab',
                rules: {
                    'memo.memoDt': [
                        {  required: true, message: '请选择提醒日期', trigger: 'change' }
                    ],
                    'memo.memoDesc': [
                        { required: true, message: '请填写记录事项', trigger: 'blur' }
                    ]
                },
                rosterDate: ''
            }
        },

        beforeMount() {
            this.rosterDate = window.bizDate;

            Object.assign(this.form.memo, this.row);

            if (this.form.memo.memoId) {
                const p = this.fetchMemberRefList();
                this.$app.blockingApp(p);
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
            handleClose(tag) { //标签的删除事件
                // 去掉当前删除的tag 根据类型和id唯一确定一个关联
                let yourChoseTags = this.form.memoMemberRefList
                this.form.memoMemberRefList = yourChoseTags.filter(item => {
                    if (!((tag.memberId === item.memberId )&&(tag.refType === item.refType))) {
                        return true;
                    }
                })
            },
            pushMember(memoUserRefId,memoId,memberId,refType,memberDesc){
                let hasMember = false;
                this.form.memoMemberRefList.forEach(function (rowInfo) {
                    if(rowInfo.memberId === memberId && rowInfo.refType === refType){
                        hasMember = true;
                    }
                });
                if(!hasMember){
                    this.form.memoMemberRefList.push({
                        memoUserRefId:memoUserRefId,
                        memoId:memoId,
                        memberId:memberId,
                        refType:refType,
                        memberDesc:memberDesc
                    });
                }
            },
            choseUser(params){
                let memberId = params.data.userId;
                let refType = '1';
                let memberDesc = params.data.userName;
                this.pushMember('','',memberId,refType,memberDesc);
            },
            choseUserGroup(params){
                let memberId = params.data.userGroupId;
                let refType = '2';
                let memberDesc = "群组-"+params.data.userGroupName;
                this.pushMember('','',memberId,refType,memberDesc);
            },
            choseRoster(params){
                let memberId = params.data.rosterId;
                let refType = '3';
                let memberDesc = "排班-"+params.data.rosterDate+" "+params.data.rosterTs+" "+params.data.userName;
                this.pushMember('','',memberId,refType,memberDesc);
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                //消息对象必填项校验
                if(this.form.memoMemberRefList.length == 0){
                    this.$msg.error("请选择参与人员");
                    return;
                }

                try {
                    const p = this.$api.memoApi.saveMemo(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            getMemberList(val){
                this.form.memoMemberRefList = val;
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
</style>
