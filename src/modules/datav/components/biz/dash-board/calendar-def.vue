<template>
    <agnes-calendar ref="calendar" v-model="moduleObj.calendarVal" :first-day-of-week="7">
        <template slot="dateCell" slot-scope="{date}">
            <el-popover placement="bottom" width="110" trigger="click" popper-class="calendar-popper">
                <p>运营日历：<span>5个</span></p>
                <el-button type="text">查看详情</el-button>
                <el-button slot="reference">{{ getDay(date) }}</el-button>
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
        created(){
            this.$dataVBus.$off('clientCalendarRefresh');
            this.$dataVBus.$on('clientCalendarRefresh', this.clientCalendarRefresh);
            this.$api.workdayConfigApi.getWorkdayList({'workdayAreaCode':'CN'});
        },
        methods: {
            getDay(date){
                return new Date(date).getDate()
            },

            clientCalendarRefresh(){
                this.$refs.calendar.selectDate('today')
            }
        }
    }
</script>
