<template>
    <section class="formPage">
        <el-scrollbar class="pagescroll-vertical" :native="false" :noresize="false" style="height: 100%;"
                      v-loading="loading"
                      element-loading-text="处理中，请稍后"
                      element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-form :model="form" label-width="120px" ref="form" :rules="rules" style="min-height: 100%;width: 100%;margin: 10px auto;">
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
                <el-form-item label="数据文件" prop="docId">
                    <el-upload v-model="form.docId"
                               action="/api/ecm/doc/upload"
                               :on-success="handleFile"
                               :on-error="defeatFile"
                               :on-remove="removeDoc"
                               :limit="1"
                               :data="uploadDate"
                               :file-list="docList"
                               :on-exceed="handleExceed"
                               accept=".xlsx,.xls,.csv,.txt">
                        <el-button size="small" type="primary">选择文件...</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="字段分隔符" prop="fileSeparator">
                    <gf-dict v-model="form.fileSeparator" dict-type="DATAV_DATASET_FILE_SEPARATOR"></gf-dict>
                </el-form-item>
                <el-form-item label="数据表字段" prop="colDefs">
                    <gf-button type="primary" @click="doView">重新读取</gf-button>
                    <gf-grid
                            toolbar=""
                            ref="gridColumn"
                            :options="gridColumnOptions"
                            grid-no="grid-dataset-db"
                    />
                </el-form-item>
                <el-form-item label="数据列表" style="margin-bottom: 0">
                    <gf-grid
                            toolbar=""
                            ref="gridData"
                            :options="gridDataOptions"
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
    import lodash from 'lodash';

    function resetForm() {
        return {
            dataSetName: "",
            dataSetNote: "",
            dataSetType: "",
        };
    }

    export default {
        name: "dataset-file",
        props: {
            row: {type: Object, required: false},
            dataSetType: {type: String, required: true},
        },
        data() {
            return {
                loading: false,
                form: resetForm(),
                rules: {
                    dataSetName: [{required: true, message: "请输入数据集名称"}],
                    docId: [{required: true, message: "请上传数据文件"}],
                    fileSeparator: [{required: true, message: "请选择文件字段分隔符"}],
                },
                docId: '',
                docList: [],
                uploadDate: {
                    docId: this.docId ? this.docId : '',
                    folderTag: "upload"
                },
                docChanged: false,
                gridColumnOptions: {
                    ext: {
                        autoFitColumnMode: 3,
                    },
                    onCellEditingStopped: function (event) {
                        let field = event.colDef.field;
                        if (field === 'columnLabel' || field === 'visible') {
                            event.api.execCmd('onCellEdit', event);
                        }
                    },
                },
                gridDataOptions: {
                    columnDefs: [],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false,
                        autoFitColumnMode: 3,
                    }
                }
            };
        },
        mounted() {
            let _this = this;
            if (_this.row == null) {
                return;
            }
            _this.form = _this.row;
            this.$api.EcmFileApi.get({docId: _this.form.docId}).then(function (resp) {
                if (resp && resp.ok) {
                    let file = {};
                    file.name = resp.data[0].name;
                    file.url = resp.data[0]['contentUrl'];
                    _this.docList.push(file);
                }
            });
            _this.doView();
        },
        methods: {
            cmdCancel() {
                this.$parent.closeTab("createDs");
            },
            cmdCreate() {
                this.$refs.form.validate(validate => {
                    if (!validate) {
                        this.$showWarning("请填写必填数据");
                        return;
                    }
                    let _this = this;
                    let columns = _this.gridColumnOptions.api.getRenderedNodes();
                    if (columns.length === 0) {
                        _this.$showWarning("表字段读取错误");
                        return;
                    }
                    _this.gridColumnOptions.api.stopEditing();

                    _this.loading = true;
                    _this.form.dataSetType = _this.dataSetType;
                    let tableDefines = _this.$refs.gridColumn.getRowData();
                    let data = {dataset: _this.form, tableDefines: tableDefines};
                    if (!_this.form.pkId) {
                        this.$api.DatasetApi.addDataset(data).then(function (resp) {
                            if (resp && resp.ok) {
                                _this.$message.success("新增数据集成功！");
                                _this.loading = false;
                                _this.$parent.closeTab("createDs");
                            } else {
                                _this.loading = false;
                                _this.$message.error("新增数据集失败！");
                            }
                        }).catch(e => {
                            _this.loading = false;
                            _this.$message.error("新增数据集失败！" + e.message);
                        });
                    } else {
                        this.$api.DatasetApi.updateDataset(data).then(function (resp) {
                            if (resp && resp.ok) {
                                _this.$message.success("修改数据集成功！");
                                _this.loading = false;
                                _this.$parent.closeTab("createDs");
                            } else {
                                _this.loading = false;
                                _this.$message.error("修改数据集失败！");
                            }
                        }).catch((e) => {
                            _this.loading = false;
                            this.$message.error("修改数据集失败！" + e.message);
                        });
                    }
                });
            },
            doView() {
                let _this = this;
                let datasetId = _this.form.pkId;
                let docId = _this.form.docId;
                if (!datasetId && !docId) {
                    _this.$showWarning("请上传数据文件");
                    _this.resetGrid();
                    return false;
                }
                if (!this.form.fileSeparator) {
                    _this.$showWarning("请选择文件字段分割符");
                    return;
                }
                this.handleFileDefs();
            },
            handleFileDefs() {
                let _this = this;
                _this.loading = true;
                let tableDefineParam = _this.getDefParam();
                this.$api.DatasetApi.getDefAndData(tableDefineParam).then(resp => {
                    if (resp.status !== "0000") {
                        _this.loading = false;
                        _this.resetGrid();
                        return false;
                    }
                    let defAndData = resp.data;
                    let defines = defAndData.defines;
                    _this.$refs.gridColumn.setRowData(defines);
                    _this.$refs.gridColumn.state.totalRowCount = defines.length;

                    // 动态设置数据表中表头
                    let gridDataGridOptions = _this.getGridDataGridOptions(defines);
                    _this.gridDataOptions.api.setColumnDefs(gridDataGridOptions);

                    // 数据表
                    let dataList = defAndData.dataList;
                    _this.$refs.gridData.setRowData(dataList);
                    _this.$refs.gridData.state.totalRowCount = dataList.length;
                    _this.loading = false;
                }).catch(ex => {
                    _this.loading = false;
                    _this.resetGrid();
                    throw ex;
                });
            },
            removeDoc() {
                this.docId = '';
                this.form.docId = "";
            },
            handleFile(response) {
                if (response && response.status) {
                    this.docId = response.data.files[0].docId;
                    this.form.docId = response.data.files[0].docId;
                    this.docChanged = true;
                    this.$message.success('文件上传成功！');
                } else {
                    this.$message.error('文件上传失败！');
                }
            },
            defeatFile() {
                this.$message.error('文件上传失败！');
            },
            handleExceed() {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            resetGrid() {
                this.$refs.gridColumn.setRowData([]);
                this.$refs.gridColumn.state.totalRowCount = 0;
                this.$refs.gridData.setRowData([]);
                this.$refs.gridData.state.totalRowCount = 0;
            },
            getDefParam() {
                return {
                    datasetId: this.form.pkId, datasetType: this.form.dataSetType, docId: this.form.docId,
                    docChanged: this.docChanged, fileSeparator: this.form.fileSeparator
                };
            },
            getGridDataGridOptions(resp) {
                let defs = lodash.filter(resp, {'visible': true});
                return lodash.map(defs, field => {
                    return {
                        headerName: field['columnLabel'], field: field['columnName'], cellClass: "left",
                        resizable: true, suppressMovable: true, editable: false
                    }
                });
            },
            onCellEdit() {
                let colDefs = this.$refs.gridColumn.getRowData();
                let gridDataGridOptions = this.getGridDataGridOptions(colDefs);
                this.gridDataOptions.api.setColumnDefs(gridDataGridOptions);
            }
        }
    }
</script>