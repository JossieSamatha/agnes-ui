<template>
    <div class="gridContainer" :class="{edit: isGridEdit, define: isGridDefine}">
        <dash-board-group v-if="isObjExist(gridDataArr)" ref="gridBoardGroup"
                          :boardDataObj="gridDataArr"
                          :boardFrameObj="gridLayout"
                          :isGridDefine="isGridDefine"
                          :isGridEdit="isGridEdit">
        </dash-board-group>
        <div class="elChooseArrContent" v-show="elChooseContentShow">
            <draggable class="dragDiv" :list="elChooseArr" group="unitGroup" :disabled="dragDisabled"
                       @start="elChooseDragStart" @end="elChooseDragEnd">
                <div class="elChooseDiv" v-for="elData in elChooseArr" :key="elData.id">
                    <p class="title">{{elData.label}}</p>
                    <p class="content" :style="{'background-image':'url('+getImgPath(elData.img)+')'}"></p>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            pageId: String
        },
        data() {
            return {
                boardStyleArr: [],   // 面板类型总数据，
                isGridEdit: false,                        // 面板当前是否编辑
                isGridDefine: false,                      // 面板当前是否编辑
                // 面板gird信息
                ifLayoutReady: false,                     // 面板是否加载完成
                gridLayout: {}, // 面板表格布局数据
                gridDataArr: {},         // 面板表格数据
                boardUnitHeight: 0,     // 面板初始单元高度
                gridBoardObj: {},     // 当前选择面板对象
                movedUnitId: -1,      // 当前移动的单元格索引

                // 条形面板选择区
                elChooseArr:[],                                // 条形面板数据
                elChooseContentShow: false,                    // 条形面板是否显示
                dragDisabled: true,
            }
        },
        async created() {
            // 获取面板数据
            const dashboardsRes = await this.$api.compBoardApi.getSignDashboards();

            // 获取对应组件数组
            const compArrRes = await this.$api.compBoardApi.getCompList();

            if(compArrRes){
                this.boardStyleArr = compArrRes.data;
            }

            if(dashboardsRes && dashboardsRes.data.length>0){
                let resData = {};
                if(dashboardsRes.data[0].pageType === this.pageId){
                    resData = dashboardsRes.data[0];
                }else{
                    resData = dashboardsRes.data[1];
                }
                resData.boardData = JSON.parse(resData.comtent);
                this.gridLayout = resData;
                const boardDataArr = JSON.parse(this.gridLayout.comtent);
                boardDataArr.forEach((boardItem)=>{
                    const compObj = this.$lodash.find(this.boardStyleArr, {compId: boardItem.compId});
                    if(compObj){
                        const objArr = [compObj];
                        this.$set(this.gridDataArr, boardItem.i, objArr);
                    }
                })
            }
        },
        watch:{
            isGridEdit(val){
                this.elChooseContentShow = val;
                this.dragDisabled = !val;
            },

            gridDataArr: {
                handler: function (val) {
                    let unitObjIds = [];
                    this.$utils.forEach(val, (obj) => {
                        if(obj[0] && obj[0].compId){
                            unitObjIds.push(obj[0].compId);
                        }
                    });
                    this.elChooseArr = this.boardStyleArr.filter((item)=>{
                        return item.pageType === this.pageId && !unitObjIds.includes(item.compId);
                    });
                },
                deep: true
            }
        },
        methods: {
            isObjExist(obj){
                return Object.keys(obj).length > 0
            },

            // 条形面板选择 -- 开始拖动
            elChooseDragStart(){
                this.movedUnitId = -1;
                this.elChooseContentShow = false;
            },

            // 条形面板选择 -- 拖动结束
            elChooseDragEnd(){
                this.elChooseContentShow = true;
            },

            getImgPath(imgName){
                if(imgName){
                    return require('../../assets/clientView/'+imgName+'.jpg');
                }
            },

            addUnitGrid(newUnitObj) {
                this.$refs.gridBoardGroup.addBoardUnit(newUnitObj);
            }
        }
    }
</script>