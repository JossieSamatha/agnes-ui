<template>
    <section class="formPage">
        <el-scrollbar title="新增数据抽取" style="height: 100%;">
            <el-form :model="form" label-width="120px" ref="form" :rules="rules" style="min-height: 100%;width: 90%;margin: 10px auto;">
                <el-form-item label="数据集名称" prop="dataSetName">
                    <gf-input v-model="form.dataSetName"></gf-input>
                </el-form-item>
                <el-form-item label="数据集描述" prop="dataSetNote">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入"
                            v-model="form.dataSetNote">
                    </el-input>
                </el-form-item>
                <el-form-item label="静态数据类型" prop="staticDataType">
                    <gf-dict
                            dict-type="STATIC_DATA_TYPE"
                            style="width: 150px;"
                            v-model="form.staticDataType"
                            placeholder="全部"/>
                </el-form-item>
                <el-form-item label="静态数据" prop="staticDataText">
                    <gf-input type="textarea" :rows="4" v-model="form.staticDataText"/>
                </el-form-item>
                <el-form-item label="预览数据">
                    <div style="">
                        <gf-button type="primary" @click="doView">读取数据</gf-button>
                        <span Style="float:right; color: #8A8A8A">注：数据仅显示100条</span>
                    </div>
                    <gf-grid
                            toolbar
                            ref="grid"
                            :options="gridOptions"
                            toolbar-right-max-width="100%"
                    />
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <div class="form__footer" style="margin: auto auto 5px;">
            <gf-button
                    class="dialog-button"
                    size="small"
                    icon="el-icon-close"
                    @click="cmdCancel"
            >取消
            </gf-button>
            <gf-button
                    size="small"
                    type="primary"
                    icon="el-icon-check"
                    @click="cmdCreate"
            >保存
            </gf-button>
        </div>
    </section>
</template>

<script>
    import StaticDataView from "./view";
    import CustomHeader from '../headerComp';

    function resetForm() {
        return {
            dataSetName: "",
            dataSetNote: "",
            staticDataType: "",
            staticDataText: "",
            dataSetType: ""
        };
    }

    export default {
        name: "DataModel",
        props: {
            row: {type: Object, required: false},
            dataSetType: {type: String, required: false},
        },
        data() {
            return {
                loading: false,
                form: resetForm(),
                rules: {
                    dataSetName: [{required: true, message: "请输入数据集名称"}],
                    staticDataType: [{required: true, message: "请选择静态数据类型"}],
                    staticDataText: [{required: true, message: "请输入静态数据"}],
                },
                gridOptions: {
                    columnDefs: [],
                    frameworkComponents: {agColumnHeader: CustomHeader},
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: []
                }
            };
        },
        mounted() {
            if (this.row) {
                this.form = this.row;
                this.doView();
            }
        },
        methods: {
            onCancel() {
                this.$tabBar.closeCurrentTab();
            },
            onResetForm() {
                this.form = resetForm();
            },
            async cmdCreate() {
                let ok = await this.$refs.form.validate();
                let that = this;
                that.gridOptions.api.stopEditing();
                if (ok) {
                    let rows = that.gridOptions.api.getRenderedNodes();
                    if (rows.length === 0) {
                        that.$showWarning("请先读取数据");
                        return;
                    }
                    that.disabled = true;
                    that.loading = true;
                    let tableNameValue = that.$refs.grid.options.columnApi.columnController.gridColumns;
                    let tableNameList = {};
                    for (let i = 0; i < tableNameValue.length; i++) {
                        let colId = tableNameValue[i].colId;
                        let newHeaderValue = tableNameValue[i].newHeaderValue;
                        tableNameList[colId] = newHeaderValue ? newHeaderValue : colId
                    }
                    that.form.tableNameList = tableNameList;
                    if (!that.form.pkId) {
                        that.form.dataSetType = that.dataSetType;
                        this.$api.DatasetApi.add(that.form).then(function (resp) {
                            if (resp && resp.ok) {
                                that.$message.success("新增数据集成功！");
                                that.loading = false;
                                that.disabled = false;
                                that.$parent.closeTab("createDs");
                            } else {
                                that.loading = false;
                                that.disabled = false;
                                that.$message.error("新增数据集失败！");
                            }
                        });
                    } else {
                        this.$api.DatasetApi.update(that.form).then(function (resp) {
                            if (resp && resp.ok) {
                                that.$message.success("修改数据集成功！");
                                that.loading = false;
                                that.disabled = false;
                                that.$parent.closeTab("createDs");
                            } else {
                                that.loading = false;
                                that.disabled = false;
                                that.$message.error("修改数据集失败！");
                            }
                        });
                    }
                }
            },
            async doView() {
                let _that = this;
                let staticDataText = _that.form.staticDataText.trim();
                let staticDataType = _that.form.staticDataType.trim();
                if (!staticDataText) {
                    _that.$showWarning("请输入静态数据");
                    _that.$refs.grid.setRowData([]);
                    _that.$refs.grid.state.totalRowCount = 0;
                    return false;
                }
                if (!staticDataType) {
                    _that.$showWarning("请选择静态数据类型");
                    _that.$refs.grid.setRowData([]);
                    _that.$refs.grid.state.totalRowCount = 0;
                    return false;
                }
                try {
                    let resp = await _that.$api.DatasetApi.getStaticData({staticDataText: staticDataText, staticDataType: staticDataType});
                    let respData = resp.data;
                    if (resp.status !== '0000') {
                        _that.$refs.grid.setRowData([]);
                        _that.$refs.grid.state.totalRowCount = 0;
                        _that.$refs.gridHeadSet.setRowData([]);
                        _that.$refs.gridHeadSet.state.totalRowCount = 0;
                        _that.$showWarning("查询失败");
                        return false;
                    }
                    let datasetId = this.form.pkId;
                    let fields = [];
                    let list = respData[0];
                    fields = Object.keys(list);
                    let tableName = [];
                    if (datasetId) {
                        let tableNameResp = await _that.$api.DatasetApi.getTableNameArr({datasetId: datasetId});
                        tableName = tableNameResp.data;
                    } else {
                        tableName = fields;
                    }
                    let sqlGridOptions = _that.getSqlGridOptions(fields, tableName);
                    let dataRows = respData;
                    if (_that.$refs.grid) {
                        _that.gridOptions.api.setColumnDefs(sqlGridOptions);
                        _that.$refs.grid.setRowData(dataRows);
                        _that.$refs.grid.state.totalRowCount = dataRows.length - 1;
                    } else {
                        _that.gridOptions.rowData = dataRows;
                    }
                } catch (ex) {
                    _that.$refs.grid.setRowData([]);
                    _that.$refs.grid.state.totalRowCount = 0;
                    _that.$alert("查询失败!", "错误", {
                        type: "warn"
                    });
                }

            },
            getSqlGridOptions(resp, tableName) {
                let columnDefsArray = [];
                for (let i = 0; i < resp.length; i++) {
                    columnDefsArray.push({
                        headerName: tableName[i], field: resp[i], cellClass: "left",
                        resizable: true, suppressMovable: true
                    });
                }

                return columnDefsArray;
            },
            cmdCancel() {
                this.$parent.closeTab("createDs");
            },
            nextStep() {
                this.$tabBar.showTabView({
                    id: `StaticDataView`,
                    title: `预览数据`,
                    component: StaticDataView
                });
            }
        }
    };
</script>
<style scoped>
    .border {
        border: 1px solid #BDC3C7;
    }

    .background-color {
        background-color: #F0F0F0;
        padding: 5px 5px 5px 5px;
        margin-bottom: 3px;
    }
</style>
