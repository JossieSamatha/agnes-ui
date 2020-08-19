<template>
    <el-form ref="taskDefForm" class="task-def-form" :model="detailForm" :disabled="mode==='view'"
             :rules="detailFormRules" label-width="110px">
        <el-form-item label="业务归属" prop="paramBelong">
            <gf-dict filterable clearable v-model="detailForm.paramBelong" dict-type="AGNES_PRODUCT_PARAM_BIZTYPE"/>
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
        <el-form-item label="参数值" prop="paramTypeValue">
            <gf-input v-if="detailForm.paramType==='str'" v-model.trim="detailForm.paramTypeValue" placeholder="参数值"/>
            <el-input type="number" v-if="detailForm.paramType==='number'" v-model="detailForm.paramTypeValue" placeholder="参数值"/>
            <el-date-picker
                v-if="detailForm.paramType==='date'"
                v-model="detailForm.paramTypeValue"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="参数值">
            </el-date-picker>
            <el-select v-if="detailForm.paramType==='boolean'" v-model="detailForm.paramTypeValue" placeholder="请选择" filterable clearable>
                <gf-filter-option :key="0" :label=false :value=false>否</gf-filter-option>
                <gf-filter-option :key="1" :label=true :value=true>是</gf-filter-option>
            </el-select>
            <!-- <gf-input v-if="detailForm.paramType==='str'" v-model.trim="detailForm.paramTypeValue" placeholder="参数代码"/> -->
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
            row: Object,
            actionOk: Function
        },
        data() {
            return {
                detailForm:{
                    paramBelong:'',
                    paramCode:'',
                    paramName:'',
                    paramType:'str',
                    paramTypeValue:'',
                },
                paramType:'str',
                detailFormRules: {
                    paramBelong: [
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
                    paramTypeValue: [
                        {required: true, message: '参数值必填', trigger: 'change'},
                    ],
                },
            }
        },
        beforeMount() {

        },
        methods: {
   
        },

        watch: {
            paramType() {
                this.detailForm.paramTypeValue = '';
                this.detailForm.paramType = this.paramType;
            }
        }
    }
</script>
