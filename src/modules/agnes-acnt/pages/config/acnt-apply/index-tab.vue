<template>
    <el-tabs class="root" v-model="activeName" type="card">
        <el-tab-pane name="unfinishedApply"  style="height: 100%">
            <span slot="label">
                <span>申请中</span>
                <el-badge :value="12" v-if="true" size="mini" class="item"></el-badge>
            </span>

            <acnt-apply-index-unfinished></acnt-apply-index-unfinished>
        </el-tab-pane>
        <el-tab-pane name="finishedApply" style="height: 100%">
            <span slot="label">
                <span>已完成</span>
                <el-badge :value="5" v-if="true" size="mini" class="item"></el-badge>
            </span>

            <acnt-apply-index-unfinished></acnt-apply-index-unfinished>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import acntApplyIndexUnfinished from "../acnt-apply/index-unfinished";
    import Permission from "../../../../../utils/hasPermission";

    export default {
        data() {
            return {
                activeName: 'unfinishedApply'
            };
        },
        beforeMount() {
            const hasPermissionta= Permission.hasPermission('agnes.acnt.info.ta');
            // alert(hasPermissionta);
            if(hasPermissionta){
                this.activeName = "unfinishedApply";
            }else{
                this.activeName = "finishedApply";
            }
        },
        components: {
            'acntApplyIndexUnfinished': acntApplyIndexUnfinished
        }
    };
</script>