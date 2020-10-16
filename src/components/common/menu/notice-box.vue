<template>
    <el-drawer class="noticeDrawer"
            :with-header="false"
            :visible.sync="showDrawer"
            :direction="direction"
            :before-close="handleClose">
        <div class="slotCanve">
            <div class="top">
                <el-input class="search-input" placeholder="请选择输入内容..." suffix-icon="el-icon-search" v-model="messageParam">
                </el-input>
                <li class="refreshIcon el-icon-refresh" title="刷新"></li>
            </div>
            <div class="container">
                <ul class="messagebox">
                <li class="boxLi" v-for="notice in noticeData" :key="notice.pkId" @click="handelNotice(notice)">
                    <p class="title">
                        <el-badge :is-dot="notice.hasRead=='0'">{{notice.msgTitle}}</el-badge>
                    </p>
                    <div class="content">
                        <span>{{notice.msgDetail}}</span>
                    </div>
                    <p class="footer">{{notice.remindTime}}</p>
                </li>
                </ul>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    export default {
        data() {
            return {
                messageParam: '',
                drawer: false,
                direction: 'rtl'
            }
        },
        props: {
            noticeData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            showDrawer: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handelNotice(notice){
                notice.hasRead = '1';
            },
            handleClose(){
                this.$emit('noticeDrawerClose');
            }
        },
    };
</script>

<style>
</style>