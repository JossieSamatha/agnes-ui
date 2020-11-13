<template>
    <div style="height: 100%">
        <p class="action-panel" style="text-align: right">
            <el-button type="primary" @click="onSave"> 保存 </el-button>
        </p>
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
                helpInfo:{content: "",pkId:""}
            };
        },
        components: {
            quillEditor
        },
        mounted() {
            this.init();
        },
        methods:{
            async init(){
                try {
                    const resp = await this.$api.helpDefApi.getHelpInfo();
                    if(resp.data){
                        this.helpInfo = resp.data;
                    }
                } catch (reason) {
                    this.$msg.error(reason);
                }

            },
            async onSave(){
                try {
                     await this.$api.helpDefApi.saveHelpInfo(this.helpInfo);
                     this.$msg.success("提交成功")
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    };
</script>