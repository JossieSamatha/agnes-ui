<template>
    <el-drawer class="noticeDrawer"
               :with-header="false"
               :visible.sync="showDrawer"
               :direction="direction"
               :before-close="handleClose">
        <div class="slotCanve">
            <div class="top">
                <el-input class="search-input" placeholder="请选择输入内容..." suffix-icon="el-icon-search"
                          v-model="messageParam">
                </el-input>
                <em class="refreshIcon el-icon-refresh" title="刷新" @click="refreshNotice"></em>
            </div>
            <div class="container">
                <ul class="messagebox">
                    <transition-group name="slide">
                        <li class="boxLi"
                            v-for="(notice, index) in noticeData"
                            :key="notice.pkId"
                            @click="handelNotice(notice, index)"
                        >
                            <p class="title">
                                <el-badge :is-dot="notice.hasRead=='0'">{{notice.msgTitle}}</el-badge>
                            </p>
                            <div class="content">
                                <span>{{notice.msgDetail}}</span>
                            </div>
                            <p class="footer">{{notice.remindTime}}</p>
                        </li>
                    </transition-group>
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
            handelNotice(notice, index) {
                this.$api.MsgApi.batchRead([notice]).then(() => {
                    notice.hasRead = '1';
                    this.$emit('getUnreadCount');
                });

                this.noticeData.splice(index, 1);
            },

            // 关闭消息盒子
            handleClose() {
                this.$emit('noticeDrawerClose');
            },

            // 消息刷新
            refreshNotice() {
                this.$emit('refreshNotice');
            }
        },
    };
</script>

<style scoped>
    .slide-move {
        transition: all 1s;
    }

    .slide-leave-active {
        position: absolute;
        animation: slide-out 1s ease-out;
    }

    @keyframes slide-out {
        from {
            transform: translateX(0)
        }
        to {
            transform: translateX(-1000px)
        }
    }
</style>