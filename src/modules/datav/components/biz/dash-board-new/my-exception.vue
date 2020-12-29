<template>
    <div class="strip-comp-container">
        <div class="strip-comp" v-for="item in dataArr" :key="item.pkId">
            <span class="icon">
                <svg-icon name="EXCEPTION" width="12px" height="12px" color="#fff"></svg-icon>
            </span>
            <span class="info" :title="item.errDesc">{{item.errDesc}}</span>
            <span class="type">异常通知</span>
            <span class="date-time">{{item.crtTs}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataArr: []
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            async getData() {
                let resp = await this.$api.HomePageApi.selectErrInfoByUser();
                if(resp.data.length>0){
                    this.dataArr = resp.data.rows.splice(0,6);
                }
            }
        },
    }
</script>

<style scoped>
    .strip-comp {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        border-radius: 4px;
        color: #333;
        font-size: 12px;
        background: #EFF3FC;
        padding: 0 32px 0 16px;
    }

    .strip-comp+.strip-comp {
        margin-top: 12px;
    }

    .strip-comp .icon {
        flex: none;
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        line-height: 20px;
        margin-right: 18px;
        background: #F7603D;
    }

    .strip-comp .icon .svg-icon {
        margin: auto;
    }

    .strip-comp .info {
        flex: 1;
        width: 100%;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .strip-comp .type {
        white-space: nowrap;
        margin-left: auto;
    }

    .strip-comp .date-time {
        white-space: nowrap;
        margin-left: 85px;
    }
</style>