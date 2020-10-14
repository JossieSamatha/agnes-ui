<template>
    <div>
        <div v-for="(item, index) in taskDemoArr"
            :key="index" class="todolist-container">
            <div class="task-icon">
                <i class="fa fa-circle"></i>
            </div>
            <div class="task-des">
                <div :title="item.taskName">{{item.taskName}}</div>
                <div :title="item.stepName">{{item.stepName}}</div>
            </div>
            <div class="task-time">
                <div>{{getTaskDate(item.bizDt)}}</div>
                <div>{{getTaskTime(item.taskStartTm)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-todolist",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                taskDemoArr: []
            }
        },
        created(){
            this.$api.ruleTableApi.getTaskTodoList().then(res => {
                this.taskDemoArr = res.data.rows;
            })
        },
        methods: {
            getTaskDate(taskDate){
                return taskDate ? taskDate.slice(5,11) : '';
            },

            getTaskTime(taskTime){
                return taskTime ? taskTime.slice(11) : '';
            }
        }
    }
</script>

<style scoped>
    .todolist-container {
        display: flex;
        width: 100%;
        height: 70px;
        align-items: center;
    }
    .task-icon,
    .task-des,
    .task-time {
        font-size: 12px;
    }
    .task-icon {
        margin-right: 10px;
    }
    .task-icon > i {
        font-size: 12px;
        color: #709FED;
        transform: scale(.6);
    }
    .task-des {
        width: 100%;
        overflow: hidden;
    }

    .task-des > div:nth-child(1) {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
        margin-bottom: 6px;
    }
    .task-des > div:nth-child(2) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #ccc;
    }
    .task-time {
        flex: none;
        width: 55px;
        text-align: right;
        padding-right: 5px;
    }
    .task-time > div:nth-child(1) {
        color: #9a9a9a;
        margin-bottom: 6px;
    }
    .task-time > div:nth-child(2) {
        color: #ccc;
    }
</style>