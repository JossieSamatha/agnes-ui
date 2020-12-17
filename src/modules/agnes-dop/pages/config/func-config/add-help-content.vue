<template>
    <div style="height: 100%">
        <quill-editor class="gf-quill-editor"
                      ref="myTextEditor"
                      :options="editorOption"
                      v-model="content"
                      :config="editorOption"
                      style="height: 400px"
        ></quill-editor>
        <dialog-footer :on-save="onSave"></dialog-footer>
    </div>
</template>
<script>
    import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
    import 'quill/dist/quill.js';
    export default {
        props: {
            data:  Object
        },
        data() {
            return {
                editorOption: {
                },
                content:'',
            };
        },
        components: {
            quillEditor
        },
        beforeMount() {
            this.content=this.data.content;
        },
        methods:{
            async onSave(){
                this.data.content=this.content;
                this.$dialog.close(this.$parent);
            },
        }
    };
</script>
