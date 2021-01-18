<template>
    <el-dialog class="boardChoose" title="面板布局选择"
               :visible.sync="showDialog"
               center
               :modal-append-to-body="false"
               :before-close="closeDialog">
        <div>
            <div class="selectBoard">
                <el-radio-group v-model="boardBigType" size="mini">
                    <el-radio label="defaultBoard" border>默认面板</el-radio>
                    <el-radio label="defineBoard" border>自定义面板</el-radio>
                </el-radio-group>
                <span class="setDefine">
                <span v-if="!defineBoardSet" @click="ifDefineBoardSet('set')">管理面板</span>
                <span v-if="defineBoardSet" @click="ifDefineBoardSet('save')">保存修改</span>
            </span>
            </div>
            <div class="boardContainer">
                <template v-if="boardBigType == 'defaultBoard'">
                    <p :class="choosedBoard.boardId==board.boardId?'active':''"
                       v-for="board in boardArrDefault" :key="board.boardId"
                       @click="chooseBoard(board)">
                        <dash-board-frame v-if="showDialog" ref="dialogGridLayout" :gridData="board.boardData" :rowHeight="10" :gridMargin="[1,1]" :ifNail="true"></dash-board-frame>
                    </p>
                </template>
                <template v-if="boardBigType == 'defineBoard'">
                    <p :class="choosedBoard.boardId==board.boardId?'active':''" v-for="board in boardArrDefine" :key="board.boardId" @click="chooseBoard(board)">
                    <span class="delUnitGrid" v-if="defineBoardSet" @click="removeDefineBoard(board)">
                        <em class="fa fa-close"></em>
                    </span>
                        <dash-board-frame v-if="showDialog" ref="dialogGridLayout" :gridData="board.boardData" :rowHeight="10" :gridMargin="[1,1]" :ifNail="true"></dash-board-frame>
                    </p>
                </template>
            </div>
            <p class="defineBtn"><span @click="defineBoard">自定义面板></span></p>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="closeDialog">取 消</el-button>
            <el-button size="mini" type="primary" @click="boardChooseSure">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            pageId: String,
            showDialog: { // 面板当前是否编辑
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // 面板布局选择（弹窗中数据）
                boardBigType: 'defaultBoard',                    // 面板大类：可选默认面板/自定义面板
                boardArrDefault: [],
                boardArrDefine: [],
                defineBoardSet: false,                           // 自定义面板管理
                choosedBoard: {},      // 当前选择面板
                delBoardIds: []
            }
        },
        async created() {
            // 获取面板数据
            const boardArrRes = await this.$api.compBoardApi.getDashboards({pageType: this.pageId});
            const boardArr = boardArrRes.data;
            let defaultArr = [], defineArr = [];
            boardArr.forEach((boardItem)=>{
                if(boardItem.isCurrentBoard && boardItem.isCurrentBoard === '1'){
                    this.choosedBoard = boardItem;
                }
                boardItem.boardData = JSON.parse(boardItem.comtent);
                if(boardItem.boardType === '0') {
                    defaultArr.push(boardItem);
                }else{
                    defineArr.push(boardItem);
                }
            });
            this.boardArrDefault = defaultArr;
            this.boardArrDefine = defineArr;
            if(Object.keys(this.choosedBoard).length === 0){
                this.choosedBoard = defaultArr[0];
            }
        },
        methods: {
            // 配置看板 -- 自定义面板
            defineBoard() {
                this.$emit('defineBoard', this.choosedBoard);
                this.closeDialog();
            },

            // 面板布局选择 -- 点击选择面板类型
            chooseBoard(board){
                this.choosedBoard = board;
            },

            closeDialog(){
                this.$emit('closeDialog');
            },

            // 面板布局选择 -- 点击确定
            boardChooseSure(){
                this.$emit('boardChooseSure', this.choosedBoard);
            },

            // 面板grid -- 自定义面板管理
            async ifDefineBoardSet(option){
                if(option == 'set'){
                    this.defineBoardSet = true;
                }else{
                    try {
                        const datas = {
                            boardType: '1',
                            pageType: this.pageId,
                            dashboards: this.boardArrDefine
                        };
                        const p = this.$api.compBoardApi.manageDashboards(datas);
                        await this.$app.blockingApp(p);
                        this.defineBoardSet = false;
                        this.closeDialog();
                        this.$msg.success('配置成功');
                    } catch(reason) {
                        this.$msg.error(reason);
                    }
                }
            },

            // 面板grid -- 自定义面板管理 -- 删除面板
            removeDefineBoard(board){
                this.delBoardIds.push(board);
                this.$utils.removeFromArray(this.boardArrDefine,board);
            },
        }
    }
</script>