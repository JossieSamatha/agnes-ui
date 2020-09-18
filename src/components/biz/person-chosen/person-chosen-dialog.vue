<template>
    <div class="person-chosen-dialog">
        <div class="left">
            <div class="tag-title">
                <el-tag size="small">人员</el-tag>
                <el-tag size="small" type="success">群组</el-tag>
                <el-tag size="small" type="warning">排班</el-tag>
            </div>
            <div class="tag-container">
                <chosen-list-view :personList="personList"
                                  :groupList="groupList"
                                  :rosterList="rosterList"
                                  @reloadData="reloadData"
                ></chosen-list-view>
            </div>
        </div>
        <div class="right">
            <el-tabs type="card" v-model="activeTab" style="height: 435px;">
                <el-tab-pane name="user" v-if="chosenType.indexOf('user')>-1">
                    <span class="tab-label" slot="label">
                        <span>用户列表</span>
                    </span>
                    <gf-grid ref="personGrid"
                             grid-no="agnes-dop-memo-member-user-list"
                             :options="rowClassOption()"
                             @load-data="(params)=>{gridLoadData(personList, 'userId', params)}"
                             height="100%"></gf-grid>
                </el-tab-pane>
                <el-tab-pane name="group" v-if="chosenType.indexOf('group')>-1">
                    <span class="tab-label" slot="label">
                        <span>群组列表</span>
                    </span>
                    <gf-grid class="paginationGrid"
                             ref="groupGrid"
                             grid-no="agnes-dop-memo-member-user-group-list"
                             :options="rowClassOption()"
                             @load-data="(params)=>{gridLoadData(groupList, 'userGroupId', params)}"
                             height="100%"></gf-grid>
                </el-tab-pane>
                <el-tab-pane name="roster" v-if="chosenType.indexOf('roster')>-1">
                    <span class="tab-label" slot="label">
                        <span>排班列表</span>
                    </span>
                    <gf-grid ref="rosterGrid"
                            grid-no="agnes-dop-memo-member-roster-list"
                             :options="rowClassOption()"
                             :query-args="rosterQueryArgs"
                             @load-data="(params)=>{gridLoadData(rosterList, 'rosterId', params)}"
                            height="100%">
                        <template slot="left">
                            <el-date-picker v-model="chosenRosterDate" type="date" size="mini"
                                            placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            style="width: 125px"
                                            @change="rosterDateChange"
                            >
                            </el-date-picker>
                        </template>
                    </gf-grid>
                </el-tab-pane>
            </el-tabs>
        </div>
        <dialog-footer :onSave="saveChosen"></dialog-footer>
    </div>
</template>

<script>
    import chosenListView from './chosen-list-view'
    export default {
        name: 'person-chosen',
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
            rosterDate: {
                type: String
            },
            chosenType: {
                type: String
            },
            actionOk: Function
        },
        data() {
            return {
                activeTab: 'user',
                chosenRosterDate: '',
                rosterQueryArgs: {
                    rosterDate: this.rosterDate
                },
                rowClassOption: function(){
                    return {
                        rowClassRules: {
                            'disabled-row': function (params) {
                                return params.data && params.data.checked;
                            }
                        },
                    }
                }
            }
        },
        components: {
            'chosen-list-view': chosenListView
        },
        beforeMount(){
            this.chosenRosterDate = this.rosterDate;
        },
        methods: {
            // 表格数据初始加载 -- 已勾选项赋值
            gridLoadData(list, findId, params){
                params.rows.forEach((oneData)=>{
                    const hasChecked = this.$lodash.find(list, {memberId: oneData[findId]});
                    if(hasChecked){
                        oneData.checked = true;
                    }
                });
            },

            // 删除tag重新加载表格数据
            reloadData(type) {
                const gridType = type.replace('List', 'Grid');
                if(typeof this.$refs[gridType].reloadData === 'function'){
                    this.$refs[gridType].reloadData();
                }
            },

            // 修改排班日期
            rosterDateChange(date) {
                this.rosterQueryArgs.rosterDate = date;
                this.$refs.rosterGrid.reloadData();
            },

            // 添加人员
            choseUser(params){
                const member = {
                    refType: '1',
                    memberId: params.data.userId,
                    memberDesc: params.data.userName
                }
                this.personList.push(member);
                params.data.checked = true;
                this.$refs.personGrid.refreshRows([params.node]);
            },

            // 添加分组
            choseUserGroup(params){
                const member = {
                    refType: '2',
                    memberId: params.data.userGroupId,
                    memberDesc: `群组-${params.data.userGroupName}`
                }
                this.groupList.push(member);
                params.data.checked = true;
                this.$refs.groupGrid.refreshRows([params.node]);
            },

            // 添加排班
            choseRoster(params){
             //   const deptName = this.$app.dict.getDictItem('AGNES_ROSTER_DEPT', params.data.deptId).dictName;
                const rosterName = this.$app.dict.getDictItem('AGNES_ROSTER_TYPE', params.data.rosterType).dictName;
             //   const roleName = this.$app.dict.getDictItem('AGNES_ROSTER_POST', params.data.roleId).dictName;
                const member = {
                    refType: '3',
                    memberId: params.data.rosterId,
                    // 排班-部门 排班类型 排班日期 排班时间 岗位
                    memberDesc: `排班-${rosterName}\n${params.data.rosterDate} ${params.data.rosterTs}`
                }
                this.rosterList.push(member);
                params.data.checked = true;
                this.$refs.rosterGrid.refreshRows([params.node]);
            },

            // 保存选择信息
            saveChosen(){
                this.actionOk(this.personList, this.groupList, this.rosterList);
                this.$dialog.close(this);
            }
        }
    }
</script>
