<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules"
                 label-width="85px"
                 style="padding: 10px;">
            <el-row></el-row>
            <el-form-item label="群组名称" prop="userGroupName" style="width: 60%">
                <gf-input type="text" v-model="form.userGroupName"/>
            </el-form-item>
            <el-form-item label="群组联系人">
                <gf-person-chosen ref="memberRef"
                                  :memberRefList="memberRefList"
                                  chosenType="user"
                                  :rosterDate="this.rosterDate">
                </gf-person-chosen>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
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
                    'userGroupName':'',
                    'userGroupId':'',
                    'userIds':[],
                },
                memberRefList:[],
                rosterDate:'',
                rules: {
                    'userGroupName': [{required: true, message: "请输入群组名称", trigger: 'blur'}],
                },
            }
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.loadUserInfos();
        },
        methods: {
            async onSave() {
                const memberList = await this.getMemberList();
                memberList
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.userGroupApi.saveUserGroup(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk();
                    }

                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async loadUserInfos() {
                const p = this.$api.userGroupApi.getUserInfos({'userGroupId':this.form.userGroupId});
                const resp = await this.$app.blockingApp(p);
                if(resp.data){
                    // let userInfoList = resp.data;
                    // userInfoList.forEach(item=>{
                    //     this.memberRefList.push({
                    //         'refType': '1',
                    //         'memberId': item.userId,
                    //         'memberDesc': item.userName
                    //     })
                    // });
                    this.memberRefList = [{
                        'refType': '1',
                        'memberId': '01',
                        'memberDesc': '张三'
                    }]
                }
            },
            getMemberList(val){
                let memberList = this.$refs.memberRef.memberList;
                this.form.userIds=[];
                memberList.forEach(item=>{
                    this.form.userIds.push(item.memberId);
                });
                return memberList;
            },
        }
    }
</script>

<style scoped>

</style>