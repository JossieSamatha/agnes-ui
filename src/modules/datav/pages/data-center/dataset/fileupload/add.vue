<template>
    <section class="formPage">
        <el-scrollbar class="pagescroll-vertical" :native="false" :noresize="false" title="新增数据集" v-loading="loading"
                      element-loading-text="保存中"
                      element-loading-background="rgba(0, 0, 0, 0.1)" style="height: 100%;">
            <el-form :model="form" label-width="120px" ref="form" :rules="rules" style="margin: 10px auto;">
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
                <el-form-item label="数据文件" prop="docId" :label-width="formLabelWidth">
                    <el-upload v-model="form.docId"
                               action="/api/ecm/doc/upload"
                               :on-success="handleFile"
                               :on-error="defeatFile"
                               :on-remove="removeDoc"
                               :limit="1"
                               :data="uploaddate"
                               :file-list="docList"
                               :on-exceed="handleExceed"
                               accept=".xlsx,.xls,.csv,.txt">
                        <el-button size="small" type="primary">选择文件...</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="预览数据">
                    <div style="">
                        <gf-button type="primary" @click="doView">读取数据</gf-button>
                        <span Style="float:right; color: #8A8A8A">注：数据仅显示100条</span>
                    </div>
                    <gf-grid
                            toolbar=""
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
                docId: '',
                uploaddate: {
                    docId: this.docId ? this.docId : '',
                    folderTag: "upload"
                },
                rules: {
                    dataSetName: [{required: true, message: "请输入数据集名称"}],
                },
                formLabelWidth: '120px',
                structureList: [],
                docList: [],
                cronPopover: false,
                cron: '',
                textarea: '',
                loading: false,
                disabled: false,
                gridOptions: {
                    columnDefs: [],
                    frameworkComponents: {agColumnHeader: CustomHeader},
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: []
                }
            }
        },
        mounted() {
            let _this = this;
            if (_this.row != null) {
                _this.form = _this.row;
                _this.doView();
                this.$api.EcmFileApi.get({docId: _this.form.docId}).then(function (resp) {
                    if (resp && resp.ok) {
                        let file = {};
                        file.name = resp.data[0].name;
                        file.url = resp.data[0].contentUrl;
                        _this.docList.push(file);
                    }
                });
            }
        },
        methods: {
            async doView() {
                let _that = this;
                let docId = _that.form.docId.trim();
                if (!docId) {
                    _that.$showWarning("请上传文件");
                    _that.$refs.grid.setRowData([]);
                    _that.$refs.grid.state.totalRowCount = 0;
                    return false;
                }
                try {
                    let resp = await _that.$api.DatasetApi.getFileParsing({docId: docId});
                    let respData = resp.data;
                    if (resp.status !== '0000') {
                        _that.$refs.grid.setRowData([]);
                        _that.$refs.grid.state.totalRowCount = 0;
                        _that.$refs.gridHeadSet.setRowData([]);
                        _that.$refs.gridHeadSet.state.totalRowCount = 0;
                        _that.$showWarning("查询失败");
                        return false;
                    }
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
                    throw ex;
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
            removeDoc() {
                this.docId = '';
                this.form.docId = "";
            },
            handleFile(response) {
                if (response && response.status) {
                    this.docId = response.data.files[0].docId;
                    this.form.docId = response.data.files[0].docId;
                    this.$message.success('文件上传成功！');
                } else {
                    this.$message.error('文件上传失败！');
                }
            },
            defeatFile(err, file) {
                console.log(err, file);
                this.$message.error('文件上传失败！');
            },
            handleExceed() {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            async cmdCreate() {
                let ok = await this.$refs.form.validate();
                let that = this;
                if (ok) {
                    if (!this.form.docId) {
                        that.$showWarning("请先上传文件");
                        return;
                    }
                    let rows = that.gridOptions.api.getRenderedNodes();
                    if (rows.length === 0) {
                        that.$showWarning("请先读取数据");
                        return;
                    }
                    that.disabled = true;
                    that.loading = true;
                    that.gridOptions.api.stopEditing();
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
        }
    }

</script>

<style>
</style>

