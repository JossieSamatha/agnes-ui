<template>
    <div class="calendar-def" :class="pageType">
        <agnes-calendar :style="{height: ifFold ? '135px' : 'auto'}"
                        ref="calendar"
                        v-model="calendarVal"
                        :first-day-of-week="7"
                        @selectDate="selectDate"
                        @pickDay="pickDay">
            <template slot="dateCell" slot-scope="{date, data}">
                <span class="content" :class="{'weekend': data.type === 'current-month' ? getDateObj(date, 'workday') : false}">
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
            pageType: String,
            quartzTime: String,
        },
        data() {
            return {
                calendarVal: '',
                workStatus: '',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                memoNum: '',
                ifFold: false,
                monthData: [],
                memoArr: [],
                freshInterval: null,
            }
        },
        created() {
            this.getCalendarData(this.todayDate);
            this.startInterval();
        },
        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (this.pageType === 'personal' && from.path === '/datav.client.view' ||
                    this.pageType === 'department' && from.path === '/datav.dep.view') {
                    this.clearInterval();
                }
                if (this.pageType === 'personal' && to.path === '/datav.client.view' ||
                    this.pageType === 'department' && to.path === '/datav.dep.view') {
                    this.startInterval();
                }
            }
        },

        computed: {
            intervalMin(){
                const quartzTime = this.quartzTime ? this.quartzTime : '5';
                return parseInt(quartzTime)*60*1000;
            }
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
                if(this.pageType === 'memo'){
                    this.$emit('dateChange', day);
                }else{
                    const res = await this.$api.HomePageApi.selectMemoByMemoDate({
                        pageType: this.pageType,
                        memoDate: day
                    });
                    this.memoArr = res.data;
                }
            },

            startInterval(){
                this.freshInterval = setInterval(() => {
                    this.getCalendarData(this.todayDate);
                }, this.intervalMin);
            },

            clearInterval(){
                clearInterval(this.freshInterval);
            }

        }
    }
</script>
