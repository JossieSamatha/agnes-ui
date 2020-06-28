<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px"  style="margin-left: 30%;">
        <el-form-item label="消息定义" prop="msgName">
            <gf-input v-model.trim="form.msgName"  placeholder="渠道收件消息" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="topic" prop="msgTopic">
            <!--            <gf-dict v-model="form.msgTopic" dict-type="sto" />-->
            <el-select v-model="form.msgTopic" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in msgTopicOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="消息对象类型" prop="msgObjId">
            <el-select v-model="form.msgObjId" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-row class="gf-form-btn2" style="margin-left: 25%">
            <el-button type="primary" @click="submit('form')" icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "msg-define",
        data() {
            return {
                form:{msgName:'',msgTopic:'',msgObjId:''},
                msgObjOptions:[],
                msgTopicOptions:[{value:"1",label:"消息topic1"},{value:"2",label:"消息topic2"}],
                options:[{value:"xit",label:"渠道类收件对象"},{value:"waibu",label:"文件到达对象"}],
                rules: {
                    msgName: [
                        {required: true, message: '消息定义名称必填', trigger: 'blur'},
                    ],
                    msgTopic: [
                        {required: true, message: '请选择topic', trigger: 'blur'}
                    ],
                    msgObjId: [
                        {required: true, message: '请选择消息对象类型', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted: function () {
            // this.init();
        },
        methods: {
            init() {
                var that = this;
                this.$api.AgnesToolManageApi.queryMsgObjList().then(function (resp) {
                    if (resp.data && resp.data.status=='0') {
                        var list = resp.data.data;
                        for (let item in list) {
                            var option = {value:item.msgObjId,label:item.msgObjName};
                            that.msgObjOptions.push(option);
                        }
                    }
                });
            },
            submit(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    let data = that.$utils.deepClone(that.form);
                    this.$api.AicmPluginFuncApi.add(data).then(function (resp) {
                        if (resp && resp.ok) {
                            that.$message.success("保存成功");
                        } else {
                            that.$message.error(resp.message || '保存失败');
                        }
                    });
                });
            },
            close(){

            }
        },
        watch:{
        }
    }
</script>