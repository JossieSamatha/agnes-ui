<template>
    <div>
        <div v-for="(item, index) in eventList"
             :key="index" class="notice-list"
        >
            <div class="el-icon-chat-line-square"></div>
            <div class="notice-state">
                {{item.eventDesc}}
            </div>
            <div class="notice-date">
                {{item.eventDate}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-event",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                eventList: [],
            }
        },
        created(){
            if(this.moduleObj.compType === 'err'){
                this.$api.ruleTableApi.getErrList().then(res => {
                    this.eventList = res.data.rows.map((item)=>{
                        return {
                            eventDesc: item.errDesc,
                            eventDate: item.crtTs
                        }
                    });
                })
            }else if(this.moduleObj.compType === 'risk'){
                this.$api.ruleTableApi.getRiskList().then(res => {
                    this.eventList = res.data.rows.map((item)=>{
                        return {
                            eventDesc: item.riskDesc,
                            eventDate: item.crtTs
                        }
                    });
                })
            }

        },
    }
</script>

<style scoped>
    .notice-list {
      width: 100%;
      margin: 20px 10px;
      border-bottom: 1px dashed #eaeaea;
    }
    .el-icon-chat-line-square,
    .notice-date,
    .notice-state {
        display: inline-block;
        font-size: 12px;
    }
    .el-icon-chat-line-square {
        width: 10%;
        font-size: 16px;
    }
    .notice-state {
        width: 70%;
        color: #666;
    }
    .notice-date {
        width: 20%;
        color: #9a9a9a;
    }
</style>
