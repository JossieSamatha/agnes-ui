<template>
    <gf-grid grid-no="agnes-group-user" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%">
    </gf-grid>
</template>

<script>
    export default {
        data() {
            return {
                queryArgs:{
                    'userGroupId':'',
                }
            }
        },
        props: {
            reqData:{
                type:Object,
                request:true
            }
        },
        watch: {
            reqData:{
                handler() {
                    if (this.reqData.userGroupId) {
                        this.queryArgs.userGroupId = this.reqData.userGroupId;
                        this.reloadData();
                    }
                },
                deep:true
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            async deleteUser(params) {
                const row = params.data;
                const ok = await this.$msg.ask(`确认移除选中的联系人吗, 是否继续?`);
                if (!ok) {
                    return
                }
                try {
                    const p = this.$api.userGroupApi.deleteUser(row);
                    await this.$app.blockingApp(p);
                    this.reloadData();
                } catch (reason) {
                    this.$msg.error(reason);
                }
            }
        },
    }
</script>

<style scoped>

</style>