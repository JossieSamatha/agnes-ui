<template>
    <div class="gf-fit">
        <el-tabs v-model="currentApp" tab-position="left" class="gf-role-auth-apps" type="border-card">
            <template v-if="apps && apps.length > 0">
                <template v-for="app in apps">
                    <el-tab-pane :key="app.appCode" :label="app.appName" :name="app.appCode">
                        <div class="gf-fit">
                            <div class="gf-role-auth">
                                <div class="gf-role-auth-form">
                                    <el-form ref="form" :model="role" :disabled="disabled">
                                        <el-form-item prop="resIds" class="gf-role-auth-res">
                                            <template v-if="appResList && appResList.length>0">
                                                <template v-for="(res, index) in appResList">
                                                    <div class="el-row" v-bind:key="index" v-if="res.children && res.children.length>0">
                                                        <div class="res-menu">
                                                            <el-button size="mini" :type="isSelectAll(index)?'success':'primary'"
                                                                       @click="selectAll(index)">{{res.resName}}
                                                            </el-button>
                                                        </div>
                                                        <div class="res-group">
                                                            <el-checkbox-group v-model="role.resIds">
                                                                <el-checkbox v-for="child in res.children" :label="child.resId"
                                                                             :key="child.resId" @change="checkChange">{{child.resName}}
                                                                </el-checkbox>
                                                            </el-checkbox-group>
                                                        </div>
                                                    </div>
                                                </template>
                                            </template>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <el-row class="gf-role-auth-btns gf-form-btn">
                                    <el-button  type="primary" size="mini" @click="submitForm()" :disabled="disabled">保存</el-button>
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
                apps: [],
                role: {
                    roleId: '',
                    roleName: '',
                    appId: '',
                    resIds: []
                },
                resList: [],
                appResList: [],
                disabled: true
            };
        },
        mounted() {
            this.loadAppList();
            this.initResList(this.row);
        },
        methods: {
            async loadAppList() {
                let resp = await this.$api.GFAppApi.queryDepends();
                if (resp.data) {
                    this.apps = resp.data;
                    this.currentApp = this.apps.length > 0 ? this.apps[0].appCode : '';
                }
            },
            async initResList(row) {
                if (row) {
                    let currentRow = this.$utils.deepClone(row);
                    this.role.roleId = currentRow.roleId;
                    this.role.roleName = currentRow.roleName;
                    this.role.appId = currentRow.appId;
                    this.disabled = !this.isAuth();
                } else {
                    this.disabled = true;
                    this.role = {roleId: '', roleName: '', appId: '', resIds: []};
                }
                let resp = await this.$api.GFResApi.queryAuthList(this.role);
                this.resList = resp.data.authList;
                this.appResList = this.filterApp(this.currentApp);
                this.role.resIds = resp.data.roleResIds;
            },
            isAuth() {
                let userRoles = this.$store.getters.roles;
                let appId = this.$store.getters.appConfig.appId;
                //超级管理员可以操作default全部
                return ('default'==appId && userRoles && userRoles.includes("supervisor")) || ('default'!=appId && userRoles);
            },
            filterApp(currentApp) {
                return this.resList.filter(res => res.appId == currentApp);
            },
            selectAll(index) {
                let row = this.appResList[index];
                if (this.isSelectAll(index)) {
                    let children = [];
                    row.children.forEach((each) => {
                        children.push(each.resId);
                    });

                    this.role.resIds = this.role.resIds.filter((each) => {
                        return children.indexOf(each) < 0;
                    });
                } else {
                    let _this = this;
                    row.children.forEach((each) => {
                        if (_this.role.resIds.indexOf(each.resId) < 0) {
                            _this.role.resIds.push(each.resId);
                        }
                    });
                }
            },
            isSelectAll(index) {
                let row = this.appResList[index];
                let _this = this;
                return row.children.every((each) => _this.role.resIds.indexOf(each.resId) >= 0);
            },
            checkChange(val, e) {
                let value = e.target.value;
                let index = this.role.resIds.indexOf(value);
                if (val) {
                    if (index < 0) {
                        this.role.resIds.push(value);
                    }
                } else {
                    this.role.resIds.slice(index, 1);
                }
            },
            submitForm() {
                let _this = this;
                if (!this.role.resIds || this.role.resIds.length == 0) {
                    this.$confirm('当前角色未分配权限, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.doSave();
                    }).catch(() => {
                        _this.$message.info('已取消保存');
                    });
                } else {
                    this.doSave();
                }
            },
            doSave() {
                let _this = this;
                this.$api.GFAuthApi.saveRoleAuth(this.role).then(() => {
                    _this.$message.success("保存成功");
                });
            }
        },
        watch: {
            row(newVal) {
                this.initResList(newVal);
            },
            currentApp(newVal) {
                this.appResList = this.filterApp(newVal);
            }
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