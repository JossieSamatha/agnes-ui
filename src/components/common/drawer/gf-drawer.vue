<template>
    <el-drawer class="gf-page-drawer" ref="gf-page-drawer"
               :class="className"
               :visible.sync="visible"
               :title="title"
               :with-header="widthHeader"
               :direction="direction"
               :size="width"
               :modal="false"
               :append-to-body="appendToBody"
               :show-close="false"
               :before-close="close"
               :wrapperClosable="wrapperClosable">
        <div slot="title">
            <gf-button class="primary" v-show="okButtonVisible" @click="save">{{okButtonTitle}}</gf-button>
            <gf-button v-show="cancelButtonVisible" @click="cancel" >{{cancelButtonTitle}}</gf-button>
        </div>
        <component ref="component" :is="component" :args="args" @onClose="onClose">
        </component>
    </el-drawer>
</template>

<script>
    export default {
        props: {
            // 类名
            className: {
                type: String,
            },
            // 标题
            title: {
                type: String,
            },
            // 是否显示title
            widthHeader: {
                type: Boolean,
                default: true
            },
            // 抽屉打开方向：ltr（左往右）；rtl（右往左）；ttb（上往下）；btt（下往上）
            direction: {
                type: String,
                default: 'rtl',
            },
            width: {    // 抽屉宽度，默认50%
                type: String,
                default: '50%',
            },
            appendToBody: {
                type: Boolean,
                default: false,
            },
            showClose: {
                type: Boolean,
                default: true,
            },
            wrapperClosable: {
                type: Boolean,
                default: true,
            },
            // 动态component
            component: {
                type: [Object, String],
                required: true,
            },
            args: {    // 传递过来的参数
                type: Object,
                required: false
            },
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
        data() {
            return {
                visible: true
            }
        },
        methods: {
            cancel(){
                this.$refs.component.onCancel();
            },
            save(){
                this.$refs.component.onSave();
            },
            onClose(){
                this.$refs['gf-page-drawer'].closeDrawer();
            },
            close(done) {
                if (done && typeof (done) == 'function') {
                    done()
                } else {
                    this.visible = false
                }
                this.$refs.component.$destroy();
                document.body.removeChild(this.$refs.component.$parent.$el);
            }
        },
    }
</script>
