<template>
    <div class="template-board-container">
        <section ref="boardContainer" class="container" @dropover.prevent
                 :style="{'background-image': getImgPath(boardContent.bgImage)}">
            <gf-drag-resize v-for="(comp, index) in datavComps" :key="comp.compId"
                            :comp="comp"
                            :compIndex="index"
                            v-bind="comp"
            >
                <template slot="drag-size-content">
                    <component :is="comp.compName" :compOption="comp"></component>
                </template>
            </gf-drag-resize>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                boardContent: {},
                datavComps: [],
            }
        },
        mounted() {
            this.boardContent = this.$datavTemplateService.dataVData.content;
            this.datavComps = this.$datavTemplateService.compsArr;
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
                    isActive: false,
                    position: {
                        left: evt.screenX - 72 - initialPoint.x,
                        top: evt.screenY - 140 - initialPoint.y,
                        ...this.$utils.deepClone(comp.position)
                    },
                    optional: {
                        type: comp.type,
                        compType: comp.compName,
                        ...this.$utils.deepClone(comp.componentMeta)
                    }
                };
                this.$datavTemplateService.compsArr.push(newComp);
            },
        }
    }
</script>