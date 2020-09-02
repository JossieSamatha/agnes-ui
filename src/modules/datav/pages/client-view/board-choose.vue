<template>
    <el-dialog class="boardChoose" title="面板布局选择" :visible.sync="showDialog" center
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
                    <p :class="choosedBoard.boardId==board.boardId?'active':''" v-for="board in boardArrDefault" :key="board.boardId" @click="chooseBoard(board)">
                        <dash-board-frame v-if="showDialog" ref="dialogGridLayout" :gridData="board.boardData" :gridMargin="[1,1]"></dash-board-frame>
                    </p>
                </template>
                <template v-if="boardBigType == 'defineBoard'">
                    <p :class="choosedBoard.boardId==board.boardId?'active':''" v-for="board in boardArrDefine" :key="board.boardId" @click="chooseBoard(board)">
                    <span class="delUnitGrid" v-if="defineBoardSet" @click="removeDefineBoard(board)">
                        <i class="fa fa-close"></i>
                    </span>
                        <dash-board-frame v-if="showDialog" ref="dialogGridLayout" :gridData="board.boardData" :gridMargin="[1,1]"></dash-board-frame>
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
    import boardData from './board-data';
    export default {
        props: {
            showDialog: { // 面板当前是否编辑
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // 面板布局选择（弹窗中数据）
                boardBigType: 'defaultBoard',                    // 面板大类：可选默认面板/自定义面板
                boardArrDefault: boardData.boardArrDefault,
                boardArrDefine: boardData.boardArrDefine,
                defineBoardSet: false,                           // 自定义面板管理
                choosedBoard: boardData.boardArrDefault[0],      // 当前选择面板
                delBoardIds: []
            }
        },
        mounted(){
        },
        watch:{
        },
        methods: {
            // 配置看板 -- 自定义面板
            defineBoard() {
                this.$emit('defineBoard');
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
            ifDefineBoardSet(option){
                if(option == 'set'){
                    this.defineBoardSet = true;
                }else{
                    this.defineBoardSet = false;
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