<template>
    <div style="height: 100%">
        <el-form label-width="60px">
            <el-form-item label="主标题" prop="name">
                <el-input :disabled=true v-model="helpInfo.title" />
            </el-form-item>
            <el-form-item label="发件人" prop="name">
                <gf-dict :disabled=true v-model="helpInfo.cc" dict-type="AGNES_FEEDBACK_MAIL"/>
            </el-form-item>
            <el-form-item label="收件人" prop="name">
                <gf-dict :disabled=true v-model="helpInfo.to" dict-type="AGNES_FEEDBACK_MAIL"/>
            </el-form-item>
        </el-form>
        <quill-editor class="gf-quill-editor"
                      ref="myTextEditor"
                      :options="editorOption"
                      v-model="helpInfo.content"
                      :config="editorOption"
                      style="margin-top: 5px"
        ></quill-editor>

    </div>
</template>
<script>
    import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
    import 'quill/dist/quill.js';
    export default {
        data() {
            return {
                editorOption: {
                },
                helpInfo:{cc:'cc',to:'to',content: "",pkId:"",title:this.$app.session.data.user.userName+'提的关于智能运营平台意见'}
            };
        },
        components: {
            quillEditor
        },
        mounted() {
        },
        methods:{
            async onSave(){
                let mailTo = this.$app.dict.getDictName("AGNES_FEEDBACK_MAIL",'to');
                let mailCc = this.$app.dict.getDictName("AGNES_FEEDBACK_MAIL",'cc');
                let from = {mailTo:mailTo,mailCc:mailCc,content:this.helpInfo.content}
                try {
                    await this.$api.ruleTableApi.feedbackSubmit(from);
                    this.$msg.success('提交成功');
                    this.onCancel();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            },
            onCancel(){
                this.$emit("onClose");
            }
        }
    };
</script>