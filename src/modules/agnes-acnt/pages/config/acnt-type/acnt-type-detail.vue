<template>
    <el-form ref="fileScanForm" class="task-def-form" :model="detailFormData" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="类型代码" prop="typeCode">
            <gf-input v-model.trim="detailFormData.typeCode" placeholder="类型代码" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="类型名称" prop="typeName">
            <gf-input v-model.trim="detailFormData.typeName" placeholder="类型名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="流程类型" prop="processType">
            <gf-dict filterable clearable v-model="detailFormData.processType" dict-type="AGNES_DC_TRANS_MODE"/>
        </el-form-item>
       
    </el-form>
</template>

<script>
    export default {
        name: "file-scan-detail",
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
                detailFormData:{
                    typeCode:'',
                    typeName:'',
                    processType:'0',
                
                },
                variableOption:[],
                analyRulesOption:[],
                curExecScheduler: '',    // 当前频率对象字段
                detailFormRules: {
                    typeCode: [
                        {required: true, message: '规则编号必填', trigger: 'blur'},
                    ],
                    typeName: [
                        {required: true, message: '规则名称必填', trigger: 'blur'},
                    ],
              
                },
            }
        },
        beforeMount() {
            if(this.mode!=='add'){
                this.detailFormData = this.row
                this.addExecScheduler();
            }
            this.getVarIdList();
            this.getAnalyRulesOption();
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
            addExecScheduler(){
                if(this.detailFormData.execScheduler){
                    this.detailFormData.execScheduler = '00#00#02#'+this.detailFormData.execScheduler
                }
                if(this.detailFormData.varId){
                    let varIdArr = this.detailFormData.varId.split(',');
                    this.detailFormData.varId = varIdArr
                }
            },
            async getVarIdList(){
                const p = this.$api.fileScan.getVarIdList();
                let res =  await this.$app.blockingApp(p);
                this.variableOption = res.data;
            },
            async getAnalyRulesOption(){
                const p = this.$api.fileScan.queryRuleConfigList();
                let res =  await this.$app.blockingApp(p);
                 res.data.forEach(item=>{
                     let analy = {"pkId":item.pkId,"ifName":item.ifName}
                     this.analyRulesOption.push(analy);
                 });
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['fileScanForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    // let paramData = this.detailFormData;
                    let moveForm = JSON.parse(JSON.stringify(this.detailFormData));
                    if(moveForm.execScheduler){
                        let spiltExecScheduler = moveForm.execScheduler.split('#');
                        moveForm.execScheduler = spiltExecScheduler[3]
                    }
                    if(moveForm.varId){
                        moveForm.varId = moveForm.varId.join();
                    }
                    if(this.mode==='add'){
                        const p = this.$api.fileScan.saveFileScan(moveForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功');
                    }else if(this.mode==='edit') {
                        const p = this.$api.fileScan.saveFileScan(moveForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('修改成功');
                    }else if(this.mode==='check'){
                        // let updateParam = {
                        //     productParamId:paramData.productParamId,
                        //     paramStatus:'1'
                        // }
                        // const p = this.$api.fileScan.updateStatus(updateParam);
                        // await this.$app.blockingApp(p);
                        // this.$msg.success('复核成功');
                    }
                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$emit("onClose");
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },


    }
</script>
