<template>
    <div class="strip-comp-container" v-clickoutside="clickoutside">
        <div class="strip-comp-block"
             :class="{'active': choosedTaskId === 'account'}"
             @click="choosedTask({taskId: 'account'})"
             style="margin-bottom: 15px;">
            <div class="strip-comp">
                <span class="status" style="background: #0f5eff"></span>
                <span class="info account">
                    <em class="fa fa-external-link-square" style="margin-right: 5px"></em>
                    可以复核的账户申请{{[this.needTodoOfAcnt]}}笔</span>
                <span class="type">账户申请</span>
            </div>
            <div class="deal" @click="todoForAcntApply">
                <svg-icon name="lightning" color="#fff"></svg-icon>
                <span>快速查看</span>
            </div>
        </div>
        <transition-group name="slide">
            <div class="strip-comp-block" v-for="(item, index) in taskDemoArr" :key="item.taskId"
                 :class="{'active': choosedTaskId === item.taskId}"
                 @click="choosedTask(item)"
            >
                <div class="strip-comp">
                    <span class="status" :style="{background: msgTypeOp[item.stepStatus]}"></span>
                    <span class="info" :title="item.taskName">{{item.taskName}}</span>
                    <span class="type">{{getCaseStepType(item.taskType)}}</span>
                    <span class="date-time">{{ item.startDay }}[{{ item.planTime }}]</span>
                </div>
                <div class="deal" @click="dealTodo(item, index)">
                    <svg-icon name="lightning" color="#fff"></svg-icon>
                    <span>快速办理</span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "my-todolist",
        props: {
            pagetype: String,
            quartzTime: String,
        },
        data() {
            return {
                needTodoOfAcnt:'1',
                taskDemoArr: [],
                bizdate: null,
                caseStepTypeDict: this.$app.dict.getDictItems('AGNES_CASE_STEPTYPE'),
                msgTypeOp: {
                    '01': '#ccc', '02': '#4C6CFF', '03': '#FA6A6A', '04': '#FA6A6A',
                    '05': '#43DC4E', '06': '#43DC4E', '07': '#43DC4E'
                },
                choosedTaskId: {},
                freshInterval: null,
            }
        },
        created() {
            this.initData();
            this.startInterval();
        },
        watch: {
            // 监听,当路由发生变化的时候执行
            $route(to, from) {
                if (from.path === '/datav.client.view') {
                    this.clearInterval();
                }
                if (to.path === '/datav.client.view') {
                    this.startInterval();
                }
            }
        },

        computed: {
            intervalMin(){
                const quartzTime = this.quartzTime ? this.quartzTime : '5';
                return parseInt(quartzTime)*60*1000;
            }
        },

        methods: {
            async initData(){
                let resp1 = await this.$api.HomePageApi.selectTodoTaskOfUser({taskStartTime: this.todayDate});
                if(resp1){
                    this.taskDemoArr = resp1.data.rows;
                }
                let resp = await this.$api.acntApplyApi.getCountUnfinishedAndCanDo();
                if(resp) {
                    this.needTodoOfAcnt = resp.data;
                }
            },
            todoForAcntApply(){
                let clientView = this.$app.views.getView('agnes.acnt.apply');
                let clientTabView = Object.assign({args: {showCondProp:'02'}, id: 'agnes.acnt.apply'}, clientView);
                this.$nav.showView(clientTabView);
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
            },

            // 快速办理
            async dealTodo(task, index){
                const ok = await this.$msg.ask('是否快速办理该任务？');
                if (!ok) {
                    return
                }
                const taskCommit = {
                    inst: {
                        taskId: task.taskId,
                    },
                    stepInfo :{
                        remark: task.taskRemark,
                        caseId: task.caseId,
                        stepCode: task.stepCode
                    }
                };
                try {
                    this.$api.HomePageApi.confirmTask(taskCommit).then((resp)=>{
                        if(resp){
                            this.taskDemoArr.splice(index, 1);
                        }
                    });
                }catch (e) {
                    this.$msg.error(e);
                }
            },

            startInterval(){
                this.freshInterval = setInterval(() => {
                    if (this.$route.path === '/datav.client.view') {
                        this.initData();
                    }else{
                        this.clearInterval();
                    }
                }, this.intervalMin);
            },

            clearInterval(){
                clearInterval(this.freshInterval);
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

    /*.strip-comp .info.account {*/
    /*    color: #0f5eff;*/
    /*    text-decoration: underline;*/
    /*    font-size: 14px;*/
    /*    cursor: pointer;*/
    /*}*/

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

    .slide-move {
        transition: 1s all ease;
    }

    .slide-leave-active {
        position: absolute;
        animation: slide-out 1s ease-out;
    }

    @keyframes slide-out {
        from {
            transform: translateX(0)
        }
        to {
            transform: translateX(-1000px)
        }
    }
</style>
