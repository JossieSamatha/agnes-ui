<template>
   <div>
        <el-steps direction="vertical" :active=nowStep>
            <el-step title="申请"></el-step>
            <el-step title="待复核"></el-step>
            <el-step title="待提交OA"></el-step>
            <el-step title="资料准备"></el-step>
            <el-step title="财务流程"></el-step>
            <el-step title="账户待录入"></el-step>
            <el-step title="账户待复核"></el-step>
            <el-step title="已归档"></el-step>
        </el-steps>
    </div>
</template>

<script>

    export default {
        name: "apply-define",
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
                nowStep:'3',
     
            }
        },
        beforeMount() {
            
            // Object.assign(this.detailForm, this.row);
           
        },
        methods: {
           
            // 取消onCancel事件，触发抽屉关闭事件this.$emit("onClose");
            async onCancel() {
                this.$emit("onClose");
            },

        
            // 保存onSave事件，保存操作完成后触发抽屉关闭事件this.$emit("onClose");
            async onSave() {
                this.$emit("onClose");
           
            },
        },

        watch: {
  
        }
    }
</script>
