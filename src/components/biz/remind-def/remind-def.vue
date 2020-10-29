<template>
    <div class="remind-comp">
        <el-tabs type="card" style="height: 290px;">
            <el-tab-pane v-for="(remindItem, remindIndex) in remindData" :key="remindIndex" :name="remindIndex+''">
                <span class="tab-label" slot="label">
                    <em :class="ifFill(remindItem, remindIndex) ? 'el-icon-circle-check' : 'el-icon-time'"
                       :style="{color: ifFill(remindItem, remindIndex) ? '#67C23A' : '#999'}"></em>
                    <span>{{remindType[remindIndex].label}}</span>
                </span>
                <el-form size="small" label-width="100px " :model="remindItem" style="padding: 0">
                    <el-form-item class="is-required" label="邮件标题" prop="remindTitle" v-if="remindIndex === 0">
                        <gf-input v-model="remindItem.remindTitle"></gf-input>
                    </el-form-item>
                    <el-form-item class="is-required" label="收件人" prop="remindUser">
                        <gf-input v-model="remindItem.remindUser"></gf-input>
                    </el-form-item>
                    <el-form-item label="抄送人" prop="remindCc" v-if="remindIndex === 0">
                        <gf-input v-model="remindItem.remindCc"></gf-input>
                    </el-form-item>
                    <el-form-item label="密送人" prop="remindBcc" v-if="remindIndex === 0">
                        <gf-input v-model="remindItem.remindBcc"></gf-input>
                    </el-form-item>
                    <el-form-item class="is-required" label="内容" prop="remindContent">
                        <gf-input v-model="remindItem.remindContent" type="textarea"></gf-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <dialog-footer :onSave="saveRemind"></dialog-footer>
    </div>
</template>

<script>
    export default {
        name: 'remind-def',
        props: {
            remindProp: Array,
            remindSort:{
                type: String,},
            actionOk: Function
        },
        data() {
            return {
                mailObj:{
                    remindUser: '',
                    remindCc: '',
                    remindBcc: '',
                    remindTitle: '',
                    remindContent: '',
                    remindMode: '2',
                },
                messageObj: {
                    remindUser: '',
                    remindContent: '',
                    remindMode: '3',
                },
                wechatObj: {
                    remindUser: '',
                    remindContent: '',
                    remindMode: '4',
                },
                remindType: [{key: 'mail', label: '邮件'}, {key: 'message', label: '短信'}, {key: 'wechat', label: '微信'}],
                args: this.$attrs,
                remindData: [],

            }
        },
        created() {
            this.remindData = JSON.parse(JSON.stringify([this.mailObj, this.messageObj, this.wechatObj]));
        },
        mounted() {
            if (this.remindProp && this.remindProp.length > 0) {
                this.remindProp.forEach((propItem)=>{
                    const itemIndex = parseInt(propItem.remindMode) - 2;
                    this.remindData.splice(itemIndex, 1, propItem);
                });
            }
        },
        methods: {
            // 当前信息是否补充完整
            ifFill(remindItem, remindIndex) {
                let unFill = false;
                if (remindIndex === 0) {
                    unFill = !(remindItem.remindTitle && remindItem.remindUser && remindItem.remindContent);
                } else {
                    unFill = !(remindItem.remindUser && remindItem.remindContent);
                }
                remindItem.fillFlag = !unFill;
                return !unFill;
            },

            // 保存组件信息
            async saveRemind() {
                const remindDataCopy = this.remindData.filter((remindItem) => {
                    return remindItem.fillFlag
                });
                // debugger;
                if(remindDataCopy.length === 3){
                    await this.actionOk(remindDataCopy, this.remindSort);
                }else{
                    const ok = await this.$msg.ask(`必填项未补充完整的告警方式类型数据将会丢失, 是否继续?`);
                    if (ok) {
                        if (this.actionOk) {
                            await this.actionOk(remindDataCopy,this.remindSort);
                        }
                    }
                }
                this.$dialog.close(this);
            }
        }
    }
</script>