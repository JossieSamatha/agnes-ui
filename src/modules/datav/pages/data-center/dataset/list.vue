<template>
    <gf-grid-curd class="index-ag-grid" height="100%"
                  grid-no="grid-dataset-item"
                  ref="grid"
                  :toolbar="toolbar"
                  @delete="cmdDelete"
                  @selected-changed="onSelectedChanged">
        <el-button-group slot="after-buttons">
            <el-button
                    size="small"
                    v-show="toolbar.includes('addEnable')"
                    type="primary"
                    icon="el-icon-circle-plus"
                    @click="cmdCreate"
                    :disabled="toolState.c.disabled"
            >新增
            </el-button>
            <el-button
                    size="small"
                    v-show="toolbar.includes('editEnable')"
                    type="primary"
                    icon="el-icon-edit"
                    @click="cmdEdit"
                    :disabled="toolState.u.disabled"
            >修改
            </el-button>
            <el-button
                    size="small"
                    v-show="toolbar.includes('removeEnable')"
                    type="primary"
                    icon="el-icon-delete"
                    @click="cmdDelete"
                    :disabled="toolState.d.disabled"
            >删除
            </el-button>
        </el-button-group>
    </gf-grid-curd>
</template>

<script>
    import DataSetAdd from "./add.vue";
    import Rdb from "./rdb/rdb";
    // import Fileupload from './fileupload/add';
    import Fileupload from './fileupload/dataset-file';
    import StaticDataAdd from "./staticdata/add.vue";
    import APIInterfaceConfig from "./getapi/add.vue";
    import DatasetExtConf from '../dataset-ext/dataset-ext';

    export default {
        components: {},
        props: {
            toolbar: {
                default:
                    "addEnable,editEnable,removeEnable,find,refresh,more"
            }
        },
        data() {
            return {
                dialog: DataSetAdd,
                toolState: {
                    c: {
                        visible: true,
                        disabled: false
                    },
                    u: {
                        visible: true,
                        disabled: true
                    },
                    d: {
                        visible: true,
                        disabled: true
                    }
                }
            }
        },
        mounted() {
            this.doQuery();
        },
        methods: {
            async cmdCreate() {
                this.$dialog.create({
                    id: `dataSet.add`,
                    title: "选择新增数据集类型",
                    component: DataSetAdd,
                    width: '500px',
                });
            },
            doQuery() {
                this.$refs.grid.reloadData(true);
            },
            async cmdDelete() {
                var currNodes = this.$refs.grid.getSelectedNodes();
                if (currNodes.length !== 1) {
                    return false;
                }
                var ok = await this.$ask(
                    "此操作将删除当前数据集，是否继续?"
                );
                if (!ok) {
                    return false;
                }
                for (var i = 0; i < currNodes.length; i++) {
                    var params = currNodes[i];
                    this.cRemove(params);
                }
            },
            async cRemove(params) {
                var row = params.data;
                var that = this;
                try {
                    this.$api.DatasetApi.remove(row).then(function (resp) {
                        if (resp && resp.ok && resp.data === true) {
                            that.doQuery();
                        }
                    })
                } catch (reason) {
                    this.$msgbox({
                        type: "warning",
                        title: "错误",
                        message: "删除操作失败!" + reason.message
                    });
                    return false;
                }
            },
            async cmdEdit() {
                var currNodes = this.$refs.grid.getSelectedNodes();
                if (currNodes.length !== 1) {
                    return false;
                }
                var row = currNodes[0].data;
                if (row.dataSetType === "file") {
                    this.createByFile(row);
                } else if (row.dataSetType === "rdb") {
                    this.createByDB(row);
                } else if (row.dataSetType === "api") {
                    this.createByApi(row);
                } else if (row.dataSetType === "sdata") {
                    this.createBySData(row)
                } else {
                    this.createByFile(row);
                }
            },
            createByDB(row) {
                this.createDs(Rdb, row, 'rdb', "数据库");
            },
            createByFile(row) {
                this.createDs(Fileupload, row, 'file', "文件");
            },
            createBySData(row) {
                this.createDs(StaticDataAdd, row, 'sdata', "静态数据");
            },
            createByApi(row) {
                this.createDs(APIInterfaceConfig, row, 'api', "接口");
            },
            createDs(component, row, dataSetType, typeName) {
                const view = {
                    id: "createDs",
                    title: "编辑数据集-[" + typeName + "]",
                    component: component,
                    closeable: true,
                    args: {mode: "u", row: row, dataSetType: dataSetType}
                };
                this.$nav.showView(view);
            },
            onSelectedChanged(gridState) {
                this.toolState.u.disabled = gridState.selectedCount < 1;
                this.toolState.d.disabled = gridState.selectedCount < 1;
                this.$emit("selected-changed", gridState);
            },
            async cmdSetDataset(rowData) {
                if (!rowData) {
                    this.$message.error("当前未选中要编辑的数据！");
                    return false;
                }

                let selectedRow =  Object.assign({},rowData.data);
                let view = {
                    id: "setDataset",
                    title: "衍生数据集",
                    component: DatasetExtConf,
                    closeable: true,
                    args: {dataset: selectedRow}
                };
                this.$nav.showView(view);
            }
        }
    }
</script>
<style>
    .k2rs-ds-type {
        width: 90%;
        margin: auto;
        height: 120px;
        border: 1px #eee solid;
        text-align: center;
        padding: 0px 10px;
    }

    .k2rs-ds-type-icon {
        line-height: 80px;
        border-bottom: 1px #eee solid;
    }

    .k2rs-ds-type-icon .el-button {
        padding: 0px;
    }

    .k2rs-ds-type-icon i {
        font-size: 36px !important;
    }

    .k2rs-ds-type-icon i.el-icon-coin {
        color: #0e8c8c;
    }

    .k2rs-ds-type-icon i.el-icon-document {
        color: #0ea432;
    }

    .k2rs-ds-type-icon i.el-icon-s-data {
        color: #0d71bb;
    }

    .k2rs-ds-type-icon i.el-icon-cpu {
        color: #f09600;
    }

    .k2rs-ds-type-title {
        text-align: center;
        line-height: 39px;
    }
</style>