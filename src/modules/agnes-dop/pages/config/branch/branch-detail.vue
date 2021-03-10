<template>
    <el-form ref="fileScanForm" class="task-def-form" :model="detailFormData" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="网点名称" prop="branchName">
            <gf-input v-model.trim="detailFormData.branchName" placeholder="网点名称" />
        </el-form-item>
        <el-form-item label="网点代码" prop="branchCode" v-if="false">
            <gf-input v-model.trim="detailFormData.branchCode" placeholder="网点代码" />
        </el-form-item>
        <el-form-item label="大额支付号" prop="bigPayNo">
            <gf-input v-model.trim="detailFormData.bigPayNo" placeholder="大额支付号" />
        </el-form-item>
        <el-form-item label="归属机构" prop="extOrgId">
            <el-select class="multiple-select" v-model="detailFormData.extOrgId"
                    filterable clearable
                    placeholder="请选择">
                <gf-filter-option
                        v-for="item in OrgList"
                        :key="item.extOrgId"
                        :label="`${item.extOrgCode} - ${item.extOrgName} - ${item.orgTypeName}`"
                        :value="item.extOrgId">
                </gf-filter-option>
            </el-select>
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
            var checkExistsBigPayNo = async (rule, value, callback) => {
                if(this.detailFormData.bigPayNo==''){
                    return ;
                }
                const resp = await this.$api.branchApi.existsBigPayNo(this.detailFormData.bigPayNo, this.detailFormData.bankBranchId);
                if (resp.data === true) {
                    callback(new Error('大额支付号已存在！'));
                }
            };
            return {
                detailFormData:{
                    bankBranchId:'',
                    branchName:'',
                    branchCode:'',
                    bigPayNo:'',
                    extOrgId:'',
                },
                variableOption:[],
                analyRulesOption:[],
                OrgList:[],         //机构列表
                curExecScheduler: '',    // 当前频率对象字段
                detailFormRules: {
                    branchName: [
                        {required: true, message: '网点名称必填', trigger: 'blur'},
                    ],
                    branchCode: [
                        {required: true, message: '网点代码必填', trigger: 'blur'},
                    ],
                    bigPayNo: [
                        {validator: checkExistsBigPayNo, trigger: 'blur'}
                    ]
                    // extOrgId: [
                    //     {required: true, message: '归属机构必填', trigger: 'blur'},
                    // ],
                }
            }
        },
        beforeMount() {
            if(this.mode!=='add'){
                Object.assign(this.detailFormData, this.row);
                // this.addExecScheduler();
            }
            // this.getVarIdList();
            this.getOption();
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },
            async getOption(){
                let OrgList = await this.$api.orgDefineApi.getOrgList();
                this.OrgList = OrgList.data
            },
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                this.detailFormData.branchCode = this.detailFormData.bigPayNo;

                const ok = await this.$refs['fileScanForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let formData = JSON.parse(JSON.stringify(this.detailFormData))
                    if(this.mode!=='add' && this.detailFormData.branchCode !== this.row.branchCode && this.detailFormData.bigPayNo != ''){
                       formData.isCheck = true
                    }else{
                       formData.isCheck = false
                    }
                    const p = this.$api.branchApi.saveData(formData);
                    const resp = await this.$app.blockingApp(p);
                    if(resp && resp.code == 'bhcz'){
                        this.$msg.error("该编码已存在");
                    }else {
                        this.$msg.success('保存成功');
                        if (this.actionOk) {
                            await this.actionOk();
                        }
                        this.$emit("onClose");
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },
    }
</script>
