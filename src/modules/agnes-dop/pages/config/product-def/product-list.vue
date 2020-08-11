<template>
    <gf-grid grid-no="agnes-product-field" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button class="action-btn" @click="addProduct" size="mini">添加</gf-button>
            <gf-button class="action-btn" size="mini">同步产品生命周期数据</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import ProductDetail from "./product-detail.vue"
    export default {
        data() {
            return {
                form:{
                    linkManIdList:[]
                },
                queryArgs:{
                    'extOrgId':'',
                    'linkmanGroupId':''
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
            async onAddModel() {
                this.reloadData();
            },
            addProduct() {
                this.showDrawer('add', {}, this.onAddModel.bind(this));
            },
            showDrawer(mode, row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;
                }
                let isShow = true;
                // row.isCheck=false;
                // if(mode==='check'){
                //     mode='view';
                //     row.isCheck=true;
                // }
                if(mode==='view'){
                    isShow = false;
                }
                this.$drawerPage.create({
                    width: 'calc(92% - 215px)',
                    title: ['产品表详情',mode],
                    component: ProductDetail,
                    args: {row, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: '保存',
                    cancelButtonTitle: '取消',
                });
            },
            async onAddLoad() {
                this.reloadData()
            },
        },
    }
</script>

<style scoped>

</style>