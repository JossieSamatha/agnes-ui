<template>
    <div>
        <el-form class="fit-box" :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="95px"
                 style="padding: 10px;">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="上级机构名称"  v-show="mode==='add'">
                        <gf-input type="text" v-model="form.label" :disabled="mode==='add'"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构名称"  prop="extOrgName">
                        <gf-input type="text" maxlength="64" v-model="form.extOrgName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构类别" prop="extOrgType">
                        <el-select v-model="form.extOrgType" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in orgTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构代码" prop="extOrgCode" >
                        <gf-input type="text" maxlength="32" v-model="form.extOrgCode"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构传真"  prop="extOrgFax">
                        <gf-input type="text" maxlength="32" v-model="form.extOrgFax"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构电话" prop="extOrgPhone">
                        <gf-input type="text" maxlength="32" v-model="form.extOrgPhone"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构地址"  >
                        <gf-input type="text" maxlength="128" v-model="form.extOrgAddr"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构邮编" prop="extOrgPost">
                        <gf-input type="text" maxlength="32" v-model="form.extOrgPost"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注"  >
                        <gf-input type="text" maxlength="32" v-model="form.extOrgRemark"/>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="确定" style="padding-bottom: 30px;"></dialog-footer>
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
            const isTelOrFax=(rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg =/^(0\d{2,3}-\d{7,8})(-\d{1,5})?$/;
                    const isTel = reg.test(value);
                    if (!isTel ) {
                        callback(new Error("格式错误！"));
                    } else {
                        callback();
                    }
                }
            };
            const isPostCode=(rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    var reg =/^[0-9]{6}$/;
                    const isPost = reg.test(value);
                    if (!isPost ) {
                        callback(new Error("邮编格式有误"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                orgTypeOptions:[],
                form: {
                    extOrgName:'',extOrgType:'',extOrgCode:'',extOrgPhone:'',extOrgFax:'',
                    extOrgAddr:'',extOrgPost:'',extOrgRemark:'',parentExtOrgId:'',label:'',id:'',mode:''
                },
                rules: {
                    'extOrgName': [{required: true, message: "请输入机构名称"}],
                    'extOrgType': [{required: true, message: "请选择机构类型"}],
                    'extOrgCode': [{required: true, message: "请输入机构代码"}],
                    'extOrgFax': [{ validator: isTelOrFax, trigger: ['blur', 'change'] }],
                    'extOrgPhone': [{ validator: isTelOrFax, trigger: ['blur', 'change'] }],
                    'extOrgPost': [{ validator: isPostCode, trigger: ['blur', 'change'] }],
                },
            }
        },

        beforeMount() {
            if(this.mode==='edit' || this.mode==='view') {
                Object.assign(this.form, this.row);
            }else {
                this.form.label=this.row.label;
            }
            this.getOrgTypeOptions();
        },
        methods: {
            async getOrgTypeOptions(){
                try {
                    const resp = await this.$api.orgTypeApi.getOrgTypeList();
                    let typeList = resp.data;
                    typeList.forEach(item=>{
                        let option = {value:item.orgTypeId,label:item.orgTypeName};
                        this.orgTypeOptions.push(option);
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
                    if(this.mode==='edit' && this.row.extOrgCode !== this.form.extOrgCode || this.mode==='add'){
                        const checkP = this.$api.orgDefineApi.checkOrg(this.form);
                        const resp = await this.$app.blockingApp(checkP);
                        if(resp.data !== 0){
                            this.$msg.warning('该机构代码已存在');
                            return ;
                        }
                    }
                    if(this.mode==='add'){
                        if(this.row.id ==='root'){
                            this.form.parentExtOrgId = 'root';
                        }else {
                            this.form.parentExtOrgId = this.row.id;
                        }
                    }
                    let that = this;
                    const p = this.$api.orgDefineApi.saveOrg(this.form);
                    p.then(function () {
                        if (that.actionOk) {
                            that.actionOk();
                            that.$msg.success('保存成功');
                            that.$dialog.close(that);
                        }
                    });
                    await this.$app.blockingApp(p);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        }
    }
</script>

<style scoped>

</style>
