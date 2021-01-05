<template>
    <div class="strip-comp-container" v-clickoutside="clickoutside">
        <div class="strip-comp-block" v-for="item in taskDemoArr" :key="item.taskId"
             :class="{'active': choosedTaskId === item.taskId}"
             @click="choosedTask(item)"
        >
            <div class="strip-comp">
                <span class="status" :style="{background: msgTypeOp[item.stepStatus]}"></span>
                <span class="info" :title="item.taskName">{{item.taskName}}</span>
                <span class="type">{{getCaseStepType(item.taskType)}}</span>
                <span class="date-time">{{ item.startDay }}[{{ item.planTime }}]</span>
            </div>
            <div class="deal">
                <svg-icon name="lightning" color="#fff"></svg-icon>
                <span>快速办理</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-todolist",
        props: {
            pagetype: String,
        },
        data() {
            return {
                taskDemoArr: [],
                bizdate: null,
                caseStepTypeDict: this.$app.dict.getDictItems('AGNES_CASE_STEPTYPE'),
                msgTypeOp: {
                    '01': '#ccc', '02': '#4C6CFF', '03': '#FA6A6A', '04': '#FA6A6A',
                    '05': '#43DC4E', '06': '#43DC4E', '07': '#43DC4E'
                },
                choosedTaskId: {}
            }
        },
        created() {
            // this.$api.ruleTableApi.getTaskTodoList().then(res => {
            //     this.taskDemoArr = res.data.rows.splice(0,4);
            // })
            this.initData();
        },
        methods: {
            async initData(){
                let resp1 = await this.$api.HomePageApi.selectTodoTaskOfUser();
                if(resp1){
                    this.taskDemoArr = resp1.data.rows;
                }
            },
            choosedTask(task){
                this.choosedTaskId = task.taskId;
            },

            getCaseStepType(caseStepType) {
                if (caseStepType) {
                    const dictObj = this.$lodash.find(this.caseStepTypeDict, {dictId: caseStepType});
                    if (dictObj) {
                        return dictObj.dictName;
                    }
                }
            },

            clickoutside(){
                this.choosedTaskId = {}
            }
        }
    }
</script>

<style scoped>
    .strip-comp-block {
        display: flex;
    }

    .strip-comp-block + .strip-comp-block {
        margin-top: 14px;
    }

    .strip-comp {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 54px;
        border-radius: 4px;
        color: #333;
        font-size: 12px;
        background: #F7F7F7;
        padding: 0 30px 0 28px;
        transition: .8s all ease;
    }

    .strip-comp-block.active .strip-comp {
        width: calc(100% - 92px);
        background: #0F5EFF;
        color: #fff;
    }

    .strip-comp .status {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 8px;
        height: 100%;
        border-radius: 4px 0px 0px 4px;
        background: #ccc;
    }

    .strip-comp-block.active .strip-comp .status {
        display: none;
    }

    .strip-comp .icon .svg-icon {
        margin: auto;
    }

    .strip-comp .info {
        flex: 1;
        width: 100%;
        margin-right: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .strip-comp .type {
        white-space: nowrap;
        margin-left: auto;
    }

    .strip-comp .date-time {
        white-space: nowrap;
        margin-left: 32px;
    }

    .strip-comp-block .deal {
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0;
        height: 54px;
        color: #fff;
        font-size: 12px;
        background: #6195FF;
        border-radius: 4px;
        cursor: pointer;
        transition: .8s all ease;
    }

    .strip-comp-block.active .deal{
        width: 82px;
        margin-left: 10px;
    }

    .strip-comp-block .deal:hover {
        background: #0f5eff;
        transition: none;
    }

    .strip-comp-block .deal .svg-icon {
        margin-right: 5px;
    }

    .strip-comp-block .deal>span {
        white-space: nowrap;
    }
</style>
