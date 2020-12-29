<template>
    <div class="calendar-def">
        <agnes-calendar :style="{height: ifFold ? '135px' : 'auto'}"
                ref="calendar"
                v-model="calendarVal"
                :first-day-of-week="7">
            <template slot="dateCell" slot-scope="{date}">
                <span class="content">
                    <span>{{ getDay(date) }}</span>
                    <em v-if="false" class="circle"></em>
                </span>
            </template>
        </agnes-calendar>
        <p class="flodP" @click="flodCalendar">
            <em v-show="!ifFold" class="fa fa-angle-double-up"></em>
            <em v-show="ifFold" class="fa fa-angle-double-down"></em>
        </p>
        <ul class="info-ul">
            <li v-for="msg in msgArr" :key="msg.msgId">{{msg.msgData}}</li>
        </ul>
    </div>

</template>

<script>
    export default {
        props: {
            calendarVal: String,
            module: String,
            pageType: String
        },
        data() {
            return {
                workStatus: '',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                memoNum: '',
                ifFold: false,
                msgArr: [
                    {msgId: '01', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '02', msgData: '安信收益三年运作将进入过渡期，赎回巴拉巴拉巴拉巴拉巴拉巴拉'},
                    {msgId: '03', msgData: '华安锦源0-7年开始发行至2021/02/26'},
                    {msgId: '04', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '05', msgData: '瑞安本封闭期即将结束'},
                ]
            }
        },
        mounted() {
            this.$dataVBus.$off('clientCalendarRefresh');
            this.$dataVBus.$on('clientCalendarRefresh', this.clientCalendarRefresh);
            this.getCalendarData(this.todayDate, true);
            this.$nextTick(() => {
                if (this.$app.nav.tabBar.currentTabKey === this.module) {
                    this.$refs.calendar.pickDay(this.todayDate);
                }
            });
        },

        methods: {
            getDay(date) {
                return new Date(date).getDate();
            },

            clientCalendarRefresh() {
                this.$refs.calendar.selectDate('today');
                this.getCalendarData(this.todayDate);
            },

            async getCalendarData(date) {
                if (this.pageType === 'personal') {
                    const res = await this.$api.memoApi.getMemoListByUser(date, '04');
                    this.memoNum = res.data.length;
                } else {
                    const res = await this.$api.memoApi.getMemoList(date, '04');
                    this.memoNum = res.data.length;
                }
            },

            calendarDetail(data) {
                let clientView = this.$app.views.getView("agnes.dop.memo");
                let clientTabView = Object.assign({
                    args: {pageType: this.pageType, memoDt: data.day},
                    id: "agnes.dop.memo"
                }, clientView);
                this.$nav.showView(clientTabView);
            },

            flodCalendar() {
                this.ifFold = !this.ifFold;
            }
        }
    }
</script>
