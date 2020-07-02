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
        text-align: center;
        border-top: solid 1px #eee;
        padding-top: 15px;
        margin: 0 -20px;
        padding-bottom: 10px;
    }

    .el-dialog .dialog-footer-bar.footer > button {
        padding: 6px 20px;
    }
</style>
