<template>
    <div>
        <el-form class="fit-box" :disabled="mode==='view'" :model="form" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="字段编码" prop="fieldId">
                <gf-input type="text" v-model="form.fieldId"/>
            </el-form-item>
            <el-form-item label="字段名称" prop="fieldName">
                <gf-input type="text" v-model="form.fieldName"/>
            </el-form-item>
            <el-form-item label="字段类型" prop="inputType">
                <gf-dict-select dict-type="AGNES_FIELD_TYPE" v-model="form.fieldType"/>
            </el-form-item>
            <el-form-item label="字段长度" prop="maxLen">
                <gf-input type="text" v-model.number="form.maxLen" name="maxLen"/>
            </el-form-item>
            <el-form-item label="是否必填">
                <gf-dict-radio-group dict-type="AGNES_YES_NO" v-model="form.mustFill"/>
            </el-form-item>
        </el-form>
        <dialog-footer :ok-button="mode !== 'view'" :on-save="onSave"></dialog-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    fieldId: '',
                    fieldName: '',
                    inputType: '01',
                    maxLen: 256,
                    mustFill: '0'
                },
                rules: {
                    fieldId: [{required: true, message: "请输入字段名称"}],
                    fieldName: [{required: true, message: "请输入字段名称"}]
                },
            };
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
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    await this.actionOk(this.form, this.row);
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
