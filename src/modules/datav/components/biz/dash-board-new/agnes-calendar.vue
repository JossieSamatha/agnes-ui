<template>
    <div class="el-calendar">
        <div class="el-calendar__header">
            <div class="el-calendar__button-group" v-if="validatedRange.length === 0">
                <el-button-group>
                    <em class="arrow-btn el-icon-arrow-left"  @click="selectDate('prev-month')"></em>
                    <div class="el-calendar__title">
                        {{ i18nDate }}
                    </div>
                    <em class="arrow-btn el-icon-arrow-right" @click="selectDate('next-month')"></em>
                </el-button-group>
            </div>
        </div>
        <div
                class="el-calendar__body"
                v-if="validatedRange.length === 0"
                key="no-range">
            <date-table
                    :date="date"
                    :selected-day="realSelectedDay"
                    :first-day-of-week="realFirstDayOfWeek"
                    @pick="pickDay" />
        </div>
        <div
                v-else
                class="el-calendar__body"
                key="has-range">
            <date-table
                    v-for="(range, index) in validatedRange"
                    :key="index"
                    :date="range[0]"
                    :selected-day="realSelectedDay"
                    :range="range"
                    :hide-header="index !== 0"
                    :first-day-of-week="realFirstDayOfWeek"
                    @pick="pickDay" />
        </div>
    </div>
</template>

<script>
    import {Calendar} from 'element-ui'
    const validTypes = ['prev-month', 'today', 'next-month'];
    export default {
        name: 'agnes-calendar',
        mixins: [Calendar],
        methods: {
            pickDay(day) {
                this.$emit('pickDay', day);
                this.realSelectedDay = day;
            },

            selectDate(type) {
                if (validTypes.indexOf(type) === -1) {
                    throw new Error(`invalid type ${type}`);
                }
                let day = '';
                if (type === 'prev-month') {
                    day = `${this.prevMonthDatePrefix}-01`;
                } else if (type === 'next-month') {
                    day = `${this.nextMonthDatePrefix}-01`;
                } else {
                    day = this.formatedToday;
                }
                this.$emit('selectDate', day);
                if (day === this.formatedDate) return;
                this.pickDay(day);
            },
        }
    }
</script>