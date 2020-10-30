<template>
    <el-upload class="ecm-upload acc-ecm-upload"
               :class="disabled ? 'is-disabled': ''"
               action="/api/ecm/ecm/doc/upload"
               :drag="true"
               :data="uploadData"
               :before-upload="checkFile"
               :on-progress="uploadProgress"
               :on-success="uploadSuccess"
               :on-remove="onRemove"
               :on-error="uploadError"
               :on-exceed="sizeExp"
               :multiple="true"
               :limit="limit"
               :disabled="disabled"
               :show-file-list="false"
               :file-list="fileList"
               v-loading.fullscreen.lock="uploadFileLoading"
               element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="文件上传中，请稍后">
        <div>
            <em class="el-icon-upload"></em>
            <p style="color: #999">将文件拖到此处，或<em>点击上传</em></p>
        </div>
        <div slot="tip" class="el-upload__tip">
            <ul class="el-upload-list el-upload-list--text">
                <li class="upload-list head">
                    <span>用印文件名</span>
                    <span class="piece">份数</span>
                    <span>备注</span>
                    <span class="option">操作</span>
                </li>
                <template v-for="item in fileList">
                    <li class="upload-list content" :key="item.objectId">
                        <span><a>{{item.fileName}}</a></span>
                        <span class="piece"><el-input v-model="item.fileNum" :disabled="disabled"></el-input></span>
                        <span><el-input v-model="item.remark" :disabled="disabled"></el-input></span>
                        <span class="option">
                            <a v-if="showFileDowload" @click="fileDowload(item.objectId)">下载</a>
                            <a v-if="showRemove" @click="onRemove(item.objectId)">删除</a>
                        </span>
                    </li>
                    <p v-if="fileList.length == 0" style="font-size: 14px;color: #333;text-align: center;" :key="item.objectId">暂无上传信息</p>
                </template>
            </ul>
        </div>
    </el-upload>
</template>

<script>
    export default {
        model: {
            prop: 'fileList',
            event: 'listChange'
        },
        props: {
            srcDocId: {
                type: String,
                default: ''
            },
            folder: {
                type: String,
                default: '2'
            },
            format: {
                type: Array,
                default(){return []}
            },
            showUploadList: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default:true
            },
            showFileDowload: {
                type: Boolean,
                default:true
            },
            showRemove: {
                type: Boolean,
                default:false
            },
            changeRefreshFolder: {
                type: Boolean,
                default: true
            },//此属性可以手动刷新folder 如每次传入：!changeRefreshFolder
            buttonConf: {},
            successCallBack: {},
            getChangeFile: {},
            limit:{
                type: Number
            },
            fileList: Array
        },
        data() {
            return {
                uploadData: {},
                // fileList: [
                //     {objectId: '001', name: '一级债券分销协议.docx', pieceNum: '1', remark: '一份用印'},
                //     {objectId: '002', name: '测试文档.docx', pieceNum: '1', remark: '一份用印'}
                // ],
                showList: true,
                type: '',
                getDisabled: false,
                icon: '',
                name: '',
                uploadFileLoading: false,
            }
        },
        created() {
            this.uploadData = {
                docId: this.srcDocId ? this.srcDocId : '',
                folderTag: this.folder
            };

            //刷新文件夹
            if (this.srcDocId) {
                this.refreshFolder(this.srcDocId);
            }

            this.getDisabled = this.disabled;
            //是否显示上传文件列表  默认true
            if (this.showUploadList != undefined && this.showUploadList !== "" && this.showUploadList !== null) {
                this.showList = this.showUploadList;
            }
            //配置button样式 有默认样式
            if (this.buttonConf) {
                const getName = this.buttonConf.name;
                const getType = this.buttonConf.type;
                const getIcon = this.buttonConf.icon;
                if (getName) {
                    this.name = getName;
                } else {
                    this.name = "上传附件";
                }
                if (getType) {
                    this.type = getType;
                } else {
                    this.type = "ghost";
                }
                if (getIcon) {
                    this.icon = getIcon;
                } else {
                    this.icon = "ios-cloud-upload-outline";
                }
            } else {
                this.name = "上传附件";
                this.type = "ghost";
                this.icon = "ios-cloud-upload-outline";
            }
        },
        watch:{
            'srcDocId':'srcDocIdChange'
        },
        methods: {
            //上传之前
            checkFile(file) {
                this.uploadFileLoading = true;
                const isLtM = file.size / 1024 / 1024 < 100;

                if (!isLtM) {
                    this.$message.error('文件不能超过 100MB!');
                }
                return isLtM;
            },

            //上传中
            uploadProgress(file) {
                file.showProgress = true;
            },
            //上传错误
            uploadError() {
                this.$msg.error('上传失败!');
            },
            //文件大小错误
            sizeExp() {
                this.$msg.success('文件超出大小!');
            },
            FormatError() {
                this.$msg.warning("文件格式不对!");
            },
            //上传成功后
            uploadSuccess(resp) {
                if (resp.status) {
                    this.uploadData.docId = resp.data.objectId;
                    this.$emit('update:srcDocId',resp.data.objectId)
                    this.refreshFolder(resp.data.objectId);
                    if (typeof this.successCallBack === "function") {
                        this.successCallBack(resp.data.files);
                    }
                    if (typeof this.getChangeFile === "function") {
                        this.getChangeFile({add: resp.data.files});
                    }
                    this.$msg.success('上传成功!');
                } else {
                    this.$msg.error('上传失败!');
                }
                this.uploadFileLoading = false;
            },
            //当文件删除的时候
            async onRemove(fileId) {
                const ok = await this.$msg.ask(`是否删除该文件?`);
                if (ok) {
                    this.uploadFileLoading = true;
                    if (fileId) {

                        let that = this;
                        //在doc中删除文件
                        this.$api.ecmUploadApi.removeFile(fileId).then(function (resp) {
                            if (resp.status) {
                                // that.refreshFolder(that.srcDocId);
                                that.refreshFolder(that.uploadData.docId);
                                that.$msg.success('删除成功!');
                                that.uploadFileLoading = false;
                            }
                        });
                    } else {
                        this.$msg.error('删除失败!');
                        this.uploadFileLoading = false;
                    }
                }
            },

            fileDowload(fileId) {
                const basePath = window.location.href.split("#/")[0];
                window.open(basePath + 'api/ecm/ecm/file/download/' + fileId);
            },

            //重置文件夹
            // async refreshFolder(docId) {
            //     docId = docId ? docId : '';
            //     let that = this;
            //     //获取文件列表
            //     this.$api.ecmUploadApi.getOisFileList(docId).then(function (resp) {
            //         if (resp) {
            //             let files = resp.files;
            //             //清空文件列表
            //             const oldFileList = that.fileList;
            //             that.fileList.splice(0, that.fileList.length);
            //             if(files && files.length > 0) {
            //                 for (let i = 0; i < files.length; i++) {
            //                     let oldFile = that.$lodash.find(oldFileList, { 'docId': docId, 'objectId': files[i].objectId });
            //                     let remark = '';
            //                     if(oldFile.remark){
            //                         remark = oldFile.remark;
            //                     }
            //                     const file = {
            //                         name: files[i].name,
            //                         objectId: files[i].objectId,
            //                         docId: docId,
            //                         remark: remark
            //                     }
            //                     that.fileList.push(file);
            //                 }
            //             }
            //         }
            //     });
            // },

            async refreshFolder(docId) {
                docId = docId ? docId : '';
                //获取文件列表
                this.$api.ecmUploadApi.getOisFileList(docId).then( (resp) => {
                    if (resp) {
                        let files = resp.files;
                        files.forEach((file)=>{
                            const hasFile = this.$lodash.find(this.fileList, {objectId: file.objectId});
                            if(!hasFile){
                                this.fileList.push({
                                    docId: docId,
                                    objectId: file.objectId,
                                    fileName: file.name,
                                    fileNum: '',
                                    remark: ''
                                });
                            }
                        });
                        //清空文件列表
                        // this.fileList.splice(0, this.fileList.length);
                        // if(files && files.length > 0) {
                        //     for (let i = 0; i < files.length; i++) {
                        //         const file = {
                        //             name: files[i].name,
                        //             objectId: files[i].objectId,
                        //             docId: docId
                        //         }
                        //         this.fileList.push(file);
                        //     }
                        // }
                    }
                });
            },

            //清空文件夹
            reset() {
                this.$refs.upload.clearFiles();
            },

            //关闭当前tab页并返回列表刷新页面
            onCloseTab(arg) {
                if (arg === 'ok') {
                    this.refreshFolder(this.srcDocId);
                }
            },

            srcDocIdChange:function(e){
                this.uploadData.docId = e;
                this.refreshFolder(e?e:-1);
            },

            addList(){
                const str = '测试';
                this.myTestList.push(str);
                // this.$emit('listChange', this.myTestList);
            }
        },

    }
</script>

<style>
    .acc-ecm-upload .el-upload-dragger{
        height: 80px;
        width: 170px;
        font-size: 12px;
        border-radius: 4px;
    }

    .acc-ecm-upload.is-disabled .el-upload-dragger{
        display: none;
    }

    .acc-ecm-upload .el-upload-dragger>div {
        width: 100%;
        height: 100%;
    }

    .acc-ecm-upload .el-upload-dragger>div .el-icon-upload{
        font-size: 40px;
        margin: 0;
    }
</style>

<style scoped>
    .acc-ecm-upload {
        display: flex;
        align-items: flex-start;
    }

    .acc-ecm-upload .el-upload__tip{
        flex: 1;
        margin: 0 0 0 10px;
    }

    .acc-ecm-upload .el-upload-list {
        border: 1px solid #EAEDF1;
    }

    .el-upload-list>.upload-list {
        display: flex;
        align-items: center;
        height: 28px;
        line-height: 28px;
    }

    .el-upload-list>.upload-list:not(:last-child) {
        border-bottom: 1px solid #EAEDF1;
    }

    .el-upload-list>.upload-list.head {
        text-align: center;
        background: #F6F8FA;
        color: #333;
    }

    .el-upload-list>.upload-list.content,
    .el-upload-list>.upload-list>span a:not(:hover){
        color: #666;
    }

    .el-upload-list>.upload-list>span {
        flex: 1;
        padding: 0 5px;
    }

    .el-upload-list>.upload-list>span.piece,
    .el-upload-list>.upload-list>span.option {
        width: 80px;
        text-align: center;
        flex: none;
    }
    
    .el-upload-list>.upload-list>span a {
        cursor: pointer;
    }

    .el-upload-list>.upload-list>span a+a {
        margin-left: 5px;
    }

    .el-upload-list>.upload-list>span>>>input {
        height: 100%;
        line-height: 1;
        border: none;
        border-bottom: 1px solid #ccc;
        border-radius: 0;
        font-size: 12px;
    }

    .el-upload-list>.upload-list>span>>>input[disabled] {
        color: #666;
        border: none;
        background: transparent;
        cursor: default;
    }

    .el-upload-list>.upload-list>span.piece>>>input {
        text-align: center;
    }
</style>