<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px"  style="margin-left: 30%;">
        <el-form-item label="业务参数名称" prop="busiName">
            <gf-input v-model.trim="form.busiName"  placeholder="业务名称" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="业务参数类型" prop="busiType">
            <el-select v-model="form.busiType" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in busiTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="数据源" prop="dataSource">
            <el-select v-model="form.dataSource" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="判断SQL" prop="jugSql">
            <el-input v-model="form.jugSql" type="textarea" rows="6" style="width: 50%" placeholder="判断SQL"/>
        </el-form-item>
        <el-row class="gf-form-btn2" style="margin-left: 25%">
            <el-button type="primary" @click="submit('form')" icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "test-index",
        props: {
            dmCode: {type: String, required: true}
        },
        data() {
            return {
                form:{busiName:'',busiType:'',dataSource:'',jugSql:''},
                busiTypeOptions:[{value:"chanp",label:"产品"},{value:"kehu",label:"客户"},{value:"zhuanghu",label:"账户"},{value:"jijin",label:"基金"}],
                options:[{value:"xit",label:"系统数据源"},{value:"waibu",label:"外部数据源"},{value:"ces",label:"测试数据源"}],
                rules: {
                    busiName: [
                        {required: true, message: '业务参数名称必填', trigger: 'blur'},
                    ],
                    busiType: [
                        {required: true, message: '请选择业务参数类型', trigger: 'blur'}
                    ],
                    dataSource: [
                        {required: true, message: '请选择数据源', trigger: 'blur'}
                    ],
                    jugSql: [
                        {required: true, message: '判断SQL必填', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted: function () {
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        watch:{
        }
    }
</script>