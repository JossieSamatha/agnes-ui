<template>
    <div class="my-index">
        <div>
            <p class="hello">欢迎登陆，{{userName}}，{{sayHello}}！</p>
            <p class="text">欢迎登录，{{userName}}，近期你完成任务超时天数为
                <span style="color: #FA6A6A">{{overTimeDay}}</span> 天，
                正常完成任务天数为
                <span style="color: #4C6CFF">{{normalDay}}</span>天，
                工作效率超过了
                <span style="color: #4C6CFF">{{effect}}%</span>的同事，
                今天你有待办任务
                <span style="color: #FA6A6A">{{effect}}</span>件，加油！
            </p>
            <el-button class="know" type="primary" size="small">我知道了</el-button>
        </div>
        <svg-icon name="indexIkon" height="165px"></svg-icon>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                sayHello: '',
                overTimeDay: '0',
                normalDay: '2',
                effect: '80',

            }
        },

        mounted() {
            this.userName = this.$app.session.data.user.userName;
            this.helloInfo();
        },

        methods: {
            helloInfo() {
                const nowHour = (new Date()).getHours();
                switch (true) {
                    case (nowHour > 0 && nowHour <= 10):
                        this.sayHello = '早上好';
                        break;
                    case (nowHour > 10 && nowHour <= 14):
                        this.sayHello = '中午好';
                        break;
                    case (nowHour > 14 && nowHour <= 18):
                        this.sayHello = '下午好';
                        break;
                    default:
                        this.sayHello = '晚上好';
                }
            }
        },
    }
</script>

<style scoped>
    .my-index{
        position: relative;
        height: calc(100% - 20px);
        background: #E9EFFD;
        border-radius: 14px;
        padding: 24px 20px;
    }

    .my-index>div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: calc(100% - 240px);
        height: 100%;
    }

    .my-index .hello{
        color: #333;
        font-size: 22px;
        margin-bottom: 20px;
    }

    .my-index .text{
        color: #666;
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 24px;
    }

    .my-index .know {
        width: 88px;
        height: 36px;
        font-size: 14px;
        border-color: #0F5EFF;
        background: #0F5EFF;
        border-radius: 6px;
    }

    .my-index .svg-icon{
        position: absolute;
        right: 0;
        bottom: -14px;
    }
</style>