<template>
    <section class="formPage">
        <el-scrollbar title="新增数据抽取" style="height: 100%;">
            <el-form :model="form" label-width="120px" ref="form" :rules="rules" style="min-height: 100%;width: 90%;margin: 10px auto;">
                <el-form-item label="数据集名称" prop="dataSetName" :label-width="formLabelWidth">
                    <gf-input v-model="form.dataSetName"></gf-input>
                </el-form-item>
                <el-form-item label="数据集描述" prop="dataSetNote" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入"
                            v-model="form.dataSetNote">
                    </el-input>
                </el-form-item>
                <el-form-item label="数据路径" prop="apiUrl" :label-width="formLabelWidth">
                    <el-input v-model="form.apiUrl" placeholder="请输入路径"></el-input>
                </el-form-item>
                <el-form-item label="预览数据">
                    <div>
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
    import CustomHeader from '../headerComp';

    export default {
        name: "MaterialAdd",
        props: {
            row: {type: Object, required: false},
            dataSetType: {type: String, required: false},
        },
        data() {
            return {
                form: {},
                dataSetList: [],
                uploaddate: {
                    folder: "dateSet"
                },
                rules: {
                    dataSetName: [{required: true, message: "请输入数据集名称"}],
                    apiUrl: [{required: true, message: "请输入数据接口路径"}],
                },
                formLabelWidth: '120px',
                cronPopover: false,
                cron: '',
                textarea: '',
                loading: false,
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                gridOptions: {
                    columnDefs: [],
                    frameworkComponents: {agColumnHeader: CustomHeader},
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: [],
                }
            }
        },
        mounted() {
            if (this.row) {
                this.form = this.row;
                this.doView();
            }
        },
        methods: {
            async doView() {
                let _that = this;
                let apiUrl = _that.form.apiUrl.trim();
                if (!apiUrl) {
                    _that.$showWarning("请输入Api地址");
                    _that.$refs.grid.setRowData([]);
                    _that.$refs.grid.state.totalRowCount = 0;
                    return false;
                }
                try {
                    let resp = await _that.$api.DatasetApi.getApiData({apiUrl: apiUrl});
                    if (resp.status !== '0000') {
                        _that.$refs.grid.setRowData([]);
                        _that.$refs.grid.state.totalRowCount = 0;
                        _that.$showWarning("查询失败");
                        return false;
                    } else if (resp.data.length === 0) {
                        _that.$refs.grid.setRowData([]);
                        _that.$refs.grid.state.totalRowCount = 0;
                        _that.$showWarning("无数据");
                        return false;
                    }
                    let respData = resp.data;
                    let datasetId = _that.form.pkId;
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
            getDataSet() {
                let _this = this;
                _this.$api.DatasetApi.get({id: this.form.dataSetName}).then(function (resp) {
                    if (resp && resp.ok && resp.data != null) {
                        _this.form = resp.data;
                    }
                });
            },
            async cmdCreate() {
                let that = this;
                that.gridOptions.api.stopEditing();
                let ok = await that.$refs.form.validate();
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
                        that.$api.DatasetApi.add(that.form).then(function (resp) {
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
        }
    }

</script>
