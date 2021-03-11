<template>
    <div>
        <div class="container">
            <div class="left">
                <el-button class="add-pro-btn" @click="refreshCalendar">新增</el-button>
                <pro-calendar class="pro-calendar" ref="proCalendarDef" @getMonthData="getMonthData" @pickDay="pickDay">
                  <template slot="list-slot">
                    <p class="split-line"></p>
                    <div class="scroll-blank" v-if="curDayData.length>0">
                      <div class="ul-container" v-for="(obj, index) in curDayData" :key="obj.typeId">
                        <span class="title">{{ obj.title }}</span>
                        <ul class="info-ul calendar" :class="colorArr[index]">
                          <li v-for="list in obj.data" :key="list.productId">
                            {{ list.productName }}
                          </li>
                        </ul>
                            </div>
                        </div>
                    </template>
                </pro-calendar>
            </div>
            <div class="right">
                <el-form class="search-panel" label-width="70px">
                    <div class="line">
                        <el-form-item label="业务日期">
                            <div class="line">
                                <el-date-picker
                                        v-model="bizDateStart"
                                        align="left"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                                <span style="margin: 0 5px">至</span>
                                <el-date-picker
                                        v-model="bizDateEnd"
                                        align="left"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
                <gf-grid class="calendar-table" ref="grid"
                         grid-no="agnes-product-calendar"
                         toolbar="find,refresh,more"
                         height="100%"
                         :query-args="queryArgs"
                >
                </gf-grid>
            </div>
        </div>
    </div>
</template>

<script>
    import proCalendar from './pro-calendar-comp'

    export default {
      watch: {
        queryArgs: {
          handler() {
            this.$refs.grid.reloadData(true);
          },
          deep: true
        },
      },
      data() {
        return {
          bizDate: window.bizDate,
          calendarVal: '',
          calendarDetailVal: window.bizDate ? window.bizDate : new Date().toLocaleDateString().replace(/\//g, '-'),
          monthData: [],
          // rosterTypeDict: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
          curDayData: [],
          colorArr: ['blue', 'orange', 'grey'],
          bizDateStart: '',
          bizDateEnd: '',
          queryArgs: {
            'bizDate': window.bizDate,
          },
        }
        },
        components: {
            'pro-calendar': proCalendar
        },
        methods: {
          getMonthData(data) {
            this.monthData = data;
          },
          pickDay(date) {
            this.curDayData = [];
            if (this.monthData && this.monthData.length > 0) {
              const dateObj = this.$lodash.find(this.monthData, {bizDate: date});
              if (dateObj) {
                if (dateObj.prdtSatrtDateList.length > 0) {
                  this.curDayData.push({
                    title: "分红日",
                    type: "fenhong",
                    data: dateObj.prdtSatrtDateList,
                  })
                }
                // this.curDayData.push({
                //   title: "产品成立日",
                //   type: "chengli",
                //   data: [],
                // }),
                // this.curDayData.push({
                //   title: "备忘",
                //   type: "beiwang",
                //   data: [],
                // })

              }
            }
            this.queryArgs.bizDate = date;
          },
          // getRosterInfo(userName, dictId, list) {
          //     const obj = this.$lodash.find(this.rosterTypeDict, {dictId});
          //     const name = userName ? userName + '-' : '';
          //     const dictName = obj && obj.dictName ? obj.dictName : '';
          //     if (!list.rosterInfo) {
          //         this.$set(list, 'rosterInfo', name + dictName);
          //     } else {
          //         list.rosterInfo = name + dictName;
          //     }
          //     return name + dictName;
          // },

          getDay(date) {
            return new Date(date).getDate();
          },

          async refreshCalendar() {
            const calendarObj = this.$refs.proCalendarDef;
            let curDate = this.$dateUtils.formatDate(calendarObj.calendarVal, 'yyyy-MM-dd');
            calendarObj.getCalendarData(curDate);
          }
        },
    }
</script>

<style scoped>
    .container {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .right {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .right .search-panel {
        position: absolute;
        top: 7px;
        left: 20px;
        margin: 0;
        height: 28px;
        line-height: 28px;
    }

    .container .left {
        position: relative;
        width: 30%;
        min-width: 250px;
        max-width: 350px;
        height: 100%;
        border: 1px solid #A8AED3;
        border-radius: 14px;
        padding: 14px;
    }

    .add-pro-btn {
        position: absolute;
        top: 12px;
        color: #0f5eff;
        border-color: #0f5eff;
        background-color: transparent;
        padding: 4px 10px;
    }

    .split-line {
        width: 100%;
        height: 0;
        border: 1px solid #D9DBEC;
        margin: 10px 0 4px;
    }

    .ul-container {
        margin: 15px 0;
    }

    .option-panel .title,
    .ul-container .title {
        color: #333;
        font-size: 14px;
        font-family: SourceHanSansCN-Medium;
        margin: 16px 0 6px 0px;
    }

    .pro-calendar >>> .el-calendar__header .el-calendar__button-group
    .el-button-group {
        justify-content: flex-end;
    }

    .pro-calendar >>> .el-calendar__header .el-calendar__button-group
    .el-button-group .el-calendar__title {
        margin: 0 5px;
        flex: none!important;
    }

    .pro-calendar >>> .el-calendar__header .el-calendar__button-group
    .el-button-group .arrow-btn {
        line-height: 20px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        border: none;
    }

    .calendar-table {
        width: 100%;
        height: 100%;
        margin-left: 13px;
    }

    .calendar-table >>> .ag-grid-box .gf-grid-status-bar {
        border-radius: 0 0 14px 14px;
    }

    .calendar-table >>> .grid-action-panel {
        border: 1px solid #A8AED3;
        border-bottom: none;
        border-radius: 14px 14px 0 0;
    }

    .calendar-table >>> .grid-action-panel .right .el-input {
        width: 280px;
    }

    .calendar-table >>> .ag-root-wrapper {
        border-radius: 0 !important;
    }

</style>
