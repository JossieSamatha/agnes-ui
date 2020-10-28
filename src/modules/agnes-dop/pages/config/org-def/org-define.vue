<template>
    <div>
        <el-form class="fit-box" :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="95px"
                 style="padding: 10px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上级机构"  prop="parentExtOrgName">
                        <gf-input type="text" v-model="form.parentExtOrgName" :disabled="this.mode!=='add'" :readonly="true">
                            <i slot="suffix" class="el-input__icon el-icon-edit-outline" @click="chooseParentOrg" v-show="this.mode==='add'"/>
                        </gf-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构全称"  prop="extOrgName">
                        <gf-input type="text" maxlength="64" v-model="form.extOrgName"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构类别" prop="extOrgType">
                        <el-select v-model="form.extOrgType" filterable placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in orgTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构简称" prop="extOrgNameShort" >
                        <gf-input type="text" maxlength="32" v-model="form.extOrgNameShort"/>
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

        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="onSave" ok-button-title="保存" style="padding-bottom: 30px;"></dialog-footer>
    </div>
</template>

<script>
    import OrgInfoDlg from './org-info-dlg'
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
                    extOrgName:'',extOrgType:'',extOrgCode:'',extOrgPhone:'',extOrgFax:'',extOrgNameShort:'',extOrgId:'',
                    extOrgAddr:'',parentExtOrgName:'',extOrgPost:'',extOrgRemark:'',parentExtOrgId:'',label:'',id:'',mode:''
                },
                rules: {
                    'parentExtOrgName': [{required: true, message: "请选择上级机构"}],
                    'extOrgName': [{required: true, message: "请输入机构名称"}],
                    'extOrgType': [{required: true, message: "请选择机构类型"}],
                    'extOrgCode': [{required: true, message: "请输入机构代码"}],
                    'extOrgNameShort': [{required: true, message: "请输入机构简称"}],
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
                this.form.parentExtOrgId=this.row.id;
            }
            this.getParentExtOrgName(this.form.parentExtOrgId);
            this.getOrgTypeOptions();
        },
        methods: {
            async getParentExtOrgName(parentExtOrgId){
                try {
                    const resp = await this.$api.orgDefineApi.getOrgList();
                    let orgList = resp.data;
                    let that = this;
                    orgList.forEach(item=>{
                        if(item.extOrgId === parentExtOrgId){
                            that.form.parentExtOrgName=item.extOrgNameShort;
                            return;
                        }
                    });
                    if(that.form.parentExtOrgName===''){
                        that.form.parentExtOrgName='机构树';
                    }
                }catch (reason) {
                    this.$msg.error(reason);
                }
            },
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
            chooseParentOrg(){
                let mode = 'view';
                let actionOk = this.onGiveParentInfo.bind(this);
                let row = {id:this.form.parentExtOrgId};
                this.$nav.showDialog(
                    OrgInfoDlg,
                    {
                        args: { mode,row,actionOk},
                        width: '30%',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('机构信息', 'view'),
                    }
                );
            },
            onGiveParentInfo(orgInfo){
                this.form.parentExtOrgName=orgInfo.extOrgName;
                this.form.parentExtOrgId=orgInfo.extOrgId;
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