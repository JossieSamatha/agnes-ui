<template>
    <div>
        <el-form :model="ruleObj"
                 label-width="110px" ref="rule" :rules="formRules">
            <el-form-item label="规则名称" prop="ruleName">
                <gf-input v-model.trim="ruleObj.ruleName" placeholder="规则名称"/>
            </el-form-item>
            <el-form-item label="规则编号" prop="ruleCode">
                <gf-input v-model.trim="ruleObj.ruleCode" placeholder="规则编号"/>
            </el-form-item>
            <el-form-item label="业务类型" prop="bizType">
                <gf-dict v-model="ruleObj.bizType" dict-type="AGNES_WORDS_RULE_BIZ_TYPE"/>
            </el-form-item>
            <el-form-item label="来源因子选择" prop="sourceFactor">
                <el-select class="multiple-select" v-model="ruleObj.sourceFactor"
                           filterable clearable multiple :multiple-limit="3"
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in factorOption"
                            :key="item.factorId"
                            :label="item.factorName"
                            :value="item.factorId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目标因子选择" prop="targetFactor">
                <el-select class="multiple-select" v-model="ruleObj.targetFactor"
                           filterable clearable multiple :multiple-limit="3"
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in factorOption"
                            :key="item.factorId"
                            :label="item.factorName"
                            :value="item.factorId">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
        </el-form>
        <dialog-footer :on-save="saveRuleConf"/>
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
    data(){
        return {
            factorOption:[],
            ruleObj:{
                isCheckd:true,
                ruleName:'',
                ruleCode:'',
                bizType:'',
                sourceFactor:[],
                targetFactor:[],
                sourceFactor1:'',
                sourceFactor2:'',
                sourceFactor3:'',
                targetFactor1:'',
                targetFactor2:'',
                targetFactor3:'',
            },
            formRules: {
                ruleName: [
                    {required: true, message: '名称必填！', trigger: 'blur'},
                ],
                ruleCode: [
                    {required: true, message: '规则编号必填！', trigger: 'blur'},
                ],
                sourceFactor: [
                    {required: true, message: '请选择来源因子！', trigger: 'blur'},
                ],
                targetFactor: [
                    {required: true, message: '请选择目标因子！', trigger: 'blur'},
                ],
            }
        }
    },
    beforeMount() {
        if(this.mode!='add') {
            Object.assign(this.ruleObj, this.row);
        }
    },
    mounted() {
        this.getOptions();
        this.initData();
    },
    methods: {
        initData() {
            if(this.row.sourceFactor1 && this.row.sourceFactor1!=''){
                this.ruleObj.sourceFactor.push(this.row.sourceFactor1);
            }
            if(this.row.sourceFactor2 && this.row.sourceFactor2!=''){
                this.ruleObj.sourceFactor.push(this.row.sourceFactor2);
            }
            if(this.row.sourceFactor3 && this.row.sourceFactor3!=''){
                this.ruleObj.sourceFactor.push(this.row.sourceFactor3);
            }
            if(this.row.targetFactor1 && this.row.targetFactor1!=''){
                this.ruleObj.targetFactor.push(this.row.targetFactor1);
            }
            if(this.row.targetFactor2 && this.row.targetFactor2!=''){
                this.ruleObj.targetFactor.push(this.row.targetFactor2);
            }
            if(this.row.targetFactor3 && this.row.targetFactor3!=''){
                this.ruleObj.targetFactor.push(this.row.targetFactor3);
            }
        },
        async  getOptions(){
            let p = this.$api.wordsTranslApi.queryFactorList();
            let resp = await this.$app.blockingApp(p);
            resp.data.forEach((item)=>{
                this.factorOption.push({"factorId":item.factorId,"factorName":item.factorName});
            });
        },
        async saveRuleConf(){
            const ok = await this.$refs['rule'].validate();
            if (!ok) {
                return;
            }
            try {
                this.ruleObj.sourceFactor1='';
                this.ruleObj.sourceFactor2='';
                this.ruleObj.sourceFactor3='';
                this.ruleObj.sourceFactor.forEach((item,index)=>{
                    let single = index+1;
                    this.ruleObj['sourceFactor'+single]=item;
                });
                this.ruleObj.targetFactor1='';
                this.ruleObj.targetFactor2='';
                this.ruleObj.targetFactor3='';
                this.ruleObj.targetFactor.forEach((item,index)=>{
                    let single = index+1;
                    this.ruleObj['targetFactor'+ single]=item;
                });
                if(this.mode!=='add' && this.row.ruleCode === this.ruleObj.ruleCode){
                    this.ruleObj.isCheckd = false;
                }
                const p = this.$api.wordsTranslApi.saveTranslRule(this.ruleObj);
                let resp = await this.$app.blockingApp(p);
                if(resp.code==='9999'){
                    this.$msg.error(resp.message);
                    return ;
                }
                this.$msg.success('保存成功');
                if(this.actionOk){
                    this.actionOk();
                }
                this.$dialog.close(this);
            } catch (reason) {
                this.$msg.error(reason);
            }
        }
    },
}

</script>
