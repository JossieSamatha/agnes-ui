<template>
    <el-tabs class="root" v-model="activeName" type="card">
        <el-tab-pane label="TA账户" name="TA"  style="height: 100%">
            <acnt-info-index-ta></acnt-info-index-ta>
        </el-tab-pane>
        <el-tab-pane label="FA账户" name="FA">
            <acnt-info-index-fa></acnt-info-index-fa>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import acntInfoIndexTa from "../acnt-info/index-ta";
    import acntInfoIndexFa from "../acnt-info/index-fa";

    export default {
        data() {
            return {
                activeName: 'TA'
            };
        },
        components: {
            'acntInfoIndexTa': acntInfoIndexTa,
            'acntInfoIndexFa': acntInfoIndexFa
        }
    };
</script>