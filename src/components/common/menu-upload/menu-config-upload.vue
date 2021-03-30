<template>
    <el-upload
               action="/api/ecm-server/ecm/doc/upload"
               :data="uploadData"
               ref="upload"
               :before-upload="checkFile"
               :on-progress="uploadProgress"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :on-exceed="sizeExp"
               :show-file-list="false"
               :multiple="false"
               :limit="1"
               accept=".xlsx,.xlsm,.xls"
               v-loading.fullscreen.lock="uploadFileLoading"
               element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="文件导入中，请稍后">
        <gf-button class="action-btn" size="mini" >导入</gf-button>
    </el-upload>
</template>

<script>
    export default {
        props: {
            resName: {
                type: String,
                default: ''
            },
            ifPkId: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                uploadData: {},
                fileName:'',
                alanyId:'',
                uploadFileLoading: false,
            }
        },
        created() {
            this.uploadData = {
                docId:'',
                folderTag: '2'
            };
        },
        methods: {
            //上传之前
            checkFile(file) {
                this.fileName = this.resName;
                this.alanyId = this.ifPkId;
                this.uploadFileLoading = true;
                var fileType=file.name.substring(file.name.lastIndexOf('.')+1);
                const isOffice = fileType ==='xls'||fileType ==='xlsx'||fileType ==='xlsm';
                let isHasData = this.fileName != '' && this.alanyId != '';
                if (!isOffice) {
                    this.$msg.error('导入文件必须为如下格式：xls,xlsx,xlsm');
                    this.uploadFileLoading = false;
                }
                if (!isHasData) {
                    this.$msg.error('请完善导入相关配置');
                    this.uploadFileLoading = false;
                }

                const isLtM = file.size / 1024 / 1024 < 200;
                if (!isLtM) {
                    this.$msg.error('文件不能超过 200MB!');
                    this.uploadFileLoading = false;
                }
                return isLtM && isOffice && isHasData;
            },

            //上传中
            uploadProgress(file) {
                file.showProgress = true;
            },
            //上传错误
            uploadError() {
                this.$msg.error('导入失败!');
                this.uploadFileLoading = false;
                this.$refs.upload.clearFiles();
            },
            //文件大小错误
            sizeExp() {
                this.$msg.warning('文件超出大小!');
                this.uploadFileLoading = false;
                this.$refs.upload.clearFiles();
            },
            FormatError() {
                this.$msg.warning("文件格式不对!");
                this.uploadFileLoading = false;
                this.$refs.upload.clearFiles();
            },
            //上传成功后
            async uploadSuccess(resp) {
                if (resp.status) {
                    let resp2 = await this.$api.funcConfigApi.inputTable({'docId':resp.data.objectId,'resName':this.fileName,'ifPkId':this.ifPkId});
                    if(resp2.code=='inputError'){
                        this.$msg.error('导入失败!');
                        return ;
                    }
                    this.$msg.success('导入成功!');
                } else {
                    this.$msg.error('导入失败!');
                }
                this.uploadFileLoading = false;
                this.$refs.upload.clearFiles();
            },

        },

    }
</script>
