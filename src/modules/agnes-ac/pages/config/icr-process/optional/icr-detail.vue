<template>
    <div class="page_content">
        <el-container style="border: 1px solid #eee;height: 100%;">
            <el-aside width="652px" style="border-right: 1px solid #eee">
                <gf-image-view :fileId="ecmFileId" :isOutFocus="this.isOutFocus"
                               :isFocus="this.isFocus" :files="files" :preItem="this.preItem"
                               :currentItem="this.currentItem" :items="this.items"
                               @listenToChildEvent="listenToChildEvent"/>
            </el-aside>
            <el-main style="padding-left:0;">
                <div style="height: 100%;overflow: auto;">
                    <el-form :model="fileItemFormModel" ref="fileItemForm" label-width="100px"
                             class="scrolling content" style="max-height: none;">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item v-for="item in items"
                                              :label="item.itemKey"
                                              :key="item.pkId">
                                  <div class="line">
                                    <el-input v-model="item.itemString" style="width: 85%;" @focus="itemShow(item)" @blur="beforeItemShow(item)"></el-input>
                                    <i v-if="item.isCorrect && item.isCorrect === '1'" class="el-icon-circle-check"
                                       style="margin-left: 3px;font-size: 20px;vertical-align: middle;line-height:32px;color: #4ACE69;width: 15%"></i>
                                    <i v-if="item.isCorrect && item.isCorrect === '0'" class="el-icon-circle-close"
                                       style="margin-left: 3px;font-size: 20px;vertical-align: middle; line-height:32px;color: red;width: 15%"></i>
                                  </div>
                                    <el-input class="rt-input" v-if="item.isCorrect && item.isCorrect === '0'" v-model="item.checkString" disabled="true" style="width: 85%"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    export default {
        props: {
            task: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                files: [],
                fileItems: [],
                currentItem:'',
                isFocus:'',
                isOutFocus:'',
                preItem:'',
                ecmFileId: '',
                fit: 'fit',
                items: [],
                currentItemsStr:'',
                fileItemFormModel : null
            }
        },
        async created() {
            this.initParam();
        },

        methods: {
            listenToChildEvent(index,pageNum){
                this.checkIsUpdate();
                let item = this.files[index];
                this.items = [];
                if(item.splitDocId){
                    item.acRuTaskFileItemList.forEach((pageItem)=>{
                        if(pageItem.pageNum==pageNum){
                            this.items.push(pageItem);
                        }
                    });
                }else {
                    this.items = item.acRuTaskFileItemList;
                }
                this.currentItemsStr = JSON.stringify(this.items);
            },
            async checkIsUpdate(){
                //判断是否有修改
                let temp = JSON.stringify(this.items);
                if(this.currentItemsStr != temp){
                    const p = this.$api.icrTaskApi.updateIcrFileItems({'acRuTaskFileItemList':this.items});
                    await this.$app.blockingApp(p);
                }
            },
            itemShow(item){
                this.isFocus = this.$agnesAcUtils.randomString(3);
              this.currentItem =  item;
            },
            beforeItemShow(item){
                this.isOutFocus = this.$agnesAcUtils.randomString(3);
              this.preItem =  item;
            },
            async initParam() {
                //获取图片
                const p = this.$api.icrTaskApi.selectIcrFileInfo(this.task.stepCode, this.task.taskExecId);
              let resp = await this.$app.blockingApp(p);
                if (resp.data) {
                    this.files = JSON.parse(JSON.stringify(resp.data).replace(/fileId/g,"ecmFileId"));
                    if(this.files.length<1){
                        return ;
                    }
                    if(this.files[0].splitDocId){
                        this.files[0].acRuTaskFileItemList.forEach((pageItem)=>{
                            if(pageItem.pageNum==1){
                                this.items.push(pageItem);
                            }
                        });
                    }else {
                        this.items = this.files[0].acRuTaskFileItemList;
                    }
                    this.currentItemsStr = JSON.stringify(this.items);
                    this.ecmFileId = this.files[0].ecmFileId;
                }
            },
            // 返回关闭抽屉;
            onCancel() {
                this.$emit("onClose");
            },
        },
    }
</script>
<style>
    .page_content {
        height: 100%;
    }
    .rt-input .el-input__inner {
        color: #f5222e !important;
    }
</style>
