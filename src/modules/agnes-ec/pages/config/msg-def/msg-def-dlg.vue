<template>
    <el-form ref="form" :disabled="mode==='view'" :model="form" :rules="rules" label-width="110px"  style="margin-left: 25%;">
        <el-form-item label="消息定义" prop="msgName">
            <gf-input v-model.trim="form.msgName"  placeholder="渠道收件消息" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="topic" >
            <gf-dict v-model="form.msgTopic" dict-type="AC_MSG_TOPIC" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="消息对象类型" >
            <el-select v-model="form.msgObjId" placeholder="请选择" style="width: 50%">
                <el-option
                        v-for="item in msgObjOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-row class="gf-form-btn2" v-if="mode!=='view'" style="margin-left: 20%" >
            <el-button type="primary" @click="save()"  icon="el-icon-success">提交</el-button>
            <el-button @click="close" icon="el-icon-circle-close">取消</el-button>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "msg-def-dlg",
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
                form:{msgName:'',msgTopic:'',msgObjId:''},
                msgObjOptions:[],
                rules: {
                    msgName: [
                        {required: true, message: '消息定义名称必填', trigger: 'blur'},
                    ]
                }
            }
        },
        beforeMount() {
            this.fetchObjType();
            Object.assign(this.form, this.row);
        },
        methods: {
            async fetchObjType() {
                const resp = await this.$api.modelConfigApi.getModelTypeList();
                let objList = resp.data;
                objList.forEach((item)=>{
                    this.msgObjOptions.push({value:item.modelTypeId,label:item.typeName});
                });
            },
            async save() {
                const ok = await this.$refs['form'].validate();
                if (!ok) {
                    return;
                }
                try {
                    const p = this.$api.msgDefineApi.saveMsg(this.form);
                    await this.$app.blockingApp(p);

                    if (this.actionOk) {
                        await this.actionOk();
                    }
                    this.$msg.success('保存成功');
                    this.$dialog.close(this);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            close(){
                this.$dialog.close(this.$parent);
            }
        },
        watch:{
        }
    }
</script>