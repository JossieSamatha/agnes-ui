<template>
    <el-container class="elec-process elec-process-dashboard">
        <section class="dataSearch">
            <span style="line-height: 28px">业务日期：</span>
            <el-date-picker
                    v-model="bizDate"
                    type="date"
                    size="mini"
                    align="center"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
            <i class="el-icon-refresh" title="全部刷新"></i>
        </section>
        <section class="card-container" v-if="dashBoardData">
            <module-card shadow="always" :class="currentBoard.boardId==board.boardId?'active':''"
                         v-for="board in dashBoardData" :key="board.boardId" @click.native="chooseBoard(board)">
                <template slot="content">
                    <p class="imgContainer">
                        <i v-html="svgImg.process"></i>
                    </p>
                    <p class="title">{{board.boardName}}</p>
                    <p>
                        <el-progress :percentage="parseInt(board.completionPer*100)" :stroke-width="8"
                                     color="#476DBE"></el-progress>
                    </p>
                </template>
            </module-card>
            <template v-if="dashBoardData.length%5 != 0">
                <module-card v-for="restIndex in (5-dashBoardData.length%5)" :key="restIndex" style="opacity: 0">
                </module-card>
            </template>
        </section>
    </el-container>
</template>

<script>
    import mockData from "../mockData";
    import boardDetail from './board-detail';
    export default {
        data(){
            return {
                svgImg: this.$lcImg,
                dashBoardData: mockData().processList || [],
                bizDate: '',
                currentBoard: {},
                parseInt: function (str) {
                    if(str){
                        return parseInt(str);
                    }
                }
            }
        },
        methods: {
            chooseBoard(board){
                this.currentBoard = board;
                this.$drawerPage.create({
                    className: 'elec-dashboard-drawer',
                    width: 'calc(97% - 215px)',
                    title: ['电子流程看板', 'view'],
                    component: boardDetail,
                    args: {},
                    widthHeader: false
                });
            }
        }
    }
</script>