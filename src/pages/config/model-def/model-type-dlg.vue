<template>
    <div>
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item prop="typeName" label="类型名称">
                <gf-input type="text" v-model="form.typeName" size="small"/>
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
                    typeName: '',
                    fields: []
                },
                rules: {
                    typeName: [{required: true, message: "请输入类型名称"}],
                },
            }
        },

        created() {
            Object.assign(this.form, this.row);
            this.fetchFields();
        },
        methods: {
            fetchFields() {
                //todo load data
                this.form.fields = [
                    {
                        "fieldId": "字段ID-1",
                        "fieldName": "字段名称-1",
                        "fieldType": "01",
                        "mustFill": "1",
                        "maxLen": 256,
                        "createTime": "2020-01-01 12:00:00",
                        "createUser": "李一（123123）"
                    },
                    {
                        "fieldId": "字段ID-2",
                        "fieldName": "字段名称-2",
                        "fieldType": "01",
                        "mustFill": "1",
                        "maxLen": 256,
                        "createTime": "2020-01-01 12:00:00",
                        "createUser": "李一（123123）"
                    },
                    {
                        "fieldId": "字段ID-3",
                        "fieldName": "字段名称-3",
                        "fieldType": "01",
                        "mustFill": "1",
                        "maxLen": 256,
                        "createTime": "2020-01-01 12:00:00",
                        "createUser": "李一（123123）"
                    }];
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                try {
                    //todo post to server
                    if (this.actionOk) {
                        await this.actionOk(this.form, this.row);
                    }
                    this.$msg.info('保存成功');
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
