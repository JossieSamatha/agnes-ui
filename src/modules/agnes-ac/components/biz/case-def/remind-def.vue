<template>

    <el-tabs type="card" style="height: 290px;">
        <el-tab-pane v-for="(remindItem, remindIndex) in remindData" :key="remindIndex" :label="remindType[remindIndex]" :name="remindIndex">
            <el-form size="small" label-width="100px " :model="remindItem" style="padding: 0">
                <el-form-item label="邮件标题" prop="remindUser" v-if="remindIndex === 0">
                    <gf-input v-model="remindItem.remindTitle"></gf-input>
                </el-form-item>
                <el-form-item label="收件人" prop="remindUser">
                    <gf-input v-model="remindItem.remindUser"></gf-input>
                </el-form-item>
                <el-form-item label="抄送人" prop="remindCc" v-if="remindIndex === 0">
                    <gf-input v-model="remindItem.remindCc"></gf-input>
                </el-form-item>
                <el-form-item label="密送人" prop="remindBcc" v-if="remindIndex === 0">
                    <gf-input v-model="remindItem.remindBcc"></gf-input>
                </el-form-item>
                <el-form-item label="内容" prop="remindContent">
                    <gf-input v-model="remindItem.remindContent" type="textarea"></gf-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
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
                remindType: ['邮件','短信','微信'],
                remindData: resetFrom
            }
        }
    }
</script>
<style>

</style>