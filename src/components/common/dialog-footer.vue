<template>
    <div class="dialog-footer-bar footer" slot="content">
        <gf-button @click="cancel" v-show="cancelButtonVisible">{{cancelButtonTitle}}</gf-button>
        <gf-button type="primary" v-show="okButtonVisible" @click="onSave">{{okButtonTitle}}</gf-button>
    </div>
</template>

<script>
    export default {
        props: {
            onCancel: Function,
            onSave: Function,

            cancelButtonVisible: {
                type: Boolean,
                default: true
            },
            cancelButtonTitle: {
                type: String,
                default: '取消'
            },
            okButtonVisible: {
                type: Boolean,
                default: true
            },
            okButtonTitle: {
                type: String,
                default: '保存'
            }
        },
        methods: {
            cancel() {
                if (this.onCancel) {
                    this.onCancel();
                } else {
                    this.$dialog.close(this.$parent);
                }
            }
        }
    }
</script>

<style>
    .dialog-footer-bar {
        position: absolute;
        text-align: center;
        right: 20px;
        top: 10px;
    }

    .el-dialog .dialog-footer-bar.footer > button {
        padding: 8px 20px;
    }

    .el-dialog .dialog-footer-bar.footer > button+button {
        margin-left: 3px;
    }

    .el-dialog .dialog-footer-bar.footer > button.el-button--primary {
        border-color: #0f5eff;
        background-color: #0f5eff;
    }
</style>
