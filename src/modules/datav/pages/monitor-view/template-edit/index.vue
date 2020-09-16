<template>
    <div class="template-edit-page">
        <div class="header">
            <div>
                 <span class="header-item" @click="backIndex">
                    <span class="iconImg" v-html="svgImg.return"></span>
                     <span>返回</span>
                 </span>
                <span class="header-item input">
                    <el-input v-model="dataVDataSer.title"></el-input>
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
            <board-container></board-container>
            <el-drawer ref="configDrawer" class="config-drawer"
                       :withHeader="false"
                       :visible.sync="configDrawer"
                       :modal="false"
                       :destroy-on-close="true"
                       direction="rtl"
                       size="100%">
                <chart-config-drawer ref="configSider"></chart-config-drawer>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import compSider from './comp-sider';
    import boardContainer from './board-container';
    import chartConfigDrawer from './chart-config-drawer'
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
                activeComp: {type: ''},
                isPreview: true,
                configDrawer: false,
                dataVDataSer: this.$datavTemplateService.data.dataVData
            }
        },
        components: {
            'comp-sider': compSider,
            'board-container': boardContainer,
            'chart-config-drawer': chartConfigDrawer
        },
        mounted(){
            this.$dataVBus.$on('openChartDrawer', this.openChartDrawer);
        },
        methods: {
            backIndex() {
                this.$nav.closeCurrentTab();
            },

            priviewDatav(){
            },

            // 打开图表配置抽屉
            openChartDrawer(curComp) {
                this.activeComp = curComp;
                if (curComp.comp.type == 'chart' || curComp.comp.type == 'grid') {
                    this.configDrawer = true;
                }
            },

            closedDrawer() {
                this.$refs.configDrawer.closeDrawer();
            },

        },
    }
</script>