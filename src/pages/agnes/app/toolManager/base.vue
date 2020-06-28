<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px"  style="margin-left: 30%;">
        <el-form-item label="任务名称" prop="busiName">
            <gf-input v-model.trim="form.busiName"  placeholder="任务名称" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="业务场景" prop="busiType">
            <el-select v-model="form.busiType" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in busiTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="业务标签" prop="busiBiaoQ">
            <el-select v-model="form.busiBiaoQ" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="任务有效期" >
            <el-date-picker
                    v-model="form.startTime"
                    type="datetime"
                    style="width: 24.4%"
                    value-format="yyyy-MM-dd HH-mm-ss"
                    placeholder="开始日期">
            </el-date-picker>
             ~
            <el-date-picker
                    v-model="form.finishTime"
                    type="datetime"
                    style="width: 24.4%"
                    value-format="yyyy-MM-dd HH-mm-ss"
                    placeholder="结束日期" :disabled="form.startAllTime">
            </el-date-picker>
            <el-checkbox v-model="form.startAllTime" style="margin-left: 10px">永久有效</el-checkbox>
        </el-form-item>
        <el-checkbox v-model="form.isDependOnBusi" style="margin-left: 110px;margin-bottom: 18px;">根据业务参数批量生成任务</el-checkbox>
        <el-form-item label="关联产品" prop="busiBiaoQ" v-show="form.isDependOnBusi">
            <el-select v-model="form.busiBiaoQ" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关联case" prop="busiBiaoQ">
            <el-select v-model="form.busiBiaoQ" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="消息对象" >
            <el-table :data="form.evidenceTemplateList" stripe border style="width: 50%" size="mini">
                <el-table-column  type="index" label="序号" min-width="20" align="center"></el-table-column>
                <el-table-column align="center" label="操作" min-width="20">
                    <template slot-scope="scope">
                        <el-button  type="text"  @click="delSealRow(scope.row,scope.$index)" icon="el-icon-delete" size="small"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="印鉴名称" min-width="50" align="center">
                    <template slot-scope="scope" >
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealName'" :rules='rules.sealName'>
                            <el-input  v-model="scope.row.sealName" size="small" :maxlength="30"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column   label="印鉴保管人部门"   align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperDepartment'">
                            <el-input  v-model="scope.row.sealKeeperDepartment" size="small" :maxlength="30" ></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column   label="印鉴保管人职务"   align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperJob'">
                            <el-input  v-model="scope.row.sealKeeperJob" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <trigger-model labelWidth="100px"
                       :isDialog="true"
                       :itemWeekMode="form.itemWeekMode"
                       :itemExecMode="form.itemExecMode"
                       :itemExecCondition="form.itemSchedule"
                       :triggerEventOption="busiTypeOptions"
                       ref="triggerModel"
        ></trigger-model>
<!--        <el-form-item label="启动方式" >-->
<!--            <el-radio-group v-model="form.execType">-->
<!--                <el-radio  :label="1">重复执行</el-radio>-->
<!--                <el-radio  :label="2">事件触发执行</el-radio>-->
<!--            </el-radio-group>-->
<!--        </el-form-item>-->
        <el-row class="gf-form-btn2" style="margin-left: 25%">
            <el-button type="primary" @click="submit('form')" icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "test-base",
        props: {
            dmCode: {type: String, required: true}
        },
        data() {
            return {
                busiTypeOptions:[{value:"chanp",label:"产品"},{value:"kehu",label:"客户"},{value:"zhuanghu",label:"账户"},{value:"jijin",label:"基金"}],
                options:[{value:"xit",label:"系统数据源"},{value:"waibu",label:"外部数据源"},{value:"ces",label:"测试数据源"}],
                form:{busiName:'',busiType:'',busiBiaoQ:'',startTime:'',finishTime:''
                    ,startAllTime:false,involeCase:'',startType:'',isDependOnBusi:false
                    ,execType:1,itemExecMode:'',itemWeekMode:'',itemSchedule:null
                ,evidenceTemplateList:[]},
            }
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

        watch: {
            'form.startAllTime':function (val) {
                debugger;
                if(val){
                    this.form.finishTime='9999-12-31 23-59-59'
                }else {
                    this.form.finishTime=''
                }
            }
        }
    }
</script>

<style scoped>

</style>