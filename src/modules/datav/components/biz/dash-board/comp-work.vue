<template>
    <div>
        <div v-for="(item, index) in JSON.parse(moduleObj.rowData)"
             :key="index" class="todolist-container">
            <div class="work-icon">
                <img :src="getImgPath(item.type)">
            </div>
            <div class="task-des">
                <div>
                    {{item.person}}&nbsp;
                    <span style="color:#9a9a9a;">({{item.id}})</span>
                </div>
                <div>{{item.type}}</div>
            </div>
            <div class="task-time">
                <div>{{item.date}}</div>
                <div>{{item.state}}</div>
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
        methods: {
            getImgPath(val) {
                if (val.includes("早班") && !val.includes("-")) {
                    return require("../../../assets/sun.png")
                } else if (val.includes("晚班") && !val.includes("-")) {
                    return require("../../../assets/moon.png")
                } else if (val.includes("-授权")) {
                    return require("../../../assets/key.png")
                } else if (val.includes("-复核")) {
                    return require("../../../assets/recheck.png")
                }
            }
        }
    }
</script>

<style scoped>
    .todolist-container {
        height: 70px;
        width: 100%;
        position: relative;
    }
    .work-icon,
    .task-des,
    .task-time {
        display: inline-block;
        position: absolute;
        top: 50%;
        font-size: 12px;
    }
    .work-icon {
        width: 10%;
        position: absolute;
        top: 50%;
        left: 4%;
        transform: translate(0px, -50%);
    }
    .task-des {
        width: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .task-des > div:nth-child(1) {
        color: #666;
        margin-bottom: 6px;
    }
    .task-des > div:nth-child(2) {
        color: #ccc;
    }
    .task-time {
        width: 20%;
        right: 0;
        transform: translate(0px, -50%);
    }
    .task-time > div:nth-child(1) {
        color: #9a9a9a;
        margin-bottom: 6px;
    }
    .task-time > div:nth-child(2) {
        color: #ccc;
    }
</style>