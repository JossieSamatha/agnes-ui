<template>
    <el-form :model="form" ref="form" class="flex-row-box">
        <div class="border background-color">
            <span>
                新建数据集-8
            </span>
            <span>
                    <gf-button size="small" style="background-color: #F0F0F0; border: 0px;" icon="el-icon-edit" @click="doView">修改</gf-button>
            </span>
            <span style="float:right;">
                    <gf-button type="primary" @click="lastStep">上一步</gf-button>
                    <gf-button type="primary" @click="lastStep">保存</gf-button>
                    <gf-button @click="onCancel">取消</gf-button>
            </span>
        </div>
        <div style="border-top:solid 0.25px;">
            <span>表头设置</span>
            <span Style="float:right; color: #8A8A8A;">注：数据仅显示100条</span>
        </div>
        <gf-grid
                toolbar
                ref="grid"
                grid-no="grid-topset-item"
                :options="gridOptions"
                toolbar-right-max-width="100%"
        />
    </el-form>
</template>

<script>
    import StaticDataView from "./view.vue";

    export default {
        name: "DataModel",
        data() {
            return {
                loading: false,
                form: null,
                gridOptions: {
                    columnDefs: [],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: []
                }
            };
        },
        methods: {
            onCancel() {
                this.$tabBar.closeCurrentTab();
            },
            lastStep() {
                this.$tabBar.showTabView({
                    id: `StaticDataView`,
                    title: `预览数据`,
                    component: StaticDataView
                });
            },
            async doView() {
                let sql = this.form.sql.trim();
                if (!sql) {
                    this.$showWarning("请输入查询sql语句");
                    this.$refs.grid.setRowData([]);
                    this.$refs.grid.state.totalRowCount = 0;
                    return false;
                }
                try {
                    let resp = await this.$api.sys.getSqlResult(sql);
                    var respData = resp.data;
                    if (!respData.status) {
                        this.$refs.grid.setRowData([]);
                        this.$refs.grid.state.totalRowCount = 0;
                        this.$showWarning("查询失败");
                        return false;
                    }
                    var sqlGridOptions = this.getSqlGridOptions(respData);
                    var dataRows = respData.rows;
                    if (this.$refs.grid) {
                        this.gridOptions.api.setColumnDefs(sqlGridOptions);
                        this.$refs.grid.setRowData(dataRows);
                        this.$refs.grid.state.totalRowCount = dataRows.length;
                    } else {
                        this.gridOptions.rowData = dataRows;
                    }
                } catch (ex) {
                    this.$refs.grid.setRowData([]);
                    this.$refs.grid.state.totalRowCount = 0;
                    this.$alert("查询失败!" + ex.message, "错误", {
                        type: "warn"
                    });
                }

            }
        }
    };
</script>
<style scoped>
    .border {
        border:1px solid #BDC3C7;
    }
    .background-color {
        background-color: #F0F0F0;
        padding: 5px 5px 5px 5px;
        margin-bottom: 15px;
    }
</style>
