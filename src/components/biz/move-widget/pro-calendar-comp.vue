<template>
    <div class="calendar-def">
        <agnes-calendar ref="calendar"
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
                      dateObj.hasMemoNum = dateObj.prdtSatrtDateList.length > 0 || dateObj.prdtClearDateList.length > 0 || dateObj.prdtDueDateList.length > 0 || dateObj.prdtCloseDateList.length > 0;
                      return dateObj;
                    }
                }
                return {
                    ifWorkDay: false,
                    hasMemoNum: false
                }
            },

          async getCalendarData(date) {
            const apiRes = await this.$api.OpCalendarApi.selectPrdtInfo(date);
            this.$emit('getMonthData', apiRes.data);
            this.monthData = apiRes.data;
            this.pickDay(this.bizDate);
          },

          // 日历月份切换
          selectDate(date) {
            this.getCalendarData(date)
          },
          async pickDay(day) {
            this.$emit('pickDay', day);
          }
        },

    }
</script>
