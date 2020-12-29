<template>
    <el-tabs class="root" v-model="activeName" style="width:100%;">
        <el-tab-pane label="TA账户" name="TA"  style="height: 100%"
                     v-if="$hasPermission('agnes.acnt.info.ta')">
            <acnt-info-index-ta></acnt-info-index-ta>
        </el-tab-pane>
        <el-tab-pane label="FA账户" name="FA" style="height: 100%"
                     v-if="$hasPermission('agnes.acnt.info.fa')">
            <acnt-info-index-fa></acnt-info-index-fa>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import acntInfoIndexTa from "../acnt-info/index-ta";
    import acntInfoIndexFa from "../acnt-info/index-fa";
    import Permission from "../../../../../utils/hasPermission";

    export default {
        data() {
            return {
                activeName: 'TA'
            };
        },

        beforeMount() {
            const hasPermissionta= Permission.hasPermission('agnes.acnt.info.ta');
            // alert(hasPermissionta);
            if(hasPermissionta){
                this.activeName = "TA";
            }else{
                this.activeName = "FA";
            }
        },

        components: {
            'acntInfoIndexTa': acntInfoIndexTa,
            'acntInfoIndexFa': acntInfoIndexFa
        }
    };
</script>