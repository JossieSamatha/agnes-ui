<template>
    <div>
        <div class="conf-row">
            <p class="conf-row-title">属性配置</p>
            <div class="conf-row-item" v-show="compData.compType == 'border-comp'">
                <div class="row-inp radioInp">
                    <span>边框类型</span>
                    <el-radio-group v-model="compData.borderType" @change="compDataChange('borderType', $event)">
                        <el-radio v-for="(type, index) in borderOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="conf-row-item" v-show="compData.compType == 'dynamic-comp'">
                <div class="row-inp radioInp">
                    <span>装饰类型</span>
                    <el-radio-group v-model="compData.dynamicType" @change="compDataChange('dynamicType', $event)">
                        <el-radio v-for="(type, index) in dynamicOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp radioInp" v-show="compData.hasOwnProperty('title')">
                    <span>标题</span>
                    <el-input v-model="compData.title"></el-input>
                </div>
                <div class="row-inp radioInp" v-show="compData.hasOwnProperty('titleWidthStr')">
                    <span>标题宽度</span>
                    <el-input v-model="compData.titleWidthStr"></el-input>
                </div>
            </div>

            <template>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('contentText')">
                    <div class="row-inp">
                        <span>输入内容</span>
                        <el-input v-model="compData.contentText"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('font-size')">
                    <div class="row-inp">
                        <span>字体大小</span>
                        <el-input v-model="compData['font-size']"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('color')">
                    <div class="row-inp">
                        <span>字体颜色</span>
                        <el-input v-model="compData.color"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('background')">
                    <div class="row-inp">
                        <span>背景色</span>
                        <el-input v-model="compData.background"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('border')">
                    <div class="row-inp">
                        <span>边框线</span>
                        <el-input v-model="compData.border"></el-input>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('justify-content')">
                    <div class="row-inp">
                        <span>水平方向</span>
                        <el-radio-group v-model="compData['justify-content']">
                            <el-radio v-for="(type, index) in justifyOptions" :key="index" :label="type.value">{{type.label}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="conf-row-item" v-show="compData.hasOwnProperty('align-items')">
                    <div class="row-inp">
                        <span>垂直方向</span>
                        <el-radio-group v-model="compData['align-items']">
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
                    }]
            }
        },
        computed: {
            activeComp() {
                return {};
            },

            compData() {
                return this.activeComp === null ? '' : {}
            },
        },
        methods: {
            compDataChange(type, val){
                this.$app.runCmd('compDataChange', this.activeComp, type, val);
            }
        }
    }
</script>

<style scoped>

</style>