<template>
    <el-scrollbar class="pagescroll-vertical" :native="false" :noresize="false">
        <el-row>
            <el-col :span="12">
                <div class="k2rs-ds-type" @click="createByDB">
                    <div class="k2rs-ds-type-icon k2rs-ds-type-db">
                        <el-button type="text" icon="el-icon-coin"></el-button>
                    </div>
                    <div class="k2rs-ds-type-title">关系型数据库</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="k2rs-ds-type" @click="createByFile">
                    <div class="k2rs-ds-type-icon k2rs-ds-type-file">
                        <el-button type="text" icon="el-icon-document"></el-button>
                    </div>
                    <div class="k2rs-ds-type-title">上传文件</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="k2rs-ds-type" @click="createBySData">
                    <div class="k2rs-ds-type-icon k2rs-ds-type-sdata">
                        <el-button type="text" icon="el-icon-s-data"></el-button>
                    </div>
                    <div class="k2rs-ds-type-title">静态数据</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="k2rs-ds-type" @click="createByApi">
                    <div class="k2rs-ds-type-icon k2rs-ds-type-api">
                        <el-button type="text" icon="el-icon-cpu"></el-button>
                    </div>
                    <div class="k2rs-ds-type-title">数据抽取</div>
                </div>
            </el-col>
        </el-row>
    </el-scrollbar>
</template>

<script>
    import Rdb from "./rdb/rdb";
    import Fileupload from './fileupload/dataset-file';
    import StaticDataAdd from "./staticdata/add.vue";
    import APIInterfaceConfig from "./getapi/add.vue";

    export default {
        name: "DataSetAdd",
        props: {},
        data() {
            return {}
        },
        methods: {
            createByDB(action) {
                this.createDs(Rdb, action, 'rdb', "数据库");
            },
            createByFile(action) {
                this.createDs(Fileupload, action, 'file', "文件");
            },
            createBySData(action) {
                this.createDs(StaticDataAdd, action, 'sdata', "静态数据");
            },
            createByApi(action) {
                this.createDs(APIInterfaceConfig, action, 'api', "接口");
            },
            createDs(component, action, dataSetType, typeName) {
                this.$dialog.close(this, action);
                const view = {
                    id: "createDs",
                    title: "新建数据集["+ typeName + "]",
                    component: component,
                    closeable: true,
                    args: {mode: "c", dataSetType: dataSetType}
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

