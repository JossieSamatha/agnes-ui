<template>
    <div>
        <el-form class="fit-box" ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"
                 style="padding: 10px;">
            <el-form-item label="账户名称"  prop="acntName">
                <gf-input v-model.trim="form.acntName" placeholder="账户名称" :disabled="true"/>
            </el-form-item>

            <el-form-item label="账户状态"  prop="acntStatus">
<!--                <gf-dict filterable clearable v-model="queryArgs.acntStatus" dict-type="AGNES_ACNT_INFO_STATUS"/>-->

                <el-select v-model="form.acntStatus" placeholder="">
                    <el-option
                            v-for="item in acntStatusOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

            </el-form-item>


        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            ui: String,
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                form: {
                    acntId: '',
                    acntName: '',
                    acntStatus: ''
                },
                acntStatusOption: [{value: '01', label: '正常'}, {value: '03', label: '锁定'}, {value: '04', label: '久悬户'}],
                rules: {
                    'acntStatus': [{required: true, message: "请选择账户状态"}]
                }
            }
        },

        beforeMount() {
            Object.assign(this.form, this.row);

        },

        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let p = this.$api.acntInfoApi.updateAcntStatus(this.form);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            },
            watch: {}
        }
    }
</script>
