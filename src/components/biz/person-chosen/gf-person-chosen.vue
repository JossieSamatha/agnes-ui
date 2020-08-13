<template>
    <div class="person-chosen">
        <el-button type="text" @click="chooseUser">选择人员</el-button>
        <chosen-list-view v-if="memberList.length>0"
                          :personList="personList"
                          :groupList="groupList"
                          :rosterList="rosterList"
        ></chosen-list-view>
    </div>
</template>

<script>
    import chosenListView from './chosen-list-view'
    export default {
        name: 'gf-person-chosen-input',
        props: {
            memberRefList: {
                type: Array,
                required: true
            },
            chosenType: {
                type: String,
                default: 'user, group, roster'
            },
            rosterDate: {
                type: String
            }
        },
        data() {
            return {
                personList: [],
                groupList: [],
                rosterList: []
            }
        },
        beforeMount(){
            const memberRefList = JSON.parse(this.memberRefList);
            this.personList = memberRefList.personList;
            this.groupList = memberRefList.groupList;
            this.rosterList = memberRefList.rosterList;
        },
        components: {
            'chosen-list-view': chosenListView
        },
        watch: {
            memberList(val){
                this.$emit('getMemberList', val);
            }
        },
        computed: {
            memberList(){
                const memberList = {
                    personList: this.personList,
                    groupList: this.groupList,
                    rosterList: this.rosterList
                };
                return JSON.stringify(memberList);
            }
        },
        methods: {
            // 打开人员选择弹窗
            chooseUser(){
                this.$nav.showDialog(
                    'person-chosen-dialog',
                    {
                        width: '850px',
                        args: {
                            personList: JSON.parse(JSON.stringify(this.personList)),
                            groupList: JSON.parse(JSON.stringify(this.groupList)),
                            rosterList: JSON.parse(JSON.stringify(this.rosterList)),
                            chosenType: this.chosenType,
                            rosterDate: this.rosterDate,
                            actionOk: this.getChosenList.bind(this)
                        },
                        title: this.$dialog.formatTitle('选择用户','edit'),
                    }
                );
            },

            getChosenList(personList, groupList, rosterList){
                this.personList = personList;
                this.groupList = groupList;
                this.rosterList = rosterList;
            },

            // // 移除选择人员
            // removeMember(list, removeObj){
            //     this.$utils.removeFromArray(this[list], removeObj);
            // },


        }
    }
</script>