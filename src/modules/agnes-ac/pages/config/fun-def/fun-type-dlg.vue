<template>
    <div>
        <el-form :model="form.reFunDef" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px">
            <el-form-item label="函数名称" prop="fnName">
                <gf-input type="text" v-model="form.reFunDef.fnName" :max-byte-len="64"/>
            </el-form-item>
            <el-form-item label="函数编号" prop="fnCode">
                <gf-input type="text" v-model="form.reFunDef.fnCode" :max-byte-len="32"
                          clear-regex="[^a-zA-Z\d\x00-\xff]"/>
            </el-form-item>
            <el-form-item label="函数类型" prop="fnType">
                <gf-dict-select dict-type="AGNES_FUN_TYPE" v-model="form.reFunDef.fnType"></gf-dict-select>
            </el-form-item>
            <el-form-item label="api方法名" v-if="form.reFunDef.fnType === 'api'">
                <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128"
                          clear-regex="[^a-zA-Z\x00-\xff]"/>
            </el-form-item>
            <el-form-item label="内部函数" v-if="form.reFunDef.fnType === 'inner'">
                <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128"
                          clear-regex="[^a-zA-Z\x00-\xff]"/>
            </el-form-item>
            <el-form-item label="服务路径" v-if="form.reFunDef.fnType === 'svc'">
                <gf-input type="text" v-model="form.reFunDef.fnTarget" :max-byte-len="128"
                          clear-regex="[^a-zA-Z\x00-\xff]"/>
            </el-form-item>
            <el-row v-if="form.reFunDef.fnType === 'sql'">
                <el-form-item label="数据源" prop="bizParamDb">
                    <gf-ds v-model="form.reFunDef.bizParamDb"></gf-ds>
                </el-form-item>

                <el-form-item label="SQL语句" prop="bizParamSql">
                    <gf-input type="textarea" v-model="form.reFunDef.bizParamSql"
                              resize="none"
                              :autosize="{minRows: 2, maxRows: 6}" clear-regex="[^\x00-\xff]"/>
                </el-form-item>
            </el-row>
            <el-form-item label="传入参数" prop="fnArgs">
                <el-select v-model="form.reFunDef.fnArgs" placeholder="选择业务对象" style="width: 100%" filterable>
                    <el-option
                            v-for="item in modelType"
                            :key="item.modelTypeId"
                            :label="item.typeName"
                            :value="item.modelTypeId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="返回参数" prop="fnReturn">
                <el-select v-model="form.reFunDef.fnReturn" placeholder="选择业务对象" style="width: 100%" filterable>
                    <el-option
                            v-for="item in modelType"
                            :key="item.modelTypeId"
                            :label="item.typeName"
                            :value="item.modelTypeId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="函数描述" prop="fnDesc">
                <gf-input type="textarea" v-model="form.reFunDef.fnDesc"
                          resize="none" :max-byte-len="128"
                          :autosize="{minRows: 2, maxRows: 6}"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button-visible="mode !== 'view'" :on-save="save" ok-button-title="确定"></dialog-footer>
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
                    reFunDef: {
                        fnName: '',
                        fnType: '',
                        fnDesc: '',
                        fnCode: '',
                        fnTarget: '',
                        fnArgs: '',
                        fnReturn: '',
                        bizParamDb: '',
                        bizParamSql: ''
                    },
                },
                modelType: [],
                rules: {
                    'fnName': [{required: true, message: "请输入函数名称", trigger: 'blur'}],
                    'fnType': [{required: true, message: "请选择函数类型", trigger: 'change'}],
                },
            }
        },

        beforeMount() {
            Object.assign(this.form.reFunDef, this.row);
            this.loadModelType();
        },
        methods: {
            async loadModelType() {
                try {
                    const p = this.$api.modelConfigApi.getModelTypeList();
                    const resp = await this.$app.blockingApp(p);
                    if (resp && resp.data) {
                        this.modelType = resp.data;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    if (this.form.reFunDef.fnName !== this.row.fnName ||
                        this.form.reFunDef.fnType !== this.row.fnType) {
                        const check = this.$api.funDefineApi.checkFun(this.form.reFunDef);
                        const resp = await this.$app.blockingApp(check);
                        if (resp && resp.data) {
                            const ok = await this.$msg.ask(`已存在同名函数, 是否继续?`);
                            if (!ok) {
                                return
                            }
                        }
                    }
                    const p = this.$api.funDefineApi.addFunDef(this.form.reFunDef);
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
