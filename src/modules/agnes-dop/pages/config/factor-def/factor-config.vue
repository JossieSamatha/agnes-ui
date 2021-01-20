<template>
    <div>
        <el-form class="task-def-form" :model="factorObj"
                 label-width="80px" ref="factor" :rules="factorRules">
            <el-form-item label="名称" prop="factorName">
                <gf-input v-model.trim="factorObj.factorName" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="类型" prop="factorType">
                <gf-dict v-model="factorObj.factorType" dict-type="AGNES_WORDS_FACTOR_TYPE"/>
            </el-form-item>
            <el-form-item label="数据源" prop="dataSource" v-show="factorObj.factorType==='sql'">
                <el-select class="multiple-select" v-model="factorObj.dataSource"
                           filterable clearable
                           placeholder="请选择">
                    <gf-filter-option
                            v-for="item in dataSourceOption"
                            :key="item.id"
                            :label="item.dsName"
                            :value="item.id">
                    </gf-filter-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="factorContent" v-show="factorObj.factorType==='sql'">
                <gf-input v-model="factorObj.factorContent" type="textarea"
                          :rows="4" placeholder="内容"/>
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
            factorConfDialog:false,
            dataSourceOption:[],
            factorObj:{
                factorName:'',
                factorType:'',
                dataSource:'',
                factorContent:''
            },
            factorRules: {
                factorName: [
                    {required: true, message: '名称必填！', trigger: 'blur'},
                ],
                factorType: [
                    {required: true, message: '请选择类型！', trigger: 'blur'},
                ],
            }
        }
    },
    beforeMount() {
        if(this.mode!='add') {
            Object.assign(this.factorObj, this.row);
        }
    },
    mounted() {
        this.getOptions();
    },
    methods: {
        reloadData() {
            this.$refs.grid.reloadData();
        },
        async getOptions(){
            let p = this.$api.GFDsApi.queryList();
            let resp = await this.$app.blockingApp(p);
            resp.data.forEach(item=>{
                this.dataSourceOption.push({"id":item.id,"dsName":item.dsName});
            });
        },
        async saveRuleConf(){
            const ok = await this.$refs['factor'].validate();
            if (!ok) {
                return;
            }
            try {
                if(this.factorObj.factorType==='text'){
                    this.factorObj.dataSource='';
                    this.factorObj.factorContent='';
                }
                const p = this.$api.wordsTranslApi.saveFactor(this.factorObj);
                await this.$app.blockingApp(p);
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
