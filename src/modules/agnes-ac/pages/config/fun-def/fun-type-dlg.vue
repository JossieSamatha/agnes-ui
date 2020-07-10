<template>
    <div>
        <el-scrollbar class="pagescroll-vertical autoHeight" :native="false" :noresize="false">
            <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                     style="padding: 10px;">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="函数编号" prop="fnCode">
                            <gf-input type="text" v-model="form.reFunDef.fnCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="函数名称" prop="fnName">
                            <gf-input type="text" v-model="form.reFunDef.fnName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="函数类型" prop="fnType">
                            <gf-dict-select dict-type="AGNES_FUN_TYPE" v-model="form.reFunDef.fnType"></gf-dict-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="目标地址" prop="fnTarget">
                            <gf-input type="text" v-model="form.reFunDef.fnTarget"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="函数描述" prop="fnDesc">
                            <gf-input type="text" v-model="form.reFunDef.fnDesc"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="form.reFunDef.fnType === 'sql'">
                    <el-col :span="8">
                        <el-form-item label="数据源" prop="bizParamDb">
                            <gf-dict dictType="AGNES_DATASOURCE" v-model="form.reFunDef.bizParamDb"></gf-dict>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="SQL语句" prop="bizParamSql">
                            <gf-input type="textarea" v-model="form.reFunDef.bizParamSql" :max-byte-len="256"
                                      resize="none"
                                      :autosize="{minRows: 2, maxRows: 6}" clear-regex="[^\x00-\xff]"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="参数定义">
                    <fun-field-list :row-data="form.reFunDef.fnArgs"></fun-field-list>
                </el-form-item>
            </el-form>
            <dialog-footer :on-save="save"></dialog-footer>
        </el-scrollbar>
    </div>
</template>

<script>
    import FunFieldList from "./fun-field-list";

    export default {
        components: {FunFieldList},
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
                    reFunDef: {
                        fnName: '',
                        fnType: '',
                        fnDesc: '',
                        fnCode: '',
                        fnTarget: '',
                        fnArgs: []
                    },
                },
                rules: {
                    fnName: [{required: true, message: "请输入函数名称"}],
                },
            }
        },

        beforeMount() {
            Object.assign(this.form.reFunDef, this.row);
            this.form.reFunDef.fnArgs = JSON.parse(this.form.reFunDef.fnArgs)

        },
        methods: {

            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                try {
                    const p = this.$api.funDefineApi.addFunDef(this.form);
                    await this.$app.blockingApp(p);
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.info('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },
    }
</script>

<style scoped>

</style>
