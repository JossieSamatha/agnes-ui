<template>
    <div class="template-comp-sider" v-clickoutside="outsideClick">
        <ul class="comp-container">
            <li class="comp-item" v-for="categoryComp in compArr" :key="categoryComp.category"
                :class="activeCategoryComp == categoryComp.category?'active':''"
                @click="categoryChoose(categoryComp)">
                <el-tooltip class="item" effect="dark" :content="categoryComp.label" placement="right">
                    <em class="iconImg" v-html="svgImg[categoryComp.icon]"></em>
                </el-tooltip>
            </li>
        </ul>
        <div class="comp-panel" v-show="compPanelShow">
            <div class="header">
                <span class="title">{{activeCollapseObj.label}}</span>
                <span class="iconImg fa fa-close" @click="compPanelShow = false"></span>
            </div>
            <div class="content" v-if="activeCollapseObj.components">
                <draggable class="compUl" v-model="activeCollapseObj.components" group="unitGroup"
                           @start="compDragStart">
                    <div class="compLi" v-for="comp in activeCollapseObj.components" :key="comp.icon"
                                      @mousedown="chooseComp($event, comp)"
                                      @dragend="compDragEnd">
                        <div class="comp-thumbnail">
                            <img class="comp-img" :src="getImgPath(comp.icon+'.png')" alt="comp-icon" width="auto"
                                 :height="comp.compName === 'water-pond' ? '50px' : 'auto'" />
                        </div>
                        <span class="comp-label">{{comp.label}}</span>
                    </div>
                </draggable>
            </div>
            <div class="content pageInfo" v-else>
                <div class="bgContent">
                    <img class="bg-img" :src="getImgPath(activeBgImg+'.jpg')" alt="bg-img-bc"/>
                    <el-popover popper-class="bgListPop"
                            placement="right"
                            title="更换大屏背景"
                            trigger="click">
                        <div class="bgList">
                            <div v-for="(bgImg, index) in bgImgArr" :key="index">
                                <img class="bg-img" :src="getImgPath(bgImg+'.jpg')" alt="bg-img"/>
                                <p @click="chooseBg(bgImg)">选择</p>
                            </div>
                        </div>
                        <p class="showBgBtn" slot="reference" @click="showBgList">更换主题背景</p>
                    </el-popover>
                </div>
                <div>
                    <p class="title">大屏尺寸</p>
                    <div class="line">
                        <span style="margin-right: 5px">宽</span>
                        <el-input v-model="dataVData.content.pageWidth"></el-input>
                        <span style="margin: 0 5px 0 10px">高</span>
                        <el-input v-model="dataVData.content.pageHeight"></el-input>
                    </div>
                </div>
                <div>
                    <p class="title">标题</p>
                    <el-input v-model="dataVData.title"></el-input>
                </div>
                <div>
                    <p class="title">标签</p>
                    <el-input v-model="dataVData.label"></el-input>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import mockDataVData from "../mockDataVData";
    export default {
        data() {
            return {
                svgImg: this.$dataVSvg,
                compArr: mockDataVData().compArr,
                bgImgArr: ['bg0','bg1','bg2','bg3','bg4','bg5','bg6','bg7'],
                bgListShow: false,
                activeBgImg: 'bg0',
                activeCategoryComp: '',
                activeCollapse: {},
                activeCollapseObj: {},
                compPanelShow: false,
                curDragComp: {},
                initialPoint: {
                    x: -1,
                    y: -1
                }
            }
        },
        computed: {
            dataVData: {
                get() {
                    return this.$datavTemplateService.data.dataVData;
                },
                set(val){
                    this.$datavTemplateService.data.dataVData = val;
                }
            }
        },
        methods: {
            categoryChoose(categoryComp) {
                this.activeCategoryComp = categoryComp.category;
                this.activeCollapseObj = categoryComp;
                if(!this.activeCollapse[categoryComp.category]){
                    this.$set(this.activeCollapse, categoryComp.category, 0);
                }
                this.compPanelShow = true;
            },

            getImgPath(imgName){
                return require('../../../assets/datav-comp/'+imgName);
            },

            compDragStart(){
                this.compPanelShow = false;
            },

            compDragEnd(evt){
                this.$dataVBus.$emit('addComp', {comp: this.curDragComp, evt , initialPoint: this.initialPoint});
            },

            chooseComp(evt, comp){
                this.initialPoint.x = evt.layerX;
                this.initialPoint.y = evt.layerY+36;
                this.curDragComp = comp;
            },

            showBgList(){
                this.bgListShow = true;
            },

            chooseBg(bg){
                this.activeBgImg = bg;
                this.$datavTemplateService.data.dataVData.content.bgImage = bg;
            },

            outsideClick(){
                this.compPanelShow = false;
            }
        },
    }
</script>