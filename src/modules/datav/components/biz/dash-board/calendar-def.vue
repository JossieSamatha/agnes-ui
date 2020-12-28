<template>
    <agnes-calendar ref="calendar" v-model="calendarVal" :first-day-of-week="7">
        <template slot="dateCell" slot-scope="{date, data}">
            <el-popover placement="bottom" width="110" trigger="click"
                        popper-class="calendar-popper"
                        v-model="data.isSelected"
                        @show="getCalendarData(data.day)"
            >
                <p>运营日历：<span>{{memoNum}}</span></p>
                <el-button type="text" @click="calendarDetail(data)">查看详情</el-button>
                <el-button slot="reference" class="popover-btn" :class="workStatus">{{ getDay(date) }}</el-button>
            </el-popover>
        </template>
    </agnes-calendar>
</template>

<script>
    export default {
        props: {
            calendarVal: String,
        },
        data(){
            return {
                workStatus: '',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-'),
                memoNum: ''
            }
        },
        mounted(){
            this.$dataVBus.$off('clientCalendarRefresh');
            this.$dataVBus.$on('clientCalendarRefresh', this.clientCalendarRefresh);
            this.getCalendarData(this.todayDate, true);
            this.$nextTick(()=>{
                if(this.$app.nav.tabBar.currentTabKey === this.module){
                    this.$refs.calendar.pickDay(this.todayDate);
                }
            });
        },

        methods: {
            getDay(date){
                return new Date(date).getDate();
            },

            clientCalendarRefresh(){
                this.$refs.calendar.selectDate('today');
                this.getCalendarData(this.todayDate);
            },

            async getCalendarData(date){
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
          }
        }
    }
</script>
