<template>
    <div>
      <el-tabs type="card">
        <el-tab-pane label="秒" key="1" >
          <el-radio-group v-model="result.second.cronEvery">
            <el-row>
              <el-radio label="1" value="1">每一秒钟</el-radio>
            </el-row>
            <el-row>
              <el-radio label="2" value="2">每隔
                <el-input-number size="small" v-model="result.second.incrementIncrement" :min="1" :max="59"></el-input-number>
                秒执行 从
                <el-input-number size="small" v-model="result.second.incrementStart" :min="0" :max="59"></el-input-number>
                秒开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio label="3" value="3">具体秒数(可多选)
              <el-select style="width:354px;" size="small" multiple v-model="result.second.specificSpecific">
                <el-option v-for="(val,index) in 60" :key="index" :value="index"></el-option>
              </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio label="4" value="4">周期从
                <el-input-number size="small" v-model="result.second.rangeStart" :min="1" :max="59"></el-input-number>
                到
                <el-input-number size="small" v-model="result.second.rangeEnd" :min="0" :max="59"></el-input-number>
                秒
              </el-radio>
            </el-row>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="分" key="2">
          <div>
            <el-radio-group v-model="result.minute.cronEvery">
              <el-row>
                <el-radio label="1" value="1">每一分钟</el-radio>
              </el-row>
              <el-row>
                <el-radio label="2" value="2">每隔
                  <el-input-number size="small" v-model="result.minute.incrementIncrement" :min="1" :max="60"></el-input-number>
                  分执行 从
                  <el-input-number size="small" v-model="result.minute.incrementStart" :min="0" :max="59"></el-input-number>
                  分开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="3" value="3">具体分钟数(可多选)
                <el-select style="width:340px;" size="small" multiple v-model="result.minute.specificSpecific">
                  <el-option v-for="(val,index) in Array(60)" :key="index" :value="index"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="4" value="4">周期从
                  <el-input-number size="small" v-model="result.minute.rangeStart" :min="1" :max="60"></el-input-number>
                  到
                  <el-input-number size="small" v-model="result.minute.rangeEnd" :min="0" :max="59"></el-input-number>
                  分
                </el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="时" key="3">
          <div>
            <el-radio-group v-model="result.hour.cronEvery">
              <el-row>
                <el-radio label="1" value="1">每一小时</el-radio>
              </el-row>
              <el-row>
                <el-radio label="2" value="2">每隔
                  <el-input-number size="small" v-model="result.hour.incrementIncrement" :min="0" :max="23"></el-input-number>
                  小时执行 从
                  <el-input-number size="small" v-model="result.hour.incrementStart" :min="0" :max="23"></el-input-number>
                  小时开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="3" value="3">具体小时数(可多选)
                <el-select style="width:340px;" size="small" multiple v-model="result.hour.specificSpecific">
                  <el-option v-for="(val,index) in Array(24)" :key="index" :value="index"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="4" value="4">周期从
                  <el-input-number size="small" v-model="result.hour.rangeStart" :min="0" :max="23"></el-input-number>
                  到
                  <el-input-number size="small" v-model="result.hour.rangeEnd" :min="0" :max="23"></el-input-number>
                  小时
                </el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="天" key="4">
          <div>
            <el-radio-group v-model="result.day.cronEvery">
              <el-row>
                <el-radio label="1" value="1">每一天</el-radio>
              </el-row>
              <el-row>
                <el-radio label="2" value="2">每隔
                  <el-input-number size="small" v-model="result.week.incrementIncrement" :min="1" :max="7"></el-input-number>
                  周执行 从
                  <el-select size="small" v-model="result.week.incrementStart">
                    <el-option v-for="(val,index) in Array(7)" :key="index" :value="index+1" :label="weekDays[index]"></el-option>
                  </el-select>
                  开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="3" value="3">每隔
                  <el-input-number size="small" v-model="result.day.incrementIncrement" :min="1" :max="31"></el-input-number>
                  天执行 从
                  <el-input-number size="small" v-model="result.day.incrementStart" :min="1" :max="31"></el-input-number>
                  天开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="4" value="4">具体星期几(可多选)
                <el-select style="width:340px;" size="small" multiple v-model="result.week.specificSpecific">
                  <el-option v-for="(val,index) in Array(7)" :key="index" :value="index+1" :label="weekDays[index]"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="5" value="5">具体天数(可多选)
                <el-select style="width:354px;" size="small" multiple v-model="result.day.specificSpecific">
                  <el-option v-for="(val,index) in Array(31)" :key="index" :value="index+1"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="6" value="6">在这个月的最后一天</el-radio>
              </el-row>
              <el-row>
                <el-radio label="7" value="7">在这个月的最后一个工作日</el-radio>
              </el-row>
              <el-row>
                <el-radio label="8" value="8">在这个月的最后一个
                  <el-select size="small" v-model="result.day.cronLastSpecificDomDay">
                    <el-option v-for="(val,index) in Array(7)" :key="index" :value="index+1" :label="weekDays[index]"></el-option>
                  </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="9" value="9">
                  在本月底前
                  <el-input-number size="small" v-model="result.day.cronDaysBeforeEomMinus" :min="1" :max="31"></el-input-number>
                  天
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="10" value="10">最近的工作日（周一至周五）至本月
                  <el-input-number size="small" v-model="result.day.cronDaysNearestWeekday" :min="1" :max="31"></el-input-number>
                  日
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="11" value="11">在这个月的第
                  <el-input-number size="small" v-model="result.week.cronNthDayNth" :min="1" :max="5"></el-input-number>
                  个
                  <el-select size="small" v-model="result.week.cronNthDayDay">
                    <el-option v-for="(val,index) in Array(7)" :key="index" :value="index+1" :label="weekDays[index]"></el-option>
                  </el-select>

                </el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="月" key="5">
          <div>
            <el-radio-group v-model="result.month.cronEvery">
              <el-row>
                <el-radio label="1" value="1">每一月</el-radio>
              </el-row>
              <el-row>
                <el-radio label="2" value="2">每隔
                  <el-input-number size="small" v-model="result.month.incrementIncrement" :min="0" :max="12"></el-input-number>
                  月执行 从
                  <el-input-number size="small" v-model="result.month.incrementStart" :min="0" :max="12"></el-input-number>
                  月开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="3" value="3">具体月数(可多选)
                <el-select style="width:354px;" size="small" filterable multiple v-model="result.month.specificSpecific">
                  <el-option v-for="(val,index) in Array(12)" :key="index" :value="index+1" :label="index+1"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="4" value="4">从
                  <el-input-number size="small" v-model="result.month.rangeStart" :min="1" :max="12"></el-input-number>
                  到
                  <el-input-number size="small" v-model="result.month.rangeEnd" :min="1" :max="12"></el-input-number>
                  月之间的每个月
                </el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="年" key="6">
          <div>
            <el-radio-group v-model="result.year.cronEvery">
              <el-row>
                <el-radio label="1" value="1">每一年</el-radio>
              </el-row>
              <el-row>
                <el-radio label="2" value="2">每隔
                  <el-input-number size="small" v-model="result.year.incrementIncrement" :min="1" :max="99"></el-input-number>
                  年执行 从
                  <el-input-number size="small" v-model="result.year.incrementStart" :min="2019" :max="2119"></el-input-number>
                  年开始
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="3" value="3">具体年份(可多选)
                <el-select style="width:354px;" size="small" filterable multiple v-model="result.year.specificSpecific">
                  <el-option v-for="(val,index) in Array(100)" :key="index" :value="2019+index" :label="2019+index"></el-option>
                </el-select>
                </el-radio>
              </el-row>
              <el-row>
                <el-radio label="4" value="4">从
                  <el-input-number size="small" v-model="result.year.rangeStart" :min="2019" :max="2119"></el-input-number>
                  到
                  <el-input-number size="small" v-model="result.year.rangeEnd" :min="2019" :max="2119"></el-input-number>
                  年之间的每一年
                </el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="text-align: center">
        <span>{{this.cron }}</span>
      </div>
    </div>

</template>
<script>
export default {
  name: 'VueCron',
  props: ['data'],
  data () {
    return {
      visible: false,
      confirmLoading: false,
      size: 'large',
      weekDays: ['天', '一', '二', '三', '四', '五', '六'].map(val => '星期' + val),
      result: {
        second: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 1,
          rangeEnd: 0,
          specificSpecific: []},
        minute: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 1,
          rangeEnd: '0',
          specificSpecific: []},
        hour: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: '0',
          rangeEnd: '0',
          specificSpecific: []},
        day: {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: '1',
          rangeStart: '',
          rangeEnd: '',
          specificSpecific: [],
          cronLastSpecificDomDay: 1,
          cronDaysBeforeEomMinus: 1,
          cronDaysNearestWeekday: 1},
        week: {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: 1,
          specificSpecific: [],
          cronNthDayDay: 1,
          cronNthDayNth: 1},
        month: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 1,
          rangeEnd: 1,
          specificSpecific: []},
        year: {
          cronEvery: '',
          incrementStart: 2017,
          incrementIncrement: 1,
          rangeStart: '',
          rangeEnd: '',
          specificSpecific: []}
      }
    }
  },
  computed: {
    secondsText () {
      let seconds = ''
      let cronEvery = this.result.second.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          seconds = '*'
          break
        case '2':
          seconds = this.result.second.incrementStart + '/' + this.result.second.incrementIncrement
          break
        case '3':
          this.result.second.specificSpecific.map(val => { seconds += val + ',' })
          seconds = seconds.slice(0, -1)
          break
        case '4':
          seconds = this.result.second.rangeStart + '-' + this.result.second.rangeEnd
          break
      }
      return seconds
    },
    minutesText () {
      let minutes = ''
      let cronEvery = this.result.minute.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          minutes = '*'
          break
        case '2':
          minutes = this.result.minute.incrementStart + '/' + this.result.minute.incrementIncrement
          break
        case '3':
          this.result.minute.specificSpecific.map(val => {
            minutes += val + ','
          })
          minutes = minutes.slice(0, -1)
          break
        case '4':
          minutes = this.result.minute.rangeStart + '-' + this.result.minute.rangeEnd
          break
      }
      return minutes
    },
    hoursText () {
      let hours = ''
      let cronEvery = this.result.hour.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          hours = '*'
          break
        case '2':
          hours = this.result.hour.incrementStart + '/' + this.result.hour.incrementIncrement
          break
        case '3':
          this.result.hour.specificSpecific.map(val => {
            hours += val + ','
          })
          hours = hours.slice(0, -1)
          break
        case '4':
          hours = this.result.hour.rangeStart + '-' + this.result.hour.rangeEnd
          break
      }
      return hours
    },
    daysText () {
      let days = ''
      let cronEvery = this.result.day.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          break
        case '2':
        case '4':
        case '11':
          days = '?'
          break
        case '3':
          days = this.result.day.incrementStart + '/' + this.result.day.incrementIncrement
          break
        case '5':
          this.result.day.specificSpecific.map(val => {
            days += val + ','
          })
          days = days.slice(0, -1)
          break
        case '6':
          days = 'L'
          break
        case '7':
          days = 'LW'
          break
        case '8':
          days = this.result.day.cronLastSpecificDomDay + 'L'
          break
        case '9':
          days = 'L-' + this.result.day.cronDaysBeforeEomMinus
          break
        case '10':
          days = this.result.day.cronDaysNearestWeekday + 'W'
          break
      }
      return days
    },
    weeksText () {
      let weeks = ''
      let cronEvery = this.result.day.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
        case '3':
        case '5':
          weeks = '?'
          break
        case '2':
          weeks = this.result.week.incrementStart + '/' + this.result.week.incrementIncrement
          break
        case '4':
          this.result.week.specificSpecific.map(val => {
            weeks += val + ','
          })
          weeks = weeks.slice(0, -1)
          break
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
          weeks = '?'
          break
        case '11':
          weeks = this.result.week.cronNthDayDay + '#' + this.result.week.cronNthDayNth
          break
      }
      return weeks
    },
    monthsText () {
      let months = ''
      let cronEvery = this.result.month.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          months = '*'
          break
        case '2':
          months = this.result.month.incrementStart + '/' + this.result.month.incrementIncrement
          break
        case '3':
          this.result.month.specificSpecific.map(val => {
            months += val + ','
          })
          months = months.slice(0, -1)
          break
        case '4':
          months = this.result.month.rangeStart + '-' + this.result.month.rangeEnd
          break
      }
      return months
    },
    yearsText () {
      let years = ''
      let cronEvery = this.result.year.cronEvery || ''
      switch (cronEvery.toString()) {
        case '1':
          years = '*'
          break
        case '2':
          years = this.result.year.incrementStart + '/' + this.result.year.incrementIncrement
          break
        case '3':
          this.result.year.specificSpecific.map(val => {
            years += val + ','
          })
          years = years.slice(0, -1)
          break
        case '4':
          years = this.result.year.rangeStart + '-' + this.result.year.rangeEnd
          break
      }
      return years
    },
    cron () {
      return `${this.secondsText || '*'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${this.yearsText || '*'}`
    }
  },
  mounted () {
    let label = this.data
    if (label) {
      this.secondsReverseExp(label)
      this.minutesReverseExp(label)
      this.hoursReverseExp(label)
      this.daysReverseExp(label)
      this.daysReverseExp(label)
      this.monthsReverseExp(label)
      this.yearReverseExp(label)
      JSON.parse(JSON.stringify(label))
    } else {
        if(this.defaultValue){
            this.result = JSON.parse(JSON.stringify(this.defaultValue))
        }
    }
  },
  methods: {
    secondsReverseExp (seconds) {
      let val = seconds.split(' ')[0]
      let second = {
        cronEvery: '',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 1,
        rangeEnd: 0,
        specificSpecific: []
      }
      switch (true) {
        case val.includes('*'):
          second.cronEvery = '1'
          break
        case val.includes('/'):
          second.cronEvery = '2'
          second.incrementStart = val.split('/')[0]
          second.incrementIncrement = val.split('/')[1]
          break
        case val.includes(','):
          second.cronEvery = '3'
          second.specificSpecific = val.split(',').map(Number).sort()
          break
        case val.includes('-'):
          second.cronEvery = '4'
          second.rangeStart = val.split('-')[0]
          second.rangeEnd = val.split('-')[1]
          break
        default:
          second.cronEvery = '1'
      }
      this.result.second = second
    },
    minutesReverseExp (minutes) {
      let val = minutes.split(' ')[1]
      let minute = {
        cronEvery: '',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 1,
        rangeEnd: 0,
        specificSpecific: []
      }
      switch (true) {
        case val.includes('*'):
          minute.cronEvery = '1'
          break
        case val.includes('/'):
          minute.cronEvery = '2'
          minute.incrementStart = val.split('/')[0]
          minute.incrementIncrement = val.split('/')[1]
          break
        case val.includes(','):
          minute.cronEvery = '3'
          minute.specificSpecific = val.split(',').map(Number).sort()
          break
        case val.includes('-'):
          minute.cronEvery = '4'
          minute.rangeStart = val.split('-')[0]
          minute.rangeEnd = val.split('-')[1]
          break
        default:
          minute.cronEvery = '1'
      }
      this.result.minute = minute
    },
    hoursReverseExp (hours) {
      let val = hours.split(' ')[2]
      let hour = {
        cronEvery: '',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 1,
        rangeEnd: '0',
        specificSpecific: []
      }
      switch (true) {
        case val.includes('*'):
          hour.cronEvery = '1'
          break
        case val.includes('/'):
          hour.cronEvery = '2'
          hour.incrementStart = val.split('/')[0]
          hour.incrementIncrement = val.split('/')[1]
          break
        case val.includes(','):
          hour.cronEvery = '3'
          hour.specificSpecific = val.split(',').map(Number).sort()
          break
        case val.includes('-'):
          hour.cronEvery = '4'
          hour.rangeStart = val.split('-')[0]
          hour.rangeEnd = val.split('-')[1]
          break
        default:
          hour.cronEvery = '1'
      }
      this.result.hour = hour
    },
    daysReverseExp (cron) {
      let days = cron.split(' ')[3]
      let weeks = cron.split(' ')[5]
      let day = {
        cronEvery: '',
        incrementStart: 1,
        incrementIncrement: 1,
        rangeStart: 1,
        rangeEnd: 1,
        specificSpecific: [],
        cronLastSpecificDomDay: 1,
        cronDaysBeforeEomMinus: 1,
        cronDaysNearestWeekday: 1
      }
      let week = {
        cronEvery: '',
        incrementStart: 1,
        incrementIncrement: 1,
        specificSpecific: [],
        cronNthDayDay: 1,
        cronNthDayNth: '1'
      }
      if (!days.includes('?')) {
        switch (true) {
          case days.includes('*'):
            day.cronEvery = '1'
            break
          case days.includes('?'):
            break
          case days.includes('/'):
            day.cronEvery = '3'
            day.incrementStart = days.split('/')[0]
            day.incrementIncrement = days.split('/')[1]
            break
          case days.includes(','):
            day.cronEvery = '5'
            day.specificSpecific = days.split(',').map(Number).sort()
            break
          case days.includes('LW'):
            day.cronEvery = '7'
            break
          case days.includes('L-'):
            day.cronEvery = '9'
            day.cronDaysBeforeEomMinus = days.split('L-')[1]
            break
          case days.includes('L'):
            if (days.len === 1) {
              day.cronEvery = '6'
              day.cronLastSpecificDomDay = '1'
            } else {
              day.cronEvery = '8'
              day.cronLastSpecificDomDay = Number(days.split('L')[0])
            }
            break
          case days.includes('W'):
            day.cronEvery = '10'
            day.cronDaysNearestWeekday = days.split('W')[0]
            break
          default:
            day.cronEvery = '1'
        }
      } else {
        switch (true) {
          case weeks.includes('/'):
            day.cronEvery = '2'
            week.incrementStart = weeks.split('/')[0]
            week.incrementIncrement = weeks.split('/')[1]
            break
          case weeks.includes(','):
            day.cronEvery = '4'
            week.specificSpecific = weeks.split(',').map(Number).sort()
            break
          case '#':
            day.cronEvery = '11'
            week.cronNthDayDay = weeks.split('#')[0]
            week.cronNthDayNth = weeks.split('#')[1]
            break
          default:
            day.cronEvery = '1'
            week.cronEvery = '1'
        }
      }
      this.result.day = day
      this.result.week = week
    },
    monthsReverseExp (cron) {
      let months = cron.split(' ')[4]
      let month = {
        cronEvery: '',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 1,
        rangeEnd: 1,
        specificSpecific: []
      }
      switch (true) {
        case months.includes('*'):
          month.cronEvery = '1'
          break
        case months.includes('/'):
          month.cronEvery = '2'
          month.incrementStart = months.split('/')[0]
          month.incrementIncrement = months.split('/')[1]
          break
        case months.includes(','):
          month.cronEvery = '3'
          month.specificSpecific = months.split(',').map(Number).sort()
          break
        case months.includes('-'):
          month.cronEvery = '4'
          month.rangeStart = months.split('-')[0]
          month.rangeEnd = months.split('-')[1]
          break
        default:
          month.cronEvery = '1'
      }
      this.result.month = month
    },
    yearReverseExp (cron) {
      let years = cron.split(' ')[6]
      let year = {
        cronEvery: '',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      }
      switch (true) {
        case years.includes('*'):
          year.cronEvery = '1'
          break
        case years.includes('/'):
          year.cronEvery = '2'
          year.incrementStart = years.split('/')[0]
          year.incrementIncrement = years.split('/')[1]
          break
        case years.includes(','):
          year.cronEvery = '3'
          year.specificSpecific = years.split(',').map(Number).sort()
          break
        case years.includes('-'):
          year.cronEvery = '4'
          year.rangeStart = years.split('-')[0]
          year.rangeEnd = years.split('-')[1]
          break
        default:
          year.cronEvery = '1'
      }
      this.result.year = year
    }
  }
}
</script>

<style lang="less">

</style>
