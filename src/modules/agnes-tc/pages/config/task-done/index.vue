<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="完成时间">
                    <el-date-picker
                            v-model="queryArgs.taskEndTm"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid @row-double-click="viewTask" :query-args="queryArgs" grid-no="agnes-task-done" ref="grid">

        </gf-grid>
    </div>
</template>

<script>
    import KpiDef from "../kpi-def/index"
    import PersonTaskDetail from "../person-task-detail"

    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'taskEndTm':''
                }
            }
        },
        mounted() {
            this.getChangeData();
        },
        methods: {
            async getChangeData() {
                this.queryArgs.taskEndTm = window.bizDate;
                await this.reloadData();
            },
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'taskEndTm':''
                };
                this.$refs.grid.reloadData();
            },
            viewTask(params) {
                const row = params.data;
                if (row.taskType === '01'||row.taskType === '1') {
                    this.$drawerPage.create({
                        width: 'calc(97% - 215px)',
                        title: [row.stepName + '-详情'],
                        component: KpiDef,
                        args: {row,type:'done'},
                        // okButtonTitle: row.isCheck ? '审核' : '保存',
                        okButtonVisible:false,
                        cancelButtonTitle: '关闭',
                        pageEl: this.$el
                    });
                }else if(row.taskType === '06'||row.taskType === '6'){
                    this.$drawerPage.create({
                        width: 'calc(97% - 215px)',
                        title: [row.stepName + '-详情'],
                        component: PersonTaskDetail,
                        args: {row,type:'done'},
                        // okButtonTitle: row.isCheck ? '审核' : '保存',
                        okButtonVisible:false,
                        cancelButtonTitle: '关闭',
                        pageEl: this.$el
                    });
                }
            },
            async onViewTask() {
                this.reloadData();
            },
        }
    }
</script>