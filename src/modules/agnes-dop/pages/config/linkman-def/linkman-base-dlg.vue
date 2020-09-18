<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form.dopReLinkman" ref="form" :rules="rules"
                 label-width="100px"
                 style="padding: 10px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="linkmanName">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanName" :max-byte-len="32"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属机构" prop="extOrgId">
                        <el-select v-model="form.dopReLinkman.extOrgId" placeholder="请选择" style="width: 100%"
                                   filterable>
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.extOrgName"
                                    :value="item.extOrgId"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门" prop="linkmanDept">
                        <gf-dict-select dict-type="AGNES_ROSTER_DEPT" v-model="form.dopReLinkman.linkmanDept"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="岗位" prop="linkmanRoleId">
                        <gf-dict-select dict-type="AGNES_ROSTER_POST" v-model="form.dopReLinkman.linkmanRoleId"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="办公电话" prop="linkmanPhone">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanPhone"
                                  clear-regex="[^0-9\-]" :max-byte-len="64"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="状态" prop="linkmanStatus">
                        <gf-dict-select dict-type="DOP_LINKMAN_STATUS" v-model="form.dopReLinkman.linkmanStatus"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="传真" prop="linkmanFax">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanFax"
                                  clear-regex="[^0-9\-]" :max-byte-len="32"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机" prop="linkmanMobile">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanMobile"
                                  :max-byte-len="128" input-lang="num"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号" prop="linkmanWechat">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanWechat" :max-byte-len="128"
                                  clear-regex="[^a-zA-Z\x00-\xff]"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮编" prop="linkmanPost">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanPost"
                                  input-lang="num" :max-byte-len="32"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="linkmanMail">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanMail" :max-byte-len="128"
                                  clear-regex="[^a-zA-Z\x00-\xff]"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="钉钉号" prop="linkmanDing">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanDing" :max-byte-len="128"
                                  clear-regex="[^a-z\d]"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="备注" prop="linkmanRemark">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanRemark" :max-byte-len="128"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="其他联系方式" prop="linkmanOther">
                        <gf-input type="text" v-model="form.dopReLinkman.linkmanOther" :max-byte-len="32"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="地址" prop="linkmanAddr">
                        <gf-input type="textarea" v-model="form.dopReLinkman.linkmanAddr" :max-byte-len="128"
                                  resize="none"
                                  :autosize="{minRows: 2, maxRows: 6}"/>
                    </el-form-item>
                </el-col>
            </el-row>

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
            row: Object,
            actionOk: Function
        },
        data() {
            const isTelOrFax = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^(0\d{2,3}-\d{7,8})(-\d{1,5})?$/;
                    const isTel = reg.test(value);
                    if (!isTel) {
                        callback(new Error("格式错误！"));
                    } else {
                        callback();
                    }
                }
            };
            const isPostCode = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^[0-9]{6}$/;
                    const isPost = reg.test(value);
                    if (!isPost) {
                        callback(new Error("邮编格式有误"));
                    } else {
                        callback();
                    }
                }
            };
            const isMail = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    const mail = reg.test(value);
                    if (!mail) {
                        callback(new Error("邮箱格式有误"));
                    } else {
                        callback();
                    }
                }
            };
            const isWeChat = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
                    const weChat = reg.test(value);
                    if (!weChat) {
                        callback(new Error("微信号格式有误"));
                    } else {
                        callback();
                    }
                }
            };
            const isDing = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^[a-z][a-z0-9]{5,19}$/;
                    const ding = reg.test(value);
                    if (!ding) {
                        callback(new Error("字母开头,6-20个数字或字母"));
                    } else {
                        callback();
                    }
                }
            };
            const isMobile = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^((\+|00)86)?((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/;
                    const mobile = reg.test(value);
                    if (!mobile) {
                        callback(new Error("手机号格式有误"));
                    } else {
                        callback();
                    }
                }
            };

            return {
                form: {
                    dopReLinkman: {
                        linkmanName: '',
                        extOrgId: '',
                        linkmanStatus: '',
                        linkmanRoleId: '',
                        linkmanDept: '',
                        linkmanMobile: '',
                        linkmanOther: '',
                        linkmanRemark: '',
                        linkmanPhone: '',
                        linkmanFax: '',
                        linkmanMail: '',
                        linkmanWechat: '',
                        linkmanDing: '',
                        linkmanAddr: '',
                        linkmanPost: '',
                    },
                },
                options: [],
                rules: {
                  'linkmanName': [{required: true, message: "请输入联系人姓名", trigger: 'blur'}],
                  'extOrgId': [{required: true, message: "请选择外部机构", trigger: ['blur', 'change']}],
                  'linkmanStatus': [{required: true, message: "请选择联系人状态", trigger: 'change'}],
                  'linkmanPhone': [{validator: isTelOrFax, trigger: ['blur', 'change']}],
                  'linkmanMail': [{validator: isMail, trigger: ['blur', 'change']}],
                  'linkmanFax': [{validator: isTelOrFax, trigger: ['blur', 'change']}],
                  'linkmanWechat': [{validator: isWeChat, trigger: ['blur', 'change']}],
                  'linkmanDing': [{validator: isDing, trigger: ['blur', 'change']}],
                  'linkmanPost': [{validator: isPostCode, trigger: ['blur', 'change']}],
                  'linkmanMobile': [{validator: isMobile, trigger: ['blur', 'change']}]
                },
            };
        },
        beforeMount() {
            Object.assign(this.form.dopReLinkman, this.row);
            this.loadExtOrg()
        },
        methods: {
            async loadExtOrg(){
                try {
                    this.$api.orgDefineApi.getOrgList().then(resp=>{
                        if(resp &&resp.data){
                            this.options = resp.data;
                        }
                    })
                }catch (e) {
                    this.$msg.error(e);
                }
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.linkmanApi.saveLinkMan(this.form);
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
