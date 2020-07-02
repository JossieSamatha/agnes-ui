<template>
    <div>
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="类型名称" prop="modelType.typeName">
                <gf-input type="text" v-model="form.modelType.typeName"/>
            </el-form-item>

            <el-form-item label="字段编辑">
                <model-field-list :row-data="form.fields"></model-field-list>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="save"></dialog-footer>
    </div>
</template>

<script>
    import ModelFieldList from "./model-field-list";

    export default {
        components: {ModelFieldList},
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
                    modelType: {
                        modelTypeId: '',
                        typeName: ''
                    },
                    fields: []
                },
                rules: {
                    'modelType.typeName': [{required: true, message: "请输入模型名称"}],
                },
            }
        },

        beforeMount() {
            Object.assign(this.form.modelType, this.row);
            if (this.form.modelType.modelTypeId) {
                const p = this.fetchFields();
                this.$app.blockingApp(p);
            }
        },
        methods: {
            async fetchFields() {
                try {
                    const resp = await this.$api.modelConfigApi.getModelFieldList(this.form.modelType.modelTypeId);
                    this.form.fields = resp.data;
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
                    const p = this.$api.modelConfigApi.saveModel(this.form);
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
        }
    }
</script>

<style scoped>

</style>
