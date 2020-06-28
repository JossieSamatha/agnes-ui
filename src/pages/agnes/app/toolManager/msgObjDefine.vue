<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px"  style="margin-left: 30%;">
        <el-form-item label="消息对象" prop="msgName">
            <gf-input v-model.trim="form.msgName"  placeholder="渠道收件消息" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="消息对象" >
            <el-table :data="evidenceTemplateList" stripe border style="width: 50%" size="mini">
                <el-table-column   label="英文" min-width="40"  align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.englishName'">
                            <el-input  v-model="scope.row.englishName" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column   label="中文" min-width="40"  align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.chinaName'">
                            <el-input  v-model="scope.row.chinaName" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>-
                <el-table-column   label="是否必填" min-width="30"  align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealName'">
                            <el-input  v-model="scope.row.sealName" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column   label="字段值" min-width="50"  align="center">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperJob'">
                            <el-input  v-model="scope.row.sealKeeperJob" size="small"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="40" header-align="center" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-delete" @click="removeRow(scope.row, scope.$index)" style="font-size: 16px;"></i>
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
        name: "msgobj-define",
        data() {
            return {
                form:{msgName:'',msgTopic:'',msgObjId:''},
                msgObjOptions:[],
                msgTopicOptions:[{value:"1",label:"消息topic1"},{value:"2",label:"消息topic2"}],
                options:[{value:"xit",label:"渠道类收件对象"},{value:"waibu",label:"文件到达对象"}],
                rules: {
                    busiName: [
                        {required: true, message: '业务参数名称必填', trigger: 'blur'},
                    ],
                    busiType: [
                        {required: true, message: '请选择业务参数类型', trigger: 'blur'}
                    ],
                    dataSource: [
                        {required: true, message: '请选择数据源', trigger: 'blur'}
                    ]
                },
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
            }
        },
        mounted: function () {
            // this.init();
        },
        methods: {
            init() {
                var that = this;
                this.$api.AgnesToolManageApi.queryMsgObjList().then(function (resp) {
                    if (resp && resp.status) {
                        var list = resp.data;
                        for (let item in list) {
                            var option = {value:item.msgObjId,label:item.msgObjName};
                            that.msgObjOptions.push(option);
                        }
                    }
                });
            },
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
            removeRow(row, index) {
                this.$confirm('此操作将删除该字段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    alert(row);
                    alert(index);
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            close(){

            }
        },
        watch:{
        }
    }
</script>