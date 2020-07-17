<template>
    <el-form>
        <el-form-item v-for="(remindItem, index) in remindProps" :key="index">
            <el-checkbox v-model="noticeType[parseInt((remindItem.stepNoticeType-1))]" >{{remindType[parseInt((remindItem.stepNoticeType-1))]}}</el-checkbox>
            <el-form-item v-if="noticeType[parseInt((remindItem.stepNoticeType-1))]">
                <el-form-item label="邮件标题" v-if="remindItem.stepNoticeType==='2'">
                    <gf-input v-model="remindItem.remindTitle"></gf-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <gf-input v-model="remindItem.remindUser"></gf-input>
                </el-form-item>
                <el-form-item label="抄送人" v-if="remindItem.stepNoticeType==='2'">
                    <gf-input v-model="remindItem.remindCc"></gf-input>
                </el-form-item>
                <el-form-item label="密送人" v-if="remindItem.stepNoticeType==='2'">
                    <gf-input v-model="remindItem.remindBcc"></gf-input>
                </el-form-item>
                <el-form-item label="内容">
                    <gf-input v-model="remindItem.remindContent" type="textarea"></gf-input>
                </el-form-item>
            </el-form-item>
        </el-form-item>
    </el-form>
</template>

<script>
    let resetFrom = [
        {
            remindUser: '',
            remindCc: '',
            remindBcc: '',
            remindTitle: '',
            remindContent: '',
            remindMode: '',
            stepNoticeType: '2'
        },{
            remindUser: '',
            remindContent: '',
            stepNoticeType: '3'
        },{
            remindUser: '',
            remindContent: '',
            stepNoticeType: '4'
        }];
    export default {
        name: 'remindDef',
        props: {
            remindProps: {
                type: Array,
            },
        },
        data() {
            return {
                remindType: ['','邮件','短信','微信'],
                noticeType: [null,false,false,false],
                mail: false,
                note: false,
                weChat: false,
            }
        },
        mounted() {
            if(!this.remindProps || this.remindProps.length === 0){
                this.remindProps = resetFrom;
            }
        }
    }
</script>
<style>

</style>