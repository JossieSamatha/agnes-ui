<template>
    <gf-grid grid-no="agnes-product-param-field" ref="grid" quick-text-max-width="300px"
              :query-args="queryArgs" height="100%" @row-double-click="showLinkman">
        <template slot="left">
            <gf-button class="action-btn" @click="addProParam" size="mini">添加</gf-button>
        </template>
    </gf-grid>
</template>

<script>
    import ProductParamDetail from "./product-param-detail.vue";
    import loadsh from 'lodash';
    export default {
        data() {
            return {
                form:{
                    linkManIdList:[]
                },
                queryArgs:{
                    'productId':'',
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
                    if (this.reqData.productId) {
                        this.queryArgs.productId = this.reqData.productId;
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
            async onEditModel() {
                this.reloadData();
            },
            async onViewModel() {
                this.reloadData();
            },
            addProParam() {
                if(loadsh.isEmpty(this.reqData.productId)){
                    this.$msg.warning("请选择产品");
                    return;  
                }
                this.showDrawer('add', {}, this.onAddModel.bind(this));
            },
            editParam(param) {
                this.showDrawer('edit', param.data, this.onEditModel.bind(this));
            },
            checkParam(param) {
                this.showDrawer('check', param.data, this.onViewModel.bind(this));
            },
            showDrawer(mode,row, actionOk) {
                if (mode !== 'add' && !row) {
                    this.$msg.warning("请选中一条记录!");
                    return;   
                }
                let isShow = true;
                if(mode==='view'){
                    isShow = false;
                }
                this.$drawerPage.create({
                    width: 'calc(97% - 215px)',
                    title: ['产品表详情',mode],
                    component: ProductParamDetail,
                    args: {row, productData:this.reqData, mode, actionOk},
                    okButtonVisible:isShow,
                    okButtonTitle: mode==='check'?'复核':'保存',
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