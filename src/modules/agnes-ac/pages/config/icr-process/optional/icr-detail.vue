<template>
    <div class="page_content">
        <el-container style="border: 1px solid #eee;height: 100%;">
            <el-aside width="652px" style="border-right: 1px solid #eee">
                <gf-image-view :fileId="ecmFileId" :files="files"
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
                                    <el-input v-model="item.itemString"></el-input>
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
            async initParam() {
                //获取图片
                const p = this.$api.icrTaskApi.selectIcrFileInfo(this.task.stepCode);
                let resp = await this.$app.blockingApp(p);
                if (resp.data) {
                    this.files = JSON.parse(JSON.stringify(resp.data).replace(/fileId/g,"ecmFileId"));

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
</style>
