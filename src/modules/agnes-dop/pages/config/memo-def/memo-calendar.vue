<template>
    <div>
        <div class="option-panel">
            <span class="title">运营日历</span>
            <span>
                <el-select v-model="filterValue" placeholder="过滤" size="small">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="日历计划" value="1"></el-option>
                    <el-option label="排班计划" value="2"></el-option>
                </el-select>
                <el-button icon="el-icon-plus" type="primary" @click="addTodo">新建日历</el-button>
                <el-button icon="el-icon-user" type="primary" @click="addSchedule">智能排班</el-button>
            </span>
        </div>
        <div class="container">
            <div class="left">
                <calendar-def pageType="memo" @getMonthData="getMonthData">
                    <template slot="list-slot">
                        <p class="split-line"></p>
                        <template v-if="calendarCheckList.length>0">
                            <span class="title">待复核日历计划</span>
                            <ul class="info-ul calendar">
                                <li v-for="list in calendarCheckList" :key="list.msgId">{{list.msgData}}</li>
                            </ul>
                        </template>
                        <template v-if="rosterCheckList.length>0">
                            <span class="title">待复核排班计划</span>
                            <ul class="info-ul roster">
                                <li v-for="list in rosterCheckList" :key="list.msgId">{{list.msgData}}</li>
                            </ul>
                        </template>
                    </template>
                </calendar-def>
            </div>
            <el-calendar class="calendar-memo"
                         v-model="calendarDetailVal"
                         :first-day-of-week="7">
                <template slot="dateCell" slot-scope="{date, data}" >
                    <span class="content" :class="{'weekend': getDateObj(date, 'workday')}">
                        <p class="day-num">
                            <span class="lunar">{{getLunarDay(data.day)}}</span>
                            <span class="solar">{{ getDay(date) }}</span>
                        </p>
                        <ul class="day-event">
                            <li :class="list.type" v-for="list in dayEventList" :key="list.msgId">{{list.msgData}}</li>
                        </ul>
                        <span class="more" v-show="dayEventList.length>3">还有{{dayEventList.length-3}}项</span>
                        <em v-show="getDateObj(date, 'event')" class="circle"></em>
                    </span>
                </template>
            </el-calendar>
        </div>
    </div>
</template>

<script>
    import MemoDefDlg from "./memo-def-dlg";
    import rosterDefDlg from './roster-type-dlg'

    export default {
        data() {
            return {
                filterValue: '',
                calendarVal: '',
                calendarCheckList: [
                    {msgId: '01', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '02', msgData: '安信收益三年运作将进入过渡期，赎回巴拉巴拉巴拉巴拉巴拉巴拉'},
                    {msgId: '03', msgData: '华安锦源0-7年开始发行至2021/02/26'},
                    {msgId: '04', msgData: '瑞安本封闭期即将结束'},
                    {msgId: '05', msgData: '瑞安本封闭期即将结束'},
                ],
                rosterCheckList: [
                    {msgId: '01', msgData: '王大陆-早班计划'},
                    {msgId: '02', msgData: '王大陆-早班计划'},
                    {msgId: '03', msgData: '王大陆-早班计划'},
                    {msgId: '04', msgData: '王大陆-晚班计划'},
                    {msgId: '05', msgData: '王大陆-晚班计划'}
                ],
                dayEventList: [
                    {msgId: '01', msgData: '安信收益三年运作将进入过渡期，赎回巴拉巴拉巴拉巴拉巴拉巴拉', type: 'memo'},
                    {msgId: '02', msgData: '瑞安本封闭期即将结束', type: 'memo'},
                    {msgId: '03', msgData: '王大陆-早班计划', type: 'roster'},
                    {msgId: '04', msgData: '王大陆-晚班计划', type: 'roster'},
                    {msgId: '05', msgData: '瑞安本封闭期即将结束', type: 'memo'},
                ],

                calendarDetailVal: '',
                monthData: []
            }
        },

        methods: {
            getMonthData(data) {
                console.log('getMemoData', data);
                this.monthData = data;
            },

            getDay(date) {
                return new Date(date).getDate();
            },

            getLunarDay(date) {
                const dateArr = date.split('-');
                const year = parseInt(dateArr[0]);
                const month = parseInt(dateArr[1]);
                const day = parseInt(dateArr[2]);
                const lunarDate = this.$LunarToSolar.toLunar(year, month, day);
                if(lunarDate[6] === '初一'){
                    return lunarDate[5];
                }else{
                    return lunarDate[6];
                }
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

            // 新建日历计划
            addTodo(){
                this.showTodoDlg('add', {}, this.refreshCalendar.bind(this));
            },

            showTodoDlg(mode, row, actionOk) {
                this.$nav.showDialog(
                    MemoDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '650px',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('运营日历', mode),
                    }
                );
            },

            refreshCalendar(){

            },

            // 新建日历计划
            addSchedule(){
                this.showScheduleDlg('add', {}, this.refreshCalendar.bind(this));
            },

            showScheduleDlg(mode, row, actionOk) {
                this.$nav.showDialog(
                    rosterDefDlg,
                    {
                        args: {row, mode, actionOk},
                        width: '650px',
                        closeOnClickModal: false,
                        title: this.$dialog.formatTitle('智能排班', mode),
                    }
                );
            },
        },
    }
</script>

<style scoped>
    .container {
        display: flex;
        width: 100%;
        height: calc(100% - 47px);
        margin-top: 16px;
    }

    .container .left {
        width: 30%;
        min-width: 250px;
        max-width: 350px;
        height: 100%;
        border: 1px solid #A8AED3;
        border-radius: 14px;
        padding: 24px;
    }

    .split-line {
        width: 100%;
        height: 0;
        border: 1px solid #D9DBEC;
        margin: 10px 0 4px;
    }

    .option-panel .title,
    .memo .title {
        color: #333;
        font-size: 14px;
        font-family: SourceHanSansCN-Medium;
        margin: 16px 0 6px 0px;
    }

    .option-panel .title{
        font-size: 16px;
        margin: 0;
    }

    .option-panel .el-button {
        padding: 8px 6px;
    }

    .option-panel .el-select {
        width: 75px;
        margin-right: 6px;
    }

    .option-panel .el-select >>> input {
        color: #999;
        border-color: #999;
        font-size: 14px;
        text-align: center;
    }

    .option-panel .el-select >>> input::-webkit-input-placeholder,
    .option-panel .el-select >>> .el-input .el-select__caret {
        color: #999;
    }
</style>