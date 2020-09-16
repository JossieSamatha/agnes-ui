<template>
    <el-form ref="fileScanForm" class="task-def-form" :model="detailFormData" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="方案代码" prop="rateCode">
            <gf-input v-model.trim="detailFormData.rateCode" placeholder="方案代码" :max-byte-len="8"/>
        </el-form-item>
        <el-form-item label="方案名称" prop="rateName">
            <gf-input v-model.trim="detailFormData.rateName" placeholder="方案名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="银行代码" prop="bankCode">
            <gf-input v-model.trim="detailFormData.bankCode" placeholder="银行代码" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
            <gf-input v-model.trim="detailFormData.bankName" placeholder="银行名称" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="利率" prop="rate">
            <gf-input v-model.trim="detailFormData.rate" placeholder="利率" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <gf-input v-model.trim="detailFormData.status" placeholder="状态" :max-byte-len="120"/>
        </el-form-item>
        <el-form-item label="生效日期" prop="startDate">
            <div class="line none-shrink">
                <el-form-item prop="startDate">
                    <el-date-picker
                            v-model="detailFormData.startDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptionsStart"
                            placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <span style="margin: 0 10px">~</span>
                <el-form-item prop="endDate">
                    <el-date-picker
                            v-model="detailFormData.endDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptionsEnd"
                            placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <gf-strbool-checkbox v-model="startAllTime" style="margin-left: 10px">永久有效</gf-strbool-checkbox>
            </div>
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
                    rateCode:'',
                    rateName:'',
                    bankCode:'',
                    bankName:'',
                    startDate:'',
                    endDate:'',
                    rate:'',
                    status:'',
                },
                variableOption:[],
                analyRulesOption:[],
                curExecScheduler: '',    // 当前频率对象字段
                detailFormRules: {
                    rateCode: [
                        {required: true, message: '方案代码必填', trigger: 'blur'},
                    ],
                    rateName: [
                        {required: true, message: '方案名称必填', trigger: 'blur'},
                    ],
                    bankCode: [
                        {required: true, message: '银行代码必填', trigger: 'blur'},
                    ],
                    bankName: [
                        {required: true, message: '银行名称必填', trigger: 'blur'},
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
