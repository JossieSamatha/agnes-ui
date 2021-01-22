<template>
    <el-form ref="form" class="task-def-form" :model="form"
             label-width="110px">
        <el-form-item label="规则名称" prop="fileTable">
            <el-input  v-model="form.ruleName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转换明细" prop="fileTable">
            <div class="rule-table">
                <el-table header-row-class-name="rule-header-row"
                          header-cell-class-name="rule-header-cell"
                          row-class-name="rule-row"
                          cell-class-name="rule-cell"
                          :data="form.details"
                          border stripe
                          :header-cell-style="{'text-align':'center'}">
                          style="width: 100%">
                    <el-table-column prop="sourceFactor1Value" label="来源因子值1">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sourceFactor1Value" v-if="form.sourceFactorType1=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.sourceFactor1Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.sourceFactorType1=='sql'">
                                <gf-filter-option
                                        v-for="item in sourceFactorOption1"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sourceFactor2Value" label="来源因子值2">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sourceFactor2Value" v-if="form.sourceFactorType2=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.sourceFactor2Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.sourceFactorType2=='sql'">
                                <gf-filter-option
                                        v-for="item in sourceFactorOption2"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sourceFactor3Value" label="来源因子值3">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.sourceFactor3Value" v-if="form.sourceFactorType3=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.sourceFactor3Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.sourceFactorType3=='sql'">
                                <gf-filter-option
                                        v-for="item in sourceFactorOption3"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column label=">>">
                    </el-table-column>
                    <el-table-column prop="targetFactor1Value" label="目标因子值1">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.targetFactor1Value" v-if="form.targetFactorType1=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.targetFactor1Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.targetFactorType1=='sql'">
                                <gf-filter-option
                                        v-for="item in targetFactorOption1"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetFactor2Value" label="目标因子值2">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.targetFactor2Value" v-if="form.targetFactorType2=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.targetFactor2Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.targetFactorType2=='sql'">
                                <gf-filter-option
                                        v-for="item in targetFactorOption2"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetFactor3Value" label="目标因子值3">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.targetFactor3Value" v-if="form.targetFactorType3=='text'"/>
                            <el-select class="multiple-select" v-model="scope.row.targetFactor3Value"
                                       filterable clearable
                                       placeholder="请选择"  v-if="form.targetFactorType3=='sql'">
                                <gf-filter-option
                                        v-for="item in targetFactorOption3"
                                        :key="item.KEY"
                                        :label="item.VALUE"
                                        :value="item.KEY">
                                </gf-filter-option>
                            </el-select>
                            <span v-else></span>
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
                sourceFactorOption1:[],
                sourceFactorOption2:[],
                sourceFactorOption3:[],
                targetFactorOption1:[],
                targetFactorOption2:[],
                targetFactorOption3:[],
                form:{
                    ruleName:'',
                    ruleCode:'',
                    sourceFactorType1:'',
                    sourceFactorType2:'',
                    sourceFactorType3:'',
                    targetFactorType1:'',
                    targetFactorType2:'',
                    targetFactorType3:'',
                    sourceFactor1:'',
                    sourceFactor2:'',
                    sourceFactor3:'',
                    targetFactor1:'',
                    targetFactor2:'',
                    targetFactor3:'',
                    details:[],
                },
            }
        },
        beforeMount() {
            if(this.row){
                Object.assign(this.form, this.row);
            }
            this.initData();
        },
        methods: {
            async initData(){
                //获取detail
                let p = this.$api.wordsTranslApi.queryTranslDetailListByCode(this.form);
                let resp = await this.$app.blockingApp(p);
                if(resp.data){
                    this.form.details=resp.data;
                }
                //获取列类型、类型为SQL对应的option
                this.getFieldDetail(this.form.sourceFactor1,1,"sour");
                this.getFieldDetail(this.form.sourceFactor2,2,"sour");
                this.getFieldDetail(this.form.sourceFactor3,3,"sour");
                this.getFieldDetail(this.form.targetFactor1,1,"targ");
                this.getFieldDetail(this.form.targetFactor2,2,"targ");
                this.getFieldDetail(this.form.targetFactor3,3,"targ");
            },
            async getFieldDetail(factorId,index,type){
                if(factorId==undefined || factorId==''){
                    return ;
                }
                let p = this.$api.wordsTranslApi.queryFactorById({factorId:factorId});
                let resp = await this.$app.blockingApp(p);
                let factor = resp.data;
                if(type=='sour'){
                    if(factor.factorType === 'sql'){
                        //获取类型为SQL对应的option
                        this.form['sourceFactorType'+index] = 'sql';
                        let p = this.$api.wordsTranslApi.getFieldOptions(factor);
                        let resp = await this.$app.blockingApp(p);
                        if(resp.code==='9999'){
                            this.$msg.error(resp.message);
                            return ;
                        }
                        this['sourceFactorOption'+index] =resp.data;
                    }else {
                        this.form['sourceFactorType'+index] = 'text';
                    }
                }else {
                    if(factor.factorType === 'sql'){
                        //获取类型为SQL对应的option
                        this.form['targetFactorType'+index] = 'sql';
                        let p = this.$api.wordsTranslApi.getFieldOptions(factor);
                        let resp = await this.$app.blockingApp(p);
                        if(resp.code==='9999'){
                            this.$msg.error(resp.message);
                            return ;
                        }
                        this['targetFactorOption'+index] =resp.data;
                    }else {
                        this.form['targetFactorType'+index] = 'text';
                    }
                }
            },
            // 新增服务行
            addRule(){
                const newFileTableObj = {
                    sourceFactor1Value:'',
                    sourceFactor2Value:'',
                    sourceFactor3Value:'',
                    targetFactor1Value:'',
                    targetFactor2Value:'',
                    targetFactor3Value:'',
                };
                this.form.details.push(newFileTableObj);
            },
            // 删除行
            deleteRuleRow(rowIndex){
                this.form.details.splice(rowIndex, 1);
            },
            async onCancel() {
                this.$emit("onClose");
            },
            async onSave(){
                try {
                    const p = this.$api.wordsTranslApi.saveTranslDetail(this.form);
                    let resp = await this.$app.blockingApp(p);
                    if(resp.code==='9999'){
                        this.$msg.error(resp.message);
                        return ;
                    }
                    this.onCancel();
                    if(this.actionOk){
                        this.actionOk();
                    }
                    this.$msg.success('保存成功');
                }catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },


    }
</script>
<style scoped>
</style>>