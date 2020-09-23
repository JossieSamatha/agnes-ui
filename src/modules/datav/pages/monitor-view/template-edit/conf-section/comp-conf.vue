<template>
    <div>
        <template v-if="compOptional.compType == 'digital-flop'">
            <section class="confSection">
                <div class="conf-row">
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>布局方向</span>
                            <el-radio-group v-model="componentMeta.direction">
                                <el-radio label="row">横向</el-radio>
                                <el-radio label="column">纵向</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <el-collapse accordion>
                    <el-collapse-item title="数字样式" name="num">
                        <text-conf :componentMeta="componentMeta.numOption"></text-conf>
                    </el-collapse-item>
                    <el-collapse-item title="前缀样式" name="pre">
                        <text-conf :componentMeta="componentMeta.preOption"></text-conf>
                    </el-collapse-item>
                    <el-collapse-item title="后缀样式" name="suf">
                        <text-conf :componentMeta="componentMeta.sufOption"></text-conf>
                    </el-collapse-item>
                </el-collapse>
            </section>
        </template>
        <section class="confSection" v-else-if="compOptional.type !== 'chart'">
            <template v-if="compOptional.compType == 'border-comp'">
                <div class="conf-row">
                    <p class="conf-row-title">样式设置</p>
                    <div class="conf-row-item" v-if="componentMeta.borderType === 'dv-border-box-11'">
                        <div class="row-inp radioInp">
                            <span>标题</span>
                            <el-input v-model="componentMeta.title"></el-input>
                        </div>
                        <div class="row-inp radioInp">
                            <span>标题宽度</span>
                            <el-input v-model="componentMeta.titleWidthStr"></el-input>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>主色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['font-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.color1}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="color1"></color-picker>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>副色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['font-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.color2}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="color2"></color-picker>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>背景色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['bg-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.backgroundColor}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="backgroundColor"></color-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="conf-row">
                    <p class="conf-row-title">边框类型</p>
                    <div class="conf-row-item">
                        <div class="row-inp radioInp">
                            <el-radio-group class="picture-radio" v-model="componentMeta.borderType">
                                <el-radio v-for="(type, index) in borderOptions" :key="index" :label="type.value">
                                    <component :is="type.value" :titleWidth="80"></component>
                                    <span>{{type.label}}</span>
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'dynamic-comp'">
                <div class="conf-row">
                    <p class="conf-row-title">样式设置</p>
                    <div class="conf-row-item" v-if="componentMeta.dynamicType === 'dv-decoration-7' || componentMeta.dynamicType === 'dv-decoration-9'
                                    || componentMeta.dynamicType === 'dv-decoration-11'">
                        <div class="row-inp radioInp">
                            <span>标题</span>
                            <el-input v-model="componentMeta.title"></el-input>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>配色</span>
                            <div class="row-inp-line">
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['font-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.fontColor}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="fontColor"></color-picker>
                                </div>
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color1}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color1"></color-picker>
                                </div>
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color2}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color2"></color-picker>
                                </div>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>反向</span>
                            <el-checkbox v-model="componentMeta.reverse" :disabled="!(componentMeta.dynamicType === 'dv-decoration-2' || componentMeta.dynamicType === 'dv-decoration-4'
                                    || componentMeta.dynamicType === 'dv-decoration-8')">是否反向</el-checkbox>
                        </div>
                    </div>
                    <div class="conf-row-item" v-if="componentMeta.dynamicType === 'dv-decoration-7' || componentMeta.dynamicType === 'dv-decoration-9'
                                    || componentMeta.dynamicType === 'dv-decoration-11'">
                    <div class="row-inp">
                        <span>字号</span>
                        <div class="row-inp-line">
                            <el-input-number v-model="componentMeta.fontSize"
                                             controls-position="right"
                                             :precision="0"
                                             :min="12">
                            </el-input-number>
                            <span style="margin-left: 3px;">px</span>
                        </div>
                    </div>
                    <div class="row-inp">
                        <span>左右边距</span>
                        <div class="row-inp-line">
                            <el-input-number v-model="componentMeta.padding"
                                             controls-position="right"
                                             :precision="0"
                                             :min="0">
                            </el-input-number>
                            <span style="margin-left: 3px;">px</span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="conf-row">
                    <p class="conf-row-title">装饰类型</p>
                    <div class="conf-row-item">
                    <div class="row-inp radioInp">
                        <el-radio-group class="picture-radio dynamic " v-model="componentMeta.dynamicType">
                            <el-radio v-for="(type, index) in dynamicOptions" :key="index" :label="type.value">
                                <component :is="type.value"></component>
                                <span>{{type.label}}</span>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'date-time'">
                <div class="conf-row">
                    <p class="conf-row-title">格式化配置</p>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>日期</span>
                            <el-checkbox v-model="componentMeta.showDate">
                                <el-select v-model="componentMeta.dateType">
                                    <el-option label="yyyy年MM月dd日" value="yyyy年MM月dd日"></el-option>
                                    <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
                                    <el-option label="yyyy/MM/dd" value="yyyy/MM/dd"></el-option>
                                    <el-option label="yyyy.MM.dd" value="yyyy.MM.dd"></el-option>
                                </el-select>
                            </el-checkbox>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>时间</span>
                            <el-checkbox v-model="componentMeta.showTime">
                                <el-select v-model="componentMeta.timeType">
                                    <el-option label="HH:mm:ss" value="HH:mm:ss"></el-option>
                                    <el-option label="HH点mm分ss秒" value="HH点mm分ss秒"></el-option>
                                    <el-option label="HH:mm" value="HH:mm"></el-option>
                                    <el-option label="HH点mm分" value="HH点mm分"></el-option>
                                </el-select>
                            </el-checkbox>
                        </div>
                        <div class="row-inp">
                            <span>星期</span>
                            <el-checkbox v-model="componentMeta.showWeek">
                                <el-select v-model="componentMeta.weekType">
                                    <el-option label="星期天" value="fullCnName"></el-option>
                                    <el-option label="周日" value="nickCnName"></el-option>
                                    <el-option label="Sunday" value="fullEnName"></el-option>
                                    <el-option label="Sun." value="nickEnName"></el-option>
                                </el-select>
                            </el-checkbox>
                        </div>
                    </div>
                </div>
            </template>
            <text-conf v-if="compOptional.type == 'text'" :componentMeta="componentMeta"></text-conf>
            <template v-if="compOptional.compType == 'percent-pond'">
                <div class="conf-row">
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>数值</span>
                            <el-input-number v-model="componentMeta.value"
                                             controls-position="right"
                                             :precision="0"
                                             :min="0" :max="100">
                            </el-input-number>
                        </div>
                        <div class="row-inp">
                            <span>格式化样式</span>
                            <el-input v-model="componentMeta.formatter" placeholder="{value}%"></el-input>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>文字颜色</span>
                            <div class="row-inp-line">
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['font-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.textColor}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="textColor"></color-picker>
                                </div>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>配色</span>
                            <div class="row-inp-line">
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color1}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color1"></color-picker>
                                </div>
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color2}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color2"></color-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>边框宽度</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.borderWidth"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>边框间隙</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.borderGap"
                                                 controls-position="right"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>线条宽度</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.lineWidth"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>线条间隙</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.lineGap"
                                                 controls-position="right"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'water-pond'">
                <div class="conf-row">
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>数值</span>
                            <el-input-number v-model="componentMeta.data"
                                             controls-position="right"
                                             :precision="0"
                                             :min="0" :max="100">
                            </el-input-number>
                        </div>
                        <div class="row-inp">
                            <span>格式化样式</span>
                            <el-input v-model="componentMeta.formatter" placeholder="{value}%"></el-input>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>配色</span>
                            <div class="row-inp-line">
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color1}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color1"></color-picker>
                                </div>
                                <div class="row-inp-absolute">
                                    <i v-html="svgImg['bg-color']"></i>
                                    <div class="color-fill" :style="{background: componentMeta.color2}"></div>
                                    <color-picker class="hideDom" :componentMeta="componentMeta" type="color2"></color-picker>
                                </div>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>形状</span>
                            <el-select v-model="componentMeta.shape">
                                <el-option label="椭圆形" value="round"></el-option>
                                <el-option label="直角矩形" value="rect"></el-option>
                                <el-option label="圆角矩形" value="roundRect"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>波浪数量</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.waveNum"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>波浪高度</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.waveHeight"
                                                 controls-position="right"
                                                 :min="0">
                                </el-input-number>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'ct-capsule'">
                <div class="conf-row">
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>单位</span>
                            <el-input v-model="componentMeta.unit" placeholder="单位"></el-input>
                        </div>
                        <div class="row-inp">
                            <span>标签</span>
                            <el-checkbox  v-model="componentMeta.showValue">是否显示数值</el-checkbox>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'ranking-board'">
                <div class="conf-row">
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>表行数</span>
                            <el-input-number v-model="componentMeta.rowNum"
                                             controls-position="right"
                                             :precision="0"
                                             :min="0">
                            </el-input-number>
                        </div>
                        <div class="row-inp">
                            <span>轮播时间间隔</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.waitTimeSec"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="2">
                                </el-input-number>
                                <span style="margin-left: 3px;">s</span>
                            </div>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>轮播方式</span>
                            <el-select v-model="componentMeta.carousel">
                                <el-option label="单行滚动" value="single"></el-option>
                                <el-option label="整页滚动" value="page"></el-option>
                            </el-select>
                        </div>
                        <div class="row-inp">
                            <span>排序</span>
                            <el-checkbox v-model="componentMeta.sort">是否自动排序</el-checkbox>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>单位</span>
                            <el-input v-model="componentMeta.unit" placeholder="单位"></el-input>
                        </div>
                        <div class="row-inp">
                            <span>数据类型</span>
                            <el-select v-model="componentMeta.formatter">
                                <el-option label="数值" value="normal"></el-option>
                                <el-option label="千分位" value="money"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="compOptional.compType == 'static-grid' || compOptional.compType == 'scroll-board'">
                <div class="conf-row">
                    <p class="conf-row-title">整体配置</p>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>表行数</span>
                            <el-input-number v-model="componentMeta.rowNum"
                                             controls-position="right"
                                             :precision="0"
                                             :min="0">
                            </el-input-number>
                        </div>
                        <div class="row-inp">
                            <span>轮播时间间隔</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.waitTimeSec"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="2">
                                </el-input-number>
                                <span style="margin-left: 3px;">s</span>
                            </div>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>轮播方式</span>
                            <el-select v-model="componentMeta.carousel">
                                <el-option label="单行滚动" value="single"></el-option>
                                <el-option label="整页滚动" value="page"></el-option>
                            </el-select>
                        </div>
                        <div class="row-inp">
                            <span>悬浮停播</span>
                            <el-checkbox v-model="componentMeta.hoverPause">是否悬浮停播</el-checkbox>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>行号</span>
                            <el-checkbox v-model="componentMeta.index">是否显示行号</el-checkbox>
                        </div>
                        <div class="row-inp">
                            <span>行号表头</span>
                            <el-input v-model="componentMeta.indexHeader" placeholder="#"></el-input>
                        </div>
                    </div>
                    <div class="conf-row-item">
                        <div class="row-inp">
                            <span>表头高度</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.headerHeight"
                                                 controls-position="right"
                                                 :precision="0"
                                                 :min="0">
                                </el-input-number>
                                <span style="margin-left: 3px;">px</span>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>行号宽度</span>
                            <div class="row-inp-line">
                                <el-input-number v-model="componentMeta.indexWidth"
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
                            <span>表头背景色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['bg-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.headerBGC}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="headerBGC"></color-picker>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>奇数行背景色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['bg-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.oddRowBGC}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="oddRowBGC"></color-picker>
                            </div>
                        </div>
                        <div class="row-inp">
                            <span>偶数行背景色</span>
                            <div class="row-inp-absolute">
                                <i v-html="svgImg['bg-color']"></i>
                                <div class="color-fill" :style="{background: componentMeta.evenRowBGC}"></div>
                                <color-picker class="hideDom" :componentMeta="componentMeta" type="evenRowBGC"></color-picker>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </section>
    </div>
</template>

<script>
    import textConf from './text-conf'
    export default {
        data() {
            return {
                svgImg: this.$dataVSvg,
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
                    },{
                        value: 'dv-decoration-12',
                        label: '雷达'
                    }],
                dataVTemplate: this.$datavTemplateService
            }
        },
        components: {
            'text-conf': textConf
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
                    return this.compOptional.componentMeta;
                }else{
                    return {};
                }

            }
        }
    }
</script>

<style scoped>

</style>