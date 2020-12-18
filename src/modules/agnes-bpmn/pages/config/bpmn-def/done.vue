<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="流程标题">
                    <el-input v-model="queryArgs.title"></el-input>
                </el-form-item>
                <el-form-item label="流程名称">
                    <el-input v-model="queryArgs.processDefinitionName"></el-input>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid  :query-args="queryArgs" grid-no="bpmn-done" ref="grid" toolbar="find,refresh,more">
        </gf-grid>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryArgs:{
                    'title':'',
                    'processDefinitionName':'',
                },
            }
        },
        beforeMount() {
        },
        methods: {
            switchChange(){
                this.reloadData();
            },

            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'title':'',
                    'processDefinitionName':''
                };
                this.$refs.grid.reloadData();
            },
        },
    }
</script>

<style>
    .inner-switch .el-switch__label {
        display: none;
        position: absolute;
        margin: 0;
        font-size: 12px;
        transform: scale(.8);
    }

    .inner-switch .el-switch__label.el-switch__label--right{
        left: 3px;
    }

    .inner-switch .el-switch__label.el-switch__label--left{
        right: 12px;
        z-index: 1;
    }

    .inner-switch .el-switch__label.is-active {
        display: block;
        color: #fff;
    }
    .inner-switch{
        padding-right: 10px;
    }

</style>