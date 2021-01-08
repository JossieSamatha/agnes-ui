<template>
    <div class="datav_client_view" ref="datav_client_view" style="padding:0!important;">
        <div class="split-mask" v-show="!isGridDefine"></div>
        <div class="topPanel">
            <div class="optionPanel">
                <span></span>
                <div>
                    <span class="boardeEdit" :id="pageId+'EditBtn'" v-show="false" @click="boardEdit"
                    >配置看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEdit">切换看板</span>
                    <span class="boardeEdit" v-if="isGridEdit" @click="boardEditFinish('content')">完成配置</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="addUnitGrid">新增面板</span>
                    <span class="boardeEdit" v-if="isGridDefine" @click="boardEditFinish('layout')">保存面板</span>
                    <span class="boardeEdit" v-if="isGridDefine || isGridEdit" @click="boardEditFinish('', 'cancel')">取消操作</span>
                </div>
            </div>
        </div>
        <grid-container class="indexPage" ref="gridContainer" :pageId="pageId"></grid-container>
        <board-choose v-if="boardChooseDialog"
                      ref="boardChoose"
                      :pageId="pageId"
                      :showDialog="boardChooseDialog"
                      @closeDialog="closeDialog"
                      @boardChooseSure="boardChooseSure"
                      @defineBoard="defineBoard">
        </board-choose>
    </div>
</template>

<script>
    import gridContainer from './grid-container';
    import boardChoose from './board-choose';
    export default {
        props:{
            pageId: String
        },
        data() {
            return {
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
        methods: {
            // 配置看板 -- 点击展开弹窗 -- 查询自定义面板数据
            boardEdit(){
                if(!this.isGridEdit && !this.isGridDefine){
                    this.boardChooseDialog = true;
                }
            },

            // 配置看板 -- 自定义面板
            defineBoard(choosedBoard) {
                this.isGridEdit = false;
                this.isGridDefine = true;
                this.$refs.gridContainer.isGridEdit = false;
                this.$refs.gridContainer.isGridDefine = true;
                this.boardChooseDialog = false;
                this.setBoardData(choosedBoard);
            },

            // 面板grid -- 新增单元
            addUnitGrid() {
                const newUnitId = this.$agnesAcUtils.randomString(32);
                const newUnitObj = {
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
            async boardEditFinish(editType, ifCancel){
                if(ifCancel){
                    this.isGridEdit = false;
                    this.$set(this.$refs.gridContainer, 'isGridEdit', false);
                    this.isGridDefine = false;
                    this.$set(this.$refs.gridContainer, 'isGridDefine', false);
                }else{
                    const ok = await this.$msg.ask(`是否保存当前配置？`);
                    if (!ok) {
                        return
                    }

                    const comtent = this.$refs.gridContainer.gridLayout.boardData.map((item)=>{
                        return {
                            x: item.x, y: item.y, w: item.w, h: item.h, i: item.i,
                            compId: this.$refs.gridContainer.gridDataArr[item.i][0].compId
                        };
                    })
                    let newdDefineBoard = {
                        comtent: JSON.stringify(comtent),
                        pageType: this.pageId,
                        boardType: '1'
                    };
                    if(this.$refs.gridContainer.gridLayout.boardId){
                        if(this.$refs.gridContainer.gridLayout.boardType === '0'){
                            newdDefineBoard.boardId = '';
                        }else{
                            newdDefineBoard.boardId = this.$refs.gridContainer.gridLayout.boardId
                        }
                    }

                    try {
                        const p = this.$api.compBoardApi.saveDashboards(newdDefineBoard);
                        await this.$app.blockingApp(p);
                        if(editType == 'content'){
                            this.isGridEdit = false;
                            this.$set(this.$refs.gridContainer, 'isGridEdit', false);
                        }else if(editType == 'layout'){
                            this.isGridDefine = false;
                            this.$set(this.$refs.gridContainer, 'isGridDefine', false);
                        }
                        this.$msg.success('配置成功');
                    } catch(reason) {
                        this.$msg.error(reason);
                    }
                }
            },

            // 面板布局选择 -- 点击确定
            boardChooseSure(choosedBoard){
                this.boardChooseDialog = false;
                this.$refs.gridContainer.elChooseContentShow = true;
                this.isGridEdit = true;
                this.isGridDefine = false;
                this.$set(this.$refs.gridContainer, 'isGridEdit', true);
                this.$set(this.$refs.gridContainer, 'isGridDefine', false);
                this.setBoardData(choosedBoard);
            },

            setBoardData(choosedBoard){
                let gridLayout =  this.$lodash.cloneDeep(choosedBoard);
                let boardDataArr = gridLayout.boardData;
                let boardStyleArr = this.$refs.gridContainer.boardStyleArr;
                let gridDataArr = {};
                boardDataArr.forEach((boardItem)=>{
                    if(boardItem.compId){
                        const compObj = this.$lodash.find(boardStyleArr, {compId: boardItem.compId});
                        if(compObj){
                            const objArr = [compObj];
                            gridDataArr[boardItem.i] = objArr;
                        }
                    }
                })

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
                        let event = document.createEvent("HTMLEvents");
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
