<template>
    <div>
        <div class="data-block">
            <div class="block-head">
                <span>数据集</span>
                <span class="block-right block-link" @click="showDialog">更改数据集</span>
            </div>
            <div class="list-item" v-if="this.dataSetId ||this.checkId">
                <i class="icon iconfont icon-shuju icon-dianpu block-icon-color icon-change"></i>
                <el-tree
                        class="tree"
                        ref="dataTree"
                        :data="listData"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        check-strictly
                        :default-checked-keys="[dataSetId]"
                        check-on-click-node
                        @check="getFieldData"
                        @check-change="nodeClick"
                >
                </el-tree>
            </div>
        </div>
        <div class="data-block">
            <div class="block-head">
                <span>字段</span>
            </div>
            <div class="block-main">
                <div class="block-list">
                    <div class="x-list-pane">
                        <draggable v-model="columnDefsList"
                                   :clone="cloneField"
                                   :options="{group:{name:'list', pull:'clone'},sort: false, draggable:'.item'}">
                            <div class="list-item item" v-for="(field,index) in columnDefsList"
                                 :key="field +index">
                                <i v-if="field.typeName==='date'" class="icon iconfont icon-rili"></i>
                                <i v-else-if="field.typeName==='number'" class="icon iconfont icon-number"></i>
                                <i v-else class="icon iconfont icon-text"></i>
                                <span class="item-title">{{field.headerName}}</span>
                            </div>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
                title="更改数据集"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="closeDialog"
                :modal-append-to-body="false"
                id="update-data-source">
            <div class="update-data-source">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="数据集" name="table">
                        <el-tree
                                ref="dataSetTree"
                                :data="dataSetName"
                                show-checkbox
                                default-expand-all
                                check-strictly
                                node-key="id"
                                @check-change="handleNodeClick"
                        >
                        </el-tree>
                    </el-tab-pane>
                    <el-tab-pane label="数据流" name="data">数据流</el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "data-left",
        props: {
            dataSourceId: String,
        },
        data() {
            return {
                checked: false,
                dialogVisible: false,
                activeName: 'table',
                dataSetName: [],
                listData: [],
                columnDefsList: [],
                children: "",
                resData: [],
                temp: "",
                dataSetId: "",
                checkId: "",
            }
        },
        methods: {
            initData(dataSetId) {
                this.$api.dataSetApi.getCaseDefList().then(res => {
                    let resData = [];
                    this.listData = [];
                    if(res.data<1){
                        return;
                    }
                    res.data.forEach(dataItem => {
                        let obj = {};
                        obj.label = dataItem.dataSetName;
                        obj.id = dataItem.dataSetId;
                        if (dataItem.children) {
                            let childList = [];
                            dataItem.children.forEach(childItem => {
                                let childObj = {};
                                childObj.id = childItem.dataSetId;
                                childObj.label = childItem.dataSetName;
                                childList.push(childObj);
                            })
                            obj.children = childList;
                        }
                        resData.push(obj);
                        this.dataSetName = resData;
                        this.resData = resData;
                    })
                    let dataSetObj = {};
                    this.resData.forEach(resDataItem => {
                        if (resDataItem.id === dataSetId) {
                            dataSetObj = resDataItem;
                        } else {
                            resDataItem.children.forEach(childItem => {
                                if (childItem.id == dataSetId) {
                                    resDataItem.id = childItem.parentId;
                                    dataSetObj = resDataItem;
                                }
                            })
                        }

                    })
                    this.listData.push(dataSetObj);
                    this.fieldData(dataSetId);
                    this.dataSetId = dataSetId;
                });
            },
            showDialog() {
                this.dialogVisible = true;
            },
            closeDialog() {
                this.dialogVisible = false;
            },
            getFieldData() {
                let id = this.$refs.dataTree.getCheckedNodes()[0].id;
                this.$api.DatavDatavApi.dataSourceColumns(id).then(res => {
                    this.columnDefsList = res.data;
                });
            },
            fieldData(dataSetId) {
                this.$api.DatavDatavApi.dataSourceColumns(dataSetId).then(res => {
                    this.columnDefsList = res.data;
                });
            },
            confirm() {
                this.xAxis = [];
                this.yAxis = [];
                this.filter = [];
                this.dialogVisible = false;
                this.createChart();
                this.listData = [];
                if (this.$refs.dataSetTree && this.$refs.dataSetTree.getCheckedNodes()) {
                    let checkId = this.$refs.dataSetTree.getCheckedNodes()[0].id;
                    this.$emit('dataSetIdLeft', checkId);
                    let obj = {};
                    this.resData.forEach(resItem => {
                        if (resItem.id === checkId) {
                            obj = resItem;
                        } else {
                            resItem.children.forEach(childItem => {
                                if (childItem.id == checkId) {
                                    resItem.id = childItem.parentId;
                                    obj = resItem;
                                }
                            })
                        }
                    })
                    this.listData.push(obj);
                    this.checkId = checkId
                }
                let id = this.$refs.dataSetTree.getCheckedNodes()[0].id;
                this.$api.DatavDatavApi.dataSourceColumns(id).then(res => {
                    this.columnDefsList = res.data;
                    this.$refs.dataTree.setCheckedKeys([id]);
                    // this.$app.runCmd("initGridDataCmd", this.columnDefsList)
                });
                // this.$emit('listData',this.listData)
            },
            createChart() {
                if (this.xAxis && this.yAxis && this.xAxis.length > 0 && this.yAxis.length > 0) {
                    if (this.editItemType === 'ct-line-bar') {
                        if (this.lineBarAxis && this.lineBarAxis.length > 0) {
                            this.yAxis = this.lineBarAxis;
                        }
                    }
                    this.initChartData(this.xAxis, this.yAxis, this.filter, this.editItemType);
                    this.isUpdate = true;
                } else {
                    this.isUpdate = false;
                }
            },
            cloneField(original) {
                // 深拷贝对象，防止默认空对象被更改
                let numRandom = this.rand(1000, 9999);
                var newObj = this.$utils.deepClone(original);
                newObj.field = newObj.field + numRandom;
                /*添加是否显示级联面板标识*/
                newObj.showCascader = false;
                return newObj;
            },
            rand(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            },
            handleNodeClick(data, checked) {
                if (checked === true) {
                    this.checkedId = data.id;
                    this.$refs.dataSetTree.setCheckedKeys([data.id]);
                } else {
                    if (this.checkedId === data.id) {
                        this.$refs.dataSetTree.setCheckedKeys([data.id]);
                    }
                }
            },
            nodeClick(data, checked) {
                if (checked === true) {
                    this.checkedId = data.id;
                    this.$refs.dataTree.setCheckedKeys([data.id]);
                } else {
                    if (this.checkedId === data.id) {
                        this.$refs.dataTree.setCheckedKeys([data.id]);
                    }
                }
                this.$emit('dataSetIdLeft', data.id);
            },
            editItemData() {
                this.$api.DatavDatavApi.dataSourceList().then(res => {
                    let resData = [];
                    res.data.forEach(dataItem => {
                        /*数据集赋值*/
                        let obj = {};
                        obj.label = dataItem.dataSetName;
                        obj.id = dataItem.dataSetId;
                        if (dataItem.children) {
                            let childList = [];
                            dataItem.children.forEach(childItem => {
                                let childObj = {};
                                childObj.id = childItem.dataSetId;
                                childObj.label = childItem.dataSetName;
                                childObj.parentId = dataItem.dataSetId;
                                childList.push(childObj);
                            })
                            obj.children = childList;
                        }
                        resData.push(obj);
                        this.dataSetName = resData;
                        this.resData = resData;
                    })
                });
            },
        },
        mounted() {
            this.editItemData();
        },
        watch: {
            columnDefsList: {
                handler(val) {
                    this.$emit("getStrList", val)
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>
<style scoped>
    .icon-change {
        position: absolute;
        left: 20px;
        top: -2px;
    }

    .tree {
        position: relative;
        background-color: #F4F6F9;
        overflow-x: auto;
        margin-left: 10px;
    }
</style>
