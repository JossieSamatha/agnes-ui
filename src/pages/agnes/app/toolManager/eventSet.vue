<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px"  style="margin-left: 30%;">
        <el-form-item label="事件名称">
            <gf-input v-model.trim="form.busiName"  placeholder="任务名称" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="执行区间" >
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
        <el-form-item label="取值函数" prop="busiBiaoQ">
            <el-select v-model="form.busiBiaoQ" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="参数设置">
            <gf-input v-model="form.busiType" style="width: 50%"></gf-input>
            <i class="fa fa-edit"  style="font-size: 16px;"></i>
        </el-form-item>
        <el-form-item label="消息对象类型" prop="">
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
                <el-table-column label="英文" min-width="40" align="center" prop="englishName"/>
                <el-table-column align="center" label="中文" min-width="40" prop="chinaName"/>
                <el-table-column label="是否必填" min-width="20" align="center" prop="sealName"/>
                <el-table-column   label="字段值" min-width="50"  align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="scope.row.sealKeeperJob">
                            <el-input  v-model="scope.row.sealKeeperJob" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-row class="gf-form-btn2" style="margin-left: 25%">
            <el-button type="primary" @click="submit('form')" icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "event-set"
        ,
        props: {
            dmCode: {type: String, required: true}
        },
        data() {
            return {
                busiTypeOptions: [{value: "chanp", label: "产品"}, {value: "kehu", label: "客户"}, {
                    value: "zhuanghu",
                    label: "账户"
                }, {value: "jijin", label: "基金"}],
                options: [{value: "xit", label: "系统数据源"}, {value: "waibu", label: "外部数据源"}, {
                    value: "ces",
                    label: "测试数据源"
                }],
                form: {
                    busiName: '',
                    busiType: '',
                    busiBiaoQ: '',
                    startTime: '',
                    finishTime: ''
                    ,
                    startAllTime: false,
                    involeCase: '',
                    startType: '',
                    isDependOnBusi: false
                    ,
                    execType: 1,
                    itemExecMode: '',
                    itemWeekMode: '',
                    itemSchedule: null
                    ,
                    evidenceTemplateList: [{
                        englishName: 'dsljd',
                        chinaName: '三十多个',
                        sealName: '是',
                        sealKeeperJob: 'dsfs'
                    }, {
                        englishName: 'dsljd',
                        chinaName: '三十多个',
                        sealName: '是',
                        sealKeeperJob: 'dsfs'
                    }, {englishName: 'dsljd', chinaName: '三十多个', sealName: '是', sealKeeperJob: 'dsfs'}]
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
                watch: {}
            }
        }
    }
</script>

<style scoped>

</style>