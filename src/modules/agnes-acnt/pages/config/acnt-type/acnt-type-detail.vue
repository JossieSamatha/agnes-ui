<template>
    <div>
        <el-form ref="form" class="task-def-form" :model="form" :disabled="mode==='view'"
                 :rules="rules" label-width="110px">
            <el-form-item label="账户类型编号" prop="acntReType.typeCode">
                <gf-input v-model.trim="form.acntReType.typeCode" placeholder="类型代码" :max-byte-len="8"
                          :disabled="mode==='edit'"/>
            </el-form-item>
            <el-form-item label="账户类型名称" prop="acntReType.typeName">
                <gf-input v-model.trim="form.acntReType.typeName" placeholder="类型名称" :max-byte-len="120"/>
            </el-form-item>
            <el-form-item label="流程类型" prop="acntReType.processType">
                <gf-dict filterable clearable v-model="form.acntReType.processType"
                         dict-type="AGNES_ACNT_PROCESS_TYPE"/>
            </el-form-item>

            <el-form-item label="账户要素配置" prop="fileTable">
                <div class="rule-table">
                    <el-table header-row-class-name="rule-header-row"
                              header-cell-class-name="rule-header-cell"
                              row-class-name="rule-row"
                              cell-class-name="rule-cell"
                              :data="form.factors"
                              border stripe
                              style="width: 100%">
                        <el-table-column prop="factorCode" label="要素编码">
                            <template slot-scope="scope">

                                <el-select
                                        :style="!scope.row.factorCode||scope.row.factorCode.length===0? 'border:1px solid #f00':''"
                                        v-model="scope.row.factorCode" placeholder="请选择"
                                        @change="onChange(scope.$index, scope.row)"
                                        filterable>
                                    <el-option
                                            v-for="item in typeFactorOp"
                                            :key="item.dictId"
                                            :label="`${item.dictId}/${item.dictName}`"
                                            :value="item.dictId"
                                    >
                                    </el-option>
                                </el-select>

                            </template>
                        </el-table-column>
                        <el-table-column prop="factorName" label="要素名称">
                            <template slot-scope="scope">
                                <el-input :style="!scope.row.factorName ? 'border:1px solid #f00':''"
                                          v-model="scope.row.factorName"
                                          :disabled="false"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isShow" label="是否显示">
                            <template slot-scope="scope">
                                <gf-dict-select :style="!scope.row.isShow ? 'border:1px solid #f00':''"
                                                dict-type="GF_BOOL_TYPE" v-model="scope.row.isShow"/>

                            </template>
                        </el-table-column>

                        <el-table-column prop="mustFill" label="是否必填">
                            <template slot-scope="scope">
                                <gf-dict-select :style="!scope.row.mustFill ? 'border:1px solid #f00':''"
                                                dict-type="GF_BOOL_TYPE" v-model="scope.row.mustFill"/>

                            </template>
                        </el-table-column>

                        <el-table-column prop="option" label="操作" width="52" align="center">
                            <template slot-scope="scope">
                                <span class="option-span" @click="deleteRuleRow(scope.$index)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="addRule()" class="rule-add-btn" size="small" :disabled="mode==='view'">新增
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import loadsh from "lodash";

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
                    acntReType: {
                        typeCode: '',
                        typeName: '',
                        processType: 'TA',
                    },
                    factors: []
                },
                okTitle: '保存',
                variableOption: [],
                analyRulesOption: [],
                typeFactorOp: this.$app.dict.getDictItems('AGNES_ACNT_TYPE_FACTOR'),
                mustFillField: ['factorCode', 'factorName', 'isShow', 'mustFill'],
                rules: {
                    'acntReType.typeName': [{required: true, message: "账户类型名称必填", trigger: 'blur'}],
                    'acntReType.typeCode': [{required: true, message: "账户类型编号必填", trigger: 'blur'}],
                    'acntReType.processType': [{required: true, message: "账户流程类型必填", trigger: 'blur'}],
                }
            }
        },
        beforeMount() {
            Object.assign(this.form.acntReType, this.row);
            if (this.form.acntReType.typeCode) {
                const p = this.fetchFactors();
                this.$app.blockingApp(p);
            }
            if (this.mode == 'view' || this.mode == 'check') {
                this.isNoEdit = true;
                this.okTitle = '审核';
            }
        },
        methods: {
            async fetchFactors() {
                try {
                    const resp = await this.$api.acntTypeApi.getAcntTypeFactorList(this.form.acntReType.typeCode);
                    this.form.factors = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            // 新增服务行
            addRule() {
                const newFileTableObj = {
                    factorCode: '',
                    factorName: '',
                    isShow: '',
                    mustFill: '',
                };
                this.form.factors.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex) {
                this.form.factors.splice(rowIndex, 1);
            },

            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let validate = true;
                    if (this.form.factors) {
                        for (let i = 0; i < this.form.factors.length; i++) {
                            for (let key in this.form.factors[i]) {
                                if (this.mustFillField.indexOf(key) !== -1 && loadsh.isEmpty(this.form.factors[i][key])) {
                                    validate = false;
                                }
                            }
                        }
                        if (!validate) {
                            this.$msg.warning("请补充完整必填项!");
                            return;
                        }
                    }
                    const p = this.$api.acntTypeApi.saveAcntType(this.form);
                    await this.$app.blockingApp(p);
                    this.$msg.success('保存成功');
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            onChange(rowIndex, rowInfo) {
                if (rowInfo.factorCode) {
                    let selectedFactor = this.$lodash.find(this.typeFactorOp, {dictId: rowInfo.factorCode});
                    rowInfo.factorName = selectedFactor.dictName;
                }
            }

        }


    }
</script>
