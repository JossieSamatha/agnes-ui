<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'||mode==='check'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="业务归属" prop="paramBizType">
            <gf-dict filterable clearable v-model="detailForm.paramBizType" dict-type="AGNES_PRODUCT_PARAM_BIZTYPE"/>
        </el-form-item>
        <el-form-item label="参数代码" prop="paramCode">
            <gf-input v-model.trim="detailForm.paramCode" placeholder="参数代码"/>
        </el-form-item>
        <el-form-item label="参数名称" prop="paramName">
            <gf-input v-model.trim="detailForm.paramName" placeholder="参数名称"/>
        </el-form-item>
        <el-form-item label="参数类型" prop="paramType">
            <gf-dict filterable clearable v-model="paramType" dict-type="AGNES_PRODUCT_PARAM_TYPE"/>
        </el-form-item>
        <el-form-item label="参数值" prop="paramValue">
            <gf-input v-if="detailForm.paramType==='str'" v-model.trim="detailForm.paramValue" placeholder="参数值"/>
            <el-input type="number" v-if="detailForm.paramType==='number'" v-model="detailForm.paramValue" placeholder="参数值"/>
            <el-date-picker
                v-if="detailForm.paramType==='date'"
                v-model="detailForm.paramValue"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="参数值">
            </el-date-picker>
            <el-select v-if="detailForm.paramType==='boolean'" v-model="detailForm.paramValue" placeholder="请选择" filterable clearable>
                <gf-filter-option :key="0" :label=false :value=false>否</gf-filter-option>
                <gf-filter-option :key="1" :label=true :value=true>是</gf-filter-option>
            </el-select>
        </el-form-item>
      
    </el-form>

</template>

<script>

    export default {
        name: "task-define",
        props: {
            mode: {
                type: String,
                default: 'add'
            },
            productData:{
                type:Object,
                request:true
            },
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                detailForm:{
                    paramBizType:'',
                    paramCode:'',
                    paramName:'',
                    paramType:'str',
                    paramValue:'',
                },
                paramType:'str',
                detailFormRules: {
                    paramBizType: [
                        {required: true, message: '业务归属必填', trigger: 'blur'},
                    ],
                    paramCode: [
                        {required: true, message: '参数代码必填', trigger: 'blur'},
                    ],
                    paramName: [
                        {required: true, message: '参数名称必填', trigger: 'change'},
                    ],
                    paramType: [
                        {required: true, message: '参数类型必填', trigger: 'blur'},
                    ],
                    paramValue: [
                        {required: true, message: '参数值必填', trigger: 'change'},
                    ],
                },
            }
        },
        mounted() {
            if(this.mode!=='add'){
                this.detailForm = this.row
            }
        },
        methods: {
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },

            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                const ok = await this.$refs['taskDefForm'].validate();
                if (!ok) {
                    return;
                }
                try {
                    let paramData = this.detailForm;
                    if(this.mode==='add'){
                        paramData.productId = this.productData.productId;
                        paramData.productCode = this.productData.productCode;
                        paramData.paramStatus = '0';
                        paramData.isHand = '1';
                        let checkCode = {
                            productId:this.productData.productId,
                            paramCode:paramData.paramCode
                        }
                        const res = await this.$api.productParamApi.checkCodeExist(checkCode);
                        if(res.data!==0){
                            this.$msg.success('参数代码已存在');
                            return;
                        }
                        const p = this.$api.productParamApi.saveProdutParam(this.detailForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('保存成功');
                    }else if(this.mode==='edit') {
                        const p = this.$api.productParamApi.saveProdutParam(this.detailForm);
                        await this.$app.blockingApp(p);
                        this.$msg.success('修改成功');
                    }else if(this.mode==='check'){
                        let updateParam = {
                            productParamId:paramData.productParamId,
                            paramStatus:'1'
                        }
                        const p = this.$api.productParamApi.updateStatus(updateParam);
                        await this.$app.blockingApp(p);
                        this.$msg.success('复核成功');
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

        watch: {
            paramType() {
                this.detailForm.paramValue = '';
                this.detailForm.paramType = this.paramType;
            }
        }
    }
</script>
