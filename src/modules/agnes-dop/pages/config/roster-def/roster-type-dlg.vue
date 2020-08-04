<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="部门" prop="deptId">
                <gf-dict-select dict-type="AGNES_ROSTER_DEPT" v-model="form.deptId"/>
            </el-form-item>
            <el-form-item label="排班类型" prop="rosterType">
                <gf-dict-select dict-type="AGNES_ROSTER_TYPE" v-model="form.rosterType"/>
            </el-form-item>
            <el-form-item label="排班日期" prop="rosterDate">
                <el-date-picker
                        v-model="form.rosterDate"
                        align="left"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="排班时间" prop="rosterTs">
                <el-time-picker
                        is-range
                        v-model="form.rosterTs"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        format="HH:mm"
                        value-format="HH:mm">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="姓名" prop="userId">
                <el-select v-model="form.userId" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位" prop="roleId">
                <gf-dict-select dict-type="AGNES_ROSTER_POST" v-model="form.roleId"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [],
                form: {
                    deptId: "",
                    rosterType: "",
                    rosterDate: "",
                    rosterTs: "",
                    userName: "",
                    roleId: "",
                    userId: "",
                },

                rules: {
                    'userId': [{required: true, message: "请选择员工姓名"}],
                    'deptId': [{required: true, message: "请选择部门"}],
                    'rosterType': [{required: true, message: "请选择排班类型"}],
                    'rosterTs': [{required: true, message: "请选择排班时间"}],
                    'rosterDate': [{required: true, message: "请选择排班日期"}],
                    'roleId': [{required: true, message: "请选择岗位"}],
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

        beforeMount() {
            this.transferTime()
            this.getOptions();
        },

        methods: {
            transferTime() {
                Object.assign(this.form, this.row);
                if (this.form.rosterTs && typeof (this.form.rosterTs) == 'string') {
                    this.form.rosterTs = this.form.rosterTs.split('-')
                }
            },

            async getOptions() {
                try {
                    const resp = await this.$api.rosterApi.getUserList();
                    let userList = resp.data.data;
                    userList.forEach(item => {
                        let option = {value: item.userId, label: item.userName};
                        this.options.push(option);
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },

            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {

                    if (this.form.rosterTs) {
                        this.form.rosterTs = this.form.rosterTs.join('-')
                    }
                    const p = this.$api.rosterApi.saveRoster(this.form);
                    await this.$app.blockingApp(p);
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

<style scoped>

</style>
