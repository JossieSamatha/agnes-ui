<template>
    <basic-text class="date-time" :compOption="compOption">
        <template slot="textSlot">
            <span class="date">{{formatDate}}</span>
            <span class="week" v-show="this.compOption.showWeek" style="margin-left: 10px">{{week}}</span>
        </template>
    </basic-text>
</template>

<script>
    import basicText from './basic-text'
    export default {
        name: 'date-time',
        props: {
            position: Object,
            compOption: {
                type: Object
            }
        },
        components: {
            'basic-text': basicText
        },
        data(){
            return {
                fullDate: new Date(),
                week: '',
            }
        },
        watch: {
            fullDate: {
                handler(val){
                    const weekMap = {
                        fullCnName: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                        nickCnName: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        fullEnName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        nickEnName: ["Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat."]
                    };
                    this.week = weekMap[this.compOption.weekType][val.getDay()];
                },
                immediate: true
            }
        },
        computed: {
            formatDate(){
                const dateType = this.compOption.showDate ? this.compOption.dateType : '';
                const timeType = this.compOption.showTime ? this.compOption.timeType : '';
                const dateFormat = `${dateType} ${timeType}`;
                return this.$dateUtils.formatDate(this.fullDate, dateFormat);
            }
        },
        mounted() {
            this.timer = setInterval( ()=> {
                this.fullDate = new Date();
            }, 1000);
        },
        beforeDestroy: function() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
    }
</script>