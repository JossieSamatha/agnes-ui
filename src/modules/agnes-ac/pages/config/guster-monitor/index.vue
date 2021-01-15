<template>
    <div class="guster-monitor" ref="datav_client_view">
        <div class="topPanel">
            <div class="optionPanel">
                <el-input class="searchInput" clearable placeholder="客户搜索" suffix-icon="el-icon-search">
                </el-input>
                <div></div>
            </div>
            <div class="content">
                <p v-for="(info,index) in guestInfo" :key="index">
                    <label>{{info.label}}：</label>
                    <span>{{info.value}}</span>
                </p>
            </div>
        </div>
        <div class="gridContainer">
            <grid-layout ref="gridLayout" :layout="gridLayout"
                         :col-num="8"
                         :margin="[5,5]"
                         :row-height="boardUnitHeight"
                         :maxRows="3"
                         :autoSize="false"
                         :is-draggable="false"
                         :is-resizable="false"
                         :vertical-compact="true"
                         :use-css-transforms="true"
                         @layout-ready="layoutReady"
            >
                <grid-item v-for="item in gridLayout" :key="item.i"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i">
                    <div class="menuContent">
                        <module-card :title="item.comp.label">
                            <template slot="content">
                                <component v-if="ifLayoutReady" :is="item.comp.type" :moduleObj="item.comp.data"></component>
                            </template>
                        </module-card>
                    </div>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script>
    import data from './data'

    export default {
        data() {
            return {
                // 用户信息
                guestInfo: [
                    {label: '客户名称', value: 'XXXXXXXXX银行'},
                    {label: '客户类型', value: '商业银行'},
                    {label: '组织机构代码', value: 'XXXXXXXXX'},
                    {label: '客户属性', value: 'XXXXXXXXX'},
                    {label: '客户名称', value: 'XXXXXXXXX银行'},
                    {label: '客户类型', value: '商业银行'},
                    {label: '组织机构代码', value: 'XXXXXXXXX'},
                    {label: '客户属性', value: 'XXXXXXXXX'},
                ],
                ifLayoutReady: false,
                gridLayout: data().gridLayoutType, // 面板表格布局数据
                boardUnitHeight: 0,     // 面板初始单元高度
            }
        },

        mounted() {
            this.selectBoardInfo();
        },

        methods: {
            selectBoardInfo() {
                const boardHeight = this.$refs.datav_client_view.clientHeight - 220;
                this.boardUnitHeight = (boardHeight - 35) / 6;
            },

            layoutReady(){
                this.ifLayoutReady = true;
            },
            transJson(data){
                return JSON.stringify(data);
            }
        }
    }
</script>

<style scoped>

</style>