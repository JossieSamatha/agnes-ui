<template>
    <div class="detail-popover" :style="styleProps">
        <div class="header">
            <span>计划详情</span>
            <span>
                <em class="el-icon-edit" @click="editDetail"></em>
                <em class="el-icon-delete" @click="deleteDetail"></em>
                <em class="el-icon-close" @click="closePopover"></em>
            </span>
        </div>
        <div class="body">
            <p>
                <svg-icon name="text" height="10px" color="#999"></svg-icon>
                <span class="text" :title="dataEventObj.msgData">{{dataEventObj.msgData}}</span>
            </p>
            <p>
                <svg-icon name="clock" height="12px" color="#999"></svg-icon>
                <span>12月9日 周三 9:00~10:00 </span>
            </p>
            <p>
                <svg-icon name="calendar-line" height="12px" color="#999"></svg-icon>
                <span>每天</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            styleProps: Object,
            dataEventObj: Object
        },
        data() {
            return {
            }
        },
        methods: {
            closePopover() {
                this.$emit('closePopover');
            },

            deleteDetail(){

            },

            editDetail(){
                this.$emit('editDetail');
            }
        },
    }
</script>

<style scoped>
    .detail-popover {
        position: absolute;
        right: 0;
        width: 200px;
        font-size: 12px;
        padding: 14px;
        background: #fff;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
    }

    .detail-popover::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 5px;
        border: 5px solid transparent;
        border-right-color: #fff;
    }

    .detail-popover .header {
        display: flex;
        justify-content: space-between;
    }

    .detail-popover .header>span:first-child {
        position: relative;
        color: #333;
        font-family: SourceHanSansCN-Medium;
        padding-left: 10px;
    }

    .detail-popover .header>span:first-child::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 0;
        display: block;
        width: 6px;
        height: 6px;
        background: #3CACEC;
        border-radius: 50%;
    }

    .detail-popover .header>span:last-child {
        color: #999;
    }

    .detail-popover .header>span:last-child em {
        font-size: 14px;
        cursor: pointer;
    }

    .detail-popover .header>span:last-child em:hover {
        color: #0F5EFF;
    }

    .detail-popover .header>span:last-child em + em {
        margin-left: 6px;
    }

    .detail-popover .body {
        margin-top: 6px;
    }

    .detail-popover .body p {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
    }

    .detail-popover .body p .text {
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail-popover .body .svg-icon {
        line-height: 0;
        margin-right: 6px;
    }
</style>