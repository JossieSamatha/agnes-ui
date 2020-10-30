<template>
    <div class="work-day-page" v-loading="!ifDataReady">
        <div class="option-panel">
            <span></span>
            <span><el-button size="small">同步</el-button>
            <el-button size="small" @click="initWork()">初始化</el-button></span>
        </div>
        <div class="row-container">
            <div class="option-col">
                <div v-for="(item,index) in areaList" :key="index"
                     :v-model="queryParam.workdayAreaCode"
                     @click="choseOptions(index,item)"
                     class="nation-button"
                     :class="{'act-button':flag==index}">
                    <span class="flag-svg" v-html="svgImg['flag-'+item.dictId]"></span>
                    <gf-button type="text" >{{item.dictName}}</gf-button>
                </div>
            </div>
            <el-calendar class="work-calendar" v-if="ifDataReady">
                <template slot="dateCell" slot-scope="{date, data}">
                    <el-popover placement="top-start"
                                width="145"
                                popper-class="work-calendar-popover"
                                trigger="click"
                    >
                        <div class="popover-btn-container" v-if="calendarData[data.day]">
                            <el-button @click="onUpdateWorkday(calendarData[data.day],'0')">设置为节假日</el-button>
                            <el-button @click="onUpdateWorkday(calendarData[data.day],'1')">设置为工作日</el-button>
                            <el-button v-show="calendarData[data.day].paramCode!=='FridayTag'"
                                    @click="onUpdateWorkday(calendarData[data.day],'FridayTag')">设置为特殊周五</el-button>
                            <el-button v-show="calendarData[data.day].paramCode!=='SundayTag'"
                                    @click="onUpdateWorkday(calendarData[data.day],'SundayTag')">设置为特殊周日</el-button>
                            <el-button v-show="calendarData[data.day].paramCode" @click="onUpdateWorkday(calendarData[data.day],'cancel')">取消特殊日设置</el-button>
                        </div>
                        <el-button class="popover-btn" slot="reference" v-if="calendarData[data.day]">
                            <div class="date-container">
                                <p class="date-text" :class="calendarData[data.day].workday==='0'?'work-day':''">
                                    {{ data.day.split('-').slice(2,3).toString()}}
                                </p>
                                <p class="special-text" v-if="calendarData[data.day].paramCode==='FridayTag'">
                                    {{calendarData[data.day].paramName}}</p>
                                <p class="special-text" v-if="calendarData[data.day].paramCode==='SundayTag'">
                                    {{calendarData[data.day].paramName}}</p>
                            </div>
                        </el-button>
                        <el-button class="popover-btn" slot="reference" v-else>
                            <div class="date-container">
                                <p class="date-text">
                                    {{ data.day.split('-').slice(2,3).toString()}}
                                </p>
                            </div>
                        </el-button>
                    </el-popover>
                </template>
            </el-calendar>
        </div>
    </div>
</template>

<script>
    import initWorkDay from './init-workday-dlg'

    export default {
    data() {
        return {
            svgImg: this.$lcImg,
            workday:{
                workdayAreaCode:"01",
            },
            calendarData: {},
            areaList:[],
            queryParam:{
                workdayAreaCode :"01"
            },
            flag:0,
            ifDataReady: false
        }
    },
    mounted(){
        let dictTypeId="AC_AREA";
        this.areaList=this.$app.dict.getDictItems(dictTypeId);
        this.workday.workdayAreaCode=this.areaList[0].dictId;
        this.onListWorkday(this.workday);
    },
    watch:{
        calendarData(val){
            this.calendarData=val;
        },
    },
    methods:{
        list(workday){
          this.onListWorkday(workday);
        },

        async onListWorkday(workday) {
            try {
                const resp = await this.$api.workdayConfigApi.getWorkdayList(workday);
                let calendarObj = {};
                resp.data.forEach((calendarItem) => {
                    if(!calendarObj[calendarItem.bizDate]){
                        calendarObj[calendarItem.bizDate] = calendarItem;
                    }
                    this.calendarData = calendarObj;
                });
                this.ifDataReady = true;
                console.log('this.calendarData', this.calendarData);
            } catch (reason) {
                this.$msg.error(reason);
            }
        },
        initWork() {
            this.$nav.showDialog(
                initWorkDay,
                {
                    args: {},
                    width: '50%',
                    title: this.$dialog.formatTitle('初始化工作日', 'edit'),
                }
            );
        },
        async onUpdateWorkday(item, flag) {
            this.ifDataReady = false;
            this.workday.workdayId = item.workdayId;
            this.workday.bizDate = item.bizDate;
            this.workday.workdayAreaCode = item.workdayAreaCode;
            if (flag.match(/0|1/)) {
                this.workday.workday = flag;
            }else if(flag === 'cancel'){
                await this.cancelSpecialDay(item);
                this.ifDataReady = true;
                return ;
            } else {
                if ('FridayTag' === flag) {
                    this.workday.paramName = "特殊周五";
                } else {
                    this.workday.paramName = "特殊周日";
                }
                this.workday.paramCode = flag;
                this.workday.paramId = item.paramId;
            }

            try {
                await this.$api.workdayConfigApi.updateWorkday(this.workday);
                await this.list(this.workday)
                this.ifDataReady = true;
                this.$msg.success('保存成功');
            } catch (reason) {
                this.$msg.error(reason);
            }
        },

        async cancelSpecialDay(item){
            try {
                await this.$api.workdayConfigApi.deleteSpecial(item.paramId);
                this.list(this.workday)
                this.$msg.success('取消成功');
            } catch (reason) {
                this.$msg.error(reason);
            }
        },

        choseOptions(id, item) {
            this.flag = id;
            this.queryParam.workdayAreaCode = item.dictId;
            this.onListWorkday(this.queryParam);
        },
    }
}
</script>

<style scoped>
    .row-container {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .row-container .option-col{
        width: 130px;
        height:100%;
        border:1px solid #F6F8FA;
        border-radius:5px;
        background-color:#F6F8FA;
        margin-right:8px;
        padding-left:8px;
        padding-top:4px
    }

    .row-container .el-calendar{
        flex: 1;
    }
</style>

<style>
    .work-day-page.gf-tab-view .el-loading-mask{
        z-index: inherit;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .work-day{
        color: #f5222e;
    }

    .nation-button {
        background-color: #F6F8FA;
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 10px;
        opacity: .3;
    }

    .nation-button:hover,
    .nation-button.act-button {
        opacity: 1;
    }

    .nation-button button {
        color: #666;
    }

    .nation-button span.flag-svg {
        margin-right: 5px;
        display: flex;
    }

    .nation-button span.flag-svg>svg {
        width: 22px;
    }

    .work-calendar .el-calendar__header {
        padding-right: 0;
    }

    .work-calendar .el-calendar-table .el-calendar-day {
        padding: 0;
    }

    .work-calendar .el-calendar-table:not(.is-range) td.next .el-calendar-day .popover-btn,
    .work-calendar .el-calendar-table:not(.is-range) td.prev .el-calendar-day .popover-btn{
        background: #f5f7fa;
        color: #ccc;
    }

    .work-calendar .el-calendar-table:not(.is-range) td.next .el-calendar-day .popover-btn .work-day,
    .work-calendar .el-calendar-table:not(.is-range) td.prev .el-calendar-day .popover-btn .work-day{
        color: #ccc;
    }

    .work-calendar .el-calendar-day .popover-btn {
        padding: 0;
        border: none;
        width: 100%;
        height: 100%;
    }

    .work-calendar .el-calendar-day .popover-btn .date-container{
        width: 100%;
        height: 100%;
    }

    .work-calendar .el-calendar-day .popover-btn .date-text{
        text-align: left;
        padding: 5px;
    }

    .work-calendar .el-calendar-day .popover-btn .special-text{
        text-align: center;
        line-height: 35px;
        color: #476dbe;
        font-size: 12px;
        font-weight: bold;
        text-shadow: 2px 3px 3px rgba(0,0,0,.3);
    }

    .el-popover.work-calendar-popover {
        padding: 0;
    }

    .work-calendar-popover .popover-btn-container button {
        width: 100%;
        border: none;
        text-align: left;
    }

    .work-calendar-popover .popover-btn-container button+button {
        margin-left: 0;
    }
</style>
