<template>
    <div>
        <el-form :model="form" :disabled="mode==='view'" ref="form" :rules="rules" label-width="85px"
                 style="padding: 10px;">
            <el-form-item label="类型名称" prop="modelType.typeName">
                <gf-input type="text" v-model="form.modelType.typeName"/>
            </el-form-item>
            <el-form-item label="字段编辑" prop="fileTable">
                <div class="rule-table">
                    <el-table header-row-class-name="rule-header-row"
                            header-cell-class-name="rule-header-cell"
                            row-class-name="rule-row"
                            cell-class-name="rule-cell"
                            :data="form.fields"
                            border stripe
                            style="width: 100%">
                        <el-table-column prop="fieldKey" label="字段编码">
                            <template slot-scope="scope">
                                <!-- <span v-if="this.mode === 'view'">{{scope.row.fieldKey}}</span> -->
                                <el-input :style="!scope.row.fieldKey ? 'border:1px solid #f00':''" v-model="scope.row.fieldKey"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fieldName" label="字段名称">
                            <template slot-scope="scope">
                                <!-- <span v-if="this.mode === 'view'">{{scope.row.fieldName}}</span> -->
                                <el-input :style="!scope.row.fieldName ? 'border:1px solid #f00':''" v-model="scope.row.fieldName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="inputType" label="字段类型">
                            <template slot-scope="scope">
                                <!-- <span v-if="this.mode === 'view'">{{scope.row.inputType}}</span> -->
                                <gf-dict-select :style="!scope.row.inputType ? 'border:1px solid #f00':''" dict-type="AGNES_FIELD_TYPE" v-model="scope.row.inputType"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mustFill" label="是否必填">
                            <template slot-scope="scope">
                                <gf-dict-select :style="!scope.row.mustFill ? 'border:1px solid #f00':''" dict-type="GF_BOOL_TYPE" v-model="scope.row.mustFill"/>
                                <!--<el-select :style="!scope.row.mustFill||scope.row.mustFill.length===0? 'border:1px solid #f00':''" v-model="scope.row.mustFill" placeholder="请选择">
                                    <el-option 
                                        v-for="item in mustOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>-->
                            </template>
                        </el-table-column>

                        <el-table-column  prop="option" label="操作" width="52" align="center">
                            <template slot-scope="scope">
                                <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button  @click="addRule()" class="rule-add-btn" size="small">新增</el-button>
                </div>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="save"></dialog-footer>
    </div>
</template>

<script>
    import loadsh from 'lodash';
    export default {
        components: {},
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
                mustOption:[
                    {name:'是',id:'1'},
                    {name:'否',id:'0'}
                ],
                mustFillField: ['fieldKey','fieldName','inputType','mustFill'],
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
            // 新增服务行
            addRule(){
                const newFileTableObj = {
                    fieldKey: '',
                    fieldName: '',
                    inputType: '',
                    mustFill: '',
                };
                this.form.fields.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex){
                this.form.fields.splice(rowIndex, 1);
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }

                try {
                    let validate = true;
                    if(this.form.fields){
                        for(let i =0;i<this.form.fields.length;i++){
                            for (let key in this.form.fields[i]) {
                                if(this.mustFillField.indexOf(key) !== -1 && loadsh.isEmpty(this.form.fields[i][key])){
                                    validate = false;
                                }
                            }
                        }
                        if(!validate){
                            this.$msg.warning("请补充完整必填项!");
                            return;
                        }
                    }
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
    .not-block{
        border-color: #f00;
    }
</style>
