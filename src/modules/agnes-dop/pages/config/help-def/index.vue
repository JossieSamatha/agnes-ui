<template>
    <div>
        <div>
            <el-button style="float: right;" @click="onSave"> 保存 </el-button>
        </div>

        <div>
            <quill-editor ref="myTextEditor" :options="editorOption" v-model="helpInfo.content" :config="editorOption"></quill-editor>
        </div>
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