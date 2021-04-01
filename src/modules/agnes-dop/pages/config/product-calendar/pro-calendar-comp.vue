<template>
  <div class="calendar-def">
    <agnes-calendar ref="calendar"
                    v-model="calendarVal"
                    :first-day-of-week="7"
                    @selectDate="selectDate">
      <template slot="dateCell" slot-scope="{date, data}">
                <span class="content"
                      :class="{'weekend': getDateObj(data.day).ifWorkDay,
                      'bizDate': data.type === 'current-month' && bizDate === data.day}">
                    <span>{{ getDay(date) }}</span>
                    <em v-show="getDateObj(data.day).hasMemoNum" class="circle"></em>
                </span>
      </template>
    </agnes-calendar>
    <template>
      <slot name="list-slot"></slot>
    </template>
  </div>

</template>

<script>
export default {
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

  methods: {
    async onload() {
      const resp = await this.$api.changeDataApi.getChangeData();
      this.calendarVal = resp.data ? resp.data.bizDate : this.todayDate;
      this.bizDate = this.calendarVal;
      this.getCalendarData(this.calendarVal);
    },
    getDay(date) {
      return new Date(date).getDate();
    },

    getDateObj(date) {
      if (this.monthData && this.monthData.length > 0) {
        const dateObj = this.$lodash.find(this.monthData, {bizDate: date});
        if (dateObj) {
          dateObj.ifWorkDay = dateObj.workday && dateObj.workday === '0';
          dateObj.hasMemoNum = dateObj.dopRuMemoList.length > 0 || dateObj.dopRuRosterVoList.length > 0;
          return dateObj;
        }
      }
      return {
        ifWorkDay: false,
        hasMemoNum: false
      }
    },

    async getCalendarData() {
      // apiRes = await this.$api.memoApi.getMemoListOfMonth('memo', date, this.filterValue);
      // this.$emit('getMonthData', apiRes.data);
      const apiRes = {"code":"00000000","data":[{"bizDate":"2020-11-01","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期天","workday":"0"},{"bizDate":"2020-11-02","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期一","workday":"1"},{"bizDate":"2020-11-03","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期二","workday":"1"},{"bizDate":"2020-11-04","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期三","workday":"1"},{"bizDate":"2020-11-05","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期四","workday":"1"},{"bizDate":"2020-11-06","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期五","workday":"1"},{"bizDate":"2020-11-07","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期六","workday":"0"},{"bizDate":"2020-11-08","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期天","workday":"0"},{"bizDate":"2020-11-09","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期一","workday":"1"},{"bizDate":"2020-11-10","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期二","workday":"1"},{"bizDate":"2020-11-11","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期三","workday":"1"},{"bizDate":"2020-11-12","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期四","workday":"1"},{"bizDate":"2020-11-13","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期五","workday":"1"},{"bizDate":"2020-11-14","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期六","workday":"0"},{"bizDate":"2020-11-15","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期天","workday":"0"},{"bizDate":"2020-11-16","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期一","workday":"1"},{"bizDate":"2020-11-17","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期二","workday":"1"},{"bizDate":"2020-11-18","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期三","workday":"1"},{"bizDate":"2020-11-19","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期四","workday":"1"},{"bizDate":"2020-11-20","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期五","workday":"1"},{"bizDate":"2020-11-21","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期六","workday":"0"},{"bizDate":"2020-11-22","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期天","workday":"0"},{"bizDate":"2020-11-23","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期一","workday":"1"},{"bizDate":"2020-11-24","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期二","workday":"1"},{"bizDate":"2020-11-25","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期三","workday":"1"},{"bizDate":"2020-11-28","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期六","workday":"0"},{"bizDate":"2020-11-29","dopRuMemoList":[],"dopRuRosterVoList":[],"week":"星期天","workday":"0"},{"bizDate":"2020-11-30","dopRuMemoList":[],"dopRuRosterVoList":[{"crtTs":"2021-02-25 17:56:30","crtUser":"agnes","isDel":"0","mobileNo":"15021100837","oEmail":"daizhoufeng@huaan.com.cn","oTel":"02138966720","pkId":"1ffughv94hlxy","rosterDate":"2020-11-30","rosterDefId":"1ffugheg92rme","rosterNoticeUser":"H01016","rosterType":"01","userName":"戴***"}],"week":"星期一","workday":"1"}],"service":"agnes-app"}
      this.monthData = apiRes.data;
      this.$emit('getMonthData', apiRes.data);
    },

    // 日历月份切换
    selectDate(date) {
      this.getCalendarData(date)
    }
  },

}
</script>
