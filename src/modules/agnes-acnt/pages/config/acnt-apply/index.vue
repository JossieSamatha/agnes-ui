<template>
    <el-tabs class="root" v-model="activeName" @tab-click="loadCount">
        <el-tab-pane name="unfinishedApply"  style="height: 100%">
            <span slot="label">
                <span>申请中</span>
                <el-badge :value="this.countUnfinishedApply" v-if="this.countUnfinishedApply !=='0'" size="mini" class="item"></el-badge>
            </span>

            <acnt-apply-index-unfinished @loadCount="loadCount" :show-cond-prop="this.showCondProp"></acnt-apply-index-unfinished>
<!--            <acnt-apply-index-tab-pane :apply-tab-name="unfinishedApply"></acnt-apply-index-tab-pane>-->

        </el-tab-pane>
        <el-tab-pane name="finishedApply" style="height: 100%">
            <span slot="label">
                <span>已完成</span>
<!--                <el-badge :value="5" v-if="true" size="mini" class="item"></el-badge>-->
            </span>

            <acnt-apply-index-finished  @loadCount="loadCount"></acnt-apply-index-finished>
<!--            <acnt-apply-index-tab-pane :apply-tab-name="finishedApply"></acnt-apply-index-tab-pane>-->

        </el-tab-pane>
        <el-tab-pane name="canceledApply" style="height: 100%">
            <span slot="label">
                <span>已作废</span>
<!--                <el-badge :value="5" v-if="true" size="mini" class="item"></el-badge>-->
            </span>

            <acnt-apply-index-canceled  @loadCount="loadCount"></acnt-apply-index-canceled>
<!--            <acnt-apply-index-tab-pane :apply-tab-name="canceledApply"></acnt-apply-index-tab-pane>-->


        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import acntApplyIndexUnfinished from "../acnt-apply/index-unfinished";
    import acntApplyIndexFinished from "../acnt-apply/index-finished";
    import acntApplyIndexCanceled from "../acnt-apply/index-canceled";
    // import acntApplyIndexTabPane from "../acnt-apply/index-tab-pane";


    // import Permission from "../../../../../utils/hasPermission";

    export default {
        props: {
            showCondProp: {
                type: String,
                default: '01'
            }
        },
        data() {
            return {
                activeName: 'unfinishedApply',
                countUnfinishedApply: '0'
            };
        },
        beforeMount() {
            this.loadCount();
        },
        components: {
            'acntApplyIndexUnfinished': acntApplyIndexUnfinished,
            'acntApplyIndexFinished': acntApplyIndexFinished,
            'acntApplyIndexCanceled':acntApplyIndexCanceled
            // 'acntApplyIndexTabPane':acntApplyIndexTabPane
        },
        methods:{
            async loadCount(){
                try {
                    let resp = await this.$api.acntApplyApi.getCountUnfinishedAndCanDo();
                    this.countUnfinishedApply = resp.data;
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        }
    };
</script>

<style scoped>
    .acnt-apply-container {
        display: flex;
        height: calc(100% - 94px);
    }

    .acnt-apply-container .steps-comp {
        flex: none;
        width: 160px;
        height: calc(100% - 41px);
        padding: 0 0 30px;
        margin-top: 41px;
        margin-left: 10px;
        border-radius: 8px;
        border: 1px solid #A8AED3;
        overflow: hidden;
    }

    .ag-grid-box.acnt-apply-grid {
        overflow: initial;
    }

    .action-btn .svg-pointer {
        position: absolute;
        top: -40px;
        right: -30px;
        width: 30px;
        height: auto;
        animation: moveVertical 1.5s infinite linear;
        animation-iteration-count:3;
        z-index: 1005;
    }

    .pointer-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
    }

    @keyframes moveVertical {
        0% {
            top: -40px;
            right: -30px;
        }
        25% {
            top: -30px;
            right: -20px;
        }
        50% {
            top: -20px;
            right: -10px;
        }
        75% {
            top: -30px;
            right: -20px;
        }
        100% {
            top: -40px;
            right: -30px;
        }
    }
</style>

<style>
    .acnt-apply.gf-tab-view .el-loading-mask {
        background: rgba(255, 255, 255, .7);
    }

    .ag-grid-box .grid-action-panel .action-btn.pointerShow {
        color: #0F5EFF;
        border-color: #0F5EFF;
        background: #fff;
        z-index: 1008;
        box-shadow: 0px 0px 2px 1px #409eff;
    }

    .acnt-apply-container .ag-grid-box .grid-action-panel .right .el-input {
        width: 200px;
    }
</style>
