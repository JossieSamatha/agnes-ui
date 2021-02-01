<!--/*-->
<!--*-->
<!--* 布局面板 -- 面板内容功能-->
<!--* 支持面板单元格内容的新增、删除、对换等-->
<!--* 属性参数：-->
<!--*   单元格数据对象：draggableList （数组格式，每个内容只保存一个对象，数组格式是为draggable组件准备）-->
<!--*   当前单元格对应面板Id：draggableId （字符串）-->
<!--*   单元格是否可编辑：isGridEdit （默认false，即是否可拖拽内容）-->
<!--*-->
<!--*   相关回调事件：-->
<!--*   单元格删除：delUnitGrid(delUnitId) 父组件绑定事件回调，返回参数（当前单元格对应面板Id）-->
<!--*   单元格拖动开始：gridUnitDragStart(movedUnitId) 父组件绑定事件回调，返回参数（当前单元格对应面板Id）-->
<!--*   单元格拖动结束：gridUnitDragEnd() 父组件绑定事件回调-->
<!--*   单元格数据增加：gridUnitDragAdd(changeData) 父组件绑定事件回调，返回参数（修改对象数据）-->
<!--*   其他相关事件绑定： extEvent （传入对象）-->
<!--*-->
<!--* */-->

<template>
    <draggable class="menuContent" :list="draggableList" group="unitGroup" :disabled="dragDisabled"
               @start="gridUnitDragStart(draggableList)" @end="gridUnitDragEnd"
               @add="gridUnitDragAdd(draggableList,$event)">
        <div :class="{nonePadding: unit.compType === 'common-search-panel'}" v-for="(unit, unitIndex) in draggableList"
             :key="unit.compId">
            <template v-if="unitIndex == 0">
                <span class="delUnitGrid" @click="delContent" v-if="ifCloseIconShow">
                    <em class="fa fa-close"></em>
                </span>
                <span v-show="unit.arrowShow === '1'"
                      class="compEntrance"
                      :class="{'bcg': unit.arrowBlock === '1'}"
                      @click="entranceMenu(unit)">
                    查看更多<em class="fa fa-angle-right"></em>
                </span>
                <common-search-panel v-if="unit.compType === 'common-search-panel'"></common-search-panel>
                <module-card v-else :title="unit.label">
                    <template slot="headOption">
                        <i class="refresh-btn el-icon-refresh-left" @click="refreshData"></i>
                    </template>
                    <template slot="content">
                        <slot ref="groupContent" name="group-content" :unitData="unit"></slot>
                    </template>
                </module-card>
            </template>
            <div class="mask"></div>
        </div>
    </draggable>
</template>

<script>
    export default {
        props: {
            isGridEdit: {
                type: Boolean,
                default: false
            },
            draggableList: {
                type: Array,
                require: true
            },
            draggableId: {
                type: String,
                require: true
            }
        },
        computed: {
            ifCloseIconShow() {
                return this.isGridEdit;
            },
            dragDisabled() {
                return !this.isGridEdit;
            },
        },
        methods: {
            // 内容删除
            delContent() {
                this.$emit('gridUnitDel', this.draggableId);
            },

            // 面板grid -- 单元开始拖动
            gridUnitDragStart() {
                const movedUnitId = this.draggableId;
                this.$emit('gridUnitDragStart', movedUnitId);
            },

            // 面板grid -- 单元拖动结束
            gridUnitDragEnd() {
                this.$emit('gridUnitDragEnd');
            },

            // 面板grid -- 单元draggable数组新增
            gridUnitDragAdd(newArr, evt) {
                if (newArr.length == 2) {
                    if (evt.from.className.indexOf('menuContent') == -1) {
                        newArr.splice(1, 1);
                    } else {
                        const changeData = newArr.splice(0, 1);
                        this.$emit('gridUnitDragAdd', changeData);
                    }
                }
            },

            entranceMenu(moduleItem) {
                const {menuId, compParams} = moduleItem;
                const compParamObj = JSON.parse(compParams || "{}")
                if (menuId) {
                    let clientView = this.$app.views.getView(menuId);
                    let clientTabView = Object.assign({args: compParamObj, id: menuId}, clientView);
                    this.$nav.showView(clientTabView);
                }
            },

            refreshData() {
                this.$children[0].$children[0].$children[0].$children[0].refreshData();
            }
        }
    }
</script>

<style scoped>
    .vue-grid-item.rightPined .compEntrance {
        top: 24px;
    }

    .compEntrance {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 12px;
        color: #0F5EFF;
        z-index: 10;
        cursor: pointer;
    }

    .vue-grid-item.rightPined .compEntrance.bcg {
        top: 20px;
        color: #666;
        background: #EEF1FC;
        padding: 5px 10px;
        border-radius: 4px;
    }

    .compEntrance > em {
        font-size: 14px;
        color: #999;
        vertical-align: baseline;
        margin-left: 6px;
    }

    .refresh-btn {
        color: #999;
        font-size: 16px;
        font-weight: bold;
        line-height: 16px;
        margin-left: 6px;
        cursor: pointer;
    }

    .refresh-btn:hover {
        color: #0f5eff;
    }

    .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: none;
    }
</style>
