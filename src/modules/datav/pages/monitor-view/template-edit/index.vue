<template>
    <div class="template-edit-page" style="padding: 0px 0px 0px 0px!important;">
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
                <span class="header-item" @click="saveTemplate(true)">
                    <span class="iconImg" v-html="svgImg.check"></span>
                    <span>保存</span>
                </span>
                <span class="header-item" @click="datavPriview">
                    <span class="iconImg" v-html="svgImg.preview"></span>
                    <span>预览</span>
                </span>
            </div>
        </div>
        <div class="content">
            <comp-sider></comp-sider>
            <board-container></board-container>
            <common-conf></common-conf>
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
    import commonConf from './config-sider'
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
            'chart-config-drawer': chartConfigDrawer,
            'common-conf' :commonConf
        },
        mounted(){
            this.$dataVBus.$on('openChartDrawer', this.openChartDrawer);
            this.$dataVBus.$on("closeDrawerCmd", this.closedDrawer);
        },
        methods: {
            backIndex() {
                this.$nav.closeCurrentTab();
            },

            // 大屏预览
            async datavPriview(){
                const ok = await this.$msg.ask(`保存后预览最新内容?`);
                if (ok) {
                    this.saveTemplate(false);
                }
                this.$dataVBus.$emit('datavPriview', this.dataVDataSer.id);
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

            // 大屏数据保存
            async saveTemplate(ifBack){
                const dataVData = this.$lodash.clone(this.$datavTemplateService.data.dataVData);
                const datavComps = this.$lodash.clone(this.$datavTemplateService.data.compsArr);
                dataVData.content.datavComps = this.$lodash.compact(datavComps);
                dataVData.content = JSON.stringify(dataVData.content);

                const p = this.$api.dataVConfig.saveTemplate(dataVData);
                const res = await this.$app.blockingApp(p);
                if(res.ok){
                    if(ifBack){
                        this.backIndex();
                        this.$app.runCmd('datav.getDataVList')
                        this.$msg.success('保存成功!');
                    }
                }else{
                    this.$msg.error(res.message);
                }
            }
        },
        beforeDestroy(){
            this.$dataVBus.$off('openChartDrawer');
            this.$dataVBus.$off('closeDrawerCmd');
        }
    }
</script>