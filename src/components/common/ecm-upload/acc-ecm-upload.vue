<template>
    <el-upload class="ecm-upload acc-ecm-upload"
               :class="disabled ? 'is-disabled': ''"
               action="/api/ecm-server/ecm/doc/upload"
               :drag="true"
               :data="uploadData"
               :before-upload="checkFile"
               :on-progress="uploadProgress"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :on-exceed="sizeExp"
               :multiple="true"
               :limit="limit"
               :disabled="disabled"
               :show-file-list="false"
               :file-list="fileList"
               accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.pdf,.jpg,.jpeg,.png,.gif,.tif,.tiff,.bmp,.zip,.rar"
               v-loading.fullscreen.lock="uploadFileLoading"
               element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="文件上传中，请稍后">
        <div>
<!--            <el-button class="normal-link" style="left: 0" v-show="!disabled">上传文件</el-button>-->
            <em class="el-icon-upload"></em>
            <p style="color: #999">将文件拖到此处，或<em>点击上传</em></p>
        </div>
        <div slot="tip" class="el-upload__tip">
            <ul class="el-upload-list el-upload-list--text">
                <li class="upload-list head">
                    <span>文件名称</span>
                    <span class="piece">份数</span>
                    <span>备注</span>
                    <span class="option">操作</span>
                </li>
                <template v-for="item in fileList">
                    <li class="upload-list content" :key="item.uid">
                        <span v-if="item.objectId !== ''" class="file-name"><a>{{item.fileName}}</a></span>
                        <span v-else><el-input v-model="item.fileName" :disabled="disabled"></el-input></span>
                        <span class="piece"><el-input v-model="item.fileNum" :disabled="disabled"></el-input></span>
                        <span><el-input v-model="item.remark" :disabled="disabled"></el-input></span>
                        <span class="option">
                            <a v-if="showFileDowload && item.objectId" @click="fileDowload(item.objectId)">下载</a>
                            <a v-if="showRemove && item.objectId" @click="onRemove(item.objectId)">删除</a>
                            <a v-if="showDelete && !item.objectId" @click="removeRule(item)">删除</a>
                        </span>
                    </li>
                    <p v-if="fileList.length == 0" style="font-size: 14px;color: #333;text-align: center;" :key="item.objectId">暂无上传信息</p>
                </template>
            </ul>
            <el-button v-show="showDelete"  @click="addRule()" class="rule-add-btn" size="small">新增</el-button>
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
            id: {
                type: String,
                default: ''
            },
            applyType: {
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
            showDelete: {
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
            fileList: {
                type: Array,
                default: ()=>{
                    return []
                }
            },
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

            if(this.id){
                this.getMaterialList(this.id,this.applyType);
            }

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
            // 新增服务行
            addRule(){
                let fileType = '2';
                if(this.applyType === 'receipt'){
                    fileType = '3'
                }
                this.fileList.push({
                    docId: "",
                    objectId: '',
                    fileName: '',
                    fileNum: '',
                    remark: '',
                    type:fileType
                });
            },
            removeRule(item){
                let fileIndex = -1;
                this.fileList.forEach((file,index)=>{
                    if(file.uid === item.uid){
                        fileIndex = index;
                    }
                });
                this.fileList.splice(fileIndex, 1);
            },
            //上传之前
            checkFile(file) {
                this.uploadFileLoading = true;
                //doc,docx,ppt,pptx,xls,xlsx,txt,pdf,jpg,jpeg,png,gif,tif,tiff,bmp,zip,rar
                var fileType=file.name.substring(file.name.lastIndexOf('.')+1);
                const isImage = fileType === 'jpg'||fileType ==='jpeg'||fileType ==='png'||fileType ==='gif'||fileType ==='tif'||fileType ==='tiff'||fileType ==='bmp';
                const isOffice = fileType === 'doc'||fileType ==='docx'||fileType ==='ppt'||fileType ==='pptx'||fileType ==='xls'||fileType ==='xlsx';
                const isOther = fileType === 'zip'||fileType ==='rar'||fileType ==='pdf'||fileType ==='txt';
                if (!isImage && !isOffice && !isOther) {
                    this.$msg.error('上传文件必须为如下格式：doc,docx,ppt,pptx,xls,xlsx,txt,pdf,jpg,jpeg,png,gif,tif,tiff,bmp,zip,rar');
                    this.uploadFileLoading = false;
                }

                const isLtM = file.size / 1024 / 1024 < 200;
                if (!isLtM) {
                    this.$msg.error('文件不能超过 200MB!');
                    this.uploadFileLoading = false;
                }
                return isLtM && (isImage||isOffice||isOther) ;
            },

            //上传中
            uploadProgress(file) {
                file.showProgress = true;
            },
            //上传错误
            uploadError() {
                this.$msg.error('上传失败!');
                this.uploadFileLoading = false;
            },
            //文件大小错误
            sizeExp() {
                this.$msg.warning('文件超出大小!');
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
                window.open(basePath + 'api/ecm-server/ecm/file/download/' + fileId);
            },
            async getMaterialList(id,applyType){
                let res = null;
                if('apply'=== applyType){
                    res = await this.$api.acntMaterialApi.getApplyMaterialListByType(id,"2");
                }else if('applySub' === applyType){
                    res = this.fileList = await this.$api.acntMaterialApi.getApplySubMaterialListByType(id,"2");
                }else if("receipt" === applyType){
                    res = this.fileList = await this.$api.acntMaterialApi.getApplyMaterialListByType(id,"3");
                }
                if(res != null && res.data != null){
                    this.fileList = res.data;
                }
            },
            //重置文件夹
            //20201031
            async refreshFolder(docId) {
                docId = docId ? docId : '';
                let that = this;
                //获取文件列表
                this.$api.ecmUploadApi.getOisFileList(docId).then( (resp) => {
                    if (resp) {
                        let oldFileList = that.fileList.splice(0, that.fileList.length);
                        let type2FileList = [];
                        oldFileList.forEach((file)=>{
                            if(file.type === '2'){
                                type2FileList.push(this.$lodash.cloneDeep(file));
                            }
                        });

                        let files = resp.files;
                        files.forEach((file)=>{
                            const hasFile = that.$lodash.find(oldFileList, {objectId: file.objectId});
                            if(!hasFile){
                                let fileType = '1';
                                if('receipt'  === that.applyType){
                                    fileType = '3';
                                }
                                that.fileList.push({
                                    docId: docId,
                                    objectId: file.objectId,
                                    fileName: file.name,
                                    fileNum: '',
                                    remark: '',
                                    type:fileType,
                                });
                            }else{
                                that.fileList.push(hasFile);
                            }
                        });

                        if(type2FileList && type2FileList.length >0){
                            type2FileList.forEach((file)=>{
                                that.fileList.push(file);
                            });
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
        width: 400px;
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
    .file-name{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .acc-ecm-upload {
        /*display: flex;*/
        align-items: flex-start;
    }

    .acc-ecm-upload .el-upload__tip{
        flex: 1;
        margin: 0 0 0 0px;
    }

    .acc-ecm-upload .el-upload-list {
        border: 1px solid #ccc;
    }

    .el-upload-list>.upload-list {
        display: flex;
        align-items: center;
        height: 28px;
        line-height: 28px;
    }

    .el-upload-list>.upload-list:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }

    .el-upload-list>.upload-list.head {
        text-align: center;
        background: #F6F8FA;
        color: #333;
    }

    .el-upload-list>.upload-list.content,
    .el-upload-list>.upload-list>span a:not(:hover){
        color: blue;
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
        border-bottom: 1px solid #ccc!important;
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