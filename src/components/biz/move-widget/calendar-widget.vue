<template>
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
</template>

<script>
    import proCalendar from './pro-calendar-comp'
    export default {
        name: 'calendar-widget',
        props: {
        },
        data() {
            return {
                bizDate: window.bizDate,
                monthData: [],
                curDayData: [],
                colorArr: ['blue', 'orange', 'grey']
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
                this.$emit('dateChange', date);
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
            }
        }
    }
</script>
<style scoped>
    .split-line {
        width: 100%;
        height: 0;
        border-bottom: 1px solid #EAEAF0;
        margin: 20px 0;
    }

    .pro-calendar {
        padding: 14px;
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
</style>
