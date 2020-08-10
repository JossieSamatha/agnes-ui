<template>
    <div>
        <el-form class="search-panel" label-width="75px">
            <div class="line">
                <el-form-item label="任务名称">
                    <el-input v-model="queryArgs.taskName"></el-input>
                </el-form-item>
                <el-form-item label="任务场景">
                    <el-date-picker
                        style="width:100%"
                        v-model="queryArgs.createData"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-button @click="reloadData" class="option-btn" type="primary">查询</el-button>
            </div>
            <div class="line">
                <el-form-item label="任务类型">
                    <gf-dict filterable clearable v-model="queryArgs.taskType" dict-type="AGNES_TASK_TYPE" />
                </el-form-item>
                <el-form-item label="完成状态">
                    <gf-dict filterable clearable v-model="queryArgs.taskStatus" dict-type="AC_TASK_CASE_STATUS"/>
                </el-form-item>
                <el-button @click="reSetSearch" class="option-btn">重置</el-button>
            </div>
        </el-form>
        <gf-grid grid-no="agnes-task-manage" :query-args="queryArgs" ref="grid">

        </gf-grid>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryArgs:{
                    'taskName':'',
                    'createData':'',
                    'taskType':'',
                    'taskStatus':'',
                }
            }
        },
        methods: {
            reloadData() {
                this.$refs.grid.reloadData();
            },
            reSetSearch() {
                this.queryArgs = {
                    'taskName':'',
                    'createData':'',
                    'taskType':'',
                    'taskStatus':'',
                };
            },

        }
    }
</script>