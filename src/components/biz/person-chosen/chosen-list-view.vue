<template>
    <div class="list-view">
        <div><el-tag v-for="(person, personIndex) in personList"
                     :key="personIndex"
                     closable size="small"
                     @close="removeMember('personList', person)">{{person.memberDesc}}</el-tag></div>
        <div><el-tag v-for="(group, groupIndex) in groupList"
                     :key="groupIndex"
                     closable size="small"
                     type="success"
                     @close="removeMember('groupList', group)">{{group.memberDesc}}</el-tag></div>
        <div><el-tag v-for="(roster, rosterIndex) in rosterList"
                     :key="rosterIndex"
                     closable size="small"
                     type="warning"
                     @close="removeMember('rosterList', roster)">{{roster.memberDesc}}</el-tag></div>
    </div>
</template>

<script>
    export default {
        name: 'chosen-list-view',
        props: {
            personList: {
                type: Array
            },
            groupList: {
                type: Array
            },
            rosterList: {
                type: Array
            },
        },
        methods: {
            // 移除选择人员
            removeMember(list, removeObj){
                this.$utils.removeFromArray(this[list], removeObj);
                this.$emit("reloadData", list);
            },
        }
    }
</script>