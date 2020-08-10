<template>
    <gf-grid grid-no="agnes-product-field" ref="grid" quick-text-max-width="300px"
             height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button class="action-btn" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    export default {
        data() {
            return {
                form:{
                    linkManIdList:[]
                },
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
                    if (this.reqData.extOrgId) {
                        this.queryArgs.extOrgId = this.reqData.extOrgId;
                        this.queryArgs.linkmanGroupId = this.reqData.linkmanGroupId;
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
            async onAddLoad() {
                this.reloadData()
            },


        },
    }
</script>

<style scoped>

</style>