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
        @start="gridUnitDragStart(draggableList)" @end="gridUnitDragEnd" @add="gridUnitDragAdd(draggableList,$event)">
        <div v-for="(unit,unitIndex) in draggableList" :key="unit.id">
            <template v-if="unitIndex == 0">
                <span class="delUnitGrid" @click="delContent" v-if="ifCloseIconShow">
                    <em class="fa fa-close"></em>
                </span>
                <span class="compEntrance" v-if="unit.arrowShow">
                    <em class="el-icon-refresh" v-if="unit.type === 'calendar-def'" @click="calendarRefresh"></em>
                    <em class="fa fa-angle-right" v-else @click="entranceMenu(unit)"></em>
                </span>
                <module-card :title="unit.label">
                    <template slot="content">
                        <slot name="group-content" :unitData="unit"></slot>
                    </template>
                </module-card>
            </template>
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
            ifCloseIconShow(){
                return this.isGridEdit;
            },
            dragDisabled(){
                return !this.isGridEdit;
            },
        },
        methods: {
            // 内容删除
            delContent() {
                this.$emit('gridUnitDel', this.draggableId);
            },

            // 面板grid -- 单元开始拖动
            gridUnitDragStart(){
                const movedUnitId = this.draggableId;
                this.$emit('gridUnitDragStart', movedUnitId);
            },

            // 面板grid -- 单元拖动结束
            gridUnitDragEnd(){
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
            const {menuId, moduleArgs} = moduleItem
            if (menuId) {
              let clientView = this.$app.views.getView(menuId);
              let clientTabView = Object.assign({args: moduleArgs, id: menuId}, clientView);
              this.$nav.showView(clientTabView);
            }
          },

          calendarRefresh() {
            this.$dataVBus.$emit('clientCalendarRefresh');
          }

        }
    }
</script>

<style scoped>
    .compEntrance {
        position: absolute;
        top: 4px;
        right: 10px;
        font-size: 20px;
        color: #999;
        z-index: 10;
        cursor: pointer;
    }
</style>
