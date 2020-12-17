<template>
    <div style="height: 100%">
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="核算员编号">
                    <el-select class="multiple-select" v-model="queryArgs.checkUserIds" placeholder="请选择" filterable clearable multiple>
                        <gf-filter-option
                                v-for="item in checkUserList"
                                :key="item.checkUserId"
                                :label="item.checkUserId"
                                :value="item.checkUserId">
                        </gf-filter-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清算员编号">
                    <el-select class="multiple-select" v-model="queryArgs.clearUserIds" placeholder="请选择" filterable clearable multiple>
                        <gf-filter-option
                                v-for="item in clearUserList"
                                :key="item.clearUserId"
                                :label="item.clearUserId"
                                :value="item.clearUserId">
                        </gf-filter-option>
                    </el-select>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="产品代码">
                    <el-select class="multiple-select" v-model="queryArgs.productCodes" placeholder="请选择" filterable clearable multiple>
                        <gf-filter-option
                                v-for="item in productList"
                                :key="item.productCode"
                                :label="item.productName"
                                :value="item.productCode">
                        </gf-filter-option>
                    </el-select>
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
                queryArgs:{
                    'checkUserIds':[],
                    'productCodes':[],
                    'clearUserIds':[],
                },
                productList:[],
                checkUserList:[],
                clearUserList:[],
                menuConfigInfo:{},
            }
        },
        mounted() {
            this.initData();
        },
        watch: {
        },
        methods: {
            async initData(){
                let resp = await this.$api.productAuthApi.getPrdtInfoAuthList();
                this.productList = resp.data.productList;
                this.checkUserList = resp.data.checkUserList;
                this.clearUserList = resp.data.clearUserList;
                let resp1 = await this.$api.funcConfigApi.queryMenuByActionUrl({'actionUrl':this.$app.nav.tabBar.currentTabKey});
                if(resp1){
                    this.menuConfigInfo = resp1.data;
                }
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs.checkUserIds = [];
                this.queryArgs.productCodes = [];
                this.queryArgs.clearUserIds = [];
                this.reloadData();
            },
            async exportExcel() {
                if(this.menuConfigInfo.outputParam == null || this.menuConfigInfo.outputParam == undefined){
                    this.$msg.error('请完善导出相关配置！');
                    return ;
                }
                let pkId = this.menuConfigInfo.outputParam;
                let fileName = this.menuConfigInfo.resName;
                const basePath = window.location.href.split("#/")[0];
                window.open(basePath + "api/data-pipe/v1/etl/file/exportexcel?pkId="+pkId+"&fileName="+fileName);
            },
        },
    }
</script>

<style scoped>
</style>