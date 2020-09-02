<template>
    <div class="template-config-sider" :class="menuFold?'fold':''">
        <i class="menu-fold" v-html="svgImg['menu-fold']" @click="menuFold = !menuFold"></i>
        <section class="container" @mousedown.stop>
            <el-tabs class="darkTab" v-model="activeTab" type="border-card">
                <el-tab-pane label="显示配置" name="displayconf">
                    <section class="confSection">
                        <common-position-conf></common-position-conf>
                    </section>
                    <section class="confSection">
                        <comp-conf></comp-conf>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="数据配置" name="dataConf">配置管理</el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>

<script>
    import commonPositionConf from './conf-section/common-position-conf'
    import compConf from './conf-section/comp-conf'
    export default {
        data() {
            return {
                svgImg: this.$dataVSvg,
                menuFold: false,
                activeTab: 'displayconf'
            }
        },
        components: {
            'common-position-conf': commonPositionConf,
            'comp-conf': compConf
        }

    }
</script>