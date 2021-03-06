<template>
    <div>
        <div class="container">
            <div class="left">
                <el-popover popper-class="rule-table-popover"
                            placement="right"
                            title="新增"
                            width="340"
                            trigger="click">
                    <div class="conf-type">
                        <template v-for="type in addTypeArr">
                            <el-button size="small"
                                       :key="type.value"
                                       @click="addTask(type.value)"
                                       >{{type.name}}</el-button>
                        </template>
                    </div>
                    <el-button slot="reference" class="add-pro-btn" size="small">新增</el-button>
                </el-popover>
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
    import proDetail from './pro-detail'
    import addTempTask from './add-temp-task'

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
          curDayData: [],
          addTypeArr:  [{name:"临时任务",value:"1"}],
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
                    title: "成立日",
                    type: "start",
                    data: dateObj.prdtSatrtDateList,
                  })
                }
                if (dateObj.prdtClearDateList.length > 0) {
                  this.curDayData.push({
                    title: "清算日",
                    type: "settlement",
                    data: dateObj.prdtClearDateList,
                  })
                }
                if (dateObj.prdtDueDateList.length > 0) {
                  this.curDayData.push({
                    title: "到期日",
                    type: "due",
                    data: dateObj.prdtDueDateList,
                  })
                }
                if (dateObj.prdtCloseDateList.length > 0) {
                  this.curDayData.push({
                    title: "关账日",
                    type: "close",
                    data: dateObj.prdtCloseDateList,
                  })
                }
              }
            }
            this.queryArgs.bizDate = date;
          },

          getDay(date) {
            return new Date(date).getDate();
          },

          addTask(type) {
              if(type=="1"){
                  // 抽屉创建
                  this.$drawerPage.create({
                      width: 'calc(100% - 250px)',
                      title: ['新增临时任务'],
                      component: addTempTask,
                      pageEl: this.$el
                  })
              }
          },

          async refreshCalendar() {
            const calendarObj = this.$refs.proCalendarDef;
            let curDate = this.$dateUtils.formatDate(calendarObj.calendarVal, 'yyyy-MM-dd');
            calendarObj.getCalendarData(curDate);
          },
          showProDetail(params) {
            // 抽屉创建
            this.$drawerPage.create({
              width: 'calc(100% - 250px)',
              title: ['东方航空企业年金计划二期'],
              component: proDetail,
                args: { row: params.data , mode: 'view'},
              pageEl: this.$el
            })
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
