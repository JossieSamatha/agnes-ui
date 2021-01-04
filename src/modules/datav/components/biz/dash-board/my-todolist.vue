<template>
    <div>
      <div>
        <div class="linkman-list">
          <div class="state-icon">
            <em class="fa fa-external-link-square"></em>
          </div>
          <div class="notice-info">
            <el-link type="primary">可以复核的账户申请[5]笔</el-link>
          </div>
          <div class="notice-state">
            账户申请
          </div>
        </div>
      </div>
      <div v-for="(item, index) in taskDemoArr"
            :key="index" class="todolist-container">
            <div class="task-icon">
                <em class="fa fa-circle"></em>
            </div>
            <div class="task-des">
                <div :title="item.taskName">{{item.taskName}}</div>
                <div :title="item.stepName">计划时间:{{ item.startDay }}[{{ item.planTime }}]</div>
            </div>
            <div class="notice-state">
              <div>{{ getCaseStepType(item.taskType) }}</div>
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
              taskDemoArr: [],
              bizdate: null,
              caseStepTypeDict: this.$app.dict.getDictItems('AGNES_CASE_STEPTYPE'),
            }
        },
        created(){
            this.$api.ruleTableApi.getTaskTodoList().then(res => {
                this.taskDemoArr = res.data.rows;
            })
        },
        methods: {
          getTaskDate(taskDate) {
            return taskDate ? taskDate.slice(5, 11) : '';
          },

          getTaskTime(taskTime) {
            return taskTime ? taskTime.slice(11) : '';
          },
          getCaseStepType(caseStepType) {
            if (caseStepType) {
              const dictObj = this.$lodash.find(this.caseStepTypeDict, {dictId: caseStepType});
              if (dictObj) {
                return dictObj.dictName;
              }
            }
          },
        }
    }
</script>

<style scoped>
    .todolist-container {
      display: flex;
      width: 100%;
      height: 70px;
      align-items: center;
      border-bottom: 1px dashed #eaeaea;
    }
    .task-icon,
    .task-des,
    .task-time {
        font-size: 12px;
    }
    .task-icon {
        margin-right: 10px;
    }
    .task-icon > em {
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

    .notice-state {
      font-size: 12px;
      color: #999;
    }

    .linkman-list {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 15px;
      min-height: 40px;
      max-height: 60px;
      padding: 0 10px 0 0;
      border-bottom: 1px dashed #eaeaea;
    }
    .state-icon,
    .notice-info,
    .notice-state {
      font-size: 12px;
    }
    .state-icon {
      color: #476DBE;
      font-size: 15px;
      margin-right: 10px;
    }
    .notice-info {
      flex: 1;
      color: #666;
    }

    .notice-info>p {
      height: 25px;
      line-height: 25px;
    }


</style>
