<template>
    <div class="person-chosen-dialog">
        <div class="left">
            <div class="tag-title">
                <el-input class="group-title" placeholder="请输入分组名称" v-model="groupTitle">
                </el-input>
            </div>
            <div class="tag-container">
                <el-tag v-for="person in personList"
                        :key="person.memberId "
                        closable size="small"
                        @close="removeMember(person)">{{person.memberDesc}}</el-tag>
            </div>
        </div>
        <div class="right">
            <span>用户列表</span>
            <gf-grid grid-no="agnes-dop-memo-member-user-list" ref="userGrid" height="100%"></gf-grid>
        </div>
        <dialog-footer okButtonTitle="保存分组" :onSave="saveGroup"></dialog-footer>
    </div>
</template>

<script>
    export default {
        name: 'person-chosen',
        props: {

        },
        data() {
            return {
                groupTitle: '',
                personList: [],
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            // 添加人员
            choseUser(params){
                const member = {
                    refType: '1',
                    memberId: params.data.userId,
                    memberDesc: params.data.userName
                }
                this.personList.push(member);
            },

            // 移除选择人员
            removeMember(removeObj){
                this.$utils.removeFromArray(this.personList, removeObj);
            },

            saveGroup(){
                if(!this.groupTitle){
                    this.$msg.error("请选择参与人员");
                    return;
                }
            }
        }
    }
</script>