<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="事件编号">
                    <el-input v-model="queryArgs.eventCode"></el-input>
                </el-form-item>
                <el-form-item label="触发日期">
                    <el-date-picker
                            v-model="queryArgs.execBizDt"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid  grid-no="agnes-event-exec-res" ref="grid"
                 :query-args="queryArgs">
            <template slot="left">
            </template>
        </gf-grid>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                queryArgs:{
                    'eventCode':'',
                    'execBizDt':''
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'eventCode':'',
                    'execBizDt':''
                };
                this.$refs.grid.reloadData();
            },
        }
    }
</script>