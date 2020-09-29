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
                <el-form-item label-width="0">
                    <div class="dataset-edit-container">
                        <div class="left">
                            <section>
                                <p class="title">
                                    <span>1.选择数据源</span>
                                    <span class="optionBtn" @click="newDataSource" title="新建数据源"><i class="el-icon-folder-add"></i></span>
                                </p>
                                <div class="content">
                                    <el-select v-model="form.datasourceid" size="small" @change="changeDatasource">
                                        <el-option
                                                v-for="item in datasource"
                                                :key="item.datasourceId"
                                                :label="item.datasourceName"
                                                :value="item.datasourceId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </section>
                            <section>
                                <p class="title">
                                    <span>2.选择数据内容</span>
                                    <span></span>
                                </p>
                                <div class="content">
                                    <gf-grid toolbar="find" :options="gridTableOptions" ref="gridTableName"
                                             grid-no="grid-table-name" @selected-changed="changedTable">
                                    </gf-grid>
                                </div>
                            </section>
                        </div>
                        <p class="img-container"><img src="../../../../assets/datacenter/arrow.png"></p>
                        <div class="right">
                            <section>
                                <p class="title">
                                    <span>3.已选中表</span>
                                </p>
                                <gf-input type="text" v-model="form.sqlText"/>
                            </section>
                            <section>
                                <p class="title">
                                    <span>4.编辑表字段</span>
                                    <span></span>
                                </p>
                                <div class="content">
                                    <div class="content">
                                        <gf-grid
                                                toolbar=""
                                                ref="gridColumn"
                                                :options="gridColumnOptions"
                                                grid-no="grid-dataset-db"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-form-item label="4.数据列表" :label-width="formLabelWidth" style="margin-bottom: 0">
                        <gf-button type="primary" @click="doView">重新读取</gf-button>
                        <gf-grid
                                toolbar=""
                                ref="gridData"
                                :options="gridDataOptions"
                                toolbar-right-max-width="100%"
                        />
                    </el-form-item>
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

    export default {
        name: "Rdb",
        props: {
            row: {type: Object, required: false},
            dataSetType: {type: String, required: true},
        },
        data() {
            return {
                loading: false,
                form: {
                    sqlText: "",
                    datasourceid: "",
                    dataSetName: "",
                    dataSetNote: "",
                    dataSetType: this.dataSetType,
                },
                datasource: {},
                rules: {
                    dataSetName: [{required: true, message: "请输入数据集名称"}],
                },
                gridTableOptions: {},
                gridColumnOptions: {
                    onCellEditingStopped: function (event) {
                        let field = event.colDef.field;
                        if (field === 'columnLabel' || field === 'visible') {
                            event.api.execCmd('onCellEdit', event);
                        }
                    },
                },
                gridDataOptions: {
                    ext: {
                        checkboxColumn: 0,
                        pagingMode: false,
                        autoFitColumnMode: 3,
                    }
                },
                tableCur: 0,
                formLabelWidth: '150'
            };
        },
        mounted() {
            if (this.row) {
                this.form = this.row;
                this.doView();
            }
            this.changeDatasource();
            this.getDataSourceListAll();
        },
        methods: {
            changedTable() {
                let rows = this.gridTableOptions.api.getSelectedRows();
                if (rows.length > 0) {
                    this.form.sqlText = 'select * from' + ' ' + rows[0].tableName;
                    this.doView();
                }
            },
            getDataSourceListAll() {
                this.$api.DatasourceApi.listAll().then((resp) => {
                    this.datasource = resp.data;
                })
            },
            onCancel() {
                this.$tabBar.closeCurrentTab();
            },
            onSave() {

            },
            onUpdate() {

            },
            async cmdCreate() {
                let ok = await this.$refs.form.validate();
                let that = this;
                if (ok) {
                    if (!that.form.datasourceid) {
                        that.$showWarning("请先选择数据源");
                        return;
                    }
                    if (!that.form.sqlText.trim()) {
                        that.$showWarning("请选择读取的表");
                        return;
                    }

                    // 字段定义
                    let columns = that.gridColumnOptions.api.getRenderedNodes();
                    if (columns.length === 0) {
                        that.$showWarning("表字段读取错误");
                        return;
                    }
                    that.disabled = true;
                    that.loading = true;
                    that.gridColumnOptions.api.stopEditing();

                    // 表结构定义
                    let tableDefines = that.$refs.gridColumn.getRowData();
                    let data = {dataset: that.form, tableDefines: tableDefines};
                    if (!that.form.pkId) {
                        that.form.dataSetType = that.dataSetType;
                        this.$api.DatasetApi.addDataset(data).then(function (resp) {
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
                        this.$api.DatasetApi.updateDataset(data).then(function (resp) {
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
                        }).catch((e) => {
                            that.loading = false;
                            that.disabled = false;
                            that.$message.error("修改数据集失败！", e);
                        });
                    }
                }
            },
            async changeDatasource() {
                let _that = this;
                let datasourceId = _that.form.datasourceid;
                let params = {id: datasourceId};
                let resp = await _that.$api.DatasourceApi.getTable(params);
                _that.$refs.gridTableName.setRowData(resp.data);
            },
            async doView() {
                let _that = this;
                let sql = _that.form.sqlText.trim();
                let datasourceId = _that.form.datasourceid;
                if (!datasourceId) {
                    _that.$showWarning("请先选择数据源");
                    return;
                }
                if (!sql) {
                    _that.$showWarning("请选择读取的表");
                    _that.resetGrid();
                    return false;
                }

                try {
                    _that.loading = true;
                    let params = _that.getParams();
                    let tableDefineRsp = await _that.$api.TableDefineApi.getDefines(params);
                    if (tableDefineRsp.status !== '0000') {
                        _that.loading = false;
                        _that.resetGrid();
                        return false;
                    }
                    let tableDefines = tableDefineRsp.data;
                    _that.$refs.gridColumn.setRowData(tableDefines);
                    _that.$refs.gridColumn.state.totalRowCount = tableDefines.length;

                    // 动态设置数据表中表头
                    let gridDataGridOptions = _that.getGridDataGridOptions(tableDefines);
                    _that.gridDataOptions.api.setColumnDefs(gridDataGridOptions);

                    // 数据表
                    let resp = await _that.$api.DatasetApi.filterDataMap(params);
                    let dataRows = resp.data;
                    if (resp.status !== '0000') {
                        _that.loading = false;
                        _that.resetGrid();
                        _that.$showWarning("查询失败");
                        return false;
                    }
                    _that.$refs.gridData.setRowData(dataRows);
                    _that.$refs.gridData.state.totalRowCount = dataRows.length;
                    _that.loading = false;
                } catch (ex) {
                    _that.loading = false;
                    _that.resetGrid();
                    throw ex;
                }
            },
            resetGrid() {
                this.$refs.gridColumn.setRowData([]);
                this.$refs.gridColumn.state.totalRowCount = 0;
                this.$refs.gridData.setRowData([]);
                this.$refs.gridData.state.totalRowCount = 0;
            },
            getParams() {
                return {
                    datasourceId: this.form.datasourceid,
                    datasetType: this.form.dataSetType,
                    datasetId: this.form.pkId,
                    sql: this.form.sqlText.trim(),
                    filter: ''
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
            newDataSource() {
                let viewId = 'dtr.config.datasource';
                let pageView = this.$app.views.getView(viewId);
                let tabView = Object.assign({id: viewId}, pageView);
                this.$nav.showView(tabView);
            },
            cmdCancel() {
                this.$parent.closeTab("createDs");
            },
            onCellEdit() {
                let colDefs = this.$refs.gridColumn.getRowData();
                let gridDataGridOptions = this.getGridDataGridOptions(colDefs);
                this.gridDataOptions.api.setColumnDefs(gridDataGridOptions);
            }
        }
    }
</script>

<style scoped>
    .tab {
        margin-bottom: 0px;
        height: 30px;
    }

    .tab div {
        width: 50%;
        float: left;
        text-align: center;
        cursor: pointer;
    }
    .active {
        width: 50%;
        color: #3f7dff;
        padding-bottom: 1px;
        border-bottom: 2px solid #3f7dff;
    }

    .border {
        border: 1px solid #BDC3C7;
    }

    .background-color {
        background-color: #F0F0F0;
    }

    .first-line-header {
        font-weight: bold;
        font-size: 16px;
        color: black;
    }

    .dataset-edit-container {
        display: flex;
        flex-direction: row;
        border: 1px solid #EAEDF1;
    }

    .dataset-edit-container .img-container {
        align-self: center;
        margin: 0 10px;
    }

    .dataset-edit-container > .left {
        width: 280px;
        padding: 10px;
        border-right: 1px solid #EAEDF1;
    }

    .dataset-edit-container section + section {
        margin-top: 10px;
    }

    .dataset-edit-container .title {
        display: flex;
        justify-content: space-between;
        position: relative;
        color: #333;
        padding-left: 8px;
        margin-bottom: 10px;
    }

    .dataset-edit-container .title::before {
        content: '';
        display: block;
        position: absolute;
        width: 2px;
        height: 14px;
        left: 0;
        top: 2px;
        background: #476DBE;
    }

    .dataset-edit-container .title > .optionBtn {
        font-size: 16px;
        cursor: pointer;
    }

    .dataset-edit-container .title > .optionBtn:hover {
        color: #476DBE;
    }

    .dataset-edit-container .content {
        height: 100%;
        margin: 0;
    }

</style>

<style>
    .dataset-edit-container .el-select {
        width: 100%;
    }

    .dataset-edit-container .content > .el-tabs {
        width: 100%;
    }

    .dataset-edit-container .content > .el-tabs .el-tabs__header .el-tabs__item {
        width: 70px;
    }

    .dataset-edit-container .content > .el-tabs.el-tabs--card .el-tabs__content {
        padding: 5px;
    }

    .dataset-edit-container .content > .el-tabs .gf-ag-grid.ag-theme-balham .ag-root,
    .dataset-edit-container .content > .el-tabs .gf-ag-grid.ag-theme-balham .ag-header {
        border-top: none;
    }

    .dataset-edit-container .content > .el-tabs .ag-grid-box .grid-action-panel {
        padding: 0;
    }

    .dataset-edit-container > .right {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #EAEDF1;
    }

</style>
