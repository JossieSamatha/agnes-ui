<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="值班类型" prop="rosterType">
                <gf-dict-select dict-type="AGNES_ROSTER_TYPE" v-model="form.rosterType"/>
            </el-form-item>
            <el-form-item label="值班日期" prop="rosterDate">
                <el-date-picker
                        v-model="form.rosterDate"
                        align="left"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!--            <el-form-item label="值班时间" prop="rosterTs">-->
            <!--                <el-time-picker-->
            <!--                        is-range-->
            <!--                        v-model="form.rosterTs"-->
            <!--                        range-separator="至"-->
            <!--                        start-placeholder="开始时间"-->
            <!--                        end-placeholder="结束时间"-->
            <!--                        placeholder="选择时间范围"-->
            <!--                        format="HH:mm"-->
            <!--                        value-format="HH:mm">-->
            <!--                </el-time-picker>-->
            <!--            </el-form-item>-->
            <el-form-item label="值班人员" prop="memberRefList">
                <gf-person-chosen ref="memberRef"
                                  :disabled="mode !== 'add'"
                                  :memberRefList="form.memberRefList"
                                  chosenType="user"
                                  @getMemberList="getMemberList"
                >
                </gf-person-chosen>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    rosterType: "",
                    rosterDate: "",
                    rosterTs: "",
                    memberRefList: []
                },
                rosterId: "",
                rules: {
                    'memberRefList': [{required: true, message: "请选择员工姓名"}],
                    'rosterType': [{required: true, message: "请选择值班类型"}],
                    // 'rosterTs': [{required: true, message: "请选择值班时间"}],
                    'rosterDate': [{required: true, message: "请选择值班日期"}],
                    'memberRef': [{required: true, message: "请选择值班人员", trigger: ['blur', 'change']}],
                },
            };
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            row: Object,
            actionOk: Function
        },

        mounted() {
            this.transferTime()
        },

        methods: {
            async loadUserInfos() {
                const p = this.$api.userGroupApi.getUserInfos({'userGroupId': this.form.userGroupId});
                const resp = await this.$app.blockingApp(p);
                if (resp.data) {
                    let userInfoList = resp.data;
                    const chosenData = userInfoList.map(item => {
                        return {
                            'refType': '1',
                            'memberId': item.userId,
                            'memberDesc': item.userName
                        }
                    });
                    // 初始赋值，调用initChosenData方法传入
                    this.$refs.memberRef.initChosenData(chosenData);
                }
            },
            // 人员选择数组变化回调事件，返回参数为最新选择人员数组
            getMemberList(newChosenData) {
                this.form.memberRefList = newChosenData;
                this.form.userIds = newChosenData.map(item => {
                    return item.memberId
                });
            },
            transferTime() {
                Object.assign(this.form, this.row);
                const chosenData = [];
                //let that = this;
                if (this.mode !== 'add') {
                    chosenData.push({
                        'refType': '1',
                        'memberId': this.row.userId,
                        'memberDesc': this.row.userName
                    })
                    // 初始赋值，调用initChosenData方法传入
                    this.$refs.memberRef.initChosenData(chosenData);
                }
                // if (this.form.rosterId!=null){
                //     const resp = await this.$api.rosterApi.getUserList(this.form.rosterId);
                //     if(resp.data){
                //         let userInfoList = resp.data;
                //         const chosenData = userInfoList.map(item=>{
                //             return {
                //                 'refType': '1',
                //                 'memberId': item.userId,
                //                 'memberDesc': item.userName,
                //             }
                //         });
                //         // 初始赋值，调用initChosenData方法传入
                //         this.$refs.memberRef.initChosenData(chosenData);
                //     }
                //
                // }


            },

            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.rosterApi.saveRoster(this.form);
                    const req = await this.$app.blockingApp(p);
                    if (req.data != null) {
                        this.$msg.warning(req.data);
                        return;
                    }
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>
