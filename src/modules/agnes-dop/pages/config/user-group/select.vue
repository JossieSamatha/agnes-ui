<template>
    <div style="height: 360px">
        <div class="gf-select-user">
            <gf-grid ref="grid" grid-no="ares-user-select" height="100%" :query-args="queryArgs"
                     @load-grid-options="loadGridOptions">
            </gf-grid>
        </div>
        <el-row>
            <el-col style="text-align: center;padding-top: 10px;">
                <el-button type="primary" @click="onSelect()" icon="el-icon-success">选择</el-button>
                <el-button @click="onCancel('cancel')" icon="el-icon-circle-close">取消</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "user-select",
        props: {
            data: {type: Object, require: false}
        },
        data() {
            return {
                multiSelect: "multiple",
                queryArgs: {}
            }
        },
        mounted() {
            if (this.data && this.data.multiSelect === false) {
                this.multiSelect = "single";
            }
            this.reloadData();
        },
        methods: {
            loadGridOptions(gridOptions) {
                gridOptions.rowSelection = this.multiSelect;
            },
            reloadData() {
                this.queryArgs.dataType = this.data.dataType;
                this.$refs.grid.reloadData(true);
            },
            onSelect() {
                let rows = this.$refs.grid.getSelectedRows();
                if (rows.length === 0) {
                    this.$alert('请选择一条记录!', '提示');
                    return;
                }
                this.data.users = rows;
                this.onCancel('ok');
            },
            onCancel(action) {
                this.$dialog.close(this, action);
            }
        }
    }
</script>

<style scoped>
    .gf-select-user {
        width: 100%;
        height: calc(100% - 42px);
    }
</style>