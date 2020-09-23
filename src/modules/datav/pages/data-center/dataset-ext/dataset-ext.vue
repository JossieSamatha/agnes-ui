<template>
    <div class="template-edit-page">
        <div class="template-config-sider">
            <section class="container" @mousedown.stop>
                <div class="header">
                    <div>
                         <span class="header-item" @click="backIndex">
                             <span class="iconImg" v-html="svgImg.return"></span>
                             <span>返回</span>
                         </span>
                    </div>
                    <div>
                         <span class="header-item" @click="saveConfig">
                             <span class="iconImg" v-html="svgImg.save"></span>
                             <span>保存</span>
                         </span>
                    </div>
                </div>
                <dataset-ext-conf ref="datasetExtConf" :dataset="dataset" ></dataset-ext-conf>
            </section>
        </div>
    </div>
</template>

<script>
    import datasetExtConf from './dataset-ext-conf'

    export default {
        props: {
            dataset: {type: Object, required: true}
        },
        components: {
            'dataset-ext-conf': datasetExtConf
        },
        data() {
            return {
                svgImg: this.$svgImg
            }
        },
        methods: {
            backIndex() {
                this.$nav.closeCurrentTab();
            },
            saveConfig() {
                let _this = this;
                _this.$refs.datasetExtConf.saveConfig()
            }
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 46px;
        color: #D3D6E9;
        font-size: 14px;
        border-bottom: 1px solid #000;
        background: #3b3b3b;
    }

    .header > div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .header .header-item:not(.input) {
        width: 80px;
        line-height: 46px;
        text-align: center;
        cursor: pointer;
    }

    .header .header-item + .header-item {
        cursor: pointer;
    }

    .header .header-item input {
        color: #fff;
        background-color: #262626;
        border-color: #262626;
    }

    .header .header-item .iconImg {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 1;
        margin-right: 3px;
        vertical-align: middle;
    }

    .header .header-item .iconImg > svg {
        width: 20px;
        height: 20px;
        fill: #D3D6E9;
    }

    .header .header-item:hover .iconImg > svg {
        fill: #fff;
    }

    .header .header-item:hover {
        background: #000;
    }

    .header .header-item:hover > span {
        color: #fff;
    }
</style>