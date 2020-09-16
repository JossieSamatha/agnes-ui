<template>
    <el-upload class="ecm-upload"
               action="oisSolr/search/upload"
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
            <i class="el-icon-upload"></i>
            <p>将文件拖到此处，或<em>点击上传</em></p>
        </div>
        <div slot="tip" class="el-upload__tip">
            <ul class="el-upload-list el-upload-list--text">
                <div v-for="item in fileList" :key="item.objectId">
                    <li tabindex="0" class="el-upload-list__item is-success" style="display:flex">
                        <a class="el-upload-list__item-name">
                            <i class="el-icon-document">
                            </i>{{item.name}}
                        </a>
                        <a @click="fileDowload(item.objectId)" style="margin-right: 10px;">下载</a>
                        <a @click="onRemove(item.objectId)">删除</a>
                    </li>
                    <p v-if="fileList.length == 0" style="font-size: 14px;color: #333;text-align: center;">暂无上传信息</p>
                </div>
            </ul>
        </div>
    </el-upload>
</template>

<script>
    export default {
        props: {
            srcDocId: {
                type: String,
                defalut: ''
            },
            folder: {
                type: String,
                defalut: ''
            },
            format: {
                type: Array,
                defalut(){return []}
            },
            showUploadList: {
                type: String,
                defalut: ''
            },
            disabled: {
                type: Boolean,
                defalut:true
            },
            changeRefreshFolder: {
                type: Boolean,
                defalut: true
            },//此属性可以手动刷新folder 如每次传入：!changeRefreshFolder
            buttonConf: {},
            successCallBack: {},
            getChangeFile: {},
            limit:{
                type: Number
            }
        },
        data() {
            return {
                uploadData: {},
                fileList: [],
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
                        //在doc中删除文件
                        const p = await this.$api.ecmUploadApi.removeFile(fileId);
                        p.then( (resp) => {
                            if (resp.ok) {
                                this.refreshFolder(this.srcDocId);
                                this.$msg.success('删除成功!');
                                this.uploadFileLoading = false;
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
                window.open(basePath + 'ecm/file/download/' + fileId);
            },

            //重置文件夹
            async refreshFolder(docId) {
                docId = docId ? docId : '';
                //获取文件列表
                const p = await this.$api.ecmUploadApi.getOisFileList(docId);
                p.then((resp) => {
                    if (resp.ok) {
                        let files = resp.body.files;
                        //清空文件列表
                        this.fileList.splice(0, this.fileList.length);
                        if(files && files.length > 0) {
                            for (let i = 0; i < files.length; i++) {
                                const file = {
                                    name: files[i].name,
                                    objectId: files[i].objectId,
                                }
                                this.fileList.push(file);
                            }
                        }
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
            }

        },

    }
</script>