<template>
    <div>
        <div class="conf-row" v-if="componentMeta.hasOwnProperty('contentText')">
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>输入内容</span>
                    <el-input type="textarea" :rows="5"
                              v-model="componentMeta.contentText">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="conf-row" v-if="componentMeta.digital">
            <p class="conf-row-title">计数设置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>数值</span>
                    <el-input-number v-model="componentMeta.number"
                                     controls-position="right">
                    </el-input-number>
                </div>
                <div class="row-inp">
                    <span>保留位数</span>
                    <el-input-number v-model="componentMeta.toFixed"
                                     controls-position="right"
                                     :precision="0"
                                     :min="0"
                    >
                    </el-input-number>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>数据类型</span>
                    <el-select v-model="componentMeta.formatter">
                        <el-option label="数值" value="normal"></el-option>
                        <el-option label="千分位" value="money"></el-option>
                    </el-select>
                </div>
                <div class="row-inp">
                    <span>宽度</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta.width"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="conf-row" v-if="componentMeta.roll">
            <p class="conf-row-title">滚动设置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>方向</span>
                    <el-select v-model="componentMeta.scrollDir">
                        <el-option label="向左" value="left"></el-option>
                        <el-option label="向右" value="right"></el-option>
                    </el-select>
                </div>
                <div class="row-inp">
                    <span>速度</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta.scrollSpeed"
                                         controls-position="right"
                                         :min="0">
                        </el-input-number>
                    </div>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">字体设置</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>字号</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['font-size']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="12">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
                <div class="row-inp">
                    <span>行高</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['line-height']"
                                         controls-position="right"
                                         :min="0">
                        </el-input-number>
                    </div>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>颜色</span>
                    <div class="row-inp-line">
                        <div class="row-inp-absolute">
                            <em v-html="svgImg['font-color']"></em>
                            <div class="color-fill" :style="{background: componentMeta.color}"></div>
                            <color-picker class="hideDom" :componentMeta="componentMeta" type="color"></color-picker>
                        </div>
                        <div class="row-inp-absolute">
                            <em v-html="svgImg['bg-color']"></em>
                            <div class="color-fill" :style="{background: componentMeta.background}"></div>
                            <color-picker class="hideDom" :componentMeta="componentMeta" type="background"></color-picker>
                        </div>
                    </div>
                </div>
                <div class="row-inp">
                    <span>样式</span>
                    <div class="button-group">
                        <el-checkbox-group v-model="componentMeta['font-style']">
                            <el-checkbox-button label="bold"><em class="fa fa-bold"></em>
                            </el-checkbox-button>
                            <template v-if="!componentMeta.digital">
                                <el-checkbox-button v-for="item in fontStyleOp" :label="item" :key="item">
                                    <em :class="'fa fa-'+item"></em>
                                </el-checkbox-button>
                            </template>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">文字阴影</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>颜色</span>
                    <div class="row-inp-absolute">
                        <em v-html="svgImg['bg-color']"></em>
                        <div class="color-fill" :style="{background: componentMeta.shadowColor}"></div>
                        <color-picker class="hideDom" :componentMeta="componentMeta" type="shadowColor"></color-picker>
                    </div>
                </div>
                <div class="row-inp">
                    <span>模糊度</span>
                    <el-input-number v-model="componentMeta.shadowBlur"
                                     controls-position="right"
                                     :precision="0"
                                     :min="0">
                    </el-input-number>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>偏移X</span>
                    <el-input-number v-model="componentMeta.shadowOffsetX"
                                     controls-position="right"
                                     :precision="0">
                    </el-input-number>
                </div>
                <div class="row-inp">
                    <span>偏移Y</span>
                    <el-input-number v-model="componentMeta.shadowOffsetY"
                                     controls-position="right"
                                     :precision="0">
                    </el-input-number>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">背景阴影</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>颜色</span>
                    <div class="row-inp-absolute">
                        <em v-html="svgImg['bg-color']"></em>
                        <div class="color-fill" :style="{background: componentMeta.shadowColor}"></div>
                        <color-picker class="hideDom" :componentMeta="componentMeta" type="bgShadowColor"></color-picker>
                    </div>
                </div>
                <div class="row-inp">
                    <span>内/外</span>
                    <el-select v-model="componentMeta.bgShadowDir">
                        <el-option label="内" value="inset"></el-option>
                        <el-option label="外" value=""></el-option>
                    </el-select>
                </div>
                <div class="row-inp" style="flex: 0 0 50%">
                    <span>模糊度</span>
                    <el-input-number v-model="componentMeta.bgShadowBlur"
                                     controls-position="right"
                                     :precision="0"
                                     :min="0">
                    </el-input-number>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>偏移X</span>
                    <el-input-number v-model="componentMeta.bgShadowOffsetX"
                                     controls-position="right"
                                     :precision="0">
                    </el-input-number>
                </div>
                <div class="row-inp">
                    <span>偏移Y</span>
                    <el-input-number v-model="componentMeta.bgShadowOffsetY"
                                     controls-position="right"
                                     :precision="0">
                    </el-input-number>
                </div>
            </div>
        </div>
        <div class="conf-row" v-if="!componentMeta.digital">
            <p class="conf-row-title">边框线</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>粗细</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['border-width']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
                <div class="row-inp">
                    <span>圆角度</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['border-radius']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>线型</span>
                    <div>
                        <el-select v-model="componentMeta['border-style']">
                            <el-option label="实线" value="solid"></el-option>
                            <el-option label="虚线" value="dashed"></el-option>
                            <el-option label="点线" value="dotted"></el-option>
                            <el-option label="双层" value="double"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row-inp">
                    <span>颜色</span>
                    <div class="row-inp-absolute">
                        <em v-html="svgImg['font-color']"></em>
                        <div class="color-fill" :style="{background: componentMeta['border-color']}"></div>
                        <color-picker class="hideDom" :componentMeta="componentMeta" type="border-color"></color-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="conf-row">
            <p class="conf-row-title">布局方式</p>
            <div class="conf-row-item">
                <div class="row-inp" style="flex: 0 0 50%">
                    <span>水平</span>
                    <div>
                        <el-radio-group v-if="!componentMeta.digital" class="icon-radio" v-model="componentMeta['justify-content']">
                            <el-radio v-for="(type, index) in justifyOptions" :key="index" :label="type.value">
                                <em :class="type.icon"></em>
                            </el-radio>
                        </el-radio-group>
                        <el-radio-group v-else class="icon-radio" v-model="componentMeta.textAlign">
                            <el-radio v-for="(type, index) in digitalOptions" :key="index" :label="type.value">
                                <em :class="type.icon"></em>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="row-inp">
                    <span>垂直</span>
                    <div>
                        <el-radio-group class="icon-radio" v-model="componentMeta['align-items']">
                            <el-radio v-for="(type, index) in alignOptions" :key="index" :label="type.value">
                                <em :class="type.icon"></em>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="conf-row" v-if="!componentMeta.digital">
            <p class="conf-row-title">边距</p>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>上边距</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['padding-top']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
                <div class="row-inp">
                    <span>下边距</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['padding-bottom']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
            </div>
            <div class="conf-row-item">
                <div class="row-inp">
                    <span>左边距</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['padding-left']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
                <div class="row-inp">
                    <span>右边距</span>
                    <div class="row-inp-line">
                        <el-input-number v-model="componentMeta['padding-right']"
                                         controls-position="right"
                                         :precision="0"
                                         :min="0">
                        </el-input-number>
                        <span style="margin-left: 3px;">px</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            componentMeta: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                svgImg: this.$dataVSvg,
                justifyOptions: [
                    {
                        value: 'flex-start',
                        label: '居左',
                        icon: 'fa fa-align-left'
                    },{
                        value: 'center',
                        label: '居中',
                        icon: 'fa fa-align-center'
                    },{
                        value: 'flex-end',
                        label: '居右',
                        icon: 'fa fa-align-right'
                    }],
                alignOptions: [
                    {
                        value: 'flex-start',
                        label: '居上',
                        icon: 'fa fa-align-left'
                    },{
                        value: 'center',
                        label: '居中',
                        icon: 'fa fa-align-center'
                    },{
                        value: 'flex-end',
                        label: '居下',
                        icon: 'fa fa-align-right'
                    }],
                digitalOptions: [
                    {
                        value: 'left',
                        label: '居左',
                        icon: 'fa fa-align-left'
                    },{
                        value: 'center',
                        label: '居中',
                        icon: 'fa fa-align-center'
                    },{
                        value: 'right',
                        label: '居右',
                        icon: 'fa fa-align-right'
                    }],
                fontStyleOp: ['italic', 'underline'],
            }
        }
    }
</script>