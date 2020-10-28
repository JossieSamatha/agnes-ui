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
    export default {
        name: 'agnes-calendar',
        mixins: [Calendar]
    }
</script>