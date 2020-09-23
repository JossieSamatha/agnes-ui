<template>
    <dv-full-screen-container class="dataVScreen" ref="boardContainer"
             style="width: 100%;height: 100%"
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
                dataVData: JSON.parse(this.$route.query.dataVData),
                compsArr: JSON.parse(this.$route.query.compsArr)
            }
        },
        created(){
            this.$screenfull.toggle()
        },
        methods: {
            getImgPath(imgName){
                if(imgName){
                    let urlStr = require('../../../assets/datav-comp/'+imgName+'.jpg');
                    return  'url('+urlStr+')';
                }
            }
        }
    }
</script>