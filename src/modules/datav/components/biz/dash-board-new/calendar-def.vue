<template>
    <div class="calendar-def" :class="pageType">
        <agnes-calendar :style="{height: ifFold ? '135px' : 'auto'}"
                        ref="calendar"
                        v-model="calendarVal"
                        :first-day-of-week="7"
                        @selectDate="selectDate"
                        @pickDay="pickDay">
            <template slot="dateCell" slot-scope="{date, data}">
                <span class="content"
                      :class="{'weekend': getDateObj(data.day).ifWorkDay,
                      'bizDate': data.type === 'current-month' && bizDate === data.day}">
                    <span>{{ getDay(date) }}</span>
                    <em v-show="getDateObj(data.day).hasMemoNum" class="circle"></em>
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
                <li v-for="memo in memoArr" :key="memo.memoId">{{ memo.memoDesc }}</li>
            </ul>
        </template>
    </div>

</template>

<script>
    export default {
        props: {
          pageType: String,
          quartzTime: String,
          pageParams: String,
          filterValue: String,
        },
        data() {
            return {
                bizDate: new Date().toLocaleDateString().replace(/\//g, '-'),
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
        async created() {
          this.onload();
        },
        watch: {
          filterValue() {
            this.onload();
          },

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
          },

        },

        computed: {
            intervalMin(){
                const quartzTime = this.quartzTime ? this.quartzTime : '5';
                return parseInt(quartzTime)*60*1000;
            }
        },

        methods: {
          async onload() {
            const resp = await this.$api.changeDataApi.getChangeData();
            this.calendarVal = resp.data ? resp.data.bizDate : this.todayDate;
            this.bizDate = this.calendarVal;
            this.getCalendarData(this.calendarVal);
            this.pickDay(this.calendarVal);
            this.startInterval();
          },
          getDay(date) {
            return new Date(date).getDate();
          },

          getDateObj(date) {
            if (this.monthData && this.monthData.length > 0) {
              const dateObj = this.$lodash.find(this.monthData, {bizDate: date});
              if (dateObj) {
                dateObj.ifWorkDay = dateObj.workday && dateObj.workday === '0';
                if (this.pageType === 'memo') {
                  dateObj.hasMemoNum = dateObj.dopRuMemoList.length > 0 || dateObj.dopRuRosterVoList.length > 0;
                } else {
                  dateObj.hasMemoNum = dateObj.calendarNum && parseInt(dateObj.calendarNum) > 0
                }
                return dateObj;
              }
            }
            return {
              ifWorkDay: false,
              hasMemoNum: false
            }
          },

          async getCalendarData(date) {
            let apiRes = [];
            if (this.pageParams !== null && this.pageParams !== '' && this.pageParams !== undefined) {
              apiRes = await this.$api.memoApi.getMemoListOfMonth(this.pageParams, date, this.filterValue);
            } else {
              apiRes = await this.$api.memoApi.getMemoListOfMonth('memo', date, this.filterValue);
            }
            this.$emit('getMonthData', apiRes.data);

            this.monthData = apiRes.data;
          },

          flodCalendar() {
            this.ifFold = !this.ifFold;
          },

          // 日历月份切换
          selectDate(date) {
            this.getCalendarData(date)
          },

          // 获取当前日期信息
          async pickDay(day) {
            if (this.pageType === 'memo') {
              this.$emit('dateChange', day);
            } else {
              const res = await this.$api.HomePageApi.selectMemoByMemoDate({
                pageType: this.pageType,
                memoDate: day
              });
              this.memoArr = res.data;
            }
          },

          startInterval() {
            this.freshInterval = setInterval(() => {
              if (this.pageType === 'personal' && this.$route.path === '/datav.client.view' ||
                  this.pageType === 'department' && this.$route.path === '/datav.dep.view') {
                this.calendarVal = this.bizDate;
                this.getCalendarData(this.calendarVal);
                this.pickDay(this.calendarVal);
              } else {
                this.clearInterval();
              }
            }, this.intervalMin);
          },

          clearInterval() {
            clearInterval(this.freshInterval);
          }
        },

    }
</script>
