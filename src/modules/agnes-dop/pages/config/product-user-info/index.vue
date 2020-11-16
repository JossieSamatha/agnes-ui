<template>
    <div>
        <el-form class="search-panel" label-width="100px">
            <div class="line">
                <el-form-item label="核算员编号">
                    <el-input v-model="queryArgs.userId"></el-input>
                </el-form-item>
                <el-form-item label="产品代码">
                    <el-input v-model="queryArgs.productCode"></el-input>
                </el-form-item>
                <el-button @click="reloadData" style="margin-left: 40px;margin-top: 2px;" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" style="margin-left: 20px;margin-top: 2px;" class="option-btn">重置</el-button>
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
                    'userId':'',
                    'productCode':'',
                }
            }
        },
        mounted() {
    
        },
        watch: {
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs.userId = '';
                this.queryArgs.productCode = '';
                this.reloadData();
            },
        },
    }
</script>

<style scoped>
</style>