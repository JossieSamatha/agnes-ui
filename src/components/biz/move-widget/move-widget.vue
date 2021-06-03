<template>
    <vue-drag-resize class="move-widget"
                     :class="{move: canMove}"
                     :isActive="canMove"
                     :isDraggable="canMove"
                     :isResizable="canMove"
    >
        <div class="top">
            <div class="title">
                <span>{{ compTitle }}</span>
                <em class="iconfont icon-exchange" v-if="compType && compType.length>1" @click="compChange"></em>
            </div>
            <div class="options">
                <em class="iconfont icon-setting" v-if="compType.includes('tree')" style="font-size: 16px" @click="settingClick"></em>
                <em class="iconfont" :class="canMove ? 'icon-pinned-close' : 'icon-pinned'" style="font-size: 15px" @click="canMoveChange"
                ></em>
                <em class="iconfont icon-fold"></em>
            </div>
        </div>
        <div class="container">
            <slot name="comp-slot"></slot>
        </div>
    </vue-drag-resize>
</template>

<script>

export default {
    name: 'MoveWidget',
    props: {
        compType: { type: Array },  // 组件类型
        compTitle: { type: String },
        manageTreeData: { type: Array },
    },
    data() {
        return {
            canMove: false,
            compRec: {
                y: 0,
                x: 0,
                w: 248,
                h: 'auto'
            }
        }
    },
    methods: {
        // 组件切换
        compChange() {
            this.$emit('compChange');
        },

        // 树数据管理弹框显示
        settingClick() {
            this.$emit('settingClick');
        },

        // resize(newRect) {
        //     this.compRec.w = newRect.width;
        //     this.compRec.h = newRect.height;
        //     this.compRec.y = newRect.top;
        //     this.compRec.x = newRect.left;
        // },

        canMoveChange(){
            this.canMove = !this.canMove;
            // if(this.canMove){
            //     this.compRec = {
            //         y: 120,
            //         w: 248,
            //         x: window.innerWidth / 2 - 125,
            //         h: 'auto'
            //     }
            // }else{
            //     this.compRec = {
            //         x: 0,
            //         y: 0,
            //         w: 248,
            //         h: 'auto'
            //     }
            // }
        }
    }
}
</script>

<style scoped>
    .move-widget {
        border: 1px solid #A8AED3;
        border-radius: 14px;
    }

    .move-widget:not(.move) {
        position: relative;
        top: 0!important;
        left: 0!important;
        width: 250px!important;
        height: 100%!important;
    }

    .move-widget:not(.move) >>> .content-container {
        width: 100%!important;
        height: 100%!important;
        overflow: hidden;
    }

    .move-widget >>> .content-container {
        border-radius: 14px;
    }

    .move-widget.vdr.active:not(.move):before {
        display: none;
    }

    .move-widget.move {
        position: fixed;
        background: #fff;
        z-index: 2000!important;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px 14px;
        background: #EFF2FB;
        border-radius: 14px 14px 0 0;
        border-bottom: 1px solid #A8AED3;
    }

    .top em {
        color: #A8AFD3;
        margin-left: 8px;
        cursor: pointer;
    }

    .top .title>span {
        color: #333;
        font-family: 'SourceHanSansCN-Medium';
    }

    .top .options .iconfont.icon-pinned-close {
        color: #0f5eff;
    }

    .container {
        height: calc(100% - 35px);
    }
</style>
