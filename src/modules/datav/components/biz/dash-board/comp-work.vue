<template>
    <div>
        <div v-for="(item, index) in rosterList"
             :key="index" class="todolist-container">
            <div class="work-icon">
                <img :src="getImgPath(item.rosterType)">
            </div>
            <div class="task-des">
                <div>
                    {{item.crtUser}}&nbsp;
                    <span style="color:#9a9a9a;">({{item.id}})</span>
                </div>
                <div>{{getRosterType(item.rosterType)}}</div>
            </div>
            <div class="task-time">
                <div>{{getRosterDate(item.rosterDate)}}</div>
                <div>{{getRosterStatus(item.status)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comp-work",
        props: {
            moduleObj: {
                type: Object,
                require: true
            }
        },
        data(){
            return {
                rosterList: [],
                rosterType: this.$app.dict.getDictItems('AGNES_ROSTER_TYPE'),
                rosterStatus: this.$app.dict.getDictItems('AGNES_RELEASE_STATUS')
            }
        },
        created(){
            this.$api.ruleTableApi.getRosterList().then(res => {
                this.rosterList = res.data.rows;
            })
        },
        methods: {
            getImgPath(val) {
                if (val.includes("00") && !val.includes("-")) {
                    return require("../../../assets/sun.png")
                } else if (val.includes("01") && !val.includes("-")) {
                    return require("../../../assets/moon.png")
                } else if (val.includes("-02")) {
                    return require("../../../assets/key.png")
                } else if (val.includes("-03")) {
                    return require("../../../assets/recheck.png")
                }
            },

            getRosterType(rosterTypeId){
                return this.$lodash.find(this.rosterType, {dictId: rosterTypeId}).dictName;
            },

            getRosterStatus(rosterStatusId){
                if(rosterStatusId){
                    return this.$lodash.find(this.rosterStatus, {dictId: rosterStatusId}).dictName;
                }else{
                    return ''
                }
            },

            getRosterDate(rosterDate){
                return rosterDate ? rosterDate.slice(5,11) : '';
            }
        }
    }
</script>

<style scoped>
    .todolist-container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
    }
    .work-icon,
    .task-des,
    .task-time {
        font-size: 12px;
    }
    .work-icon {
        margin-right: 10px;
    }
    .task-des {
        flex: 1;
    }
    .task-des > div:nth-child(1) {
        color: #666;
        margin-bottom: 6px;
    }
    .task-des > div:nth-child(2) {
        color: #ccc;
    }
    .task-time {
        width: 55px;
        padding: 0 10px;
    }
    .task-time > div:nth-child(1) {
        color: #9a9a9a;
        margin-bottom: 6px;
    }
    .task-time > div:nth-child(2) {
        color: #ccc;
    }
</style>