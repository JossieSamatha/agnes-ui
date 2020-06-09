<template>
    <div class="datav_client_view" ref="datav_client_view">
        <div class="topPanel">
            <div class="optionPanel">
                <el-input class="searchInput" v-model="clientValue" clearable placeholder="客户搜索" suffix-icon="el-icon-search">
                </el-input>
                <div>
                    <span class="boardeEdit" v-if="!isGridEdit && !isGridDefine" @click="boardEdit">配置看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEdit">切换看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEditFinish('content')">完成配置</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="addUnitGrid">新增面板</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="boardEditFinish('layout')">保存面板</span>
                </div>
            </div>
            <div class="content">
                <p v-for="(info,index) in guestInfo" :key="index">
                    <label>{{info.label}}：</label>
                    <span>{{info.value}}</span>
                </p>
            </div>
        </div>
        <grid-container ref="gridContainer"
                :isGridDefine="isGridDefine"
                :isGridEdit="isGridEdit">
        </grid-container>
        <board-choose ref="boardChoose"
                :showDialog="boardChooseDialog"
                @closeDialog="closeDialog"
                @boardChooseSure="boardChooseSure" @defineBoard="defineBoard">
        </board-choose>
    </div>
</template>

<script>
    import boardData from '../boardData';
    import gridContainer from './grid-container';
    import boardChoose from './board-choose';
    export default {
        data() {
            return {
                guestInfo: boardData.guestInfo,
                clientValue: '',
                isGridDefine: false,            // 面板当前是否编辑
                isGridEdit: false,              // 面板当前是否编辑
                boardChooseDialog: false,       // 面板选择弹框
            }
        },
        components: {
            'grid-container': gridContainer,
            'board-choose': boardChoose
        },
        mounted(){

        },
        watch:{

        },
        methods: {

            // 配置看板 -- 点击展开弹窗 -- 查询自定义面板数据
            boardEdit(){
                this.boardChooseDialog = true;
            },

            // 配置看板 -- 自定义面板
            defineBoard() {
                this.isGridEdit = false;
                this.isGridDefine = true;
                this.$refs.gridContainer.isGridEdit = false;
                this.$refs.gridContainer.isGridDefine = true;
                this.boardChooseDialog = false;
            },

            // 面板grid -- 新增单元
            addUnitGrid() {
                var newUnitId = this.$caseUtils.randomString(6);
                var newUnitObj = {
                    "x": 0,
                    "y": 0,
                    "w": 2,
                    "h": 2,
                    "i": newUnitId
                };
                this.$set(this.$refs.gridContainer.gridDataArr,newUnitId,[]);
                this.$refs.gridContainer.addUnitGrid(newUnitObj);
            },

            // 关闭弹窗
            closeDialog(){
                this.boardChooseDialog = false;
            },

            // 面板完成编辑
            boardEditFinish(editType){
                if(editType == 'content'){
                    this.isGridEdit = false;
                    this.$refs.gridContainer.isGridEdit = false;
                }else if(editType == 'layout'){
                    this.isGridDefine = false;
                    this.$refs.gridContainer.isGridDefine = false;
                    var newdDefineBoard = {
                        boardId: this.$caseUtils.randomString(9),
                        boardData: this.$refs.gridContainer.gridLayout.boardData
                    };
                    this.$refs.boardChoose.boardArrDefine.push(newdDefineBoard);
                    this.$refs.boardChoose.choosedBoard = newdDefineBoard;
                }
            },

            // 面板布局选择 -- 点击确定
            boardChooseSure(choosedBoard){
                this.boardChooseDialog = false;
                this.$refs.gridContainer.elChooseContentShow = true;
                this.isGridEdit = true;
                this.isGridDefine = false;
                this.$refs.gridContainer.isGridEdit = true;
                this.$refs.gridContainer.isGridDefine = false;
                let gridLayout =  JSON.parse(JSON.stringify(choosedBoard));
                let boardData = gridLayout.boardData;
                let boardStyleArr = this.$refs.gridContainer.boardStyleArr;
                let gridDataArr = {};
                for(var i=0; i<boardData.length; i++){
                    if(boardStyleArr[i]){
                        var objArr = [boardStyleArr[i]];
                        var gridLayoutObj = boardData[i];
                        gridDataArr[gridLayoutObj.i] = objArr;
                    }
                }

                this.$refs.gridContainer.gridLayout = gridLayout;
                this.$refs.gridContainer.gridDataArr = gridDataArr;

                this.$nextTick(function () {
                    this.gridItemResized();
                });
            },

            // 面板单元拉伸结束
            gridItemResized(){
                this.$nextTick(function () {
                    // 兼容IE
                    if(document.createEvent) {
                        var event = document.createEvent("HTMLEvents");
                        event.initEvent("resize", true, true);
                        window.dispatchEvent(event);
                    } else if(document.createEventObject) {
                        window.fireEvent("onresize");
                    }
                });
            },
        }
    };
</script>

<style>
</style>
