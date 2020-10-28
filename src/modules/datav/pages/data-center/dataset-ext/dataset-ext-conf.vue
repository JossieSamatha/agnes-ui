<template>
    <div class="top-main">
        <div class="dash-chart-content" style="height: calc(100% - 60px);"
             v-loading="loading"
             element-loading-text="处理中，请稍后"
             element-loading-background="rgba(0, 0, 0, 0.1)">
            <!--左侧内容-->
            <div class="dash-chart-left dash-chart-data" style="width: 20%">
                <div class="data-block">
                    <div class="block-head">
                        <span>数据集</span>
                        <span class="block-right block-link" @click="openDsDialog">更改数据集</span>
                    </div>
                    <div class="list-item">
                        <i class="icon iconfont icon-shuju icon-dianpu block-icon-color"></i>
                        <span>{{filterArgs.srcDataset.dataSetName}}</span>
                    </div>
                </div>
                <div class="data-block">
                    <div class="block-head">
                        <span>字段</span>
                    </div>
                    <div class="block-main">
                        <div class="block-list">
                            <div class="x-list-pane">
                                <draggable v-model="columns" :clone="cloneField"
                                           :options="{group:{name:'list', pull:'clone',}, draggable:'.item'}">
                                    <div class="list-item item" v-for="(filed,index) in columns"
                                         :key="filed +index">
                                        <i v-if="filed.columnTypeName==='data'" class="icon iconfont icon-calendar"></i>
                                        <i v-else-if="filed.columnTypeName==='number'" class="icon iconfont icon-number"></i>
                                        <i v-else class="icon iconfont icon-text"></i>
                                        <span class="item-title">{{filed.columnLabel}}</span>
                                    </div>
                                </draggable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog
                    title="更改数据集"
                    :visible.sync="dsDialogVisible"
                    width="30%"
                    :before-close="closeDsDialog"
                    :modal-append-to-body="false"
                    id="update-data-source">
                <div class="update-data-source">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="表单" name="table">
                            <ul v-for="(data,index) in dataSets" :key="index">
                                <li style="line-height: 30px;">
                                    <el-radio-group v-model="selectedDataset">
                                        <el-radio :label="data.dataSetName">{{data.dataSetName}}</el-radio>
                                    </el-radio-group>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="数据流" name="data">数据流</el-tab-pane>
                    </el-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dsDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
            </el-dialog>

            <!--中间内容-->
            <div class="dash-chart-main" style="width: 60%">
                <div class="datav-chart-head">
                    <field-filter :filter-args="filterArgs" @setGridData="setGridData">
                    </field-filter>
                </div>
                <div class="chart-main">
                    <div v-if="showGrid" class="datav-chart-head" style="height: calc(100% - 15px);padding: 5px;">
                        <gf-grid toolbar=""
                                 ref="datasetGrid"
                                 :options="gridOptions" @grid-ready="onGridReady" style="height: 100%;"
                        />
                    </div>
                    <div v-if="!showGrid" class="chart-widget">
                        <div class="component-content">
                            <img src="../../../assets/drawericon/dash-guide.png" alt="" class="guide-image">
                            <div class="guide-tip">
                                拖拽左侧字段到
                                <a href="#" class="guide-link">显示字段</a>
                                栏来添加数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧内容-->
            <div class="dash-chart-right chart-config" id="input-config" style="width: 30%">
                <div>
                    <div class="config-block">
                        <div class="">衍生数据集</div>
                        <div class="block-body">
                            <div class="body-btn">
                                <i class="icon iconfont icon-icon_add "></i>
                                <span class="block-right block-link" @click="addDataset">添加数据集</span>
                            </div>
                        </div>
                    </div>
                    <div class="datav-chart-head" style="height: calc(100% - 10px);padding: 5px;">
                        <gf-grid toolbar=""
                                 ref="datasetListGrid"
                                 grid-no="grid-dataset-ext"
                                 :options="gridDatasetOptions" style="height: 100%"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import filedFilter from './filed-filter-conf';
    import lodash from 'lodash';

    export default {
        name: "dataset-ext-conf",
        components: {
            'field-filter': filedFilter
        },
        props: {
            dataset: {type: Object, required: true}
        },
        data() {
            return {
                loading: false,
                dsDialogVisible: false,
                selectedDataset: '',
                activeName: 'table',
                dataSets: [{
                    dataSetName: ''
                }],
                columns: [{
                    columnTypeName: '',
                    columnLabel: ''
                }],
                showGrid: false,
                gridOptions: {
                    columnDefs: [],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: [],
                },
                gridDatasetOptions: {
                    columnDefs: [],
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false
                    },
                    rowData: [],
                },
                filterArgs: {
                    srcDataset: this.dataset,
                    dataset: {dataSetName: '', filter: this.dataset.filter},
                    fields: []
                },
                isUpdateDs: false
            }
        },
        mounted() {
            this.showGrid = false;
            this.selectedDataset = this.filterArgs.srcDataset.dataSetName;
            this.loadDataset();
            this.loadDatasetExt();
        },
        methods: {
            loadDataset() {
                let _this = this;
                _this.loading = true;
                _this.$api.TableDefineApi.getDefines(_this.getDataParams()).then(resp => {
                    _this.columns = resp.data;
                    _this.$api.DatasetApi.listAll().then(res => {
                        _this.dataSets = res;
                        _this.loading = false;
                    });
                });
            },
            loadDatasetExt() {
                let _this = this;
                _this.loading = true;
                _this.$api.DatasetApi.listDatasetExt(_this.getDataParams()).then(resp => {
                    _this.$refs.datasetListGrid.setRowData(resp.data);
                    _this.$refs.datasetListGrid.state.totalRowCount = resp.data.length;
                    _this.loading = false;
                });
            },
            getDataParams(dataset) {
                let _dataset = null;
                if (dataset) {
                    _dataset = dataset;
                } else {
                    _dataset = this.filterArgs.srcDataset;
                    _dataset.filter = this.filterArgs.dataset.filter;
                }
                return {
                    datasourceId: _dataset.datasourceid,
                    datasetId: _dataset.pkId,
                    sql: _dataset.sqlText,
                    filter: _dataset.filter,
                    datasetType: _dataset.dataSetType
                }
            },
            setGridColumnDefs() {
                let gridColumnDefs = lodash.map(this.filterArgs.fields, field => {
                    return {
                        headerName: field['columnLabel'],
                        field: field['columnName'],
                        cellClass: "left",
                        resizable: true,
                        suppressMovable: true,
                        editable: false
                    }
                });
                this.gridOptions.api.setColumnDefs(gridColumnDefs);
            },
            setGridData() {
                let _this = this;
                if (_this.filterArgs.fields.length === 0) {
                    _this.$message.warning("请选择对应的显示字段！");
                    return;
                }
                _this.loading = true;
                let dataset = _this.isUpdateDs ? _this.filterArgs.dataset : null;
                this.$api.DatasetApi.filterDataMap(_this.getDataParams(dataset)).then(resp => {
                    _this.$refs.datasetGrid.setRowData(resp.data);
                    _this.$refs.datasetGrid.state.totalRowCount = resp.data.length;
                    _this.loading = false;
                }).catch(ex => {
                    _this.loading = false;
                    _this.$message.warning("加载数据失败！" + ex.message);
                });
            },
            onGridReady() {
                this.setGridColumnDefs();
                this.setGridData();
            },
            openDsDialog() {
                this.dsDialogVisible = true;
            },
            closeDsDialog() {
                this.dsDialogVisible = false;
            },
            addDataset() {
                this.showGrid = false;
                this.isUpdateDs = false;
                this.$set(this.filterArgs, "fields", []);
                this.$set(this.filterArgs, "dataset", {});
            },
            getDataset() {
                let dataset = {};
                if (this.isUpdateDs) {
                    dataset = this.filterArgs.dataset;
                } else {
                    dataset = this.$utils.deepClone(this.filterArgs.srcDataset);
                    dataset.filter = this.filterArgs.dataset.filter;
                    dataset.dataSetName = this.filterArgs.dataset.dataSetName;
                }
                return dataset;
            },
            selectDataSource(datasetName) {
                let _this = this;
                _this.loading = true;
                for (let i = 0; i < _this.dataSets.length; i++) {
                    let dataSetItem = _this.dataSets[i];
                    if (dataSetItem.dataSetName !== datasetName) {
                        continue;
                    }
                    _this.selectedDataset = dataSetItem.dataSetName;
                    _this.filterArgs = {
                        fields: [],
                        dataset: {},
                        srcDataset: dataSetItem
                    };
                    _this.$api.TableDefineApi.getDefines(_this.getDataParams()).then(resp => {
                        _this.columns = resp.data;
                        _this.loadDatasetExt();
                        _this.loading = false;
                    }).catch(err => {
                        _this.loading = false;
                        _this.$message.success("读取数据集字段定义失败" + err.message);
                    });
                    return;
                }
            },
            confirm() {
                this.dsDialogVisible = false;
                this.selectDataSource(this.selectedDataset);
            },
            saveConfig() {
                let _this = this;
                if (this.filterArgs.fields.length === 0) {
                    _this.$message.warning("请选择对应的显示字段！");
                    return;
                }
                let datasetExt = {
                    dataset: _this.getDataset(),
                    tableDefines: this.filterArgs.fields,
                };
                if (!_this.isUpdateDs) {
                    _this.loading = true;
                    _this.$api.DatasetApi.addDatasetExt(datasetExt).then(function (resp) {
                        _this.loading = true;
                        if (resp && resp.ok) {
                            _this.$message.success("新增衍生数据集成功");
                            _this.loadDatasetExt();
                            _this.loading = false;
                            _this.isUpdateDs = true;
                        } else {
                            _this.loading = false;
                            _this.$message.error("新增衍生数据集失败！");
                        }
                    });
                } else {
                    _this.$api.DatasetApi.updateDatasetExt(datasetExt).then(function (resp) {
                        if (resp && resp.ok) {
                            _this.loadDatasetExt();
                            _this.$message.success("更新衍生数据集成功");
                            _this.loading = false;
                        } else {
                            _this.loading = false;
                            _this.$message.error("更新衍生数据集失败！");
                        }
                    });
                }
            },
            cloneField(original) {
                // 深拷贝对象，防止默认空对象被更改
                let numRandom = Math.floor(Math.random() * 10000);
                let newObj = this.$utils.deepClone(original);
                newObj.copyField = newObj.columnName + numRandom;
                return newObj;
            },
            async cmdUpdate(rowData) {
                let _this = this;
                if (!rowData) {
                    _this.$message.error("当前未选中要编辑的数据！");
                    return false;
                }
                _this.loading = true;
                _this.isUpdateDs = true;
                let resp = await this.$api.TableDefineApi.getDefines(_this.getDataParams(rowData.data));
                this.$set(_this.filterArgs, "fields", resp.data);
                this.$set(_this.filterArgs, "dataset", rowData.data);
                if (_this.showGrid) {
                    this.setGridColumnDefs();
                    this.setGridData()
                }
                _this.loading = false;
            },
            async cmdRemove(params) {
                let _this = this;
                let row = params.data;
                this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.DatasetApi.remove(row).then((resp => {
                        if (resp && resp.ok) {
                            _this.$message.success("删除成功");
                            _this.addDataset();
                            if (_this.filterArgs.dataset.pkId === row.pkId) {
                                _this.addDataset();
                            }
                            _this.loadDatasetExt();
                        } else {
                            _this.$message.warning("删除失败");
                        }
                    }))
                }).catch(() => {
                });
            }
        },
        watch: {
            filterArgs: {
                handler() {
                    this.showGrid = this.filterArgs.fields.length > 0;
                    if (this.showGrid && this.gridOptions.api) {
                        this.setGridColumnDefs();
                    }
                },
                deep: true
            }
        }
    }
</script>

