<template>
    <div class="template-board-container">
        <div class="container">
            <section class="dataVScreen" ref="boardContainer" @dropover.prevent
                     :style="{width: dataVData.content.pageWidth+'px',
                 height: dataVData.content.pageHeight+'px',
                 transform: 'scale('+dataVData.content.pageScale/100+')',
                 'background-image': getImgPath(dataVData.content.bgImage)}">
                <gf-drag-resize v-for="(comp, index) in compsArr" :key="comp.compId"
                                :comp="comp"
                                :compIndex="index"
                                v-bind="comp"
                >
                    <template slot="drag-size-content" slot-scope="props">
                        <component v-if="props.compId" :is="props.compName"
                                   :compOption="props.optional.componentMeta"
                                   :dataOption="props.optional.componentMeta.dataOption"
                                   :position="props.position"
                        ></component>
                    </template>
                </gf-drag-resize>
            </section>
        </div>
        <p class="pageScale">
            <span>大屏缩放(%)</span>
            <el-slider class="pageWSlider"
                       v-model="dataVData.content.pageScale"
                       :min="50" :max="200" show-input>
            </el-slider>
        </p>

    </div>
</template>

<script>
    export default {
        data(){
            return this.$datavTemplateService.data;
        },
        mounted() {
            this.$dataVBus.$on('addComp', this.addComp);
        },
        methods: {
            getImgPath(imgName){
                if(imgName){
                    let urlStr = require('../../../assets/datav-comp/'+imgName+'.jpg');
                    return  'url('+urlStr+')';
                }
            },

            // 添加组件
            addComp({comp, evt, initialPoint}={}){
                const newComp = {
                    compId: this.$agnesUtils.randomString(32),
                    compName: comp.compName,
                    isActive: true,
                    position: {
                        left: evt.screenX - 72 - initialPoint.x,
                        top: evt.screenY - 140 - initialPoint.y,
                        ...this.$utils.deepClone(comp.position)
                    },
                    optional: {
                        type: comp.type,
                        compName: comp.compName,
                        componentMeta: {
                            ...this.$utils.deepClone(comp.componentMeta)
                        }
                    }
                };
                this.$datavTemplateService.addComp(newComp);
                this.$datavTemplateService.setActive(newComp.compId);
                this.$dataVBizFunc.windowResize(this);
            },
        },
        beforeDestroy(){
            this.$dataVBus.$off('addComp');
        }
    }
</script>