<template>
    <div>
        <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="100px"
                 style="padding: 10px;">
            <el-form-item label="账户名称" prop="acntName">
                <gf-input type="text" v-model="form.acntName" :readonly="true">
                    <i slot="suffix" class="el-input__icon el-icon-edit-outline" @click="chooseAcnt"/>
                </gf-input>
            </el-form-item>
            <el-form-item label="联系人名称" prop="linkmanName">
                <gf-input type="text" v-model="form.linkmanName" :readonly="true">
                    <i slot="suffix" class="el-input__icon el-icon-edit-outline" @click="chooseLinkman"/>
                </gf-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <gf-dict-select dict-type="ACNT_REF_STATUS" v-model="form.status"/>
            </el-form-item>
            <el-form-item label="生效日期" prop="startDt">
                <el-date-picker v-model="form.startDt" type="date" placeholder="请选择生效日期" style="width: 100%"
                                align="right">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    import acntChooseDlg from "./acnt-choose-dlg";
    import linkmanChooseDlg from "./linkman-choose-dlg";

    export default {
        name: "linkman-ref-add-dlg",
        data() {
            return {
                form: {
                    acntName: '',
                    acntId: '',
                    linkmanName: '',
                    linkmanId: '',
                    status: '',
                    startDt: '',
                    endDt: '9999-12-30 23:59:59'
                },
                rules: {
                    'acntName': [{required: true, message: "请选择账户名称"}],
                    'linkmanName': [{required: true, message: "请选择联系人名称"}],
                    'status': [{required: true, message: "请选择状态"}],
                },
            }
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
            Object.assign(this.form, this.row);
        },
        methods: {
            onAddLinkman(rows) {
                this.form.linkmanName = rows[0].linkmanName;
                this.form.linkmanId = rows[0].linkmanId;
            },
            onAddAcnt(rows) {
                this.form.acntId = rows[0].acntId;
                this.form.acntName = rows[0].acntName;
            },
            chooseAcnt() {
                this.showDlg(acntChooseDlg, '账户', 'view', this.onAddAcnt.bind(this));
            },
            chooseLinkman() {
                this.showDlg(linkmanChooseDlg, '联系人', 'view', this.onAddLinkman.bind(this));
            },
            showDlg(dlg, title, mode, actionOk) {
                this.$nav.showDialog(
                    dlg,
                    {
                        args: {actionOk},
                        width: '50%',
                        title: this.$dialog.formatTitle(title, mode),
                    }
                );
            },
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.linkmanRefApi.saveLinkmanRef(this.form);
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