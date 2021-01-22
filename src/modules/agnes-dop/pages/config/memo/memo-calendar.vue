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
                <calendar-def pageType="memo" @getMonthData="getMonthData" @dateChange="dateChange">
                    <template slot="list-slot">
                        <p class="split-line"></p>
                        <template v-if="memoCheckList.length>0">
                            <span class="title">待复核日历计划</span>
                            <ul class="info-ul calendar">
                                <li v-for="list in memoCheckList" :key="list.pkId">{{list.memoDesc}}</li>
                            </ul>
                        </template>
                        <template v-if="rosterCheckList.length>0">
                            <span class="title">待复核排班计划</span>
                            <ul class="info-ul roster">
                                <li v-for="list in rosterCheckList" :key="list.pkId">
                                    {{ list.rosterStartDate }}-{{ list.rosterEndDate }}排班计划</li>
                            </ul>
                        </template>
                    </template>
                </calendar-def>
            </div>
            <el-calendar ref="calendarMemo" class="calendar-memo"
                         v-model="calendarDetailVal"
                         :first-day-of-week="7">
                <template slot="dateCell" slot-scope="{date, data}">
                    <span class="content" :class="{'weekend': getDateObj(data.day).ifWorkDay,
                    'bizDate': data.type === 'current-month' && bizDate === data.day}">
                        <p class="day-num">
                            <span class="lunar">{{getLunarDay(data.day)}}</span>
                            <span class="solar">{{ getDay(date) }}</span>
                        </p>
                        <ul class="day-event" v-clickoutside="hidePopover">
                            <template v-if="getDateObj(data.day).dopRuMemoList.length>0">
                                <li class="day-event-li memo" :class="{'active': list.pkId === dataEventObj.pkId}"
                                    v-for="list in getDateObj(data.day).dopRuMemoList"
                                    :key="list.pkId"
                                    :title="list.memoDesc"
                                    @click="dataEventReview('memo', list)"
                                >{{list.memoDesc}}</li>
                            </template>
                            <template v-if="getDateObj(data.day).dopRuRosterVoList.length>0">
                                <li class="day-event-li roster" :class="{'active': list.pkId === dataEventObj.pkId}"
                                    v-for="list in getDateObj(data.day).dopRuRosterVoList"
                                    :key="list.pkId"
                                    :title="getRosterInfo(list.userName, list.rosterType, list)"
                                    @click="dataEventReview('roster', list)"
                                >{{getRosterInfo(list.userName, list.rosterType, list)}}</li>
                            </template>
                        </ul>
<!--                        <span class="more" v-show="dayEventList.length>3">还有{{dayEventList.length-3}}项</span>-->
                    </span>
                </template>
            </el-calendar>
            <detail-popver v-if="popoverShow"
                           :styleProps="detailPopoverStyle"
                           :dataEventType="dataEventType"
                           :dataEventObj="dataEventObj"
                           @closePopover="closePopover"
            ></detail-popver>
        </div>
    </div>
</template>

<script>
    import MemoDefDlg from "./memo-def-dlg-new";
    import rosterDefDlg from './roster-type-dlg';
    import detailPopver from './detail-popover'

    export default {
        data() {
            return {
                bizDate: window.bizDate,
                filterValue: '',
                calendarVal: '',
                memoCheckList: [],
                rosterCheckList: [],
                calendarDetailVal: window.bizDate ? window.bizDate : new Date().toLocaleDateString().replace(/\//g, '-'),
                monthData: [],
                detailPopoverStyle: {},
                dataEventObj: {},
                dataEventType: '',
                popoverShow: false,
                rosterTypeDict: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
            }
        },
        components: {
            'detail-popver': detailPopver
        },
        created(){
            this.getMemoDef();
            this.getRosterDef();
        },
        methods: {
            async getMemoDef(){
                const memoDefRes = await this.$api.memoApi.selectMemoDefList('01');
                if(memoDefRes.data && memoDefRes.data.length>0){
                    this.memoCheckList = memoDefRes.data;
                }
            },

            async getRosterDef(){
                const rosterDefRes = await this.$api.rosterApi.selectReRosterList('01');
                if(rosterDefRes.data && rosterDefRes.data.length>0){
                    this.rosterCheckList = rosterDefRes.data;
                }
            },

            dateChange(val){
                if(this.$refs.calendarMemo){
                    this.$refs.calendarMemo.pickDay(val);
                }
            },

            getMonthData(data) {
                this.monthData = data;
            },

            getRosterInfo(userName, dictId, list){
                const obj = this.$lodash.find(this.rosterTypeDict, {dictId});
                const name = userName ? userName+'-' : '';
                const dictName = obj && obj.dictName ? obj.dictName : '';
                if(!list.rosterInfo){
                    this.$set(list, 'rosterInfo', name + dictName);
                }else{
                    list.rosterInfo = name + dictName;
                }
                return name + dictName;
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

            getDateObj(date) {
                if(this.monthData && this.monthData.length>0){
                    const dateObj = this.$lodash.find(this.monthData, {bizDate: date});
                    if(dateObj) {
                        dateObj.ifWorkDay = dateObj.workday && dateObj.workday === '0';
                        dateObj.hasMemoNum = dateObj.dopRuMemoList.length>0 || dateObj.dopRuRosterVoList.length>0;
                        return dateObj;
                    }
                }
                return {
                    ifWorkDay: false,
                    hasMemoNum: false,
                    dopRuMemoList: [],
                    dopRuRosterVoList: []
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

            dataEventReview(type, list){
                this.dataEventType = type;
                this.dataEventObj = list;
                this.popoverShow = true;
                this.$nextTick(()=>{
                    const chooseLiDOM = document.getElementsByClassName('day-event-li active')[0].getBoundingClientRect();
                    const left = chooseLiDOM.left + chooseLiDOM.width;
                    this.detailPopoverStyle = {top: chooseLiDOM.top+'px', left: left +'px'};
                });
            },

            closePopover(){
                this.dataEventType = '';
                this.dataEventObj = {};
                this.popoverShow = false;
            },

            hidePopover(e){
                const pNode = document.getElementsByClassName('detail-popover')[0];
                if(pNode && !(e.target.className.includes('day-event-li') || pNode.contains(e.target))) {
                    this.closePopover();
                }
            }
        },
    }
</script>

<style scoped>
    .container {
        display: flex;
        width: 100%;
        height: calc(100% - 52px);
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

    .calendar-memo >>> .el-calendar__header .el-calendar__button-group {
        display: none;
    }

    .calendar-memo >>> .el-calendar-table td.is-selected,
    .calendar-memo >>> .el-calendar-table .el-calendar-day:hover {
        background: transparent;
    }

</style>