<template>
    <div>
        <el-form class="fit-box" :model="form" ref="form" :rules="rules" label-width="100px"
                 style="padding: 10px;">
            <el-form-item label="账户名称"  prop="acntId">
                <el-select style="width: 80%"  class="multiple-select" v-model="form.acntId"
                           filterable clearable
                           placeholder="请选择账户名称">
                    <gf-filter-option
                            v-for="item in acntList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人姓名" prop="linkmanId">
                <el-select style="width: 80%"  class="multiple-select" v-model="form.linkmanId"
                           filterable clearable
                           placeholder="请选择联系人姓名">
                    <gf-filter-option
                            v-for="item in linkList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="onSave" ok-button-title="确定"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    acntName: '',
                    acntId: '',
                    linkmanName: '',
                    linkmanId: '',
                    status: '',
                    startDt: '',
                    endDt: ''
                },
                acntList: [],
                linkList: [],
                rules: {
                    'acntId': [{required: true, message: "请选择账户名称"}],
                    'linkmanId': [{required: true, message: "请选择联系人名称"}],
                },
            }
        },
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            ui:String,
            row: Object,
            actionOk: Function
        },
        beforeMount() {
            Object.assign(this.form, this.row);
            this.getOptionAcntData()
            this.getOptionListData()
        },
        methods: {
            async getOptionAcntData() {
                try {
                    let groupOption = await this.$api.acntInfoApi.getAcntInfoList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                        this.acntList.push({label:item.acntName, value: item.acntId});
                    });
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async getOptionListData() {
                try {
                    let groupOption = await this.$api.linkmanApi.queryAllLinkManList();
                    let list = groupOption.data;
                    list.forEach((item) => {
                        this.linkList.push({label:item.linkmanName, value: item.linkmanId});
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
                    if(this.ui === "1"){
                        const p = this.$api.linkmanRefApi.checkLinkman(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('审核通过！');
                    }else {
                        const p = this.$api.linkmanRefApi.saveLinkmanRef(this.form);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功！');
                    }
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$dialog.close(this);
                } catch (e) {
                    this.$msg.error(e);
                }
            }
        }
    }
</script>
