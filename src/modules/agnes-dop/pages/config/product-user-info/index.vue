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
        },
    }
</script>

<style scoped>
</style>