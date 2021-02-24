<template>
  <div>
    <div class="option-panel">
      <span class="title">运营日历</span>
      <span>
              <el-button type="primary"
                         @click="refreshCalendar">刷新</el-button>
              <el-radio-group v-model="display" size="small"
                              style="margin-right: 6px;vertical-align: bottom;margin-left: 6px;">
                    <el-radio-button label="01">视图</el-radio-button>
                    <el-radio-button label="02">计划</el-radio-button>
                    <el-radio-button label="03">明细</el-radio-button>
                </el-radio-group>
                <el-button icon="el-icon-user" type="primary"
                           v-if="$hasPermission('agnes.dop.memo.calendar.addRoster')"
                           @click="addSchedule">智能排班</el-button>
            </span>
    </div>
    <div class="container">
      <div class="left">
        <calendar-def ref="memoCalendarDef" pageType="memo" :pageParams="pageParams" :filterValue="filterValue"
                      @getMonthData="getMonthData" @dateChange="dateChange">
          <template slot="list-slot">
            <p class="split-line"></p>
            <template v-if="memoCheckList.length>0">
              <span class="title">待复核日历计划</span>
              <ul class="info-ul calendar">
                <li v-for="list in memoCheckList" :key="list.pkId" @dblclick="approveMemo(list)">
                  {{ list.memoDesc }}
                </li>
              </ul>
            </template>
            <template v-if="rosterCheckList.length>0">
              <span class="title">待复核排班计划</span>
              <ul class="info-ul roster">
                <li v-for="list in rosterCheckList" :key="list.pkId" @dblclick="approveRoster(list)">
                  {{ list.rosterStartDate }}-{{ list.rosterEndDate }}排班计划
                </li>
              </ul>
            </template>
          </template>
        </calendar-def>
      </div>
      <div v-if="display === '01'">
        <el-calendar ref="calendarMemo" class="calendar-memo"
                     v-model="calendarDetailVal"
                     :first-day-of-week="7">
          <template slot="dateCell" slot-scope="{date, data}">
                      <span class="content" :class="{'weekend': monthData[data.day] && monthData[data.day].ifWorkDay,
                          'bizDate': data.type === 'current-month' && bizDate === data.day}">
                          <p class="day-num">
                              <span class="lunar">{{ getLunarDay(data.day) }}</span>
                              <span class="solar">{{ getDay(date) }}</span>
                          </p>
                          <span v-if="monthData[data.day]">
                              <ul class="day-event" v-clickoutside="hidePopover">
                                  <template v-if="monthData[data.day].dopRuMemoList.length>0">
                                      <li class="day-event-li memo" :class="{'active': list.pkId === dataEventObj.pkId}"
                                          v-for="list in monthData[data.day].dopRuMemoList"
                                          :key="list.pkId"
                                          :title="list.memoDesc"
                                          @click="dataEventReview('memo', list)"
                                      >{{ list.memoDesc }}</li>
                                  </template>
                                  <template v-if="monthData[data.day].dopRuRosterVoList.length>0">
                                      <li class="day-event-li roster"
                                          :class="{'active': list.pkId === dataEventObj.pkId}"
                                          v-for="list in monthData[data.day].dopRuRosterVoList"
                                          :key="list.pkId"
                                          :title="getRosterInfo(list.userName, list.rosterType, list)"
                                          @click="dataEventReview('roster', list)"
                                      >{{ getRosterInfo(list.userName, list.rosterType, list) }}</li>
                                  </template>
                              </ul>
                              <span class="more" v-show="monthData[data.day].eventNum > maxEventListNum">
                                  还有{{ monthData[data.day].eventNum - maxEventListNum }}项...
                              </span>
                          </span>
                      </span>
          </template>
        </el-calendar>
        <detail-popver v-if="popoverShow"
                       :styleProps="detailPopoverStyle"
                       :dataEventType="dataEventType"
                       :dataEventObj="dataEventObj"
                       @refreshCalendar="refreshCalendar"
                       @closePopover="closePopover"
                       :actionOk="refreshCalendar"
        ></detail-popver>
      </div>
      <rosterDef class="calendar-table" v-if="display === '02'" :display="this.display"></rosterDef>
      <Roster class="calendar-table" v-if="display === '03'" :display="this.display"></Roster>

    </div>
  </div>
</template>

<script>
import rosterDefDlg from './roster-type-dlg';
import detailPopver from './detail-popover'
import rosterDef from "./roster-def"
import Roster from "./roster"

export default {
  props: {
    pageParams: String
  },
  data() {
    return {
      bizDate: window.bizDate,
      filterValue: '2',
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
      maxEventListNum: 0,
      display: '01',
    }
  },
  components: {
    'detail-popver': detailPopver,
    rosterDef,
    Roster

  },
  created() {
    //this.getMemoDef();
    this.getRosterDef();
  },
  methods: {
    approveRoster(params) {
      this.showRoster('approve', params, this.refreshCalendar.bind(this));
    },

    showRoster(mode, row, actionOk) {
      this.$nav.showDialog(
          rosterDefDlg,
          {
            args: {row, mode, actionOk},
            width: '650px',
            closeOnClickModal: false,
            title: '智能排班-审核',
          }
      );
    },
    async getMemoDef() {
      this.memoCheckList = [];
      const memoDefRes = await this.$api.memoApi.selectMemoDefList('01');
      if (memoDefRes.data && memoDefRes.data.length > 0) {
        this.memoCheckList = memoDefRes.data;
      }
    },

    async getRosterDef() {
      this.rosterCheckList = [];
      const rosterDefRes = await this.$api.rosterApi.selectReRosterList('01');
      if (rosterDefRes.data && rosterDefRes.data.length > 0) {
        this.rosterCheckList = rosterDefRes.data;
      }
    },

    dateChange(val) {
      if (this.$refs.calendarMemo) {
        this.$refs.calendarMemo.pickDay(val);
      }
    },

    getMonthData(data) {
      let monthObj = {};
      let markIndex = -1;
      for (let i = 0; i < data.length; i++) {
        let dateObj = data[i];
        if (dateObj) {
          dateObj.ifWorkDay = dateObj.workday && dateObj.workday === '0';
          dateObj.eventNum = dateObj.dopRuMemoList.length + dateObj.dopRuRosterVoList.length;
          if (markIndex === -1 && dateObj.eventNum > 0) {
            markIndex = i;
          }
          monthObj[dateObj.bizDate] = dateObj;
        }
      }
      this.monthData = monthObj;
      if (markIndex !== -1) {
        this.$nextTick(() => {
          const eventList = document.getElementsByClassName('day-event');
          const eventListHeight = eventList && eventList.length > 0 ? eventList[markIndex].clientHeight : false;
          this.maxEventListNum = parseInt(eventListHeight / 19);
        })
      } else {
        this.maxEventListNum = 100;
      }
    },

    getRosterInfo(userName, dictId, list) {
      const obj = this.$lodash.find(this.rosterTypeDict, {dictId});
      const name = userName ? userName + '-' : '';
      const dictName = obj && obj.dictName ? obj.dictName : '';
      if (!list.rosterInfo) {
        this.$set(list, 'rosterInfo', name + dictName);
      } else {
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
      if (lunarDate[6] === '初一') {
        return lunarDate[5];
      } else {
        return lunarDate[6];
      }
    },

    async refreshCalendar() {
      const calendarObj = this.$refs.memoCalendarDef;
      let curDate = this.$dateUtils.formatDate(calendarObj.calendarVal, 'yyyy-MM-dd');
      calendarObj.getCalendarData(curDate);
      //this.getMemoDef();
      this.getRosterDef();
    },

    // 新建日历计划
    addSchedule() {
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

    dataEventReview(type, list) {
      this.dataEventType = type;
      this.dataEventObj = list;
      this.popoverShow = true;
      this.$nextTick(() => {
        const windowInnerWidth = window.innerWidth;
        const chooseLiDOM = document.getElementsByClassName('day-event-li active')[0].getBoundingClientRect();
        let left = '';
        if (windowInnerWidth - chooseLiDOM.right > 210) {
          left = chooseLiDOM.left + chooseLiDOM.width;
        } else {
          left = chooseLiDOM.left - 203;
        }
        this.detailPopoverStyle = {top: chooseLiDOM.top + 'px', left: left + 'px'};
      });
    },

    closePopover() {
      this.dataEventType = '';
      this.dataEventObj = {};
      this.popoverShow = false;
    },

    hidePopover(e) {
      const pNode = document.getElementsByClassName('detail-popover')[0];
      if (pNode && !(e.target.className.includes('day-event-li') || pNode.contains(e.target))) {
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

.option-panel .title {
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

.option-panel .el-radio-group >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #0f5eff;
  border-color: #0f5eff;
  box-shadow: -1px 0 0 0 #0f5eff;
}

.calendar-memo >>> .el-calendar__header .el-calendar__button-group {
  display: none;
}

.calendar-memo >>> .el-calendar-table td.is-selected,
.calendar-memo >>> .el-calendar-table .el-calendar-day:hover {
  background: transparent;
}

.calendar-table {
  width: 100%;
  margin-left: 13px;
}

.calendar-table >>> .grid-action-panel {
  border: 1px solid #A8AED3;
}

.calendar-table >>> .ag-root-wrapper {
  border-radius: 0 !important;
}

</style>
