<template>
    <div class="calendar-def" :class="pageType">
        <agnes-calendar :style="{height: ifFold ? '135px' : 'auto'}"
                        ref="calendar"
                        v-model="calendarVal"
                        :first-day-of-week="7"
                        @selectDate="selectDate"
                        @pickDay="pickDay">
            <template slot="dateCell" slot-scope="{date}">
                <span class="content" :class="{'weekend': getDateObj(date, 'workday')}">
                    <span>{{ getDay(date) }}</span>
                    <em v-show="getDateObj(date, 'event')" class="circle"></em>
                </span>
            </template>
        </agnes-calendar>
        <template v-if="pageType === 'memo'">
            <slot name="list-slot"></slot>
        </template>
        <template v-else>
            <p class="flodP" @click="flodCalendar">
                <em v-show="!ifFold" class="fa fa-angle-double-up"></em>
                <em v-show="ifFold" class="fa fa-angle-double-down"></em>
            </p>
            <ul class="info-ul">
                <li v-for="memo in memoArr" :key="memo.msgId">{{memo.msgData}}</li>
            </ul>
        </template>
    </div>

</template>

<script>
    export default {
        props: {
            pageType: String
        },
        data() {
            return {
                calendarVal: '',
                workStatus: '',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                memoNum: '',
                ifFold: false,
                monthData: [],
                memoArr: [{msgId: '01', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '02', msgData: '安信收益三年运作将进入过渡期，赎回巴拉巴拉巴拉巴拉巴拉巴拉'},
                    {msgId: '03', msgData: '华安锦源0-7年开始发行至2021/02/26'},
                    {msgId: '04', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '05', msgData: '瑞安本封闭期即将结束'},]
            }
        },
        created() {
            this.getCalendarData(this.todayDate);
        },
        methods: {
            getDay(date) {
                return new Date(date).getDate();
            },

            getDateObj(date, type) {
                const dateObj = this.monthData[new Date(date).getDate()-1];
                if(dateObj){
                    if(type === 'workday'){
                        return dateObj.workday && dateObj.workday === '0';
                    }else if(type === 'event'){
                        return dateObj.calendarNum && parseInt(dateObj.calendarNum) > 0;
                    }
                }
            },

            async getCalendarData(date) {
                const pageType = this.pageType === 'memo' ? 'department' : this.pageType
                const res = await this.$api.HomePageApi.selectMemoDetailOfMonth({
                    pageType: pageType,
                    memoDate: date
                });
                this.monthData = res.data;
                this.$emit('getMonthData', res.data)
            },

            flodCalendar() {
                this.ifFold = !this.ifFold;
            },

            // 日历月份切换
            selectDate(date){
                this.getCalendarData(date)
            },

            // 获取当前日期信息
            async pickDay(day){
                const res = await this.$api.HomePageApi.selectMemoByMemoDate({
                    pageType: this.pageType,
                    memoDate: day
                });
                this.memoArr = res.data;
            }
        }
    }
</script>
