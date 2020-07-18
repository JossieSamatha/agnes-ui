<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form.dopReLinkmanGroup" ref="form" :rules="rules"
                 label-width="85px"
                 style="padding: 10px;">
            <el-row></el-row>
            <el-form-item label="分组名称" prop="linkmanGroupName">
                <gf-input type="text" v-model="form.dopReLinkmanGroup.linkmanGroupName"/>
            </el-form-item>
            <el-form-item label="" prop="linkManList">
                <LinkManGroupList :row-data="form.dopReLinkmans" :extOrgId="row.extOrgId"></LinkManGroupList>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    import LinkManGroupList from "./linkman-group-list"

    export default {
        components: {
            LinkManGroupList
        },
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
                    dopReLinkmanGroup: {
                        linkmanGroupName: '',
                        linkmanGroupId: ''
                    },
                    dopReLinkmans: [],
                    isCheck:false
                },
                rules: {
                    'linkmanGroupName': [{required: true, message: "请输入分组名称"}],
                },
            }
        },
        mounted() {
            Object.assign(this.form.dopReLinkmanGroup, this.row);
            this.loadLinkMan();
        },
        methods: {
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                this.form.isCheck = false
                try {
                    if (this.form.dopReLinkmanGroup.linkmanGroupName !== this.row.linkmanGroupName) {
                        this.form.isCheck = true;
                    }
                    const p = this.$api.linkmanApi.saveLinkManGroup(this.form);
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
            loadLinkMan() {
                if (this.mode === "edit") {
                    this.$api.linkmanApi.queryLinkManListOfGroup(this.form).then(resp => {
                        if (resp && resp.data) {
                            this.form.dopReLinkmans = resp.data;
                        }

                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>