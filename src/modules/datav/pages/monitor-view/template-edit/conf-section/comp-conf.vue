<template>
    <div>
        <div class="conf-row">
            <p class="conf-row-title">属性配置</p>
            <div class="conf-row-item" v-show="compOptional.compType == 'border-comp'">
                <div class="row-inp radioInp">
                    <span>边框类型</span>
                    <el-radio-group v-model="componentMeta.borderType">
                        <el-radio v-for="(type, index) in borderOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="conf-row-item" v-show="compOptional.compType == 'dynamic-comp'">
                <div class="row-inp radioInp">
                    <span>装饰类型</span>
                    <el-radio-group v-model="componentMeta.dynamicType">
                        <el-radio v-for="(type, index) in dynamicOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp radioInp" v-show="componentMeta.hasOwnProperty('title')">
                    <span>标题</span>
                    <el-input v-model="componentMeta.title"></el-input>
                </div>
                <div class="row-inp radioInp" v-show="componentMeta.hasOwnProperty('titleWidthStr')">
                    <span>标题宽度</span>
                    <el-input v-model="componentMeta.titleWidthStr"></el-input>
                </div>
            </div>

            <template>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('contentText')">
                    <div class="row-inp">
                        <span>输入内容</span>
                        <el-input v-model="componentMeta.contentText"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('font-size')">
                    <div class="row-inp">
                        <span>字体大小</span>
                        <el-input v-model="componentMeta['font-size']"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('color')">
                    <div class="row-inp">
                        <span>字体颜色</span>
                        <color-picker :color="componentMeta.color"></color-picker>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('background')">
                    <div class="row-inp">
                        <span>背景色</span>
                        <el-input v-model="componentMeta.background"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('border')">
                    <div class="row-inp">
                        <span>边框线</span>
                        <el-input v-model="componentMeta.border"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('justify-content')">
                    <div class="row-inp">
                        <span>水平方向</span>
                        <el-radio-group v-model="componentMeta['justify-content']">
                            <el-radio v-for="(type, index) in justifyOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="conf-row-item" v-show="componentMeta.hasOwnProperty('align-items')">
                    <div class="row-inp">
                        <span>垂直方向</span>
                        <el-radio-group v-model="componentMeta['align-items']">
                            <el-radio v-for="(type, index) in alignOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                borderOptions: [
                    {
                        value: 'dv-border-box-1',
                        label: '机甲边框'
                    },{
                        value: 'dv-border-box-2',
                        label: '双线边框'
                    }, {
                        value: 'dv-border-box-3',
                        label: '三线边框'
                    }, {
                        value: 'dv-border-box-4',
                        label: '双色边框'
                    }, {
                        value: 'dv-border-box-5',
                        label: '淡色边框'
                    }, {
                        value: 'dv-border-box-6',
                        label: '细线边框'
                    }, {
                        value: 'dv-border-box-7',
                        label: '背景边框'
                    },{
                        value: 'dv-border-box-8',
                        label: '动态边框'
                    },{
                        value: 'dv-border-box-9',
                        label: '荧光边框'
                    },{
                        value: 'dv-border-box-10',
                        label: '模块边框'
                    },{
                        value: 'dv-border-box-11',
                        label: '标题边框'
                    },{
                        value: 'dv-border-box-12',
                        label: '亮角边框'
                    },{
                        value: 'dv-border-box-13',
                        label: '异边边框'
                    }],
                dynamicOptions: [
                    {
                        value: 'dv-decoration-1',
                        label: '短边动态'
                    },{
                        value: 'dv-decoration-2',
                        label: '水平线型'
                    }, {
                        value: 'dv-decoration-3',
                        label: '粼粼动态'
                    }, {
                        value: 'dv-decoration-4',
                        label: '管状细边'
                    }, {
                        value: 'dv-decoration-5',
                        label: '顶部动态'
                    }, {
                        value: 'dv-decoration-6',
                        label: '声波动态'
                    }, {
                        value: 'dv-decoration-7',
                        label: '静态标题'
                    },{
                        value: 'dv-decoration-8',
                        label: '边框装饰'
                    },{
                        value: 'dv-decoration-9',
                        label: '罗盘动态'
                    },{
                        value: 'dv-decoration-10',
                        label: '静态边线'
                    },{
                        value: 'dv-decoration-11',
                        label: '静态大标题'
                    }],
                justifyOptions: [
                    {
                        value: 'flex-start',
                        label: '居左'
                    },{
                        value: 'center',
                        label: '居中'
                    },{
                        value: 'flex-end',
                        label: '居右'
                    }],
                alignOptions: [
                    {
                        value: 'flex-start',
                        label: '居上'
                    },{
                        value: 'center',
                        label: '居中'
                    },{
                        value: 'flex-end',
                        label: '居下'
                    }],
                dataVTemplate: this.$datavTemplateService
            }
        },
        computed: {
            compOptional(){
                if(this.dataVTemplate.data.curComp && this.dataVTemplate.data.curComp.optional){
                    return this.dataVTemplate.data.curComp.optional;
                }else{
                    return {};
                }
            },

            componentMeta(){
                if(this.compOptional && this.compOptional.componentMeta){
                    console.log('color', this.compOptional.componentMeta.color);
                    return this.compOptional.componentMeta;
                }else{
                    return {};
                }

            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>