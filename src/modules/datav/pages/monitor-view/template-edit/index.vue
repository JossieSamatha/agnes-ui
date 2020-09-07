<template>
    <div class="template-edit-page">
        <div class="header">
            <div>
                 <span class="header-item" @click="backIndex">
                    <span class="iconImg" v-html="svgImg.return"></span>
                     <span>返回</span>
                 </span>
                <span class="header-item input">
                    <el-input v-model="dataVTitle"></el-input>
                </span>
            </div>
            <div>
                <span class="header-item">
                    <span class="iconImg" v-html="svgImg.check"></span>
                    <span>保存</span>
                </span>
                <span class="header-item" @click="priviewDatav">
                    <span class="iconImg" v-html="svgImg.preview"></span>
                    <span>预览</span>
                </span>
                <span class="header-item">
                    <span class="iconImg" v-html="svgImg.download"></span>
                    <span>下载</span>
                </span>
                <span class="header-item">
                    <span class="iconImg" v-html="svgImg.share"></span>
                    <span>分享</span>
                </span>
            </div>
        </div>
        <div class="content">
            <comp-sider></comp-sider>
            <board-container @activeComp="activeComp"></board-container>
            <config-sider></config-sider>
        </div>
    </div>
</template>

<script>
    import compSider from './comp-sider';
    import configSider from './config-sider';
    import boardContainer from './board-container';
    export default {
        props: {
            dataVData: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                svgImg: this.$dataVSvg,
                activeComp: {},
                isPreview: true,
            }
        },
        components: {
            'comp-sider': compSider,
            'config-sider': configSider,
            'board-container': boardContainer
        },
        computed: {
            dataVTitle() {
                return this.$datavTemplateService.dataVData.title;
            },
        },
        methods: {
            backIndex() {
                this.$nav.closeCurrentTab();
            },

            priviewDatav(){
            }

        },
    }
</script>