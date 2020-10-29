<template>
    <div class="template-item">
        <div>
            <div class="img-canvas">
                <img :src="getImgPath(templateObj.img)" width="100%" height="100%" alt="template-img"/>
                <div class="hover-mask">
                    <p class="option">
                        <span class="iconImg delete" title="删除" @click="deleteTemplate(templateObj.id)">
                            <em class="fa fa-trash-o"></em>
                        </span>
                        <span class="iconImg" title="复制" v-html="svgImg.copy" @click="templateCopy(templateObj)"></span>
                    </p>
                    <p class="buttonP">
                        <el-button type="primary" @click="openEditPage">编辑</el-button>
                        <el-button @click="datavPriview(templateObj.id)">预览</el-button>
                    </p>
                </div>
            </div>
            <p class="title">{{templateObj.title}}</p>
            <p class="tags">
                <el-tag type="info" size="mini" v-if="templateObj.label">{{templateObj.label}}</el-tag>
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
            openEditPage(){
                this.$dataVBus.$emit('openEditPage', {opType: 'edit', templateObj: this.templateObj});
            },

            // 大屏预览
            datavPriview(templateId){
                this.$dataVBus.$emit('datavPriview', templateId);
            },

            // 删除大屏
            deleteTemplate(id){
                this.$emit('deleteTemplate', id);
            },

            // 复制模板
            templateCopy(){

            }
        },
    }
</script>