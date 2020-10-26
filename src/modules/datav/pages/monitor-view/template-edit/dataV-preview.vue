<template>
    <dv-full-screen-container class="dataVScreen" ref="boardContainer" v-if="dataReady"
             style="width: 100%;height: 100%;background-repeat: no-repeat;background-size: cover;"
             :style="{'background-image': getImgPath(dataVData.content.bgImage)}">
        <gf-drag-resize v-for="(comp, index) in compsArr" :key="comp.compId"
                        :comp="comp"
                        :compIndex="index"
                        :preview="true"
                        v-bind="comp"
        >
            <template slot="drag-size-content" slot-scope="props">
                <component v-if="props.compId" :is="props.compName"
                           :compOption="props.optional.componentMeta"
                           :position="props.position"
                ></component>
            </template>
        </gf-drag-resize>
    </dv-full-screen-container>
</template>

<script>
    export default {
        data() {
            return {
                dataVData: {},
                compsArr: [],
                templateId: '',
                dataReady: false
            }
        },
        created(){
            this.$screenfull.toggle();
            this.getDatavDetail(this.$route.query.templateId);
        },
        methods: {
            getImgPath(imgName){
                if(imgName){
                    let urlStr = require('../../../assets/datav-comp/'+imgName+'.jpg');
                    return  'url('+urlStr+')';
                }
            },

            // 获取大屏数据详情
            async getDatavDetail(templateId){
                const res = this.$api.dataVConfig.getTemplateDetail(templateId);
                const detail = await this.$app.blockingApp(res);
                if(detail && detail.data) {
                    let dataVObj = detail.data;
                    const pageData = this.$utils.fromJson(dataVObj.content);
                    let compArr = [];
                    if( Object.prototype.hasOwnProperty.call(pageData, 'datavComps')){
                        compArr = pageData.datavComps;
                        delete pageData.datavComps;
                    }
                    dataVObj.content = pageData;
                    this.dataVData = dataVObj;
                    this.compsArr = compArr;
                    this.dataReady = true;
                }

            }
        }
    }
</script>