<template>
    <div class="template-board-container">
        <section ref="boardContainer" class="container" @dropover.prevent
                 :style="{'background-image': getImgPath(dataVData.content.bgImage)}">
            <gf-drag-resize v-for="(comp, index) in compsArr" :key="comp.compId"
                            :comp="comp"
                            :compIndex="index"
                            v-bind="comp"
            >
                <template slot="drag-size-content" slot-scope="props">
                    <component v-if="props.compId" :is="props.compName" :compOption="props.optional.componentMeta"></component>
                </template>
            </gf-drag-resize>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return this.$datavTemplateService.data;
        },
        mounted() {
            this.$dataVBus.$on('addComp', this.addComp);
            this.$app.registerCmd('compDataChange', this.compDataChange);
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
                        compType: comp.compName,
                        componentMeta: {
                            ...this.$utils.deepClone(comp.componentMeta)
                        }
                    }
                };
                this.$datavTemplateService.addComp(newComp);
                this.$datavTemplateService.setActive(newComp.compId);
                this.$dataVBizFunc.windowResize(this);
            },
        }
    }
</script>