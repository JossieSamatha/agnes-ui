<template>
    <el-tabs class="root" v-model="activeName" type="card">
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

            <acnt-apply-index-finished></acnt-apply-index-finished>
<!--            <acnt-apply-index-tab-pane :apply-tab-name="finishedApply"></acnt-apply-index-tab-pane>-->

        </el-tab-pane>
        <el-tab-pane name="canceledApply" style="height: 100%">
            <span slot="label">
                <span>已作废</span>
<!--                <el-badge :value="5" v-if="true" size="mini" class="item"></el-badge>-->
            </span>

            <acnt-apply-index-canceled></acnt-apply-index-canceled>
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