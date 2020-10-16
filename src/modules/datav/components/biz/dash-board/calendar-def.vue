<template>
    <agnes-calendar ref="calendar" v-model="moduleObj.calendarVal" :first-day-of-week="7">
        <template slot="dateCell" slot-scope="{date, data}">
            <el-popover placement="bottom" width="110" trigger="click"
                        popper-class="calendar-popper"
                        @show="getCalendarData(data.day)"
            >
                <p>运营日历：<span>5个</span></p>
                <el-button type="text" @click="calendarDetail">查看详情</el-button>
                <el-button slot="reference" :class="workStatus">{{ getDay(date) }}</el-button>
            </el-popover>
        </template>
    </agnes-calendar>
</template>

<script>
    export default {
        props: {
            moduleObj: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                workStatus: '',
                todayDate: new Date().toLocaleDateString().replace(/\//g, '-')
            }
        },
        mounted(){
            this.$dataVBus.$off('clientCalendarRefresh');
            this.$dataVBus.$on('clientCalendarRefresh', this.clientCalendarRefresh);
            this.getCalendarData(this.todayDate);
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
                const res = await this.$api.memoApi.getMemoList(date, '', '04');
                this.workStatus = res.memoStatus;
            },

            calendarDetail(){
                let clientView = this.$app.views.getView("agnes.dop.memo");
                let clientTabView = Object.assign({args: {}, id: "agnes.dop.memo"}, clientView);
                this.$nav.showView(clientTabView);
            }
        }
    }
</script>
