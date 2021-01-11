<!--/*-->
<!--*-->
<!--* 布局面板 &#45;&#45; 基础面板功能-->
<!--* 支持面板单元格新增、删除、拉伸、移动-->
<!--* 属性参数：-->
<!--*   表格数据：gridData （数组格式，其中必须包含x,y,w,h,i参数）-->
<!--*   行数：rowNum（默认6行）-->
<!--*   列数：colNum（默认8列）-->
<!--*   单元格间隔：gridMargin （默认[5,5]）索引0值为列间隙，索引1值为行间隙-->
<!--*   表格是否可拖拽拉伸：isGridDefine （默认false）-->
<!--*   其他相关属性绑定： extAttr （传入对象）-->
<!--*-->
<!--*   单元格新增：addUnitGrid(newUnitObj) 可通过父组件调用，传入新单元格参数对象即可-->
<!--*   单元格删除：delUnitGrid(gridData, delUnitId, delUnitIndex) 父组件绑定事件回调，返回参数（表格数据，删除单元格id，删除单元格索引值）-->
<!--*   其他相关事件绑定： extEvent （传入对象）-->
<!--*-->
<!--* */-->

<template>
    <grid-layout ref="gridLayout" :layout="gridData"
        :col-num="colNum"
        :margin="gridMargin"
        :row-height="rowHeight"
        :autoSize="autoSize"
        :is-draggable="isDraggable"
        :is-resizable="isResizable"
        :vertical-compact="verticalCompact"
        v-bind="extAttr"
        v-on="extEvent">
        <grid-item v-for="(item,itemIndex) in gridData"
                   :key="item.i"
                   :class="{rightPined: parseInt(item.x)>=8, 'attach-top': item.x === item.y && item.x === 0}"
                   :x="parseInt(item.x)"
                   :y="parseInt(item.y)"
                   :w="parseInt(item.w)"
                   :h="parseInt(item.h)"
                   :i="item.i"
                   @resized="gridItemResized">
            <span class="delUnitGrid" @click="delBoardUnit(item.i, itemIndex)" v-if="ifCloseIconShow">
                <em class="fa fa-close"></em>
            </span>
            <slot name="grid-item-content" :unitGrid="item" :unitGridIndex="itemIndex"></slot>
        </grid-item>
    </grid-layout>
</template>

<script>
export default {
    props: {
        gridData: {
            type: Array,
            require: true
        },
        colNum: {
            type: Number,
            default: 12
        },
        rowHeight: {
            type: Number,
            default: 60
        },
        gridMargin: {
            type: Array,
            default() {
                return [24, 24];
            }
        },
        isGridDefine: {
            type: Boolean,
            default: false
        },
        autoSize:{
            type: Boolean,
            default: false
        },
        verticalCompact:{
            type: Boolean,
            default: true
        },
        useCssTransforms:{
            type: Boolean,
            default: true
        },
        extAttr: {
            type: Object
        },
        extEvent: {
            type: Object,
        }
    },
    data: function () {
        return {
            isDraggable: false,        // 面板是否可移动
            isResizable: false,        // 面板是否可拖拽
            parseInt: (num)=>{
                return parseInt(num);
            }
        }
    },
    watch: {
        isGridDefine: {
            handler(val){
                this.isDraggable = val;
                this.isResizable = val;
                this.ifCloseIconShow = val;
            },
            immediate: true
        }
    },
    methods: {
        // 面板grid -- 新增单元
        addBoardUnit(newUnitObj){
            this.gridData.push(newUnitObj);
        },

        // 面板grid -- 删除单元
        delBoardUnit(delUnitId, delUnitIndex){
            this.gridData.splice(delUnitIndex,1);
            this.$emit('delBoardUnit',delUnitId);
        },

        // 面板单元拉伸结束
        gridItemResized(){
            // 拉伸结束后，触发窗口resize监听事件
            this.$nextTick(function () {
                // 兼容IE
                if(document.createEvent) {
                    let event = document.createEvent("HTMLEvents");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                } else if(document.createEventObject) {
                    window.fireEvent("onresize");
                }
            });
        }
    }

}
</script>