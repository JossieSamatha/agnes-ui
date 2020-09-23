<template>
    <div>
        <el-tag class="yAxisTag"
                :key="element.field"
                size="small"
                closable
                @close="closeAxis"
                style="margin-right:5px;margin-bottom: 6px"
                :style="axisItem.color">
            <i class="el-icon-arrow-down" style="margin-right: 5px"></i>
            <i v-if="element.isDescending" class="icon iconfont icon-paixu-jiangxu"
               style="margin-right: 5px"></i>
            <i v-if="element.isAscending" class="icon iconfont icon-paixu-shengxu"
               style="margin-right: 5px"></i>
            {{element.headerName}}
            <!--
            1.指标的汇总方式标识：op  opName
            2.维度的汇总方式标识：groupRule  groupRuleName
            -->
            <span v-if="label && !element.op && !element.groupRule">({{label}})</span>
            <span v-if="element.op">({{element.opName}})</span>
            <span v-if="element.groupRuleName">({{element.groupRuleName}})</span>
            <span v-if="element.hasPercent">{{element.hasPercentName}})</span>
            <!--过滤条件-->
            <span v-if="!element.minFil && !element.startDateTime">{{element.numLabel}}</span>&nbsp;
            <span v-if="element.numLabelValue">{{element.numLabelValue}}</span>&nbsp;
            <span v-if="!element.dateTime">{{element.filterNum}}</span>&nbsp;
            <span v-if="element.dateTime">{{element.dateTime}}</span>&nbsp;
            <span v-if="element.minFil">在{{element.minFil}}到{{element.maxFil}}之间</span>
            <span v-if="element.startDateTime">在{{element.startDateTime}}到{{element.endDateTime}}之间</span>

            <el-cascader-panel
                    ref="axisCascaderPanel"
                    v-model="axisPanelName"
                    @change="axisChange"
                    :options="optionsData">
            </el-cascader-panel>
            <div class="edit-name" v-if="element.isEdit">
                <div class="text">
                    <el-input v-model="title"></el-input>
                </div>
                <div class="btn">
                    <el-button plain @click="closeEdit(element)">取消</el-button>
                    <el-button type="primary" @click="saveEditName(element,title)">确定
                    </el-button>
                </div>
            </div>
        </el-tag>
    </div>
</template>

<script>
    export default {
        name: "axis-tag",
        props: {
            index: Number,
            axisIndex: Number,
            element: Object,
            axisItem: Object,
        },
        data() {
            return {
                axisPanelName: '',
                title: '',
                optionsData: [],
                label: '',
            }
        },
        mounted() {
            // this.$emit("getCurElement", this.element)
            this.$app.registerCmd('clearEditFilter', this.closeEdit)
        },
        methods: {
            closeAxis() {
                this.$emit('closeAxisData');
            },
            axisChange(name) {
                this.$emit('panelChange', this.index, name, this.element, this.axisIndex);
            },
            closeEdit(element) {
                if (element) {
                    element.isEdit = false;
                    this.title = element.headerName;
                }
                if (this.$refs.axisCascaderPanel) {
                    let data = '';
                    if (this.$refs.axisCascaderPanel.getCheckedNodes() && this.$refs.axisCascaderPanel.getCheckedNodes()[0]) {
                        data = this.$refs.axisCascaderPanel.getCheckedNodes()[0].data;
                    }
                    if (data && data.value === 'updateName' || data && data.value === 'deleteFiled' || data && data.value === 'updateFiled' || data && data.value === 'dataFormatter') {
                        this.$refs.axisCascaderPanel.clearCheckedNodes();
                    }
                }
            },
            saveEditName(element, headerName) {
                element.headerName = headerName;
                this.closeEdit(element);
            }
        },
        watch: {
            element: {
                handler(val) {
                    this.title = val.headerName;
                    let data = [];
                    if (this.axisItem.options) {
                        this.axisItem.options.forEach(item => {
                            if (item.type === val.typeName) {
                                data = item.data;
                                this.label = item.label;
                            }
                        });
                        this.optionsData = data;
                    }
                },
                deep: true,
                immediate: true
            },
            optionsData: {
                handler(val) {
                    if (val && val.length > 0) {
                        val.forEach(item => {
                            if (item.value === 'order') {
                                this.axisPanelName = ["order", "normal"];
                            }
                        })
                    }
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>