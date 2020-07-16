<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form.dopReLinkMan" ref="form" :rules="rules"
                 label-width="85px"
                 style="padding: 10px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="linkmanName">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="职位" prop="linkmanRoleId">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanRoleId"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="状态" prop="linkmanStatus">
                        <gf-dict-select dict-type="DOP_LINKMAN_STATUS" v-model="form.dopReLinkMan.linkmanStatus"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话" prop="linkmanPhone">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanPhone"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="linkmanMail">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanMail"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="传真" prop="linkmanFax">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanFax"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="钉钉号" prop="linkmanDing">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanDing"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="微信号" prop="linkmanWechat">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanWechat"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮编" prop="linkmanPost">
                        <gf-input type="text" v-model="form.dopReLinkMan.linkmanPost"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="linkmanAddr">
                        <gf-input type="textarea" v-model="form.dopReLinkMan.linkmanAddr" :max-byte-len="256"
                                  resize="none"
                                  :autosize="{minRows: 2, maxRows: 6}"/>
                    </el-form-item>
                </el-col>
            </el-row>

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
                    dopReLinkMan: {
                        linkmanName: '',
                        extOrgId: '',
                        linkmanStatus: '',
                        linkmanRoleId: '',
                        linkmanPhone: '',
                        linkmanFax: '',
                        linkmanMail: '',
                        linkmanWechat: '',
                        linkmanDing: '',
                        linkmanAddr: '',
                        linkmanPost: '',
                    },
                },
                rules: {
                    'linkmanName': [{required: true, message: "请输入联系人姓名", trigger: 'blur'}],
                    'linkmanStatus': [{required: true, message: "请选择联系人状态", trigger: 'blur'}],
                    'linkmanMail':[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
                },
            }
        },
        beforeMount() {
            Object.assign(this.form.dopReLinkMan, this.row);
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.linkManApi.saveLinkMan(this.form);
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