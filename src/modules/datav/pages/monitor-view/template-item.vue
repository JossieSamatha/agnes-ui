<template>
    <div class="template-item">
        <div>
            <div class="img-canvas">
                <img :src="getImgPath(templateObj.img)" width="100%" height="100%"/>
                <div class="hover-mask">
                    <p class="option">
                        <span class="iconImg delete" title="删除" @click="templateDelete(templateObj)">
                            <i class="fa fa-trash-o"></i>
                        </span>
                        <span class="iconImg" title="复制" v-html="svgImg.copy" @click="templateCopy(templateObj)"></span>
                        <span class="iconImg" title="分享" v-html="svgImg.share"></span>
                        <span class="iconImg" title="更多">
                            <i class="el-icon-more-outline"></i>
                        </span>
                    </p>
                    <p class="buttonP">
                        <el-button type="primary" @click="editTemplate">编辑</el-button>
                        <el-button>预览</el-button>
                    </p>
                </div>
            </div>
            <p class="title">{{templateObj.title}}</p>
            <p class="tags">
                <el-tag type="info" size="mini" v-for="(tag, index) in templateObj.tag" :key="index">{{tag||''}}</el-tag>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            templateObj: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        data() {
            return {
                baseUrl: '',
                svgImg: this.$dataVSvg
            }
        },
        methods: {
            getImgPath(imgName){
                if(imgName){
                    return require('../../assets/datav/'+imgName);
                }else{
                    return require('../../assets/datav/template-img01.jpg');
                }
            },

            // 打开编辑页面
            editTemplate(){
                this.$emit('editTemplate');
            },

            // 删除模板
            templateDelete(){

            },

            // 复制模板
            templateCopy(){

            }
        },
    }
</script>

<style scoped>

</style>