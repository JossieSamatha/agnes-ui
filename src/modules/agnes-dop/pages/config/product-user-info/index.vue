<template>
    <div style="height: 100%">
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="核算员">
                    <gf-input type="text" v-model="queryArgs.checkUserName"/>
                </el-form-item>
                <el-form-item label="清算员">
                    <gf-input type="text" v-model="queryArgs.clearUserName"/>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="产品信息">
                    <gf-input type="text" v-model="queryArgs.productCodeOrName" placeholder="产品代码/名称"/>
                </el-form-item>
                <el-form-item>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="agnes-product-user-field"  :query-args="queryArgs" ref="grid">
            <template slot="left">
                <gf-button v-if="$hasPermission('agnes.dop.product.user.info.export')"  @click="exportExcel" class="action-btn">导出</gf-button>
                <menu-config-upload v-if="$hasPermission('agnes.dop.product.user.info.input')" :res-name=menuConfigInfo.resName :if-pk-id="menuConfigInfo.inputParam">
                </menu-config-upload>
            </template>
        </gf-grid>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {
           
        },
        data() {
            return {
                productCodes:[],
                queryArgs:{
                    'checkUserName':'',
                    'clearUserName':'',
                    'productCodeOrName':'',
                },
                menuConfigInfo:{
                    resName:'',
                    inputParam:'',
                },
            }
        },
        mounted() {
            this.initData();
        },
        watch: {
        },
        methods: {
            async initData(){
                let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl':this.$app.nav.tabBar.currentTabKey});
                if(resp1.data){
                    this.menuConfigInfo = resp1.data;
                }
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs.checkUserName ='';
                this.queryArgs.clearUserName ='';
                this.queryArgs.productCodeOrName ='';
                this.reloadData();
            },
            async exportExcel() {
                if(this.menuConfigInfo == undefined || this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined){
                    this.$msg.error('请完善导出相关配置！');
                    return ;
                }
                let pkIds = '';
                let rows = this.$refs.grid.getSelectedRows();
                if(rows.length == 0){
                    rows = this.$refs.grid.getRowData();
                }
                rows.forEach((item)=>{
                    pkIds = pkIds + item.productAuthId +",";
                });
                pkIds = pkIds.substring(0, pkIds.lastIndexOf(","));
                let pkId = this.menuConfigInfo.outputParam;
                let fileName = this.menuConfigInfo.resName;
                const basePath = window.location.href.split("#/")[0];
                window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId="+pkId+"&fileName="+fileName+"&pkIds="+pkIds);
            },
        },
    }
</script>

<style scoped>
</style>