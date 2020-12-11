<template>
    <div class="person-chosen">
        <el-button :disabled="disabled" type="text" @click="chooseUser">选择人员</el-button>
        <chosen-list-view v-if="memberList.length>0"
                          :personList="personList"
                          :groupList="groupList"
                          :rosterList="rosterList"
                          :disabled="disabled"
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
          },
          disabled: {
            type: Boolean,
            default: false
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
            this.initChosenData(this.memberRefList);
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
                const memberList =  this.personList.concat(this.groupList).concat(this.rosterList);
                return memberList;
            }
        },
        methods: {
            // 初始化赋值
            initChosenData(data){
                this.personList = [];
                this.groupList = [];
                this.rosterList = [];
                const typeArr = ['', 'personList', 'groupList', 'rosterList'];
                data.forEach((memberItem)=>{
                    if(this[typeArr[memberItem.refType]]){
                        this[typeArr[memberItem.refType]].push(memberItem);
                    }
                });
            },

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
            }
        }
    }
</script>
