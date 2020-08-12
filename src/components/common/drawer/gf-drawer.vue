<template>
    <el-drawer class="gf-page-drawer" ref="gf-page-drawer"
               :class="className"
               :visible.sync="visible"
               :with-header="widthHeader"
               :direction="direction"
               :size="width"
               :modal="false"
               :append-to-body="appendToBody"
               :show-close="false"
               :before-close="close"
               :wrapperClosable="wrapperClosable">
        <template slot="title">
            <span class="drawer-title">{{drawerTitle}}</span>
            <span class="option-btn">
                <template v-if="customOpBtn && customOpBtn.length>0">
                    <gf-button v-for="(opBtn, opIndex) in customOpBtn"
                               :key="opIndex"
                               :class="opBtn.className"
                               @click="opBtnClick(opBtn.action)">{{opBtn.title}}</gf-button>
                </template>
                <template v-else>
                    <gf-button class="primary" v-show="okButtonVisible" @click="save">{{okButtonTitle}}</gf-button>
                    <gf-button v-show="cancelButtonVisible" @click="cancel" >{{cancelButtonTitle}}</gf-button>
                </template>
            </span>
        </template>
        <component ref="component" :is="component" v-bind="args" @onClose="onClose">
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
                type: Array,
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
            customOpBtn: {   // 自定义抽屉操作按钮
                type: Array
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
                visible: true,
                modeArr: {add: '添加', edit: '编辑', view: '查看'},
                needAsk: true
            }
        },
        computed: {
            drawerTitle(){
                if(!this.title) return '';
                if(this.title.length>1){
                    return this.title[0] + '-' + this.modeArr[this.title[1]];
                }else{
                    return this.title[0];
                }
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
                this.needAsk = false;
                this.$refs['gf-page-drawer'].closeDrawer();
            },
            opBtnClick(actionName){
                this.$refs.component[actionName]();
            },
            async close(done) {
                if(this.needAsk && this.args.mode !== 'view'){
                    const ok = await this.$msg.ask('是否确认离开?');
                    if (!ok) {
                        return
                    }
                }
                try {
                    if (done && typeof (done) == 'function') {
                        done()
                    } else {
                        this.visible = false
                    }
                    this.$refs.component.$destroy();
                    document.body.removeChild(this.$refs.component.$parent.$el);
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
    }
</script>
