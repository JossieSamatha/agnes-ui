<template>
    <div class="template-edit-page">
        <div class="header">
            <div>
                 <span class="header-item" @click="backIndex">
                    <span class="iconImg" v-html="svgImg.return"></span>
                     <span>返回</span>
                 </span>
                <span class="header-item input">
                    <el-input v-model="datavConf.viewName"></el-input>
                </span>
            </div>
            <div>
                <span class="header-item">
                    <span class="iconImg" v-html="svgImg.check"></span>
                    <span>保存</span>
                </span>
                <span class="header-item" @click="priviewDatav">
                    <span class="iconImg" v-html="svgImg.preview"></span>
                    <span>切换</span>
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
            <comp-sider :datavConf="datavConf" @changeBg="changeBg"></comp-sider>
            <board-container :datavConf="datavConf" :optionType="optionType" @activeComp="activeComp"></board-container>
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
            optionType: {
                type: String
            },
        },
        data() {
            return {
                svgImg: this.$dataVSvg,
                activeComp: {},
                isPreview: true
            }
        },
        components: {
            'comp-sider': compSider,
            'config-sider': configSider,
            'board-container': boardContainer
        },
        computed: {
            datavConf(){
                return this.$store.state.dataVTemplate.datavConf;
            }
        },
        methods: {
            getImgPath(imgName){
                let urlStr = require('../../../assets/datav-comp/'+imgName+'.jpg');
                return  'url('+urlStr+')';
            },

            backIndex() {
                this.$nav.closeCurrentTab();
            },

            changeBg(bg){
                this.datavConf.bgImage = bg;
            },


            priviewDatav(){
            }

        },
    }
</script>