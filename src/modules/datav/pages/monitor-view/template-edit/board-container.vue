<template>
    <div class="template-board-container">
        <section ref="boardContainer" class="container" @dropover.prevent
                 :style="{'background-image': getImgPath(boardData.bgImage)}">
            <gf-drag-resize v-for="(comp, index) in datavComps" :key="comp.compId" :comp="comp" v-bind="comp">
                <template slot="drag-size-content">
                    <component :is="comp.compName" :compOption="comp"></component>
                </template>
            </gf-drag-resize>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            boardData: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
            }
        },
        mounted() {
            this.$app.registerCmd('addComp', this.addComp);
            this.$app.registerCmd('compDataChange', this.compDataChange);
        },
        computed: {
            datavComps() {
                return this.boardData.datavComps;
            }
        },
        methods: {
            getImgPath(imgName){
                let urlStr = require('../../../assets/datav-comp/'+imgName+'.jpg');
                return  'url('+urlStr+')';
            },
        }
    }
</script>