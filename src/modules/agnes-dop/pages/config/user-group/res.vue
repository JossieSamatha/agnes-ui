<template>
    <div class="gf-fit">
        <el-tabs v-model="currentApp" tab-position="left" class="gf-role-auth-apps" type="border-card">
            <template v-if="apps && apps.length > 0">
                <template v-for="app in apps">
                    <el-tab-pane :key="app.appCode" :label="app.appName" :name="app.appCode">
                        <div class="gf-fit">
                            <div class="gf-role-auth">
                                <div class="gf-role-auth-form" v-if="app.appCode==='lc'">
                                    <gf-grid grid-no="group-flow"
                                             ref="flowGrid"
                                             :options="rowClassOption()"
                                             @load-data="(params)=>{gridLoadData(taskList, params)}"
                                             height="100%" >
                                    </gf-grid>
                                </div>
                                <div class="gf-role-auth-form" v-if="app.appCode==='zb'">
                                    <gf-grid grid-no="group-kpi"
                                             ref="kpiGrid"
                                             :options="rowClassOption()"
                                             @load-data="(params)=>{gridLoadData(taskList, params)}"
                                             height="100%" >
                                    </gf-grid>
                                </div>
                                <el-row class="gf-role-auth-btns gf-form-btn">
                                    <el-button  type="primary" :disabled="disabled" size="mini" @click="submitForm()">保存</el-button>
                                </el-row>
                            </div>
                        </div>
                    </el-tab-pane>
                </template>
            </template>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "resAuth",
        props: {
            row: {required: true}
        },
        data() {
            return {
                currentApp: '',
                disabled: true,
                apps: [],
                taskList: [],
                rowClassOption: function(){
                    return {
                        rowClassRules: {
                            'selected-row': (params)=> {
                                const result = params.data && params.data.checked;
                                if(result){
                                    params.node.setSelected(true);
                                }
                                return result;
                            }
                        },
                    }
                }
            };
        },
        mounted() {
            this.loadAppList();
            this.initResList(this.row);
        },
        methods: {
            async loadAppList() {
                this.apps = [{"appCode":"lc","appName":"流程任务","taskType":"2"},{"appCode":"zb","appName":"指标任务","taskType":"1"}];
                this.currentApp = 'zb';
            },
            // 表格数据初始加载 -- 已勾选项赋值
            gridLoadData(list, params){
                params.rows.forEach((oneData)=>{
                    let reTaskDef = oneData.reTaskDef;
                    const hasChecked = this.$lodash.find(list, {taskId: reTaskDef.taskId});
                    if(hasChecked){
                        oneData.checked = true;
                    }
                });
            },
            async initResList(row) {
                if(row){
                    this.disabled=false;
                    let authData = await this.$api.userGroupApi.getAuthDataList({"userGroupId":this.row.userGroupId});
                    this.taskList = authData.data;
                    this.$refs.kpiGrid[0].reloadData();
                    this.$refs.flowGrid[0].reloadData();
                }
            },
            async submitForm() {
                try {
                    if (this.currentApp === "zb") {
                        let rows = this.$refs.kpiGrid[0].getSelectedRows();
                        let taskIds = rows.map((item)=>{
                            return item.reTaskDef.taskId;
                        });
                        const p = this.$api.userGroupApi.saveAuthData({"userGroupId":this.row.userGroupId,"taskIds":taskIds,"taskType":"1"});
                        await this.$app.blockingApp(p);
                    } else {
                        let rows = this.$refs.flowGrid[0].getSelectedRows();
                        let taskIds = rows.map((item)=>{
                            return item.reTaskDef.taskId;
                        });
                        const p = this.$api.userGroupApi.saveAuthData({"userGroupId":this.row.userGroupId,"taskIds":taskIds,"taskType":"2"});
                        await this.$app.blockingApp(p);
                    }
                    this.$msg.success('保存成功');
                    await this.initResList({"userGroupId":this.row.userGroupId});
                }catch (reason) {
                    this.$msg.error(reason);
                }
            },
        },
        watch: {
            row(newVal) {
                this.taskList=[];
                this.disabled=true;
                this.initResList(newVal);
            },
        }
    }
</script>

<style>
    .gf-role-auth-apps {
        height: 100%;
    }

    .gf-role-auth-apps>.el-tabs__header.is-left {
        margin: 0px;
    }

    .gf-role-auth-apps .el-tabs__content {
        height: 100%;
        padding: 0px;
    }

    .gf-role-auth-apps .el-tabs__content .el-tab-pane {
        height: 100%;
    }

    .gf-role-auth {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .gf-role-auth-form {
        padding-top: 10px;
        flex-grow: 1;
        border-bottom: 1px #eee solid;
        overflow-y: auto;
    }

    .gf-role-auth-btns {
        flex-grow: 0;
        flex-shrink: 0;
        padding: 5px 0;
    }

    .gf-role-auth-form .res-menu {
        float: left;
        width: 150px;
        text-align: left;
        padding-left: 15px;
    }

    .gf-role-auth-form .res-group {
        float: right;
        width: calc(100% - 150px);
    }
</style>
