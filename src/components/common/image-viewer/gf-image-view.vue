<template>
    <div style="height:100%;width:100%;">
        <div style="white-space:nowrap;width:100%;border-bottom: 1px solid #eee">
            <el-button-group style="margin-left: 2px">
                <el-button type="primary" title="放大图像" @click="zoomIn" size="small" icon="el-icon-zoom-in"></el-button>
                <el-button type="primary" title="缩小图像" @click="zoomOut" size="small"
                           icon="el-icon-zoom-out"></el-button>
                <el-button type="primary" title="恢复正常显示图片" @click="fitWidth" size="small"
                           icon="el-icon-rank"></el-button>
                <el-button type="primary" title="下载图片" @click="download" size="small"
                           icon="el-icon-download"></el-button>
            </el-button-group>
            <el-button-group v-if="files.length > 1">
                <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="lastFile"
                           :disabled="!showLastFile">上一文件
                </el-button>
                <el-button type="primary" size="small" @click="nextFile" :disabled="!showNextFile">下一文件<i
                        class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <el-button-group v-if="files.length > 1">
                <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="lastPage"
                           :disabled="!showLastPage">
                    上一页
                </el-button>
                <el-button type="primary" size="small" @click="nextPage" :disabled="!showNextPage">下一页<i
                        class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <span v-if="files.length > 1" style="padding: 10px;color: #5a5e66;">{{fileIndex+1}}&nbsp;/&nbsp;{{files.length}}</span>
        </div>
        <div style="width:100%;height:calc(100% - 35px);">
            <div style="width:100%;height:100%;margin-top: 2px;">
                <gf-anno-view :ann="imageData" @ready="onViewReady"></gf-anno-view>
            </div>
        </div>
    </div>
</template>

<script>
    import GfAnnoView from './gf-anno-view'

    export default {
        props: {
            fileId: {
                type: String
            },
            files: {
                type: Array
            }
        },
        data() {
            return {
                ecmFieldId: '',
                imageData: {
                    viewerOptions: {viewHorizontalAlignment: 1, viewVerticalAlignment: 0},
                    styles: {
                        defaultZone: {fillColor: 'yellow'}
                    },
                    imageUrl: ''
                },
                showLastPage: false,//上一页
                showNextPage: false,//下一页
                showLastFile: false,//上一文件
                showNextFile: true,//下一文件
                fileIndex: 0,//当前文件序号
                splitDocId: '',//分割后的docId（PDF、tif）
                multFiles: [],//分割后的docId（PDF、tif）
                filePageIndex: 0//当前文件页数
            }
        },
        computed: {
            drawerTitle() {
                if (!this.title) return '';
                if (this.title.length > 1) {
                    return this.title[0] + '-' + this.modeArr[this.title[1]];
                } else {
                    return this.title[0];
                }
            },
        },
        components: {
            GfAnnoView
        },
        watch: {
            'fileId': 'fileIdChange'
        },
        methods: {
            zoomIn() {
                this.imageData.api.zoomScale(1.2);
            },
            zoomOut() {
                this.imageData.api.zoomScale(0.8);
            },
            fitWidth() {
                this.imageData.api.fitWidth();
            },
            download() {
                if (this.ecmFieldId) {
                    const basePath = window.location.href.split("#/")[0];
                    let downLoadUrl = basePath + "api/ecm-server/ecm/file/download/" + this.ecmFieldId;
                    window.open(downLoadUrl, "_self");
                }
            },

            //上一页
            lastPage() {
                let lastIndex = this.filePageIndex - 1;
                if (lastIndex < 0) {
                    return;
                }
                if (lastIndex == 0) {
                    this.showLastPage = false;
                    this.showNextPage = true;
                }
                this.filePageIndex = lastIndex;
                let objectId = this.multFiles[lastIndex].objectId;
                this.$emit("listenToChildEvent", this.fileIndex, lastIndex + 1);
                this.changeImageHandle(this.splitDocId, objectId);
            },

            //下一页
            nextPage() {
                let nextIndex = this.filePageIndex + 1;
                if (nextIndex == this.multFiles.length - 1) {
                    this.showNextPage = false;
                    this.showLastPage = true;
                }
                this.filePageIndex = nextIndex;
                let objectId = this.multFiles[nextIndex].objectId;
                this.$emit("listenToChildEvent", this.fileIndex, nextIndex + 1);
                this.changeImageHandle(this.splitDocId, objectId);
            },

            //上一文件
            lastFile() {
                this.showLastPage = false;
                this.showNextPage = false;
                this.filePageIndex = 0;
                this.multFiles = [];
                this.fileIndex--;
                this.ecmFieldId = this.files[this.fileIndex].ecmFileId;
                if (this.files[this.fileIndex].splitDocId) {
                    this.$emit("listenToChildEvent", this.fileIndex, 1);
                    this.detailSplitFile(this.files[this.fileIndex].splitDocId)
                } else {
                    this.$emit("listenToChildEvent", this.fileIndex);
                    this.changeImageHandle(this.files[this.fileIndex].docId, this.ecmFieldId);
                }
                // this.refreshList();
                if (this.fileIndex >= (this.files.length - 1)) {
                    this.showNextFile = false;
                } else {
                    this.showNextFile = true;
                }
                if (this.fileIndex == 0) {
                    this.showLastFile = false;
                } else {
                    this.showLastFile = true;
                }
            },

            //下一文件
            nextFile() {
                this.showLastPage = false;
                this.showNextPage = false;
                this.filePageIndex = 0;
                this.multFiles = [];
                this.fileIndex++;
                this.ecmFieldId = this.files[this.fileIndex].ecmFileId;
                if (this.files[this.fileIndex].splitDocId) {
                    this.$emit("listenToChildEvent", this.fileIndex, 1);
                    this.detailSplitFile(this.files[this.fileIndex].splitDocId)
                } else {
                    this.$emit("listenToChildEvent", this.fileIndex);
                    this.changeImageHandle(this.files[this.fileIndex].docId, this.ecmFieldId);
                }
                this.showNextFile = false;
                if (this.fileIndex >= (this.files.length - 1)) {
                    this.showNextFile = false;
                } else {
                    this.showNextFile = true;
                }
                if (this.fileIndex == 0) {
                    this.showLastFile = false;
                } else {
                    this.showLastFile = true;
                }
            },

            onViewReady: function () {
                //防止控件初始化失败，初始化成功后查询数据并显示
                this.init();
            },
            detailSplitFile(splitDocId) {
                this.splitDocId = splitDocId;
                //获取文件列表
                this.$api.ecmUploadApi.getOisFileList(this.splitDocId).then((resp) => {
                    if (resp.files) {
                        this.multFiles = resp.files;
                        this.ecmFieldId = this.multFiles[this.filePageIndex].objectId;
                        this.changeImageHandle(this.splitDocId, this.ecmFieldId);
                        if (this.multFiles.length > 1) {
                            this.showNextPage = true;
                        }
                    }
                });
            },

            refreshList: function () {
                var viewData = this;
                try {
                    // var files = this.files;//有几个doc元素说明有几张图片若只有一张则显示详情，否则则显示【多张影像】字样
                    if (this.files.length > 1) {
                        let fileInfo = this.files[0];
                        viewData.ecmFieldId = fileInfo.objectId;
                        if (fileInfo.splitDocId) {
                            this.detailSplitFile(fileInfo.splitDocId)
                        } else {
                            this.splitDocId = '';
                        }
                        viewData.showNextFile = true;
                        viewData.showLastFile = false;
                    } else {
                        let fileInfo = this.files[0];
                        viewData.ecmFieldId = fileInfo.objectId;
                        if (fileInfo.splitDocId) {
                            this.detailSplitFile(fileInfo.splitDocId)
                        } else {
                            this.splitDocId = '';
                        }
                        viewData.showNextFile = false;
                        viewData.showLastFile = false;
                    }
                    if (viewData.ecmFieldId) {
                        this.changeImageHandle(this.splitDocId, viewData.ecmFieldId);
                    }
                } catch (e) {
                    console.log("图像展示控件，调用refreshList 失败");
                }
            },
            setImageUrl: function (srcDocId, fileId) {
                let data = this;
                if (srcDocId == undefined && fileId == undefined) {
                    fileId = data.ecmFieldId;
                    data.selectedValue = data.ecmFieldId;
                }
                this.ecmFieldId = fileId;
                data.imageData.api.clearZone();
                const basePath = window.location.href.split("#/")[0];
                data.imageData.api.setImageUrl(basePath + "api/ecm-server/ecm/file/download/" + fileId);
                data.imageData.api.fitWidth();
            },
            init: function () {
                this.ecmFieldId = this.fileId;
                this.refreshList();
            },
            changeImageHandle: function (docId, fileId) {
                this.setImageUrl(docId, fileId);
            },
            fileIdChange: function () {
                this.refreshList();
            },
            showFieldZone: function (positionX, positionY, fieldWidth, fieldHeight, zoneStyle, centerAtZone) {
                if (!zoneStyle) {
                    zoneStyle = 'defaultZone';
                }
                let zone = {
                    style: zoneStyle,
                    rect: {x: positionX, y: positionY, width: fieldWidth, height: fieldHeight}
                };
                let zones = new Array();
                zones.push(zone);

                data.imageData.zoneList = zones;
                data.imageData.api.updateZoneList();
                if (centerAtZone) {
                    data.imageData.api.centerAtZone(zone, 1);
                }
            },
            showFieldZones: function (zoneList) {
                zoneList.forEach((zone) => {
                    this.showFieldZone(zone.positionX, zone.positionY, zone.fieldWidth, zone.fieldHeight, zone.zoneStyle);
                });
            }
        }

    }

</script>
