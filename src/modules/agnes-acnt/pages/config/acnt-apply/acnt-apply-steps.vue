<template>
   <div>
        <el-steps direction="vertical">
            <el-step :status = statusList[0] title="申请"></el-step>
            <el-step :status = statusList[1] title="待复核"></el-step>
            <el-step :status = statusList[2] v-if="this.row.isSendOa==1" title="待提交OA"></el-step>
            <el-step :status = statusList[3] title="资料准备"></el-step>
            <el-step :status = statusList[4] v-if="this.row.isSendFinance==1" title="财务流程"></el-step>
            <el-step :status = statusList[5] title="账户待录入"></el-step>
            <el-step :status = statusList[6] title="账户待复核"></el-step>
            <el-step :status = statusList[7] title="已归档"></el-step>
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
                nowStep:3,
                statusList:[
                'wait',
                'wait',
                'wait',
                'wait',
                'wait',
                'wait',
                'wait',
                'wait',
                ]
            }
        },
        beforeMount() {
            let nowStep = this.row.processStatus;
            nowStep = nowStep*1-1;
            for(let i = 0;i<this.statusList.length;i++){
                if(i<nowStep){
                    this.statusList[i] = 'finish'
                }else if(i==nowStep){
                    this.statusList[i] = 'process'
                }
            }
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
